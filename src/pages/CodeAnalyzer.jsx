import React, { useState, useRef } from 'react';
import { Container, Form, Button, Spinner, Alert, Card, Row, Col } from 'react-bootstrap';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';
import { FaMicrophone, FaVolumeUp, FaStop, FaTrash } from 'react-icons/fa';

const CodeAnalyzer = () => {
  const [language, setLanguage] = useState('javascript');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [isAnalyzingQuestion, setIsAnalyzingQuestion] = useState(false);
  const [isAnalyzingCode, setIsAnalyzingCode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthesizerRef = useRef(null);

  // Function to analyze a question based on the selected language
  const analyzeQuestion = async () => {
    if (!question) {
      setAnswer('Please ask a question about ' + language + '.');
      return;
    }

    setIsAnalyzingQuestion(true);
    setAnswer('');
    setError(null);

    const payload = {
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant for answering ${language}-related questions.`
        },
        {
          role: "user",
          content: `Answer this ${language} question: ` + question
        }
      ],
      temperature: 0.5,
      top_p: 0.95,
      max_tokens: 800
    };

    try {
      const response = await fetch(
        'https://spm-analyzer.openai.azure.com/openai/deployments/spmCodeAnalyzer/chat/completions?api-version=2024-02-15-preview',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': `65400cc03df24386bf09a0390136dc2e`, 
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error('Error: ' + response.statusText);
      }

      const data = await response.json();
      const assistantResponse = data.choices[0].message.content;
      setAnswer(assistantResponse);
    } catch (error) {
      console.error('Error:', error);
      setError('Error answering the question.');
    } finally {
      setIsAnalyzingQuestion(false);
    }
  };

  // Function to analyze code based on the selected language
  const analyzeCode = async () => {
    if (!code) {
      setResult('Please enter some ' + language + ' code.');
      return;
    }

    setIsAnalyzingCode(true);
    setResult('');
    setError(null);

    const payload = {
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant for analyzing ${language} code and providing suggestions for improvements.`
        },
        {
          role: "user",
          content: `Analyze this ${language} code: ` + code
        }
      ],
      temperature: 0.5,
      top_p: 0.95,
      max_tokens: 800
    };

    try {
      const response = await fetch(
        'https://spm-analyzer.openai.azure.com/openai/deployments/spmCodeAnalyzer/chat/completions?api-version=2024-02-15-preview',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': `65400cc03df24386bf09a0390136dc2e`, 
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error('Error: ' + response.statusText);
      }

      const data = await response.json();
      const assistantResponse = data.choices[0].message.content;
      setResult(assistantResponse);
    } catch (error) {
      console.error('Error:', error);
      setError('Error analyzing the code.');
    } finally {
      setIsAnalyzingCode(false);
    }
  };

  // Function for Text-to-Speech
  const textToSpeech = (text) => {
    setIsSpeaking(true);
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription('edfe4f53d01a4ab8a3f2c38b324e9c63', 'eastus');
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);
    
    synthesizerRef.current = synthesizer;

    synthesizer.speakTextAsync(
      text,
      result => {
        if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
          console.log('Synthesis finished.');
        } else {
          console.error('Speech synthesis canceled: ', result.errorDetails);
        }
        synthesizer.close();
        synthesizerRef.current = null;
        setIsSpeaking(false);
      },
      error => {
        console.error(error);
        synthesizer.close();
        synthesizerRef.current = null;
        setIsSpeaking(false);
      }
    );
  };

  // Function to cancel Text-to-Speech
  const cancelSpeech = () => {
    if (synthesizerRef.current) {
      synthesizerRef.current.close();
      synthesizerRef.current = null;
      setIsSpeaking(false);
    }
  };

  // Function for Speech-to-Text
  const startSpeechToText = () => {
    setIsListening(true);
    setError(null);

    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription('edfe4f53d01a4ab8a3f2c38b324e9c63', 'eastus');
    speechConfig.speechRecognitionLanguage = 'en-US';

    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync(result => {
      if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
        setTranscription(result.text);
        setQuestion(result.text);
      } else {
        setError('Error recognizing speech.');
      }
      setIsListening(false);
    });
  };

  // Function to clear both answer and result
  const clearResponses = () => {
    setAnswer('');
    setResult('');
    setError(null);
    setQuestion('');
    setCode('');
    setTranscription('');
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={14} className="mx-auto">
          <div style={{ backgroundColor: '#5B99C2', borderRadius: '20px', padding: '20px', boxShadow: '0px 8px 20px rgba(0,0,0,0.15)', transform: 'translateZ(0)' }}>
            <Card className="border-0 mb-4" style={{ borderRadius: '20px', backgroundColor: '#D1E9F6', boxShadow: '0px 4px 15px rgba(0,0,0,0.2)' }}>
              <Card.Header className="text-center" style={{ backgroundColor: '#1A4870', color: '#fff', borderRadius: '20px 20px 0 0', boxShadow: '0px 4px 10px rgba(0,0,0,0.2)' }}>
                <h2>Code Analyzer</h2>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="languageSelect" className="mb-4">
                    <Form.Label>Select Programming Language</Form.Label>
                    <Form.Control as="select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                      <option value="javascript">JavaScript</option>
                      <option value="java">Java</option>
                      <option value="cpp">C++</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="questionInput" className="mb-4">
                    <Form.Label>Ask a {language.charAt(0).toUpperCase() + language.slice(1)} Question or Use Speech-to-Text</Form.Label>
                    <Form.Control as="textarea" rows={5} value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={`Type your ${language} question here or use speech...`} />
                  </Form.Group>

                  <div className="d-flex justify-content-between mt-3">
                    <Button variant="primary" onClick={startSpeechToText} disabled={isListening}>
                      {isListening ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                          {' '}Listening...
                        </>
                      ) : (
                        <FaMicrophone size={20} />
                      )}
                    </Button>

                    <Button variant="success" onClick={analyzeQuestion} disabled={isAnalyzingQuestion}>
                      {isAnalyzingQuestion ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                          {' '}Analyzing Question...
                        </>
                      ) : (
                        'Get Answer'
                      )}
                    </Button>
                  </div>
                </Form>

                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                {answer && (
                  <div className="mt-3">
                    <Alert variant="success">
                      <pre>{answer}</pre>
                    </Alert>
                    <Button variant="info" onClick={() => textToSpeech(answer)} disabled={isSpeaking}>
                      {isSpeaking ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                          {' '}Speaking...
                        </>
                      ) : (
                        <FaVolumeUp size={20} />
                      )}
                    </Button>
                    <Button variant="danger" className="ml-2" onClick={cancelSpeech} disabled={!isSpeaking}>
                      <FaStop size={20} />
                    </Button>
                  </div>
                )}

                {transcription && (
                  <Alert variant="info" className="mt-3">
                    Transcription: {transcription}
                  </Alert>
                )}

                <Form className="mt-5">
                  <Form.Group controlId="codeInput" className="mb-4">
                    <Form.Label>Enter {language.charAt(0).toUpperCase() + language.slice(1)} Code</Form.Label>
                    <Form.Control as="textarea" rows={10} value={code} onChange={(e) => setCode(e.target.value)} placeholder={`Type your ${language} code here...`} />
                  </Form.Group>

                  <Button variant="primary" className="mt-3" onClick={analyzeCode} disabled={isAnalyzingCode}>
                    {isAnalyzingCode ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        {' '}Analyzing Code...
                      </>
                    ) : (
                      'Analyze Code'
                    )}
                  </Button>
                </Form>

                {result && (
                  <Alert variant="success" className="mt-3">
                    <pre>{result}</pre>
                  </Alert>
                )}

                <Button variant="warning" className="mt-3" onClick={clearResponses}>
                  <FaTrash size={20} /> Clear Responses
                </Button>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CodeAnalyzer;

import React, { useState, useEffect } from 'react';
import { Container, Row, Modal, Form, Button } from 'react-bootstrap';
import History from '../pages/History'; // Reuse History component

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // GitHub Access Token (consider moving it to .env file for security)
  const githubAccessToken = "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";

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/home`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setHistory(data.data);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
    fetchHistory();
  }, []);

  const handleFileClick = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/home/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (result.success) {
        setSelectedCode(result.data);
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error fetching file data:", error);
    }
  };

  // GitHub upload functionality
  const handleUploadToGithub = async () => {
    if (!githubAccessToken) {
      alert('GitHub access token is missing. Please set it in the .env file.');
      return;
    }

    const fileContent = btoa(selectedCode.code); // Convert code to base64
    const repoOwner = 'IT22056320'; // Change to your GitHub username
    const repoName = 'SPM-Codes'; // Change to your repository name
    const filePath = `src/${selectedCode.fileName}`; // Path where the file should be uploaded

    const payload = {
      message: `Add ${selectedCode.fileName} from app`,
      content: fileContent,
    };

    try {
      const res = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${githubAccessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        alert('File uploaded to GitHub successfully!');
      } else {
        const errData = await res.json();
        console.error('GitHub API error:', errData);
        alert('Failed to upload the file to GitHub.');
      }
    } catch (error) {
      console.error('Error uploading to GitHub:', error);
      alert('An error occurred while uploading the file.');
    }
  };

  return (
    <Container>
      <Row>
        <History history={history} handleFileClick={handleFileClick} />

        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Code Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>File Name:</strong> {selectedCode?.fileName}</p>
            <Form.Control
              as="textarea"
              rows={10}
              readOnly
              value={selectedCode?.code}
              style={{
                fontFamily: 'monospace',
                fontSize: '16px',
                backgroundColor: '#f7f7f7',
                borderRadius: '15px',
                boxShadow: 'inset 0px 2px 4px rgba(0,0,0,0.1)',
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleUploadToGithub} style={{ borderRadius: '15px' }}>
              Add to GitHub
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)} style={{ borderRadius: '15px' }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </Container>
  );
};

export default HistoryPage;

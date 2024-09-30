import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Resources = () => {
  return (
    <Container>
      {/* Resources Header Section */}
      <Row className="my-5">
        <Col>
          <h1 className="text-center">Developer Resources</h1>
          <p className="text-center lead">
            Access all the tools and information you need to get the most out of our static code analysis platform.
          </p>
        </Col>
      </Row>

      {/* Documentation Section */}
      <Row>
        <Col>
          <Card className="mb-4" style={{ borderRadius: '15px' }}>
            <Card.Body>
              <h2>Documentation</h2>
              <p>
                Explore our comprehensive documentation to get started with our platform, integrate it into your workflow, and maximize its potential.
              </p>
              <Button
                variant="primary"
                href="https://docs.github.com/en" // Example documentation link to GitHub Docs
                target="_blank"
                rel="noopener noreferrer"
                style={{ borderRadius: '10px' }}
              >
                View Documentation
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tutorials Section */}
      <Row>
        <Col>
          <Card className="mb-4" style={{ borderRadius: '15px' }}>
            <Card.Body>
              <h2>Tutorials</h2>
              <p>
                Learn how to use our static code analysis tool with step-by-step tutorials and real-world examples. Whether you’re a beginner or an advanced developer, we have something for everyone.
              </p>
              <Button
                variant="primary"
                href="https://www.freecodecamp.org/news/tag/tutorials/" // Example tutorials link to freeCodeCamp
                target="_blank"
                rel="noopener noreferrer"
                style={{ borderRadius: '10px' }}
              >
                Start Learning
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* API Reference Section */}
      <Row>
        <Col>
          <Card className="mb-4" style={{ borderRadius: '15px' }}>
            <Card.Body>
              <h2>API Reference</h2>
              <p>
                Integrate our static code analysis capabilities into your own applications by leveraging our powerful API. Access detailed API documentation and explore usage examples.
              </p>
              <Button
                variant="primary"
                href="https://developers.google.com/apis-explorer" // Example API Docs link to Google APIs Explorer
                target="_blank"
                rel="noopener noreferrer"
                style={{ borderRadius: '10px' }}
              >
                View API Docs
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Community Support Section */}
      <Row>
        <Col>
          <Card className="mb-4" style={{ borderRadius: '15px' }}>
            <Card.Body>
              <h2>Community Support</h2>
              <p>
                Join our developer community to connect with other users, share knowledge, and get support. Explore forums, participate in discussions, and find answers to your questions.
              </p>
              <Button
                variant="primary"
                href="https://stackoverflow.com/" // Example community link to Stack Overflow
                target="_blank"
                rel="noopener noreferrer"
                style={{ borderRadius: '10px' }}
              >
                Join the Community
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tools & Integrations Section */}
      <Row>
        <Col>
          <Card className="mb-4" style={{ borderRadius: '15px' }}>
            <Card.Body>
              <h2>Tools & Integrations</h2>
              <p>
                Explore the tools and integrations available with our platform. Whether you're using Git, CI/CD pipelines, or IDE plugins, we offer seamless integrations to improve your development workflow.
              </p>
              <Button
                variant="primary"
                href="https://github.com/marketplace" // Example link to GitHub Marketplace for tools and integrations
                target="_blank"
                rel="noopener noreferrer"
                style={{ borderRadius: '10px' }}
              >
                Explore Integrations
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Resources;

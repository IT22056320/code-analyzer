import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Resources = () => {
  const [hovered, setHovered] = useState(null); // State to track the hovered card

  // Function to handle hover effects
  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  // Dynamic styles for each card
  const cardStyle = (index) => ({
    borderRadius: '15px',
    border: `2px solid ${hovered === index ? '#007bff' : 'transparent'}`,
    transition: 'all 0.3s ease',
    boxShadow: hovered === index ? '0 8px 16px rgba(0, 123, 255, 0.4)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
    transform: hovered === index ? 'translateY(-5px)' : 'translateY(0)',
  });

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
          <Card
            className="mb-4"
            style={cardStyle(1)}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body>
              <h2>Documentation</h2>
              <p>
                Explore our comprehensive documentation to get started with our platform, integrate it into your workflow, and maximize its potential.
              </p>
              <Button
                variant="primary"
                href="https://docs.github.com/en"
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
          <Card
            className="mb-4"
            style={cardStyle(2)}
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body>
              <h2>Tutorials</h2>
              <p>
                Learn how to use our static code analysis tool with step-by-step tutorials and real-world examples.
              </p>
              <Button
                variant="primary"
                href="https://www.freecodecamp.org/news/tag/tutorials/"
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
          <Card
            className="mb-4"
            style={cardStyle(3)}
            onMouseEnter={() => handleMouseEnter(3)}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body>
              <h2>API Reference</h2>
              <p>
                Integrate our static code analysis capabilities into your own applications by leveraging our powerful API.
              </p>
              <Button
                variant="primary"
                href="https://developers.google.com/apis-explorer"
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
          <Card
            className="mb-4"
            style={cardStyle(4)}
            onMouseEnter={() => handleMouseEnter(4)}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body>
              <h2>Community Support</h2>
              <p>
                Join our developer community to connect with other users, share knowledge, and get support.
              </p>
              <Button
                variant="primary"
                href="https://stackoverflow.com/"
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
          <Card
            className="mb-4"
            style={cardStyle(5)}
            onMouseEnter={() => handleMouseEnter(5)}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body>
              <h2>Tools & Integrations</h2>
              <p>
                Explore the tools and integrations available with our platform. Whether you're using Git, CI/CD pipelines, or IDE plugins, we offer seamless integrations to improve your development workflow.
              </p>
              <Button
                variant="primary"
                href="https://github.com/marketplace"
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

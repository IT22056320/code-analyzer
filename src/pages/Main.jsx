import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Main = () => {
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
      {/* Header Section */}
      <Row className="my-5">
        <Col>
          <h1 className="text-center">Welcome to Static Code Analyzer</h1>
          <p className="text-center lead">
            Simplify code analysis and reduce code complexity with automated tools.
          </p>
        </Col>
      </Row>

      {/* Code Complexity Section */}
      <Row>
        <Col>
          <Card
            className="mb-4"
            style={cardStyle(1)}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body>
              <h2>Understanding Code Complexity</h2>
              <p>
                Code complexity refers to how difficult a program is to understand, modify, and maintain.
                As projects grow in size and scope, code can become more intricate and harder to manage. 
                High code complexity often results in a greater chance of bugs and slower development cycles.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* What Causes Code Complexity Section */}
      <Row>
        <Col>
          <Card
            className="mb-4"
            style={cardStyle(2)}
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body>
              <h2>What Causes Code Complexity?</h2>
              <ul>
                <li>Deeply nested control structures (e.g., loops and conditionals)</li>
                <li>Spaghetti code (interconnected, difficult-to-follow code paths)</li>
                <li>Poorly structured or unclear functions and classes</li>
                <li>Too many dependencies or lack of modularity</li>
                <li>Lack of proper documentation or comments</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* How to Measure Code Complexity Section */}
      <Row>
        <Col>
          <Card
            className="mb-4"
            style={cardStyle(3)}
            onMouseEnter={() => handleMouseEnter(3)}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body>
              <h2>How to Measure Code Complexity</h2>
              <p>There are several ways to measure code complexity, including:</p>
              <ul>
                <li>
                  <strong>Cyclomatic Complexity:</strong> Measures the number of independent paths through a program's source code.
                </li>
                <li>
                  <strong>Lines of Code (LOC):</strong> Counts the total lines in a program, which helps gauge its size and complexity.
                </li>
                <li>
                  <strong>Maintainability Index:</strong> A composite score that combines cyclomatic complexity, LOC, and code comments.
                </li>
                <li>
                  <strong>Halstead Metrics:</strong> Measures complexity based on the number of operators and operands in the code.
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Benefits of Measuring Code Complexity Section */}
      <Row>
        <Col>
          <Card
            className="mb-4"
            style={cardStyle(4)}
            onMouseEnter={() => handleMouseEnter(4)}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body>
              <h2>Benefits of Measuring Code Complexity</h2>
              <ul>
                <li>Identifies potential bugs and vulnerabilities early in development.</li>
                <li>Improves the maintainability of code by highlighting areas for refactoring.</li>
                <li>Increases productivity by allowing teams to focus on cleaner, more efficient code.</li>
                <li>Helps ensure better performance by simplifying complex code paths.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Call to Action Section */}
      <Row>
        <Col>
          <Card
            className="mb-4"
            style={cardStyle(5)}
            onMouseEnter={() => handleMouseEnter(5)}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body>
              <h2>Embrace Automated Code Analysis to Reduce Code Complexity</h2>
              <p>
                Automated tools like static code analyzers help identify complex areas in your codebase, 
                ensuring that you can focus on optimizing and maintaining your code. Regular analysis improves 
                both code quality and the efficiency of your development process.
              </p>
              <Link to='/code-analyzer'>
                <Button variant="primary" size="lg" block style={{ borderRadius: '10px' }}>
                  Start Analyzing Your Code
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Main;

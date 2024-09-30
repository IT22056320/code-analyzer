import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Main = () => {
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
          <Card className="mb-4" style={{ borderRadius: '15px' }}>
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
          <Card className="mb-4" style={{ borderRadius: '15px' }}>
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
          <Card className="mb-4" style={{ borderRadius: '15px' }}>
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
          <Card className="mb-4" style={{ borderRadius: '15px' }}>
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
          <Card className="mb-4" style={{ borderRadius: '15px' }}>
            <Card.Body>
              <h2>Embrace Automated Code Analysis to Reduce Code Complexity</h2>
              <p>
                Automated tools like static code analyzers help identify complex areas in your codebase, 
                ensuring that you can focus on optimizing and maintaining your code. Regular analysis improves 
                both code quality and the efficiency of your development process.
              </p>
              <Link to='/'>
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

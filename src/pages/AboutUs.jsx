import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <Container>
      {/* About Us Header Section */}
      <Row className="my-5">
        <Col>
          <h1 className="text-center">About Us</h1>
          <p className="text-center lead">
            Delivering tools to simplify code quality and efficiency for developers worldwide.
          </p>
        </Col>
      </Row>

      {/* Vision Section */}
      <Row>
        <Col>
          <Card className="mb-4" style={{ borderRadius: '15px' }}>
            <Card.Body>
              <h2>Our Vision</h2>
              <p>
                We aim to empower developers and teams by offering state-of-the-art code analysis tools that
                enhance productivity, minimize bugs, and improve code quality. Our vision is to make complex code simple,
                so developers can focus on building impactful solutions.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Mission Section */}
      <Row>
        <Col>
          <Card className="mb-4" style={{ borderRadius: '15px' }}>
            <Card.Body>
              <h2>Our Mission</h2>
              <p>
                Our mission is to create an intuitive, robust, and accessible platform for developers of all skill levels
                to analyze and improve their code. By providing insightful metrics and actionable feedback, we help ensure
                that developers can build faster, cleaner, and more maintainable codebases.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Values Section */}
      <Row>
        <Col>
          <Card className="mb-4" style={{ borderRadius: '15px' }}>
            <Card.Body>
              <h2>Our Core Values</h2>
              <ul>
                <li><strong>Innovation:</strong> We strive to stay at the forefront of technology by continuously improving our tools to meet the ever-changing demands of the software development world.</li>
                <li><strong>Simplicity:</strong> We believe in making complex tasks simple. Our platform is designed with user experience in mind, allowing developers to focus on what matters most—writing great code.</li>
                <li><strong>Quality:</strong> Our commitment to quality extends beyond our tools to the code our users write. We help developers build higher quality, more maintainable software.</li>
                <li><strong>Collaboration:</strong> We foster a collaborative community where developers can share best practices, insights, and feedback to improve both their own and others’ code.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Team Section */}
      <Row>
        <Col>
          <Card className="mb-4" style={{ borderRadius: '15px' }}>
            <Card.Body>
              <h2>Meet the Team</h2>
              <p>
                We are a group of passionate software engineers, designers, and innovators dedicated to improving the way developers work with code. Our team has diverse experience in software development, DevOps, and user experience, and we are committed to building tools that make a difference.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Call to Action Section */}
      <Row>
        <Col>
          <Card className="mb-4" style={{ borderRadius: '15px' }}>
            <Card.Body>
              <h2>Join Us on Our Journey</h2>
              <p>
                Whether you're an individual developer or part of a larger team, we are here to help you write better code. Together, we can create cleaner, more efficient, and more maintainable software that drives innovation.
              </p>
              <p className="text-center">
                <strong>Let's build a better codebase—together!</strong>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;

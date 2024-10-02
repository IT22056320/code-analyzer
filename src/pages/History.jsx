import React from 'react';
import { Card, ListGroup, Container } from 'react-bootstrap';
import { FaFileAlt } from 'react-icons/fa';

const History = ({ history, handleFileClick }) => {
  return (
    <Container>
      <div
        style={{
          backgroundColor: '#5B99C2',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: '0px 8px 20px rgba(0,0,0,0.15)',
          transform: 'translateZ(0)',
        }}
      >
        <Card
          className="border-0"
          style={{
            borderRadius: '20px',
            backgroundColor: '#D1E9F6',
            boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
          }}
        >
          <Card.Header
            className="text-center"
            style={{
              backgroundColor: '#1A4870',
              color: '#fff',
              borderRadius: '20px 20px 0 0',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            <h2>History</h2>
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              {history.length > 0 ? (
                history.map((item) => (
                  <ListGroup.Item
                    key={item._id}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '15px',
                      backgroundColor: '#f0f9ff',
                      marginBottom: '10px',
                      boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '15px',
                      transition: 'background-color 0.3s ease',
                    }}
                    onClick={() => handleFileClick(item._id)}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d1e9f6')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f0f9ff')}
                  >
                    <FaFileAlt style={{ marginRight: '15px', color: '#1A4870' }} />
                    <span style={{ fontSize: '18px', fontWeight: '500' }}>{item.fileName}</span>
                  </ListGroup.Item>
                ))
              ) : (
                <p style={{ textAlign: 'center', color: '#1A4870' }}>No history available</p>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default History;

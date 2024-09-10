import React, { useEffect, useState, useContext } from 'react';
import { Card, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import AuthContext from '../context/AuthContext.jsx';
import ToastContext from '../context/ToastContext.jsx';
import '../App.css';

const Project = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const [history, setHistory] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newCode, setNewCode] = useState('');
  const [newFileName, setNewFileName] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/project`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setHistory(data.data);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
        toast.error("Failed to fetch data.");
      }
    };
    fetchHistory();
  }, [toast]);

  const handleShowCode = (code) => {
    setSelectedCode(code);
  };

  const handleEdit = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/project/${selectedFile._id}`, {
        method: 'PATCH',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ fileName: newFileName, code: newCode })
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("File updated successfully!");
        setEditModalShow(false);
        const res = await fetch(`http://localhost:4000/api/project`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const result = await res.json();
        if (result.success) {
          setHistory(result.data);
        }
      }
    } catch (error) {
      console.error("Error updating file:", error);
      toast.error("Failed to update file.");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/project/${selectedFile._id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await res.json();
      if (data.success) {
        toast.success("File deleted successfully!");
        setDeleteModalShow(false);
        const res = await fetch(`http://localhost:4000/api/project`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const result = await res.json();
        if (result.success) {
          setHistory(result.data);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete file.");
    }
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col md={12} className="text-center">
          <h2 className="mb-4 text-primary">File Gallery</h2>
        </Col>
      </Row>
      <Row className="g-4">
        {history.length > 0 ? (
          history.map((item) => (
            <Col md={4} lg={3} key={item._id}>
              <Card 
                className="card-custom border-0 rounded" 
                style={{ cursor: 'pointer' }}
                onClick={() => handleShowCode(item.code)}
              >
                <Card.Body>
                  <Card.Title className="text-center fs-5 fw-bold">{item.fileName}</Card.Title>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(item);
                      setNewFileName(item.fileName);
                      setNewCode(item.code);
                      setEditModalShow(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(item);
                      setDeleteModalShow(true);
                    }}
                  >
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col md={12} className="text-center">
            <p>No files available</p>
          </Col>
        )}
      </Row>

      {selectedCode && (
        <Row className="mt-5">
          <Col md={12}>
            <h4 className="mb-3 text-secondary">Code Preview</h4>
            <pre className="code-box">{selectedCode}</pre>
          </Col>
        </Row>
      )}

      <Modal show={editModalShow} onHide={() => setEditModalShow(false)} className="modal-custom">
        <Modal.Header closeButton>
          <Modal.Title>Edit File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFileName">
              <Form.Label>File Name</Form.Label>
              <Form.Control
                type="text"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCode" className="mt-3">
              <Form.Label>Code</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={deleteModalShow} onHide={() => setDeleteModalShow(false)} className="modal-custom">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this file?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModalShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Project;

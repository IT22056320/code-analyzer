import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, Modal, Card, Container, Row, Col, ListGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';
import ToastContext from '../context/ToastContext.jsx';
import '../App.css';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [projects, setProjects] = useState([]); // Project list state
  const [selectedProject, setSelectedProject] = useState(null); // Currently selected project
  const [showProjectModal, setShowProjectModal] = useState(false); // Modal visibility state for project creation
  const [newProject, setNewProject] = useState({ projectName: "" }); // New project state
  const [newAnalyze, setNewAnalyze] = useState({ fileName: "", code: "" }); // New analyze state
  const [analysisResult, setAnalysisResult] = useState(null); // Analysis result
  const [history, setHistory] = useState([]); // Code history state
  const [selectedCode, setSelectedCode] = useState(null); // Selected code state
  const [updateMode, setUpdateMode] = useState(false); // Update mode state
  const [showModal, setShowModal] = useState(false); // Modal visibility state for code details
  const [error, setError] = useState(""); // Error handling
  const [error1, setError1] = useState(""); // Another error state
  const [editingFile, setEditingFile] = useState(null); // Editing file state

  // Check authentication
  useEffect(() => {
    const checkAuthentication = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser) {
        navigate('/', { replace: true });
      }
    };
    checkAuthentication();
  }, [user, navigate]);

  // Fetch project list and history
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/projects`, {
          headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        if (data.success) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // Fetch code history for selected project
  useEffect(() => {
    if (selectedProject) {
      const fetchHistory = async () => {
        try {
          const res = await fetch(`http://localhost:4000/api/home?project=${selectedProject}`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
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
    }
  }, [selectedProject]);

  // Create a new project
  const handleCreateProject = async (event) => {
    event.preventDefault();
    if (!newProject.projectName) {
      setError("Project name is required.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:4000/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newProject),
      });
      const result = await res.json();
      if (result.success) {
        setProjects([...projects, result.data]); // Add new project to the project list
        toast.success("Project created successfully!");
        setShowProjectModal(false); // Close modal after successful creation
      }
    } catch (error) {
      console.error("Error creating project:", error);
      setError("An error occurred while creating the project.");
    }
  };

  // Handle project selection
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    navigate(`/analyze/${project._id}`); // Navigate to code analysis page for the selected project
  };

  // Handle code analysis submission
  const handleAddCode = async (event) => {
    event.preventDefault();
    setError(""); // Reset error state

    if (!newAnalyze.fileName) {
      setError("Filename is required.");
      return;
    }

    if (!newAnalyze.code) {
      setError1("Code is required.");
      return;
    }

    if (!selectedProject) {
      setError("Please select a project.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/api/home`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...newAnalyze, project: selectedProject._id }), // Save analysis in the selected project
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const result = await res.json();
      setAnalysisResult(result);
      toast.success("Analysis completed and saved to project folder!");
    } catch (error) {
      console.error("Error submitting code:", error);
      setError("An error occurred while submitting the code.");
    }
  };

  return (
    <Container>
      <Row>
        <Col md={8} className="mx-auto">
          <div>
            <h2>Select a Project</h2>
            <DropdownButton title={selectedProject ? selectedProject.name : "Select Project"} id="dropdown-basic">
              {projects.map((project) => (
                <Dropdown.Item key={project._id} onClick={() => handleProjectSelect(project)}>
                  {project.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <Button variant="primary" onClick={() => setShowProjectModal(true)} className="mt-3">
              Create New Project
            </Button>

            {/* Code Analysis Form */}
            <Card className="mt-4">
              <Card.Body>
                <Form onSubmit={handleAddCode}>
                  <Form.Group controlId="fileName" className="mb-4">
                    <Form.Label>File Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter file name (.js)"
                      value={newAnalyze.fileName}
                      onChange={(e) => setNewAnalyze({ ...newAnalyze, fileName: e.target.value })}
                    />
                    {error && <p className="text-danger">{error}</p>}
                  </Form.Group>

                  <Form.Group controlId="code" className="mb-4">
                    <Form.Label>Code</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={10}
                      placeholder="Paste your code here..."
                      value={newAnalyze.code}
                      onChange={(e) => setNewAnalyze({ ...newAnalyze, code: e.target.value })}
                    />
                    {error1 && <p className="text-danger">{error1}</p>}
                  </Form.Group>

                  <Button type="submit" variant="primary">
                    Analyze Code
                  </Button>
                </Form>

                {/* Display Analysis Result */}
                {analysisResult && (
                  <Card className="mt-4">
                    <Card.Body>
                      <h5>Analysis Result</h5>
                      <p><strong>File Name:</strong> {analysisResult.fileName}</p>
                      {/* Add other analysis results here */}
                    </Card.Body>
                  </Card>
                )}
              </Card.Body>
            </Card>
          </div>
        </Col>

        {/* History and Project Management */}
        <Col md={4}>
          <div>
            <h2>Project History</h2>
            <ListGroup variant="flush">
              {history.map((item) => (
                <ListGroup.Item key={item._id}>
                  {item.fileName}
                  <Button variant="danger" size="sm" className="float-end" onClick={() => handleDelete(item._id)}>
                    Delete
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>

      {/* Create Project Modal */}
      <Modal show={showProjectModal} onHide={() => setShowProjectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateProject}>
            <Form.Group controlId="projectName" className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project name"
                value={newProject.projectName}
                onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
              />
              {error && <p className="text-danger">{error}</p>}
            </Form.Group>
            <Button type="submit" variant="primary">
              Create Project
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Home;

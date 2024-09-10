import React, { useState, useEffect } from 'react';
import { Button, Form, ListGroup, Container, Card, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [folders, setFolders] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [editProjectId, setEditProjectId] = useState(null); // To handle project edit
  const [editFolderId, setEditFolderId] = useState(null); // To handle folder edit
  const [showProjectModal, setShowProjectModal] = useState(false); // To handle project edit modal
  const [showFolderModal, setShowFolderModal] = useState(false); // To handle folder edit modal
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/projects', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleCreateProject = async () => {
    if (!projectName) return; // Ensure project name is not empty
  
    try {
      const res = await fetch('http://localhost:4000/api/projects', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ name: projectName, userId: "USER_ID_FROM_LOCAL_STORAGE_OR_STATE" }),
      });
      const data = await res.json();
      if (data.success) {
        setProjects([...projects, data.data]);
        setProjectName('');
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };
  

  const handleUpdateProject = async (id) => {
    if (!projectName) return; // Validation
    try {
      const res = await fetch(`http://localhost:4000/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ name: projectName }),
      });
      const data = await res.json();
      if (data.success) {
        setProjects(projects.map(p => (p._id === id ? data.data : p)));
        setProjectName('');
        setEditProjectId(null);
        setShowProjectModal(false);
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (res.ok) {
        setProjects(projects.filter(p => p._id !== id));
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleCreateFolder = async (projectId) => {
    if (!newFolderName) return; // Validation
    try {
      const res = await fetch('http://localhost:4000/api/folders', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ projectId, name: newFolderName }),
      });
      const data = await res.json();
      if (data.success) {
        const updatedProjects = projects.map(p =>
          p._id === projectId ? { ...p, folders: [...p.folders, data.folder] } : p
        );
        setProjects(updatedProjects);
        setNewFolderName('');
      }
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  const handleUpdateFolder = async (id, projectId) => {
    if (!newFolderName) return; // Validation
    try {
      const res = await fetch(`http://localhost:4000/api/folders/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ name: newFolderName }),
      });
      const data = await res.json();
      if (data.success) {
        const updatedProjects = projects.map(p =>
          p._id === projectId
            ? { ...p, folders: p.folders.map(f => (f._id === id ? data.folder : f)) }
            : p
        );
        setProjects(updatedProjects);
        setNewFolderName('');
        setEditFolderId(null);
        setShowFolderModal(false);
      }
    } catch (error) {
      console.error("Error updating folder:", error);
    }
  };

  const handleDeleteFolder = async (id, projectId) => {
    try {
      const res = await fetch(`http://localhost:4000/api/folders/${id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ projectId }) // Include projectId in the body
      });
  
      if (res.ok) {
        const updatedProjects = projects.map(p =>
          p._id === projectId
            ? { ...p, folders: p.folders.filter(f => f._id !== id) }
            : p
        );
        setProjects(updatedProjects);
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };
  
  
  return (
    <Container>
      <Card className="mt-5">
        <Card.Header>Project Management</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Form.Group>
            <Button onClick={handleCreateProject} className="mt-3">Create Project</Button>
          </Form>

          <ListGroup className="mt-4">
            {projects.map((project) => (
              <ListGroup.Item key={project._id}>
                <h5>{project.name}</h5>
                <Button variant="warning" onClick={() => { setEditProjectId(project._id); setShowProjectModal(true); }}>Edit Project</Button>
                <Button variant="danger" className="ms-2" onClick={() => handleDeleteProject(project._id)}>Delete Project</Button>

                <Form.Group className="mt-3">
                  <Form.Label>New Folder</Form.Label>
                  <Form.Control
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                  />
                </Form.Group>
                <Button onClick={() => handleCreateFolder(project._id)} className="mt-2">
                  Add Folder
                </Button>

                <ListGroup className="mt-3">
                  {project.folders && project.folders.map((folder) => (
                    <ListGroup.Item key={folder._id}>
                      {folder.name}
                      <Button variant="warning" onClick={() => { setEditFolderId(folder._id); setShowFolderModal(true); }}>Edit Folder</Button>
                      <Button variant="danger" className="ms-2" onClick={() => handleDeleteFolder(folder._id, project._id)}>Delete Folder</Button>
                      <Button className="ms-2" onClick={() => navigateToHome(folder._id)}>Analyze Code</Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Edit Project Modal */}
      <Modal show={showProjectModal} onHide={() => setShowProjectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProjectModal(false)}>Close</Button>
          <Button variant="primary" onClick={() => handleUpdateProject(editProjectId)}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Folder Modal */}
      <Modal show={showFolderModal} onHide={() => setShowFolderModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Folder Name</Form.Label>
            <Form.Control
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFolderModal(false)}>Close</Button>
          <Button variant="primary" onClick={() => handleUpdateFolder(editFolderId, projects.find(p => p.folders.some(f => f._id === editFolderId))._id)}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProjectManagement;

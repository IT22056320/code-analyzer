import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Modal, Row, Col, Container } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaFolderPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import jsPDF Autotable plugin for tables
import logo from "../assets/logo.png"; // Assuming your logo is here

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [editProjectId, setEditProjectId] = useState(null);
  const [editFolderId, setEditFolderId] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState(null);
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
    if (!projectName) return;

    try {
      const res = await fetch('http://localhost:4000/api/projects', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ name: projectName }),
      });
      const data = await res.json();
      if (data.success) {
        setProjects([...projects, data.data]);
        setProjectName('');
        setShowProjectModal(false);
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleUpdateProject = async (id) => {
    if (!projectName) return;

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
    if (!newFolderName) return;

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
        setShowFolderModal(false);
      }
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  const handleUpdateFolder = async (id, projectId) => {
    if (!newFolderName) return;

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
        body: JSON.stringify({ projectId })
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

  // PDF Generation function
 // PDF Generation function for Project Management
const generatePDF = () => {
  const img = new Image();
  img.src = logo; // Assuming the logo is in the assets folder and already imported
  img.onload = function () {
    const doc = new jsPDF();

    // Add the company logo, name, and report title
    doc.addImage(img, 'PNG', 10, 10, 30, 30); // Adding logo
    doc.setFontSize(22);
    doc.text('LogicLens', 50, 20); // Company name
    doc.setFontSize(16);
    doc.text('Project and Folder Report', 50, 30); // Report title

    // Add current date
    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Report Generated on: ${currentDate}`, 50, 40);

    // Summary Section
    doc.setFontSize(16);
    doc.text('Summary', 20, 50);

    const numberOfProjects = projects.length;
    const numberOfFolders = projects.reduce(
      (total, project) => total + project.folders.length,
      0
    );

    doc.setFontSize(12);
    doc.text(`Total Projects: ${numberOfProjects}`, 20, 60);
    doc.text(`Total Folders: ${numberOfFolders}`, 20, 70);

    // Table Data Preparation
    const tableData = [];
    projects.forEach((project) => {
      tableData.push([project.name, '', new Date(project.createdAt).toLocaleDateString()]); // Assuming 'createdAt' is available for projects
      project.folders.forEach((folder) => {
        tableData.push(['', folder.name, new Date(folder.createdAt).toLocaleDateString()]); // Assuming 'createdAt' is available for folders
      });
    });

    // Adding Table
    doc.autoTable({
      head: [['Project Name', 'Folder Name', 'Created Date']],
      body: tableData,
      startY: 80, // To prevent overlap with the summary
    });

    // Footer with Page Numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);
    }

    // Save the PDF
    doc.save('project-folder-report.pdf');
  };
};

  

  const navigateToHome = () => {
    navigate(`/`);
  };

  return (
    <Container>
      <Row className="g-4">
        {/* Display all projects */}
        {projects.map((project) => (
          <Col md={4} key={project._id}>
            <Card className="shadow-sm" style={{ position: 'relative', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
              <Card.Body>
                <h5 className="text-primary">{project.name}</h5>
                <Button variant="outline-secondary" className="me-2 btn-sm" onClick={() => { setEditProjectId(project._id); setShowProjectModal(true); }}>
                  <FaEdit /> Edit
                </Button>
                <Button variant="outline-danger" className="btn-sm" onClick={() => handleDeleteProject(project._id)}>
                  <FaTrash /> Delete
                </Button>
                <Button
                  variant="outline-primary"
                  className="btn-sm"
                  style={{ position: 'absolute', top: '10px', right: '10px' }}
                  onClick={() => { setActiveProjectId(project._id); setShowFolderModal(true); }}
                >
                  <FaFolderPlus /> Add Folder
                </Button>

                <div className="mt-3">
                  <h6 className="text-secondary">Folders:</h6>
                  {project.folders && project.folders.map((folder) => (
                    <Card key={folder._id} className="mb-2 border-0 shadow-sm" style={{ backgroundColor: '#ffffff', borderRadius: '8px' }}>
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                          <span>{folder.name}</span>
                          <div>
                            <Button variant="outline-secondary" className="btn-sm me-2" onClick={() => { setEditFolderId(folder._id); setShowFolderModal(true); }}>
                              <FaEdit />
                            </Button>
                            <Button variant="outline-danger" className="btn-sm me-2" onClick={() => handleDeleteFolder(folder._id, project._id)}>
                              <FaTrash />
                            </Button>
                            <Button variant="outline-success" className="btn-sm" onClick={() => navigateToHome(folder._id)}>
                              Analyze
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {/* Add new project */}
        <Col md={4}>
          <Card className="d-flex justify-content-center align-items-center shadow-sm" style={{ height: '150px', backgroundColor: '#e3f2fd', borderRadius: '10px' }}>
            <Button variant="primary" onClick={() => setShowProjectModal(true)} style={{ fontSize: '50px', borderRadius: '50%' }}>
              <FaPlus />
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Project Modal */}
      <Modal show={showProjectModal} onHide={() => setShowProjectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editProjectId ? 'Edit Project' : 'Create Project'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProjectModal(false)}>Close</Button>
          <Button variant="primary" onClick={editProjectId ? () => handleUpdateProject(editProjectId) : handleCreateProject}>
            {editProjectId ? 'Save Changes' : 'Create Project'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Folder Modal */}
      <Modal show={showFolderModal} onHide={() => setShowFolderModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editFolderId ? 'Edit Folder' : 'Create Folder'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Folder Name</Form.Label>
            <Form.Control
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Enter folder name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFolderModal(false)}>Close</Button>
          <Button variant="primary" onClick={editFolderId ? () => handleUpdateFolder(editFolderId, activeProjectId) : () => handleCreateFolder(activeProjectId)}>
            {editFolderId ? 'Save Changes' : 'Create Folder'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Button to generate PDF */}
      <div className="mt-4">
        <Button onClick={generatePDF} variant="success">
          Generate PDF
        </Button>
      </div>
    </Container>
  );
};

export default ProjectManagement;

import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Modal, Row, Col, Container } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaFolderPlus, FaFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf'; // Import the jsPDF library

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [editProjectId, setEditProjectId] = useState(null);
  const [editFolderId, setEditFolderId] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [report, setReport] = useState(null); // For storing report data
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    // Mock data for the example. Replace this with your real API call
    const data = {
      success: true,
      data: [
        {
          _id: 'project1',
          name: 'Project Alpha',
          folders: [
            { _id: 'folder1', name: 'Folder 1' },
            { _id: 'folder2', name: 'Folder 2' },
          ],
        },
        {
          _id: 'project2',
          name: 'Project Beta',
          folders: [{ _id: 'folder3', name: 'Folder A' }],
        },
      ],
    };

    if (data.success) {
      setProjects(data.data);
    }
  };

  // Handle creating a new project
  const handleCreateProject = () => {
    if (!projectName) return;

    const newProject = {
      _id: Date.now().toString(), // Generate a unique id for the new project
      name: projectName,
      folders: [], // Empty folders initially
    };

    setProjects([...projects, newProject]);
    setProjectName('');
    setShowProjectModal(false);
  };

  // Handle updating an existing project
  const handleUpdateProject = (id) => {
    if (!projectName) return;

    setProjects(projects.map(p => (p._id === id ? { ...p, name: projectName } : p)));
    setProjectName('');
    setEditProjectId(null);
    setShowProjectModal(false);
  };

  // Handle deleting a project
  const handleDeleteProject = (id) => {
    setProjects(projects.filter(p => p._id !== id));
  };

  // Handle creating a new folder in a project
  const handleCreateFolder = (projectId) => {
    if (!newFolderName) return;

    const newFolder = { _id: Date.now().toString(), name: newFolderName };
    setProjects(
      projects.map(p =>
        p._id === projectId ? { ...p, folders: [...p.folders, newFolder] } : p
      )
    );
    setNewFolderName('');
    setShowFolderModal(false);
  };

  // Handle updating an existing folder
  const handleUpdateFolder = (id, projectId) => {
    if (!newFolderName) return;

    setProjects(
      projects.map(p =>
        p._id === projectId
          ? {
              ...p,
              folders: p.folders.map(f =>
                f._id === id ? { ...f, name: newFolderName } : f
              )
            }
          : p
      )
    );
    setNewFolderName('');
    setEditFolderId(null);
    setShowFolderModal(false);
  };

  // Handle deleting a folder
  const handleDeleteFolder = (id, projectId) => {
    setProjects(
      projects.map(p =>
        p._id === projectId
          ? { ...p, folders: p.folders.filter(f => f._id !== id) }
          : p
      )
    );
  };

  // Report Generation Logic (Mock Report)
  const handleGenerateReport = () => {
    const reportData = projects.map(project => ({
      projectName: project.name,
      folders: project.folders.map(folder => folder.name),
    }));
    setReport(reportData);
    alert('Monthly report generated successfully!');
  };

  // Function to handle PDF generation using jsPDF
  const handlePrint = () => {
    if (!report || report.length === 0) {
      alert('No report data available!');
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('Monthly Folder Usage Report', 10, 10);

    report.forEach((project, index) => {
      doc.setFontSize(16);
      doc.text(`Project: ${project.projectName}`, 10, 20 + index * 20);
      project.folders.forEach((folder, folderIndex) => {
        doc.setFontSize(12);
        doc.text(`Folder: ${folder}`, 20, 30 + index * 20 + folderIndex * 10);
      });
    });

    doc.save('Folder_Usage_Report.pdf');
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

        {/* Generate Report Button */}
        <Col md={12} className="text-center">
          <Button variant="info" onClick={handleGenerateReport} style={{ marginTop: '20px', marginRight: '10px' }}>
            <FaFileAlt /> Generate Monthly Report
          </Button>
          <Button variant="success" onClick={handlePrint} style={{ marginTop: '20px' }}>
            <FaFileAlt /> Print PDF
          </Button>
        </Col>
      </Row>

      {/* Report Modal (If report is generated) */}
      {report && (
        <Modal show={true} onHide={() => setReport(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Monthly Usage Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h3>Folder Usage Report</h3>
              {report.map((project, index) => (
                <div key={index}>
                  <h4>Project: {project.projectName}</h4>
                  <ul>
                    {project.folders.map((folder, i) => (
                      <li key={i}>{folder}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setReport(null)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}

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
    </Container>
  );
};

export default ProjectManagement;

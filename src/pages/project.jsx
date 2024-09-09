import React, { useState } from 'react';
import { FaFolder, FaTrash, FaEdit } from 'react-icons/fa'; // Import icons
import { ToastContainer, toast } from 'react-toastify'; // Import Toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

const FileManagementSystem = () => {
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [renameFolderName, setRenameFolderName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(null);

  const createFolder = () => {
    if (newFolderName.trim()) {
      setFolders([...folders, { name: newFolderName, subfolders: [] }]);
      setNewFolderName('');
    }
  };

  const openFolder = (folder) => {
    setCurrentFolder(folder);
  };

  const renameFolder = (folder) => {
    const newName = prompt("Enter new folder name", folder.name);
    if (newName && newName.trim()) {
      const updatedFolders = folders.map(f =>
        f.name === folder.name ? { ...f, name: newName } : f
      );
      setFolders(updatedFolders);
      toast.success(`Folder renamed to "${newName}"`);
    } else {
      toast.error("Rename operation cancelled");
    }
  };

  const deleteFolder = (folderToDelete) => {
    const updatedFolders = folders.filter(folder => folder.name !== folderToDelete.name);
    setFolders(updatedFolders);
    toast.info(`Folder "${folderToDelete.name}" deleted`);
  };

  return (
    <div>
      <h1>Professional File Management System</h1>

      {/* Input to create a new folder */}
      <div>
        <input
          type="text"
          placeholder="New Folder Name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <button onClick={createFolder}>Create Folder</button>
      </div>

      {/* Folder List */}
      <div>
        {currentFolder ? (
          <div>
            <h2>Inside {currentFolder.name}</h2>
            <button onClick={() => setCurrentFolder(null)}>Back</button>
            {currentFolder.subfolders.length === 0 && <p>No subfolders</p>}
            <div>
              {currentFolder.subfolders.map((subfolder, index) => (
                <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <FaFolder size={20} /> {/* Folder icon */}
                  <span>{subfolder.name}</span>
                  <FaEdit
                    size={16}
                    style={{ cursor: 'pointer' }}
                    onClick={() => renameFolder(subfolder)}
                  /> {/* Rename icon */}
                  <FaTrash
                    size={16}
                    style={{ cursor: 'pointer' }}
                    onClick={() => deleteFolder(subfolder)}
                  /> {/* Delete icon */}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2>Root Folders</h2>
            {folders.length === 0 && <p>No folders</p>}
            <div>
              {folders.map((folder, index) => (
                <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <FaFolder
                    size={20}
                    style={{ cursor: 'pointer' }}
                    onClick={() => openFolder(folder)}
                  /> {/* Folder icon */}
                  <span onClick={() => openFolder(folder)} style={{ cursor: 'pointer' }}>
                    {folder.name}
                  </span>
                  <FaEdit
                    size={16}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                    onClick={() => renameFolder(folder)}
                  /> {/* Rename icon */}
                  <FaTrash
                    size={16}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                    onClick={() => deleteFolder(folder)}
                  /> {/* Delete icon */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default FileManagementSystem;

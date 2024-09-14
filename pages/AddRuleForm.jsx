import React, { useState } from "react";

const AddRuleForm = ({ addNewRule, setShowForm }) => {
  const [ruleName, setRuleName] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [threshold, setThreshold] = useState("");
  const [status, setStatus] = useState("active"); // Default to active

  const handleAdd = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    const newRule = { ruleName, description, condition, threshold, status };
    console.log("Adding new rule: ", newRule); // Debug log

    try {
      const response = await fetch("http://localhost:4000/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRule),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response from backend: ", data); // Debug log
      addNewRule(data); // Update UI with new rule
      setShowForm(false);
    } catch (error) {
      console.error("Error adding rule", error);
    }
  };

  // Inline styles
  const formContainerStyle = {
    backgroundColor: "white",
    padding: "20px",
    marginTop: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "30px auto",
  };

  const formGroupStyle = {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  };

  const labelStyle = {
    fontSize: "16px",
    marginBottom: "5px",
    color: "#555",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    transition: "border-color 0.3s ease",
    width: "100%",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
  };

  const addButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#28a745",
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#dc3545",
  };

  return (
    <div style={formContainerStyle}>
      <h3 style={{ textAlign: "center", fontSize: "24px", color: "#333" }}>Add New Rule</h3>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Rule Name:</label>
        <input
          type="text"
          placeholder="Enter rule name"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Description:</label>
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Condition:</label>
        <input
          type="text"
          placeholder="Enter condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Threshold:</label>
        <input
          type="number"
          placeholder="Enter Threshold"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={inputStyle}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div>
        <button onClick={handleAdd} style={addButtonStyle}>
          Add Rule
        </button>
        <button onClick={() => setShowForm(false)} style={cancelButtonStyle}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AddRuleForm;

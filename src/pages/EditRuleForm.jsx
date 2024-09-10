import React, { useState, useEffect } from "react";

const EditRuleForm = ({ rule, updateRule, cancelEdit }) => {
  const [ruleName, setRuleName] = useState(rule.ruleName);
  const [description, setDescription] = useState(rule.description);
  const [condition, setCondition] = useState(rule.condition);
  const [threshold, setThreshold] = useState(rule.threshold);
  const [status, setStatus] = useState(rule.status);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedRule = { ruleName, description, condition, threshold, status };
    updateRule(rule._id, updatedRule); // Call the update function
  };

  useEffect(() => {
    setRuleName(rule.ruleName);
    setCondition(rule.condition);
    setThreshold(rule.threshold);
    setDescription(rule.description);
    setStatus(rule.status);
  }, [rule]);

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

  const formHeaderStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
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

  const selectStyle = {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
    transition: "background-color 0.3s ease",
  };

  const updateButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#28a745",
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#dc3545",
  };

  return (
    <div style={formContainerStyle}>
      <form onSubmit={handleUpdate}>
        <h2 style={formHeaderStyle}>Edit Rule</h2>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Rule Name:</label>
          <input
            type="text"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Condition:</label>
          <input
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Threshold:</label>
          <input
            type="number"
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
            style={selectStyle}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="submit" style={updateButtonStyle}>
            Update Rule
          </button>
          <button type="button" onClick={cancelEdit} style={cancelButtonStyle}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRuleForm;

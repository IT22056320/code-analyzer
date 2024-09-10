import React, { useState, useEffect } from "react";
import AddRuleForm from "./AddRuleForm";
import EditRuleForm from "./EditRuleForm"; // Ensure the correct relative path
import { useNavigate } from "react-router-dom";

const ManageRules = () => {
  const [rules, setRules] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const [showForm, setShowForm] = useState(false);
  const [editingRule, setEditingRule] = useState(null); // Track the rule being edited
  const navigate = useNavigate();

  // Fetch rules from the backend with optional search term
  const fetchRules = async (searchTerm = "") => {
    try {
      const response = await fetch(`http://localhost:4000/api/?searchTerm=${searchTerm}`);
      if (!response.ok) {
        throw new Error("Error fetching rules");
      }
      const data = await response.json();
      setRules(data);
    } catch (error) {
      console.error("Error fetching rules:", error);
    }
  };

  // Fetch rules on initial render
  useEffect(() => {
    fetchRules();
  }, []);

  // Handle search input change and fetch filtered results
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term state
    fetchRules(e.target.value); // Fetch filtered rules based on search term
  };

  // Add rule and re-fetch rules after adding
  const addNewRule = async (rule) => {
    try {
      const response = await fetch("http://localhost:4000/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rule),
      });
      if (!response.ok) {
        throw new Error("Error adding rule");
      }
      fetchRules(); // Fetch updated rules after adding
      setShowForm(false);
    } catch (error) {
      console.error("Error adding rule", error);
    }
  };

  // Toggle rule status
  const toggleStatus = async (id) => {
    try {
      const response = await fetch(`/api/toggleStatus/${id}`, {
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error("Error toggling status");
      }
      const updatedRule = await response.json();
      setRules(
        rules.map((rule) =>
          rule._id === id ? { ...rule, status: updatedRule.status } : rule
        )
      );
    } catch (error) {
      console.error("Error toggling status", error);
    }
  };

  // Handle rule edit
  const updateRule = async (id, updatedRule) => {
    try {
      const response = await fetch(`http://localhost:4000/api/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRule),
      });
      if (!response.ok) {
        throw new Error("Error updating rule");
      }
      const data = await response.json();
      setRules(rules.map((rule) => (rule._id === id ? data : rule)));
      setEditingRule(null); // Close the edit form after update
    } catch (error) {
      console.error("Error updating rule", error);
    }
  };

  // Handle rule edit click
  const handleUpdateClick = (rule) => {
    setEditingRule(rule); // Set the rule to be edited
  };

  // Handle rule deletion
  const deleteRule = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting rule");
      }
      fetchRules(); // Re-fetch rules after deletion
    } catch (error) {
      console.error("Error deleting rule", error);
    }
  };

  const handleOutput = () => {
    navigate("/manage-output");
  };

  // Inline styles
  const containerStyle = {
    maxWidth: "1000px",
    margin: "50px auto",
  };

  const topBarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  };

  const buttonStyle = {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const searchInputStyle = {
    padding: "8px",
    width: "300px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    backgroundColor: "white", // Add white background to the table
    color: "black", // Make the text black
  };

  const tableCellStyle = {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <h1>Manage Rules</h1>
      <div style={topBarStyle}>
        <button style={buttonStyle} onClick={() => setShowForm(true)}>
          Add Rule
        </button>
        <input
          type="text"
          style={searchInputStyle}
          placeholder="Search by Rule Name or Rule ID"
          value={searchTerm}
          onChange={handleSearchChange} // Fetch filtered data as user types
        />
        <button style={buttonStyle} onClick={handleOutput}>
          Analyze Output
        </button>
      </div>

      {showForm && (
        <AddRuleForm addNewRule={addNewRule} setShowForm={setShowForm} />
      )}

      <h2>Existing Rules</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableCellStyle}>RuleID</th>
            <th style={tableCellStyle}>Rule Name</th>
            <th style={tableCellStyle}>Description</th>
            <th style={tableCellStyle}>Condition</th>
            <th style={tableCellStyle}>Threshold</th>
            <th style={tableCellStyle}>Status</th>
            <th style={tableCellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <tr key={rule._id}>
              <td style={tableCellStyle}>{rule.ruleID}</td> {/* Display RuleID */}
              <td style={tableCellStyle}>{rule.ruleName}</td>
              <td style={tableCellStyle}>{rule.description}</td>
              <td style={tableCellStyle}>{rule.condition}</td>
              <td style={tableCellStyle}>{rule.threshold}</td>
              <td style={tableCellStyle}>
                <button
                  onClick={() => toggleStatus(rule._id)}
                  style={{
                    backgroundColor: rule.status === "active" ? "green" : "red",
                    color: "white",
                    borderRadius: "4px",
                    border: "none",
                    padding: "5px 10px",
                  }}
                >
                  {rule.status === "active" ? "Active" : "Inactive"}
                </button>
              </td>
              <td style={tableCellStyle}>
                <button style={buttonStyle} onClick={() => handleUpdateClick(rule)}>Update</button>
                <button style={buttonStyle} onClick={() => deleteRule(rule._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingRule && (
        <EditRuleForm
          rule={editingRule}
          updateRule={updateRule}
          cancelEdit={() => setEditingRule(null)}
        />
      )}
    </div>
  );
};

export default ManageRules;

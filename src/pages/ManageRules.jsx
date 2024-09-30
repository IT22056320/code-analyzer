import React, { useState, useEffect } from "react";
import AddRuleForm from "./AddRuleForm";
import EditRuleForm from "./EditRuleForm"; // Ensure the correct relative path
import { useNavigate } from "react-router-dom";

const ManageRules = () => {
  const [rules, setRules] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const [showForm, setShowForm] = useState(false);
  const [editingRule, setEditingRule] = useState(null); // Track the rule being edited
  const [viewingRule, setViewingRule] = useState(null); // State for viewing a rule
  const [showPopup, setShowPopup] = useState(false); // State for controlling popup

  const navigate = useNavigate();

  // Fetch rules from the backend with optional search term
  const fetchRules = async (searchTerm = "") => {
    try {
      const response = await fetch(`http://localhost:4000/api/?searchTerm=${searchTerm}`);
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

  // **Change:** Update addNewRule to append the new rule to the existing rules
  const addNewRule = (newRule) => {
    setRules((prevRules) => [...prevRules, newRule]); // Append the new rule to the state
  };

  // Handle search input change and fetch filtered results
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term state
    fetchRules(e.target.value); // Fetch filtered rules based on search term
  };

  // Toggle rule status
  const toggleStatus = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/toggleStatus/${id}`, {
        method: "PUT",
      });
      const data = await response.json();
      setRules(
        rules.map((rule) =>
          rule._id === id ? { ...rule, status: data.status } : rule
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
      const data = await response.json();
      setRules(rules.map((rule) => (rule._id === id ? data : rule)));
      setEditingRule(null); // Close the edit form after update
    } catch (error) {
      console.error("Error updating rule:", error);
    }
  };

  // Handle rule edit click
  const handleUpdateClick = (rule) => {
    setEditingRule(rule); // Set the rule to be edited
  };

  // Handle rule deletion
  const deleteRule = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/${id}`, {
        method: "DELETE",
      });
      fetchRules(); // Re-fetch rules after deletion
    } catch (error) {
      console.error("Error deleting rule", error);
    }
  };

  const handleViewClick = (rule) => {
    setViewingRule(rule); // Set the rule to view
    setShowPopup(true); // Show the popup
  };

  const handleOutput = () => {
    // Navigate to the new page and pass the rules as state
    navigate("/manage-output", { state: { rules } });
  };

  return (
    <div className="manage-rules-container">
      <h1>Manage Rules</h1>
      <div className="top-bar">
        <button className="add-rule-btn" onClick={() => setShowForm(true)}>
          Add Code Rule
        </button>
        <input
          type="text"
          className="search-input"
          placeholder="Search by Rule Name or Rule ID"
          value={searchTerm}
          onChange={handleSearchChange} // Fetch filtered data as user types
        />
        <button className="analyze-output-btn" onClick={handleOutput}>
          Analyze Output
        </button>
      </div>

      {showForm && (
        <AddRuleForm addNewRule={addNewRule} setShowForm={setShowForm} />
      )}

      <h2>Existing Rules</h2>

      <table className="rules-table">
        <thead>
          <tr>
            <th>RuleID</th>
            <th>Rule Name</th>
            <th>Description</th>
            <th>Condition</th>
            <th>Threshold</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <tr key={rule._id}>
              <td>{rule.ruleID}</td> {/* Display RuleID */}
              <td>{rule.ruleName}</td>
              <td>{rule.description}</td>
              <td>{rule.condition}</td>
              <td>{rule.threshold}</td>
              <td>
                <button
                  onClick={() => toggleStatus(rule._id)}
                  style={{
                    backgroundColor: rule.status === "active" ? "green" : "red",
                    color: "white",
                  }}
                >
                  {rule.status === "active" ? "Active" : "Inactive"}
                </button>
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    className="view-btn"
                    onClick={() => handleViewClick(rule)}
                  >
                    View
                  </button>
                  <button
                    className="update-btn"
                    onClick={() => handleUpdateClick(rule)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteRule(rule._id)}
                  >
                    Delete
                  </button>
                </div>
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
      {showPopup && viewingRule && (
        <div className="popup">
          <div className="popup-content">
            <h2>View Rule</h2>
            <p>
              <strong>Rule Name:</strong> {viewingRule.ruleName}
            </p>
            <p>
              <strong>Description:</strong> {viewingRule.description}
            </p>
            <p>
              <strong>Condition:</strong> {viewingRule.condition}
            </p>
            <p>
              <strong>Threshold:</strong> {viewingRule.threshold}
            </p>
            <p>
              <strong>Status:</strong> {viewingRule.status}
            </p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRules;

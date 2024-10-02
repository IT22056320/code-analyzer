import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import the jspdf-autotable library for generating table-based PDFs
import { Pie } from "react-chartjs-2";
import { Modal, Button } from "react-bootstrap"; // Modal for the pie chart
import logo from "../assets/logo.png"; // Assuming your logo is here
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const OutputAnalysis = () => {
  const location = useLocation(); // Use location to pass data from the previous page
  const { rules } = location.state; // Access the rules data passed from ManageRules.js

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  // Count active and inactive rules
  const activeRules = rules.filter((rule) => rule.status === "active").length;
  const inactiveRules = rules.length - activeRules;

  // Data for Pie Chart
  const pieData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        label: "Rule Status Distribution",
        data: [activeRules, inactiveRules],
        backgroundColor: ["#50C878", "#FF2400"],
        borderColor: ["#36A2EB", "#FF6384"],
        borderWidth: 1,
      },
    ],
  };

  // Function to generate PDF report
  const generatePDF = async () => {
    try {
      const response = await fetch(logo);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        const base64data = reader.result;

        const doc = new jsPDF();
        const tableColumn = [
          "Rule ID",
          "Rule Name",
          "Description",
          "Condition",
          "Threshold",
          "Status",
        ];
        const tableRows = [];

        // Loop through the rules to create rows for the PDF table
        rules.forEach((rule) => {
          const ruleData = [
            rule.ruleID,
            rule.ruleName,
            rule.description,
            rule.condition,
            rule.threshold,
            rule.status,
          ];
          tableRows.push(ruleData);
        });

        // Add the company logo, name, and report title after the image is loaded
        doc.addImage(base64data, "PNG", 10, 10, 30, 30); // Adding logo
        doc.setFontSize(22);
        doc.text("LogicLens", 50, 20); // Company name
        doc.setFontSize(16);
        doc.text("Rules Report", 50, 30); // Report title

        // Move the table down to avoid overlap with the header
        doc.autoTable(tableColumn, tableRows, { startY: 50 });
        doc.save("rules_report.pdf");
      };
    } catch (error) {
      console.error("Error fetching or processing the image:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#4A90E2" }}>Rules Output</h1>
      <table
        style={{
          width: "95%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #000000", padding: "8px" }}>RuleID</th>
            <th style={{ border: "1px solid #000000", padding: "8px" }}>Rule Name</th>
            <th style={{ border: "1px solid #000000", padding: "8px" }}>Description</th>
            <th style={{ border: "1px solid #000000", padding: "8px" }}>Condition</th>
            <th style={{ border: "1px solid #000000", padding: "8px" }}>Threshold</th>
            <th style={{ border: "1px solid #000000", padding: "8px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <tr key={rule._id}>
              <td style={{ border: "1px solid #000000", padding: "8px" }}>{rule.ruleID}</td>
              <td style={{ border: "1px solid #000000", padding: "8px" }}>{rule.ruleName}</td>
              <td style={{ border: "1px solid #000000", padding: "8px" }}>{rule.description}</td>
              <td style={{ border: "1px solid #000000", padding: "8px" }}>{rule.condition}</td>
              <td style={{ border: "1px solid #000000", padding: "8px" }}>{rule.threshold}</td>
              <td
                style={{
                  border: "1px solid #000000",
                  padding: "8px",
                  fontWeight: "bold",
                  color: rule.status === "active" ? "green" : "red",
                }}
              >
                {rule.status === "active" ? "Active" : "Inactive"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: "left", marginTop: "30px" }}>
        <button
          onClick={generatePDF}
          style={{
            backgroundColor: "#111f6a",
            color: "white",
            marginLeft: "10px",
            padding: "6px 20px",
            border: "2px solid #111f6a",
            cursor: "pointer",
            fontSize: "16px",
            borderRadius: "5px",
            transition: "all 0.6 ease-in-out",
          }}
        >
          Generate PDF Report
        </button>

        <button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: "#36A2EB",
            color: "white",
            marginLeft: "10px",
            padding: "6px 20px",
            border: "2px solid #36A2EB",
            cursor: "pointer",
            fontSize: "16px",
            borderRadius: "5px",
            transition: "all 0.6 ease-in-out",
          }}
        >
          Show Status
        </button>

        <button
          onClick={() => navigate("/manage-rules")}
          style={{
            borderColor: "#111f6a",
            color: "black",
            marginLeft: "10px",
            padding: "6px 20px",
            border: "2px solid #111f6a",
            cursor: "pointer",
            fontSize: "16px",
            borderRadius: "5px",
            transition: "all 0.6 ease-in-out",
          }}
        >
          Back
        </button>
      </div>

      {/* Modal to show pie chart */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rule Status Distribution</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Pie
            data={pieData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Active vs Inactive Rules",
                },
              },
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OutputAnalysis;

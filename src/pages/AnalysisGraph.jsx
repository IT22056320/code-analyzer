import React, { useRef } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../assets/logo.png'; // Assuming your logo is here

// Import necessary components from Chart.js and register them
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // For pie chart
  Title,
  Tooltip,
  Legend
);

const AnalysisGraph = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { analysisResult } = location.state || {}; // Access analysisResult passed via navigate
  const pdfRef = useRef(); // Ref to capture the entire component for PDF generation

  if (!analysisResult) {
    return (
      <Container>
        <h2>No analysis data available</h2>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </Container>
    );
  }

  // Data for Bar chart (LOC, LLOC, SLOC, Comments)
  const barData = {
    labels: ['LOC', 'LLOC', 'SLOC', 'Comments'],
    datasets: [
      {
        label: 'Code Metrics',
        data: [analysisResult.loc, analysisResult.lloc, analysisResult.sloc, analysisResult.comments],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Data for Comment Percentage Pie Chart
  const commentPieData = {
    labels: ['Comments %', 'Other'],
    datasets: [
      {
        label: 'Comment Percentage',
        data: [analysisResult.commentPercentage, 100 - analysisResult.commentPercentage],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Data for Maintainability Index Pie Chart
  const maintainabilityPieData = {
    labels: ['Maintainability Index', 'Other'],
    datasets: [
      {
        label: 'Maintainability Index',
        data: [analysisResult.maintainabilityIndex, 100 - analysisResult.maintainabilityIndex],
        backgroundColor: ['rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Data for Cyclomatic Complexity Pie Chart
  const cyclomaticComplexityPieData = {
    labels: ['Cyclomatic Complexity', 'Other'],
    datasets: [
      {
        label: 'Cyclomatic Complexity',
        data: [analysisResult.cyclomaticComplexity, 100 - analysisResult.cyclomaticComplexity],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 205, 86, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 205, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const generatePdf = () => {
    // Hide the buttons while generating the PDF
    const buttons = document.querySelectorAll('.exclude-from-pdf');
    buttons.forEach(button => {
      button.style.display = 'none';
    });

    html2canvas(pdfRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add the company logo, name, and report title
      pdf.addImage(logo, 'PNG', 10, 10, 30, 30); // Adding logo
      pdf.setFontSize(22);
      pdf.text('LogicLens', 50, 20); // Company name
      pdf.setFontSize(16);
      pdf.text('Complexity Analysis Report', 50, 30); // Report title

      // Move the image down to avoid overlap with the header
      pdf.addImage(imgData, 'PNG', 10, 50, imgWidth, imgHeight);
      pdf.save('analysis-results.pdf');

      // Show the buttons again after PDF is generated
      buttons.forEach(button => {
        button.style.display = 'inline-block';
      });
    });
  };

  return (
    <Container ref={pdfRef}>
      <h2>Code Analysis Metrics</h2>
      
      {/* Row for Bar Charts */}
      <Row className="mb-5">
        <Col md={12}>
          <h4>LOC, LLOC, SLOC, Comments</h4>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'LOC, LLOC, SLOC, Comments' },
              },
            }}
          />
        </Col>
      </Row>

      {/* Row for Pie Charts */}
      <Row>
        <Col md={4}>
          <h4>Comment Percentage</h4>
          <Pie
            data={commentPieData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Comment Percentage' },
              },
            }}
          />
        </Col>
        <Col md={4}>
          <h4>Maintainability Index</h4>
          <Pie
            data={maintainabilityPieData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Maintainability Index' },
              },
            }}
          />
        </Col>
        <Col md={4}>
          <h4>Cyclomatic Complexity</h4>
          <Pie
            data={cyclomaticComplexityPieData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Cyclomatic Complexity' },
              },
            }}
          />
        </Col>
      </Row>

      {/* Add class 'exclude-from-pdf' to exclude these buttons from PDF */}
      <Button className="exclude-from-pdf" onClick={generatePdf} style={{ marginTop: '20px' }}>
        Download PDF
      </Button>
      <Button className="exclude-from-pdf" onClick={() => navigate(-1)} style={{ marginTop: '20px', marginLeft: '10px' }}>
        Go Back
      </Button>
    </Container>
  );
};

export default AnalysisGraph;

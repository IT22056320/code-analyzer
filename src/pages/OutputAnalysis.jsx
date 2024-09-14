
import React  from "react";

const OutputAnalysis = () => {

  return (
    <div>
      <h1>Analysis Output</h1>

      <h2>
        Rule Compliance Summary: A summary of the code's compliance with the
        custom rules, displaying which rules were followed and which were
        violated. Mark each rule as "Pass" or "Fail." Error and Warning
        Generation: Generate specific errors or warnings when rules are
        violated. For instance, if a threshold for code complexity is exceeded,
        display a warning.
      </h2>

      <button>Generate Report</button>
    </div>
  );
};

export default OutputAnalysis;

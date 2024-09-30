import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  ruleName: Yup.string().required("Rule name is required."),
  description: Yup.string().required("Description is required."),
  condition: Yup.string().required("Condition is required."),
  threshold: Yup.number().required("Threshold is required."),
});

const AddRuleForm = ({ addNewRule, setShowForm }) => {
  const handleAdd = async (values, { resetForm }) => {
    console.log("Adding new rule: ", values); // Debug log

    try {
      const response = await fetch("http://localhost:4000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const responseData = await response.json();
      console.log("Response from backend: ", responseData); // Debug log

      // Pass only the newly created rule to the parent component
      if (responseData.success) {
        addNewRule(responseData.newRule); // Update UI with new rule
      }

      setShowForm(false);
      resetForm(); // Clear the form after submission
    } catch (error) {
      console.error("Error adding rule", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add New Rule</h3>
        <Formik
          initialValues={{
            ruleName: "",
            description: "",
            condition: "",
            threshold: "",
            status: "active", // Default status
          }}
          validationSchema={validationSchema}
          onSubmit={handleAdd}
        >
          {({ isValid, dirty }) => (
            <Form>
              <div style={{ marginBottom: "20px" }}>
                <label>Rule Name:</label>
                <Field
                  type="text"
                  name="ruleName"
                  placeholder="Enter rule name"
                  style={{ display: "block", marginBottom: "5px" }}
                />
                <ErrorMessage
                  name="ruleName"
                  component="div"
                  className="error-message"
                  style={{ color: "red", marginTop: "-5px", fontSize: "0.9em" }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label>Description:</label>
                <Field
                  type="text"
                  name="description"
                  placeholder="Enter description"
                  style={{ display: "block", marginBottom: "5px" }}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error-message"
                  style={{ color: "red", marginTop: "-5px", fontSize: "0.9em" }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label>Condition:</label>
                <Field
                  type="text"
                  name="condition"
                  placeholder="Enter condition"
                  style={{ display: "block", marginBottom: "5px" }}
                />
                <ErrorMessage
                  name="condition"
                  component="div"
                  className="error-message"
                  style={{ color: "red", marginTop: "-5px", fontSize: "0.9em" }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label>Threshold:</label>
                <Field
                  type="number"
                  name="threshold"
                  placeholder="Enter threshold"
                  style={{ display: "block", marginBottom: "5px" }}
                />
                <ErrorMessage
                  name="threshold"
                  component="div"
                  className="error-message"
                  style={{ color: "red", marginTop: "-5px", fontSize: "0.9em" }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label>Status:</label>
                <Field as="select" name="status" style={{ display: "block", marginBottom: "5px" }}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Field>
              </div>

              <button
                type="submit"
                className="add-sub-btn"
                disabled={!(isValid && dirty)} // Disable button if the form is invalid or unchanged
              >
                Add Rule
              </button>
              <button
                type="button"
                className="cancel-sub-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddRuleForm;

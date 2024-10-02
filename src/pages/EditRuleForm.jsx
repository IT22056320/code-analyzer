import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

//comment testinggg
// Validation schema using Yup
const validationSchema = Yup.object().shape({
  ruleName: Yup.string().required("Rule name is required."),
  description: Yup.string().required("Description is required."),
  condition: Yup.string().required("Condition is required."),
  threshold: Yup.number().required("Threshold is required."),
});

const EditRuleForm = ({ rule, updateRule, cancelEdit }) => {
  const handleUpdate = async (values, { setSubmitting }) => {
    const updatedRule = { ...values };

    try {
      // Perform the update using fetch API
      const response = await fetch(`http://localhost:4000/api/${rule._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRule),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      updateRule(rule._id, data); // Call the update function passed as a prop
      setSubmitting(false); // Enable the submit button again
    } catch (error) {
      console.error("Error updating rule:", error);
      setSubmitting(false); // Enable the submit button again
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Rule</h2>
        <Formik
          initialValues={{
            ruleName: rule.ruleName,
            description: rule.description,
            condition: rule.condition,
            threshold: rule.threshold,
            status: rule.status,
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          {({ isValid, dirty, isSubmitting }) => (
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
                <Field
                  as="select"
                  name="status"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Field>
              </div>

              <button
                type="submit"
                className="update-sub-btn"
                disabled={isSubmitting || !(isValid && dirty)} // Disable if the form is invalid or unchanged
              >
                {isSubmitting ? "Updating..." : "Update Rule"}
              </button>
              <button
                type="button"
                className="update-cancel-sub-btn"
                onClick={cancelEdit}
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

export default EditRuleForm;

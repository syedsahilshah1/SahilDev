import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./App.css";

const AVAILABLE_TECH = [
  "React.js",
  "Next.js",
  "Firebase / Firestore",
  "AI / OpenAI / Gemini API",
  "Node.js & Express",
  "Tailwind CSS / Vanilla CSS",
  "MongoDB / SQL",
  "Mobile Apps (Flutter/React Native)",
  "Python / Scripting",
  "UI/UX Design"
];

const BUDGET_RANGES = [
  "Under $100 (Quick assistance & bug fixes)",
  "$100 - $300 (Standard single-page app / basic prototype)",
  "$300 - $800 (Full-stack web application)",
  "$800 - $1500+ (Complex web platform / enterprise custom solution)"
];

const ProjectRequest = ({ preselectedType }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "student",
    selectedTech: [],
    customTech: "",
    description: "",
    budget: BUDGET_RANGES[0],
    deadline: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Sync with selected service from parent
  useEffect(() => {
    if (preselectedType) {
      setFormData((prev) => ({ ...prev, projectType: preselectedType }));
    }
  }, [preselectedType]);

  const handleTechChange = (tech) => {
    setFormData((prev) => {
      const selected = prev.selectedTech.includes(tech)
        ? prev.selectedTech.filter((t) => t !== tech)
        : [...prev.selectedTech, tech];
      return { ...prev, selectedTech: selected };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.description.trim() || !formData.deadline) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderData = {
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
        selectedCriteria: [
          ...formData.selectedTech,
          ...(formData.customTech ? [formData.customTech] : [])
        ],
        budget: formData.budget,
        deadline: formData.deadline,
        description: formData.description,
        status: "Pending",
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, "orders"), orderData);

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        projectType: "student",
        selectedTech: [],
        customTech: "",
        description: "",
        budget: BUDGET_RANGES[0],
        deadline: ""
      });
    } catch (err) {
      console.error("Error submitting project request: ", err);
      setError("Something went wrong while submitting your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="request-project">
      <div className="animate">
        <h2>Request a Project / Service</h2>
        <p className="section-subtitle">
          Describe your problem, select your criteria, and receive a customized quote and implementation timeline.
        </p>

        <div className="request-container">
          {success ? (
            <div className="success-card">
              <div className="success-icon">🎉</div>
              <h3>Request Submitted Successfully!</h3>
              <p>
                Thank you for reaching out! A confirmation email is being dispatched, and Sahil will review your specifications and get in touch with you shortly.
              </p>
              <button onClick={() => setSuccess(false)} className="btn-primary">
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="request-form">
              {error && <div className="form-error">{error}</div>}

              {/* Step 1: Project Type */}
              <div className="form-group">
                <label>1. Project Type *</label>
                <div className="project-type-cards">
                  {[
                    { id: "student", label: "Student Project", desc: "For coursework, FYPs, & prototypes" },
                    { id: "planned", label: "Planned Customization", desc: "Adapt conceptual SaaS to your needs" },
                    { id: "maintenance", label: "Maintenance & Care", desc: "Scaling, optimizations & bugs" }
                  ].map((type) => (
                    <div
                      key={type.id}
                      className={`type-selection-card ${formData.projectType === type.id ? "active" : ""}`}
                      onClick={() => setFormData({ ...formData, projectType: type.id })}
                    >
                      <input
                        type="radio"
                        name="projectType"
                        checked={formData.projectType === type.id}
                        onChange={() => {}}
                        style={{ display: "none" }}
                      />
                      <span className="radio-circle"></span>
                      <div className="card-info">
                        <strong>{type.label}</strong>
                        <span>{type.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Tech stack selection */}
              <div className="form-group">
                <label>2. Technologies Required</label>
                <div className="tech-checkbox-grid">
                  {AVAILABLE_TECH.map((tech) => (
                    <label key={tech} className="tech-checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.selectedTech.includes(tech)}
                        onChange={() => handleTechChange(tech)}
                      />
                      <span className="custom-checkbox"></span>
                      {tech}
                    </label>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Other technologies (comma separated)"
                  value={formData.customTech}
                  onChange={(e) => setFormData({ ...formData, customTech: e.target.value })}
                  className="form-input custom-tech-input"
                />
              </div>

              {/* Step 3: Project Specifics */}
              <div className="form-row-two">
                <div className="form-group">
                  <label htmlFor="budget">3. Budget Range *</label>
                  <select
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="form-select"
                  >
                    {BUDGET_RANGES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="deadline">4. Expected Deadline *</label>
                  <input
                    type="date"
                    id="deadline"
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              {/* Step 4: Description */}
              <div className="form-group">
                <label htmlFor="description">5. Describe the problem / project details *</label>
                <textarea
                  id="description"
                  rows="5"
                  placeholder="Provide details about the application, the problems you are trying to solve, or special requirements..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="form-textarea"
                  required
                />
              </div>

              {/* Step 5: User details */}
              <div className="form-row-two">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="johndoe@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary btn-submit-request">
                {loading ? "Submitting Request..." : "Submit Project Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectRequest;

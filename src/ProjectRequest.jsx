import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from '@emailjs/browser';
import { 
  GraduationCap, 
  Rocket, 
  Wrench, 
  CheckSquare, 
  Square, 
  Send, 
  Calendar, 
  DollarSign, 
  FileText, 
  User, 
  Mail,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import "./App.css";

const AVAILABLE_TECH = [
  "React.js",
  "Next.js",
  "PHP & Laravel",
  "Firebase / Firestore",
  "MySQL / Relational Database",
  "AI / OpenAI / Gemini API",
  "Tailwind CSS / Vanilla CSS",
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

const projectTypes = [
  { 
    id: "student", 
    label: "Student Project", 
    desc: "For coursework, FYPs, & prototypes",
    icon: <GraduationCap size={22} />
  },
  { 
    id: "planned", 
    label: "Planned Customization", 
    desc: "Adapt conceptual SaaS to your needs",
    icon: <Rocket size={22} />
  },
  { 
    id: "maintenance", 
    label: "Maintenance & Care", 
    desc: "Scaling, optimizations & bug fixes",
    icon: <Wrench size={22} />
  }
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

      try {
        await emailjs.send(
          "service_jsu4x3j",
          "template_x7vwy0s",
          {
            to_name: formData.name,
            to_email: formData.email,
            project_type: formData.projectType,
            budget: formData.budget,
            deadline: formData.deadline,
            description: formData.description,
            tech_stack: orderData.selectedCriteria.join(", ")
          },
          "8fReEdGMIoOmTf3C8"
        );
      } catch (emailErr) {
        console.error("EmailJS sending failed: ", emailErr);
      }

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
    <section id="request-project" className="section-padding">
      <div className="section-header">
        <span className="section-subtitle-badge">Custom Engineering</span>
        <h2 className="section-title">Request a Project / Service</h2>
        <p className="section-intro">
          Describe your problem, select your criteria, and receive a customized quote and implementation timeline.
        </p>
      </div>

      <div className="request-container">
        {success ? (
          <div className="success-card">
            <div className="success-icon-box">
              <CheckCircle2 size={48} className="success-icon" />
            </div>
            <h3>Request Submitted Successfully!</h3>
            <p>
              Thank you for reaching out! A confirmation message has been logged, and Sahil will review your specifications and get in touch with you shortly.
            </p>
            <button onClick={() => setSuccess(false)} className="btn-hero-primary">
              <Sparkles size={18} />
              <span>Submit Another Request</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="request-form">
            {error && <div className="form-error-banner">{error}</div>}

            {/* Step 1: Project Type */}
            <div className="form-group-step">
              <label className="step-label">
                <span className="step-num-pill">Step 1</span>
                <span>Project Type *</span>
              </label>
              <div className="project-type-cards">
                {projectTypes.map((type) => {
                  const isSelected = formData.projectType === type.id;
                  return (
                    <div
                      key={type.id}
                      className={`type-selection-card ${isSelected ? "selected" : ""}`}
                      onClick={() => setFormData({ ...formData, projectType: type.id })}
                    >
                      <div className="type-card-header">
                        <div className="type-icon">{type.icon}</div>
                        <div className="radio-indicator">
                          {isSelected ? <div className="radio-dot"></div> : null}
                        </div>
                      </div>
                      <div className="type-card-body">
                        <strong>{type.label}</strong>
                        <span>{type.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Tech stack selection */}
            <div className="form-group-step">
              <label className="step-label">
                <span className="step-num-pill">Step 2</span>
                <span>Technologies Required</span>
              </label>
              <div className="tech-checkbox-grid">
                {AVAILABLE_TECH.map((tech) => {
                  const isChecked = formData.selectedTech.includes(tech);
                  return (
                    <div
                      key={tech}
                      className={`tech-checkbox-pill ${isChecked ? "checked" : ""}`}
                      onClick={() => handleTechChange(tech)}
                    >
                      <div className="checkbox-icon">
                        {isChecked ? <CheckSquare size={18} className="icon-checked" /> : <Square size={18} className="icon-unchecked" />}
                      </div>
                      <span className="tech-pill-text">{tech}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="custom-tech-wrapper">
                <input
                  type="text"
                  placeholder="Other specific technologies or libraries (e.g. GraphQL, WebSockets)..."
                  value={formData.customTech}
                  onChange={(e) => setFormData({ ...formData, customTech: e.target.value })}
                  className="form-input custom-tech-input"
                />
              </div>
            </div>

            {/* Step 3: Project Specifics */}
            <div className="form-row-two">
              <div className="form-group-step">
                <label htmlFor="budget" className="step-label">
                  <span className="step-num-pill">Step 3</span>
                  <DollarSign size={16} className="inline-icon" /> Budget Range *
                </label>
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

              <div className="form-group-step">
                <label htmlFor="deadline" className="step-label">
                  <span className="step-num-pill">Step 4</span>
                  <Calendar size={16} className="inline-icon" /> Expected Deadline *
                </label>
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
            <div className="form-group-step">
              <label htmlFor="description" className="step-label">
                <span className="step-num-pill">Step 5</span>
                <FileText size={16} className="inline-icon" /> Describe your project requirements *
              </label>
              <textarea
                id="description"
                rows="5"
                placeholder="Provide details about the web application, target features, workflow, or specific problem you need solved..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="form-textarea"
                required
              />
            </div>

            {/* Step 5: User details */}
            <div className="form-row-two">
              <div className="form-group-step">
                <label htmlFor="name" className="step-label">
                  <User size={16} className="inline-icon" /> Full Name *
                </label>
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

              <div className="form-group-step">
                <label htmlFor="email" className="step-label">
                  <Mail size={16} className="inline-icon" /> Email Address *
                </label>
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

            <button type="submit" disabled={loading} className="btn-hero-primary btn-submit-request">
              <Send size={18} />
              <span>{loading ? "Submitting Request..." : "Submit Project Request"}</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ProjectRequest;

import React from "react";
import "./App.css";

const serviceTiers = [
  {
    id: "student",
    title: "Student Projects",
    icon: "🎓",
    tagline: "Academic & Prototype Solutions",
    description: "Affordable, high-quality development tailored for students, researchers, and early-stage prototypes. Get support for Final Year Projects, research applications, and custom learning tools.",
    features: [
      "Custom web applications (React, Node, Firebase)",
      "Well-documented clean code",
      "Explainers & setup guidance",
      "Highly budget-friendly pricing",
      "Rapid delivery for tight deadlines"
    ],
    badge: "Most Popular"
  },
  {
    id: "planned",
    title: "Planned Projects",
    icon: "🚀",
    tagline: "Pre-order & Custom Ventures",
    description: "Be the first to secure next-gen solutions. Browse planned architectures currently in active design. Pre-order to customize them specifically for your business or academic needs.",
    features: [
      "AI-Powered SaaS Templates",
      "Real-time Collaboration platforms",
      "Custom Enterprise CMS & POS",
      "Early adopter discount & support",
      "Tailor-made features on conceptual designs"
    ],
    badge: "Next Gen"
  },
  {
    id: "maintenance",
    title: "Maintenance Projects",
    icon: "🛠️",
    tagline: "Code Care & Optimization",
    description: "Keep your existing web apps running fast, secure, and modern. Support packages for database tuning, security audits, framework updates, code refactoring, and feature extensions.",
    features: [
      "Performance optimization & speedups",
      "Bug fixes & security patching",
      "Database scaling & migrations",
      "Regular backups & monitoring config",
      "API integrations & UI modernizations"
    ],
    badge: "Premium Care"
  }
];

const Services = ({ onSelectService }) => {
  return (
    <section id="services">
      <div className="animate">
        <h2>Our Service Platforms</h2>
        <p className="section-subtitle">
          Select from our curated service platforms designed to turn your technical problems into elegant solutions.
        </p>

        <div className="services-grid">
          {serviceTiers.map((tier) => (
            <div key={tier.id} className="service-card">
              {tier.badge && <span className="service-badge">{tier.badge}</span>}
              <div className="service-icon">{tier.icon}</div>
              <h3>{tier.title}</h3>
              <span className="service-tagline">{tier.tagline}</span>
              <p className="service-desc">{tier.description}</p>
              
              <div className="service-features-list">
                <h4>What's Included:</h4>
                <ul>
                  {tier.features.map((feat, index) => (
                    <li key={index}>
                      <span className="checkmark">✓</span> {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onSelectService(tier.id)}
                className="btn-service-action"
              >
                Request Service
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

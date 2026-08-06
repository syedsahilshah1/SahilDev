import React from "react";
import { GraduationCap, Rocket, Wrench, Check, ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import "./App.css";

const serviceTiers = [
  {
    id: "student",
    title: "Academic & Student Projects",
    icon: <GraduationCap size={28} className="service-tier-icon" />,
    tagline: "FYP & Prototype Engineering",
    description: "High-quality software development tailored for computer science students and research prototypes. Full architecture support for Final Year Projects.",
    features: [
      "Custom Web Applications (React, Next.js, Laravel, Firebase)",
      "Clean, well-commented source code",
      "Comprehensive setup & project walkthroughs",
      "Budget-friendly student pricing",
      "On-time delivery for tight evaluation deadlines"
    ],
    badge: "Popular Service"
  },
  {
    id: "planned",
    title: "Custom Full-Stack Solutions",
    icon: <Rocket size={28} className="service-tier-icon" />,
    tagline: "Turnkey MVP & Web Apps",
    description: "Tailor-made web applications engineered from scratch. From initial wireframes to production database schema and REST API setup.",
    features: [
      "Modern React / Next.js single page applications",
      "RESTful API & authentication server architecture",
      "Custom Enterprise Dashboards & POS systems",
      "Real-time database and notification setup",
      "Fully responsive cross-device layout design"
    ],
    badge: "Next Gen"
  },
  {
    id: "maintenance",
    title: "App Refactoring & Optimization",
    icon: <Wrench size={28} className="service-tier-icon" />,
    tagline: "Code Care & Speed Upgrades",
    description: "Keep your web applications fast, responsive, and secure. Performance tuning, code refactoring, database query optimization, and UI overhauls.",
    features: [
      "Frontend performance & speed optimization",
      "Bug fixes & framework upgrades",
      "MySQL & Firebase database index tuning",
      "API integrations & UI modernizations",
      "Glassmorphic design updates & responsive fixes"
    ],
    badge: "Premium Care"
  }
];

const Services = ({ onSelectService }) => {
  return (
    <section id="services" className="section-padding">
      <ScrollReveal direction="up" duration={0.6} className="section-header">
        <span className="section-subtitle-badge">Solutions & Offerings</span>
        <h2 className="section-title">Development Services</h2>
        <p className="section-intro">
          Targeted software solutions engineered to bring technical ideas into functional reality.
        </p>
      </ScrollReveal>

      <div className="services-grid-modern">
        {serviceTiers.map((tier, idx) => (
          <ScrollReveal
            key={tier.id}
            direction="up"
            duration={0.5}
            delay={idx * 0.12}
          >
            <div className="service-card-modern">
              {tier.badge && <span className="service-badge">{tier.badge}</span>}
              <div className="service-icon-box">{tier.icon}</div>
              <h3 className="service-title">{tier.title}</h3>
              <span className="service-tagline">{tier.tagline}</span>
              <p className="service-desc">{tier.description}</p>
              
              <div className="service-features-list">
                <h4>What's Included:</h4>
                <ul>
                  {tier.features.map((feat, index) => (
                    <li key={index}>
                      <Check size={16} className="check-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onSelectService(tier.id)}
                className="btn-service-action"
              >
                <span>Request Service</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Services;

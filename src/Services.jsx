import React from "react";
import { GraduationCap, Rocket, Wrench, Check, ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import "./App.css";

const serviceTiers = [
  {
    id: "student",
    title: "Academic & Student FYP Projects",
    icon: <GraduationCap size={28} className="service-tier-icon" />,
    tagline: "Final Year Project & Prototype Engineering",
    description: "Professional web-based Final Year Project (FYP) development for BS Computer Science, Software Engineering, and IT students. Full system design, source code, database schema, and documentation included.",
    features: [
      "Custom Web Applications (React, Next.js, Laravel, Firebase)",
      "Complete FYP documentation & project reports",
      "Clean, well-commented source code with deployment guide",
      "Budget-friendly student pricing — affordable rates",
      "On-time delivery for university evaluation deadlines",
      "Database design (MySQL, Firebase Firestore)"
    ],
    badge: "Popular Service"
  },
  {
    id: "planned",
    title: "Custom Full-Stack Web Development",
    icon: <Rocket size={28} className="service-tier-icon" />,
    tagline: "Hire a Full Stack Web Developer — React, Laravel, Next.js",
    description: "End-to-end custom web application development for startups, businesses, and entrepreneurs. From UI/UX wireframes to production deployment — React frontends, Laravel REST APIs, Firebase backends, and MySQL databases.",
    features: [
      "Modern React / Next.js single page & server-side apps",
      "RESTful API & JWT authentication server architecture",
      "Custom Enterprise Dashboards, POS & inventory systems",
      "Real-time Firebase database & push notifications",
      "Fully responsive mobile-first cross-device design",
      "E-commerce, SaaS platform & booking system development"
    ],
    badge: "Most Requested"
  },
  {
    id: "maintenance",
    title: "Website Optimization & Refactoring",
    icon: <Wrench size={28} className="service-tier-icon" />,
    tagline: "Speed Up, Fix Bugs & Modernize Your Website",
    description: "Make your existing website fast, secure, and modern. Performance audits, code refactoring, database query optimization, bug fixes, UI redesigns, and framework upgrades for React, Laravel, WordPress, and PHP projects.",
    features: [
      "PageSpeed & Core Web Vitals performance optimization",
      "Bug fixes, security patches & framework upgrades",
      "MySQL & Firebase Firestore query tuning",
      "Third-party API integrations & payment gateways",
      "Modern glassmorphic UI redesigns & responsive fixes",
      "SEO technical fixes & Google Search Console setup"
    ],
    badge: "Premium Care"
  }
];

const Services = ({ onSelectService }) => {
  return (
    <section id="services" className="section-padding">
      <ScrollReveal direction="up" duration={0.6} className="section-header">
        <span className="section-subtitle-badge">Web Development Services — SyedDev Pakistan</span>
        <h2 className="section-title">Full Stack Web Development Services</h2>
        <p className="section-intro">
          Hire a full stack web developer in Pakistan — React, Next.js, Laravel, PHP &amp; Firebase. SyedDev Software Solutions delivers custom web apps, REST APIs, student FYP projects, and enterprise dashboards. See <a href="#projects" style={{ color: "#818cf8", textDecoration: "underline" }}>project portfolio</a> or <a href="#contact" style={{ color: "#818cf8", textDecoration: "underline" }}>get a free quote</a>.
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

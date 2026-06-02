import React from "react";
import "./App.css";

const opportunities = [
  {
    id: "internship",
    icon: "🌍",
    title: "Remote Internships",
    tagline: "Learn & contribute remotely",
    description:
      "Open to remote internship roles where I can grow as a developer while delivering real value—final-year projects, startup teams, and tech companies welcome.",
    highlights: [
      "React, JavaScript, and full-stack web work",
      "Clear communication & weekly progress updates",
      "Flexible with academic schedules",
      "Eager to learn from senior engineers",
    ],
  },
  {
    id: "job",
    icon: "💼",
    title: "Remote Jobs",
    tagline: "Junior & entry-level roles",
    description:
      "Seeking remote full-time or part-time positions as a Software Engineer or Full Stack Developer. Comfortable collaborating across time zones.",
    highlights: [
      "Frontend & backend development",
      "Laravel, PHP, MySQL, Firebase experience",
      "Remote-first collaboration tools",
      "Ready to onboard and ship features",
    ],
    badge: "Actively Looking",
  },
  {
    id: "freelance",
    icon: "🤝",
    title: "Freelance & Contract",
    tagline: "Short-term remote engagements",
    description:
      "Available for contract-based remote work—MVPs, feature builds, bug fixes, and maintenance for startups and small businesses.",
    highlights: [
      "Fixed-scope or hourly arrangements",
      "Fast turnaround on defined tasks",
      "Documentation & handoff included",
      "Overlap with existing client services",
    ],
  },
];

const availability = [
  { label: "Work mode", value: "Remote only" },
  { label: "Engagement", value: "Internship · Job · Contract" },
  { label: "Timezone", value: "PKT (flexible overlap)" },
  { label: "Status", value: "Available now" },
];

const HireMe = () => {
  const handleHireInquiry = (type) => {
    const subject = encodeURIComponent(`Hire Sahil — ${type}`);
    const body = encodeURIComponent(
      `Hi Sahil,\n\nI'm interested in discussing a ${type.toLowerCase()} opportunity with you.\n\nRole / company:\n\nTimeline:\n\nAdditional details:\n`
    );
    window.location.href = `mailto:sahilkhan536ah@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="hire-me">
      <div className="animate">
        <h2>Hire Me</h2>
        <p className="section-subtitle">
          I&apos;m actively looking for remote opportunities—internships, junior developer roles,
          and contract work. If you need a motivated full stack developer on your team, let&apos;s
          connect.
        </p>

        <div className="hire-availability">
          {availability.map((item) => (
            <div key={item.label} className="hire-availability-item">
              <span className="hire-availability-label">{item.label}</span>
              <span className="hire-availability-value">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="opportunities-grid">
          {opportunities.map((item) => (
            <div key={item.id} className="service-card hire-card">
              {item.badge && <span className="service-badge">{item.badge}</span>}
              <div className="service-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <span className="service-tagline">{item.tagline}</span>
              <p className="service-desc">{item.description}</p>

              <div className="service-features-list">
                <h4>What I bring:</h4>
                <ul>
                  {item.highlights.map((point, index) => (
                    <li key={index}>
                      <span className="checkmark">✓</span> {point}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleHireInquiry(item.title)}
                className="btn-service-action"
              >
                Discuss This Role
              </button>
            </div>
          ))}
        </div>

        <div className="hire-cta">
          <p>
            Prefer a quick message? Reach out via the contact form or email—I typically respond
            within 24 hours.
          </p>
          <div className="hire-cta-buttons">
            <a href="#contact" className="btn-primary">
              Contact Me
            </a>
            <a
              href="mailto:sahilkhan536ah@gmail.com?subject=Remote%20Opportunity%20Inquiry"
              className="btn-primary hire-cta-secondary"
            >
              Email Directly
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HireMe;

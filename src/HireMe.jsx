import React from "react";
import { Globe, Briefcase, Handshake, Check, Mail, MessageSquare, Download, FileText, ExternalLink } from "lucide-react";
import "./App.css";

const opportunities = [
  {
    id: "internship",
    icon: <Globe size={32} className="opp-icon" />,
    title: "Remote Internships",
    tagline: "Learn & Contribute Remotely",
    description:
      "Open to remote internship roles where I can grow as a developer while delivering real value—final-year projects, tech startups, and engineering teams welcome.",
    highlights: [
      "React, Next.js, PHP & full-stack web work",
      "Clear daily/weekly async communication",
      "Flexible around academic schedule",
      "Eager to learn from senior engineers",
    ],
  },
  {
    id: "job",
    icon: <Briefcase size={32} className="opp-icon" />,
    title: "Junior / Entry Full Stack Roles",
    tagline: "Full-Time & Part-Time Remote",
    description:
      "Seeking remote positions as a Software Engineer or Full Stack Developer. Ready to onboard, write clean code, and ship features.",
    highlights: [
      "Frontend (React, Next.js) & Backend (PHP, Laravel)",
      "RESTful APIs, Firebase & SQL database management",
      "Remote-first git workflows & agile teamwork",
      "Ready to onboard and contribute quickly",
    ],
    badge: "Actively Looking",
  },
  {
    id: "freelance",
    icon: <Handshake size={32} className="opp-icon" />,
    title: "Freelance & Contract Work",
    tagline: "Short & Long-Term Engagements",
    description:
      "Available for contract-based remote development—building MVPs, custom dashboards, feature extensions, and bug fixes.",
    highlights: [
      "Fixed-scope or project-based milestone pricing",
      "Fast turnaround on defined deliverables",
      "Clean documentation and code handoff",
      "Ongoing support & post-launch updates",
    ],
  },
];

const availability = [
  { label: "Work Mode", value: "Remote Only" },
  { label: "Role Types", value: "Junior Engineer · Intern · Contract" },
  { label: "Timezone", value: "PKT (Flexible Overlap)" },
  { label: "Availability", value: "Immediate Start" },
];

const cvDocuments = [
  {
    title: "Software Engineer Resume (PDF)",
    description: "Modern styled PDF format — best for quick viewing in browser or printing.",
    fileUrl: "/Black Purple and White Modern Professional Software Engineer CV (1).pdf",
    fileName: "Sahil_Syed_Software_Engineer_CV.pdf",
    format: "PDF",
    icon: "📄"
  },
  {
    title: "Sahil Shah Resume (DOCX)",
    description: "Microsoft Word format — editable document version.",
    fileUrl: "/Sahil Shah CV (1) (1).docx",
    fileName: "Sahil_Shah_CV.docx",
    format: "DOCX",
    icon: "📝"
  }
];

const HireMe = () => {
  const handleHireInquiry = (roleTitle) => {
    const subject = encodeURIComponent(`Opportunity Inquiry: ${roleTitle} - Sahil Syed`);
    const body = encodeURIComponent(
      `Hi Sahil,\n\nI reviewed your portfolio and would like to discuss a ${roleTitle.toLowerCase()} opportunity.\n\nCompany / Team:\nRole Details:\nTimeline:\n\nLooking forward to speaking!`
    );
    window.location.href = `mailto:sahilkhan536ah@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="hire-me" className="section-padding">
      <div className="section-header">
        <span className="section-subtitle-badge">Recruitment & Hiring</span>
        <h2 className="section-title">Hire Me & Download CV</h2>
        <p className="section-intro">
          Download my resume documents or get in touch regarding remote software engineering roles, internships, and contract work.
        </p>
      </div>

      {/* CV Download Section */}
      <div className="cv-download-container">
        <div className="cv-header">
          <FileText size={22} className="inline-icon" />
          <h3>Curriculum Vitae (CV) & Resume Downloads</h3>
        </div>

        <div className="cv-cards-grid">
          {cvDocuments.map((doc, idx) => (
            <div key={idx} className="cv-card-item">
              <div className="cv-card-top">
                <span className="cv-format-badge">{doc.format}</span>
                <span className="cv-emoji">{doc.icon}</span>
              </div>
              <h4 className="cv-title">{doc.title}</h4>
              <p className="cv-desc">{doc.description}</p>
              <div className="cv-actions">
                <a
                  href={encodeURI(doc.fileUrl)}
                  download={doc.fileName}
                  className="btn-cv-download"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download size={16} />
                  <span>Download {doc.format}</span>
                </a>
                {doc.format === "PDF" && (
                  <a
                    href={encodeURI(doc.fileUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cv-preview"
                    title="Preview in browser"
                  >
                    <ExternalLink size={16} />
                    <span>View</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Availability Pill Grid */}
      <div className="hire-availability-grid">
        {availability.map((item) => (
          <div key={item.label} className="hire-avail-card">
            <span className="avail-label">{item.label}</span>
            <span className="avail-value">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Opportunity Cards */}
      <div className="opportunities-grid-modern">
        {opportunities.map((item) => (
          <div key={item.id} className={`hire-card-modern ${item.badge ? "has-badge" : ""}`}>
            {item.badge && <span className="hire-badge">{item.badge}</span>}
            <div className="hire-card-icon">{item.icon}</div>
            <h3 className="hire-card-title">{item.title}</h3>
            <span className="hire-card-tagline">{item.tagline}</span>
            <p className="hire-card-desc">{item.description}</p>

            <div className="hire-card-features">
              <h4>Key Highlights:</h4>
              <ul>
                {item.highlights.map((point, idx) => (
                  <li key={idx}>
                    <Check size={16} className="check-icon" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => handleHireInquiry(item.title)}
              className="btn-hire-action"
            >
              <Mail size={16} />
              <span>Discuss This Role</span>
            </button>
          </div>
        ))}
      </div>

      {/* Quick Call to Action banner */}
      <div className="hire-cta-banner">
        <div className="cta-banner-text">
          <h3>Let's build something great together</h3>
          <p>Have an open role or contract project? Feel free to email me directly or send a message below.</p>
        </div>
        <div className="cta-banner-buttons">
          <a href="#contact" className="btn-cta-primary">
            <MessageSquare size={16} />
            <span>Send Message</span>
          </a>
          <a
            href="mailto:sahilkhan536ah@gmail.com?subject=Remote%20Software%20Engineering%20Role"
            className="btn-cta-secondary"
          >
            <Mail size={16} />
            <span>Email Directly</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HireMe;

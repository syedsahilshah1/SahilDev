import React, { useState, useEffect } from "react";
import { ArrowRight, Download, Mail, Code2, Terminal, Briefcase } from "lucide-react";
import "./App.css";

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const roles = [
  "Full Stack Web Developer",
  "Software Engineer",
  "React & Next.js Developer",
  "PHP & Laravel Engineer"
];

const cvPdfPath = "/Black Purple and White Modern Professional Software Engineer CV (1).pdf";

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="hero-background-glow"></div>
      <div className="hero-container">
        <div className="hero-text-content">
          <div className="status-badge">
            <span className="status-dot"></span>
            <span>Open for Remote Roles & Internships</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="hero-highlight">Syed Sahil Shah</span>
          </h1>

          <div className="hero-role-wrapper">
            <span className="role-prefix">I build modern web apps as a</span>
            <div className="role-dynamic-text" key={roleIndex}>
              {roles[roleIndex]}
            </div>
          </div>

          <p className="hero-description">
            BS Software Engineer with hands-on experience building high-performance,
            full-stack web applications, scalable APIs, and intuitive user interfaces
            using React, Next.js, Laravel, and Firebase.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn-hero-primary">
              <span>View Projects</span>
              <ArrowRight size={18} />
            </a>
            <a
              href={encodeURI(cvPdfPath)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-secondary"
              title="View & Download CV (PDF)"
            >
              <Download size={18} />
              <span>Download CV (PDF)</span>
            </a>
          </div>

          <div className="hero-social-bar">
            <span className="social-label">Connect:</span>
            <a
              href="https://github.com/syedsahilshah1"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="GitHub Profile"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href="mailto:sahilkhan536ah@gmail.com"
              className="social-icon-btn"
              title="Email Sahil"
            >
              <Mail size={20} />
            </a>
            <a
              href="#hire-me"
              className="social-icon-btn"
              title="Hire Me & CV Downloads"
            >
              <Briefcase size={20} />
            </a>
          </div>
        </div>

        <div className="hero-visual-container">
          <div className="hero-image-frame">
            <div className="hero-image-blob">
              <img
                src="/sahil2.jpeg"
                alt="Sahil Syed - Software Engineer"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.classList.add('fallback-avatar');
                }}
              />
            </div>

            <div className="floating-chip chip-1">
              <Code2 size={16} className="chip-icon" />
              <span>React & Next.js</span>
            </div>

            <div className="floating-chip chip-2">
              <Terminal size={16} className="chip-icon" />
              <span>PHP & Laravel</span>
            </div>

            <div className="floating-chip chip-3">
              <span className="chip-rating">⚡ BS Software Eng.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

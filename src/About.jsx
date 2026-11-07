import React from "react";
import { GraduationCap, Code, Cpu, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import "./App.css";

const highlightCards = [
  {
    icon: <GraduationCap size={28} />,
    title: "Education & Degree",
    description: "BS Software Engineer with strong theoretical and practical expertise in Object-Oriented Programming (OOP), Data Structures, Database Systems, and Web Engineering."
  },
  {
    icon: <Code size={28} />,
    title: "Full-Stack Proficiency",
    description: "Experienced in building responsive React & Next.js client frontends coupled with scalable PHP & Laravel backend APIs and MySQL/Firebase databases."
  },
  {
    icon: <Cpu size={28} />,
    title: "Production Projects",
    description: "Built and deployed over 20 projects, ranging from AI Travel Planners and SaaS Portals to City Management Hubs and E-commerce Ecosystems."
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Engineering Mindset",
    description: "Dedicated to writing clean, maintainable code, adhering to software design patterns, and delivering polished, accessible user interfaces."
  }
];

const About = () => (
  <section id="about" className="section-padding">
    <ScrollReveal direction="up" duration={0.6} className="section-header">
      <span className="section-subtitle-badge">ABOUT ME</span>
      <h2 className="section-title" style={{ fontSize: "2.8rem", lineHeight: "1.15", letterSpacing: "-0.02em" }}>
        Inspired by Great Design,<br />
        <span className="hero-highlight">Fueled by Modern Tools</span>
      </h2>
      <p className="section-intro" style={{ maxWidth: "680px", margin: "1rem auto 0", fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
        As a website developer and software engineer, I bridge the gap between how a site looks and how it performs — writing clean, maintainable code that brings a design to life without cutting corners.
      </p>
    </ScrollReveal>

    <div className="about-content-grid">
      <ScrollReveal direction="left" duration={0.6} delay={0.1} className="about-bio-card">
        <h3>Hello, I'm Syed Sahil Shah</h3>
        <p className="bio-paragraph">
          I am a <strong>BS Software Engineer</strong>, Full Stack Web Developer, and founder of <strong>SyedDev Software Solutions</strong>. I specialize in designing and engineering high-quality web applications, bridging modern frontend UI craftsmanship (React, Next.js, HTML5, CSS3) with robust backend systems (PHP, Laravel, MySQL, and Firebase).
        </p>
        <p className="bio-paragraph">
          Through SyedDev Software Solutions, I deliver client platforms, custom administrative dashboards, student final year engineering projects, and AI-powered web tools focused on clean code, responsiveness, and top performance. Explore my <a href="#projects" style={{ color: "var(--accent, #818cf8)", textDecoration: "underline" }}>featured projects</a> or view available <a href="#services" style={{ color: "var(--accent, #818cf8)", textDecoration: "underline" }}>software development services</a>.
        </p>
        
        <div className="about-quick-tags">
          <span className="bio-tag">Brand: SyedDev Software Solutions</span>
          <span className="bio-tag">Degree: BS Software Engineering</span>
          <span className="bio-tag">Role: Full Stack Engineer</span>
        </div>
      </ScrollReveal>

      <div className="about-highlights-grid">
        {highlightCards.map((card, idx) => (
          <ScrollReveal 
            key={idx} 
            direction="right" 
            duration={0.5} 
            delay={0.1 + idx * 0.1}
          >
            <div className="highlight-card">
              <div className="highlight-icon-wrapper">
                {card.icon}
              </div>
              <div className="highlight-info">
                <h4>{card.title}</h4>
                <p>{card.description}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default About;

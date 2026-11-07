import React from "react";
import { GraduationCap, Code, Cpu, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import "./App.css";

const highlightCards = [
  {
    icon: <GraduationCap size={28} />,
    title: "BS Software Engineering Degree",
    description: "Formally trained software engineer with expertise in Object-Oriented Programming (OOP), Data Structures, Database Systems, Web Engineering, and software architecture patterns."
  },
  {
    icon: <Code size={28} />,
    title: "Full Stack Web Developer for Hire",
    description: "Available to hire as a freelance or remote full stack developer. Expert in React, Next.js, PHP, Laravel, MySQL, and Firebase — building responsive frontends and scalable backend APIs."
  },
  {
    icon: <Cpu size={28} />,
    title: "20+ Production Projects Delivered",
    description: "Built and deployed 20+ projects: AI Travel Planners, SaaS Portals, E-commerce Platforms, City Management Hubs, POS Systems, and enterprise dashboards for clients in Pakistan and worldwide."
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Clean Code & Engineering Standards",
    description: "Committed to writing maintainable, well-documented code following software design patterns, SOLID principles, and modern web accessibility standards."
  }
];

const About = () => (
  <section id="about" className="section-padding">
    <ScrollReveal direction="up" duration={0.6} className="section-header">
      <span className="section-subtitle-badge">Full Stack Web Developer — Pakistan &amp; Remote</span>
      <h2 className="section-title" style={{ fontSize: "2.8rem", lineHeight: "1.15", letterSpacing: "-0.02em" }}>
        Inspired by Great Design,<br />
        <span className="hero-highlight">Fueled by Modern Tools</span>
      </h2>
      <p className="section-intro" style={{ maxWidth: "680px", margin: "1rem auto 0", fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
        Full stack web developer &amp; software engineer available for hire in Pakistan and worldwide. I build fast, mobile-responsive, production-ready web applications — from landing pages to complex enterprise systems.
      </p>
    </ScrollReveal>

    <div className="about-content-grid">
      <ScrollReveal direction="left" duration={0.6} delay={0.1} className="about-bio-card">
        <h3>Hello, I'm Syed Sahil Shah — Full Stack Web Developer</h3>
        <p className="bio-paragraph">
          I am a <strong>BS Software Engineer</strong>, <strong>full stack web developer</strong> available for hire, and founder of <strong>SyedDev Software Solutions</strong> — a custom web development agency based in Pakistan serving clients worldwide. I specialize in building high-performance web applications using <strong>React</strong>, <strong>Next.js</strong>, <strong>PHP</strong>, <strong>Laravel</strong>, <strong>MySQL</strong>, and <strong>Firebase</strong>.
        </p>
        <p className="bio-paragraph">
          Whether you need a <strong>freelance web developer in Pakistan</strong>, a <strong>remote React developer</strong>, help with a <strong>student Final Year Project (FYP)</strong>, or a full team for your company's web platform — SyedDev Software Solutions delivers on time and within budget. Explore my <a href="#projects" style={{ color: "var(--accent, #818cf8)", textDecoration: "underline" }}>featured projects</a> or view available <a href="#services" style={{ color: "var(--accent, #818cf8)", textDecoration: "underline" }}>web development services</a>.
        </p>
        
        <div className="about-quick-tags">
          <span className="bio-tag">🌐 Full Stack Web Developer</span>
          <span className="bio-tag">📍 Pakistan &amp; Remote Worldwide</span>
          <span className="bio-tag">🎓 BS Software Engineering</span>
          <span className="bio-tag">⚡ React · Next.js · Laravel · Firebase</span>
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

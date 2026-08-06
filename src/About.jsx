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
      <span className="section-subtitle-badge">Get To Know Me</span>
      <h2 className="section-title">About Me</h2>
      <p className="section-intro">
        Passionate Software Engineer dedicated to crafting robust web applications that solve real-world problems.
      </p>
    </ScrollReveal>

    <div className="about-content-grid">
      <ScrollReveal direction="left" duration={0.6} delay={0.1} className="about-bio-card">
        <h3>Hello, I'm Sahil Syed</h3>
        <p className="bio-paragraph">
          I am a <strong>BS Software Engineer</strong> and Full Stack Web Developer with expertise in designing and engineering high-quality web applications. My foundation spans frontend UI craftsmanship with <strong>ReactJS, Next.js, HTML5, CSS3, and JavaScript</strong>, as well as robust backend development with <strong>PHP, Laravel, MySQL, and Firebase</strong>.
        </p>
        <p className="bio-paragraph">
          Whether constructing complex administrative dashboards, implementing real-time database management systems, or building AI-powered web solutions, I focus on clean architecture, responsive UI design, and fast execution.
        </p>
        
        <div className="about-quick-tags">
          <span className="bio-tag">Degree: BS Software Engineering</span>
          <span className="bio-tag">Role: Full Stack Web Developer</span>
          <span className="bio-tag">Status: Available for Jobs & Remote Internships</span>
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

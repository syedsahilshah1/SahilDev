import React from "react";
import "./App.css";

const projects = [
  {
    name: "Digital Kohat",
    description: "A digital platform for Kohat city.",
    link: "https://digital-kohat.vercel.app/",
    github: "https://github.com/Humnaa-Nadeem/Digital-Kohat"
  },
  {
    name: "Smart AI",
    description: "An AI-powered application built with modern technologies.",
    link: "https://smartai-opal.vercel.app/",
    github: "https://github.com/syedsahilshah1/smartai"
  },
  {
    name: "Superadmin Dashboard",
    description: "A comprehensive dashboard for administration and management.",
    link: "https://github.com/syedsahilshah1/superadmin-dashboard",
    github: "https://github.com/syedsahilshah1/superadmin-dashboard"
  }
];

const Projects = () => (
  <section id="projects">
    <div className="animate">
      <h2>Featured Projects</h2>
      <div className="projects-grid">
        {projects.map(proj => (
          <div key={proj.name} className="project-card">
            <h3>{proj.name}</h3>
            <p>{proj.description}</p>
            <div className="project-links">
              <a href={proj.link} target="_blank" rel="noopener noreferrer">
                <span>Live Demo</span> ↗
              </a>
              {proj.github && (
                <a href={proj.github} target="_blank" rel="noopener noreferrer">
                  <span>GitHub</span> 
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;

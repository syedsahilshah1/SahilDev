import React from "react";
import "./App.css";

const projects = [
  {
    name: "Digital Kohat",
    description: "A digital platform for Kohat city.",
    link: "https://kohat.online/",
    github: "private"
  },
  {
    name: "job-portal",
    description: "A job portal for connecting job seekers with employers.",
    link: "https://jobsdaily.pk/",
    github: "private"
  },
  {
    name: "Smart AI",
    description: "An AI-powered application built with modern technologies.",
    link: "https://smartai-hx1y.vercel.app/",
    github: "https://github.com/syedsahilshah1/smartai"
  },
  {
    name: "Superadmin Dashboard",
    description: "A comprehensive dashboard for administration and management.",
    link: "https://github.com/syedsahilshah1/superadmin-dashboard",
    github: "https://github.com/syedsahilshah1/superadmin-dashboard"
  },
  {
    name: "Rescue-1122-Kohat-Division-Prototype",
    description: "A comprehensive dashboard for administration and management.",
    link: "https://rescue-1122-kohat-division-prototyp.vercel.app/",
    github: "https://github.com/syedsahilshah1/-Rescue-1122-Kohat-Division-Prototype"
  },
  {
    name: "e-commerce-ecosystem",
    description: "A comprehensive e-commerce ecosystem built with modern technologies.",
    link: "https://github.com/syedsahilshah1/e-commerce-ecosystem",
    github: "https://github.com/syedsahilshah1/e-commerce-ecosystem"
  },
  {
    name: "doctor-appointment",
    description: "A comprehensive doctor appointment booking system built with modern technologies.",
    link: "https://github.com/syedsahilshah1/doctor-appointment",
    github: "https://github.com/syedsahilshah1/doctor-appointment"
  }
  , {
    name: "POS-mart ",
    description: "A comprehensive point-of-sale system for managing retail operations.",
    link: "https://github.com/syedsahilshah1/POS-mart",
    github: "https://github.com/syedsahilshah1/POS-mart"
  },
   {
    name: "PK-IT-Jobs",
    description: "A comprehensive SAAS system for PAK IT JOB.",
    link: "https://github.com/syedsahilshah1/PK-IT-Jobs",
    github: "https://github.com/syedsahilshah1/PK-IT-Jobs"
  },
  {
    name: "SahilDev-HRM-",
    description: "A HRM for managing employees.",
    link: "https://sahil-dev-hrm.vercel.app/",
    github: "https://github.com/syedsahilshah1/SahilDev-HRM-"
  },
  {
    name: "AIHealthCare",
    description: "A Ai Based health care system for Pakiatan.",
    link: "https://aihealthnavigate.lovable.app/",
    github: "https://github.com/syedsahilshah1/AIHealthCare"
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

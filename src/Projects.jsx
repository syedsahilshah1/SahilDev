import React, { useState, useMemo } from "react";
import { ExternalLink, Search, Star, Filter, Code } from "lucide-react";
import "./App.css";

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const projectsData = [
  {
    name: "SmartAI Travel Planner (FYP)",
    category: "ai",
    featured: true,
    badge: "Final Year Project",
    description: "AI-powered travel planning platform that generates personalized travel itineraries, budgeting recommendations, and route maps.",
    tags: ["React", "AI API", "Tailwind CSS", "Vite"],
    link: "https://github.com/syedsahilshah1/SmartAI-travel-planner",
    github: "https://github.com/syedsahilshah1/SmartAI-travel-planner"
  },
  {
    name: "Digital Kohat Platform",
    category: "fullstack",
    featured: true,
    badge: "Nov 2025 - Jul 2026",
    description: "Official digital platform for Kohat city providing administrative information, local services directory, and public news updates.",
    tags: ["PHP", "Laravel", "MySQL", "JavaScript"],
    link: "https://kohat.online/",
    github: null
  },
  {
    name: "Job Portal (Jobs Daily PK)",
    category: "fullstack",
    featured: true,
    badge: "Live Product",
    description: "Full-fledged recruitment and career portal connecting job seekers with employers featuring resume uploads and job alerts.",
    tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    link: "https://jobsdaily.pk/",
    github: null
  },
  {
    name: "SahilDev HRM System",
    category: "saas",
    featured: true,
    badge: "SaaS App",
    description: "Human Resource Management system for tracking employee attendance, payroll processing, leave requests, and performance metrics.",
    tags: ["React", "Firebase", "Tailwind CSS"],
    link: "https://sahil-dev-hrm.vercel.app/",
    github: "https://github.com/syedsahilshah1/SahilDev-HRM-"
  },
  {
    name: "AI Health Care Navigator",
    category: "ai",
    featured: true,
    badge: "AI Medical",
    description: "AI-based healthcare navigation tool for initial symptom assessment and doctor recommendation in Pakistan.",
    tags: ["React", "AI Integration", "Tailwind", "Vite"],
    link: "https://aihealthnavigate.lovable.app/",
    github: "https://github.com/syedsahilshah1/AIHealthCare"
  },
  {
    name: "Smart AI Application",
    category: "ai",
    featured: false,
    badge: "AI Tool",
    description: "Multi-utility AI web application providing smart assistant solutions, text processing, and interactive AI responses.",
    tags: ["React", "OpenAI API", "Vite", "CSS3"],
    link: "https://smartai-hx1y.vercel.app/",
    github: "https://github.com/syedsahilshah1/smartai"
  },
  {
    name: "Rescue 1122 Kohat Division",
    category: "saas",
    featured: true,
    badge: "Innovative Design Co.",
    description: "Emergency dispatch and station management dashboard prototype developed at Innovative Design Company for Rescue 1122 Kohat Division operations.",
    tags: ["React", "Firebase", "Analytics", "Leaflet Maps"],
    link: "https://rescue-1122-kohat-division-prototyp.vercel.app/",
    github: "https://github.com/syedsahilshah1/-Rescue-1122-Kohat-Division-Prototype"
  },
  {
    name: "E-Commerce Ecosystem",
    category: "fullstack",
    featured: false,
    badge: "Full Stack",
    description: "Complete modern online shopping platform with cart management, order checkout, product inventory, and payment integration.",
    tags: ["React", "PHP", "Laravel", "MySQL"],
    link: "https://github.com/syedsahilshah1/e-commerce-ecosystem",
    github: "https://github.com/syedsahilshah1/e-commerce-ecosystem"
  },
  {
    name: "Doctor's Appointment Booking",
    category: "fullstack",
    featured: false,
    badge: "Healthcare",
    description: "Web application for patients to schedule medical appointments, view doctor availability, and manage consultation records.",
    tags: ["React", "PHP", "MySQL", "REST API"],
    link: "https://github.com/syedsahilshah1/doctor-appointment",
    github: "https://github.com/syedsahilshah1/doctor-appointment"
  },
  {
    name: "Student Record Management (SRMS)",
    category: "saas",
    featured: false,
    badge: "Education",
    description: "Comprehensive Web Application for academic institutions to manage student enrollment, course grading, and transcripts.",
    tags: ["React", "Vite", "Firebase", "CSS Modules"],
    link: "https://student-record-management-system-iota.vercel.app/",
    github: "https://github.com/syedsahilshah1/Student-record-management-system-"
  },
  {
    name: "POS-Mart (Retail Point of Sale)",
    category: "saas",
    featured: false,
    badge: "Business SaaS",
    description: "Point of Sale retail management software for barcode scanning, receipt generation, and inventory ledger tracking.",
    tags: ["PHP", "Laravel", "MySQL", "JavaScript"],
    link: "https://github.com/syedsahilshah1/POS-mart",
    github: "https://github.com/syedsahilshah1/POS-mart"
  },
  {
    name: "Digital Smart Cities Hub (KIC)",
    category: "saas",
    featured: false,
    badge: "Smart City",
    description: "Urban planning and municipal services dashboard created for smart city infrastructure management and citizen reports.",
    tags: ["React", "Tailwind", "JavaScript", "Chart.js"],
    link: "https://github.com/syedsahilshah1/Digital-Smart-Cities-Hub",
    github: "https://github.com/syedsahilshah1/Digital-Smart-Cities-Hub"
  },
  {
    name: "SIM (Smart Installment Manager)",
    category: "saas",
    featured: false,
    badge: "FinTech",
    description: "Financial tracking tool for managing monthly customer installments, payment schedules, and automated balance reminders.",
    tags: ["React", "Firebase", "JavaScript"],
    link: "https://github.com/syedsahilshah1/SIM",
    github: "https://github.com/syedsahilshah1/SIM"
  },
  {
    name: "Superadmin Control Center",
    category: "saas",
    featured: false,
    badge: "Admin Dashboard",
    description: "Multi-tenant administration platform for monitoring server metrics, managing user permissions, and audit logs.",
    tags: ["React", "Chart.js", "REST API"],
    link: "https://github.com/syedsahilshah1/superadmin-dashboard",
    github: "https://github.com/syedsahilshah1/superadmin-dashboard"
  },
  {
    name: "PK IT Jobs Platform",
    category: "fullstack",
    featured: false,
    badge: "Job Engine",
    description: "Aggregator system for tech roles across Pakistan with company profiles and specialized job filtering.",
    tags: ["Laravel", "MySQL", "Tailwind CSS"],
    link: "https://github.com/syedsahilshah1/PK-IT-Jobs",
    github: "https://github.com/syedsahilshah1/PK-IT-Jobs"
  }
];

const categoryFilters = [
  { id: "all", label: "All Projects" },
  { id: "featured", label: "⭐ Featured Work" },
  { id: "fullstack", label: "Full Stack & Web" },
  { id: "ai", label: "AI & Innovation" },
  { id: "saas", label: "SaaS & Systems" },
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      let matchesCategory = true;
      if (selectedCategory === "featured") {
        matchesCategory = project.featured;
      } else if (selectedCategory !== "all") {
        matchesCategory = project.category === selectedCategory;
      }

      const query = searchQuery.toLowerCase().trim();
      let matchesSearch = true;
      if (query) {
        matchesSearch =
          project.name.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some((tag) => tag.toLowerCase().includes(query));
      }

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="projects" className="section-padding">
      <div className="section-header">
        <span className="section-subtitle-badge">Portfolio & Case Studies</span>
        <h2 className="section-title">Featured Engineering Work</h2>
        <p className="section-intro">
          Explore production platforms, AI integrations, SaaS dashboards, and full-stack web applications.
        </p>
      </div>

      <div className="projects-controls-container">
        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by project name, tech (React, Laravel, AI)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="project-search-input"
          />
          {searchQuery && (
            <button 
              className="clear-search-btn"
              onClick={() => setSearchQuery("")}
            >
              ✕
            </button>
          )}
        </div>

        <div className="category-filters-wrapper">
          {categoryFilters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-chip ${selectedCategory === filter.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-grid-modern">
        {filteredProjects.map((proj) => (
          <div key={proj.name} className={`project-card-modern ${proj.featured ? "is-featured" : ""}`}>
            <div className="card-top-bar">
              <span className="project-badge">{proj.badge || "Project"}</span>
              {proj.featured && (
                <span className="featured-star" title="Featured Highlight">
                  <Star size={14} fill="#F59E0B" color="#F59E0B" /> Featured
                </span>
              )}
            </div>

            <h3 className="project-title">{proj.name}</h3>
            <p className="project-description">{proj.description}</p>

            <div className="project-tags-list">
              {proj.tags.map((tag) => (
                <span key={tag} className="tech-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="project-card-footer">
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-card-link demo-link"
              >
                <span>Live Demo / App</span>
                <ExternalLink size={15} />
              </a>

              {proj.github ? (
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-card-link github-link"
                  title="View Source Code"
                >
                  <GithubIcon size={16} />
                  <span>Code</span>
                </a>
              ) : (
                <span className="private-repo-badge" title="Proprietary client project">
                  Private Code
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="no-projects-found">
          <p>No projects match your filter search query "{searchQuery}".</p>
          <button 
            onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
            className="btn-reset-filters"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;

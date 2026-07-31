import React, { useState } from "react";
import { Layout, Server, Database, Wrench, Layers } from "lucide-react";
import "./App.css";

const skillCategories = [
  {
    id: "all",
    label: "All Technical Skills",
    icon: <Layers size={18} />
  },
  {
    id: "frontend",
    label: "Frontend Engineering",
    icon: <Layout size={18} />
  },
  {
    id: "backend",
    label: "Backend & APIs",
    icon: <Server size={18} />
  },
  {
    id: "database",
    label: "Databases & Cloud",
    icon: <Database size={18} />
  },
  {
    id: "tools",
    label: "Tools & Fundamentals",
    icon: <Wrench size={18} />
  }
];

const skillsData = [
  { name: "ReactJS", category: "frontend", level: "Advanced", icon: "⚛️" },
  { name: "JavaScript (ES6+)", category: "frontend", level: "Advanced", icon: "🟨" },
  { name: "Next.js", category: "frontend", level: "Intermediate", icon: "▲" },
  { name: "HTML5 & CSS3", category: "frontend", level: "Advanced", icon: "🌐" },
  { name: "Tailwind CSS", category: "frontend", level: "Intermediate", icon: "🎨" },
  
  { name: "PHP", category: "backend", level: "Advanced", icon: "🐘" },
  { name: "Laravel", category: "backend", level: "Advanced", icon: "🔴" },
  { name: "REST APIs", category: "backend", level: "Advanced", icon: "⚡" },

  { name: "MySQL", category: "database", level: "Advanced", icon: "🐬" },
  { name: "Firebase", category: "database", level: "Advanced", icon: "🔥" },

  { name: "OOP (Object-Oriented)", category: "tools", level: "Advanced", icon: "🧩" },
  { name: "Git & GitHub", category: "tools", level: "Advanced", icon: "🐙" },
  { name: "Vite", category: "tools", level: "Advanced", icon: "⚡" },
  { name: "Data Structures", category: "tools", level: "Intermediate", icon: "📐" },
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = activeCategory === "all" 
    ? skillsData 
    : skillsData.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="section-padding">
      <div className="section-header">
        <span className="section-subtitle-badge">Core Capabilities</span>
        <h2 className="section-title">Technical Expertise</h2>
        <p className="section-intro">
          Technologies and tools I leverage daily to engineer full-stack applications.
        </p>
      </div>

      <div className="skills-tabs-wrapper">
        <div className="skills-tabs">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              className={`tab-button ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="skills-grid-modern">
        {filteredSkills.map((skill) => (
          <div key={skill.name} className="skill-card-modern">
            <div className="skill-card-header">
              <span className="skill-emoji-icon">{skill.icon}</span>
              <span className="skill-level-badge">{skill.level}</span>
            </div>
            <h3 className="skill-card-name">{skill.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;

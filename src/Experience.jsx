import React from "react";
import { Briefcase, GraduationCap, Award, Calendar, CheckCircle2, Building2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import "./App.css";

const stats = [
  { label: "Years Experience", value: "2+" },
  { label: "Projects Completed", value: "20+" },
  { label: "Live Client Platforms", value: "5+" },
  { label: "Tech Stack Mastery", value: "10+" },
];

const timelineEvents = [
  {
    type: "education",
    icon: <GraduationCap size={20} />,
    title: "BS Software Engineering",
    period: "2022 - 2026",
    organization: "Bachelor of Science in Software Engineering",
    description: "Rigorous education in Object-Oriented Programming (OOP), Data Structures & Algorithms, Software Engineering Principles, Relational Databases, and Web Architecture.",
    highlights: [
      "Specialized in Full Stack Web Engineering",
      "Developed AI-Powered Travel Planner as Final Year Project (FYP)",
      "Strong academic & practical software development track record"
    ]
  },
  {
    type: "experience",
    icon: <Briefcase size={20} />,
    title: "Full Stack Developer — Digital Kohat",
    period: "Nov 2025 - Jul 2026",
    organization: "Digital Kohat Platform",
    description: "Engineered and maintained the official Digital Kohat civic web platform, directory, and administrative management services.",
    highlights: [
      "Developed responsive PHP/Laravel & React portal architecture",
      "Designed secure database management and municipal services directory",
      "Optimized site loading speeds and cross-device responsiveness"
    ]
  },
  {
    type: "milestone",
    icon: <Building2 size={20} />,
    title: "Rescue 1122 Division Prototype",
    period: "2024 - 2025",
    organization: "Innovative Design Company",
    description: "Developed operational dispatch and emergency station management prototype platforms at Innovative Design Company for Rescue 1122 Kohat Division.",
    highlights: [
      "Built real-time tracking dashboards for emergency dispatch monitoring",
      "Created analytics widgets for station incident management"
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="section-padding">
      <ScrollReveal direction="up" duration={0.6} className="section-header">
        <span className="section-subtitle-badge">Track Record & Milestones</span>
        <h2 className="section-title">Experience & Education</h2>
        <p className="section-intro">
          Academic foundation in Software Engineering paired with hands-on web production experience.
        </p>
      </ScrollReveal>

      {/* Stats Counter Bar */}
      <div className="stats-grid-modern">
        {stats.map((stat, index) => (
          <ScrollReveal
            key={index}
            direction="zoom"
            duration={0.4}
            delay={index * 0.08}
          >
            <div className="stat-card-modern">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Timeline Section */}
      <div className="timeline-container">
        <ScrollReveal direction="up" duration={0.5}>
          <h3 className="timeline-section-title">
            <Calendar size={22} className="timeline-header-icon" />
            <span>Engineering Timeline</span>
          </h3>
        </ScrollReveal>

        <div className="timeline-list">
          {timelineEvents.map((item, index) => (
            <ScrollReveal
              key={index}
              direction={index % 2 === 0 ? "left" : "right"}
              duration={0.5}
              delay={index * 0.15}
            >
              <div className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-icon-badge">
                    {item.icon}
                  </div>
                  {index < timelineEvents.length - 1 && <div className="timeline-connector"></div>}
                </div>

                <div className="timeline-content-card">
                  <div className="timeline-card-header">
                    <div>
                      <h4 className="timeline-item-title">{item.title}</h4>
                      <span className="timeline-org">{item.organization}</span>
                    </div>
                    <span className="timeline-period">{item.period}</span>
                  </div>

                  <p className="timeline-description">{item.description}</p>

                  <div className="timeline-highlights">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="timeline-highlight-bullet">
                        <CheckCircle2 size={15} className="bullet-icon" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

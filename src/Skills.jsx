import React from "react";
import "./App.css";

const skills = ["HTML", "CSS", "JavaScript", "ReactJS", "PHP", "Laravel", "MySQL", "OOPS"];

const Skills = () => (
  <section id="skills">
    <div className="animate">
      <h2>Technical Skills</h2>
      <div className="skills-list">
        {skills.map(skill => <div key={skill} className="skill-item">{skill}</div>)}
      </div>
    </div>
  </section>
);

export default Skills;

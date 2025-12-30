import React from "react";

const Hero = () => {
  return (
    <section id="home">
      <div className="hero-content">
        <div className="hero-text animate">
          <h1>
            Hi, I'm <span className="highlight">Sahil</span>
          </h1>
          <p>
            <strong style={{ color: 'var(--text-main)' }}>A Software Engineer</strong> & Full Stack Web Developer crafting high-performance, beautiful
            web experiences with modern technologies.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn-primary">View My Work</a>
            <a href="#contact" className="btn-primary" style={{ background: 'rgba(255,255,255,0.05)', boxShadow: 'none', border: '1px solid var(--glass-border)' }}>Contact Me</a>
          </div>
        </div>
        <div className="hero-image-container animate" style={{ animationDelay: '0.2s' }}>
          <div className="hero-image-wrapper">
            <img src="/sahil2.jpeg" alt="Sahil Rendering" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

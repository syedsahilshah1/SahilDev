import React, { useState } from "react";
import { X, Briefcase, ExternalLink, UserCheck, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

const cvPdfPath = "/Black Purple and White Modern Professional Software Engineer CV (1).pdf";

const VideoStatusPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigateHireMe = () => {
    window.location.hash = "#hire-me";
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="video-popup-container"
        >
          {/* Top Close Bar */}
          <button
            onClick={() => setIsOpen(false)}
            className="video-popup-close-btn"
            title="Minimize status widget"
          >
            <X size={16} />
          </button>

          {/* Media / Visual Box - Direct Navigation to #hire-me */}
          <a href="#hire-me" className="video-popup-media-box" title="Go to CV & Hire Me Section">
            <img
              src="/sahil2.jpeg"
              alt="Sahil Syed - Software Engineer"
              className="video-popup-img"
            />

            {/* Hover Overlay Badge */}
            <div className="video-play-overlay">
              <div className="video-play-button">
                <FileText size={20} color="#ffffff" />
              </div>
              <span className="video-play-text">View CV & Hiring Info</span>
            </div>

            {/* Live Status Pill Overlay */}
            <div className="video-popup-live-pill">
              <span className="live-dot"></span>
              <span>Open for Hiring</span>
            </div>
          </a>

          {/* Content Details */}
          <div className="video-popup-content">
            <div className="video-popup-header">
              <h4 className="video-popup-name">Syed Sahil Shah</h4>
              <span className="video-popup-role">Full Stack Engineer</span>
            </div>

            <p className="video-popup-bio">
              BS Software Engineer available for remote roles, internships, and custom web engineering.
            </p>

            {/* Actions Bar */}
            <div className="video-popup-actions">
              <a href="#hire-me" className="btn-popup-primary">
                <Briefcase size={14} />
                <span>Hire Me</span>
              </a>
              <a
                href={encodeURI(cvPdfPath)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-popup-secondary"
                title="Download CV (PDF)"
              >
                <ExternalLink size={14} />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Minimized Floating Bubble - Direct Navigation to #hire-me on click */
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.08, y: -4 }}
          onClick={handleNavigateHireMe}
          className="video-popup-minimized-bubble"
          title="Click to view CV & Hire Me section"
        >
          <div className="minimized-avatar-wrapper">
            <img src="/sahil2.jpeg" alt="Sahil Syed" className="minimized-avatar" />
            <span className="minimized-status-dot"></span>
          </div>
          <div className="minimized-text-col">
            <span className="minimized-title">Sahil Syed</span>
            <span className="minimized-badge">⚡ Open to Work (CV)</span>
          </div>
          <div className="minimized-icon-box">
            <UserCheck size={16} color="#818cf8" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoStatusPopup;

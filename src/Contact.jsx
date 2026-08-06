import React, { useState } from "react";
import { Mail, Phone, Send, Copy, Check, MapPin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import "./App.css";

const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const emailText = "sahilkhan536ah@gmail.com";
  const phoneText = "03410472229";

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Sender Name: ${name}\nSender Email: ${email}\n\nMessage Content:\n${message}`);

    window.location.href = `mailto:${emailText}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-padding">
      <ScrollReveal direction="up" duration={0.6} className="section-header">
        <span className="section-subtitle-badge">Get In Touch</span>
        <h2 className="section-title">Let's Work Together</h2>
        <p className="section-intro">
          Whether you have an open remote role, freelance project, or technical question, feel free to reach out!
        </p>
      </ScrollReveal>

      <div className="contact-grid">
        {/* Contact Info Pills */}
        <ScrollReveal direction="left" duration={0.6} delay={0.1} className="contact-info-cards">
          <div className="contact-card">
            <div className="contact-card-icon">
              <Mail size={22} />
            </div>
            <div className="contact-card-details">
              <span className="contact-label">Email Address</span>
              <span className="contact-val">{emailText}</span>
            </div>
            <button
              onClick={() => copyToClipboard(emailText, "email")}
              className="btn-copy-action"
              title="Copy Email"
            >
              {copiedEmail ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
              <span>{copiedEmail ? "Copied!" : "Copy"}</span>
            </button>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">
              <Phone size={22} />
            </div>
            <div className="contact-card-details">
              <span className="contact-label">Phone & WhatsApp</span>
              <span className="contact-val">{phoneText}</span>
            </div>
            <button
              onClick={() => copyToClipboard(phoneText, "phone")}
              className="btn-copy-action"
              title="Copy Phone"
            >
              {copiedPhone ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
              <span>{copiedPhone ? "Copied!" : "Copy"}</span>
            </button>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">
              <MapPin size={22} />
            </div>
            <div className="contact-card-details">
              <span className="contact-label">Location</span>
              <span className="contact-val">Pakistan (Remote Worldwide)</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Contact Form */}
        <ScrollReveal direction="right" duration={0.6} delay={0.2} className="contact-form-wrapper">
          <form onSubmit={handleSubmit} className="contact-form-modern">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="John Doe" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="john@example.com" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="4" 
                placeholder="Hi Sahil, I am reaching out regarding..." 
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-send-contact">
              <Send size={18} />
              <span>Send Email Message</span>
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Contact;

import React from "react";
import "./App.css";


const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    // Constructing the mailto link
    const subject = encodeURIComponent(`New Portfolio Message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:sahilkhan536ah@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact">
      <div className="animate">
        <h2>Get In Touch</h2>
        <div className="contact-info" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>📧 sahilkhan536ah@gmail.com</p>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginTop: '0.5rem' }}>📞 03410472229</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

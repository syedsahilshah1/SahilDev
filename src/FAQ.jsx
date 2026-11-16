import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";
import { ChevronDown, HelpCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "faqs"),
      where("published", "==", true),
      orderBy("order", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setFaqs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, []);

  const grouped = faqs.reduce((acc, faq) => {
    const cat = faq.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(faq);
    return acc;
  }, {});

  const toggle = (id) => setOpenId(openId === id ? null : id);

  // FAQ Schema for rich snippets
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <section className="faq-section section-padding" id="faq" aria-labelledby="faq-heading">
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <ScrollReveal>
        <div className="section-header">
          <span className="section-subtitle-badge">❓ Common Questions</span>
          <h2 id="faq-heading" className="section-title">Frequently Asked Questions</h2>
          <p className="section-intro">
            Answers to common questions about <strong>web development services in Islamabad</strong>, <strong>web development in Rawalpindi</strong>, and across <strong>Pakistan</strong>. Get clarity on pricing, timelines, technologies, and hiring a freelance web developer.
          </p>
        </div>
      </ScrollReveal>

      {loading ? (
        <div className="blog-loading" role="status" aria-live="polite">
          <div className="spinner" />
          <p>Loading FAQs...</p>
        </div>
      ) : faqs.length === 0 ? (
        <ScrollReveal>
          <div className="blog-empty">
            <HelpCircle size={48} style={{ opacity: 0.3, margin: "0 auto 1rem", display: "block" }} />
            <p>No FAQs published yet. Check back soon!</p>
          </div>
        </ScrollReveal>
      ) : (
        <div className="faq-container">
          {Object.entries(grouped).map(([category, items]) => (
            <ScrollReveal key={category}>
              <div className="faq-group">
                <h3 className="faq-group-title">{category}</h3>
                <dl className="faq-list">
                  {items.map((faq) => (
                    <div key={faq.id} className={`faq-item${openId === faq.id ? " open" : ""}`}>
                      <dt>
                        <button
                          className="faq-question"
                          onClick={() => toggle(faq.id)}
                          aria-expanded={openId === faq.id}
                          aria-controls={`faq-answer-${faq.id}`}
                        >
                          <span>{faq.question}</span>
                          <ChevronDown size={18} className="faq-chevron" aria-hidden="true" />
                        </button>
                      </dt>
                      <dd id={`faq-answer-${faq.id}`} className="faq-answer" role="region" aria-label={`Answer to: ${faq.question}`}>
                        <p>{faq.answer}</p>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </section>
  );
};

export default FAQ;


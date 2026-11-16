import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";
import { Tag, Clock, Calendar, X, BookOpen, ChevronRight, ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "blogs"),
      where("published", "==", true),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setBlogs(snap.docs.map((d) => ({ id: d.id, ...d.data(), createdAt: d.data().createdAt?.toDate() || new Date() })));
      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, []);

  const allTags = ["All", ...Array.from(new Set(blogs.flatMap((b) => b.tags || [])))];
  const filtered = activeTag === "All" ? blogs : blogs.filter((b) => (b.tags || []).includes(activeTag));

  const formatDate = (d) => d instanceof Date ? d.toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" }) : "";
  const formatDateISO = (d) => d instanceof Date ? d.toISOString().split("T")[0] : "";

  const closeModal = () => setSelectedBlog(null);

  const blogSchema = blogs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "SyedDev Web Development Blog",
    "description": "Expert insights, tutorials, and guides on web development in Islamabad, Rawalpindi, and Pakistan. Covering React, Next.js, Laravel, Node.js, and modern software engineering.",
    "url": "https://sahilportfol.netlify.app/#blog",
    "author": {
      "@type": "Person",
      "name": "Syed Sahil",
      "url": "https://sahilportfol.netlify.app/"
    },
    "blogPosts": filtered.slice(0, 10).map(blog => ({
      "@type": "BlogPosting",
      "headline": blog.title,
      "description": blog.excerpt,
      "url": `https://sahilportfol.netlify.app/#blog/${blog.id}`,
      "datePublished": formatDateISO(blog.createdAt),
      "author": {
        "@type": "Person",
        "name": "Syed Sahil"
      },
      "publisher": {
        "@type": "Organization",
        "name": "SyedDev",
        "logo": {
          "@type": "ImageObject",
          "url": "https://sahilportfol.netlify.app/icon.jpg"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://sahilportfol.netlify.app/#blog/${blog.id}`
      },
      "keywords": (blog.tags || []).join(", "),
      "articleSection": blog.category || "Web Development"
    }))
  } : null;

  return (
    <section className="blog-section section-padding" id="blog" aria-labelledby="blog-heading">
      {blogSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      )}
      <ScrollReveal>
        <div className="section-header">
          <span className="section-subtitle-badge">📝 Insights & Tutorials</span>
          <h2 id="blog-heading" className="section-title">Web Development Blog</h2>
          <p className="section-intro">
            Expert tips, tutorials and insights on <strong>web development in Islamabad</strong>, <strong>web development in Rawalpindi</strong>, and across Pakistan — covering React, Next.js, Laravel, Node.js and modern software engineering for local businesses and startups.
          </p>
        </div>
      </ScrollReveal>

      {/* Tag filters */}
      {allTags.length > 1 && (
        <ScrollReveal>
          <div className="blog-tag-filters" role="group" aria-label="Filter blog posts by topic">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`blog-tag-btn${activeTag === tag ? " active" : ""}`}
                aria-pressed={activeTag === tag}
              >
                {tag}
              </button>
            ))}
          </div>
        </ScrollReveal>
      )}

      {loading ? (
        <div className="blog-loading" role="status" aria-live="polite">
          <div className="spinner" />
          <p>Loading articles...</p>
        </div>
      ) : filtered.length === 0 ? (
        <ScrollReveal>
          <div className="blog-empty">
            <BookOpen size={48} style={{ opacity: 0.3, margin: "0 auto 1rem", display: "block" }} />
            <p>No articles published yet. Check back soon for web development insights!</p>
          </div>
        </ScrollReveal>
      ) : (
        <div className="blog-grid" role="list" aria-label="Blog articles">
          {filtered.map((blog, i) => (
            <article key={blog.id} className="blog-card" role="listitem">
              <ScrollReveal delay={i * 80}>
                <div className="blog-card-top">
                  {blog.category && <span className="blog-category-chip">{blog.category}</span>}
                  <div className="blog-card-meta">
                    <time dateTime={formatDateISO(blog.createdAt)}><Clock size={13} /> {blog.readTime || "5 min"}</time>
                    <time dateTime={formatDateISO(blog.createdAt)}><Calendar size={13} /> {formatDate(blog.createdAt)}</time>
                  </div>
                </div>
                <h3 className="blog-card-title">{blog.title}</h3>
                <p className="blog-card-excerpt">{blog.excerpt}</p>
                <div className="blog-card-footer">
                  <div className="blog-card-tags">
                    {(blog.tags || []).slice(0, 3).map((t) => (
                      <span key={t} className="blog-tag-pill">
                        <Tag size={11} /> {t}
                      </span>
                    ))}
                  </div>
                  <button 
                    className="blog-read-more" 
                    onClick={() => setSelectedBlog(blog)}
                    aria-label={`Read full article: ${blog.title}`}
                  >
                    Read Article <ArrowRight size={14} />
                  </button>
                </div>
              </ScrollReveal>
            </article>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedBlog && (
        <div className="blog-modal-overlay" onClick={closeModal} role="dialog" aria-modal="true" aria-labelledby="modal-blog-title">
          <div className="blog-modal" onClick={(e) => e.stopPropagation()}>
            <button className="blog-modal-close" onClick={closeModal} aria-label="Close article">
              <X size={20} />
            </button>
            <article>
              <header className="blog-modal-header">
                {selectedBlog.category && <span className="blog-category-chip">{selectedBlog.category}</span>}
                <div className="blog-card-meta" style={{ marginTop: "0.5rem" }}>
                  <time dateTime={formatDateISO(selectedBlog.createdAt)}><Clock size={13} /> {selectedBlog.readTime || "5 min"}</time>
                  <time dateTime={formatDateISO(selectedBlog.createdAt)}><Calendar size={13} /> {formatDate(selectedBlog.createdAt)}</time>
                </div>
              </header>
              <h2 id="modal-blog-title" className="blog-modal-title">{selectedBlog.title}</h2>
              <div className="blog-card-tags" style={{ marginBottom: "1.5rem" }}>
                {(selectedBlog.tags || []).map((t) => (
                  <span key={t} className="blog-tag-pill"><Tag size={11} /> {t}</span>
                ))}
              </div>
              <div className="blog-modal-content">
                {(selectedBlog.content || selectedBlog.excerpt || "").split("\n").map((para, i) =>
                  para.trim() ? <p key={i} style={{ marginBottom: "1rem" }}>{para}</p> : <br key={i} />
                )}
              </div>
            </article>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;


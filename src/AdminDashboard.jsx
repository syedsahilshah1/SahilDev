import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged, 
  sendPasswordResetEmail 
} from "firebase/auth";
import { collection, query, orderBy, onSnapshot, updateDoc, doc, addDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  LogOut, 
  Search, 
  Filter, 
  MessageSquare, 
  Send, 
  Copy, 
  RefreshCw, 
  KeyRound,
  UserPlus,
  LayoutDashboard,
  Inbox,
  FileText,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  PlusCircle,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles
} from "lucide-react";
import "./App.css";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");

  // Active admin tab
  const [activeTab, setActiveTab] = useState("orders");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Orders data
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // Communication & reply state
  const [replyTexts, setReplyTexts] = useState({});
  const [activeReplyBox, setActiveReplyBox] = useState({});

  // Blog state
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [blogForm, setBlogForm] = useState({ title: "", excerpt: "", content: "", tags: "", category: "", readTime: "5 min" });
  const [blogSaving, setBlogSaving] = useState(false);

  // FAQ state
  const [faqs, setFaqs] = useState([]);
  const [faqsLoading, setFaqsLoading] = useState(true);
  const [faqForm, setFaqForm] = useState({ question: "", answer: "", category: "", order: 1 });
  const [faqSaving, setFaqSaving] = useState(false);

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecking(false);
      if (currentUser) {
        setOrdersLoading(true);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch orders in real-time
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        }));
        setOrders(fetchedOrders);
        setOrdersLoading(false);
      },
      (err) => {
        console.error("Error fetching orders: ", err);
        setOrdersLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Fetch blogs
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setBlogs(snap.docs.map((d) => ({ id: d.id, ...d.data(), createdAt: d.data().createdAt?.toDate() || new Date() })));
      setBlogsLoading(false);
    }, () => setBlogsLoading(false));
    return () => unsub();
  }, [user]);

  // Fetch FAQs
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "faqs"), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      setFaqs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setFaqsLoading(false);
    }, () => setFaqsLoading(false));
    return () => unsub();
  }, [user]);

  // Blog CRUD
  const handleAddBlog = async (e) => {
    e.preventDefault();
    if (!blogForm.title.trim() || !blogForm.excerpt.trim()) { alert("Title and excerpt required."); return; }
    setBlogSaving(true);
    try {
      await addDoc(collection(db, "blogs"), {
        ...blogForm,
        tags: blogForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
        published: true,
        createdAt: serverTimestamp(),
      });
      setBlogForm({ title: "", excerpt: "", content: "", tags: "", category: "", readTime: "5 min" });
    } catch (err) { alert("Failed to save blog: " + err.message); }
    finally { setBlogSaving(false); }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Delete this blog post?")) return;
    try { await deleteDoc(doc(db, "blogs", id)); } catch (err) { alert("Delete failed: " + err.message); }
  };

  const handleToggleBlogPublished = async (blog) => {
    try { await updateDoc(doc(db, "blogs", blog.id), { published: !blog.published }); } catch (err) { alert("Update failed."); }
  };

  // FAQ CRUD
  const handleAddFaq = async (e) => {
    e.preventDefault();
    if (!faqForm.question.trim() || !faqForm.answer.trim()) { alert("Question and answer required."); return; }
    setFaqSaving(true);
    try {
      await addDoc(collection(db, "faqs"), {
        ...faqForm,
        order: Number(faqForm.order) || 1,
        published: true,
        createdAt: serverTimestamp(),
      });
      setFaqForm({ question: "", answer: "", category: "", order: 1 });
    } catch (err) { alert("Failed to save FAQ: " + err.message); }
    finally { setFaqSaving(false); }
  };

  const handleDeleteFaq = async (id) => {
    if (!window.confirm("Delete this FAQ?")) return;
    try { await deleteDoc(doc(db, "faqs", id)); } catch (err) { alert("Delete failed: " + err.message); }
  };

  const handleToggleFaqPublished = async (faq) => {
    try { await updateDoc(doc(db, "faqs", faq.id), { published: !faq.published }); } catch (err) { alert("Update failed."); }
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!email.trim() || !password) {
      setLoginError("Please enter both admin email and password.");
      return;
    }

    setLoginLoading(true);
    setLoginError("");
    setResetMessage("");

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      console.error("Login error: ", err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setLoginError("Invalid credentials or account not registered in Firebase Auth yet. Use 'Create Admin Account' below if this is your first time, or 'Forgot Password' to reset.");
      } else {
        setLoginError("Authentication failed: " + err.message);
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegisterAdmin = async () => {
    if (!email.trim() || !password) {
      setLoginError("Please enter both email and password to create an admin account.");
      return;
    }
    if (password.length < 6) {
      setLoginError("Password must be at least 6 characters long.");
      return;
    }

    setLoginLoading(true);
    setLoginError("");
    setResetMessage("");

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      setResetMessage("Admin account created & authenticated successfully!");
    } catch (err) {
      console.error("Account creation error: ", err);
      if (err.code === "auth/email-already-in-use") {
        setLoginError("This email is already registered in Firebase. If you forgot your password, click 'Forgot Password?' below.");
      } else {
        setLoginError("Failed to create admin account: " + err.message);
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setResetError("Please enter your Admin Email in the field above first.");
      setResetMessage("");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setResetMessage(`Password reset link sent to ${email.trim()}! Check your email inbox to reset your password.`);
      setResetError("");
    } catch (err) {
      console.error("Password reset error: ", err);
      setResetError("Failed to send reset email: " + err.message);
      setResetMessage("");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error: ", err);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
    } catch (err) {
      console.error("Error updating status: ", err);
      alert("Failed to update status.");
    }
  };

  const handleSendReply = async (order) => {
    const text = replyTexts[order.id];
    if (!text || !text.trim()) {
      alert("Please write a message to send.");
      return;
    }

    const readableType = order.projectType.charAt(0).toUpperCase() + order.projectType.slice(1);
    const subject = `Re: Smart Portfolio Project Request (${readableType}) - SahilDev`;
    const body = `Hi ${order.name},\n\n${text}\n\n---\nBest regards,\nSahil Dev\nFull Stack Web Developer\nhttps://sahilportfol.netlify.app`;
    
    const mailtoUrl = `mailto:${order.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, "_blank");

    try {
      const orderRef = doc(db, "orders", order.id);
      const existingReplies = order.replies || [];
      const updatedReplies = [...existingReplies, { text, sentAt: new Date() }];
      
      await updateDoc(orderRef, { replies: updatedReplies });
      setReplyTexts(prev => ({ ...prev, [order.id]: "" }));
    } catch (err) {
      console.error("Error saving reply history: ", err);
      alert("Failed to save reply history in database, but your email client was opened.");
    }
  };

  const handleCopyToClipboard = async (order) => {
    const text = replyTexts[order.id];
    if (!text || !text.trim()) {
      alert("Please write a message to copy.");
      return;
    }

    const readableType = order.projectType.charAt(0).toUpperCase() + order.projectType.slice(1);
    const subject = `Re: Smart Portfolio Project Request (${readableType}) - SahilDev`;
    const body = `To: ${order.email}\nSubject: ${subject}\n\nHi ${order.name},\n\n${text}\n\n---\nBest regards,\nSahil Dev\nFull Stack Web Developer\nhttps://sahilportfol.netlify.app`;

    try {
      await navigator.clipboard.writeText(body);
      alert("Email pre-formatted content (To, Subject, and Body) copied to clipboard!");

      const orderRef = doc(db, "orders", order.id);
      const existingReplies = order.replies || [];
      const updatedReplies = [...existingReplies, { text, sentAt: new Date() }];
      
      await updateDoc(orderRef, { replies: updatedReplies });
      setReplyTexts(prev => ({ ...prev, [order.id]: "" }));
    } catch (err) {
      console.error("Error copying or saving reply history: ", err);
      alert("Failed to save reply history in database: " + err.message);
    }
  };

  const toggleReplyBox = (orderId) => {
    setActiveReplyBox(prev => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  // Filtering and Sorting logic
  const filteredOrders = orders
    .filter((order) => {
      const matchesType = filterType === "all" || order.projectType === filterType;
      const matchesStatus = filterStatus === "all" || order.status === filterStatus;
      
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        order.name?.toLowerCase().includes(searchLower) ||
        order.email?.toLowerCase().includes(searchLower) ||
        order.description?.toLowerCase().includes(searchLower);

      return matchesType && matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return b.createdAt - a.createdAt;
      } else {
        return a.createdAt - b.createdAt;
      }
    });

  if (authChecking) {
    return (
      <section className="admin-login-section">
        <div className="admin-loading-card">
          <RefreshCw size={36} className="spinning-loader" style={{ margin: "0 auto 1rem", color: "#818cf8" }} />
          <p style={{ fontWeight: 600, color: "#ffffff", fontSize: "1.05rem" }}>Verifying Admin Session...</p>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>Connecting to secure portal</span>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="admin-login-section">
        <div className="login-wrapper">
          <div className="login-card">
            <div className="login-card-header">
              <div className="admin-icon-wrapper">
                <ShieldCheck size={32} />
              </div>
              <h2>Admin Control Portal</h2>
              <p className="login-subtitle">
                Authorized management access for <strong>SyedDev Software Solutions</strong>. Sign in below.
              </p>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              {loginError && <div className="form-error-banner">{loginError}</div>}
              {resetMessage && <div className="form-success-banner">{resetMessage}</div>}
              {resetError && <div className="form-error-banner">{resetError}</div>}
              
              <div className="form-group">
                <label htmlFor="admin-email">
                  <Mail size={16} className="inline-icon" /> Admin Email
                </label>
                <input
                  type="email"
                  id="admin-email"
                  autoComplete="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="admin-password">
                  <Lock size={16} className="inline-icon" /> Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="admin-password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input password-input"
                    required
                  />
                  <button
                    type="button"
                    className="btn-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Hide password" : "Show password"}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="auth-buttons-grid">
                <button type="submit" disabled={loginLoading} className="btn-hero-primary login-btn">
                  {loginLoading ? (
                    <>
                      <RefreshCw size={16} className="spinning-loader" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      <span>Sign In to Dashboard</span>
                    </>
                  )}
                </button>
              </div>

              <div className="forgot-password-box">
                <button type="button" onClick={handleForgotPassword} className="btn-forgot-pass">
                  <KeyRound size={15} />
                  <span>Forgot Password? Send Reset Email</span>
                </button>
                <p className="security-note">
                  🔒 Password recovery instructions will be dispatched to your registered admin inbox.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }

  const pendingOrdersCount = orders.filter(o => o.status === "Pending").length;
  const inProgressOrdersCount = orders.filter(o => o.status === "In Progress").length;
  const completedOrdersCount = orders.filter(o => o.status === "Completed").length;

  return (
    <div className="admin-layout-container">
      {/* Mobile Top Navbar */}
      <div className="admin-mobile-topbar">
        <button 
          className="admin-hamburger-btn"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className="admin-mobile-brand">
          <ShieldCheck size={20} className="brand-accent" />
          <span>SYED<span>DEV</span> ADMIN</span>
        </div>
        <button onClick={handleLogout} className="btn-logout-mini" title="Sign Out">
          <LogOut size={16} />
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {mobileSidebarOpen && (
        <div 
          className="admin-sidebar-overlay"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Modern Sidebar */}
      <aside className={`admin-sidebar ${mobileSidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-brand" onClick={() => (window.location.hash = "#")}>
            <div className="brand-icon-box">
              <ShieldCheck size={22} />
            </div>
            <div className="brand-text">
              <h3>SYED<span>DEV</span></h3>
              <p>Control Center</p>
            </div>
          </div>
        </div>

        <div className="admin-user-profile-widget">
          <div className="user-avatar-circle">
            {user.email ? user.email.charAt(0).toUpperCase() : "A"}
          </div>
          <div className="user-profile-info">
            <span className="user-badge">Super Admin</span>
            <p className="user-email-text" title={user.email}>{user.email}</p>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          <div className="sidebar-section-label">MANAGEMENT</div>
          <button 
            className={`admin-nav-item ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => { setActiveTab("orders"); setMobileSidebarOpen(false); }}
          >
            <Inbox size={18} />
            <span>Service Orders</span>
            {orders.length > 0 && (
              <span className="nav-item-badge">{orders.length}</span>
            )}
          </button>

          <button 
            className={`admin-nav-item ${activeTab === "blog" ? "active" : ""}`}
            onClick={() => { setActiveTab("blog"); setMobileSidebarOpen(false); }}
          >
            <FileText size={18} />
            <span>Blog Articles</span>
            {blogs.length > 0 && (
              <span className="nav-item-badge neutral">{blogs.length}</span>
            )}
          </button>

          <button 
            className={`admin-nav-item ${activeTab === "faqs" ? "active" : ""}`}
            onClick={() => { setActiveTab("faqs"); setMobileSidebarOpen(false); }}
          >
            <HelpCircle size={18} />
            <span>FAQs & Q/A</span>
            {faqs.length > 0 && (
              <span className="nav-item-badge neutral">{faqs.length}</span>
            )}
          </button>

          <div className="sidebar-section-label" style={{ marginTop: "1.5rem" }}>QUICK ACTIONS</div>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.location.hash = "#"; }} 
            className="admin-nav-item external"
          >
            <ExternalLink size={17} />
            <span>View Live Website</span>
          </a>
        </nav>

        <div className="admin-sidebar-footer">
          <button onClick={handleLogout} className="btn-sidebar-logout">
            <LogOut size={17} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-content-area">
        {/* Top Breadcrumb & Quick Bar */}
        <div className="admin-topbar-breadcrumb">
          <div className="breadcrumb-left">
            <span className="breadcrumb-root">Dashboard</span>
            <ChevronRight size={14} className="breadcrumb-sep" />
            <span className="breadcrumb-current">
              {activeTab === "orders" ? "Service Requests" : activeTab === "blog" ? "Blog Management" : "FAQ Management"}
            </span>
          </div>

          <div className="topbar-right-actions">
            <div className="live-status-pill">
              <span className="pulse-dot"></span>
              <span>Firestore Live</span>
            </div>
          </div>
        </div>

        {/* Dynamic Metric Counter Strip */}
        <div className="admin-metrics-strip">
          <div className="metric-card" onClick={() => { setActiveTab("orders"); setFilterStatus("all"); }}>
            <div className="metric-icon orders">
              <Inbox size={20} />
            </div>
            <div className="metric-data">
              <span className="metric-label">Total Requests</span>
              <span className="metric-number">{orders.length}</span>
            </div>
          </div>

          <div className="metric-card" onClick={() => { setActiveTab("orders"); setFilterStatus("Pending"); }}>
            <div className="metric-icon pending">
              <Clock size={20} />
            </div>
            <div className="metric-data">
              <span className="metric-label">Pending Review</span>
              <span className="metric-number">{pendingOrdersCount}</span>
            </div>
          </div>

          <div className="metric-card" onClick={() => { setActiveTab("orders"); setFilterStatus("Completed"); }}>
            <div className="metric-icon completed">
              <CheckCircle2 size={20} />
            </div>
            <div className="metric-data">
              <span className="metric-label">Completed</span>
              <span className="metric-number">{completedOrdersCount}</span>
            </div>
          </div>

          <div className="metric-card" onClick={() => setActiveTab("blog")}>
            <div className="metric-icon blog">
              <FileText size={20} />
            </div>
            <div className="metric-data">
              <span className="metric-label">Published Articles</span>
              <span className="metric-number">{blogs.length}</span>
            </div>
          </div>
        </div>

        {/* ═══ ORDERS TAB ═══ */}
        {activeTab === "orders" && (
          <div className="admin-view-wrapper">
            <div className="view-header-row">
              <div>
                <h2>Incoming Service Requests</h2>
                <p>Filter, search, review problem statements and directly reply to clients.</p>
              </div>
            </div>

      <div className="dashboard-controls">
        <div className="control-group search-bar-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by client name, email, or project description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input search-input"
          />
        </div>

        <div className="filters-row">
          <div className="control-group">
            <label><Filter size={14} className="inline-icon" /> Service Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="form-select"
            >
              <option value="all">All Types</option>
              <option value="student">Student Projects</option>
              <option value="planned">Planned Projects</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div className="control-group">
            <label>Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="form-select"
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="control-group">
            <label>Sort Order</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="form-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {ordersLoading ? (
        <div className="dashboard-loading">
          <RefreshCw size={32} className="spinning-loader" />
          <p>Retrieving incoming project requests...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="no-orders-card">
          <p>No project requests found matching your filter criteria.</p>
        </div>
      ) : (
        <div className="orders-list">
          <div className="order-stats-bar">
            <span>Showing {filteredOrders.length} service requests</span>
          </div>
          
          <div className="orders-grid">
            {filteredOrders.map((order) => (
              <div key={order.id} className={`order-card status-${order.status.toLowerCase().replace(" ", "-")}`}>
                <div className="order-card-header">
                  <span className={`order-type-badge ${order.projectType}`}>
                    {order.projectType === "student" ? "🎓 Student" : order.projectType === "planned" ? "🚀 Planned" : "🛠️ Maintenance"}
                  </span>
                  <span className={`order-status-badge ${order.status.toLowerCase().replace(" ", "-")}`}>
                    {order.status}
                  </span>
                </div>

                <div className="order-card-body">
                  <h3>Client: {order.name}</h3>
                  <a href={`mailto:${order.email}`} className="client-email">{order.email}</a>
                  
                  <div className="order-meta-info">
                    <p><strong>Budget:</strong> {order.budget}</p>
                    <p><strong>Deadline:</strong> {new Date(order.deadline).toLocaleDateString()}</p>
                    <p><strong>Requested on:</strong> {order.createdAt.toLocaleString()}</p>
                  </div>

                  {order.selectedCriteria && order.selectedCriteria.length > 0 && (
                    <div className="order-tech-tags">
                      <strong>Selected Technologies:</strong>
                      <div className="tags-wrapper">
                        {order.selectedCriteria.map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="order-desc-box">
                    <strong>Problem Statement:</strong>
                    <p>{order.description}</p>
                  </div>

                  <div className="order-reply-section">
                    <button 
                      onClick={() => toggleReplyBox(order.id)} 
                      className="btn-reply-toggle"
                    >
                      <MessageSquare size={16} />
                      <span>{activeReplyBox[order.id] ? "Close Response Panel" : "Compose Reply to Client"}</span>
                    </button>

                    {activeReplyBox[order.id] && (
                      <div className="reply-box-content animate">
                        {order.replies && order.replies.length > 0 && (
                          <div className="replies-history">
                            <h5>Communication Log:</h5>
                            <div className="replies-list-container">
                              {order.replies.map((r, i) => {
                                const date = r.sentAt?.toDate ? r.sentAt.toDate() : new Date(r.sentAt);
                                return (
                                  <div key={i} className="reply-history-item">
                                    <span className="reply-date">{date.toLocaleString()}</span>
                                    <p className="reply-body-text">{r.text}</p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        <div className="reply-input-wrapper">
                          <textarea
                            rows="4"
                            placeholder="Draft your proposal, next steps, or quote details here..."
                            value={replyTexts[order.id] || ""}
                            onChange={(e) => setReplyTexts(prev => ({ ...prev, [order.id]: e.target.value }))}
                            className="form-textarea reply-textarea"
                          />
                          <div className="reply-actions-row">
                            <button 
                              onClick={() => handleSendReply(order)}
                              className="btn-primary btn-send-reply"
                              title="Launches your system mail client"
                            >
                              <Send size={15} />
                              <span>Launch Mail Client</span>
                            </button>
                            <button 
                              onClick={() => handleCopyToClipboard(order)}
                              className="btn-secondary btn-copy-reply"
                              title="Copy pre-formatted email to clipboard"
                            >
                              <Copy size={15} />
                              <span>Copy & Log</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="order-card-footer">
                  <label htmlFor={`status-select-${order.id}`}>Update Action Status:</label>
                  <select
                    id={`status-select-${order.id}`}
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="status-select-input"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
      )}

      {/* ═══ BLOG TAB ═══ */}
      {activeTab === "blog" && (
        <div className="admin-view-wrapper">
          <div className="view-header-row">
            <div>
              <h2>Blog Article Management</h2>
              <p>Publish technical articles and local SEO guides to rank on Google in Islamabad & Rawalpindi.</p>
            </div>
          </div>

          {/* Add Blog Form */}
          <form onSubmit={handleAddBlog} className="blog-form modern-glass-card">
            <h4 style={{ marginBottom: "1rem", color: "#818cf8" }}>Add New Blog Post</h4>
            <div className="form-group">
              <label>Title *</label>
              <input className="form-input" value={blogForm.title} onChange={(e) => setBlogForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Best Web Developer in Islamabad" required />
            </div>
            <div className="form-group">
              <label>Excerpt *</label>
              <input className="form-input" value={blogForm.excerpt} onChange={(e) => setBlogForm(p => ({ ...p, excerpt: e.target.value }))} placeholder="Short summary shown on card..." required />
            </div>
            <div className="form-group">
              <label>Full Content</label>
              <textarea className="form-textarea" rows={6} value={blogForm.content} onChange={(e) => setBlogForm(p => ({ ...p, content: e.target.value }))} placeholder="Full blog content (use line breaks for paragraphs)..." />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Tags (comma-separated)</label>
                <input className="form-input" value={blogForm.tags} onChange={(e) => setBlogForm(p => ({ ...p, tags: e.target.value }))} placeholder="React, Islamabad, Web Dev" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input className="form-input" value={blogForm.category} onChange={(e) => setBlogForm(p => ({ ...p, category: e.target.value }))} placeholder="e.g. Tutorials" />
              </div>
              <div className="form-group">
                <label>Read Time</label>
                <input className="form-input" value={blogForm.readTime} onChange={(e) => setBlogForm(p => ({ ...p, readTime: e.target.value }))} placeholder="5 min" />
              </div>
            </div>
            <button type="submit" disabled={blogSaving} className="btn-hero-primary" style={{ marginTop: "0.5rem" }}>
              {blogSaving ? "Saving..." : "➕ Publish Blog Post"}
            </button>
          </form>

          {/* Blog list */}
          {blogsLoading ? <p style={{ color: "var(--text-muted)", marginTop: "2rem" }}>Loading blogs...</p> : blogs.length === 0 ? (
            <p style={{ color: "var(--text-muted)", marginTop: "2rem" }}>No blog posts yet.</p>
          ) : (
            <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {blogs.map((blog) => (
                <div key={blog.id} className="admin-content-row">
                  <div style={{ flex: 1 }}>
                    <strong style={{ color: "var(--text-main)" }}>{blog.title}</strong>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.25rem" }}>{blog.excerpt}</p>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.4rem" }}>
                      {(blog.tags || []).map((t) => <span key={t} className="blog-tag-pill" style={{ fontSize: "0.75rem" }}>{t}</span>)}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexShrink: 0 }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                      <input type="checkbox" checked={!!blog.published} onChange={() => handleToggleBlogPublished(blog)} />
                      Published
                    </label>
                    <button onClick={() => handleDeleteBlog(blog.id)} className="btn-delete-admin" title="Delete">🗑️ Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══ FAQs TAB ═══ */}
      {activeTab === "faqs" && (
        <div className="admin-view-wrapper">
          <div className="view-header-row">
            <div>
              <h2>Frequently Asked Questions</h2>
              <p>Add and manage client FAQs displayed in the public FAQ accordion and Google schema markup.</p>
            </div>
          </div>

          {/* Add FAQ Form */}
          <form onSubmit={handleAddFaq} className="faq-form modern-glass-card">
            <h4 style={{ marginBottom: "1rem", color: "#818cf8" }}>Add New FAQ</h4>
            <div className="form-group">
              <label>Question *</label>
              <input className="form-input" value={faqForm.question} onChange={(e) => setFaqForm(p => ({ ...p, question: e.target.value }))} placeholder="e.g. Who is the best web developer in Islamabad?" required />
            </div>
            <div className="form-group">
              <label>Answer *</label>
              <textarea className="form-textarea" rows={4} value={faqForm.answer} onChange={(e) => setFaqForm(p => ({ ...p, answer: e.target.value }))} placeholder="Provide a clear answer..." required />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Category</label>
                <input className="form-input" value={faqForm.category} onChange={(e) => setFaqForm(p => ({ ...p, category: e.target.value }))} placeholder="e.g. Services, Local, Pricing" />
              </div>
              <div className="form-group">
                <label>Display Order</label>
                <input type="number" className="form-input" value={faqForm.order} onChange={(e) => setFaqForm(p => ({ ...p, order: e.target.value }))} min={1} />
              </div>
            </div>
            <button type="submit" disabled={faqSaving} className="btn-hero-primary" style={{ marginTop: "0.5rem" }}>
              {faqSaving ? "Saving..." : "➕ Add FAQ"}
            </button>
          </form>

          {/* FAQ list */}
          {faqsLoading ? <p style={{ color: "var(--text-muted)", marginTop: "2rem" }}>Loading FAQs...</p> : faqs.length === 0 ? (
            <p style={{ color: "var(--text-muted)", marginTop: "2rem" }}>No FAQs yet.</p>
          ) : (
            <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {faqs.map((faq) => (
                <div key={faq.id} className="admin-content-row">
                  <div style={{ flex: 1 }}>
                    <strong style={{ color: "var(--text-main)" }}>#{faq.order} — {faq.question}</strong>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.25rem" }}>{faq.answer}</p>
                    {faq.category && <span className="blog-category-chip" style={{ fontSize: "0.75rem", marginTop: "0.4rem", display: "inline-block" }}>{faq.category}</span>}
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexShrink: 0 }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                      <input type="checkbox" checked={!!faq.published} onChange={() => handleToggleFaqPublished(faq)} />
                      Published
                    </label>
                    <button onClick={() => handleDeleteFaq(faq.id)} className="btn-delete-admin" title="Delete">🗑️ Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      </main>
    </div>
  );
};

export default AdminDashboard;

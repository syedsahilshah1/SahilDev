import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { collection, query, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore";
import "./App.css";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");

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

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setLoginError("Please enter both email and password.");
      return;
    }

    setLoginLoading(true);
    setLoginError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error("Login error: ", err);
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setLoginError("Invalid admin credentials. Please try again.");
      } else {
        setLoginError("Authentication failed: " + err.message);
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setResetError("Please enter your admin email first to reset password.");
      setResetMessage("");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("Password reset email sent! Check your inbox.");
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
    
    // 1. Open local mail client
    const mailtoUrl = `mailto:${order.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, "_blank");

    // 2. Persist in Firestore
    try {
      const orderRef = doc(db, "orders", order.id);
      const existingReplies = order.replies || [];
      const updatedReplies = [...existingReplies, { text, sentAt: new Date() }];
      
      await updateDoc(orderRef, { replies: updatedReplies });
      
      // Clear input text for this order
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
      // 1. Copy to clipboard
      await navigator.clipboard.writeText(body);
      alert("Email pre-formatted content (To, Subject, and Body) copied to clipboard! You can now manually paste it in your Gmail or preferred mail client.");

      // 2. Persist in Firestore
      const orderRef = doc(db, "orders", order.id);
      const existingReplies = order.replies || [];
      const updatedReplies = [...existingReplies, { text, sentAt: new Date() }];
      
      await updateDoc(orderRef, { replies: updatedReplies });
      
      // Clear input text for this order
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

  if (!user) {
    return (
      <section className="admin-login-section">
        <div className="animate login-wrapper">
          <div className="login-card">
            <h2>Admin Login</h2>
            <p className="login-subtitle">Access the secure Smart Portfolio Service Dashboard</p>

            <form onSubmit={handleLogin} className="login-form">
              {loginError && <div className="form-error">{loginError}</div>}
              
              <div className="form-group">
                <label htmlFor="admin-email">Admin Email</label>
                <input
                  type="email"
                  id="admin-email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="admin-password">Password</label>
                <input
                  type="password"
                  id="admin-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              {resetMessage && <div className="form-success" style={{color: '#4ade80', fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'center'}}>{resetMessage}</div>}
              {resetError && <div className="form-error" style={{color: '#f87171', fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'center'}}>{resetError}</div>}

              <button type="submit" disabled={loginLoading} className="btn-primary login-btn">
                {loginLoading ? "Verifying Credentials..." : "Authenticate Admin"}
              </button>

              <div style={{textAlign: 'center', marginTop: '1rem'}}>
                <button type="button" onClick={handleForgotPassword} style={{background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', textDecoration: 'underline'}}>
                  Forgot Password?
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-dashboard-section">
      <div className="dashboard-header">
        <div>
          <h2>Service Control Center</h2>
          <p>Logged in as: <strong>{user.email}</strong></p>
        </div>
        <button onClick={handleLogout} className="btn-logout">
          Sign Out Dashboard
        </button>
      </div>

      <div className="dashboard-controls">
        <div className="control-group search-bar-wrapper">
          <input
            type="text"
            placeholder="Search by client name, email, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input search-input"
          />
        </div>

        <div className="filters-row">
          <div className="control-group">
            <label>Service Type</label>
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
            <label>Sort By</label>
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
          <div className="spinner"></div>
          <p>Retrieving incoming project requests...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="no-orders-card">
          <p>No project requests found matching the filter criteria.</p>
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
                      <strong>Skills:</strong>
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

                  {/* Dynamic Communication Hub Section */}
                  <div className="order-reply-section">
                    <button 
                      onClick={() => toggleReplyBox(order.id)} 
                      className="btn-reply-toggle"
                    >
                      {activeReplyBox[order.id] ? "▲ Close Response Panel" : "💬 Compose Reply to Client"}
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
                              title="Launches your local system default mail client (e.g. Windows Mail, Outlook, Mail app)"
                            >
                              ✉️ Launch Mail Client
                            </button>
                            <button 
                              onClick={() => handleCopyToClipboard(order)}
                              className="btn-secondary btn-copy-reply"
                              title="Copy pre-formatted email structure (To, Subject, Body) to clipboard to manually paste anywhere"
                            >
                              📋 Copy & Log (Manual)
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
    </section>
  );
};

export default AdminDashboard;

import React from "react";
import "./App.css";

const stats = [
    { label: "Years Experience", value: "1+" },
    { label: "Projects Completed", value: "10+" },
    { label: "Happy Clients", value: "4+" },
    { label: "Coffee Consumed", value: "∞" },
];

const Experience = () => (
    <section id="experience" style={{ background: 'rgba(30, 41, 59, 0.3)' }}>
        <div className="animate">
            <h2>Project Milestones</h2>
            <div className="stats-grid" style={styles.statsGrid}>
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card" style={styles.statCard}>
                        <h3 style={styles.statValue}>{stat.value}</h3>
                        <p style={styles.statLabel}>{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const styles = {
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        marginTop: '3rem',
    },
    statCard: {
        background: 'var(--bg-card)',
        padding: '2rem',
        borderRadius: '1.5rem',
        border: '1px solid var(--glass-border)',
        textAlign: 'center',
        transition: 'transform 0.3s ease',
    },
    statValue: {
        fontSize: '2.5rem',
        fontWeight: '800',
        background: 'var(--gradient-main)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '0.5rem',
    },
    statLabel: {
        fontSize: '1.1rem',
        color: 'var(--text-muted)',
        fontWeight: '600',
    },
};

export default Experience;

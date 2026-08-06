import React, { useEffect, useRef } from "react";

/**
 * StarryBackground Component
 * Renders a high-performance, twinkling starry night sky canvas background
 * with cosmic ambient nebula gradients.
 */
const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Create twinkling star field
    const starCount = Math.floor((width * height) / 3800);
    const stars = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.3,
        alpha: Math.random(),
        twinkleSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
        color:
          Math.random() > 0.85
            ? "#a855f7"
            : Math.random() > 0.7
            ? "#818cf8"
            : Math.random() > 0.55
            ? "#cbd5e1"
            : "#ffffff",
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 1 || star.alpha < 0.1) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        if (star.radius > 1.2) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = star.color;
        }
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        background: "#060811", // Pitch-black cosmic night
      }}
    >
      {/* Deep Nebula Ambient Glow Gradients */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          left: "-10%",
          width: "55vw",
          height: "55vw",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)",
          filter: "blur(65px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "25%",
          width: "45vw",
          height: "45vw",
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Starfield Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default StarryBackground;

import React, { useEffect, useRef, useState } from "react";

/**
 * CustomCursor Component - Identical to high-end portfolio in image
 * Renders a bright sparkling 4-point star cursor (✦) with a fluid luminous smoky comet aura,
 * velocity elongation, scroll-reactive stardust particle trail, and magnetic hover interaction.
 */
const CustomCursor = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hoverText, setHoverText] = useState("");

  const canvasRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  // Position & physics references
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: -100, y: -100 });
  const lastScrollY = useRef(0);
  const trailPoints = useRef([]);
  const particles = useRef([]);
  const animFrameId = useRef(null);

  useEffect(() => {
    // Check for coarse pointer / mobile touch devices
    const checkTouch = () => {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(isCoarse || hasTouch);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);

    if (isTouchDevice) {
      document.body.classList.remove("custom-cursor-active");
      return;
    }

    document.body.classList.add("custom-cursor-active");

    const canvas = canvasRef.current;
    let ctx = null;
    if (canvas) {
      ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    // Mouse movement handler
    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      velocity.current = { x: dx, y: dy };
      lastMousePos.current = { x: e.clientX, y: e.clientY };

      // Record mouse history for smooth fluid trail
      trailPoints.current.push({
        x: e.clientX,
        y: e.clientY,
        alpha: 1,
        size: Math.random() * 18 + 12
      });

      if (trailPoints.current.length > 25) {
        trailPoints.current.shift();
      }

      // Emit glowing stardust on mouse move
      const speed = Math.sqrt(dx * dx + dy * dy);
      if (speed > 1.5) {
        spawnParticle(e.clientX, e.clientY, dx * 0.1, dy * 0.1, "move");
      }
    };

    // Scroll handler for scrolling trail & velocity stretch
    const onScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;
      const scrollDiff = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      velocity.current.y += scrollDiff * 0.5;

      if (Math.abs(scrollDiff) > 2 && mousePos.current.x > 0) {
        for (let i = 0; i < 3; i++) {
          spawnParticle(
            mousePos.current.x + (Math.random() * 24 - 12),
            mousePos.current.y + (Math.random() * 24 - 12),
            (Math.random() - 0.5) * 3,
            -scrollDiff * 0.15 + (Math.random() - 0.5) * 2,
            "scroll"
          );
        }
      }
    };

    // Hover interactive elements
    const onMouseOver = (e) => {
      const target = e.target.closest("a, button, input, textarea, [role='button'], .clickable, .hover-target, h1, h2, h3, .section-title");
      if (target) {
        setIsHovered(true);
        const dataHover = target.getAttribute("data-hover-label");
        if (dataHover) setHoverText(dataHover);
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    };

    // Click burst handler
    const onMouseDown = () => {
      setIsClicked(true);
      if (mousePos.current.x > 0) {
        for (let i = 0; i < 20; i++) {
          const angle = (Math.PI * 2 * i) / 20;
          const speed = Math.random() * 5 + 2.5;
          spawnParticle(
            mousePos.current.x,
            mousePos.current.y,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
            "burst"
          );
        }
      }
    };

    const onMouseUp = () => {
      setIsClicked(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    function spawnParticle(x, y, vx, vy, type) {
      const colors = ["#ffffff", "#e0e7ff", "#c084fc", "#a855f7", "#818cf8", "#f472b6"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.current.push({
        x,
        y,
        vx: vx + (Math.random() - 0.5) * 2,
        vy: vy + (Math.random() - 0.5) * 2,
        size: type === "burst" ? Math.random() * 3.5 + 1.5 : Math.random() * 2.5 + 0.8,
        alpha: 1,
        life: 1,
        decay: type === "burst" ? 0.025 : 0.04,
        color,
      });

      if (particles.current.length > 100) {
        particles.current.shift();
      }
    }

    // Animation Loop
    const render = () => {
      // Lerp physics for trailing outer ring
      const lerp = 0.15;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      // Update Dot element
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0px) translate(-50%, -50%)`;
      }

      // Update Ring element with stretch angle
      if (cursorRingRef.current) {
        const vx = velocity.current.x;
        const vy = velocity.current.y;
        const speed = Math.sqrt(vx * vx + vy * vy);
        const angle = Math.atan2(vy, vx) * (180 / Math.PI);
        const stretch = Math.min(speed * 0.03, 0.7);

        velocity.current.x *= 0.86;
        velocity.current.y *= 0.86;

        const scale = isHovered ? 1.7 : isClicked ? 0.8 : 1;

        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0px) translate(-50%, -50%) rotate(${angle}deg) scale(${1 + stretch * 0.9 * scale}, ${Math.max(0.5, 1 - stretch * 0.4) * scale})`;
      }

      // Render Fluid Smoke Trail & Particles on Canvas
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 1. Draw Luminous Fluid Comet Trail
        for (let i = 0; i < trailPoints.current.length; i++) {
          const pt = trailPoints.current[i];
          pt.alpha -= 0.035;

          if (pt.alpha <= 0) continue;

          ctx.save();
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size * (i / trailPoints.current.length + 0.3), 0, Math.PI * 2);

          const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, pt.size * 1.5);
          grad.addColorStop(0, `rgba(255, 255, 255, ${pt.alpha * 0.35})`);
          grad.addColorStop(0.4, `rgba(168, 85, 247, ${pt.alpha * 0.25})`);
          grad.addColorStop(0.8, `rgba(99, 102, 241, ${pt.alpha * 0.1})`);
          grad.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.fillStyle = grad;
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#a855f7";
          ctx.fill();
          ctx.restore();
        }

        // Clean faded trail points
        trailPoints.current = trailPoints.current.filter((pt) => pt.alpha > 0);

        // 2. Draw Stardust Particles
        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= p.decay;
          p.alpha = Math.max(0, p.life);

          if (p.life <= 0) {
            particles.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.85;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.restore();
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", checkTouch);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isTouchDevice, isHovered, isClicked]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Canvas for fluid smoke tail & sparkling stardust */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 99998,
        }}
      />

      {/* Main Cursor Glowing Dot & Star Flare Core */}
      <div
        ref={cursorDotRef}
        className={`custom-cursor-dot ${isHovered ? "hovered" : ""} ${isClicked ? "clicked" : ""}`}
      >
        <span className="cursor-star-flare">✦</span>
      </div>

      {/* Trailing Physics Ring / Halo */}
      <div
        ref={cursorRingRef}
        className={`custom-cursor-ring ${isHovered ? "hovered" : ""} ${isClicked ? "clicked" : ""}`}
      >
        {hoverText && <span className="cursor-hover-text">{hoverText}</span>}
      </div>
    </>
  );
};

export default CustomCursor;

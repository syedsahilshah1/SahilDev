import React from "react";
import { motion } from "framer-motion";

const variantsMap = {
  up: {
    hidden: { opacity: 0, y: 50, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  down: {
    hidden: { opacity: 0, y: -50, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  left: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

/**
 * ScrollReveal Component
 * - Appears when scrolled into view (whileInView)
 * - Disappears when scrolled past or out of view (once = false)
 * - Elevates and expands smoothly on mouse hover (whileHover)
 */
const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = false,
  amount = 0.15,
  hover = true, // enables smooth mouse cursor hover lift & scale effect
  className = "",
  style = {},
  ...props
}) => {
  const selectedVariant = variantsMap[direction] || variantsMap.up;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      whileHover={hover ? { y: -8, scale: 1.02, transition: { duration: 0.25, ease: "easeOut" } } : undefined}
      viewport={{ once, amount }}
      variants={selectedVariant}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      className={className}
      style={{ height: "100%", width: "100%", ...style }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

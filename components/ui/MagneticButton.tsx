"use client";

import type { MouseEvent, ReactNode } from "react";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

export const MagneticButton = ({ children, className = "", onClick, href, target, rel, ariaLabel }: MagneticButtonProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 16, stiffness: 170, mass: 0.2 });
  const springY = useSpring(y, { damping: 16, stiffness: 170, mass: 0.2 });
  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseMove = (event: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-12, Math.min(12, offsetX * 0.22)));
    y.set(Math.max(-10, Math.min(10, offsetY * 0.22)));
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const sharedProps = {
    className,
    onMouseMove,
    onMouseLeave,
    "aria-label": ariaLabel
  } as const;

  return (
    <motion.div ref={ref} style={{ x: springX, y: springY }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
      {href ? (
        <a href={href} target={target} rel={rel} {...sharedProps}>
          {children}
        </a>
      ) : (
        <button type="button" onClick={onClick} {...sharedProps}>
          {children}
        </button>
      )}
    </motion.div>
  );
};
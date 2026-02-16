"use client";

import { useEffect, useRef } from "react";

export const CursorLight = () => {
  const lightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(max-width: 768px)").matches) {
      if (lightRef.current) {
        lightRef.current.style.display = "none";
      }
      return;
    }

    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;

    const animate = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      if (lightRef.current) {
        lightRef.current.style.transform = `translate3d(${x - 160}px, ${y - 160}px, 0)`;
      }
      raf = window.requestAnimationFrame(animate);
    };

    const handleMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    window.addEventListener("mousemove", handleMove);
    raf = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <div
      ref={lightRef}
      className="pointer-events-none fixed z-0 h-80 w-80 rounded-full"
      style={{
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--accent-color) 36%, transparent) 0%, rgba(2,6,23,0) 72%)"
      }}
      aria-hidden="true"
    />
  );
};
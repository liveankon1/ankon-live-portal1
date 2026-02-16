"use client";

import { useEffect, useRef, useState } from "react";

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export const useParallax = (strength = 18) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState("translate3d(0,0,0) rotateX(0deg) rotateY(0deg)");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      const rotateY = clamp((currentX / window.innerWidth) * strength, -strength, strength);
      const rotateX = clamp((currentY / window.innerHeight) * -strength, -strength, strength);
      const shiftX = clamp(currentX * 0.04, -16, 16);
      const shiftY = clamp(currentY * 0.04, -14, 14);

      setTransform(`translate3d(${shiftX}px, ${shiftY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
      raf = window.requestAnimationFrame(animate);
    };

    const handleMove = (event: MouseEvent) => {
      targetX = event.clientX - window.innerWidth / 2;
      targetY = event.clientY - window.innerHeight / 2;
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    raf = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return { ref, transform };
};
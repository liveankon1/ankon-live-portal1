"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
  hueShift: number;
  alpha: number;
  targetX: number | null;
  targetY: number | null;
};

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
  size: number;
};

const CONFIG = {
  particleCount: 110,
  speed: 0.32,
  glowStrength: 13
} as const;

const CODE_TOKENS = ["C++", "std::", "int main()", "{}", "#include"];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

export const RainbowNeonBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    const sparks: Spark[] = [];
    const textPoints: Array<{ x: number; y: number }> = [];
    const mouse = { x: 0, y: 0, active: false };
    const parallaxTarget = { x: 0, y: 0 };
    const parallax = { x: 0, y: 0 };
    const rootEl = document.getElementById("about-social-root");

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let last = performance.now();
    let tokenIndex = 0;
    let formationState: "idle" | "forming" | "holding" | "dissolving" = "idle";
    let formationSince = 0;
    let nextFormationAt = performance.now() + rand(6000, 10000);

    const setCanvasSize = () => {
      const bounds = rootEl?.getBoundingClientRect() ?? canvas.getBoundingClientRect();
      width = Math.max(300, Math.floor(bounds.width));
      height = Math.max(480, Math.floor(bounds.height));
      dpr = clamp(window.devicePixelRatio || 1, 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initParticles = () => {
      particles.length = 0;
      const reduceCount = window.matchMedia("(max-width: 768px)").matches ? 0.62 : 1;
      const count = Math.max(52, Math.floor(CONFIG.particleCount * reduceCount));
      for (let i = 0; i < count; i += 1) {
        const medium = Math.random() > 0.86;
        particles.push({
          x: rand(0, width),
          y: rand(0, height),
          vx: rand(-0.3, 0.3),
          vy: rand(-0.3, 0.3),
          size: medium ? rand(2.2, 3.6) : rand(1.1, 2.2),
          hue: rand(0, 360),
          hueShift: rand(7, 18),
          alpha: rand(0.2, 0.55),
          targetX: null,
          targetY: null
        });
      }
    };

    const makeTokenPoints = (text: string) => {
      textPoints.length = 0;
      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const offCtx = off.getContext("2d");
      if (!offCtx) return;

      const fontSize = clamp(Math.floor(width * 0.095), 42, 120);
      offCtx.clearRect(0, 0, width, height);
      offCtx.fillStyle = "#fff";
      offCtx.font = `700 ${fontSize}px "JetBrains Mono", "Segoe UI", monospace`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillText(text, width / 2, height * 0.34);

      const imageData = offCtx.getImageData(0, 0, width, height).data;
      const step = 7;
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const alpha = imageData[(y * width + x) * 4 + 3];
          if (alpha > 150) textPoints.push({ x, y });
        }
      }
    };

    const startFormation = (now: number) => {
      const token = CODE_TOKENS[tokenIndex % CODE_TOKENS.length];
      tokenIndex += 1;
      makeTokenPoints(token);
      if (textPoints.length < 10) return;

      for (let i = 0; i < particles.length; i += 1) {
        const point = textPoints[i % textPoints.length];
        particles[i].targetX = point.x;
        particles[i].targetY = point.y;
      }

      formationState = "forming";
      formationSince = now;
    };

    const clearTargets = () => {
      for (const p of particles) {
        p.targetX = null;
        p.targetY = null;
      }
    };

    const spawnBurst = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      for (let i = 0; i < 26; i += 1) {
        const angle = rand(0, Math.PI * 2);
        const velocity = rand(50, 180);
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: rand(0.42, 0.78),
          maxLife: 0.78,
          hue: rand(0, 360),
          size: rand(1.2, 2.6)
        });
      }
    };

    const onPointerMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;

      const nx = (mouse.x / width - 0.5) * 2;
      const ny = (mouse.y / height - 0.5) * 2;
      parallaxTarget.x = clamp(nx * 8, -8, 8);
      parallaxTarget.y = clamp(ny * 8, -8, 8);
    };

    const onPointerLeave = () => {
      mouse.active = false;
      parallaxTarget.x = 0;
      parallaxTarget.y = 0;
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (!rootEl?.contains(target)) return;
      if (!target.closest("button, a, [role='button']")) return;
      spawnBurst(event.clientX, event.clientY);
    };

    const update = (dt: number, now: number) => {
      parallax.x += (parallaxTarget.x - parallax.x) * 0.08;
      parallax.y += (parallaxTarget.y - parallax.y) * 0.08;

      if (formationState === "idle" && now > nextFormationAt) {
        startFormation(now);
      }

      if (formationState === "forming" && now - formationSince > 900) {
        formationState = "holding";
        formationSince = now;
      } else if (formationState === "holding" && now - formationSince > 1000) {
        formationState = "dissolving";
        formationSince = now;
      } else if (formationState === "dissolving" && now - formationSince > 700) {
        formationState = "idle";
        clearTargets();
        nextFormationAt = now + rand(6000, 10000);
      }

      const card = rootEl?.querySelector("[data-about-card]") as HTMLElement | null;
      const cardRect = card?.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();
      let magnetX = 0;
      let magnetY = 0;
      let magnetActive = false;

      if (cardRect && mouse.active) {
        magnetX = cardRect.left - canvasRect.left + cardRect.width / 2;
        magnetY = cardRect.top - canvasRect.top + cardRect.height / 2;
        const mdx = mouse.x - magnetX;
        const mdy = mouse.y - magnetY;
        magnetActive = mdx * mdx + mdy * mdy < 270 * 270;
      }

      for (const p of particles) {
        p.hue = (p.hue + p.hueShift * dt) % 360;

        p.vx += rand(-0.02, 0.02) * dt * 22;
        p.vy += rand(-0.02, 0.02) * dt * 22;

        if (magnetActive) {
          const dx = magnetX - p.x;
          const dy = magnetY - p.y;
          const dist = Math.hypot(dx, dy) || 1;
          const pull = clamp(1 - dist / 320, 0, 1) * 8.5 * dt;
          p.vx += (dx / dist) * pull;
          p.vy += (dy / dist) * pull;
        }

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 88) {
            const force = (1 - dist / 88) * 22 * dt;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        if (p.targetX !== null && p.targetY !== null) {
          const tx = p.targetX + parallax.x;
          const ty = p.targetY + parallax.y;
          const k = formationState === "dissolving" ? 0.035 : 0.09;
          p.vx += (tx - p.x) * k * dt * 60;
          p.vy += (ty - p.y) * k * dt * 60;
        }

        p.vx *= 0.985;
        p.vy *= 0.985;

        p.x += p.vx * CONFIG.speed * 60 * dt;
        p.y += p.vy * CONFIG.speed * 60 * dt;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }

      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const s = sparks[i];
        s.life -= dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vx *= 0.97;
        s.vy *= 0.97;
        if (s.life <= 0) sparks.splice(i, 1);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      const linkDistance = 120;
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          if (dist > linkDistance) continue;

          const alpha = Math.pow(1 - dist / linkDistance, 1.35) * 0.24;
          const grad = ctx.createLinearGradient(a.x + parallax.x, a.y + parallax.y, b.x + parallax.x, b.y + parallax.y);
          grad.addColorStop(0, `hsla(${a.hue}, 96%, 66%, ${alpha})`);
          grad.addColorStop(1, `hsla(${b.hue}, 96%, 66%, ${alpha})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x + parallax.x, a.y + parallax.y);
          ctx.lineTo(b.x + parallax.x, b.y + parallax.y);
          ctx.stroke();
        }
      }

      for (const p of particles) {
        ctx.shadowBlur = CONFIG.glowStrength;
        ctx.shadowColor = `hsla(${p.hue}, 96%, 62%, 0.7)`;
        ctx.fillStyle = `hsla(${p.hue}, 96%, 62%, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x + parallax.x, p.y + parallax.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const s of sparks) {
        const t = clamp(s.life / s.maxLife, 0, 1);
        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsla(${s.hue}, 100%, 64%, ${t})`;
        ctx.fillStyle = `hsla(${s.hue}, 100%, 62%, ${t})`;
        ctx.beginPath();
        ctx.arc(s.x + parallax.x * 0.3, s.y + parallax.y * 0.3, s.size * t, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      ctx.shadowBlur = 0;
    };

    const tick = (now: number) => {
      const dt = clamp((now - last) / 1000, 0, 0.05);
      last = now;
      update(dt, now);
      draw();
      raf = requestAnimationFrame(tick);
    };

    setCanvasSize();
    initParticles();

    window.addEventListener("resize", setCanvasSize);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseleave", onPointerLeave);
    window.addEventListener("click", onClick, true);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("click", onClick, true);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 opacity-70" aria-hidden="true" />;
};

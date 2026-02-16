"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export const Navbar = () => {
  const pathname = usePathname();
  const shellRef = useRef<HTMLUListElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 140, damping: 20, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 140, damping: 20, mass: 0.3 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mobile = window.matchMedia("(max-width: 767px)");
    if (mobile.matches) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (event: MouseEvent) => {
      const rect = shellRef.current?.getBoundingClientRect();
      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;

      if (Math.abs(dx) < 320 && Math.abs(dy) < 180) {
        targetX = Math.max(-14, Math.min(14, dx * 0.07));
        targetY = Math.max(-10, Math.min(10, dy * 0.07));
      } else {
        targetX = 0;
        targetY = 0;
      }
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      x.set(currentX);
      y.set(currentY);
      raf = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [x, y]);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-700/45 bg-slate-950/60 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6" aria-label="Primary">
        <Link href="/" className="text-sm font-semibold tracking-wide text-slate-100 md:text-base">
          Ankon Projects Universe
        </Link>

        <motion.ul
          ref={shellRef}
          style={{ x: springX, y: springY }}
          className="relative flex items-center gap-2 rounded-full border border-slate-600/55 bg-slate-900/60 p-1.5 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
        >
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href} className="relative">
                {active ? (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-cyan-300/20"
                    transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    aria-hidden="true"
                  />
                ) : null}

                <MagneticButton
                  href={item.href}
                  className={`group relative rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    active
                      ? "border-cyan-300/40 text-cyan-100"
                      : "border-transparent text-slate-300 hover:border-cyan-300/30 hover:text-cyan-100"
                  }`}
                  ariaLabel={`Go to ${item.label}`}
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="pointer-events-none absolute inset-x-2 -bottom-[2px] h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </MagneticButton>
              </li>
            );
          })}
        </motion.ul>
      </nav>
    </header>
  );
};
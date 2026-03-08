"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { FormEvent, useEffect, useRef, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const publicItems = [{ href: "/", label: "About Me" }];

const privateItems = [
  { href: "/live", label: "Live" },
  { href: "/downloads", label: "Downloads" },
  { href: "/tools", label: "Tools" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const shellRef = useRef<HTMLUListElement | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [showAccessForm, setShowAccessForm] = useState(false);
  const [password, setPassword] = useState("");
  const [accessDenied, setAccessDenied] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 140, damping: 20, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 140, damping: 20, mass: 0.3 });
  const navItems = unlocked ? [...publicItems, ...privateItems] : publicItems;

  useEffect(() => {
    if (unlocked) return;
    if (pathname !== "/") {
      router.replace("/");
    }
  }, [pathname, router, unlocked]);

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

  const handleUnlock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.trim() === "2009") {
      setUnlocked(true);
      setShowAccessForm(false);
      setPassword("");
      setAccessDenied(false);
      return;
    }

    setAccessDenied(true);
    setTimeout(() => setAccessDenied(false), 700);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-700/45 bg-slate-950/60 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6" aria-label="Primary">
        <Link href="/" className="text-sm font-semibold tracking-wide text-slate-100 md:text-base">
          Ankon&apos;s Live Website
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

          {!unlocked ? (
            <li className="relative">
              <motion.button
                type="button"
                onClick={() => setShowAccessForm((prev) => !prev)}
                className="group relative rounded-full border border-rose-400/45 bg-rose-500/18 px-3 py-1.5 text-sm text-rose-100 transition-colors hover:border-rose-300 hover:bg-rose-500/28 hover:text-white"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Private access"
              >
                <span className="relative z-10">Private Access</span>
                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-rose-400/25 via-red-300/10 to-rose-400/25 opacity-0 blur-sm transition-opacity duration-200 group-hover:opacity-100" />
              </motion.button>

              <AnimatePresence>
                {showAccessForm ? (
                  <motion.form
                    onSubmit={handleUnlock}
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-[calc(100%+10px)] w-60 rounded-2xl border border-rose-400/30 bg-slate-950/95 p-3 shadow-[0_0_24px_rgba(244,63,94,0.35)]"
                  >
                    <label htmlFor="private-access-password" className="mb-2 block text-xs text-rose-100/90">
                      Enter password for private tabs
                    </label>
                    <input
                      id="private-access-password"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full rounded-lg border border-rose-300/35 bg-slate-900/90 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-rose-300 focus:ring-2 focus:ring-rose-400/35"
                      placeholder="Password"
                      autoFocus
                    />
                    <motion.p
                      className="mt-2 text-xs text-rose-300"
                      animate={accessDenied ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      {accessDenied ? "Access denied" : "Password required"}
                    </motion.p>
                    <button
                      type="submit"
                      className="mt-3 w-full rounded-lg border border-rose-300/45 bg-rose-500/30 px-3 py-2 text-sm font-medium text-rose-50 transition hover:bg-rose-500/45"
                    >
                      Unlock Private Tabs
                    </button>
                  </motion.form>
                ) : null}
              </AnimatePresence>
            </li>
          ) : null}
        </motion.ul>
      </nav>
    </header>
  );
};

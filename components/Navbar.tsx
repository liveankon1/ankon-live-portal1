"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/temp-cleaner", label: "Cleaner" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-700/45 bg-slate-950/60 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6" aria-label="Primary">
        <Link href="/" className="text-sm font-semibold tracking-wide text-slate-100 md:text-base">
          Ankon Projects Universe
        </Link>

        <ul className="flex items-center gap-2 rounded-full border border-slate-600/55 bg-slate-900/60 p-1.5">
          {navItems.map((item) => {
            const active = pathname === item.href;
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
                  className={`relative rounded-full px-3 py-1.5 text-sm ${active ? "text-cyan-100" : "text-slate-300"}`}
                  ariaLabel={`Go to ${item.label}`}
                >
                  {item.label}
                </MagneticButton>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

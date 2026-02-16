"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.main
      key={pathname}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.42, ease: [0.2, 0.65, 0.2, 1] }}
      className="relative z-10"
    >
      {children}
    </motion.main>
  );
}
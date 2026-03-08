"use client";

import type { ReactNode } from "react";
import { ParticleBackground } from "@/components/ParticleBackground";
import { CursorLight } from "@/components/CursorLight";
import { ControlRoomDrawer } from "@/components/ControlRoomDrawer";
import { ThemeMusicPlayer } from "@/components/ThemeMusicPlayer";

export const PageShell = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ParticleBackground />
      <CursorLight />
      <div className="pointer-events-none fixed inset-0 z-0 bg-hero-grid hero-grid opacity-20" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
      <ThemeMusicPlayer />
      <ControlRoomDrawer />
    </>
  );
};

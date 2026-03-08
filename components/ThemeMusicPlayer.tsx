"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const ThemeMusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.42;
    audio.loop = true;
    let cleaned = false;

    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setNeedsInteraction(false);
      } catch {
        setNeedsInteraction(true);
      }
    };

    void tryAutoplay();

    const startOnFirstInteraction = async () => {
      if (cleaned) return;
      if (!audio.paused) return;
      try {
        await audio.play();
        setIsPlaying(true);
        setNeedsInteraction(false);
      } catch {
        setNeedsInteraction(true);
      }
    };

    window.addEventListener("pointerdown", startOnFirstInteraction, { once: true });
    window.addEventListener("keydown", startOnFirstInteraction, { once: true });

    return () => {
      cleaned = true;
      window.removeEventListener("pointerdown", startOnFirstInteraction);
      window.removeEventListener("keydown", startOnFirstInteraction);
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
        setNeedsInteraction(false);
      } catch {
        setNeedsInteraction(true);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  return (
    <>
      <audio ref={audioRef} preload="auto" autoPlay playsInline src="/about-me-theme.mp3" />
      <motion.button
        type="button"
        onClick={togglePlayback}
        className="group fixed bottom-6 left-6 z-40 inline-flex items-center gap-3 rounded-full border border-cyan-300/45 bg-slate-950/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.13em] text-cyan-100 backdrop-blur-xl transition hover:border-cyan-200 hover:bg-slate-900/85"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-label={isPlaying ? "Pause theme music" : "Play theme music"}
      >
        <span className="flex items-end gap-1">
          <span className={`h-2 w-1 rounded bg-cyan-200 ${isPlaying ? "animate-[eq_0.8s_ease-in-out_infinite]" : ""}`} />
          <span className={`h-3 w-1 rounded bg-cyan-300 ${isPlaying ? "animate-[eq_0.95s_ease-in-out_infinite]" : ""}`} />
          <span className={`h-4 w-1 rounded bg-cyan-100 ${isPlaying ? "animate-[eq_0.7s_ease-in-out_infinite]" : ""}`} />
        </span>
        <span>{needsInteraction ? "Tap to Start Music" : isPlaying ? "Now Playing" : "Play Music"}</span>
      </motion.button>
    </>
  );
};

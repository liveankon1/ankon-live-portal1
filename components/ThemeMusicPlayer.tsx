"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const ThemeMusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const [isAudible, setIsAudible] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0;
    audio.muted = true;
    audio.loop = true;
    let cleaned = false;
    let volumeTimer = 0;

    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setNeedsInteraction(true);
      } catch {
        setNeedsInteraction(true);
      }
    };

    void tryAutoplay();

    const makeAudible = () => {
      if (cleaned) return;
      const step = 0.06;
      const maxVolume = 0.42;
      audio.muted = false;
      setIsAudible(true);
      window.clearInterval(volumeTimer);
      volumeTimer = window.setInterval(() => {
        if (audio.volume >= maxVolume) {
          audio.volume = maxVolume;
          window.clearInterval(volumeTimer);
          return;
        }
        audio.volume = Math.min(maxVolume, audio.volume + step);
      }, 60);
    };

    const startPlayback = async () => {
      if (cleaned) return;
      if (audio.paused) {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch {
          setNeedsInteraction(true);
          return;
        }
      }
      makeAudible();
      setNeedsInteraction(false);
    };

    window.addEventListener("mousemove", startPlayback, { once: true });
    window.addEventListener("mouseover", startPlayback, { once: true });
    window.addEventListener("pointerdown", startPlayback, { once: true });
    window.addEventListener("keydown", startPlayback, { once: true });

    return () => {
      cleaned = true;
      window.clearInterval(volumeTimer);
      window.removeEventListener("mousemove", startPlayback);
      window.removeEventListener("mouseover", startPlayback);
      window.removeEventListener("pointerdown", startPlayback);
      window.removeEventListener("keydown", startPlayback);
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

    if (isAudible) {
      audio.muted = true;
      audio.volume = 0;
      setIsAudible(false);
      setNeedsInteraction(true);
      return;
    }

    if (audio.paused) return;

    audio.muted = false;
    audio.volume = 0.42;
    setIsAudible(true);
    setNeedsInteraction(false);
  };

  return (
    <>
      <audio ref={audioRef} preload="auto" autoPlay playsInline muted src="/about-me-theme.mp3" />
      <motion.button
        type="button"
        onClick={togglePlayback}
        className="group fixed bottom-6 left-6 z-40 inline-flex items-center gap-3 rounded-full border border-cyan-300/45 bg-slate-950/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.13em] text-cyan-100 backdrop-blur-xl transition hover:border-cyan-200 hover:bg-slate-900/85"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-label={isAudible ? "Mute theme music" : "Enable theme music"}
      >
        <span className="flex items-end gap-1">
          <span className={`h-2 w-1 rounded bg-cyan-200 ${isPlaying ? "animate-[eq_0.8s_ease-in-out_infinite]" : ""}`} />
          <span className={`h-3 w-1 rounded bg-cyan-300 ${isPlaying ? "animate-[eq_0.95s_ease-in-out_infinite]" : ""}`} />
          <span className={`h-4 w-1 rounded bg-cyan-100 ${isPlaying ? "animate-[eq_0.7s_ease-in-out_infinite]" : ""}`} />
        </span>
        <span>
          {needsInteraction ? "Hover to Enable Sound" : isAudible ? "Now Playing" : isPlaying ? "Music Ready" : "Play Music"}
        </span>
      </motion.button>
    </>
  );
};

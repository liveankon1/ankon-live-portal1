"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import { useParticleSettings } from "@/components/providers/ParticleSettingsProvider";

const isMobileDevice = () => typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

export const ParticleBackground = () => {
  const { settings } = useParticleSettings();
  const pathname = usePathname();
  const toolsMode = pathname === "/tools" || pathname.startsWith("/tools/");
  const aboutMode = pathname === "/about" || pathname.startsWith("/about/");
  const activeAccent = toolsMode ? "#34d399" : aboutMode ? "#60a5fa" : settings.accentColor;

  const options = useMemo(() => {
    const mobile = isMobileDevice();
    const density = mobile ? Math.max(25, Math.round(settings.density * 0.55)) : settings.density;
    const speed = mobile ? settings.speed * 0.8 : settings.speed;

    if (toolsMode) {
      const toolsDensity = mobile ? 32 : 70;
      return {
        fullScreen: { enable: true, zIndex: -3 },
        fpsLimit: 60,
        detectRetina: true,
        particles: {
          number: { value: toolsDensity, density: { enable: true, area: 820 } },
          color: { value: ["#d946ef", "#c026d3", "#22d3ee"] },
          shape: { type: "circle" },
          opacity: {
            value: { min: 0.24, max: 0.62 },
            animation: { enable: true, speed: 0.45, minimumValue: 0.16, sync: false }
          },
          size: {
            value: { min: 0.8, max: 2.9 },
            animation: { enable: true, speed: 0.9, minimumValue: 0.4, sync: false }
          },
          move: {
            enable: true,
            speed: 1.05 * speed,
            random: true,
            outModes: { default: "out" },
            trail: { enable: true, length: 6, fillColor: "#030712" }
          },
          links: {
            enable: false
          },
          twinkle: {
            particles: { enable: true, frequency: 0.02, opacity: 0.9, color: "#d946ef" },
            lines: { enable: false }
          }
        },
        interactivity: {
          detectsOn: "window",
          events: {
            onHover: { enable: true, mode: ["repulse"] },
            onClick: { enable: true, mode: ["push"] },
            resize: true
          },
          modes: {
            repulse: { distance: 115, duration: 0.28 },
            push: { quantity: 6 }
          }
        }
      };
    }

    if (aboutMode) {
      const aboutDensity = mobile ? 34 : 68;
      return {
        fullScreen: { enable: true, zIndex: -3 },
        fpsLimit: 60,
        detectRetina: true,
        particles: {
          number: { value: aboutDensity, density: { enable: true, area: 980 } },
          color: {
            value: "#ff0000",
            animation: {
              h: { enable: true, speed: 22, sync: false }
            }
          },
          shape: { type: "circle" },
          opacity: {
            value: { min: 0.28, max: 0.68 },
            animation: { enable: true, speed: 0.35, minimumValue: 0.2, sync: false }
          },
          size: {
            value: { min: 1.6, max: 4.2 },
            animation: { enable: true, speed: 0.55, minimumValue: 1, sync: false }
          },
          move: {
            enable: true,
            speed: 0.55 * speed,
            random: true,
            outModes: { default: "out" }
          },
          links: {
            enable: true,
            distance: mobile ? 115 : 155,
            opacity: 0.28,
            width: 1.3,
            color: "random"
          }
        },
        interactivity: {
          detectsOn: "window",
          events: {
            onHover: { enable: true, mode: ["grab"] },
            onClick: { enable: true, mode: ["push"] },
            resize: true
          },
          modes: {
            grab: { distance: 150, links: { opacity: 0.45 } },
            push: { quantity: 4 }
          }
        }
      };
    }

    const base: any = {
      fullScreen: { enable: true, zIndex: -3 },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: density, density: { enable: true, area: 900 } },
        color: { value: activeAccent },
        opacity: { value: 0.5 },
        move: { enable: true, speed, outModes: { default: "out" } },
        size: { value: { min: 1, max: 4 } },
        links: { enable: false }
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: { enable: true, mode: ["repulse", "grab"] },
          onClick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          repulse: { distance: 100, duration: 0.3 },
          grab: { distance: 120, links: { opacity: 0.6 } },
          push: { quantity: 8 }
        }
      }
    };

    if (settings.preset === "rain") {
      base.particles.move = { enable: true, speed: 2.2 * speed, direction: "bottom", straight: true, outModes: { default: "out" } };
      base.particles.shape = { type: "line" };
      base.particles.size = { value: { min: 7, max: 16 } };
      base.particles.opacity = { value: 0.3 };
    }

    if (settings.preset === "sparks") {
      base.particles.shape = { type: "star" };
      base.particles.move = { enable: true, speed: 1.4 * speed, random: true, outModes: { default: "out" } };
      base.particles.opacity = { value: { min: 0.25, max: 0.9 } };
      base.particles.size = { value: { min: 0.8, max: 3.2 } };
    }

    if (settings.preset === "galaxy") {
      base.particles.links = {
        enable: true,
        distance: 130,
        opacity: 0.22,
        color: activeAccent
      };
      base.particles.move = { enable: true, speed: 0.8 * speed, outModes: { default: "bounce" } };
      base.interactivity.modes.push = { quantity: 10 };
    }

    if (settings.preset === "neon-trail") {
      base.particles.shape = { type: "circle" };
      base.particles.move = { enable: true, speed: 1.6 * speed, trail: { enable: true, length: 6, fillColor: "#030712" } };
      base.particles.opacity = { value: 0.65 };
      base.interactivity.modes.repulse = { distance: 130, duration: 0.45 };
    }

    return base;
  }, [settings, activeAccent, toolsMode, aboutMode]);

  const particlesInit = async (engine: any) => {
    await loadFull(engine);
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--accent-color", activeAccent);
    document.documentElement.style.setProperty("--glow-intensity", String(settings.glowIntensity));
  }, [activeAccent, settings.glowIntensity]);

  return <Particles id="universe-particles" init={particlesInit} options={options} />;
};

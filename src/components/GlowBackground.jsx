import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function GlowBackground({ color = "cyan", intensity = "soft" }) {
  const containerRef = useRef(null);
  const spotlightRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);

  // Set colors based on prop
  const getGlowColors = () => {
    switch (color) {
      case "cyan":
        return {
          glow1: "bg-cyan-500/10",
          glow2: "bg-blue-500/10",
          spotlight: "rgba(6, 182, 212, 0.08)",
        };
      case "blue":
        return {
          glow1: "bg-blue-500/10",
          glow2: "bg-indigo-500/10",
          spotlight: "rgba(59, 130, 246, 0.08)",
        };
      case "purple":
        return {
          glow1: "bg-purple-500/10",
          glow2: "bg-pink-500/10",
          spotlight: "rgba(168, 85, 247, 0.08)",
        };
      case "indigo":
        return {
          glow1: "bg-indigo-500/10",
          glow2: "bg-cyan-500/10",
          spotlight: "rgba(99, 102, 241, 0.08)",
        };
      default:
        return {
          glow1: "bg-cyan-500/10",
          glow2: "bg-blue-500/10",
          spotlight: "rgba(6, 182, 212, 0.08)",
        };
    }
  };

  const colors = getGlowColors();

  // Mouse Follow Spotlight effect
  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    // Create a local numeric proxy for GSAP quickTo
    const mouseProxy = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const updateSpotlight = () => {
      if (spotlight) {
        spotlight.style.background = `radial-gradient(600px circle at ${mouseProxy.x}px ${mouseProxy.y}px, ${colors.spotlight}, transparent 80%)`;
      }
    };

    const xTo = gsap.quickTo(mouseProxy, "x", { duration: 1.2, ease: "power3.out", onUpdate: updateSpotlight });
    const yTo = gsap.quickTo(mouseProxy, "y", { duration: 1.2, ease: "power3.out", onUpdate: updateSpotlight });

    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      xTo(x);
      yTo(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [colors.spotlight]);

  // Orb float animation using GSAP Ticker for performance
  useEffect(() => {
    let tickCount = 0;

    const onTick = () => {
      tickCount += 0.008;

      const x1 = Math.sin(tickCount) * 80;
      const y1 = Math.cos(tickCount * 0.8) * 60;
      const x2 = Math.cos(tickCount * 1.2) * 90;
      const y2 = Math.sin(tickCount * 0.9) * 70;

      if (orb1Ref.current) {
        gsap.set(orb1Ref.current, { x: x1, y: y1 });
      }
      if (orb2Ref.current) {
        gsap.set(orb2Ref.current, { x: x2, y: y2 });
      }
    };

    gsap.ticker.add(onTick);
    return () => gsap.ticker.remove(onTick);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 bg-transparent"
    >
      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      ></div>

      {/* Floating Ambient Orbs */}
      <div
        ref={orb1Ref}
        className={`absolute top-1/4 -left-10 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full ${colors.glow1} blur-[120px] pointer-events-none animate-pulse-glow will-change-transform`}
      ></div>
      <div
        ref={orb2Ref}
        className={`absolute bottom-1/4 -right-10 w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full ${colors.glow2} blur-[140px] pointer-events-none animate-pulse-glow will-change-transform`}
        style={{ animationDelay: "2.5s" }}
      ></div>

      {/* Interactive Mouse Follow Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(600px circle at 50% 50%, ${colors.spotlight}, transparent 80%)`
        }}
      ></div>

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black opacity-30"></div>
    </div>
  );
}

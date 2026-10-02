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

  // Mouse Follow Spotlight effect (Cached rect & offscreen check for 0 layout thrashing)
  useEffect(() => {
    const spotlight = spotlightRef.current;
    const container = containerRef.current;
    if (!spotlight || !container) return;

    let rect = container.getBoundingClientRect();

    const updateRect = () => {
      if (container) {
        rect = container.getBoundingClientRect();
      }
    };

    window.addEventListener("resize", updateRect, { passive: true });
    window.addEventListener("scroll", updateRect, { passive: true });

    const mouseProxy = { x: rect.width / 2, y: rect.height / 2 };

    const updateSpotlight = () => {
      if (spotlight) {
        spotlight.style.background = `radial-gradient(600px circle at ${mouseProxy.x}px ${mouseProxy.y}px, ${colors.spotlight}, transparent 80%)`;
      }
    };

    const xTo = gsap.quickTo(mouseProxy, "x", { duration: 1.0, ease: "power2.out", onUpdate: updateSpotlight });
    const yTo = gsap.quickTo(mouseProxy, "y", { duration: 1.0, ease: "power2.out", onUpdate: updateSpotlight });

    let rAFId = null;
    const handleMouseMove = (e) => {
      // Fast offscreen check before computing
      if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;

      if (rAFId) return;
      rAFId = requestAnimationFrame(() => {
        rAFId = null;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        xTo(x);
        yTo(y);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      if (rAFId) cancelAnimationFrame(rAFId);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [colors.spotlight]);

  // Orb float animation using GSAP timeline loops (GPU accelerated without ticker spam)
  useEffect(() => {
    if (!orb1Ref.current || !orb2Ref.current) return;

    const tween1 = gsap.to(orb1Ref.current, {
      x: 60,
      y: -40,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    const tween2 = gsap.to(orb2Ref.current, {
      x: -70,
      y: 50,
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      tween1.kill();
      tween2.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 bg-transparent"
    >
      {/* Floating Ambient Orbs */}
      <div
        ref={orb1Ref}
        className={`absolute top-1/4 -left-10 w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full ${colors.glow1} blur-[90px] pointer-events-none animate-pulse-glow`}
      ></div>
      <div
        ref={orb2Ref}
        className={`absolute bottom-1/4 -right-10 w-[40vw] h-[40vw] max-w-[450px] max-h-[450px] rounded-full ${colors.glow2} blur-[100px] pointer-events-none animate-pulse-glow`}
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

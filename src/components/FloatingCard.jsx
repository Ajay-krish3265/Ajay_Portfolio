import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function FloatingCard({
  children,
  className = "",
  glowColor = "rgba(6, 182, 212, 0.15)", // Default cyan glow
  floatIntensity = 1, // Intensity of vertical float animation
  floatDelay = 0, // CSS animation delay
  tiltMax = 12, // Max rotation angle in degrees
  glowSize = 250, // Spotlight radius in pixels
  ...props
}) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  // Mouse tilt + spotlight shine effect
  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card) return;

    // Local state for GSAP values
    const tiltProxy = { rx: 0, ry: 0, gx: 0, gy: 0, o: 0 };

    const updateTiltAndGlow = () => {
      if (!card) return;
      
      // Apply 3D rotation and perspective
      card.style.transform = `perspective(1000px) rotateX(${tiltProxy.rx}deg) rotateY(${tiltProxy.ry}deg) scale3d(1.02, 1.02, 1.02)`;
      
      // Update holographic radial spotlight
      if (glow) {
        glow.style.background = `radial-gradient(${glowSize}px circle at ${tiltProxy.gx}px ${tiltProxy.gy}px, ${glowColor}, transparent 80%)`;
        glow.style.opacity = tiltProxy.o;
      }
    };

    // QuickTo setups
    const rxTo = gsap.quickTo(tiltProxy, "rx", { duration: 0.5, ease: "power2.out", onUpdate: updateTiltAndGlow });
    const ryTo = gsap.quickTo(tiltProxy, "ry", { duration: 0.5, ease: "power2.out", onUpdate: updateTiltAndGlow });
    const gxTo = gsap.quickTo(tiltProxy, "gx", { duration: 0.3, ease: "power2.out", onUpdate: updateTiltAndGlow });
    const gyTo = gsap.quickTo(tiltProxy, "gy", { duration: 0.3, ease: "power2.out", onUpdate: updateTiltAndGlow });
    const oTo = gsap.quickTo(tiltProxy, "o", { duration: 0.4, ease: "power2.out", onUpdate: updateTiltAndGlow });

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Compute tilt angles
      const rotateX = ((y / rect.height) - 0.5) * -tiltMax;
      const rotateY = ((x / rect.width) - 0.5) * tiltMax;

      rxTo(rotateX);
      ryTo(rotateY);
      gxTo(x);
      gyTo(y);
      oTo(1);
    };

    const handleMouseLeave = () => {
      // Spring back tilt
      rxTo(0);
      ryTo(0);
      oTo(0);

      // Restore scaling
      gsap.to(card, {
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        duration: 0.7,
        ease: "elastic.out(1, 0.55)",
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [glowColor, tiltMax, glowSize]);

  // CSS Floating oscillation animation
  const floatStyle = floatIntensity > 0 
    ? {
        animationName: "float-slow",
        animationDuration: `${10 / floatIntensity}s`,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        animationDelay: `${floatDelay}s`
      }
    : {};

  return (
    <div
      ref={cardRef}
      style={{
        ...floatStyle,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-md overflow-hidden transition-colors duration-500 will-change-transform ${className}`}
      {...props}
    >
      {/* Holographic Border/Surface Glow Overlay */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 z-0"
        style={{ mixBlendMode: "screen" }}
      ></div>

      {/* Card Content layer */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}

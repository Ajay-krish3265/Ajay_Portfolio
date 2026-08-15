import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxImage({
  src,
  alt = "Cinematic Visual",
  className = "",
  imgClassName = "",
  speed = 1.2,
  showOverlay = true,
}) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const maskRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imageRef.current;
    const mask = maskRef.current;
    if (!container || !img) return;

    // Scroll parallax translation and scale-down transition
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.fromTo(
      img,
      {
        yPercent: -12 * (speed - 1),
        scale: 1.15,
      },
      {
        yPercent: 12 * (speed - 1),
        scale: 1.02,
        ease: "none",
      }
    );

    // Initial mask sweep reveal trigger
    if (mask) {
      gsap.fromTo(
        mask,
        { scaleX: 1 },
        {
          scaleX: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: container,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden group rounded-xl border border-white/5 bg-zinc-900 will-change-transform shadow-[0_10px_35px_rgba(0,0,0,0.5)] ${className}`}
    >
      {/* Cinematic Diagonal Scanline Overlay */}
      {showOverlay && (
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-tr from-cyan-500/5 to-transparent mix-blend-overlay group-hover:opacity-60 transition-opacity duration-700"></div>
      )}

      {/* Grid Pattern Overlay for High Tech Vibe */}
      {showOverlay && (
        <div 
          className="absolute inset-0 opacity-[0.07] z-10 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
            backgroundSize: `16px 16px`
          }}
        ></div>
      )}

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>

      {/* Actual Image */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-700 ease-out will-change-transform ${imgClassName}`}
      />

      {/* Swipe Reveal Mask */}
      <div
        ref={maskRef}
        className="absolute inset-0 z-20 bg-[#030303] origin-right pointer-events-none"
      ></div>
    </div>
  );
}

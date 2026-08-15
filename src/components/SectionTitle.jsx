import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionTitle({
  title = "Section Title",
  subtitle = "",
  backdropText = "",
  eyebrow = "",
}) {
  const containerRef = useRef(null);
  const backdropRef = useRef(null);
  const headingRef = useRef(null);

  // Parallax backdrop text and fade in reveals
  useEffect(() => {
    const backdrop = backdropRef.current;
    if (!backdrop || !backdropText) return;

    const anim = gsap.fromTo(
      backdrop,
      { y: 80, opacity: 0.01 },
      {
        y: -120,
        opacity: 0.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [backdropText]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col justify-center items-start mb-16 md:mb-24 z-10 w-full"
    >
      {/* Huge Translucent Backdrop Watermark */}
      {backdropText && (
        <div
          ref={backdropRef}
          className="absolute -top-12 sm:-top-16 md:-top-24 left-0 text-[14vw] font-display font-extrabold uppercase select-none pointer-events-none text-white tracking-[0.1em] leading-none select-none z-0 will-change-transform"
        >
          {backdropText}
        </div>
      )}

      {/* Cybernetic Eyebrow with Pulsing Dot */}
      {eyebrow && (
        <div 
          className="relative flex items-center gap-3 overflow-hidden mb-3 z-10"
          data-aos="fade-up"
          data-aos-delay="50"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
          </span>
          <span className="text-[10px] sm:text-xs font-display font-medium tracking-[0.3em] uppercase text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">
            {eyebrow}
          </span>
        </div>
      )}

      {/* Main Title Heading */}
      <h2
        ref={headingRef}
        className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-display font-light text-white leading-tight tracking-tight uppercase"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        {title}
      </h2>

      {/* Subtle Description/Subtitle */}
      {subtitle && (
        <p
          className="relative z-10 mt-4 text-xs sm:text-sm text-zinc-400 font-sans font-light tracking-wide leading-relaxed max-w-xl"
          data-aos="fade-up"
          data-aos-delay="250"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

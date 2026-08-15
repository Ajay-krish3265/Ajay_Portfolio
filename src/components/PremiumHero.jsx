import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import image1 from "../assets/image-1.png";
import image2 from "../assets/image-2.png";

export default function PremiumHero() {
  const heroRef = useRef(null);
  const topLayerRef = useRef(null);
  const glow1Ref = useRef(null);
  const glow2Ref = useRef(null);

  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageContainerRef = useRef(null);

  // GSAP Mouse-Follow & Touch-Follow Radial Mask Reveal via numeric Proxy
  useEffect(() => {
    const target = topLayerRef.current;
    if (!target) return;

    // Create a local numeric proxy object for GSAP quickTo to interpolate smoothly
    const maskProxy = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      radius: 0
    };

    // Fast inline style updating function
    const updateMask = () => {
      const xVal = maskProxy.x;
      const yVal = maskProxy.y;
      const rVal = maskProxy.radius;

      // When radius is effectively zero, remove mask entirely so top layer is fully visible
      if (rVal < 1) {
        target.style.maskImage = 'none';
        target.style.webkitMaskImage = 'none';
        return;
      }

      // Apply the feather-edged radial gradient directly as inline styles
      target.style.maskImage = `radial-gradient(circle ${rVal}px at ${xVal}px ${yVal}px, transparent 0%, transparent 60%, black 100%)`;
      target.style.webkitMaskImage = `radial-gradient(circle ${rVal}px at ${xVal}px ${yVal}px, transparent 0%, transparent 60%, black 100%)`;
    };

    // Start with no mask at all — top layer fully visible
    target.style.maskImage = 'none';
    target.style.webkitMaskImage = 'none';

    // Setup gsap.quickTo numeric interpolations
    const xTo = gsap.quickTo(maskProxy, "x", { duration: 0.8, ease: "power3.out", onUpdate: updateMask });
    const yTo = gsap.quickTo(maskProxy, "y", { duration: 0.8, ease: "power3.out", onUpdate: updateMask });
    const radiusTo = gsap.quickTo(maskProxy, "radius", { duration: 0.6, ease: "power2.out", onUpdate: updateMask });

    // Calculate coordinates relative to hero bounding box
    const handleMouseMove = (e) => {
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      xTo(x);
      yTo(y);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = heroRef.current.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      xTo(x);
      yTo(y);
    };

    // Hover triggers expansion of radial gradient hole
    const handleExpand = () => {
      radiusTo(180);
    };

    // Hover leave triggers cinematic dissolve back to 0
    const handleCollapse = () => {
      radiusTo(0);
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener("mousemove", handleMouseMove);
      hero.addEventListener("mouseenter", handleExpand);
      hero.addEventListener("mouseleave", handleCollapse);

      hero.addEventListener("touchmove", handleTouchMove, { passive: true });
      hero.addEventListener("touchstart", handleExpand, { passive: true });
      hero.addEventListener("touchend", handleCollapse, { passive: true });
    }

    return () => {
      if (hero) {
        hero.removeEventListener("mousemove", handleMouseMove);
        hero.removeEventListener("mouseenter", handleExpand);
        hero.removeEventListener("mouseleave", handleCollapse);

        hero.removeEventListener("touchmove", handleTouchMove);
        hero.removeEventListener("touchstart", handleExpand);
        hero.removeEventListener("touchend", handleCollapse);
      }
    };
  }, []);

  // Load animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      imageContainerRef.current,
      { scale: 1.08, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2.2, ease: "power3.inOut" }
    )
    .fromTo(
      eyebrowRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0 },
      0.8
    )
    .fromTo(
      headingRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 },
      1.0
    )
    .fromTo(
      descRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0 },
      1.2
    )
    .fromTo(
      buttonsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      1.4
    );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-dark-bg flex items-end justify-start px-6 sm:px-12 md:px-20 lg:px-28 pb-16 sm:pb-20 md:pb-24 lg:pb-28"
    >
      {/* Ambient Glow Backgrounds */}
      <div
        ref={glow1Ref}
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none z-0 animate-pulse-glow"
      ></div>
      <div
        ref={glow2Ref}
        className="absolute bottom-1/3 right-1/4 w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none z-0 animate-pulse-glow"
        style={{ animationDelay: "3s" }}
      ></div>

      {/* Layered Interactive Image Reveal Stack */}
      <div
        ref={imageContainerRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 select-none overflow-hidden"
      >
        {/* Layer 2: Bottom Image (Revealed Layer) */}
        <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center">
          <img
            src={image2}
            alt="Bottom Reveal Layer"
            className="w-full h-full object-cover pointer-events-none opacity-85 select-none"
          />
        </div>

        {/* Layer 1: Top Image (Masked Layer) */}
        <div
          ref={topLayerRef}
          className="absolute inset-0 w-full h-full z-10 flex items-center justify-center"
        >
          <img
            src={image1}
            alt="Top Masked Layer"
            className="w-full h-full object-cover pointer-events-none select-none"
          />
        </div>
      </div>

      {/* Elegant Bottom-Left Aligned Text Content - Forced Z-30 above all images */}
      <div className="relative z-30 max-w-2xl text-left pointer-events-auto select-text">
        {/* Uppercase Eyebrow Text */}
        <div ref={eyebrowRef} className="overflow-hidden mb-3">
          <span
            data-aos="fade-up"
            data-aos-delay="100"
            className="inline-block text-[10px] sm:text-xs font-display font-medium tracking-[0.3em] uppercase text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]"
          >
            Full Stack & AI/ML Developer
          </span>
        </div>

        {/* Large Modern Clean Heading */}
        <div ref={headingRef} className="overflow-hidden mb-5">
          <h1
            data-aos="fade-up"
            data-aos-delay="250"
            className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-white leading-[1.08] tracking-tight"
          >
            AjayKumar <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">Yadav</span>
          </h1>
        </div>

        {/* Minimal Description */}
        <div ref={descRef} className="overflow-hidden mb-8">
          <p
            data-aos="fade-up"
            data-aos-delay="400"
            className="text-xs sm:text-sm text-zinc-400 max-w-md font-sans font-light tracking-wide leading-relaxed"
          >
            Driven developer with expertise in Full Stack Web Development, Python, and Machine Learning models. Passionate about solving complex problems, building scalable web systems, and optimizing user experiences.
          </p>
        </div>

        {/* Action Buttons */}
        <div
          ref={buttonsRef}
          data-aos="fade-up"
          data-aos-delay="550"
          className="flex items-center gap-6 sm:gap-8"
        >
          {/* Primary Filled Button */}
          <button 
            onClick={() => {
              if (window.lenis) window.lenis.scrollTo('#creations');
              else document.querySelector('#creations')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-full bg-white text-black font-sans text-xs font-semibold tracking-wide hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.35)] cursor-pointer"
          >
            Explore Projects
          </button>

          {/* Secondary Text Button with Animated Arrow */}
          <button 
            onClick={() => {
              if (window.lenis) window.lenis.scrollTo('#contact');
              else document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group text-xs font-sans font-semibold tracking-wider text-zinc-300 hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <span>GET IN TOUCH</span>
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-none stroke-current stroke-2 transition-transform duration-300 transform group-hover:translate-x-1.5"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12,5 19,12 12,19" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right Corner Interactive Hint (Desktop Only) */}
      <div className="absolute right-12 bottom-12 hidden md:flex items-center gap-3 pointer-events-none select-none z-30 opacity-40">
        <span className="text-[9px] font-display uppercase tracking-[0.25em] text-zinc-400">
          HOVER MOUSE TO REVEAL VISUAL MATRIX
        </span>
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-zinc-400"></span>
        </span>
      </div>
    </section>
  );
}

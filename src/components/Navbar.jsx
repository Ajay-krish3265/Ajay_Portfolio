import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  const navContainerRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const overlayLinksRef = useRef([]);
  const dot1Ref = useRef(null);
  const dot2Ref = useRef(null);
  const dot3Ref = useRef(null);
  const dot4Ref = useRef(null);
  const toggleTextRef = useRef(null);
  const logoSvgRef = useRef(null);

  const menuItems = ["Home", "About", "Skills", "Creations", "Career", "Contact"];

  // 1. Entrance animation on load
  useEffect(() => {
    gsap.fromTo(
      navContainerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  // 2. Active Section Highlighting via ScrollTrigger
  useEffect(() => {
    const sections = [
      { id: "#about", name: "About" },
      { id: "#skills", name: "Skills" },
      { id: "#creations", name: "Creations" },
      { id: "#experience", name: "Career" },
      { id: "#contact", name: "Contact" },
    ];

    const triggers = [];

    // Top / Hero section active state
    const tHome = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "top -30%",
      onToggle: (self) => {
        if (self.isActive) setActiveItem("Home");
      },
    });
    triggers.push(tHome);

    // Grid section active states
    sections.forEach((sec) => {
      const el = document.querySelector(sec.id);
      if (!el) return;

      const tSec = ScrollTrigger.create({
        trigger: el,
        start: "top 40%",
        end: "bottom 40%",
        onToggle: (self) => {
          if (self.isActive) setActiveItem(sec.name);
        },
      });
      triggers.push(tSec);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  // 3. GSAP Toggle Timeline for Mobile Menu & Dot Morphing
  const timelineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.inOut" } });

    // Morph 2x2 dot grid into an elegant X
    tl.to(dot1Ref.current, {
      x: 3.5,
      y: 3.5,
      rotation: 45,
      scaleX: 2.2,
      scaleY: 0.8,
      borderRadius: "1px",
      duration: 0.4
    }, 0)
    .to(dot4Ref.current, {
      x: -3.5,
      y: -3.5,
      rotation: 45,
      scaleX: 2.2,
      scaleY: 0.8,
      borderRadius: "1px",
      duration: 0.4
    }, 0)
    .to(dot2Ref.current, {
      x: -3.5,
      y: 3.5,
      rotation: -45,
      scaleX: 2.2,
      scaleY: 0.8,
      borderRadius: "1px",
      duration: 0.4
    }, 0)
    .to(dot3Ref.current, {
      x: 3.5,
      y: -3.5,
      rotation: -45,
      scaleX: 2.2,
      scaleY: 0.8,
      borderRadius: "1px",
      duration: 0.4
    }, 0);

    // Smooth toggle text scale transition
    tl.fromTo(toggleTextRef.current, 
      { scale: 1 }, 
      { scale: 0.85, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.inOut" }, 
      0
    );

    // Fullscreen mobile overlay reveal
    tl.fromTo(menuOverlayRef.current,
      { opacity: 0, visibility: "hidden" },
      { opacity: 1, visibility: "visible", duration: 0.5, ease: "power3.inOut" },
      0
    );

    // Links reveal
    tl.fromTo(
      overlayLinksRef.current,
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
      0.25
    );

    timelineRef.current = tl;
  }, []);

  // Update menu animation when state changes
  useEffect(() => {
    if (timelineRef.current) {
      if (isOpen) {
        timelineRef.current.play();
      } else {
        timelineRef.current.reverse();
      }
    }
  }, [isOpen]);

  // Logo Spin Animation on Hover
  const handleLogoMouseEnter = () => {
    gsap.to(logoSvgRef.current, {
      rotation: 180,
      duration: 0.8,
      ease: "power3.out"
    });
  };

  const handleLogoMouseLeave = () => {
    gsap.to(logoSvgRef.current, {
      rotation: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  };

  // Smooth Scroll handler via Lenis
  const handleNavClick = (item) => {
    setActiveItem(item);
    setIsOpen(false);

    let target = "";
    if (item === "Home") target = 0;
    else if (item === "About") target = "#about";
    else if (item === "Skills") target = "#skills";
    else if (item === "Creations") target = "#creations";
    else if (item === "Career") target = "#experience";
    else if (item === "Contact") target = "#contact";

    if (window.lenis) {
      window.lenis.scrollTo(target);
    } else {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Floating Pill Navbar Container */}
      <header
        ref={navContainerRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl h-16 z-50 rounded-full border border-white/10 bg-black/35 backdrop-blur-md px-6 md:px-8 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      >
        {/* Left Section: Logo & Brand Name */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavClick("Home")}
          onMouseEnter={handleLogoMouseEnter}
          onMouseLeave={handleLogoMouseLeave}
        >
          {/* Logo SVG */}
          <div ref={logoSvgRef} className="w-8 h-8 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-7 h-7 text-white fill-none stroke-current stroke-[6] transition-opacity duration-300 group-hover:opacity-100 opacity-85"
            >
              {/* Outer hexagonal geometry */}
              <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" />
              {/* Inner geometric core */}
              <circle cx="50" cy="50" r="18" className="fill-cyan-400/30" />
              <line x1="50" y1="5" x2="50" y2="95" className="stroke-cyan-400/50 stroke-[3]" />
            </svg>
          </div>

          {/* Brand Text */}
          <span className="text-[11px] font-display font-semibold uppercase tracking-[0.25em] text-white opacity-85 group-hover:opacity-100 transition-opacity duration-300">
            AOXNVINCERE
          </span>
        </div>

        {/* Center Section: Desktop Pill Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5 shadow-inner">
          {menuItems.map((item) => {
            const isActive = activeItem === item;
            return (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`relative px-5 py-2 text-xs font-sans tracking-wide rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-white bg-white/10 shadow-[0_2px_10px_rgba(255,255,255,0.05)] border border-white/10"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>

        {/* Right Section: CTA & Mobile Menu Trigger */}
        <div className="flex items-center gap-4">
          {/* CTA Button */}
          <button 
            onClick={() => handleNavClick("Contact")}
            className="relative overflow-hidden group px-6 py-2.5 rounded-full bg-white text-black font-sans text-xs font-semibold tracking-wide hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)] flex items-center gap-2 cursor-pointer"
          >
            {/* Pulsing Status Dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="relative z-10">Lets talk</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-colors duration-300"
          >
            {/* Text label - Managed directly by React state for 100% reliability */}
            <span
              ref={toggleTextRef}
              className="text-[10px] font-display font-medium tracking-widest text-zinc-300 w-11 text-center"
            >
              {isOpen ? "CLOSE" : "MENU"}
            </span>

            {/* 2x2 Dot Grid Icon Container */}
            <div className="relative w-4 h-4 flex flex-wrap justify-between items-between p-0.5">
              <span
                ref={dot1Ref}
                className="dot-1 w-[5px] h-[5px] bg-white rounded-full origin-center absolute top-0.5 left-0.5"
              ></span>
              <span
                ref={dot2Ref}
                className="dot-2 w-[5px] h-[5px] bg-white rounded-full origin-center absolute top-0.5 right-0.5"
              ></span>
              <span
                ref={dot3Ref}
                className="dot-3 w-[5px] h-[5px] bg-white rounded-full origin-center absolute bottom-0.5 left-0.5"
              ></span>
              <span
                ref={dot4Ref}
                className="dot-4 w-[5px] h-[5px] bg-white rounded-full origin-center absolute bottom-0.5 right-0.5"
              ></span>
            </div>
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Overlay Menu */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 z-40 bg-[#030303]/95 backdrop-blur-2xl flex flex-col justify-center items-center pointer-events-none opacity-0 invisible"
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        {/* Soft Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-[130px] animate-pulse-glow" style={{ animationDelay: "2s" }}></div>

        {/* Central Overlay Links */}
        <div className="flex flex-col gap-6 text-center z-10">
          {menuItems.map((item, idx) => {
            const isActive = activeItem === item;
            return (
              <button
                key={item}
                ref={(el) => (overlayLinksRef.current[idx] = el)}
                onClick={() => handleNavClick(item)}
                className={`text-3xl font-display font-medium tracking-[0.1em] transition-all duration-300 py-2 cursor-pointer hover:tracking-[0.18em] hover:scale-105 active:scale-95 ${
                  isActive
                    ? "text-white font-semibold drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                    : "text-zinc-500 hover:text-zinc-200"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
       

        {/* Bottom Small Footer info */}
        <div className="absolute bottom-10 text-[9px] font-display uppercase tracking-[0.3em] text-zinc-600">
          © 2026 AJAYKUMAR R. ALL RIGHTS RESERVED.
        </div>
      </div>
    </>
  );
}


import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "./SectionTitle";
import GlowBackground from "./GlowBackground";
import FloatingCard from "./FloatingCard";

gsap.registerPlugin(ScrollTrigger);

const SKILLS_DATA = {
  frontend: [
    { name: "React.js", level: 90 },
    { name: "JavaScript (ES6+)", level: 92 },
    { name: "HTML5 & CSS3", level: 95 },
    { name: "Figma", level: 85 },
  ],
  backend: [
    { name: "Python (Certified)", level: 95 },
    { name: "Django Framework", level: 90 },
    { name: "MySQL Database", level: 88 },
    { name: "REST API Integration", level: 92 },
  ],
  ai_ml: [
    { name: "Machine Learning Models", level: 88 },
    { name: "LSTM Neural Networks", level: 85 },
    { name: "LLM & Coqui-TTS Chatbots", level: 86 },
    { name: "Data Preprocessing", level: 90 },
  ],
  soft_skills: [
    { name: "Problem Solving", level: 95 },
    { name: "Teamwork & Collaboration", level: 94 },
    { name: "Effective Communication", level: 92 },
    { name: "Creative Thinking", level: 90 },
  ],
  certifications: [
    { name: "Python Certified", level: 100 },
    { name: "Full Stack Development Certified", level: 100 },
    { name: "Gen-AI Devolopment", level: 90 },
    { name: "Data Analyst", level: 88 },
  ],
};

const CATEGORIES = [
  { id: "frontend", label: "FRONTEND" },
  { id: "backend", label: "BACKEND" },
  { id: "ai_ml", label: "AI / ML" },
  { id: "soft_skills", label: "SOFT SKILLS" },
  { id: "certifications", label: "CERTIFICATIONS" },
];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const cardsContainerRef = useRef(null);
  const coreRef = useRef(null);

  // Stagger animation for skill cards whenever category switches
  useEffect(() => {
    const cards = cardsContainerRef.current?.querySelectorAll(".skill-card");
    const progressLines = cardsContainerRef.current?.querySelectorAll(".progress-line");
    
    if (cards && cards.length > 0) {
      // Fade and slide in cards
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }
      );
    }

    if (progressLines && progressLines.length > 0) {
      // Animate progress lines from width 0%
      progressLines.forEach((line) => {
        const val = line.getAttribute("data-level");
        gsap.fromTo(
          line,
          { width: "0%" },
          { width: `${val}%`, duration: 1.4, delay: 0.2, ease: "expo.out" }
        );
      });
    }
  }, [activeCategory]);

  // Rotate concentric orbits inside central graph
  const orbitParallaxRef = useRef(null);
  const orbitContainerRef = useRef(null);

  useEffect(() => {
    const core = coreRef.current;
    if (!core) return;

    const ring1 = core.querySelector(".orbit-ring-1");
    const ring2 = core.querySelector(".orbit-ring-2");
    const ring3 = core.querySelector(".orbit-ring-3");

    // Continuous spin in different directions and speeds
    gsap.to(ring1, { rotation: 360, repeat: -1, duration: 25, ease: "none" });
    gsap.to(ring2, { rotation: -360, repeat: -1, duration: 35, ease: "none" });
    gsap.to(ring3, { rotation: 360, repeat: -1, duration: 45, ease: "none" });

    // Scroll parallax on orbit area
    const orbitParallax = gsap.fromTo(
      orbitParallaxRef.current,
      { y: 40 },
      {
        y: -45,
        ease: "none",
        scrollTrigger: {
          trigger: "#skills",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        }
      }
    );

    // Throttled mouse movement response using requestAnimationFrame
    let rAFId = null;
    const handleMouseMove = (e) => {
      if (rAFId) return;
      const clientX = e.clientX;
      const clientY = e.clientY;

      rAFId = requestAnimationFrame(() => {
        rAFId = null;
        if (!orbitContainerRef.current) return;
        const xOffset = (clientX - window.innerWidth / 2) * 0.04;
        const yOffset = (clientY - window.innerHeight / 2) * 0.04;

        gsap.to(orbitContainerRef.current, {
          x: xOffset,
          y: yOffset,
          rotateX: -yOffset * 0.3,
          rotateY: xOffset * 0.3,
          duration: 0.8,
          ease: "power1.out"
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      if (rAFId) cancelAnimationFrame(rAFId);
      orbitParallax.scrollTrigger?.kill();
      orbitParallax.kill();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="skills"
      className="relative w-full min-h-screen py-24 sm:py-32 md:py-40 bg-[#030303] overflow-hidden flex flex-col justify-center"
    >
      <GlowBackground color="blue" />

      <div className="relative z-10 w-[92%] max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Heading */}
        <SectionTitle
          backdropText="MATRICES"
          eyebrow="02 // TELEMETRY NODES"
          title="INTERACTIVE SKILL SYSTEM"
          subtitle="A specialized technological suite. Toggle sections below to scan proficiency levels across core software stacks."
        />

        {/* Categories Tab Selector (Floating Pill style) */}
        <div className="flex flex-wrap items-center justify-start gap-3 mb-12 sm:mb-16 bg-white/[0.02] border border-white/5 p-2 rounded-full max-w-max pointer-events-auto">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-[10px] sm:text-xs font-display font-medium tracking-widest transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-cyan-400"
                    : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Cinematic Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-20 items-center">
          
          {/* Concentric Tech Orbit Animation Area (Left) */}
          <div ref={orbitParallaxRef} className="col-span-1 lg:col-span-6 flex items-center justify-center relative select-none">
            
            {/* Ambient Background Sphere Glow */}
            <div className="absolute w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full bg-cyan-500/10 blur-[80px] animate-pulse-glow z-0"></div>

            {/* Orbit SVG Ring Container */}
            <div 
              ref={orbitContainerRef} 
              className="w-[300px] sm:w-[420px] aspect-square relative z-10 flex items-center justify-center transition-all duration-300 pointer-events-none"
              style={{ perspective: 1000 }}
            >
              <div ref={coreRef} className="w-full h-full relative flex items-center justify-center">
                
                {/* Central Cyan Plasma Orb Core */}
                <div className="absolute w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.6)] animate-ping" style={{ animationDuration: "3s" }}></div>
                <div className="absolute w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-cyan-500/30 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                  <span className="text-[8px] sm:text-[9px] font-display font-black tracking-widest text-white uppercase text-center leading-none">
                    FUSION<br/>CORE
                  </span>
                </div>

                {/* Orbit Ring 1 (Inner) */}
                <svg className="orbit-ring-1 absolute inset-0 w-full h-full stroke-zinc-700/40 stroke-dashed fill-none pointer-events-none" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="18" strokeWidth="0.4" />
                  <circle cx="50" cy="32" r="1.5" className="fill-cyan-400 shadow-md" />
                  <circle cx="50" cy="68" r="1.2" className="fill-cyan-400" />
                </svg>

                {/* Orbit Ring 2 (Middle) */}
                <svg className="orbit-ring-2 absolute inset-0 w-full h-full stroke-zinc-600/35 stroke-[0.3] fill-none pointer-events-none" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="28" />
                  <circle cx="22" cy="50" r="1.8" className="fill-blue-400" />
                  <circle cx="78" cy="50" r="1.5" className="fill-blue-400" />
                  <path d="M 50 18 A 32 32 0 0 1 82 50" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="1.5, 1.5" />
                </svg>

                {/* Orbit Ring 3 (Outer) */}
                <svg className="orbit-ring-3 absolute inset-0 w-full h-full stroke-zinc-500/25 stroke-[0.25] fill-none pointer-events-none" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="39" />
                  <circle cx="50" cy="11" r="2.2" className="fill-cyan-400 animate-pulse" />
                  <circle cx="50" cy="89" r="2" className="fill-white" />
                  <circle cx="11" cy="50" r="1.5" className="fill-cyan-400" />
                  <circle cx="89" cy="50" r="1.5" className="fill-blue-500" />
                </svg>

                {/* Rotating radar graphic overlay */}
                <div className="absolute w-[92%] h-[92%] border border-cyan-500/5 rounded-full z-0 flex items-center justify-center animate-pulse">
                  <div className="absolute w-[80%] h-[80%] border border-cyan-500/5 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Diagnostic stats on the radar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-[7px] sm:text-[8px] font-display text-zinc-500 tracking-[0.25em] uppercase">
              SECTOR GRID: ACTIVATED // RESOLUTION: HIGH
            </div>
          </div>

          {/* Technology Proficiency list (Right) */}
          <div
            ref={cardsContainerRef}
            className="col-span-1 lg:col-span-6 flex flex-col gap-5 sm:gap-6 pointer-events-auto"
          >
            {SKILLS_DATA[activeCategory].map((skill, index) => (
              <FloatingCard
                key={skill.name}
                floatIntensity={0}
                tiltMax={6}
                glowColor="rgba(59, 130, 246, 0.15)"
                className="skill-card p-5 border-white/5 bg-white/[0.015] w-full"
              >
                <div className="flex flex-col gap-3">
                  
                  {/* Title & Level Indicator */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm font-display font-medium text-white tracking-wide">
                      {skill.name}
                    </span>
                    <span className="text-[10px] sm:text-xs font-display font-semibold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]">
                      {skill.level}% PROFICIENCY
                    </span>
                  </div>

                  {/* Dynamic Glowing Progress Bar Track */}
                  <div className="relative w-full h-1.5 bg-zinc-900 border border-white/5 rounded-full overflow-hidden">
                    <div
                      data-level={skill.level}
                      className="progress-line absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                      style={{ width: "0%" }}
                    ></div>
                  </div>

                </div>
              </FloatingCard>
            ))}
          </div>

        </div>

      </div>

      {/* Infinite Tech Marquee Loop at the bottom */}
      <div className="w-full relative mt-24 border-t border-b border-white/5 py-4 bg-[#050505]/40 select-none overflow-hidden flex items-center justify-center">
        <div className="flex whitespace-nowrap animate-marquee gap-24">
          <div className="flex gap-24 text-[10px] sm:text-xs font-display tracking-[0.4em] font-semibold text-zinc-500 uppercase">
            <span>PYTHON CERTIFIED</span>
            <span className="text-cyan-400">•</span>
            <span>FULL STACK DEVELOPER</span>
            <span className="text-cyan-400">•</span>
            <span>DJANGO BACKEND</span>
            <span className="text-cyan-400">•</span>
            <span>REACT JS FRONTEND</span>
            <span className="text-cyan-400">•</span>
            <span>LSTM AI MODELS</span>
            <span className="text-cyan-400">•</span>
            <span>MYSQL DATABASE</span>
            <span className="text-cyan-400">•</span>
            <span>FLUTTER MOBILE APPS</span>
          </div>
          <div className="flex gap-24 text-[10px] sm:text-xs font-display tracking-[0.4em] font-semibold text-zinc-500 uppercase">
            <span>PYTHON CERTIFIED</span>
            <span className="text-cyan-400">•</span>
            <span>FULL STACK DEVELOPER</span>
            <span className="text-cyan-400">•</span>
            <span>DJANGO BACKEND</span>
            <span className="text-cyan-400">•</span>
            <span>REACT JS FRONTEND</span>
            <span className="text-cyan-400">•</span>
            <span>LSTM AI MODELS</span>
            <span className="text-cyan-400">•</span>
            <span>MYSQL DATABASE</span>
            <span className="text-cyan-400">•</span>
            <span>FLUTTER MOBILE APPS</span>
          </div>
        </div>
      </div>

      {/* Custom Styles for Infinite Marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
}

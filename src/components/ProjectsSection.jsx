import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "./SectionTitle";
import GlowBackground from "./GlowBackground";
import MagneticButton from "./MagneticButton";
import image1 from "../assets/image-1.png";
import aoxnVincereVideo from "../assets/AoxnVincere portfolio.mp4";
import grillVideo from "../assets/grill.mp4";
import jarvisorb from "../assets/jarvisorb.mp4";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [

    {
    id: "01",
    title: "Grilli Master",
    category: "Full Stack Web Platform",
    desc: "A high-speed food ordering website built with Django backend and MySQL database. Features API integration for quick order placement and real-time delivery routing for bike riders.",
    tech: ["DJANGO (PYTHON)", "MYSQL", "REST API", "HTML/CSS/JS", "WEB DEV"],
    bgGradient: "from-purple-950/40 via-[#030303] to-[#030303]",
    glowColor: "purple",
    video: grillVideo,
    alignLeft: true,
  },

  {
    id: "02",
    title: "J.A.R.V.I.S    -  AI CHATBOT WITH LLM MODEL",
    category: "AI / NLP & Speech",
    desc: "A smart conversational AI bot powered by open-source LLMs, Coqui-TTS speech synthesis, and Pygame. Translates languages, answers queries, solves problems, and interacts conversationally.",
    tech: ["PYTHON", "LLM MODELS", "COQUI-TTS", "PYGAME", "NLP"],
    bgGradient: "from-blue-950/40 via-[#030303] to-[#030303]",
    glowColor: "blue",
    video: jarvisorb,
    alignLeft: true,
  },
    {
    id: "03",
    title: "PROJECT AOXNVINCERE",
    category: "Neural Telemetry Grid",
    desc: "A luxury dashboard displaying real-time biometric feed data, neural frequency waves, and user interface telemetry inside an immersive WebGL matrix canvas.",
    tech: ["REACT JS", "GSAP SCROLLTRIGGER", "WEBSOCKETS", "SVG SHADERS"],
    bgGradient: "from-cyan-950/40 via-[#030303] to-[#030303]",
    glowColor: "cyan",
    video: aoxnVincereVideo,
    alignLeft: false,
  },

];

export default function ProjectsSection() {
  const triggerRef = useRef(null);
  const scrollTrackRef = useRef(null);
  const bgTransitionRef = useRef(null);

  useEffect(() => {
    const track = scrollTrackRef.current;
    const trigger = triggerRef.current;
    if (!track || !trigger) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth;
      };

      // Ultra-Fast 60-120 FPS GPU Horizontal Scrubbing
      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          pinSpacing: true,
          scrub: 0.5, // Crisp, responsive 60fps scrub
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Background subtle gradient fade
      gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 0.5,
        }
      })
        .to(bgTransitionRef.current, {
          opacity: 0.4,
          duration: 1,
        })
        .to(bgTransitionRef.current, {
          opacity: 0.8,
          duration: 1,
        });

    }, triggerRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={triggerRef}
      id="creations"
      className="relative w-full overflow-hidden bg-[#030303] will-change-transform"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Dynamic background color morph layer */}
      <div
        ref={bgTransitionRef}
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 z-0 opacity-80"
        style={{
          backgroundImage: "radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.12) 0%, transparent 60%)"
        }}
      ></div>

      {/* Horizontal Sliding Track */}
      <div
        ref={scrollTrackRef}
        className="flex w-[300vw] h-screen items-center relative z-10 will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        {PROJECTS.map((proj, idx) => {
          const isCyan = proj.glowColor === "cyan";
          const isBlue = proj.glowColor === "blue";
          const glowBorder = isCyan
            ? "group-hover:border-cyan-500/30 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
            : isBlue
              ? "group-hover:border-blue-500/30 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
              : "group-hover:border-purple-500/30 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]";

          return (
            <section
              key={proj.id}
              className="project-slide w-screen h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 relative overflow-hidden"
            >
              {/* Background watermarked text shifting with parallax */}
              <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center z-0 opacity-[0.03] w-full h-full">
                <span className="project-backdrop-text text-[30vw] font-display font-black tracking-widest uppercase text-white whitespace-nowrap">
                  {proj.title.split(" ")[0]}
                </span>
              </div>

              {/* Header section displayed in slide 1 only */}
              {idx === 0 && (
                <div className="absolute top-16 left-6 sm:left-12 md:left-20 lg:left-28 z-20">
                  <SectionTitle
                    backdropText="WORK"
                    eyebrow="03 // PORTFOLIO EXPERIENCES"
                    title="CREATIONS & CASESHIPS"
                  />
                </div>
              )}

              {/* Main project slide grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center w-full mt-12 sm:mt-16 relative z-10">

                {/* Visual Image container */}
                <div className={`col-span-1 lg:col-span-6 relative group overflow-hidden rounded-2xl border border-white/5 bg-zinc-950 pointer-events-auto transition-all duration-700 ${glowBorder} ${proj.alignLeft ? "order-1" : "order-1 lg:order-2"
                  }`}>
                  {/* Technical scanner graphic details */}
                  <div className="absolute top-4 left-4 z-20 text-[8px] font-display text-zinc-500 tracking-[0.2em]">
                    SYS_BUILD // NODE_{proj.id}
                  </div>

                  {/* Neon target scopes */}
                  <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-white/5 pointer-events-none z-10"></div>
                  <div className="absolute left-0 right-0 top-12 h-[1px] bg-white/5 pointer-events-none z-10"></div>

                  <div className="aspect-[16/10] overflow-hidden rounded-2xl">
                    {proj.video ? (
                      <video
                        src={proj.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="project-img w-full h-full object-cover will-change-transform"
                      />
                    ) : (
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="project-img w-full h-full object-cover will-change-transform"
                      />
                    )}
                  </div>

                  {/* Gradient bottom mask overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10"></div>
                </div>

                {/* Narrative Details container */}
                <div className={`col-span-1 lg:col-span-6 flex flex-col justify-center items-start pointer-events-auto ${proj.alignLeft ? "order-2" : "order-2 lg:order-1"
                  }`}>

                  {/* Floating index label */}
                  <div className="project-animate-item text-[10px] font-display font-medium tracking-[0.4em] text-cyan-400 mb-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                    {proj.category.toUpperCase()} / {proj.id}
                  </div>

                  {/* Large Project title */}
                  <h3 className="project-animate-item text-2xl sm:text-3xl md:text-4xl font-display font-light text-white leading-none mb-6">
                    {proj.title}
                  </h3>

                  {/* Project description text */}
                  <p className="project-animate-item text-xs sm:text-sm text-zinc-400 font-sans font-light tracking-wide leading-relaxed mb-8 max-w-lg">
                    {proj.desc}
                  </p>

                  {/* Technology tokens */}
                  <div className="project-animate-item flex flex-wrap items-center gap-2 mb-8">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-[8px] sm:text-[9px] font-display font-medium tracking-widest text-zinc-400 uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Holo Action Button */}
                  <div className="project-animate-item flex items-center gap-6 pointer-events-auto">
                    <MagneticButton
                      onClick={() => {
                        if (window.lenis) window.lenis.scrollTo('#contact');
                        else document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-5 py-2.5 rounded-full bg-white text-black font-sans text-[10px] sm:text-xs font-semibold tracking-wider hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                      VIEW DETAILS
                    </MagneticButton>
                    <a
                      href="https://www.github.com/ajaykrish143"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-[10px] sm:text-xs font-sans font-semibold tracking-widest text-zinc-400 hover:text-white transition-colors duration-300"
                    >
                      <span>GITHUB REPO</span>
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    </a>
                  </div>

                </div>

              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

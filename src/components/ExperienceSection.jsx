import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "./SectionTitle";
import GlowBackground from "./GlowBackground";
import FloatingCard from "./FloatingCard";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE_DATA = [
  {
    id: 1,
    role: "FULL STACK DEVELOPMENT INTERN",
    company: "Vimkees Tech Pvt Ltd",
    period: "2024 - 2025",
    desc: "A company specializing in web development solutions. Worked with the wider development team managing website design, content architecture, SEO marketing, branding, and logo design.",
    tech: ["FULL STACK", "WEB DEVELOPMENT", "SEO MARKETING", "BRANDING & LOGO"],
    side: "left",
  },
  {
    id: 2,
    role: "ARTIFICIAL INTELLIGENCE IN WEB APPS INTERN",
    company: "Adventure Tech Pvt Ltd",
    period: "2024",
    desc: "A technology company focused on innovative app development. Assisted in designing, coding, and testing mobile or web applications. Designed and optimized UI/UX for 3 mobile apps using Flutter, improving load speed by 20%.",
    tech: ["AI IN WEB APPS", "FLUTTER", "UI/UX DESIGN", "MOBILE & WEB APPS"],
    side: "right",
  },
  {
    id: 3,
    role: "MACHINE LEARNING INTERN",
    company: "Retech Solution Pvt Ltd",
    period: "2024",
    desc: "A company dedicated to artificial intelligence solutions. Worked on developing, optimizing, and deploying AI models. Managed website content, preprocessed data entries, and developed ML models achieving high test accuracy.",
    tech: ["MACHINE LEARNING", "PYTHON AI", "DATA PREPROCESSING", "MODEL DEPLOYMENT"],
    side: "left",
  },
];

export default function ExperienceSection() {
  const triggerRef = useRef(null);
  const fillLineRef = useRef(null);

  // Real-time Pixel-Exact Line Fill & Node Aura Activation
  useEffect(() => {
    const line = fillLineRef.current;
    const trigger = triggerRef.current;
    if (!line || !trigger) return;

    const trackContainer = line.parentElement;
    const nodes = trigger.querySelectorAll(".timeline-node");
    const cards = trigger.querySelectorAll(".timeline-card-wrapper");
    const backdropYears = trigger.querySelectorAll(".experience-backdrop-year");

    const ctx = gsap.context(() => {
      // Master timeline driving fillLine and checking node thresholds in real time
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: trackContainer,
          start: "top 55%",
          end: "bottom 65%",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress; // Line fill fraction from 0.0 to 1.0
            const trackRect = trackContainer.getBoundingClientRect();
            const trackHeight = trackRect.height || 1;

            nodes.forEach((node) => {
              const nodeRect = node.getBoundingClientRect();
              // Calculate node's vertical center relative to line track top
              const nodeCenterRel = (nodeRect.top + nodeRect.height / 2) - trackRect.top;
              const nodeThreshold = Math.max(0, Math.min(1, nodeCenterRel / trackHeight));

              const innerDot = node.querySelector(".timeline-inner-dot");
              const pulseRing = node.querySelector(".timeline-pulse-ring");

              // The exact frame when line progress reaches or passes the node center threshold
              if (progress >= nodeThreshold && progress > 0.005) {
                if (!node.getAttribute("data-active")) {
                  node.setAttribute("data-active", "true");
                  gsap.to(node, {
                    scale: 1,
                    backgroundColor: "#06b6d4",
                    borderColor: "#22d3ee",
                    boxShadow: "0 0 20px rgba(34, 211, 238, 0.9), 0 0 40px rgba(6, 182, 212, 0.6)",
                    duration: 0.25,
                    ease: "power2.out"
                  });
                  if (innerDot) {
                    gsap.to(innerDot, { backgroundColor: "#ffffff", scale: 1, duration: 0.25 });
                  }
                  if (pulseRing) {
                    gsap.to(pulseRing, { opacity: 1, duration: 0.25 });
                  }
                }
              } else {
                if (node.getAttribute("data-active")) {
                  node.removeAttribute("data-active");
                  gsap.to(node, {
                    scale: 1,
                    backgroundColor: "#080808",
                    borderColor: "rgba(255,255,255,0.2)",
                    boxShadow: "none",
                    duration: 0.25,
                    ease: "power2.out"
                  });
                  if (innerDot) {
                    gsap.to(innerDot, { backgroundColor: "rgba(255,255,255,0.3)", scale: 1, duration: 0.25 });
                  }
                  if (pulseRing) {
                    gsap.to(pulseRing, { opacity: 0, duration: 0.25 });
                  }
                }
              }
            });
          }
        }
      });

      // Animate line scaleY linearly 0 to 1 inside master timeline
      mainTl.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none" }, 0);

      // Card reveals
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              once: true,
            }
          }
        );
      });

      // Year backdrop parallax
      backdropYears.forEach((year) => {
        gsap.fromTo(
          year,
          { yPercent: 20 },
          {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
              trigger: year,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            }
          }
        );
      });

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={triggerRef}
      id="experience"
      className="relative w-full min-h-screen py-24 sm:py-32 md:py-40 bg-[#030303] overflow-hidden flex flex-col justify-center"
    >
      <GlowBackground color="purple" />

      <div className="relative z-10 w-[92%] max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        {/* Title Heading */}
        <SectionTitle
          backdropText="CAREER"
          eyebrow="04 // HISTORIC LOGS"
          title="CHRONOLOGIC TELEMETRY"
          subtitle="Tracing core operational roles, technological upgrades, and system deployments completed across professional environments."
        />

        {/* Timeline main container */}
        <div className="relative w-full mt-24">

          {/* Main Track Line (Desktop Centered, Mobile Left-aligned) */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-zinc-900 z-0">
            {/* dynamic scroll-driven glow fill line */}
            <div
              ref={fillLineRef}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 origin-top shadow-[0_0_15px_rgba(6,182,212,0.6)]"
              style={{ transform: "scaleY(0)" }}
            ></div>
          </div>

          {/* Timeline Items */}
          <div className="flex flex-col gap-12 sm:gap-16 relative">
            {EXPERIENCE_DATA.map((exp) => {
              const isLeft = exp.side === "left";
              return (
                <div
                  key={exp.id}
                  id={`exp-${exp.id}`}
                  className={`w-full flex flex-col md:flex-row items-start md:items-center relative z-10 ${isLeft ? "justify-start md:text-right" : "justify-end"
                    }`}
                >

                  {/* Floating Date Typography Backdrop */}
                  <div className={`experience-backdrop-year absolute top-0 select-none pointer-events-none text-[6vw] font-display font-extrabold uppercase leading-none text-white/5 tracking-wider hidden md:block ${isLeft ? "left-6" : "right-6"
                    }`}>
                    {exp.period.split(" - ")[0]}
                  </div>

                  {/* Glassmorphic timeline card wrapper */}
                  <div
                    className={`timeline-card-wrapper w-full md:w-[45%] opacity-0 translate-y-8 pointer-events-auto ${isLeft ? "md:pr-12 md:pl-0 pl-12" : "md:pl-12 pl-12"
                      }`}
                  >
                    <FloatingCard
                      tiltMax={6}
                      floatIntensity={0}
                      className="p-6 md:p-8 border-white/5 bg-white/[0.01]"
                    >
                      {/* Floating Date label inside card (Mobile visible) */}
                      <span className="inline-block text-[9px] font-display font-semibold tracking-widest text-cyan-400 border border-cyan-400/20 bg-cyan-500/5 px-2.5 py-1 rounded-full mb-4">
                        {exp.period}
                      </span>

                      <h3 className="text-sm sm:text-base font-display font-semibold tracking-wide text-white uppercase mb-1">
                        {exp.role}
                      </h3>

                      <h4 className="text-xs font-display tracking-widest text-zinc-400 font-medium mb-4">
                        {exp.company.toUpperCase()}
                      </h4>

                      <p className="text-[11px] sm:text-xs text-zinc-400 font-sans font-light leading-relaxed mb-6">
                        {exp.desc}
                      </p>

                      {/* Tech stack bullets */}
                      <div className={`flex flex-wrap gap-2 ${isLeft ? "md:justify-end" : "justify-start"}`}>
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[8px] sm:text-[9px] font-display font-semibold text-zinc-500 bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-full uppercase"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </FloatingCard>
                  </div>

                  {/* Pulsing Timeline central Node */}
                  <div
                    onClick={() => {
                      if (window.lenis) {
                        window.lenis.scrollTo(`#exp-${exp.id}`);
                      } else {
                        const el = document.getElementById(`exp-${exp.id}`);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="timeline-node absolute left-4 md:left-1/2 top-[32px] md:top-1/2 -translate-x-[7px] md:-translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#080808] border-2 border-zinc-700/60 z-20 flex items-center justify-center cursor-pointer transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)] group"
                  >
                    <div className="timeline-pulse-ring absolute -inset-1 rounded-full bg-cyan-400/40 opacity-0 pointer-events-none transition-opacity duration-300 animate-ping"></div>
                    <div className="timeline-inner-dot w-2 h-2 rounded-full bg-zinc-500/50 transition-all duration-300"></div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}



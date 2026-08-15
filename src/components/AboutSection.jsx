import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "./SectionTitle";
import GlowBackground from "./GlowBackground";
import ParallaxImage from "./ParallaxImage";
import FloatingCard from "./FloatingCard";
import RevealText from "./RevealText";
import image1 from "../assets/image-1.png";
import about from "../assets/About.jpeg";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  
  // Stats refs for numeric counts
  const expRef = useRef(null);
  const projRef = useRef(null);
  const techRef = useRef(null);

  // Dynamic GSAP Counters & Advanced Animation
  useEffect(() => {
    // 1. Telemetry numerical counter animations
    const triggerStats = (ref, targetVal, suffix = "+") => {
      if (!ref.current) return;
      
      const proxy = { val: 0 };
      const anim = gsap.to(proxy, {
        val: targetVal,
        duration: 2.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 95%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.innerText = Math.floor(proxy.val) + suffix;
          }
        },
      });

      return anim;
    };

    const a1 = triggerStats(expRef, 3, "+");
    const a2 = triggerStats(projRef, 3, "");
    const a3 = triggerStats(techRef, 8, "+");

    // 2. Parallax rotation of holographic outer circles linked to scroll
    const ring1 = gsap.to(".hologram-ring-1", {
      rotation: 240,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    const ring2 = gsap.to(".hologram-ring-2", {
      rotation: -180,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });

    // 3. Stagger reveal on the narrative paragraphs
    const bioAnim = gsap.fromTo(
      ".narrative-text-block",
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".narrative-text-block",
          start: "top 85%",
        }
      }
    );

    // 4. Stagger reveal on diagnostic float cards
    const cardsAnim = gsap.fromTo(
      ".about-diagnostic-card",
      { opacity: 0, scale: 0.97, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-diagnostic-card",
          start: "top 90%",
        }
      }
    );

    // 5. Stat Row Glow Pulse trigger
    const rowAnim = gsap.fromTo(
      ".stats-row-container",
      { scale: 0.98, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-row-container",
          start: "top 90%",
        }
      }
    );

    return () => {
      a1?.scrollTrigger?.kill();
      a1?.kill();
      a2?.scrollTrigger?.kill();
      a2?.kill();
      a3?.scrollTrigger?.kill();
      a3?.kill();
      ring1.scrollTrigger?.kill();
      ring1.kill();
      ring2.scrollTrigger?.kill();
      ring2.kill();
      bioAnim.scrollTrigger?.kill();
      bioAnim.kill();
      cardsAnim.scrollTrigger?.kill();
      cardsAnim.kill();
      rowAnim.scrollTrigger?.kill();
      rowAnim.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen py-24 sm:py-32 md:py-40 bg-[#030303] overflow-hidden flex flex-col justify-center"
    >
      {/* Background glow meshes */}
      <GlowBackground color="cyan" />

      {/* Main Section Content Wrapper */}
      <div className="relative z-10 w-[92%] max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Title row */}
        <SectionTitle
          backdropText="ABOUT"
          eyebrow="01 // PROFILE MATRIX"
          title="ABOUT ME & ACADEMICS"
          subtitle="A driven developer with a proactive approach, proven problem-solving abilities, and continuous learning mindset across Full Stack & AI systems."
        />

        {/* Cinematic Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-20 items-start">
          
          {/* Sticky Visual Column (Left) */}
          <div 
            ref={leftColRef}
            className="col-span-1 lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Holographic Border Ring behind picture */}
            <div className="hologram-ring-1 absolute w-[105%] h-[105%] rounded-2xl border border-dashed border-cyan-500/20 pointer-events-none"></div>
            <div className="hologram-ring-2 absolute w-[101%] h-[101%] rounded-2xl border border-cyan-500/10 pointer-events-none"></div>
            
            {/* Scope Crosshair Lines */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-cyan-500/15 z-0 pointer-events-none"></div>
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-cyan-500/15 z-0 pointer-events-none"></div>

            <ParallaxImage
              src={about}
              alt="Ajaykumar R Profile"
              className="w-full aspect-[4/5] object-cover rounded-2xl z-10 relative"
              speed={1.3}
            />

            {/* Sub-text diagnostic bar */}
            <div className="w-full flex items-center justify-between mt-4 px-2 text-[8px] font-display text-zinc-500 tracking-[0.2em] uppercase z-10">
              <span>LOCATION: THIRUVANNAMALAI, TN</span>
              <span>STATUS: READY FOR ROLES</span>
            </div>
          </div>

          {/* Narrative & Stats Column (Right) */}
          <div className="col-span-1 lg:col-span-7 flex flex-col justify-start gap-12 pointer-events-auto">
            
            {/* Bio Paragraph */}
            <div className="flex flex-col gap-6 narrative-container">
              <span className="text-xs font-display tracking-widest text-cyan-400 uppercase font-semibold">
                EXECUTIVE SUMMARY:
              </span>
              <div className="narrative-text-block">
                <RevealText
                  text="I am a driven individual with a proactive approach, well-suited for internship and developer roles. I have demonstrated proficiency in problem-solving and teamwork, alongside strong communication and analytical skills."
                  className="text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed font-light"
                />
              </div>
              <div className="narrative-text-block">
                <RevealText
                  text="I am eager to contribute towards achieving impactful outcomes and driving success in projects, while continuously learning and pushing the boundaries of web development and artificial intelligence."
                  className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light mt-2"
                />
              </div>
            </div>

            {/* Academic Track Cards */}
            <div className="flex flex-col gap-4 w-full">
              <span className="text-xs font-display tracking-widest text-cyan-400 uppercase font-semibold">
                ACADEMIC QUALIFICATIONS:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                
                <div className="about-diagnostic-card">
                  <FloatingCard tiltMax={10} className="p-5 border-white/5 bg-white/[0.02]">
                    <span className="text-[9px] font-display font-bold uppercase text-cyan-400 tracking-widest block mb-1">
                      DEC 2022 -2026
                    </span>
                    <h4 className="text-xs font-display font-semibold text-white tracking-wide mb-2">
                      DEGREE PROGRAM : B.E - Computer Science and Engineering
                    </h4>
                    <p className="text-[11px] text-zinc-400 font-sans leading-relaxed font-light">
                      Veltech MultiTech Engineering College - Chennai
                    </p>
                    <p className="text-[11px] text-zinc-400 font-sans leading-relaxed font-light">
                      CGPA: <span className="text-cyan-400 font-semibold">8</span>
                    </p>
                  </FloatingCard>
                </div>

                <div className="about-diagnostic-card">
                  <FloatingCard tiltMax={10} className="p-5 border-white/5 bg-white/[0.02]" floatDelay={1.0}>
                    <span className="text-[9px] font-display font-bold uppercase text-cyan-400 tracking-widest block mb-1">
                      2020 - 2021
                    </span>
                    <h4 className="text-xs font-display font-semibold text-white tracking-wide mb-2">
                      HSC (12TH GRADE)
                    </h4>
                    <p className="text-[11px] text-zinc-400 font-sans leading-relaxed font-light">
                      Sri Karpaga Vinayaga Metric Higher Secondary School - Kolundampet
                    </p>
                    <div className="mt-2 text-[10px] text-cyan-400 font-display font-semibold">
                      SCORE: 89.6%
                    </div>
                  </FloatingCard>
                </div>

                <div className="about-diagnostic-card">
                  <FloatingCard tiltMax={10} className="p-5 border-white/5 bg-white/[0.02]" floatDelay={1.5}>
                    <span className="text-[9px] font-display font-bold uppercase text-cyan-400 tracking-widest block mb-1">
                      2018 - 2019
                    </span>
                    <h4 className="text-xs font-display font-semibold text-white tracking-wide mb-2">
                      SSLC (10TH GRADE)
                    </h4>
                    <p className="text-[11px] text-zinc-400 font-sans leading-relaxed font-light">
                      Government Boys Higher Secondary School - Melpallipattu
                    </p>
                    <div className="mt-2 text-[10px] text-cyan-400 font-display font-semibold">
                      SCORE: 87.4%
                    </div>
                  </FloatingCard>
                </div>

              </div>
            </div>

            {/* Glowing Stats Counters Row */}
            <div className="stats-row-container grid grid-cols-3 gap-4 border-t border-b border-white/10 py-8 bg-zinc-950/20 backdrop-blur-sm rounded-xl px-4 sm:px-6">
              
              <div className="flex flex-col items-start justify-center">
                <span 
                  ref={expRef}
                  className="text-3xl sm:text-4xl md:text-5xl font-display font-extralight text-white leading-none tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 select-none"
                >
                  0+
                </span>
                <span className="text-[9px] sm:text-[10px] font-display uppercase tracking-[0.2em] text-cyan-400/80 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                  INTERNSHIP ROLES
                </span>
              </div>

              <div className="flex flex-col items-start justify-center border-l border-white/10 pl-6">
                <span 
                  ref={projRef}
                  className="text-3xl sm:text-4xl md:text-5xl font-display font-extralight text-white leading-none tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 select-none"
                >
                  0
                </span>
                <span className="text-[9px] sm:text-[10px] font-display uppercase tracking-[0.2em] text-cyan-400/80 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                  MAJOR PROJECTS
                </span>
              </div>

              <div className="flex flex-col items-start justify-center border-l border-white/10 pl-6">
                <span 
                  ref={techRef}
                  className="text-3xl sm:text-4xl md:text-5xl font-display font-extralight text-white leading-none tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 select-none"
                >
                  0+
                </span>
                <span className="text-[9px] sm:text-[10px] font-display uppercase tracking-[0.2em] text-cyan-400/80 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                  CORE TECH SKILLS
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

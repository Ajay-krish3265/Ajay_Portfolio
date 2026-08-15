import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "./SectionTitle";
import GlowBackground from "./GlowBackground";
import FloatingCard from "./FloatingCard";
import MagneticButton from "./MagneticButton";
import { Mail, Send, Terminal } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, sending, success
  const sectionRef = useRef(null);
  const spotlightRef = useRef(null);

  // Custom inline SVG icons since lucide-react brand icons are not available in this version
  const githubIcon = (
    <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-none stroke-current stroke-2">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );

  const linkedinIcon = (
    <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-none stroke-current stroke-2">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" className="fill-current" />
    </svg>
  );

  const twitterIcon = (
    <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-none stroke-current stroke-2">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );

  // Spotlight mouse-follow event handler (Throttled with requestAnimationFrame)
  const rAFRef = useRef(null);
  const handleMouseMove = (e) => {
    if (rAFRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    rAFRef.current = requestAnimationFrame(() => {
      rAFRef.current = null;
      if (!spotlightRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      gsap.to(spotlightRef.current, {
        x: x - 175,
        y: y - 175,
        duration: 0.5,
        ease: "power1.out"
      });
    });
  };

  // Scroll entrance staggers
  useEffect(() => {
    const entrance = gsap.fromTo(
      ".contact-animate-item",
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
        }
      }
    );

    return () => {
      entrance.scrollTrigger?.kill();
      entrance.kill();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate telemetry server submission
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
      
      // Reset after success message
      setTimeout(() => setStatus("idle"), 4000);
    }, 1800);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      id="contact"
      className="relative w-full min-h-screen py-24 sm:py-32 md:py-40 bg-[#030303] overflow-hidden flex flex-col justify-center"
    >
      <GlowBackground color="cyan" />

      {/* Mouse follow radial spotlight */}
      <div
        ref={spotlightRef}
        className="absolute w-[350px] h-[350px] rounded-full bg-cyan-500/[0.06] blur-[90px] pointer-events-none z-0 hidden lg:block"
        style={{ transform: "translate3d(-1000px, -1000px, 0)" }}
      ></div>

      {/* Background Watermark */}
      <div className="absolute bottom-8 right-8 text-[12vw] font-display font-extrabold uppercase text-white/[0.01] tracking-widest pointer-events-none select-none">
        CONNECT
      </div>

      <div className="relative z-10 w-[92%] max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Title Block */}
        <SectionTitle
          backdropText="CONTACT"
          eyebrow="05 // TELEPORT CHANNEL"
          title="SECURE TRANSMISSION"
          subtitle="Initialize a socket node connection. Fill out the form matrix below or reach out via alternative communication frequencies."
        />

        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-20 items-start mt-12 sm:mt-16">
          
          {/* Left Column: Social channels and Diagnostic info */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-start gap-8 pointer-events-auto">
            
            <div className="contact-animate-item flex flex-col gap-4">
              <h3 className="text-xl sm:text-2xl font-display font-light text-white tracking-wide uppercase">
                COMMUNICATION MATRIX
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans font-light leading-relaxed">
                Whether you are looking to initiate a premium software build, configure telemetry analytics, or simply chat about advanced animations, the grid is always open.
              </p>
            </div>

            {/* Neon Glow Contact Cards */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="contact-animate-item">
                <a
                  href="mailto:akavenger143007@gmail.com"
                  className="flex items-center gap-4 group p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-400/20 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[9px] font-display uppercase tracking-[0.2em] text-zinc-500">EMAIL ADDRESS</div>
                    <div className="text-xs sm:text-sm font-display font-medium text-white tracking-wide group-hover:text-cyan-400 transition-colors duration-300">
                      akavenger143007@gmail.com
                    </div>
                  </div>
                </a>
              </div>

              <div className="contact-animate-item">
                <a
                  href="tel:+919626273706"
                  className="flex items-center gap-4 group p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-400/20 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[9px] font-display uppercase tracking-[0.2em] text-zinc-500">PHONE // MOBILE</div>
                    <div className="text-xs sm:text-sm font-display font-medium text-white tracking-wide group-hover:text-cyan-400 transition-colors duration-300">
                      +91 9626273706
                    </div>
                  </div>
                </a>
              </div>

              {/* Floating Social Icons Row */}
              <div className="contact-animate-item flex items-center gap-4 mt-2">
                {[
                  { icon: githubIcon, link: "https://www.github.com/ajaykrish143", label: "GitHub" },
                  { icon: linkedinIcon, link: "https://www.linkedin.com/in/ajay-kumar-46a17a358", label: "LinkedIn" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    title={social.label}
                    className="w-12 h-12 rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] text-zinc-400 hover:text-cyan-400 flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:border-cyan-500/30"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Telemetry diagnostic card */}
            <div className="contact-animate-item border border-white/5 bg-zinc-950/40 p-5 rounded-xl flex items-start gap-4">
              <Terminal className="w-5 h-5 text-cyan-400 mt-1 shrink-0 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" />
              <div className="text-[10px] font-display text-zinc-500 tracking-[0.15em] uppercase leading-relaxed">
                <span className="text-white block font-bold mb-1">ENCRYPTION: SHIELD ENABLED</span>
                Your packet messages are filtered via secure local buffers. Latency: &lt;12ms. Status: Core Green.
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Holographic Contact Form */}
          <div className="contact-animate-item col-span-1 lg:col-span-7 w-full pointer-events-auto">
            <FloatingCard
              floatIntensity={0}
              tiltMax={6}
              glowColor="rgba(6, 182, 212, 0.2)"
              className="p-8 md:p-10 border-white/10 bg-white/[0.015]"
            >
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center animate-pulse">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] mb-6 animate-bounce">
                    <Send className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-semibold text-white tracking-widest uppercase mb-3">
                    TRANSMISSION SUCCESS
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed max-w-sm font-light">
                    Your message packet has been loaded into our queue buffer. Response frequency will be routed shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8">
                  
                  {/* Name field */}
                  <div className="relative w-full group">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="NAME // PROTOCOL"
                      className="w-full bg-zinc-950/40 border border-white/5 rounded-xl px-5 py-4 text-xs font-display tracking-widest text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/60 focus:bg-zinc-950/70 transition-all duration-300"
                    />
                    {/* Glowing highlight trace */}
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-focus-within:w-full"></div>
                  </div>

                  {/* Email field */}
                  <div className="relative w-full group">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="EMAIL // ADDRESS"
                      className="w-full bg-zinc-950/40 border border-white/5 rounded-xl px-5 py-4 text-xs font-display tracking-widest text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/60 focus:bg-zinc-950/70 transition-all duration-300"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-focus-within:w-full"></div>
                  </div>

                  {/* Message field */}
                  <div className="relative w-full group">
                    <textarea
                      name="message"
                      rows="5"
                      required
                      value={formState.message}
                      onChange={handleInputChange}
                      placeholder="MESSAGE // PACKET DESCRIPTION"
                      className="w-full bg-zinc-950/40 border border-white/5 rounded-xl px-5 py-4 text-xs font-display tracking-widest text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/60 focus:bg-zinc-950/70 transition-all duration-300 resize-none"
                    ></textarea>
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-focus-within:w-full"></div>
                  </div>

                  {/* Submission CTA */}
                  <MagneticButton
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-4.5 rounded-xl bg-white text-black font-sans text-xs font-semibold tracking-widest hover:scale-[1.02] active:scale-95 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.35)] flex items-center justify-center gap-3"
                  >
                    <span>{status === "sending" ? "TRANSMITTING..." : "DISPATCH SIGNAL"}</span>
                    <Send className={`w-3.5 h-3.5 ${status === "sending" ? "animate-pulse" : ""}`} />
                  </MagneticButton>

                </form>
              )}
            </FloatingCard>
          </div>

        </div>

      </div>
    </section>
  );
}

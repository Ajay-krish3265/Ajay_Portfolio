import React from "react";
import MagneticButton from "./MagneticButton";
import { ArrowUp } from "lucide-react";

export default function FooterSection() {
  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full bg-[#030303] overflow-hidden pt-20 pb-12 border-t border-white/5">
      {/* Soft radial grid blur background */}
      <div className="absolute inset-0 radial-glow opacity-30 z-0 pointer-events-none"></div>

      {/* Floating background micro-particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-3/4 left-1/3 w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/3 left-2/3 w-0.5 h-0.5 rounded-full bg-white animate-pulse" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute top-2/3 left-3/4 w-1 h-1 rounded-full bg-cyan-300 animate-pulse" style={{ animationDelay: "1.5s" }}></div>
      </div>

      <div className="relative z-10 w-[92%] max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Dynamic Glowing Divider Line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mb-16 relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#030303] border border-cyan-500/40 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
          </div>
        </div>

        {/* Central Brand Watermark Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
            <span className="text-2xl sm:text-3xl font-display font-light text-white tracking-[0.3em] uppercase">
              AOXNVINCERE
            </span>
            <span className="text-[9px] sm:text-[10px] font-display text-zinc-500 tracking-[0.25em] uppercase">
              FULL STACK & AI/ML DEVELOPER PORTFOLIO // 2026
            </span>
          </div>

          {/* Nodal Link Row */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
            {[
              { label: "ABOUT", href: "#about" },
              { label: "SKILLS", href: "#skills" },
              { label: "PROJECTS", href: "#creations" },
              { label: "CAREER", href: "#experience" },
              { label: "CONTACT", href: "#contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[10px] sm:text-xs font-display font-semibold tracking-widest text-zinc-400 hover:text-cyan-400 transition-colors duration-300 relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Scroll to Top Nodule */}
          <div className="pointer-events-auto">
            <MagneticButton
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full border border-white/10 hover:border-cyan-500/30 bg-zinc-950/40 text-zinc-400 hover:text-cyan-400 flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)]"
            >
              <ArrowUp className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>

        {/* Huge Faded Background Watermark */}
        <div className="w-full text-center select-none pointer-events-none overflow-hidden my-4 opacity-[0.015]">
          <span className="text-[14vw] font-display font-black tracking-[0.4em] uppercase text-white block leading-none select-none">
            AOXNVINCERE
          </span>
        </div>

        {/* Footer Subtext Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8 text-[9px] sm:text-[10px] font-display text-zinc-600 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span>CORE STATUS: READY FOR ROLES</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <div>
            © {new Date().getFullYear()} AOXNVINCERE. ALL MATRIX CHANNELS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.github.com/ajaykrish143" target="_blank" rel="noreferrer" title="GitHub" className="hover:text-cyan-400 transition-colors duration-300">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/ajay-kumar-46a17a358" target="_blank" rel="noreferrer" title="LinkedIn" className="hover:text-cyan-400 transition-colors duration-300">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" className="fill-current" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import Navbar from './components/Navbar';
import PremiumHero from './components/PremiumHero';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';
function App() {
  return (
    <div className="relative w-full min-h-screen bg-[#030303] text-[#f3f4f6] overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Global Overlay: Cinematic Static Noise Overlay */}
      <div className="fixed inset-0 bg-noise opacity-[0.015] pointer-events-none z-[60]" />

      {/* Ultra-Premium Navigation */}
      <Navbar />
      
      {/* Immersive Main Application */}
      <main className="relative z-10 w-full flex flex-col">
        <PremiumHero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
        <FooterSection />
      </main>
    </div>
  );
}

export default App;


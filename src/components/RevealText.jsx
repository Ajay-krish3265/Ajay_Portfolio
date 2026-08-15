import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RevealText({
  text = "",
  className = "",
  delay = 0,
  triggerOnce = true,
  startTrigger = "top 85%",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !text) return;

    const words = container.querySelectorAll(".reveal-word");
    if (words.length === 0) return;

    const anim = gsap.fromTo(
      words,
      {
        y: 16,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.012,
        ease: "power2.out",
        delay: delay,
        scrollTrigger: {
          trigger: container,
          start: startTrigger,
          toggleActions: triggerOnce ? "play none none none" : "play none none reverse",
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [text, delay, triggerOnce, startTrigger]);

  if (!text) return null;

  return (
    <p
      ref={containerRef}
      className={`flex flex-wrap items-center text-zinc-400 font-sans font-light tracking-wide leading-relaxed ${className}`}
    >
      {text.split(" ").map((word, idx) => (
        <span
          key={idx}
          className="inline-block overflow-hidden mr-[0.3em] my-[0.1em]"
        >
          <span className="reveal-word inline-block will-change-transform opacity-0">
            {word}
          </span>
        </span>
      ))}
    </p>
  );
}

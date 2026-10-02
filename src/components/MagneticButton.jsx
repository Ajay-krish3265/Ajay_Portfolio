import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function MagneticButton({
  children,
  className = "",
  onClick,
  disabled = false,
  type = "button",
  ...props
}) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || disabled) return;

    let cachedRect = null;
    let rAFId = null;

    const handleMouseEnter = () => {
      cachedRect = button.getBoundingClientRect();
    };

    const handleMouseMove = (e) => {
      if (rAFId) return;
      const clientX = e.clientX;
      const clientY = e.clientY;

      rAFId = requestAnimationFrame(() => {
        rAFId = null;
        if (!cachedRect) cachedRect = button.getBoundingClientRect();

        const x = clientX - (cachedRect.left + cachedRect.width / 2);
        const y = clientY - (cachedRect.top + cachedRect.height / 2);

        // Interpolate x and y by 35% to pull towards pointer
        gsap.to(button, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    };

    const handleMouseLeave = () => {
      if (rAFId) {
        cancelAnimationFrame(rAFId);
        rAFId = null;
      }
      cachedRect = null;

      // Spring back to center smoothly
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    button.addEventListener("mousemove", handleMouseMove, { passive: true });
    button.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      if (rAFId) cancelAnimationFrame(rAFId);
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [disabled]);

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center cursor-pointer transition-shadow will-change-transform ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

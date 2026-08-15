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

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      // Interpolate x and y by 35% to pull towards pointer
      gsap.to(button, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      // Elastic spring back to center
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.45)",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
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

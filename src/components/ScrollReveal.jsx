import React, { useEffect, useRef, useState } from "react";

const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 800,
  distance = 45,
  scale = 0.985,
  once = true,
  threshold = 0.12,
  className = "",
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    // Respect the user's reduced-motion preference.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          setIsVisible(true);

          // Animate only once for a smoother premium experience.
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once, threshold]);

  const getHiddenTransform = () => {
    switch (direction) {
      case "down":
        return `translate3d(0, -${distance}px, 0) scale(${scale})`;

      case "left":
        return `translate3d(${distance}px, 0, 0) scale(${scale})`;

      case "right":
        return `translate3d(-${distance}px, 0, 0) scale(${scale})`;

      case "scale":
        return `translate3d(0, 0, 0) scale(${scale})`;

      case "up":
      default:
        return `translate3d(0, ${distance}px, 0) scale(${scale})`;
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translate3d(0, 0, 0) scale(1)"
          : getHiddenTransform(),

        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,

        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
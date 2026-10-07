import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const PromoBanner = () => {
  const sectionRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  /* ==========================================================
     SCROLL ANIMATION
     ========================================================== */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

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
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* ==========================================================
     MOUSE INTERACTION
     ========================================================== */

  const handleMouseMove = (event) => {
    const section = sectionRef.current;

    if (!section) return;

    const rect = section.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;

    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    setMousePosition({
      x,
      y,
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);

    setMousePosition({
      x: 0,
      y: 0,
    });
  };

  /* ==========================================================
     IMAGE PARALLAX
     ========================================================== */

  const imageTransform = isHovering
    ? `scale(1.06) translate3d(${mousePosition.x * -6}px, ${
        mousePosition.y * -6
      }px, 0)`
    : "scale(1) translate3d(0, 0, 0)";

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-[#1F1427] px-5 py-16 sm:px-8 md:py-20 lg:px-12 xl:px-16"
    >
      {/* ======================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#79538A]/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-48 -right-40 h-[430px] w-[430px] rounded-full bg-[#C9A227]/[0.08] blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[75%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#D9BD67]/35 to-transparent" />

      {/* ======================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative mx-auto max-w-7xl">
        <div
          className={`grid overflow-hidden border border-[#8A718F]/30 bg-[#2B1B35] shadow-[0_25px_80px_rgba(0,0,0,0.32)] transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          } lg:grid-cols-[0.95fr_1.05fr]`}
        >
          {/* ==================================================
              LEFT CONTENT
          ================================================== */}

          <div className="relative flex items-center overflow-hidden px-7 py-14 sm:px-10 sm:py-16 md:px-14 lg:px-16 lg:py-20">
            {/* Soft light */}

            <div className="pointer-events-none absolute -left-24 top-1/4 h-64 w-64 rounded-full bg-[#8E619D]/[0.14] blur-3xl" />

            <div className="pointer-events-none absolute bottom-[-90px] right-[-80px] h-56 w-56 rounded-full bg-[#C9A227]/[0.05] blur-3xl" />

            <div className="relative z-10 max-w-xl">
              {/* ==================================================
                  LABEL
              ================================================== */}

              <div
                className={`flex items-center gap-4 transition-all duration-700 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? "100ms" : "0ms",
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A227]/30 bg-white/[0.04]">
                  <Sparkles
                    size={17}
                    strokeWidth={1.3}
                    className="text-[#D8BD65]"
                  />
                </div>

                <div>
                  <p className="text-[9px] font-medium uppercase tracking-[0.38em] text-[#D8BD65]">
                    Special Offer
                  </p>

                  <div className="mt-2 h-px w-12 bg-[#C9A227]" />
                </div>
              </div>

              {/* ==================================================
                  HEADING
              ================================================== */}

              <h2
                className={`mt-7 font-serif text-4xl leading-[1.06] text-[#FFFDF8] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-5xl md:text-[54px] lg:text-[60px] ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? "220ms" : "0ms",
                }}
              >
                Elegance That
                <span className="block">Makes Every</span>
                <span className="relative mt-1 inline-block italic text-[#D9BE68]">
                  Moment Special
                  <span className="absolute -bottom-2 left-0 h-[2px] w-14 bg-[#C9A227]" />
                </span>
              </h2>

              {/* ==================================================
                  DESCRIPTION
              ================================================== */}

              <p
                className={`mt-7 max-w-lg text-sm leading-7 text-[#D1C4D6] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-base ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? "400ms" : "0ms",
                }}
              >
                Discover beautifully crafted bangles made to complement your
                style and add a graceful finishing touch to every occasion.
              </p>

              {/* ==================================================
                  OFFER
              ================================================== */}

              <div
                className={`mt-8 flex items-end gap-5 transition-all duration-700 ease-out ${
                  isVisible
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-5 scale-[0.96] opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? "540ms" : "0ms",
                }}
              >
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#CDB45F]">
                    Up To
                  </p>

                  <p className="mt-1 font-serif text-5xl leading-none text-white sm:text-6xl">
                    20%
                  </p>
                </div>

                <div className="pb-1">
                  <p className="font-serif text-xl italic text-[#D8BD65]">
                    OFF
                  </p>

                  <div className="mt-2 h-px w-10 bg-[#C9A227]" />
                </div>
              </div>

              {/* ==================================================
                  BUTTON
              ================================================== */}

              <div
                className={`mt-9 flex flex-wrap items-center gap-4 transition-all duration-700 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? "680ms" : "0ms",
                }}
              >
                <Link
                  to="/shop"
                  className="group/shop relative inline-flex items-center gap-3 overflow-hidden bg-[#C9A227] px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#21152A] transition-all duration-500 hover:-translate-y-1 hover:bg-[#DFC565] hover:shadow-[0_15px_35px_rgba(201,162,39,0.20)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E2CC74] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B1B35]"
                >
                  {/* Shimmer */}

                  <span className="absolute inset-y-0 left-0 w-1/4 -translate-x-[180%] skew-x-[-20deg] bg-white/25 transition-transform duration-1000 group-hover/shop:translate-x-[600%]" />

                  <span className="relative z-10">Shop Now</span>

                  <ArrowRight
                    size={16}
                    strokeWidth={1.4}
                    className="relative z-10 transition-transform duration-500 group-hover/shop:translate-x-1.5"
                  />
                </Link>

                <Link
                  to="/collections"
                  className="group/collections inline-flex items-center gap-2 border-b border-[#C9A227] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#D7CBDC] transition-all duration-500 hover:border-[#E1C968] hover:text-[#E1C968]"
                >
                  <span>Explore Collections</span>

                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.4}
                    className="transition-transform duration-500 group-hover/collections:-translate-y-1 group-hover/collections:translate-x-1"
                  />
                </Link>
              </div>

              {/* ==================================================
                  SECONDARY LINKS
              ================================================== */}

              <div
                className={`mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 transition-all duration-700 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? "820ms" : "0ms",
                }}
              >
                <Link
                  to="/about"
                  className="group/about inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-[#AFA1B7] transition-colors duration-300 hover:text-[#D8BD65]"
                >
                  About Us
                  <ArrowUpRight
                    size={11}
                    strokeWidth={1.4}
                    className="transition-transform duration-300 group-hover/about:-translate-y-0.5 group-hover/about:translate-x-0.5"
                  />
                </Link>

                <span className="h-3 w-px bg-white/10" />

                <Link
                  to="/contact"
                  className="group/contact inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-[#AFA1B7] transition-colors duration-300 hover:text-[#D8BD65]"
                >
                  Contact
                  <ArrowUpRight
                    size={11}
                    strokeWidth={1.4}
                    className="transition-transform duration-300 group-hover/contact:-translate-y-0.5 group-hover/contact:translate-x-0.5"
                  />
                </Link>
              </div>

              {/* ==================================================
                  SHIPPING
              ================================================== */}

              <div
                className={`mt-7 flex items-center gap-3 transition-all duration-700 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? "940ms" : "0ms",
                }}
              >
                <span className="h-px w-8 bg-[#C9A227]" />

                <p className="text-xs text-[#9E91A8]">
                  Free shipping on orders above ₹999
                </p>
              </div>
            </div>
          </div>

          {/* ==================================================
              RIGHT IMAGE
          ================================================== */}

          <Link
            to="/collections"
            aria-label="Explore YAMA FLYS collections"
            className={`group/image relative min-h-[430px] overflow-hidden border-t border-white/10 lg:min-h-[570px] lg:border-l lg:border-t-0 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
            style={{
              transitionDelay: isVisible ? "160ms" : "0ms",
            }}
          >
            {/* ==================================================
                IMAGE
            ================================================== */}

            <img
              src="/assets/promo-img.png"
              alt="Woman wearing YAMA FLYS bangles"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/assets/Brand-img.jpeg";
              }}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out"
              style={{
                transform: imageTransform,
              }}
            />

            {/* ==================================================
                IMAGE OVERLAYS
            ================================================== */}

            <div className="absolute inset-0 bg-gradient-to-r from-[#21152A]/25 via-transparent to-[#171717]/20" />

            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

            {/* Gold / purple hover wash */}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#76517F]/0 to-[#C9A227]/0 transition-all duration-700 group-hover/image:from-[#76517F]/20 group-hover/image:to-[#C9A227]/10" />

            {/* ==================================================
                MOUSE LIGHT
            ================================================== */}

            <div
              className={`pointer-events-none absolute h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9BD67]/10 blur-3xl transition-opacity duration-500 ${
                isHovering ? "opacity-100" : "opacity-0"
              }`}
              style={{
                left: `${50 + mousePosition.x * 18}%`,
                top: `${50 + mousePosition.y * 18}%`,
              }}
            />

            {/* ==================================================
                GOLD FRAME
            ================================================== */}

            <div className="pointer-events-none absolute inset-5 border border-white/30 transition-all duration-700 group-hover/image:inset-4 group-hover/image:border-[#E0C96D]/75" />

            {/* ==================================================
                TOP CONTENT
            ================================================== */}

            <div className="absolute left-7 right-7 top-7 z-10 flex items-start justify-between">
              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/85">
                  YAMA FLYS
                </p>

                <div className="mt-2 h-px w-10 bg-[#D8BD65]" />
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/10 text-white backdrop-blur-md transition-all duration-500 group-hover/image:border-[#C9A227] group-hover/image:bg-[#C9A227] group-hover/image:text-[#21152A]">
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.4}
                  className="transition-transform duration-500 group-hover/image:-translate-y-0.5 group-hover/image:translate-x-0.5"
                />
              </div>
            </div>

            {/* ==================================================
                IMAGE BOTTOM CONTENT
            ================================================== */}

            <div className="absolute bottom-7 left-7 right-7 z-10">
              <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#DEC36A]">
                Premium Collection
              </p>

              <h3 className="mt-2 max-w-md font-serif text-2xl leading-tight text-white sm:text-3xl">
                Discover pieces made for your moments.
              </h3>

              <div className="mt-4 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/80 transition-colors duration-500 group-hover/image:text-[#E3CA6E]">
                <span>Explore Collections</span>

                <ArrowRight
                  size={14}
                  strokeWidth={1.4}
                  className="transition-transform duration-500 group-hover/image:translate-x-1"
                />
              </div>
            </div>

            {/* Gold bottom line */}

            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#C9A227] transition-all duration-700 group-hover/image:w-full" />
          </Link>
        </div>

        {/* =====================================================
            BOTTOM DETAIL
        ===================================================== */}

        <div
          className={`mt-9 flex items-center justify-center gap-4 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{
            transitionDelay: isVisible ? "1050ms" : "0ms",
          }}
        >
          <span className="h-px w-12 bg-white/10 sm:w-20" />

          <span className="font-serif text-xs italic text-[#8F8293]">
            Beauty that completes the look
          </span>

          <span className="h-px w-12 bg-white/10 sm:w-20" />
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;

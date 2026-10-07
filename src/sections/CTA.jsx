import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShoppingBag,
  Heart,
  Gem,
} from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  const sectionRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* =========================================================
     MOUSE INTERACTION
  ========================================================= */

  const handleMouseMove = (event) => {
    const rect = sectionRef.current?.getBoundingClientRect();

    if (!rect) return;

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setMouse({ x, y });
  };

  const handleMouseLeave = () => {
    setMouse({ x: 50, y: 50 });
  };

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const showContent = isVisible || prefersReducedMotion;

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-[#120D12] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      {/* =====================================================
          MOUSE LIGHT
      ===================================================== */}

      <div
        className="pointer-events-none absolute inset-0 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(
              circle at ${mouse.x}% ${mouse.y}%,
              rgba(155,112,141,0.16),
              transparent 28%
            )
          `,
        }}
      />

      {/* =====================================================
          AMBIENT LIGHT
      ===================================================== */}

      <div className="pointer-events-none absolute -left-52 top-1/3 h-[520px] w-[520px] rounded-full bg-[#704A68]/20 blur-[150px]" />

      <div className="pointer-events-none absolute -right-52 bottom-0 h-[520px] w-[520px] rounded-full bg-[#806047]/10 blur-[150px]" />

      {/* =====================================================
          DECORATIVE CIRCLE
      ===================================================== */}

      <div className="pointer-events-none absolute right-[8%] top-16 hidden h-[260px] w-[260px] rounded-full border border-[#B28B52]/10 lg:block" />

      <div className="pointer-events-none absolute right-[11%] top-[5.5rem] hidden h-[200px] w-[200px] rounded-full border border-[#B28B52]/10 lg:block" />

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl">
        <div
          className={`
            relative overflow-hidden
            border border-[#B28B52]/20
            bg-[#1D151D]
            shadow-[0_35px_100px_rgba(0,0,0,0.45)]
            transition-all duration-1000
            ${
              showContent
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }
          `}
        >
          {/* =================================================
              TOP BAR
          ================================================= */}

          <div className="flex items-center justify-between border-b border-[#B28B52]/15 px-6 py-5 sm:px-10 lg:px-14">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#B28B52]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.4em] text-[#B28B52]">
                YAMA FLYS
              </span>
            </div>

            <div className="flex items-center gap-2 text-[#766875]">
              <Sparkles size={13} strokeWidth={1.2} />

              <span className="hidden text-[8px] uppercase tracking-[0.25em] sm:block">
                Jewellery Collection
              </span>
            </div>
          </div>

          {/* =================================================
              CONTENT GRID
          ================================================= */}

          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            {/* =================================================
                LEFT EDITORIAL PANEL
            ================================================= */}

            <div className="relative flex min-h-[500px] flex-col justify-between overflow-hidden border-b border-[#B28B52]/15 px-7 py-12 sm:px-10 sm:py-14 lg:border-b-0 lg:border-r lg:px-14 lg:py-16">
              {/* Vertical line */}

              <div className="pointer-events-none absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#B28B52]/20 to-transparent sm:left-9 lg:left-12" />

              {/* Number */}

              <div
                className={`
                  relative pl-5 transition-all duration-700 delay-100
                  ${
                    showContent
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-5 opacity-0"
                  }
                `}
              >
                <span className="font-serif text-6xl text-[#B28B52]/20 sm:text-7xl">
                  01
                </span>

                <p className="mt-3 text-[9px] uppercase tracking-[0.35em] text-[#766875]">
                  Discover your style
                </p>
              </div>

              {/* Decorative Gem */}

              <div
                className={`
                  relative mt-14 pl-5 transition-all duration-700 delay-200
                  ${
                    showContent
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }
                `}
              >
                <div className="relative flex h-24 w-24 items-center justify-center border border-[#B28B52]/25 bg-[#120D12]">
                  <div className="absolute inset-2 border border-[#B28B52]/10" />

                  <Gem size={30} strokeWidth={1} className="text-[#D7B778]" />

                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#D7B778]" />
                </div>
              </div>

              {/* Bottom statement */}

              <div
                className={`
                  relative mt-16 pl-5 transition-all duration-700 delay-300
                  ${
                    showContent
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }
                `}
              >
                <p className="max-w-xs font-serif text-2xl leading-tight text-[#EDE4DF] sm:text-3xl">
                  Jewellery that
                  <span className="block italic text-[#D7B778]">
                    feels like you.
                  </span>
                </p>

                <div className="mt-6 h-px w-16 bg-[#B28B52]" />
              </div>
            </div>

            {/* =================================================
                RIGHT CONTENT
            ================================================= */}

            <div className="relative flex items-center px-7 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
              {/* Small decorative mark */}

              <div className="absolute right-8 top-8 flex items-center gap-2 opacity-50 sm:right-12 sm:top-12">
                <span className="h-px w-7 bg-[#B28B52]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#D7B778]" />
              </div>

              <div className="relative w-full max-w-2xl">
                {/* Eyebrow */}

                <div
                  className={`
                    flex items-center gap-3
                    transition-all duration-700 delay-200
                    ${
                      showContent
                        ? "translate-y-0 opacity-100"
                        : "translate-y-5 opacity-0"
                    }
                  `}
                >
                  <Sparkles
                    size={14}
                    strokeWidth={1.2}
                    className="text-[#D7B778]"
                  />

                  <span className="text-[10px] font-medium uppercase tracking-[0.38em] text-[#B28B52]">
                    Curated for you
                  </span>
                </div>

                {/* Heading */}

                <div
                  className={`
                    mt-6 transition-all duration-700 delay-300
                    ${
                      showContent
                        ? "translate-y-0 opacity-100"
                        : "translate-y-7 opacity-0"
                    }
                  `}
                >
                  <h2 className="font-serif text-5xl leading-[0.98] text-[#F4EDE5] sm:text-6xl lg:text-7xl">
                    Wear your
                    <span className="block italic text-[#D7B778]">
                      own story.
                    </span>
                  </h2>

                  <div className="mt-8 flex items-center gap-4">
                    <div className="h-px w-16 bg-[#B28B52]" />

                    <span className="text-[8px] uppercase tracking-[0.3em] text-[#756879]">
                      YAMA FLYS
                    </span>
                  </div>
                </div>

                {/* Description */}

                <p
                  className={`
                    mt-8 max-w-xl
                    text-sm leading-7 text-[#BBAEBB]
                    sm:text-base
                    transition-all duration-700 delay-[400ms]
                    ${
                      showContent
                        ? "translate-y-0 opacity-100"
                        : "translate-y-6 opacity-0"
                    }
                  `}
                >
                  Explore elegant bangles and thoughtfully selected jewellery
                  pieces designed to complement every celebration, outfit, and
                  unforgettable moment.
                </p>

                {/* Buttons */}

                <div
                  className={`
                    mt-10 flex flex-col gap-3
                    sm:flex-row
                    transition-all duration-700 delay-500
                    ${
                      showContent
                        ? "translate-y-0 opacity-100"
                        : "translate-y-6 opacity-0"
                    }
                  `}
                >
                  <Link
                    to="/shop"
                    className="group inline-flex min-h-[52px] items-center justify-center gap-3 bg-[#B28B52] px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#160F1C] transition-all duration-300 hover:bg-[#D7B778] hover:shadow-[0_15px_40px_rgba(178,139,82,0.16)]"
                  >
                    <ShoppingBag size={15} strokeWidth={1.7} />

                    <span>Shop Bangles</span>

                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    to="/collections"
                    className="group inline-flex min-h-[52px] items-center justify-center gap-3 border border-[#B28B52]/35 bg-transparent px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#EDE4DF] transition-all duration-300 hover:border-[#D7B778] hover:bg-[#B28B52]/10"
                  >
                    <span>Explore Collections</span>

                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>

                {/* Quick navigation */}

                <div
                  className={`
                    mt-10 border-t border-[#B28B52]/15 pt-6
                    transition-all duration-700 delay-[600ms]
                    ${
                      showContent
                        ? "translate-y-0 opacity-100"
                        : "translate-y-5 opacity-0"
                    }
                  `}
                >
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                    <Link
                      to="/about"
                      className="text-[9px] uppercase tracking-[0.18em] text-[#817482] transition-colors hover:text-[#D7B778]"
                    >
                      About Us
                    </Link>

                    <span className="h-1 w-1 rounded-full bg-[#B28B52]/50" />

                    <Link
                      to="/contact"
                      className="text-[9px] uppercase tracking-[0.18em] text-[#817482] transition-colors hover:text-[#D7B778]"
                    >
                      Contact
                    </Link>

                    <span className="h-1 w-1 rounded-full bg-[#B28B52]/50" />

                    <Link
                      to="/wishlist"
                      className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] text-[#817482] transition-colors hover:text-[#D7B778]"
                    >
                      <Heart size={12} strokeWidth={1.4} />
                      Wishlist
                    </Link>

                    <span className="h-1 w-1 rounded-full bg-[#B28B52]/50" />

                    <Link
                      to="/cart"
                      className="text-[9px] uppercase tracking-[0.18em] text-[#817482] transition-colors hover:text-[#D7B778]"
                    >
                      Cart
                    </Link>
                  </div>
                </div>

                {/* Bottom note */}

                <div
                  className={`
                    mt-10 flex items-center gap-3
                    transition-all duration-700 delay-700
                    ${
                      showContent
                        ? "translate-y-0 opacity-100"
                        : "translate-y-5 opacity-0"
                    }
                  `}
                >
                  <div className="h-px flex-1 bg-[#B28B52]/10" />

                  <p className="whitespace-nowrap text-[8px] uppercase tracking-[0.3em] text-[#655B67]">
                    Elegance for every occasion
                  </p>

                  <div className="h-px flex-1 bg-[#B28B52]/10" />
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              BOTTOM BORDER
          ================================================= */}

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B28B52]/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default CTA;

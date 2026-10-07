import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Sparkles, Layers3 } from "lucide-react";

import ScrollReveal from "../components/ScrollReveal";

/* =========================================================
   COLLECTION DATA
========================================================= */

const collections = [
  {
    id: 1,
    name: "New Launch",
    image: "/assets/img-15.jpeg",
    description:
      "Discover the latest additions and newly introduced designs from YAMA FLYS.",
  },
  {
    id: 2,
    name: "Top Selling",
    image: "/assets/img-16.jpeg",
    description:
      "Explore designs that customers are choosing across different occasions.",
  },
  {
    id: 3,
    name: "Festival Collection",
    image: "/assets/img-18.jpeg",
    description:
      "Elegant styles created for celebrations, festive moments, and gatherings.",
  },
  {
    id: 4,
    name: "Wedding Collection",
    image: "/assets/img-23.jpeg",
    description:
      "Bangle styles selected for weddings, bridal occasions, and memorable moments.",
  },
  {
    id: 5,
    name: "Jewellery Collection",
    image: "/assets/img-20.jpeg",
    description:
      "Refined jewellery-inspired styles designed to complement your look.",
  },
  {
    id: 6,
    name: "Other Products",
    image: "/assets/img-27.jpeg",
    description:
      "Browse additional products and future additions available from YAMA FLYS.",
  },
];

/* =========================================================
   COLLECTIONS
========================================================= */

const Collections = () => {
  const location = useLocation();

  /* =======================================================
     MOUSE INTERACTION
  ======================================================= */

  const [mousePosition, setMousePosition] = useState({
    x: 50,
    y: 35,
  });

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);

    setMousePosition({
      x: 50,
      y: 35,
    });
  };

  /* =======================================================
     HASH SCROLL
  ======================================================= */

  useEffect(() => {
    if (location.pathname !== "/collections") {
      return;
    }

    if (!location.hash) {
      return;
    }

    const targetId = decodeURIComponent(location.hash.replace("#", ""));

    let timer;

    const scrollToTarget = () => {
      const targetElement = document.getElementById(targetId);

      if (!targetElement) {
        return;
      }

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    timer = setTimeout(() => {
      requestAnimationFrame(scrollToTarget);
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname, location.hash]);

  return (
    <>
      {/* =====================================================
          CUSTOM ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes collectionFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes collectionPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.10;
          }

          50% {
            transform: scale(1.1);
            opacity: 0.22;
          }
        }

        @keyframes collectionRotate {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes collectionShimmer {
          0% {
            transform: translateX(-140%);
          }

          100% {
            transform: translateX(140%);
          }
        }

        @keyframes collectionLine {
          from {
            width: 0;
          }

          to {
            width: 60px;
          }
        }

        @keyframes collectionImageReveal {
          from {
            opacity: 0;
            transform: scale(1.08);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative min-h-screen overflow-hidden bg-[#F4EDE5] text-[#211A17]"
      >
        {/* ===================================================
            GLOBAL CURSOR GLOW
        =================================================== */}

        <div
          className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-700 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `
              radial-gradient(
                circle 430px at ${mousePosition.x}% ${mousePosition.y}%,
                rgba(178,139,82,0.10),
                rgba(215,183,120,0.06) 38%,
                transparent 74%
              )
            `,
          }}
        />

        {/* ===================================================
            AMBIENT GLOW
        =================================================== */}

        <div
          className="pointer-events-none absolute -left-48 -top-36 h-[32rem] w-[32rem] rounded-full bg-[#B28B52]/10 blur-3xl"
          style={{
            animation: "collectionPulse 9s ease-in-out infinite",
          }}
        />

        <div
          className="pointer-events-none absolute -right-48 top-[42%] h-[30rem] w-[30rem] rounded-full bg-[#D7B778]/10 blur-3xl"
          style={{
            animation: "collectionPulse 10s ease-in-out infinite reverse",
          }}
        />

        {/* ===================================================
            HERO
        =================================================== */}

        <section className="relative z-10 mt-[112px] overflow-hidden bg-[#211A17] px-5 py-16 text-center sm:mt-[116px] sm:px-6 sm:py-20 md:mt-[120px] md:py-24 lg:py-28">
          {/* Decorative Ring */}

          <div
            className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border border-[#B28B52]/25"
            style={{
              animation: "collectionRotate 30s linear infinite",
            }}
          />

          <div
            className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full border border-[#D7B778]/15"
            style={{
              animation: "collectionRotate 34s linear infinite reverse",
            }}
          />

          {/* Small Glow */}

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B28B52]/10 blur-3xl" />

          <ScrollReveal>
            <div className="relative mx-auto max-w-3xl">
              {/* Icon */}

              <div
                className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#B28B52]/40 bg-white/5 shadow-sm backdrop-blur-md"
                style={{
                  animation: "collectionFloat 5s ease-in-out infinite",
                }}
              >
                <Layers3
                  size={20}
                  strokeWidth={1.3}
                  className="text-[#D7B778]"
                />
              </div>

              {/* Label */}

              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#D7B778] sm:text-xs">
                YAMA FLYS
              </p>

              {/* Heading */}

              <h1 className="mt-4 font-serif text-4xl leading-tight text-[#F4EDE5] sm:text-5xl md:text-6xl">
                Bangle Collections
              </h1>

              {/* Gold Line */}

              <div
                className="mx-auto mt-5 h-[2px] bg-[#B28B52]"
                style={{
                  animation: "collectionLine 1.1s ease-out forwards",
                }}
              />

              {/* Description */}

              <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#D8CCC0] md:text-base md:leading-8">
                Explore elegant collections created to complement your everyday
                style, celebrations, and special moments.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ===================================================
            COLLECTION INTRO
        =================================================== */}

        <section className="relative z-10 px-5 py-14 sm:px-6 md:px-10 md:py-20 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="mb-10 text-center sm:mb-14">
                {/* Icon */}

                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#B28B52]/25 bg-[#FAF7F2] shadow-sm">
                  <Layers3
                    size={18}
                    strokeWidth={1.4}
                    className="text-[#B28B52]"
                  />
                </div>

                {/* Label */}

                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#9A7656] sm:text-xs">
                  Explore Our Collections
                </p>

                {/* Heading */}

                <h2 className="mt-3 font-serif text-3xl text-[#211A17] sm:text-4xl md:text-5xl">
                  Discover Your Style
                </h2>

                {/* Description */}

                <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6E6259]">
                  Browse our current collections and discover designs for
                  different styles and occasions.
                </p>
              </div>
            </ScrollReveal>

            {/* =================================================
                COLLECTION GRID
            ================================================= */}

            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection, index) => (
                <ScrollReveal key={collection.id} delay={(index % 3) * 100}>
                  <article
                    id={collection.name.toLowerCase().replace(/\s+/g, "-")}
                    className="group/card scroll-mt-[150px] relative overflow-hidden rounded-[1.75rem] border border-[#E4D9CE] bg-[#FAF7F2] shadow-[0_18px_50px_rgba(55,40,30,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(55,40,30,0.16)]"
                  >
                    {/* =================================================
                        IMAGE
                    ================================================= */}

                    <div className="relative h-80 overflow-hidden sm:h-[22rem]">
                      <img
                        src={collection.image}
                        alt={collection.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover/card:scale-110"
                        style={{
                          animation: "collectionImageReveal 0.8s ease-out both",
                        }}
                      />

                      {/* Dark Overlay */}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#211A17]/90 via-[#211A17]/25 to-transparent" />

                      {/* Warm Overlay */}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#B28B52]/10 via-transparent to-[#211A17]/20" />

                      {/* Gold Light */}

                      <div className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-[#B28B52]/20 blur-3xl opacity-0 transition-opacity duration-700 group-hover/card:opacity-100" />

                      {/* Inner Border */}

                      <div className="pointer-events-none absolute inset-3 rounded-[1.25rem] border border-white/25 transition-all duration-500 group-hover/card:inset-4 group-hover/card:border-[#D7B778]/70" />

                      {/* Top Ring */}

                      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full border border-[#B28B52]/35 transition-transform duration-700 group-hover/card:scale-125" />

                      {/* Number */}

                      <div className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/20 text-xs font-medium text-white backdrop-blur-md">
                        {String(collection.id).padStart(2, "0")}
                      </div>

                      {/* Label */}

                      <div className="absolute right-6 top-6 rounded-full border border-[#D7B778]/40 bg-[#211A17]/60 px-3 py-2 text-[8px] font-medium uppercase tracking-[0.2em] text-[#F4EDE5] backdrop-blur-md">
                        Collection
                      </div>

                      {/* Bottom Content */}

                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="mb-3 flex items-center gap-2">
                          <span className="h-[2px] w-7 bg-[#D7B778]" />

                          <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/85">
                            YAMA FLYS
                          </span>
                        </div>

                        <h3 className="pr-10 font-serif text-2xl text-white sm:text-3xl">
                          {collection.name}
                        </h3>
                      </div>

                      {/* Hover Arrow */}

                      <div className="absolute bottom-6 right-6 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100">
                        <ArrowUpRight size={18} strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* =================================================
                        CONTENT
                    ================================================= */}

                    <div className="p-6 text-center">
                      {/* Brand */}

                      <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#9A7656]">
                        YAMA FLYS
                      </p>

                      {/* Title */}

                      <h3 className="mt-2 font-serif text-2xl leading-tight text-[#211A17]">
                        {collection.name}
                      </h3>

                      {/* Description */}

                      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#756B63]">
                        {collection.description}
                      </p>

                      {/* Gold Line */}

                      <div className="mx-auto mt-5 h-[2px] w-8 bg-[#B28B52] transition-all duration-500 group-hover/card:w-14" />

                      {/* Link */}

                      <Link
                        to={`/shop?collection=${encodeURIComponent(
                          collection.name,
                        )}`}
                        className="group/link mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#8B6A47] transition-colors duration-300 hover:text-[#B28B52]"
                      >
                        View Collection
                        <ArrowRight
                          size={14}
                          strokeWidth={1.5}
                          className="transition-transform duration-300 group-hover/link:translate-x-1"
                        />
                      </Link>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================
            COLLECTION COVER NOTE
        =================================================== */}

        <section className="relative z-10 px-5 pb-16 sm:px-6 md:px-10 lg:px-16">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl rounded-[1.5rem] border border-[#E2D6CA] bg-[#FAF7F2] px-6 py-6 text-center shadow-[0_15px_40px_rgba(55,40,30,0.05)]">
              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#9A7656]">
                Collection Covers
              </p>

              <p className="mx-auto mt-2 max-w-2xl text-xs leading-5 text-[#756B63]">
                These images are temporary collection cover placeholders using
                the current sample product images. Dedicated collection images
                can be managed later through the admin panel.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ===================================================
            CTA
        =================================================== */}

        <section className="relative z-10 overflow-hidden bg-[#211A17] px-5 py-20 text-center sm:px-6 md:py-24">
          {/* Left Glow */}

          <div
            className="pointer-events-none absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#B28B52]/10 blur-3xl"
            style={{
              animation: "collectionPulse 8s ease-in-out infinite",
            }}
          />

          {/* Right Glow */}

          <div
            className="pointer-events-none absolute -right-32 bottom-[-5rem] h-72 w-72 rounded-full bg-[#D7B778]/10 blur-3xl"
            style={{
              animation: "collectionPulse 9s ease-in-out infinite reverse",
            }}
          />

          {/* Ring */}

          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#B28B52]/20"
            style={{
              animation: "collectionRotate 28s linear infinite",
            }}
          />

          <ScrollReveal>
            <div className="relative mx-auto max-w-3xl">
              {/* Icon */}

              <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#B28B52]/30 bg-white/5">
                <Sparkles
                  size={19}
                  strokeWidth={1.3}
                  className="text-[#D7B778]"
                />
              </div>

              {/* Label */}

              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#D7B778] sm:text-xs">
                YAMA FLYS
              </p>

              {/* Heading */}

              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#F4EDE5] sm:text-5xl">
                Find Your Perfect
                <span className="block italic text-[#D7B778]">Bangle</span>
              </h2>

              {/* Description */}

              <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#D3C7BB] md:text-base">
                Explore all available bangles and discover designs made for your
                style and occasion.
              </p>

              {/* CTA */}

              <Link
                to="/shop"
                className="group/button relative mt-9 inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#B28B52] px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#211A17] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#D7B778] hover:shadow-2xl"
              >
                {/* Shimmer */}

                <span
                  className="absolute inset-y-0 left-0 w-1/3 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  style={{
                    animation: "collectionShimmer 3.5s ease-in-out infinite",
                  }}
                />

                <span className="relative z-10">Shop All Bangles</span>

                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="relative z-10 transition-transform duration-300 group-hover/button:translate-x-1"
                />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </main>
    </>
  );
};

export default Collections;

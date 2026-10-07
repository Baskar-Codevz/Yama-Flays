import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  MapPin,
  Gem,
  Heart,
  Crown,
  MoveUpRight,
} from "lucide-react";

import ScrollReveal from "../components/ScrollReveal";

const About = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 50,
    y: 50,
  });

  const [isHovering, setIsHovering] = useState(false);

  /* =========================================================
     MOUSE EFFECT
  ========================================================= */

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
      y: 50,
    });
  };

  return (
    <>
      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes aboutRevealUp {
          from {
            opacity: 0;
            transform: translateY(45px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes aboutRevealLeft {
          from {
            opacity: 0;
            transform: translateX(-55px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes aboutRevealRight {
          from {
            opacity: 0;
            transform: translateX(55px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes aboutFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes aboutRotate {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes aboutRotateReverse {
          from {
            transform: rotate(360deg);
          }

          to {
            transform: rotate(0deg);
          }
        }

        @keyframes aboutPulse {
          0%,
          100% {
            opacity: 0.12;
            transform: scale(1);
          }

          50% {
            opacity: 0.28;
            transform: scale(1.12);
          }
        }

        @keyframes aboutShimmer {
          0% {
            transform: translateX(-150%);
          }

          100% {
            transform: translateX(150%);
          }
        }

        @keyframes aboutGoldLine {
          from {
            width: 0;
            opacity: 0;
          }

          to {
            width: 75px;
            opacity: 1;
          }
        }

        @keyframes aboutScroll {
          0% {
            transform: translateY(-4px);
            opacity: 0.4;
          }

          50% {
            transform: translateY(4px);
            opacity: 1;
          }

          100% {
            transform: translateY(-4px);
            opacity: 0.4;
          }
        }

        @keyframes aboutSoftGlow {
          0%,
          100% {
            opacity: 0.25;
          }

          50% {
            opacity: 0.65;
          }
        }
      `}</style>

      <main
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-screen overflow-hidden bg-[#F7F3F8] text-[#171217]"
      >
        {/* =====================================================
            GLOBAL CURSOR LIGHT
        ===================================================== */}

        <div
          className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-700 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `
              radial-gradient(
                circle 460px at ${mousePosition.x}% ${mousePosition.y}%,
                rgba(210,176,76,0.10),
                rgba(104,65,116,0.11) 35%,
                transparent 72%
              )
            `,
          }}
        />

        {/* =====================================================
            AMBIENT LIGHT
        ===================================================== */}

        <div
          className="pointer-events-none absolute -left-56 top-[8%] h-[34rem] w-[34rem] rounded-full bg-[#6E4A78]/10 blur-3xl"
          style={{
            animation: "aboutPulse 11s ease-in-out infinite",
          }}
        />

        <div
          className="pointer-events-none absolute -right-52 top-[45%] h-[32rem] w-[32rem] rounded-full bg-[#C9A227]/8 blur-3xl"
          style={{
            animation: "aboutPulse 13s ease-in-out infinite reverse",
          }}
        />

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative z-10 overflow-hidden bg-[#34203E] px-5 py-12 sm:px-6 md:px-10 md:py-16 lg:px-16 lg:py-20">
          {/* Glow */}

          <div
            className="pointer-events-none absolute -left-20 top-20 h-80 w-80 rounded-full bg-[#9E74AB]/15 blur-3xl"
            style={{
              animation: "aboutPulse 9s ease-in-out infinite",
            }}
          />

          <div
            className="pointer-events-none absolute -right-20 bottom-[-5rem] h-96 w-96 rounded-full bg-[#C9A227]/10 blur-3xl"
            style={{
              animation: "aboutPulse 10s ease-in-out infinite reverse",
            }}
          />

          {/* Rings */}

          <div
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border border-[#D8BD65]/20 md:h-[34rem] md:w-[34rem]"
            style={{
              animation: "aboutRotate 32s linear infinite",
            }}
          />

          <div
            className="pointer-events-none absolute -right-6 top-16 h-72 w-72 rounded-full border border-white/8"
            style={{
              animation: "aboutRotateReverse 24s linear infinite",
            }}
          />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
              {/* HERO CONTENT */}

              <div
                className="order-2 lg:order-1"
                style={{
                  animation:
                    "aboutRevealLeft 1s cubic-bezier(.22,1,.36,1) forwards",
                }}
              >
                <div className="mb-7 flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8BD65]/35 bg-white/5 backdrop-blur-md">
                    <Sparkles
                      size={18}
                      strokeWidth={1.3}
                      className="text-[#D8BD65]"
                    />
                  </div>

                  <div>
                    <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-[#D8BD65] sm:text-[10px]">
                      About YAMA FLYS
                    </p>

                    <div className="mt-2 h-px w-9 bg-[#D8BD65]" />
                  </div>
                </div>

                <h1 className="max-w-3xl font-serif text-5xl leading-[1.04] text-[#FCF9F3] sm:text-6xl md:text-7xl lg:text-[5.2rem]">
                  Elegance
                  <span className="block italic text-[#D8BD65]">
                    in Every Detail
                  </span>
                </h1>

                <div
                  className="mt-8 h-[2px] bg-[#D8BD65]"
                  style={{
                    animation: "aboutGoldLine 1.2s ease-out 0.4s both",
                  }}
                />

                <p className="mt-8 max-w-xl text-sm leading-8 text-[#D7CDD9] md:text-base">
                  Discover YAMA FLYS, a bangle-focused brand based in Tamil
                  Nadu, created around beautiful designs for everyday style,
                  celebrations, and special occasions.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link
                    to="/shop"
                    className="group/hero relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#D0AF4B] px-7 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-[#241B21] shadow-[0_14px_35px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#DFC25B] hover:shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
                  >
                    <span
                      className="absolute inset-y-0 left-0 w-1/3 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/45 to-transparent"
                      style={{
                        animation: "aboutShimmer 3.8s ease-in-out infinite",
                      }}
                    />

                    <span className="relative z-10">Explore Bangles</span>

                    <ArrowRight
                      size={16}
                      strokeWidth={1.4}
                      className="relative z-10 transition-transform duration-300 group-hover/hero:translate-x-1"
                    />
                  </Link>

                  <Link
                    to="/collections"
                    className="group/collections inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#D8BD65]/60 hover:text-[#D8BD65]"
                  >
                    Collections
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.4}
                      className="transition-transform duration-300 group-hover/collections:-translate-y-1 group-hover/collections:translate-x-1"
                    />
                  </Link>
                </div>
              </div>

              {/* HERO IMAGE */}

              <div
                className="order-1 lg:order-2"
                style={{
                  animation:
                    "aboutRevealRight 1.1s cubic-bezier(.22,1,.36,1) 0.15s both",
                }}
              >
                <div className="relative mx-auto max-w-lg">
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border border-[#D8BD65]/25"
                    style={{
                      animation: "aboutRotate 15s linear infinite",
                    }}
                  />

                  <div
                    className="pointer-events-none absolute -left-7 bottom-8 h-20 w-20 rounded-full border border-white/10"
                    style={{
                      animation: "aboutRotateReverse 18s linear infinite",
                    }}
                  />

                  <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#211329] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.30)]">
                    <div className="relative overflow-hidden rounded-[1.5rem]">
                      <img
                        src="/assets/img-1.webp"
                        alt="YAMA FLYS bangle collection"
                        className="aspect-[4/5] w-full object-cover transition-transform duration-[1600ms] ease-out hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#1E1026]/75 via-transparent to-[#5A3B66]/10" />

                      <div className="pointer-events-none absolute inset-4 rounded-[1.2rem] border border-white/30" />

                      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.25em] text-[#D8BD65]">
                            YAMA FLYS
                          </p>

                          <p className="mt-2 font-serif text-2xl text-white">
                            Beautiful Details
                          </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md">
                          <Gem
                            size={18}
                            strokeWidth={1.2}
                            className="text-[#D8BD65]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-[#D8BD65]/30 bg-[#F7F0F9] px-5 py-4 shadow-[0_20px_45px_rgba(0,0,0,0.18)] md:block"
                    style={{
                      animation: "aboutFloat 6s ease-in-out infinite",
                    }}
                  >
                    <p className="text-[8px] font-medium uppercase tracking-[0.22em] text-[#6B5272]">
                      Registered
                    </p>

                    <p className="mt-1 font-serif text-2xl text-[#34203E]">
                      2025
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="mx-auto mt-14 hidden w-fit items-center gap-3 text-[9px] uppercase tracking-[0.28em] text-white/40 md:flex"
              style={{
                animation: "aboutRevealUp 1s ease-out 0.9s both",
              }}
            >
              <span className="h-8 w-px bg-[#D8BD65]/50" />
              Discover our story
              <span
                style={{
                  animation: "aboutScroll 2s ease-in-out infinite",
                }}
              >
                ↓
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================
            BRAND STORY
            LEFT CONTENT / RIGHT FULL IMAGE
        ===================================================== */}

        <section className="relative z-10 overflow-hidden bg-[#FBF9FC] px-5 py-20 sm:px-6 md:px-10 md:py-28 lg:px-16">
          {/* Soft Background Glow */}

          <div
            className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-[#6E4A78]/6 blur-3xl"
            style={{
              animation: "aboutSoftGlow 8s ease-in-out infinite",
            }}
          />

          <div
            className="pointer-events-none absolute -right-28 bottom-10 h-72 w-72 rounded-full bg-[#C9A227]/5 blur-3xl"
            style={{
              animation: "aboutSoftGlow 10s ease-in-out infinite reverse",
            }}
          />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-[1.18fr_0.82fr] lg:gap-20">
              {/* =================================================
                  LEFT CONTENT
              ================================================= */}

              <ScrollReveal>
                <div className="lg:pr-6">
                  {/* Label */}

                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#856617] sm:text-xs">
                    Our Brand
                  </p>

                  {/* Heading */}

                  <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-[#221A24] sm:text-5xl md:text-6xl">
                    The Art of
                    <span className="block italic text-[#6E4A78]">
                      Beautiful Details
                    </span>
                  </h2>

                  {/* Gold Line */}

                  <div className="mt-7 h-[2px] w-14 bg-[#C9A227]" />

                  {/* Description */}

                  <p className="mt-8 max-w-2xl text-sm leading-8 text-[#69616D] md:text-base">
                    YAMA FLYS is a bangle-focused brand offering a variety of
                    designs for different styles and occasions. The collection
                    brings together pieces suited to everyday wear,
                    celebrations, and special moments.
                  </p>

                  <p className="mt-5 max-w-2xl text-sm leading-8 text-[#69616D] md:text-base">
                    The idea is simple: make it easier to discover bangles that
                    complement personal style and add an elegant finishing
                    detail to any look.
                  </p>

                  {/* Highlight Cards */}

                  <div className="mt-9 grid gap-4 sm:grid-cols-2">
                    {/* Beautiful Designs */}

                    <div className="group/highlight rounded-2xl border border-[#E3D8E7] bg-white p-5 shadow-[0_12px_35px_rgba(71,48,79,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A227]/40 hover:shadow-[0_18px_40px_rgba(71,48,79,0.09)]">
                      <Sparkles
                        size={19}
                        strokeWidth={1.3}
                        className="text-[#C9A227] transition-transform duration-500 group-hover/highlight:rotate-12"
                      />

                      <p className="mt-4 font-serif text-xl text-[#34203E]">
                        Beautiful Designs
                      </p>

                      <p className="mt-2 text-xs leading-6 text-[#7D747F]">
                        Explore different designs created for different looks
                        and occasions.
                      </p>
                    </div>

                    {/* Personal Style */}

                    <div className="group/highlight rounded-2xl border border-[#E3D8E7] bg-white p-5 shadow-[0_12px_35px_rgba(71,48,79,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A227]/40 hover:shadow-[0_18px_40px_rgba(71,48,79,0.09)]">
                      <Heart
                        size={19}
                        strokeWidth={1.3}
                        className="text-[#C9A227] transition-transform duration-500 group-hover/highlight:scale-110"
                      />

                      <p className="mt-4 font-serif text-xl text-[#34203E]">
                        Personal Style
                      </p>

                      <p className="mt-2 text-xs leading-6 text-[#7D747F]">
                        Find a design that feels right for your individual
                        style.
                      </p>
                    </div>
                  </div>

                  {/* Link */}

                  <Link
                    to="/collections"
                    className="group/storycta mt-8 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#6E4A78] transition-colors duration-300 hover:text-[#C9A227]"
                  >
                    Discover Collections
                    <ArrowRight
                      size={15}
                      strokeWidth={1.4}
                      className="transition-transform duration-300 group-hover/storycta:translate-x-1"
                    />
                  </Link>
                </div>
              </ScrollReveal>

              {/* =================================================
                  RIGHT IMAGE
              ================================================= */}

              <ScrollReveal delay={140}>
                <div className="relative mx-auto w-full max-w-[520px] lg:ml-auto">
                  {/* Top Left Gold Corner */}

                  <div className="pointer-events-none absolute -left-3 -top-3 z-10 h-20 w-20 rounded-tl-[2rem] border-l border-t border-[#C9A227]/55" />

                  {/* Bottom Right Gold Corner */}

                  <div className="pointer-events-none absolute -bottom-3 -right-3 z-10 h-20 w-20 rounded-br-[2rem] border-b border-r border-[#C9A227]/55" />

                  {/* Ambient Image Glow */}

                  <div
                    className="pointer-events-none absolute -right-8 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-[#C9A227]/10 blur-3xl"
                    style={{
                      animation: "aboutSoftGlow 7s ease-in-out infinite",
                    }}
                  />

                  {/* Image Frame */}

                  <div className="relative rounded-[2rem] bg-[#EAE1EE] p-3 shadow-[0_25px_65px_rgba(71,48,79,0.13)]">
                    {/* Full Image Container */}

                    <div className="group/story relative overflow-hidden rounded-[1.5rem] bg-[#F1EAF4]">
                      <img
                        src="/assets/Brand-img.jpeg"
                        alt="YAMA FLYS"
                        className="block h-auto w-full object-contain transition-transform duration-[1400ms] ease-out group-hover/story:scale-[1.02]"
                      />

                      {/* Very Light Overlay */}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#34203E]/35 via-transparent to-transparent" />

                      {/* Inner Frame */}

                      <div className="pointer-events-none absolute inset-4 rounded-[1.2rem] border border-white/45" />

                      {/* Bottom Label */}

                      <div className="absolute bottom-6 left-6">
                        <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#E1C75F]">
                          YAMA FLYS
                        </p>

                        <p className="mt-1 font-serif text-2xl text-white">
                          Our Story
                        </p>
                      </div>

                      {/* Top Floating Icon */}

                      <div
                        className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-[#34203E]/20 backdrop-blur-md"
                        style={{
                          animation: "aboutFloat 5s ease-in-out infinite",
                        }}
                      >
                        <Gem
                          size={18}
                          strokeWidth={1.2}
                          className="text-[#D8BD65]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* =====================================================
            VALUES
        ===================================================== */}

        <section className="relative z-10 overflow-hidden bg-[#EEE5F2] px-5 py-20 sm:px-6 md:px-10 md:py-28 lg:px-16">
          <div
            className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#6E4A78]/10 blur-3xl"
            style={{
              animation: "aboutPulse 9s ease-in-out infinite",
            }}
          />

          <div
            className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#C9A227]/8 blur-3xl"
            style={{
              animation: "aboutPulse 11s ease-in-out infinite reverse",
            }}
          />

          <div className="relative mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="mx-auto mb-14 max-w-3xl text-center">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A227]/35 bg-white/70">
                  <Crown
                    size={20}
                    strokeWidth={1.3}
                    className="text-[#C9A227]"
                  />
                </div>

                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#856617] sm:text-xs">
                  What We Stand For
                </p>

                <h2 className="mt-4 font-serif text-4xl leading-tight text-[#231A25] sm:text-5xl">
                  Made Around
                  <span className="block italic text-[#6E4A78]">
                    Your Style
                  </span>
                </h2>

                <div className="mx-auto mt-6 h-[2px] w-14 bg-[#C9A227]" />
              </div>
            </ScrollReveal>

            <div className="grid gap-6 md:grid-cols-3">
              {/* CARD 01 */}

              <ScrollReveal>
                <article className="group/value relative overflow-hidden rounded-[1.75rem] border border-white bg-white p-8 shadow-[0_18px_50px_rgba(71,48,79,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A227]/35 hover:shadow-[0_28px_60px_rgba(71,48,79,0.14)]">
                  <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#6E4A78]/6 blur-2xl transition-transform duration-700 group-hover/value:scale-150" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-5xl text-[#6E4A78]/20">
                        01
                      </span>

                      <Sparkles
                        size={23}
                        strokeWidth={1.2}
                        className="text-[#C9A227] transition-transform duration-500 group-hover/value:rotate-12 group-hover/value:scale-110"
                      />
                    </div>

                    <h3 className="mt-8 font-serif text-2xl text-[#34203E]">
                      Everyday Elegance
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[#746A78]">
                      Discover designs that can complement your everyday style
                      with an elegant finishing touch.
                    </p>

                    <div className="mt-7 h-[2px] w-8 bg-[#C9A227] transition-all duration-500 group-hover/value:w-14" />
                  </div>
                </article>
              </ScrollReveal>

              {/* CARD 02 */}

              <ScrollReveal delay={120}>
                <article className="group/value relative overflow-hidden rounded-[1.75rem] border border-white bg-white p-8 shadow-[0_18px_50px_rgba(71,48,79,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A227]/35 hover:shadow-[0_28px_60px_rgba(71,48,79,0.14)]">
                  <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#C9A227]/6 blur-2xl transition-transform duration-700 group-hover/value:scale-150" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-5xl text-[#6E4A78]/20">
                        02
                      </span>

                      <Gem
                        size={23}
                        strokeWidth={1.2}
                        className="text-[#C9A227] transition-transform duration-500 group-hover/value:rotate-12 group-hover/value:scale-110"
                      />
                    </div>

                    <h3 className="mt-8 font-serif text-2xl text-[#34203E]">
                      Special Moments
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[#746A78]">
                      Explore statement designs for celebrations and memorable
                      occasions.
                    </p>

                    <div className="mt-7 h-[2px] w-8 bg-[#C9A227] transition-all duration-500 group-hover/value:w-14" />
                  </div>
                </article>
              </ScrollReveal>

              {/* CARD 03 */}

              <ScrollReveal delay={240}>
                <article className="group/value relative overflow-hidden rounded-[1.75rem] border border-white bg-white p-8 shadow-[0_18px_50px_rgba(71,48,79,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A227]/35 hover:shadow-[0_28px_60px_rgba(71,48,79,0.14)]">
                  <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#6E4A78]/6 blur-2xl transition-transform duration-700 group-hover/value:scale-150" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-5xl text-[#6E4A78]/20">
                        03
                      </span>

                      <Heart
                        size={23}
                        strokeWidth={1.2}
                        className="text-[#C9A227] transition-transform duration-500 group-hover/value:scale-110"
                      />
                    </div>

                    <h3 className="mt-8 font-serif text-2xl text-[#34203E]">
                      Personal Expression
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[#746A78]">
                      Find designs that match your individual taste,
                      personality, and occasion.
                    </p>

                    <div className="mt-7 h-[2px] w-8 bg-[#C9A227] transition-all duration-500 group-hover/value:w-14" />
                  </div>
                </article>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* =====================================================
            BUSINESS DETAILS
        ===================================================== */}

        <section className="relative z-10 overflow-hidden bg-white px-5 py-20 sm:px-6 md:px-10 md:py-28 lg:px-16">
          <div className="relative mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              {/* LEFT */}

              <ScrollReveal>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#856617] sm:text-xs">
                    Business Details
                  </p>

                  <h2 className="mt-4 font-serif text-4xl leading-tight text-[#231A25] sm:text-5xl">
                    YAMA FLYS
                    <span className="mt-2 block italic text-[#6E4A78]">
                      Tamil Nadu
                    </span>
                  </h2>

                  <div className="mt-6 h-[2px] w-14 bg-[#C9A227]" />

                  <p className="mt-7 max-w-lg text-sm leading-7 text-[#716774] md:text-base">
                    YAMA FLYS is a proprietorship business registered in Tamil
                    Nadu and focused on bangle products and collections.
                  </p>
                </div>
              </ScrollReveal>

              {/* RIGHT */}

              <ScrollReveal delay={130}>
                <div className="relative overflow-hidden rounded-[2rem] border border-[#E1D6E5] bg-[#F7F2F9] p-7 shadow-[0_20px_55px_rgba(71,48,79,0.08)] sm:p-9">
                  <div
                    className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full border border-[#C9A227]/20"
                    style={{
                      animation: "aboutRotate 22s linear infinite",
                    }}
                  />

                  <div className="relative space-y-6">
                    {/* Location */}

                    <div className="flex items-start gap-4 border-b border-[#DED2E2] pb-6">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D9C5DF] bg-white text-[#6E4A78]">
                        <MapPin size={18} strokeWidth={1.3} />
                      </div>

                      <div>
                        <p className="text-[9px] uppercase tracking-[0.22em] text-[#917E99]">
                          Location
                        </p>

                        <p className="mt-2 text-sm font-medium leading-6 text-[#302631]">
                          Thirunavallur, Maranodai
                          <br />
                          Kallakurichi, Tamil Nadu
                          <br />
                          607204
                        </p>
                      </div>
                    </div>

                    {/* Business Type */}

                    <div className="flex items-start gap-4 border-b border-[#DED2E2] pb-6">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D9C5DF] bg-white text-[#6E4A78]">
                        <Crown size={18} strokeWidth={1.3} />
                      </div>

                      <div>
                        <p className="text-[9px] uppercase tracking-[0.22em] text-[#917E99]">
                          Business Type
                        </p>

                        <p className="mt-2 text-sm font-medium text-[#302631]">
                          Proprietorship
                        </p>
                      </div>
                    </div>

                    {/* Registration */}

                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D9C5DF] bg-white text-[#6E4A78]">
                        <Gem size={18} strokeWidth={1.3} />
                      </div>

                      <div>
                        <p className="text-[9px] uppercase tracking-[0.22em] text-[#917E99]">
                          Registered
                        </p>

                        <p className="mt-2 text-sm font-medium text-[#302631]">
                          13 May 2025
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <section className="relative z-10 overflow-hidden bg-[#34203E] px-5 py-20 text-center sm:px-6 md:py-28">
          {/* Left Glow */}

          <div
            className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#8B6595]/15 blur-3xl"
            style={{
              animation: "aboutPulse 9s ease-in-out infinite",
            }}
          />

          {/* Right Glow */}

          <div
            className="pointer-events-none absolute -right-32 bottom-[-5rem] h-80 w-80 rounded-full bg-[#C9A227]/10 blur-3xl"
            style={{
              animation: "aboutPulse 10s ease-in-out infinite reverse",
            }}
          />

          {/* Rings */}

          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#D8BD65]/15"
            style={{
              animation: "aboutRotate 28s linear infinite",
            }}
          />

          <div
            className="pointer-events-none absolute -bottom-28 -left-28 h-64 w-64 rounded-full border border-white/8"
            style={{
              animation: "aboutRotateReverse 25s linear infinite",
            }}
          />

          <ScrollReveal>
            <div className="relative mx-auto max-w-3xl">
              {/* Icon */}

              <div
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#D8BD65]/35 bg-white/5 backdrop-blur-md"
                style={{
                  animation: "aboutFloat 5s ease-in-out infinite",
                }}
              >
                <Sparkles
                  size={22}
                  strokeWidth={1.2}
                  className="text-[#D8BD65]"
                />
              </div>

              {/* Label */}

              <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.32em] text-[#D8BD65] sm:text-xs">
                Discover YAMA FLYS
              </p>

              {/* Heading */}

              <h2 className="mt-5 font-serif text-4xl leading-tight text-[#FCF9F3] sm:text-5xl md:text-6xl">
                Find a Bangle
                <span className="block italic text-[#D8BD65]">
                  That Feels Like You
                </span>
              </h2>

              {/* Gold Line */}

              <div className="mx-auto mt-7 h-[2px] w-14 bg-[#D8BD65]" />

              {/* Description */}

              <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#D4C8D9] md:text-base md:leading-8">
                Explore the YAMA FLYS collections and discover designs created
                for different styles and special moments.
              </p>

              {/* Button */}

              <Link
                to="/shop"
                className="group/final relative mt-9 inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#D0AF4B] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#241B21] shadow-[0_16px_40px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#DFC25B] hover:shadow-[0_22px_50px_rgba(0,0,0,0.30)]"
              >
                <span
                  className="absolute inset-y-0 left-0 w-1/3 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  style={{
                    animation: "aboutShimmer 3.5s ease-in-out infinite",
                  }}
                />

                <span className="relative z-10">Shop Bangles</span>

                <MoveUpRight
                  size={16}
                  strokeWidth={1.4}
                  className="relative z-10 transition-transform duration-300 group-hover/final:-translate-y-0.5 group-hover/final:translate-x-0.5"
                />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </main>
    </>
  );
};

export default About;

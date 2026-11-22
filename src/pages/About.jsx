
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  MapPin,
  Gem,
  Heart,
  Crown,
  Leaf,
  ShieldCheck,
} from "lucide-react";

import ScrollReveal from "../components/ScrollReveal";

const theme = {
  forest: "#173D2B",
  dark: "#0B2419",
  green: "#52745B",
  sage: "#E8EEE4",
  gold: "#C9A66B",
  cream: "#F8F6F0",
  muted: "#69776B",
};

const values = [
  {
    number: "01",
    title: "Everyday Elegance",
    description:
      "Explore beautiful bangle designs that complement your everyday style.",
    icon: Leaf,
  },
  {
    number: "02",
    title: "Special Moments",
    description:
      "Discover statement styles for celebrations, weddings and memorable occasions.",
    icon: Gem,
  },
  {
    number: "03",
    title: "Personal Expression",
    description:
      "Find designs that reflect your individual taste, personality and style.",
    icon: Heart,
  },
];

const highlights = [
  {
    title: "Beautiful Designs",
    description:
      "Discover a variety of styles for everyday wear and special occasions.",
    icon: Sparkles,
  },
  {
    title: "Your Personal Style",
    description:
      "Choose pieces that complement your look and make every moment special.",
    icon: Heart,
  },
];

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9A7945]">
      <span className="h-px w-7 bg-[#C9A66B]" />
      {children}
    </div>
  );
}

function ValueCard({ item, index }) {
  const Icon = item.icon;

  return (
    <ScrollReveal delay={index * 100}>
      <article className="group relative h-full overflow-hidden rounded-2xl border border-[#DCE5D9] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A66B]/70 hover:shadow-[0_18px_40px_rgba(23,61,43,0.09)] sm:p-8">
        <div className="flex items-center justify-between">
          <span className="font-serif text-4xl text-[#DCE5D9]">
            {item.number}
          </span>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8EEE4] text-[#315B40] transition-colors group-hover:bg-[#173D2B] group-hover:text-white">
            <Icon size={20} strokeWidth={1.5} />
          </div>
        </div>

        <h3 className="mt-7 font-serif text-2xl text-[#173D2B]">
          {item.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-[#69776B]">
          {item.description}
        </p>

        <div className="mt-6 h-px w-10 bg-[#C9A66B] transition-all duration-300 group-hover:w-16" />
      </article>
    </ScrollReveal>
  );
}

export default function About() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F6F0] font-sans text-[#173D2B]">
{/* HERO */}

<section className="relative isolate overflow-hidden bg-[#F5F5F5] px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-36 lg:px-12 lg:pb-32">

  {/* Background decorations */}

  <div
    aria-hidden="true"
    className="pointer-events-none absolute -right-32 -top-20 -z-10 h-80 w-80 rounded-full bg-[#52745B]/15 blur-[100px] transition-all duration-700 sm:h-[32rem] sm:w-[32rem]"
  />

  <div
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-32 -left-20 -z-10 h-80 w-80 rounded-full bg-[#C9A66B]/20 blur-[100px]"
  />

  <div className="mx-auto max-w-7xl">

    <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

      {/* HERO CONTENT */}

      <ScrollReveal>
        <div className="max-w-2xl">

          {/* Eyebrow label */}

          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#173D2B]/15 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A66B]/70 hover:shadow-md">

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#173D2B] text-[#E5C98D]">
              <Sparkles size={14} />
            </span>

            <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#52745B] sm:text-[10px]">
              The YAMA FLYS Story
            </span>

          </div>

          {/* Heading */}

          <h1 className="font-serif text-5xl font-medium leading-[1.08] tracking-tight text-[#173D2B] sm:text-6xl md:text-7xl">

            Beauty that

            <span className="mt-2 block bg-gradient-to-r from-[#52745B] via-[#173D2B] to-[#78917A] bg-clip-text italic text-transparent">
              feels timeless.
            </span>

          </h1>

          {/* Decorative line */}

          <div className="mt-7 flex items-center gap-3">
            <span className="h-[2px] w-12 rounded-full bg-[#C9A66B]" />
            <span className="h-[2px] w-5 rounded-full bg-[#52745B]/40" />
            <span className="h-[2px] w-2 rounded-full bg-[#52745B]/20" />
          </div>

          {/* Description */}

          <p className="mt-7 max-w-xl text-sm leading-8 text-[#52665A] sm:text-base">
            Discover YAMA FLYS, where beautiful bangle designs meet
            everyday elegance. Find pieces for your special celebrations,
            meaningful moments, and the little joys of everyday life.
          </p>

          {/* Buttons */}

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">

            <Link
              to="/shop"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#173D2B] px-7 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#F5F5F5] shadow-[0_8px_25px_rgba(23,61,43,0.16)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#28543C] hover:shadow-[0_14px_30px_rgba(23,61,43,0.24)] active:scale-[0.97]"
            >
              Explore Bangles

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={16} />
              </span>
            </Link>

            <Link
              to="/collections"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#173D2B]/20 bg-white/60 px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#173D2B] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A66B] hover:bg-[#E8EDE7] active:scale-[0.97]"
            >
              Our Collections

              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight size={16} />
              </span>
            </Link>

          </div>

          {/* Bottom detail */}

          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">

            <div className="flex -space-x-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#F5F5F5] bg-[#DCE8D9] text-[#173D2B]">
                <Gem size={13} />
              </span>

              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#F5F5F5] bg-[#E8D8B7] text-[#173D2B]">
                <Sparkles size={13} />
              </span>

              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#F5F5F5] bg-[#173D2B] text-[#F5F5F5]">
                <ArrowRight size={13} />
              </span>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#173D2B]">
                Made for your moments
              </p>

              <p className="mt-1 text-xs text-[#718176]">
                A little elegance, every day.
              </p>
            </div>

          </div>

        </div>
      </ScrollReveal>

      {/* HERO IMAGE */}

      <ScrollReveal delay={150}>
        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">

          {/* Decorative background circle */}

          <div
            aria-hidden="true"
            className="absolute -right-5 top-10 h-28 w-28 rounded-full border border-[#C9A66B]/50 transition-transform duration-700 hover:scale-110 sm:-right-8 sm:h-36 sm:w-36"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-6 -left-5 h-32 w-32 rounded-full bg-[#52745B]/10 blur-2xl sm:-left-8 sm:h-40 sm:w-40"
          />

          {/* Image frame */}

          <div className="relative rounded-[2rem] border border-[#C9A66B]/50 bg-white/60 p-2 shadow-[0_25px_80px_rgba(23,61,43,0.12)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_90px_rgba(23,61,43,0.18)] sm:rounded-[2.5rem] sm:p-3">

            <div className="relative overflow-hidden rounded-[1.5rem] bg-[#E8EDE7] sm:rounded-[2rem]">

              <img
                src="/assets/client-image1.jpeg"
                alt="YAMA FLYS bangle collection"
                loading="eager"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />

              {/* Image overlay */}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B2419]/75 via-[#0B2419]/5 to-transparent" />

              {/* Inner frame */}

              <div className="pointer-events-none absolute inset-3 rounded-[1.2rem] border border-white/50 sm:inset-4 sm:rounded-[1.6rem]" />

              {/* Image caption */}

              <div className="absolute bottom-6 left-5 right-5 flex items-end justify-between gap-3 sm:bottom-8 sm:left-7 sm:right-7">

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#E8D4A6]">
                    YAMA FLYS
                  </p>

                  <p className="mt-2 font-serif text-2xl text-white sm:text-3xl">
                    Beautiful Details
                  </p>

                  <p className="mt-2 max-w-[230px] text-xs leading-5 text-white/80">
                    Little details that make every moment special.
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/15 text-[#E8D4A6] backdrop-blur-lg transition-all duration-300 hover:rotate-12 hover:scale-110 sm:h-14 sm:w-14">
                  <Gem size={22} strokeWidth={1.4} />
                </div>

              </div>

            </div>

          </div>

          {/* Floating collection badge */}

          <div className="absolute -left-3 top-8 flex items-center gap-3 rounded-2xl border border-[#173D2B]/10 bg-white/95 px-4 py-3 shadow-[0_12px_35px_rgba(23,61,43,0.12)] transition-transform duration-500 hover:-translate-y-1 sm:-left-8 sm:top-12">

            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8EDE7] text-[#173D2B]">
              <Sparkles size={17} />
            </span>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#718176]">
                Discover
              </p>

              <p className="mt-1 font-serif text-base text-[#173D2B]">
                Your next favourite
              </p>
            </div>

          </div>

          {/* Small gold accent */}

          <div className="absolute -bottom-5 right-8 h-10 w-10 rounded-full border border-[#C9A66B]/70 bg-[#F5F5F5] p-2 shadow-sm transition-transform duration-500 hover:rotate-45 sm:right-12">
            <div className="h-full w-full rounded-full bg-[#C9A66B]" />
          </div>

        </div>
      </ScrollReveal>

    </div>
  </div>
</section>

      {/* BRAND STORY */}

      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">

          <ScrollReveal>
            <div>
              <SectionLabel>Our Brand</SectionLabel>

              <h2 className="mt-5 font-serif text-4xl leading-tight text-[#173D2B] sm:text-5xl md:text-6xl">
                The art of
                <span className="mt-1 block italic text-[#52745B]">
                  beautiful details.
                </span>
              </h2>

              <div className="mt-6 h-px w-16 bg-[#C9A66B]" />

              <p className="mt-7 text-sm leading-8 text-[#69776B] sm:text-base">
                YAMA FLYS is a bangle-focused brand offering a variety
                of designs for different styles and occasions. Our
                collection brings together pieces suited to everyday
                wear, celebrations and special moments.
              </p>

              <p className="mt-4 text-sm leading-8 text-[#69776B] sm:text-base">
                Our aim is to make discovering beautiful bangles
                simple, enjoyable and inspiring, so you can find styles
                that complement your own personality.
              </p>

              <Link
                to="/collections"
                className="mt-7 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#315B40] transition-colors hover:text-[#9A7945]"
              >
                Discover Our Collections
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="group flex gap-4 rounded-2xl border border-[#DCE5D9] bg-white p-5 transition-all duration-300 hover:border-[#C9A66B]/60 hover:shadow-[0_15px_35px_rgba(23,61,43,0.07)] sm:p-6"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8EEE4] text-[#315B40] transition-colors group-hover:bg-[#173D2B] group-hover:text-white">
                      <Icon size={21} strokeWidth={1.5} />
                    </div>

                    <div>
                      <h3 className="font-serif text-xl text-[#173D2B] sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#69776B]">
                        {item.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* VALUES */}

      <section className="bg-[#E8EEE4] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A66B]/50 bg-white text-[#315B40]">
                <Crown size={21} strokeWidth={1.4} />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8D7040]">
                What We Stand For
              </p>

              <h2 className="mt-4 font-serif text-4xl text-[#173D2B] sm:text-5xl md:text-6xl">
                Made around
                <span className="mt-1 block italic text-[#52745B]">
                  your style.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#69776B] sm:text-base">
                Explore designs for your daily rituals, cherished
                celebrations and individual sense of style.
              </p>

              <div className="mx-auto mt-6 h-px w-14 bg-[#C9A66B]" />
            </div>
          </ScrollReveal>

          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            {values.map((item, index) => (
              <ValueCard key={item.number} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS DETAILS */}

      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">

          <ScrollReveal>
            <div>
              <SectionLabel>Business Details</SectionLabel>

              <h2 className="mt-5 font-serif text-4xl leading-tight text-[#173D2B] sm:text-5xl">
                YAMA FLYS
                <span className="mt-2 block italic text-[#52745B]">
                  Tamil Nadu
                </span>
              </h2>

              <div className="mt-6 h-px w-14 bg-[#C9A66B]" />

              <p className="mt-6 max-w-md text-sm leading-8 text-[#69776B] sm:text-base">
                YAMA FLYS is a proprietorship business registered in
                Tamil Nadu, focused on bangle products and collections.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="rounded-3xl border border-[#DCE5D9] bg-white p-6 shadow-[0_18px_50px_rgba(23,61,43,0.05)] sm:p-9">
              <div className="flex items-start gap-4 border-b border-[#E7EBE3] pb-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8EEE4] text-[#315B40]">
                  <MapPin size={19} />
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8D9B8B]">
                    Location
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#253D2D]">
                    Thirunavallur, Maranodai
                    <br />
                    Kallakurichi, Tamil Nadu
                    <br />
                    607204
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-[#E7EBE3] py-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8EEE4] text-[#315B40]">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8D9B8B]">
                    Business Type
                  </p>
                  <p className="mt-2 text-sm font-medium text-[#253D2D]">
                    Proprietorship
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8EEE4] text-[#315B40]">
                  <Gem size={19} />
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8D9B8B]">
                    Registered
                  </p>
                  <p className="mt-2 text-sm font-medium text-[#253D2D]">
                    13 May 2025
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="relative isolate overflow-hidden bg-[#0B2419] px-5 py-16 text-center sm:px-8 sm:py-24 lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-20 -z-10 h-72 w-72 rounded-full bg-[#52745B]/25 blur-[90px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-20 -z-10 h-80 w-80 rounded-full bg-[#C9A66B]/10 blur-[100px]"
        />

        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A66B]/40 bg-white/5 text-[#D9BD85]">
              <Sparkles size={22} strokeWidth={1.4} />
            </div>

            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D9BD85]">
              Discover YAMA FLYS
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight text-[#F8F6F0] sm:text-5xl md:text-6xl">
              Find a bangle
              <span className="mt-2 block italic text-[#D9BD85]">
                that feels like you.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#D5E0D5] sm:text-base sm:leading-8">
              Discover styles for everyday elegance and the special
              moments you want to remember.
            </p>

            <Link
              to="/shop"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#D9BD85] px-7 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#173D2B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              Shop Bangles
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}

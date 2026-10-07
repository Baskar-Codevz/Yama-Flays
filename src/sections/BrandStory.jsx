import React from "react";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const BrandStory = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#EEE6F2] px-6 py-20 sm:px-8 md:py-24 lg:px-12 xl:px-16"
    >
      {/* ===================================================== */}
      {/* BACKGROUND DECOR                                      */}
      {/* ===================================================== */}

      <div className="pointer-events-none absolute left-[-160px] top-[-140px] h-[420px] w-[420px] rounded-full bg-[#B99BC8]/[0.13] blur-3xl" />

      <div className="pointer-events-none absolute bottom-[-180px] right-[-140px] h-[460px] w-[460px] rounded-full bg-[#C9A227]/[0.07] blur-3xl" />

      <div className="pointer-events-none absolute right-[8%] top-[12%] hidden h-32 w-32 rounded-full border border-[#C9A227]/20 lg:block" />

      <div className="pointer-events-none absolute bottom-[12%] left-[5%] hidden h-20 w-20 rounded-full border border-[#76517F]/15 lg:block" />

      {/* ===================================================== */}
      {/* MAIN CONTAINER                                        */}
      {/* ===================================================== */}

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* ================================================= */}
          {/* IMAGE SIDE                                        */}
          {/* ================================================= */}

          <div className="relative">
            {/* Decorative frame */}

            <div className="pointer-events-none absolute -bottom-5 -left-5 hidden h-40 w-40 border border-[#C9A227]/25 md:block" />

            <div className="pointer-events-none absolute -right-5 -top-5 hidden h-40 w-40 border border-[#76517F]/15 md:block" />

            {/* Image wrapper */}

            <Link
              to="/about"
              aria-label="Discover more about YAMA FLYS"
              className="group/image relative block overflow-hidden border border-white/60 bg-[#F7F3F8] shadow-[0_28px_70px_rgba(52,32,62,0.14)]"
            >
              {/* Image */}

              <div className="relative">
                <img
                  src="/assets/girl-2.png"
                  alt="YAMA FLYS"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/img-1.webp";
                  }}
                  className="block h-auto w-full object-contain transition-transform duration-[1400ms] ease-out group-hover/image:scale-[1.025]"
                />

                {/* Soft overlay */}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171717]/25 via-transparent to-[#76517F]/5 opacity-70" />

                {/* Inner frame */}

                <div className="pointer-events-none absolute inset-5 border border-white/45 transition-all duration-700 group-hover/image:inset-4 group-hover/image:border-[#D9BE65]/65" />

                {/* Top label */}

                <div className="absolute left-7 top-7 flex items-center gap-3 bg-white/88 px-4 py-2.5 backdrop-blur-md">
                  <Sparkles
                    size={14}
                    strokeWidth={1.35}
                    className="text-[#A58218]"
                  />

                  <span className="text-[9px] font-medium uppercase tracking-[0.26em] text-[#171717]">
                    YAMA FLYS
                  </span>
                </div>

                {/* Image hover CTA */}

                <div className="absolute bottom-7 right-7 flex items-center gap-2 border border-white/50 bg-black/20 px-4 py-2.5 text-[9px] font-medium uppercase tracking-[0.2em] text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover/image:opacity-100">
                  <span>Discover More</span>

                  <ArrowUpRight size={14} strokeWidth={1.4} />
                </div>
              </div>
            </Link>

            {/* ================================================= */}
            {/* ESTABLISHED BADGE                                 */}
            {/* ================================================= */}

            <div className="absolute -bottom-7 right-5 z-10 flex h-28 w-28 items-center justify-center rounded-full border border-[#C9A227]/35 bg-white shadow-[0_18px_45px_rgba(52,32,62,0.16)] transition-transform duration-500 hover:scale-105 md:h-32 md:w-32">
              <div className="text-center">
                <p className="font-serif text-2xl text-[#76517F] md:text-3xl">
                  2025
                </p>

                <div className="mx-auto mt-2 h-[2px] w-8 bg-[#C9A227]" />

                <p className="mt-2 text-[8px] uppercase tracking-[0.2em] text-[#6B626E]">
                  Established
                </p>
              </div>
            </div>
          </div>

          {/* ================================================= */}
          {/* CONTENT SIDE                                       */}
          {/* ================================================= */}

          <div className="lg:pl-2">
            {/* Eyebrow */}

            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#C9A227]" />

              <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#8C6812]">
                About YAMA FLYS
              </p>
            </div>

            {/* Heading */}

            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-[1.06] text-[#171717] sm:text-5xl md:text-6xl">
              A style that feels
              <span className="block italic text-[#76517F]">
                uniquely yours.
              </span>
            </h2>

            {/* Gold line */}

            <div className="mt-6 h-[2px] w-14 bg-[#C9A227]" />

            {/* Description */}

            <p className="mt-7 max-w-xl text-sm leading-7 text-[#49424C] sm:text-base sm:leading-8">
              YAMA FLYS is a Tamil Nadu-based business offering a collection of
              bangles and accessories for everyday style and special occasions.
            </p>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#49424C] sm:text-base sm:leading-8">
              Explore the collection and discover pieces designed to add a
              graceful finishing touch to your look.
            </p>

            {/* ================================================= */}
            {/* BRAND DETAILS                                      */}
            {/* ================================================= */}

            <div className="mt-9 grid max-w-xl grid-cols-2 border-y border-[#D6C8DB]">
              {/* Established */}

              <div className="border-r border-[#D6C8DB] py-6 pr-5 sm:pr-8">
                <p className="font-serif text-3xl text-[#76517F]">2025</p>

                <div className="mt-2 h-[2px] w-7 bg-[#C9A227]" />

                <p className="mt-3 text-[9px] font-medium uppercase tracking-[0.22em] text-[#6D6470]">
                  Established
                </p>
              </div>

              {/* Location */}

              <div className="py-6 pl-5 sm:pl-8">
                <p className="font-serif text-2xl text-[#171717] sm:text-3xl">
                  Tamil Nadu
                </p>

                <div className="mt-2 h-[2px] w-7 bg-[#C9A227]" />

                <p className="mt-3 text-[9px] font-medium uppercase tracking-[0.22em] text-[#6D6470]">
                  Based In
                </p>
              </div>
            </div>

            {/* ================================================= */}
            {/* BUTTONS                                            */}
            {/* ================================================= */}

            <div className="mt-9 flex flex-wrap items-center gap-5">
              {/* About button */}

              <Link
                to="/about"
                className="group/about inline-flex items-center gap-3 bg-[#171717] px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-500 hover:-translate-y-1 hover:bg-[#2B222F] hover:shadow-[0_15px_30px_rgba(23,23,23,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-4"
              >
                <span>Our Story</span>

                <ArrowRight
                  size={16}
                  strokeWidth={1.4}
                  className="transition-transform duration-500 group-hover/about:translate-x-1.5"
                />
              </Link>

              {/* Collection link */}

              <Link
                to="/collections"
                className="group/collection inline-flex items-center gap-2 border-b border-[#C9A227] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#554A59] transition-all duration-500 hover:border-[#76517F] hover:text-[#76517F]"
              >
                <span>Explore Collections</span>

                <ArrowUpRight
                  size={14}
                  strokeWidth={1.4}
                  className="transition-transform duration-500 group-hover/collection:-translate-y-1 group-hover/collection:translate-x-1"
                />
              </Link>

              {/* Contact link */}

              <Link
                to="/contact"
                className="group/contact inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#8C6812] transition-colors duration-300 hover:text-[#76517F]"
              >
                <span>Contact Us</span>

                <ArrowUpRight
                  size={14}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-hover/contact:-translate-y-1 group-hover/contact:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* ===================================================== */}
        {/* BOTTOM BRAND LINE                                     */}
        {/* ===================================================== */}

        <div className="mt-16 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-[#D4C8D9] sm:w-20" />

          <span className="font-serif text-xs italic text-[#8D808F]">
            The finishing touch to every moment
          </span>

          <span className="h-px w-12 bg-[#D4C8D9] sm:w-20" />
        </div>
      </div>
    </section>
  );
};

export default BrandStory;

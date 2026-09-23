import React from "react";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-[#211b17] px-6 py-24 md:px-12 lg:px-20">
      {/* Decorative Circle */}
      <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full border border-[#c9a77d]/20" />

      <div className="absolute -bottom-40 -right-32 h-80 w-80 rounded-full border border-[#c9a77d]/20" />

      {/* Content */}
      <div className="relative mx-auto max-w-4xl text-center">
        {/* Small Label */}
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.4em] text-[#c9a77d]">
          YAMA FLAYS
        </p>

        {/* Heading */}
        <h2 className="font-serif text-4xl leading-tight text-[#faf8f4] md:text-5xl lg:text-6xl">
          Find Your Perfect
          <span className="block italic text-[#c9a77d]">Bangle</span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#d8cec4] md:text-base">
          Discover beautiful bangle designs from YAMA FLAYS and find the perfect
          piece to complement your style.
        </p>

        {/* Button */}
        <a
          href="#collection"
          className="group mt-9 inline-flex items-center gap-3 bg-[#c9a77d] px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#211b17] transition-all duration-300 hover:bg-[#faf8f4]"
        >
          Shop Collection
          <ArrowRight
            size={17}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>
    </section>
  );
};

export default CTA;

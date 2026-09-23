import React from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="min-h-screen w-full bg-cover bg-left bg-no-repeat transition-all duration-700"
      style={{ backgroundImage: "url('/assets/bg-image.png')" }}
    >
      <div className="min-h-screen flex items-center px-6 py-16 lg:px-16">
        {/* Hero Content */}
        <div className="max-w-xl animate-[fadeInUp_1s_ease-out]">
          <p className="mb-5 font-serif text-sm tracking-[0.25em] text-[#8B5E3C]">
            PREMIUM BANGLES COLLECTION
          </p>

          <h1 className="font-serif text-5xl leading-tight text-[#2c211b] md:text-6xl lg:text-7xl">
            Timeless
            <br />
            Elegance,
            <br />
            For Every
            <br />
            Occasion
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-[#6B4F3A] md:text-lg">
            Discover beautifully crafted bangles designed to make every moment
            special.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/shop"
              className="group flex items-center gap-3 bg-[#2c211b] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#8B5E3C] hover:shadow-lg"
            >
              SHOP BANGLES
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <a
              href="/collections"
              className="border border-[#8B5E3C] px-7 py-3.5 text-sm font-medium text-[#6B4F3A] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#8B5E3C] hover:text-white hover:shadow-lg"
            >
              EXPLORE COLLECTION
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

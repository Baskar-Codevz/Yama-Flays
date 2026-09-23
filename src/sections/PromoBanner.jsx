import React from "react";
import { ArrowRight } from "lucide-react";

const PromoBanner = () => {
  return (
    <section className="bg-[#2C211B] px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden">
        <div className="grid min-h-[500px] grid-cols-1 lg:grid-cols-2">
          {/* Left Content */}
          <div className="flex items-center px-6 py-16 sm:px-10 lg:px-16">
            <div className="max-w-xl">
              {/* Small Label */}
              <p className="mb-5 font-serif text-sm tracking-[0.3em] text-[#C9A77A]">
                SPECIAL OFFER
              </p>

              {/* Heading */}
              <h2 className="font-serif text-4xl leading-tight text-[#FDFBF7] sm:text-5xl lg:text-6xl">
                Elegance That
                <br />
                Makes Every
                <br />
                Moment Special
              </h2>

              {/* Description */}
              <p className="mt-6 max-w-lg text-base leading-7 text-[#D8C8BA] md:text-lg">
                Discover beautifully crafted bangles made to complement your
                style and celebrate every special occasion.
              </p>

              {/* Offer */}
              <div className="mt-7">
                <p className="text-sm uppercase tracking-[0.2em] text-[#C9A77A]">
                  UP TO
                </p>

                <p className="mt-1 font-serif text-4xl text-[#FDFBF7]">
                  20% OFF
                </p>
              </div>

              {/* Button */}
              <a
                href="/shop"
                className="group mt-8 inline-flex items-center gap-3 bg-[#FDFBF7] px-7 py-3.5 text-sm font-medium text-[#2C211B] transition-all duration-300 hover:bg-[#C9A77A]"
              >
                SHOP NOW
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              {/* Shipping Text */}
              <p className="mt-5 text-sm text-[#BDAEA1]">
                Free shipping on orders above ₹999
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative min-h-[400px] overflow-hidden lg:min-h-[500px]">
            <img
              src="/assets/img-7.webp"
              alt="Premium Bangle Collection"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;

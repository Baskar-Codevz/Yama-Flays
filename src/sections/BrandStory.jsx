import React from "react";

const BrandStory = () => {
  return (
    <section id="about" className="bg-[#faf8f4] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="relative">
          <div className="overflow-hidden rounded-[2rem]">
            <img
              src="/assets/Brand-img.jpeg"
              alt="YAMA FLYS Bangles"
              className="h-[600px] w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Year Badge */}
          <div className="absolute -bottom-6 right-6 flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-lg">
            <div className="text-center">
              <p className="font-serif text-2xl text-[#8b6b4f]">2025</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
                Established
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:pl-8">
          {/* Small Heading */}
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#9a7656]">
            About Us
          </p>

          {/* Main Heading */}
          <h2 className="font-serif text-4xl leading-tight text-[#211b17] md:text-5xl">
            Discover
            <span className="block italic text-[#9a7656]">YAMA FLAYS</span>
          </h2>

          {/* Description */}
          <p className="mt-6 text-base leading-8 text-gray-600">
            YAMA FLAYS is a Tamil Nadu-based business offering a collection of
            stylish bangles and accessories. Established in 2025, our brand
            brings together elegant designs for everyday style and special
            occasions.
          </p>

          <p className="mt-4 text-base leading-8 text-gray-600">
            Explore our collection and find pieces that add a beautiful
            finishing touch to your look.
          </p>

          {/* Business Information */}
          <div className="mt-8 grid grid-cols-2 gap-6 border-y border-[#ded6ce] py-6">
            <div>
              <p className="font-serif text-2xl text-[#211b17]">2025</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gray-500">
                Established
              </p>
            </div>

            <div>
              <p className="font-serif text-2xl text-[#211b17]">Tamil Nadu</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gray-500">
                Based In
              </p>
            </div>
          </div>

          {/* Button */}
          <a
            href="/Collections"
            className="group mt-8 inline-flex items-center gap-3 border-b border-[#211b17] pb-2 text-sm font-medium uppercase tracking-[0.18em] text-[#211b17] transition-all duration-300 hover:gap-5"
          >
            Explore Collection
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;

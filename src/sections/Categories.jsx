
import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Bridal Bangles",
    image: "/assets/img-1.webp",
  },
  {
    name: "Stone Bangles",
    image: "/assets/img-2.webp",
  },
  {
    name: "Gold Finish",
    image: "/assets/img-3.webp",
  },
  {
    name: "Traditional Bangles",
    image: "/assets/img-4.webp",
  },
  {
    name: "Daily Wear",
    image: "/assets/img-5.webp",
  },
  {
    name: "Designer Bangles",
    image: "/assets/img-6.webp",
  },
];

const Categories = () => {
  return (
    <section className="bg-[#FDFBF7] px-6 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-4 font-serif text-sm tracking-[0.3em] text-[#8B5E3C]">
            EXPLORE OUR COLLECTIONS
          </p>

          <h2 className="font-serif text-4xl text-[#2C211B] md:text-5xl">
            Shop by Collection
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#6B4F3A] md:text-base">
            Discover beautifully crafted bangles for every style, celebration,
            and special moment.
          </p>
        </div>

        {/* Collection Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              to="/shop"
              key={category.name}
              className="group relative overflow-hidden border border-transparent bg-white transition-all duration-500 hover:-translate-y-2 hover:border-[#D8C4B2] hover:shadow-[0_20px_45px_rgba(44,33,27,0.15)]"
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent transition-all duration-500 group-hover:from-black/85" />

              {/* Top Number */}
              <div className="absolute right-5 top-5">
                <span className="text-xs tracking-[0.2em] text-white/70">
                  0{index + 1}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-7 text-white">
                <h3 className="font-serif text-2xl transition-transform duration-500 group-hover:-translate-y-1 md:text-3xl">
                  {category.name}
                </h3>

                <div className="mt-3 flex translate-y-3 items-center gap-2 text-sm opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="tracking-wide">
                    Shop Collection
                  </span>

                  <ArrowRight
                    size={17}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  />
                </div>
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="group inline-flex items-center gap-3 border-b border-[#8B5E3C] pb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#2C211B] transition-colors duration-300 hover:text-[#8B5E3C]"
          >
            View All Bangles

            <ArrowRight
              size={16}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;


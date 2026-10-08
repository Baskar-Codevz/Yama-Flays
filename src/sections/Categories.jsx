import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "New Launch",
    image: "/assets/client-image1.jpeg",
    label: "Latest Styles",
  },
  {
    name: "Top Selling",
    image: "/assets/Top-sell.jpeg",
    label: "Customer Favourites",
  },
  {
    name: "Festival Collection",
    image: "/assets/client-image4.jpeg",
    label: "Festive Edit",
  },
  {
    name: "Wedding Collection",
    image: "/assets/festive.jpeg",
    label: "Bridal Edit",
  },
  {
    name: "Jewellery Collection",
    image: "/assets/client-image6.jpeg",
    label: "Statement Pieces",
  },
  {
    name: "Other Products",
    image: "/assets/client-image5.jpeg",
    label: "Explore More",
  },
];

const Categories = () => {
  return (
    <section className="relative overflow-hidden bg-[#F1EAF4] px-5 py-14 sm:px-8 sm:py-20 md:py-24 lg:px-12 xl:px-16">
      {/* BACKGROUND GLOWS */}

      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[300px] w-[300px] rounded-full bg-[#A95F76]/10 blur-3xl sm:h-[420px] sm:w-[420px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[300px] w-[300px] rounded-full bg-[#6B3045]/10 blur-3xl sm:h-[420px] sm:w-[420px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-[#C9A227]/[0.05] blur-3xl sm:h-64 sm:w-64"
        aria-hidden="true"
      />

      {/* TOP GOLD LINE */}

      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[82%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#C9A227]/55 to-transparent sm:w-[72%]"
        aria-hidden="true"
      />

      {/* MAIN CONTAINER */}

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}

        <div className="mb-10 flex flex-col gap-7 sm:mb-12 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            {/* Eyebrow */}

            <div className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-4">
              <span className="h-px w-7 bg-[#C9A227] sm:w-10" />

              <p className="text-[8px] font-medium uppercase tracking-[0.28em] text-[#A95F76] sm:text-[10px] sm:tracking-[0.4em]">
                YAMA FLYS COLLECTIONS
              </p>
            </div>

            {/* Heading */}

            <h2 className="font-serif text-[2rem] leading-[1.05] text-[#351B29] sm:text-5xl md:text-6xl">
              Discover Your
              <span className="block italic text-[#76517F]">
                Signature Style
              </span>
            </h2>

            {/* Gold accent */}

            <div className="mt-5 h-[2px] w-12 bg-[#C9A227] sm:mt-6 sm:w-14" />

            {/* Description */}

            <p className="mt-5 max-w-2xl text-[13px] leading-6 text-[#6F5963] sm:mt-6 sm:text-base sm:leading-7">
              Explore our curated collections and discover beautiful styles for
              everyday elegance, celebrations, weddings, and special moments.
            </p>
          </div>

          {/* COLLECTION COUNT */}

          <div className="hidden text-right md:block">
            <span className="block font-serif text-5xl leading-none text-[#76517F]">
              06
            </span>

            <span className="mt-2 block text-[9px] uppercase tracking-[0.32em] text-[#9A7F8A]">
              Collections
            </span>
          </div>
        </div>

        {/* COLLECTION GRID */}

        <div className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={`/shop?collection=${encodeURIComponent(category.name)}`}
              aria-label={`Explore ${category.name}`}
              className="
                group
                relative
                overflow-hidden
                border
                border-[#351B29]/10
                bg-[#21151C]
                shadow-[0_16px_40px_rgba(40,25,32,0.16)]
                transition-all
                duration-500
                ease-out
                hover:-translate-y-2
                hover:border-[#C9A227]/70
                hover:shadow-[0_30px_70px_rgba(40,25,32,0.28)]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#C9A227]
                focus-visible:ring-offset-4
                focus-visible:ring-offset-[#F1EAF4]
              "
            >
              {/* IMAGE */}

              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = "/assets/img-15.jpeg";
                  }}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.06]
                  "
                />

                {/* Dark pink tone */}

                <div
                  className="pointer-events-none absolute inset-0 bg-[#A95F76]/12 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-80"
                  aria-hidden="true"
                />

                {/* Pink + champagne atmosphere */}

                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#A95F76]/12 via-transparent to-[#D9BE68]/10 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />

                {/* Bottom dark gradient */}

                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#140D11]/95 via-[#21151C]/35 to-transparent"
                  aria-hidden="true"
                />

                {/* INNER FRAME */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-3
                    border
                    border-white/25
                    transition-all
                    duration-500
                    group-hover:inset-2.5
                    group-hover:border-[#D9BE68]/80
                    sm:inset-4
                    sm:group-hover:inset-3
                  "
                  aria-hidden="true"
                />

                {/* TOP INFORMATION */}

                <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between sm:left-5 sm:right-5 sm:top-5">
                  {/* Number */}

                  <span className="text-[9px] font-medium tracking-[0.22em] text-white/75 transition-colors duration-300 group-hover:text-[#E5C96B] sm:text-[10px] sm:tracking-[0.25em]">
                    0{index + 1}
                  </span>

                  {/* Arrow */}

                  <span
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/30
                      bg-black/15
                      text-white
                      backdrop-blur-md
                      transition-all
                      duration-300
                      group-hover:scale-110
                      group-hover:border-[#C9A227]
                      group-hover:bg-[#C9A227]
                      group-hover:text-[#21151C]
                      sm:h-10
                      sm:w-10
                    "
                  >
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>

                {/* CONTENT */}

                <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-7">
                  <p className="mb-1.5 text-[8px] font-medium uppercase tracking-[0.25em] text-[#D9BE68] sm:mb-2 sm:text-[9px] sm:tracking-[0.3em]">
                    {category.label}
                  </p>

                  <h3 className="max-w-[94%] font-serif text-xl leading-tight text-[#FFFDF8] sm:text-[28px]">
                    {category.name}
                  </h3>

                  {/* Hover CTA */}

                  <div className="mt-3 flex translate-y-1 items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#E5C5CF] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:text-[9px] sm:tracking-[0.22em]">
                    <span>Explore Collection</span>

                    <ArrowUpRight
                      size={12}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                </div>

                {/* GOLD BOTTOM LINE */}

                <div
                  className="absolute bottom-0 left-0 z-20 h-[3px] w-0 bg-gradient-to-r from-[#8E4D64] via-[#C9A227] to-[#8E4D64] transition-all duration-500 group-hover:w-full"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* VIEW ALL */}

        <div className="mt-11 flex justify-center sm:mt-14 md:mt-16">
          <Link
            to="/shop"
            className="group inline-flex items-center gap-3 border-b border-[#C9A227] pb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#351B29] transition-colors duration-300 hover:border-[#76517F] hover:text-[#76517F] sm:gap-4 sm:text-[10px] sm:tracking-[0.25em]"
          >
            <span>View All Collections</span>

            <ArrowUpRight
              size={15}
              strokeWidth={1.5}
              className="text-[#C9A227] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        {/* BOTTOM BRAND DETAIL */}

        <div className="mt-10 flex items-center justify-center gap-3 sm:mt-12 sm:gap-4">
          <span className="h-px w-8 bg-[#351B29]/10 sm:w-20" />

          <span className="text-center font-serif text-[11px] italic text-[#A95F76] sm:text-xs">
            Curated for every occasion
          </span>

          <span className="h-px w-8 bg-[#351B29]/10 sm:w-20" />
        </div>
      </div>
    </section>
  );
};

export default Categories;

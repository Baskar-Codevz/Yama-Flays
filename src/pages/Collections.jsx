
import React from "react";
import { Link } from "react-router-dom";

const collections = [
  {
    id: 1,
    name: "Classic Gold Bangles",
    image: "/assets/img-1.webp",
  },
  {
    id: 2,
    name: "Elegant Kada Bangles",
    image: "/assets/img-2.webp",
  },
  {
    id: 3,
    name: "Traditional Bangles",
    image: "/assets/img-3.webp",
  },
  {
    id: 4,
    name: "Bridal Bangles",
    image: "/assets/img-4.webp",
  },
  {
    id: 5,
    name: "Stone Work Bangles",
    image: "/assets/img-5.webp",
  },
  {
    id: 6,
    name: "Designer Bangles",
    image: "/assets/img-6.webp",
  },
  {
    id: 7,
    name: "Party Wear Bangles",
    image: "/assets/img-7.webp",
  },
  {
    id: 8,
    name: "Antique Style Bangles",
    image: "/assets/img-8.webp",
  },
  {
    id: 9,
    name: "Statement Bangles",
    image: "/assets/img-9.webp",
  },
  {
    id: 10,
    name: "Daily Wear Bangles",
    image: "/assets/img-10.webp",
  },
  {
    id: 11,
    name: "Premium Bangles",
    image: "/assets/img-11.webp",
  },
  {
    id: 12,
    name: "Festive Bangles",
    image: "/assets/img-12.webp",
  },
  {
    id: 13,
    name: "Modern Bangles",
    image: "/assets/img-13.webp",
  },
  {
    id: 14,
    name: "Bridal Kada",
    image: "/assets/img-14.webp",
  },
  {
    id: 15,
    name: "Crystal Bangles",
    image: "/assets/img-15.jpeg",
  },
  {
    id: 16,
    name: "Floral Bangles",
    image: "/assets/img-16.jpeg",
  },
  {
    id: 17,
    name: "Elegant Kada",
    image: "/assets/img-17.jpeg",
  },
  {
    id: 18,
    name: "Wedding Collection",
    image: "/assets/img-18.jpeg",
  },
  {
    id: 19,
    name: "Royal Bangles",
    image: "/assets/img-19.jpeg",
  },
  {
    id: 20,
    name: "Classic Kada",
    image: "/assets/img-20.jpeg",
  },
  {
    id: 21,
    name: "Festive Collection",
    image: "/assets/img-21.jpeg",
  },
  {
    id: 22,
    name: "Luxury Bangles",
    image: "/assets/img-22.jpeg",
  },
  {
    id: 23,
    name: "Minimal Bangles",
    image: "/assets/img-23.jpeg",
  },
  {
    id: 24,
    name: "Fashion Bangles",
    image: "/assets/img-24.jpeg",
  },
  {
    id: 25,
    name: "Occasion Wear",
    image: "/assets/img-25.jpeg",
  },
  {
    id: 26,
    name: "Signature Bangles",
    image: "/assets/img-26.jpeg",
  },
  {
    id: 27,
    name: "New Arrivals",
    image: "/assets/img-27.jpeg",
  },
];

const Collections = () => {
  return (
    <main className="min-h-screen bg-[#faf8f4]">

      {/* ================= HERO ================= */}
      <section className="bg-[#f5f0e9] px-5 py-16 text-center sm:px-6 sm:py-20 md:py-24">

        <p className="text-[10px] uppercase tracking-[0.3em] text-[#9a7656] sm:text-xs">
          YAMA FLAYS
        </p>

        <h1 className="mt-3 font-serif text-4xl text-[#211b17] sm:text-5xl md:text-6xl">
          Bangle Collections
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#756a61] sm:text-base">
          Explore elegant bangle designs created to complement
          your everyday style, celebrations, and special moments.
        </p>

        <div className="mx-auto mt-7 h-px w-14 bg-[#211b17]" />

      </section>

      {/* ================= COLLECTION GRID ================= */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-16">

        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mb-10 text-center sm:mb-12">

            <p className="text-[10px] uppercase tracking-[0.3em] text-[#9a7656] sm:text-xs">
              Explore Our Styles
            </p>

            <h2 className="mt-2 font-serif text-3xl text-[#211b17] sm:text-4xl">
              Discover Your Favourite
            </h2>

          </div>

          {/* ================= 27 COLLECTIONS ================= */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">

            {collections.map((collection) => (
              <article
                key={collection.id}
                className="group overflow-hidden border border-[#e1d8ce] bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Image */}
                <Link
                  to="/shop"
                  className="relative block aspect-square overflow-hidden bg-[#f1ece5]"
                >

                  <img
                    src={collection.image}
                    alt={`${collection.name} - YAMA FLYS`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/10" />

                  {/* Number */}
                  <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[10px] font-medium text-[#211b17] opacity-0 shadow-sm transition-all duration-500 group-hover:opacity-100">
                    {String(collection.id).padStart(2, "0")}
                  </div>

                </Link>

                {/* Content */}
                <div className="p-5 text-center">

                  <p className="text-[9px] uppercase tracking-[0.22em] text-[#9a7656]">
                    Bangle Collection
                  </p>

                  <h3 className="mt-2 font-serif text-xl leading-7 text-[#211b17]">
                    {collection.name}
                  </h3>

                  <Link
                    to="/shop"
                    className="mt-4 inline-block border-b border-[#211b17] pb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#211b17] transition-colors duration-300 hover:text-[#9a7656]"
                  >
                    View Collection
                  </Link>

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="border-t border-[#e3dbd2] bg-[#211b17] px-5 py-16 text-center text-white sm:px-6 sm:py-20">

        <p className="text-[10px] uppercase tracking-[0.3em] text-[#cdbba8] sm:text-xs">
          YAMA FLAYS
        </p>

        <h2 className="mx-auto mt-3 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
          Find Your Perfect Bangle
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-[#d8cec3]">
          Discover beautiful designs for every occasion and
          personal style.
        </p>

        <Link
          to="/shop"
          className="mt-8 inline-block border border-white px-8 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-[#211b17] sm:text-xs"
        >
          Shop All Bangles
        </Link>

      </section>

    </main>
  );
};

export default Collections;


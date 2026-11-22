
  import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Leaf,
} from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";

const collections = [
  {
    id: 1,
    name: "New Launch",
    image: "/assets/new2.jpeg",
    description: "Fresh designs for your unique style.",
    label: "JUST ARRIVED",
  },
  {
    id: 2,
    name: "Top Selling",
    image: "/assets/new1.jpeg",
    description: "Our customers' most-loved bangle designs.",
    label: "BESTSELLERS",
  },
  {
    id: 3,
    name: "Festival Collection",
    image: "/assets/Top-sell.jpeg",
    description: "Make every celebration a little more special.",
    label: "FESTIVE EDIT",
  },
  {
    id: 4,
    name: "Wedding Collection",
    image: "/assets/festive.jpeg",
    description: "Elegant designs for unforgettable occasions.",
    label: "BRIDAL EDIT",
  },
  {
    id: 5,
    name: "Jewellery Collection",
    image: "/assets/client-image6.jpeg",
    description: "Beautiful details that complete your look.",
    label: "TIMELESS STYLE",
  },
  {
    id: 6,
    name: "Other Products",
    image: "/assets/client-image5.jpeg",
    description: "Discover more pieces to fall in love with.",
    label: "EXPLORE MORE",
  },
];

const BG = {
  forest: "#143B2A",
  dark: "#0B2419",
  green: "#476D50",
  gold: "#C9A66B",
  ivory: "#F8F5ED",
  muted: "#77786A",
};

function CollectionCard({ collection, index }) {
  return (
    <ScrollReveal delay={(index % 3) * 100}>
      <article className="group h-full">
        <Link
          to={`/shop?collection=${encodeURIComponent(collection.name)}`}
          aria-label={`Explore ${collection.name}`}
          className="relative block overflow-hidden rounded-sm bg-[#E8E4D9] m-full"
        >
          {/* Large image */}
          <div className="relative aspect-[4/5]  overflow-hidden">
            <img
              src={collection.image}
              alt={collection.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />

            {/* Elegant image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2419]/90 via-[#0B2419]/10 to-black/15 transition-opacity duration-500 group-hover:from-[#0B2419]/95" />

            {/* Collection label */}
            <span className="absolute left-4 top-4 border border-white/40 bg-[#0B2419]/50 px-3 py-2 text-[9px] font-medium tracking-[0.2em] text-white backdrop-blur-sm sm:left-5 sm:top-5">
              {collection.label}
            </span>

            {/* Number */}
            <span className="absolute right-5 top-5 font-serif text-xl italic text-white/80">
              {String(collection.id).padStart(2, "0")}
            </span>

            {/* Bottom content */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-7 bg-[#C9A66B]" />
                <span className="text-[9px] uppercase tracking-[0.24em] text-[#E6D2A7]">
                  YAMA FLAYS
                </span>
              </div>

              <h3 className="max-w-[90%] font-serif text-3xl leading-tight text-white sm:text-4xl">
                {collection.name}
              </h3>

              <div className="mt-5 flex items-center justify-between border-t border-white/30 pt-4">
                <span className="text-[10px] font-medium uppercase tracking-[0.17em] text-white">
                  Discover Collection
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 text-white transition-all duration-300 group-hover:border-[#C9A66B] group-hover:bg-[#C9A66B] group-hover:text-[#0B2419]">
                  <ArrowUpRight size={17} />
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Minimal information below the image */}
        <div className="flex items-start justify-between gap-3 border-b border-[#DDD8CA] py-5">
          <div>
            <p className="mb-2 flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#7B8B72]">
              <Leaf size={12} />
              Curated with care
            </p>

            <h4 className="font-serif text-xl text-[#143B2A] sm:text-2xl">
              {collection.name}
            </h4>

            <p className="mt-2 max-w-xs text-sm leading-6 text-[#77786A]">
              {collection.description}
            </p>
          </div>

          <Link
            to={`/shop?collection=${encodeURIComponent(collection.name)}`}
            aria-label={`Shop ${collection.name}`}
            className="mt-7 shrink-0 text-[#476D50] transition-transform hover:translate-x-1"
          >
            <ArrowRight size={20} />
          </Link>
        </div>
      </article>
    </ScrollReveal>
  );
}

export default function Collections() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/collections" || !location.hash) return;

    const targetId = decodeURIComponent(location.hash.slice(1));
    const timer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 250);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return (
    <main className="min-h-screen    overflow-hidden bg-[#F8F5ED] font-sans text-[#143B2A]">

      {/* LUXURY HERO */}
      <section className="relative isolate overflow-hidden bg-[#0B2419]">
        {/* Replace this path with your generated model image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-7 w-full bg-[url('/assets/bg-200.png')] bg-cover bg-[center_45%] sm:bg-[length:200%_auto] sm:bg-[center_42%] lg:bg-cover"
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071B12]/95 via-[#0B2419]/75 to-[#0B2419]/25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0B2419]/70 via-transparent to-black/10" />

        <div className="mx-auto flex min-h-[490px] max-w-7xl items-center px-6 py-20 sm:min-h-[580px] sm:px-10 sm:py-24 lg:min-h-[650px] lg:px-16">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.32em] text-[#E1C58D] sm:text-xs">
                <span className="h-px w-8 bg-[#C9A66B]" />
                YAMA FLAYS · THE SIGNATURE EDIT
              </p>

              <h1 className="mt-7 font-serif text-5xl leading-[1.05] tracking-tight text-[#F8F5ED] sm:text-6xl md:text-7xl lg:text-8xl">
                Beauty in
                <span className="mt-2 block italic text-[#D9BD85]">
                  Every Detail.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
                Discover thoughtfully selected bangle collections,
                created to complement your everyday style and
                unforgettable celebrations.
              </p>

              <Link
                to="/shop"
                className="mt-8 inline-flex min-h-12 items-center gap-4 bg-[#D9BD85] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#102D20] transition-all duration-300 hover:bg-[#F8F5ED]"
              >
                Discover the Collection
                <ArrowRight size={16} />
              </Link>

              <div className="mt-10 flex items-center gap-3 text-[#E1C58D] text-green-950">
                <Sparkles size={15} strokeWidth={1.3} />
                <span className="text-[9px] uppercase tracking-[0.22em]">
                  A little luxury, every day
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Decorative frame */}
        <div className="pointer-events-none absolute inset-3 border border-white/15 sm:inset-5" />
      </section>

      {/* COLLECTION INTRO */}
      <section className="px-5 pb-10 pt-20 sm:px-8 sm:pb-12 sm:pt-24 lg:pt-28">
        <div className="mx-auto max-w-7xl text-center">
          <ScrollReveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9A7A45]">
              Made for your moments
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#143B2A] sm:text-5xl md:text-6xl">
              The Art of Adornment
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#77786A] sm:text-base">
              From subtle everyday beauty to statement-making
              celebrations, find a collection that feels like you.
            </p>

            <div className="mx-auto mt-7 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#C9A66B]" />
              <Leaf size={15} className="text-[#476D50]" />
              <span className="h-px w-10 bg-[#C9A66B]" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* COLLECTION GRID */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4 border-b border-[#DDD8CA] pb-5">
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#9A7A45]">
                Find your style
              </p>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
                Explore Collections
              </h2>
            </div>

            <Link
              to="/shop"
              className="mb-1 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#476D50] hover:text-[#9A7A45]"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
            {collections.map((collection, index) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

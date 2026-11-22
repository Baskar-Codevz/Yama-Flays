
import {
  ArrowRight,
  Gem,
  Flame,
  Star,
  Heart,
  Crown,
  Gift,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "New Launch",
    label: "JUST ARRIVED",
    image: "/assets/client-image1.jpeg",
    description: "Meet your next favourite.",
    icon: Gem,
  },
  {
    name: "Top Selling",
    label: "MOST LOVED",
    image: "/assets/Top-sell.jpeg",
    description: "Loved for a reason.",
    icon: Flame,
  },
  {
    name: "Festival Collection",
    label: "CELEBRATION EDIT",
    image: "/assets/client-image4.jpeg",
    description: "Make every occasion shine.",
    icon: Star,
  },
  {
    name: "Wedding Collection",
    label: "THE BRIDAL EDIT",
    image: "/assets/festive.jpeg",
    description: "For your unforgettable moments.",
    icon: Heart,
  },
  {
    name: "Jewellery Collection",
    label: "STATEMENT PIECES",
    image: "/assets/client-image6.jpeg",
    description: "Little details, lasting impressions.",
    icon: Crown,
  },
  {
    name: "Other Products",
    label: "MORE TO DISCOVER",
    image: "/assets/client-image5.jpeg",
    description: "Find something unexpected.",
    icon: Gift,
  },
];

function CategoryCard({ category }) {
  const Icon = category.icon;

  return (
    <Link
      to={`/shop?collection=${encodeURIComponent(category.name)}`}
      aria-label={`Explore ${category.name}`}
      className="group relative flex min-w-0 flex-col overflow-hidden rounded-[24px] border border-[#E3E0D4] bg-[#FBF9F2] shadow-[0_8px_24px_rgba(36,53,44,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_36px_rgba(36,53,44,0.12)]"
    >
      {/* Product image */}
      <div className="relative h-[230px] overflow-hidden sm:h-[250px] lg:h-[220px] xl:h-[245px]">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/assets/img-15.jpeg";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#183D2B]/35 via-transparent to-transparent" />

        <span className="absolute left-3 top-3 rounded-full bg-[#F8F6ED]/95 px-3 py-2 text-[8px] font-bold tracking-[0.16em] text-[#244D36] sm:left-4 sm:top-4 sm:text-[9px]">
          {category.label}
        </span>

        <span className="absolute -bottom-5 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border-[4px] border-[#FBF9F2] bg-[#244D36] text-white transition-transform duration-300 group-hover:rotate-12">
          <Icon size={18} strokeWidth={1.6} />
        </span>
      </div>

      {/* Card content */}
      <div className="flex flex-1 flex-col items-center px-3 pb-5 pt-8 text-center sm:px-4 sm:pb-6">
        <h3 className="font-serif text-lg leading-snug text-[#24352C] sm:text-xl">
          {category.name}
        </h3>

        <p className="mt-2 min-h-10 text-xs leading-5 text-[#737A6E] sm:text-sm">
          {category.description}
        </p>

        <span className="mt-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#244D36] text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-[#C9A227]">
          <ArrowRight size={17} />
        </span>
      </div>
    </Link>
  );
}

export default function Categories() {
  return (
    <section
      id="collections"
      className="relative overflow-hidden bg-[#F7F5ED] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#DDE5D8]/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#E9DFC4]/35 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Header + featured image */}
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#68866F]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#527258]">
                YAMA FLAYS
              </span>
              <span className="h-px w-10 bg-[#68866F]" />
            </div>

            <h2 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight text-[#24352C] sm:text-6xl lg:text-7xl">
              Our
              <br />
              Collections
            </h2>

            <p className="mt-4 max-w-lg font-serif text-3xl italic leading-tight text-[#527258] sm:text-4xl">
              Find the perfect bangle for every occasion.
            </p>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#747A70] sm:text-base">
              From everyday elegance to grand celebrations, explore our
              curated collections of bangles designed to match your style
              and every special moment.
            </p>

            <Link
              to="/shop"
              className="group mt-7 inline-flex min-h-12 items-center gap-4 rounded-full bg-[#244D36] px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#183D2B]"
            >
              Explore All Collections
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Featured banner */}
          <Link
            to="/shop?collection=New%20Launch"
            className="group relative block h-[300px] overflow-hidden rounded-[100px_100px_28px_28px] border border-[#DADCCF] bg-[#E8E8DF] sm:h-[380px] lg:h-[430px]"
          >
            <img
              src="/assets/client-image1.jpeg"
              alt="YAMA FLYS featured bangle collection"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/assets/img-15.jpeg";
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#14291F]/50 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between sm:bottom-8 sm:left-8 sm:right-8">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#F0DFAD]">
                  Discover something special
                </p>
                <h3 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
                  Made for your moments
                </h3>
              </div>

              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F7F5ED] text-[#244D36] transition-transform duration-300 group-hover:rotate-45">
                <ArrowRight size={21} />
              </span>
            </div>
          </Link>
        </div>

        {/* Collections heading */}
        <div className="mb-7 mt-16 flex flex-col gap-3 border-b border-[#DADDD4] pb-5 sm:mt-20 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#68866F]">
              Explore by style
            </p>
            <h3 className="mt-2 font-serif text-3xl text-[#24352C] sm:text-4xl">
              Find your favourites
            </h3>
          </div>

          <p className="max-w-sm text-sm leading-6 text-[#747A70]">
            Six collections, countless ways to express your style.
          </p>
        </div>

        {/* Six collection cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-[#DADDD4] bg-[#F1F0E7] px-6 py-7 text-center sm:mt-16 sm:flex-row sm:text-left sm:px-9">
          <div>
            <p className="font-serif text-2xl italic text-[#527258]">
              Little details. Beautiful memories.
            </p>
            <p className="mt-2 text-xs leading-5 text-[#747A70] sm:text-sm">
              Discover the collection that feels like you.
            </p>
          </div>

          <Link
            to="/shop"
            className="group inline-flex min-h-11 shrink-0 items-center gap-3 border border-[#244D36] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#244D36] transition-colors hover:bg-[#244D36] hover:text-white"
          >
            Shop All Bangles
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

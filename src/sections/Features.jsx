
import { Link } from "react-router-dom";
import {
  Gem,
  ShoppingBag,
  Sparkles,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    id: "01",
    icon: Gem,
    eyebrow: "CURATED STYLE",
    title: "Elegant Designs",
    description:
      "Discover thoughtfully selected bangle designs created to complement your personal style.",
    linkText: "Explore Collection",
    link: "/collections",
    image: "/assets/img1.jpg",
    imageAlt: "Elegant bangle designs",
  },
  {
    id: "02",
    icon: ShoppingBag,
    eyebrow: "SIMPLE EXPERIENCE",
    title: "Easy Shopping",
    description:
      "Browse our collection, explore your favourites, and enjoy a simple shopping experience.",
    linkText: "Shop Bangles",
    link: "/shop",
    image: "/assets/img2.jpg",
    imageAlt: "YAMA FLYS shopping collection",
  },
  {
    id: "03",
    icon: Sparkles,
    eyebrow: "FOR EVERY MOMENT",
    title: "Made for Every Occasion",
    description:
      "Find styles that beautifully complement everyday looks, celebrations, and special moments.",
    linkText: "View Collections",
    link: "/collections",
    image: "/assets/img3.jpg",
    imageAlt: "Bangles for special occasions",
  },
  {
    id: "04",
    icon: MessageCircle,
    eyebrow: "PERSONAL ASSISTANCE",
    title: "We're Here to Help",
    description:
      "Have a question about a product or order? Reach out to us and our team will be happy to assist.",
    linkText: "Contact Us",
    link: "/contact",
    image: "/assets/img4.jpg",
    imageAlt: "Personal customer assistance",
  },
];

const Features = () => {
  return (
    <section className="relative overflow-hidden bg-[#F5F5F0] px-5 py-16 text-[#234633] sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#DDE6D8]/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <header className="mb-10 text-center sm:mb-12">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-[#78917A] sm:w-12" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#607D65] sm:text-xs">
              YAMA FLAYS
            </p>

            <span className="h-px w-8 bg-[#78917A] sm:w-12" />
          </div>

          <h2 className="mx-auto max-w-3xl font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl">
            More than just bangles.
            <br />
            <span className="italic text-[#607D65]">
              It's an experience.
            </span>
          </h2>

          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#78917A]" />
            <Sparkles
              size={17}
              strokeWidth={1.5}
              className="text-[#31563A]"
            />
            <span className="h-px w-10 bg-[#78917A]" />
          </div>
        </header>

        {/* Four compact feature cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.id}
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-[1.25rem] border border-[#31563A]/15 bg-white/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#31563A]/30 hover:bg-white/70 hover:shadow-[0_12px_30px_rgba(35,70,51,0.08)] sm:p-6"
              >
                {/* Number and circular image */}
                <div className="relative mb-4 flex min-h-[105px] items-start justify-between">
                  <span className="pt-1 text-sm font-medium tracking-wide text-[#64816A]">
                    {feature.id}
                  </span>

                  <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-bl-[2.5rem] rounded-tr-[1.25rem] rounded-tl-[3.5rem] rounded-br-[3.5rem] bg-[#E3E9DF]">
                    <img
                      src={feature.image}
                      alt={feature.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-[#31563A]/5 transition-colors duration-300 group-hover:bg-transparent" />
                  </div>
                </div>

                {/* Icon and category */}
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#31563A] text-[#F5F5F0] transition-transform duration-300 group-hover:rotate-[-6deg]">
                    <Icon size={17} strokeWidth={1.6} />
                  </span>

                  <p className="text-[9px] font-semibold uppercase leading-4 tracking-[0.16em] text-[#607D65] sm:text-[10px]">
                    {feature.eyebrow}
                  </p>
                </div>

                {/* Content */}
                <h3 className="mb-3 font-serif text-xl font-medium leading-tight text-[#234633] transition-colors duration-300 group-hover:text-[#607D65] sm:text-[22px]">
                  {feature.title}
                </h3>

                <p className="mb-6 flex-1 text-[13px] leading-[1.75] text-[#687568]">
                  {feature.description}
                </p>

                {/* Navigation link */}
                <Link
                  to={feature.link}
                  className="inline-flex items-center gap-2 self-start border-b border-[#31563A]/25 pb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#31563A] outline-none transition-colors hover:border-[#31563A] focus-visible:ring-2 focus-visible:ring-[#31563A] focus-visible:ring-offset-4 sm:text-[11px]"
                >
                  {feature.linkText}

                  <ArrowRight
                    size={15}
                    strokeWidth={1.6}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </article>
            );
          })}
        </div>

        {/* Bottom signature */}
        <footer className="mt-8 flex items-center justify-center gap-3 sm:mt-10">
          <span className="h-px w-8 bg-[#78917A]" />

          <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#607D65] sm:text-[10px]">
            Crafted with care
          </p>

          <span className="h-px w-8 bg-[#78917A]" />
        </footer>
      </div>
    </section>
  );
};

export default Features;

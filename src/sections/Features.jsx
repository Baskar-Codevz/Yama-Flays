
import React from "react";
import { ArrowRight, Gem, ShoppingBag, Sparkles, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Gem,
    title: "Elegant Designs",
    description:
      "Discover beautiful bangle designs created to complement your personal style.",
    linkText: "Explore Collection",
    link: "/collections",
  },
  {
    icon: ShoppingBag,
    title: "Easy Shopping",
    description:
      "Browse our collection and find your favourite bangles through a simple and convenient shopping experience.",
    linkText: "Shop Bangles",
    link: "/shop",
  },
  {
    icon: Sparkles,
    title: "Made for Every Occasion",
    description:
      "Find styles that complement everyday looks, celebrations, and special moments.",
    linkText: "View Collections",
    link: "/collections",
  },
  {
    icon: MessageCircle,
    title: "We're Here to Help",
    description:
      "Have a question about a product or order? Get in touch with us and we'll be happy to assist.",
    linkText: "Contact Us",
    link: "/contact",
  },
];

const Features = () => {
  return (
    <section className="bg-[#faf8f4] px-6 py-20 md:px-10 md:py-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-[#9a7656]">
            The YAMA FLAYS Experience
          </p>

          <h2 className="font-serif text-4xl leading-tight text-[#211b17] md:text-5xl">
            A Touch of Elegance
            <span className="block italic text-[#9a7656]">
              For Every Style
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#756a61] md:text-base">
            Explore a collection of beautiful bangles designed to add a
            graceful finishing touch to your look.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Link
                key={feature.title}
                to={feature.link}
                className="group relative overflow-hidden border border-[#e2d9d0] bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#c9b19d] hover:shadow-[0_20px_50px_rgba(55,40,30,0.10)]"
              >
                {/* Background Decoration */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full border border-[#eee5dc] transition-all duration-700 group-hover:scale-[1.8] group-hover:border-[#d8c4b2]" />

                <div className="relative z-10">
                  {/* Number */}
                  <span className="text-[10px] tracking-[0.25em] text-[#b09b89]">
                    0{index + 1}
                  </span>

                  {/* Icon */}
                  <div className="mt-7 flex h-14 w-14 items-center justify-center border border-[#e2d9d0] bg-[#faf8f4] text-[#9a7656] transition-all duration-500 group-hover:border-[#211b17] group-hover:bg-[#211b17] group-hover:text-white">
                    <Icon
                      size={23}
                      strokeWidth={1.4}
                      className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mt-7 font-serif text-2xl text-[#211b17] transition-colors duration-300 group-hover:text-[#9a7656]">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 min-h-[84px] text-sm leading-6 text-[#756a61]">
                    {feature.description}
                  </p>

                  {/* Link */}
                  <div className="mt-7 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#211b17]">
                    <span>{feature.linkText}</span>

                    <ArrowRight
                      size={15}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:translate-x-2"
                    />
                  </div>

                  {/* Bottom Line */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#9a7656] transition-all duration-500 group-hover:w-full" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;


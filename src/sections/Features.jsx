import React from "react";
import {
  ArrowUpRight,
  Gem,
  ShoppingBag,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    number: "01",
    icon: Gem,
    eyebrow: "Curated Style",
    title: "Elegant Designs",
    description:
      "Discover thoughtfully selected bangle designs created to complement your personal style.",
    linkText: "Explore Collection",
    link: "/collections",
  },
  {
    number: "02",
    icon: ShoppingBag,
    eyebrow: "Simple Experience",
    title: "Easy Shopping",
    description:
      "Browse our collection, explore your favourites, and enjoy a simple shopping experience.",
    linkText: "Shop Bangles",
    link: "/shop",
  },
  {
    number: "03",
    icon: Sparkles,
    eyebrow: "For Every Moment",
    title: "Made for Every Occasion",
    description:
      "Find styles that beautifully complement everyday looks, celebrations, and special moments.",
    linkText: "View Collections",
    link: "/collections",
  },
  {
    number: "04",
    icon: MessageCircle,
    eyebrow: "Personal Assistance",
    title: "We're Here to Help",
    description:
      "Have a question about a product or order? Reach out to us and our team will be happy to assist.",
    linkText: "Contact Us",
    link: "/contact",
  },
];

const Features = () => {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F3EDE5]
        px-6
        py-20
        sm:px-8
        md:py-24
        lg:px-12
        xl:px-16
      "
    >
      {/* ================= BACKGROUND DETAILS ================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-[-120px]
          top-[-100px]
          h-80
          w-80
          rounded-full
          bg-[#B28B52]/[0.07]
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-120px]
          right-[-100px]
          h-96
          w-96
          rounded-full
          bg-[#8F7561]/[0.08]
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          hidden
          h-px
          w-[70%]
          -translate-x-1/2
          bg-[#B28B52]/10
          lg:block
        "
      />

      <div className="relative mx-auto max-w-7xl">
        {/* ================= SECTION HEADING ================= */}

        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[#B28B52]" />

            <span
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.4em]
                text-[#8B693F]
              "
            >
              The YAMA FLYS Experience
            </span>

            <span className="h-px w-10 bg-[#B28B52]" />
          </div>

          <h2
            className="
              font-serif
              text-4xl
              leading-[1.08]
              text-[#211A17]
              sm:text-5xl
              md:text-6xl
            "
          >
            Elegance in
            <span className="block italic text-[#9A7656]">every detail.</span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-sm
              leading-7
              text-[#625A55]
              sm:text-base
            "
          >
            Discover a refined shopping experience where beautiful designs,
            effortless browsing, and personal assistance come together.
          </p>
        </div>

        {/* ================= FEATURE GRID ================= */}

        <div
          className="
            mt-14
            grid
            gap-5
            sm:grid-cols-2
            lg:mt-16
            lg:grid-cols-4
          "
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Link
                key={feature.number}
                to={feature.link}
                aria-label={`${feature.linkText} - ${feature.title}`}
                className="
                  group
                  relative
                  flex
                  min-h-[390px]
                  flex-col
                  overflow-hidden
                  border
                  border-[#D8CEC4]
                  bg-[#FAF7F2]
                  px-7
                  pb-7
                  pt-6
                  transition-all
                  duration-500
                  ease-out
                  hover:-translate-y-2
                  hover:border-[#B28B52]
                  hover:shadow-[0_24px_60px_rgba(52,32,22,0.12)]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#B28B52]
                  focus-visible:ring-offset-4
                "
              >
                {/* ================= CARD TOP ================= */}

                <div className="flex items-center justify-between">
                  <span
                    className="
                      text-[10px]
                      font-medium
                      tracking-[0.3em]
                      text-[#9A8C82]
                      transition-colors
                      duration-500
                      group-hover:text-[#A58218]
                    "
                  >
                    {feature.number}
                  </span>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-[9px]
                      uppercase
                      tracking-[0.22em]
                      text-[#9A8C82]
                      transition-colors
                      duration-500
                      group-hover:text-[#A58218]
                    "
                  >
                    <span>{feature.eyebrow}</span>
                  </div>
                </div>

                {/* ================= ICON ================= */}

                <div className="mt-8">
                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      border
                      border-[#D8CEC4]
                      bg-[#F3EDE5]
                      text-[#A58218]
                      transition-all
                      duration-500
                      group-hover:scale-105
                      group-hover:border-[#B28B52]
                      group-hover:bg-[#211A17]
                      group-hover:text-[#DFC25B]
                    "
                  >
                    <Icon
                      size={24}
                      strokeWidth={1.35}
                      className="
                        transition-transform
                        duration-500
                        group-hover:rotate-3
                      "
                    />
                  </div>
                </div>

                {/* ================= CONTENT ================= */}

                <div className="mt-7">
                  <h3
                    className="
                      font-serif
                      text-[25px]
                      leading-tight
                      text-[#211A17]
                      transition-colors
                      duration-500
                      group-hover:text-[#8F6812]
                    "
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="
                      mt-4
                      text-sm
                      leading-6
                      text-[#6A625D]
                    "
                  >
                    {feature.description}
                  </p>
                </div>

                {/* ================= CTA ================= */}

                <div className="mt-auto pt-8">
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      border-t
                      border-[#E1D8D0]
                      pt-5
                    "
                  >
                    <span
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-[#211A17]
                        transition-colors
                        duration-500
                        group-hover:text-[#A58218]
                      "
                    >
                      {feature.linkText}
                    </span>

                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        border
                        border-[#D8CEC4]
                        text-[#211A17]
                        transition-all
                        duration-500
                        group-hover:border-[#B28B52]
                        group-hover:bg-[#B28B52]
                        group-hover:text-white
                      "
                    >
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.5}
                        className="
                          transition-transform
                          duration-500
                          group-hover:translate-x-[2px]
                          group-hover:-translate-y-[2px]
                        "
                      />
                    </span>
                  </div>
                </div>

                {/* ================= GOLD ACCENT ================= */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-0
                    bg-[#B28B52]
                    transition-all
                    duration-700
                    group-hover:w-full
                  "
                />

                {/* ================= DECORATIVE CORNER ================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-10
                    -top-10
                    h-24
                    w-24
                    rounded-full
                    border
                    border-[#B28B52]/10
                    transition-all
                    duration-700
                    group-hover:scale-[1.65]
                    group-hover:border-[#B28B52]/25
                  "
                />
              </Link>
            );
          })}
        </div>

        {/* ================= BOTTOM BRAND LINE ================= */}

        <div className="mt-14 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-[#D8CEC4]" />

          <span
            className="
              font-serif
              text-sm
              italic
              tracking-wide
              text-[#8E7A70]
            "
          >
            Designed to complement your moments
          </span>

          <span className="h-px w-16 bg-[#D8CEC4]" />
        </div>
      </div>
    </section>
  );
};

export default Features;

import { ArrowRight, ArrowUpRight, Sparkles, Gem, MapPin, Leaf, Heart, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const IMAGE = "/assets/dev1.jpg";
const FALLBACK_IMAGE = "/assets/dev.jpg";

const COLORS = {
  cream: "#FAF9F5",
  green: "#243D2D",
  sage: "#78896A",
  gold: "#B59A60",
  muted: "#77766D",
  border: "#E4DFD3",
};

const styles = {
  eyebrow:
    "text-[9px] font-semibold uppercase tracking-[0.28em] text-[#526747] sm:text-[10px] sm:tracking-[0.35em]",

  description:
    "text-sm leading-7 text-[#77766D] sm:text-base sm:leading-8",

  secondaryLink:
    "group inline-flex items-center gap-2 rounded-full border border-[#526747]/50 px-5 py-3.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#243D2D] transition-all duration-300 hover:border-[#243D2D] hover:bg-[#243D2D] hover:text-white",
};

/* Reusable decorative line */

function GoldLine({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`block h-px w-10 bg-[#B59A60] ${className}`}
    />
  );
}

/* Reusable section label */

function BrandLabel({ children, icon = false }) {
  return (
    <div className="flex items-center gap-3">
      {icon ? (
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8DCCF] bg-[#EEF0E7]">
          <Sparkles
            size={15}
            strokeWidth={1.4}
            className="text-[#78896A]"
          />
        </span>
      ) : (
        <GoldLine />
      )}

      <p className={styles.eyebrow}>{children}</p>
    </div>
  );
}

/* Reusable action link */

function BrandLink({ to, children, primary = false }) {
  const Icon = primary ? ArrowRight : ArrowUpRight;

  return (
    <Link
      to={to}
      className={
        primary
          ? "group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#38533A] px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#243D2D] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78896A] focus-visible:ring-offset-2"
          : styles.secondaryLink
      }
    >
      <span>{children}</span>

      <Icon
        size={15}
        strokeWidth={1.5}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}

/* Premium image composition */

function BrandImage() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      {/* Decorative gold frame */}

      <div
        aria-hidden="true"
        className="absolute -right-3 -top-3 h-28 w-28 rounded-tr-[70px] border-r border-t border-[#B59A60]/70 sm:-right-5 sm:-top-5 sm:h-40 sm:w-40"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-4 -left-4 h-28 w-28 rounded-bl-[70px] bg-[#E5EBDD] sm:-bottom-6 sm:-left-6 sm:h-40 sm:w-40"
      />

      {/* Main image card */}

      <div className="relative z-10 overflow-hidden rounded-t-[180px] rounded-b-2xl border border-[#E8E3D8] bg-white p-2.5 shadow-[0_20px_60px_rgba(36,61,45,0.12)] sm:rounded-t-[240px] sm:p-3">
        <div className="relative overflow-hidden rounded-t-[170px] rounded-b-xl bg-[#EEF0E7] sm:rounded-t-[225px]">
          <img
            src={IMAGE}
            alt="YAMA FLAYS traditional bangles and jewellery collection"
            loading="lazy"
            decoding="async"
            onError={(event) => {
              if (event.currentTarget.dataset.fallbackApplied) return;

              event.currentTarget.dataset.fallbackApplied = "true";
              event.currentTarget.src = FALLBACK_IMAGE;
            }}
            className="block aspect-[4/5] max-h-[680px] w-full object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.035]"
          />

          {/* Image overlay */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17291C]/65 via-transparent to-[#243D2D]/10"
          />

          {/* Brand badge */}

          <div className="absolute left-5 top-6 flex items-center gap-2.5 rounded-full border border-white/70 bg-[#FAF9F5]/90 px-4 py-2.5 shadow-sm backdrop-blur-md sm:left-7 sm:top-8">
            <Sparkles size={14} className="text-[#78896A]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#243D2D]">
              YAMA FLAYS
            </span>
          </div>

          {/* Image caption */}

          <div className="absolute bottom-6 left-5 right-5 sm:bottom-9 sm:left-8 sm:right-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#E5D4A9]">
              OUR WORLD · YOUR STYLE
            </p>

            <h3 className="mt-3 max-w-sm font-serif text-3xl leading-tight text-white sm:text-4xl">
              Elegance in every
              <span className="mt-1 block italic text-[#DCE6D3]">
                little detail.
              </span>
            </h3>

            <Link
              to="/collections"
              className="group mt-5 inline-flex items-center gap-2 border-b border-white/60 pb-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-[#E5D4A9] hover:text-[#E5D4A9]"
            >
              Explore the collection

              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Floating established badge */}

      <div className="absolute -bottom-5 right-3 z-20 flex h-24 w-24 flex-col items-center justify-center rounded-full border border-[#D7C59B] bg-[#FAF9F5] shadow-[0_8px_30px_rgba(36,61,45,0.13)] sm:-bottom-6 sm:right-7 sm:h-28 sm:w-28">
        <span className="font-serif text-2xl text-[#38533A] sm:text-3xl">
          2025
        </span>

        <GoldLine className="mx-auto mt-1 w-7" />

        <span className="mt-2 text-[8px] font-semibold uppercase tracking-[0.15em] text-[#77766D]">
          Established
        </span>
      </div>
    </div>
  );
}

/* Brand statistics */

function BrandStats() {
  const stats = [
    {
      value: "2025",
      label: "Established",
      icon: Gem,
    },
    {
      value: "Tamil Nadu",
      label: "Based in",
      icon: MapPin,
    },
  ];

  return (
    <div className="mt-8 grid max-w-xl grid-cols-2 border-y border-[#E4DFD3]">
      {stats.map(({ value, label, icon: Icon }, index) => (
        <div
          key={label}
          className={`py-5 sm:py-6 ${
            index === 0
              ? "border-r border-[#E4DFD3] pr-4 sm:pr-7"
              : "pl-4 sm:pl-7"
          }`}
        >
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#E9EDE2]">
            <Icon size={17} strokeWidth={1.4} className="text-[#38533A]" />
          </div>

          <p
            className={`font-serif text-[#243D2D] ${
              index === 0
                ? "text-3xl"
                : "text-xl sm:text-2xl"
            }`}
          >
            {value}
          </p>

          <GoldLine className="mt-2 w-7" />

          <p className="mt-3 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#77766D] sm:text-[9px]">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

/* Brand highlights */

function BrandHighlights() {
  const features = [
    {
      icon: Leaf,
      title: "Thoughtful Designs",
      description: "Made for your style",
    },
    {
      icon: Sparkles,
      title: "Timeless Elegance",
      description: "For every occasion",
    },
    {
      icon: Heart,
      title: "Customer Love",
      description: "You matter to us",
    },
    {
      icon: Truck,
      title: "Delivery",
      description: "Across India",
    },
  ];

  return (
    <div className="mt-16 grid grid-cols-2 border-y border-[#E4DFD3] sm:mt-20 sm:grid-cols-4">
      {features.map(({ icon: Icon, title, description }, index) => (
        <div
          key={title}
          className={`flex flex-col items-center px-3 py-6 text-center sm:py-7 ${
            index % 2 === 0 ? "sm:border-r sm:border-[#E4DFD3]" : ""
          } ${
            index < 2 ? "border-b border-[#E4DFD3] sm:border-b-0" : ""
          } ${
            index !== 0 && index !== 2
              ? "sm:border-r sm:border-[#E4DFD3]"
              : ""
          }`}
        >
          <Icon
            size={23}
            strokeWidth={1.35}
            className="text-[#38533A]"
          />

          <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#243D2D] sm:text-[10px]">
            {title}
          </p>

          <p className="mt-2 text-xs text-[#77766D]">
            {description}
          </p>
        </div>
      ))}
    </div>
  );
}

/* Main brand story section */

export default function BrandStory() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[#FAF9F5] px-5 py-20 text-[#243D2D] sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      {/* Background decorations */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-32 -z-10 h-96 w-96 rounded-full bg-[#E5EBDD]/70 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-32 -z-10 h-[450px] w-[450px] rounded-full bg-[#EFE4D1]/55 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[75%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#B59A60]/60 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
          <BrandImage />

          {/* Brand story content */}

          <div className="pt-2 lg:pt-0">
            <BrandLabel>ABOUT YAMA FLAYS</BrandLabel>

            <h2 className="mt-6 max-w-xl font-serif text-4xl leading-[1.08] tracking-tight text-[#243D2D] sm:text-5xl md:text-6xl">
              More than just
              <span className="mt-2 block">jewellery,</span>
              <span className="mt-2 block italic text-[#78896A]">
                it’s your story.
              </span>
            </h2>

            <GoldLine className="mt-7 w-14" />

            <div className="mt-7 max-w-xl space-y-4">
              <p className={styles.description}>
                YAMA FLAYS is a Tamil Nadu-based business offering a collection
                of bangles and accessories for everyday style and special
                occasions.
              </p>

              <p className={styles.description}>
                Discover beautiful designs selected to bring a graceful
                finishing touch to your look, whether you are dressing for
                everyday moments or special celebrations.
              </p>
            </div>

            <BrandStats />

            {/* Calls to action */}

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-4">
              <BrandLink to="/about" primary>
                Our Story
              </BrandLink>

              <BrandLink to="/collections">
                Collections
              </BrandLink>

              <BrandLink to="/contact">
                Contact
              </BrandLink>
            </div>
          </div>
        </div>

        <BrandHighlights />

        {/* Brand signature */}

        <div className="mt-12 flex items-center justify-center gap-3 sm:mt-16 sm:gap-5">
          <span className="h-px w-8 bg-[#AEB9A2] sm:w-16" />

          <p className="text-center font-serif text-sm italic text-[#38533A] sm:text-base">
            The finishing touch to every moment
          </p>

          <span className="h-px w-8 bg-[#AEB9A2] sm:w-16" />
        </div>
      </div>
    </section>
  );
}
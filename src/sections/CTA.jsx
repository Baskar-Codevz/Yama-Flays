
import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Gem,
  Heart,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Wishlist", to: "/wishlist", icon: Heart },
  { label: "Cart", to: "/cart" },
];

const GOLD = "#B99A55";
const GREEN = "#31543B";
const LIGHT_GREEN = "#71866C";
const SMOKE = "#F8F8F5";

const reveal = (visible, delay = 0) => ({
  className: `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
    visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
  }`,
  style: { transitionDelay: visible ? `${delay}ms` : "0ms" },
});

function Eyebrow({ children, light = false }) {
  return (
    <p
      className={`text-[9px] font-semibold uppercase tracking-[0.28em] sm:text-[10px] ${
        light ? "text-[#71866C]" : "text-[#71866C]"
      }`}
    >
      {children}
    </p>
  );
}

function ActionLink({ to, children, primary = false }) {
  return (
    <Link
      to={to}
      className={`group inline-flex min-h-[50px] items-center justify-center gap-3 border px-6 py-3 text-[9px] font-semibold uppercase tracking-[0.16em] transition duration-300 hover:-translate-y-0.5 sm:px-7 sm:text-[10px] ${
        primary
          ? "border-[#31543B] bg-[#31543B] text-white hover:bg-[#42684A] hover:shadow-lg"
          : "border-[#31543B]/25 bg-white/60 text-[#31543B] hover:border-[#B99A55] hover:bg-white"
      }`}
    >
      {children}
      {primary ? (
        <ArrowRight
          size={15}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      ) : (
        <ArrowUpRight
          size={15}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}

function QuickLinks() {
  return (
    <nav aria-label="Quick links" className="flex flex-wrap gap-x-5 gap-y-3">
      {NAV_LINKS.map(({ label, to, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.14em] text-[#536A55] transition-colors hover:text-[#B99A55]"
        >
          {Icon && <Icon size={12} strokeWidth={1.5} />}
          {label}
        </Link>
      ))}
    </nav>
  );
}

function DecorativeOrb() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-12 top-1/2 flex h-48 w-48 -translate-y-1/2 items-center justify-center rounded-full border border-[#B99A55]/25 sm:-right-16 sm:h-72 sm:w-72 lg:-right-24 lg:h-96 lg:w-96"
    >
      <div className="flex h-[72%] w-[72%] items-center justify-center rounded-full border border-[#B99A55]/20">
        <div className="flex h-[68%] w-[68%] items-center justify-center rounded-full border border-[#31543B]/10">
          <Gem
            size={64}
            strokeWidth={0.65}
            className="text-[#B99A55]/35 sm:h-20 sm:w-20"
          />
        </div>
      </div>
    </div>
  );
}

export default function CTA() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (event) => {
    if (window.matchMedia("(hover: none)").matches) return;

    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    setMouse({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  const resetMouse = () => setMouse({ x: 50, y: 50 });

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
      className="relative isolate overflow-hidden bg-[#F8F8F5] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      {/* White smoke background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(185,154,85,0.09), transparent 36%),
            radial-gradient(ellipse at top left, rgba(255,255,255,0.98), transparent 55%),
            radial-gradient(ellipse at bottom right, rgba(226,234,222,0.55), transparent 60%)
          `,
        }}
      />

      <div className="pointer-events-none absolute -left-40 top-1/4 -z-10 h-96 w-96 rounded-full bg-[#DCE6D9]/50 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-32 -z-10 h-[420px] w-[420px] rounded-full bg-[#E8DDBF]/35 blur-[110px]" />

      <div className="mx-auto max-w-7xl">
        <div
          {...reveal(isVisible)}
          className={`relative overflow-hidden border border-[#31543B]/15 bg-white/55 shadow-[0_30px_90px_rgba(49,84,59,0.08)] backdrop-blur-sm ${reveal(isVisible).className}`}
        >
          {/* Brand bar */}
          <div className="relative z-10 flex items-center justify-between gap-4 border-b border-[#31543B]/10 px-5 py-5 sm:px-8 lg:px-12">
            <Link to="/" className="flex items-center gap-3">
              <Sparkles
                size={16}
                strokeWidth={1.3}
                className="text-[#B99A55]"
              />
              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#31543B]">
                YAMA FLYS
              </span>
            </Link>

            <Eyebrow>Jewellery · Elegance · You</Eyebrow>
          </div>

          {/* Main layout */}
          <div className="relative grid lg:grid-cols-[0.8fr_1.2fr]">
            <DecorativeOrb />

            {/* Left introduction */}
            <div className="relative z-10 flex flex-col justify-between border-b border-[#31543B]/10 px-6 py-9 sm:px-9 sm:py-12 lg:border-b-0 lg:border-r lg:px-12 lg:py-14">
              <div {...reveal(isVisible, 100)}>
                <Eyebrow>01 / A personal touch</Eyebrow>

                <p className="mt-5 max-w-xs font-serif text-3xl leading-tight text-[#31543B] sm:text-4xl">
                  Every piece has
                  <span className="block italic text-[#71866C]">
                    a little magic.
                  </span>
                </p>
              </div>

              <div
                {...reveal(isVisible, 250)}
                className="my-9 flex items-center gap-4 lg:my-14"
              >
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center border border-[#B99A55]/40 bg-white/70 sm:h-20 sm:w-20">
                  <div className="absolute inset-2 border border-[#31543B]/10" />
                  <Gem size={29} strokeWidth={1} className="text-[#B99A55]" />
                </div>

                <div>
                  <p className="font-serif text-lg text-[#31543B]">
                    Made for your moments
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#667866]">
                    From everyday beauty to celebrations.
                  </p>
                </div>
              </div>

              <div {...reveal(isVisible, 350)}>
                <div className="mb-4 h-px w-14 bg-[#B99A55]" />
                <p className="max-w-xs text-xs leading-6 text-[#536A55]">
                  Find jewellery that complements your style and makes every
                  occasion feel a little more special.
                </p>
              </div>
            </div>

            {/* Right CTA */}
            <div className="relative z-10 flex items-center px-6 py-11 sm:px-9 sm:py-14 lg:px-14 lg:py-16">
              <div className="relative w-full">
                <div {...reveal(isVisible, 150)}>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-[#B99A55]" />
                    <Eyebrow light>Find your favourites</Eyebrow>
                  </div>
                </div>

                <div {...reveal(isVisible, 250)}>
                  <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.03] text-[#31543B] sm:text-5xl md:text-6xl lg:text-7xl">
                    Wear your
                    <span className="mt-1 block italic text-[#71866C]">
                      own story.
                    </span>
                  </h2>

                  <div className="mt-6 flex items-center gap-3">
                    <span className="h-px w-12 bg-[#B99A55]/70" />
                    <span className="text-[8px] uppercase tracking-[0.25em] text-[#71866C]">
                      YAMA FLYS COLLECTION
                    </span>
                  </div>
                </div>

                <div {...reveal(isVisible, 350)}>
                  <p className="mt-7 max-w-xl text-sm leading-7 text-[#536A55] sm:text-base sm:leading-8">
                    Explore elegant bangles and thoughtfully selected jewellery
                    designed to complement your outfits, celebrations, and
                    unforgettable moments.
                  </p>
                </div>

                <div
                  {...reveal(isVisible, 450)}
                  className="mt-8 flex flex-col gap-3 min-[430px]:flex-row min-[430px]:flex-wrap"
                >
                  <ActionLink to="/shop" primary>
                    <ShoppingBag size={15} />
                    Shop Bangles
                  </ActionLink>

                  <ActionLink to="/collections">
                    Explore Collections
                  </ActionLink>
                </div>

                <div {...reveal(isVisible, 550)} className="mt-9">
                  <div className="mb-5 h-px bg-[#31543B]/10" />
                  <QuickLinks />
                </div>

                <div
                  {...reveal(isVisible, 650)}
                  className="mt-8 flex items-center gap-3"
                >
                  <span className="h-px flex-1 bg-[#31543B]/10" />
                  <p className="text-center text-[8px] uppercase tracking-[0.2em] text-[#71866C] sm:text-[9px]">
                    Elegance for every occasion
                  </p>
                  <span className="h-px flex-1 bg-[#31543B]/10" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom edge */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#B99A55]/60 to-transparent" />
        </div>

        {/* Bottom navigation */}
        <div className="mt-7 flex justify-center">
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-[#536A55] transition-colors hover:text-[#B99A55]"
          >
            Find your next favourite
            <ArrowDownRight
              size={13}
              className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}


import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Leaf,
} from "lucide-react";
import { Link } from "react-router-dom";

const IMAGES = {
  promo: "/assets/promo-img.png",
  fallback: "/assets/Brand-img.jpeg",
};

const COLORS = {
  green: "#294B35",
  deepGreen: "#1D3828",
  sage: "#80977A",
  cream: "#FFFFFF",
  gold: "#B99A55",
  muted: "#6F796D",
};

const reveal = (visible, hidden = "translate-y-6") =>
  `transition-all duration-700 ease-out ${
    visible ? "translate-y-0 opacity-100" : `${hidden} opacity-0`
  }`;

function GoldLine({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`block h-px w-10 bg-[#B99A55] ${className}`}
    />
  );
}

function PromoImage({ visible }) {
  const [imageSrc, setImageSrc] = useState(IMAGES.promo);

  return (
    <Link
      to="/collections"
      aria-label="Explore YAMA FLYS collections"
      className={`group relative block min-h-[380px] overflow-hidden bg-[#F5F7F2] sm:min-h-[480px] lg:min-h-[570px] ${reveal(
        visible,
        "translate-x-5"
      )}`}
      style={{ transitionDelay: visible ? "150ms" : "0ms" }}
    >
      <img
        src={imageSrc}
        alt="Discover the YAMA FLYS bangle collection"
        loading="lazy"
        decoding="async"
        onError={() => {
          if (imageSrc !== IMAGES.fallback) {
            setImageSrc(IMAGES.fallback);
          }
        }}
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
      />

      {/* Soft white smoke overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/95 via-white/10 to-white/20"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-white/60 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-[#DCE8D7]/45 blur-3xl"
      />

      {/* Fine frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 border border-white/80 sm:inset-6"
      />

      {/* Image top label */}
      <div className="absolute left-8 right-8 top-8 z-10 flex items-center justify-between">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#294B35]">
            YAMA FLYS
          </p>
          <GoldLine className="mt-2" />
        </div>

        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#294B35]/20 bg-white/75 text-[#294B35] backdrop-blur-md transition-all duration-300 group-hover:bg-[#294B35] group-hover:text-white">
          <ArrowUpRight size={18} strokeWidth={1.5} />
        </span>
      </div>

      {/* Image caption */}
      <div className="absolute bottom-8 left-8 right-8 z-10 sm:bottom-10 sm:left-10">
        <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#718567]">
          THE SIGNATURE COLLECTION
        </p>

        <h3 className="mt-3 max-w-sm font-serif text-3xl leading-tight text-[#1D3828] sm:text-4xl">
          Grace in every detail.
          <span className="mt-1 block italic text-[#718567]">
            Beauty in every moment.
          </span>
        </h3>

        <span className="mt-5 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#294B35]">
          Discover the collection
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>

      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#B99A55] transition-all duration-500 group-hover:w-full"
      />
    </Link>
  );
}

export default function PromoBanner() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-white px-5 py-16 text-[#294B35] sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      {/* White smoke atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-32 -z-10 h-[420px] w-[420px] rounded-full bg-[#EAF0E6]/70 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-32 -z-10 h-[450px] w-[450px] rounded-full bg-[#F3EEE2]/75 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#B99A55]/60 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Small section heading */}
        <div className={`mb-10 text-center sm:mb-14 ${reveal(isVisible)}`}>
          <div className="mb-4 flex items-center justify-center gap-3">
            <GoldLine />
            <Sparkles size={15} className="text-[#B99A55]" />
            <GoldLine />
          </div>

          <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#718567] sm:text-[10px]">
            A little luxury, made for you
          </p>

          <h2 className="mt-4 font-serif text-3xl leading-tight text-[#1D3828] sm:text-4xl md:text-5xl">
            Celebrate your own
            <span className="ml-2 italic text-[#80977A]">
              kind of beauty.
            </span>
          </h2>
        </div>

        {/* Main editorial panel */}
        <div className="grid overflow-hidden rounded-[28px] border border-[#E5E9DF] bg-white/80 shadow-[0_20px_70px_rgba(41,75,53,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
          {/* Text panel */}
          <div className="relative flex items-center px-7 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-[#E8EFE3]/80 blur-3xl"
            />

            <div className="relative z-10 max-w-xl">
              <div className={reveal(isVisible)}>
                <div className="mb-7 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#DCE5D6] bg-[#F1F5ED]">
                    <Leaf
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#526F4D]"
                    />
                  </span>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#718567]">
                      YAMA FLYS
                    </p>
                    <GoldLine className="mt-2 w-8" />
                  </div>
                </div>

                <h3 className="font-serif text-4xl leading-[1.12] text-[#1D3828] sm:text-5xl md:text-6xl">
                  Your style.
                  <span className="mt-2 block italic text-[#80977A]">
                    Your story.
                  </span>
                </h3>

                <GoldLine className="mt-7 w-14" />

                <p className="mt-6 max-w-md text-sm leading-7 text-[#6F796D] sm:text-base sm:leading-8">
                  Discover beautifully selected bangles that bring a graceful
                  finishing touch to your everyday looks and special
                  celebrations.
                </p>
              </div>

              <div
                className={`mt-8 flex flex-wrap items-center gap-4 ${reveal(isVisible)}`}
                style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
              >
                <Link
                  to="/collections"
                  className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#294B35] px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.17em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1D3828] hover:shadow-lg"
                >
                  Explore Collections
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#526F4D] transition-colors hover:text-[#B99A55]"
                >
                  Our Story
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              <div
                className={`mt-8 flex items-center gap-3 ${reveal(isVisible)}`}
                style={{ transitionDelay: isVisible ? "250ms" : "0ms" }}
              >
                <GoldLine className="w-7" />
                <p className="text-xs italic text-[#7B8577]">
                  Beautifully chosen. Uniquely yours.
                </p>
              </div>
            </div>
          </div>

          {/* Image panel */}
          <PromoImage visible={isVisible} />
        </div>

        {/* Bottom signature */}
        <div
          className={`mt-8 flex items-center justify-center gap-4 ${reveal(isVisible)}`}
        >
          <span className="h-px w-10 bg-[#DCE3D7] sm:w-16" />
          <p className="font-serif text-xs italic text-[#718567] sm:text-sm">
            Elegance that feels like you
          </p>
          <span className="h-px w-10 bg-[#DCE3D7] sm:w-16" />
        </div>
      </div>
    </section>
  );
}

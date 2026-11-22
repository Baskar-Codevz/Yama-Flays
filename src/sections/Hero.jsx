
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Volume2,
  VolumeX,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 100);
    return () => window.clearTimeout(timer);
  }, []);

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);

    if (!nextMuted) {
      try {
        await video.play();
      } catch {
        video.muted = true;
        setMuted(true);
      }
    }
  };

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate mt-0 min-h-[760px] overflow-hidden bg-[#10271E] text-[#F8F2E6] sm:min-h-[800px] lg:min-h-[100svh]"
    >
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 -z-20 overflow-hidden bg-[#10271E]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          poster="/assets/bg-image.png"
          aria-hidden="true"
          className={`h-full w-full object-cover object-center transition-opacity duration-1000 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/assets/video1.mp4" type="video/mp4" />
        </video>

        {!videoReady && (
          <img
            src="/assets/bg-image.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>

      {/* CINEMATIC OVERLAYS */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[#071B12]/15" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#071B12]/70 via-[#10271E]/30 to-[#10271E]/5" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#071B12]/45 via-transparent to-[#071B12]/10" />

      {/* AMBIENT GOLD LIGHT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 -z-10 h-[380px] w-[380px] rounded-full bg-[#C9AA69]/10 blur-[120px] sm:h-[500px] sm:w-[500px]"
      />

      {/* HERO CONTENT */}
      <div className="relative mx-auto flex min-h-[760px] max-w-[1600px] items-center px-5 pb-28 pt-36 sm:min-h-[800px] sm:px-10 sm:pb-32 sm:pt-40 lg:min-h-[100svh] lg:px-20 lg:pb-28 lg:pt-40 xl:px-28">
        <div
          className={`w-full max-w-[950px] transition-all duration-1000 ease-out ${
            loaded
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {/* BRAND EYEBROW */}
          <div className="mb-8 flex items-center gap-4 sm:mb-10">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D9C28D]/50 bg-[#D9C28D]/10 text-[#E7D2A0] backdrop-blur-md">
              <Sparkles size={19} strokeWidth={1.3} />
            </span>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#E7D2A0] sm:text-xs">
                YAMA FLAYS
              </p>
              <p className="mt-1.5 text-[8px] uppercase tracking-[0.25em] text-white/75 sm:text-[9px]">
                Jewellery · Elegance · You
              </p>
            </div>

            <span className="h-px w-10 bg-[#D9C28D]/70 sm:w-16" />
          </div>

          {/* PREMIUM HEADING */}
          <h1
            id="hero-title"
            className="max-w-[1050px] font-serif text-[clamp(3.4rem,8.7vw,8.3rem)] font-normal leading-[0.88] tracking-[-0.065em] text-[#FFF9EF]"
          >
            Adorn your
            <br />
            moments with
            <br />
            <span className="italic text-[#E0C78D]">
              a little magic.
            </span>
          </h1>

          {/* LUXURY BRAND QUOTE */}
          <p className="mt-7 max-w-[500px] font-serif text-lg italic leading-relaxed text-[#E8D5A7] sm:mt-8 sm:text-xl">
            “Adorn your moments. Treasure your elegance.”
          </p>

          {/* DESCRIPTION */}
          <p className="mt-4 max-w-[490px] text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            Discover exquisite bangles crafted to complement your every
            moment. From celebratory occasions to everyday elegance,
            find the details that make every look unforgettable.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <Link
              to="/shop"
              className="group inline-flex min-h-[56px] items-center justify-center gap-5 rounded-full bg-[#D9C28D] px-7 text-[10px] font-bold uppercase tracking-[0.17em] text-[#10271E] shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:bg-[#F0DDAE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#10271E]"
            >
              Discover Bangles
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#10271E]/10 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={15} />
              </span>
            </Link>

            <Link
              to="/collections"
              className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-full border border-white/40 bg-white/[0.06] px-7 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#D9C28D] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9C28D]"
            >
              Explore Collections
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* BRAND SIGNATURE */}
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/20 pt-5 sm:mt-14 sm:gap-x-10 sm:pt-6">
            {[
              { title: "Timeless", subtitle: "Designs" },
              { title: "Beautiful", subtitle: "Details" },
              { title: "Uniquely", subtitle: "Yours" },
            ].map((item, index) => (
              <div key={item.title} className="flex items-center gap-x-7 sm:gap-x-10">
                {index > 0 && (
                  <span className="h-10 w-px bg-white/20" />
                )}

                <div>
                  <p className="font-serif text-lg text-[#E0C78D] sm:text-xl">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[8px] uppercase tracking-[0.19em] text-white/65 sm:text-[9px]">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VIDEO SOUND CONTROL */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Turn video sound on" : "Mute video"}
        className="absolute right-4 top-36 z-20 inline-flex h-10 items-center gap-2 rounded-full border border-white/25 bg-black/25 px-3 text-white backdrop-blur-lg transition hover:border-[#D9C28D] hover:text-[#E7D2A0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9C28D] sm:right-8 sm:top-36 sm:h-11 sm:px-4 lg:top-40"
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        <span className="text-[9px] font-medium uppercase tracking-[0.15em]">
          {muted ? "Sound off" : "Sound on"}
        </span>
      </button>

      {/* VIDEO STATUS */}
      <div className="absolute right-5 top-[184px] z-10 hidden items-center gap-2 text-[8px] uppercase tracking-[0.2em] text-white/65 sm:flex sm:right-8 sm:top-[194px] lg:top-[198px]">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            videoReady ? "bg-[#D9C28D]" : "bg-white/40"
          }`}
        />
        {videoReady ? "The Yama experience" : "Loading visual"}
      </div>

      {/* SCROLL CUE */}
      <a
        href="#experience"
        aria-label="Scroll to discover more"
        className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/20 bg-[#10271E]/50 px-5 py-3 text-[8px] font-medium uppercase tracking-[0.24em] text-white/80 backdrop-blur-md transition hover:border-[#D9C28D] hover:text-[#E7D2A0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9C28D] sm:bottom-7"
      >
        <span>Scroll to discover</span>
        <ArrowDown size={13} />
      </a>

      {/* RIGHT EDGE BRAND DETAIL */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-32 right-5 hidden items-center gap-3 [writing-mode:vertical-rl] text-[8px] uppercase tracking-[0.3em] text-white/50 xl:flex"
      >
        <span className="h-10 w-px bg-[#D9C28D]/60" />
        Pretty things · Happy you
      </div>
    </section>
  );
};

export default Hero;

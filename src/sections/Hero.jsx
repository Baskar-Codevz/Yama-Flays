import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const imageRef = useRef(null);
  const glowRef = useRef(null);
  const frameRef = useRef(null);

  /* =====================================================
     MOUSE PARALLAX
  ===================================================== */

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (frameRef.current) return;

      frameRef.current = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 10;
        const y = (event.clientY / window.innerHeight - 0.5) * 10;

        if (imageRef.current) {
          imageRef.current.style.transform = `
            scale(1.06)
            translate3d(${x / 3}px, ${y / 3}px, 0)
          `;
        }

        if (glowRef.current) {
          glowRef.current.style.transform = `
            translate3d(${x * 2}px, ${y * 2}px, 0)
          `;
        }

        frameRef.current = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section
      className="
        relative
        mt-[101px]
        min-h-[calc(100svh-101px)]
        overflow-hidden
        bg-[#F7F1F3]
        text-[#352529]
        sm:mt-[105px]
        sm:min-h-[calc(100svh-105px)]
        md:mt-[108px]
        md:min-h-[calc(100svh-108px)]
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src="/assets/bg-image.png"
          alt="YAMA FLYS luxury bangles"
          className="
            h-full
            w-full
            scale-[1.04]
            object-cover
            object-[65%_center]
            opacity-[0.82]
            transition-transform
            duration-700
            ease-out
            sm:object-center
          "
        />

        {/* Soft luxury overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#F7F1F3]/[0.98]
            via-[#F7F1F3]/[0.78]
            to-[#F7F1F3]/[0.18]
            sm:from-[#F7F1F3]/[0.96]
            sm:via-[#F7F1F3]/[0.68]
            sm:to-transparent
          "
        />

        {/* Bottom fade */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#F7F1F3]
            via-transparent
            to-[#F7F1F3]/10
          "
        />

        {/* Subtle pink atmosphere */}

        <div
          className="
            absolute
            inset-0
            bg-[#B67888]/[0.035]
            mix-blend-multiply
          "
        />
      </div>

      {/* =====================================================
          SOFT GOLD GLOW
      ===================================================== */}

      <div
        ref={glowRef}
        className="
          pointer-events-none
          absolute
          left-[70%]
          top-[42%]
          h-[260px]
          w-[260px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#C7A45B]/10
          blur-[80px]
          transition-transform
          duration-700
          sm:h-[350px]
          sm:w-[350px]
          lg:h-[420px]
          lg:w-[420px]
          lg:blur-[100px]
        "
      />

      {/* =====================================================
          DECORATIVE LINE
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-[8%]
          top-[15%]
          hidden
          h-[70%]
          w-px
          bg-gradient-to-b
          from-transparent
          via-[#C7A45B]/30
          to-transparent
          lg:block
        "
      />

      {/* =====================================================
          SMALL TOP LABEL
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-[11%]
          top-[17%]
          hidden
          lg:block
        "
      >
        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.4em]
            text-[#9A7350]/60
          "
        >
          YAMA FLYS
        </span>
      </div>

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100svh-101px)]
          max-w-[1600px]
          items-center
          px-5
          py-16
          sm:min-h-[calc(100svh-105px)]
          sm:px-8
          sm:py-20
          md:min-h-[calc(100svh-108px)]
          md:px-12
          lg:px-16
          lg:py-20
          xl:px-24
        "
      >
        <div className="w-full max-w-4xl">
          {/* =================================================
              EYEBROW
          ================================================= */}

          <div className="mb-5 flex items-center gap-3 sm:mb-7 sm:gap-4">
            <span className="h-px w-7 bg-[#C7A45B] sm:w-10" />

            <span
              className="
                text-[8px]
                font-medium
                uppercase
                tracking-[0.28em]
                text-[#9A7350]
                sm:text-[10px]
                sm:tracking-[0.4em]
              "
            >
              YAMA FLYS JEWELLERY
            </span>
          </div>

          {/* =================================================
              MAIN TITLE
          ================================================= */}

          <h1
            className="
              max-w-5xl
              font-serif
              text-[3rem]
              leading-[0.94]
              tracking-[-0.04em]
              text-[#352529]
              sm:text-6xl
              md:text-7xl
              lg:text-[6.5rem]
              xl:text-[7.2rem]
            "
          >
            Elegance
            <br />
            <span className="italic text-[#B67888]">Around Every Wrist</span>
          </h1>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className="
              mt-6
              max-w-[540px]
              text-[13px]
              leading-6
              text-[#6F5B61]
              sm:mt-7
              sm:text-base
              sm:leading-8
              lg:text-lg
            "
          >
            Discover beautifully crafted bangles designed to celebrate weddings,
            festivals, special moments, and everyday elegance.
          </p>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div
            className="
              mt-8
              flex
              w-full
              flex-col
              gap-3
              sm:mt-9
              sm:w-auto
              sm:flex-row
            "
          >
            {/* SHOP BUTTON */}

            <Link
              to="/shop"
              className="
                group
                inline-flex
                min-h-[50px]
                w-full
                items-center
                justify-center
                gap-3
                bg-[#493238]
                px-6
                py-3.5
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-white
                transition-all
                duration-300
                hover:bg-[#5B3E45]
                hover:shadow-[0_15px_40px_rgba(73,50,56,0.20)]
                sm:w-auto
                sm:px-7
                sm:text-[10px]
              "
            >
              Shop Bangles
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>

            {/* COLLECTION BUTTON */}

            <Link
              to="/collections"
              className="
                group
                inline-flex
                min-h-[50px]
                w-full
                items-center
                justify-center
                gap-3
                border
                border-[#B67888]/40
                bg-white/40
                px-6
                py-3.5
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#493238]
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-[#B67888]
                hover:bg-[#B67888]/10
                sm:w-auto
                sm:px-7
                sm:text-[10px]
              "
            >
              Explore Collection
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>

          {/* =================================================
              ABOUT LINK
          ================================================= */}

          <Link
            to="/about"
            className="
              group
              mt-7
              inline-flex
              max-w-full
              items-center
              gap-3
              text-[11px]
              text-[#6F5B61]
              transition-colors
              duration-300
              hover:text-[#B67888]
              sm:mt-8
              sm:text-xs
            "
          >
            <span>Discover the YAMA FLYS story</span>

            <span
              className="
                h-px
                w-7
                shrink-0
                bg-[#C7A45B]/60
                transition-all
                duration-300
                group-hover:w-11
              "
            />
          </Link>
        </div>
      </div>

      {/* =====================================================
          RIGHT SIDE BRAND TEXT
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-16
          right-8
          z-10
          hidden
          flex-col
          items-center
          gap-3
          lg:flex
        "
      >
        <span
          className="
            rotate-180
            text-[8px]
            uppercase
            tracking-[0.4em]
            text-[#9A7350]/60
            [writing-mode:vertical-rl]
          "
        >
          Handcrafted Elegance
        </span>

        <span
          className="
            h-12
            w-px
            bg-[#C7A45B]/30
          "
        />
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      <a
        href="#experience"
        className="
          group
          absolute
          bottom-5
          left-1/2
          z-20
          flex
          -translate-x-1/2
          flex-col
          items-center
          gap-1.5
          text-[7px]
          uppercase
          tracking-[0.28em]
          text-[#6F5B61]/60
          transition-colors
          duration-300
          hover:text-[#B67888]
          sm:bottom-6
          sm:gap-2
          sm:text-[8px]
        "
      >
        <span>Scroll</span>

        <ChevronDown
          size={15}
          strokeWidth={1.2}
          className="
            transition-transform
            duration-300
            group-hover:translate-y-1
          "
        />
      </a>

      {/* =====================================================
          EXPERIENCE ANCHOR
      ===================================================== */}

      <div id="experience" className="absolute bottom-0" />
    </section>
  );
};

export default Hero;

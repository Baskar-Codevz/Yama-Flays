import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const About = () => {
  return (
    <main className="min-h-screen bg-[#faf8f4] text-[#211b17]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f3eee7] px-6 py-24 md:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#8c7b6d]">
              About YAMA FLAYS
            </p>

            <h1 className="font-serif text-5xl leading-tight md:text-6xl lg:text-7xl">
              Elegance That Completes
              <span className="block italic text-[#8c6f5a]">
                Every Occasion
              </span>
            </h1>

            <div className="mt-8 h-px w-20 bg-[#211b17]" />

            <p className="mt-8 max-w-2xl text-sm leading-7 text-[#756a61] md:text-base">
              Discover the world of YAMA FLAYS, a bangle brand based in Tamil
              Nadu, created for women who appreciate beautiful designs, timeless
              elegance, and jewellery that adds a special touch to every
              occasion.
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#d8cdc1] md:h-96 md:w-96" />
        <div className="pointer-events-none absolute -bottom-32 -right-10 h-72 w-72 rounded-full border border-[#d8cdc1] md:h-[28rem] md:w-[28rem]" />
      </section>

      {/* Brand Introduction */}
      <section className="px-6 py-20 md:px-10 md:py-28 lg:px-16">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden bg-[#eee7de]">
              <img
                src="/assets/img-1.webp"
                alt="YAMA FLYS bangle collection"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="absolute -bottom-6 -right-4 hidden h-28 w-28 border border-[#cfc1b4] md:block" />
          </div>

          {/* Content */}
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#8c7b6d]">
              Our Brand
            </p>

            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              The Beauty of
              <span className="block italic text-[#8c6f5a]">
                Beautiful Details
              </span>
            </h2>

            <div className="mt-6 h-px w-14 bg-[#211b17]" />

            <p className="mt-7 text-sm leading-7 text-[#756a61] md:text-base">
              YAMA FLAYS is a bangle-focused brand offering a collection of
              designs for different styles and occasions. From elegant everyday
              pieces to designs suited for celebrations, our collection brings
              together a variety of looks in one place.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#756a61] md:text-base">
              Our goal is to make it easy for you to discover bangles that
              complement your personal style and add an elegant finishing touch
              to your look.
            </p>

            <Link
              to="/"
              className="group mt-8 inline-flex items-center gap-3 border border-[#211b17] px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#211b17] hover:text-white"
            >
              Explore Collection
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Details */}
      <section className="border-y border-[#e5ddd4] bg-white px-6 py-20 md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <Sparkles
              size={22}
              strokeWidth={1.2}
              className="mx-auto mb-5 text-[#8c6f5a]"
            />

            <p className="text-xs uppercase tracking-[0.3em] text-[#8c7b6d]">
              YAMA FLAYS
            </p>

            <h2 className="mt-4 font-serif text-4xl md:text-5xl">
              Designed for Every Moment
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden border border-[#e5ddd4] bg-[#e5ddd4] md:grid-cols-3">
            <div className="bg-white px-7 py-10 text-center">
              <span className="font-serif text-4xl text-[#8c6f5a]">01</span>

              <h3 className="mt-5 text-sm font-medium uppercase tracking-[0.15em]">
                Everyday Elegance
              </h3>

              <p className="mt-4 text-sm leading-6 text-[#756a61]">
                Discover designs that can complement your everyday style.
              </p>
            </div>

            <div className="bg-white px-7 py-10 text-center">
              <span className="font-serif text-4xl text-[#8c6f5a]">02</span>

              <h3 className="mt-5 text-sm font-medium uppercase tracking-[0.15em]">
                Special Occasions
              </h3>

              <p className="mt-4 text-sm leading-6 text-[#756a61]">
                Explore statement designs for celebrations and memorable
                occasions.
              </p>
            </div>

            <div className="bg-white px-7 py-10 text-center">
              <span className="font-serif text-4xl text-[#8c6f5a]">03</span>

              <h3 className="mt-5 text-sm font-medium uppercase tracking-[0.15em]">
                Personal Style
              </h3>

              <p className="mt-4 text-sm leading-6 text-[#756a61]">
                Find designs that match your individual taste and personality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location / Brand Information */}
      <section className="px-6 py-20 md:px-10 md:py-28 lg:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8c7b6d]">
            Based in Tamil Nadu
          </p>

          <h2 className="mt-5 font-serif text-4xl md:text-5xl">YAMA FLAYS</h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#756a61] md:text-base">
            YAMA FLAYS is a proprietorship business registered in Tamil Nadu,
            offering bangle designs through its collection and online presence.
          </p>

          <div className="mx-auto mt-10 max-w-md border border-[#e5ddd4] bg-white p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-[#9a8b7e]">
              Our Location
            </p>

            <p className="mt-4 text-sm leading-7 text-[#756a61]">
              Thirunavallur, Maranodai
              <br />
              Kallakurichi, Tamil Nadu
              <br />
              607204
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#211b17] px-6 py-20 text-center text-white md:px-10 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#c8b9aa]">
            Discover YAMA FLAYS
          </p>

          <h2 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">
            Find a Bangle That
            <span className="block italic text-[#d8c8b8]">Feels Like You</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#c8beb5]">
            Explore our collection and discover designs made to complement your
            style.
          </p>

          <Link
            to="/shop"
            className="group mt-8 inline-flex items-center gap-3 bg-white px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#211b17] transition-all duration-300 hover:bg-[#e8ded4]"
          >
            Shop Bangles
            <ArrowRight
              size={16}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;

import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";

const Footer = () => {
  const instagramUrl =
    "https://www.instagram.com/sharlin_desings?stkn=YnlkbmVwcGJ6NW5r";

  const youtubeUrl = "https://m.youtube.com/@sharlin-Designs08";

  const phoneNumber = "7548863591";

  const whatsappUrl = `https://wa.me/91${phoneNumber}`;

  /* =====================================================
     SCROLL TO TOP
  ===================================================== */

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-[#F3E3E7] text-[#2C211B]">
      {/* =====================================================
          BACKGROUND DECOR
      ===================================================== */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#D8AAB8]/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-[#C9A227]/10 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[75%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#9A7656]/30 to-transparent" />

      <div className="pointer-events-none absolute -bottom-24 -left-24 h-60 w-60 rounded-full border border-[#9A7656]/10" />

      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full border border-[#9A7656]/10" />

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 md:py-20 lg:px-12 xl:px-16">
        {/* =================================================
            BRAND INTRO
        ================================================= */}

        <div className="grid gap-10 border-b border-[#6B5148]/15 pb-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#9A7656]/30 bg-white/40">
                <Sparkles
                  size={17}
                  strokeWidth={1.3}
                  className="text-[#9A7656]"
                />
              </div>

              <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#806044]">
                YAMA FLYS
              </span>
            </div>

            <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.08] text-[#2C211B] sm:text-5xl md:text-6xl">
              Elegance in
              <span className="ml-2 italic text-[#9A7656]">Every Detail</span>
            </h2>

            <div className="mt-6 h-[2px] w-14 bg-[#9A7656]" />
          </div>

          <div className="lg:text-right">
            <p className="ml-auto max-w-md text-sm leading-7 text-[#685952]">
              Discover beautiful bangles and accessories designed to add a
              graceful finishing touch to your style.
            </p>

            <Link
              to="/shop"
              onClick={scrollToTop}
              className="group mt-6 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#806044] transition-colors duration-300 hover:text-[#2C211B]"
            >
              <span>Discover the Collection</span>

              <ArrowUpRight
                size={14}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* =====================================================
            FOOTER GRID
        ===================================================== */}

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* =================================================
              CONNECT
          ================================================= */}

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#806044]">
              Connect With Us
            </p>

            <p className="mt-5 max-w-xs text-sm leading-7 text-[#685952]">
              Follow YAMA FLYS for new designs, collection updates, and more.
            </p>

            <div className="mt-7 flex gap-3">
              {/* Instagram */}

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YAMA FLYS Instagram"
                className="group/social flex h-11 w-11 items-center justify-center rounded-full border border-[#6B5148]/20 bg-white/45 text-[#806044] transition-all duration-300 hover:-translate-y-1 hover:border-[#9A7656] hover:bg-[#9A7656] hover:text-white"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />

                  <circle cx="12" cy="12" r="4" />

                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>

              {/* YouTube */}

              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YAMA FLYS YouTube"
                className="group/social flex h-11 w-11 items-center justify-center rounded-full border border-[#6B5148]/20 bg-white/45 text-[#806044] transition-all duration-300 hover:-translate-y-1 hover:border-[#9A7656] hover:bg-[#9A7656] hover:text-white"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.8 31.8 0 0 0 0 12a31.8 31.8 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.8 31.8 0 0 0 24 12a31.8 31.8 0 0 0-.5-5.8Z" />

                  <path d="m9.75 15.5 6-3.5-6-3.5v7Z" fill="#F3E3E7" />
                </svg>
              </a>

              {/* WhatsApp */}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YAMA FLYS WhatsApp"
                className="group/social flex h-11 w-11 items-center justify-center rounded-full border border-[#6B5148]/20 bg-white/45 text-[#806044] transition-all duration-300 hover:-translate-y-1 hover:border-[#9A7656] hover:bg-[#9A7656] hover:text-white"
              >
                <MessageCircle
                  size={18}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-hover/social:scale-110"
                />
              </a>
            </div>
          </div>

          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#806044]">
              Quick Links
            </p>

            <nav className="mt-6 space-y-4">
              <Link
                to="/"
                onClick={scrollToTop}
                className="group/link flex w-fit items-center gap-2 text-sm text-[#685952] transition-colors duration-300 hover:text-[#2C211B]"
              >
                Home
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.4}
                  className="opacity-0 transition-all duration-300 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-hover/link:opacity-100"
                />
              </Link>

              <Link
                to="/shop"
                onClick={scrollToTop}
                className="group/link flex w-fit items-center gap-2 text-sm text-[#685952] transition-colors duration-300 hover:text-[#2C211B]"
              >
                Shop Bangles
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.4}
                  className="opacity-0 transition-all duration-300 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-hover/link:opacity-100"
                />
              </Link>

              <Link
                to="/collections"
                onClick={scrollToTop}
                className="group/link flex w-fit items-center gap-2 text-sm text-[#685952] transition-colors duration-300 hover:text-[#2C211B]"
              >
                Collections
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.4}
                  className="opacity-0 transition-all duration-300 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-hover/link:opacity-100"
                />
              </Link>

              <Link
                to="/about"
                onClick={scrollToTop}
                className="group/link flex w-fit items-center gap-2 text-sm text-[#685952] transition-colors duration-300 hover:text-[#2C211B]"
              >
                About Us
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.4}
                  className="opacity-0 transition-all duration-300 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-hover/link:opacity-100"
                />
              </Link>

              <Link
                to="/contact"
                onClick={scrollToTop}
                className="group/link flex w-fit items-center gap-2 text-sm text-[#685952] transition-colors duration-300 hover:text-[#2C211B]"
              >
                Contact Us
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.4}
                  className="opacity-0 transition-all duration-300 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-hover/link:opacity-100"
                />
              </Link>
            </nav>
          </div>

          {/* =================================================
              DISCOVER
          ================================================= */}

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#806044]">
              Discover
            </p>

            <nav className="mt-6 space-y-4">
              <Link
                to="/shop"
                onClick={scrollToTop}
                className="group/link flex w-fit items-center gap-2 text-sm text-[#685952] transition-colors duration-300 hover:text-[#2C211B]"
              >
                All Bangles
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.4}
                  className="opacity-0 transition-all duration-300 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-hover/link:opacity-100"
                />
              </Link>

              <Link
                to="/collections#top-selling"
                className="group/link flex w-fit items-center gap-2 text-sm text-[#685952] transition-colors duration-300 hover:text-[#2C211B]"
              >
                Best Sellers
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.4}
                  className="opacity-0 transition-all duration-300 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-hover/link:opacity-100"
                />
              </Link>

              <Link
                to="/collections#new-launch"
                className="group/link flex w-fit items-center gap-2 text-sm text-[#685952] transition-colors duration-300 hover:text-[#2C211B]"
              >
                New Launch
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.4}
                  className="opacity-0 transition-all duration-300 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-hover/link:opacity-100"
                />
              </Link>

              <Link
                to="/collections#wedding-collection"
                className="group/link flex w-fit items-center gap-2 text-sm text-[#685952] transition-colors duration-300 hover:text-[#2C211B]"
              >
                Wedding Collection
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.4}
                  className="opacity-0 transition-all duration-300 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-hover/link:opacity-100"
                />
              </Link>
            </nav>
          </div>

          {/* =================================================
              CONTACT
          ================================================= */}

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#806044]">
              Contact
            </p>

            <div className="mt-6 space-y-5 text-sm leading-6 text-[#685952]">
              {/* PHONE */}

              <a
                href={`tel:+91${phoneNumber}`}
                className="group/contact flex items-start gap-3 transition-colors duration-300 hover:text-[#2C211B]"
              >
                <Phone
                  size={17}
                  strokeWidth={1.4}
                  className="mt-0.5 shrink-0 text-[#9A7656] transition-transform duration-300 group-hover/contact:scale-110"
                />

                <span>+91 {phoneNumber}</span>
              </a>

              {/* EMAIL */}

              <a
                href="mailto:janumy686@gmail.com"
                className="group/contact flex items-start gap-3 transition-colors duration-300 hover:text-[#2C211B]"
              >
                <Mail
                  size={17}
                  strokeWidth={1.4}
                  className="mt-0.5 shrink-0 text-[#9A7656] transition-transform duration-300 group-hover/contact:scale-110"
                />

                <span className="break-all">janumy686@gmail.com</span>
              </a>

              {/* WHATSAPP */}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/contact flex items-start gap-3 transition-colors duration-300 hover:text-[#2C211B]"
              >
                <MessageCircle
                  size={17}
                  strokeWidth={1.4}
                  className="mt-0.5 shrink-0 text-[#9A7656] transition-transform duration-300 group-hover/contact:scale-110"
                />

                <span>Chat on WhatsApp</span>
              </a>

              {/* ADDRESS */}

              <div className="flex items-start gap-3">
                <MapPin
                  size={17}
                  strokeWidth={1.4}
                  className="mt-0.5 shrink-0 text-[#9A7656]"
                />

                <p>
                  No. 4/1301, Madha Kovil Street,
                  <br />
                  Near Vinnarasi Madha Church,
                  <br />
                  Thirunavallur, Maranodai,
                  <br />
                  Kallakurichi,
                  <br />
                  Tamil Nadu - 607204
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            CONTACT CTA STRIP
        ===================================================== */}

        <div className="border-y border-[#6B5148]/15 py-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-serif text-xl text-[#2C211B] sm:text-2xl">
                Looking for the perfect bangle?
              </p>

              <p className="mt-1 text-xs leading-6 text-[#806F68]">
                Explore our collection or get in touch with us.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {/* SHOP NOW */}

              <Link
                to="/shop"
                onClick={scrollToTop}
                className="group/shop inline-flex items-center gap-2 bg-[#9A7656] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#806044]"
              >
                Shop Now
                <ArrowRight
                  size={14}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-hover/shop:translate-x-1"
                />
              </Link>

              {/* CONTACT US */}

              <Link
                to="/contact"
                onClick={scrollToTop}
                className="group/contact inline-flex items-center gap-2 border border-[#806044]/40 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#685952] transition-all duration-300 hover:-translate-y-1 hover:border-[#9A7656] hover:text-[#806044]"
              >
                Contact Us
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-hover/contact:-translate-y-1 group-hover/contact:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM FOOTER
        ===================================================== */}

        <div className="flex flex-col gap-5 pt-8 text-center sm:text-left md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs text-[#806F68]">
              © {new Date().getFullYear()} YAMA FLYS. All rights reserved.
            </p>

            <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-[#9A8881]">
              Elegance for Every Occasion
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-end">
            <span className="text-xs text-[#8F7D76]">Privacy Policy</span>

            <span className="h-4 w-px bg-[#6B5148]/20" />

            <span className="text-xs text-[#8F7D76]">Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

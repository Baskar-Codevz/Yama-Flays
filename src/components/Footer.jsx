
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
  const phoneNumber = "7548863591";
  const instagramUrl =
    "https://www.instagram.com/sharlin_desings?stkn=YnlkbmVwcGJ6NW5r";
  const youtubeUrl = "https://m.youtube.com/@sharlin-Designs08";
  const whatsappUrl = `https://wa.me/91${phoneNumber}`;

  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "Shop Bangles", to: "/shop" },
    { label: "Collections", to: "/collections" },
    { label: "About Us", to: "/about" },
    { label: "Contact Us", to: "/contact" },
  ];

  const discoverLinks = [
    { label: "All Bangles", to: "/shop" },
    { label: "Best Sellers", to: "/collections#top-selling" },
    { label: "New Launch", to: "/collections#new-launch" },
    {
      label: "Wedding Collection",
      to: "/collections#wedding-collection",
    },
  ];

  const socialLinks = [
    {
      label: "Instagram",
      href: instagramUrl,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-[18px] w-[18px]"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      href: youtubeUrl,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-[18px] w-[18px]"
          aria-hidden="true"
        >
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.8 31.8 0 0 0 0 12a31.8 31.8 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.8 31.8 0 0 0 24 12a31.8 31.8 0 0 0-.5-5.8Z" />
          <path d="m9.75 15.5 6-3.5-6-3.5v7Z" fill="#12372B" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: whatsappUrl,
      icon: <MessageCircle size={18} strokeWidth={1.5} />,
    },
  ];

  const contactItems = [
    {
      label: `+91 ${phoneNumber}`,
      href: `tel:+91${phoneNumber}`,
      icon: Phone,
    },
    {
      label: "janumy686@gmail.com",
      href: "mailto:janumy686@gmail.com",
      icon: Mail,
    },
    {
      label: "Chat on WhatsApp",
      href: whatsappUrl,
      icon: MessageCircle,
      external: true,
    },
  ];

  const linkClass =
    "group flex w-fit items-center gap-2 text-sm text-white/60 transition-colors duration-300 hover:text-[#D8BD78]";

  const arrowClass =
    "h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100";

  const headingClass =
    "text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D8BD78]";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const FooterLinks = ({ title, links }) => (
    <div>
      <h3 className={headingClass}>{title}</h3>

      <nav className="mt-6 space-y-4" aria-label={title}>
        {links.map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            onClick={scrollToTop}
            className={linkClass}
          >
            {label}
            <ArrowUpRight className={arrowClass} />
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <footer className="relative isolate overflow-hidden border-t border-[#D8BD78]/20 bg-[#10271E] text-white">
      {/* Ambient green and gold lighting */}
      <div className="pointer-events-none absolute -left-40 -top-32 h-[400px] w-[400px] rounded-full bg-emerald-400/[0.08] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-[440px] w-[440px] rounded-full bg-[#C9A227]/[0.08] blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.025] via-transparent to-black/[0.12]" />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-16 lg:px-12">
        {/* Brand introduction */}
        <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8BD78]/30 bg-white/[0.04] text-[#D8BD78] backdrop-blur-md">
                <Sparkles size={17} strokeWidth={1.3} />
              </div>

              <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#D8BD78]">
                YAMA FLYS
              </span>
            </div>

            <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
              Elegance in
              <span className="ml-2 italic text-[#D8BD78]">
                Every Detail
              </span>
            </h2>

            <div className="mt-5 h-px w-14 bg-[#C9A227]" />
          </div>

          <div className="lg:text-right">
            <p className="ml-auto max-w-md text-sm leading-7 text-white/60">
              Discover beautiful bangles and accessories designed to add a
              graceful finishing touch to your style.
            </p>

            <Link
              to="/shop"
              onClick={scrollToTop}
              className="group mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D8BD78] transition-colors hover:text-white"
            >
              Discover the Collection
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Footer navigation */}
        <div className="grid gap-10 border-b border-white/10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Social links */}
          <div>
            <h3 className={headingClass}>Connect With Us</h3>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/55">
              Follow YAMA FLYS for new designs, collection updates, and more.
            </p>

            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`YAMA FLYS ${label}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/70 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#D8BD78]/60 hover:bg-[#D8BD78] hover:text-[#10271E]"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <FooterLinks title="Quick Links" links={quickLinks} />
          <FooterLinks title="Discover" links={discoverLinks} />

          {/* Contact information */}
          <div>
            <h3 className={headingClass}>Contact</h3>

            <div className="mt-6 space-y-5">
              {contactItems.map(({ label, href, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-start gap-3 text-sm leading-6 text-white/60 transition-colors hover:text-[#D8BD78]"
                >
                  <Icon
                    size={17}
                    strokeWidth={1.4}
                    className="mt-0.5 shrink-0 text-[#D8BD78] transition-transform group-hover:scale-110"
                  />
                  <span className="break-words">{label}</span>
                </a>
              ))}

              <div className="flex items-start gap-3 text-sm leading-6 text-white/60">
                <MapPin
                  size={17}
                  strokeWidth={1.4}
                  className="mt-0.5 shrink-0 text-[#D8BD78]"
                />
                <address className="not-italic">
                  No. 4/1301, Madha Kovil Street,
                  <br />
                  Near Vinnarasi Madha Church,
                  <br />
                  Thirunavallur, Maranodai,
                  <br />
                  Kallakurichi,
                  <br />
                  Tamil Nadu - 607204
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Contact call to action */}
        <div className="my-8 flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h3 className="font-serif text-xl text-white sm:text-2xl">
              Looking for the perfect bangle?
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/55">
              Explore our collection or get in touch with us.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/shop"
              onClick={scrollToTop}
              className="group inline-flex min-h-11 items-center gap-2 bg-[#D8BD78] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#10271E] transition-all hover:-translate-y-0.5 hover:bg-[#E8D59B]"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/contact"
              onClick={scrollToTop}
              className="group inline-flex min-h-11 items-center gap-2 border border-white/20 bg-white/[0.03] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80 transition-all hover:border-[#D8BD78]/60 hover:text-[#D8BD78]"
            >
              Contact Us
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-4 pt-2 text-center sm:text-left md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} YAMA FLYS. All rights reserved.
            </p>
            <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/35">
              Elegance for Every Occasion
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-end">
            <span className="text-xs text-white/45">Privacy Policy</span>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span className="text-xs text-white/45">
              Terms &amp; Conditions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Gem,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";

import ScrollReveal from "../components/ScrollReveal";

/* =========================================================
   THEME
========================================================= */

const THEME = {
  forest: "#1F3A2D",
  deep: "#14291F",
  green: "#426650",
  sage: "#DCE8D9",
  cream: "#F8F7F0",
  gold: "#B99A55",
  muted: "#6D7D70",
  border: "#DDE5DA",
};

/* =========================================================
   CONTACT DETAILS
========================================================= */

const CONTACT_DETAILS = [
  {
    title: "Phone",
    value: "+91 75488 63591",
    description: "Call us directly",
    href: "tel:+917548863591",
    Icon: Phone,
  },
  {
    title: "Email",
    value: "janumy686@gmail.com",
    description: "Send us an email",
    href: "mailto:janumy686@gmail.com",
    Icon: Mail,
  },
];

const ADDRESS = [
  "No. 4/1301, Madha Kovil Street,",
  "Near Vinnarasi Madha Church,",
  "Thirunavallur, Maranodai,",
  "Kallakurichi, Tamil Nadu - 607204",
];

/* =========================================================
   REUSABLE CONTACT CARD
========================================================= */

const ContactCard = ({ Icon, title, value, description, href }) => {
  const content = (
    <>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#DDE5DA] bg-[#EDF3E9] text-[#1F3A2D] transition duration-300 group-hover:border-[#B99A55] group-hover:bg-[#1F3A2D] group-hover:text-[#F8F7F0]">
        <Icon size={19} strokeWidth={1.5} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#718176]">
          {title}
        </p>

        <p className="mt-1 break-words text-sm font-semibold text-[#1F3A2D] sm:text-base">
          {value}
        </p>

        <p className="mt-1 text-xs text-[#718176]">{description}</p>
      </div>

      {href && (
        <ArrowUpRight
          size={17}
          className="shrink-0 text-[#8A9A8B] transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#B99A55]"
        />
      )}
    </>
  );

  const className =
    "group flex items-center gap-4 rounded-2xl border border-[#DDE5DA] bg-white/80 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#B99A55]/60 hover:shadow-[0_14px_35px_rgba(31,58,45,0.08)]";

  return href ? (
    <a href={href} className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
};

/* =========================================================
   REUSABLE FORM FIELD
========================================================= */

const FormField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
}) => {
  const commonClasses =
    "w-full rounded-xl border border-[#DDE5DA] bg-[#FBFCF8] px-4 py-3.5 text-sm text-[#1F3A2D] outline-none transition duration-300 placeholder:text-[#9AA69C] focus:border-[#B99A55] focus:bg-white focus:ring-4 focus:ring-[#B99A55]/10";

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#426650]"
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          rows={5}
          className={`${commonClasses} resize-y`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          autoComplete={name === "name" ? "name" : "tel"}
          className={commonClasses}
        />
      )}
    </div>
  );
};

/* =========================================================
   CONTACT PAGE
========================================================= */

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = `Hello YAMA FLYS,

Name: ${formData.name}
Phone: ${formData.phone}

Message:
${formData.message}`;

    const whatsappUrl = `https://wa.me/917548863591?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F7F0] text-[#1F3A2D]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Hero text */}

            <ScrollReveal>
              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#DDE5DA] bg-white/80 px-4 py-2">
                  <Sparkles size={14} className="text-[#B99A55]" />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#426650] sm:text-[10px]">
                    We're Here to Help
                  </span>
                </div>

                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B99A55]">
                  YAMA FLYS
                </p>

                <h1 className="mt-5 font-serif text-5xl leading-[1.08] tracking-tight text-[#1F3A2D] sm:text-6xl md:text-7xl">
                  Let's Talk
                  <span className="mt-1 block italic text-[#64816A]">
                    Beautiful.
                  </span>
                </h1>

                <p className="mt-6 max-w-lg text-sm leading-7 text-[#6D7D70] sm:text-base sm:leading-8">
                  Have a question about our bangles, an order, or a collection?
                  We'd love to hear from you and help you find something special.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#contact-form"
                    className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#1F3A2D] px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#426650] hover:shadow-lg"
                  >
                    Send a Message
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>

                  <a
                    href="https://wa.me/917548863591"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#DDE5DA] bg-white px-5 py-3 text-xs font-semibold text-[#1F3A2D] transition hover:border-[#B99A55] hover:bg-[#EDF3E9]"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </div>

                <div className="mt-8 flex items-center gap-3 text-xs text-[#718176]">
                  <CheckCircle2 size={17} className="shrink-0 text-[#64816A]" />
                  Personal assistance for product and order enquiries.
                </div>
              </div>
            </ScrollReveal>

            {/* Bangle image */}

            <ScrollReveal delay={120}>
              <div className="group relative mx-auto w-full max-w-xl">
                <div className="absolute -inset-3 rounded-[2rem] bg-[#DCE8D9]/70 blur-2xl" />

                <div className="relative overflow-hidden rounded-[1.75rem] border border-white bg-white p-2 shadow-[0_25px_70px_rgba(31,58,45,0.13)]">
                  <div className="relative aspect-[4/4.5] overflow-hidden rounded-[1.35rem] bg-[#E9EBDD] sm:aspect-[4/3.6] lg:aspect-[4/4.6]">
                    <img
                      src="/assets/bg-300.png"
                      alt="Elegant green bangles styled for YAMA FLYS jewellery"
                      fetchPriority="high"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14291F]/55 via-transparent to-[#14291F]/5" />

                    <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-[#14291F]/50 p-4 text-white backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-7 sm:p-5">
                      <div className="flex items-center gap-2 text-[#E2D0A0]">
                        <Gem size={15} />
                        <span className="text-[9px] font-semibold uppercase tracking-[0.25em]">
                          YAMA FLYS
                        </span>
                      </div>

                      <p className="mt-2 font-serif text-2xl sm:text-3xl">
                        Elegance in every detail.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-2 -top-3 flex h-14 w-14 items-center justify-center rounded-full border border-[#DDE5DA] bg-[#F8F7F0] text-[#B99A55] shadow-lg sm:-right-4 sm:-top-4 sm:h-16 sm:w-16">
                  <Sparkles size={23} strokeWidth={1.4} />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT CONTENT
      ===================================================== */}

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl sm:mb-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B99A55]">
              Get in Touch
            </p>

            <h2 className="mt-3 font-serif text-3xl leading-tight text-[#1F3A2D] sm:text-4xl md:text-5xl">
              We're only a message away.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#6D7D70] sm:text-base">
              Connect with us for product details, availability, and order
              assistance.
            </p>
          </div>

          <div className="grid items-start gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            {/* Contact information */}

            <ScrollReveal>
              <section className="rounded-[1.75rem] border border-[#DDE5DA] bg-white/80 p-5 shadow-[0_16px_45px_rgba(31,58,45,0.05)] sm:p-7 md:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EDF3E9] text-[#1F3A2D]">
                    <Phone size={19} />
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl text-[#1F3A2D]">
                      Contact Information
                    </h3>

                    <p className="mt-1 text-xs text-[#718176]">
                      Choose the easiest way to reach us.
                    </p>
                  </div>
                </div>

                <div className="mt-7 space-y-3">
                  {CONTACT_DETAILS.map((item) => (
                    <ContactCard key={item.title} {...item} />
                  ))}

                  <ContactCard
                    Icon={MapPin}
                    title="Address"
                    value={ADDRESS.map((line) => line).join(" ")}
                    description="Our location"
                  />
                </div>

                <div className="mt-6 rounded-2xl border border-[#DDE5DA] bg-[#F3F6EF] p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-[#426650]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-[#1F3A2D]">
                        How can we help?
                      </p>

                      <p className="mt-1 text-xs leading-6 text-[#6D7D70]">
                        Ask us about designs, product availability, or an
                        existing order.
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/917548863591"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-[#1F3A2D] bg-[#1F3A2D] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#426650]"
                >
                  <MessageCircle size={17} />
                  Chat on WhatsApp
                  <ArrowUpRight size={15} />
                </a>
              </section>
            </ScrollReveal>

            {/* Contact form */}

            <ScrollReveal delay={100}>
              <section
                id="contact-form"
                className="scroll-mt-28 rounded-[1.75rem] border border-[#DDE5DA] bg-white p-5 shadow-[0_16px_45px_rgba(31,58,45,0.06)] sm:p-7 md:p-9"
              >
                <div className="mb-8">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EDF3E9] text-[#1F3A2D]">
                    <Send size={19} />
                  </div>

                  <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B99A55]">
                    Write to Us
                  </p>

                  <h2 className="mt-2 font-serif text-3xl text-[#1F3A2D] sm:text-4xl">
                    How can we help?
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-[#6D7D70]">
                    Complete the form and we'll prepare your message in
                    WhatsApp.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <FormField
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />

                  <FormField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />

                  <FormField
                    label="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    multiline
                  />

                  <button
                    type="submit"
                    className="group flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#1F3A2D] px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#426650] hover:shadow-lg"
                  >
                    Prepare WhatsApp Message
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>

                  <p className="text-center text-[11px] leading-5 text-[#718176]">
                    WhatsApp will open with your message ready to send.
                  </p>
                </form>
              </section>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#14291F] px-5 py-16 text-center sm:px-6 sm:py-20">
        <div className="pointer-events-none absolute -left-20 -top-28 h-64 w-64 rounded-full bg-[#64816A]/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-[#B99A55]/10 blur-3xl" />

        <ScrollReveal>
          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#B99A55]/40 bg-white/5 text-[#D8C18B]">
              <MessageCircle size={22} />
            </div>

            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D8C18B]">
              We're Happy to Help
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#F8F7F0] sm:text-5xl md:text-6xl">
              Let's make it
              <span className="block italic text-[#B9CFB5]">
                beautiful.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#CFD9CD]">
              Have a question or need a little guidance? Reach out to YAMA FLYS
              and let's find the right design for you.
            </p>

            <a
              href="https://wa.me/917548863591"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#D8C18B] px-7 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#14291F] transition duration-300 hover:-translate-y-1 hover:bg-[#E8D8AE] hover:shadow-xl"
            >
              <MessageCircle size={17} />
              Message Us
              <ArrowUpRight size={15} />
            </a>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
};

export default Contact;

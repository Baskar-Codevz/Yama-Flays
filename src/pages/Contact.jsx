import React, { useState } from "react";
import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

import ScrollReveal from "../components/ScrollReveal";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [mousePosition, setMousePosition] = useState({
    x: 50,
    y: 50,
  });

  const [isHovering, setIsHovering] = useState(false);

  /* =========================================================
     FORM HANDLING
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `Hello YAMA FLYS,

Name: ${formData.name}
Phone: ${formData.phone}

Message:
${formData.message}`;

    const whatsappUrl = `https://wa.me/917548863591?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  /* =========================================================
     MOUSE GLOW
  ========================================================= */

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);

    setMousePosition({
      x: 50,
      y: 50,
    });
  };

  return (
    <>
      {/* =====================================================
          PAGE ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes contactFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes contactRotate {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes contactPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.12;
          }

          50% {
            transform: scale(1.12);
            opacity: 0.25;
          }
        }

        @keyframes contactShimmer {
          0% {
            transform: translateX(-140%);
          }

          100% {
            transform: translateX(140%);
          }
        }

        @keyframes contactLine {
          from {
            width: 0;
            opacity: 0;
          }

          to {
            width: 64px;
            opacity: 1;
          }
        }

        @keyframes contactGlow {
          0%,
          100% {
            opacity: 0.35;
          }

          50% {
            opacity: 0.7;
          }
        }

        @keyframes contactBounce {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-4px);
          }
        }
      `}</style>

      <main
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-screen overflow-hidden bg-[#F5EEF7] text-[#171717]"
      >
        {/* =====================================================
            GLOBAL CURSOR GLOW
        ===================================================== */}

        <div
          className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-700 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `
              radial-gradient(
                circle 440px at ${mousePosition.x}% ${mousePosition.y}%,
                rgba(201,162,39,0.10),
                rgba(116,82,127,0.11) 35%,
                transparent 72%
              )
            `,
          }}
        />

        {/* =====================================================
            AMBIENT BACKGROUND GLOWS
        ===================================================== */}

        <div
          className="pointer-events-none absolute -left-52 top-20 h-[34rem] w-[34rem] rounded-full bg-[#74527F]/10 blur-3xl"
          style={{
            animation: "contactPulse 10s ease-in-out infinite",
          }}
        />

        <div
          className="pointer-events-none absolute -right-52 top-[42%] h-[32rem] w-[32rem] rounded-full bg-[#C9A227]/8 blur-3xl"
          style={{
            animation: "contactPulse 12s ease-in-out infinite reverse",
          }}
        />

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative z-10 overflow-hidden bg-gradient-to-br from-[#BDA3C8] via-[#CDB8D6] to-[#E0CEE5] px-5 py-20 text-center sm:px-6 sm:py-24 md:py-28 lg:py-32">
          {/* Large Rings */}

          <div
            className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border border-[#C9A227]/20"
            style={{
              animation: "contactRotate 30s linear infinite",
            }}
          />

          <div
            className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full border border-white/20"
            style={{
              animation: "contactRotate 34s linear infinite reverse",
            }}
          />

          {/* Floating Glow */}

          <div
            className="pointer-events-none absolute left-[15%] top-[30%] h-24 w-24 rounded-full bg-white/15 blur-2xl"
            style={{
              animation: "contactGlow 5s ease-in-out infinite",
            }}
          />

          <ScrollReveal>
            <div className="relative mx-auto max-w-4xl">
              {/* Icon */}

              <div
                className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A227]/40 bg-white/55 shadow-[0_10px_30px_rgba(60,36,73,0.10)] backdrop-blur-md"
                style={{
                  animation: "contactFloat 5s ease-in-out infinite",
                }}
              >
                <Sparkles
                  size={22}
                  strokeWidth={1.25}
                  className="text-[#C9A227]"
                />
              </div>

              {/* Eyebrow */}

              <p className="text-[10px] font-medium uppercase tracking-[0.38em] text-[#705512] sm:text-xs">
                YAMA FLYS
              </p>

              {/* Heading */}

              <h1 className="mt-4 font-serif text-5xl leading-tight text-[#171717] sm:text-6xl md:text-7xl">
                Contact
                <span className="block italic text-[#5E4168]">YAMA FLYS</span>
              </h1>

              {/* Gold Line */}

              <div
                className="mx-auto mt-6 h-[2px] bg-[#C9A227]"
                style={{
                  animation: "contactLine 1.1s ease-out forwards",
                }}
              />

              {/* Description */}

              <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-[#514957] md:text-base md:leading-8">
                Have a question about our bangles, orders, or collections?
                Connect with YAMA FLYS and we’ll be happy to assist you.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* =====================================================
            CONTACT CONTENT
        ===================================================== */}

        <section className="relative z-10 px-5 py-16 sm:px-6 md:px-10 md:py-24 lg:px-16">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* =================================================
                LEFT - INFORMATION
            ================================================= */}

            <ScrollReveal>
              <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 p-7 shadow-[0_20px_60px_rgba(66,45,74,0.10)] backdrop-blur-xl sm:p-9 md:p-10">
                {/* Decorative Ring */}

                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full border border-[#C9A227]/20"
                  style={{
                    animation: "contactRotate 28s linear infinite",
                  }}
                />

                <div className="relative">
                  {/* Label */}

                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#856617] sm:text-xs">
                    Contact Information
                  </p>

                  {/* Heading */}

                  <h2 className="mt-4 font-serif text-4xl leading-tight text-[#171717] md:text-5xl">
                    We'd Love to
                    <span className="block italic text-[#74527F]">
                      Hear From You
                    </span>
                  </h2>

                  {/* Line */}

                  <div className="mt-6 h-[2px] w-14 bg-[#C9A227]" />

                  {/* Description */}

                  <p className="mt-7 text-sm leading-7 text-[#68606D]">
                    Reach out to YAMA FLYS for product enquiries, order
                    assistance, collection details, or any other questions.
                  </p>

                  {/* Contact Items */}

                  <div className="mt-10 space-y-5">
                    {/* Phone */}

                    <a
                      href="tel:+917548863591"
                      className="group/item flex items-start gap-4 rounded-2xl border border-[#E6DDEA] bg-white/70 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A227]/40 hover:bg-white hover:shadow-[0_15px_35px_rgba(60,36,73,0.08)]"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D9C7E0] bg-[#F7F1F9] text-[#74527F] transition-all duration-500 group-hover/item:border-[#C9A227] group-hover/item:bg-[#3C2449] group-hover/item:text-[#D7BA62]">
                        <Phone size={18} strokeWidth={1.4} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#917D9D]">
                          Phone
                        </p>

                        <p className="mt-1 text-sm font-medium text-[#211B28]">
                          +91 75488 63591
                        </p>

                        <p className="mt-1 text-xs text-[#8A808F]">
                          Call us directly
                        </p>
                      </div>

                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.4}
                        className="ml-auto mt-1 text-[#B5A9BB] opacity-0 transition-all duration-300 group-hover/item:translate-x-1 group-hover/item:-translate-y-1 group-hover/item:text-[#C9A227] group-hover/item:opacity-100"
                      />
                    </a>

                    {/* Email */}

                    <a
                      href="mailto:janumy686@gmail.com"
                      className="group/item flex items-start gap-4 rounded-2xl border border-[#E6DDEA] bg-white/70 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A227]/40 hover:bg-white hover:shadow-[0_15px_35px_rgba(60,36,73,0.08)]"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D9C7E0] bg-[#F7F1F9] text-[#74527F] transition-all duration-500 group-hover/item:border-[#C9A227] group-hover/item:bg-[#3C2449] group-hover/item:text-[#D7BA62]">
                        <Mail size={18} strokeWidth={1.4} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#917D9D]">
                          Email
                        </p>

                        <p className="mt-1 break-all text-sm font-medium text-[#211B28]">
                          janumy686@gmail.com
                        </p>

                        <p className="mt-1 text-xs text-[#8A808F]">
                          Send us an email
                        </p>
                      </div>

                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.4}
                        className="ml-auto mt-1 text-[#B5A9BB] opacity-0 transition-all duration-300 group-hover/item:translate-x-1 group-hover/item:-translate-y-1 group-hover/item:text-[#C9A227] group-hover/item:opacity-100"
                      />
                    </a>

                    {/* Address */}

                    <div className="group/item flex items-start gap-4 rounded-2xl border border-[#E6DDEA] bg-white/70 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A227]/40 hover:bg-white hover:shadow-[0_15px_35px_rgba(60,36,73,0.08)]">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D9C7E0] bg-[#F7F1F9] text-[#74527F] transition-all duration-500 group-hover/item:border-[#C9A227] group-hover/item:bg-[#3C2449] group-hover/item:text-[#D7BA62]">
                        <MapPin size={18} strokeWidth={1.4} />
                      </div>

                      <div>
                        <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#917D9D]">
                          Address
                        </p>

                        <p className="mt-1 text-sm font-medium leading-6 text-[#211B28]">
                          No. 4/1301, Madha Kovil Street,
                          <br />
                          Near Vinnarasi Madha Church,
                          <br />
                          Thirunavallur, Maranodai,
                          <br />
                          Kallakurichi, Tamil Nadu - 607204
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Small Note */}

                  <div className="mt-8 flex items-center gap-3 rounded-xl border border-[#E4D8E9] bg-[#F8F3FA] p-4">
                    <CheckCircle2
                      size={18}
                      strokeWidth={1.4}
                      className="shrink-0 text-[#C9A227]"
                    />

                    <p className="text-xs leading-5 text-[#756B7A]">
                      We're here to help with product questions, availability,
                      and order assistance.
                    </p>
                  </div>

                  {/* WhatsApp Mini CTA */}

                  <a
                    href="https://wa.me/917548863591"
                    target="_blank"
                    rel="noreferrer"
                    className="group/whatsapp mt-8 inline-flex items-center gap-3 rounded-full border border-[#3C2449]/15 bg-[#3C2449] px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#4A2E59] hover:shadow-xl"
                  >
                    <MessageCircle
                      size={16}
                      strokeWidth={1.4}
                      className="text-[#D7BA62]"
                    />
                    WhatsApp Us
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.4}
                      className="transition-transform duration-300 group-hover/whatsapp:translate-x-1 group-hover/whatsapp:-translate-y-1"
                    />
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* =================================================
                RIGHT - FORM
            ================================================= */}

            <ScrollReveal delay={120}>
              <div className="relative overflow-hidden rounded-[2rem] border border-[#DCCDE2] bg-white p-7 shadow-[0_25px_70px_rgba(66,45,74,0.12)] sm:p-9 md:p-10 lg:p-12">
                {/* Top Glow */}

                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#C9A227]/8 blur-3xl" />

                {/* Corner Ring */}

                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full border border-[#C9A227]/15"
                  style={{
                    animation: "contactRotate 28s linear infinite",
                  }}
                />

                <div className="relative">
                  {/* Form Header */}

                  <div className="mb-9">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5EEF7] text-[#74527F]">
                        <Send size={17} strokeWidth={1.4} />
                      </div>

                      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#856617] sm:text-xs">
                        Send a Message
                      </p>
                    </div>

                    <h2 className="mt-5 font-serif text-4xl leading-tight text-[#171717] md:text-5xl">
                      How Can We
                      <span className="block italic text-[#74527F]">Help?</span>
                    </h2>

                    <p className="mt-4 max-w-lg text-sm leading-7 text-[#746B78]">
                      Fill in the details below and your message will open
                      directly in WhatsApp.
                    </p>

                    <div className="mt-6 h-[2px] w-12 bg-[#C9A227]" />
                  </div>

                  {/* Form */}

                  <form onSubmit={handleSubmit} className="space-y-7">
                    {/* Name */}

                    <div className="group/field">
                      <label
                        htmlFor="name"
                        className="mb-2 block text-[9px] font-medium uppercase tracking-[0.22em] text-[#756A7A]"
                      >
                        Your Name
                      </label>

                      <div className="relative">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter your name"
                          className="w-full rounded-xl border border-[#DED3E3] bg-[#FBF9FC] px-4 py-4 text-sm text-[#211B28] outline-none transition-all duration-300 placeholder:text-[#ABA3AF] focus:border-[#C9A227] focus:bg-white focus:shadow-[0_0_0_4px_rgba(201,162,39,0.07)]"
                        />

                        <div className="pointer-events-none absolute bottom-0 left-4 right-4 h-[2px] origin-left scale-x-0 bg-[#C9A227] transition-transform duration-300 group-focus-within/field:scale-x-100" />
                      </div>
                    </div>

                    {/* Phone */}

                    <div className="group/field">
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-[9px] font-medium uppercase tracking-[0.22em] text-[#756A7A]"
                      >
                        Phone Number
                      </label>

                      <div className="relative">
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="Enter your phone number"
                          className="w-full rounded-xl border border-[#DED3E3] bg-[#FBF9FC] px-4 py-4 text-sm text-[#211B28] outline-none transition-all duration-300 placeholder:text-[#ABA3AF] focus:border-[#C9A227] focus:bg-white focus:shadow-[0_0_0_4px_rgba(201,162,39,0.07)]"
                        />

                        <div className="pointer-events-none absolute bottom-0 left-4 right-4 h-[2px] origin-left scale-x-0 bg-[#C9A227] transition-transform duration-300 group-focus-within/field:scale-x-100" />
                      </div>
                    </div>

                    {/* Message */}

                    <div className="group/field">
                      <label
                        htmlFor="message"
                        className="mb-2 block text-[9px] font-medium uppercase tracking-[0.22em] text-[#756A7A]"
                      >
                        Message
                      </label>

                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows="6"
                          placeholder="Write your message..."
                          className="w-full resize-none rounded-xl border border-[#DED3E3] bg-[#FBF9FC] px-4 py-4 text-sm leading-7 text-[#211B28] outline-none transition-all duration-300 placeholder:text-[#ABA3AF] focus:border-[#C9A227] focus:bg-white focus:shadow-[0_0_0_4px_rgba(201,162,39,0.07)]"
                        />

                        <div className="pointer-events-none absolute bottom-0 left-4 right-4 h-[2px] origin-left scale-x-0 bg-[#C9A227] transition-transform duration-300 group-focus-within/field:scale-x-100" />
                      </div>
                    </div>

                    {/* Submit */}

                    <button
                      type="submit"
                      className="group/button relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#3C2449] px-7 py-4.5 text-[10px] font-medium uppercase tracking-[0.22em] text-white shadow-[0_15px_35px_rgba(60,36,73,0.20)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#4B2F59] hover:shadow-[0_20px_45px_rgba(60,36,73,0.28)]"
                    >
                      {/* Shimmer */}

                      <span
                        className="absolute inset-y-0 left-0 w-1/3 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/25 to-transparent"
                        style={{
                          animation: "contactShimmer 4s ease-in-out infinite",
                        }}
                      />

                      <span className="relative z-10">Send via WhatsApp</span>

                      <Send
                        size={16}
                        strokeWidth={1.4}
                        className="relative z-10 text-[#D7BA62] transition-transform duration-300 group-hover/button:translate-x-1"
                      />
                    </button>

                    <p className="text-center text-[10px] leading-5 text-[#978D9D]">
                      Your message will be prepared and opened in WhatsApp.
                    </p>
                  </form>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* =====================================================
            WHATSAPP CTA
        ===================================================== */}

        <section className="relative z-10 overflow-hidden bg-[#3C2449] px-5 py-20 text-center sm:px-6 md:py-24">
          {/* Background Glow */}

          <div
            className="pointer-events-none absolute -left-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#80558E]/20 blur-3xl"
            style={{
              animation: "contactPulse 9s ease-in-out infinite",
            }}
          />

          <div
            className="pointer-events-none absolute -right-40 bottom-[-6rem] h-80 w-80 rounded-full bg-[#C9A227]/10 blur-3xl"
            style={{
              animation: "contactPulse 10s ease-in-out infinite reverse",
            }}
          />

          {/* Rotating Ring */}

          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#C9A227]/15"
            style={{
              animation: "contactRotate 28s linear infinite",
            }}
          />

          <div
            className="pointer-events-none absolute -bottom-28 -left-28 h-60 w-60 rounded-full border border-white/10"
            style={{
              animation: "contactRotate 32s linear infinite reverse",
            }}
          />

          <ScrollReveal>
            <div className="relative mx-auto max-w-3xl">
              {/* Icon */}

              <div
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A227]/35 bg-white/5 backdrop-blur-md"
                style={{
                  animation: "contactBounce 4s ease-in-out infinite",
                }}
              >
                <MessageCircle
                  size={24}
                  strokeWidth={1.25}
                  className="text-[#D7BA62]"
                />
              </div>

              {/* Label */}

              <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.32em] text-[#D7BA62] sm:text-xs">
                Need Quick Assistance?
              </p>

              {/* Heading */}

              <h2 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
                Chat With
                <span className="block italic text-[#D7BA62]">YAMA FLYS</span>
              </h2>

              {/* Description */}

              <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#D7CADD] md:text-base">
                For quick questions about products, orders, or availability,
                connect with us directly on WhatsApp.
              </p>

              {/* Button */}

              <a
                href="https://wa.me/917548863591"
                target="_blank"
                rel="noreferrer"
                className="group/cta relative mt-9 inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#C9A227] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#171717] shadow-[0_15px_35px_rgba(0,0,0,0.20)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#DFC25B] hover:shadow-[0_20px_45px_rgba(0,0,0,0.28)]"
              >
                {/* Shimmer */}

                <span
                  className="absolute inset-y-0 left-0 w-1/3 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  style={{
                    animation: "contactShimmer 3.5s ease-in-out infinite",
                  }}
                />

                <span className="relative z-10">WhatsApp Us</span>

                <MessageCircle
                  size={16}
                  strokeWidth={1.4}
                  className="relative z-10 transition-transform duration-300 group-hover/cta:scale-110"
                />
              </a>
            </div>
          </ScrollReveal>
        </section>
      </main>
    </>
  );
};

export default Contact;

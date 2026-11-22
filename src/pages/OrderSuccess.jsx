
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  ArrowUpRight,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Home,
} from "lucide-react";

import ScrollReveal from "../components/ScrollReveal";

const OrderSuccess = () => {
  const location = useLocation();
  const orderData = location.state || {};

  const total = Number(orderData.total || 0);
  const itemCount = Number(orderData.itemCount || 0);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F5F5F5] text-[#173D2B]">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#DCE9DF]/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[#E5EAE5]/70 blur-3xl" />

      {/* Success Section */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16 sm:px-8 sm:py-24">
        <ScrollReveal>
          <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-[2rem] border border-[#E1E7E1] bg-white shadow-[0_24px_70px_rgba(23,61,43,0.10)]">

            {/* Green Hero */}
            <div className="relative overflow-hidden bg-[#173D2B] px-6 py-12 text-center sm:px-10 sm:py-16">
              {/* Optional Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                  backgroundImage: "url('/assets/bg-image.png')",
                }}
              />

              {/* Green Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#173D2B]/90 via-[#173D2B]/80 to-[#28583D]/90" />

              {/* Decorative Circles */}
              <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-white/10" />

              <div className="relative z-10">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-lg backdrop-blur-sm sm:h-28 sm:w-28">
                  <CheckCircle2
                    size={48}
                    strokeWidth={1.4}
                    className="text-[#D8E8D9]"
                  />
                </div>

                <div className="mt-7 flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-[#C5A66A]" />
                  <Sparkles size={15} className="text-[#D8C18E]" />
                  <span className="h-px w-8 bg-[#C5A66A]" />
                </div>

                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D8C18E]">
                  YAMA FLYS
                </p>

                <h1 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
                  Order Request
                  <span className="mt-2 block italic text-[#C9DCCB]">
                    Sent Successfully!
                  </span>
                </h1>

                <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/75">
                  Thank you for choosing YAMA FLYS. Continue on WhatsApp to
                  confirm your order and delivery details.
                </p>

                <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-medium tracking-wide text-white/90 backdrop-blur-sm">
                  <CheckCircle2 size={14} className="text-[#C9DCCB]" />
                  Order request submitted
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="px-5 py-8 sm:px-10 sm:py-10 md:px-14">
              <div className="grid gap-4 sm:grid-cols-2">

                {/* Item Count */}
                <div className="rounded-2xl border border-[#E2E9E2] bg-[#F5F5F5] p-6 text-center transition duration-300 hover:border-[#9DB8A2]">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E3ECE4]">
                    <ShoppingBag
                      size={20}
                      strokeWidth={1.5}
                      className="text-[#28583D]"
                    />
                  </div>

                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#718477]">
                    Total Items
                  </p>

                  <p className="mt-2 font-serif text-3xl text-[#173D2B]">
                    {itemCount || "—"}
                  </p>
                </div>

                {/* Order Total */}
                <div className="rounded-2xl border border-[#E2E9E2] bg-[#F5F5F5] p-6 text-center transition duration-300 hover:border-[#9DB8A2]">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E3ECE4]">
                    <Sparkles
                      size={20}
                      strokeWidth={1.5}
                      className="text-[#28583D]"
                    />
                  </div>

                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#718477]">
                    Order Value
                  </p>

                  <p className="mt-2 font-serif text-3xl text-[#173D2B]">
                    {total > 0 ? `₹${total.toLocaleString("en-IN")}` : "—"}
                  </p>
                </div>
              </div>

              {/* WhatsApp Notice */}
              <div className="mt-6 flex gap-3 rounded-2xl border border-[#DDE8DE] bg-[#EDF3ED] p-5 text-left">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                  <ShieldCheck
                    size={20}
                    strokeWidth={1.5}
                    className="text-[#28583D]"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#173D2B]">
                    Final confirmation via WhatsApp
                  </p>

                  <p className="mt-2 text-xs leading-6 text-[#627568]">
                    No online payment has been processed. Our team will confirm
                    product availability, delivery details, and final payment
                    information through WhatsApp.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="https://wa.me/917548863591"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full bg-[#173D2B] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#28583D] hover:shadow-lg"
                >
                  <MessageCircle size={17} className="text-[#D8C18E]" />
                  Open WhatsApp
                  <ArrowUpRight
                    size={15}
                    className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>

                <Link
                  to="/shop"
                  className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full border border-[#D5E0D6] bg-white px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#173D2B] transition duration-300 hover:-translate-y-1 hover:border-[#8EAD94] hover:bg-[#F4F8F4]"
                >
                  Continue Shopping
                  <ArrowRight
                    size={15}
                    className="transition group-hover:translate-x-1"
                  />
                </Link>
              </div>

              {/* Home Link */}
              <div className="mt-7 text-center">
                <Link
                  to="/"
                  className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#718477] transition hover:text-[#173D2B]"
                >
                  <Home size={14} />
                  Back to Home
                  <ArrowRight
                    size={13}
                    className="transition group-hover:translate-x-1"
                  />
                </Link>
              </div>

              {/* Footer */}
              <div className="mt-9 border-t border-[#E8EDE8] pt-6">
                <div className="flex items-center justify-center gap-3">
                  <span className="h-px w-6 bg-[#C5A66A]" />

                  <p className="text-center text-[9px] uppercase tracking-[0.18em] text-[#839187]">
                    Beautiful details, selected with care
                  </p>

                  <span className="h-px w-6 bg-[#C5A66A]" />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
};

export default OrderSuccess;

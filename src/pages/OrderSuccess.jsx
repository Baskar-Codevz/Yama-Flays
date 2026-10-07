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
    <main className="relative min-h-screen overflow-hidden bg-[#FCF8F4] text-[#3B2635]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#F3DCE2]/70 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#E8D5DD]/60 blur-3xl" />

      {/* Decorative Ring */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A86A]/10" />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 py-24 sm:px-8">
        <ScrollReveal>
          <div className="mx-auto w-full max-w-3xl rounded-[2rem] border border-[#E7DADF] bg-white/95 px-6 py-12 text-center shadow-[0_30px_90px_rgba(75,48,60,0.12)] backdrop-blur sm:px-10 sm:py-16 md:px-14">
            {/* Success Icon */}
            <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#F9EDEF] ring-1 ring-[#C9A86A]/30">
              <div className="absolute inset-2 rounded-full border border-[#C9A86A]/20" />

              <CheckCircle2
                size={48}
                strokeWidth={1.15}
                className="text-[#9F6878]"
              />
            </div>

            {/* Decorative Line */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#C9A86A]" />

              <Sparkles
                size={15}
                strokeWidth={1.3}
                className="text-[#B18A50]"
              />

              <span className="h-px w-10 bg-[#C9A86A]" />
            </div>

            {/* Brand */}
            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#B18A50]">
              YAMA FLYS
            </p>

            {/* Heading */}
            <h1 className="mt-4 font-serif text-4xl leading-tight text-[#3B2635] sm:text-5xl md:text-6xl">
              Order Request
              <span className="block italic text-[#B47788]">
                Sent Successfully
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#806F78]">
              Your order details have been opened in WhatsApp. Please continue
              the conversation there to confirm your order and delivery details.
            </p>

            {/* Order Info */}
            <div className="mx-auto mt-9 grid max-w-xl gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#E9DEE2] bg-[#FCF8F4] px-5 py-5">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#F9EDEF]">
                  <ShoppingBag
                    size={17}
                    strokeWidth={1.3}
                    className="text-[#9F6878]"
                  />
                </div>

                <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9A858E]">
                  Items
                </p>

                <p className="mt-1 font-serif text-2xl text-[#3B2635]">
                  {itemCount || "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-[#E9DEE2] bg-[#FCF8F4] px-5 py-5">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF4E8]">
                  <Sparkles
                    size={17}
                    strokeWidth={1.3}
                    className="text-[#B18A50]"
                  />
                </div>

                <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9A858E]">
                  Order Value
                </p>

                <p className="mt-1 font-serif text-2xl text-[#3B2635]">
                  {total > 0 ? `₹${total.toLocaleString("en-IN")}` : "—"}
                </p>
              </div>
            </div>

            {/* WhatsApp Notice */}
            <div className="mx-auto mt-7 flex max-w-xl gap-3 rounded-2xl bg-[#FAF2F5] p-5 text-left">
              <ShieldCheck
                size={19}
                strokeWidth={1.4}
                className="mt-0.5 shrink-0 text-[#B18A50]"
              />

              <div>
                <p className="text-xs font-semibold text-[#3B2635]">
                  Final confirmation through WhatsApp
                </p>

                <p className="mt-1 text-[10px] leading-5 text-[#806F78]">
                  No online payment has been processed. YAMA FLYS will confirm
                  your order, availability, delivery details, and final payment
                  information through WhatsApp.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://wa.me/917548863591"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full bg-[#3B2635] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#56394A]"
              >
                <MessageCircle
                  size={17}
                  strokeWidth={1.4}
                  className="text-[#D6B66D]"
                />
                Open WhatsApp
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.4}
                  className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <Link
                to="/shop"
                className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full border border-[#DCCDD3] bg-white px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B2635] transition duration-300 hover:-translate-y-1 hover:border-[#C9A86A]"
              >
                Continue Shopping
                <ArrowRight
                  size={15}
                  className="transition group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Home */}
            <Link
              to="/"
              className="group mt-7 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9A858E] transition hover:text-[#B18A50]"
            >
              <Home size={13} />
              Back to Home
              <ArrowRight
                size={13}
                className="transition group-hover:translate-x-1"
              />
            </Link>

            {/* Footer Note */}
            <div className="mt-10 border-t border-[#EEE4E7] pt-7">
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-6 bg-[#D8C5A4]" />

                <p className="text-[9px] uppercase tracking-[0.2em] text-[#A08D95]">
                  Beautiful details, selected with care
                </p>

                <span className="h-px w-6 bg-[#D8C5A4]" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
};

export default OrderSuccess;

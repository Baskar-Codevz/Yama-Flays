import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Gem,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  UserRound,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import { getImageUrl } from "../utils/imageUrl";
import ScrollReveal from "../components/ScrollReveal";

const FALLBACK_IMAGE = "/assets/img-1.webp";
const BUY_NOW_KEY = "yama-flys-buy-now";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // =========================================================
  // BUY NOW ITEM
  // =========================================================

  const buyNowItem = useMemo(() => {
    try {
      const saved = sessionStorage.getItem(BUY_NOW_KEY);

      if (!saved) return null;

      const parsed = JSON.parse(saved);

      if (!parsed || !parsed.id) return null;

      return {
        ...parsed,
        quantity: Math.max(1, Number(parsed.quantity) || 1),
        price: Number(parsed.price) || 0,
      };
    } catch (error) {
      console.error("Failed to read Buy Now item:", error);

      sessionStorage.removeItem(BUY_NOW_KEY);

      return null;
    }
  }, []);

  // =========================================================
  // CHECKOUT ITEMS
  // =========================================================

  const checkoutItems = useMemo(() => {
    if (buyNowItem) {
      return [buyNowItem];
    }

    return Array.isArray(cartItems) ? cartItems : [];
  }, [buyNowItem, cartItems]);

  // =========================================================
  // TOTAL
  // =========================================================

  const checkoutTotal = useMemo(() => {
    return checkoutItems.reduce((total, item) => {
      const price = Number(item?.price) || 0;
      const quantity = Number(item?.quantity) || 0;

      return total + price * quantity;
    }, 0);
  }, [checkoutItems]);

  const totalQuantity = useMemo(() => {
    return checkoutItems.reduce((total, item) => {
      return total + (Number(item?.quantity) || 0);
    }, 0);
  }, [checkoutItems]);

  // =========================================================
  // IMAGE
  // =========================================================

  const getImage = (item) => {
    const image = item?.images?.[0] || item?.image;

    if (!image) {
      return FALLBACK_IMAGE;
    }

    try {
      return getImageUrl(image);
    } catch {
      return FALLBACK_IMAGE;
    }
  };

  // =========================================================
  // FORM
  // =========================================================

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "phone") {
      setFormData((previous) => ({
        ...previous,
        phone: value.replace(/\D/g, "").slice(0, 10),
      }));

      return;
    }

    if (name === "pincode") {
      setFormData((previous) => ({
        ...previous,
        pincode: value.replace(/\D/g, "").slice(0, 6),
      }));

      return;
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateForm = () => {
    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const address = formData.address.trim();
    const city = formData.city.trim();
    const state = formData.state.trim();
    const pincode = formData.pincode.trim();

    if (name.length < 2) {
      alert("Please enter your full name.");
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Please enter a valid 10-digit Indian mobile number.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (address.length < 10) {
      alert("Please enter your complete delivery address.");
      return false;
    }

    if (city.length < 2) {
      alert("Please enter your city.");
      return false;
    }

    if (state.length < 2) {
      alert("Please enter your state.");
      return false;
    }

    if (!/^\d{6}$/.test(pincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return false;
    }

    return true;
  };

  // =========================================================
  // SUBMIT ORDER
  // =========================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (checkoutItems.length === 0) {
      alert("Your checkout is empty.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // =======================================================
    // ORDER ITEMS
    // =======================================================

    const orderItems = checkoutItems
      .map((item) => {
        const quantity = Number(item.quantity) || 1;
        const price = Number(item.price) || 0;

        return `${item.name}
Size: ${item.selectedSize || "Not selected"}
Quantity: ${quantity}
Price: ₹${(price * quantity).toLocaleString("en-IN")}`;
      })
      .join("\n\n");

    // =======================================================
    // WHATSAPP MESSAGE
    // =======================================================

    const message = `Hello YAMA FLYS,

I would like to place an order.

CUSTOMER DETAILS

Name: ${formData.name.trim()}
Phone: ${formData.phone.trim()}
Email: ${formData.email.trim()}

DELIVERY ADDRESS

${formData.address.trim()}
${formData.city.trim()}, ${formData.state.trim()} - ${formData.pincode.trim()}

ORDER DETAILS

${orderItems}

TOTAL: ₹${checkoutTotal.toLocaleString("en-IN")}

Please confirm my order and delivery details.

Thank you.`;

    // =======================================================
    // WHATSAPP URL
    // =======================================================

    const whatsappUrl =
      "https://wa.me/917548863591?text=" + encodeURIComponent(message);

    // =======================================================
    // POPUP-SAFE WHATSAPP OPEN
    // =======================================================
    //
    // A temporary <a> element is used instead of window.open().
    // This keeps the action connected to the user's click and
    // allows WhatsApp to open in a new browser tab.
    //

    const whatsappLink = document.createElement("a");

    whatsappLink.href = whatsappUrl;
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener noreferrer";

    document.body.appendChild(whatsappLink);

    whatsappLink.click();

    document.body.removeChild(whatsappLink);

    // =======================================================
    // CLEAR ORDER SOURCE
    // =======================================================

    if (buyNowItem) {
      sessionStorage.removeItem(BUY_NOW_KEY);
    } else {
      clearCart();
    }

    // =======================================================
    // ORDER SUCCESS
    // =======================================================

    setIsSubmitting(false);

    navigate("/order-success", {
      state: {
        customerName: formData.name.trim(),
        total: checkoutTotal,
        totalQuantity,
      },
    });
  };

  // =========================================================
  // EMPTY CHECKOUT
  // =========================================================

  if (checkoutItems.length === 0) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#FCF8F4] px-5 pb-20 pt-32 text-[#3B2635] sm:px-8 md:pt-36">
        <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-[#F3DCE2] blur-3xl" />

        <div className="relative mx-auto flex min-h-[65vh] max-w-3xl items-center justify-center">
          <ScrollReveal>
            <div className="w-full rounded-[2rem] border border-[#E8D9DE] bg-white px-7 py-14 text-center shadow-[0_25px_80px_rgba(75,48,60,0.10)] sm:px-12">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#F9EDEF]">
                <ShoppingBag
                  size={34}
                  className="text-[#9F6878]"
                  strokeWidth={1.15}
                />
              </div>

              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#B18A50]">
                YAMA FLYS
              </p>

              <h1 className="mt-4 font-serif text-4xl sm:text-5xl">
                Your checkout is
                <span className="block italic text-[#B47788]">empty</span>
              </h1>

              <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#806F78]">
                Add something beautiful to your bag before continuing.
              </p>

              <Link
                to="/shop"
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#3B2635] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-1 hover:bg-[#56394A]"
              >
                Back to Shop
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </main>
    );
  }

  // =========================================================
  // INPUT STYLE
  // =========================================================

  const inputClass =
    "w-full rounded-xl border border-[#E0D2D8] bg-[#FFFCFA] px-4 py-4 text-sm text-[#3B2635] outline-none transition duration-300 placeholder:text-[#AA9AA2] focus:border-[#C9A86A] focus:bg-white focus:ring-4 focus:ring-[#C9A86A]/10";

  // =========================================================
  // MAIN
  // =========================================================

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FCF8F4] text-[#3B2635]">
      <div className="pointer-events-none absolute -left-48 top-24 h-[30rem] w-[30rem] rounded-full bg-[#F3DCE2]/65 blur-3xl" />

      <div className="pointer-events-none absolute -right-48 top-[45%] h-[30rem] w-[30rem] rounded-full bg-[#E8D5DD]/50 blur-3xl" />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative z-10 bg-[#3B2635] px-5 pb-14 pt-32 text-white sm:px-8 sm:pt-36 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <div className="flex items-center gap-3">
                  <Sparkles size={15} className="text-[#D6B66D]" />

                  <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-[#D6B66D]">
                    YAMA FLYS
                  </p>
                </div>

                <h1 className="mt-5 font-serif text-5xl leading-none sm:text-6xl md:text-7xl">
                  Almost
                  <span className="block italic text-[#E9BFCB]">Yours</span>
                </h1>

                <p className="mt-6 max-w-xl text-sm leading-7 text-[#DCCFD5]">
                  Enter your details and send your order request directly to
                  YAMA FLYS through WhatsApp.
                </p>
              </div>

              <div className="flex items-center gap-4 border-l border-white/15 pl-5 md:pl-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-[#D6B66D]/30">
                  <ShoppingBag size={18} className="text-[#D6B66D]" />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-[#BDAFB6]">
                    Your Order
                  </p>

                  <p className="font-serif text-3xl">{totalQuantity}</p>

                  <p className="text-[9px] text-[#BDAFB6]">
                    {totalQuantity === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =====================================================
          CHECKOUT
      ===================================================== */}

      <section className="relative z-10 px-5 py-12 sm:px-8 md:px-12 md:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <Link
              to="/cart"
              className="group mb-9 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8F6474] transition hover:text-[#B18A50]"
            >
              <ArrowLeft
                size={15}
                className="transition group-hover:-translate-x-1"
              />
              Back to Cart
            </Link>
          </ScrollReveal>

          <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
            {/* =================================================
                FORM
            ================================================= */}

            <ScrollReveal>
              <div className="rounded-[2rem] border border-[#E5D7DC] bg-white p-6 shadow-[0_20px_60px_rgba(75,48,60,0.08)] sm:p-8 md:p-10">
                <div className="border-b border-[#EAE0E4] pb-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F9EDEF] text-[#9F6878]">
                      <UserRound size={17} />
                    </div>

                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#B18A50]">
                        Your Details
                      </p>

                      <h2 className="mt-1 font-serif text-3xl text-[#3B2635]">
                        Delivery Information
                      </h2>
                    </div>
                  </div>

                  <p className="mt-5 max-w-xl text-sm leading-6 text-[#806F78]">
                    We'll use these details to prepare your order request.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  {/* NAME */}

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#786870]"
                    >
                      <UserRound size={13} />
                      Full Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      autoComplete="name"
                      required
                      minLength={2}
                      className={inputClass}
                    />
                  </div>

                  {/* PHONE + EMAIL */}

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#786870]"
                      >
                        <Phone size={13} />
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        autoComplete="tel"
                        required
                        maxLength={10}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#786870]"
                      >
                        <Mail size={13} />
                        Email
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email address"
                        autoComplete="email"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* ADDRESS */}

                  <div>
                    <label
                      htmlFor="address"
                      className="mb-2 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#786870]"
                    >
                      <MapPin size={13} />
                      Delivery Address
                    </label>

                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House / street / area"
                      rows="5"
                      autoComplete="street-address"
                      required
                      minLength={10}
                      className={`${inputClass} resize-none leading-7`}
                    />
                  </div>

                  {/* CITY + STATE */}

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="city"
                        className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#786870]"
                      >
                        City
                      </label>

                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Your city"
                        autoComplete="address-level2"
                        required
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="state"
                        className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#786870]"
                      >
                        State
                      </label>

                      <input
                        id="state"
                        name="state"
                        type="text"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Your state"
                        autoComplete="address-level1"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* PINCODE */}

                  <div className="sm:max-w-xs">
                    <label
                      htmlFor="pincode"
                      className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#786870]"
                    >
                      Pincode
                    </label>

                    <input
                      id="pincode"
                      name="pincode"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="6-digit pincode"
                      autoComplete="postal-code"
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex min-h-[58px] w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#3B2635] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_15px_35px_rgba(59,38,53,0.18)] transition duration-300 hover:-translate-y-1 hover:bg-[#56394A] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-[#D6B66D]" />
                        Preparing Order...
                      </>
                    ) : (
                      <>
                        <MessageCircle size={18} className="text-[#D6B66D]" />
                        Order via WhatsApp
                        <ArrowRight
                          size={16}
                          className="transition group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>

                  <div className="flex gap-3 rounded-xl bg-[#FAF2F5] p-4">
                    <ShieldCheck
                      size={18}
                      className="mt-0.5 shrink-0 text-[#B18A50]"
                    />

                    <p className="text-[10px] leading-5 text-[#806F78]">
                      No online payment is processed here. Your order is sent
                      through WhatsApp for personal confirmation.
                    </p>
                  </div>
                </form>
              </div>
            </ScrollReveal>

            {/* =================================================
                ORDER SUMMARY
            ================================================= */}

            <ScrollReveal delay={120}>
              <aside className="h-fit lg:sticky lg:top-24">
                <div className="rounded-[2rem] border border-[#E5D7DC] bg-white p-6 shadow-[0_20px_60px_rgba(75,48,60,0.09)] sm:p-7">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#B18A50]">
                        Your Order
                      </p>

                      <h2 className="mt-2 font-serif text-3xl text-[#3B2635]">
                        Summary
                      </h2>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F9EDEF]">
                      <Gem size={18} className="text-[#9F6878]" />
                    </div>
                  </div>

                  <div className="my-7 h-px bg-[#E9DEE2]" />

                  {/* ITEMS */}

                  <div className="space-y-5">
                    {checkoutItems.map((item, index) => (
                      <div
                        key={`${item.id}-${item.selectedSize || "default"}-${index}`}
                        className="flex gap-3"
                      >
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F5E8EC]">
                          <img
                            src={getImage(item)}
                            alt={item.name || "Product"}
                            className="h-full w-full object-cover"
                            onError={(event) => {
                              event.currentTarget.onerror = null;
                              event.currentTarget.src = FALLBACK_IMAGE;
                            }}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 font-serif text-base leading-5 text-[#3B2635]">
                            {item.name}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2 text-[9px]">
                            <span className="rounded-full bg-[#F9EDEF] px-2.5 py-1 text-[#8F6071]">
                              Size {item.selectedSize || "—"}
                            </span>

                            <span className="rounded-full bg-[#FAF4E8] px-2.5 py-1 text-[#97743D]">
                              Qty {Number(item.quantity) || 1}
                            </span>
                          </div>
                        </div>

                        <p className="shrink-0 text-sm font-semibold text-[#3B2635]">
                          ₹
                          {(
                            (Number(item.price) || 0) *
                            (Number(item.quantity) || 1)
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="my-7 h-px bg-[#E9DEE2]" />

                  {/* SUBTOTAL */}

                  <div className="flex justify-between text-sm">
                    <span className="text-[#806F78]">Subtotal</span>

                    <span className="font-semibold">
                      ₹{checkoutTotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* DELIVERY */}

                  <div className="mt-5 flex justify-between gap-4 text-sm">
                    <span className="text-[#806F78]">Delivery</span>

                    <span className="text-right text-xs leading-5 text-[#9B8B92]">
                      Confirmed after order
                    </span>
                  </div>

                  <div className="my-6 h-px bg-[#E9DEE2]" />

                  {/* TOTAL */}

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9A858E]">
                        Total
                      </p>

                      <p className="mt-1 text-[10px] text-[#AA9AA1]">
                        Order value
                      </p>
                    </div>

                    <span className="font-serif text-3xl text-[#3B2635]">
                      ₹{checkoutTotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* INFO */}

                  <div className="mt-7 space-y-3">
                    <div className="flex items-center gap-3 rounded-xl bg-[#FAF2F5] p-3.5">
                      <Check size={15} className="shrink-0 text-[#B18A50]" />

                      <p className="text-[9px] leading-5 text-[#806F78]">
                        Order details prepared for WhatsApp.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl bg-[#FAF2F5] p-3.5">
                      <MessageCircle
                        size={15}
                        className="shrink-0 text-[#9F6878]"
                      />

                      <p className="text-[9px] leading-5 text-[#806F78]">
                        Final confirmation is handled personally through
                        WhatsApp.
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/cart"
                    className="group mt-7 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8F6474] transition hover:text-[#B18A50]"
                  >
                    Review Cart
                    <ArrowRight
                      size={14}
                      className="transition group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </aside>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM
      ===================================================== */}

      <section className="border-t border-[#E7DADF] bg-[#F8E8EC] px-5 py-12 text-center">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Sparkles size={17} className="text-[#B18A50]" />

            <p className="text-sm text-[#806F78]">
              Beautiful details, selected with care.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
};

export default Checkout;

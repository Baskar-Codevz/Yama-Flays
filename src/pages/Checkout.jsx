
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "../Context/CartContext";

const Checkout = () => {
  const { cartItems, cartTotal } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= WHATSAPP ORDER =================
  const handleSubmit = (e) => {
    e.preventDefault();

    const orderItems = cartItems
      .map(
        (item) =>
          `• ${item.name} × ${item.quantity} = ₹${(
            item.price * item.quantity
          ).toLocaleString("en-IN")}`,
      )
      .join("\n");

    const message = `Hello YAMA FLYS,

I would like to place an order.

Customer Details:
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}

Delivery Address:
${formData.address}
${formData.city}, ${formData.state} - ${formData.pincode}

Order Details:
${orderItems}

Total: ₹${cartTotal.toLocaleString("en-IN")}

Please confirm my order and delivery details.

Thank you.`;

    const whatsappUrl = `https://wa.me/917548863591?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");

    setIsSubmitted(true);
  };

  // ================= EMPTY CART =================
  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#faf8f4] px-5 py-16">
        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f1ece5]">
            <ShoppingBag
              size={32}
              strokeWidth={1.3}
              className="text-[#8c7b6d]"
            />
          </div>

          <h1 className="mt-6 font-serif text-3xl text-[#211b17]">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-sm text-[#756a61]">
            Add some beautiful bangles before checking out.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 bg-[#211b17] px-7 py-4 text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#3a2d25]"
          >
            <ArrowLeft size={15} />
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  // ================= SUCCESS =================
  if (isSubmitted) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#faf8f4] px-5 py-16">
        <div className="mx-auto max-w-lg text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#eee8df]">
            <CheckCircle2
              size={38}
              strokeWidth={1.4}
              className="text-[#6f8068]"
            />
          </div>

          <p className="mt-7 text-[10px] uppercase tracking-[0.3em] text-[#9a7656] sm:text-xs">
            YAMA FLAYS
          </p>

          <h1 className="mt-3 font-serif text-3xl text-[#211b17] sm:text-4xl">
            Order Request Sent
          </h1>

          <p className="mt-5 text-sm leading-7 text-[#756a61]">
            Your order details have been opened in WhatsApp.
            Please complete the conversation with YAMA FLAYS to
            confirm your order.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <a
              href="https://wa.me/917548863591"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#211b17] px-7 py-4 text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#3a2d25]"
            >
              <MessageCircle size={17} />
              Open WhatsApp
            </a>

            <Link
              to="/shop"
              className="inline-flex items-center justify-center border border-[#211b17] px-7 py-4 text-xs font-medium uppercase tracking-[0.16em] text-[#211b17] transition-colors hover:bg-[#211b17] hover:text-white"
            >
              Continue Shopping
            </Link>

          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f4]">

      {/* ================= HEADER ================= */}
      <section className="bg-[#f5f0e9] px-5 py-12 text-center sm:px-6 sm:py-16 md:py-20">

        <p className="text-[10px] uppercase tracking-[0.3em] text-[#9a7656] sm:text-xs">
          YAMA FLAYS
        </p>

        <h1 className="mt-3 font-serif text-3xl text-[#211b17] sm:text-4xl md:text-5xl">
          Checkout
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#756a61]">
          Enter your details below and send your order request
          directly through WhatsApp.
        </p>

      </section>

      {/* ================= CHECKOUT CONTENT ================= */}
      <section className="px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-16 lg:px-16">

        <div className="mx-auto max-w-7xl">

          {/* Back */}
          <Link
            to="/cart"
            className="mb-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#756a61] transition-colors hover:text-[#211b17]"
          >
            <ArrowLeft size={15} strokeWidth={1.5} />
            Back to Cart
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">

            {/* ================= CUSTOMER FORM ================= */}
            <div className="border border-[#e1d8ce] bg-white p-5 sm:p-7 md:p-8">

              <div className="border-b border-[#e3dbd2] pb-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#9a7656]">
                  Your Details
                </p>

                <h2 className="mt-2 font-serif text-2xl text-[#211b17] sm:text-3xl">
                  Delivery Information
                </h2>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-6"
              >

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-[#211b17]"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full border border-[#d8cec3] bg-[#fffdfb] px-4 py-3.5 text-sm text-[#211b17] outline-none transition-colors placeholder:text-[#a89d94] focus:border-[#9a7656]"
                  />
                </div>

                {/* Phone + Email */}
                <div className="grid gap-6 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-[#211b17]"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                      className="w-full border border-[#d8cec3] bg-[#fffdfb] px-4 py-3.5 text-sm text-[#211b17] outline-none transition-colors placeholder:text-[#a89d94] focus:border-[#9a7656]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-[#211b17]"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      required
                      className="w-full border border-[#d8cec3] bg-[#fffdfb] px-4 py-3.5 text-sm text-[#211b17] outline-none transition-colors placeholder:text-[#a89d94] focus:border-[#9a7656]"
                    />
                  </div>

                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-[#211b17]"
                  >
                    Delivery Address
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your complete delivery address"
                    rows="4"
                    required
                    className="w-full resize-none border border-[#d8cec3] bg-[#fffdfb] px-4 py-3.5 text-sm text-[#211b17] outline-none transition-colors placeholder:text-[#a89d94] focus:border-[#9a7656]"
                  />
                </div>

                {/* City + State */}
                <div className="grid gap-6 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-[#211b17]"
                    >
                      City
                    </label>

                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                      required
                      className="w-full border border-[#d8cec3] bg-[#fffdfb] px-4 py-3.5 text-sm text-[#211b17] outline-none transition-colors placeholder:text-[#a89d94] focus:border-[#9a7656]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-[#211b17]"
                    >
                      State
                    </label>

                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter state"
                      required
                      className="w-full border border-[#d8cec3] bg-[#fffdfb] px-4 py-3.5 text-sm text-[#211b17] outline-none transition-colors placeholder:text-[#a89d94] focus:border-[#9a7656]"
                    />
                  </div>

                </div>

                {/* Pincode */}
                <div className="sm:max-w-xs">
                  <label
                    htmlFor="pincode"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-[#211b17]"
                  >
                    Pincode
                  </label>

                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    inputMode="numeric"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                    required
                    className="w-full border border-[#d8cec3] bg-[#fffdfb] px-4 py-3.5 text-sm text-[#211b17] outline-none transition-colors placeholder:text-[#a89d94] focus:border-[#9a7656]"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="flex min-h-[54px] w-full items-center justify-center gap-2 bg-[#211b17] px-5 py-4 text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-[#3a2d25]"
                >
                  <MessageCircle size={18} strokeWidth={1.6} />
                  Order via WhatsApp
                </button>

                <p className="text-center text-[11px] leading-5 text-[#8c7b6d]">
                  Your order details will be sent to YAMA FLAYS
                  through WhatsApp for confirmation.
                </p>

              </form>
            </div>

            {/* ================= ORDER SUMMARY ================= */}
            <aside className="h-fit border border-[#e1d8ce] bg-white p-5 sm:p-7 lg:sticky lg:top-6">

              <p className="text-[10px] uppercase tracking-[0.25em] text-[#9a7656]">
                Your Order
              </p>

              <h2 className="mt-2 font-serif text-2xl text-[#211b17]">
                Order Summary
              </h2>

              <div className="my-6 h-px bg-[#e3dbd2]" />

              {/* Products */}
              <div className="space-y-5">

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden bg-[#f1ece5]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="line-clamp-2 text-sm text-[#211b17]">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-[#8c7b6d]">
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <p className="shrink-0 text-sm font-medium text-[#211b17]">
                      ₹
                      {(
                        item.price * item.quantity
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}

              </div>

              <div className="my-6 h-px bg-[#e3dbd2]" />

              {/* Subtotal */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#756a61]">
                  Subtotal
                </span>

                <span className="font-medium text-[#211b17]">
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Delivery */}
              <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                <span className="text-[#756a61]">
                  Delivery
                </span>

                <span className="text-right text-xs text-[#8c7b6d]">
                  Confirmed after order
                </span>
              </div>

              <div className="my-6 h-px bg-[#e3dbd2]" />

              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium uppercase tracking-[0.1em] text-[#211b17]">
                  Total
                </span>

                <span className="font-serif text-2xl text-[#211b17]">
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* WhatsApp Notice */}
              <div className="mt-6 border border-[#e3dbd2] bg-[#faf8f4] p-4">
                <div className="flex gap-3">

                  <MessageCircle
                    size={18}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-[#8c7b6d]"
                  />

                  <p className="text-xs leading-5 text-[#756a61]">
                    After submitting, WhatsApp will open with
                    your complete order details ready to send.
                  </p>

                </div>
              </div>

            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Checkout;

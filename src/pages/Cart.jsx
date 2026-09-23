
import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";

import { useCart } from "../Context/CartContext";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  // ================= EMPTY CART =================
  if (cartItems.length === 0) {
    return (
      <main className="min-h-[70vh] bg-[#faf8f4] px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center text-center">

          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f1ece5]">
            <ShoppingBag
              size={32}
              strokeWidth={1.3}
              className="text-[#8c7b6d]"
            />
          </div>

          <p className="text-[10px] uppercase tracking-[0.3em] text-[#9a7656] sm:text-xs">
            YAMA FLAYS
          </p>

          <h1 className="mt-3 font-serif text-3xl text-[#211b17] sm:text-4xl">
            Your Cart is Empty
          </h1>

          <p className="mt-4 max-w-md text-sm leading-6 text-[#756a61]">
            You haven't added any bangles to your shopping bag yet.
          </p>

          <Link
            to="/shop"
            className="mt-8 bg-[#211b17] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#3a2d25] sm:text-xs"
          >
            Continue Shopping
          </Link>
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
          Shopping Bag
        </h1>

        <p className="mt-4 text-sm text-[#756a61]">
          {cartItems.length}{" "}
          {cartItems.length === 1 ? "item" : "items"} in your bag
        </p>
      </section>

      {/* ================= CART CONTENT ================= */}
      <section className="px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-16 lg:px-16">

        <div className="mx-auto max-w-7xl">

          {/* Back to shop */}
          <Link
            to="/shop"
            className="mb-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#756a61] transition-colors hover:text-[#211b17]"
          >
            <ArrowLeft size={15} strokeWidth={1.5} />
            Continue Shopping
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">

            {/* ================= CART ITEMS ================= */}
            <div className="space-y-5">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-[#e1d8ce] bg-white p-4 sm:p-5"
                >
                  <div className="flex gap-4 sm:gap-6">

                    {/* Product Image */}
                    <Link
                      to={`/product/${item.id}`}
                      className="block h-28 w-28 shrink-0 overflow-hidden bg-[#f1ece5] sm:h-36 sm:w-36"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="min-w-0 flex-1">

                      {/* Category */}
                      <p className="text-[9px] uppercase tracking-[0.18em] text-[#9a7656] sm:text-[10px] sm:tracking-[0.2em]">
                        {item.category}
                      </p>

                      {/* Product Name */}
                      <Link
                        to={`/product/${item.id}`}
                        className="mt-1 block font-serif text-lg leading-6 text-[#211b17] transition-colors hover:text-[#8c6f5a] sm:text-xl"
                      >
                        {item.name}
                      </Link>

                      {/* Price */}
                      <p className="mt-2 text-sm font-medium text-[#211b17]">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>

                      {/* Quantity + Remove */}
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

                        {/* Quantity */}
                        <div className="flex items-center border border-[#d8cec3]">

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1,
                              )
                            }
                            aria-label="Decrease quantity"
                            className="flex h-9 w-9 items-center justify-center text-[#211b17] transition-colors hover:bg-[#f1ece5]"
                          >
                            <Minus
                              size={14}
                              strokeWidth={1.5}
                            />
                          </button>

                          <span className="flex h-9 min-w-9 items-center justify-center border-x border-[#d8cec3] px-2 text-xs">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1,
                              )
                            }
                            aria-label="Increase quantity"
                            className="flex h-9 w-9 items-center justify-center text-[#211b17] transition-colors hover:bg-[#f1ece5]"
                          >
                            <Plus
                              size={14}
                              strokeWidth={1.5}
                            />
                          </button>

                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[#8c7b6d] transition-colors hover:text-red-500"
                        >
                          <Trash2
                            size={15}
                            strokeWidth={1.5}
                          />
                          Remove
                        </button>

                      </div>
                    </div>
                  </div>

                  {/* Item Total - Mobile Friendly */}
                  <div className="mt-4 flex items-center justify-between border-t border-[#eee7df] pt-4">

                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#8c7b6d]">
                      Item Total
                    </span>

                    <span className="text-sm font-medium text-[#211b17]">
                      ₹
                      {(
                        item.price * item.quantity
                      ).toLocaleString("en-IN")}
                    </span>

                  </div>
                </div>
              ))}
            </div>

            {/* ================= ORDER SUMMARY ================= */}
            <aside className="h-fit border border-[#e1d8ce] bg-white p-5 sm:p-7 lg:sticky lg:top-6">

              <p className="text-[10px] uppercase tracking-[0.25em] text-[#9a7656]">
                Order Summary
              </p>

              <h2 className="mt-2 font-serif text-2xl text-[#211b17]">
                Your Order
              </h2>

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
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-[#756a61]">
                  Delivery
                </span>

                <span className="text-[#756a61]">
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

              {/* Checkout */}
              <Link
                to="/checkout"
                className="mt-7 flex min-h-[52px] w-full items-center justify-center bg-[#211b17] px-5 py-4 text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#3a2d25]"
              >
                Proceed to Checkout
              </Link>

              {/* WhatsApp Note */}
              <p className="mt-4 text-center text-[11px] leading-5 text-[#8c7b6d]">
                Your order will be confirmed through WhatsApp
                during checkout.
              </p>

            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;


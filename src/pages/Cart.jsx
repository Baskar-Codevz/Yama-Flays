
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Leaf,
  ShoppingBasket,
} from "lucide-react";

import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import { getImageUrl } from "../utils/imageUrl";
import ScrollReveal from "../components/ScrollReveal";

const FALLBACK_IMAGE = "/assets/img-1.webp";

const UI = {
  page: "text-green-950",
  card: "border border-green-100 bg-white shadow-[0_8px_30px_rgba(20,83,45,0.05)]",
  muted: "text-green-800",
  subtle: "text-green-700",
  border: "border-green-200",
  button:
    "bg-green-900 text-white hover:bg-green-800 active:scale-[0.98]",
  softButton:
    "border border-green-200 bg-green-50 text-green-900 hover:bg-green-100",
  link: "text-green-800 transition-colors hover:text-green-600",
};

const formatPrice = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    clearCart,
  } = useCart();

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const getProductId = (item) => String(item?.id ?? item?._id ?? "");

  const getSizeName = (sizeItem) =>
    String(sizeItem?.name ?? sizeItem?.size ?? "");

  const getItemStock = (item) => {
    if (!Array.isArray(item?.sizes) || !item?.selectedSize) {
      return null;
    }

    const sizeData = item.sizes.find(
      (sizeItem) => getSizeName(sizeItem) === String(item.selectedSize)
    );

    if (!sizeData) return null;

    const stock = Number(sizeData?.stock);

    return Number.isFinite(stock) ? Math.max(0, stock) : 0;
  };

  const getItemImage = (item) => {
    const image =
      Array.isArray(item?.images) && item.images.length > 0
        ? item.images[0]
        : item?.image;

    return image ? getImageUrl(image) : FALLBACK_IMAGE;
  };

  const getItemQuantity = (item) => {
    const quantity = Number(item?.quantity);

    return Number.isFinite(quantity) && quantity >= 1
      ? Math.floor(quantity)
      : 1;
  };

  const getItemPrice = (item) => {
    const price = Number(item?.price);

    return Number.isFinite(price) && price >= 0 ? price : 0;
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }

    navigate("/checkout");
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + getItemQuantity(item),
    0
  );

  if (cartItems.length === 0) {
    return (
      <main
        className={`relative min-h-screen overflow-hidden bg-[#F5F5F5] px-5 pb-20 pt-32 sm:px-8 md:pt-36 ${UI.page}`}
      >
        <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-green-100/70 blur-3xl" />

        <div className="relative mx-auto flex min-h-[65vh] max-w-3xl items-center justify-center">
          <ScrollReveal>
            <div className="w-full border border-green-200 bg-white px-7 py-12 text-center shadow-[0_20px_70px_rgba(20,83,45,0.08)] sm:px-14 sm:py-16">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-green-200 bg-green-50">
                <ShoppingBag
                  size={36}
                  strokeWidth={1.3}
                  className="text-green-800"
                />
              </div>

              <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.35em] text-green-800">
                YAMA FLYS
              </p>

              <h1 className="mt-5 font-serif text-4xl leading-tight text-green-950 sm:text-6xl">
                Your bag is
                <span className="mt-1 block italic text-green-700">
                  waiting for you.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-green-800">
                Discover beautiful bangles, thoughtfully selected to bring
                elegance and a little extra sparkle to your everyday style.
              </p>

              <Link
                to="/shop"
                className={`group mt-9 inline-flex min-h-12 items-center justify-center gap-3 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition duration-300 hover:-translate-y-1 ${UI.button}`}
              >
                Explore the collection
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-green-700">
                <Leaf size={15} />
                <span>Find something beautiful for yourself</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`relative min-h-screen overflow-hidden bg-[#F5F5F5] ${UI.page}`}
    >
      <div className="pointer-events-none absolute -left-40 top-32 h-96 w-96 rounded-full bg-green-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-[45%] h-96 w-96 rounded-full bg-green-100/60 blur-3xl" />

      {/* Header */}
      <section className="relative border-b border-green-200 bg-green-950 px-5 pb-12 pt-32 text-white sm:px-8 sm:pt-36 md:px-12 md:pb-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <div className="flex items-center gap-3 text-green-200">
                  <Leaf size={16} strokeWidth={1.5} />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.35em]">
                    YAMA FLAYS · YOUR SELECTION
                  </p>
                </div>

                <h1 className="mt-6 font-serif text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
                  Your Shopping
                  <span className="mt-2 block italic text-green-300">
                    Bag.
                  </span>
                </h1>

                <p className="mt-5 max-w-lg text-sm leading-7 text-green-100/80">
                  Every little detail matters. Review your selected pieces
                  before placing your order.
                </p>
              </div>

              <div className="flex w-fit items-center gap-4 border border-green-700 bg-green-900/70 px-5 py-4">
                <div className="flex h-12 w-12 items-center justify-center bg-green-800 text-green-100">
                  <ShoppingBasket size={22} strokeWidth={1.4} />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.22em] text-green-200">
                    Total quantity
                  </p>
                  <p className="mt-1 font-serif text-3xl text-white">
                    {totalItems}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Cart content */}
      <section className="relative z-10 px-4 py-9 sm:px-8 sm:py-12 md:px-12 md:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <Link
              to="/shop"
              className={`group mb-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] ${UI.link}`}
            >
              <ArrowLeft
                size={15}
                className="transition-transform group-hover:-translate-x-1"
              />
              Continue shopping
            </Link>
          </ScrollReveal>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] xl:gap-12">
            {/* Product list */}
            <div className="min-w-0 space-y-4">
              <div className="mb-5 flex items-center justify-between border-b border-green-200 pb-4">
                <h2 className="font-serif text-2xl text-green-950">
                  Selected pieces
                </h2>

                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-green-700">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                </span>
              </div>

              {cartItems.map((item, index) => {
                const productId = getProductId(item);
                const quantity = getItemQuantity(item);
                const price = getItemPrice(item);
                const maxStock = getItemStock(item);
                const hasStockLimit = maxStock !== null;
                const canIncrease =
                  (!hasStockLimit || quantity < maxStock) &&
                  !(hasStockLimit && maxStock === 0);
                const itemTotal = price * quantity;

                return (
                  <ScrollReveal
                    key={`${productId}-${item.selectedSize || "default"}`}
                    delay={(index % 3) * 70}
                  >
                    <article
                      className={`group overflow-hidden transition duration-300 hover:border-green-300 hover:shadow-[0_12px_35px_rgba(20,83,45,0.08)] ${UI.card}`}
                    >
                      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:gap-5 sm:p-5 md:p-6">
                        {/* Product image */}
                        <Link
                          to={`/product/${productId}`}
                          aria-label={`View ${item?.name || "product"}`}
                          className="group/image relative block aspect-[4/3] w-full shrink-0 overflow-hidden bg-green-50 sm:aspect-square sm:w-32 md:w-40"
                        >
                          <img
                            src={getItemImage(item)}
                            alt={item?.name || "Bangle"}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-700 group-hover/image:scale-110"
                            onError={(event) => {
                              event.currentTarget.onerror = null;
                              event.currentTarget.src = FALLBACK_IMAGE;
                            }}
                          />

                          <div className="absolute inset-0 bg-green-950/0 transition-colors duration-300 group-hover/image:bg-green-950/10" />

                          <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center bg-white text-green-900 opacity-0 shadow-sm transition group-hover/image:opacity-100">
                            <ArrowUpRight size={15} />
                          </div>
                        </Link>

                        {/* Product information */}
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-green-700">
                                {item?.category || "YAMA FLYS COLLECTION"}
                              </p>

                              <Link
                                to={`/product/${productId}`}
                                className="mt-2 inline-block font-serif text-xl leading-tight text-green-950 transition-colors hover:text-green-700 sm:text-2xl"
                              >
                                {item?.name || "Bangle"}
                              </Link>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                removeFromCart(productId, item.selectedSize)
                              }
                              aria-label={`Remove ${item?.name || "product"}`}
                              className="flex h-9 w-9 shrink-0 items-center justify-center border border-green-100 text-green-800 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>

                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span className="text-[10px] uppercase tracking-[0.12em] text-green-700">
                              Size
                            </span>

                            <span className="border border-green-200 bg-green-50 px-3 py-1 text-[10px] font-semibold text-green-900">
                              {item?.selectedSize || "Not selected"}
                            </span>
                          </div>

                          <div className="mt-4 flex flex-wrap items-baseline gap-2">
                            <span className="font-serif text-xl font-semibold text-green-950">
                              {formatPrice(price)}
                            </span>

                            {Number(item?.originalPrice) > price && (
                              <span className="text-xs text-green-600/70 line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>

                          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                            {/* Quantity selector */}
                            <div className="inline-flex items-center border border-green-200 bg-[#F5F5F5]">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    productId,
                                    quantity - 1,
                                    item.selectedSize
                                  )
                                }
                                disabled={quantity <= 1}
                                aria-label="Decrease quantity"
                                className="flex h-10 w-10 items-center justify-center text-green-900 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-35"
                              >
                                <Minus size={14} />
                              </button>

                              <span
                                aria-live="polite"
                                className="flex h-10 min-w-10 items-center justify-center border-x border-green-200 px-2 text-sm font-semibold text-green-950"
                              >
                                {quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    productId,
                                    quantity + 1,
                                    item.selectedSize
                                  )
                                }
                                disabled={!canIncrease}
                                aria-label="Increase quantity"
                                className="flex h-10 w-10 items-center justify-center text-green-900 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-35"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <div className="text-right">
                              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-green-700">
                                Item total
                              </p>
                              <p className="mt-1 font-serif text-xl text-green-950">
                                {formatPrice(itemTotal)}
                              </p>
                            </div>
                          </div>

                          {hasStockLimit && (
                            <p
                              className={`mt-3 text-[10px] leading-5 ${
                                maxStock === 0
                                  ? "text-red-700"
                                  : quantity >= maxStock
                                    ? "text-amber-700"
                                    : "text-green-800"
                              }`}
                            >
                              {maxStock === 0
                                ? `Size ${item.selectedSize} is currently out of stock.`
                                : quantity >= maxStock
                                  ? `Maximum available stock reached for size ${item.selectedSize}.`
                                  : `${maxStock - quantity} more available in size ${item.selectedSize}.`}
                            </p>
                          )}
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                );
              })}

              <div className="flex items-start gap-3 border border-green-200 bg-green-50/80 p-4 sm:p-5">
                <ShieldCheck
                  size={19}
                  className="mt-0.5 shrink-0 text-green-800"
                />
                <div>
                  <p className="text-xs font-semibold text-green-950">
                    Personal order confirmation
                  </p>
                  <p className="mt-1 text-xs leading-6 text-green-800">
                    Your order details will be collected at checkout. The team
                    will contact you to confirm delivery arrangements.
                  </p>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <ScrollReveal delay={100}>
              <aside className="lg:sticky lg:top-24">
                <div className="overflow-hidden border border-green-200 bg-white shadow-[0_15px_45px_rgba(20,83,45,0.08)]">
                  <div className="bg-green-950 px-6 py-6 text-white sm:px-7">
                    <div className="flex items-center gap-2 text-green-200">
                      <ShoppingBag size={15} />
                      <p className="text-[9px] font-semibold uppercase tracking-[0.25em]">
                        YAMA FLYS
                      </p>
                    </div>

                    <h2 className="mt-3 font-serif text-3xl">
                      Order summary
                    </h2>

                    <p className="mt-2 text-xs leading-5 text-green-100/75">
                      A final look at your selected pieces.
                    </p>
                  </div>

                  <div className="p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-green-800">Total quantity</span>
                      <span className="font-semibold text-green-950">
                        {totalItems}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3 text-sm">
                      <span className="text-green-800">Subtotal</span>
                      <span className="font-semibold text-green-950">
                        {formatPrice(cartTotal)}
                      </span>
                    </div>

                    <div className="mt-5 flex items-start justify-between gap-3 text-sm">
                      <span className="text-green-800">Delivery</span>
                      <span className="max-w-36 text-right text-xs leading-5 text-green-700">
                        To be confirmed with your order
                      </span>
                    </div>

                    <div className="my-6 border-t border-dashed border-green-200" />

                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-green-700">
                        Order total
                      </p>

                      <p className="mt-2 font-serif text-4xl text-green-950">
                        {formatPrice(cartTotal)}
                      </p>

                      <p className="mt-2 text-[10px] leading-5 text-green-700">
                        Delivery charges, if any, will be confirmed separately.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleCheckout}
                      className={`group mt-7 flex min-h-14 w-full items-center justify-center gap-3 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.16em] transition duration-300 hover:-translate-y-0.5 ${UI.button}`}
                    >
                      Proceed to checkout
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>

                    <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-green-800">
                      <ShieldCheck size={15} />
                      <span>Your details are collected at checkout</span>
                    </div>

                    <button
                      type="button"
                      onClick={clearCart}
                      className="mt-6 w-full border-t border-green-100 pt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-green-700 transition hover:text-red-700"
                    >
                      Clear entire bag
                    </button>

                    <Link
                      to="/shop"
                      className={`group mt-5 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] ${UI.link}`}
                    >
                      Discover more bangles
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </aside>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <section className="relative border-t border-green-200 bg-white px-5 py-10 text-center sm:py-12">
        <ScrollReveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-3">
            <Leaf size={20} strokeWidth={1.4} className="text-green-800" />

            <p className="font-serif text-2xl text-green-950">
              Beauty in every detail.
            </p>

            <p className="text-xs leading-6 text-green-800">
              Thoughtfully selected pieces, from YAMA FLYS to you.
            </p>

            <div className="mt-2 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-green-700">
              <Sparkles size={13} />
              <span>Made to complement your style</span>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
};

export default Cart;

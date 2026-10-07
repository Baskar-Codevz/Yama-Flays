import React from "react";
import { Link ,useNavigate} from "react-router-dom";
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
} from "lucide-react";

import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import { getImageUrl } from "../utils/imageUrl";
import ScrollReveal from "../components/ScrollReveal";

const FALLBACK_IMAGE = "/assets/img-1.webp";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } =
    useCart();
      const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const getProductId = (item) => String(item?.id ?? item?._id ?? "");

  const getSizeName = (sizeItem) =>
    String(sizeItem?.name ?? sizeItem?.size ?? "");

  const getItemStock = (item) => {
    if (!Array.isArray(item?.sizes) || !item?.selectedSize) return null;

    const sizeData = item.sizes.find(
      (sizeItem) => getSizeName(sizeItem) === String(item.selectedSize),
    );

    if (!sizeData) return null;

    const stock = Number(sizeData?.stock);
    return Number.isFinite(stock) ? stock : 0;
  };

  const getItemImage = (item) => {
    let image = "";

    if (Array.isArray(item?.images) && item.images.length) {
      image = item.images[0];
    } else if (item?.image) {
      image = item.image;
    }

    return image ? getImageUrl(image) : FALLBACK_IMAGE;
  };

  const getItemQuantity = (item) => {
    const quantity = Number(item?.quantity);
    return Number.isFinite(quantity) && quantity >= 1 ? quantity : 1;
  };

  const getItemPrice = (item) => {
    const price = Number(item?.price);
    return Number.isFinite(price) && price >= 0 ? price : 0;
  };
   
    const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: "/checkout",
        },
      });

      return;
    }

    navigate("/checkout");
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + getItemQuantity(item),
    0,
  );

  if (!cartItems.length) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#FCF8F4] px-5 pb-20 pt-32 text-[#3B2635] sm:px-8 md:pt-36">
        <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-[#F3DCE2]/70 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#E8D5DD]/60 blur-3xl" />

        <div className="relative mx-auto flex min-h-[65vh] max-w-3xl items-center justify-center">
          <ScrollReveal>
            <div className="w-full rounded-[2rem] border border-[#E8D9DE] bg-white/90 px-7 py-14 text-center shadow-[0_25px_80px_rgba(88,53,67,0.10)] backdrop-blur sm:px-12">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#F9EDEF] ring-1 ring-[#C9A86A]/30">
                <ShoppingBag
                  size={34}
                  strokeWidth={1.15}
                  className="text-[#9F6878]"
                />
              </div>

              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#B18A50]">
                YAMA FLYS
              </p>

              <h1 className="mt-4 font-serif text-4xl leading-tight text-[#3B2635] sm:text-5xl">
                Your bag is
                <span className="block italic text-[#B47788]">
                  waiting for you
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#806F78]">
                Discover beautiful bangles selected to add a little more sparkle
                to your everyday style.
              </p>

              <Link
                to="/shop"
                className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#3B2635] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#56394A]"
              >
                Explore Bangles
                <ArrowRight
                  size={16}
                  strokeWidth={1.4}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FCF8F4] text-[#3B2635]">
      <div className="pointer-events-none absolute -left-48 top-24 h-[30rem] w-[30rem] rounded-full bg-[#F3DCE2]/65 blur-3xl" />
      <div className="pointer-events-none absolute -right-48 top-[45%] h-[30rem] w-[30rem] rounded-full bg-[#E8D5DD]/55 blur-3xl" />

      <section className="relative z-10 border-b border-[#E8DCE0] bg-[#F8E8EC] px-5 pb-14 pt-32 sm:px-8 sm:pt-36 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <div className="flex items-center gap-3">
                  <Sparkles
                    size={15}
                    className="text-[#B18A50]"
                    strokeWidth={1.4}
                  />
                  <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-[#B18A50]">
                    YAMA FLYS
                  </p>
                </div>

                <h1 className="mt-5 font-serif text-5xl leading-none text-[#3B2635] sm:text-6xl md:text-7xl">
                  Your Shopping
                  <span className="block italic text-[#B47788]">Bag</span>
                </h1>

                <p className="mt-6 max-w-xl text-sm leading-7 text-[#786871]">
                  A little collection of pieces you've chosen for yourself.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-[#C9A86A]/30">
                  <ShoppingBag
                    size={18}
                    className="text-[#9F6878]"
                    strokeWidth={1.3}
                  />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#8D7881]">
                    Selected
                  </p>
                  <p className="font-serif text-3xl text-[#3B2635]">
                    {totalItems}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative z-10 px-5 py-12 sm:px-8 md:px-12 md:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <Link
              to="/shop"
              className="group mb-9 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8F6474] transition hover:text-[#B18A50]"
            >
              <ArrowLeft
                size={15}
                strokeWidth={1.4}
                className="transition group-hover:-translate-x-1"
              />
              Continue Shopping
            </Link>
          </ScrollReveal>

          <div className="grid gap-10 lg:grid-cols-[1fr_390px] lg:gap-14">
            <div className="space-y-5">
              {cartItems.map((item, index) => {
                const productId = getProductId(item);
                const quantity = getItemQuantity(item);
                const price = getItemPrice(item);
                const maxStock = getItemStock(item);
                const hasStockLimit = maxStock !== null;
                const canIncrease = !hasStockLimit || quantity < maxStock;
                const itemTotal = price * quantity;

                return (
                  <ScrollReveal
                    key={`${productId}-${item.selectedSize || "default"}`}
                    delay={(index % 3) * 70}
                  >
                    <article className="overflow-hidden rounded-[1.6rem] border border-[#E7DADF] bg-white shadow-[0_15px_45px_rgba(75,48,60,0.07)] transition duration-300 hover:-translate-y-0.5">
                      <div className="p-4 sm:p-5 md:p-6">
                        <div className="flex gap-4 sm:gap-6">
                          <Link
                            to={`/product/${productId}`}
                            className="group relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-[#F5E8EC] sm:h-36 sm:w-36 md:h-40 md:w-40"
                          >
                            <img
                              src={getItemImage(item)}
                              alt={item?.name || "Bangle"}
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                              onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = FALLBACK_IMAGE;
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#3B2635]/25 to-transparent" />
                            <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-[#3B2635] opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100">
                              <ArrowUpRight size={14} />
                            </div>
                          </Link>

                          <div className="min-w-0 flex-1">
                            <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#B18A50]">
                              {item?.category || "YAMA FLYS"}
                            </p>

                            <Link
                              to={`/product/${productId}`}
                              className="mt-1 block font-serif text-lg leading-6 text-[#3B2635] transition hover:text-[#A9697B] sm:text-xl md:text-2xl"
                            >
                              {item?.name || "Bangle"}
                            </Link>

                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <span className="text-[9px] uppercase tracking-[0.15em] text-[#98858D]">
                                Size
                              </span>
                              <span className="rounded-full bg-[#F8E8EC] px-2.5 py-1 text-[10px] font-medium text-[#8F6071]">
                                {item?.selectedSize || "Not selected"}
                              </span>
                            </div>

                            <div className="mt-3 flex items-center gap-2">
                              <span className="text-sm font-semibold text-[#3B2635] sm:text-base">
                                ₹{price.toLocaleString("en-IN")}
                              </span>
                              {Number(item?.originalPrice) > price && (
                                <span className="text-xs text-[#A5969C] line-through">
                                  ₹
                                  {Number(item.originalPrice).toLocaleString(
                                    "en-IN",
                                  )}
                                </span>
                              )}
                            </div>

                            <div className="mt-4 flex flex-wrap items-center gap-4">
                              <div className="flex overflow-hidden rounded-full border border-[#E1D2D8] bg-[#FCF8F4]">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      productId,
                                      quantity - 1,
                                      item.selectedSize,
                                    )
                                  }
                                  disabled={quantity <= 1}
                                  className="flex h-9 w-9 items-center justify-center text-[#6F5B64] transition hover:bg-[#F8E8EC] hover:text-[#9F6878] disabled:opacity-35"
                                >
                                  <Minus size={13} />
                                </button>
                                <span className="flex h-9 min-w-10 items-center justify-center border-x border-[#E1D2D8] px-2 text-xs font-semibold text-[#3B2635]">
                                  {quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      productId,
                                      quantity + 1,
                                      item.selectedSize,
                                    )
                                  }
                                  disabled={!canIncrease}
                                  className="flex h-9 w-9 items-center justify-center text-[#6F5B64] transition hover:bg-[#F8E8EC] hover:text-[#9F6878] disabled:opacity-35"
                                >
                                  <Plus size={13} />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  removeFromCart(productId, item.selectedSize)
                                }
                                className="inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#9A858E] transition hover:text-[#B06D79]"
                              >
                                <Trash2 size={13} />
                                Remove
                              </button>
                            </div>

                            {hasStockLimit && (
                              <p
                                className={`mt-3 text-[10px] ${maxStock === 0 ? "text-[#B06D79]" : quantity >= maxStock ? "text-[#A0783D]" : "text-[#9A858E]"}`}
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

                        <div className="mt-5 flex items-center justify-between border-t border-[#EEE4E7] pt-4">
                          <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#A08D95]">
                            Item Total
                          </span>
                          <span className="font-serif text-lg text-[#3B2635]">
                            ₹{itemTotal.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal delay={120}>
              <aside className="h-fit lg:sticky lg:top-24">
                <div className="rounded-[1.8rem] border border-[#E5D7DC] bg-white p-6 shadow-[0_20px_60px_rgba(75,48,60,0.09)] sm:p-7">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#B18A50]">
                    Your Order
                  </p>
                  <h2 className="mt-2 font-serif text-3xl text-[#3B2635]">
                    Summary
                  </h2>

                  <div className="my-7 h-px bg-[#E9DEE2]" />

                  <div className="flex justify-between text-sm">
                    <span className="text-[#806F78]">Items</span>
                    <span className="font-semibold text-[#3B2635]">
                      {totalItems}
                    </span>
                  </div>

                  <div className="mt-5 flex justify-between text-sm">
                    <span className="text-[#806F78]">Subtotal</span>
                    <span className="font-semibold text-[#3B2635]">
                      ₹{Number(cartTotal).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="mt-5 flex justify-between gap-4 text-sm">
                    <span className="text-[#806F78]">Delivery</span>
                    <span className="text-right text-xs leading-5 text-[#9B8B92]">
                      Confirmed after order
                    </span>
                  </div>

                  <div className="my-6 h-px bg-[#E9DEE2]" />

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
                      ₹{Number(cartTotal).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    type="button"
                    className="group mt-7 flex min-h-[55px] w-full items-center justify-center gap-3 rounded-xl bg-[#3B2635] px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#56394A]"
                  >
                    Proceed to Checkout
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </button>

                  <div className="mt-5 flex gap-3 rounded-xl bg-[#FAF2F5] p-4">
                    <ShieldCheck
                      size={17}
                      className="mt-0.5 shrink-0 text-[#B18A50]"
                    />
                    <p className="text-[10px] leading-5 text-[#806F78]">
                      Your order will be confirmed personally through WhatsApp.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={clearCart}
                    className="mt-5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#A08D95] transition hover:text-[#B06D79]"
                  >
                    Clear Cart
                  </button>

                  <Link
                    to="/shop"
                    className="group mt-5 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8F6474] transition hover:text-[#B18A50]"
                  >
                    Continue Shopping
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

      <section className="border-t border-[#E7DADF] bg-[#F8E8EC] px-5 py-12 text-center">
        <ScrollReveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-3 sm:flex-row">
            <Sparkles size={17} className="text-[#B18A50]" />
            <p className="text-sm text-[#806F78]">
              Beautiful details, selected with care by YAMA FLYS.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
};

export default Cart;

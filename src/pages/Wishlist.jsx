
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Check,
} from "lucide-react";

import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";
import ScrollReveal from "../components/ScrollReveal";

const FALLBACK_IMAGE = "/assets/img-1.webp";
const API_BASE_URL = "https://yama-flays-backend.onrender.com";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [selectedSizes, setSelectedSizes] = useState({});
  const [addedProductId, setAddedProductId] = useState(null);

  const getProductId = (product) =>
    String(product?.id ?? product?._id ?? "");

  const getSizeName = (sizeItem) =>
    String(sizeItem?.name ?? sizeItem?.size ?? "");

  useEffect(() => {
    setSelectedSizes((prev) => {
      const next = { ...prev };

      wishlistItems.forEach((product) => {
        const productId = getProductId(product);

        if (
          !productId ||
          next[productId] !== undefined ||
          !Array.isArray(product.sizes)
        ) {
          return;
        }

        const firstAvailableSize = product.sizes.find(
          (sizeItem) => Number(sizeItem?.stock) > 0
        );

        if (firstAvailableSize) {
          next[productId] = getSizeName(firstAvailableSize);
        }
      });

      return next;
    });
  }, [wishlistItems]);

  const getProductImage = (product) => {
    const image =
      Array.isArray(product?.images) && product.images.length > 0
        ? product.images[0]
        : product?.image;

    if (!image || typeof image !== "string") {
      return FALLBACK_IMAGE;
    }

    if (/^https?:\/\//i.test(image)) {
      return image;
    }

    if (image.startsWith("/uploads/")) {
      return `${API_BASE_URL}${image}`;
    }

    if (image.startsWith("uploads/")) {
      return `${API_BASE_URL}/${image}`;
    }

    if (image.startsWith("/assets/")) {
      return image;
    }

    return image;
  };

  const getSelectedSizeData = (product) => {
    const productId = getProductId(product);
    const selectedSize = selectedSizes[productId];

    if (!selectedSize || !Array.isArray(product?.sizes)) {
      return null;
    }

    return product.sizes.find(
      (sizeItem) => getSizeName(sizeItem) === String(selectedSize)
    );
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [String(productId)]: String(size),
    }));

    setAddedProductId(null);
  };

  const handleAddToCart = (product) => {
    const productId = getProductId(product);
    const selectedSize = selectedSizes[productId];

    if (!productId) {
      console.error("Cannot add wishlist product: ID missing", product);
      return;
    }

    if (!selectedSize) {
      alert("Please select a bangle size.");
      return;
    }

    const selectedSizeData = getSelectedSizeData(product);
    const stock = Number(selectedSizeData?.stock ?? 0);

    if (stock <= 0) {
      alert("This size is currently out of stock.");
      return;
    }

    addToCart(product, 1, selectedSize);
    setAddedProductId(productId);

    window.setTimeout(() => {
      setAddedProductId((currentId) =>
        currentId === productId ? null : currentId
      );
    }, 1600);
  };

  const handleRemove = (productId) => {
    const normalizedProductId = String(productId);

    removeFromWishlist(normalizedProductId);

    setSelectedSizes((prev) => {
      const next = { ...prev };
      delete next[normalizedProductId];
      return next;
    });

    if (String(addedProductId) === normalizedProductId) {
      setAddedProductId(null);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F5F5F5] text-[#173D2B]">
      <style>{`
        @keyframes wishlistRise {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes wishlistFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @keyframes wishlistRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes wishlistShimmer {
          0% { transform: translateX(-140%); }
          100% { transform: translateX(140%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .wishlist-motion {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* GREEN HERO SECTION */}
      <section className="relative  overflow-hidden bg-[#173D2B] px-5 py-16 sm:px-8 md:px-12 md:py-24 lg:px-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#D5C18A]/20 wishlist-motion" />

        <div className="pointer-events-none absolute -bottom-36 -left-24 h-80 w-80 rounded-full bg-[#52765A]/25 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-end gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div style={{ animation: "wishlistRise 800ms ease-out both" }}>
            <div className="mb-7 flex items-center gap-3">
              <Sparkles
                size={17}
                strokeWidth={1.3}
                className="text-[#D5C18A]"
              />
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D5C18A]">
                YAMA FLAYS
              </p>
            </div>

            <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
              Things You
              <span className="mt-1 block italic text-[#C4D8C4]">
                Love.
              </span>
            </h1>

            <div className="mt-7 h-px w-16 bg-[#D5C18A]" />

            <p className="mt-7 max-w-xl text-sm leading-7 text-[#D5E0D7] md:text-base md:leading-8">
              A collection of the YAMA FLYS designs you have chosen to keep
              close. Your favourites, all in one place.
            </p>
          </div>

          <div
            className="md:justify-self-end"
            style={{ animation: "wishlistRise 900ms ease-out 120ms both" }}
          >
            <div className="flex items-center gap-5 border-l border-[#D5C18A]/40 pl-6">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 wishlist-motion"
                style={{ animation: "wishlistFloat 5s ease-in-out infinite" }}
              >
                <Heart
                  size={23}
                  strokeWidth={1.3}
                  className="text-[#D5C18A]"
                />
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.24em] text-[#C4D8C4]">
                  Saved Items
                </p>
                <p className="mt-1 font-serif text-4xl text-white">
                  {wishlistItems.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="px-5 py-12 sm:px-8 md:px-12 md:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {wishlistItems.length === 0 ? (
            <ScrollReveal>
              <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[1.75rem] border border-[#E0E7E0] bg-white shadow-[0_12px_40px_rgba(23,61,43,0.05)] md:min-h-[440px] md:grid-cols-[0.85fr_1.15fr]">
                <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-[#EAF0E9]">
                  <div className="pointer-events-none absolute h-64 w-64 rounded-full border border-[#A9BDAA]/50" />

                  <div className="pointer-events-none absolute h-48 w-48 rounded-full border border-[#A9BDAA]/35" />

                  <div
                    className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#D5C18A]/60 bg-white shadow-sm"
                    style={{ animation: "wishlistFloat 5s ease-in-out infinite" }}
                  >
                    <Heart
                      size={37}
                      strokeWidth={1.2}
                      className="text-[#28583D]"
                    />
                  </div>
                </div>

                <div className="flex items-center px-7 py-12 sm:px-12 md:px-14">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#64856B]">
                      Your Collection
                    </p>

                    <h2 className="mt-4 font-serif text-4xl leading-tight text-[#173D2B] sm:text-5xl">
                      Nothing saved
                      <span className="block italic text-[#64856B]">
                        just yet.
                      </span>
                    </h2>

                    <div className="mt-6 h-px w-12 bg-[#D5C18A]" />

                    <p className="mt-6 max-w-md text-sm leading-7 text-[#587363]">
                      Save the bangles that catch your eye. They will stay
                      here until you are ready to explore them again.
                    </p>

                    <Link
                      to="/shop"
                      className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#173D2B] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#28583D]"
                    >
                      Explore Collection
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ) : (
            <div className="grid gap-9 lg:grid-cols-[230px_minmax(0,1fr)] xl:gap-12">
              {/* SIDE INTRO */}
              <ScrollReveal>
                <aside className="lg:sticky lg:top-28 lg:self-start">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#64856B]">
                    My Wishlist
                  </p>

                  <h2 className="mt-4 font-serif text-4xl leading-tight text-[#173D2B]">
                    Your
                    <span className="block italic text-[#64856B]">
                      Favorites.
                    </span>
                  </h2>

                  <div className="mt-5 h-px w-12 bg-[#D5C18A]" />

                  <p className="mt-6 text-sm leading-7 text-[#587363]">
                    Pieces you have saved for another look, another occasion,
                    or simply because you love them.
                  </p>

                  <div className="mt-8 border-t border-[#DDE5DD] pt-6">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#7A8C80]">
                      Saved Items
                    </p>
                    <p className="mt-2 font-serif text-4xl text-[#173D2B]">
                      {wishlistItems.length}
                    </p>
                  </div>

                  <Link
                    to="/shop"
                    className="group mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-[#173D2B] px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#28583D]"
                  >
                    Continue Shopping
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </aside>
              </ScrollReveal>

              {/* PRODUCT GRID */}
              <div className="grid min-w-0 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {wishlistItems.map((product, index) => {
                  const productId = getProductId(product);
                  const isAdded = String(addedProductId) === productId;
                  const selectedSize = selectedSizes[productId];
                  const selectedSizeData = getSelectedSizeData(product);
                  const selectedStock = Number(selectedSizeData?.stock ?? 0);
                  const hasSizes =
                    Array.isArray(product.sizes) && product.sizes.length > 0;

                  return (
                    <ScrollReveal
                      key={productId}
                      delay={(index % 3) * 80}
                    >
                      <article className="group/card h-full overflow-hidden rounded-[1.5rem] border border-[#E0E7E0] bg-white shadow-[0_8px_28px_rgba(23,61,43,0.04)] transition-all duration-500 hover:-translate-y-1 hover:border-[#B8CCB8] hover:shadow-[0_18px_45px_rgba(23,61,43,0.09)]">
                        {/* PRODUCT IMAGE */}
                        <div className="relative overflow-hidden bg-[#EAF0E9]">
                          <Link
                            to={`/product/${productId}`}
                            className="block"
                            aria-label={`View ${product.name || "Bangle"}`}
                          >
                            <div className="relative aspect-square overflow-hidden">
                              <img
                                src={getProductImage(product)}
                                alt={product.name || "Bangle"}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                                onError={(event) => {
                                  event.currentTarget.onerror = null;
                                  event.currentTarget.src = FALLBACK_IMAGE;
                                }}
                              />

                              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#173D2B]/30 via-transparent to-transparent" />

                              <div className="pointer-events-none absolute inset-4 border border-white/50 transition-all duration-500 group-hover/card:inset-5 group-hover/card:border-[#D5C18A]/80" />

                              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-[#173D2B]/85 px-3 py-2 text-[8px] font-medium uppercase tracking-[0.15em] text-white backdrop-blur-md">
                                <Heart
                                  size={12}
                                  className="fill-[#D5C18A] text-[#D5C18A]"
                                />
                                Saved
                              </div>

                              <div className="absolute bottom-5 right-5 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/40 bg-white/90 text-[#173D2B] opacity-0 shadow-sm transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
                                <ArrowUpRight size={16} />
                              </div>
                            </div>
                          </Link>

                          {/* REMOVE FROM WISHLIST */}
                          <button
                            type="button"
                            onClick={() => handleRemove(productId)}
                            aria-label={`Remove ${product.name || "Bangle"} from wishlist`}
                            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#E0E7E0] bg-white/95 text-[#28583D] shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 size={15} strokeWidth={1.5} />
                          </button>
                        </div>

                        {/* PRODUCT DETAILS */}
                        <div className="flex h-full flex-col p-5">
                          <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#7A8C80]">
                            {product.category || "YAMA FLYS"}
                          </p>

                          <Link
                            to={`/product/${productId}`}
                            className="mt-2 block font-serif text-2xl leading-tight text-[#173D2B] transition-colors duration-300 hover:text-[#64856B]"
                          >
                            {product.name || "Bangle"}
                          </Link>

                          {/* PRICE */}
                          <div className="mt-3 flex items-center gap-3">
                            <span className="text-base font-semibold text-[#173D2B]">
                              ₹{Number(product.price || 0).toLocaleString("en-IN")}
                            </span>

                            {Number(product.originalPrice) >
                              Number(product.price) && (
                              <span className="text-xs text-[#9AA69D] line-through">
                                ₹
                                {Number(product.originalPrice).toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>

                          <div className="mt-5 h-px w-8 bg-[#D5C18A] transition-all duration-500 group-hover/card:w-14" />

                          {/* SIZE SELECTOR */}
                          {hasSizes ? (
                            <div className="mt-5">
                              <div className="flex items-center justify-between gap-3">
                                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#587363]">
                                  Select Size
                                </p>

                                {selectedSize && (
                                  <span className="text-[9px] text-[#64856B]">
                                    Size {selectedSize}
                                  </span>
                                )}
                              </div>

                              <div className="mt-3 flex flex-wrap gap-2">
                                {product.sizes.map((sizeItem) => {
                                  const currentSize = getSizeName(sizeItem);
                                  const isSelected =
                                    String(selectedSize) === String(currentSize);
                                  const stock = Number(sizeItem?.stock ?? 0);
                                  const isOutOfStock = stock <= 0;

                                  return (
                                    <button
                                      key={sizeItem?._id || currentSize}
                                      type="button"
                                      disabled={isOutOfStock}
                                      onClick={() =>
                                        handleSizeChange(productId, currentSize)
                                      }
                                      className={`min-w-11 rounded-xl border px-3 py-2 text-[10px] font-medium transition-all duration-200 ${
                                        isOutOfStock
                                          ? "cursor-not-allowed border-[#E5E9E5] bg-[#F1F2F0] text-[#A0AAA2]"
                                          : isSelected
                                            ? "border-[#173D2B] bg-[#173D2B] text-white shadow-sm"
                                            : "border-[#DCE5DC] bg-[#F8FAF7] text-[#28583D] hover:border-[#8FAF91] hover:bg-[#EFF4EE]"
                                      }`}
                                    >
                                      {currentSize}
                                    </button>
                                  );
                                })}
                              </div>

                              {selectedSize && selectedSizeData && (
                                <p
                                  className={`mt-2 text-[9px] ${
                                    selectedStock <= 0
                                      ? "text-red-700"
                                      : "text-[#64856B]"
                                  }`}
                                >
                                  {selectedStock > 0
                                    ? `${selectedStock} available`
                                    : "Sold out"}
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="mt-5 text-[10px] leading-5 text-[#7A8C80]">
                              Choose a size on the product page.
                            </p>
                          )}

                          {/* ACTION BUTTON */}
                          <div className="mt-auto pt-5">
                            {hasSizes ? (
                              <button
                                type="button"
                                onClick={() => handleAddToCart(product)}
                                disabled={!selectedSize || selectedStock <= 0}
                                className={`group/cart relative flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl border px-4 py-3.5 text-[9px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                                  isAdded
                                    ? "border-[#52785A] bg-[#52785A] text-white"
                                    : !selectedSize || selectedStock <= 0
                                      ? "cursor-not-allowed border-[#DCE5DC] bg-[#F0F2EF] text-[#99A69C]"
                                      : "border-[#173D2B] bg-[#173D2B] text-white hover:bg-[#28583D]"
                                }`}
                              >
                                {!isAdded &&
                                  selectedSize &&
                                  selectedStock > 0 && (
                                    <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/20 to-transparent wishlist-motion" />
                                  )}

                                {isAdded ? (
                                  <>
                                    <Check size={15} />
                                    Added to Cart
                                  </>
                                ) : (
                                  <>
                                    <ShoppingBag size={15} />
                                    Add to Cart
                                  </>
                                )}
                              </button>
                            ) : (
                              <Link
                                to={`/product/${productId}`}
                                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#173D2B] bg-[#173D2B] px-4 py-3.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#28583D]"
                              >
                                Choose Size
                                <ArrowRight size={14} />
                              </Link>
                            )}
                          </div>
                        </div>
                      </article>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="relative overflow-hidden border-t border-[#E0E7E0] bg-[#EAF0E9] px-5 py-16 text-center sm:px-8 md:py-20">
        <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full border border-[#A9BDAA]/40" />

        <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#DCE8DD]/70 blur-3xl" />

        <ScrollReveal>
          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#D5C18A]/60 bg-white">
              <Sparkles
                size={18}
                strokeWidth={1.3}
                className="text-[#64856B]"
              />
            </div>

            <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#64856B]">
              YAMA FLYS
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#173D2B] sm:text-5xl">
              Keep Exploring
              <span className="block italic text-[#64856B]">
                Beautiful Designs.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#587363]">
              Discover more styles and save the pieces that speak to you.
              Your next favourite design might be waiting.
            </p>

            <Link
              to="/shop"
              className="group/shop mt-8 inline-flex items-center gap-3 rounded-full bg-[#173D2B] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.17em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#28583D]"
            >
              Explore Shop
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover/shop:translate-x-1"
              />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
};

export default Wishlist;

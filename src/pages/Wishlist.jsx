

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

// Backend URL
const API_BASE_URL = "http://localhost:5000";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [selectedSizes, setSelectedSizes] = useState({});
  const [addedProductId, setAddedProductId] = useState(null);

  /* =========================================================
     PRODUCT ID HELPER
  ========================================================= */

  const getProductId = (product) => {
    return String(product?.id ?? product?._id ?? "");
  };

  /* =========================================================
     SIZE NAME HELPER
  ========================================================= */

  const getSizeName = (sizeItem) => {
    return sizeItem?.name ?? sizeItem?.size ?? "";
  };

  /* =========================================================
     INITIAL SIZE SELECTION
  ========================================================= */

  useEffect(() => {
    setSelectedSizes((prev) => {
      const next = { ...prev };

      wishlistItems.forEach((product) => {
        const productId = getProductId(product);

        if (!productId) {
          return;
        }

        if (next[productId] !== undefined) {
          return;
        }

        if (!Array.isArray(product.sizes)) {
          return;
        }

        const firstAvailableSize = product.sizes.find(
          (sizeItem) => Number(sizeItem?.stock) > 0,
        );

        if (firstAvailableSize) {
          next[productId] = getSizeName(firstAvailableSize);
        }
      });

      return next;
    });
  }, [wishlistItems]);

  /* =========================================================
     PRODUCT IMAGE HELPER
     
     IMPORTANT:
     
     Backend image:
     /uploads/example.webp

     Browser needs:
     http://localhost:5000/uploads/example.webp

     Frontend image:
     /assets/img-15.jpeg

     We keep frontend assets unchanged.
  ========================================================= */

  const getProductImage = (product) => {
    const image =
      Array.isArray(product?.images) && product.images.length > 0
        ? product.images[0]
        : product?.image;

    if (!image) {
      return FALLBACK_IMAGE;
    }

    // Already a complete backend URL
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    // Backend uploaded image
    if (image.startsWith("/uploads/")) {
      return `${API_BASE_URL}${image}`;
    }

    // Backend uploaded image without /
    if (image.startsWith("uploads/")) {
      return `${API_BASE_URL}/${image}`;
    }

    // Frontend public/assets image
    if (image.startsWith("/assets/")) {
      return image;
    }

    // Anything else
    return image;
  };

  /* =========================================================
     SELECTED SIZE DATA
  ========================================================= */

  const getSelectedSizeData = (product) => {
    const productId = getProductId(product);
    const selectedSize = selectedSizes[productId];

    if (!selectedSize || !Array.isArray(product?.sizes)) {
      return null;
    }

    return product.sizes.find(
      (sizeItem) => String(getSizeName(sizeItem)) === String(selectedSize),
    );
  };

  /* =========================================================
     SIZE SELECTION
  ========================================================= */

  const handleSizeChange = (productId, size) => {
    const normalizedProductId = String(productId);

    setSelectedSizes((prev) => ({
      ...prev,
      [normalizedProductId]: String(size),
    }));

    setAddedProductId(null);
  };

  /* =========================================================
     ADD TO CART
  ========================================================= */

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

    const stock = Number(selectedSizeData?.stock || 0);

    if (stock <= 0) {
      alert("This size is currently out of stock.");
      return;
    }

    addToCart(product, 1, selectedSize);

    setAddedProductId(productId);

    window.setTimeout(() => {
      setAddedProductId((currentId) =>
        currentId === productId ? null : currentId,
      );
    }, 1600);
  };

  /* =========================================================
     REMOVE FROM WISHLIST
  ========================================================= */

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
    <>
      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes wishlistRise {
          from {
            opacity: 0;
            transform: translateY(28px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes wishlistLeft {
          from {
            opacity: 0;
            transform: translateX(-35px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes wishlistRight {
          from {
            opacity: 0;
            transform: translateX(35px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes wishlistFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes wishlistRotate {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes wishlistShimmer {
          0% {
            transform: translateX(-140%);
          }

          100% {
            transform: translateX(140%);
          }
        }

        @keyframes wishlistSuccess {
          from {
            opacity: 0;
            transform: translateY(6px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes wishlistLine {
          from {
            width: 0;
          }

          to {
            width: 70px;
          }
        }
      `}</style>

      <main className="min-h-screen bg-[#F7F3F8] text-[#19151C]">
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative mt-[173px] overflow-hidden bg-[#34203E] px-5 py-20 sm:px-6 md:px-10 md:py-24 lg:px-16 lg:py-28">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#D8BD65]/15"
            style={{
              animation: "wishlistRotate 35s linear infinite",
            }}
          />

          <div className="pointer-events-none absolute -left-20 bottom-[-8rem] h-72 w-72 rounded-full border border-white/8" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid items-end gap-12 md:grid-cols-[1.2fr_0.8fr]">
              {/* LEFT */}

              <div
                style={{
                  animation:
                    "wishlistLeft 1s cubic-bezier(.22,1,.36,1) forwards",
                }}
              >
                <div className="mb-7 flex items-center gap-3">
                  <Sparkles
                    size={18}
                    strokeWidth={1.2}
                    className="text-[#D8BD65]"
                  />

                  <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-[#D8BD65]">
                    YAMA FLYS
                  </p>
                </div>

                <h1 className="font-serif text-5xl leading-[1.02] text-white sm:text-6xl md:text-7xl">
                  Things You
                  <span className="block italic text-[#D8BD65]">Love</span>
                </h1>

                <div
                  className="mt-7 h-[2px] bg-[#D8BD65]"
                  style={{
                    animation: "wishlistLine 1.1s ease-out 0.3s both",
                  }}
                />

                <p className="mt-7 max-w-2xl text-sm leading-7 text-[#D7CDD9] md:text-base md:leading-8">
                  A collection of the YAMA FLYS designs you've chosen to keep
                  close.
                </p>
              </div>

              {/* RIGHT */}

              <div
                className="md:justify-self-end"
                style={{
                  animation:
                    "wishlistRight 1s cubic-bezier(.22,1,.36,1) .15s forwards",
                }}
              >
                <div className="relative flex items-center gap-5 border-l border-[#D8BD65]/35 pl-6">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D8BD65]/30 bg-white/5"
                    style={{
                      animation: "wishlistFloat 5s ease-in-out infinite",
                    }}
                  >
                    <Heart
                      size={23}
                      strokeWidth={1.2}
                      className="text-[#D8BD65]"
                    />
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.24em] text-[#BFAFC5]">
                      Saved Items
                    </p>

                    <p className="mt-1 font-serif text-3xl text-white">
                      {wishlistItems.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <section className="px-5 py-14 sm:px-6 md:px-10 md:py-20 lg:px-16">
          <div className="mx-auto max-w-7xl">
            {wishlistItems.length === 0 ? (
              /* =================================================
                 EMPTY STATE
              ================================================= */

              <ScrollReveal>
                <div className="mx-auto max-w-5xl border border-[#E1D8E4] bg-white">
                  <div className="grid min-h-[480px] md:grid-cols-[0.85fr_1.15fr]">
                    <div className="relative flex items-center justify-center overflow-hidden bg-[#EEE4F2]">
                      <div
                        className="pointer-events-none absolute h-72 w-72 rounded-full border border-[#C9A227]/20"
                        style={{
                          animation: "wishlistRotate 28s linear infinite",
                        }}
                      />

                      <div className="pointer-events-none absolute h-52 w-52 rounded-full border border-[#6E4A78]/10" />

                      <div
                        className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#C9A227]/25 bg-white/70 shadow-sm"
                        style={{
                          animation: "wishlistFloat 5s ease-in-out infinite",
                        }}
                      >
                        <Heart
                          size={38}
                          strokeWidth={1}
                          className="text-[#6E4A78]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center px-8 py-12 sm:px-12 md:px-14">
                      <div>
                        <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#856617]">
                          Your Collection
                        </p>

                        <h2 className="mt-4 max-w-lg font-serif text-4xl leading-tight text-[#34203E] sm:text-5xl">
                          Nothing saved
                          <span className="block italic text-[#74527F]">
                            just yet.
                          </span>
                        </h2>

                        <div className="mt-6 h-[2px] w-12 bg-[#C9A227]" />

                        <p className="mt-7 max-w-md text-sm leading-7 text-[#746A78]">
                          Save the bangles that catch your eye and they'll stay
                          here until you're ready to explore them again.
                        </p>

                        <Link
                          to="/shop"
                          className="group/empty relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#34203E] px-7 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#4A2E58]"
                        >
                          <span
                            className="absolute inset-y-0 left-0 w-1/3 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/25 to-transparent"
                            style={{
                              animation:
                                "wishlistShimmer 3.8s ease-in-out infinite",
                            }}
                          />

                          <span className="relative z-10">
                            Explore Collection
                          </span>

                          <ArrowRight
                            size={15}
                            strokeWidth={1.4}
                            className="relative z-10 transition-transform duration-300 group-hover/empty:translate-x-1"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ) : (
              /* =================================================
                 WISHLIST CONTENT
              ================================================= */

              <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
                {/* =================================================
                    SIDE INTRO
                ================================================= */}

                <ScrollReveal>
                  <aside className="lg:sticky lg:top-28 lg:self-start">
                    <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#856617]">
                      My Wishlist
                    </p>

                    <h2 className="mt-4 font-serif text-4xl leading-tight text-[#34203E]">
                      Your
                      <span className="block italic text-[#74527F]">
                        Favorites
                      </span>
                    </h2>

                    <div className="mt-5 h-[2px] w-12 bg-[#C9A227]" />

                    <p className="mt-6 text-sm leading-7 text-[#766D79]">
                      Pieces you've saved for another look, another occasion, or
                      simply because you love them.
                    </p>

                    <div className="mt-8 border-t border-[#DDD3E1] pt-6">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-[#978B9B]">
                        Saved
                      </p>

                      <p className="mt-2 font-serif text-3xl text-[#34203E]">
                        {wishlistItems.length}
                      </p>
                    </div>

                    <Link
                      to="/shop"
                      className="group/continue mt-8 inline-flex items-center justify-center gap-3 rounded-full border border-[#34203E] bg-[#34203E] px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white shadow-[0_10px_25px_rgba(52,32,62,0.12)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#4A2E58] hover:shadow-[0_15px_32px_rgba(52,32,62,0.20)]"
                    >
                      <span>Continue Shopping</span>

                      <ArrowRight
                        size={16}
                        strokeWidth={1.4}
                        className="transition-transform duration-300 group-hover/continue:translate-x-1"
                      />
                    </Link>
                  </aside>
                </ScrollReveal>

                {/* =================================================
                    PRODUCT GRID
                ================================================= */}

                <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
                  {wishlistItems.map((product, index) => {
                    const productId = getProductId(product);

                    const isAdded =
                      String(addedProductId) === String(productId);

                    const selectedSize = selectedSizes[productId];

                    const selectedSizeData = getSelectedSizeData(product);

                    const selectedStock = Number(selectedSizeData?.stock || 0);

                    const hasSizes =
                      Array.isArray(product.sizes) && product.sizes.length > 0;

                    return (
                      <ScrollReveal key={productId} delay={(index % 3) * 100}>
                        <article className="group/card overflow-hidden border border-[#E1D8E4] bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A227]/30 hover:shadow-[0_22px_55px_rgba(66,45,74,0.11)]">
                          {/* =================================================
                              IMAGE
                          ================================================= */}

                          <div className="relative overflow-hidden bg-[#F0E8F3]">
                            <Link
                              to={`/product/${productId}`}
                              className="block"
                            >
                              <div className="relative aspect-square overflow-hidden">
                                <img
                                  src={getProductImage(product)}
                                  alt={product.name}
                                  className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover/card:scale-105"
                                  onError={(event) => {
                                    console.error(
                                      "Wishlist image failed:",
                                      event.currentTarget.src,
                                    );

                                    event.currentTarget.src = FALLBACK_IMAGE;
                                  }}
                                />

                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#221529]/45 via-transparent to-transparent" />

                                <div className="pointer-events-none absolute inset-4 border border-white/35 transition-all duration-500 group-hover/card:inset-5 group-hover/card:border-[#D8BD65]/60" />

                                <div className="absolute left-5 top-5 flex items-center gap-2 bg-[#34203E]/75 px-3 py-2 text-[8px] uppercase tracking-[0.18em] text-[#EFE3A8] backdrop-blur-md">
                                  <Heart
                                    size={12}
                                    strokeWidth={1.3}
                                    className="fill-[#D8BD65] text-[#D8BD65]"
                                  />
                                  Saved
                                </div>

                                <div className="absolute bottom-5 right-5 flex h-10 w-10 translate-y-2 items-center justify-center border border-white/30 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100">
                                  <ArrowUpRight size={16} strokeWidth={1.3} />
                                </div>
                              </div>
                            </Link>

                            {/* REMOVE */}

                            <button
                              type="button"
                              onClick={() => handleRemove(productId)}
                              aria-label={`Remove ${product.name} from wishlist`}
                              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center border border-[#DED3E2] bg-white/90 text-[#34203E] backdrop-blur-md transition-all duration-300 hover:bg-[#34203E] hover:text-[#D8BD65]"
                            >
                              <Trash2 size={16} strokeWidth={1.4} />
                            </button>
                          </div>

                          {/* =================================================
                              INFO
                          ================================================= */}

                          <div className="p-5">
                            <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-[#97889F]">
                              {product.category || "YAMA FLYS"}
                            </p>

                            <Link
                              to={`/product/${productId}`}
                              className="mt-2 block font-serif text-2xl leading-tight text-[#34203E] transition-colors duration-300 hover:text-[#74527F]"
                            >
                              {product.name}
                            </Link>

                            {/* PRICE */}

                            <div className="mt-3 flex items-center gap-3">
                              <span className="text-base font-semibold text-[#211B28]">
                                ₹
                                {Number(product.price || 0).toLocaleString(
                                  "en-IN",
                                )}
                              </span>

                              {Number(product.originalPrice) >
                                Number(product.price) && (
                                <span className="text-xs text-[#A49AA8] line-through">
                                  ₹
                                  {Number(product.originalPrice).toLocaleString(
                                    "en-IN",
                                  )}
                                </span>
                              )}
                            </div>

                            <div className="mt-5 h-px w-8 bg-[#C9A227] transition-all duration-500 group-hover/card:w-14" />

                            {/* =================================================
                                SIZE SELECTOR
                            ================================================= */}

                            {hasSizes ? (
                              <div className="mt-5">
                                <div className="flex items-center justify-between gap-3">
                                  <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-[#756B7A]">
                                    Select Size
                                  </p>

                                  {selectedSize && (
                                    <span className="text-[8px] text-[#74527F]">
                                      Size {selectedSize}
                                    </span>
                                  )}
                                </div>

                                <div className="mt-3 flex flex-wrap gap-2">
                                  {product.sizes.map((sizeItem) => {
                                    const currentSize = getSizeName(sizeItem);

                                    const isSelected =
                                      String(selectedSize) ===
                                      String(currentSize);

                                    const stock = Number(sizeItem?.stock || 0);

                                    const isOutOfStock = stock <= 0;

                                    return (
                                      <button
                                        key={sizeItem?._id || currentSize}
                                        type="button"
                                        disabled={isOutOfStock}
                                        onClick={() =>
                                          handleSizeChange(
                                            productId,
                                            currentSize,
                                          )
                                        }
                                        className={`min-w-[44px] rounded-lg border px-3 py-2 text-[10px] font-medium transition-all duration-300 ${
                                          isOutOfStock
                                            ? "cursor-not-allowed border-[#E6DFE8] bg-[#F4F0F5] text-[#B0A8B3]"
                                            : isSelected
                                              ? "border-[#C9A227] bg-[#34203E] text-white shadow-sm"
                                              : "border-[#DED4E2] bg-[#FBF9FC] text-[#34203E] hover:-translate-y-0.5 hover:border-[#C9A227]"
                                        }`}
                                      >
                                        {currentSize}
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* STOCK */}

                                {selectedSize && selectedSizeData && (
                                  <p
                                    className={`mt-2 text-[9px] ${
                                      selectedStock <= 0
                                        ? "text-[#A44747]"
                                        : "text-[#756B7A]"
                                    }`}
                                  >
                                    {selectedStock > 0
                                      ? `${selectedStock} available`
                                      : "Sold out"}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <p className="mt-5 text-[9px] leading-5 text-[#918795]">
                                Size selection will be available on the product
                                page.
                              </p>
                            )}

                            {/* =================================================
                                ACTION BUTTON
                            ================================================= */}

                            {hasSizes ? (
                              <button
                                type="button"
                                onClick={() => handleAddToCart(product)}
                                disabled={!selectedSize || selectedStock <= 0}
                                className={`group/cart relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden border px-4 py-3.5 text-[9px] font-medium uppercase tracking-[0.18em] transition-all duration-300 ${
                                  isAdded
                                    ? "border-[#53725C] bg-[#53725C] text-white"
                                    : !selectedSize || selectedStock <= 0
                                      ? "cursor-not-allowed border-[#D8CFDB] bg-[#EEE9F0] text-[#A49AA7]"
                                      : "border-[#34203E] bg-[#34203E] text-white hover:bg-[#4A2E58]"
                                }`}
                              >
                                {!isAdded &&
                                  selectedSize &&
                                  selectedStock > 0 && (
                                    <span
                                      className="absolute inset-y-0 left-0 w-1/3 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                      style={{
                                        animation:
                                          "wishlistShimmer 4s ease-in-out infinite",
                                      }}
                                    />
                                  )}

                                {isAdded ? (
                                  <>
                                    <Check
                                      size={15}
                                      strokeWidth={1.5}
                                      className="relative z-10"
                                    />

                                    <span
                                      className="relative z-10"
                                      style={{
                                        animation:
                                          "wishlistSuccess 300ms ease-out",
                                      }}
                                    >
                                      Added to Cart
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <ShoppingBag
                                      size={15}
                                      strokeWidth={1.4}
                                      className="relative z-10"
                                    />

                                    <span className="relative z-10">
                                      Add to Cart
                                    </span>
                                  </>
                                )}
                              </button>
                            ) : (
                              <Link
                                to={`/product/${productId}`}
                                className="relative mt-5 flex w-full items-center justify-center gap-2 border border-[#34203E] bg-[#34203E] px-4 py-3.5 text-[9px] font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#4A2E58]"
                              >
                                Choose Size
                                <ArrowRight size={14} strokeWidth={1.4} />
                              </Link>
                            )}
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

        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}

        <section className="relative overflow-hidden bg-[#EEE4F2] px-5 py-20 text-center sm:px-6 md:py-24">
          <div
            className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full border border-[#C9A227]/15"
            style={{
              animation: "wishlistRotate 30s linear infinite",
            }}
          />

          <div className="pointer-events-none absolute -left-32 bottom-[-6rem] h-72 w-72 rounded-full bg-[#74527F]/8 blur-3xl" />

          <ScrollReveal>
            <div className="relative mx-auto max-w-3xl">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A227]/30 bg-white">
                <Sparkles
                  size={18}
                  strokeWidth={1.3}
                  className="text-[#C9A227]"
                />
              </div>

              <p className="mt-6 text-[9px] font-medium uppercase tracking-[0.3em] text-[#856617]">
                YAMA FLYS
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#34203E] sm:text-5xl">
                Keep Exploring
                <span className="block italic text-[#74527F]">
                  Beautiful Designs
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#756C79]">
                Discover more styles and add the pieces that speak to you to
                your wishlist.
              </p>

              <Link
                to="/shop"
                className="group/shop mt-8 inline-flex items-center gap-3 rounded-full bg-[#34203E] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#4A2E58]"
              >
                Explore Shop
                <ArrowRight
                  size={15}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-hover/shop:translate-x-1"
                />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </main>
    </>
  );
};

export default Wishlist;



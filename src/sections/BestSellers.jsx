import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";

import { useWishlist } from "../Context/WishlistContext";
import { getProducts } from "../services/productApi";

const BACKEND_URL = "https://yama-flays-backend.onrender.com";

const BestSellers = () => {
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // LOAD BEST SELLER PRODUCTS FROM BACKEND
  // =====================================================

  useEffect(() => {
    const loadBestSellers = async () => {
      try {
        setLoading(true);

        const data = await getProducts();

        console.log("Best Sellers API Response:", data);

        // Backend response:
        // {
        //   success: true,
        //   count: 3,
        //   products: [...]
        // }

        const allProducts = Array.isArray(data?.products) ? data.products : [];

        // Support both old and new field names
        const bestsellerProducts = allProducts
          .filter(
            (product) =>
              product.isBestSeller === true || product.bestseller === true,
          )
          .slice(0, 4);

        console.log("Best Seller Products:", bestsellerProducts);

        setProducts(bestsellerProducts);
      } catch (error) {
        console.error("Failed to load best sellers:", error);

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadBestSellers();
  }, []);

  // =====================================================
  // IMAGE URL HELPER
  // =====================================================

  const getImageUrl = (product) => {
    const image =
      product?.images?.[0] || product?.image || "/assets/img-1.webp";

    // Backend uploaded image
    if (image.startsWith("/uploads")) {
      return `${BACKEND_URL}${image}`;
    }

    // Frontend public image
    return image;
  };

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-[#211A17] px-6 py-20 sm:px-8 md:py-24 lg:px-12 xl:px-16">
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12">
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-[#B28B52]" />

              <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#D7B778]">
                Customer Favourites
              </p>
            </div>

            <h2 className="font-serif text-4xl leading-[1.08] text-[#F4EDE5] sm:text-5xl md:text-6xl">
              Best
              <span className="block italic text-[#D7B778]">Sellers</span>
            </h2>
          </div>

          <div className="flex min-h-[300px] items-center justify-center border border-white/10 bg-white/[0.03]">
            <div className="text-center">
              <div className="mx-auto mb-5 h-8 w-8 animate-spin rounded-full border-2 border-[#B28B52]/20 border-t-[#D7B778]" />

              <p className="text-sm text-[#BDB1A7]">Loading best sellers...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <section className="relative overflow-hidden bg-[#211A17] px-6 py-20 sm:px-8 md:py-24 lg:px-12 xl:px-16">
      {/* =====================================================
          BACKGROUND DETAILS
      ===================================================== */}

      <div className="pointer-events-none absolute -left-40 top-[-120px] h-[420px] w-[420px] rounded-full bg-[#B28B52]/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-[-140px] h-[460px] w-[460px] rounded-full bg-[#D7B778]/10 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#B28B52]/40 to-transparent" />

      <div className="pointer-events-none absolute -right-20 top-20 h-64 w-64 rounded-full border border-[#B28B52]/10" />

      <div className="relative mx-auto max-w-7xl">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-[#B28B52]" />

              <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#D7B778]">
                Customer Favourites
              </p>
            </div>

            <h2 className="font-serif text-4xl leading-[1.08] text-[#F4EDE5] sm:text-5xl md:text-6xl">
              Best
              <span className="block italic text-[#D7B778]">Sellers</span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-[#D3C7BB] sm:text-base">
              Explore some of the most-loved designs from the YAMA FLYS
              collection.
            </p>
          </div>

          {/* VIEW ALL */}

          <Link
            to="/shop"
            className="group inline-flex w-fit items-center gap-3 border-b border-[#B28B52] pb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F4EDE5] transition-all duration-500 hover:border-[#D7B778] hover:text-[#D7B778]"
          >
            <span>View All Best Sellers</span>

            <ArrowRight
              size={16}
              strokeWidth={1.4}
              className="transition-transform duration-500 group-hover:translate-x-2"
            />
          </Link>
        </div>

        {/* =====================================================
            PRODUCTS
        ===================================================== */}

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => {
              const wishlistActive = isInWishlist(product._id);

              const productId = product._id;

              const imageUrl = getImageUrl(product);

              return (
                <article key={productId} className="group">
                  {/* =================================================
                      IMAGE CARD
                  ================================================= */}

                  <div className="relative overflow-hidden bg-[#F4EDE5]">
                    <Link
                      to={`/product/${productId}`}
                      aria-label={`View ${product.name}`}
                      className="block aspect-[4/5] overflow-hidden"
                    >
                      <img
                        src={imageUrl}
                        alt={product.name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/assets/img-1.webp";
                        }}
                        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
                      />
                    </Link>

                    {/* IMAGE OVERLAY */}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#211A17]/55 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                    {/* DISCOUNT */}

                    {Number(product.originalPrice) > Number(product.price) && (
                      <div className="absolute left-4 top-4 z-10">
                        <span className="border border-[#D7B778]/60 bg-[#211A17]/90 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.16em] text-[#D7B778] backdrop-blur-md">
                          {Math.round(
                            ((Number(product.originalPrice) -
                              Number(product.price)) /
                              Number(product.originalPrice)) *
                              100,
                          )}
                          % Off
                        </span>
                      </div>
                    )}

                    {/* WISHLIST */}

                    <button
                      type="button"
                      onClick={() => toggleWishlist(product)}
                      aria-label={
                        wishlistActive
                          ? `Remove ${product.name} from wishlist`
                          : `Add ${product.name} to wishlist`
                      }
                      className={`absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-500 ${
                        wishlistActive
                          ? "border-[#B28B52] bg-[#B28B52] text-[#211A17]"
                          : "border-white/60 bg-white/90 text-[#211A17] opacity-100 hover:scale-110 hover:border-[#B28B52] hover:text-[#9A7656] md:opacity-0 md:group-hover:opacity-100"
                      }`}
                    >
                      <Heart
                        size={17}
                        strokeWidth={1.6}
                        fill={wishlistActive ? "currentColor" : "none"}
                      />
                    </button>

                    {/* VIEW PRODUCT */}

                    <Link
                      to={`/product/${productId}`}
                      aria-label={`View product ${product.name}`}
                      className="absolute bottom-4 left-4 right-4 z-20 flex translate-y-4 items-center justify-center gap-2 bg-[#211A17]/95 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F4EDE5] opacity-0 backdrop-blur-md transition-all duration-500 hover:bg-[#B28B52] hover:text-[#211A17] group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <span>View Product</span>

                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.5}
                        className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </Link>

                    {/* GOLD FRAME */}

                    <div className="pointer-events-none absolute inset-0 border border-transparent transition-all duration-700 group-hover:border-[#B28B52]/80" />

                    {/* BOTTOM GOLD ACCENT */}

                    <div className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-0 bg-[#B28B52] transition-all duration-700 group-hover:w-full" />
                  </div>

                  {/* =================================================
                      PRODUCT DETAILS
                  ================================================= */}

                  <div className="pt-5">
                    {/* CATEGORY */}

                    <p className="text-[9px] font-medium uppercase tracking-[0.26em] text-[#D7B778]">
                      {product.category || "Collection"}
                    </p>

                    {/* PRODUCT NAME */}

                    <Link
                      to={`/product/${productId}`}
                      className="group/title block"
                    >
                      <h3 className="mt-2 font-serif text-xl leading-tight text-[#F4EDE5] transition-colors duration-300 group-hover/title:text-[#D7B778]">
                        {product.name}
                      </h3>
                    </Link>

                    {/* RATING */}

                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star
                          size={13}
                          strokeWidth={1.4}
                          fill="currentColor"
                          className="text-[#D7B778]"
                        />

                        <span className="text-sm text-[#EFE5D8]">
                          {product.rating || 0}
                        </span>
                      </div>

                      <span className="text-xs text-[#A99C91]">
                        ({product.reviewsCount || product.reviews || 0})
                      </span>
                    </div>

                    {/* PRICE */}

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="text-lg font-medium text-[#F4EDE5]">
                        ₹{Number(product.price || 0).toLocaleString("en-IN")}
                      </span>

                      {Number(product.originalPrice || 0) >
                        Number(product.price || 0) && (
                        <span className="text-sm text-[#998D83] line-through">
                          ₹
                          {Number(product.originalPrice).toLocaleString(
                            "en-IN",
                          )}
                        </span>
                      )}
                    </div>

                    {/* VIEW DETAILS */}

                    <Link
                      to={`/product/${productId}`}
                      aria-label={`View details for ${product.name}`}
                      className="group/details mt-5 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#D7B778] transition-colors duration-300 hover:text-[#F0D58C]"
                    >
                      <span>View Details</span>

                      <ArrowUpRight
                        size={13}
                        strokeWidth={1.5}
                        className="transition-transform duration-300 group-hover/details:-translate-y-1 group-hover/details:translate-x-1"
                      />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* =====================================================
             EMPTY STATE
          ===================================================== */

          <div className="border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <p className="font-serif text-2xl text-[#F4EDE5]">
              No best sellers available yet.
            </p>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#BDB1A7]">
              Products marked as best sellers will appear here automatically.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex items-center gap-2 border-b border-[#B28B52] pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D7B778]"
            >
              Shop Products
              <ArrowRight size={15} />
            </Link>
          </div>
        )}

        {/* =====================================================
            BOTTOM BRAND STATEMENT
        ===================================================== */}

        <div className="mt-14 flex items-center justify-center gap-4 md:mt-16">
          <span className="h-px w-12 bg-white/10 sm:w-20" />

          <span className="font-serif text-xs italic tracking-wide text-[#AFA198]">
            Beautiful pieces for beautiful moments
          </span>

          <span className="h-px w-12 bg-white/10 sm:w-20" />
        </div>
      </div>
    </section>
  );
};

export default BestSellers;

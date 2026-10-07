import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowUpRight, Star, Sparkles } from "lucide-react";

import { useWishlist } from "../Context/WishlistContext";

const BACKEND_URL = "https://yama-flays-backend.onrender.com";

/* =========================================================
   PRODUCT IMAGE URL
========================================================= */

const getImageUrl = (image) => {
  if (!image) {
    return "/assets/img-1.webp";
  }

  // Already a complete URL
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  // Images uploaded by backend
  if (image.startsWith("/uploads/")) {
    return `${BACKEND_URL}${image}`;
  }

  // Frontend public assets
  if (image.startsWith("/assets/")) {
    return image;
  }

  // Any other relative path
  return image.startsWith("/") ? image : `/${image}`;
};

/* =========================================================
   PRODUCT CARD
========================================================= */

const ProductCard = ({ product }) => {
  const { wishlistItems = [], toggleWishlist } = useWishlist();

  /* =========================================================
     SAFETY
  ========================================================= */

  if (!product) return null;

  /* =========================================================
     PRODUCT ID
  ========================================================= */

  // MongoDB uses _id
  // Old frontend products may use id
  const productId = String(product._id ?? product.id ?? "");

  /* =========================================================
     PRODUCT DATA
  ========================================================= */

  const productImage = getImageUrl(product.image || product.images?.[0]);

  const productName = product.name || "Beautiful Jewellery";

  const category = product.category || "Jewellery";

  const collection = product.collectionName || "New Collection";

  const price = Number(product.price || 0);

  const originalPrice = Number(product.originalPrice || 0);

  /* =========================================================
     REVIEWS
     
     IMPORTANT:
     Reviews now come directly from MongoDB through:
     
     product.reviews
     
     We DO NOT use localStorage here.
  ========================================================= */

  const reviews = Array.isArray(product.reviews) ? product.reviews : [];

  const validReviews = reviews.filter((review) => {
    const rating = Number(review?.rating);

    return Number.isFinite(rating) && rating >= 1 && rating <= 5;
  });

  const reviewCount = validReviews.length;

  const reviewRating = useMemo(() => {
    if (validReviews.length === 0) {
      return 0;
    }

    const totalRating = validReviews.reduce(
      (total, review) => total + Number(review.rating),
      0,
    );

    return totalRating / validReviews.length;
  }, [product.reviews]);

  /* =========================================================
     STOCK
  ========================================================= */

  const totalStock = Array.isArray(product.sizes)
    ? product.sizes.reduce((total, size) => total + Number(size.stock || 0), 0)
    : Number(product.stock || 0);

  const isOutOfStock = totalStock <= 0;

  /* =========================================================
     WISHLIST
  ========================================================= */

  const isWishlisted = wishlistItems.some(
    (item) => String(item?._id ?? item?.id ?? "") === productId,
  );

  /* =========================================================
     DISCOUNT
  ========================================================= */

  const discount =
    originalPrice > price && price > 0
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  /* =========================================================
     WISHLIST HANDLER
  ========================================================= */

  const handleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    toggleWishlist(product);
  };

  /* =========================================================
     INVALID PRODUCT ID
  ========================================================= */

  if (!productId) {
    console.warn("ProductCard: Product ID is missing", product);
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <article
      className="
        group relative flex h-full flex-col overflow-hidden
        rounded-[1.7rem]
        border border-[#E9DEE2]
        bg-white
        shadow-[0_12px_45px_rgba(74,48,56,0.06)]
        transition-all duration-500
        hover:-translate-y-1
        hover:border-[#DEC6CD]
        hover:shadow-[0_22px_60px_rgba(74,48,56,0.12)]
      "
    >
      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div className="relative aspect-[0.92] w-full overflow-hidden bg-[#F7F1F3]">
        <Link to={`/product/${productId}`} className="block h-full w-full">
          <img
            src={productImage}
            alt={productName}
            loading="lazy"
            className="
              h-full w-full object-cover
              transition-transform duration-700
              group-hover:scale-[1.06]
            "
            onError={(event) => {
              console.error("Product image failed:", productImage);

              event.currentTarget.onerror = null;
              event.currentTarget.src = "/assets/img-1.webp";
            }}
          />
        </Link>

        {/* ===================================================
            COLLECTION
        =================================================== */}

        <div
          className="
            absolute left-4 top-4
            rounded-full
            border border-white/70
            bg-white/90
            px-3 py-1.5
            shadow-[0_5px_20px_rgba(50,30,35,0.08)]
            backdrop-blur-md
          "
        >
          <div className="flex items-center gap-1.5">
            <Sparkles size={10} strokeWidth={1.4} className="text-[#B18A28]" />

            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#684952]
              "
            >
              {collection}
            </span>
          </div>
        </div>

        {/* ===================================================
            DISCOUNT
        =================================================== */}

        {discount > 0 && (
          <div
            className="
              absolute bottom-4 left-4
              rounded-full
              bg-[#39272A]
              px-3 py-1.5
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-white
            "
          >
            {discount}% OFF
          </div>
        )}

        {/* ===================================================
            WISHLIST
        =================================================== */}

        <button
          type="button"
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="
            absolute right-4 top-4
            flex h-10 w-10
            items-center justify-center
            rounded-full
            border border-white/70
            bg-white/90
            text-[#39272A]
            shadow-[0_6px_20px_rgba(50,30,35,0.10)]
            backdrop-blur-md
            transition-all duration-300
            hover:scale-110
          "
        >
          <Heart
            size={17}
            strokeWidth={1.5}
            className={
              isWishlisted ? "fill-[#D77F96] text-[#D77F96]" : "text-[#513B40]"
            }
          />
        </button>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          flex flex-1 flex-col
          px-5 pb-5 pt-5
          sm:px-6 sm:pb-6 sm:pt-6
        "
      >
        {/* CATEGORY */}

        <div className="flex items-center justify-between gap-3">
          <p
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.24em]
              text-[#A06D79]
            "
          >
            {category}
          </p>

          {isOutOfStock && (
            <span
              className="
                rounded-full
                bg-[#F3E8EA]
                px-2.5 py-1
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[#8A5D67]
              "
            >
              Sold Out
            </span>
          )}
        </div>

        {/* NAME */}

        <Link to={`/product/${productId}`} className="mt-2">
          <h3
            className="
              min-h-[3.5rem]
              font-serif
              text-[20px]
              leading-[1.35]
              text-[#2F2225]
              transition-colors
              duration-300
              group-hover:text-[#8D5967]
            "
          >
            {productName}
          </h3>
        </Link>

        {/* ===================================================
            RATING
        =================================================== */}

        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                strokeWidth={1.4}
                className={
                  star <= Math.round(reviewRating)
                    ? "fill-[#C9A227] text-[#C9A227]"
                    : "text-[#D8C7A7]"
                }
              />
            ))}
          </div>

          {reviewCount > 0 ? (
            <>
              <span className="text-[10px] text-[#786B70]">
                {reviewRating.toFixed(1)}
              </span>

              <span className="text-[10px] text-[#A69A9F]">
                ({reviewCount})
              </span>
            </>
          ) : (
            <span className="text-[10px] text-[#A69A9F]">No reviews</span>
          )}
        </div>

        {/* ===================================================
            PRICE
        =================================================== */}

        <div className="mt-4 flex items-end justify-center gap-2">
          <span
            className="
              font-serif
              text-[22px]
              font-medium
              text-[#2C2023]
            "
          >
            ₹{price.toLocaleString("en-IN")}
          </span>

          {originalPrice > price && (
            <span
              className="
                pb-0.5
                text-[12px]
                text-[#A69A9F]
                line-through
              "
            >
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* ===================================================
            STOCK
        =================================================== */}

        <div className="mt-3 text-center">
          {isOutOfStock ? (
            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#9A777E]
              "
            >
              Currently unavailable
            </span>
          ) : (
            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#4E9868]
              "
            >
              Available
            </span>
          )}
        </div>

        {/* ===================================================
            BUTTON
        =================================================== */}

        <Link
          to={`/product/${productId}`}
          className="
            mt-5
            flex min-h-[52px] w-full
            items-center justify-center gap-3
            rounded-full
            bg-[#2F2225]
            px-5
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-white
            transition-all duration-300
            hover:-translate-y-0.5
            hover:bg-[#493136]
          "
        >
          <span>{isOutOfStock ? "View Details" : "View Product"}</span>

          <ArrowUpRight
            size={15}
            strokeWidth={1.5}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-0.5
            "
          />
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;

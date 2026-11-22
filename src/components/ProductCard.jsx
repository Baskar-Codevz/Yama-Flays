
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowUpRight, Star, Sparkles } from "lucide-react";
import { useWishlist } from "../Context/WishlistContext";

const BACKEND_URL = "https://yama-flays-backend.onrender.com";
const FALLBACK_IMAGE = "/assets/img-1.webp";

const getImageUrl = (image) => {
  if (!image) return FALLBACK_IMAGE;
  if (/^https?:\/\//i.test(image)) return image;
  if (image.startsWith("/uploads/")) return `${BACKEND_URL}${image}`;
  if (image.startsWith("/assets/")) return image;

  return image.startsWith("/") ? image : `/${image}`;
};

const ProductCard = ({ product }) => {
  const { wishlistItems = [], toggleWishlist } = useWishlist();

  if (!product) return null;

  const productId = String(product._id ?? product.id ?? "");
  const productName = product.name || "Beautiful Jewellery";

  const category =
    typeof product.category === "object"
      ? product.category?.name || "Jewellery"
      : product.category || "Jewellery";

  const collection =
    product.collectionName ||
    (typeof product.collection === "string" ? product.collection : "") ||
    "New Collection";

  const price = Number(product.price || 0);
  const originalPrice = Number(product.originalPrice || 0);
  const image = getImageUrl(product.images?.[0] || product.image);

  const reviews = Array.isArray(product.reviews)
    ? product.reviews.filter((review) => {
        const rating = Number(review?.rating);
        return Number.isFinite(rating) && rating >= 1 && rating <= 5;
      })
    : [];

  const rating = useMemo(
    () =>
      reviews.length
        ? reviews.reduce(
            (total, review) => total + Number(review.rating),
            0
          ) / reviews.length
        : 0,
    [reviews]
  );

  const totalStock = Array.isArray(product.sizes)
    ? product.sizes.reduce(
        (total, size) => total + Number(size?.stock || 0),
        0
      )
    : Number(product.stock || 0);

  const isOutOfStock = totalStock <= 0;

  const isWishlisted = wishlistItems.some(
    (item) => String(item?._id ?? item?.id ?? "") === productId
  );

  const discount =
    originalPrice > price && price > 0
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const handleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#DCE4D7] bg-[#FBFBF6] transition duration-300 hover:-translate-y-1 hover:border-[#A9BDA5] hover:shadow-[0_18px_45px_rgba(36,76,54,0.12)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#EEF0E7]">
        <Link
          to={`/product/${productId}`}
          aria-label={`View ${productName}`}
          className="block h-full"
        >
          <img
            src={image}
            alt={productName}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = FALLBACK_IMAGE;
            }}
          />
        </Link>

        <span className="absolute left-3 top-3 inline-flex max-w-[75%] items-center gap-1.5 truncate rounded-full border border-white/70 bg-[#FBFBF6]/95 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-[#244C36] backdrop-blur-sm">
          <Sparkles size={11} className="shrink-0 text-[#244C36]" />
          <span className="truncate">{collection}</span>
        </span>

        {discount > 0 && (
          <span className="absolute bottom-3 left-3 rounded-full bg-[#244C36] px-3 py-1.5 text-[10px] font-semibold text-white">
            {discount}% OFF
          </span>
        )}

        <button
          type="button"
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-[#FBFBF6]/95 text-[#244C36] shadow-sm transition hover:scale-105 hover:bg-white"
        >
          <Heart
            size={18}
            strokeWidth={1.6}
            className={isWishlisted ? "fill-[#244C36] text-[#244C36]" : ""}
          />
        </button>

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#F5F4EC]/65">
            <span className="rounded-full border border-[#244C36]/20 bg-[#FBFBF6] px-4 py-2 text-xs font-semibold text-[#244C36]">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#244C36]">
          {category}
        </p>

        <Link to={`/product/${productId}`} className="mt-2">
          <h3 className="line-clamp-2 min-h-[3.25rem] font-serif text-lg leading-6 text-[#244C36] transition-colors group-hover:text-[#52785A] sm:text-xl">
            {productName}
          </h3>
        </Link>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={13}
                strokeWidth={1.5}
                className={
                  star <= Math.round(rating)
                    ? "fill-[#244C36] text-[#244C36]"
                    : "text-[#C9D2C2]"
                }
              />
            ))}
          </div>

          {reviews.length > 0 ? (
            <span className="text-xs text-[#244C36]">
              {rating.toFixed(1)} ({reviews.length})
            </span>
          ) : (
            <span className="text-xs text-[#244C36]">No reviews</span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-baseline gap-2">
          <span className="font-serif text-xl font-semibold text-[#244C36]">
            ₹{price.toLocaleString("en-IN")}
          </span>

          {originalPrice > price && (
            <span className="text-sm text-[#52785A] line-through">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <p
          className={`mt-2 text-xs ${
            isOutOfStock ? "text-[#244C36]" : "text-[#244C36]"
          }`}
        >
          {isOutOfStock ? "Currently unavailable" : "In stock"}
        </p>

        <Link
          to={`/product/${productId}`}
          className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#244C36] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#183B29]"
        >
          View product
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;

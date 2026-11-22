
import { useEffect, useState } from "react";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../Context/WishlistContext";
import { getProducts } from "../services/productApi";

const API_URL = "https://yama-flays-backend.onrender.com";
const FALLBACK_IMAGE = "/assets/img-1.webp";

const getImageUrl = (product) => {
  const image = product?.images?.[0] || product?.image;

  if (!image) return FALLBACK_IMAGE;
  if (image.startsWith("http")) return image;
  if (image.startsWith("/assets/")) return image;

  return `${API_URL}/${image.replace(/^\/+/, "")}`;
};

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await getProducts();
        const allProducts = response?.products || [];

        setProducts(
          allProducts
            .filter(
              (product) =>
                product.isBestSeller === true ||
                product.bestseller === true
            )
            .slice(0, 4)
        );
      } catch (err) {
        console.error("Failed to load best sellers:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  const isWishlisted = (product) =>
    wishlist?.some(
      (item) =>
        item._id === product._id ||
        item.productId === product._id
    );

  return (
    <section className="relative overflow-hidden bg-[#f8f8f5] px-4 py-16 sm:px-8 lg:px-16">
      {/* Soft white-smoke background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.95),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(225,235,224,0.45),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#758b68]">
              <Sparkles size={15} />
              Customer favourites
            </p>

            <h2 className="text-3xl font-semibold text-[#31543b] sm:text-4xl lg:text-5xl">
              Our Best Sellers
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-[#647568] sm:text-base">
              Discover the designs our customers love the most.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex w-fit items-center gap-2 border-b border-[#78916f] pb-2 text-sm font-semibold text-[#31543b] transition hover:text-[#8a6b25]"
          >
            Explore Collection
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Products */}
        {loading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl bg-white/80 p-3"
              >
                <div className="aspect-[4/5] rounded-xl bg-[#e8ebe5]" />
                <div className="mt-4 h-4 w-3/4 rounded bg-[#e8ebe5]" />
                <div className="mt-3 h-4 w-1/2 rounded bg-[#e8ebe5]" />
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="py-10 text-center text-[#31543b]">
            Unable to load products. Please try again later.
          </p>
        ) : products.length === 0 ? (
          <p className="py-10 text-center text-[#31543b]">
            Best-selling products will appear here soon.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {products.map((product) => {
              const discount =
                product.originalPrice > product.price
                  ? Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )
                  : 0;

              return (
                <article
                  key={product._id}
                  className="group overflow-hidden rounded-2xl border border-[#e7e9e2] bg-white/80 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative overflow-hidden bg-[#f3f4ef]">
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={getImageUrl(product)}
                        alt={product.name}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = FALLBACK_IMAGE;
                        }}
                        className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {discount > 0 && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#31543b] px-3 py-1 text-xs font-semibold text-white">
                        {discount}% OFF
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleWishlist(product)}
                      aria-label="Toggle wishlist"
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#31543b] shadow-sm transition hover:bg-[#31543b] hover:text-white"
                    >
                      <Heart
                        size={18}
                        fill={isWishlisted(product) ? "currentColor" : "none"}
                      />
                    </button>
                  </div>

                  <div className="p-3 sm:p-4">
                    <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#87937e]">
                      {product.collection || product.category || "Collection"}
                    </p>

                    <Link to={`/product/${product._id}`}>
                      <h3 className="line-clamp-2 text-sm font-semibold text-[#31543b] transition hover:text-[#8a6b25] sm:text-base">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-[#31543b]">
                        ₹{product.price}
                      </span>

                      {product.originalPrice > product.price && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>

                    <Link
                      to={`/product/${product._id}`}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[#31543b] py-2.5 text-xs font-semibold text-[#31543b] transition hover:bg-[#31543b] hover:text-white sm:text-sm"
                    >
                      View Product
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;

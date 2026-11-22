
import { Star, ArrowUpRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import Product from "../data/Product";

export default function Products() {
  const featuredProducts = Product.slice(0, 6);

  return (
    <section className="overflow-hidden bg-[#F7F7F0] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="h-[2px] w-8 bg-[#426B50]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#426B50]">
                YAMA FLAYS · HANDPICKED FOR YOU
              </p>
            </div>

            <h2 className="font-serif text-4xl leading-tight tracking-tight text-[#243D2C] sm:text-5xl lg:text-6xl">
              Pieces you'll
              <span className="ml-2 italic text-[#65856A]">
                treasure.
              </span>
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-[#737B70]">
              Explore our favourite designs, thoughtfully chosen
              to bring a little extra beauty to your everyday moments.
            </p>
          </div>

          <Link
            to="/shop"
            className="group inline-flex w-fit items-center gap-3 border-b border-[#426B50] pb-2 text-xs font-semibold uppercase tracking-[0.13em] text-[#31563A] transition-colors hover:text-[#8A7135]"
          >
            Explore all products
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {featuredProducts.map((product, index) => {
            const hasDiscount =
              product.originalPrice > product.price;

            const discount = hasDiscount
              ? Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )
              : 0;

            return (
              <article
                key={product.id}
                className="group relative flex gap-3 rounded-2xl border border-[#E1E5DA] bg-white p-3 transition-all duration-300 hover:border-[#A8BBA5] hover:shadow-[0_12px_32px_rgba(36,61,44,0.08)] sm:gap-4 sm:p-4"
              >
                {/* Compact Image */}
                <Link
                  to={`/product/${product.id}`}
                  aria-label={`View ${product.name}`}
                  className="relative h-[145px] w-[112px] shrink-0 overflow-hidden rounded-xl bg-[#EEF0E6] sm:h-[165px] sm:w-[132px] md:h-[175px] md:w-[140px]"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = "/assets/img-15.jpeg";
                    }}
                  />

                  {hasDiscount && (
                    <span className="absolute left-2 top-2 rounded-md bg-[#31563A] px-2 py-1 text-[9px] font-bold text-white">
                      {discount}% OFF
                    </span>
                  )}
                </Link>

                {/* Product Information */}
                <div className="flex min-w-0 flex-1 flex-col py-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[8px] font-bold uppercase tracking-[0.12em] text-[#66836A] sm:text-[9px]">
                      {product.collection}
                    </span>

                    <span className="flex shrink-0 items-center gap-1 text-[10px] font-semibold text-[#475E43]">
                      <Star
                        size={12}
                        fill="#C6A65D"
                        stroke="#C6A65D"
                      />
                      {product.rating}
                    </span>
                  </div>

                  <Link to={`/product/${product.id}`}>
                    <h3 className="mt-2 line-clamp-2 font-serif text-base leading-snug text-[#243D2C] transition-colors group-hover:text-[#65856A] sm:text-lg">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-[#858A7E] sm:text-xs">
                    {product.description}
                  </p>

                  <div className="mt-auto pt-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-bold text-[#31563A] sm:text-lg">
                        ₹{product.price}
                      </span>

                      {hasDiscount && (
                        <span className="text-xs text-[#999D92] line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>

                    <Link
                      to={`/product/${product.id}`}
                      className="mt-3 inline-flex min-h-9 items-center justify-center gap-2 rounded-lg bg-[#31563A] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#243D2C] sm:text-[10px]"
                    >
                      <ShoppingBag size={13} />
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#DDE3D7] bg-[#EDF1E8] px-5 py-6 text-center sm:mt-12 sm:flex-row sm:px-8 sm:text-left">
          <div>
            <p className="font-serif text-xl italic text-[#31563A] sm:text-2xl">
              Your style, your story.
            </p>
            <p className="mt-1 text-xs leading-5 text-[#737B70]">
              Find the pieces that feel uniquely you.
            </p>
          </div>

          <Link
            to="/shop"
            className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-[#31563A] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#31563A] transition-all hover:bg-[#31563A] hover:text-white"
          >
            Shop the collection
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

      </div>
    </section>
  );
}

import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Product from "../data/Product";

const Shop = () => {
  const [searchParams] = useSearchParams();

  const urlSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(urlSearch);
  const [sort, setSort] = useState("default");

  const filteredProducts = Product.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  ).sort((a, b) => {
    if (sort === "low") {
      return a.price - b.price;
    }

    if (sort === "high") {
      return b.price - a.price;
    }

    return 0;
  });

  return (
    <main className="min-h-screen bg-[#faf8f4]">
      {/* ================= PAGE HEADER ================= */}
      <section className="bg-[#f5f0e9] px-5 py-14 text-center sm:px-6 sm:py-16 md:px-12 md:py-20 lg:px-20">
        <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-[#9a7656] sm:mb-4 sm:text-xs sm:tracking-[0.35em]">
          YAMA FLAYS
        </p>

        <h1 className="font-serif text-3xl leading-tight text-[#211b17] sm:text-4xl md:text-5xl lg:text-6xl">
          Shop Bangles
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-600 sm:mt-5 sm:text-base sm:leading-7">
          Explore our collection of beautiful bangle designs created for
          everyday elegance and special occasions.
        </p>
      </section>

      {/* ================= PRODUCTS SECTION ================= */}
      <section className="px-4 py-10 sm:px-6 sm:py-12 md:px-12 md:py-16 lg:px-20">
        <div className="mx-auto max-w-7xl">
          {/* ================= TOP BAR ================= */}
          <div className="flex flex-col gap-5 border-b border-[#ded5ca] pb-6 sm:gap-6 sm:pb-7 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative w-full md:max-w-sm">
              <input
                type="text"
                placeholder="Search bangles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-[#d8cec4] bg-white px-4 py-3 text-sm text-[#211b17] outline-none transition-colors placeholder:text-gray-400 focus:border-[#9a7656] sm:px-5"
              />
            </div>

            {/* Sort */}
            <div className="flex w-full items-center justify-between gap-3 sm:justify-start md:w-auto">
              <label
                htmlFor="sort"
                className="whitespace-nowrap text-[10px] uppercase tracking-[0.15em] text-gray-500 sm:text-xs"
              >
                Sort By
              </label>

              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="min-w-0 flex-1 border border-[#d8cec4] bg-white px-3 py-3 text-sm text-[#211b17] outline-none focus:border-[#9a7656] sm:flex-none sm:px-4"
              >
                <option value="default">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* ================= PRODUCT COUNT ================= */}
          <div className="py-6 sm:py-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 sm:text-xs">
              {filteredProducts.length} Products
            </p>
          </div>

          {/* ================= PRODUCTS ================= */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group overflow-hidden border border-[#ded5ca] bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* ================= PRODUCT IMAGE ================= */}
                  <div className="relative aspect-square overflow-hidden bg-[#f3eee8]">
                    {/* Sale Badge */}
                    {product.discount > 0 && (
                      <div className="absolute left-3 top-3 z-10 bg-[#211b17] px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-[#faf8f4] sm:left-4 sm:top-4 sm:px-3">
                        {product.discount}% Off
                      </div>
                    )}

                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* ================= PRODUCT DETAILS ================= */}
                  <div className="p-4 sm:p-5">
                    {/* Category */}
                    <p className="text-[9px] uppercase tracking-[0.18em] text-[#9a7656] sm:text-[10px] sm:tracking-[0.2em]">
                      {product.category}
                    </p>

                    {/* Product Name */}
                    <h2 className="mt-2 line-clamp-2 min-h-[3.5rem] font-serif text-lg leading-7 text-[#211b17] sm:text-xl">
                      {product.name}
                    </h2>

                    {/* Rating */}
                    <div className="mt-2 flex items-center gap-2 sm:mt-3">
                      <span className="text-sm text-[#9a7656]">★</span>

                      <span className="text-xs text-gray-500">
                        {product.rating}
                      </span>

                      <span className="text-xs text-gray-400">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-4 sm:gap-3">
                      <span className="text-base font-medium text-[#211b17]">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>

                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    {/* ================= VIEW PRODUCT ================= */}
                    <Link
                      to={`/product/${product.id}`}
                      className="mt-4 block w-full border border-[#211b17] py-3 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-[#211b17] transition-all duration-300 hover:bg-[#211b17] hover:text-[#faf8f4] sm:mt-5 sm:text-xs sm:tracking-[0.18em]"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ================= EMPTY SEARCH STATE ================= */
            <div className="px-4 py-16 text-center sm:py-20">
              <h2 className="font-serif text-2xl text-[#211b17] sm:text-3xl">
                No Bangles Found
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Try searching with a different product name.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-6 border border-[#211b17] px-6 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#211b17] transition-all duration-300 hover:bg-[#211b17] hover:text-[#faf8f4] sm:text-xs"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Shop;

import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
  Sparkles,
  ArrowRight,
  Gem,
  ShoppingBag,
  Crown,
  Star,
  Heart,
  Layers3,
} from "lucide-react";

import ProductCard from "../components/ProductCard";
import ScrollReveal from "../components/ScrollReveal";
import { getProducts } from "../services/productApi";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /* =========================================================
     STATE
  ========================================================= */

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All",
  );

  const [selectedCollection, setSelectedCollection] = useState(
    searchParams.get("collection") || "All",
  );

  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "default");

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  /* =========================================================
     PRODUCTS
  ========================================================= */

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     CATEGORIES
  ========================================================= */
         const jewelleryCategories = [
  {
    name: "All",
    description: "Everything beautiful",
    icon: Gem,
  },
  {
    name: "Gold",
    description: "Elegant gold jewellery",
    icon: Gem,
  },
  {
    name: "Silver",
    description: "Classic silver jewellery",
    icon: Crown,
  },
  {
    name: "Bridal",
    description: "Made for special moments",
    icon: Sparkles,
  },
  {
    name: "Designer",
    description: "Statement jewellery",
    icon: Heart,
  },
  {
    name: "Traditional",
    description: "Timeless traditional style",
    icon: Layers3,
  },
  {
    name: "Daily Wear",
    description: "Elegant everyday sparkle",
    icon: Star,
  },
  {
    name: "Stone",
    description: "Beautiful stone designs",
    icon: Gem,
  },
  {
    name: "Pearl",
    description: "Classic pearl elegance",
    icon: Crown,
  },
  {
    name: "Festive",
    description: "Celebrate in sparkle",
    icon: Sparkles,
  },
];

  /* =========================================================
     COLLECTIONS
  ========================================================= */

  const collectionFilters = [
    {
      name: "All",
      description: "Explore everything",
    },
    {
      name: "New Collection",
      description: "Freshly added pieces",
    },
    {
      name: "Top Picks",
      description: "Loved by everyone",
    },
    {
      name: "Best Sellers",
      description: "Our most popular pieces",
    },
    {
      name: "Wedding",
      description: "Made for special moments",
    },
    {
      name: "Festive",
      description: "Celebrate in sparkle",
    },
    {
      name: "Designer",
      description: "Statement jewellery",
    },
  ];

  /* =========================================================
     LOAD PRODUCTS
  ========================================================= */

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        if (data?.success && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
          setError("No products were returned from the server.");
        }
      } catch (err) {
        console.error("SHOP PRODUCTS ERROR:", err);

        setProducts([]);
        setError(err.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  /* =========================================================
     SYNC URL -> STATE
  ========================================================= */

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");

    setSelectedCategory(searchParams.get("category") || "All");

    setSelectedCollection(searchParams.get("collection") || "All");

    setSortBy(searchParams.get("sort") || "default");
  }, [searchParams]);

  /* =========================================================
     HELPERS
  ========================================================= */

  const getProductText = (product) => {
    return [
      product?.name,
      product?.description,
      product?.category,
      product?.collectionName,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  };

  const getProductCategory = (product) => {
    return String(product?.category || "")
      .trim()
      .toLowerCase();
  };

  const getProductCollection = (product) => {
    return String(product?.collectionName || "")
      .trim()
      .toLowerCase();
  };

  /* =========================================================
     CALCULATE PRODUCT RATING
  ========================================================= */

  const getProductRating = (product) => {
    const reviews = Array.isArray(product?.reviews) ? product.reviews : [];

    if (reviews.length === 0) {
      return 0;
    }

    const total = reviews.reduce(
      (sum, review) => sum + Number(review?.rating || 0),
      0,
    );

    return total / reviews.length;
  };

  /* =========================================================
     COLLECTION MATCH
  ========================================================= */

 const productCollectionMatches = (product, collection) => {
  const productCollection = getProductCollection(product);
  const selectedCollection = String(collection).trim().toLowerCase();

  if (!productCollection || !selectedCollection) {
    return false;
  }

  if (productCollection === selectedCollection) {
    return true;
  }

  if (
    productCollection === `${selectedCollection} collection` ||
    selectedCollection === `${productCollection} collection`
  ) {
    return true;
  }

  return false;
};

  /* =========================================================
     FILTER + SORT PRODUCTS
  ========================================================= */

  const filteredProducts = useMemo(() => {
    let filtered = Array.isArray(products) ? [...products] : [];

    /* -------------------------------------------------------
       ACTIVE PRODUCTS ONLY
    ------------------------------------------------------- */

    filtered = filtered.filter((product) => product?.isActive !== false);

    /* -------------------------------------------------------
       SEARCH
    ------------------------------------------------------- */

    const query = searchQuery.trim().toLowerCase();

    if (query) {
      filtered = filtered.filter((product) =>
        getProductText(product).includes(query),
      );
    }

    /* -------------------------------------------------------
       CATEGORY
    ------------------------------------------------------- */
    if (selectedCategory !== "All") {
  const category = selectedCategory.trim().toLowerCase();

  filtered = filtered.filter((product) => {
    const productCategory = getProductCategory(product);

    return (
      productCategory === category ||
      productCategory === `${category} jewellery` ||
      productCategory === `${category} jewelry`
    );
  });
}

    /* -------------------------------------------------------
       COLLECTION
    ------------------------------------------------------- */

    if (selectedCollection !== "All") {
      const collection = selectedCollection.trim().toLowerCase();

      filtered = filtered.filter((product) => {
        /* TOP PICKS */

        if (collection === "top picks") {
          return product?.isFeatured === true;
        }

        /* BEST SELLERS */

        if (collection === "best sellers") {
          return product?.isBestSeller === true;
        }

        /* NEW COLLECTION */

        if (collection === "new collection") {
          return productCollectionMatches(product, "new collection");
        }

        /* NORMAL COLLECTION */

        return productCollectionMatches(product, collection);
      });
    }

    /* -------------------------------------------------------
       SORT
    ------------------------------------------------------- */

    if (sortBy === "low") {
      filtered.sort((a, b) => Number(a?.price || 0) - Number(b?.price || 0));
    }

    if (sortBy === "high") {
      filtered.sort((a, b) => Number(b?.price || 0) - Number(a?.price || 0));
    }

    if (sortBy === "name") {
      filtered.sort((a, b) =>
        String(a?.name || "").localeCompare(String(b?.name || "")),
      );
    }

    /* -------------------------------------------------------
       TOP RATED
    ------------------------------------------------------- */

    if (sortBy === "rating") {
      filtered.sort((a, b) => getProductRating(b) - getProductRating(a));
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, selectedCollection, sortBy]);

  /* =========================================================
     CATEGORY CHANGE
  ========================================================= */

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    const nextParams = new URLSearchParams(searchParams);

    if (category === "All") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", category);
    }

    setSearchParams(nextParams);

    setMobileFiltersOpen(false);
  };

  /* =========================================================
     COLLECTION CHANGE
  ========================================================= */

  const handleCollectionChange = (collection) => {
    setSelectedCollection(collection);

    const nextParams = new URLSearchParams(searchParams);

    if (collection === "All") {
      nextParams.delete("collection");
    } else {
      nextParams.set("collection", collection);
    }

    setSearchParams(nextParams);

    setMobileFiltersOpen(false);
  };

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    const nextParams = new URLSearchParams(searchParams);

    if (query) {
      nextParams.set("search", query);
    } else {
      nextParams.delete("search");
    }

    setSearchParams(nextParams);
  };

  /* =========================================================
     SORT
  ========================================================= */

  const handleSortChange = (value) => {
    setSortBy(value);

    const nextParams = new URLSearchParams(searchParams);

    if (value === "default") {
      nextParams.delete("sort");
    } else {
      nextParams.set("sort", value);
    }

    setSearchParams(nextParams);
  };

  /* =========================================================
     CLEAR SEARCH
  ========================================================= */

  const clearSearch = () => {
    setSearchQuery("");

    const nextParams = new URLSearchParams(searchParams);

    nextParams.delete("search");

    setSearchParams(nextParams);
  };

  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedCollection("All");
    setSortBy("default");

    setSearchParams({});
  };

  /* =========================================================
     FILTER STATUS
  ========================================================= */

  const hasFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedCollection !== "All" ||
    sortBy !== "default";

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="min-h-screen overflow-hidden bg-[#FCF8F6] text-[#352529]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden px-5 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-36 md:px-10 md:pt-40 lg:px-16 lg:pb-20">
        <div className="pointer-events-none absolute -left-40 top-20 h-64 w-64 rounded-full bg-[#F1DCE2]/50 blur-3xl sm:h-80 sm:w-80" />

        <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-[#E9DCC9]/40 blur-3xl sm:h-96 sm:w-96" />

        <div className="pointer-events-none absolute left-1/2 top-32 h-44 w-44 -translate-x-1/2 rounded-full border border-[#C7A45B]/10 sm:h-56 sm:w-56" />

        <div className="relative mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 flex items-center justify-center gap-2 sm:mb-5 sm:gap-3">
                <span className="h-px w-6 bg-[#C7A45B] sm:w-8" />

                <Sparkles
                  size={13}
                  strokeWidth={1.3}
                  className="text-[#C7A45B]"
                />

                <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-[#9A7350] sm:text-[9px] sm:tracking-[0.32em]">
                  YAMA FLYS JEWELLERY
                </p>

                <span className="h-px w-6 bg-[#C7A45B] sm:w-8" />
              </div>

              <h1 className="font-serif text-[2.8rem] leading-[1.02] tracking-[-0.03em] text-[#352529] sm:text-6xl md:text-7xl">
                Find something
                <span className="block italic text-[#B67888]">beautiful.</span>
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-[13px] leading-6 text-[#817276] sm:mt-6 sm:text-base sm:leading-7">
                Discover elegant jewellery collections created to make everyday
                moments and special occasions feel extraordinary.
              </p>

              <div className="mx-auto mt-7 h-px w-12 bg-[#C7A45B] sm:mt-8 sm:w-14" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =====================================================
          CATEGORIES
      ===================================================== */}

      <section className="relative px-5 sm:px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal delay={80}>
            <div className="mb-6 text-center sm:mb-7">
              <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-[#C7A45B] sm:text-[9px]">
                Shop Jewellery
              </p>

              <h2 className="mt-2 font-serif text-[1.8rem] text-[#352529] sm:text-4xl">
                Explore by category
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex min-w-max items-center justify-start gap-2 px-1 sm:justify-center md:gap-3">
                {jewelleryCategories.map((category) => {
                  const active = selectedCategory === category.name;

                  const Icon = category.icon;

                  return (
                    <button
                      key={category.name}
                      type="button"
                      onClick={() => handleCategoryChange(category.name)}
                      className={`
                        group
                        flex
                        min-h-[42px]
                        items-center
                        gap-2
                        rounded-full
                        border
                        px-4
                        py-2.5
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.13em]
                        transition-all
                        duration-300
                        sm:px-6
                        sm:py-3
                        sm:text-[9px]
                        ${
                          active
                            ? "border-[#352529] bg-[#352529] text-white shadow-[0_10px_25px_rgba(53,37,41,0.14)]"
                            : "border-[#E6D7D9] bg-white text-[#5D4A4F] hover:-translate-y-0.5 hover:border-[#C7A45B]/50"
                        }
                      `}
                    >
                      <Icon
                        size={13}
                        strokeWidth={1.4}
                        className={active ? "text-[#D9B86A]" : "text-[#A06D79]"}
                      />

                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =====================================================
          COLLECTION CARDS
      ===================================================== */}

      <section className="px-5 pt-10 sm:px-6 sm:pt-12 md:px-10 md:pt-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-6 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={14}
                    strokeWidth={1.3}
                    className="text-[#C7A45B]"
                  />

                  <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-[#9A7350]">
                    YAMA FLYS
                  </p>
                </div>

                <h2 className="mt-2 font-serif text-[1.8rem] text-[#352529] sm:text-4xl">
                  Explore our collections
                </h2>
              </div>

              <p className="max-w-md text-[13px] leading-6 text-[#817276] sm:text-sm sm:text-right">
                From everyday elegance to wedding sparkle, discover jewellery
                for every beautiful occasion.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4">
              {[
                {
                  title: "New Collection",
                  label: "Fresh",
                  icon: Sparkles,
                  bg: "bg-[#F0DFE3]",
                  color: "text-[#A06D79]",
                },
                {
                  title: "Top Picks",
                  label: "Curated",
                  icon: Star,
                  bg: "bg-[#EEE7D8]",
                  color: "text-[#B18A28]",
                },
                {
                  title: "Wedding",
                  label: "Special",
                  icon: Crown,
                  bg: "bg-[#E9DDE5]",
                  color: "text-[#A06D79]",
                },
                {
                  title: "Festive",
                  label: "Celebrate",
                  icon: Gem,
                  bg: "bg-[#E8E0D1]",
                  color: "text-[#B18A28]",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => handleCollectionChange(item.title)}
                    className={`group relative min-h-[155px] overflow-hidden rounded-[1.35rem] ${item.bg} p-4 text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(73,45,48,0.10)] sm:min-h-[210px] sm:p-5`}
                  >
                    <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/40 blur-2xl" />

                    <Icon
                      size={20}
                      strokeWidth={1.2}
                      className={`relative ${item.color}`}
                    />

                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                      <p
                        className={`text-[7px] font-semibold uppercase tracking-[0.16em] ${item.color}`}
                      >
                        {item.label}
                      </p>

                      <h3 className="mt-1 font-serif text-[1.25rem] text-[#352529] sm:text-2xl">
                        {item.title}
                      </h3>

                      <div className="mt-2.5 flex items-center gap-1.5 text-[7px] font-semibold uppercase tracking-[0.12em] text-[#6B555B]">
                        Discover
                        <ArrowRight
                          size={12}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =====================================================
          COLLECTION FILTERS
      ===================================================== */}

      <section className="relative px-5 pt-10 sm:px-6 sm:pt-12 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex min-w-max items-center justify-start gap-2 px-1 sm:justify-center md:gap-3">
                {collectionFilters.map((collection) => {
                  const active = selectedCollection === collection.name;

                  return (
                    <button
                      key={collection.name}
                      type="button"
                      onClick={() => handleCollectionChange(collection.name)}
                      className={`
                        min-h-[40px]
                        rounded-full
                        border
                        px-4
                        py-2.5
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.13em]
                        transition-all
                        duration-300
                        sm:px-6
                        sm:py-3
                        sm:text-[9px]
                        ${
                          active
                            ? "border-[#B67888] bg-[#B67888] text-white"
                            : "border-[#E6D7D9] bg-white text-[#5D4A4F] hover:border-[#B67888]/50"
                        }
                      `}
                    >
                      {collection.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
  {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <section className="relative px-5 pt-8 sm:px-6 sm:pt-10 md:px-10 md:pt-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal delay={120}>
            <div className="border-y border-[#E8DCDD] py-4 sm:py-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* RESULT */}

                <div>
                  <div className="flex items-center gap-3">
                    <Gem
                      size={14}
                      strokeWidth={1.3}
                      className="text-[#C7A45B]"
                    />

                    <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#8B7277] sm:text-[9px]">
                      {filteredProducts.length}{" "}
                      {filteredProducts.length === 1 ? "piece" : "pieces"}{" "}
                      available
                    </p>
                  </div>

                  {(selectedCategory !== "All" ||
                    selectedCollection !== "All") && (
                    <p className="mt-1 pl-6 text-[11px] text-[#B67888]">
                      {selectedCategory !== "All" && selectedCategory}

                      {selectedCategory !== "All" &&
                        selectedCollection !== "All" &&
                        " · "}

                      {selectedCollection !== "All" && selectedCollection}
                    </p>
                  )}
                </div>

                {/* CONTROLS */}

                <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
                  {/* SEARCH */}

                  <form
                    onSubmit={handleSearchSubmit}
                    className="flex h-11 min-w-0 flex-1 items-center rounded-full border border-[#E2D4D7] bg-white px-3.5 transition-all focus-within:border-[#C7A45B]"
                  >
                    <Search
                      size={15}
                      strokeWidth={1.7}
                      className="shrink-0 text-[#9A858A]"
                    />

                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search jewellery..."
                      className="min-w-0 flex-1 bg-transparent px-2.5 text-[12px] text-[#352529] outline-none placeholder:text-[#B3A5A8]"
                    />

                    {searchQuery && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        aria-label="Clear search"
                        className="flex h-7 w-7 items-center justify-center rounded-full text-[#8B7277] hover:bg-[#F6ECEE]"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </form>

                  {/* SORT */}

                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(event) => handleSortChange(event.target.value)}
                      className="h-11 w-full appearance-none rounded-full border border-[#E2D4D7] bg-white pl-5 pr-10 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#514047] outline-none sm:w-[200px]"
                    >
                      <option value="default">Sort: Featured</option>

                      <option value="low">Price: Low to High</option>

                      <option value="high">Price: High to Low</option>

                      <option value="name">Name: A to Z</option>

                      <option value="rating">Top Rated</option>
                    </select>

                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8B7277]"
                    />
                  </div>

                  {/* MOBILE FILTER */}

                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="flex h-11 items-center justify-center gap-2 rounded-full border border-[#E2D4D7] bg-white px-5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#514047] lg:hidden"
                  >
                    <SlidersHorizontal size={14} />
                    Filters
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =====================================================
          PRODUCT GRID
      ===================================================== */}

      <section className="px-5 py-9 sm:px-6 sm:py-12 md:px-10 md:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* LOADING */}

          {loading && (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-[1.25rem] bg-white"
                >
                  <div className="aspect-[4/5] animate-pulse bg-[#F0E7E8]" />

                  <div className="space-y-3 p-4">
                    <div className="h-3 w-2/3 animate-pulse rounded-full bg-[#F0E7E8]" />

                    <div className="h-4 w-1/2 animate-pulse rounded-full bg-[#F0E7E8]" />

                    <div className="h-3 w-1/3 animate-pulse rounded-full bg-[#F0E7E8]" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ERROR */}

          {!loading && error && (
            <ScrollReveal>
              <div className="mx-auto max-w-xl rounded-[1.5rem] border border-[#E8DCDD] bg-white px-6 py-12 text-center shadow-[0_20px_60px_rgba(73,45,48,0.06)]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FCF5F7]">
                  <ShoppingBag
                    size={27}
                    strokeWidth={1.2}
                    className="text-[#B67888]"
                  />
                </div>

                <p className="mt-6 text-[8px] font-semibold uppercase tracking-[0.25em] text-[#C7A45B]">
                  Something went wrong
                </p>

                <h2 className="mt-3 font-serif text-2xl text-[#352529] sm:text-4xl">
                  Products couldn't load.
                </h2>

                <p className="mx-auto mt-4 max-w-sm text-[13px] leading-6 text-[#817276]">
                  {error}
                </p>
              </div>
            </ScrollReveal>
          )}

          {/* PRODUCTS */}{!loading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-2 gap-x-2.5 gap-y-6 sm:gap-x-5 sm:gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
              {filteredProducts.map((product, index) => (
                <ScrollReveal
                  key={product._id}
                  delay={Math.min(index * 50, 300)}
                >
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* NO PRODUCTS */}

          {!loading && !error && filteredProducts.length === 0 && (
            <ScrollReveal>
              <div className="mx-auto max-w-xl rounded-[1.5rem] border border-[#E8DCDD] bg-white px-6 py-12 text-center shadow-[0_20px_60px_rgba(73,45,48,0.06)] sm:px-12 sm:py-16">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FCF5F7]">
                  <ShoppingBag
                    size={27}
                    strokeWidth={1.2}
                    className="text-[#B67888]"
                  />
                </div>

                <p className="mt-6 text-[8px] font-semibold uppercase tracking-[0.25em] text-[#C7A45B]">
                  Nothing found
                </p>

                <h2 className="mt-3 font-serif text-2xl text-[#352529] sm:text-4xl">
                  Let's try something else.
                </h2>

                <p className="mx-auto mt-4 max-w-sm text-[13px] leading-6 text-[#817276]">
                  We couldn't find any jewellery matching your current search or
                  filters.
                </p>

                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#352529] px-6 py-3.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-white transition-all hover:-translate-y-1 hover:bg-[#4A3439]"
                >
                  View All Jewellery
                  <ArrowRight size={15} strokeWidth={1.4} />
                </button>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="relative overflow-hidden border-t border-[#E8DCDD] bg-[#F4E4E8] px-5 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-16">
        <ScrollReveal>
          <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-between gap-7 text-center md:flex-row md:text-left">
            <div className="max-w-xl">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Sparkles
                  size={14}
                  strokeWidth={1.3}
                  className="text-[#C7A45B]"
                />

                <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-[#9A7350]">
                  YAMA FLYS
                </p>
              </div>

              <h2 className="mt-3 font-serif text-2xl leading-tight text-[#352529] sm:text-4xl">
                A little sparkle can change
                <span className="italic text-[#B67888]"> the whole look.</span>
              </h2>

              <p className="mt-4 text-[13px] leading-6 text-[#806D72] sm:text-sm">
                Explore beautiful jewellery pieces and discover something that
                feels perfectly yours.
              </p>
            </div>

            <Link
              to="/collections"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-[#352529] px-6 py-3.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_15px_35px_rgba(53,37,41,0.16)] transition-all hover:-translate-y-1 hover:bg-[#4A3439]"
            >
              Explore Collections
              <ArrowRight
                size={15}
                strokeWidth={1.4}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* =====================================================
          MOBILE FILTER DRAWER
      ===================================================== */}

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-[#352529]/35 backdrop-blur-sm"
          />

          <aside className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-y-auto rounded-t-[1.75rem] bg-[#FFFDFC] px-5 pb-7 pt-5 shadow-[0_-20px_60px_rgba(53,37,41,0.15)]">
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-[#DCCED1]" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#C7A45B]">
                  Refine
                </p>

                <h2 className="mt-1 font-serif text-2xl text-[#352529]">
                  Shop Jewellery
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F6ECEE] text-[#352529]"
              >
                <X size={18} />
              </button>
            </div>

            {/* CATEGORY */}

            <div className="mt-6">
              <p className="mb-3 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#9A7350]">
                Jewellery Type
              </p>

              <div className="grid gap-2">
                {jewelleryCategories.map((category) => {
                  const active = selectedCategory === category.name;

                  return (
                    <button
                      key={category.name}
                      type="button"
                      onClick={() => handleCategoryChange(category.name)}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-left ${
                        active
                          ? "bg-[#352529] text-white"
                          : "bg-[#F9F2F3] text-[#514047]"
                      }`}
                    >
                      <div>
                        <p className="font-serif text-base">{category.name}</p>

                        <p
                          className={`mt-0.5 text-[8px] uppercase tracking-[0.1em] ${
                            active ? "text-white/60" : "text-[#9A858A]"
                          }`}
                        >
                          {category.description}
                        </p>
                      </div>

                      {active && (
                        <Sparkles size={15} className="text-[#D9B86A]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* COLLECTION */}

            <div className="mt-6">
              <p className="mb-3 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#9A7350]">
                Collections
              </p>

              <div className="grid grid-cols-2 gap-2">
                {collectionFilters.map((collection) => {
                  const active = selectedCollection === collection.name;

                  return (
                    <button
                      key={collection.name}
                      type="button"
                      onClick={() => handleCollectionChange(collection.name)}
                      className={`rounded-2xl px-3.5 py-3.5 text-left ${
                        active
                          ? "bg-[#B67888] text-white"
                          : "bg-[#F9F2F3] text-[#514047]"
                      }`}
                    >
                      <p className="font-serif text-sm">{collection.name}</p>

                      <p
                        className={`mt-1 text-[7px] uppercase tracking-[0.08em] ${
                          active ? "text-white/65" : "text-[#9A858A]"
                        }`}
                      >
                        {collection.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CLEAR */}

            {hasFilters && (
              <button
                type="button"
                onClick={() => {
                  clearAllFilters();
                  setMobileFiltersOpen(false);
                }}
                className="mt-5 w-full rounded-full border border-[#DCCED1] bg-white py-3.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#6F5B61]"
              >
                Clear All Filters
              </button>
            )}
          </aside>
        </div>
      )}
    </main>
  );
};

export default Shop;




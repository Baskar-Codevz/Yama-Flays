
  import { useEffect, useMemo, useState } from "react";
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

const CATEGORIES = [
  { name: "All", description: "Everything beautiful", icon: Gem },
  { name: "Bridal", description: "Made for special moments", icon: Sparkles },
  { name: "Designer", description: "Statement jewellery", icon: Heart },
  { name: "Traditional", description: "Timeless traditional style", icon: Layers3 },
  { name: "Daily Wear", description: "Everyday elegance", icon: Star },
  { name: "Stone", description: "Beautiful stone designs", icon: Gem },
  { name: "Pearl", description: "Classic pearl elegance", icon: Crown },
  { name: "Festive", description: "Celebrate in sparkle", icon: Sparkles },
];

const COLLECTIONS = [
  { name: "All", description: "Explore everything" },
  { name: "New Collection", description: "Freshly added pieces" },
  { name: "Top Picks", description: "Customer favourites" },
  { name: "Best Sellers", description: "Popular designs" },
  { name: "Wedding", description: "Made for special moments" },
  { name: "Festive", description: "Celebrate in sparkle" },
  { name: "Designer", description: "Statement jewellery" },
];

const SORT_OPTIONS = [
  { value: "default", label: "Sort: Featured" },
  { value: "low", label: "Price: Low to High" },
  { value: "high", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
  { value: "rating", label: "Top Rated" },
];

const getProductText = (product) =>
  [
    product?.name,
    product?.description,
    typeof product?.category === "object"
      ? product.category?.name
      : product?.category,
    product?.collectionName,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

const getProductCategory = (product) =>
  String(
    typeof product?.category === "object"
      ? product.category?.name || ""
      : product?.category || ""
  )
    .trim()
    .toLowerCase();

const getProductCollection = (product) =>
  String(
    typeof product?.collection === "string"
      ? product.collection
      : product?.collectionName || ""
  )
    .trim()
    .toLowerCase();

const getProductRating = (product) => {
  const reviews = Array.isArray(product?.reviews) ? product.reviews : [];

  if (!reviews.length) return 0;

  return (
    reviews.reduce((sum, review) => sum + Number(review?.rating || 0), 0) /
    reviews.length
  );
};

const collectionMatches = (product, selected) => {
  const actual = getProductCollection(product);
  const target = String(selected || "").trim().toLowerCase();

  if (!actual || !target) return false;

  return (
    actual === target ||
    actual === `${target} collection` ||
    target === `${actual} collection`
  );
};

function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <div
      className={`mb-7 flex flex-col gap-3 sm:mb-9 ${
        centered
          ? "items-center text-center"
          : "sm:flex-row sm:items-end sm:justify-between"
      }`}
    >
      <div>
        {eyebrow && (
          <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#B99A55]">
            {eyebrow}
          </p>
        )}

        <h2 className="mt-2 font-serif text-3xl text-[#244535] sm:text-4xl">
          {title}
        </h2>
      </div>

      {description && (
        <p className="max-w-md text-sm leading-6 text-[#718176]">
          {description}
        </p>
      )}
    </div>
  );
}

function FilterPill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] transition duration-300 sm:px-5 ${
        active
          ? "border-[#244535] bg-[#244535] text-white"
          : "border-[#DCE3DA] bg-white/80 text-[#526657] hover:border-[#B99A55] hover:text-[#244535]"
      }`}
    >
      {children}
    </button>
  );
}

function MobileFilterDrawer({
  open,
  onClose,
  categories,
  collections,
  selectedCategory,
  selectedCollection,
  onCategoryChange,
  onCollectionChange,
  hasFilters,
  onClear,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200]">
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-[#14281D]/45 backdrop-blur-sm"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shop filters"
        className="absolute right-0 top-0 flex h-full w-[min(88%,380px)] flex-col overflow-y-auto border-l border-[#E1E7DF] bg-[#FCFCF8] px-5 pb-6 pt-6 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-[#DCE3DA] pb-5">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#B99A55]">
              Refine your search
            </p>

            <h2 className="mt-1 font-serif text-2xl text-[#244535]">
              Shop Jewellery
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close filter panel"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EDF1E9] text-[#244535]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#718176]">
            Jewellery Type
          </p>

          <div className="grid gap-2">
            {categories.map(({ name, description, icon: Icon }) => {
              const active = selectedCategory === name;

              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => onCategoryChange(name)}
                  className={`flex items-center justify-between rounded-xl px-3 py-3 text-left transition ${
                    active
                      ? "bg-[#244535] text-white"
                      : "bg-[#F0F3ED] text-[#244535] hover:bg-[#E7EDE4]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={16}
                      className={active ? "text-[#D8BD79]" : "text-[#244535]"}
                    />

                    <div>
                      <p className="text-sm font-medium">{name}</p>
                      <p
                        className={`mt-0.5 text-[10px] ${
                          active ? "text-white/70" : "text-[#718176]"
                        }`}
                      >
                        {description}
                      </p>
                    </div>
                  </div>

                  {active && (
                    <Sparkles size={14} className="text-[#D8BD79]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#718176]">
            Collections
          </p>

          <div className="grid grid-cols-2 gap-2">
            {collections.map(({ name, description }) => {
              const active = selectedCollection === name;

              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => onCollectionChange(name)}
                  className={`rounded-xl px-3 py-3 text-left transition ${
                    active
                      ? "bg-[#244535] text-white"
                      : "bg-[#F0F3ED] text-[#244535] hover:bg-[#E7EDE4]"
                  }`}
                >
                  <p className="text-sm font-medium">{name}</p>

                  <p
                    className={`mt-1 text-[10px] ${
                      active ? "text-white/70" : "text-[#718176]"
                    }`}
                  >
                    {description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-auto pt-6">
          {hasFilters && (
            <button
              type="button"
              onClick={onClear}
              className="mb-3 w-full rounded-full border border-[#D5DED3] bg-white py-3 text-xs font-semibold text-[#244535]"
            >
              Clear All Filters
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-[#244535] py-3 text-xs font-semibold text-white"
          >
            View Products
          </button>
        </div>
      </aside>
    </div>
  );
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("search") || ""
  );

  const [selectedCategory, setSelectedCategory] = useState(
    () => searchParams.get("category") || "All"
  );

  const [selectedCollection, setSelectedCollection] = useState(
    () => searchParams.get("collection") || "All"
  );

  const [sortBy, setSortBy] = useState(
    () => searchParams.get("sort") || "default"
  );

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        if (cancelled) return;

        if (data?.success && Array.isArray(data.products)) {
          setProducts(data.products);
        } else if (Array.isArray(data?.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
          setError("No products were returned from the server.");
        }
      } catch (err) {
        if (cancelled) return;

        console.error("SHOP PRODUCTS ERROR:", err);
        setError(err?.message || "Failed to load products.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
    setSelectedCategory(searchParams.get("category") || "All");
    setSelectedCollection(searchParams.get("collection") || "All");
    setSortBy(searchParams.get("sort") || "default");
  }, [searchParams]);

  const updateParams = (updates) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "All" || value === "default") {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    });

    setSearchParams(nextParams);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    updateParams({ category });
  };

  const handleCollectionChange = (collection) => {
    setSelectedCollection(collection);
    updateParams({ collection });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    updateParams({ sort: value });
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    updateParams({ search: searchQuery.trim() });
  };

  const clearSearch = () => {
    setSearchQuery("");
    updateParams({ search: "" });
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedCollection("All");
    setSortBy("default");
    setSearchParams({});
  };

  const hasFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedCollection !== "All" ||
    sortBy !== "default";

  const filteredProducts = useMemo(() => {
    let result = Array.isArray(products)
      ? products.filter((product) => product?.isActive !== false)
      : [];

    const query = searchQuery.trim().toLowerCase();

    if (query) {
      result = result.filter((product) =>
        getProductText(product).includes(query)
      );
    }

    if (selectedCategory !== "All") {
      const category = selectedCategory.trim().toLowerCase();

      result = result.filter((product) => {
        const actual = getProductCategory(product);

        return (
          actual === category ||
          actual === `${category} jewellery` ||
          actual === `${category} jewelry`
        );
      });
    }

    if (selectedCollection !== "All") {
      const collection = selectedCollection.trim().toLowerCase();

      result = result.filter((product) => {
        if (collection === "top picks") {
          return product?.isFeatured === true;
        }

        if (collection === "best sellers") {
          return (
            product?.isBestSeller === true ||
            product?.bestseller === true
          );
        }

        if (collection === "new collection") {
          return collectionMatches(product, "new collection");
        }

        return collectionMatches(product, collection);
      });
    }

    if (sortBy === "low") {
      result.sort((a, b) => Number(a?.price || 0) - Number(b?.price || 0));
    } else if (sortBy === "high") {
      result.sort((a, b) => Number(b?.price || 0) - Number(a?.price || 0));
    } else if (sortBy === "name") {
      result.sort((a, b) =>
        String(a?.name || "").localeCompare(String(b?.name || ""))
      );
    } else if (sortBy === "rating") {
      result.sort((a, b) => getProductRating(b) - getProductRating(a));
    }

    return result;
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedCollection,
    sortBy,
  ]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F8F4] text-[#244535]">

      {/* RESPONSIVE HERO */}
      <section className="relative isolate overflow-hidden px-4 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:px-12 lg:pb-20 lg:pt-36">
        {/* Background image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-8 bg-cover bg-[center_65%] bg-no-repeat sm:bg-center"
          style={{ backgroundImage: "url('/assets/bg-100.png')" }}
        />

        {/* Background overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[#F8F8F4]/55 sm:bg-[#F8F8F4]/70 lg:bg-[#F8F8F4]/80"
        />

        {/* Decorative gradients */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-10 -z-10 h-48 w-48 rounded-full bg-[#DCE7D9]/70 blur-3xl sm:h-80 sm:w-80"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-48 w-48 rounded-full bg-[#EAE2CD]/60 blur-3xl sm:h-80 sm:w-80"
        />

        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
              {/* Eyebrow */}
              <div className="mb-5 flex items-center justify-center gap-2 sm:gap-3">
                <span className="h-px w-6 bg-[#B99A55] sm:w-10" />
                <Sparkles
                  size={14}
                  className="shrink-0 text-[#B99A55]"
                />

                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#244535] sm:text-[10px] sm:tracking-[0.28em]">
                  YAMA FLAYS JEWELLERY
                </p>

                <span className="h-px w-6 bg-[#B99A55] sm:w-10" />
              </div>

              <p className="mb-3 max-w-full text-[9px] uppercase tracking-[0.18em] text-[#718176] sm:text-[10px] sm:tracking-[0.28em]">
                A little beauty, a lasting memory
              </p>

              {/* Responsive heading */}
              <h1 className="w-full font-serif text-4xl font-medium leading-[1.08] tracking-tight text-[#244535] min-[400px]:text-5xl sm:text-7xl md:text-8xl">
                Find something
                <span className="mt-2 block italic text-[#52745B]">
                  beautiful.
                </span>
              </h1>

              {/* Responsive description */}
              <p className="mx-auto mt-5 w-full max-w-xl px-1 text-sm font-medium leading-6 text-[#53685A] sm:mt-6 sm:text-base sm:leading-7">
                Discover beautiful bangles and jewellery for everyday
                elegance, celebrations, and the moments you want to remember.
              </p>

              {/* CTA */}
              <button
                type="button"
                onClick={() =>
                  document.getElementById("shop-products")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                className="group mt-7 inline-flex max-w-full items-center justify-center gap-3 border-b border-[#B99A55]/70 pb-2 text-center text-[9px] font-bold uppercase tracking-[0.14em] text-[#244535] transition-colors hover:text-[#66866A] sm:text-[10px] sm:tracking-[0.18em]"
              >
                Explore the collection
                <ArrowRight
                  size={14}
                  className="shrink-0 transition-transform group-hover:translate-x-1"
                />
              </button>

              <div className="mt-8 h-px w-12 bg-[#B99A55] sm:mt-10" />
            </div>
          </ScrollReveal>
        </div>
      </section>
      {/* PRODUCTS HEADING */}

{/* PREMIUM PRODUCTS HEADING */}
<section className="relative overflow-hidden px-5 pb-8 pt-12 sm:px-8 sm:pb-10 sm:pt-16 lg:px-12">
  <div className="mx-auto max-w-7xl text-center">

    {/* Eyebrow */}
    <div className="mb-4 flex items-center justify-center gap-3">
      <span className="h-px w-8 bg-[#B99A55] sm:w-12" />

      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#96763A] sm:text-xs">
        Crafted With Love
      </p>

      <span className="h-px w-8 bg-[#B99A55] sm:w-12" />
    </div>

    {/* Main Heading */}
    <h2 className="font-serif text-3xl font-semibold leading-tight tracking-[-0.025em] text-[#173D2B] sm:text-4xl md:text-5xl lg:text-[3.5rem]">
      Discover Our
      <span className="mt-1 block font-normal italic text-[#64836B]">
        Beautiful Collection
      </span>
    </h2>

    {/* Description */}
    <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#68796C] sm:text-base sm:leading-8">
      Explore handcrafted bangles and timeless designs,
      thoughtfully chosen to make every moment special.
    </p>

    {/* Decorative Accent */}
    <div className="mt-6 flex items-center justify-center gap-2">
      <span className="h-1 w-1 rounded-full bg-[#B99A55]" />
      <span className="h-px w-10 bg-[#B99A55]/70" />
      <span className="h-1.5 w-1.5 rotate-45 border border-[#B99A55]" />
      <span className="h-px w-10 bg-[#B99A55]/70" />
      <span className="h-1 w-1 rounded-full bg-[#B99A55]" />
    </div>

  </div>
</section>

{/* PRODUCTS TOOLBAR */}
<section
  id="shop-products"
  className="scroll-mt-24 px-5 pt-7 sm:px-8 sm:pt-10 lg:px-12"
>
  <div className="mx-auto max-w-7xl">
    <ScrollReveal>
      <div className="border-y border-[#DCE3DA] py-4 sm:py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* PRODUCT COUNT */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E5D8B8] bg-[#F5F1E5]">
              <Gem
                size={17}
                strokeWidth={1.5}
                className="text-[#B99A55]"
              />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#244535]">
                Our Collection
              </p>

              <p className="mt-1 text-[11px] text-[#718176]">
                {loading
                  ? "Finding your favourites..."
                  : `${filteredProducts.length} ${
                      filteredProducts.length === 1 ? "piece" : "pieces"
                    } available`}
              </p>

              {(selectedCategory !== "All" ||
                selectedCollection !== "All") && (
                <p className="mt-1 text-[10px] text-[#52745B]">
                  {[selectedCategory, selectedCollection]
                    .filter((value) => value !== "All")
                    .join(" · ")}
                </p>
              )}
            </div>
          </div>

          {/* SORT + FILTERS */}
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:flex-nowrap sm:gap-3">

            {/* SORT DROPDOWN */}
            <div className="relative min-w-0 flex-1 sm:flex-none">
              <select
                value={sortBy}
                onChange={(event) => handleSortChange(event.target.value)}
                aria-label="Sort products"
                className="h-11 w-full appearance-none rounded-full border border-[#DCE3DA] bg-white pl-4 pr-10 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#244535] outline-none transition hover:border-[#B99A55] focus:border-[#B99A55] sm:w-[195px]"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#718176]"
              />
            </div>

            {/* FILTER BUTTON */}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-[#DCE3DA] bg-white px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#244535] transition duration-300 hover:border-[#244535] hover:bg-[#244535] hover:text-white sm:px-5"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>

            {/* CLEAR FILTERS */}
            {hasFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="w-full py-1 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-[#718176] underline underline-offset-4 transition hover:text-[#244535] sm:w-auto sm:px-1"
              >
                Clear all
              </button>
            )}

          </div>
        </div>
      </div>
    </ScrollReveal>
  </div>
 </section>



      {/* PRODUCTS */}
      <section className="px-5 py-9 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          {loading && (
            <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-9 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-[#E6EAE2] bg-white"
                >
                  <div className="aspect-[4/5] animate-pulse bg-[#EDF1E9]" />

                  <div className="space-y-3 p-4">
                    <div className="h-3 w-2/3 animate-pulse rounded-full bg-[#EDF1E9]" />
                    <div className="h-4 w-1/2 animate-pulse rounded-full bg-[#EDF1E9]" />
                    <div className="h-3 w-1/3 animate-pulse rounded-full bg-[#EDF1E9]" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="mx-auto max-w-xl rounded-[1.5rem] border border-[#DCE3DA] bg-white px-6 py-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EDF1E9]">
                <ShoppingBag
                  size={27}
                  strokeWidth={1.2}
                  className="text-[#52745B]"
                />
              </div>

              <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#B99A55]">
                Something went wrong
              </p>

              <h2 className="mt-3 font-serif text-3xl text-[#244535]">
                Products couldn't load.
              </h2>

              <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[#718176]">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 rounded-full bg-[#244535] px-6 py-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#355B43]"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
              {filteredProducts.map((product, index) => (
                <ScrollReveal
                  key={product._id || product.id || product.name}
                  delay={Math.min(index * 40, 240)}
                >
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <div className="mx-auto max-w-xl rounded-[1.5rem] border border-[#DCE3DA] bg-white px-6 py-12 text-center sm:px-12 sm:py-16">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EDF1E9]">
                <ShoppingBag
                  size={27}
                  strokeWidth={1.2}
                  className="text-[#52745B]"
                />
              </div>

              <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#B99A55]">
                Nothing found
              </p>

              <h2 className="mt-3 font-serif text-3xl text-[#244535]">
                Let's try something else.
              </h2>

              <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[#718176]">
                We couldn't find jewellery matching your current search or filters.
              </p>

              <button
                type="button"
                onClick={clearAllFilters}
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#244535] px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white transition hover:-translate-y-0.5 hover:bg-[#355B43]"
              >
                View All Jewellery
                <ArrowRight size={15} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="relative isolate overflow-hidden border-t border-[#E0E6DC] bg-[#EEF2E9] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-white/80 blur-[80px]"
        />

        <ScrollReveal>
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-7 text-center md:flex-row md:text-left">
            <div className="max-w-xl">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Sparkles size={14} className="text-[#B99A55]" />

                <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#718176]">
                  YAMA FLYS
                </p>
              </div>

              <h2 className="mt-3 font-serif text-3xl leading-tight text-[#244535] sm:text-4xl">
                A little sparkle can change
                <span className="block italic text-[#52745B]">
                  the whole look.
                </span>
              </h2>

              <p className="mt-4 text-sm leading-6 text-[#718176]">
                Discover jewellery that complements your style and makes every
                occasion feel special.
              </p>
            </div>

            <Link
              to="/collections"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-[#244535] px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white transition hover:-translate-y-0.5 hover:bg-[#355B43]"
            >
              Explore Collections
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* SIDE FILTER PANEL */}
      <MobileFilterDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        categories={CATEGORIES}
        collections={COLLECTIONS}
        selectedCategory={selectedCategory}
        selectedCollection={selectedCollection}
        onCategoryChange={handleCategoryChange}
        onCollectionChange={handleCollectionChange}
        hasFilters={hasFilters}
        onClear={clearAllFilters}
      />
    </main>
  );
}

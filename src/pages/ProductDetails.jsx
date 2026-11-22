
import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getProductById } from "../services/productApi";
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";

const BACKEND_URL = "https://yama-flays-backend.onrender.com";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { wishlistItems = [], toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { token } = useAuth();

  // PRODUCT STATE
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // PRODUCT OPTIONS
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // REVIEW FORM STATE
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");

  // LOAD PRODUCT
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");
        setProduct(null);

        if (!id) {
          throw new Error("Product ID is missing");
        }

        console.log("Loading product:", id);

        const response = await getProductById(id);

        console.log("Product details response:", response);

        const productData =
          response?.product ||
          response?.data ||
          (response?._id ? response : null);

        if (!productData) {
          throw new Error("Product was not found");
        }

        setProduct(productData);

        if (
          Array.isArray(productData.sizes) &&
          productData.sizes.length > 0
        ) {
          const availableSize = productData.sizes.find(
            (size) => Number(size.stock || 0) > 0
          );

          if (availableSize) {
            setSelectedSize(availableSize.name);
          } else {
            setSelectedSize(productData.sizes[0].name);
          }
        }
      } catch (error) {
        console.error("PRODUCT DETAILS ERROR:", error);
        setProduct(null);
        setError(error.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // IMAGE URL
  const getImageUrl = (image) => {
    if (!image) {
      return "/assets/img-1.webp";
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("data:")
    ) {
      return image;
    }

    if (image.startsWith("/uploads/")) {
      return `${BACKEND_URL}${image}`;
    }

    if (image.startsWith("/assets/")) {
      return image;
    }

    if (image.startsWith("/")) {
      return `${BACKEND_URL}${image}`;
    }

    return `${BACKEND_URL}/${image}`;
  };

  // PRODUCT IMAGES
  const productImages = useMemo(() => {
    if (!product) {
      return [];
    }

    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }

    if (product.image) {
      return [product.image];
    }

    return ["/assets/img-1.webp"];
  }, [product]);

  // PRICE
  const price = Number(product?.price || 0);
  const originalPrice = Number(product?.originalPrice || 0);

  const discount =
    originalPrice > price && price > 0
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  // REVIEWS
  const reviews = Array.isArray(product?.reviews) ? product.reviews : [];

  const validReviews = reviews.filter((review) => {
    const rating = Number(review?.rating);
    return Number.isFinite(rating) && rating >= 1 && rating <= 5;
  });

  const reviewCount = validReviews.length;

  const averageRating = useMemo(() => {
    if (validReviews.length === 0) {
      return 0;
    }

    const total = validReviews.reduce(
      (sum, review) => sum + Number(review.rating),
      0
    );

    return total / validReviews.length;
  }, [product?.reviews]);

  const formattedAverageRating =
    averageRating > 0 ? averageRating.toFixed(1) : "0.0";

  // TOTAL STOCK
  const totalStock = useMemo(() => {
    if (!product) {
      return 0;
    }

    if (Array.isArray(product.sizes) && product.sizes.length > 0) {
      return product.sizes.reduce(
        (total, size) => total + Number(size.stock || 0),
        0
      );
    }

    return Number(product.stock || 0);
  }, [product]);

  // SELECTED SIZE STOCK
  const selectedSizeStock = useMemo(() => {
    if (!product) {
      return 0;
    }

    if (!Array.isArray(product.sizes) || product.sizes.length === 0) {
      return totalStock;
    }

    const size = product.sizes.find(
      (item) => String(item.name) === String(selectedSize)
    );

    return Number(size?.stock || 0);
  }, [product, selectedSize, totalStock]);

  // STOCK STATUS
  const isOutOfStock = totalStock <= 0;

  // WISHLIST
  const productId = String(product?._id || product?.id || "");

  const isWishlisted = wishlistItems.some(
    (item) => String(item?._id || item?.id || "") === productId
  );

  const handleWishlist = () => {
    if (!product) {
      return;
    }

    toggleWishlist(product);
  };

  // QUANTITY
  const increaseQuantity = () => {
    const maxStock =
      Array.isArray(product?.sizes) && product.sizes.length > 0
        ? selectedSizeStock
        : totalStock;

    if (quantity < maxStock) {
      setQuantity((previous) => previous + 1);
    }
  };

  const decreaseQuantity = () => {
    setQuantity((previous) => Math.max(1, previous - 1));
  };

  // SIZE CHANGE
  const handleSizeChange = (sizeName) => {
    setSelectedSize(sizeName);
    setQuantity(1);
  };

  // ADD TO CART
  const handleAddToCart = () => {
    if (!product || isOutOfStock) {
      return;
    }

    if (
      Array.isArray(product.sizes) &&
      product.sizes.length > 0 &&
      !selectedSize
    ) {
      alert("Please select a size");
      return;
    }

    addToCart(product, quantity, selectedSize || null);
    navigate("/cart");
  };

  // BUY NOW
  const handleBuyNow = () => {
    if (!product || isOutOfStock) {
      return;
    }

    if (
      Array.isArray(product.sizes) &&
      product.sizes.length > 0 &&
      !selectedSize
    ) {
      alert("Please select a size");
      return;
    }

    addToCart(product, quantity, selectedSize || null);
    navigate("/checkout");
  };

  // IMAGE NAVIGATION
  const previousImage = () => {
    if (productImages.length <= 1) {
      return;
    }

    setSelectedImage((current) =>
      current === 0 ? productImages.length - 1 : current - 1
    );
  };

  const nextImage = () => {
    if (productImages.length <= 1) {
      return;
    }

    setSelectedImage((current) =>
      current === productImages.length - 1 ? 0 : current + 1
    );
  };

  // REVIEW SUBMIT
  const handleSubmitReview = async (event) => {
    event.preventDefault();

    setReviewError("");
    setReviewSuccess("");

    const trimmedName = reviewName.trim();
    const trimmedComment = reviewComment.trim();

    if (!trimmedName) {
      setReviewError("Please enter your name.");
      return;
    }

    if (reviewRating < 1 || reviewRating > 5) {
      setReviewError("Please select a rating from 1 to 5 stars.");
      return;
    }

    if (!trimmedComment) {
      setReviewError("Please write your review.");
      return;
    }

    if (!product?._id) {
      setReviewError("Product ID is missing. Unable to add review.");
      return;
    }

    if (!token) {
      setReviewError("Please login again to submit your review.");
      return;
    }

    try {
      setReviewSubmitting(true);

      const response = await fetch(
        `${BACKEND_URL}/api/products/${product._id}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: trimmedName,
            rating: reviewRating,
            comment: trimmedComment,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to add review");
      }

      const addedReview = data?.review;

      setProduct((currentProduct) => {
        if (!currentProduct) {
          return currentProduct;
        }

        return {
          ...currentProduct,
          reviews: addedReview
            ? [...(currentProduct.reviews || []), addedReview]
            : data?.product?.reviews || currentProduct.reviews || [],
        };
      });

      setReviewName("");
      setReviewRating(0);
      setReviewComment("");

      setReviewSuccess(
        "Thank you! Your review has been added successfully."
      );
    } catch (error) {
      console.error("ADD REVIEW ERROR:", error);

      setReviewError(
        error.message || "Something went wrong while adding your review."
      );
    } finally {
      setReviewSubmitting(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <main className="min-h-screen bg-[#F5F8F2] px-5 pb-20 pt-32 sm:px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="aspect-[4/5] animate-pulse rounded-[2rem] bg-[#E5EDE1]" />

            <div className="space-y-6 py-5">
              <div className="h-4 w-32 animate-pulse rounded-full bg-[#E5EDE1]" />
              <div className="h-14 w-3/4 animate-pulse rounded-xl bg-[#E5EDE1]" />
              <div className="h-6 w-1/3 animate-pulse rounded-full bg-[#E5EDE1]" />
              <div className="h-24 w-full animate-pulse rounded-2xl bg-[#E5EDE1]" />
              <div className="h-14 w-full animate-pulse rounded-full bg-[#E5EDE1]" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ERROR / NOT FOUND
  if (error || !product) {
    return (
      <main className="min-h-screen bg-[#F5F8F2] px-5 pb-20 pt-32 sm:px-6 md:px-10 lg:px-16">
        <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
          <div className="w-full rounded-[2rem] border border-[#D8E3D5] bg-white p-10 text-center shadow-[0_20px_60px_rgba(29,81,54,0.06)]">
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#477653]">
              YAMA FLYS
            </p>

            <h1 className="mt-4 font-serif text-4xl text-[#173D2B]">
              Product Not Found
            </h1>

            <p className="mt-4 text-sm leading-7 text-[#607563]">
              {error || "The product you are looking for does not exist."}
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-[#1D5136] px-7 text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#286844]"
            >
              <ArrowLeft size={15} />
              Back to Shop
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // MAIN UI
  return (
    <main className="min-h-screen bg-[#F5F8F2] px-5 pb-20 pt-28 sm:px-6 md:px-10 lg:px-16">
      <section className="px-0 pb-20 pt-6">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/shop"
            className="mb-8 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#477653] transition hover:text-[#1D5136]"
          >
            <ArrowLeft size={14} />
            Back to Shop
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {/* PRODUCT IMAGES */}
            <div>
              <div className="group relative overflow-hidden rounded-[2rem] border border-[#D8E3D5] bg-white shadow-[0_20px_60px_rgba(29,81,54,0.07)]">
                <div className="aspect-[4/5] overflow-hidden bg-[#EAF1E6]">
                  <img
                    src={getImageUrl(productImages[selectedImage])}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = "/assets/img-1.webp";
                    }}
                  />
                </div>

                {discount > 0 && (
                  <div className="absolute left-5 top-5 rounded-full bg-[#1D5136] px-4 py-2 text-[8px] font-semibold uppercase tracking-[0.15em] text-white">
                    {discount}% OFF
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleWishlist}
                  aria-label={
                    isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                  className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#173D2B] shadow-lg backdrop-blur-md transition hover:scale-105"
                >
                  <Heart
                    size={18}
                    strokeWidth={1.5}
                    className={
                      isWishlisted
                        ? "fill-[#D77F96] text-[#D77F96]"
                        : "text-[#315B42]"
                    }
                  />
                </button>

                {productImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={previousImage}
                      aria-label="Previous product image"
                      className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#173D2B] shadow-lg backdrop-blur-md"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={nextImage}
                      aria-label="Next product image"
                      className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#173D2B] shadow-lg backdrop-blur-md"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>

              {productImages.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {productImages.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(index)}
                      aria-label={`View product image ${index + 1}`}
                      className={`overflow-hidden rounded-2xl border bg-white ${
                        selectedImage === index
                          ? "border-[#54845D] ring-2 ring-[#54845D]/15"
                          : "border-[#D8E3D5]"
                      }`}
                    >
                      <div className="aspect-square">
                        <img
                          src={getImageUrl(image)}
                          alt={`${product.name} ${index + 1}`}
                          className="h-full w-full object-cover"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = "/assets/img-1.webp";
                          }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PRODUCT INFORMATION */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#C9A227]" />
                <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#477653]">
                  {product.category || "Jewellery"}
                </p>
              </div>

              <h1 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.02em] text-[#173D2B] sm:text-5xl">
                {product.name}
              </h1>

              {product.collectionName && (
                <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#54845D]">
                  {product.collectionName}
                </p>
              )}

              {/* RATING */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={15}
                      strokeWidth={1.3}
                      className={
                        averageRating >= star
                          ? "fill-[#C9A227] text-[#C9A227]"
                          : "text-[#C8D9C6]"
                      }
                    />
                  ))}
                </div>

                {reviewCount > 0 ? (
                  <span className="text-xs text-[#68816D]">
                    {formattedAverageRating} ({reviewCount}{" "}
                    {reviewCount === 1 ? "review" : "reviews"})
                  </span>
                ) : (
                  <span className="text-xs text-[#68816D]">No reviews yet</span>
                )}
              </div>

              {/* PRICE */}
              <div className="mt-7 flex items-end gap-3">
                <span className="font-serif text-3xl font-medium text-[#214B35]">
                  ₹{price.toLocaleString("en-IN")}
                </span>

                {originalPrice > price && (
                  <span className="pb-1 text-sm text-[#8A9A8A] line-through">
                    ₹{originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}
              {product.description && (
                <div className="mt-7 border-y border-[#D8E3D5] py-6">
                  <p className="text-sm leading-7 text-[#526B58]">
                    {product.description}
                  </p>
                </div>
              )}

              {/* SIZE */}
              {Array.isArray(product.sizes) && product.sizes.length > 0 && (
                <div className="mt-7">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#42664D]">
                      Select Size
                    </p>

                    {selectedSize && (
                      <p className="text-[9px] text-[#68816D]">
                        Selected: {selectedSize}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.sizes.map((size) => {
                      const stock = Number(size.stock || 0);
                      const active =
                        String(selectedSize) === String(size.name);
                      const unavailable = stock <= 0;

                      return (
                        <button
                          key={size._id || size.name}
                          type="button"
                          disabled={unavailable}
                          onClick={() => handleSizeChange(size.name)}
                          className={`min-w-[64px] rounded-full border px-5 py-3 text-xs transition-all ${
                            active
                              ? "border-[#1D5136] bg-[#1D5136] text-white"
                              : unavailable
                                ? "cursor-not-allowed border-[#D8E3D5] bg-[#EDF2E9] text-[#9AAA98] line-through"
                                : "border-[#C8D9C6] bg-white text-[#315B42] hover:border-[#54845D]"
                          }`}
                        >
                          {size.name}
                        </button>
                      );
                    })}
                  </div>

                  {selectedSize && selectedSizeStock > 0 && (
                    <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#34734A]">
                      {selectedSizeStock} available in this size
                    </p>
                  )}
                </div>
              )}

              {/* QUANTITY */}
              <div className="mt-7">
                <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#42664D]">
                  Quantity
                </p>

                <div className="flex h-12 w-fit items-center rounded-full border border-[#C8D9C6] bg-white">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="flex h-12 w-12 items-center justify-center text-[#315B42] disabled:opacity-30"
                  >
                    <Minus size={15} />
                  </button>

                  <span className="w-8 text-center text-sm text-[#173D2B]">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={
                      isOutOfStock ||
                      quantity >=
                        (selectedSize ? selectedSizeStock : totalStock)
                    }
                    aria-label="Increase quantity"
                    className="flex h-12 w-12 items-center justify-center text-[#315B42] disabled:opacity-30"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              {/* STOCK */}
              <div className="mt-5">
                {isOutOfStock ? (
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#A34F63]">
                    Currently unavailable
                  </p>
                ) : (
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#34734A]">
                    In stock
                  </p>
                )}
              </div>

              {/* ACTIONS */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={
                    isOutOfStock ||
                    (Array.isArray(product.sizes) &&
                      product.sizes.length > 0 &&
                      !selectedSize)
                  }
                  className="flex min-h-[54px] items-center justify-center gap-3 rounded-full border border-[#1D5136] bg-white px-6 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#1D5136] transition-all hover:-translate-y-0.5 hover:bg-[#EDF4E9] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ShoppingBag size={16} strokeWidth={1.5} />
                  Add to Cart
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={
                    isOutOfStock ||
                    (Array.isArray(product.sizes) &&
                      product.sizes.length > 0 &&
                      !selectedSize)
                  }
                  className="flex min-h-[54px] items-center justify-center gap-3 rounded-full bg-[#1D5136] px-6 text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#286844] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Buy Now
                </button>
              </div>

              {/* TRUST FEATURES */}
              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-[#D8E3D5] pt-7">
                <div className="text-center">
                  <Truck
                    size={20}
                    strokeWidth={1.2}
                    className="mx-auto text-[#54845D]"
                  />
                  <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#42664D]">
                    Easy Delivery
                  </p>
                </div>

                <div className="text-center">
                  <ShieldCheck
                    size={20}
                    strokeWidth={1.2}
                    className="mx-auto text-[#54845D]"
                  />
                  <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#42664D]">
                    Secure Payment
                  </p>
                </div>

                <div className="text-center">
                  <RotateCcw
                    size={20}
                    strokeWidth={1.2}
                    className="mx-auto text-[#54845D]"
                  />
                  <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#42664D]">
                    Easy Returns
                  </p>
                </div>
              </div>

              <Link
                to="/cart"
                className="mt-6 block text-center text-[9px] font-semibold uppercase tracking-[0.18em] text-[#477653] underline underline-offset-4 hover:text-[#1D5136]"
              >
                View your shopping bag
              </Link>
            </div>
          </div>

          {/* REVIEWS */}
          <section className="mt-20 border-t border-[#D8E3D5] pt-16 text-green-900">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              {/* REVIEW FORM */}
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#477653]">
                  Customer Reviews
                </p>

                <h2 className="mt-3 font-serif text-4xl text-[#173D2B]">
                  What customers say
                </h2>

                {reviewCount > 0 ? (
                  <div className="mt-6">
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-5xl text-[#173D2B]">
                        {formattedAverageRating}
                      </span>

                      <div>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              strokeWidth={1.3}
                              className={
                                averageRating >= star
                                  ? "fill-[#C9A227] text-[#C9A227]"
                                  : "text-[#C8D9C6]"
                              }
                            />
                          ))}
                        </div>

                        <p className="mt-2 text-xs text-[#68816D]">
                          Based on {reviewCount}{" "}
                          {reviewCount === 1 ? "review" : "reviews"}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="mt-6 max-w-sm text-sm leading-7 text-[#607563]">
                    No customer reviews have been added yet. Be the first
                    customer to share your experience.
                  </p>
                )}

                <div className="mt-8 rounded-[1.5rem] border border-[#D8E3D5] bg-white  text-green-950 p-6 shadow-[0_15px_40px_rgba(29,81,54,0.04)]">
                  <h3 className="font-serif text-2xl text-[#173D2B]">
                    Write a review
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-[#607563]">
                    Share your experience with this product.
                  </p>

                  <form
                    onSubmit={handleSubmitReview}
                    className="mt-6 space-y-5"
                  >
                    {/* NAME */}
                    <div>
                      <label
                        htmlFor="review-name"
                        className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#42664D]"
                      >
                        Your Name
                      </label>

                      <input
                        id="review-name"
                        type="text"
                        value={reviewName}
                        onChange={(event) =>
                          setReviewName(event.target.value)
                        }
                        placeholder="Enter your name"
                        maxLength={80}
                        disabled={reviewSubmitting}
                        className="mt-2 w-full rounded-2xl border border-[#C8D9C6] bg-[#F5F8F2] px-4 py-3.5 text-sm text-[#173D2B] outline-none transition placeholder:text-[#8A9A8A] focus:border-[#54845D] focus:ring-2 focus:ring-[#54845D]/10 disabled:cursor-not-allowed disabled:opacity-60"
                      />
                    </div>

                    {/* RATING */}
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#42664D]">
                        Your Rating
                      </p>

                      <div className="mt-3 flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => {
                              setReviewRating(star);
                              setReviewError("");
                              setReviewSuccess("");
                            }}
                            disabled={reviewSubmitting}
                            aria-label={`Give ${star} ${
                              star === 1 ? "star" : "stars"
                            }`}
                            className="rounded-md p-1 transition hover:scale-110 disabled:cursor-not-allowed"
                          >
                            <Star
                              size={25}
                              strokeWidth={1.4}
                              className={
                                reviewRating >= star
                                  ? "fill-[#C9A227] text-[#C9A227]"
                                  : "text-[#C8D9C6]"
                              }
                            />
                          </button>
                        ))}

                        {reviewRating > 0 && (
                          <span className="ml-2 text-xs text-[#68816D]">
                            {reviewRating}/5
                          </span>
                        )}
                      </div>
                    </div>

                    {/* COMMENT */}
                    <div>
                      <label
                        htmlFor="review-comment"
                        className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#42664D]"
                      >
                        Your Review
                      </label>

                      <textarea
                        id="review-comment"
                        value={reviewComment}
                        onChange={(event) =>
                          setReviewComment(event.target.value)
                        }
                        placeholder="Tell us about your experience..."
                        rows={5}
                        maxLength={1000}
                        disabled={reviewSubmitting}
                        className="mt-2 w-full resize-none rounded-2xl border border-[#C8D9C6] bg-[#F5F8F2] px-4 py-3.5 text-sm leading-6 text-[#173D2B] outline-none transition placeholder:text-[#8A9A8A] focus:border-[#54845D] focus:ring-2 focus:ring-[#54845D]/10 disabled:cursor-not-allowed disabled:opacity-60"
                      />

                      <p className="mt-2 text-right text-[9px] text-[#8A9A8A]">
                        {reviewComment.length}/1000
                      </p>
                    </div>

                    {/* ERROR */}
                    {reviewError && (
                      <div className="rounded-xl border border-[#E8C8CF] bg-[#FFF5F7] px-4 py-3">
                        <p className="text-xs leading-5 text-[#A34F63]">
                          {reviewError}
                        </p>
                      </div>
                    )}

                    {/* SUCCESS */}
                    {reviewSuccess && (
                      <div className="rounded-xl border border-[#C8D9C6] bg-[#EDF6EA] px-4 py-3">
                        <p className="text-xs leading-5 text-[#286844]">
                          {reviewSuccess}
                        </p>
                      </div>
                    )}

                    {/* SUBMIT */}
                    <button
                      type="submit"
                      disabled={reviewSubmitting}
                      className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#1D5136] px-6 text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:bg-[#286844] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {reviewSubmitting ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                </div>
              </div>

              {/* REVIEW LIST */}
              <div>
                {reviewCount > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review, index) => {
                      const rating = Math.min(
                        5,
                        Math.max(0, Number(review?.rating || 0))
                      );

                      return (
                        <article
                          key={review?._id || `${review?.name}-${index}`}
                          className="rounded-[1.5rem] border border-[#D8E3D5] bg-white p-6 shadow-[0_10px_30px_rgba(29,81,54,0.03)]"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h3 className="text-sm font-semibold text-[#173D2B]">
                                {review?.name || "Customer"}
                              </h3>

                              <div className="mt-2 flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    size={13}
                                    strokeWidth={1.3}
                                    className={
                                      rating >= star
                                        ? "fill-[#C9A227] text-[#C9A227]"
                                        : "text-[#C8D9C6]"
                                    }
                                  />
                                ))}
                              </div>
                            </div>

                            {review?.createdAt && (
                              <time
                                dateTime={review.createdAt}
                                className="text-[9px] uppercase tracking-[0.12em] text-[#8A9A8A]"
                              >
                                {new Date(review.createdAt).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </time>
                            )}
                          </div>

                          <p className="mt-5 text-sm leading-7 text-[#526B58]">
                            {review?.comment || "No comment provided."}
                          </p>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex min-h-[220px] items-center justify-center rounded-[1.5rem] border border-dashed border-[#C8D9C6] bg-white/70 px-6 text-center">
                    <div>
                      <Star
                        size={28}
                        strokeWidth={1.2}
                        className="mx-auto text-[#C9A227]"
                      />

                      <p className="mt-4 font-serif text-2xl text-[#173D2B]">
                        Be the first to review
                      </p>

                      <p className="mt-2 text-sm text-[#607563]">
                        Share your experience using the review form.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;

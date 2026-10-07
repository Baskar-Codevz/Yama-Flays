import React, { useEffect, useMemo, useState } from "react";
import { MessageCircle, Star, Sparkles, ArrowDown } from "lucide-react";

const MAX_REVIEW_LENGTH = 500;

const Reviews = ({ productId }) => {
  /* =========================================================
     PRODUCT ID
  ========================================================= */

  const normalizedProductId =
    productId !== undefined && productId !== null ? String(productId) : "";

  /*
    Every product gets its own localStorage key.

    Example:
    yama-flys-reviews-product-1
    yama-flys-reviews-product-2
    yama-flys-reviews-product-3
  */

  const REVIEW_STORAGE_KEY = normalizedProductId
    ? `yama-flys-reviews-product-${normalizedProductId}`
    : "yama-flys-reviews-product-unknown";

  /* =========================================================
     REVIEWS
  ========================================================= */

  const [reviews, setReviews] = useState([]);

  /* =========================================================
     FORM
  ========================================================= */

  const [formData, setFormData] = useState({
    name: "",
    review: "",
  });

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState("");

  /* =========================================================
     MOUSE INTERACTION
  ========================================================= */

  const [mousePosition, setMousePosition] = useState({
    x: 50,
    y: 50,
  });

  const [isHovering, setIsHovering] = useState(false);

  /* =========================================================
     LOAD PRODUCT-SPECIFIC REVIEWS
  ========================================================= */

  useEffect(() => {
    /*
      Reset reviews first whenever product changes.
    */

    setReviews([]);

    if (!normalizedProductId) {
      return;
    }

    try {
      const savedReviews = localStorage.getItem(REVIEW_STORAGE_KEY);

      if (!savedReviews) {
        return;
      }

      const parsedReviews = JSON.parse(savedReviews);

      if (Array.isArray(parsedReviews)) {
        setReviews(parsedReviews);
      }
    } catch (error) {
      console.error("Failed to load product reviews:", error);
      setReviews([]);
    }
  }, [REVIEW_STORAGE_KEY, normalizedProductId]);

  /* =========================================================
     SAVE PRODUCT-SPECIFIC REVIEWS
  ========================================================= */

  useEffect(() => {
    if (!normalizedProductId) {
      return;
    }

    /*
      Don't save immediately while the product reviews
      are still being loaded.
    */

    try {
      localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(reviews));
    } catch (error) {
      console.error("Failed to save product reviews:", error);
    }
  }, [reviews, REVIEW_STORAGE_KEY, normalizedProductId]);

  /* =========================================================
     AVERAGE RATING
  ========================================================= */

  const averageRating = useMemo(() => {
    if (reviews.length === 0) {
      return 0;
    }

    const total = reviews.reduce(
      (sum, item) => sum + Number(item.rating || 0),
      0,
    );

    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  /* =========================================================
     MOUSE MOVE
  ========================================================= */

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    if (!rect.width || !rect.height) {
      return;
    }

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({
      x,
      y,
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);

    setMousePosition({
      x: 50,
      y: 50,
    });
  };

  /* =========================================================
     FORM CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" && value.length > 80) {
      return;
    }

    if (name === "review" && value.length > MAX_REVIEW_LENGTH) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (submittedMessage) {
      setSubmittedMessage("");
    }
  };

  /* =========================================================
     SUBMIT REVIEW
  ========================================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!normalizedProductId) {
      alert("Product information is missing. Please refresh the page.");
      return;
    }

    const cleanName = formData.name.trim();
    const cleanReview = formData.review.trim();

    if (cleanName.length < 2) {
      alert("Please enter your name.");
      return;
    }

    if (cleanReview.length < 10) {
      alert("Please write at least 10 characters in your review.");
      return;
    }

    if (!rating) {
      alert("Please select a star rating.");
      return;
    }

    setIsSubmitting(true);

    const newReview = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      productId: normalizedProductId,
      name: cleanName,
      review: cleanReview,
      rating: Number(rating),
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    // Add review to this product only
    const updatedReviews = [newReview, ...reviews];

    // Update UI
    setReviews(updatedReviews);

    // Calculate new average rating
    const totalRating = updatedReviews.reduce(
      (sum, item) => sum + Number(item.rating || 0),
      0,
    );

    const averageRating = Number(
      (totalRating / updatedReviews.length).toFixed(1),
    );

    // Save rating specifically for this product
    try {
      localStorage.setItem(
        RATING_STORAGE_KEY,
        JSON.stringify({
          productId: normalizedProductId,
          rating: averageRating,
          reviews: updatedReviews.length,
        }),
      );

      // Tell Shop.jsx that this product rating changed
      window.dispatchEvent(
        new CustomEvent("yama-flys-rating-updated", {
          detail: {
            productId: normalizedProductId,
            rating: averageRating,
            reviews: updatedReviews.length,
          },
        }),
      );
    } catch (error) {
      console.error("Failed to save product rating:", error);
    }

    setFormData({
      name: "",
      review: "",
    });

    setRating(0);
    setHoverRating(0);

    setSubmittedMessage("Your review has been added.");

    setIsSubmitting(false);

    window.setTimeout(() => {
      setSubmittedMessage("");
    }, 2500);
  };
  /* =========================================================
     RENDER STARS
  ========================================================= */

  const renderStars = (value = 0, interactive = false) => {
    const activeValue = interactive
      ? hoverRating || rating
      : Number(value) || 0;

    return (
      <div className="flex items-center justify-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          if (interactive) {
            return (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                aria-label={`Select ${star} star rating`}
                className="rounded-full p-1 transition-all duration-200 hover:-translate-y-1 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40"
              >
                <Star
                  size={24}
                  strokeWidth={1.5}
                  className={
                    star <= activeValue
                      ? "fill-[#C9A227] text-[#C9A227]"
                      : "text-[#C9A227]/30"
                  }
                />
              </button>
            );
          }

          return (
            <Star
              key={star}
              size={17}
              strokeWidth={1.5}
              className={
                star <= activeValue
                  ? "fill-[#C9A227] text-[#C9A227]"
                  : "text-[#C9A227]/20"
              }
            />
          );
        })}
      </div>
    );
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes reviewFadeUp {
          from {
            opacity: 0;
            transform: translateY(35px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes reviewFadeLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes reviewFadeRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes reviewFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes reviewPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.12;
          }

          50% {
            transform: scale(1.12);
            opacity: 0.28;
          }
        }

        @keyframes reviewShimmer {
          0% {
            transform: translateX(-140%);
          }

          100% {
            transform: translateX(140%);
          }
        }

        @keyframes reviewLine {
          from {
            width: 0;
            opacity: 0;
          }

          to {
            width: 60px;
            opacity: 1;
          }
        }

        @keyframes reviewCard {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes reviewSuccess {
          from {
            opacity: 0;
            transform: translateY(5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* =====================================================
          SECTION
      ===================================================== */}

      <section
        id="reviews"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative overflow-hidden bg-gradient-to-br from-[#CBB5D4] via-[#C3ABCD] to-[#D4C0DB] px-5 py-20 sm:px-8 md:py-24 lg:px-12 lg:py-28"
      >
        {/* ===================================================
            MOUSE GLOW
        =================================================== */}

        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `
              radial-gradient(
                circle 430px at ${mousePosition.x}% ${mousePosition.y}%,
                rgba(201,162,39,0.18),
                rgba(116,82,127,0.14) 38%,
                transparent 74%
              )
            `,
          }}
        />

        {/* ===================================================
            AMBIENT GLOW
        =================================================== */}

        <div
          className="pointer-events-none absolute -left-40 -top-32 h-[30rem] w-[30rem] rounded-full bg-[#74527F]/20 blur-3xl"
          style={{
            animation: "reviewPulse 8s ease-in-out infinite",
          }}
        />

        <div
          className="pointer-events-none absolute -bottom-40 right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-[#C9A227]/10 blur-3xl"
          style={{
            animation: "reviewPulse 9s ease-in-out infinite reverse",
          }}
        />

        {/* ===================================================
            DECORATIVE CIRCLES
        =================================================== */}

        <div
          className="pointer-events-none absolute right-[-6rem] top-16 hidden h-72 w-72 rounded-full border border-[#C9A227]/25 lg:block"
          style={{
            animation: "reviewFloat 8s ease-in-out infinite",
          }}
        />

        <div
          className="pointer-events-none absolute bottom-[-5rem] left-[8%] h-40 w-40 rounded-full border border-white/20"
          style={{
            animation: "reviewFloat 7s ease-in-out infinite reverse",
          }}
        />

        {/* ===================================================
            MAIN CONTAINER
        =================================================== */}

        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center">
          {/* =================================================
              HEADING
          ================================================= */}

          <div
            className="mx-auto w-full max-w-3xl text-center"
            style={{
              animation: "reviewFadeUp 0.9s ease-out forwards",
            }}
          >
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A227]/35 bg-white/75 shadow-sm backdrop-blur-sm">
              <Sparkles
                size={20}
                strokeWidth={1.3}
                className="text-[#C9A227]"
              />
            </div>

            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#705512]">
              Customer Reviews
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#171717] sm:text-5xl md:text-6xl">
              Your Experience
              <span className="relative mt-2 block italic text-[#74527F]">
                Matters to Us
                <span
                  className="absolute -bottom-3 left-1/2 h-[2px] -translate-x-1/2 bg-[#C9A227]"
                  style={{
                    animation: "reviewLine 1.2s ease-out forwards",
                  }}
                />
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-[#433B46] md:text-base md:leading-8">
              Share your experience with this YAMA FLYS design and help other
              customers make informed choices.
            </p>
          </div>

          {/* =================================================
              REVIEW SUMMARY
          ================================================= */}

          <div
            className="mx-auto mt-12 w-full max-w-2xl rounded-3xl border border-white/60 bg-white/90 p-8 text-center shadow-[0_25px_65px_rgba(62,42,69,0.16)] backdrop-blur-md md:p-10"
            style={{
              animation: "reviewFadeUp 1s ease-out forwards",
            }}
          >
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                {reviews.length > 0 ? (
                  <>
                    <p className="font-serif text-6xl leading-none text-[#171717]">
                      {averageRating}
                    </p>

                    <div className="mt-4">
                      {renderStars(Math.round(Number(averageRating)))}
                    </div>

                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#6B626F]">
                      Based on {reviews.length}{" "}
                      {reviews.length === 1 ? "review" : "reviews"}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-serif text-6xl leading-none text-[#171717]">
                      —
                    </p>

                    <div className="mt-4">{renderStars(0)}</div>

                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#6B626F]">
                      No reviews yet
                    </p>
                  </>
                )}
              </div>

              <div className="my-8 h-px w-20 bg-[#DCCDE2]" />

              <div className="flex max-w-md flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A227]/25 bg-[#F4ECF7]">
                  <MessageCircle
                    size={21}
                    strokeWidth={1.5}
                    className="text-[#74527F]"
                  />
                </div>

                <h3 className="mt-5 font-serif text-2xl text-[#171717]">
                  Share Your Experience
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#625A67]">
                  Your feedback helps us improve and helps other customers
                  understand this design.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              ADD REVIEW FORM
          ================================================= */}

          <div
            className="mx-auto mt-10 w-full max-w-2xl rounded-3xl border border-white/60 bg-white/95 p-6 text-center shadow-[0_25px_65px_rgba(62,42,69,0.14)] backdrop-blur-md md:p-10"
            style={{
              animation: "reviewFadeUp 1.1s ease-out forwards",
            }}
          >
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3">
                <span className="h-[2px] w-8 bg-[#C9A227]" />

                <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#856617]">
                  Leave a Review
                </p>

                <span className="h-[2px] w-8 bg-[#C9A227]" />
              </div>

              <h3 className="mt-4 font-serif text-3xl text-[#171717] md:text-4xl">
                How was your experience?
              </h3>

              <p className="mx-auto mt-3 max-w-md text-xs leading-5 text-[#7A707C]">
                Your review will be saved specifically for this product.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mx-auto max-w-xl space-y-6 text-left"
            >
              {/* NAME */}

              <div>
                <label
                  htmlFor={`review-name-${normalizedProductId}`}
                  className="mb-2 block text-center text-xs uppercase tracking-[0.2em] text-[#5E5663]"
                >
                  Your Name
                </label>

                <input
                  id={`review-name-${normalizedProductId}`}
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={80}
                  className="w-full rounded-xl border border-[#D8CBDD] bg-[#F8F3FA] px-4 py-3.5 text-center text-sm text-[#171717] outline-none transition-all duration-300 placeholder:text-[#9B939F] hover:border-[#B99CC3] focus:border-[#C9A227] focus:bg-white focus:shadow-[0_0_0_4px_rgba(201,162,39,0.08)]"
                />
              </div>

              {/* RATING */}

              <div>
                <p className="mb-3 text-center text-xs uppercase tracking-[0.2em] text-[#5E5663]">
                  Your Rating
                </p>

                <div className="flex justify-center">
                  {renderStars(rating, true)}
                </div>

                {rating > 0 && (
                  <p
                    className="mt-2 text-center text-sm font-medium text-[#74527F]"
                    aria-live="polite"
                  >
                    {rating}/5
                  </p>
                )}
              </div>

              {/* REVIEW */}

              <div>
                <label
                  htmlFor={`review-message-${normalizedProductId}`}
                  className="mb-2 block text-center text-xs uppercase tracking-[0.2em] text-[#5E5663]"
                >
                  Your Review
                </label>

                <textarea
                  id={`review-message-${normalizedProductId}`}
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  rows="5"
                  minLength={10}
                  maxLength={MAX_REVIEW_LENGTH}
                  placeholder="Tell us about your experience..."
                  required
                  className="w-full resize-none rounded-xl border border-[#D8CBDD] bg-[#F8F3FA] px-4 py-3.5 text-center text-sm text-[#171717] outline-none transition-all duration-300 placeholder:text-[#9B939F] hover:border-[#B99CC3] focus:border-[#C9A227] focus:bg-white focus:shadow-[0_0_0_4px_rgba(201,162,39,0.08)]"
                />

                <div className="mt-2 flex items-center justify-between px-1">
                  <span className="text-[9px] text-[#A097A4]">
                    Minimum 10 characters
                  </span>

                  <span className="text-[9px] text-[#8E8492]">
                    {formData.review.length}/{MAX_REVIEW_LENGTH}
                  </span>
                </div>
              </div>

              {/* SUCCESS */}

              {submittedMessage && (
                <p
                  className="text-center text-xs font-medium text-[#53725C]"
                  style={{
                    animation: "reviewSuccess 300ms ease-out",
                  }}
                  aria-live="polite"
                >
                  {submittedMessage}
                </p>
              )}

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={isSubmitting || !normalizedProductId}
                className="group/button relative mx-auto flex w-full max-w-sm items-center justify-center overflow-hidden rounded-full bg-[#171717] px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#29212E] hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {!isSubmitting && (
                  <span
                    className="absolute inset-y-0 left-0 w-1/3 -translate-x-[140%] bg-gradient-to-r from-transparent via-[#F4DA72]/40 to-transparent"
                    style={{
                      animation: "reviewShimmer 3.5s ease-in-out infinite",
                    }}
                  />
                )}

                {isSubmitting ? (
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-[#D8BD65]" />
                    Submitting...
                  </span>
                ) : (
                  <span className="relative z-10">Submit Review</span>
                )}
              </button>
            </form>
          </div>

          {/* =================================================
              CUSTOMER REVIEWS
          ================================================= */}

          {reviews.length > 0 && (
            <div
              className="mx-auto mt-14 w-full max-w-4xl"
              style={{
                animation: "reviewFadeUp 1.2s ease-out forwards",
              }}
            >
              <div className="mb-8 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-[#725713]">
                  Customer Feedback
                </p>

                <h3 className="mt-3 font-serif text-3xl text-[#171717] md:text-4xl">
                  What Customers Say
                </h3>

                <div className="mx-auto mt-4 h-[2px] w-10 bg-[#C9A227]" />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {reviews.map((item, index) => (
                  <article
                    key={item.id}
                    className="group/card relative overflow-hidden rounded-2xl border border-white/60 bg-white/95 p-7 text-center shadow-[0_15px_40px_rgba(62,42,69,0.12)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A227]/35 hover:shadow-[0_25px_55px_rgba(62,42,69,0.18)]"
                    style={{
                      animation: `reviewCard 0.6s ease-out ${
                        index * 0.12
                      }s both`,
                    }}
                  >
                    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#74527F]/10 blur-2xl transition-all duration-500 group-hover/card:scale-150" />

                    <div className="relative z-10">
                      <h4 className="font-medium text-[#171717]">
                        {item.name}
                      </h4>

                      <p className="mt-1 text-xs text-[#857C89]">{item.date}</p>

                      <div className="mt-4 flex justify-center">
                        {renderStars(item.rating)}
                      </div>

                      <p className="mt-5 text-sm leading-7 text-[#5F5763]">
                        "{item.review}"
                      </p>

                      <div className="mx-auto mt-6 h-[2px] w-7 bg-[#C9A227] transition-all duration-500 group-hover/card:w-14" />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {reviews.length === 0 && (
            <div
              className="mt-10 text-center"
              style={{
                animation: "reviewFadeUp 1.3s ease-out forwards",
              }}
            >
              <div className="flex flex-col items-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/50">
                  <ArrowDown size={16} className="text-[#74527F]" />
                </div>

                <p className="text-sm text-[#625A67]">
                  Be the first customer to share a review.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Reviews;

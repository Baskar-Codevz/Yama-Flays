
import React, { useEffect, useMemo, useState } from "react";
import { MessageCircle, Star, Trash2 } from "lucide-react";

const Reviews = () => {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("yama-flys-reviews");

    return savedReviews ? JSON.parse(savedReviews) : [];
  });

  const [formData, setFormData] = useState({
    name: "",
    review: "",
  });

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    localStorage.setItem("yama-flys-reviews", JSON.stringify(reviews));
  }, [reviews]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;

    const total = reviews.reduce((sum, item) => sum + item.rating, 0);

    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating) {
      alert("Please select a star rating.");
      return;
    }

    if (!formData.name.trim() || !formData.review.trim()) {
      alert("Please enter your name and review.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: formData.name.trim(),
      review: formData.review.trim(),
      rating,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    setReviews((prev) => [newReview, ...prev]);

    setFormData({
      name: "",
      review: "",
    });

    setRating(0);
    setHoverRating(0);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?",
    );

    if (!confirmDelete) return;

    setReviews((prev) => prev.filter((item) => item.id !== id));
  };

  const renderStars = (value, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const activeValue = interactive
            ? hoverRating || rating
            : value;

          return interactive ? (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={`${star} star`}
              className="transition-transform duration-200 hover:scale-110"
            >
              <Star
                size={22}
                strokeWidth={1.5}
                className={
                  star <= activeValue
                    ? "fill-[#c9a77d] text-[#c9a77d]"
                    : "text-[#c9a77d]"
                }
              />
            </button>
          ) : (
            <Star
              key={star}
              size={17}
              strokeWidth={1.5}
              className={
                star <= activeValue
                  ? "fill-[#c9a77d] text-[#c9a77d]"
                  : "text-[#d8cec4]"
              }
            />
          );
        })}
      </div>
    );
  };

  return (
    <section
      id="reviews"
      className="bg-[#faf8f4] px-6 py-20 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-[#9a7656]">
            Customer Reviews
          </p>

          <h2 className="font-serif text-4xl leading-tight text-[#211b17] md:text-5xl">
            Your Experience
            <span className="block italic text-[#9a7656]">
              Matters to Us
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-gray-600 md:text-base">
            Share your experience with YAMA FLYS and help other customers
            discover our collection.
          </p>
        </div>

        {/* Review Summary */}
        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-[#ded5ca] bg-white p-8 md:p-10">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            {/* Rating */}
            <div className="text-center md:text-left">
              {reviews.length > 0 ? (
                <>
                  <p className="font-serif text-5xl text-[#211b17]">
                    {averageRating}
                  </p>

                  <div className="mt-3 flex justify-center md:justify-start">
                    {renderStars(Math.round(Number(averageRating)))}
                  </div>

                  <p className="mt-2 text-xs uppercase tracking-[0.15em] text-gray-500">
                    Based on {reviews.length}{" "}
                    {reviews.length === 1 ? "review" : "reviews"}
                  </p>
                </>
              ) : (
                <>
                  <p className="font-serif text-5xl text-[#211b17]">—</p>

                  <div className="mt-3 flex justify-center md:justify-start">
                    {renderStars(0)}
                  </div>

                  <p className="mt-2 text-xs uppercase tracking-[0.15em] text-gray-500">
                    No reviews yet
                  </p>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="hidden h-24 w-px bg-[#ded5ca] md:block" />

            {/* Message */}
            <div className="max-w-md text-center md:text-left">
              <div className="mb-4 flex justify-center md:justify-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3ece4] text-[#9a7656]">
                  <MessageCircle size={21} strokeWidth={1.5} />
                </div>
              </div>

              <h3 className="font-serif text-2xl text-[#211b17]">
                Share Your Experience
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Your feedback helps us improve and helps other customers
                make informed choices.
              </p>
            </div>
          </div>
        </div>

        {/* Add Review */}
        <div className="mx-auto mt-12 max-w-3xl border border-[#ded5ca] bg-white p-6 md:p-10">
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#9a7656]">
              Leave a Review
            </p>

            <h3 className="mt-3 font-serif text-3xl text-[#211b17]">
              How was your experience?
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="review-name"
                className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#756a61]"
              >
                Your Name
              </label>

              <input
                id="review-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-[#ded5ca] bg-[#faf8f4] px-4 py-3 text-sm text-[#211b17] outline-none transition-colors focus:border-[#9a7656]"
              />
            </div>

            {/* Star Rating */}
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#756a61]">
                Your Rating
              </p>

              <div className="flex items-center gap-2">
                {renderStars(rating, true)}

                {rating > 0 && (
                  <span className="ml-2 text-sm text-[#756a61]">
                    {rating}/5
                  </span>
                )}
              </div>
            </div>

            {/* Review */}
            <div>
              <label
                htmlFor="review-message"
                className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#756a61]"
              >
                Your Review
              </label>

              <textarea
                id="review-message"
                name="review"
                value={formData.review}
                onChange={handleChange}
                rows="5"
                placeholder="Tell us about your experience..."
                className="w-full resize-none border border-[#ded5ca] bg-[#faf8f4] px-4 py-3 text-sm text-[#211b17] outline-none transition-colors focus:border-[#9a7656]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#211b17] px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#3a2d25]"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Reviews List */}
        {reviews.length > 0 && (
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#9a7656]">
                  Customer Feedback
                </p>

                <h3 className="mt-2 font-serif text-3xl text-[#211b17]">
                  What Customers Say
                </h3>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {reviews.map((item) => (
                <article
                  key={item.id}
                  className="border border-[#ded5ca] bg-white p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-medium text-[#211b17]">
                        {item.name}
                      </h4>

                      <p className="mt-1 text-xs text-gray-500">
                        {item.date}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      aria-label="Delete review"
                      className="text-gray-400 transition-colors hover:text-red-600"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="mt-4">
                    {renderStars(item.rating)}
                  </div>

                  <p className="mt-4 text-sm leading-7 text-gray-600">
                    "{item.review}"
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {reviews.length === 0 && (
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500">
              Be the first customer to share a review.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;


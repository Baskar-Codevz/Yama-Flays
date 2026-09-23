
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
} from "lucide-react";

import Product from "../data/Product";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";

const ProductDetails = () => {
  const { id } = useParams();

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = Product.find(
    (item) => String(item.id) === String(id),
  );

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // Product not found
  if (!product) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#faf8f4] px-5 text-center">
        <div>
          <h1 className="font-serif text-3xl text-[#211b17]">
            Product Not Found
          </h1>

          <p className="mt-3 text-sm text-[#756a61]">
            The product you're looking for doesn't exist.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-block bg-[#211b17] px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#3a2d25]"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const handleQuantityDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleQuantityIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);

    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 1800);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    window.location.href = "/checkout";
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <main className="min-h-screen bg-[#faf8f4]">

      {/* ================= BACK TO SHOP ================= */}
      <div className="mx-auto max-w-7xl px-5 pt-7 sm:px-6 md:px-10 lg:px-16">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#756a61] transition-colors duration-300 hover:text-[#211b17]"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Back to Shop
        </Link>
      </div>

      {/* ================= PRODUCT SECTION ================= */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12 md:px-10 md:py-16 lg:px-16 lg:py-20">

        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-20">

          {/* ================= PRODUCT IMAGE ================= */}
          <div className="relative">

            <div className="relative overflow-hidden bg-[#f1ece5]">

              {product.discount > 0 && (
                <span className="absolute left-4 top-4 z-10 bg-[#211b17] px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.15em] text-white sm:left-5 sm:top-5 sm:text-[10px]">
                  {product.discount}% Off
                </span>
              )}

              <img
                src={product.image}
                alt={product.name}
                className="aspect-square w-full object-cover"
              />

              {/* ================= WISHLIST ================= */}
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label={
                  inWishlist
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[#d8cec3] bg-white transition-all duration-300 hover:scale-105 sm:right-5 sm:top-5"
              >
                <Heart
                  size={20}
                  strokeWidth={1.7}
                  className={
                    inWishlist
                      ? "text-red-500"
                      : "text-[#211b17]"
                  }
                  fill={
                    inWishlist
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>
            </div>
          </div>

          {/* ================= PRODUCT INFORMATION ================= */}
          <div className="flex flex-col justify-center">

            {/* Category */}
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#9a7656] sm:text-xs sm:tracking-[0.3em]">
              {product.category}
            </p>

            {/* Product Name */}
            <h1 className="mt-3 font-serif text-3xl leading-tight text-[#211b17] sm:text-4xl md:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1">
                <Star
                  size={15}
                  fill="currentColor"
                  className="text-[#9a7656]"
                />

                <span className="text-sm text-[#211b17]">
                  {product.rating}
                </span>
              </div>

              <span className="text-sm text-gray-400">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-2xl font-medium text-[#211b17] sm:text-3xl">
                ₹{product.price.toLocaleString("en-IN")}
              </span>

              {product.originalPrice > product.price && (
                <span className="text-base text-gray-400 line-through sm:text-lg">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-sm leading-7 text-[#756a61] sm:text-base">
              Discover the beauty of this elegant bangle design,
              thoughtfully selected for everyday styling and special
              occasions.
            </p>

            <div className="my-7 h-px w-full bg-[#e3dbd2]" />

            {/* ================= QUANTITY ================= */}
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#211b17]">
                Quantity
              </p>

              <div className="flex w-fit items-center border border-[#d8cec3] bg-white">

                <button
                  type="button"
                  onClick={handleQuantityDecrease}
                  aria-label="Decrease quantity"
                  className="flex h-11 w-11 items-center justify-center text-[#211b17] transition-colors hover:bg-[#f1ece5]"
                >
                  <Minus size={16} strokeWidth={1.5} />
                </button>

                <span className="flex h-11 w-12 items-center justify-center border-x border-[#d8cec3] text-sm">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={handleQuantityIncrease}
                  aria-label="Increase quantity"
                  className="flex h-11 w-11 items-center justify-center text-[#211b17] transition-colors hover:bg-[#f1ece5]"
                >
                  <Plus size={16} strokeWidth={1.5} />
                </button>

              </div>
            </div>

            {/* ================= ACTION BUTTONS ================= */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">

              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex min-h-[50px] items-center justify-center gap-2 border px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] transition-all duration-300 sm:text-sm ${
                  addedToCart
                    ? "border-green-600 bg-green-600 text-white"
                    : "border-[#211b17] bg-white text-[#211b17] hover:bg-[#211b17] hover:text-white"
                }`}
              >
                {addedToCart ? (
                  <>✓ Added to Cart</>
                ) : (
                  <>
                    <ShoppingBag
                      size={17}
                      strokeWidth={1.6}
                    />
                    Add to Cart
                  </>
                )}
              </button>

              {/* Buy Now */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="min-h-[50px] bg-[#211b17] px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-[#3a2d25] sm:text-sm"
              >
                Buy Now
              </button>

            </div>

            {/* ================= PRODUCT BENEFITS ================= */}
            <div className="mt-9 border-t border-[#e3dbd2]">

              {/* Delivery */}
              <div className="flex gap-4 border-b border-[#e3dbd2] py-5">
                <Truck
                  size={21}
                  strokeWidth={1.4}
                  className="mt-0.5 shrink-0 text-[#8c7b6d]"
                />

                <div>
                  <h3 className="text-sm font-medium text-[#211b17]">
                    Delivery
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#756a61]">
                    Delivery details will be confirmed after your
                    order is placed.
                  </p>
                </div>
              </div>

              {/* Secure */}
              <div className="flex gap-4 border-b border-[#e3dbd2] py-5">
                <ShieldCheck
                  size={21}
                  strokeWidth={1.4}
                  className="mt-0.5 shrink-0 text-[#8c7b6d]"
                />

                <div>
                  <h3 className="text-sm font-medium text-[#211b17]">
                    Secure Ordering
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#756a61]">
                    Your order details are handled securely.
                  </p>
                </div>
              </div>

              {/* Returns */}
              <div className="flex gap-4 py-5">
                <RotateCcw
                  size={21}
                  strokeWidth={1.4}
                  className="mt-0.5 shrink-0 text-[#8c7b6d]"
                />

                <div>
                  <h3 className="text-sm font-medium text-[#211b17]">
                    Easy Assistance
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#756a61]">
                    Contact YAMA FLAYS for order and product
                    assistance.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;


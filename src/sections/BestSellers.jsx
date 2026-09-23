
import React, { useState } from "react";
import { ArrowRight, Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";

const products = [
  {
    id: 1,
    name: "Royal Bridal Bangles",
    category: "Bridal",
    price: 2499,
    oldPrice: 2999,
    rating: 4.8,
    reviews: 124,
    discount: 17,
    image: "/assets/img-1.webp",
  },
  {
    id: 2,
    name: "Classic Stone Bangles",
    category: "Stone",
    price: 1299,
    oldPrice: 1599,
    rating: 4.7,
    reviews: 86,
    discount: 19,
    image: "/assets/img-2.webp",
  },
  {
    id: 3,
    name: "Elegant Gold Finish",
    category: "Gold Finish",
    price: 1899,
    oldPrice: 2299,
    rating: 4.9,
    reviews: 64,
    discount: 17,
    image: "/assets/img-3.webp",
  },
  {
    id: 4,
    name: "Traditional Red Bangles",
    category: "Traditional",
    price: 799,
    oldPrice: 999,
    rating: 4.6,
    reviews: 48,
    discount: 20,
    image: "/assets/img-4.webp",
  },
];

const BestSellers = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [addedProductId, setAddedProductId] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);

    setAddedProductId(product.id);

    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  const handleWishlist = (product) => {
    toggleWishlist(product);
  };

  return (
    <section className="bg-[#FDFBF7] px-6 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 font-serif text-sm tracking-[0.3em] text-[#8B5E3C]">
              CUSTOMER FAVORITES
            </p>

            <h2 className="font-serif text-4xl text-[#2C211B] md:text-5xl">
              Best Sellers
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#6B4F3A] md:text-base">
              Discover the bangles our customers love the most.
            </p>
          </div>

          {/* View All */}
          <Link
            to="/shop"
            className="group flex w-fit items-center gap-2 border-b border-[#8B5E3C] pb-2 text-xs font-medium tracking-[0.15em] text-[#6B4F3A] transition-colors duration-300 hover:text-[#8B5E3C]"
          >
            VIEW ALL BANGLES

            <ArrowRight
              size={17}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            const wishlistActive = isInWishlist(product.id);
            const cartAdded = addedProductId === product.id;

            return (
              <div
                key={product.id}
                className="group relative transition-transform duration-500 hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F1EB]">
                  <Link
                    to={`/product/${product.id}`}
                    className="block h-full w-full"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    />
                  </Link>

                  {/* Image Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/5" />

                  {/* Discount */}
                  <span className="absolute left-4 top-4 bg-[#2C211B] px-3 py-1.5 text-[10px] font-medium tracking-[0.12em] text-white shadow-md">
                    {product.discount}% OFF
                  </span>

                  {/* Wishlist */}
                  <button
                    type="button"
                    onClick={() => handleWishlist(product)}
                    aria-label={
                      wishlistActive
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                    className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-all duration-300 ${
                      wishlistActive
                        ? "scale-100 bg-[#2C211B] text-white opacity-100"
                        : "bg-white text-[#2C211B] opacity-100 hover:scale-110 hover:bg-[#2C211B] hover:text-white md:opacity-0 md:group-hover:opacity-100"
                    }`}
                  >
                    <Heart
                      size={18}
                      strokeWidth={1.7}
                      fill={wishlistActive ? "currentColor" : "none"}
                    />
                  </button>

                  {/* Add To Cart */}
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className={`absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 py-3 text-xs font-medium tracking-[0.12em] text-white shadow-lg transition-all duration-500 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 ${
                      cartAdded
                        ? "bg-green-600"
                        : "bg-[#2C211B] hover:bg-[#8B5E3C]"
                    }`}
                  >
                    <ShoppingBag size={16} strokeWidth={1.7} />

                    {cartAdded ? "ADDED TO CART" : "ADD TO CART"}
                  </button>
                </div>

                {/* Product Info */}
                <div className="pt-5">
                  {/* Category */}
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8B5E3C]">
                    {product.category}
                  </p>

                  {/* Product Name */}
                  <Link to={`/product/${product.id}`}>
                    <h3 className="mt-2 font-serif text-xl text-[#2C211B] transition-colors duration-300 hover:text-[#8B5E3C]">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star
                        size={14}
                        fill="currentColor"
                        strokeWidth={1.5}
                        className="text-[#C89B3C]"
                      />

                      <span className="text-sm text-[#6B4F3A]">
                        {product.rating}
                      </span>
                    </div>

                    <span className="text-sm text-[#9A887A]">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-lg font-medium text-[#2C211B]">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>

                    <span className="text-sm text-[#9A887A] line-through">
                      ₹{product.oldPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;


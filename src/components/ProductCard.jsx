import React from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";

const ProductCard = ({ product }) => {
  // Prevent white screen if product is missing
  if (!product) {
    return null;
  }

  return (
    <div className="group">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F1EB]">
        <img
          src={product.images?.[0] || "/assets/img-1.webp"}
          alt={product.name || "Bangle"}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Discount */}
        {product.discount > 0 && (
          <span className="absolute left-4 top-4 bg-[#2C211B] px-3 py-1 text-xs text-white">
            {product.discount}% OFF
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2C211B] opacity-0 transition-all duration-300 group-hover:opacity-100"
        >
          <Heart size={18} />
        </button>

        {/* Add to Cart */}
        <button
          type="button"
          className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 bg-[#2C211B] py-3 text-sm text-white opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-[#8B5E3C]"
        >
          <ShoppingBag size={17} />
          ADD TO CART
        </button>
      </div>

      {/* Product Details */}
      <div className="pt-5">
        <p className="text-xs uppercase tracking-[0.2em] text-[#8B5E3C]">
          {product.category}
        </p>

        <h3 className="mt-2 font-serif text-xl text-[#2C211B]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star size={14} fill="currentColor" className="text-[#C89B3C]" />

            <span className="text-sm text-[#6B4F3A]">{product.rating}</span>
          </div>

          <span className="text-sm text-[#9A887A]">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center gap-3">
          <span className="text-lg font-medium text-[#2C211B]">
            ₹{product.price?.toLocaleString("en-IN")}
          </span>

          {product.originalPrice && (
            <span className="text-sm text-[#9A887A] line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

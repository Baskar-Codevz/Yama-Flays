import React, { useState } from "react";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [addedProductId, setAddedProductId] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);

    setAddedProductId(product.id);

    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  return (
    <section className="min-h-screen bg-[#faf8f4] px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#8c7b6d]">
            Your Favorites
          </p>

          <h1 className="font-serif text-4xl text-[#211b17] md:text-5xl">
            My Wishlist
          </h1>

          <div className="mx-auto mt-5 h-px w-16 bg-[#211b17]" />
        </div>

        {/* Empty Wishlist */}
        {wishlistItems.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f1ece5]">
              <Heart size={32} strokeWidth={1.3} className="text-[#8c7b6d]" />
            </div>

            <h2 className="text-2xl font-medium text-[#211b17]">
              Your Wishlist is Empty
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-[#756a61]">
              Save your favourite bangles here and come back whenever you're
              ready to shop.
            </p>

            <Link
              to="/shop"
              className="mt-8 bg-[#211b17] px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#3a2d25]"
            >
              Browse Shop
            </Link>
          </div>
        ) : (
          /* Wishlist Products */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                className="group relative overflow-hidden border border-[#e5ddd4] bg-white"
              >
                {/* Product Image */}
                <Link
                  to={`/product/${product.id}`}
                  className="relative block overflow-hidden bg-[#f1ece5]"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromWishlist(product.id);
                    }}
                    aria-label="Remove from wishlist"
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#211b17] shadow-sm transition-all duration-300 hover:bg-[#211b17] hover:text-white"
                  >
                    <Trash2 size={17} strokeWidth={1.6} />
                  </button>
                </Link>

                {/* Product Info */}
                <div className="p-5">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#9a8b7e]">
                    {product.category}
                  </p>

                  <Link
                    to={`/product/${product.id}`}
                    className="block text-lg font-medium text-[#211b17] transition-colors hover:text-[#8c6f5a]"
                  >
                    {product.name}
                  </Link>

                  <p className="mt-2 text-sm text-[#211b17]">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>

                  {/* Add to Cart */}
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className={`mt-5 flex w-full items-center justify-center gap-2 border py-3 text-xs font-medium uppercase tracking-[0.16em] transition-all duration-300 ${
                      addedProductId === product.id
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-[#211b17] text-[#211b17] hover:bg-[#211b17] hover:text-white"
                    }`}
                  >
                    {addedProductId === product.id ? (
                      <>✓ Added to Cart</>
                    ) : (
                      <>
                        <ShoppingBag size={16} strokeWidth={1.6} />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;

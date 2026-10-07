import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);

const WISHLIST_STORAGE_KEY = "yama-flys-wishlist";

// =====================================================
// PRODUCT ID HELPER
// =====================================================

const getProductId = (product) => {
  if (!product) {
    return "";
  }

  return String(product._id ?? product.id ?? "");
};

// =====================================================
// WISHLIST PROVIDER
// =====================================================

export const WishlistProvider = ({ children }) => {
  // ===================================================
  // LOAD WISHLIST FROM LOCAL STORAGE
  // ===================================================

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);

      if (!savedWishlist) {
        return [];
      }

      const parsedWishlist = JSON.parse(savedWishlist);

      if (!Array.isArray(parsedWishlist)) {
        return [];
      }

      return parsedWishlist;
    } catch (error) {
      console.error("Failed to load wishlist:", error);

      return [];
    }
  });

  // ===================================================
  // SAVE WISHLIST
  // ===================================================

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (error) {
      console.error("Failed to save wishlist:", error);
    }
  }, [wishlistItems]);

  // ===================================================
  // TOGGLE WISHLIST
  // ===================================================

  const toggleWishlist = (product) => {
    if (!product) {
      console.error("Wishlist error: Product is missing.");
      return;
    }

    const productId = getProductId(product);

    if (!productId) {
      console.error("Wishlist error: Product ID is missing.", product);

      return;
    }

    setWishlistItems((currentItems) => {
      // ===============================================
      // CHECK IF PRODUCT ALREADY EXISTS
      // ===============================================

      const alreadyExists = currentItems.some((item) => {
        return getProductId(item) === productId;
      });

      // ===============================================
      // REMOVE FROM WISHLIST
      // ===============================================

      if (alreadyExists) {
        return currentItems.filter((item) => {
          return getProductId(item) !== productId;
        });
      }

      // ===============================================
      // ADD TO WISHLIST
      // ===============================================

      return [...currentItems, product];
    });
  };

  // ===================================================
  // CHECK WHETHER PRODUCT IS IN WISHLIST
  // ===================================================

  const isInWishlist = (productId) => {
    if (!productId) {
      return false;
    }

    const normalizedProductId = String(productId);

    return wishlistItems.some((item) => {
      return getProductId(item) === normalizedProductId;
    });
  };

  // ===================================================
  // REMOVE FROM WISHLIST
  // ===================================================

  const removeFromWishlist = (productId) => {
    if (!productId) {
      return;
    }

    const normalizedProductId = String(productId);

    setWishlistItems((currentItems) => {
      return currentItems.filter((item) => {
        return getProductId(item) !== normalizedProductId;
      });
    });
  };

  // ===================================================
  // CLEAR WISHLIST
  // ===================================================

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  // ===================================================
  // WISHLIST COUNT
  // ===================================================

  const wishlistCount = wishlistItems.length;

  // ===================================================
  // CONTEXT VALUE
  // ===================================================

  const contextValue = {
    wishlistItems,
    toggleWishlist,
    isInWishlist,
    removeFromWishlist,
    clearWishlist,
    wishlistCount,
  };

  // ===================================================
  // PROVIDER
  // ===================================================

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};

// =====================================================
// USE WISHLIST HOOK
// =====================================================

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
};

// =====================================================
// DEFAULT EXPORT
// =====================================================

export default WishlistContext;

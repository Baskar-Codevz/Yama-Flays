import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "yama-flys-cart";

/* =========================================================
   HELPERS
========================================================= */

const getProductId = (product) => {
  if (!product) return null;

  const id = product.id ?? product._id;

  if (id === undefined || id === null || id === "") {
    return null;
  }

  return String(id);
};

const normalizeSize = (size) => {
  if (size === undefined || size === null || size === "") {
    return null;
  }

  return String(size);
};

const normalizeQuantity = (quantity) => {
  const value = Number(quantity);

  if (!Number.isFinite(value) || value < 1) {
    return 1;
  }

  return Math.floor(value);
};

/* =========================================================
   IMAGE HELPER
========================================================= */

const getProductImage = (product) => {
  if (!product) {
    return "";
  }

  /* Backend / API images array */

  if (Array.isArray(product.images) && product.images.length > 0) {
    return product.images[0];
  }

  /* Single image */

  if (product.image) {
    return product.image;
  }

  return "";
};

/* =========================================================
   NORMALIZE CART ITEM
========================================================= */

const normalizeCartItem = (item) => {
  if (!item) {
    return null;
  }

  const id = getProductId(item);

  if (!id) {
    console.error("Cart item has no product ID:", item);
    return null;
  }

  return {
    id,

    _id: item._id ?? id,

    name: item.name || "Product",

    price: Number(item.price) || 0,

    originalPrice: Number(item.originalPrice) || 0,

    image: getProductImage(item),

    images:
      Array.isArray(item.images) && item.images.length > 0
        ? item.images
        : item.image
          ? [item.image]
          : [],

    category: item.category || "",

    collection: item.collection || "",

    rating: Number(item.rating) || 0,

    reviews: Number(item.reviews) || 0,

    description: item.description || "",

    sizes: Array.isArray(item.sizes) ? item.sizes : [],

    selectedSize: normalizeSize(item.selectedSize),

    quantity: normalizeQuantity(item.quantity),
  };
};

/* =========================================================
   PROVIDER
========================================================= */

export const CartProvider = ({ children }) => {
  /* =======================================================
     LOAD CART
  ======================================================= */

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      if (!Array.isArray(parsedCart)) {
        return [];
      }

      return parsedCart.map(normalizeCartItem).filter(Boolean);
    } catch (error) {
      console.error("Failed to load cart:", error);

      localStorage.removeItem(CART_STORAGE_KEY);

      return [];
    }
  });

  /* =======================================================
     SAVE CART
  ======================================================= */

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cartItems]);

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const addToCart = (product, quantity = 1, size = null) => {
    const productId = getProductId(product);

    if (!productId) {
      console.error("Cannot add product to cart. Product ID missing:", product);

      return false;
    }

    const selectedSize = normalizeSize(size);
    const safeQuantity = normalizeQuantity(quantity);

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => {
        const itemId = getProductId(item);

        return (
          itemId === productId &&
          normalizeSize(item.selectedSize) === selectedSize
        );
      });

      /* ===================================================
         PRODUCT ALREADY EXISTS
      =================================================== */

      if (existingItem) {
        return currentItems.map((item) => {
          const itemId = getProductId(item);

          if (
            itemId === productId &&
            normalizeSize(item.selectedSize) === selectedSize
          ) {
            return {
              ...item,
              quantity: normalizeQuantity(item.quantity) + safeQuantity,
            };
          }

          return item;
        });
      }

      /* ===================================================
         NEW PRODUCT
      =================================================== */

      const newItem = normalizeCartItem({
        ...product,

        id: productId,

        selectedSize,

        quantity: safeQuantity,

        image: getProductImage(product),

        images:
          Array.isArray(product.images) && product.images.length > 0
            ? product.images
            : product.image
              ? [product.image]
              : [],
      });

      if (!newItem) {
        console.error("Could not create cart item.");
        return currentItems;
      }

      return [...currentItems, newItem];
    });

    return true;
  };

  /* =======================================================
     REMOVE FROM CART
  ======================================================= */

  const removeFromCart = (productId, size = null) => {
    const normalizedId = String(productId);
    const normalizedSize = normalizeSize(size);

    setCartItems((currentItems) =>
      currentItems.filter((item) => {
        const itemId = getProductId(item);

        const sameProduct = itemId === normalizedId;

        const sameSize = normalizeSize(item.selectedSize) === normalizedSize;

        return !(sameProduct && sameSize);
      }),
    );
  };

  /* =======================================================
     UPDATE QUANTITY
  ======================================================= */

  const updateQuantity = (productId, quantity, size = null) => {
    const normalizedId = String(productId);
    const normalizedSize = normalizeSize(size);

    const safeQuantity = Number(quantity);

    if (!Number.isFinite(safeQuantity)) {
      return;
    }

    if (safeQuantity < 1) {
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) => {
        const itemId = getProductId(item);

        const sameProduct = itemId === normalizedId;

        const sameSize = normalizeSize(item.selectedSize) === normalizedSize;

        if (sameProduct && sameSize) {
          return {
            ...item,
            quantity: Math.floor(safeQuantity),
          };
        }

        return item;
      }),
    );
  };

  /* =======================================================
     INCREASE QUANTITY
  ======================================================= */

  const increaseQuantity = (productId, size = null) => {
    const normalizedId = String(productId);
    const normalizedSize = normalizeSize(size);

    setCartItems((currentItems) =>
      currentItems.map((item) => {
        const itemId = getProductId(item);

        const sameProduct = itemId === normalizedId;

        const sameSize = normalizeSize(item.selectedSize) === normalizedSize;

        if (sameProduct && sameSize) {
          return {
            ...item,
            quantity: normalizeQuantity(item.quantity) + 1,
          };
        }

        return item;
      }),
    );
  };

  /* =======================================================
     DECREASE QUANTITY
  ======================================================= */

  const decreaseQuantity = (productId, size = null) => {
    const normalizedId = String(productId);
    const normalizedSize = normalizeSize(size);

    setCartItems((currentItems) =>
      currentItems
        .map((item) => {
          const itemId = getProductId(item);

          const sameProduct = itemId === normalizedId;

          const sameSize = normalizeSize(item.selectedSize) === normalizedSize;

          if (sameProduct && sameSize) {
            return {
              ...item,
              quantity: Number(item.quantity) - 1,
            };
          }

          return item;
        })
        .filter((item) => Number(item.quantity) > 0),
    );
  };

  /* =======================================================
     CLEAR CART
  ======================================================= */

  const clearCart = () => {
    setCartItems([]);
  };

  /* =======================================================
     CART COUNT
  ======================================================= */

  const cartCount = cartItems.reduce(
    (total, item) => total + normalizeQuantity(item.quantity),
    0,
  );

  /* =======================================================
     CART TOTAL
  ======================================================= */

  const cartTotal = cartItems.reduce((total, item) => {
    const price = Number(item.price) || 0;

    const quantity = normalizeQuantity(item.quantity);

    return total + price * quantity;
  }, 0);

  /* =======================================================
     CONTEXT VALUE
  ======================================================= */

  const value = {
    cartItems,

    addToCart,

    removeFromCart,

    updateQuantity,

    increaseQuantity,

    decreaseQuantity,

    clearCart,

    cartCount,

    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/* =========================================================
   HOOK
========================================================= */

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};

export default CartContext;

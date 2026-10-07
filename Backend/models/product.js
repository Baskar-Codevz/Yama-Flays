import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // =====================================================
    // PRODUCT BASIC INFORMATION
    // =====================================================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // =====================================================
    // PRICE
    // =====================================================

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    originalPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    // =====================================================
    // PRODUCT IMAGES
    // =====================================================

    images: {
      type: [String],
      default: [],
    },

    // =====================================================
    // CATEGORY & COLLECTION
    // =====================================================

    category: {
      type: String,
      required: true,
      trim: true,
    },

    collectionName: {
      type: String,
      default: "",
      trim: true,
    },

    // =====================================================
    // PRODUCT SIZES
    // =====================================================

    sizes: [
      {
        name: {
          type: String,
          trim: true,
        },

        stock: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    ],

    // =====================================================
    // GENERAL STOCK
    // =====================================================

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    // =====================================================
    // PRODUCT STATUS
    // =====================================================

    isBestSeller: {
      type: Boolean,
      default: false,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // =====================================================
    // CUSTOMER REVIEWS
    // =====================================================

    reviews: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },

        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },

        comment: {
          type: String,
          required: true,
          trim: true,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

  // =======================================================
  // TIMESTAMPS
  // =======================================================

  {
    timestamps: true,
  },
);

// =========================================================
// PRODUCT MODEL
// =========================================================

const Product = mongoose.model("Product", productSchema);

export default Product;

import mongoose from "mongoose";
import Product from "../models/product.js";

/* =========================================================
   GET ALL PRODUCTS
========================================================= */

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

/* =========================================================
   GET PRODUCT BY ID
========================================================= */

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

/* =========================================================
   CREATE PRODUCT
========================================================= */

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      category,
      collectionName,
      images,
      sizes,
      stock,
      isBestSeller,
      isFeatured,
      isActive,
    } = req.body;

    if (!name || !description || price === undefined || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, description, price and category are required",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      originalPrice,
      category,
      collectionName: collectionName || "",
      images: images || [],
      sizes: sizes || [],
      stock: Number(stock || 0),
      isBestSeller: Boolean(isBestSeller),
      isFeatured: Boolean(isFeatured),
      isActive: isActive !== false,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

/* =========================================================
   UPDATE PRODUCT
========================================================= */

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const {
      name,
      description,
      price,
      originalPrice,
      category,
      collectionName,
      images,
      sizes,
      stock,
      isBestSeller,
      isFeatured,
      isActive,
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        originalPrice,
        category,
        collectionName: collectionName || "",
        images: images || [],
        sizes: sizes || [],
        stock: Number(stock || 0),
        isBestSeller: Boolean(isBestSeller),
        isFeatured: Boolean(isFeatured),
        isActive: isActive !== false,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

/* =========================================================
   DELETE PRODUCT
========================================================= */

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("DELETE REQUEST RECEIVED");
    console.log("Product ID:", id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      console.log("Product not found:", id);

      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    console.log("Product found:", product.name);

    await Product.findByIdAndDelete(id);

    console.log("Product deleted:", id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      productId: id,
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};

/* =========================================================
   ADD CUSTOMER REVIEW
========================================================= */

export const addReview = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, rating, comment } = req.body;

    /* -----------------------------------------------------
       CHECK PRODUCT ID
    ----------------------------------------------------- */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    /* -----------------------------------------------------
       CHECK REVIEW DATA
    ----------------------------------------------------- */

    if (!name || !comment || rating === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, rating and comment are required",
      });
    }

    /* -----------------------------------------------------
       VALIDATE RATING
    ----------------------------------------------------- */

    const numericRating = Number(rating);

    if (
      !Number.isFinite(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    /* -----------------------------------------------------
       FIND PRODUCT
    ----------------------------------------------------- */

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    /* -----------------------------------------------------
       CREATE REVIEW
    ----------------------------------------------------- */

    const newReview = {
      name: String(name).trim(),
      rating: numericRating,
      comment: String(comment).trim(),
      createdAt: new Date(),
    };

    /* -----------------------------------------------------
       ADD REVIEW
    ----------------------------------------------------- */

    product.reviews.push(newReview);

    await product.save();

    /* -----------------------------------------------------
       RESPONSE
    ----------------------------------------------------- */

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      review: product.reviews[product.reviews.length - 1],
      product,
    });
  } catch (error) {
    console.error("ADD REVIEW ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add review",
    });
  }
};

/* =========================================================
   DELETE REVIEW
========================================================= */

export const deleteReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params;

    /* -----------------------------------------------------
       CHECK PRODUCT ID
    ----------------------------------------------------- */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    /* -----------------------------------------------------
       CHECK REVIEW ID
    ----------------------------------------------------- */

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review ID",
      });
    }

    /* -----------------------------------------------------
       FIND PRODUCT
    ----------------------------------------------------- */

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    /* -----------------------------------------------------
       FIND REVIEW
    ----------------------------------------------------- */

    const review = product.reviews.id(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    /* -----------------------------------------------------
       DELETE REVIEW
    ----------------------------------------------------- */

    review.deleteOne();

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("DELETE REVIEW ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete review",
    });
  }
};

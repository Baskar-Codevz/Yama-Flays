
import React, { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  X,
  Upload,
  Image as ImageIcon,
  Package,
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Star,
  Sparkles,
  Layers3,
  Boxes,
} from "lucide-react";

import {
  createProduct,
  uploadImage,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../services/productApi";

const API_BASE_URL = "https://yama-flays-backend.onrender.com";

const ProductAdmin = () => {
  /* =========================================================
     INITIAL FORM
  ========================================================= */

  const getInitialForm = () => ({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    collection: "",
    images: [],
    sizes: [{ name: "", stock: "" }],
    bestseller: false,
    featured: false,
    isActive: true,
  });

  /* =========================================================
     STATE
  ========================================================= */

  const [formData, setFormData] = useState(getInitialForm());
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  /* =========================================================
     MESSAGE
  ========================================================= */

  const showMessage = (text, type = "info") => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 4000);
  };

  const getMessageStyle = () => {
    if (messageType === "success") {
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    }

    if (messageType === "error") {
      return "border-red-200 bg-red-50 text-red-700";
    }

    return "border-[#D4E2D0] bg-[#EEF5E9] text-[#286844]";
  };

  /* =========================================================
     LOAD PRODUCTS
  ========================================================= */

  const loadProducts = async () => {
    try {
      setProductsLoading(true);

      const result = await getProducts();

      if (Array.isArray(result)) {
        setProducts(result);
      } else {
        setProducts(result?.products || []);
      }
    } catch (error) {
      console.error("Failed to load products:", error);
      showMessage(error?.message || "Failed to load products.", "error");
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* =========================================================
     INPUT CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* =========================================================
     IMAGE SELECTION
  ========================================================= */

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    e.target.value = "";
  };

  const removeImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  /* =========================================================
     SIZE MANAGEMENT
  ========================================================= */

  const handleSizeChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedSizes = [...prev.sizes];

      updatedSizes[index] = {
        ...updatedSizes[index],
        [field]: value,
      };

      return {
        ...prev,
        sizes: updatedSizes,
      };
    });
  };

  const addSize = () => {
    setFormData((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { name: "", stock: "" }],
    }));
  };

  const removeSize = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, index) => index !== indexToRemove),
    }));
  };

  /* =========================================================
     RESET FORM
  ========================================================= */

  const resetForm = () => {
    setFormData(getInitialForm());
    setEditingId(null);
  };

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validateForm = () => {
    if (!formData.name.trim()) {
      showMessage("Please enter a product name.", "error");
      return false;
    }

    if (!formData.description.trim()) {
      showMessage("Please enter a product description.", "error");
      return false;
    }

    if (
      formData.price === "" ||
      Number.isNaN(Number(formData.price)) ||
      Number(formData.price) < 0
    ) {
      showMessage("Please enter a valid selling price.", "error");
      return false;
    }

    if (!formData.category) {
      showMessage("Please select a category.", "error");
      return false;
    }

    if (formData.originalPrice !== "") {
      if (
        Number.isNaN(Number(formData.originalPrice)) ||
        Number(formData.originalPrice) < 0
      ) {
        showMessage("Please enter a valid original price.", "error");
        return false;
      }
    }

    if (formData.images.length === 0) {
      showMessage("Please select at least one product image.", "error");
      return false;
    }

    return true;
  };

  /* =========================================================
     PREPARE PRODUCT DATA
  ========================================================= */

  const prepareProductData = (uploadedImages = []) => {
    const data = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      category: formData.category,
      collectionName: formData.collection.trim(),
      images: uploadedImages,

      sizes: formData.sizes
        .filter((size) => size.name && size.name.trim() !== "")
        .map((size) => ({
          name: size.name.trim(),
          stock: size.stock === "" ? 0 : Number(size.stock),
        })),

      isBestSeller: Boolean(formData.bestseller),
      isFeatured: Boolean(formData.featured),
      isActive: Boolean(formData.isActive),
    };

    if (formData.originalPrice !== "") {
      data.originalPrice = Number(formData.originalPrice);
    }

    return data;
  };

  /* =========================================================
     UPLOAD IMAGES
  ========================================================= */

  const uploadProductImages = async (files) => {
    const uploadedImages = [];

    for (let i = 0; i < files.length; i++) {
      showMessage(`Uploading image ${i + 1} of ${files.length}...`, "info");

      const result = await uploadImage(files[i]);

      if (!result?.imageUrl) {
        throw new Error(`Image ${i + 1} upload failed.`);
      }

      uploadedImages.push(result.imageUrl);
    }

    return uploadedImages;
  };

  /* =========================================================
     SUBMIT PRODUCT
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    if (!validateForm()) return;

    try {
      setLoading(true);

      if (!editingId) {
        showMessage("Uploading product images...", "info");

        const uploadedImages = await uploadProductImages(formData.images);
        const productData = prepareProductData(uploadedImages);

        console.log("Creating product:", productData);

        showMessage("Adding product...", "info");

        await createProduct(productData);

        showMessage("Product added successfully!", "success");
      } else {
        const existingImages = formData.images.filter(
          (image) => typeof image === "string"
        );

        const newImages = formData.images.filter(
          (image) => typeof image !== "string"
        );

        let uploadedNewImages = [];

        if (newImages.length > 0) {
          uploadedNewImages = await uploadProductImages(newImages);
        }

        const finalImages = [...existingImages, ...uploadedNewImages];

        if (finalImages.length === 0) {
          throw new Error("Product must have at least one image.");
        }

        const productData = prepareProductData(finalImages);

        console.log("Updating product:", editingId, productData);

        showMessage("Updating product...", "info");

        await updateProduct(editingId, productData);

        showMessage("Product updated successfully!", "success");
      }

      resetForm();
      await loadProducts();
    } catch (error) {
      console.error("Product submit error:", error);

      showMessage(
        error?.message || "Something went wrong. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     EDIT PRODUCT
  ========================================================= */

  const handleEdit = (product) => {
    if (!product?._id) {
      showMessage("Product ID is missing.", "error");
      return;
    }

    setEditingId(product._id);

    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price ?? "",
      originalPrice: product.originalPrice ?? "",
      category: product.category || "",
      collection: product.collection ?? product.collectionName ?? "",
      images: Array.isArray(product.images) ? product.images : [],

      sizes:
        Array.isArray(product.sizes) && product.sizes.length > 0
          ? product.sizes.map((size) => ({
              name: size.name || "",
              stock: size.stock ?? "",
            }))
          : [{ name: "", stock: "" }],

      bestseller: product.bestseller ?? product.isBestSeller ?? false,
      featured: product.featured ?? product.isFeatured ?? false,
      isActive: product.isActive ?? true,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    showMessage("Editing product.", "info");
  };

  /* =========================================================
     DELETE PRODUCT
  ========================================================= */

  const handleDelete = async (id) => {
    if (!id) {
      showMessage("Product ID is missing.", "error");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      showMessage("Deleting product...", "info");

      console.log("Deleting product:", id);

      await deleteProduct(id);

      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => String(product._id) !== String(id)
        )
      );

      if (String(editingId) === String(id)) {
        resetForm();
      }

      showMessage("Product deleted successfully.", "success");
    } catch (error) {
      console.error("Delete product error:", error);

      showMessage(
        error?.message || "Failed to delete product.",
        "error"
      );

      await loadProducts();
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     IMAGE URL
  ========================================================= */

  const getImageUrl = (image) => {
    if (!image) return "";

    if (typeof image === "string") {
      if (image.startsWith("http")) return image;
      if (image.startsWith("/")) return `${API_BASE_URL}${image}`;

      return `${API_BASE_URL}/${image}`;
    }

    if (typeof File !== "undefined" && image instanceof File) {
      return URL.createObjectURL(image);
    }

    return "";
  };

  /* =========================================================
     SHARED STYLES
  ========================================================= */

  const inputClass =
    "w-full rounded-xl border border-[#D4E2D0] bg-[#FAFCF8] px-4 py-3.5 text-sm text-[#173D2B] outline-none transition placeholder:text-[#9AAA9A] focus:border-[#286844] focus:bg-white focus:ring-4 focus:ring-[#286844]/10 disabled:cursor-not-allowed disabled:opacity-60";

  const labelClass =
    "mb-2 block text-sm font-semibold text-[#315640]";

  const sectionHeadingClass =
    "font-serif text-2xl text-[#173D2B]";

  const sectionBorderClass =
    "border-t border-[#DCE7D8] pt-8";

  /* =========================================================
     JSX
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#F3F7F0] px-4 mt-20 bg-white py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}

        <div className="mb-8 mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#173D2B] text-white">
                <Package size={21} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#286844]">
                  YAMA FLAYS
                </p>

                <p className="text-xs text-[#718574]">
                  Store Management
                </p>
              </div>
            </div>

            <h1 className="font-serif text-4xl font-medium text-[#173D2B] md:text-5xl">
              Product Admin
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#526B58]">
              Add, edit and manage your bangle products from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={loadProducts}
            disabled={productsLoading || loading}
            className="flex w-fit items-center gap-2 rounded-xl border border-[#D4E2D0] bg-white px-4 py-3 text-sm font-medium text-[#286844] transition hover:bg-[#EEF5E9] disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={productsLoading ? "animate-spin" : ""}
            />
            Refresh Products
          </button>
        </div>

        {/* MESSAGE */}

        {message && (
          <div
            className={`mb-7 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${getMessageStyle()}`}
          >
            {messageType === "success" ? (
              <CheckCircle2 size={18} />
            ) : messageType === "error" ? (
              <AlertCircle size={18} />
            ) : (
              <Sparkles size={18} />
            )}

            <span>{message}</span>
          </div>
        )}

        {/* PRODUCT FORM */}

        <div className="mb-12 overflow-hidden rounded-3xl border border-[#DCE7D8] bg-white shadow-[0_12px_40px_rgba(23,61,43,0.06)]">
          <div className="border-b border-[#E7EEE3] bg-gradient-to-r from-[#F6FAF3] to-white px-6 py-6 md:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E0EBDD] text-[#286844]">
                  {editingId ? <Edit3 size={19} /> : <Plus size={20} />}
                </div>

                <div>
                  <h2 className="font-serif text-2xl text-[#173D2B]">
                    {editingId ? "Edit Product" : "Add New Product"}
                  </h2>

                  <p className="text-xs text-[#718574]">
                    {editingId
                      ? "Update your product information."
                      : "Create a new product for your store."}
                  </p>
                </div>
              </div>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#286844] transition hover:bg-[#EEF5E9] disabled:opacity-50"
                >
                  <X size={16} />
                  Cancel Edit
                </button>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 p-6 md:p-8">
            {/* BASIC INFORMATION */}

            <section>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-[#C9A227]" />

                <h3 className={sectionHeadingClass}>
                  Basic Information
                </h3>
              </div>

              <div className="grid gap-5">
                <div>
                  <label className={labelClass}>Product Name</label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Example: Royal Bridal Bangles"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Description</label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    disabled={loading}
                    rows={5}
                    placeholder="Describe the bangle design..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
            </section>

            {/* PRICING */}

            <section className={sectionBorderClass}>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-[#C9A227]" />

                <h3 className={sectionHeadingClass}>Pricing</h3>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Selling Price</label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-[#286844]">
                      ₹
                    </span>

                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      disabled={loading}
                      min="0"
                      placeholder="2499"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Original Price</label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-[#718574]">
                      ₹
                    </span>

                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      disabled={loading}
                      min="0"
                      placeholder="2999"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* CATEGORY AND COLLECTION */}

            <section className={sectionBorderClass}>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-[#C9A227]" />

                <h3 className={sectionHeadingClass}>
                  Category &amp; Collection
                </h3>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Category</label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    disabled={loading}
                    className={inputClass}
                  >
                    <option value="">Select Category</option>
                    <option value="Bridal">Bridal</option>
                    <option value="Designer">Designer</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Daily Wear">Daily Wear</option>
                    <option value="Stone">Stone</option>
                    <option value="Pearl">Pearl</option>
                    <option value="Festive">Festive</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Collection</label>

                  <input
                    type="text"
                    name="collection"
                    value={formData.collection}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Wedding Collection"
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* PRODUCT IMAGES */}

            <section className={sectionBorderClass}>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 rounded-full bg-[#C9A227]" />

                  <div>
                    <h3 className={sectionHeadingClass}>
                      Product Images
                    </h3>

                    <p className="mt-1 text-xs text-[#718574]">
                      Upload JPG, PNG or WEBP images.
                    </p>
                  </div>
                </div>

                {formData.images.length > 0 && (
                  <span className="rounded-full bg-[#E0EBDD] px-3 py-1 text-xs font-semibold text-[#286844]">
                    {formData.images.length} image
                    {formData.images.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D4E2D0] bg-[#F6FAF3] px-6 py-10 text-center transition hover:border-[#286844] hover:bg-[#EEF5E9]">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E0EBDD] text-[#286844] transition group-hover:bg-[#D4E2D0]">
                  <Upload size={24} />
                </div>

                <p className="text-sm font-semibold text-[#173D2B]">
                  Choose Product Images
                </p>

                <p className="mt-1 text-xs text-[#718574]">
                  Select one or multiple images
                </p>

                <span className="mt-4 rounded-lg bg-[#1D5136] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#173D2B]">
                  Browse Images
                </span>

                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  multiple
                  onChange={handleImageChange}
                  disabled={loading}
                  className="hidden"
                />
              </label>

              {formData.images.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {formData.images.map((image, index) => (
                    <div
                      key={`${typeof image === "string" ? image : image.name}-${index}`}
                      className="group overflow-hidden rounded-2xl border border-[#DCE7D8] bg-white"
                    >
                      <div className="relative aspect-square bg-[#F3F7F0]">
                        <img
                          src={getImageUrl(image)}
                          alt={`Product ${index + 1}`}
                          className="h-full w-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          disabled={loading}
                          aria-label={`Remove image ${index + 1}`}
                          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#173D2B]/85 text-white opacity-100 transition hover:bg-red-600 sm:opacity-0 sm:group-hover:opacity-100"
                        >
                          <X size={15} />
                        </button>

                        {index === 0 && (
                          <span className="absolute bottom-2 left-2 rounded-md bg-[#C9A227] px-2 py-1 text-[10px] font-bold uppercase text-white">
                            Main
                          </span>
                        )}
                      </div>

                      <div className="px-3 py-2.5">
                        <p className="truncate text-[11px] text-[#526B58]">
                          {typeof image === "string"
                            ? image.split("/").pop()
                            : image.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* SIZES AND STOCK */}

            <section className={sectionBorderClass}>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 rounded-full bg-[#C9A227]" />

                  <div>
                    <h3 className={sectionHeadingClass}>
                      Sizes &amp; Stock
                    </h3>

                    <p className="mt-1 text-xs text-[#718574]">
                      Manage available bangle sizes.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addSize}
                  disabled={loading}
                  className="flex items-center gap-2 rounded-xl bg-[#286844] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1D5136] disabled:opacity-50"
                >
                  <Plus size={15} />
                  Add Size
                </button>
              </div>

              <div className="space-y-3">
                {formData.sizes.map((size, index) => (
                  <div
                    key={index}
                    className="grid gap-3 rounded-2xl border border-[#DCE7D8] bg-[#FAFCF8] p-4 md:grid-cols-[1fr_1fr_auto]"
                  >
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase text-[#718574]">
                        Size
                      </label>

                      <input
                        type="text"
                        value={size.name}
                        onChange={(e) =>
                          handleSizeChange(index, "name", e.target.value)
                        }
                        disabled={loading}
                        placeholder="2.4"
                        className={`${inputClass} bg-white`}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase text-[#718574]">
                        Stock
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={size.stock}
                        onChange={(e) =>
                          handleSizeChange(index, "stock", e.target.value)
                        }
                        disabled={loading}
                        placeholder="10"
                        className={`${inputClass} bg-white`}
                      />
                    </div>

                    {formData.sizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSize(index)}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm text-red-600 transition hover:bg-red-50 md:self-end"
                      >
                        <Trash2 size={15} />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* PRODUCT OPTIONS */}

            <section className={sectionBorderClass}>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-[#C9A227]" />

                <h3 className={sectionHeadingClass}>Product Options</h3>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#DCE7D8] bg-[#FAFCF8] p-4 transition hover:border-[#C9A227]">
                  <input
                    type="checkbox"
                    name="bestseller"
                    checked={formData.bestseller}
                    onChange={handleChange}
                    disabled={loading}
                    className="h-4 w-4 accent-[#286844]"
                  />

                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#173D2B]">
                      <Star size={15} className="text-[#C9A227]" />
                      Bestseller
                    </div>

                    <p className="mt-1 text-[11px] text-[#718574]">
                      Show as bestseller
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#DCE7D8] bg-[#FAFCF8] p-4 transition hover:border-[#286844]">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    disabled={loading}
                    className="h-4 w-4 accent-[#286844]"
                  />

                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#173D2B]">
                      <Sparkles size={15} className="text-[#286844]" />
                      Featured
                    </div>

                    <p className="mt-1 text-[11px] text-[#718574]">
                      Highlight product
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#DCE7D8] bg-[#FAFCF8] p-4 transition hover:border-emerald-400">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    disabled={loading}
                    className="h-4 w-4 accent-emerald-600"
                  />

                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#173D2B]">
                      <CheckCircle2
                        size={15}
                        className="text-emerald-600"
                      />
                      Active
                    </div>

                    <p className="mt-1 text-[11px] text-[#718574]">
                      Visible in store
                    </p>
                  </div>
                </label>
              </div>
            </section>

            {/* SUBMIT */}

            <div className="flex flex-col gap-3 border-t border-[#DCE7D8] pt-7 sm:flex-row">
              <button
                type="submit"
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#173D2B] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#1D5136] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <RefreshCw size={17} className="animate-spin" />
                    {editingId ? "Updating Product..." : "Adding Product..."}
                  </>
                ) : (
                  <>
                    {editingId ? <Save size={17} /> : <Plus size={17} />}
                    {editingId ? "Save Product Changes" : "Add Product"}
                  </>
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                  className="rounded-xl border border-[#D4E2D0] bg-white px-6 py-4 text-sm font-semibold text-[#286844] transition hover:bg-[#EEF5E9]"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* PRODUCT INVENTORY */}

        <section>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <Boxes size={20} className="text-[#286844]" />

                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#286844]">
                  Inventory
                </p>
              </div>

              <h2 className="font-serif text-3xl text-[#173D2B]">
                Your Products
              </h2>

              <p className="mt-1 text-sm text-[#526B58]">
                Manage products currently stored in your database.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-[#D4E2D0] bg-white px-4 py-2 text-sm text-[#286844]">
              <Package size={15} />
              {products.length} Product{products.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* LOADING */}

          {productsLoading ? (
            <div className="flex min-h-[250px] items-center justify-center rounded-3xl border border-[#DCE7D8] bg-white">
              <div className="flex flex-col items-center gap-3 text-[#286844]">
                <RefreshCw size={24} className="animate-spin" />
                <p className="text-sm">Loading products...</p>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#D4E2D0] bg-white px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F1E3] text-[#286844]">
                <ImageIcon size={26} />
              </div>

              <h3 className="font-serif text-2xl text-[#173D2B]">
                No products yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-[#526B58]">
                Add your first bangle product using the form above.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="group overflow-hidden rounded-3xl border border-[#DCE7D8] bg-white shadow-[0_8px_30px_rgba(23,61,43,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(23,61,43,0.10)]"
                >
                  {/* PRODUCT IMAGE */}

                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F3F7F0]">
                    {product.images?.[0] ? (
                      <img
                        src={getImageUrl(product.images[0])}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#819481]">
                        <ImageIcon size={32} />
                      </div>
                    )}

                    <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                      {(product.bestseller ?? product.isBestSeller) && (
                        <span className="flex items-center gap-1 rounded-full bg-[#C9A227] px-2.5 py-1 text-[10px] font-bold uppercase text-white">
                          <Star size={11} />
                          Bestseller
                        </span>
                      )}

                      {product.isActive === false && (
                        <span className="rounded-full bg-black/75 px-2.5 py-1 text-[10px] font-bold uppercase text-white">
                          Inactive
                        </span>
                      )}
                    </div>

                    {product.images?.length > 1 && (
                      <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-[#173D2B]/80 px-2.5 py-1 text-[10px] text-white">
                        <ImageIcon size={11} />
                        {product.images.length}
                      </span>
                    )}
                  </div>

                  {/* PRODUCT CONTENT */}

                  <div className="p-5">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#286844]">
                          {product.category}
                        </p>

                        <h3 className="font-serif text-xl text-[#173D2B]">
                          {product.name}
                        </h3>
                      </div>

                      {(product.featured ?? product.isFeatured) && (
                        <div className="rounded-lg bg-[#E8F1E3] p-2 text-[#286844]">
                          <Sparkles size={15} />
                        </div>
                      )}
                    </div>

                    <p className="mb-4 line-clamp-2 text-xs leading-5 text-[#526B58]">
                      {product.description}
                    </p>

                    <div className="mb-4 flex items-end gap-2">
                      <span className="text-xl font-bold text-[#173D2B]">
                        ₹{product.price}
                      </span>

                      {product.originalPrice > product.price && (
                        <span className="text-xs text-[#9AAA9A] line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>

                    {product.sizes?.length > 0 && (
                      <div className="mb-5">
                        <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase text-[#718574]">
                          <Layers3 size={12} />
                          Sizes
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {product.sizes.map((size, index) => (
                            <span
                              key={index}
                              className={`rounded-md px-2 py-1 text-[10px] ${
                                Number(size.stock) > 0
                                  ? "bg-[#E8F1E3] text-[#286844]"
                                  : "bg-gray-100 text-gray-400 line-through"
                              }`}
                            >
                              {size.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ACTIONS */}

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(product)}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 rounded-xl border border-[#D4E2D0] bg-white px-3 py-2.5 text-xs font-semibold text-[#286844] transition hover:bg-[#EEF5E9] disabled:opacity-50"
                      >
                        <Edit3 size={14} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(product._id)}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-3 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FOOTER */}

        <div className="mt-10 flex items-center justify-center gap-2 text-center text-xs text-[#819481]">
          <span className="h-px w-8 bg-[#D4E2D0]" />
          YAMA FLYS Product Management
          <span className="h-px w-8 bg-[#D4E2D0]" />
        </div>
      </div>
    </div>
  );
};

export default ProductAdmin;

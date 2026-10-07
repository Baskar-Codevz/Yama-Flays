const API_URL = "https://yama-flays-backend.onrender.com/api/products";
const UPLOAD_URL = "https://yama-flays-backend.onrender.com/api/upload";

/* =========================================================
   GET TOKEN
========================================================= */

const getAuthToken = () => {
  return (
    localStorage.getItem("token") ||
    sessionStorage.getItem("token")
  );
};

/* =========================================================
   GET ALL PRODUCTS
========================================================= */

export const getProducts = async () => {
  try {
    const response = await fetch(API_URL);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch products");
    }

    return data;
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    throw error;
  }
};

/* =========================================================
   GET PRODUCT BY ID
========================================================= */

export const getProductById = async (id) => {
  try {
    if (!id) {
      throw new Error("Product ID is missing");
    }

    const response = await fetch(`${API_URL}/${id}`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Product not found");
    }

    return data;
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);
    throw error;
  }
};

/* =========================================================
   UPLOAD IMAGE
========================================================= */

export const uploadImage = async (imageFile) => {
  try {
    if (!imageFile) {
      throw new Error("Image file is missing");
    }

    const formData = new FormData();

    formData.append("image", imageFile);

    const token = getAuthToken();

    const response = await fetch(UPLOAD_URL, {
      method: "POST",
      headers: {
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Image upload failed");
    }

    return data;
  } catch (error) {
    console.error("UPLOAD IMAGE ERROR:", error);
    throw error;
  }
};

/* =========================================================
   CREATE PRODUCT
========================================================= */

export const createProduct = async (productData) => {
  try {
    const token = getAuthToken();

    if (!token) {
      throw new Error("Authentication token is missing. Please login again.");
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create product");
    }

    return data;
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    throw error;
  }
};

/* =========================================================
   UPDATE PRODUCT
========================================================= */

export const updateProduct = async (id, productData) => {
  try {
    if (!id) {
      throw new Error("Product ID is missing");
    }

    const token = getAuthToken();

    if (!token) {
      throw new Error("Authentication token is missing. Please login again.");
    }

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update product");
    }

    return data;
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    throw error;
  }
};

/* =========================================================
   DELETE PRODUCT
========================================================= */

export const deleteProduct = async (id) => {
  try {
    if (!id) {
      throw new Error("Product ID is missing");
    }

    const token = getAuthToken();

    if (!token) {
      throw new Error("Authentication token is missing. Please login again.");
    }

    console.log("Deleting product:", id);

    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let data = {};

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    }

    console.log("Delete response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete product");
    }

    return data;
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    throw error;
  }
};
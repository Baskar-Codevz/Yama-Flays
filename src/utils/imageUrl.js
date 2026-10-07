const BACKEND_URL = "http://localhost:5000";

const FALLBACK_IMAGE = "/assets/img-1.webp";

export const getImageUrl = (image) => {
  if (!image) {
    return FALLBACK_IMAGE;
  }

  const value = String(image).trim();

  if (!value) {
    return FALLBACK_IMAGE;
  }

  // Already a backend URL
  if (value.startsWith("http://localhost:5000/")) {
    return value;
  }

  // Any complete HTTP/HTTPS URL
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  // Backend upload path
  if (value.startsWith("/uploads/")) {
    return `${BACKEND_URL}${value}`;
  }

  // uploads/product.webp
  if (value.startsWith("uploads/")) {
    return `${BACKEND_URL}/${value}`;
  }

  // Frontend public assets
  if (value.startsWith("/assets/")) {
    return value;
  }

  // assets/img-15.jpg
  if (value.startsWith("assets/")) {
    return `/${value}`;
  }

  return value;
};

export default getImageUrl;

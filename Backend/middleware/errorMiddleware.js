
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  // Log actual error in Render logs
  console.error("API ERROR:", {
    method: req.method,
    url: req.originalUrl,
    statusCode,
    name: err.name,
    message: err.message,
    cloudinaryCode: err.http_code || null,
    stack: err.stack,
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.status(statusCode).json({
    success: false,
    message:
      isProduction && statusCode >= 500
        ? "Internal Server Error"
        : err.message || "Internal Server Error",
    stack: isProduction ? null : err.stack,
  });
};

export { notFound, errorHandler };

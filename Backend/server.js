import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./uploads/uploadRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";


dotenv.config();

const app = express();

/* =========================================================
   FILE PATH SETUP
========================================================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================================================
   CORS
========================================================= */

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

/* =========================================================
   BODY PARSERS
========================================================= */

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

/* =========================================================
   STATIC UPLOADS
========================================================= */

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =========================================================
   HEALTH CHECK
========================================================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "YAMA FLYS API is running.",
  });
});

// Auth routes ;

app.use("/api/auth", authRoutes);

/* =========================================================
   PRODUCT ROUTES
========================================================= */

app.use("/api/products", productRoutes);

/* =========================================================
   UPLOAD ROUTES
========================================================= */

app.use("/api/upload", uploadRoutes);

/* =========================================================
   404 HANDLER
========================================================= */

app.use(notFound);

/* =========================================================
   ERROR HANDLER
========================================================= */

app.use(errorHandler);

/* =========================================================
   DATABASE + SERVER
========================================================= */

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`YAMA FLYS backend running on http://localhost:${PORT}`);

      console.log(`Products API: http://localhost:${PORT}/api/products`);

      console.log(`Upload API: http://localhost:${PORT}/api/upload`);
    });
  } catch (error) {
    console.error("Server startup failed:");
    console.error(error.message);

    process.exit(1);
  }
};

startServer();

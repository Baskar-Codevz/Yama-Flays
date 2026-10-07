import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

/* =========================================================
   UPLOAD DIRECTORY
========================================================= */

const uploadDir = "uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* =========================================================
   STORAGE
========================================================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9,
    )}${extension}`;

    cb(null, uniqueName);
  },
});

/* =========================================================
   FILE FILTER
========================================================= */

const fileFilter = (req, file, cb) => {
  const allowedExtensions = /\.(jpg|jpeg|png|webp)$/i;

  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const extensionValid = allowedExtensions.test(file.originalname);
  const mimeValid = allowedMimeTypes.includes(file.mimetype);

  if (extensionValid && mimeValid) {
    cb(null, true);
  } else {
    cb(
      new Error("Only JPG, JPEG, PNG and WEBP images are allowed"),
      false,
    );
  }
};

/* =========================================================
   MULTER
========================================================= */

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

/* =========================================================
   POST /api/upload
   ADMIN ONLY
========================================================= */

router.post(
  "/",
  protect,
  adminOnly,
  (req, res, next) => {
    upload.single("image")(req, res, (error) => {
      if (error) {
        return next(error);
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image uploaded",
        });
      }

      const imageUrl = `/uploads/${req.file.filename}`;

      return res.status(201).json({
        success: true,
        message: "Image uploaded successfully",
        imageUrl,
        filename: req.file.filename,
      });
    });
  },
);

export default router;

import express from "express";
import multer from "multer";

import cloudinary from "../config/cloudinary.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Only JPG, JPEG, PNG and WEBP images are allowed"),
      );
    }
  },
});

router.post("/", protect, adminOnly, (req, res, next) => {
  upload.single("image")(req, res, async (error) => {
    try {
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image uploaded",
        });
      }

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "yama-flys/products",
            resource_type: "image",
          },
          (uploadError, uploadedImage) => {
            if (uploadError) {
              reject(uploadError);
            } else {
              resolve(uploadedImage);
            }
          },
        );

        stream.end(req.file.buffer);
      });

      return res.status(201).json({
        success: true,
        message: "Image uploaded successfully",
        imageUrl: result.secure_url,
        publicId: result.public_id,
      });
    } catch (uploadError) {
      return next(uploadError);
    }
  });
});

export default router;

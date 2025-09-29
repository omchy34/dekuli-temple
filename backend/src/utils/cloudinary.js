// config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dshnoipyl",
  api_key: process.env.CLOUDINARY_API_KEY || "563537224358937",
  api_secret: process.env.CLOUDINARY_API_SECRET, // Use environment variable
});

// Cloudinary storage for images
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images",
    resource_type: "image",
    transformation: [
      { quality: "auto" },
      { fetch_format: "auto" }
    ],
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"]
  },
});

// Cloudinary storage for documents (PDFs) - PROPER PDF UPLOAD
const documentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      folder: "documents",
      resource_type: "raw", // Keep as raw for PDFs
      allowed_formats: ["pdf"],
      use_filename: true,
      unique_filename: false,
      // CRITICAL: Add .pdf extension to public_id for proper recognition
      public_id: file.originalname.replace(/\.[^/.]+$/, "") + ".pdf"
    };
  }
});

// Export configured cloudinary instance for direct use if needed
export { cloudinary };

// Export storage configurations
export { imageStorage, documentStorage };
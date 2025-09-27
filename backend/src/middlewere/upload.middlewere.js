// middleware/upload.middleware.js
import multer from "multer";
import { imageStorage, documentStorage } from "../utils/cloudinary.js";

// File filter for images
const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// File filter for PDFs
const pdfFileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

// File filter for both images and PDFs
const mixedFileFilter = (req, file, cb) => {
  if (file.fieldname === 'pdf') {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed for documents!'), false);
    }
  } else if (file.fieldname === 'images') { // Changed from 'image' to 'images'
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  } else {
    cb(new Error('Unexpected field name!'), false);
  }
};

// Multer configuration for image upload
const uploadImage = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: imageFileFilter
});

// Multer configuration for PDF upload
const uploadPDF = multer({
  storage: documentStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: pdfFileFilter
});

// Multer configuration for mixed upload (both PDF and multiple images)
const uploadMixed = multer({
  storage: (req, file, cb) => {
    // Use different storage based on field name
    if (file.fieldname === 'pdf') {
      documentStorage._handleFile(req, file, cb);
    } else if (file.fieldname === 'images') { // Changed from 'image' to 'images'
      imageStorage._handleFile(req, file, cb);
    } else {
      cb(new Error('Unexpected field name!'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
    files: 6 // Maximum 6 files total (1 PDF + 5 images)
  },
  fileFilter: mixedFileFilter
});

// Export middleware functions
export const uploadDoc = uploadPDF.single('pdf'); // Single PDF upload for docs page
export const uploadGallery = uploadImage.array('images', 5); // 5 images upload for gallery page

// Error handling middleware
export const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'File too large. Maximum size is 10MB.'
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        message: 'Unexpected field name or too many files.'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        message: 'Too many files uploaded.'
      });
    }
  }
  
  if (error.message) {
    return res.status(400).json({
      message: error.message
    });
  }
  
  next(error);
};


// routes/upload.routes.js
import express from 'express';
import { 
  createDoc, 
  uploadGalleryImages, 
  getAllDocs, 
  getAllImages,
  deleteDoc,
  deleteImage
} from '../controllers/controller.js';
import { 
  uploadDoc, 
  uploadGallery, 
  handleUploadError 
} from '../middlewere/upload.middlewere.js';

const router = express.Router();

// Page 1: Document upload (1 PDF + description)
router.post('/upload-doc', uploadDoc, handleUploadError, createDoc);

// Page 2: Gallery upload (exactly 5 images)
router.post('/upload-gallery', uploadGallery, handleUploadError, uploadGalleryImages);

// Get routes
router.get('/docs', getAllDocs);
router.get('/images', getAllImages);

// Delete routes
router.delete('/docs/:id', deleteDoc);
router.delete('/images/:id', deleteImage);

export default router;

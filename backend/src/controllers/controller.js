// controllers/docs.controller.js
import { Docs } from "../models/Docs.models.js";
import { Img } from "../models/Img.models.js";

const createDoc = async (req, res) => {
  try {
    const { eventName, eventDate, description } = req.body;

    if (!eventName || !eventDate || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if PDF file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    // File is already uploaded to Cloudinary via multer-storage-cloudinary
    const pdfUrl = req.file.path; // Cloudinary URL

    const newDoc = new Docs({
      eventName,
      eventDate,
      description,
      PDF: pdfUrl
    });

    await newDoc.save();

    res.status(201).json({ 
      message: "Document created successfully", 
      document: newDoc,
      pdfUrl: pdfUrl
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error creating document", 
      error: error.message 
    });
  }
};

// Controller for Gallery Page - Upload 5 images at once
const uploadGalleryImages = async (req, res) => {
  try {
    // Check if exactly 5 image files are uploaded
    if (!req.files || req.files.length !== 5) {
      return res.status(400).json({ 
        message: "Exactly 5 images are required for gallery upload",
        received: req.files ? req.files.length : 0 
      });
    }

    // Handle 5 images
    const imageUrls = [];
    const savedImages = [];

    for (const file of req.files) {
      // File is already uploaded to Cloudinary via multer-storage-cloudinary
      const imageUrl = file.path; // Cloudinary URL

      const newImg = new Img({
        imgUrl: imageUrl
      });

      const savedImg = await newImg.save();
      imageUrls.push(imageUrl);
      savedImages.push(savedImg);
    }

    res.status(201).json({ 
      message: "5 images uploaded to gallery successfully", 
      images: savedImages,
      imageUrls: imageUrls,
      count: 5
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error uploading gallery images", 
      error: error.message 
    });
  }
};

// Remove the uploadBoth function since it's not needed

// Get all documents
const getAllDocs = async (req, res) => {
  try {
    const docs = await Docs.find().sort({ createdAt: -1 });
    res.status(200).json({ docs });
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching documents", 
      error: error.message 
    });
  }
};

// Get all images
const getAllImages = async (req, res) => {
  try {
    const images = await Img.find().sort({ createdAt: -1 });
    res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching images", 
      error: error.message 
    });
  }
};

// Delete document
const deleteDoc = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Docs.findById(id);
    
    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Delete from Cloudinary
    const publicId = doc.PDF.split('/').slice(-2).join('/').split('.')[0];
    await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });

    // Delete from database
    await Docs.findByIdAndDelete(id);

    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ 
      message: "Error deleting document", 
      error: error.message 
    });
  }
};

// Delete image
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Img.findById(id);
    
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete from Cloudinary
    const publicId = image.imgUrl.split('/').slice(-2).join('/').split('.')[0];
    await cloudinary.uploader.destroy(publicId);

    // Delete from database
    await Img.findByIdAndDelete(id);

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ 
      message: "Error deleting image", 
      error: error.message 
    });
  }
};

export { 
  createDoc, 
  uploadGalleryImages, 
  getAllDocs, 
  getAllImages,
  deleteDoc,
  deleteImage 
};

// src/components/UploadImages.jsx
import React, { useState, useEffect } from 'react';
import { Upload, Image, Eye, Trash2, Loader } from 'lucide-react';
import api from '../utils/AxiosInstance';

export function UploadImages() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all images
  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await api.get('/images');
      setImages(response.data.images || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      alert('Failed to fetch images');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length !== 5) {
      alert('Please select exactly 5 images for the gallery');
      e.target.value = '';
      setSelectedFiles([]);
      return;
    }

    // Validate all files are images
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    if (validFiles.length !== 5) {
      alert('All files must be images');
      e.target.value = '';
      setSelectedFiles([]);
      return;
    }

    setSelectedFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedFiles.length !== 5) {
      alert('Please select exactly 5 images');
      return;
    }

    setUploading(true);
    
    const uploadData = new FormData();
    selectedFiles.forEach(file => {
      uploadData.append('images', file);
    });

    try {
      const response = await api.post('/upload-gallery', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      alert('Gallery images uploaded successfully!');
      setSelectedFiles([]);
      document.getElementById('imageFiles').value = '';
      fetchImages();
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await api.delete(`/images/${id}`);
        alert('Image deleted successfully');
        fetchImages();
      } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete image');
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Form */}
      <div className="p-6 bg-gray-800 rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <Image className="w-6 h-6" />
          Upload Gallery Images
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select exactly 5 images for gallery
            </label>
            <input
              id="imageFiles"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              disabled={uploading}
            />
            <p className="text-sm text-gray-400 mt-2">
              Select exactly 5 images to create a gallery set
            </p>
          </div>
          
          {selectedFiles.length > 0 && (
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-green-400 mb-2">
                Selected {selectedFiles.length} files:
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <button
            onClick={handleSubmit}
            disabled={uploading || selectedFiles.length !== 5}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Uploading Images...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload Gallery (5 Images)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Images Gallery */}
      <div className="p-6 bg-gray-800 rounded-xl">
        <h3 className="text-xl font-bold mb-4 text-white">Gallery Images</h3>
        
        {loading ? (
          <div className="text-center py-8">
            <Loader className="w-8 h-8 animate-spin text-blue-500 mx-auto" />
            <p className="text-gray-400 mt-2">Loading images...</p>
          </div>
        ) : images.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No images uploaded yet</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {images.map((image) => (
              <div key={image._id} className="relative">
                <img
                  src={image.imgUrl}
                  alt="Gallery"
                  className="w-full h-32 object-cover rounded-lg border border-gray-600"
                />
                {/* Buttons visible on mobile, hover effect on desktop */}
                <div className="absolute top-2 right-2 flex gap-2 md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-200">
                  <a
                    href={image.imgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 shadow-lg"
                    title="View full size"
                  >
                    <Eye className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => deleteImage(image._id)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 shadow-lg"
                    title="Delete image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  {new Date(image.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadImages;

import React, { useState, useEffect } from "react";
import { Calendar, FileText, Loader, Eye, Download } from "lucide-react";
import api from '../utils/AxiosInstance';

// Darshan Component
const Darshan = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch images from API
  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await api.get('/images');
      setImages(response.data.images || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">
            आज का दर्शन 🙏
          </h1>
          <p className="text-gray-400 mt-2">
            Daily Darshan Images of Lord Shiva Temple
          </p>
        </div>
        <div className="text-center py-20">
          <Loader className="w-12 h-12 animate-spin text-yellow-400 mx-auto" />
          <p className="text-gray-400 mt-4">Loading darshan images...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-12 px-6">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">
          आज का दर्शन 🙏
        </h1>
        <p className="text-gray-400 mt-2">
          Daily Darshan Images of Lord Shiva Temple
        </p>
      </div>

      {/* No Images Message */}
      {images.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-6">📷</div>
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">
            No darshan images available
          </h2>
          <p className="text-gray-500">
            Images will appear here once they are uploaded by the admin.
          </p>
        </div>
      ) : (
        /* Image Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, idx) => (
            <div
              key={image._id}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={image.imgUrl}
                alt={`Darshan ${idx + 1}`}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-500">
                <div className="flex gap-3">
                  <a
                    href={image.imgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-400 transition flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Full
                  </a>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-yellow-300 px-3 py-1 rounded-full text-sm">
                {new Date(image.createdAt).toLocaleDateString('en-IN')}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Darshan
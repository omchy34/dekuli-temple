// Event Component
import React,{useEffect,useState} from "react";
import {Calendar,Loader,Eye,Download} from "lucide-react"
import api from "../utils/AxiosInstance.js"

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch documents from API
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await api.get('/docs');
      setEvents(response.data.docs || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-xl font-bold text-yellow-400">
            Events & Documentation 📜
          </h1>
          <p className="text-gray-400 mt-2">
            Records of all events, expenses, and documents
          </p>
        </div>
        <div className="text-center py-20">
          <Loader className="w-12 h-12 animate-spin text-yellow-400 mx-auto" />
          <p className="text-gray-400 mt-4">Loading events...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-12 px-6">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">
          Events & Documentation 📜
        </h1>
        <p className="text-gray-400 mt-2">
          Records of all events, expenses, and documents
        </p>
      </div>

      {/* No Events Message */}
      {events.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-6">📋</div>
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">
            No events documented yet
          </h2>
          <p className="text-gray-500">
            Event documents and reports will appear here once they are uploaded by the admin.
          </p>
        </div>
      ) : (
        /* Events List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border border-gray-700 hover:border-yellow-500"
            >
              <h2 className="text-2xl font-semibold text-yellow-300 mb-3 capitalize">
                {event.eventName}
              </h2>

              <div className="flex items-center text-gray-400 text-sm mb-3">
                <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                {formatDate(event.eventDate)}
              </div>

              <p className="text-gray-300 text-sm mb-4 capitalize">
                {event.description}
              </p>

              <div className="flex gap-2">
                <a
                  href={event.PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-yellow-500 text-black px-3 py-2 rounded-full hover:bg-yellow-400 transition text-sm font-medium"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Document
                </a>
                <a
                  href={event.PDF}
                  download
                  className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700 transition text-sm font-medium"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </a>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-xs text-gray-500">
                  Created: {new Date(event.createdAt).toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Event
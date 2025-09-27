// src/components/UploadDocs.jsx
import React, { useState, useEffect } from 'react';
import { Upload, File, Calendar, Trash2, Eye, Download, Loader } from 'lucide-react';
import api from '../utils/AxiosInstance';

export function UploadDocs() {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    description: ''
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all documents
  const fetchDocs = async () => {
    setLoading(true);
    try {
      const response = await api.get('/docs');
      setDocs(response.data.docs || []);
    } catch (error) {
      console.error('Error fetching docs:', error);
      alert('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setPdfFile(file);
      } else {
        alert('Please select a PDF file only');
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.eventName || !formData.eventDate || !formData.description || !pdfFile) {
      alert('Please fill all fields and select a PDF file');
      return;
    }

    setUploading(true);
    
    const uploadData = new FormData();
    uploadData.append('eventName', formData.eventName);
    uploadData.append('eventDate', formData.eventDate);
    uploadData.append('description', formData.description);
    uploadData.append('pdf', pdfFile);

    try {
      const response = await api.post('/upload-doc', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      alert('Document uploaded successfully!');
      setFormData({ eventName: '', eventDate: '', description: '' });
      setPdfFile(null);
      document.getElementById('pdfFile').value = '';
      fetchDocs();
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const deleteDoc = async (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await api.delete(`/docs/${id}`);
        alert('Document deleted successfully');
        fetchDocs();
      } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete document');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Upload Form */}
      <div className="p-6 bg-gray-800 rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <File className="w-6 h-6" />
          Upload Document
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Event Name
              </label>
              <input
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                placeholder="Enter event name"
                disabled={uploading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Event Date
              </label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                disabled={uploading}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
              placeholder="Enter event description"
              disabled={uploading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              PDF Document
            </label>
            <input
              id="pdfFile"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              disabled={uploading}
            />
            {pdfFile && (
              <p className="text-sm text-green-400 mt-2">
                Selected: {pdfFile.name}
              </p>
            )}
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload Document
              </>
            )}
          </button>
        </div>
      </div>

      {/* Documents List */}
      <div className="p-6 bg-gray-800 rounded-xl">
        <h3 className="text-xl font-bold mb-4 text-white">Uploaded Documents</h3>
        
        {loading ? (
          <div className="text-center py-8">
            <Loader className="w-8 h-8 animate-spin text-blue-500 mx-auto" />
            <p className="text-gray-400 mt-2">Loading documents...</p>
          </div>
        ) : docs.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No documents uploaded yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {docs.map((doc) => (
              <div key={doc._id} className="bg-gray-700 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <File className="w-5 h-5 text-red-400" />
                    <h4 className="font-semibold text-white capitalize truncate">
                      {doc.eventName}
                    </h4>
                  </div>
                  <button
                    onClick={() => deleteDoc(doc._id)}
                    className="text-red-400 hover:text-red-300 p-1"
                    title="Delete document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(doc.eventDate)}</span>
                  </div>
                  
                  <p className="text-sm text-gray-400 line-clamp-3 capitalize">
                    {doc.description}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <a
                    href={doc.PDF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </a>
                  <a
                    href={doc.PDF}
                    download
                    className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-green-700 flex items-center justify-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </div>
                
                <p className="text-xs text-gray-500 mt-2">
                  Created: {new Date(doc.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
// src/components/Layout.jsx
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaImage, FaFileAlt } from "react-icons/fa";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div
        className={`fixed md:static z-20 h-full w-64 bg-gray-800 p-5 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-4">
          <Link
            to="upload-images"
            className="flex items-center gap-2 hover:text-blue-400"
          >
            <FaImage /> Upload Images
          </Link>
          <Link
            to="upload-documents"
            className="flex items-center gap-2 hover:text-blue-400"
          >
            <FaFileAlt /> Upload Documents
          </Link>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-gray-800 p-4 flex items-center justify-between">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>

        <main className="flex-1 p-6 bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

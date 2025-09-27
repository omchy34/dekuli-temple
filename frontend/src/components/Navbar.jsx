import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaOm, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items with their routes
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Darshan', path: '/darshan' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' }
  ];

  // Check if current path matches the nav item
  const isActiveRoute = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path;
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-gradient-to-r from-slate-900/95 via-red-900/90 to-slate-900/95 backdrop-blur-md shadow-2xl border-b border-red-400/30' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section with Temple Theme */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
            <div className="relative">
              <FaOm className="text-2xl text-red-400 animate-pulse" />
              <div className="absolute -inset-1 bg-red-400/20 rounded-full blur-sm"></div>
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Baba Bardhbaneshwar Nath
              </div>
              <div className="text-xs text-red-300/80 -mt-1 hidden sm:block">
                🕉 Sacred Temple 🕉
              </div>
            </div>
          </Link>

          {/* Desktop Menu with smaller fonts */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 relative group px-2 py-1 ${
                  isActiveRoute(item.path) 
                    ? 'text-red-400' 
                    : 'text-slate-200 hover:text-red-400'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-red-400 to-orange-400 transition-all duration-300 ${
                  isActiveRoute(item.path) 
                    ? 'w-full' 
                    : 'w-0 group-hover:w-full'
                }`}></span>
                {/* Sacred dot decoration */}
                <span className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-400/60 rounded-full transition-all duration-300 ${
                  isActiveRoute(item.path) 
                    ? 'opacity-100' 
                    : 'opacity-0 group-hover:opacity-100'
                }`}></span>
              </Link>
            ))}
            
            
           
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu} 
              className="p-2 rounded-lg bg-red-400/10 border border-red-400/20 backdrop-blur-sm hover:bg-red-400/20 transition-all duration-300"
            >
              {isOpen ? 
                <FaTimes size={20} className="text-red-400" /> : 
                <FaBars size={20} className="text-red-400" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Temple Theme */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-slate-900/98 via-red-900/95 to-slate-900/98 backdrop-blur-md border-t border-red-400/30">
          {/* Sacred decoration */}
          <div className="flex justify-center py-2 border-b border-red-400/20">
            <div className="flex items-center space-x-2">
              <span className="text-red-400/60 text-xs">🕉</span>
              <span className="text-red-400/60 text-xs">॥ ॐ नमः शिवाय ॥</span>
              <span className="text-red-400/60 text-xs">🕉</span>
            </div>
          </div>
          
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item, index) => (
              <Link 
                key={item.name} 
                to={item.path}
                className={`flex items-center py-2 px-4 text-sm rounded-lg transition-all duration-300 transform hover:translate-x-2 border border-transparent hover:border-red-400/20 ${
                  isActiveRoute(item.path)
                    ? 'text-red-400 bg-red-900/30 border-red-400/20'
                    : 'text-slate-200 hover:text-red-400 hover:bg-red-900/30'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className={`w-1 h-1 bg-red-400/60 rounded-full mr-3 transition-opacity duration-300 ${
                  isActiveRoute(item.path) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}></span>
                {item.name}
              </Link>
            ))}
            
          
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
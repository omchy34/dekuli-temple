import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import Hero from "./Pages/Hero.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Footer from "./Pages/Footer.jsx";
import Events from "./Pages/Event.jsx"; // You'll need to create this component
import Darshan from "./Pages/Darshan.jsx"; // You'll need to create this component
import Preloader from "./components/Preloader.jsx"; // You'll need to create this Component
import { useState, useEffect } from 'react';


function App() {
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    // Wait for all resources to load
    const handleLoad = () => {
      // Add small delay to ensure smooth transition
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      // Wait for page to load completely
      window.addEventListener('load', handleLoad);
    }

    // Cleanup
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  // Show preloader while loading
  if (loading) {
    return <Preloader />;
  }


  return (
    <Router>
      <div className="">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Contact />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/darshan" element={<Darshan />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
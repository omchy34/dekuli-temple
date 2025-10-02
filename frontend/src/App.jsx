import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import Hero from "./Pages/Hero.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Footer from "./Pages/Footer.jsx";
import Events from "./Pages/Event.jsx";
import Darshan from "./Pages/Darshan.jsx";
import Preloader from "./components/Preloader.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";

// Main App Logic Component
function AppContent() {
  const [loading, setLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);
  const location = useLocation();

  // Initial page load
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    if (document.readyState === 'complete') handleLoad();
    else window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  // Route change loading
  useEffect(() => {
    if (!loading) {
      setRouteLoading(true);
      const timer = setTimeout(() => {
        setRouteLoading(false);
      }, 500); // Route change ke liye thoda kam time
      return () => clearTimeout(timer);
    }
  }, [location.pathname, loading]);

  if (loading || routeLoading) return <Preloader />;

  return (
    <>
      <ScrollToTop>
        <Navbar />

        <Routes>
          {/* Home Page */}
          <Route path="/" element={
            <>
              <Helmet>
                <title>Home | Dekuli Mandir</title>
                <meta name="description" content="देकुली मंदिर - Baba Bardhbaneshwar Nath महादेव का प्राचीन स्वयंभू शिवलिंग मंदिर। 24 घंटे दर्शन, सावन सोमवारी विशेष पूजा- Ancient Swayambhu Shivling Temple." />
                <meta name="keywords" content="dekuli mandir , Baba Bardhbaneshwar Nath, dekuli , dekuli mandir, swayambhu shivling, महाभारत कालीन मंदिर, dekuli darbhanga, lord shiva temple bihar, सावन सोमवारी, ancient shiv mandir bihar" />
                <meta name="author" content="Dekuli Mandir" />
                <link rel="canonical" href="https://dekulimandir.com/" />
              </Helmet>
              <Hero />
              <About />
              <Contact />
            </>
          } />

          {/* About Page */}
          <Route path="/about" element={
            <>
              <Helmet>
                <title>About | Dekuli Mandir</title>
                <meta name="description" content="Learn about Baba Bardhbaneshwar Nath Mandir, history, significance, and temple details." />
                <meta name="keywords" content="About Dekuli Mandir, History, Lord Shiva, Temple" />
                <meta name="author" content="Dekuli Mandir" />
                <link rel="canonical" href="https://dekulimandir.com/about" />
              </Helmet>
              <About />
            </>
          } />

          {/* Darshan Page */}
          <Route path="/darshan" element={
            <>
              <Helmet>
                <title>Darshan | Dekuli Mandir</title>
                <meta name="description" content="View daily darshan images of Baba Bardhbaneshwar Nath Mandir. Experience spiritual blessings from Lord Shiva." />
                <meta name="keywords" content="Dekuli Mandir Darshan, Lord Shiva, Temple Images, Spiritual" />
                <meta name="author" content="Dekuli Mandir" />
                <link rel="canonical" href="https://dekulimandir.com/darshan" />
              </Helmet>
              <Darshan />
            </>
          } />

          {/* Events Page */}
          <Route path="/events" element={
            <>
              <Helmet>
                <title>Events | Dekuli Mandir</title>
                <meta name="description" content="Check out events, festivals, and documentation of Baba Bardhbaneshwar Nath Mandir." />
                <meta name="keywords" content="Dekuli Mandir Events, Lord Shiva Festivals, Temple Events, Documentation" />
                <meta name="author" content="Dekuli Mandir" />
                <link rel="canonical" href="https://dekulimandir.com/events" />
              </Helmet>
              <Events />
            </>
          } />

          {/* Contact Page */}
          <Route path="/contact" element={
            <>
              <Helmet>
                <title>Contact | Dekuli Mandir</title>
                <meta name="description" content="Visit Baba Bardhbaneshwar Nath Mandir in Dekuli, Darbhanga. Get temple address, phone numbers, and email for inquiries and darshan bookings." />
                <meta name="keywords" content="Dekuli Mandir Contact, Temple Address, Phone, Email, Lord Shiva Mandir" />
                <meta name="author" content="Dekuli Mandir" />
                <link rel="canonical" href="https://dekulimandir.com/contact" />
              </Helmet>
              <Contact />
            </>
          } />
        </Routes>

        <Footer />
      </ScrollToTop>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
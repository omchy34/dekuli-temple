import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import Hero from "./Pages/Hero.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Footer from "./Pages/Footer.jsx";
import Events from "./Pages/Event.jsx"; // You'll need to create this component
import Darshan from "./Pages/Darshan.jsx"; // You'll need to create this component

function App() {
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
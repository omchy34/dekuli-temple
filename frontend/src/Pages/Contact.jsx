import { FaEnvelope , FaPhone , FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <section className="py-20 bg-gradient-to-t from-slate-900 to-purple-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-4 sm:mb-6">
            Visit Our Temple
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center p-4 sm:p-8 bg-slate-800/50 rounded-xl sm:rounded-2xl border border-orange-400/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
            <FaMapMarkerAlt className="text-3xl sm:text-4xl text-orange-400 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-slate-200 mb-2 sm:mb-3">Address</h3>
            <p className="text-sm sm:text-base text-slate-300">
             Baba Vardhmaneshwar Nath Mahadev Temple, Dekuli, darbhanga
            </p>
          </div>
          
          <div className="text-center p-4 sm:p-8 bg-slate-800/50 rounded-xl sm:rounded-2xl border border-orange-400/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
            <FaPhone className="text-3xl sm:text-4xl text-orange-400 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-slate-200 mb-2 sm:mb-3">Phone</h3>
            <p className="text-sm sm:text-base text-slate-300">
              +91 94731 91319<br />+91 91353 45122 <br/> +91 99399 81457
            </p>
          </div>
          
          <div className="text-center p-4 sm:p-8 bg-slate-800/50 rounded-xl sm:rounded-2xl border border-orange-400/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
            <FaEnvelope className="text-3xl sm:text-4xl text-orange-400 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-slate-200 mb-2 sm:mb-3">Email</h3>
            <p className="text-sm sm:text-base text-slate-300">
             jham53162@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

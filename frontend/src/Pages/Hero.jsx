import { FaOm } from "react-icons/fa";
import { GiTrident } from "react-icons/gi";

function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/temple0.png"
          alt="Temple Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Red-Blue Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800/70 via-slate-800/65 to-gray-900/75"></div>

      {/* Decorative elements with red colors */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-20 text-5xl text-red-400 animate-pulse">ॐ</div>
        <div className="absolute bottom-32 right-16 text-4xl text-red-300 animate-pulse delay-1000">🕉</div>
        <div className="absolute top-1/2 left-10 text-3xl text-red-500 animate-pulse delay-2000">🔱</div>
        <div className="absolute top-32 right-32 text-3xl text-red-400 animate-pulse delay-500">🔱</div>
        <div className="absolute bottom-1/3 left-1/4 text-4xl text-red-300 animate-pulse delay-1500">ॐ</div>
        <div className="absolute top-2/3 right-1/3 text-3xl text-red-500 animate-pulse delay-700">🕉</div>
        <div className="absolute top-1/4 left-1/2 text-4xl text-red-400 animate-pulse delay-1200">🔱</div>
        <div className="absolute bottom-20 left-1/3 text-3xl text-red-300 animate-pulse delay-900">ॐ</div>
        <div className="absolute top-3/4 left-20 text-3xl text-red-500 animate-pulse delay-1800">🕉</div>
        <div className="absolute top-40 right-1/4 text-3xl text-red-400 animate-pulse delay-300">🔱</div>
      </div>

      {/* Floating particles effect with red colors */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-400/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4">
        <div className="mb-6">
          <FaOm className="text-6xl text-red-400 mx-auto animate-spin" style={{ animationDuration: '20s' }} />
        </div>

        <div className="animate-fade-in">
 <h1
  className="text-4xl md:text-6xl font-extrabold 
             bg-gradient-to-r from-violet-400 via-pink-500 to-yellow-400 
             bg-clip-text text-transparent 
             drop-shadow-[0_0_25px_rgba(180,80,255,0.7)] 
             mb-6 animate-pulse tracking-wide text-center"
>
  बाबा बर्द्धबनेश्वर नाथ
</h1>




  <h2 className="text-2xl md:text-3xl font-semibold text-slate-200 drop-shadow-xl mb-3">
    ॥ ॐ नमः शिवाय ॥  
  </h2>

  <p className="mt-4 text-slate-300 text-lg md:text-xl drop-shadow-md max-w-2xl leading-relaxed">
    Welcome to the sacred abode of Lord Shiva. <br />  
    A divine place of faith, devotion, and blessings — where every chant of <span className="text-red-400 font-bold">“Har Har Mahadev”</span>  
    resonates with eternal peace and spiritual energy.  
  </p>
</div>


        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button className="px-6 py-3 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white font-bold text-base rounded-full shadow-2xl hover:from-red-400 hover:via-pink-400 hover:to-red-500 transition-all duration-300 transform hover:scale-105 hover:shadow-red-400/50">
            About Us
          </button>
          <button className="px-6 py-3 border-2 border-red-400 text-red-400 font-bold text-base rounded-full shadow-xl hover:bg-red-400 hover:text-white transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
            View Gallery
          </button>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}

export default Hero;

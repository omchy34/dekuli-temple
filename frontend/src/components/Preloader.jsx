import { useState, useEffect } from 'react';


// Preloader Component
const Preloader = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 10 + 3;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-800 via-slate-800 to-gray-900">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Decorative Om symbols */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-20 text-4xl text-red-400 animate-pulse">ॐ</div>
        <div className="absolute bottom-32 right-16 text-3xl text-red-300 animate-pulse delay-1000">🕉</div>
        <div className="absolute top-1/2 left-10 text-3xl text-red-500 animate-pulse delay-2000">🔱</div>
        <div className="absolute top-32 right-32 text-3xl text-red-400 animate-pulse delay-500">ॐ</div>
        <div className="absolute bottom-1/3 left-1/4 text-4xl text-red-300 animate-pulse delay-1500">🕉</div>
        <div className="absolute top-2/3 right-1/3 text-3xl text-red-500 animate-pulse delay-700">🔱</div>
      </div>

      {/* Main content */}
      <div className="text-center relative z-10">
        {/* Rotating Om symbol */}
        <div className="relative mb-8">
          <div className="text-8xl text-red-400 mx-auto animate-spin drop-shadow-2xl" style={{ animationDuration: '8s' }}>
            ॐ
          </div>
          <div className="absolute -inset-4 rounded-full border border-red-400/30 animate-ping"></div>
          <div className="absolute -inset-8 rounded-full border border-red-400/20 animate-ping animation-delay-1000"></div>
        </div>

        {/* Temple name */}
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-violet-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(180,80,255,0.7)] mb-6 animate-pulse tracking-wide">
          Baba Bardhbaneshwar Nath
        </h1>

        {/* Sanskrit text */}
        <h2 className="text-xl md:text-2xl font-semibold text-slate-200 drop-shadow-xl mb-8">
          ॥ ॐ नमः शिवाय ॥  
        </h2>

        {/* Loading bar */}
        <div className="w-80 mx-auto mb-4">
          <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm border border-red-400/20">
            <div 
              className="h-full bg-gradient-to-r from-red-500 via-pink-500 to-red-600 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(239,68,68,0.5)]"
              style={{ width: `${Math.min(loadingProgress, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-red-300/70 mt-2">
            <span>Loading Divine Temple...</span>
            <span>{Math.round(loadingProgress)}%</span>
          </div>
        </div>

        {/* Dynamic loading messages */}
        <p className="text-slate-300 animate-pulse h-6">
          {loadingProgress < 25 && "Invoking Divine Presence..."}
          {loadingProgress >= 25 && loadingProgress < 50 && "Preparing Sacred Space..."}
          {loadingProgress >= 50 && loadingProgress < 75 && "Loading Temple Resources..."}
          {loadingProgress >= 75 && loadingProgress < 95 && "Connecting to Divine Energy..."}
          {loadingProgress >= 95 && "Ready... Har Har Mahadev!"}
        </p>
      </div>

      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-1500 {
          animation-delay: 1.5s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};
export default Preloader;
import { FaOm } from "react-icons/fa";
import { Helmet } from "react-helmet"; 

function About() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-purple-900">
     

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-6">
            About Our Sacred Temple
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-slate-300 text-lg leading-relaxed">
              Our temple stands as a beacon of spiritual enlightenment, dedicated
              to Lord Shiva, the destroyer of evil and transformer of the universe.
              For generations, devotees have found solace and divine blessings
              within these sacred walls.
            </p>

            <p className="text-slate-300 text-lg leading-relaxed">
              The most divine and unique feature of this temple is the{" "}
              <span className="text-amber-400 font-semibold">
                self-manifested (Swayambhu) Shivlinga
              </span>
              , which naturally emerged from the womb of the earth. This sacred
              phenomenon symbolizes the eternal presence of Lord Shiva and makes
              the temple a rare and powerful place of worship.
            </p>

            <p className="text-slate-300 text-lg leading-relaxed">
              Experience the profound peace that comes from connecting with the
              divine. Our temple offers a sanctuary where ancient traditions meet
              modern spiritual needs.
            </p>

            <div className="pt-4">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-80 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-3xl backdrop-blur-sm border border-orange-400/30 flex items-center justify-center">
              <img
                src="/temple1.png"
                alt="Temple Sacred Shivling"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-orange-500 to-amber-500 p-4 rounded-full shadow-lg">
              <FaOm className="text-white text-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

import React from "react";
import { motion } from "framer-motion";
import heroTurtle from "../assets/hero-turtle.png";
import winnerAvatar from "../assets/winner-avatar.png";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { name: "Tree Planting", value: 35 },
  { name: "Recycling", value: 50 },
  { name: "Beach Cleanup", value: 20 },
  { name: "Awareness Drives", value: 40 },
];

const Home = () => {
  return (
    <div
      className="relative min-h-screen flex flex-col bg-[#F0FDF4] text-gray-800"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-80 bg-white p-6 shadow-xl flex-col justify-between rounded-r-3xl">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="relative group">
                <img
                  src={winnerAvatar}
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full border-4 border-emerald-400 shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 right-0 bg-amber-400 text-white font-bold rounded-full px-3 py-1 text-sm border-2 border-white shadow-md">
                  Lv. 5
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-gray-900 text-xl font-bold">
                  Priya Sharma
                </h1>
                <p className="text-gray-500 text-sm">Eco-Warrior</p>
              </div>
            </div>
            <nav className="flex flex-col gap-2">
              <a
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-400 text-white font-semibold shadow-md hover:bg-emerald-500 transition-all duration-300"
                href="#"
              >
                Dashboard
              </a>
              <a
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-50 text-gray-700 font-medium"
                href="#"
              >
                Challenges
              </a>
              <a
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-50 text-gray-700 font-medium"
                href="#"
              >
                Lessons
              </a>
              <a
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-50 text-gray-700 font-medium"
                href="#"
              >
                Leaderboard
              </a>
              <a
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-50 text-gray-700 font-medium"
                href="#"
              >
                Profile
              </a>
            </nav>
          </div>
          <div>
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 py-3 text-gray-700 font-medium hover:bg-red-100 hover:text-red-600 transition-colors duration-300">
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className="flex-1 p-4 md:p-8 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://www.gstatic.com/earth/social/facebook_share_image_1200x630.jpg')",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(240, 253, 244, 0.85)",
          }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Hero */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 drop-shadow-sm">
                  Welcome back, Priya!
                </h1>
                <p className="text-emerald-700 mt-2 text-lg">
                  Ready for a new eco-adventure?
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-2 rounded-2xl p-4 bg-white/80 backdrop-blur-sm shadow-lg border border-emerald-200 hover:-translate-y-1 transition-transform duration-300">
                  <span className="material-symbols-outlined text-4xl text-amber-500">
                    spark
                  </span>
                  <p className="text-emerald-900 text-3xl font-bold">1,250</p>
                  <p className="text-gray-600 text-sm font-medium">
                    Eco-Points
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-2xl p-4 bg-white/80 backdrop-blur-sm shadow-lg border border-emerald-200 hover:-translate-y-1 transition-transform duration-300">
                  <span className="material-symbols-outlined text-4xl text-amber-500">
                    military_tech
                  </span>
                  <p className="text-emerald-900 text-3xl font-bold">7</p>
                  <p className="text-gray-600 text-sm font-medium">
                    Badges Earned
                  </p>
                </div>
              </div>
            </div>

            {/* Progression Path */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-emerald-200 mb-8">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-amber-500">
                  footprint
                </span>
                Your Progression Path
              </h2>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="text-center">
                  <img
                    src={heroTurtle}
                    alt="Sapling Avatar"
                    className="w-24 h-24 rounded-full mx-auto"
                  />
                  <p className="font-bold text-emerald-700 mt-2">Sapling</p>
                </div>
                <div className="flex-1 w-full">
                  <div className="w-full bg-emerald-100 rounded-full h-6 border-2 border-emerald-200 shadow-inner">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-md"
                      style={{ width: "60%" }}
                    >
                      60%
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-emerald-600 mt-2 px-1">
                    <span>1000 pts</span>
                    <span className="font-semibold">
                      Next Level: Young Tree
                    </span>
                    <span>2000 pts</span>
                  </div>
                </div>
                <div className="text-center opacity-50">
                  <img
                    src={heroTurtle}
                    alt="Young Tree Avatar"
                    className="w-24 h-24 rounded-full mx-auto"
                  />
                  <p className="font-bold text-emerald-700 mt-2">Young Tree</p>
                </div>
              </div>
            </div>

            {/* New Adventures Section */}
            <div>
              <h2 className="text-3xl font-bold text-emerald-800 mb-6 drop-shadow-sm">
                New Adventures Await!
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  "Tree Planting Workshop",
                  "Renewable Energy Basics",
                  "Waste Management 101",
                ].map((title, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    className="flex flex-col gap-4 rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="w-full h-48 bg-center bg-no-repeat bg-cover relative">
                      <img
                        src="https://source.unsplash.com/random/400x200/?nature,green"
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3 bg-amber-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                        +50 Eco-Points
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-gray-900 text-lg font-bold mb-2">
                        {title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 flex-grow">
                        Learn and explore sustainable practices.
                      </p>
                      <button className="mt-auto w-full rounded-lg bg-emerald-500 text-white py-2.5 font-bold hover:bg-emerald-600 transition-colors duration-300 transform hover:scale-105">
                        Start Lesson
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Challenges Section */}
            <div className="mt-10">
              <h2 className="text-3xl font-bold text-emerald-800 mb-6 drop-shadow-sm">
                Team Up for Challenges!
              </h2>
              <div className="space-y-6">
                {[
                  "Community Clean-Up Drive",
                  "Energy Efficiency Challenge",
                ].map((challenge, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-emerald-200 hover:border-amber-400 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src="https://source.unsplash.com/random/100x100/?plant,eco"
                        alt="Challenge Icon"
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {challenge}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          Join and make an impact!
                        </p>
                      </div>
                    </div>
                    <button className="w-full md:w-auto rounded-lg bg-amber-400 text-white px-6 py-3 font-bold hover:bg-amber-500 transition-all duration-300 transform hover:scale-105 shadow-md">
                      Join Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* EcoHero of the Month */}
            <section id="winner" className="px-10 md:px-0 py-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-12">
                🌟 EcoHero of the Month 🌟
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="md:w-1/2 bg-green-50 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center">
                  <img
                    src={winnerAvatar}
                    alt="Winner Avatar"
                    className="w-36 h-36 rounded-full border-4 border-green-500 shadow-md mb-4"
                  />
                  <h3 className="text-2xl font-bold text-green-700">
                    Aarav Sharma
                  </h3>
                  <p className="text-gray-600">
                    Top EcoWarrior • Mumbai, India
                  </p>
                </div>
                <motion.div
                  className="md:w-1/2 bg-green-50 p-8 rounded-2xl shadow-xl"
                  initial={{ rotateX: 15, rotateY: -10, opacity: 0 }}
                  animate={{ rotateX: 0, rotateY: 0, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{ perspective: 1000 }}
                >
                  <h4 className="text-xl font-semibold text-green-700 mb-4 text-center">
                    Social Service Activity
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                      <XAxis dataKey="name" stroke="#4b5563" />
                      <YAxis stroke="#4b5563" />
                      <Tooltip />
                      <Bar dataKey="value" radius={[12, 12, 4, 4]}>
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill="#22c55e" />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;

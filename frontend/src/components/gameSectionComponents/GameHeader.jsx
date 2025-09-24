import React from "react";
import ImpactGraph from "./ImpactGraph";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const GameHeader = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl shadow-2xl p-8 border border-green-100"
    >
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-green-800 tracking-tight drop-shadow-lg">
          🌍 Planet Guardian Adventure
        </h1>
        <p className="text-gray-700 text-lg mt-4 max-w-2xl mx-auto">
          Play fun games and **see your actions impact the real world!** 🌱
          Unlock badges, level up, and track your environmental impact.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Instructions Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-green-100 via-green-200 to-green-300 rounded-3xl shadow-2xl p-8 border border-green-200 hover:shadow-3xl transition-all relative overflow-hidden"
        >
          <h3 className="text-3xl font-bold text-green-900 mb-6 flex items-center gap-3">
            🧩 Steps to Start
            <span className="ml-auto bg-yellow-400 text-green-900 px-3 py-1 rounded-full font-semibold text-sm shadow animate-pulse">
              Level 1
            </span>
          </h3>

          <ul className="space-y-4 text-gray-800">
            {[
              "Select a module based on your interests.",
              "Choose a lesson or game to play.",
              "Preview your impact graph.",
              "Click 'Start Playing' and begin your journey!",
            ].map((step, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="p-4 bg-white/80 rounded-xl shadow-md border border-green-200 flex items-center gap-4 hover:scale-105 transition-transform"
              >
                <span className="w-10 h-10 flex items-center justify-center bg-green-600 text-white rounded-full font-bold shadow-md">
                  {index + 1}
                </span>
                <span className="text-base font-medium">{step}</span>
              </motion.li>
            ))}
          </ul>

          <Button
            onClick={() => navigate("/game/intro")}
            className="mt-8 w-full bg-green-700 hover:bg-green-800 text-white text-lg py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all animate-pulse"
          >
            🚀 Start Adventure
          </Button>
        </motion.div>

        {/* Impact Graph Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-green-50 via-green-100 to-green-200 rounded-3xl shadow-2xl p-8 border border-green-200 hover:shadow-3xl transition-all relative overflow-hidden"
        >
          <h3 className="text-3xl font-bold text-green-900 mb-6 flex items-center gap-3">
            🌿 Your Impact
            <span className="ml-auto bg-green-600 text-white px-3 py-1 rounded-full font-semibold text-sm shadow animate-bounce">
              Eco Hero
            </span>
          </h3>

          <div className="bg-white/70 rounded-2xl p-4 shadow-inner">
            <ImpactGraph
              data={[
                { step: "Start", impact: 0 },
                { step: "Waste Segregation", impact: 20 },
                { step: "Tree Plantation", impact: 45 },
                { step: "Carbon Reduction", impact: 70 },
                { step: "Final Score", impact: 100 },
              ]}
            />
          </div>

          <p className="mt-4 text-gray-700 text-sm text-center font-medium">
            📊 Track your contributions and climb the leaderboard. Every action
            brings you closer to a sustainable world! 💚
          </p>

          {/* Floating Badge */}
          <div className="absolute top-4 right-4 bg-yellow-300 text-green-900 px-3 py-1 rounded-full font-bold shadow-lg animate-bounce">
            +20 XP
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GameHeader;

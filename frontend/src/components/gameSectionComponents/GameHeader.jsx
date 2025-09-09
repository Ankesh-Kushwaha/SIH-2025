import React from "react";
import ImpactGraph from "./ImpactGraph";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Xprender from "@/components/Xprender";
import { useNavigate } from "react-router-dom";

const GameHeader = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl shadow-2xl p-8 border border-green-100"
    >
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-green-700 tracking-tight drop-shadow-sm">
          🌍 How Planet Guardian Game Works
        </h1>
        <p className="text-gray-700 text-lg mt-3 max-w-2xl mx-auto">
          Learn how each game contributes to **real-world environmental impact**
          while having fun and making a difference! 🌱
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Instructions Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition"
        >
          <h3 className="text-2xl font-bold text-green-700 mb-6">
            🧩 Steps to Get Started
          </h3>
          <ul className="space-y-4 text-gray-700">
            {[
              "Select a module based on your interests.",
              "Choose a lesson or game you want to play.",
              "Read the instructions and preview the impact graph.",
              "Click “Start Playing” to begin your journey!",
            ].map((step, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="p-4 bg-green-50 rounded-lg shadow-sm border border-green-200 flex items-start gap-3 hover:bg-green-100 transition"
              >
                <span className="w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full font-semibold shadow-md">
                  {index + 1}
                </span>
                <span className="text-base">{step}</span>
              </motion.li>
            ))}
          </ul>

          <Button
            onClick={() => navigate("/game/intro")}
            className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3 rounded-xl shadow-lg transition"
          >
            🚀 Start Playing
          </Button>
        </motion.div>

        {/* Impact Graph Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition"
        >
          <h3 className="text-2xl font-bold text-green-700 mb-6">
            🌿 Overall Environmental Impact
          </h3>

          <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-4 shadow-inner">
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

          <p className="mt-4 text-gray-600 text-sm text-center">
            📊 Your actions directly contribute to a sustainable future. Keep
            playing to **boost your impact!** 💚
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GameHeader;

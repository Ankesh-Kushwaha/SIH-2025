/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import ImpactGraph from "./ImpactGraph";

const GameModal = ({ show, game, onClose, onStart }) => {
  if (!show || !game) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-lg flex justify-center items-center z-50"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-green-500/30 rounded-3xl shadow-[0_0_35px_rgba(16,185,129,0.5)] max-w-5xl w-full p-8"
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-extrabold text-green-400 tracking-wide drop-shadow-lg flex items-center gap-2">
              🎮 {game.title}
            </h2>
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-red-500/10 hover:bg-red-500/20 border border-red-400 text-red-300 rounded-lg px-4 py-2 transition"
            >
              ✖ Close
            </Button>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Impact Graph Section */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-green-900/20 to-green-700/10 backdrop-blur-lg rounded-2xl p-5 border border-green-500/30 shadow-[0_0_25px_rgba(16,185,129,0.3)]"
            >
              <h3 className="text-xl font-semibold text-green-300 mb-4 flex items-center gap-2">
                🌿 Environmental Impact
              </h3>
              <div className="bg-black/40 rounded-xl p-3 border border-green-400/30">
                <ImpactGraph data={game.impactGraph} />
              </div>
            </motion.div>

            {/* Steps Section */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-800/40 to-gray-700/20 backdrop-blur-lg rounded-2xl p-5 border border-green-500/30 shadow-[0_0_25px_rgba(16,185,129,0.3)]"
            >
              <h3 className="text-xl font-semibold text-green-300 mb-4">
                🕹 Steps to Play
              </h3>
              <ul className="space-y-4">
                {game.steps.map((step, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-black/30 backdrop-blur-sm rounded-lg border border-green-400/30 shadow-md hover:bg-green-900/10 transition flex items-start gap-3"
                  >
                    <span className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full font-bold shadow-md">
                      {index + 1}
                    </span>
                    <span className="text-green-100 text-base">{step}</span>
                  </motion.li>
                ))}
              </ul>

              <Button
                onClick={onStart}
                className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white text-lg py-3 rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.6)] transition"
              >
                🚀 Start Playing
              </Button>
            </motion.div>
          </div>

          {/* Bottom Glow Accent */}
          <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 rounded-b-3xl"></div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GameModal;

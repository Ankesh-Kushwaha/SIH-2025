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
        className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl p-6 shadow-2xl max-w-4xl w-full"
        >
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            {game.title} - How to Play
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-4 shadow-md">
              <h3 className="text-lg font-semibold text-green-600 mb-3">
                Environmental Impact
              </h3>
              <ImpactGraph data={game.impactGraph} />
            </div>

            <div className="bg-gray-50 rounded-xl p-4 shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Steps to Play
              </h3>
              <ul className="space-y-3">
                {game.steps.map((step, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-white rounded-lg shadow-sm border border-gray-200"
                  >
                    <span className="font-semibold">Step {index + 1}:</span>{" "}
                    {step}
                  </motion.li>
                ))}
              </ul>
              <Button
                onClick={onStart}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white"
              >
                🚀 Start Playing
              </Button>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GameModal;

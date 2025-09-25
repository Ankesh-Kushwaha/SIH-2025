import { useParams } from "react-router-dom";
import { gameComponent } from "@/data/moduleData";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti"; // optional fun effect

export default function GamePage() {
  const { gameId } = useParams();
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    const game = gameComponent.find(
      (g) => String(g.gameComponentId) === String(gameId)
    );

    if (game) {
      setSelectedComponent(() => game.component);
    }
  }, [gameId]);

  // Error Screen
  if (!selectedComponent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-300 via-red-200 to-red-100 p-6">
        <motion.h1
          className="text-5xl font-extrabold text-red-700 mb-4 animate-pulse drop-shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ❌ Game Not Found
        </motion.h1>
        <motion.p
          className="text-gray-700 text-lg text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Please select a valid game from your dashboard.
        </motion.p>
      </div>
    );
  }

  const SelectedGame = selectedComponent;

  return (
    <div className="min-h-screen w-full p-6 bg-gradient-to-br from-green-100 via-green-200 to-emerald-300 relative overflow-hidden">
      
      {/* Optional Confetti effect for gamified energy */}
      {/* <Confetti numberOfPieces={50} recycle={true} /> */}

      {/* Header Section */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-5xl font-extrabold text-green-900 drop-shadow-2xl animate-pulse">
          🌿 Eco Adventure
        </h1>
        <p className="text-gray-800 mt-2 text-lg md:text-xl">
          Complete challenges and watch your actions make a real-world impact!
        </p>

        {/* Gamified Stats */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="bg-yellow-400 text-green-900 px-4 py-2 rounded-full font-semibold shadow-lg animate-pulse"
          >
            Level 1
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="bg-green-700 text-white px-4 py-2 rounded-full font-semibold shadow-lg"
          >
            XP: 0
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="bg-gradient-to-r from-green-400 to-emerald-600 px-4 py-2 rounded-full font-semibold shadow-lg text-white"
          >
            🌱 Eco Points: 0
          </motion.div>
        </div>
      </motion.div>

      {/* Game Container */}
      <AnimatePresence>
        <motion.div
          key={gameId}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-5xl mx-auto border-4 border-green-300 hover:shadow-emerald-400 transition-shadow duration-500"
        >
          <SelectedGame />
        </motion.div>
      </AnimatePresence>

      {/* Optional Floating Energy Orbs */}
      <motion.div
        className="absolute top-10 left-10 w-4 h-4 rounded-full bg-green-400 opacity-50 animate-bounce"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-6 h-6 rounded-full bg-yellow-400 opacity-50 animate-bounce"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      />
    </div>
  );
}

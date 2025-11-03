/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { modulesData } from "@/data/moduleData";
import GameHeader from "./GameHeader";
import GameList from "./GameList";
import GameModal from "./GameModal";

const GameSection = ({ modules: initialModules }) => {
  const [modules, setModules] = useState(initialModules || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sparks, setSparks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setModules(modulesData);
  }, [initialModules]);

  const handlePreview = (game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  const handleStartGame = () => {
    if (selectedGame) navigate(`/game/${selectedGame.gameId}`);
  };

  // Create sparks on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      const newSpark = {
        id: Date.now(),
        x: e.clientX + (Math.random() - 0.5) * 20,
        y: e.clientY + (Math.random() - 0.5) * 20,
        size: 2 + Math.random() * 4,
        color: `rgba(255, 255, 0, ${0.5 + Math.random() * 0.5})`,
      };
      setSparks((prev) => [...prev, newSpark]);

      // Remove sparks after 600ms
      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
      }, 600);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen p-6 space-y-10 overflow-hidden bg-gradient-to-br from-green-200 via-emerald-300 to-teal-400">
      {/* Lightning streaks */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute h-0.5 w-32 bg-white opacity-50 blur-sm animate-lightning"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

    
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="absolute rounded-full shadow-lg"
          style={{
            top: spark.y,
            left: spark.x,
            width: spark.size,
            height: spark.size,
            background: spark.color,
            pointerEvents: "none",
            transition: "all 0.3s ease-out",
          }}
        />
      ))}

      {/* Loading & Error */}
      {loading && (
        <div className="text-center text-xl text-green-700 font-bold animate-pulse">
          ⏳ Charging EcoVerse Games...
        </div>
      )}
      {error && (
        <div className="text-center text-red-600 font-bold text-lg">
          ❌ {error}
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && <GameHeader />}
      {!loading && !error && (
        <GameList modules={modules} onPreview={handlePreview} />
      )}
      <GameModal
        show={showModal}
        game={selectedGame}
        onClose={() => setShowModal(false)}
        onStart={handleStartGame}
      />

      {/* Custom Animations */}
      <style>
        {`
          @keyframes bounce-slow {
            0%,100% { transform: translateY(0);}
            50% { transform: translateY(-10px);}
          }
          .animate-bounce-slow {
            animation: bounce-slow 3s infinite ease-in-out;
          }

          @keyframes animate-lightning {
            0%,100% { opacity:0.3; transform: scaleX(1);}
            50% { opacity:1; transform: scaleX(1.2);}
          }
          .animate-lightning {
            animation: animate-lightning 1.5s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default GameSection;

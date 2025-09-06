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

  return (
    <div className="p-6 space-y-8">
      {loading && (
        <div className="text-center text-lg text-green-600 font-semibold animate-pulse">
          ⏳ Loading EcoVerse Games...
        </div>
      )}
      {error && (
        <div className="text-center text-red-600 font-semibold">❌ {error}</div>
      )}

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
    </div>
  );
};

export default GameSection;

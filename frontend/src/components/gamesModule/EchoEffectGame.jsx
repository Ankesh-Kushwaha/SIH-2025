/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./EchoEffectGame.css";

const CARDS = [
  {
    text: "Build a new factory on a wetland for 1000 jobs?",
    yes: { eco: -20, env: -40, hap: 20 },
    no: { env: 5 },
  },
  {
    text: "Invest heavily in a new public transit system?",
    yes: { eco: -30, env: 30, hap: 20 },
    no: {},
  },
  {
    text: "Subsidize renewable energy research?",
    yes: { eco: -15, tech: 30, env: 15 },
    no: { tech: -10 },
  },
  {
    text: "Allow cheap, polluting plastic manufacturing?",
    yes: { eco: 40, env: -50, tech: 10 },
    no: { eco: -10 },
  },
];

export default function EchoEffectGame({ goBack }) {
  const [stats, setStats] = useState({ eco: 50, env: 50, hap: 50, tech: 50 });
  const [cardIndex, setCardIndex] = useState(0);
  const [history, setHistory] = useState([]);

  const handleChoice = (choiceText, effect) => {
    const newStats = { ...stats };
    for (const key in effect) {
      newStats[key] = Math.max(0, Math.min(100, stats[key] + effect[key]));
    }
    setStats(newStats);

    setHistory([
      ...history,
      { decision: choiceText, card: CARDS[cardIndex].text },
    ]);

    setCardIndex((cardIndex + 1) % CARDS.length);
  };

  const restartGame = () => {
    setStats({ eco: 50, env: 50, hap: 50, tech: 50 });
    setCardIndex(0);
    setHistory([]);
  };

  const isGameOver = Object.values(stats).some((val) => val === 0);
  const currentCard = CARDS[cardIndex];

  return (
    <div className="game-container echo-game">
      <button onClick={goBack} className="back-button">
        ← Back
      </button>
      <h2>🌍 Echo Effect</h2>

      <div className="stats-bar echo-stats">
        {Object.keys(stats).map((key) => (
          <div key={key} className="stat-item">
            <span>
              {key.toUpperCase()}: {stats[key]}
            </span>
            <progress
              value={stats[key]}
              max="100"
              className={`progress-${key}`}
            ></progress>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isGameOver ? (
          <motion.div
            className="card gameover-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3>💀 GAME OVER!</h3>
            <p>One of your stats dropped to 0.</p>
            <button onClick={restartGame} className="restart-btn">
              🔄 Restart
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={cardIndex}
            className="card"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>{currentCard.text}</p>
            <div className="card-choices">
              <button
                onClick={() => handleChoice("Yes", currentCard.yes)}
                className="yes-btn"
              >
                ✅ Yes
              </button>
              <button
                onClick={() => handleChoice("No", currentCard.no)}
                className="no-btn"
              >
                ❌ No
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="history-log">
        <h4>📝 Decision History</h4>
        <ul>
          {history.map((h, i) => (
            <li key={i}>
              <strong>{h.decision}</strong> – {h.card}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

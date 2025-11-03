/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Trophy, RefreshCw, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Energy-related events
const events = [
  { id: 1, text: "Lights are ON in the morning 🌞", correctAction: "Turn Off" },
  { id: 2, text: "AC running with windows open ❄️", correctAction: "Turn Off" },
  { id: 3, text: "TV is ON but nobody watching 📺", correctAction: "Turn Off" },
  {
    id: 4,
    text: "Solar panel ready to generate energy ☀️",
    correctAction: "Activate",
  },
  { id: 5, text: "Laptop charging overnight 🔌", correctAction: "Unplug" },
  {
    id: 6,
    text: "Washing machine running at peak hours 🕒",
    correctAction: "Reschedule",
  },
  { id: 7, text: "Fan ON in empty room 🌀", correctAction: "Turn Off" },
  { id: 8, text: "Using heater during summer 🔥", correctAction: "Turn Off" },
];

const levels = [
  { id: 1, time: 60, energy: 100, title: "Beginner" },
  { id: 2, time: 45, energy: 80, title: "Eco Learner" },
  { id: 3, time: 35, energy: 70, title: "Power Saver" },
  { id: 4, time: 25, energy: 60, title: "Eco Warrior" },
];

const EnergyConservationGame = () => {
  const navigate = useNavigate();
  const [levelIndex, setLevelIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [energy, setEnergy] = useState(levels[0].energy);
  const [time, setTime] = useState(levels[0].time);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);

  // Pick random event
  const getRandomEvent = () =>
    events[Math.floor(Math.random() * events.length)];

  useEffect(() => {
    setCurrentEvent(getRandomEvent());
  }, []);

  // Timer countdown
  useEffect(() => {
    if (time > 0 && !gameOver) {
      const timer = setInterval(() => setTime((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (time === 0) {
      setGameOver(true);
    }
  }, [time, gameOver]);

  const handleAction = (action) => {
    if (!currentEvent || gameOver) return;

    if (action === currentEvent.correctAction) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      const bonus = Math.floor(newStreak / 3) * 5;
      setScore((prev) => prev + 10 + bonus);
    } else {
      setScore((prev) => prev - 5);
      setEnergy((prev) => {
        const updatedEnergy = prev - 10;
        if (updatedEnergy <= 0) setGameOver(true);
        return updatedEnergy;
      });
      setStreak(0);
    }

    setCurrentEvent(getRandomEvent());
  };

  const restartGame = () => {
    setLevelIndex(0);
    setScore(0);
    setEnergy(levels[0].energy);
    setTime(levels[0].time);
    setGameOver(false);
    setStreak(0);
    setCurrentEvent(getRandomEvent());
  };

  const nextLevel = () => {
    if (levelIndex < levels.length - 1) {
      const next = levelIndex + 1;
      setLevelIndex(next);
      setEnergy(levels[next].energy);
      setTime(levels[next].time);
      setStreak(0);
      setCurrentEvent(getRandomEvent());
    } else {
      setGameOver(true);
    }
  };

  const level = levels[levelIndex];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-6">
      <Card className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-green-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-700 flex items-center gap-2">
            ⚡ Power Saver Challenge
          </CardTitle>
          <p className="text-gray-500">
            Level {level.id}:{" "}
            <span className="font-semibold">{level.title}</span>
          </p>
        </CardHeader>

        <CardContent>
          {!gameOver ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* HUD */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-green-700">
                  <Zap className="w-5 h-5" />
                  Score: <span className="text-green-600">{score}</span>
                </div>
                <p className="text-lg font-semibold text-red-500">⏳ {time}s</p>
              </div>

              {/* Progress Bars */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Energy</p>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <motion.div
                    animate={{ width: `${energy}%` }}
                    className="h-3 rounded-full bg-green-500"
                  />
                </div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Level Progress
                </p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        ((levels[levelIndex].time - time) /
                          levels[levelIndex].time) *
                        100
                      }%`,
                    }}
                    className="h-3 rounded-full bg-emerald-500"
                  />
                </div>
              </div>

              {/* Event */}
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {currentEvent?.text}
              </h2>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {["Turn Off", "Activate", "Unplug", "Reschedule"].map(
                  (action) => (
                    <motion.button
                      key={action}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAction(action)}
                      className="p-3 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 border border-green-300 shadow-sm transition"
                    >
                      {action}
                    </motion.button>
                  )
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <Trophy className="w-16 h-16 text-yellow-500 mb-3" />
              <h2 className="text-2xl font-bold text-green-700 mb-2">
                Game Over!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Your final score: <span className="font-bold">{score}</span>
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={restartGame}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl flex items-center gap-2"
                >
                  <RefreshCw size={18} />
                  Play Again
                </Button>
                <Button
                  onClick={() => navigate("/gamesection")}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-xl"
                >
                  Back to Game Section
                </Button>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnergyConservationGame;

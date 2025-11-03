/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import * as Icons from "lucide-react";
import gamesData from "@/data/GameModuleData";
import { useNavigate } from "react-router-dom";
//import MusicPlayer from "@/components/MusicPlayer"; // 🎵 import here

export default function RecycleRush() {
  const itemsData = gamesData.RecycleRush.data.ITEMS;
  const binsData = gamesData.RecycleRush.data.BINS;

  const gameRef = useRef(null);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [bins, setBins] = useState(
    Object.fromEntries(binsData.map((bin) => [bin, []]))
  );
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [running, setRunning] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [draggingItem, setDraggingItem] = useState(null);

  const playSound = (file) => {
    const audio = new Audio(`/sounds/${file}`);
    audio.volume = 0.5;
    audio.play();
  };

  // 🎯 Level system
  useEffect(() => {
    const newLevel = Math.floor(score / 50) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      setShowLevelUp(true);
      playSound("level-up.mp3");

      if (newLevel % 3 === 0) {
        setLives((l) => l + 1);
      }

      setTimeout(() => setShowLevelUp(false), 1500);
    }
  }, [score]);

  // 🕑 Spawn items
  useEffect(() => {
    if (!running) return;
    const spawnRate = Math.max(600, 2000 - (level - 1) * 200);
    const interval = setInterval(() => spawnItem(), spawnRate);
    return () => clearInterval(interval);
  }, [running, level]);

  // ⬇️ Animate items falling
  useEffect(() => {
    if (!running) return;
    const fallSpeed = 2 + (level - 1);
    const anim = setInterval(() => {
      setItems((prev) =>
        prev.map((item) => ({ ...item, top: item.top + fallSpeed }))
      );
    }, 20);
    return () => clearInterval(anim);
  }, [running, level]);

  // ❌ Check ground hit
  useEffect(() => {
    if (!running) return;
    items.forEach((item) => {
      if (item.top > 560) {
        setItems((prev) => prev.filter((i) => i.id !== item.id));
        setLives((l) => Math.max(0, l - 1));
        playSound("wrong.mp3");
      }
    });
  }, [items, running]);

  const spawnItem = () => {
    const itemData = itemsData[Math.floor(Math.random() * itemsData.length)];
    const newItem = {
      id: Date.now(),
      ...itemData,
      left: Math.random() * 480,
      top: 0,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleDrop = (itemId, binType) => {
    setDraggingItem(null);
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    setBins((prev) => ({
      ...prev,
      [binType]: [...prev[binType], item],
    }));

    if (item.type === binType) {
      setScore((s) => s + 10);
      setXp((x) => x + 5);
      showFeedback(item, "+10", "text-green-600");
      playSound("correct.mp3");
    } else {
      setScore((s) => s - 5);
      setLives((l) => Math.max(0, l - 1));
      showFeedback(item, "-5", "text-red-600");
      playSound("wrong.mp3");
    }
  };

  const showFeedback = (item, text, color) => {
    const fb = document.createElement("div");
    fb.className = `absolute text-xl font-bold pointer-events-none animate-fadeOut ${color}`;
    fb.innerText = text;
    fb.style.left = item.left + "px";
    fb.style.top = item.top + "px";
    gameRef.current.appendChild(fb);
    setTimeout(() => fb.remove(), 1000);
  };

  const startGame = () => {
    setScore(0);
    setXp(0);
    setLives(3);
    setLevel(1);
    setItems([]);
    setBins(Object.fromEntries(binsData.map((bin) => [bin, []])));
    setRunning(true);
  };

  const exitGame = () => {
    setRunning(false);
    navigate("/gamesection");
  };

  const gameOver = lives <= 0;
  const getIcon = (iconName) => {
    const IconComponent = Icons[iconName] || Icons.HelpCircle;
    return <IconComponent size={28} />;
  };

  return (
    <div className="flex flex-col items-center mt-6 gap-4">
      <h2 className="text-3xl font-bold mb-2 text-green-700">
        ♻️ Recycle Rush
      </h2>

      {/* HUD */}
      <Card className="w-[500px] text-center">
        <CardContent className="flex justify-between items-center text-lg font-semibold p-3 gap-2">
          <span>Score: {score}</span>
          <span>Level: {level}</span>
          <div className="flex-1 mx-2 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${xp % 100}%` }}
            />
          </div>
          <span>
            {Array.from({ length: lives }).map((_, i) => (
              <span key={i} className="text-red-500">
                ❤️
              </span>
            ))}
          </span>
        </CardContent>
      </Card>

      {/* Game or Menu */}
      {!running || gameOver ? (
        <div className="flex flex-col items-center gap-3">
          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-10">
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <h3 className="text-2xl font-bold text-red-600 mb-2">
                  Game Over!
                </h3>
                <p className="mb-4">
                  Final Score: {score} | XP: {xp}
                </p>
                <Button onClick={startGame} className="px-6 py-2 text-lg">
                  Restart
                </Button>
              </div>
            </div>
          )}
          {!gameOver && (
            <div className="flex gap-3">
              <Button onClick={startGame} className="px-6 py-2 text-lg">
                Start Game
              </Button>
              <Button
                variant="destructive"
                onClick={exitGame}
                className="px-6 py-2 text-lg"
              >
                Exit Game
              </Button>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Game Area */}
          <div
            ref={gameRef}
            className="relative w-[500px] h-[600px] border-2 border-green-600 rounded-2xl bg-green-50 overflow-hidden shadow-md"
          >
            {items.map((item) => (
              <motion.div
                key={item.id}
                className="absolute p-2 bg-white border-2 border-green-500 rounded-lg cursor-grab select-none shadow-sm flex flex-col items-center text-center"
                style={{ left: item.left, top: item.top }}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("itemId", item.id);
                  setDraggingItem(item);
                }}
                onDragEnd={() => setDraggingItem(null)}
                whileHover={{ scale: 1.1 }}
              >
                {getIcon(item.icon)}
                <p className="text-xs font-medium mt-1">
                  {item.name || item.type}
                </p>
              </motion.div>
            ))}

            {/* Level Up Popup */}
            {showLevelUp && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.2 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.6 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                           bg-yellow-300 text-yellow-900 font-bold text-2xl px-6 py-3 rounded-2xl shadow-lg z-20"
              >
                ⭐ Level Up! Level {level} ⭐
              </motion.div>
            )}
          </div>

          {/* Bins */}
          <div className="flex justify-between w-[500px] gap-4">
            {binsData.map((bin) => (
              <motion.div
                key={bin}
                data-bin={bin}
                className="relative w-[110px] h-[140px] bg-green-100 border-2 border-green-600 text-green-700 flex flex-col items-center justify-start rounded-lg font-bold text-sm p-2 overflow-hidden shadow-md"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) =>
                  handleDrop(Number(e.dataTransfer.getData("itemId")), bin)
                }
                whileHover={{ scale: 1.05 }}
              >
                <p className="mb-1">{bin}</p>
                <div className="flex flex-wrap gap-1 justify-center items-start overflow-y-auto max-h-[90px] w-full">
                  {bins[bin].map((item) => (
                    <div
                      key={item.id}
                      className="p-1 bg-white border rounded shadow-sm flex flex-col items-center text-center"
                    >
                      {getIcon(item.icon)}
                      <p className="text-[10px] mt-0.5">
                        {item.name || item.type}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex gap-3 mt-4">
            <Button
              variant="destructive"
              onClick={exitGame}
              className="px-6 py-2 text-lg"
            >
              Exit Game
            </Button>
            {/**
             *  <MusicPlayer src="/sounds/bg-music.mp3" autoPlay={true} />
             */}
          </div>
        </>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes fadeOut {
            0% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-30px); }
          }
          .animate-fadeOut { animation: fadeOut 1s forwards; }
        `}
      </style>
    </div>
  );
}

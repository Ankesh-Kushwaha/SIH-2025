/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  Droplets,
  Trophy,
  RefreshCw,
  AlertTriangle,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- Game stages
const stages = ["seed", "sapling", "tree"];
const eventTypes = [
  { type: "drought", message: "🌞 Drought! Water your trees quickly!" },
  { type: "pests", message: "🐛 Pest Attack! Save your trees!" },
  { type: "bonus", message: "💎 Bonus Time! Plant fast!" },
];

export default function PlantationGame() {
  const navigate = useNavigate();

  // --- Game State
  const [score, setScore] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [time, setTime] = useState(90);
  const [trees, setTrees] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [randomEvent, setRandomEvent] = useState(null);
  const [forestComplete, setForestComplete] = useState(false);
  const [badge, setBadge] = useState(
    () => localStorage.getItem("ecoBadge") || null
  ); // load from localStorage
  const [cameraShake, setCameraShake] = useState(0);
  const [knowledgePopups, setKnowledgePopups] = useState([]);

  // --- Audio
  const bgMusic = useRef(new Audio("/sounds/forest_ambient.mp3")).current;
  const waterSound = useRef(new Audio("/sounds/water_splash.mp3")).current;
  const wrongSound = useRef(new Audio("/sounds/wrong_move.mp3")).current;
  const forestSound = useRef(new Audio("/sounds/forest_complete.mp3")).current;

  // --- Background music management
  useEffect(() => {
    if (!bgMusic) return;
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    const playPromise = bgMusic.play?.();
    if (playPromise && typeof playPromise.catch === "function")
      playPromise.catch(() => {});

    return () => {
      // Stop sound completely on unmount / route change
      try {
        bgMusic.pause();
        bgMusic.currentTime = 0;
      } catch (e) {
        // ignore if audio can't be controlled
      }
    };
  }, [bgMusic]);

  const canvasRef = useRef(null);
  const treeRefs = useRef({});
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  // --- Timer
  useEffect(() => {
    if (time > 0 && !gameOver) {
      const id = setInterval(() => setTime((t) => t - 1), 1000);
      return () => clearInterval(id);
    } else if (time === 0) setGameOver(true);
  }, [time, gameOver]);

  // --- Random Events
  useEffect(() => {
    if (gameOver) return;
    const id = setInterval(() => {
      if (Math.random() > 0.7) {
        setRandomEvent(
          eventTypes[Math.floor(Math.random() * eventTypes.length)]
        );
        setTimeout(() => setRandomEvent(null), 2600);
      }
    }, 5000);
    return () => clearInterval(id);
  }, [gameOver]);

  // --- Particle engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    function resize() {
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    let last = performance.now();
    function step(now) {
      const dt = Math.min(32, now - last);
      last = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += 0.02 * (dt / 16);
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
        p.angle += p.spin * (dt / 16);
        p.life -= dt / 8;

        ctx.save();
        ctx.translate(p.x * dpr, p.y * dpr);
        ctx.rotate(p.angle);
        ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
        ctx.fillStyle = p.color;
        ctx.fillRect(
          (-p.size / 2) * dpr,
          (-p.size / 2) * dpr,
          p.size * dpr,
          p.size * dpr
        );
        ctx.restore();

        if (p.life <= 0 || p.y > canvas.height + 50) particles.splice(i, 1);
      }

      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  function spawnParticles(clientX = null, clientY = null, count = 28) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX != null ? clientX - rect.left : rect.width / 2;
    const y = clientY != null ? clientY - rect.top : rect.height / 2;
    const colors = [
      "#10B981",
      "#34D399",
      "#60A5FA",
      "#F59E0B",
      "#F97316",
      "#86EFAC",
    ];

    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 40,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 3 - 1,
        vy: Math.random() * -2 - 0.5,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * 600 + 400,
        maxLife: Math.random() * 600 + 400,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.2,
      });
    }
  }

  function triggerShake(intensity = 8) {
    setCameraShake(intensity);
    setTimeout(() => setCameraShake(0), 220);
  }

  // --- Knowledge Popups
  function showKnowledge(message, type = "info") {
    const id = Date.now();
    setKnowledgePopups((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setKnowledgePopups((prev) => prev.filter((p) => p.id !== id));
    }, 3000);
  }

  // --- Game Actions
  function plantSeed() {
    if (energy <= 0 || gameOver) return;
    setTrees((t) => [...t, { id: Date.now(), stage: "seed" }]);
    setScore((s) => s + 5);
    showKnowledge(
      "🌱 Planting trees absorbs carbon and benefits the environment.",
      "success"
    );
  }

  function waterTree(id) {
    const tree = trees.find((t) => t.id === id);
    if (!tree) return;
    if (tree.stage === "tree") {
      wrongAction();
      return;
    }
    waterSound.play?.();
    setTrees((prev) =>
      prev.map((tr) => {
        if (tr.id !== id) return tr;
        const nextStage = stages[stages.indexOf(tr.stage) + 1];
        if (nextStage === "sapling") {
          setScore((s) => s + 10);
          showKnowledge(
            "💧 Watering helps saplings grow and conserves water wisely.",
            "success"
          );
        } else if (nextStage === "tree") {
          setScore((s) => s + 20);
          const node = treeRefs.current[id];
          if (node) {
            const rect = node.getBoundingClientRect();
            spawnParticles(
              rect.left + rect.width / 2,
              rect.top + rect.height / 2,
              36
            );
            triggerShake(10);
          } else spawnParticles();
          showKnowledge(
            "🌳 Your tree is fully grown! It purifies air and supports wildlife.",
            "success"
          );
        }
        return { ...tr, stage: nextStage };
      })
    );
  }

  function wrongAction() {
    wrongSound.play?.();
    setEnergy((e) => {
      const newE = Math.max(0, e - 12);
      if (newE === 0) setGameOver(true);
      return newE;
    });
    setScore((s) => Math.max(0, s - 6));
    triggerShake(6);
    showKnowledge(
      "⚠️ That move was incorrect! Avoid overwatering or harming trees.",
      "error"
    );
  }

  function restartGame() {
    setScore(0);
    setEnergy(100);
    setTime(90);
    setTrees([]);
    setGameOver(false);
    setForestComplete(false);
    // badge stays persistent
  }

  // --- Check forest completion
  useEffect(() => {
    // only trigger when more than 10 planted trees and ALL are fully grown
    if (
      !gameOver &&
      trees.length > 10 &&
      trees.every((t) => t.stage === "tree")
    ) {
      // avoid re-triggering if already complete
      if (forestComplete) return;
      setForestComplete(true);
      try {
        forestSound.play?.();
      } catch (e) {}

      let rating = "";
      if (score > 100) rating = "🌟 Platinum Forest";
      else if (score > 60) rating = "✨ Gold Forest";
      else rating = "🌿 Silver Forest";

      setBadge(rating);
      try {
        localStorage.setItem("ecoBadge", rating);
      } catch (e) {}

      spawnParticles(null, null, 120);
    }
  }, [trees, score, gameOver, forestComplete]);

  // --- TreeCard Component
  const TreeCard = ({ tree }) => {
    return (
      <motion.div
        ref={(el) => (treeRefs.current[tree.id] = el)}
        className="relative bg-white/70 backdrop-blur-sm border border-green-200 rounded-2xl p-4 flex flex-col items-center gap-3 shadow-lg"
      >
        <motion.div className="flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-inner">
          {tree.stage === "seed" && (
            <Leaf className="w-12 h-12 text-green-500" />
          )}
          {tree.stage === "sapling" && (
            <Droplets className="w-12 h-12 text-blue-400" />
          )}
          {tree.stage === "tree" && (
            <Leaf className="w-12 h-12 text-green-700" />
          )}
        </motion.div>
        <div className="text-sm font-semibold text-slate-800">{tree.stage}</div>
        <div className="flex gap-2">
          <Button
            onClick={() => waterTree(tree.id)}
            className={`px-3 py-1 rounded-xl ${
              tree.stage === "tree"
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-green-600 text-white"
            }`}
          >
            {tree.stage === "tree" ? "🌳 Grown" : "💧 Water"}
          </Button>
          <Button
            onClick={wrongAction}
            className="px-3 py-1 rounded-xl bg-amber-50 text-amber-700"
          >
            ✖
          </Button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full h-screen relative overflow-hidden select-none">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-40"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg,#e6fffa 0%,#d1fae5 40%,#bbf7d0 100%)",
        }}
      />

      {/* Camera shake wrapper */}
      <div
        className="absolute inset-0 flex items-start justify-center pt-8 px-6"
        style={{
          transform: cameraShake
            ? `translate(${(Math.random() - 0.5) * cameraShake}px, ${
                (Math.random() - 0.5) * cameraShake
              }px)`
            : "none",
          transition: "transform 120ms linear",
        }}
      >
        <div className="w-full max-w-6xl">
          {/* HUD */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-extrabold text-green-800">
              🌱 EcoGrow — Plantation Challenge
            </h1>
            <div className="flex items-center gap-3">
              <div className="bg-white/60 backdrop-blur rounded-xl px-4 py-3 border border-green-100 shadow text-center">
                <div className="text-xs text-slate-600">Score</div>
                <div className="text-xl font-bold text-green-700">{score}</div>
              </div>

              <div className="bg-white/60 backdrop-blur rounded-xl px-4 py-3 border border-blue-50 shadow text-center">
                <div className="text-xs text-slate-600">Energy</div>
                <div className="text-xl font-bold text-blue-600">{energy}%</div>
              </div>

              <div className="bg-white/60 backdrop-blur rounded-xl px-4 py-3 border border-red-50 shadow text-center">
                <div className="text-xs text-slate-600">Time</div>
                <div className="text-xl font-bold text-red-600">{time}s</div>
              </div>

              {/* My Badges (persistent) */}
              {badge && (
                <div className="bg-white/70 backdrop-blur rounded-xl px-4 py-3 border border-amber-100 shadow text-center flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <div className="text-sm font-semibold text-amber-700">
                    {badge}
                  </div>
                </div>
              )}

              <Button
                onClick={restartGame}
                className="rounded-full px-3 py-2 bg-emerald-500 text-white"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Random Event */}
          {randomEvent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl px-4 py-3 shadow"
            >
              <AlertTriangle className="inline w-4 h-4 mr-2" />
              {randomEvent.message}
            </motion.div>
          )}

          {/* Game Area */}
          {!gameOver ? (
            <div className="bg-white/70 backdrop-blur rounded-3xl p-6 shadow-xl border border-green-100">
              <div className="mb-6 flex justify-between items-center">
                <div className="text-sm text-slate-700">
                  Tip: water saplings to grow them to full trees — fully grown
                  trees give the biggest score.
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={plantSeed}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
                  >
                    🌱 Plant Seed
                  </Button>
                  <Button
                    onClick={wrongAction}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                  >
                    ❌ Wrong Move
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {trees.length === 0 && (
                  <div className="col-span-full text-center py-12 text-slate-500">
                    No trees yet — plant some seeds to start your forest 🌳
                  </div>
                )}

                {trees.map((t) => (
                  <TreeCard key={t.id} tree={t} />
                ))}
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/90 backdrop-blur rounded-3xl p-10 shadow-2xl text-center"
            >
              <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-green-800 mb-2">
                Game Over
              </h2>
              <p className="text-lg text-slate-700 mb-6">
                Final score: <span className="font-bold">{score}</span>
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={restartGame}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
                >
                  Play Again
                </Button>
                <Button
                  onClick={() => navigate("/gamesection")}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl"
                >
                  Back to Game Section
                </Button>
              </div>
            </motion.div>
          )}

          {/* Forest Complete Badge */}
          {forestComplete && badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none"
            >
              <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-2xl text-center pointer-events-auto">
                <Trophy className="w-20 h-20 text-amber-400 mx-auto mb-4 animate-bounce" />
                <h2 className="text-3xl font-bold text-green-800 mb-2">
                  Forest Complete!
                </h2>
                <p className="text-lg text-slate-700 mb-4">
                  Congratulations! Your forest earned:
                </p>
                <p className="text-2xl font-extrabold text-green-700 mb-4">
                  {badge}
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => {
                      // Close popup but keep badge persistent
                      setForestComplete(false);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
                  >
                    Awesome!
                  </Button>

                  <Button
                    onClick={() => {
                      // let them dismiss and keep playing
                      setForestComplete(false);
                    }}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Knowledge Popups */}
          {/* Knowledge Popups */}
          <div className="absolute top-10 right-6 flex flex-col gap-3 z-50 pointer-events-none">
            <AnimatePresence>
              {knowledgePopups.map((popup) => (
                <motion.div
                  key={popup.id}
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-lg w-80 text-sm font-medium ${
                    popup.type === "success"
                      ? "bg-green-600 text-white"
                      : popup.type === "warning"
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {/* Icon for action type */}
                  {popup.type === "success" && (
                    <Leaf className="w-5 h-5 text-white" />
                  )}
                  {popup.type === "warning" && (
                    <Droplets className="w-5 h-5 text-white" />
                  )}
                  {popup.type === "error" && (
                    <AlertTriangle className="w-5 h-5 text-white" />
                  )}

                  <div className="flex-1">{popup.message}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

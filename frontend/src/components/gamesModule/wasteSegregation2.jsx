import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, RefreshCw, Volume2, VolumeX, Cross, Scissors } from "lucide-react";
import gamesData from "@/data/GameModuleData";
import { useNavigate } from "react-router-dom";

// --- Utility -------------------------------------------------
const clamp = (n, a, b) => Math.min(Math.max(n, a), b);
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const uid = () => Math.random().toString(36).slice(2, 10);

// --- Game Data ----------------------------------------------


// --- Sounds -------------------------------------------------
const ctxOrNull =
  typeof window !== "undefined"
    ? new (window.AudioContext || window.webkitAudioContext)()
    : null;
const playBeep = (freq = 800, ms = 100, vol = 0.1) => {
  if (!ctxOrNull) return;
  const o = ctxOrNull.createOscillator();
  const g = ctxOrNull.createGain();
  o.frequency.value = freq;
  o.type = "sine";
  g.gain.value = vol;
  o.connect(g);
  g.connect(ctxOrNull.destination);
  o.start();
  setTimeout(() => o.stop(), ms);
};

// --- Main Component -----------------------------------------
export default function WasteSortingGame() {
  const BIN_DEFS = gamesData.WasteSortingGame.data.BIN_DEFS;

  const ITEM_POOL = gamesData.WasteSortingGame.data.ITEM_POOL;

  const LEVELS = gamesData.WasteSortingGame.data.LEVELS;

  const navigate = useNavigate();
  const [levelIndex, setLevelIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(LEVELS[0].lives);
  const [timeLeft, setTimeLeft] = useState(LEVELS[0].duration);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(
    () => localStorage.getItem("wastegame_muted") === "1"
  );
  const [highScore, setHighScore] = useState(() =>
    Number(localStorage.getItem("wastegame_highscore") || 0)
  );
  const timerRef = useRef(null);

  const level = LEVELS[levelIndex] ?? LEVELS[LEVELS.length - 1];
  const bins = useMemo(
    () => BIN_DEFS.filter((b) => level.bins.includes(b.key)),
    [level]
  );

  const generateQueue = (n = 18) => {
    const pool = ITEM_POOL.filter((i) => level.bins.includes(i.type));
    return Array.from({ length: n }, () => ({ ...rand(pool), id: uid() }));
  };

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setLives(level.lives);
    setTimeLeft(level.duration);
    const q = generateQueue(level.target + 8);
    setItems(q);
    setActiveItem(q[0] ?? null);
    setPlaying(true);
  };

  const stopGame = () => {
    setPlaying(false);
    clearInterval(timerRef.current);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("wastegame_highscore", String(score));
    }
  };

  useEffect(() => {
    if (!playing) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          stopGame();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [playing, levelIndex]);

  const advance = () => {
    setItems((curr) => {
      const [, ...rest] = curr;
      setActiveItem(rest[0] ?? null);
      return rest;
    });
  };

  const handleDrop = (binKey) => {
    if (!activeItem || !playing) return;
    const correct = activeItem.type === binKey;
    if (!muted) playBeep(correct ? 900 : 200, 80, correct ? 0.12 : 0.08);

    if (correct) {
      const newStreak = streak + 1;
      const bonus = Math.floor(newStreak / 5) * 5;
      setScore((s) => s + 10 + bonus);
      setStreak(newStreak);
    } else {
      setStreak(0);
      setLives((h) => {
        const nv = h - 1;
        if (nv <= 0) stopGame();
        return nv;
      });
    }

    setProgress((p) => {
      const np = p + (correct ? 1 : 0);
      if (np >= level.target) {
        if (levelIndex < LEVELS.length - 1) {
          setLevelIndex((i) => i + 1);
          setTimeout(() => startGame(), 250);
        } else {
          stopGame();
        }
      }
      return np;
    });

    advance();
  };

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!playing) setProgress(0);
  }, [playing, levelIndex]);

  const focusedBin = useRef(null);
  const onDragStart = (e) => {
    if (!activeItem) return;
    e.dataTransfer.setData("text/plain", activeItem.id);
    e.dataTransfer.effectAllowed = "move";
  };
  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const pct = clamp(Math.round((progress / level.target) * 100), 0, 100);
  const timePct = clamp(Math.round((timeLeft / level.duration) * 100), 0, 100);

  useEffect(() => {
    localStorage.setItem("wastegame_muted", muted ? "1" : "0");
  }, [muted]);
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-emerald-50 to-cyan-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Sort the Waste ♻
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => setMuted((m) => !m)}
              className="rounded-2xl"
            >
              {muted ? (
                <VolumeX className="w-4 h-4 mr-2" />
              ) : (
                <Volume2 className="w-4 h-4 mr-2" />
              )}
              {muted ? "Muted" : "Sound"}
            </Button>
            <Button
              variant="outline"
              onClick={startGame}
              className="rounded-2xl"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Restart
            </Button>
            <Button
              variant="outline"
              onClick={() => { navigate('/gamesection') }}
              className="rounded-2xl cursor-pointer"
            >
              <Scissors className="w-4 h-4 mr-2" /> Restart
            </Button>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Level</CardTitle>
            </CardHeader>
            <CardContent className="pb-4 text-2xl font-bold">
              {level.level}
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Score</CardTitle>
            </CardHeader>
            <CardContent className="pb-4 text-2xl font-bold">
              {score}
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Lives</CardTitle>
            </CardHeader>
            <CardContent className="pb-4 text-2xl font-bold">
              {"❤".repeat(lives)}
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="py-3">
              <CardTitle className="text-sm">High Score</CardTitle>
            </CardHeader>
            <CardContent className="pb-4 text-2xl font-bold flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              {highScore}
            </CardContent>
          </Card>
        </div>

        {/* Timers / Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          <div className="rounded-2xl bg-white shadow-sm p-3">
            <div className="text-xs font-medium mb-1">
              Time Left: {timeLeft}s
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-3 bg-gradient-to-r from-emerald-400 to-cyan-400"
                style={{ width: `${timePct}%` }}
              />
            </div>
          </div>
          <div className="rounded-2xl bg-white shadow-sm p-3">
            <div className="text-xs font-medium mb-1">
              Level Target: {progress}/{level.target}
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-3 bg-gradient-to-r from-amber-400 to-orange-400"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Playfield */}
        <Card className="rounded-3xl shadow-lg">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="text-sm text-slate-600 mb-1">
                Drag the item into the correct bin
              </div>
              <AnimatePresence>
                {activeItem ? (
                  <motion.div
                    key={activeItem.id}
                    initial={{ scale: 0.8, opacity: 0, y: -10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    draggable
                    onDragStart={onDragStart}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key.toLowerCase() === "m") setMuted((m) => !m);
                      if (e.key === "1" && bins[0]) handleDrop(bins[0].key);
                      if (e.key === "2" && bins[1]) handleDrop(bins[1].key);
                      if (e.key === "3" && bins[2]) handleDrop(bins[2].key);
                      if (e.key === "4" && bins[3]) handleDrop(bins[3].key);
                    }}
                    className="select-none cursor-grab active:cursor-grabbing rounded-3xl px-5 py-3 bg-white shadow border text-4xl"
                    aria-grabbed={true}
                    aria-label={`${activeItem.name}, press 1-${bins.length} to drop into a bin`}
                  >
                    <div className="text-center">
                      <div className="text-6xl leading-none">
                        {activeItem.emoji}
                      </div>
                      <div className="text-sm font-medium text-slate-700 mt-1">
                        {activeItem.name}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-slate-500 text-sm">
                    No more items — {playing ? "great job!" : "press Restart"}
                  </div>
                )}
              </AnimatePresence>
              <div className="text-xs text-slate-500 mt-2">
                Quick keys: 1–{bins.length} to drop. M to mute.
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {bins.map((b, idx) => (
                <div
                  key={b.key}
                  onDragOver={onDragOver}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleDrop(b.key);
                  }}
                  tabIndex={0}
                  ref={idx === 0 ? focusedBin : null}
                  className={`rounded-3xl border-2 ${b.color} p-4 md:p-5 flex flex-col items-center justify-between min-h-[150px] outline-none focus:ring-2 focus:ring-emerald-400`}
                  aria-dropeffect="move"
                >
                  <div className="text-5xl mb-2">{b.icon}</div>
                  <div className="text-base md:text-lg font-bold">
                    {b.label}
                  </div>
                  <div className="text-[11px] md:text-xs text-slate-600 mt-1">
                    {b.hint}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-2">
                    Press {idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {!playing && (
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle>How to Play</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-700">
                <p>
                  Drag each waste item into the correct bin. Earn points and
                  build streaks for bonuses. Finish the target before time runs
                  out!
                </p>
                <ul className="list-disc ml-5">
                  <li>Levels add more bins and reduce lives.</li>
                  <li>
                    Keyboard: 1–4 to drop into bins, M to mute, Restart anytime.
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle>Start Game</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  size="lg"
                  className="rounded-2xl w-full"
                  onClick={startGame}
                >
                  Start Level {level.level}
                </Button>
                <div className="text-xs text-slate-500 mt-2">
                  Target: {level.target} correct | Time: {level.duration}s |
                  Lives: {level.lives}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {!playing && score > 0 && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6 rounded-3xl bg-white p-5 shadow text-center"
            >
              <div className="text-lg font-bold">Session Score: {score}</div>
              <div className="text-sm text-slate-600">
                High Score: {highScore}
              </div>
              <div className="mt-3">
                <Button className="rounded-2xl" onClick={startGame}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        <footer className="text-center text-[11px] text-slate-500 mt-8">
          Pro tip: Use this inside your MERN app. Post results to your Express
          API on game over for school leaderboards.
        </footer>
      </div>
    </div>
  );
}
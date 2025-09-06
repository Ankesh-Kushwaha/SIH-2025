import React, { useState, useEffect, useRef } from "react";
import gamesData from "@/data/GameModuleData";
import { Cross, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ITEMS = gamesData.wasteSegregation.data.ITEMS;
const BINS = gamesData.wasteSegregation.data.BINS;


export default function DragAndDropWasteGame() {
  const [shuffled, setShuffled] = useState(() => shuffleArray(ITEMS));
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [placed, setPlaced] = useState({});
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState("Drag an item to the correct bin!");
  const [progress, setProgress] = useState(0);
  const audioCtxRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setProgress(
      Object.keys(placed).length / Math.min(shuffled.length, level * 4)
    );
  }, [placed, shuffled, level]);

  useEffect(() => {
    // reset for new level
    if (Object.keys(placed).length >= Math.min(shuffled.length, level * 4)) {
      const timeout = setTimeout(() => {
        setLevel((l) => l + 1);
        setMessage("Great job! Level up!");
        setPlaced({});
        setShuffled((prev) => shuffleArray(prev));
      }, 900);
      return () => clearTimeout(timeout);
    }
  }, [placed, level, shuffled]);

  useEffect(() => {
    // init WebAudio for sound effects
    try {
      audioCtxRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    } catch (e) {
      audioCtxRef.current = null;
      throw new Error(e);
    }
  }, []);

  function playTone(freq = 440, duration = 0.12) {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = freq;
    g.gain.value = 0.08;
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    setTimeout(() => {
      o.stop();
    }, duration * 1000);
  }

  function onDragStart(e, item) {
    e.dataTransfer.setData("text/plain", item.id);
    e.dataTransfer.effectAllowed = "move";
  }

  function onDrop(e, binId) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const item = shuffled.find((it) => it.id === id);
    if (!item) return;
    if (placed[id]) return; // already placed

    if (item.type === binId) {
      // correct
      setPlaced((p) => ({ ...p, [id]: binId }));
      setScore((s) => s + 10);
      setMessage(`Nice! ${item.label} -> ${binId}`);
      playTone(880, 0.12);
    } else {
      // incorrect
      setLives((l) => l - 1);
      setMessage(`Oops — ${item.label} doesn't belong in ${binId}`);
      playTone(240, 0.18);
    }
  }

  function onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function resetGame() {
    setShuffled(shuffleArray(ITEMS));
    setScore(0);
    setLives(3);
    setPlaced({});
    setLevel(1);
    setMessage("Ready? Drag an item to the correct bin!");
  }

  const visibleItems = shuffled.slice(0, Math.min(shuffled.length, level * 4));

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-green-50">
      <div className="w-full max-w-5xl bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: game board */}
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🐢</div>
              <div>
                <h2 className="text-xl font-semibold">
                  Turtly — Waste Sorting Trainer
                </h2>
                <p className="text-sm text-gray-600">
                  Level {level} • Score {score} • Lives {lives}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={resetGame}
                className="px-3 py-1 rounded-full bg-red-500 text-white text-sm shadow"
              >
                Restart
              </button>

              <button
                onClick={()=>{navigate('/gamesection')}}
                className="px-3 py-1 flex flex-row justify-center rounded-full bg-red-500 text-white text-sm shadow cursor-pointer"
              >
                exit game
                <X className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  setMessage(
                    "Tip: drag items into bins. Wrong drop - lose a life."
                  );
                }}
                className="px-3 py-1 rounded-full bg-indigo-600 text-white text-sm shadow"
              >
                Tip
              </button>
            </div>
          </div>

          <div className="rounded-xl p-4 border border-dashed border-gray-200 bg-white">
            <p className="mb-3 text-gray-700">{message}</p>

            <div className="flex gap-4 flex-wrap mb-6">
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  draggable={!placed[item.id] && lives > 0}
                  onDragStart={(e) => onDragStart(e, item)}
                  className={`flex items-center gap-3 p-3 rounded-lg shadow-sm cursor-move select-none ${
                    placed[item.id] ? "opacity-40 line-through" : "bg-white"
                  }`}
                  style={{ minWidth: 180 }}
                >
                  <div className="text-2xl">{item.emoji}</div>
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500">
                      {typeToText(item.type)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {BINS.map((bin) => (
                <div
                  key={bin.id}
                  onDrop={(e) => onDrop(e, bin.id)}
                  onDragOver={onDragOver}
                  className={`rounded-xl p-4 h-36 flex flex-col justify-between border ${bin.color} border-gray-300 shadow cursor-pointer`}
                >
                  <div>
                    <div className="font-semibold">{bin.title}</div>
                    <div className="text-xs text-gray-700">{bin.hint}</div>
                  </div>

                  <div className="text-sm text-gray-700">Drop here</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: stats & progress */}
        <div className="col-span-1 flex flex-col gap-4">
          <div className="rounded-xl p-4 bg-white shadow">
            <h3 className="font-semibold">Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-3 overflow-hidden">
              <div
                className="h-3 rounded-full bg-indigo-500 transition-all"
                style={{
                  width: `${Math.min(100, Math.round(progress * 100))}%`,
                }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {Math.round(progress * 100)}% this level
            </p>
          </div>

          <div className="rounded-xl p-4 bg-white shadow flex-1 flex flex-col gap-3">
            <h3 className="font-semibold">Scoreboard</h3>
            <div className="flex justify-between text-sm text-gray-700">
              <div>Score</div>
              <div className="font-medium">{score}</div>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <div>Lives</div>
              <div className="font-medium">{lives}</div>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <div>Level</div>
              <div className="font-medium">{level}</div>
            </div>

            <div className="mt-auto">
              <button
                onClick={() => {
                  navigator.vibrate && navigator.vibrate(60);
                  setMessage("Good luck!");
                }}
                className="w-full py-2 rounded-full bg-green-500 text-white font-semibold"
              >
                Give me a Challenge
              </button>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-white shadow text-sm text-gray-700">
            <h3 className="font-semibold mb-2">How to use</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Drag the items on the left</li>
              <li>Drop into the correct bin</li>
              <li>Correct: +10 points. Wrong: -1 life.</li>
              <li>Finish to level up. Have fun!</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Game over overlay */}
      {lives <= 0 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md text-center">
            <div className="text-6xl">😓</div>
            <h3 className="text-xl font-semibold mt-3">Game over!</h3>
            <p className="text-gray-600 mt-2">Score: {score}</p>
            <div className="mt-4 flex gap-3 justify-center">
              <button
                onClick={resetGame}
                className="px-4 py-2 rounded-full bg-indigo-600 text-white"
              >
                Play again
              </button>
              <button
                onClick={() => {
                  setLives(1);
                  setMessage("You got one more life!");
                }}
                className="px-4 py-2 rounded-full bg-gray-200"
              >
                Cheat +1
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------- Helpers -----------------

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function typeToText(t) {
  switch (t) {
    case "recyclable":
      return "Recyclable item";
    case "organic":
      return "Compostable / Organic waste";
    case "ewaste":
      return "Electronics / Batteries";
    default:
      return "General waste";
  }
}

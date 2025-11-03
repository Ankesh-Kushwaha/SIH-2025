/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Star,
  CheckCircle,
  HelpCircle,
  ListChecks,
  Group,
  Gamepad2,
} from "lucide-react";

export default function Features() {
  const [xp, setXp] = useState(4200);
  const [points, setPoints] = useState(240);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Segregate 15 virtual items", completed: false, xp: 15 },
    { id: 2, title: "Attend Waste Sorting Quiz", completed: false, xp: 80 },
    { id: 3, title: "Plant a seed (Report)", completed: false, xp: 120 },
  ]);

  const [quizzes] = useState([
    { id: 1, title: "Waste Sorting 101", questions: 3, difficulty: "Medium" },
    {
      id: 2,
      title: "Plastic-Free Week Quiz",
      questions: 5,
      difficulty: "Easy",
    },
  ]);

  const [games] = useState([
    { id: 1, title: "Eco Match 3", reward: 50, difficulty: "Easy" },
    { id: 2, title: "Recycle Runner", reward: 100, difficulty: "Medium" },
    {
      id: 3,
      title: "Carbon Footprint Challenge",
      reward: 150,
      difficulty: "Hard",
    },
  ]);

  const [communityDrives] = useState([
    { id: 1, title: "Campus Clean-up", organizers: 5, impact: "High" },
    { id: 2, title: "Plastic-Free Week", organizers: 3, impact: "Medium" },
    { id: 3, title: "Tree Planting", organizers: 8, impact: "High" },
  ]);

  const xpLevel = useMemo(() => Math.floor(xp / 1000), [xp]);
  const progressPct = Math.round(((xp % 1000) / 1000) * 100);

  function completeTask(id) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id && !t.completed) {
          setXp((x) => x + t.xp);
          setPoints((p) => p + Math.round(t.xp / 10));
          return { ...t, completed: true };
        }
        return t;
      })
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen font-[Poppins] text-gray-100">
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          Gamified Eco Dashboard
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* XP Progress */}
            <motion.div
              className="rounded-2xl p-6 shadow-2xl bg-gradient-to-br from-teal-500 to-blue-600 text-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">Level {xpLevel}</h3>
                  <p className="text-sm opacity-90">{points} points</p>
                </div>
                <div className="text-2xl font-bold">{xp} XP</div>
              </div>
              <div className="mt-4 w-full bg-white/30 h-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-300 rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-xs mt-2 opacity-80">
                {progressPct}% to next level
              </p>
            </motion.div>

            {/* Tasks */}
            <motion.div
              className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4 text-yellow-400">
                <ListChecks className="w-6 h-6" />
                <h3 className="text-xl font-bold">Daily Tasks</h3>
              </div>
              <div className="space-y-4">
                {tasks.map((t) => (
                  <div
                    key={t.id}
                    className="flex justify-between items-center bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition"
                  >
                    <div>
                      <div className="font-semibold">{t.title}</div>
                      <div className="text-sm text-yellow-400">{t.xp} XP</div>
                    </div>
                    <button
                      onClick={() => completeTask(t.id)}
                      disabled={t.completed}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                        t.completed
                          ? "bg-gray-500 text-gray-200 cursor-not-allowed"
                          : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                      }`}
                    >
                      {t.completed ? "Completed" : "Start"}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quizzes */}
            <motion.div
              className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="flex items-center gap-2 mb-4 text-blue-400">
                <HelpCircle className="w-6 h-6" />
                <h3 className="text-xl font-bold">Quizzes</h3>
              </div>
              <div className="space-y-3">
                {quizzes.map((q) => (
                  <div
                    key={q.id}
                    className="bg-gray-700 p-3 rounded-lg flex justify-between items-center hover:bg-gray-600 transition"
                  >
                    <div>
                      <div className="font-semibold">{q.title}</div>
                      <div className="text-xs text-gray-300">
                        {q.questions} questions • {q.difficulty}
                      </div>
                    </div>
                    <button className="bg-blue-400 text-gray-900 px-3 py-1 rounded-lg font-semibold hover:bg-blue-500">
                      Start
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Games */}
            <motion.div
              className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
            >
              <div className="flex items-center gap-2 mb-4 text-green-400">
                <Gamepad2 className="w-6 h-6" />
                <h3 className="text-xl font-bold">Eco Games</h3>
              </div>
              <div className="space-y-3">
                {games.map((g) => (
                  <div
                    key={g.id}
                    className="bg-gray-700 p-3 rounded-lg flex justify-between items-center hover:bg-gray-600 transition"
                  >
                    <div>
                      <div className="font-semibold">{g.title}</div>
                      <div className="text-xs text-gray-300">
                        {g.difficulty} • Reward: {g.reward} XP
                      </div>
                    </div>
                    <button className="bg-green-400 text-gray-900 px-3 py-1 rounded-lg font-semibold hover:bg-green-500">
                      Play
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Community Drives */}
            <motion.div
              className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4 text-purple-400">
                <Group className="w-6 h-6" />
                <h3 className="text-xl font-bold">Community Drives</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {communityDrives.map((d) => (
                  <div
                    key={d.id}
                    className="p-4 rounded-lg text-center bg-purple-700 hover:bg-purple-600 transition"
                  >
                    <div className="font-semibold text-white">{d.title}</div>
                    <div className="text-sm text-gray-300">
                      Organizers: {d.organizers}
                    </div>
                    <div
                      className={`text-sm font-bold mt-1 ${
                        d.impact === "High" ? "text-red-400" : "text-yellow-400"
                      }`}
                    >
                      Impact: {d.impact}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-8">
            <motion.div
              className="bg-gradient-to-br from-yellow-400 to-orange-500 p-5 rounded-2xl shadow-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Quick Actions
              </h3>
              <div className="flex flex-col gap-3">
                <button className="bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
                  Open Quiz
                </button>
                <button className="bg-yellow-500 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
                  Assign Task
                </button>
                <button className="bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition">
                  Start Drive
                </button>
                <button className="bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition">
                  Play Game
                </button>
              </div>
            </motion.div>
          </aside>
        </div>
      </main>
    </div>
  );
}

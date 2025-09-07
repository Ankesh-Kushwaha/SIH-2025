import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function EchoVerseFeatures() {
  const [xp, setXp] = useState(4200);
  const [points, setPoints] = useState(240);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Segregate 10 virtual items", completed: false, xp: 50 },
    { id: 2, title: "Attend Waste Sorting Quiz", completed: false, xp: 80 },
    { id: 3, title: "Plant a seed (report) 🎋", completed: false, xp: 120 },
  ]);

  const [communityDrives] = useState([
    { id: 1, title: "Campus Clean-up", organizers: 12, impact: "High" },
    { id: 2, title: "Plastic-Free Week", organizers: 6, impact: "Medium" },
    { id: 3, title: "Tree Planting", organizers: 4, impact: "High" },
  ]);

  const [isAdmin, setIsAdmin] = useState(true);

  const [quizForm, setQuizForm] = useState({
    title: "",
    questions: 3,
    difficulty: "Medium",
  });
  const [quizzes, setQuizzes] = useState([]);

  const xpLevel = useMemo(() => Math.floor(xp / 1000), [xp]);

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

  function generateQuiz(e) {
    e.preventDefault();
    const newQuiz = {
      id: Date.now(),
      ...quizForm,
      createdAt: new Date().toISOString(),
    };
    setQuizzes((q) => [newQuiz, ...q]);
    setQuizForm({ title: "", questions: 3, difficulty: "Medium" });
  }

  return (
    <section className="mx-auto max-w-7xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-extrabold text-gray-800">
          Admin{" "}
          <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            Dashboard
          </span>
        </h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-bold text-lg text-amber-500">+{points} Points</p>
            <p className="text-sm text-gray-500">Admin Action</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            A
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quiz Builder */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-8 bg-white rounded-2xl shadow-lg border border-blue-100"
          >
            <div className="flex items-center space-x-6">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-2xl shadow-md">
                <span className="material-icons text-5xl text-blue-500">
                  extension
                </span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Engaging Quiz Builder
                </h2>
                <p className="text-gray-600 text-lg">
                  Craft interactive quizzes with our playful drag & drop
                  builder.
                </p>
              </div>
            </div>

            {isAdmin && (
              <div className="mt-6">
                <form onSubmit={generateQuiz} className="space-y-3">
                  <input
                    placeholder="Quiz title (e.g. Waste Sorting 101)"
                    value={quizForm.title}
                    onChange={(e) =>
                      setQuizForm((s) => ({ ...s, title: e.target.value }))
                    }
                    className="w-full rounded-md border px-3 py-2"
                  />
                  <div className="flex gap-3">
                    <input
                      type="number"
                      min={1}
                      value={quizForm.questions}
                      onChange={(e) =>
                        setQuizForm((s) => ({
                          ...s,
                          questions: Number(e.target.value),
                        }))
                      }
                      className="w-24 rounded-md border px-3 py-2"
                    />
                    <select
                      value={quizForm.difficulty}
                      onChange={(e) =>
                        setQuizForm((s) => ({
                          ...s,
                          difficulty: e.target.value,
                        }))
                      }
                      className="rounded-md border px-3 py-2"
                    >
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                    <button className="ml-auto rounded-md px-4 py-2 bg-green-500 hover:bg-green-600 text-white">
                      Generate
                    </button>
                  </div>
                </form>

                <div className="mt-4 space-y-2">
                  {quizzes.length === 0 ? (
                    <p className="text-sm text-gray-400">
                      No quizzes yet — generate one to preview behavior.
                    </p>
                  ) : (
                    quizzes.map((q) => (
                      <div
                        key={q.id}
                        className="text-sm rounded-md border p-2 bg-blue-50"
                      >
                        <div className="font-semibold">
                          {q.title || "Untitled quiz"}
                        </div>
                        <div className="text-xs">
                          {q.questions} questions • {q.difficulty}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* Daily Task Journey */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-8 bg-white rounded-2xl shadow-lg border border-green-100"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="material-icons text-4xl mr-3 text-green-500">
                map
              </span>
              Daily Task Journey
            </h2>
            <div className="flex flex-col gap-4">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between rounded-xl border p-3 bg-blue-50"
                >
                  <div>
                    <div className="font-medium">{t.title}</div>
                    <div className="text-xs text-gray-500">
                      Reward: {t.xp} XP
                    </div>
                  </div>
                  <button
                    onClick={() => completeTask(t.id)}
                    disabled={t.completed}
                    className={`rounded-lg px-4 py-2 font-medium ${
                      t.completed
                        ? "bg-gray-300"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    {t.completed ? "Completed" : "Complete"}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Community Drives */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-8 bg-white rounded-2xl shadow-lg border border-yellow-100"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="material-icons text-4xl mr-3 text-pink-500">
                military_tech
              </span>
              Community Drives
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {communityDrives.map((d) => (
                <div key={d.id} className="rounded-lg border p-3 bg-yellow-50">
                  <div className="font-semibold">{d.title}</div>
                  <div className="text-xs text-gray-600">
                    Organizers: {d.organizers}
                  </div>
                  <div className="text-xs">Impact: {d.impact}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* User Progress */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-8 bg-white rounded-2xl shadow-lg border border-blue-100 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              User Progress
            </h2>
            <div className="relative inline-block mb-4">
              <div className="w-40 h-40 bg-gradient-to-br from-green-300 to-blue-300 rounded-full flex flex-col items-center justify-center shadow-lg">
                <span className="text-5xl font-extrabold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  {xpLevel}
                </span>
                <span className="font-bold text-gray-700">Eco-Warrior</span>
              </div>
            </div>
            <p className="text-lg font-semibold text-gray-700">
              <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent font-bold">
                {points} / 400 pts
              </span>
            </p>
            <div className="bg-blue-100 rounded-full h-5 mt-4 relative overflow-hidden">
              <div
                className="bg-green-500 h-5 text-xs text-center font-bold text-white"
                style={{ width: `${Math.min((xp % 1000) / 10, 100)}%` }}
              >
                {Math.round(((xp % 1000) / 1000) * 100)}%
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-8 bg-white rounded-2xl shadow-lg border border-blue-100"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Quick Power-Ups
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-yellow-300 rounded-xl font-bold text-gray-900 shadow-md hover:scale-105 transition">
                Create Quiz
              </button>
              <button className="p-4 bg-green-300 rounded-xl font-bold text-gray-900 shadow-md hover:scale-105 transition">
                Assign Task
              </button>
              <button className="p-4 bg-blue-300 rounded-xl font-bold text-gray-900 shadow-md hover:scale-105 transition">
                Start Drive
              </button>
              <button className="p-4 bg-pink-300 rounded-xl font-bold text-gray-900 shadow-md hover:scale-105 transition">
                Give Reward
              </button>
            </div>
          </motion.div>

          {/* Why EchoVerse */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-8 bg-blue-50 rounded-2xl shadow-lg border border-blue-200"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why EchoVerse?
            </h2>
            <p className="text-blue-800 text-lg font-medium">
              We turn learning into an exciting adventure, empowering students
              to make a real-world impact!
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

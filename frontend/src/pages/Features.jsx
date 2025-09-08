import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function Features() {
  const [xp, setXp] = useState(4200);
  const [points, setPoints] = useState(240);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Segregate 15 virtual items", completed: false, xp: 15 },
    { id: 2, title: "Attend Waste Sorting Quiz", completed: false, xp: 80 },
    { id: 3, title: "Plant a seed (Report)", completed: false, xp: 120 },
  ]);

  const [communityDrives] = useState([
    { id: 1, title: "Campus Clean-up", organizers: 5, impact: "High" },
    { id: 2, title: "Plastic-Free Week", organizers: 3, impact: "Medium" },
    { id: 3, title: "Tree Planting", organizers: 8, impact: "High" },
  ]);

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

  const progressPct = Math.round(((xp % 1000) / 1000) * 100);

  return (
    <div className="bg-gray-50 text-gray-800 font-[Poppins]">
      {/* Main container */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">
            EcoVerse Features Dashboard
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Explore the tools to build a greener future, together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left main column (spans 2) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quiz card */}
            <motion.section
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-200"
            >
              <div className="flex items-start space-x-4">
                <span className="material-icons text-3xl text-blue-500">
                  quiz
                </span>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Engaging Quiz Builder
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Design highly-engaging, customizable questions and reward
                    learners.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-gray-700">
                Admins generate quizzes with multiple question types (MCQ,
                True/False, Image-based). Quizzes can be assigned to classes or
                groups and automatically grade to award XP and points.
              </p>

              <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-200">
                <form onSubmit={generateQuiz} className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Quiz title (e.g. Waste Sorting 101)
                  </label>
                  <input
                    value={quizForm.title}
                    onChange={(e) =>
                      setQuizForm({ ...quizForm, title: e.target.value })
                    }
                    placeholder="Quiz title (e.g. Waste Sorting 101)"
                    className="mt-1 block w-full rounded-lg border-gray-300 p-3 bg-white"
                  />

                  <div className="flex gap-3 items-center">
                    <select
                      value={quizForm.questions}
                      onChange={(e) =>
                        setQuizForm({
                          ...quizForm,
                          questions: Number(e.target.value),
                        })
                      }
                      className="rounded-lg border-gray-300 p-2 bg-white"
                    >
                      <option value={3}>3 Questions</option>
                      <option value={5}>5 Questions</option>
                      <option value={10}>10 Questions</option>
                    </select>

                    <select
                      value={quizForm.difficulty}
                      onChange={(e) =>
                        setQuizForm({ ...quizForm, difficulty: e.target.value })
                      }
                      className="rounded-lg border-gray-300 p-2 bg-white"
                    >
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>

                    <button className="ml-auto w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      Generate
                    </button>
                  </div>

                  <p className="text-xs text-gray-500">
                    {quizzes.length === 0
                      ? "No quizzes yet — generate to preview below."
                      : `${quizzes.length} quizzes`}
                  </p>
                </form>

                {quizzes.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {quizzes.map((q) => (
                      <div
                        key={q.id}
                        className="rounded-md border p-2 bg-white"
                      >
                        <div className="font-semibold">{q.title}</div>
                        <div className="text-xs text-gray-500">
                          {q.questions} questions • {q.difficulty}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.section>

            {/* Tasks card */}
            <motion.section
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-200"
            >
              <div className="flex items-start space-x-4">
                <span className="material-icons text-3xl text-yellow-500">
                  task_alt
                </span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Daily Task Dashboard
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Assign short daily micro-tasks and reward completion with XP
                    points.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {tasks.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between bg-yellow-50 p-4 rounded-lg border border-yellow-200"
                  >
                    <div>
                      <div className="font-medium text-gray-900">{t.title}</div>
                      <div className="text-sm text-yellow-600">
                        Reward: {t.xp} XP
                      </div>
                    </div>
                    <button
                      onClick={() => completeTask(t.id)}
                      disabled={t.completed}
                      className={`px-4 py-2 rounded-lg font-medium text-sm ${
                        t.completed
                          ? "bg-gray-300"
                          : "bg-yellow-500 text-white hover:bg-yellow-600"
                      }`}
                    >
                      {t.completed ? "Completed" : "Start Task"}
                    </button>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Community Drives */}
            <motion.section
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-200"
            >
              <div className="flex items-start space-x-4">
                <span className="material-icons text-3xl text-purple-500">
                  groups
                </span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Community & Institutional Drives
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Create and join drives — track organizers and impact.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {communityDrives.map((d) => (
                  <div
                    key={d.id}
                    className="p-4 rounded-lg text-center border border-purple-200 bg-purple-50"
                  >
                    <div className="font-semibold text-purple-800">
                      {d.title}
                    </div>
                    <div className="text-sm text-gray-600">
                      Organizers: {d.organizers}
                    </div>
                    <div
                      className={`text-sm font-bold ${
                        d.impact === "High" ? "text-red-500" : "text-yellow-500"
                      }`}
                    >
                      Impact: {d.impact}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-8">
            {/* Progress card */}
            <motion.div
              className="rounded-2xl overflow-hidden shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="bg-gradient-to-br from-teal-400 to-blue-500 p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold">Your Progress</h4>
                    <p className="text-sm opacity-90 mt-2">
                      Level {xpLevel} (+{points} pts)
                    </p>
                  </div>
                  <div className="text-xl font-bold">{xp} XP</div>
                </div>

                <div className="mt-4">
                  <div className="w-full bg-white/25 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <div className="text-xs mt-3 opacity-90">
                    <span className="font-bold">{xp} XP</span> — {progressPct}%
                    to next level
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick actions */}
            <motion.div className="bg-white rounded-2xl p-5 shadow-md border border-gray-200">
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-blue-100 text-blue-700 py-3 rounded-lg font-semibold">
                  Open Quiz
                </button>
                <button className="bg-yellow-100 text-yellow-700 py-3 rounded-lg font-semibold">
                  Assign Task
                </button>
                <button className="col-span-2 bg-purple-500 text-white py-3 rounded-lg font-semibold">
                  Start Drive
                </button>
              </div>
            </motion.div>

            {/* Platform features */}
            <motion.div className="bg-white rounded-2xl p-5 shadow-md border border-gray-200">
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Platform Features
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="material-icons text-emerald-500 mr-2 text-base">
                    check_circle
                  </span>{" "}
                  Role-based access
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-blue-500 mr-2 text-base">
                    check_circle
                  </span>{" "}
                  Quiz scheduling & auto-grading
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-yellow-500 mr-2 text-base">
                    check_circle
                  </span>{" "}
                  Daily micro-tasks with XP
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-purple-500 mr-2 text-base">
                    check_circle
                  </span>{" "}
                  Community drives module
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-teal-500 mr-2 text-base">
                    check_circle
                  </span>{" "}
                  3D visualizations
                </li>
                <li className="flex items-start">
                  <span className="material-icons text-gray-400 mr-2 text-base">
                    check_circle
                  </span>{" "}
                  Export reports (CSV/PDF)
                </li>
              </ul>
            </motion.div>

            {/* Admin control panel */}
            <motion.div className="bg-white rounded-2xl p-5 shadow-md border border-gray-200">
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Admin Control Panel
              </h4>
              <p className="text-gray-600 mt-2">
                Manage campaigns, rewards, and moderate community drives.
              </p>
              <div className="mt-4 flex gap-3">
                <button className="flex-1 bg-emerald-500 text-white py-2 rounded-lg font-semibold">
                  Create Drive
                </button>
                <button className="flex-1 bg-gray-700 text-white py-2 rounded-lg font-semibold">
                  Export Report
                </button>
              </div>
            </motion.div>

            {/* Why EcoVerse */}
            <motion.div className="bg-green-50 border border-green-200 p-5 rounded-2xl shadow-sm">
              <h4 className="text-xl font-bold text-green-800">
                Why EcoVerse?
              </h4>
              <p className="text-green-700 mt-2">
                We combine gamified learning with community impact. Students
                gain points and meaningful experience — motivating real-world
                choices and learning outcomes.
              </p>
            </motion.div>
          </aside>
        </div>
      </main>
    </div>
  );
}

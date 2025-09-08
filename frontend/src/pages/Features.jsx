import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

 newankit/admin
export default function Features() {
// Default export React component for EchoVerse Features section
// - TailwindCSS required
// - framer-motion required
// - Drop into a page (e.g. /components/FeaturesSection.jsx)

export default function EchoVerseFeatures() {
  // mock state (replace with real API calls)
 main
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

 newankit/admin

  const [isAdmin, setIsAdmin] = useState(true); // flip to preview as teacher/admin

  // Quiz generator form state (simulated main
  const [quizForm, setQuizForm] = useState({
    title: "",
    questions: 3,
    difficulty: "Medium",
  });
  const [quizzes, setQuizzes] = useState([]);
 newankit/admin
  const xpLevel = useMemo(() => Math.floor(xp / 1000), [xp]);


  const xpLevel = useMemo(() => {
    // Simple level calc: every 1000 xp == level
    return Math.floor(xp / 1000);
  }, [xp]);
 main

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
    // reset small
    setQuizForm({ title: "", questions: 3, difficulty: "Medium" });
  }

  const progressPct = Math.round(((xp % 1000) / 1000) * 100);

  return (
 newankit/admin
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

    <section className="mx-auto max-w-7xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold tracking-tight">
          EchoVerse — Features Dashboard
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">Preview mode:</div>
          <button
            onClick={() => setIsAdmin((v) => !v)}
            className="px-3 py-1 rounded-full border shadow-sm text-sm"
          >
            {isAdmin ? "Admin/Teacher" : "Student"}
          </button>
 main
        </div>

 newankit/admin
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: 3D style feature cards */}
        <div className="space-y-6">
          <FeatureCard
            title="Engaging Quiz Builder"
            subtitle="Teachers / Admins can create quizzes, randomize questions and schedule tests."
            icon="🧠"
            accent="bg-emerald-50"
          >
            <p className="text-sm leading-relaxed">
              Admins generate quizzes with multiple question types (MCQ,
              True/False, Image-based). Quizzes can be assigned to classes or
              groups and automatically grade to update XP and points.
            </p>
            {isAdmin && (
              <div className="mt-4">
                <form onSubmit={generateQuiz} className="space-y-2">
                  <input
                    aria-label="Quiz title"
                    placeholder="Quiz title (e.g. Waste Sorting 101)" main
                    value={quizForm.title}
                    onChange={(e) =>
                      setQuizForm({ ...quizForm, title: e.target.value })
                    }
                    placeholder="Quiz title (e.g. Waste Sorting 101)"
                    className="mt-1 block w-full rounded-lg border-gray-300 p-3 bg-white"
                  />
 newankit/admin

                  <div className="flex gap-3 items-center">
                    <select

                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={1}
 main
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
 newankit/admin

                    <button className="ml-auto w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">

                    <button className="ml-auto rounded-md px-4 py-2 bg-emerald-600 text-white">
 main
                      Generate
                    </button>
                  </div>

                  <p className="text-xs text-gray-500">
                    {quizzes.length === 0
                      ? "No quizzes yet — generate to preview below."
                      : `${quizzes.length} quizzes`}
                  </p>
                </form>

 newankit/admin
                {quizzes.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {quizzes.map((q) => (
                      <div
                        key={q.id}
                        className="rounded-md border p-2 bg-white"

                <div className="mt-3 space-y-2">
                  {quizzes.length === 0 ? (
                    <div className="text-xs text-muted-foreground">
                      No quizzes yet — generate one to preview behavior.
                    </div>
                  ) : (
                    quizzes.map((q) => (
                      <div
                        key={q.id}
                        className="text-sm rounded-md border p-2 bg-white/60"
 main
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
 newankit/admin

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
            )}
          </FeatureCard>

          <FeatureCard
            title="Daily Task Dashboard"
            subtitle="Assign short daily micro-tasks and reward completion with XP & points."
            icon="✅"
            accent="bg-sky-50"
          >
            <div className="space-y-3">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between rounded-lg border p-3 bg-white/60"
                >
                  <div>
                    <div className="font-medium">{t.title}</div>
                    <div className="text-xs text-muted-foreground">
                      Reward: {t.xp} XP
 main
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
 newankit/admin
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

                  <div className="flex items-center gap-2">
                    <div className="text-sm">
                      {t.completed ? "Completed" : "Pending"}
                    </div>
                    <button
                      onClick={() => completeTask(t.id)}
                      disabled={t.completed}
                      className="rounded-md px-3 py-1 border"
                    >
                      {t.completed ? "✔" : "Complete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </FeatureCard>

          <FeatureCard
            title="Community & Institutional Drives"
            subtitle="Create and join drives — track organizers and impact."
            icon="🌱"
            accent="bg-yellow-50"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {communityDrives.map((d) => (
                <div key={d.id} className="rounded-lg border p-3 bg-white/60">
                  <div className="font-semibold">{d.title}</div>
                  <div className="text-xs text-muted-foreground">
                    Organizers: {d.organizers}
 main
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
 newankit/admin

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

              ))}
            </div>
          </FeatureCard>
        </div>

        {/* Middle column: 3D simulation + XP panel */}
        <div className="col-span-1 lg:col-span-1">
          <div className="rounded-2xl border p-4 shadow-2xl bg-gradient-to-b from-white/60 to-white/40">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">
                User Progress (Simulated 3‑D)
              </h3>
              <div className="text-sm">
                Level {xpLevel} • {points} pts
              </div>
            </div>

            <div className="relative h-64">
              {/* Simulated 3D isometric bar chart made with skewed divs */}
              <IsoGraph xp={xp} />
            </div>

            <div className="mt-4">
              <div className="text-xs text-muted-foreground">XP</div>
              <div className="mt-1 h-3 w-full rounded-full border overflow-hidden bg-white/30">
                <div
                  style={{ width: `${Math.min((xp % 1000) / 10, 100)}%` }}
                  className="h-full rounded-full bg-emerald-500/80 transition-all"
                />
              </div>
              <div className="mt-2 text-sm">
                {xp} XP — Progress to next level:{" "}
                {Math.round(((xp % 1000) / 1000) * 100)}%
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border p-4 shadow bg-white/50">
            <h4 className="font-semibold mb-3">Quick Actions</h4>
            <div className="flex gap-2">
              <button className="flex-1 rounded-md border px-4 py-2">
                Open Quiz
              </button>
              <button className="flex-1 rounded-md border px-4 py-2">
                Assign Task
              </button>
              <button className="flex-1 rounded-md border px-4 py-2">
                Start Drive
              </button>
            </div>
          </div>
        </div>

        {/* Right column: feature highlights & admin panel */}
        <div className="space-y-6">
          <div className="rounded-2xl border p-4 shadow bg-white/60">
            <h4 className="font-semibold">Platform Features</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>• Role-based access (Admin, Teacher, Student)</li>
              <li>• Quiz scheduling & auto grading</li>
              <li>• Daily micro-tasks with XP & leaderboard</li>
              <li>• Community drives module with impact tracking</li>
              <li>• 3-D style visualizations and interactive cards</li>
              <li>• Export reports (CSV / PDF) and class analytics</li>
            </ul>
          </div>

          {isAdmin && (
            <div className="rounded-2xl border p-4 shadow bg-white/60">
              <h4 className="font-semibold">Admin Control Panel (Preview)</h4>
              <div className="mt-3 space-y-3">
                <div className="text-sm">
                  Create campaigns, set rewards, and moderate community drives.
                </div>
                <div className="flex gap-2">
                  <button className="rounded-md px-3 py-2 border">
                    Create Drive
                  </button>
                  <button className="rounded-md px-3 py-2 border">
                    Export Report
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-2xl border p-4 shadow bg-white/60">
            <h4 className="font-semibold">Why EchoVerse?</h4>
            <p className="text-sm mt-2">
              We combine gamified learning with community impact. Students gain
              points and meaningful experience — institutes track real-world
              drives and learning outcomes.
            </p>
          </div>
 main
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ title, subtitle, children, icon, accent = "bg-white" }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className={`rounded-2xl p-4 border shadow-lg ${accent} bg-white/40`}
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl">{icon}</div>
        <div>
          <div className="font-semibold text-lg">{title}</div>
          <div className="text-xs text-muted-foreground">{subtitle}</div>
        </div>
      </div>

      <div className="mt-3">{children}</div>

      {/* A simple 3D tilt effect on hover (CSS) */}
      <style jsx>{`
        .tilt-sim:hover {
          transform: perspective(800px) rotateX(3deg) rotateY(-6deg);
        }
      `}</style>
    </motion.div>
  );
}

function IsoGraph({ xp = 0 }) {
  // create several bars with depths to simulate 3D bars
  const bars = [120, 230, 150, 300, Math.min(340, xp / 4)];
  return (
    <div className="absolute inset-0 flex items-end justify-center">
      <div className="flex items-end gap-3 transform -rotate-6">
        {bars.map((h, i) => (
          <div key={i} className="relative">
            {/* top face */}
            <div
              style={{ height: `${h / 4}px`, width: 60 }}
              className="rounded-t-md border-b-2 border-emerald-900/10 overflow-hidden"
            >
              <div className="h-full flex items-end justify-center text-xs font-semibold pb-1">
                {Math.round(h)} XP
              </div>
            </div>
            {/* depth shadow to create isometric illusion */}
            <div
              style={{ height: `${h / 12}px`, width: 60 }}
              className="transform translate-y-[-6px] translate-x-3 skew-x-12 rounded-b-md opacity-70 bg-emerald-600/40"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

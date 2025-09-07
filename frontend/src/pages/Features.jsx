import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

// Default export React component for EchoVerse Features section
// - TailwindCSS required
// - framer-motion required
// - Drop into a page (e.g. /components/FeaturesSection.jsx)

export default function EchoVerseFeatures() {
  // mock state (replace with real API calls)
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

  const [isAdmin, setIsAdmin] = useState(true); // flip to preview as teacher/admin

  // Quiz generator form state (simulated)
  const [quizForm, setQuizForm] = useState({
    title: "",
    questions: 3,
    difficulty: "Medium",
  });
  const [quizzes, setQuizzes] = useState([]);

  const xpLevel = useMemo(() => {
    // Simple level calc: every 1000 xp == level
    return Math.floor(xp / 1000);
  }, [xp]);

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

  return (
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
        </div>
      </div>

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
                    placeholder="Quiz title (e.g. Waste Sorting 101)"
                    value={quizForm.title}
                    onChange={(e) =>
                      setQuizForm((s) => ({ ...s, title: e.target.value }))
                    }
                    className="w-full rounded-md border px-3 py-2"
                  />
                  <div className="flex gap-2">
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
                    <button className="ml-auto rounded-md px-4 py-2 bg-emerald-600 text-white">
                      Generate
                    </button>
                  </div>
                </form>

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
                    </div>
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
                  </div>
                  <div className="text-xs">Impact: {d.impact}</div>
                </div>
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
        </div>
      </div>
    </section>
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

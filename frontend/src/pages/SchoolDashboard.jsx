import React, { useEffect } from "react";
import {
  FaTree,
  FaTrashAlt,
  FaRecycle,
  FaUsers,
  FaBookOpen,
  FaCheckCircle,
  FaBell,
  FaDownload,
  FaPlus,
  FaTrophy,
  FaGamepad,
  FaAward,
  FaSchool,
} from "react-icons/fa";

export default function SchoolDashboard() {
  // inject Google fonts (Space Grotesk + Noto Sans) if not already added
  useEffect(() => {
    const id = "echoverse-google-fonts";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Noto+Sans:wght@400;500;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div
      className="bg-gray-50 min-h-screen w-full overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      {/* component-scoped CSS (keeps parity with your HTML styles) */}
      <style>{`
        :root{--primary-color:#1ce36c;--secondary-color:#f0fdf4;--text-primary:#111814;--text-secondary:#4b5563;--border-color:#e5e7eb}
        .eco-points-bar{transition:width 1s ease-in-out}
        .badge{transition:transform .5s cubic-bezier(.68,-.55,.27,1.55),opacity .5s;transform:scale(0);opacity:0}
        .badge-revealed{transform:scale(1);opacity:1}
        .leaderboard-item{transition:all .45s ease-in-out}
        .leaderboard-item:hover{transform:translateX(8px);background-color:var(--secondary-color)}
        .chart-bar{transition:all .28s ease-in-out}
        .chart-bar:hover{transform:translateY(-4px);filter:brightness(1.06)}
        .achievement-toast{animation:toast-in-out 5s forwards}
        @keyframes toast-in-out{0%{transform:translateY(100%);opacity:0}10%{transform:translateY(0);opacity:1}90%{transform:translateY(0);opacity:1}100%{transform:translateY(100%);opacity:0}}
      `}</style>

      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[var(--border-color)] bg-white px-10 py-4">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">
          School Dashboard
        </h2>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 rounded-lg bg-[var(--primary-color)] px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-green-600">
            <FaPlus />
            <span>Add Class</span>
          </button>

          <button className="flex w-10 h-10 items-center justify-center rounded-full bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200">
            <FaBell />
          </button>

          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCzOEu4oRKBt0vYYv_32nim5LEVGbI8QorfX_nsRSGByyEWMGokFy9URgtqC72TuFJ-wOQHhNmZiT4wbUNCoXxvzZcIvGB9WK73hEDUTOaAovMabnChgqrmdHu0S70W4bm1q9qQqvnGIR8biOIF2v8I9s_NLaRYRqCZtDT8FoTU5p7cWvPe0chBmW_T5qg5rOLvQHEv07JzJsDC1AOBcwHsQ4viCicStKC-vjcVjSedgTM4n9ScOxIpXEfWUD5T3p-Y-uPgweyvPZI')",
            }}
            aria-hidden
          />
        </div>
      </header>

      <div className="flex">
        {/* LEFT: Leaderboards */}
        <aside className="w-96 border-r border-[var(--border-color)] bg-white p-6">
          <div className="flex flex-col gap-8">
            <section>
              <h3 className="text-[var(--text-primary)] text-xl font-bold mb-4">
                School Leaderboard
              </h3>
              <div className="space-y-6">
                {/* <div className="rounded-xl border border-[var(--border-color)] bg-white p-6 shadow-sm">
                  <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                    Top Classes
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-4 p-2 rounded-lg leaderboard-item">
                      <div className="flex w-8 h-8 items-center justify-center rounded-full bg-yellow-400 text-white">
                        <FaTrophy />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[var(--text-primary)]">
                          Grade 7 Math
                        </p>
                        <p className="text-sm text-[var(--text-secondary)]">
                          Mr. Bennett
                        </p>
                      </div>
                      <p className="font-bold text-lg text-[var(--text-primary)]">
                        820 pts
                      </p>
                    </li>

                    <li className="flex items-center gap-4 p-2 rounded-lg leaderboard-item">
                      <div className="flex w-8 h-8 items-center justify-center rounded-full bg-gray-300 text-white">
                        <FaTrophy />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[var(--text-primary)]">
                          Grade 8 History
                        </p>
                        <p className="text-sm text-[var(--text-secondary)]">
                          Ms. Carter
                        </p>
                      </div>
                      <p className="font-bold text-lg text-[var(--text-primary)]">
                        780 pts
                      </p>
                    </li>

                    <li className="flex items-center gap-4 p-2 rounded-lg leaderboard-item">
                      <div className="flex w-8 h-8 items-center justify-center rounded-full bg-yellow-600 text-white">
                        <FaTrophy />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[var(--text-primary)]">
                          Grade 6 Science
                        </p>
                        <p className="text-sm text-[var(--text-secondary)]">
                          Ms. Harper
                        </p>
                      </div>
                      <p className="font-bold text-lg text-[var(--text-primary)]">
                        750 pts
                      </p>
                    </li>
                  </ul>
                </div> */}

                <div className="rounded-xl border border-[var(--border-color)] bg-white p-6 shadow-sm">
                  <h4 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                    Top Students
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-4 p-2 rounded-lg leaderboard-item">
                      <div className="flex w-8 h-8 items-center justify-center rounded-full bg-yellow-400 text-white">
                        <FaTrophy />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[var(--text-primary)]">
                          Noah Carter
                        </p>
                        <p className="text-sm text-[var(--text-secondary)]">
                          Grade 8
                        </p>
                      </div>
                      <p className="font-bold text-lg text-[var(--text-primary)]">
                        920 pts
                      </p>
                    </li>

                    <li className="flex items-center gap-4 p-2 rounded-lg leaderboard-item">
                      <div className="flex w-8 h-8 items-center justify-center rounded-full bg-gray-300 text-white">
                        <FaTrophy />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[var(--text-primary)]">
                          Ethan Walker
                        </p>
                        <p className="text-sm text-[var(--text-secondary)]">
                          Grade 6
                        </p>
                      </div>
                      <p className="font-bold text-lg text-[var(--text-primary)]">
                        850 pts
                      </p>
                    </li>

                    <li className="flex items-center gap-4 p-2 rounded-lg leaderboard-item">
                      <div className="flex w-8 h-8 items-center justify-center rounded-full bg-yellow-600 text-white">
                        <FaTrophy />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[var(--text-primary)]">
                          Olivia Hayes
                        </p>
                        <p className="text-sm text-[var(--text-secondary)]">
                          Grade 7
                        </p>
                      </div>
                      <p className="font-bold text-lg text-[var(--text-primary)]">
                        780 pts
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-[var(--text-primary)] text-xl font-bold mb-4">
                Regional Leaderboard
              </h3>
              <div className="rounded-xl border border-[var(--border-color)] bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-[var(--text-primary)]">
                    Top Schools
                  </h4>
                  <a
                    className="text-sm font-medium text-[var(--primary-color)] hover:underline"
                    href="#"
                  >
                    View All
                  </a>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 p-4 rounded-lg bg-green-50 border border-green-200 leaderboard-item">
                    <div className="text-2xl font-bold text-green-600">#1</div>
                    <div className="flex-1">
                      <p className="font-bold text-[var(--text-primary)]">
                        Crestwood High School (You)
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Westwood Region
                      </p>
                    </div>
                    <p className="font-bold text-xl text-green-600">
                      125,000 pts
                    </p>
                  </li>

                  <li className="flex items-center gap-4 p-2 rounded-lg leaderboard-item">
                    <div className="text-xl font-bold text-gray-500">#2</div>
                    <div className="flex-1">
                      <p className="font-medium text-[var(--text-primary)]">
                        Northwood Academy
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Westwood Region
                      </p>
                    </div>
                    <p className="font-bold text-lg text-[var(--text-primary)]">
                      118,500 pts
                    </p>
                  </li>

                  <li className="flex items-center gap-4 p-2 rounded-lg leaderboard-item">
                    <div className="text-xl font-bold text-gray-500">#3</div>
                    <div className="flex-1">
                      <p className="font-medium text-[var(--text-primary)]">
                        Riverdale Middle School
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Westwood Region
                      </p>
                    </div>
                    <p className="font-bold text-lg text-[var(--text-primary)]">
                      112,300 pts
                    </p>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </aside>

        {/* CENTER: Main content (metrics, stats) */}
        <main className="flex-1 p-10">
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[var(--text-primary)] text-3xl font-bold">
                Welcome to your Dashboard!
              </p>
              <p className="text-[var(--text-secondary)] text-base mt-2 max-w-3xl">
                Here's a snapshot of EchoVerse's performance. Monitor school
                metrics, track student progress, and get insights into our
                gamified learning.
              </p>
            </div>

            {/* Eco-Impact Metrics */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[var(--text-primary)] text-xl font-bold">
                  Eco-Impact Metrics
                </h3>
                <button className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] bg-white px-4 py-2 text-sm font-medium text-[var(--text-primary)] shadow-sm hover:bg-gray-50">
                  <FaDownload />
                  <span>Download Report</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col gap-4 rounded-xl p-6 bg-white border border-[var(--border-color)] shadow-sm chart-bar">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl text-green-500">
                      <FaTree />
                    </div>
                    <div>
                      <p className="text-base font-medium text-[var(--text-secondary)]">
                        Trees Planted
                      </p>
                      <p className="text-3xl font-bold text-[var(--text-primary)]">
                        1,250
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">
                    Equal to reforesting a small park! 🌳
                  </p>
                </div>

                <div className="flex flex-col gap-4 rounded-xl p-6 bg-white border border-[var(--border-color)] shadow-sm chart-bar">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl text-blue-500">
                      <FaTrashAlt />
                    </div>
                    <div>
                      <p className="text-base font-medium text-[var(--text-secondary)]">
                        Waste Reduced
                      </p>
                      <p className="text-3xl font-bold text-[var(--text-primary)]">
                        50 kg
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">
                    That's the weight of 100 basketballs!
                  </p>
                </div>

                <div className="flex flex-col gap-4 rounded-xl p-6 bg-white border border-[var(--border-color)] shadow-sm chart-bar">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl text-yellow-500">
                      <FaRecycle />
                    </div>
                    <div>
                      <p className="text-base font-medium text-[var(--text-secondary)]">
                        Recycling Impact
                      </p>
                      <p className="text-3xl font-bold text-[var(--text-primary)]">
                        200 kg
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">
                    Saved enough energy to power a home for a week!
                  </p>
                </div>
              </div>
            </section>

            {/* Stats */}
            <section>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-[var(--border-color)] shadow-sm chart-bar">
                  <p className="text-base font-medium text-[var(--text-secondary)]">
                    Total Students
                  </p>
                  <p className="text-3xl font-bold text-[var(--text-primary)]">
                    450
                  </p>
                  <p className="text-sm font-medium text-green-600">
                    +10% from last month
                  </p>
                </div>

                <div className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-[var(--border-color)] shadow-sm chart-bar">
                  <p className="text-base font-medium text-[var(--text-secondary)]">
                    Active Classes
                  </p>
                  <p className="text-3xl font-bold text-[var(--text-primary)]">
                    25
                  </p>
                  <p className="text-sm font-medium text-green-600">
                    +5% from last month
                  </p>
                </div>

                <div className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-[var(--border-color)] shadow-sm chart-bar">
                  <p className="text-base font-medium text-[var(--text-secondary)]">
                    Completed Activities
                  </p>
                  <p className="text-3xl font-bold text-[var(--text-primary)]">
                    1200
                  </p>
                  <p className="text-sm font-medium text-green-600">
                    +15% from last month
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* RIGHT: Sidebar (Eco-Points, Achievements, Insights) */}
        <aside className="w-80 border-l border-[var(--border-color)] bg-white p-6">
          <div className="flex h-full flex-col gap-8">
            <section>
              <h3 className="text-xl font-bold text-gray-900">
                Eco-Points Accumulation
              </h3>
              <div className="mt-4 space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
                    <span>Total Eco-Points</span>
                    <span className="font-bold text-[var(--primary-color)]">
                      12,500 / 20,000
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full eco-points-bar"
                      style={{ width: "62.5%" }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    Next reward at 20,000 points!
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900">
                Recent Achievements
              </h3>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="flex w-14 h-14 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 badge badge-revealed">
                    <FaAward className="text-2xl" />
                  </div>
                  <p className="text-xs font-medium text-gray-800 text-center">
                    First Quiz
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="flex w-14 h-14 items-center justify-center rounded-full bg-purple-100 text-purple-600 badge badge-revealed">
                    <FaTrophy className="text-2xl" />
                  </div>
                  <p className="text-xs font-medium text-gray-800 text-center">
                    1k Points
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="flex w-14 h-14 items-center justify-center rounded-full bg-red-100 text-red-600 badge badge-revealed">
                    <FaCheckCircle className="text-2xl" />
                  </div>
                  <p className="text-xs font-medium text-gray-800 text-center">
                    Top Scorer
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="flex w-14 h-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 badge badge-revealed">
                    <FaGamepad className="text-2xl" />
                  </div>
                  <p className="text-xs font-medium text-gray-800 text-center">
                    Eco-Warrior
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="flex w-14 h-14 items-center justify-center rounded-full bg-green-100 text-green-600 badge badge-revealed">
                    <FaRecycle className="text-2xl" />
                  </div>
                  <p className="text-xs font-medium text-gray-800 text-center">
                    Recycle Pro
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="flex w-14 h-14 items-center justify-center rounded-full bg-orange-100 text-orange-600 badge badge-revealed">
                    <FaSchool className="text-2xl" />
                  </div>
                  <p className="text-xs font-medium text-gray-800 text-center">
                    Class Act
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-[var(--text-primary)] text-xl font-bold leading-tight tracking-[-0.015em] mb-4">
                Gamified Learning Insights
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl border border-blue-200 bg-blue-50 chart-bar cursor-pointer group">
                  <div className="text-3xl text-blue-500">
                    <FaGamepad />
                  </div>
                  <div>
                    <p className="font-bold text-blue-800">
                      Most Engaging Game
                    </p>
                    <p className="text-sm text-blue-700">
                      "Recycle Rush" played 500+ times!
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl border border-purple-200 bg-purple-50 chart-bar cursor-pointer group">
                  <div className="text-3xl text-purple-500">
                    <FaAward />
                  </div>
                  <div>
                    <p className="font-bold text-purple-800">
                      Top Badge Earned
                    </p>
                    <p className="text-sm text-purple-700">
                      "Eco-Warrior" badge is the most popular!
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </aside>
      </div>

      {/* Floating toasts */}
      <div className="fixed bottom-5 right-5 flex flex-col items-end gap-3 z-50">
        <div className="flex items-start gap-4 rounded-lg bg-green-50 p-4 shadow-lg w-80 achievement-toast">
          <div className="mt-1 text-3xl text-green-600 animate-pulse">
            <FaTrophy />
          </div>
          <div>
            <p className="font-semibold text-green-800">New Milestone!</p>
            <p className="text-sm text-green-700">
              Your class crossed 10,000 eco-points!
            </p>
          </div>
        </div>

        <div
          className="flex items-start gap-4 rounded-lg bg-blue-50 p-4 shadow-lg w-80 achievement-toast"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="mt-1 text-3xl text-blue-600 animate-bounce">
            <FaAward />
          </div>
          <div>
            <p className="font-semibold text-blue-800">Achievement Unlocked</p>
            <p className="text-sm text-blue-700">
              Grade 7 Math is Top Scorer of the Week!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

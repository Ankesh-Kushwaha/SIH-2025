/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [ecoPoints, setEcoPoints] = useState(1250);
  const [badges, setBadges] = useState(7);
  const [showPointAnimation, setShowPointAnimation] = useState(false);
  const [showBadgeAnimation, setShowBadgeAnimation] = useState(false);

  // Simulate eco-points increment effect
  const handleAddPoints = (points) => {
    setEcoPoints((prev) => prev + points);
    setShowPointAnimation(true);
    const pointSound = document.getElementById("point-sound");
    if (pointSound) pointSound.play();
    setTimeout(() => setShowPointAnimation(false), 1000);
  };

  // Simulate badge unlocking effect
  const handleAddBadge = () => {
    setBadges((prev) => prev + 1);
    setShowBadgeAnimation(true);
    const badgeSound = document.getElementById("badge-sound");
    if (badgeSound) badgeSound.play();
    setTimeout(() => setShowBadgeAnimation(false), 800);
  };

  useEffect(() => {
    // Demo: auto-trigger animations when dashboard mounts
    setTimeout(() => handleAddPoints(10), 2000);
    setTimeout(() => handleAddBadge(), 4000);
  }, []);

  return (
    <div
      className="relative flex size-full min-h-screen flex-col overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="flex h-full grow flex-col">
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-80 bg-white p-6 shadow-xl hidden lg:flex flex-col justify-between rounded-r-3xl">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="relative group">
                  <img
                    alt="Priya Sharma"
                    className="w-32 h-32 rounded-full border-4 border-emerald-400 shadow-lg transition-transform duration-300 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1_g9R2U_dYw24578M9zRk8p7B6i4K4Z9L6f_E5yJ6S7C8V9A1W-pA-bQ5B4E3R2c1D9F8E7T6wG5I4K3l-x_Z7M8wN_J0uH-qXnI5O6pT7r8E9F1gH0i-J1k2l3b4n_V5o6pT7r8E9F1gH0i-J1k2l3b4n=s128-c"
                  />
                  <div className="absolute bottom-0 right-0 bg-amber-400 text-white font-bold rounded-full px-3 py-1 text-sm border-2 border-white shadow-md">
                    Lv. 5
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-gray-900 text-xl font-bold">
                    Priya Sharma
                  </h1>
                  <p className="text-gray-500 text-sm">Eco-Warrior</p>
                </div>
              </div>
              <nav className="flex flex-col gap-2">
                {[
                  "Dashboard",
                  "Challenges",
                  "Lessons",
                  "Leaderboard",
                  "Profile",
                ].map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                      index === 0
                        ? "bg-emerald-400 text-white font-semibold shadow-md hover:bg-emerald-500"
                        : "hover:bg-emerald-50 text-gray-700 font-medium"
                    } transition-all duration-300`}
                  >
                    <span className="material-symbols-outlined">
                      {index === 0
                        ? "home"
                        : index === 1
                        ? "emoji_events"
                        : index === 2
                        ? "book"
                        : index === 3
                        ? "leaderboard"
                        : "person"}
                    </span>
                    <span>{item}</span>
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex flex-col gap-4">
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 py-3 text-gray-700 font-medium hover:bg-red-100 hover:text-red-600 transition-colors duration-300">
                <span className="material-symbols-outlined">logout</span>
                Logout
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main
            className="flex-1 p-4 md:p-8 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://www.gstatic.com/earth/social/facebook_share_image_1200x630.jpg')",
              backgroundBlendMode: "overlay",
              backgroundColor: "rgba(240, 253, 244, 0.85)",
            }}
          >
            <div className="max-w-7xl mx-auto">
              {/* Welcome Section */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 drop-shadow-sm">
                    Welcome back, Priya!
                  </h1>
                  <p className="text-emerald-700 mt-2 text-lg">
                    Ready for a new eco-adventure?
                  </p>
                </div>
                <div className="flex gap-4 relative">
                  {/* Eco Points Card */}
                  <motion.div
                    onClick={() => handleAddPoints(10)}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-2 rounded-2xl p-4 bg-white/80 backdrop-blur-sm shadow-lg border border-emerald-200 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-4xl text-amber-500">
                      spark
                    </span>
                    <p className="text-emerald-900 text-3xl font-bold">
                      {ecoPoints}
                    </p>
                    <p className="text-gray-600 text-sm font-medium">
                      Eco-Points
                    </p>
                    {showPointAnimation && (
                      <div className="absolute -top-4 text-green-500 font-bold animate-points">
                        +10
                      </div>
                    )}
                  </motion.div>

                  {/* Badges Card */}
                  <motion.div
                    onClick={handleAddBadge}
                    whileHover={{ scale: 1.05 }}
                    className={`flex flex-col items-center gap-2 rounded-2xl p-4 bg-white/80 backdrop-blur-sm shadow-lg border border-emerald-200 cursor-pointer ${
                      showBadgeAnimation ? "animate-badge" : ""
                    }`}
                  >
                    <span className="material-symbols-outlined text-4xl text-amber-500">
                      military_tech
                    </span>
                    <p className="text-emerald-900 text-3xl font-bold">
                      {badges}
                    </p>
                    <p className="text-gray-600 text-sm font-medium">
                      Badges Earned
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Progression Path */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-emerald-200 mb-8 progression-path">
                <h2 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center gap-3">
                  <span className="material-symbols-outlined text-3xl text-amber-500">
                    footprint
                  </span>
                  Your Progression Path
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="text-center">
                    <img
                      alt="Sapling Avatar"
                      className="w-24 h-24 rounded-full mx-auto"
                      src="https://lh3.googleusercontent.com/a/ACg8ocKk9jZ8Y8z8Q8z8Q8z8Q8z8Q8z8Q8z8Q8z8Q8z8Q8z8Q8z8Q8z8Q8z8=s128-c-mo"
                    />
                    <p className="font-bold text-emerald-700 mt-2">Sapling</p>
                  </div>
                  <div className="flex-1 w-full">
                    <div className="w-full bg-emerald-100 rounded-full h-6 border-2 border-emerald-200 shadow-inner">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-md"
                        style={{ width: "60%" }}
                      >
                        60%
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-emerald-600 mt-2 px-1">
                      <span>1000 pts</span>
                      <span className="font-semibold">
                        Next Level: Young Tree
                      </span>
                      <span>2000 pts</span>
                    </div>
                  </div>
                  <div className="text-center opacity-50">
                    <img
                      alt="Young Tree Avatar"
                      className="w-24 h-24 rounded-full mx-auto"
                      src="https://lh3.googleusercontent.com/a/ACg8ocJk9jZ8Y8z8Q8z8Q8z8Q8z8Q8z8Q8z8Q8z8Q8z8Q8z8Q8z8Q8z8Q8z8=s128-c-mo"
                    />
                    <p className="font-bold text-emerald-700 mt-2">
                      Young Tree
                    </p>
                  </div>
                </div>
              </div>

              {/* Lessons Section */}
              <div>
                <h2 className="text-3xl font-bold text-emerald-800 mb-6 drop-shadow-sm">
                  New Adventures Await!
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Tree Planting Workshop",
                      points: 50,
                      image:
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuBznSKVrHkRXmmnlpp-kK1XKr17NMaDNPZZfxMUW2Dm8syIK5VANN4DxELkdYXcAuVjqFo3_XwAQw3az3-y7zA0sYcikRyalpDH0pm5syK8V5VnMxzT3dkZSnV81vwrs--MD9s4b-0czIkYKoU65qMM2CwOR-IZQgtfJ3vGJIJFh7beVRuGhoLO9vHF-jV8-aXxR2dwHrsVPJxHUWeHHCHQorlJoMKu1nb8ivZFgoOoDNw-0Lxi-z4dQwyZYfgjJcqocJRAYJGHyEg",
                    },
                    {
                      title: "Renewable Energy Basics",
                      points: 75,
                      image:
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuA5XT9m0Qw_fYXvSJruA7vxVW6GS5BKMjnWoAZBtlFkx9W8XxwtcDthv0TQfsPD8iRj_kddEsr8o_bJNhL7qHy0SlyYCVNwK8H5h3g78FtJFyMv17OqCaAsI06J1XT5MlOsCA0xGYVkMT4PcjaneC83LxL4m1YLwzaLRF3GUERduaW2qLFCvPolNdGAZaIwKDZP5gG1qPCuEpBsGa8iZ99VSS2M0YDqkHGqaPHK-ys_Nsxt70HsLLSyoA2VKi5Iz8bSi3aDd3f-dbA",
                    },
                    {
                      title: "Waste Management 101",
                      points: 60,
                      image:
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuCBq7T1G-SI2Xb7QpHVmXcu_eZ6P6nx9sE7navIIQQ-tUHbQ7Bly-7rpYO4COtOn2_YQ3LFKOmaDuxOML-sf6j0OLHwIBHWtVucJlgg3udHNwEb08hS2KNTckWzQ07OETlziqR1sKZtFElC4o_BnVuDfHyUB6UG49_cf2lWYmUk1kBCugxemwCXiqf7kjL4dl_SIPLKyYLNqxZzLRKtW5YCpujAOZVRgSaWQWkRwxro0LTj2PPOGGQDxVEuT5JrAteJeuLEz2XLic4",
                    },
                  ].map((lesson, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      className="flex flex-col gap-4 rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                    >
                      <div className="w-full h-48 bg-center bg-no-repeat bg-cover relative">
                        <img
                          alt={lesson.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          src={lesson.image}
                        />
                        <div className="absolute top-3 right-3 bg-amber-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                          +{lesson.points} Eco-Points
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-gray-900 text-lg font-bold mb-2">
                          {lesson.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 flex-grow">
                          Learn and explore sustainable practices.
                        </p>
                        <button className="mt-auto w-full rounded-lg bg-emerald-500 text-white py-2.5 font-bold hover:bg-emerald-600 transition-colors duration-300 transform hover:scale-105">
                          Start Lesson
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Challenges Section */}
              <div className="mt-10">
                <h2 className="text-3xl font-bold text-emerald-800 mb-6 drop-shadow-sm">
                  Team Up for Challenges!
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Community Clean-Up Drive",
                      desc: "Join us for a local park clean-up event.",
                      image:
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuAELgu0UxqybKBueLElEfOaploEiUnkG2HHzlEhD7-zHPsKL157TYI1jUNln3GOovZ8aPYhA6XphiasQ7d7EaablGIU-VjS75i80ahQNgtXeqH6jTpgMErnQhiJuWW5SyY8swq5pUz8_NwB88YiddkyYguPOTfVo30SUwWHhG8gk-S9coAl4tCLJo_aSOYm1X96mkzkrZJ8e1m4vC6aUVT5qqeiajmBYhCTGohuFbzpPTbA6yCi8eg7dYBY6PuUe4FU261K_u-BebM",
                    },
                    {
                      title: "Energy Efficiency Challenge",
                      desc: "Reduce your energy consumption at home.",
                      image:
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuDAEhO8pscoEmrHzea2JvZS8zrhWniK_te51Py3z512fMzGKJNtur_T7JTlw2G05IpZwRdw-gVbLpJrEzwwMN9CfREKXWC7BWcujr17YRzM1S0IOuNGw75nw0-fl8XdExHe8fdrjmZ8pV55Rlv0phbRFocEAVj_iHYZb_E5DubA6Snhm_15d7WsIKt8R-7gw43d8jGJGnX6O_AxbnzYD5hTHO7-MWf2OQ2P_ztqpERNNn48A8pCyExubZWKBSoKbwbMkjB02NXTrqA",
                    },
                  ].map((challenge, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-emerald-200 hover:border-amber-400 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          alt="Challenge Icon"
                          className="w-16 h-16"
                          src={challenge.image}
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900">
                            {challenge.title}
                          </h3>
                          <p className="text-gray-600 mt-1">{challenge.desc}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-full md:w-auto">
                        <button className="w-full md:w-auto rounded-lg bg-amber-400 text-white px-6 py-3 font-bold hover:bg-amber-500 transition-all duration-300 transform hover:scale-105 shadow-md">
                          Join Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Sounds */}
      <audio
        id="point-sound"
        preload="auto"
        src="https://www.soundjay.com/buttons/sounds/button-3.mp3"
      ></audio>
      <audio
        id="badge-sound"
        preload="auto"
        src="https://www.soundjay.com/misc/sounds/magic-chime-01.mp3"
      ></audio>
    </div>
  );
};

export default Dashboard;

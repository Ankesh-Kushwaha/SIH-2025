import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Crown,
  Award,
  PlayCircle,
  Star,
  Flame,
  Leaf,
  Droplets,
  TreePine,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const COLORS = ["#FFD700", "#4ADE80", "#60A5FA", "#F472B6", "#A78BFA"];

// Mock Player Data
const samplePlayers = [
  {
    id: 1,
    name: "Aarav",
    score: 980,
    ecoPoints: 450,
    carbonSaved: 25,
    xp: 780,
    badges: ["🌍 Earth Hero", "♻️ Waste Warrior"],
    rank: 1,
  },
  {
    id: 2,
    name: "Ishita",
    score: 940,
    ecoPoints: 400,
    carbonSaved: 22,
    xp: 620,
    badges: ["💧 Water Saver"],
    rank: 2,
  },
  {
    id: 3,
    name: "Kabir",
    score: 900,
    ecoPoints: 380,
    carbonSaved: 18,
    xp: 540,
    badges: ["🌱 Tree Guardian"],
    rank: 3,
  },
  {
    id: 4,
    name: "Meera",
    score: 860,
    ecoPoints: 360,
    carbonSaved: 15,
    xp: 420,
    badges: ["♻️ Waste Warrior"],
    rank: 4,
  },
  {
    id: 5,
    name: "Rhea",
    score: 820,
    ecoPoints: 340,
    carbonSaved: 12,
    xp: 310,
    badges: [],
    rank: 5,
  },
];

// Mock Game Modules
const gameModules = [
  {
    id: 1,
    title: "Recycle Rush",
    desc: "Sort waste in time!",
    icon: <Leaf className="text-green-500" />,
  },
  {
    id: 2,
    title: "Water Warrior",
    desc: "Save water daily.",
    icon: <Droplets className="text-blue-400" />,
  },
  {
    id: 3,
    title: "Tree Tycoon",
    desc: "Plant & grow virtual trees.",
    icon: <TreePine className="text-emerald-600" />,
  },
  {
    id: 4,
    title: "Energy Saver",
    desc: "Switch off & save power.",
    icon: <Flame className="text-orange-500" />,
  },
];

// Function to calculate level from XP
const getLevel = (xp) => {
  if (xp >= 700) return 5;
  if (xp >= 500) return 4;
  if (xp >= 300) return 3;
  if (xp >= 150) return 2;
  return 1;
};

const EcoDashboard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    setPlayers(samplePlayers);
  }, []);

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-gray-900 via-green-900 to-black text-white font-['Poppins'] space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <h1 className="text-5xl font-extrabold flex justify-center items-center gap-3 text-green-400 drop-shadow-lg">
          <Crown className="w-10 h-10 text-yellow-400" />
          Planet Guardians Hub
        </h1>
        <p className="text-gray-300 text-lg">
          Play • Compete • Save the Planet 🌍
        </p>
      </motion.div>

      {/* Leaderboard */}
      <div>
        <h2 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center gap-2">
          <Award className="w-6 h-6" /> Leaderboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player, i) => (
            <motion.div
              key={player.id}
              whileHover={{ scale: 1.05, rotate: -1 }}
              className={`p-6 rounded-2xl shadow-2xl border transform transition-all
                ${
                  i === 0
                    ? "bg-yellow-500/20 border-yellow-400"
                    : "bg-white/10 border-gray-700"
                }
              `}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg
                      ${
                        i === 0
                          ? "bg-yellow-400"
                          : i === 1
                          ? "bg-gray-400"
                          : i === 2
                          ? "bg-amber-600"
                          : "bg-green-500"
                      }
                    `}
                  >
                    {player.name[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{player.name}</h3>
                    <p className="text-sm text-gray-300">Rank #{player.rank}</p>
                  </div>
                </div>
                <Crown className="w-6 h-6 text-yellow-400" />
              </div>

              {/* Score Progress */}
              <div className="mt-4">
                <p className="text-sm text-gray-400">Eco Score</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-400 h-2 rounded-full"
                    style={{ width: `${(player.score / 1000) * 100}%` }}
                  ></div>
                </div>
                <p className="text-lg font-bold mt-1">{player.score} pts</p>
              </div>

              {/* XP Progress */}
              <div className="mt-3">
                <p className="text-sm text-gray-400">
                  Level {getLevel(player.xp)}
                </p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-indigo-400 h-2 rounded-full"
                    style={{ width: `${((player.xp % 200) / 200) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-1">{player.xp} XP</p>
              </div>

              {/* Badges */}
              {player.badges.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {player.badges.map((badge, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.2 }}
                      className="px-3 py-1 rounded-full bg-green-600 text-sm shadow-md"
                    >
                      {badge}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Game Modules */}
      <div>
        <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2">
          <PlayCircle className="w-6 h-6" /> Quests & Games
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gameModules.map((game) => (
            <motion.div
              key={game.id}
              whileHover={{ scale: 1.08, rotate: 1 }}
              className="p-6 rounded-2xl bg-white/10 border border-green-700 shadow-lg text-center space-y-3"
            >
              <div className="flex justify-center">{game.icon}</div>
              <h3 className="text-lg font-bold">{game.title}</h3>
              <p className="text-sm text-gray-300">{game.desc}</p>
              <Button className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                Play Now
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Eco Impact Stats */}
      <div>
        <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
          <Activity className="w-6 h-6" /> Eco Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="bg-white/10 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Top Eco Actions</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={players}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#bbb" />
                <YAxis stroke="#bbb" />
                <Tooltip />
                <Bar dataKey="ecoPoints" fill="#4ADE80" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white/10 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Carbon Saved</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={players}
                  dataKey="carbonSaved"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {players.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-6 bg-green-700 rounded-2xl shadow-lg text-center"
      >
        <h2 className="text-2xl font-bold flex justify-center items-center gap-2">
          <Star className="w-6 h-6 text-yellow-300" /> Daily Challenge: Save 2L
          Water Today
        </h2>
        <p className="mt-2 text-sm text-green-100">
          Complete this mission and earn bonus EcoPoints 🌱
        </p>
      </motion.div>
    </div>
  );
};

export default EcoDashboard;

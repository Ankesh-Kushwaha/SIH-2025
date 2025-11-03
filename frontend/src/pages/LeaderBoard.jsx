import React, { useState, useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
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
  Search,
  Filter,
  X,
  Medal,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const COLORS = ["#FFD700", "#4ADE80", "#60A5FA", "#F472B6", "#A78BFA"];
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Game modules
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


const getLevel = (xp) => {
  if (xp >= 700) return 5;
  if (xp >= 500) return 4;
  if (xp >= 300) return 3;
  if (xp >= 150) return 2;
  return 1;
};

const EcoDashboard = () => {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [levelUpPlayer, setLevelUpPlayer] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchTopPlayers = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/ecopoints/top-performer`
        );
        if (res.data && res.data.success && Array.isArray(res.data.topUser)) {
          const apiPlayers = res.data.topUser.map((user, index) => ({
            id: user._id,
            name: user.name || "Unknown",
            score: user.ecoPoints || 0,
            ecoPoints: user.ecoPoints || 0,
            carbonSaved: Math.floor(Math.random() * 30), // dummy data
            xp: Math.floor(Math.random() * 800), // dummy XP
            badges: user.badges || [],
            rank: index + 1,
          }));
          setPlayers(apiPlayers);
        } else {
          console.error("Unexpected API response:", res.data);
          
        }
      } catch (error) {
        console.error("Error fetching top players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPlayers();
  }, []);

  const filteredPlayers = players
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b[sortBy] - a[sortBy]);

  const top3 = filteredPlayers.slice(0, 3);
  const rest = filteredPlayers.slice(3);


  const handleLevelCheck = (player) => {
    const currentLevel = getLevel(player.xp);
    if (currentLevel > getLevel(player.xp - 50)) {
      setLevelUpPlayer(player);
      setTimeout(() => setLevelUpPlayer(null), 3000);
    }
  };

  const milestones = [
    { level: 1, xp: 0, title: "Getting Started" },
    { level: 2, xp: 150, title: "Eco Explorer" },
    { level: 3, xp: 300, title: "Planet Protector" },
    { level: 4, xp: 500, title: "Green Guardian" },
    { level: 5, xp: 700, title: "Earth Hero" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-2xl font-bold">
        🌱 Loading Eco Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-gray-900 via-green-900 to-black text-white font-['Poppins'] space-y-12 relative">
     

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-white/10 p-2 rounded-xl w-full md:w-1/3">
          <Search className="w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search players..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none text-white placeholder-gray-400 focus:ring-0"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="bg-white/10 border-green-600 text-white w-40">
            <Filter className="w-4 h-4 mr-2" /> Sort By
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="score">Eco Score</SelectItem>
            <SelectItem value="ecoPoints">Eco Points</SelectItem>
            <SelectItem value="carbonSaved">Carbon Saved</SelectItem>
            <SelectItem value="xp">XP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Top Leaders */}
      <div>
        <h2 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center gap-2">
          <Award className="w-6 h-6" /> Top Leaders
        </h2>
        <div className="flex flex-col gap-4 max-w-lg mx-auto">
          {top3.map((player, i) => (
            <motion.div
              key={player.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setSelectedPlayer(player);
                handleLevelCheck(player);
              }}
              className={`cursor-pointer flex items-center gap-4 p-4 rounded-2xl shadow-2xl border text-lg font-bold
                ${
                  i === 0
                    ? "bg-yellow-500/20 border-yellow-400"
                    : i === 1
                    ? "bg-gray-400/20 border-gray-400"
                    : "bg-amber-600/20 border-amber-600"
                }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-black font-bold text-xl ${
                  i === 0
                    ? "bg-yellow-400"
                    : i === 1
                    ? "bg-gray-300"
                    : "bg-amber-500"
                }`}
              >
                {player.name[0]}
              </div>
              <div className="flex-1">
                {player.name}{" "}
                <span className="text-sm text-gray-300 ml-2">
                  (Lvl {getLevel(player.xp)})
                </span>
              </div>
              <span className="text-green-400">{player.score} pts</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* All Players */}
      <div>
        <h2 className="text-2xl font-bold text-green-300 mb-6">All Players</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((player) => (
            <motion.div
              key={player.id}
              whileHover={{ scale: 1.05, rotate: -1 }}
              onClick={() => {
                setSelectedPlayer(player);
                handleLevelCheck(player);
              }}
              className="cursor-pointer p-6 rounded-2xl shadow-2xl border bg-white/10 border-gray-700 hover:border-green-500 hover:bg-green-900/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl bg-green-500">
                  {player.name[0]}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{player.name}</h3>
                  <p className="text-sm text-gray-300">Rank #{player.rank}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-400">Eco Score</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-400 h-2 rounded-full"
                    style={{ width: `${(player.score / 1000) * 10}%` }}
                  ></div>
                </div>
                <p className="text-lg font-bold mt-1">{player.score} pts</p>
              </div>
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
            </motion.div>
          ))}
        </div>
      </div>

      {/* Player Profile Modal */}
      <AnimatePresence>
        {selectedPlayer && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 rounded-3xl p-8 w-full max-w-lg shadow-2xl relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button
                onClick={() => setSelectedPlayer(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-bold">
                  {selectedPlayer.name[0]}
                </div>
                <h2 className="text-2xl font-bold">{selectedPlayer.name}</h2>
                <p className="text-gray-400">Rank #{selectedPlayer.rank}</p>

                <div className="w-full space-y-2">
                  <p>
                    Eco Score:{" "}
                    <span className="text-green-400 font-bold">
                      {selectedPlayer.score}
                    </span>
                  </p>
                  <p>
                    Level:{" "}
                    <span className="text-indigo-400 font-bold">
                      {getLevel(selectedPlayer.xp)}
                    </span>{" "}
                    ({selectedPlayer.xp} XP)
                  </p>
                  <p>
                    Carbon Saved:{" "}
                    <span className="text-blue-400 font-bold">
                      {selectedPlayer.carbonSaved} kg
                    </span>
                  </p>

                  {selectedPlayer.badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedPlayer.badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-green-700 text-sm shadow-md"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Roadmap Progress */}
                <div className="w-full mt-6">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <Flag className="w-5 h-5 text-yellow-400" /> Progress
                    Roadmap
                  </h3>

                  <div className="relative w-full h-2 bg-gray-700 rounded-full">
                    <div
                      className="absolute top-0 left-0 h-2 bg-green-500 rounded-full"
                      style={{ width: `${(selectedPlayer.xp / 700) * 100}%` }}
                    ></div>

                    {milestones.map((ms) => (
                      <div
                        key={ms.level}
                        className="absolute -top-3 flex flex-col items-center"
                        style={{ left: `${(ms.xp / 700) * 100}%` }}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            getLevel(selectedPlayer.xp) >= ms.level
                              ? "bg-green-500 text-white"
                              : "bg-gray-500 text-gray-200"
                          }`}
                        >
                          {ms.level}
                        </div>
                        <span className="text-xs text-gray-300 mt-1">
                          {ms.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level Up Celebration */}
      <AnimatePresence>
        {levelUpPlayer && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="bg-green-600 text-white px-10 py-6 rounded-3xl shadow-2xl text-center flex flex-col items-center gap-3"
            >
              <Medal className="w-12 h-12 text-yellow-300 animate-bounce" />
              <h2 className="text-3xl font-extrabold">Level Up!</h2>
              <p className="text-lg">
                {levelUpPlayer.name} reached Level {getLevel(levelUpPlayer.xp)}{" "}
                🎉
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Eco Impact Stats */}
      <div>
        <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
          <Activity className="w-6 h-6" /> Eco Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Top Eco Actions</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={players}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    borderRadius: "10px",
                  }}
                />
                <Bar dataKey="carbonSaved" fill="#4ADE80" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/10 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Eco Points Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={players}
                  dataKey="ecoPoints"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {players.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Game Modules Section */}
      <div>
        <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-2">
          <PlayCircle className="w-6 h-6" /> Mini Eco Games
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gameModules.map((game) => (
            <motion.div
              key={game.id}
              whileHover={{ scale: 1.05, rotate: -1 }}
              className="p-6 rounded-2xl shadow-lg bg-white/10 hover:bg-pink-900/20 border border-gray-700 hover:border-pink-400 cursor-pointer text-center space-y-3"
            >
              <div className="flex justify-center text-4xl">{game.icon}</div>
              <h3 className="text-xl font-bold text-white">{game.title}</h3>
              <p className="text-gray-300 text-sm">{game.desc}</p>
              <Button className="mt-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-xl">
                Play Now
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcoDashboard;


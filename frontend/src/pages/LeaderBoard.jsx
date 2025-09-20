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
  LineChart,
  Line,
} from "recharts";
import {
  Crown,
  Users,
  School,
  Download,
  Leaf,
  Droplets,
  TreePine,
  TrendingUp,
  PlayCircle,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ---------- Mock Data ----------
const samplePlayers = [
  {
    id: 1,
    name: "Aarav",
    score: 980,
    gamesPlayed: 12,
    ecoPoints: 450,
    carbonSaved: 25,
    engagement: 92,
  },
  {
    id: 2,
    name: "Ishita",
    score: 940,
    gamesPlayed: 10,
    ecoPoints: 400,
    carbonSaved: 22,
    engagement: 88,
  },
  {
    id: 3,
    name: "Kabir",
    score: 900,
    ecoPoints: 380,
    carbonSaved: 18,
    engagement: 82,
  },
  {
    id: 4,
    name: "Meera",
    score: 860,
    gamesPlayed: 8,
    ecoPoints: 360,
    carbonSaved: 15,
    engagement: 78,
  },
  {
    id: 5,
    name: "Rhea",
    score: 820,
    gamesPlayed: 7,
    ecoPoints: 340,
    carbonSaved: 12,
    engagement: 72,
  },
];

const sampleGameImpacts = [
  {
    id: 1,
    game: "Water Wars",
    sessions: 1200,
    waterSavedLiters: 48000,
    avgLearningGain: 0.8,
    treesPlanted: 40000,
  },
  {
    id: 2,
    game: "EcoRacer",
    sessions: 800,
    carbonSaved: 50000,
    treesPlanted: 1200,
    avgLearningGain: 0.52,
  },
  {
    id: 3,
    game: "Zero-Waste Kitchen",
    sessions: 600,
    foodSavedKg: 800,
    carbonReduced: 60,
    avgLearningGain: 0.35,
  },
  {
    id: 4,
    game: "Green Odyssey",
    sessions: 450,
    biodiversityImproved: "15%",
    naturalHabitatEnhanced: 1500,
    avgLearningGain: 0.2,
  },
];

const COLORS = ["#1F9D55", "#16A34A", "#059669", "#10B981", "#34D399"];

const EcoDashboard = () => {
  const [players, setPlayers] = useState([]);
  const [gameImpacts, setGameImpacts] = useState([]);

  useEffect(() => {
    setPlayers(samplePlayers);
    setGameImpacts(sampleGameImpacts);
  }, []);

  const totalSessions = gameImpacts.reduce((s, g) => s + (g.sessions || 0), 0);
  const totalWaterSaved = gameImpacts.reduce(
    (s, g) => s + (g.waterSavedLiters || 0),
    0
  );
  const totalCarbonSaved = players.reduce(
    (s, p) => s + (p.carbonSaved || 0),
    0
  );
  const avgLearningGain =
    gameImpacts.reduce((s, g) => s + (g.avgLearningGain || 0), 0) /
    Math.max(1, gameImpacts.length);

  const engagementTrendData = [
    { name: "Jan", engagement: 420 },
    { name: "Feb", engagement: 400 },
    { name: "Mar", engagement: 380 },
    { name: "Apr", engagement: 390 },
    { name: "May", engagement: 370 },
    { name: "Jun", engagement: 360 },
    { name: "Jul", engagement: 350 },
    { name: "Aug", engagement: 340 },
  ];

  return (
    <div className="p-10 bg-gradient-to-br from-green-50 via-white to-indigo-50 min-h-screen font-['Poppins',sans-serif] space-y-10">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Planet Guardian */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-2xl bg-white/70 backdrop-blur-lg shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" /> Planet Guardian
            </h2>
          </div>
          <p className="text-3xl font-bold text-indigo-600 mt-4">
            {players[0]?.name || "—"}
          </p>
          <p className="text-gray-500 text-sm">Your score & community impact</p>
          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <div>
              <p className="text-gray-500">Score</p>
              <p className="text-2xl font-bold text-gray-800">
                {players[0]?.score || 0}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Eco Points</p>
              <p className="text-2xl font-bold text-gray-800">
                {players[0]?.ecoPoints || 0}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Carbon Saved</p>
              <p className="text-2xl font-bold text-gray-800">
                {players[0]?.carbonSaved || 0} kg
              </p>
            </div>
          </div>
        </motion.div>

        {/* Platform Reach */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-2xl bg-white/70 backdrop-blur-lg shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" /> Platform Reach
            </h2>
          </div>
          <p className="text-5xl font-bold text-indigo-600 mt-4">
            {totalSessions.toLocaleString()}
          </p>
          <p className="text-gray-500 text-sm">Total sessions across modules</p>
          <Button className="w-full mt-6 flex gap-2 rounded-xl">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </motion.div>

        {/* Learning Impact */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-2xl bg-white/70 backdrop-blur-lg shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <School className="w-5 h-5 text-green-500" /> Learning Impact
            </h2>
          </div>
          <p className="text-5xl font-bold text-green-600 mt-4">
            {(avgLearningGain * 100).toFixed(1)}%
          </p>
          <p className="text-gray-500 text-sm">
            Avg. measured learning gain per session
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${avgLearningGain * 100}%` }}
            ></div>
          </div>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bar Chart */}
        <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-lg shadow-lg border border-gray-100 lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" /> Games Played
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={gameImpacts.map((g) => ({
                  name: g.game,
                  sessions: g.sessions,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar
                  dataKey="sessions"
                  fill="#4f46e5"
                  radius={[12, 12, 0, 0]}
                  barSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-lg shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-500" /> Environmental KPIs
          </h2>
          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={samplePlayers}
                  dataKey="ecoPoints"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name }) => name}
                  labelLine={false}
                >
                  {samplePlayers.map((p, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-gray-500">Water Saved</p>
              <p className="text-xl font-bold text-gray-800">
                {totalWaterSaved.toLocaleString()} L
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Game Detail Cards */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">
          Game Modules — Effects on Learning & Environment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gameImpacts.map((g) => (
            <motion.div
              key={g.id}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-2xl bg-white/70 backdrop-blur-lg shadow-lg border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-indigo-500" />
                    {g.game}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Sessions: {g.sessions.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Avg. Learning Gain</p>
                  <p className="font-bold text-green-600 text-xl">
                    {(g.avgLearningGain * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
              <ul className="space-y-1 text-sm text-gray-600">
                {g.waterSavedLiters && (
                  <li>
                    <Droplets className="w-4 h-4 inline mr-1 text-blue-500" />
                    <span className="font-semibold">Water Saved:</span>{" "}
                    {g.waterSavedLiters.toLocaleString()} L
                  </li>
                )}
                {g.treesPlanted && (
                  <li>
                    <TreePine className="w-4 h-4 inline mr-1 text-green-500" />
                    <span className="font-semibold">Trees Planted:</span>{" "}
                    {g.treesPlanted}
                  </li>
                )}
                {g.foodSavedKg && (
                  <li>
                    <span className="font-semibold">Food Waste Avoided:</span>{" "}
                    {g.foodSavedKg} kg
                  </li>
                )}
                {g.carbonSaved && (
                  <li>
                    <span className="font-semibold">Carbon Saved:</span>{" "}
                    {g.carbonSaved} kg
                  </li>
                )}
                {g.carbonReduced && (
                  <li>
                    <span className="font-semibold">Carbon Reduced:</span>{" "}
                    {g.carbonReduced} kg
                  </li>
                )}
                {g.biodiversityImproved && (
                  <li>
                    <span className="font-semibold">Biodiversity:</span>{" "}
                    {g.biodiversityImproved}
                  </li>
                )}
                {g.naturalHabitatEnhanced && (
                  <li>
                    <span className="font-semibold">Habitat Enhanced:</span>{" "}
                    {g.naturalHabitatEnhanced}
                  </li>
                )}
              </ul>
              <div className="mt-4 flex gap-2">
                <Button className="rounded-full text-sm">View Players</Button>
                <Button className="rounded-full text-sm" variant="secondary">
                  Run Impact Simulation
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Engagement Line Chart */}
      <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-lg shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-500" /> Engagement & Learning
          Trend
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={engagementTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="engagement"
                stroke="#4f46e5"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button className="rounded-full">Integrate with API</Button>
        <Button className="rounded-full">Download Report</Button>
      </div>
    </div>
  );
};

export default EcoDashboard;

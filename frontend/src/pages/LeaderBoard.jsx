import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Crown } from "lucide-react";

// Note: For true 3D charts you'd typically use a 3D library like three.js (react-three-fiber)
// or a commercial charting library that supports 3D. Below I include a lightweight
// simulated 3D bar component using CSS transforms for visual depth and a placeholder
// hook where a react-three-fiber based chart could be plugged in.

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

// ---------- Helper: Simulated 3D Bars (CSS-based) ----------
const ThreeDSimBar = ({ value, max, label, color }) => {
  const height = Math.max(36, Math.round((value / max) * 220));
  const depth = Math.round(height * 0.18);
  return (
    <div className="flex flex-col items-center mx-2">
      <div className="relative" style={{ height: 260, width: 80 }}>
        {/* front face */}
        <div
          className="absolute bottom-0 rounded-t-md"
          style={{
            width: 60,
            height,
            transform: `translateX(10px)`,
            background: `linear-gradient(180deg, ${color}, rgba(0,0,0,0.08))`,
            boxShadow: `0 10px ${depth}px rgba(0,0,0,0.12)`,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
        {/* top slanted face */}
        <div
          style={{
            position: "absolute",
            bottom: height - 8,
            left: 10,
            width: 60,
            height: 12,
            transform: "skewX(-25deg)",
            transformOrigin: "left bottom",
            background: "rgba(255,255,255,0.08)",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
        {/* side face to give depth */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 70,
            width: depth,
            height,
            background: "rgba(0,0,0,0.06)",
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            transform: "skewY(-12deg)",
          }}
        />
      </div>
      <div className="mt-2 text-sm font-medium">{label}</div>
    </div>
  );
};

// ---------- Main Dashboard Component ----------
const EcoDashboard = () => {
  const [players, setPlayers] = useState([]);
  const [gameImpacts, setGameImpacts] = useState([]);

  useEffect(() => {
    // In production: fetch from API endpoints
    setPlayers(samplePlayers);
    setGameImpacts(sampleGameImpacts);
  }, []);

  // Derived metrics for overview
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

  // Recharts data for the doughnut chart based on the HTML example
  const pieData = [
    { name: "Completed", value: avgLearningGain * 100 },
    { name: "Remaining", value: 100 - avgLearningGain * 100 },
  ];

  // Recharts data for the line chart based on the HTML example
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
    <div className="p-8 space-y-8 bg-[#f0f4f8] min-h-screen font-['Poppins',_sans-serif]">
      {/* Overview Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Planet Guardian Card */}
        <div className="card p-8 rounded-[1.5rem] shadow-lg transition-all hover:scale-[1.05] hover:shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Planet Guardian</h2>
            <div className="p-3 bg-yellow-100 rounded-full">
              <span className="material-icons text-yellow-500 text-2xl">
                home_work
              </span>
            </div>
          </div>
          <p className="text-3xl font-bold text-indigo-600 mt-4">
            {players[0]?.name || "—"}
          </p>
          <p className="text-gray-500 text-sm">Your score & community impact</p>
          <div className="flex justify-between mt-6 text-center">
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
        </div>

        {/* Platform Reach Card */}
        <div className="card p-8 rounded-[1.5rem] shadow-lg transition-all hover:scale-[1.05] hover:shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Platform Reach</h2>
            <div className="p-3 bg-indigo-100 rounded-full">
              <span className="material-icons text-indigo-500 text-2xl">
                groups
              </span>
            </div>
          </div>
          <p className="text-5xl font-bold text-indigo-600 mt-4">
            {totalSessions.toLocaleString()}
          </p>
          <p className="text-gray-500 text-sm">
            Total sessions across game modules
          </p>
          <div className="mt-6">
            <Button className="btn btn-secondary w-full justify-between items-center rounded-[0.75rem] text-left">
              <span>Export CSV</span>
              <span className="material-icons">download</span>
            </Button>
          </div>
        </div>

        {/* Learning Impact Card */}
        <div className="card p-8 rounded-[1.5rem] shadow-lg transition-all hover:scale-[1.05] hover:shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Learning Impact</h2>
            <div className="p-3 bg-green-100 rounded-full">
              <span className="material-icons text-green-500 text-2xl">
                school
              </span>
            </div>
          </div>
          <p className="text-5xl font-bold text-green-600 mt-4">
            {(avgLearningGain * 100).toFixed(1)}%
          </p>
          <p className="text-gray-500 text-sm">
            Average measured learning gain per session
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Estimates based on pre/post quiz and in-game micro-assessments
          </p>
        </div>
      </div>

      {/* Impact Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2 p-8 rounded-[1.5rem] shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Games Played</h2>
          <div className="h-64">
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
                  radius={[8, 8, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card lg:col-span-1 flex flex-col justify-between p-8 rounded-[1.5rem] shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Environmental KPIs
          </h2>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500">Water Saved (L)</p>
              <p className="text-3xl font-bold text-gray-800">
                {totalWaterSaved.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">Avg Learning Gain</p>
              <p className="text-2xl font-bold text-green-600">
                {(avgLearningGain * 100).toFixed(1)}%
              </p>
            </div>
          </div>
          <div className="relative h-48 w-48 mx-auto mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={samplePlayers}
                  dataKey="ecoPoints"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={({ ecoPoints }) => ecoPoints}
                  labelLine={false}
                >
                  {samplePlayers.map((p, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Per-Game Detail Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800">
            Game Modules — Effects on Learning & Environment
          </h3>
          <Button className="btn btn-secondary rounded-[0.75rem] text-sm">
            <span>Select by seasons</span>
            <span className="material-icons align-middle ml-2">
              expand_more
            </span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gameImpacts.map((g, idx) => (
            <div
              key={g.id}
              className="card p-6 rounded-2xl border border-gray-200 hover:bg-gray-50 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{g.game}</h3>
                  <p className="text-sm text-gray-500">
                    Sessions: {g.sessions.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Avg. learning Gain</p>
                  <p className="font-bold text-green-600 text-xl">
                    {(g.avgLearningGain * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <ul className="list-disc ml-5 mt-2 text-sm">
                  {g.waterSavedLiters && (
                    <li>
                      <span className="font-semibold">Water Saved:</span>{" "}
                      {g.waterSavedLiters.toLocaleString()} L
                    </li>
                  )}
                  {g.treesPlanted && (
                    <li>
                      <span className="font-semibold">
                        Trees planted (est):
                      </span>{" "}
                      {g.treesPlanted}
                    </li>
                  )}
                  {g.foodSavedKg && (
                    <li>
                      <span className="font-semibold">Food waste avoided:</span>{" "}
                      {g.foodSavedKg} kg
                    </li>
                  )}
                  {g.marineCleanupPoints && (
                    <li>
                      <span className="font-semibold">
                        Marine cleanup points earned:
                      </span>{" "}
                      {g.marineCleanupPoints}
                    </li>
                  )}
                  {g.carbonSaved && (
                    <li>
                      <span className="font-semibold">Carbon saved:</span>{" "}
                      {g.carbonSaved} kg
                    </li>
                  )}
                  {g.carbonReduced && (
                    <li>
                      <span className="font-semibold">
                        Carbon emission reduced:
                      </span>{" "}
                      {g.carbonReduced} kg
                    </li>
                  )}
                  {g.biodiversityImproved && (
                    <li>
                      <span className="font-semibold">
                        Biodiversity improved:
                      </span>{" "}
                      {g.biodiversityImproved}
                    </li>
                  )}
                  {g.naturalHabitatEnhanced && (
                    <li>
                      <span className="font-semibold">
                        Natural habitat area enhanced:
                      </span>{" "}
                      {g.naturalHabitatEnhanced}
                    </li>
                  )}
                </ul>
              </div>

              <div className="mt-4 flex space-x-2">
                <Button className="btn btn-secondary text-sm rounded-full">
                  View Players
                </Button>
                <Button className="btn btn-secondary text-sm rounded-full">
                  Run Impact Simulation
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Trend */}
      <div className="card p-8 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Engagement & Learning Trend
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

      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Button className="rounded-full">Integrate with API</Button>
          <Button className="rounded-full">Download Report</Button>
        </div>
      </div>
    </div>
  );
};

export default EcoDashboard;

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
    gamesPlayed: 9,
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
    avgLearningGain: 0.18,
  },
  {
    id: 2,
    game: "EcoRace",
    sessions: 800,
    treesPlanted: 320,
    avgLearningGain: 0.12,
  },
  {
    id: 3,
    game: "Zero-Waste Kitchen",
    sessions: 600,
    foodSavedKg: 420,
    avgLearningGain: 0.15,
  },
  {
    id: 4,
    game: "Ocean Odyssey",
    sessions: 450,
    marineCleanupPoints: 7600,
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
  const avgLearningGain =
    gameImpacts.reduce((s, g) => s + (g.avgLearningGain || 0), 0) /
    Math.max(1, gameImpacts.length);

  return (
    <div className="p-8 space-y-8 bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Overview Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 rounded-2xl shadow-lg">
          <CardTitle className="text-md font-semibold">
            Planet Guardian
          </CardTitle>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {players[0]?.name || "—"}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Top overall score & community impact
                </div>
              </div>
              <div className="text-6xl">🏆</div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Score</div>
                <div className="font-semibold">{players[0]?.score || 0}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Eco Points</div>
                <div className="font-semibold">
                  {players[0]?.ecoPoints || 0}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">
                  Carbon Saved
                </div>
                <div className="font-semibold">
                  {players[0]?.carbonSaved || 0} kg
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 rounded-2xl shadow-lg">
          <CardTitle className="text-md font-semibold">
            Platform Reach
          </CardTitle>
          <CardContent>
            <div className="text-3xl font-bold">
              {totalSessions.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Total sessions across game modules
            </div>
            <div className="mt-4">
              <Button className="rounded-full">Export CSV</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 rounded-2xl shadow-lg">
          <CardTitle className="text-md font-semibold">
            Learning Impact
          </CardTitle>
          <CardContent>
            <div className="text-3xl font-bold">
              {(avgLearningGain * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Average measured learning gain per session
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              Estimates based on pre/post quiz and in-game micro-assessments
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Impact Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-4 rounded-2xl shadow-lg col-span-2">
          <CardTitle className="text-lg font-semibold mb-4">
            Game Played
          </CardTitle>
          <CardContent>
            <div className="flex items-end overflow-x-auto py-6 px-4">
              {gameImpacts.map((g, idx) => (
                <ThreeDSimBar
                  key={g.id}
                  value={g.sessions}
                  max={Math.max(...gameImpacts.map((x) => x.sessions))}
                  label={g.game}
                  color={COLORS[idx % COLORS.length]}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 rounded-2xl shadow-lg">
          <CardTitle className="text-lg font-semibold mb-4">
            Environmental KPIs
          </CardTitle>
          <CardContent>
            <div className="grid gap-3">
              <div className="flex justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">
                    Water Saved (L)
                  </div>
                  <div className="font-semibold">
                    {totalWaterSaved.toLocaleString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">
                    Avg Learning Gain
                  </div>
                  <div className="font-semibold">
                    {(avgLearningGain * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={players}
                      dataKey="ecoPoints"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      label
                    >
                      {players.map((p, i) => (
                        <Cell
                          key={`cell-${i}`}
                          fill={COLORS[i % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Per-Game Detail Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            Game Modules — Effects on Learning & Environment
          </h3>
          <div className="text-sm text-muted-foreground">
            Sorted by sessions
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gameImpacts.map((g, idx) => (
            <Card key={g.id} className="p-4 rounded-2xl shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold">{g.game}</div>
                      <div className="text-sm text-muted-foreground">
                        Sessions: {g.sessions.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        Avg Learning Gain
                      </div>
                      <div className="font-semibold">
                        {(g.avgLearningGain * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="text-sm">Environmental effects:</div>
                    <ul className="list-disc ml-5 mt-2 text-sm">
                      {g.waterSavedLiters && (
                        <li>
                          Water saved: {g.waterSavedLiters.toLocaleString()} L
                        </li>
                      )}
                      {g.treesPlanted && (
                        <li>Trees planted (est): {g.treesPlanted}</li>
                      )}
                      {g.foodSavedKg && (
                        <li>Food waste avoided: {g.foodSavedKg} kg</li>
                      )}
                      {g.marineCleanupPoints && (
                        <li>
                          Marine cleanup points earned: {g.marineCleanupPoints}
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button className="rounded-full">View Players</Button>
                    <Button className="rounded-full">
                      Run Impact Simulation
                    </Button>
                  </div>
                </div>

                <div className="w-28 h-28 flex items-center justify-center">
                  <div className="text-4xl">🌿</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Engagement Trend */}
      <Card className="p-4 rounded-2xl shadow-lg">
        <CardTitle className="text-lg font-semibold mb-4">
          Engagement & Learning Trend
        </CardTitle>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={players.map((p) => ({
                name: p.name,
                Engagement: p.engagement,
                EcoPoints: p.ecoPoints,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="Engagement"
                stroke="#10B981"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="EcoPoints"
                stroke="#059669"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

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

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Medal, Gamepad2, Star, Users } from "lucide-react";

const StudentDashboard = () => {
  const [student] = useState({
    name: "Aarav Sharma",
    avatar: "/images/student-avatar.png",
    xp: 3200,
    level: 7,
    badges: ["Eco Hero", "Green Warrior", "Sustainability Star"],
    games: [
      { id: 1, title: "Waste Segregation Challenge", xpBoost: 150 },
      { id: 2, title: "Recycling Rush", xpBoost: 120 },
      { id: 3, title: "Zero-Waste Kitchen", xpBoost: 100 },
    ],
  });

  const progressData = [
    { day: "Mon", xp: 200 },
    { day: "Tue", xp: 400 },
    { day: "Wed", xp: 600 },
    { day: "Thu", xp: 750 },
    { day: "Fri", xp: 900 },
    { day: "Sat", xp: 1200 },
    { day: "Sun", xp: 1500 },
  ];

  const leaderboardData = [
    { name: "Aarav Sharma", xp: 3200 },
    { name: "Priya Verma", xp: 3000 },
    { name: "Kabir Singh", xp: 2800 },
    { name: "Ananya Das", xp: 2600 },
    { name: "Rohan Mehta", xp: 2400 },
  ];

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-gradient-to-br from-green-50 via-white to-purple-50 min-h-screen">
      {/* Student Profile */}
      <Card className="lg:col-span-1 shadow-2xl rounded-2xl border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-700">
            Student Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <img
            src={student.avatar}
            alt="Avatar"
            className="w-28 h-28 rounded-full border-4 border-green-400 shadow-lg"
          />
          <h2 className="text-xl font-bold mt-4">{student.name}</h2>
          <p className="text-gray-600 text-sm">Level {student.level}</p>
          <div className="mt-4 w-full">
            <Progress value={(student.xp % 1000) / 10} className="h-3" />
            <p className="text-sm mt-1 text-gray-500">XP: {student.xp}</p>
          </div>
        </CardContent>
      </Card>

      {/* XP Progress Chart */}
      <Card className="lg:col-span-2 shadow-2xl rounded-2xl border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-700">
            Day-by-Day XP Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={progressData}>
              <defs>
                <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="xp"
                stroke="#10b981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#xpGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Badges Section */}
      <Card className="lg:col-span-1 shadow-2xl rounded-2xl border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-yellow-600">
            <Medal /> Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {student.badges.map((badge, index) => (
              <span
                key={index}
                className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold shadow-md"
              >
                {badge}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Games Section */}
      <Card className="lg:col-span-2 shadow-2xl rounded-2xl border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-purple-700">
            <Gamepad2 /> Play Games to Boost XP
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {student.games.map((game) => (
            <div
              key={game.id}
              className="flex justify-between items-center bg-purple-50 p-4 rounded-xl shadow hover:shadow-xl transition"
            >
              <div>
                <h3 className="font-semibold text-lg">{game.title}</h3>
                <p className="text-sm text-gray-500">+{game.xpBoost} XP</p>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-5 py-2">
                Play Now
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Leaderboard Section */}
      <Card className="lg:col-span-3 shadow-2xl rounded-2xl border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-blue-700">
            <Users /> Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-3 text-left">Rank</th>
                  <th className="p-3 text-left">Student</th>
                  <th className="p-3 text-left">XP</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      user.name === student.name
                        ? "bg-green-50 font-semibold"
                        : ""
                    }`}
                  >
                    <td className="p-3">#{index + 1}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3 flex items-center gap-2">
                      {user.xp} <Star className="text-yellow-500 w-4 h-4" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;

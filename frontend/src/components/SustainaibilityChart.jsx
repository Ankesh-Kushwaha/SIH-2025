import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

const sustainabilityData = [
  { name: "Waste Reduction", impact: 85, icon: "🗑️" },
  { name: "Tree Plantation", impact: 70, icon: "🌳" },
  { name: "Recycling", impact: 90, icon: "♻️" },
  { name: "Carbon Reduction", impact: 65, icon: "🌍" },
  { name: "Water Conservation", impact: 75, icon: "💧" },
];

const SustainabilityChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative mb-16 p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-emerald-50/80 via-white/70 to-emerald-100/70 backdrop-blur-lg border border-emerald-200 overflow-hidden"
    >
      {/* Floating particles */}
      <motion.div
        className="absolute w-8 h-8 bg-green-300 rounded-full opacity-30 top-5 left-10"
        animate={{ y: [0, 20, 0], x: [0, 15, -15, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div
        className="absolute w-6 h-6 bg-cyan-300 rounded-full opacity-30 bottom-10 right-20"
        animate={{ y: [0, -15, 0], x: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />

      {/* Title */}
      <motion.h2
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl font-extrabold text-emerald-700 mb-8 flex items-center gap-3"
      >
        <span className="text-5xl animate-bounce">🌿</span>
        Our Impact on Sustainability
      </motion.h2>

      {/* Chart */}
      <div className="h-96 relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sustainabilityData}
            barGap={24}
            margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
          >
            {/* Gradient bars */}
            <defs>
              <linearGradient id="eco-bar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                <stop offset="70%" stopColor="#059669" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#064e3b" stopOpacity={0.8} />
              </linearGradient>
            </defs>

            {/* Grid */}
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(0,0,0,0.05)"
              vertical={false}
            />

            {/* X-axis */}
            <XAxis
              dataKey="name"
              stroke="#065f46"
              tick={{ fontSize: 14, fill: "#065f46", fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value, index) =>
                sustainabilityData[index].icon + " " + value
              }
            />

            {/* Y-axis */}
            <YAxis
              stroke="#065f46"
              tick={{ fontSize: 12, fill: "#065f46", fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{ fill: "rgba(16,185,129,0.1)" }}
              contentStyle={{
                backgroundColor: "#d1fae5",
                borderRadius: "12px",
                padding: "12px 16px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                border: "2px solid #34d399",
                color: "#065f46",
                fontWeight: "bold",
              }}
            />

            {/* Bars */}
            <Bar
              dataKey="impact"
              fill="url(#eco-bar)"
              radius={[16, 16, 4, 4]}
              animationDuration={1500}
              onMouseOver={(e) => {
                e.target.style.filter =
                  "drop-shadow(0px 6px 12px rgba(52,211,153,0.5))";
              }}
              onMouseOut={(e) => {
                e.target.style.filter = "none";
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SustainabilityChart;

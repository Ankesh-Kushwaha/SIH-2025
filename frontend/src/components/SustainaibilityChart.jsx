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
  { name: "Waste Reduction", impact: 85 },
  { name: "Tree Plantation", impact: 70 },
  { name: "Recycling", impact: 90 },
  { name: "Carbon Reduction", impact: 65 },
  { name: "Water Conservation", impact: 75 },
];

const SustainabilityChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="mb-16 p-8 rounded-3xl shadow-lg bg-gradient-to-br from-emerald-50/80 via-white/70 to-emerald-100/70 backdrop-blur-md border border-emerald-200"
    >
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-emerald-700 mb-8 flex items-center gap-3 text-shadow">
        <span className="material-icons text-emerald-500 text-5xl">eco</span>
        Our Impact on Sustainability
      </h2>

      {/* Chart */}
      <div className="h-96 relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sustainabilityData} barGap={20}>
            {/* Gradient */}
            <defs>
              <linearGradient id="eco-bar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                <stop offset="70%" stopColor="#059669" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#064e3b" stopOpacity={0.85} />
              </linearGradient>
            </defs>

            {/* Grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(0,0,0,0.08)"
              vertical={false}
            />

            {/* X-axis */}
            <XAxis
              dataKey="name"
              stroke="#374151"
              tick={{ fontSize: 13, fill: "#065f46", fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />

            {/* Y-axis (added back) */}
            <YAxis
              stroke="#374151"
              tick={{ fontSize: 12, fill: "#6b7280", fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "10px 14px",
                boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                border: "1px solid #d1fae5",
              }}
              itemStyle={{ color: "#059669", fontWeight: "bold" }}
            />

            {/* Bars */}
            <Bar
              dataKey="impact"
              fill="url(#eco-bar)"
              radius={[14, 14, 4, 4]}
              animationDuration={1500}
              style={{
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.target.style.filter =
                  "drop-shadow(0px 4px 8px rgba(16,185,129,0.4))";
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

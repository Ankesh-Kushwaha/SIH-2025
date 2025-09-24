import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Dot,
} from "recharts";

const ImpactGraph = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        {/* Background Grid */}
        <CartesianGrid strokeDasharray="5 5" stroke="#d1fae5" />

        {/* X Axis */}
        <XAxis
          dataKey="step"
          tick={{ fill: "#065f46", fontWeight: 600 }}
          axisLine={{ stroke: "#10b981" }}
        />

        {/* Y Axis */}
        <YAxis
          tick={{ fill: "#065f46", fontWeight: 600 }}
          axisLine={{ stroke: "#10b981" }}
          tickFormatter={(value) => `${value}%`}
        />

        {/* Tooltip */}
        <Tooltip
          contentStyle={{
            backgroundColor: "#f0fdf4",
            border: "1px solid #10b981",
            borderRadius: "8px",
            color: "#065f46",
            fontWeight: 600,
          }}
          formatter={(value) => [`${value} Impact Points`, "Impact"]}
        />

        {/* Impact Line */}
        <Line
          type="monotone"
          dataKey="impact"
          stroke="url(#impactGradient)"
          strokeWidth={4}
          dot={{ r: 6, fill: "#16a34a", stroke: "#fff", strokeWidth: 2 }}
          activeDot={{ r: 8, fill: "#22c55e", stroke: "#fff", strokeWidth: 3 }}
          isAnimationActive={true}
          animationDuration={1500}
        />

        {/* Gradient Fill */}
        <defs>
          <linearGradient id="impactGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ImpactGraph;

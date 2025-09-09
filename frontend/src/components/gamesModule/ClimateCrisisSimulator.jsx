import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ScissorsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Climate Crisis Simulator — Modernized UI with improved visuals
// Uses TailwindCSS + Framer Motion for smooth transitions

export default function ClimateCrisisSimulator() {
  const navigate=useNavigate()
  const [running, setRunning] = useState(false);
  const [year, setYear] = useState(2025);
  const [scenario, setScenario] = useState("business-as-usual");
  const [emissionFactor, setEmissionFactor] = useState(1.0);
  const [dataPoints, setDataPoints] = useState(
    generateBaseline(2025, 2100, 0.02)
  );

  useEffect(() => {
    switch (scenario) {
      case "rapid-mitigation":
        setEmissionFactor(0.4);
        break;
      case "green-innovation":
        setEmissionFactor(0.6);
        break;
      case "delayed-action":
        setEmissionFactor(1.4);
        break;
      default:
        setEmissionFactor(1.0);
    }
  }, [scenario]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setYear((y) => {
        if (y >= 2100) {
          setRunning(false);
          return y;
        }
        return y + 1;
      });
    }, 800);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    setDataPoints(() => generateBaseline(2025, 2100, 0.02, emissionFactor));
  }, [emissionFactor]);

  const visibleData = useMemo(
    () => dataPoints.filter((d) => d.year <= year),
    [dataPoints, year]
  );

  function resetSimulation() {
    setRunning(false);
    setYear(2025);
    setDataPoints(generateBaseline(2025, 2100, 0.02, emissionFactor));
  }

  function quickSet(preset) {
    setScenario(preset);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Climate Crisis Simulator 🌍
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Explore how carbon emissions influence temperature, sea levels &
              ecosystems.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow px-4 py-3 border">
            <div className="text-xs text-slate-500">Current Year</div>
            <div className="text-2xl font-bold text-green-600">{year}</div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Controls */}
          <aside className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-lg border">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Scenario
              </label>
              <select
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-green-500"
              >
                <option value="business-as-usual">🌡️ Business as Usual</option>
                <option value="rapid-mitigation">🌿 Rapid Mitigation</option>
                <option value="green-innovation">🔬 Green Innovation</option>
                <option value="delayed-action">⏳ Delayed Action</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Emission Intensity
              </label>
              <input
                type="range"
                min="0.2"
                max="2.0"
                step="0.01"
                value={emissionFactor}
                onChange={(e) => setEmissionFactor(parseFloat(e.target.value))}
                className="w-full accent-green-600"
              />
              <div className="text-xs text-slate-500 mt-1">
                Multiplier: {emissionFactor.toFixed(2)}
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setRunning((r) => !r)}
                className="flex-1 py-2 rounded-lg cursor-pointer bg-green-600 text-white font-medium shadow hover:bg-green-700 transition"
              >
                {running ? "⏸ Pause" : "▶️ Play"}
              </button>
              <button
                onClick={resetSimulation}
                className="flex-1 py-2 rounded-lg cursor-pointer border font-medium hover:bg-slate-50 transition"
              >
                🔄 Reset
              </button>
              <button
                onClick={()=>{navigate('/gamesection')}}
                className="flex-1 py-2 rounded-lg cursor-pointer border font-medium hover:bg-slate-50 transition"
              >
                <div className="flex items-center">
                  <ScissorsIcon className="w-5 h-5" /> end
                </div>
              </button>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => quickSet("rapid-mitigation")}
                className="w-full text-sm px-3 py-2 rounded-md bg-emerald-50 border hover:bg-emerald-100 transition"
              >
                Quick: Rapid Mitigation
              </button>
              <button
                onClick={() => quickSet("delayed-action")}
                className="w-full text-sm px-3 py-2 rounded-md bg-red-50 border hover:bg-red-100 transition"
              >
                Quick: Delayed Action
              </button>
            </div>
          </aside>

          {/* Main Visualization */}
          <main className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-lg border flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                title="🌡️ Global Temp"
                value={formatTemp(getLatestTemp(visibleData))}
              />
              <StatCard
                title="🟢 CO₂ ppm"
                value={Math.round(getLatestCO2(visibleData))}
              />
              <StatCard
                title="🌊 Sea Level"
                value={`${Math.round(getLatestSeaLevel(visibleData))} cm`}
              />
            </div>

            <section className="h-80 bg-gradient-to-tr from-green-50 to-blue-50 rounded-xl p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visibleData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" tick={{ fill: "#4b5563" }} />
                  <YAxis tick={{ fill: "#4b5563" }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="tempAnomaly"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard
                title="Scenario Summary"
                description={scenarioDescriptions[scenario]}
                highlight={`Projected 2100 Temp: ${formatTemp(
                  peek2100(dataPoints)
                )}`}
              />
              <InfoCard
                title="Key Impacts"
                description=""
                list={impactList(visibleData)}
              />
            </section>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <div>
                🌿 Educational preview — numbers are illustrative, not real
                forecasts.
              </div>
              <div>
                ✨ Made with ❤️ — tweak emissions & see the future unfold.
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl p-4 bg-gradient-to-br from-white to-slate-50 border shadow-sm hover:shadow-md transition"
    >
      <div className="text-xs text-slate-500">{title}</div>
      <div className="text-2xl font-bold text-slate-900 mt-1">{value}</div>
    </motion.div>
  );
}

function InfoCard({ title, description, highlight, list = [] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl p-5 bg-gradient-to-br from-slate-50 to-white border shadow-sm hover:shadow-md transition"
    >
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      {description && (
        <p className="text-sm text-slate-600 mt-2">{description}</p>
      )}
      {highlight && (
        <div className="mt-3 text-green-600 font-semibold">{highlight}</div>
      )}
      {list.length > 0 && (
        <ul className="mt-3 list-disc list-inside text-sm text-slate-600 space-y-1">
          {list.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

const scenarioDescriptions = {
  "business-as-usual":
    "Emissions continue with current trends — higher warming and bigger impacts.",
  "rapid-mitigation":
    "Aggressive reductions now — slower warming, better adaptation.",
  "green-innovation":
    "Tech-driven solutions — moderate warming but safer thresholds.",
  "delayed-action": "Late action — severe warming, frequent disasters.",
};

function impactList(data) {
  const last = data[data.length - 1];
  if (!last) return [];
  const t = last.tempAnomaly;
  const out = [];
  if (t < 1.5) out.push("Mild warming manageable with adaptation.");
  else if (t < 2.5) out.push("Heatwaves & crop stress increase.");
  else out.push("Severe weather & ecosystem collapse risk rises.");
  if (last.seaLevel > 30) out.push("Significant coastal flooding risk.");
  if (last.co2 > 600) out.push("CO₂ exceeds critical thresholds.");
  return out;
}

function generateBaseline(
  startYear = 2025,
  endYear = 2100,
  baseGrowth = 0.02,
  emissionFactor = 1.0
) {
  const data = [];
  let temp = 1.1;
  let co2 = 420;
  let sea = 15;

  for (let y = startYear; y <= endYear; y++) {
    const yearlyCo2Increase = baseGrowth * 10 * emissionFactor;
    co2 += yearlyCo2Increase;
    const tempIncrement =
      0.01 * Math.log(1 + (co2 - 280) / 100) * emissionFactor;
    temp += tempIncrement;
    sea += Math.max(0.02 * temp, 0.05) * emissionFactor;
    data.push({
      year: y,
      tempAnomaly: Number(temp.toFixed(2)),
      co2: Number(co2.toFixed(1)),
      seaLevel: Number(sea.toFixed(2)),
    });
  }
  return data;
}

function getLatestTemp(data) {
  if (!data || data.length === 0) return "—";
  return data[data.length - 1].tempAnomaly;
}
function getLatestCO2(data) {
  if (!data || data.length === 0) return "—";
  return data[data.length - 1].co2;
}
function getLatestSeaLevel(data) {
  if (!data || data.length === 0) return "—";
  return data[data.length - 1].seaLevel;
}

function formatTemp(val) {
  if (val === "—") return val;
  return `${Number(val).toFixed(2)}°C`;
}

function peek2100(data) {
  const p = data.find((d) => d.year === 2100);
  return p ? p.tempAnomaly : "—";
}

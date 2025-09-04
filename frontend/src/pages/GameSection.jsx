import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { modulesData } from "@/data/moduleData";
import Xprender from "@/components/Xprender";


const GameSection = ({ modules: initialModules }) => {
  const [modules, setModules] = useState(initialModules || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
 


  // Fetch modules if not provided as prop
  useEffect(() => {
    setModules(modulesData);
  }, [initialModules]);

  const handlePreview = (game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  const handleStartGame = () => {
    if (selectedGame) navigate(`/game/${selectedGame.id}`);
  };

  return (
    <div className="p-6 space-y-8">
      {/* ================= Loading and Error Handling ================= */}
      {loading && (
        <div className="text-center text-lg text-green-600 font-semibold animate-pulse">
          ⏳ Loading EcoVerse Games...
        </div>
      )}
      {error && (
        <div className="text-center text-red-600 font-semibold">❌ {error}</div>
      )}

      {/* ================= Top-Level Instructions + Impact Section ================= */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-green-50 rounded-2xl shadow-xl p-6"
        >
          <Xprender/>
          <h1 className="text-3xl font-bold text-green-700 mb-2">
            🌍 How EcoVerse Games Work
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Learn how each game contributes to real-world environmental impact
            while having fun!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Instructions Section */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="text-xl font-semibold text-green-700 mb-4">
                Steps to Get Started
              </h3>
              <ul className="space-y-3">
                <li className="p-3 bg-green-50 rounded-lg shadow-sm border border-green-200">
                  <span className="font-semibold">Step 1:</span> Select a module
                  based on your interests.
                </li>
                <li className="p-3 bg-green-50 rounded-lg shadow-sm border border-green-200">
                  <span className="font-semibold">Step 2:</span> Choose a
                  lesson/game you want to play.
                </li>
                <li className="p-3 bg-green-50 rounded-lg shadow-sm border border-green-200">
                  <span className="font-semibold">Step 3:</span> Read the
                  instructions and preview the impact graph.
                </li>
                <li className="p-3 bg-green-50 rounded-lg shadow-sm border border-green-200">
                  <span className="font-semibold">Step 4:</span> Click “Start
                  Playing” to begin your journey!
                </li>
              </ul>
              <Button
                onClick={() => navigate("/game/intro")}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white text-lg py-2"
              >
                🚀 Start Playing
              </Button>
            </div>

            {/* Environmental Impact Graph */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="text-xl font-semibold text-green-700 mb-4">
                Overall Environmental Impact
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={[
                    { step: "Start", impact: 0 },
                    { step: "Waste Segregation", impact: 20 },
                    { step: "Tree Plantation", impact: 45 },
                    { step: "Carbon Reduction", impact: 70 },
                    { step: "Final Score", impact: 100 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="step" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="impact"
                    stroke="#16a34a"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}

      {/* ================= Module-wise Game Listing ================= */}
      {!loading && !error && modules && modules.length > 0
        ? modules.map((module) => (
            <div key={module.id} className="space-y-4">
              <h2 className="text-xl font-semibold text-green-600">
                {module.title}
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {module.lessons.map((lesson) => (
                  <Card
                    key={lesson.id}
                    className="min-w-[280px] shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => handlePreview(lesson)}
                  >
                    <CardHeader>
                      <CardTitle>{lesson.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-2">
                        {lesson.description}
                      </p>
                      <Button variant="outline" className="w-full mt-2">
                        Preview & Impact
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))
        : !loading &&
          !error && (
            <p className="text-gray-500 text-center text-lg font-medium">
              ⚠️ No modules available yet.
            </p>
          )}

      {/* ================= Modal for Instructions + Graph ================= */}
      <AnimatePresence>
        {showModal && selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 shadow-2xl max-w-4xl w-full"
            >
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                {selectedGame.title} - How to Play
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-4 shadow-md">
                  <h3 className="text-lg font-semibold text-green-600 mb-3">
                    Environmental Impact
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={selectedGame.impactGraph}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="step" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="impact"
                        stroke="#16a34a"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 shadow-md">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Steps to Play
                  </h3>
                  <ul className="space-y-3">
                    {selectedGame.steps.map((step, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-white rounded-lg shadow-sm border border-gray-200"
                      >
                        <span className="font-semibold">Step {index + 1}:</span>{" "}
                        {step}
                      </motion.li>
                    ))}
                  </ul>
                  <Button
                    onClick={handleStartGame}
                    className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    🚀 Start Playing
                  </Button>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameSection;

import React from "react";
import ImpactGraph from "./ImpactGraph";
import { Button } from "@/components/ui/button";
import Xprender from "@/components/Xprender";
import { useNavigate } from "react-router-dom";

const GameHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-green-50 rounded-2xl shadow-xl p-6">
      <Xprender />
      <h1 className="text-3xl font-bold text-green-700 mb-2">
        🌍 How EcoVerse Games Work
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        Learn how each game contributes to real-world environmental impact while
        having fun!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Instructions */}
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
          <ImpactGraph
            data={[
              { step: "Start", impact: 0 },
              { step: "Waste Segregation", impact: 20 },
              { step: "Tree Plantation", impact: 45 },
              { step: "Carbon Reduction", impact: 70 },
              { step: "Final Score", impact: 100 },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default GameHeader;

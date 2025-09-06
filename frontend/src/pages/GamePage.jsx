import { useParams } from "react-router-dom";
import { gameComponent } from "@/data/moduleData";
import { useState, useEffect } from "react";

export default function GamePage() {
  const { gameId } = useParams();
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    // ✅ Find the correct game based on the gameId
    const game = gameComponent.find(
      (g) => String(g.gameComponentId) === String(gameId)
    );

    if (game) {
      setSelectedComponent(() => game.component); // ✅ Set the component dynamically
    }
  }, [gameId]);

  // ✅ If no component found, show error
  if (!selectedComponent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-600">❌ Game Not Found</h1>
        <p className="text-gray-600 mt-2">Please select a valid game.</p>
      </div>
    );
  }

  // ✅ Render the selected game dynamically
  const SelectedGame = selectedComponent;

  return (
    <div className="min-h-screen w-full h-full bg-gray-200 p-4">
      <SelectedGame /> {/* ✅ Dynamic game rendering */}
    </div>
  );
}

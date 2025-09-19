import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";

// stable callback hook
const useStableCallback = (callback) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  return useCallback((...args) => callbackRef.current(...args), []);
};

// Generate solvable grid
const generatePipeGrid = (size, level) => {
  const grid = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ open: false }))
  );

  const numToggles = Math.floor(Math.sqrt(size * size) * level) + 2;
  for (let i = 0; i < numToggles; i++) {
    const r = Math.floor(Math.random() * size);
    const c = Math.floor(Math.random() * size);
    const pts = [
      [r, c],
      [r - 1, c],
      [r + 1, c],
      [r, c - 1],
      [r, c + 1],
    ];
    pts.forEach(([x, y]) => {
      if (grid[x] && grid[x][y]) grid[x][y].open = !grid[x][y].open;
    });
  }
  return grid;
};

export default function WaterConservation1() {
  const size = 5;
  const maxMoves = 6;

  const [level, setLevel] = useState(1);
  const [grid, setGrid] = useState(() => generatePipeGrid(size, 1));
  const [movesLeft, setMovesLeft] = useState(maxMoves);
  const [gameStatus, setGameStatus] = useState("playing"); // 'playing' | 'won' | 'lost'
  const [showInstructions, setShowInstructions] = useState(false);

  // reset when level changes
  useEffect(() => {
    setGrid(generatePipeGrid(size, level));
    setMovesLeft(maxMoves);
    setGameStatus("playing");
  }, [level]);

  // leaks count
  const leaksRemaining = useMemo(
    () => grid.flat().filter((cell) => cell.open).length,
    [grid]
  );

  // win/lose check
  useEffect(() => {
    if (gameStatus === "playing") {
      if (leaksRemaining === 0) setGameStatus("won");
      else if (movesLeft === 0) setGameStatus("lost");
    }
  }, [leaksRemaining, movesLeft, gameStatus]);

  const toggleValve = useStableCallback((r, c) => {
    if (movesLeft <= 0 || gameStatus !== "playing") return;

    setGrid((prev) => {
      const next = prev.map((row) => row.map((cell) => ({ ...cell })));
      const pts = [
        [r, c],
        [r - 1, c],
        [r + 1, c],
        [r, c - 1],
        [r, c + 1],
      ];
      pts.forEach(([x, y]) => {
        if (next[x] && next[x][y]) next[x][y].open = !next[x][y].open;
      });
      return next;
    });

    setMovesLeft((m) => m - 1);
  });

  const handleReset = useStableCallback(() => {
    setGrid(generatePipeGrid(size, level));
    setMovesLeft(maxMoves);
    setGameStatus("playing");
  });

  const handleNextLevel = useStableCallback(() => setLevel((l) => l + 1));

  const renderGrid = () => (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${size}, 56px)` }}
    >
      {grid.map((row, r) =>
        row.map((cell, c) => (
          <button
            key={`${r}-${c}`}
            onClick={() => toggleValve(r, c)}
            disabled={gameStatus !== "playing"}
            className={`w-14 h-14 rounded-full transition-all duration-300
              flex items-center justify-center p-1 border-2 shadow-md
              ${
                cell.open
                  ? "bg-red-500 border-red-700 hover:bg-red-600"
                  : "bg-blue-500 border-blue-700 hover:bg-blue-600"
              }`}
          >
            <svg
              className={`w-8 h-8 transition-transform duration-300 ${
                cell.open ? "animate-pulse" : "transform rotate-45"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {cell.open ? (
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              ) : (
                <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm-1 6H9v2h2v1H9v2h2v2h2v-2h2v-2h-2v-1h2V8h-2V6h-2v2z" />
              )}
            </svg>
          </button>
        ))
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden p-6 md:p-10 text-center font-sans">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-2">
          Water Conservation
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Close the leaking valves within a limited number of moves. Each tap
          affects the surrounding valves in a cross pattern.
        </p>

        <div className="flex justify-around items-center mb-4 bg-blue-100 py-3 px-2 rounded-lg text-sm md:text-base font-semibold text-blue-800 border border-blue-200">
          <span>Level: {level}</span>
          <span>Moves Left: {movesLeft}</span>
          <span>Leaks Remaining: {leaksRemaining}</span>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <button
            onClick={() => setShowInstructions((s) => !s)}
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm font-medium"
          >
            {showInstructions ? "Hide Instructions" : "How to Play"}
          </button>
          <div
            className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
              showInstructions ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="mt-4 p-4 rounded-lg bg-gray-100 text-left text-gray-700">
              <h3 className="text-lg font-bold mb-2">The Objective</h3>
              <p className="mb-2">
                Turn off all the red leaking valves and make them blue within a
                limited number of moves.
              </p>
              <h3 className="text-lg font-bold mb-2">How to Play</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>Click any valve to toggle it and its direct neighbors.</li>
                <li>Plan carefully—you have a limited number of moves!</li>
                <li>Win by having zero leaks before moves run out.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Game or Result */}
        <div className="flex justify-center my-8">
          {gameStatus === "playing" ? (
            renderGrid()
          ) : (
            <div className="p-8 rounded-xl bg-gray-100 border border-gray-300 shadow-inner">
              <h2
                className={`text-3xl font-bold mb-4 ${
                  gameStatus === "won" ? "text-green-600" : "text-red-600"
                }`}
              >
                {gameStatus === "won" ? "You Win!" : "Game Over"}
              </h2>
              <p className="text-gray-700 mb-6">
                {gameStatus === "won"
                  ? `You sealed all leaks on Level ${level}!`
                  : "You ran out of moves. Try again!"}
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                {gameStatus === "won" && (
                  <button
                    onClick={handleNextLevel}
                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
                  >
                    Next Level
                  </button>
                )}
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-gray-300 text-gray-800 font-bold rounded-lg shadow-lg hover:bg-gray-400 transition transform hover:scale-105"
                >
                  {gameStatus === "won" ? "Play Again" : "Try Again"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

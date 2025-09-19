import React, { useState, useEffect } from "react";

// ---------- Initial Game Data ----------
const initialData = {
  species: [
    { id: "s1", name: "Grass", type: "producer", icon: "🌿", diet: [] },
    { id: "s2", name: "Rabbit", type: "consumer", icon: "🐇", diet: ["s1"] },
    { id: "s3", name: "Deer", type: "consumer", icon: "🦌", diet: ["s1"] },
    { id: "s4", name: "Snake", type: "consumer", icon: "🐍", diet: ["s2"] },
    {
      id: "s5",
      name: "Fox",
      type: "consumer",
      icon: "🦊",
      diet: ["s2", "s3", "s4"],
    },
    { id: "s6", name: "Hawk", type: "consumer", icon: "🦅", diet: ["s4"] },
  ],
  links: [],
  score: 0,
};

// ---------- Helper Functions ----------
const hasCycle = (links) => {
  const adj = {};
  const nodes = Array.from(new Set(links.flatMap((l) => [l.from, l.to])));
  nodes.forEach((n) => (adj[n] = []));
  links.forEach((l) => adj[l.from].push(l.to));

  const visited = new Set();
  const stack = new Set();

  const dfs = (node) => {
    if (stack.has(node)) return true;
    if (visited.has(node)) return false;

    visited.add(node);
    stack.add(node);

    for (const neighbor of adj[node]) if (dfs(neighbor)) return true;
    stack.delete(node);
    return false;
  };

  return nodes.some(dfs);
};

const findChainLength = (start, links) => {
  let length = 0;
  let current = start;
  while (true) {
    length++;
    const next = links.find((l) => l.from === current);
    if (!next) break;
    current = next.to;
  }
  return length;
};

// ---------- Component ----------
const EcosystemAwareness1 = () => {
  const [data, setData] = useState(initialData);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [gameStatus, setGameStatus] = useState("playing");
  const [lives, setLives] = useState(3);
  const [explanation, setExplanation] = useState("");
  const [isExplaining, setIsExplaining] = useState(false);

  // Derived states
  const allPlaced = data.species.every(
    (s) =>
      s.type === "producer" ||
      data.links.some((l) => l.from === s.id || l.to === s.id)
  );
  const isGameWon =
    gameStatus === "playing" && allPlaced && !hasCycle(data.links);
  const isGameOver = lives <= 0 && gameStatus !== "won";

  // --- Effects ---
  useEffect(() => {
    if (isGameWon) setGameStatus("won");
  }, [isGameWon]);
  useEffect(() => {
    if (isGameOver) setGameStatus("gameover");
  }, [isGameOver]);

  // --- Placeholder AI calls ---
  const generateExplanation = async (from, to, reason) => {
    setIsExplaining(true);
    setTimeout(() => {
      setExplanation(`Ecological note: ${reason}`);
      setIsExplaining(false);
    }, 800);
  };

  const handleSelect = (org) => {
    if (selected) {
      if (selected.id === org.id) return setSelected(null);
      addLink(selected, org);
      setSelected(null);
    } else setSelected(org);
  };

  const addLink = (from, to) => {
    let newLives = lives;
    let newMessage = "";
    let reason = "";

    if (from.type === "producer") {
      newMessage = "Producers cannot eat other organisms.";
      reason = `${from.name} makes its own food and does not eat others.`;
      newLives--;
    } else if (!from.diet.includes(to.id)) {
      newMessage = `A ${from.name} cannot eat a ${to.name}.`;
      reason = `${from.name} does not consume ${to.name} in nature.`;
      newLives--;
    } else if (data.links.some((l) => l.from === from.id && l.to === to.id)) {
      newMessage = "This link already exists.";
      reason = "Duplicate link.";
      newLives--;
    } else {
      const newLinks = [...data.links, { from: from.id, to: to.id }];
      if (hasCycle(newLinks)) {
        newMessage = "You cannot create a cycle!";
        reason = "An organism cannot eat something that eventually eats it.";
        newLives--;
        setData({ ...data, score: Math.max(0, data.score - 20) });
      } else {
        const chainLen = findChainLength(from.id, newLinks);
        const newScore = data.score + chainLen * 10;
        setData({ ...data, links: newLinks, score: newScore });
        setMessage(
          `You successfully created: ${from.name} eats ${to.name}. Score +${
            chainLen * 10
          }!`
        );
        return;
      }
    }

    setLives(newLives);
    setMessage(newMessage);
    setExplanation("");
    if (newLives > 0) generateExplanation(from, to, reason);
  };

  const resetGame = () => {
    setData(initialData);
    setSelected(null);
    setMessage("");
    setGameStatus("playing");
    setLives(3);
    setExplanation("");
  };

  const getLinks = (id) => {
    const eats = data.links
      .filter((l) => l.from === id)
      .map((l) => data.species.find((s) => s.id === l.to)?.name);
    const eatenBy = data.links
      .filter((l) => l.to === id)
      .map((l) => data.species.find((s) => s.id === l.from)?.name);
    return { eats, eatenBy };
  };

  // --- JSX ---
  return (
    <div className="min-h-screen  flex flex-col bg-gradient-to-b from-blue-50 to-gray-100">
      {/* Main Game Container */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div
          className="w-full max-w-6xl max-h-[80vh] overflow-y-auto 
                  bg-white rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row gap-8"
        >
          {/* Game Area */}
          <div className="flex-grow">
            <div className="text-center">
              <h1 className="text-5xl font-extrabold text-blue-700 drop-shadow-sm">
                Ecosystem Awareness
              </h1>
              <p className="mt-3 text-lg text-gray-600">
                Build a stable food web by connecting species.
              </p>
            </div>

            {/* Win / Lose Screens */}
            {gameStatus === "won" && (
              <div className="text-center p-10 bg-green-50 rounded-xl border-2 border-green-500 shadow-md mt-8">
                <h2 className="text-4xl font-bold text-green-800">You Win!</h2>
                <p className="mt-2 text-lg text-green-600">
                  Stable food web created.
                </p>
                <button
                  onClick={resetGame}
                  className="mt-6 px-8 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition"
                >
                  Play Again
                </button>
              </div>
            )}

            {gameStatus === "gameover" && (
              <div className="text-center p-10 bg-red-50 rounded-xl border-2 border-red-500 shadow-md mt-8">
                <h2 className="text-4xl font-bold text-red-800">Game Over</h2>
                <p className="mt-2 text-lg text-red-600">
                  You ran out of lives.
                </p>
                <button
                  onClick={resetGame}
                  className="mt-6 px-8 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition"
                >
                  Play Again
                </button>
              </div>
            )}

            {/* Main Game UI */}
            {gameStatus === "playing" && (
              <>
                <div className="mt-8 flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Ecosystem</h2>
                  <div className="flex items-center gap-6">
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-2xl ${
                            i < lives ? "text-red-500" : "text-gray-300"
                          }`}
                        >
                          ❤
                        </span>
                      ))}
                    </div>
                    <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                      Score: {data.score}
                    </span>
                  </div>
                </div>

                {/* Species Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {data.species.map((s) => {
                    const links = getLinks(s.id);
                    return (
                      <div
                        key={s.id}
                        onClick={() => handleSelect(s)}
                        className={`relative p-5 rounded-xl shadow-md cursor-pointer transition-all duration-200
                          ${
                            selected?.id === s.id
                              ? "bg-yellow-100 border-2 border-yellow-500 scale-105"
                              : "bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 hover:scale-105 hover:shadow-lg"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-3xl">{s.icon}</span>
                          <h3 className="text-lg font-bold">{s.name}</h3>
                        </div>
                        <div className="mt-2 text-xs text-gray-500 leading-relaxed">
                          {s.type === "producer"
                            ? "Producer"
                            : `Eats: ${links.eats.join(", ") || "N/A"}`}
                          <br />
                          {`Eaten by: ${links.eatenBy.join(", ") || "N/A"}`}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Message + Explanation */}
                <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-inner text-center">
                  {message && (
                    <p
                      className={`mb-4 text-lg font-semibold ${
                        message.includes("successfully")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {message}
                    </p>
                  )}
                  {explanation && (
                    <div className="mt-4 p-4 rounded-lg bg-white border border-blue-200 text-gray-700 text-sm shadow-md text-left">
                      <h4 className="font-bold">Explanation:</h4>
                      {isExplaining ? "..." : explanation}
                    </div>
                  )}
                  <button
                    onClick={resetGame}
                    className="px-6 py-3 rounded-full bg-gray-300 text-gray-800 font-bold hover:bg-gray-400 mt-4"
                  >
                    Reset Game
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="md:w-80 bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-inner">
            <h3 className="text-xl font-bold mb-3">How to Play</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
              <li>Click a species to select it.</li>
              <li>Click another to create a food-chain link.</li>
              <li>Build a complete, cycle-free web to win.</li>
              <li>Producers can’t eat anything.</li>
            </ul>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Ecosystem Awareness Game
      </footer>
    </div>
  );
};

export default EcosystemAwareness1;

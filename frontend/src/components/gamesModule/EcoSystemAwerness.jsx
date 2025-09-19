import React, { useState, useEffect } from 'react';

// Card component for habitats
const HabitatCard = ({ habitat, onSelectSpecies, selectedSpecies }) => {
  const isSelected = selectedSpecies?.habitatId === habitat.id;
  const isTarget = selectedSpecies && selectedSpecies.habitatId === null;

  const handleAssign = () => {
    if (isTarget) {
      onSelectSpecies(selectedSpecies.id, habitat.id);
    }
  };

  const habitatIcons = {
    'Riverlands': '🌊',
    'Forest': '🌳',
    'Grasslands': '🏞',
  };

  return (
    <div
      onClick={handleAssign}
      className={`relative p-4 rounded-xl shadow-md cursor-pointer transition-all duration-200
        ${isTarget ? 'bg-green-100 dark:bg-green-900 border-2 border-green-500 transform scale-105' : 'bg-white dark:bg-gray-800 border-2 border-transparent'}
        ${isSelected ? 'bg-blue-200 dark:bg-blue-900 border-blue-500' : ''}
      `}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">{habitatIcons[habitat.name]}</span>
        <h3 className="text-lg font-bold mb-1">{habitat.name}</h3>
      </div>
      <div className="text-sm font-medium mt-2">Species:</div>
      <ul className="list-disc list-inside mt-1 text-xs">
        {habitat.species.length > 0 ? (
          habitat.species.map(s => <li key={s.id}>{s.name}</li>)
        ) : (
          <li className="text-gray-400">No species yet</li>
        )}
      </ul>
    </div>
  );
};

// Card component for species
const SpeciesCard = ({ spec, onSelect, selected }) => {
  const speciesIcons = {
    'Fish': '🐠',
    'Rabbit': '🐇',
    'Deer': '🦌',
    'Bear': '🐻',
  };

  return (
    <div
      onClick={() => onSelect(spec)}
      className={`relative p-3 rounded-xl shadow-md cursor-pointer transition-all duration-200
        ${selected?.id === spec.id ? 'bg-yellow-200 dark:bg-yellow-800 border-2 border-yellow-500 transform scale-105' : 'bg-white dark:bg-gray-800 border-2 border-transparent'}
      `}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">{speciesIcons[spec.name]}</span>
        <h3 className="text-lg font-bold">{spec.name}</h3>
      </div>
      <div className="mt-2 text-sm font-bold">Count: {spec.count}</div>
      {selected?.id === spec.id && (
        <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-500 text-white text-xs rounded-full font-bold">
          Selected
        </div>
      )}
    </div>
  );
};

// Initial game data
const initialData = {
  habitats: [
    { id: 'h1', name: 'Riverlands', species: [] },
    { id: 'h2', name: 'Forest', species: [] },
    { id: 'h3', name: 'Grasslands', species: [] },
  ],
  species: [
    { id: 's1', name: 'Fish', count: 1, score: 5, correctHabitat: 'h1' },
    { id: 's2', name: 'Rabbit', count: 1, score: 3, correctHabitat: 'h3' },
    { id: 's3', name: 'Deer', count: 1, score: 7, correctHabitat: 'h2' },
    { id: 's4', name: 'Bear', count: 1, score: 8, correctHabitat: 'h2' },
  ],
};

// Main game component
const EcosystemAwareness = () => {
  const [habitats, setHabitats] = useState(initialData.habitats);
  const [species, setSpecies] = useState(initialData.species);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [message, setMessage] = useState('');
  const [showRoundEnd, setShowRoundEnd] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const availableSpecies = species.filter(s => s.count > 0);

  // Check for game over or win conditions
  useEffect(() => {
    if (lives <= 0) {
      setGameOver(true);
      setMessage('Game Over! You ran out of lives.');
    } else if (availableSpecies.length === 0 && !gameOver) {
      setGameWon(true);
      setMessage('You have successfully placed all the species!');
    }
  }, [lives, availableSpecies.length, gameOver]);

  // Check if round is over
  useEffect(() => {
    if (availableSpecies.length === 0 && !gameOver && !gameWon) {
      setShowRoundEnd(true);
    }
  }, [availableSpecies, gameOver, gameWon]);

  const handleSelectSpecies = (spec) => {
    if (selectedSpecies?.id === spec.id) {
      setSelectedSpecies(null);
    } else {
      setSelectedSpecies({ ...spec, habitatId: null });
    }
  };

  const assignSpeciesToHabitat = (speciesId, habitatId) => {
    const habitatIndex = habitats.findIndex(h => h.id === habitatId);
    const speciesIndex = species.findIndex(s => s.id === speciesId);

    if (habitatIndex === -1 || speciesIndex === -1) return;

    const newHabitats = [...habitats];
    const newSpecies = [...species];

    const targetSpecies = newSpecies[speciesIndex];
    const targetHabitat = newHabitats[habitatIndex];

    // Check if the assigned habitat is the correct one
    if (targetSpecies.correctHabitat !== habitatId) {
      setLives(l => l - 1);
      setMessage(`Wrong habitat! A life was lost. Correct habitat for ${targetSpecies.name} is ${newHabitats.find(h => h.id === targetSpecies.correctHabitat).name}.`);
      setSelectedSpecies(null);
      return;
    }
    
    // Add species to habitat
    newHabitats[habitatIndex].species.push(targetSpecies);
    
    // Reduce species count
    newSpecies[speciesIndex].count -= 1;
    
    // Update score
    setScore(s => s + targetSpecies.score);
    setMessage(`Assigned ${targetSpecies.name} to ${targetHabitat.name}!`);

    setHabitats(newHabitats);
    setSpecies(newSpecies);
    setSelectedSpecies(null);
  };

  const endRound = () => {
    setRound(r => r + 1);
    setHabitats(initialData.habitats);
    setSpecies(s => s.map(spec => ({
      ...spec,
      count: 1
    })));
    setShowRoundEnd(false);
    setMessage(`Round ${round} complete. All species are ready to be placed.`);
  };

  const resetGame = () => {
    setHabitats(initialData.habitats);
    setSpecies(initialData.species);
    setSelectedSpecies(null);
    setRound(1);
    setScore(0);
    setLives(3);
    setMessage('');
    setShowRoundEnd(false);
    setGameOver(false);
    setGameWon(false);
  };

  const renderGameStatus = () => {
    if (gameOver) {
      return (
        <div className="p-6 bg-red-100 dark:bg-red-900 rounded-xl shadow-lg border-2 border-red-500 text-center">
          <h2 className="text-3xl font-bold text-red-800 dark:text-red-200">Game Over!</h2>
          <p className="mt-2 text-red-600 dark:text-red-300">Final Score: {score}</p>
          <button onClick={resetGame} className="mt-4 px-6 py-3 rounded-xl bg-gray-300 text-gray-800 font-bold hover:scale-105 transition-transform">
            Try Again
          </button>
        </div>
      );
    }

    if (gameWon) {
      return (
        <div className="p-6 bg-green-100 dark:bg-green-900 rounded-xl shadow-lg border-2 border-green-500 text-center">
          <h2 className="text-3xl font-bold text-green-800 dark:text-green-200">Congratulations!</h2>
          <p className="mt-2 text-green-600 dark:text-green-300">You successfully placed all the species! Final Score: {score}</p>
          <button onClick={resetGame} className="mt-4 px-6 py-3 rounded-xl bg-gray-300 text-gray-800 font-bold hover:scale-105 transition-transform">
            Play Again
          </button>
        </div>
      );
    }

    if (showRoundEnd) {
      return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-gray-500 text-center">
          <h2 className="text-2xl font-bold">Round {round} Complete!</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">All species have been placed. Ready for the next round?</p>
          <div className="mt-4 flex flex-col gap-2">
            <button onClick={endRound} className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:scale-105 transition-transform">
              Next Round
            </button>
            <button onClick={resetGame} className="px-6 py-3 rounded-xl bg-gray-300 text-gray-800 font-bold hover:scale-105 transition-transform">
              Restart Game
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-teal-600 dark:text-teal-400">Ecosystem Awareness</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Strategically assign species to habitats to build a thriving ecosystem.</p>
        </header>

        {gameOver || gameWon || showRoundEnd ? (
          renderGameStatus()
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Habitats</h2>
                  <div className="text-sm font-semibold flex items-center gap-4">
                    <span>Round: {round}</span>
                    <span>Score: {score}</span>
                    <span>Lives: {lives} {'❤'.repeat(lives)}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {habitats.map(h => (
                    <HabitatCard
                      key={h.id}
                      habitat={h}
                      onSelectSpecies={assignSpeciesToHabitat}
                      selectedSpecies={selectedSpecies}
                    />
                  ))}
                </div>
              </div>

              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-4">Available Species</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {availableSpecies.map(s => (
                    <SpeciesCard
                      key={s.id}
                      spec={s}
                      onSelect={handleSelectSpecies}
                      selected={selectedSpecies}
                    />
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6 md:col-span-1">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-2">How to Play</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click on a species to select it, then click on its *correct habitat* to assign it. Be careful, a wrong choice will cost you a life!
                </p>
                <ul className="list-disc list-inside mt-4 text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>Start with 3 lives. Lose a life for each incorrect placement.</li>
                  <li>Assign all available species to their correct habitats to complete a round.</li>
                  <li>The game ends when you run out of lives.</li>
                </ul>
              </div>
              
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
                {message && <p className="mb-4 text-sm font-semibold text-teal-600">{message}</p>}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {}} // No action, button is just to display message
                    disabled={availableSpecies.length > 0}
                    className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    End Round
                  </button>
                  <button
                    onClick={resetGame}
                    className="px-6 py-3 rounded-xl bg-gray-300 text-gray-800 font-bold transition-transform transform hover:scale-105"
                  >
                    Reset Game
                  </button>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default EcosystemAwareness;
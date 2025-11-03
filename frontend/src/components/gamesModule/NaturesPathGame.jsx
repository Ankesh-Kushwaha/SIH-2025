import React, { useState } from 'react';
import './NaturesPathGame.css';


// --- Story Data ---
const storyData ={
      start: {
        text: "You stand at the trailhead of a beautiful mountain path. The air is fresh and the sun is warm. Your goal is to reach the summit with the highest respect for nature.",
        image:
          "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1350",
        choices: [{ text: "Begin the hike", nextScene: "meadow" }],
      },
      meadow: {
        text: "You enter a meadow filled with colorful wildflowers. A particularly beautiful blue flower catches your eye.",
        image:
          "https://images.unsplash.com/photo-1494951421735-a45a3a1f4965?auto=format&fit=crop&w=1350",
        choices: [
          {
            text: "Take a photo of it",
            nextScene: "fallenBird",
            effect: {
              score: 5,
              message: "A beautiful memory, captured harmlessly.",
            },
          },
          {
            text: "Pick the flower",
            nextScene: "fallenBird",
            effect: {
              score: -10,
              message:
                "It looks nice, but now the bees and butterflies can't use it.",
            },
          },
        ],
      },
      fallenBird: {
        text: "Further up the path, you see a tiny baby bird on the ground that has fallen from its nest.",
        image:
          "https://images.unsplash.com/photo-1550866038-d2383c27d383?auto=format&fit=crop&w=1350",
        choices: [
          {
            text: "Leave it alone. The parent is likely nearby.",
            nextScene: "streamCrossing",
            effect: {
              score: 15,
              message:
                "Wise choice! As you walk away, you see the mother bird return.",
            },
          },
          {
            text: "Try to put it back in the nest.",
            nextScene: "streamCrossing",
            effect: {
              score: -10,
              message:
                "Though your heart was in the right place, your scent could make the parents abandon the nest.",
            },
          },
          {
            text: "Take it with you to 'save' it.",
            nextScene: "streamCrossing",
            effect: {
              score: -15,
              message:
                "Removing wildlife is almost never the right answer. It will likely not survive without its parents.",
            },
          },
        ],
      },
      streamCrossing: {
        text: "The path is blocked by a wide, rushing stream. The other side is just a short distance away.",
        image:
          "https://images.unsplash.com/photo-1505963721598-522617596a28?auto=format&fit=crop&w=1350",
        choices: [
          {
            text: "Throw rocks in the stream to make a path.",
            nextScene: "summit",
            effect: {
              score: -20,
              message:
                "You made it across, but disturbed the delicate stream ecosystem.",
            },
          },
          {
            text: "Hike upstream to find a safer crossing.",
            nextScene: "summit",
            effect: {
              score: 10,
              message:
                "Patience pays off. You found a fallen log and crossed without a trace.",
            },
          },
        ],
      },
      summit: {
        text: "You've reached the summit! The view is breathtaking. You've made choices along the way that reflect your respect for this place.",
        image:
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1350",
        choices: [
          // Instead of nextScene 'end', call a handler that will check score
          { text: "See your result", nextScene: "final" },
        ],
      },
      endGood: {
        text: "You ended your hike with a high Respect Score. You are a true Nature's Guardian, leaving the trail better than you found it. Well done!",
        image:
          "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1350",
        choices: [{ text: "Play Again", nextScene: "start" }],
      },
      endBad: {
        text: "Your Respect Score is low. While you reached the summit, your actions along the way caused harm to the environment. Remember to always leave no trace.",
        image:
          "https://images.unsplash.com/photo-1582235940938-1db259a43aeb?auto=format&fit=crop&w=1350",
        choices: [{ text: "Try Again", nextScene: "start" }],
      },
    }

function NaturesPathGame() {
  const [currentSceneKey, setCurrentSceneKey] = useState('start');
  const [respectScore, setRespectScore] = useState(100);
  const [message, setMessage] = useState('');

  const handleChoice = (choice) => {
    // Special case: user clicks "See your result"
    if (choice.nextScene === 'final') {
      if (respectScore >= 100) {
        setCurrentSceneKey('endGood');
      } else {
        setCurrentSceneKey('endBad');
      }
      return;
    }

    // Restart logic
    if (choice.nextScene === 'start') {
      setRespectScore(100);
    }

    // Apply effects
    if (choice.effect) {
      setRespectScore(score => Math.max(0, score + choice.effect.score));
      setMessage(choice.effect.message);
    } else {
      setMessage('');
    }

    setCurrentSceneKey(choice.nextScene);
  };

  const currentScene = storyData[currentSceneKey];
  const bgImageStyle = { backgroundImage: `url(${currentScene.image})` };

  return (
    <div className="nature-app" style={bgImageStyle}>
      <div className="overlay">
        <div className="header">
          <h1>Nature's Path</h1>
          <div className="respect-score">Respect Score: {respectScore}</div>
        </div>

        <div className="scene-container">
          <p className="scene-text">{currentScene.text}</p>
          {message && <p className="feedback-message">{message}</p>}
        </div>

        <div className="choices-container">
          {currentScene.choices.map((choice, index) => (
            <button
              key={index}
              className="choice-button"
              onClick={() => handleChoice(choice)}
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NaturesPathGame;

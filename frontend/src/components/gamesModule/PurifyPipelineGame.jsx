import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./PurifyPipeline.css";

/**
 * PurifyPipelineGame
 * - Random pipeline length (3 to 5)
 * - Full sequence pool; correctSequence is first N of the masterSequence
 * - Shuffle modules (includes distractors)
 * - Drag & drop modules into slots, click slot to remove
 * - Check triggers water flow animation; stops on clog if wrong
 * - Scoring (+50 per correct in correct position), -20 for an incorrect check
 * - Lives (3) - lose a life on incorrect check; game over when 0
 * - Hint button shows fact about the next required module
 * - Confetti-style emoji burst on success
 */

const MASTER_SEQUENCE = [
  "Screen Filter",
  "Sedimentation Basin",
  "Aeration Tank",
  "Filter Media",
  "UV Disinfection",
];

const MODULE_FACTS = {
  "Screen Filter":
    "Screen filters remove large debris like leaves and trash from incoming water.",
  "Sedimentation Basin":
    "Sedimentation basins allow heavy particles to settle out before further treatment.",
  "Aeration Tank":
    "Aeration helps bacteria break down organic matter by adding oxygen.",
  "Filter Media":
    "Filter media (sand/gravel/activated carbon) removes smaller particles and impurities.",
  "UV Disinfection":
    "UV light disinfects water by damaging microorganisms' DNA.",
  // small distractor fact
  Chlorination:
    "Chlorination kills many pathogens but must be dosed carefully.",
  "Polishing Filter": "Polishing filters fine-tune clarity and taste.",
};

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function PurifyPipelineGame({ goBack }) {
  // round states
  const [pipelineLen, setPipelineLen] = useState(3);
  const [correctSequence, setCorrectSequence] = useState(
    MASTER_SEQUENCE.slice(0, pipelineLen)
  );

  // dynamic states
  const [pipeline, setPipeline] = useState(Array(pipelineLen).fill(null));
  const [modulesPool, setModulesPool] = useState([]);
  const [message, setMessage] = useState(
    "⚡ Drag modules into the pipeline in the right order."
  );
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isFlowing, setIsFlowing] = useState(false);
  const [flowStep, setFlowStep] = useState(-1);
  const [showHint, setShowHint] = useState(false);
  const [burst, setBurst] = useState([]); // for celebration emoji burst
  const [isGameOver, setIsGameOver] = useState(false);

  // initialize a new round
  const initRound = (len = null) => {
    const newLen = len || 3 + Math.floor(Math.random() * 3); // 3..5
    const seq = MASTER_SEQUENCE.slice(0, newLen);
    setPipelineLen(newLen);
    setCorrectSequence(seq);
    setPipeline(Array(newLen).fill(null));

    // modules pool: include the required modules + some distractors (Chlorination / Polishing Filter)
    const distractors = ["Chlorination", "Polishing Filter"];
    const pool = shuffleArray(
      [...seq, ...distractors].slice(
        0,
        Math.min(6, seq.length + distractors.length)
      )
    );
    // ensure pool contains required modules - if slice removed, re-add and reshuffle:
    for (const req of seq) if (!pool.includes(req)) pool.push(req);
    setModulesPool(shuffleArray(pool));
    setMessage("⚡ Drag modules into the pipeline in the right order.");
    setIsFlowing(false);
    setFlowStep(-1);
    setShowHint(false);
    setBurst([]);
    setIsGameOver(false);
  };

  // init once on mount
  useEffect(() => initRound(), []);

  // helpers
  const handleDragStart = (e, moduleName) => {
    e.dataTransfer.setData("moduleName", moduleName);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (isFlowing || isGameOver) return;
    const moduleName = e.dataTransfer.getData("moduleName");
    if (!moduleName) return;
    const newPipeline = [...pipeline];
    newPipeline[index] = moduleName;
    setPipeline(newPipeline);
  };

  const handleSlotClick = (index) => {
    if (isFlowing || isGameOver) return;
    const newPipeline = [...pipeline];
    if (newPipeline[index]) {
      // return removed module back to pool (at front)
      setModulesPool((p) => [newPipeline[index], ...p]);
      newPipeline[index] = null;
      setPipeline(newPipeline);
      setMessage("🔁 Removed module from slot.");
    }
  };

  // Check the pipeline and animate flow
  const checkPipeline = async () => {
    if (isFlowing || isGameOver) return;

    // if empty slot exists, prompt to fill
    if (pipeline.some((s) => s === null)) {
      setMessage("⚠️ Fill all slots before checking.");
      return;
    }

    setIsFlowing(true);
    setFlowStep(-1);
    setMessage("💧 Simulating water flow...");
    // animate flow step-by-step across slots
    for (let i = 0; i < pipelineLen; i++) {
      setFlowStep(i);
      // short wait to simulate flow
      // faster if correct so user feels good; slower if wrong to dramatize clog
      await new Promise((resolve) => setTimeout(resolve, 450));
      // if module is incorrect at current index, we stop and show clog
      if (pipeline[i] !== correctSequence[i]) {
        // clog
        setMessage(`❌ Clog at slot ${i + 1}: ${pipeline[i]} is wrong.`);
        setIsFlowing(false);
        setFlowStep(i);
        // penalty
        setScore((s) => Math.max(0, s - 20));
        setLives((l) => {
          const newL = l - 1;
          if (newL <= 0) {
            setIsGameOver(true);
            setMessage("💀 Game Over! The river remains polluted.");
          }
          return newL;
        });
        return;
      }
    }

    // passed all slots
    setFlowStep(pipelineLen - 1);
    setMessage("✅ Water flowed through! The pipeline works.");
    setScore((s) => s + pipelineLen * 50); // reward
    setIsFlowing(false);
    // celebration burst
    const emojis = ["🎉", "💧", "🌱", "✨", "🟦"];
    const newBurst = Array.from({ length: 10 }).map(
      () => emojis[Math.floor(Math.random() * emojis.length)]
    );
    setBurst(newBurst);
    // auto-advance to next round after short delay
    setTimeout(() => {
      initRound(); // start fresh next round
    }, 1600);
  };

  const handleHint = () => {
    if (isFlowing || isGameOver) return;
    // find first incorrect or empty slot that is not correct
    let idx = pipeline.findIndex((v, i) => v !== correctSequence[i]);
    if (idx === -1) idx = 0; // all correct; hint for slot 1
    setShowHint(true);
    setMessage(
      `💡 Hint: Slot ${idx + 1} should have "${correctSequence[idx]}".`
    );
  };

  const handleReset = () => {
    setScore(0);
    setLives(3);
    initRound();
  };

  // derived UI items
  const scoreLabel = useMemo(() => `⭐ Score: ${score}`, [score]);
  const livesDisplay = useMemo(() => {
    return Array.from({ length: 3 }).map((_, i) => (
      <span key={i} className={`life ${i < lives ? "alive" : "dead"}`}>
        💧
      </span>
    ));
  }, [lives]);

  // small utility for drag-over styling
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="pg-game pg-purify">
      <div className="pg-header">
        <button className="pg-back" onClick={goBack}>
          ← Back
        </button>
        <div className="pg-stats">
          <div className="pg-score">{scoreLabel}</div>
          <div className="pg-lives">{livesDisplay}</div>
        </div>
      </div>

      <h1 className="pg-title">💧 Purify Pipeline</h1>
      <p className="pg-sub">
        Assemble the modules so water flows clean — learn as you build.
      </p>

      {/* pipeline */}
      <div className="pipeline-area" aria-hidden={isGameOver}>
        <motion.div
          className="pipe-start"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Dirty
          <span className="emoji">💧</span>
        </motion.div>

        <div className="pipeline-slots">
          {pipeline.map((slot, idx) => {
            const isActiveFlow = isFlowing && flowStep === idx;
            const isPassed = flowStep > idx && !isFlowing;
            const isFilled = Boolean(slot);
            return (
              <motion.div
                key={idx}
                className={`pipeline-slot ${isFilled ? "filled" : ""} ${
                  isActiveFlow ? "flowing" : ""
                }`}
                onDrop={(e) => handleDrop(e, idx)}
                onDragOver={handleDragOver}
                onClick={() => handleSlotClick(idx)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="slot-label">{slot || `Slot ${idx + 1}`}</div>

                {/* water droplet in this slot if flow passing */}
                <AnimatePresence>
                  {isFlowing && flowStep === idx ? (
                    <motion.div
                      className="water-drop"
                      initial={{ y: -8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      key={`drop-${idx}`}
                    >
                      💧
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {/* subtle check mark when correct placed */}
                <AnimatePresence>
                  {!isFlowing && slot && slot === correctSequence[idx] ? (
                    <motion.span
                      className="ok-badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      key={`ok-${idx}`}
                    >
                      ✓
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="pipe-end"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Clean
          <span className="emoji">✨</span>
        </motion.div>
      </div>

      {/* module bay */}
      <div className="module-bay">
        <h3>🔧 Available Modules</h3>
        <div className="module-list" role="list">
          {modulesPool.map((mod) => (
            <motion.div
              key={mod}
              className="module-item"
              draggable
              onDragStart={(e) => handleDragStart(e, mod)}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.96 }}
              role="listitem"
              title={MODULE_FACTS[mod] || ""}
            >
              <div className="module-name">{mod}</div>
              <div className="module-mini">
                {MODULE_FACTS[mod]?.slice(0, 40) || ""}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* controls */}
      <div className="pg-controls">
        <motion.button
          className="pg-btn hint"
          onClick={handleHint}
          whileHover={{ scale: 1.03 }}
        >
          💡 Hint
        </motion.button>

        <motion.button
          className="pg-btn check"
          onClick={checkPipeline}
          whileHover={{ scale: 1.03 }}
        >
          ✅ Check Pipeline
        </motion.button>

        <motion.button
          className="pg-btn reset"
          onClick={handleReset}
          whileHover={{ scale: 1.03 }}
        >
          ♻️ Reset Game
        </motion.button>
      </div>

      {/* message area */}
      <div className="message-area">
        <AnimatePresence mode="wait">
          <motion.div
            key={message}
            className={`pg-message ${
              message.startsWith("✅")
                ? "good"
                : message.startsWith("❌")
                ? "bad"
                : ""
            }`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {message}
          </motion.div>
        </AnimatePresence>

        {showHint && (
          <div className="hint-card">
            <strong>Module fact:</strong>{" "}
            {MODULE_FACTS[correctSequence[0]] || "No fact available."}
          </div>
        )}
      </div>

      {/* celebration burst */}
      <div className="burst-layer" aria-hidden={!burst.length}>
        {burst.map((emoji, i) => (
          <motion.span
            key={`${emoji}-${i}`}
            className="burst-emoji"
            initial={{ y: 0, opacity: 0, scale: 0.6 }}
            animate={{
              y: -120 - Math.random() * 60,
              opacity: 1,
              scale: 1.4,
              rotate: Math.random() * 90 - 45,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.1 + Math.random() * 0.6,
              ease: "easeOut",
            }}
            style={{ left: `${10 + Math.random() * 80}%` }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>

      <div className="pg-footer-note">
        Tip: click a filled slot to remove a module back to the pool.
      </div>

      {/* Game over overlay */}
      <AnimatePresence>
        {isGameOver && (
          <motion.div
            className="gameover-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.96 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="gameover-card"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <h2>💀 Game Over</h2>
              <p>The river remains polluted. Try again!</p>
              <div className="gameover-actions">
                <button
                  onClick={() => {
                    setLives(3);
                    setScore(0);
                    initRound();
                  }}
                >
                  Restart
                </button>
                <button
                  onClick={() => {
                    setIsGameOver(false);
                    initRound();
                  }}
                >
                  Try Next Round
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Trophy,
  Star,
  Sparkles,
  CheckCircle,
  XCircle,
  Crown,
  Volume2,
  VolumeX,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import Confetti from "react-confetti";

const backend_url = import.meta.env.VITE_API_BASE_URL;

const QuizPage = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const { quizId } = useParams();

  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [musicMuted, setMusicMuted] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.3);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [started, setStarted] = useState(false);

  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);
  const bgMusicRef = useRef(null);
  const resultMusicRef = useRef(null);

  // 🎯 Fetch quiz
  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) return;
      try {
        const token = await getToken();
        const res = await axios.get(
          `${backend_url}/quiz/get-a-single-quiz/${quizId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setQuizData(res.data.quiz?.questions || []);
      } catch (err) {
        console.error("Error fetching quiz:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const maxScore = quizData.reduce((sum, q) => sum + (q.ecoPoints || 0), 0);
  const progress = Math.min((score / maxScore) * 100, 100);
  const level = Math.floor(score / 20) + 1;
  const graphData = [{ name: "Eco-Points", points: animatedScore }];

  // Load sounds
  useEffect(() => {
    correctSoundRef.current = new Audio("/sounds/correct.mp3");
    wrongSoundRef.current = new Audio("/sounds/wrong.mp3");
    bgMusicRef.current = new Audio("/sounds/background.mp3");
    resultMusicRef.current = new Audio("/sounds/winner.mp3");

    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = musicVolume;
    resultMusicRef.current.volume = musicVolume;

    return () => {
      [bgMusicRef, resultMusicRef, correctSoundRef, wrongSoundRef].forEach(
        (ref) => {
          if (ref.current) {
            ref.current.pause();
            ref.current.currentTime = 0;
          }
        }
      );
    };
  }, []);

  useEffect(() => {
    if (bgMusicRef.current) bgMusicRef.current.volume = musicVolume;
    if (resultMusicRef.current) resultMusicRef.current.volume = musicVolume;
  }, [musicVolume]);

  const toggleMusic = () => {
    if (musicMuted) {
      !submitted ? bgMusicRef.current?.play() : resultMusicRef.current?.play();
    } else {
      bgMusicRef.current?.pause();
      resultMusicRef.current?.pause();
    }
    setMusicMuted(!musicMuted);
  };

  const handleOptionSelect = (qIndex, optionIndex) => {
    if (answers[qIndex] !== undefined) return;

    setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));

    const selectedOption = quizData[qIndex].options[optionIndex];
    const correctOption = quizData[qIndex].correct_answer;

    if (selectedOption === correctOption) {
      setScore((prev) => prev + (quizData[qIndex].points || 0));
      correctSoundRef.current?.play();
    } else {
      wrongSoundRef.current?.play();
    }
  };

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);

    bgMusicRef.current?.pause();
    bgMusicRef.current.currentTime = 0;
    resultMusicRef.current.loop = true;
    resultMusicRef.current.play();

    setTimeout(() => navigate("/admin/dashboard"), 8000);
  };

  // Timer
  useEffect(() => {
    if (!started || submitted) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted, started]);

  // Animate score
  useEffect(() => {
    if (!submitted) return;
    let start = 0;
    const end = score;
    const duration = 1000;
    const increment = end / (duration / 16);
    const animate = () => {
      start += increment;
      if (start < end) {
        setAnimatedScore(Math.floor(start));
        requestAnimationFrame(animate);
      } else {
        setAnimatedScore(end);
      }
    };
    animate();
  }, [submitted, score]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleStartQuiz = () => {
    setStarted(true);
    bgMusicRef.current?.play().catch(() => {
      console.log("User interaction required for audio.");
    });
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-green-700 font-bold text-xl">
        Loading quiz...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-500 via-emerald-400 to-teal-500 p-6 overflow-hidden">
      {/* ✨ Floating particles for gamified vibe */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/30 blur-xl animate-pulse"
          style={{
            width: `${10 + Math.random() * 30}px`,
            height: `${10 + Math.random() * 30}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${3 + Math.random() * 5}s`,
          }}
        />
      ))}

      {!started ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center text-center space-y-6 bg-white/90 p-10 rounded-3xl shadow-[0_0_30px_rgba(34,197,94,0.5)]"
        >
          <Sparkles className="w-12 h-12 text-yellow-400 animate-bounce" />
          <h1 className="text-4xl font-extrabold text-green-800 drop-shadow-md">
            🌱 Eco Quiz Arena
          </h1>
          <p className="text-lg text-gray-700">
            Test your eco-knowledge, earn XP, and level up! <br />
            You’ll have <strong>5 minutes</strong> to finish.
          </p>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleStartQuiz}
              className="px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-700 rounded-2xl shadow-lg hover:shadow-green-600/50 transition"
            >
              🚀 Start Battle
            </Button>
          </motion.div>
        </motion.div>
      ) : !submitted ? (
        <div className="w-full max-w-3xl space-y-6 mt-16">
          {/* Timer & Music */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full shadow-lg">
              <Clock className="w-5 h-5 text-green-700" />
              <span className="font-bold text-green-800">
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleMusic}
                className="bg-green-600 p-2 rounded-full shadow-lg text-white hover:bg-green-700 transition"
              >
                {musicMuted ? <VolumeX /> : <Volume2 />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={musicVolume}
                onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                className="w-24 cursor-pointer accent-green-600"
              />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-green-900 font-bold mb-1">
              <span>
                <Crown className="inline w-4 h-4 text-yellow-500" /> Level{" "}
                {level}
              </span>
              <span>
                {score}/{maxScore} pts
              </span>
            </div>
            <div className="w-full h-5 bg-green-200 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-5 bg-gradient-to-r from-green-400 via-emerald-500 to-green-700 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.7)]"
              />
            </div>
          </div>

          {/* Questions */}
          {quizData.map((q, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="shadow-xl rounded-2xl border-green-200 bg-white/95 backdrop-blur-sm hover:shadow-green-400/40 transition">
                <CardHeader className="bg-green-50 rounded-t-2xl">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" /> Q{index + 1}:{" "}
                    {q.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {q.options.map((opt, optIndex) => {
                    const selected = answers[index] === optIndex;
                    const isCorrect = opt === q.correct_answer;
                    return (
                      <motion.div
                        key={optIndex}
                        whileTap={{ scale: 0.97 }}
                        className={`p-3 rounded-lg border font-medium cursor-pointer transition-all ${
                          selected && isCorrect
                            ? "bg-green-200 border-green-600 text-green-900 shadow-inner"
                            : selected && !isCorrect
                            ? "bg-red-200 border-red-600 text-red-900 shadow-inner"
                            : "bg-white border-gray-300 hover:bg-green-50"
                        }`}
                        onClick={() => handleOptionSelect(index, optIndex)}
                      >
                        {opt}
                        {selected && isCorrect && (
                          <CheckCircle className="inline w-5 h-5 ml-2 text-green-600" />
                        )}
                        {selected && !isCorrect && (
                          <XCircle className="inline w-5 h-5 ml-2 text-red-600" />
                        )}
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Submit */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-6"
          >
            <Button
              onClick={handleSubmit}
              className="relative w-full py-4 text-lg font-extrabold text-white rounded-2xl
               bg-gradient-to-r from-green-500 via-emerald-600 to-green-700 
               shadow-[0_0_25px_rgba(16,185,129,0.7)]
               hover:from-green-600 hover:via-emerald-700 hover:to-green-800
               transition-all duration-300"
            >
              🌟 Submit Quiz 🌟
            </Button>
          </motion.div>
        </div>
      ) : (
        <div className="w-full relative">
          <Confetti recycle={false} numberOfPieces={300} />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-6 w-full max-w-lg bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 mx-auto mt-16"
          >
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto animate-bounce" />
            <h2 className="text-3xl font-extrabold text-green-800">
              Victory! 🎉
            </h2>
            <p className="text-xl">
              You earned{" "}
              <span className="font-bold text-green-700">
                {score} Eco-Points
              </span>{" "}
              🌱
            </p>
            <p className="text-lg text-green-700 font-bold">
              Reached Level {level}! 🚀
            </p>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="points"
                    fill="#16a34a"
                    radius={[10, 10, 0, 0]}
                    isAnimationActive={true}
                    animationDuration={1000}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-gray-600 italic">
              Redirecting to your dashboard...
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Medal, Award, Trash2, Star, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import DailyMissionCard from "@/components/DailyMissionCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const backend_url = import.meta.env.VITE_API_BASE_URL;

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [availableQuizzes, setAvailableQuize] = useState([]);
  const [communityPost, setCommunityPost] = useState([]);
  const [drives, setDrives] = useState([]);
  const [registered, setRegistered] = useState({});
  const [activeDrive, setActiveDrive] = useState(null);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // -------- Fetch Data ----------
  const getALLQuize = async () => {
    const token = await getToken();
    try {
      const res = await axios.get(`${backend_url}/quiz/get-all-quiz`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data && Array.isArray(res.data.quizes)) {
        setAvailableQuize(res.data.quizes);
      }
    } catch (err) {
      console.error("Error fetching quizzes:", err);
    }
  };

  const getAllCommunityPost = async () => {
    const token = await getToken();
    try {
      const res = await axios.get(`${backend_url}/post/get-user-post`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCommunityPost(res.data.posts);
    } catch (err) {
      console.log("error in fetching community Post", err.message);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const token = await getToken();
      await axios.delete(`${backend_url}/post/delete-post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("🗑️ Post deleted successfully");
    } catch (err) {
      alert("❌ Error while deleting post");
    }
  };

  const fetchedAllDrive = async () => {
    const token = await getToken();
    try {
      const res = await axios.get(`${backend_url}/drives/get-all-drives`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDrives(res.data.drives || []);
    } catch (err) {
      console.log("error while fetching drives data", err.message);
    }
  };

  useEffect(() => {
    getALLQuize();
    getAllCommunityPost();
    fetchedAllDrive();
  }, []);

  // -------- Static Student Data ----------
  const [student] = useState({
    name: "Aarav Sharma",
    avatar: "/images/student-avatar.png",
    xp: 3200,
    level: 7,
    badges: ["Eco Hero", "Green Warrior", "Sustainability Star"],
    games: [
      { id: 1, title: "Waste Segregation Challenge", xpBoost: 150 },
      { id: 2, title: "Recycling Rush", xpBoost: 120 },
      { id: 3, title: "Zero-Waste Kitchen", xpBoost: 100 },
    ],
  });

  const progressData = [
    { day: "Mon", xp: 200 },
    { day: "Tue", xp: 400 },
    { day: "Wed", xp: 600 },
    { day: "Thu", xp: 750 },
    { day: "Fri", xp: 900 },
    { day: "Sat", xp: 1200 },
    { day: "Sun", xp: 1500 },
  ];

  // -------- Handlers ----------
  const handleEnter = (id) => {
    setRegistered((prev) => ({ ...prev, [id]: true }));
  };

  const handleComplete = (drive) => {
    setActiveDrive(drive);
  };

  const handleSubmitCompletion = async (e) => {
    e.preventDefault();
    if (!activeDrive) return;

    const formData = new FormData();
    formData.append("description", description);
    formData.append("ecoPoints", activeDrive.ecoPoints);
    formData.append("mission_id", activeDrive._id);
    if (image) formData.append("image", image);
    const token = await getToken();

    try {
      await axios.post(`${backend_url}/task/submission`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Drive completed successfully!");
      setActiveDrive(null);
      setDescription("");
      setImage(null);
    } catch (err) {
      alert("❌ Failed to complete drive");
    }
  };

  return (
    <div className="p-8 space-y-12 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] min-h-screen text-white">
      {/* Hero Section */}
      <section className="text-center">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-extrabold tracking-widest text-green-400 drop-shadow-lg"
        >
          🌍 Planet Guardians Dashboard
        </motion.h1>
        <p className="text-gray-300 mt-2">Gamify your eco-journey 🚀</p>
      </section>

      <DailyMissionCard />

      {/* XP Progress + Badges */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress */}
        <Card className="lg:col-span-2 shadow-2xl rounded-3xl border-0 bg-gradient-to-br from-green-700/70 to-green-500/60 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl font-extrabold text-green-200">
              ⚡ XP Progress This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#4ade80" />
                <XAxis dataKey="day" stroke="#bbf7d0" />
                <YAxis stroke="#bbf7d0" />
                <Tooltip
                  contentStyle={{
                    background: "#064e3b",
                    color: "white",
                    borderRadius: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="xp"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#xpGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="shadow-2xl rounded-3xl border-0 bg-gradient-to-br from-yellow-600/70 to-yellow-400/60 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-white">
              <Medal /> Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {student.badges.map((badge, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2 bg-yellow-200/20 border border-yellow-400/60 px-4 py-2 rounded-xl text-sm font-semibold shadow-md"
                >
                  <Award className="w-4 h-4 text-yellow-300" /> {badge}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Games */}
      <section>
        <h2 className="text-2xl font-extrabold text-purple-300 mb-6">
          🎮 Games
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {student.games.map((game) => (
            <motion.div
              key={game.id}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col justify-between bg-purple-900/40 p-6 rounded-3xl shadow-lg border border-purple-400/40 hover:shadow-purple-500/50 transition"
            >
              <div>
                <h3 className="font-bold text-lg text-white">{game.title}</h3>
                <p className="text-sm text-gray-300">+{game.xpBoost} XP</p>
              </div>
              <Button
                className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full shadow-md"
                onClick={() => navigate("/gamesection")}
              >
                Play Now 🚀
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quizzes */}
      <section>
        <h2 className="text-2xl font-extrabold text-blue-300 mb-6">
          📝 Available Quizzes
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {availableQuizzes.map((quiz) => (
            <motion.div
              key={quiz._id}
              whileHover={{ scale: 1.05 }}
              className="min-w-[250px] bg-blue-900/40 border border-blue-400/40 rounded-3xl shadow-lg p-5 hover:shadow-blue-500/50 transition"
            >
              <h3 className="font-semibold text-lg text-white mb-2">
                {quiz.topic}
              </h3>
              <p className="text-gray-300 mb-3">
                Earn{" "}
                {quiz.level === "Easy"
                  ? quiz.total_questions * 2
                  : quiz.level === "Medium"
                  ? quiz.total_questions * 3
                  : quiz.total_questions * 5}{" "}
                Eco-Points
              </p>
              <Button
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-full shadow-md"
                onClick={() => navigate(`/takequiz/${quiz._id}`)}
              >
                Take Quiz ✨
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Drives */}
      <section>
        <h2 className="text-2xl font-extrabold text-green-300 mb-6">
          🌍 Event Drives
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {drives.map((d) => (
            <motion.div
              key={d._id}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 w-72 p-6 rounded-3xl bg-gradient-to-br from-green-900/40 to-green-700/40 border border-green-400/40 shadow-lg hover:shadow-green-500/50 transition cursor-pointer"
              onClick={() => navigate(`/drive/${d._id}`)}
            >
              <p className="font-semibold text-lg text-white">{d.title}</p>
              <p className="text-xs text-gray-300">👥 By {d.creator?.name}</p>
              <p className="text-xs text-gray-300">
                🌱 Impact: {d.impactLevel}
              </p>
              <p className="text-xs text-gray-300">
                👤 {d.total_participants} slots
              </p>
              <p className="text-xs font-medium text-green-300">
                ✨ +{d.ecoPoints} eco-points
              </p>
              {registered[d._id] ? (
                <p className="text-sm font-medium text-green-400 bg-green-800/40 border border-green-400/50 rounded-lg px-3 py-1 text-center">
                  ✅ Registered
                </p>
              ) : (
                <Button
                  className="w-full mt-3 py-2 text-sm rounded-full font-semibold text-white bg-green-600 hover:bg-green-700 shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnter(d._id);
                  }}
                >
                  🚀 Enter
                </Button>
              )}
              <Button
                className="w-full mt-2 py-2 text-sm rounded-full font-semibold text-white bg-yellow-500 hover:bg-yellow-600 shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  handleComplete(d);
                }}
              >
                ✅ Complete
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Community Posts */}
      <section>
        <h2 className="text-2xl font-extrabold text-pink-300 mb-6">
          🌿 Community Posts
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {communityPost.map((post) => (
            <motion.div
              key={post._id}
              whileHover={{ scale: 1.05 }}
              className="relative min-w-[250px] bg-pink-900/40 border border-pink-400/40 rounded-3xl shadow-lg p-4 hover:shadow-pink-500/50 transition"
            >
              {/* Delete */}
              <button
                onClick={() => handleDelete(post._id)}
                className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <img
                src={post.mediaUrl}
                alt={post.title}
                className="w-full h-32 object-cover rounded-2xl mb-3"
              />
              <h3 className="font-semibold text-base text-white mb-1">
                {post.content.slice(0, 25)}...
              </h3>
              <p className="text-xs text-gray-300">
                By: {post.user?.name || "Unknown"}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Completion Popup */}
      <Dialog open={!!activeDrive} onOpenChange={() => setActiveDrive(null)}>
        <DialogContent className="bg-[#1f2937]/95 max-w-md w-full rounded-3xl p-6 backdrop-blur-md shadow-2xl border border-green-500/50">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-green-300">
              Complete Drive 🌟
            </DialogTitle>
            <p className="text-sm text-gray-400">
              Submit your completion details for{" "}
              <span className="font-semibold">{activeDrive?.title}</span>
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmitCompletion} className="space-y-4 mt-4">
            <Textarea
              placeholder="Write a short description of your contribution..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-gray-700 focus:ring-green-500 rounded-xl bg-gray-800 text-white"
              required
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="border-gray-700 bg-gray-800 text-gray-200 rounded-xl"
            />
            <DialogFooter className="flex justify-end gap-3 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveDrive(null)}
                className="rounded-full border border-gray-500 text-gray-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-full shadow-md"
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentDashboard;

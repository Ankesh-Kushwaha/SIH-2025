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
import { Medal, Award } from "lucide-react";
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
    <div className="p-6 space-y-10 bg-gradient-to-br from-emerald-50 via-green-100 to-blue-50 min-h-screen">
      <DailyMissionCard />

      {/* XP Progress + Badges */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-2xl rounded-3xl border border-green-200 bg-white/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl font-extrabold text-green-800 drop-shadow-sm">
              🌱 XP Progress This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                <XAxis dataKey="day" stroke="#065f46" />
                <YAxis stroke="#065f46" />
                <Tooltip
                  contentStyle={{ background: "#f0fdf4", borderRadius: "12px" }}
                />
                <Area
                  type="monotone"
                  dataKey="xp"
                  stroke="#059669"
                  strokeWidth={4}
                  fill="url(#xpGradient)"
                  fillOpacity={0.7}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-2xl rounded-3xl border border-yellow-200 bg-white/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-yellow-700">
              <Medal /> Earned Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {student.badges.map((badge, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition"
                >
                  <Award className="w-4 h-4" /> {badge}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Games */}
      <section>
        <h2 className="text-2xl font-extrabold text-purple-700 mb-4">
          🌟 Games
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {student.games.map((game) => (
            <motion.div
              key={game.id}
              whileHover={{ scale: 1.03 }}
              className="flex flex-col justify-between bg-purple-50 p-5 rounded-3xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div>
                <h3 className="font-bold text-lg">{game.title}</h3>
                <p className="text-sm text-gray-600">+{game.xpBoost} XP</p>
              </div>
              <Button
                className="mt-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white rounded-full shadow-md"
                onClick={() => navigate("/gamesection")}
              >
                Play Now
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quizzes */}
      <section>
        <h2 className="text-2xl font-extrabold text-blue-700 mb-4">
          📝 Available Quizzes
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {availableQuizzes.map((quiz) => (
            <motion.div
              key={quiz._id}
              whileHover={{ scale: 1.03 }}
              className="min-w-[250px] bg-blue-50 rounded-3xl shadow-lg p-5 flex flex-col justify-between hover:shadow-2xl transition"
            >
              <h3 className="font-semibold text-lg mb-2">{quiz.topic}</h3>
              <p className="text-gray-700 mb-3">
                Earn{" "}
                {quiz.level === "Easy"
                  ? quiz.total_questions * 2
                  : quiz.level === "Medium"
                  ? quiz.total_questions * 3
                  : quiz.total_questions * 5}{" "}
                Eco-Points
              </p>
              <Button
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-full shadow-md"
                onClick={() => navigate(`/takequiz/${quiz._id}`)}
              >
                Take Quiz
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Drives */}
      <section>
        <h2 className="text-2xl font-extrabold text-red-700 mb-4">
          🌍 Current Event Drives
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {drives.map((d) => (
            <motion.div
              key={d._id}
              whileHover={{ scale: 1.03 }}
              className="flex-shrink-0 w-72 p-5 rounded-3xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 shadow-lg flex flex-col gap-3 hover:shadow-2xl transition cursor-pointer"
              onClick={() => navigate(`/drive/${d._id}`)} // <-- navigate on click
            >
              <p className="font-semibold text-gray-900">{d.title}</p>
              <p className="text-xs text-gray-600">👥 By {d.creator?.name}</p>
              <p className="text-xs text-gray-600">
                🌱 Impact: {d.impactLevel}
              </p>
              <p className="text-xs text-gray-600">
                👤 {d.total_participants} slots
              </p>
              <p className="text-xs font-medium text-green-700">
                ✨ +{d.ecoPoints} eco-points
              </p>
              {registered[d._id] ? (
                <p className="text-sm font-medium text-green-600 bg-green-100 rounded-lg px-3 py-1 text-center">
                  ✅ Registered
                </p>
              ) : (
                <Button
                  className="w-full py-2 text-sm rounded-full font-semibold text-white bg-green-600 hover:bg-green-700 shadow-md"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click from triggering
                    handleEnter(d._id);
                  }}
                >
                  🚀 Enter
                </Button>
              )}
              <Button
                className="w-full py-2 text-sm rounded-full font-semibold text-white bg-yellow-500 hover:bg-yellow-600 shadow-md"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click from triggering
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
        <h2 className="text-2xl font-extrabold text-green-700 mb-4">
          🌿 Community Posts
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {communityPost.map((post) => (
            <motion.div
              key={post._id}
              whileHover={{ scale: 1.03 }}
              className="relative min-w-[250px] bg-green-50 rounded-3xl shadow-lg p-4 flex flex-col hover:shadow-2xl transition"
            >
              <img
                src={post.mediaUrl}
                alt={post.title}
                className="w-full h-32 object-cover rounded-2xl mb-3"
              />
              <h3 className="font-semibold text-base text-gray-800 mb-1">
                {post.content.slice(0, 25)}...
              </h3>
              <p className="text-xs text-gray-500">
                By: {post.user?.name || "Unknown"}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Completion Popup */}
      <Dialog open={!!activeDrive} onOpenChange={() => setActiveDrive(null)}>
        <DialogContent className="bg-white/90 max-w-md w-full rounded-3xl p-6 backdrop-blur-md shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-green-800">
              Complete Drive 🌟
            </DialogTitle>
            <p className="text-sm text-gray-500">
              Submit your completion details for{" "}
              <span className="font-semibold">{activeDrive?.title}</span>
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmitCompletion} className="space-y-4 mt-4">
            <Textarea
              placeholder="Write a short description of your contribution..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-gray-300 focus:ring-green-500 rounded-xl"
              required
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="border-gray-300 rounded-xl"
            />
            <DialogFooter className="flex justify-end gap-3 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveDrive(null)}
                className="rounded-full"
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

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
  const [activeDrive, setActiveDrive] = useState(null); // controls popup
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
    setActiveDrive(drive); // open popup
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
    <div className="p-6 space-y-8 bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <DailyMissionCard />

      {/* XP Progress + Badges */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-xl rounded-2xl border bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-green-700">
              XP Progress This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="xp"
                  stroke="#059669"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#xpGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-2xl border bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-yellow-600">
              <Medal /> Earned Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {student.badges.map((badge, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl text-sm font-semibold shadow"
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
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {student.games.map((game) => (
            <motion.div
              key={game.id}
              whileHover={{ scale: 1.03 }}
              className="flex flex-col justify-between bg-purple-50 p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <div>
                <h3 className="font-semibold text-lg">{game.title}</h3>
                <p className="text-sm text-gray-500">+{game.xpBoost} XP</p>
              </div>
              <Button
                className="mt-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
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
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          Available Quizzes
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {availableQuizzes.map((quiz) => (
            <motion.div
              key={quiz._id}
              whileHover={{ scale: 1.03 }}
              className="min-w-[250px] bg-blue-50 rounded-xl shadow p-4 flex flex-col justify-between"
            >
              <h3 className="font-semibold text-lg mb-2">{quiz.topic}</h3>
              <p className="text-gray-600 mb-3">
                Earn{" "}
                {quiz.level === "Easy"
                  ? quiz.total_questions * 2
                  : quiz.level === "Medium"
                  ? quiz.total_questions * 3
                  : quiz.total_questions * 5}{" "}
                Eco-Points
              </p>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
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
        <h2 className="text-2xl font-bold text-red-700 mb-4">
          Current Event Drives
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {drives.map((d) => (
            <motion.div
              key={d._id}
              whileHover={{ scale: 1.03 }}
              className="flex-shrink-0 w-72 p-4 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 shadow-md flex flex-col gap-3 transition-all cursor-pointer"
            >
              <p className="font-semibold text-gray-900">{d.title}</p>
              <p className="text-xs text-gray-600">👥 By {d.creator?.name}</p>
              <p className="text-xs text-gray-600">
                🌍 Impact: {d.impactLevel}
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
                  className="w-full py-2 text-sm rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700"
                  onClick={() => handleEnter(d._id)}
                >
                  🚀 Enter
                </Button>
              )}
              <Button
                className="w-full py-2 text-sm rounded-xl font-semibold text-white bg-yellow-500 hover:bg-yellow-600"
                onClick={() => handleComplete(d)}
              >
                ✅ Complete
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Community Posts */}
      <section>
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          Community Posts
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {communityPost.map((post) => (
            <motion.div
              key={post._id}
              whileHover={{ scale: 1.03 }}
              className="relative min-w-[250px] bg-green-50 rounded-xl shadow-lg p-3 flex flex-col"
            >
              <img
                src={post.mediaUrl}
                alt={post.title}
                className="w-full h-32 object-cover rounded-lg mb-3"
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
        <DialogContent className="bg-white max-w-md w-full rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-green-700">
              Complete Drive
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
              className="border-gray-300 focus:ring-green-500"
              required
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="border-gray-300"
            />
            <DialogFooter className="flex justify-end gap-3 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveDrive(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white"
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

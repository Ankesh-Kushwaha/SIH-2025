import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import avatar from "../assets/master.png";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Medal,
  Gamepad2,
  Star,
  Award,
  Newspaper,
  Activity,
  X,
  Trash2
} from "lucide-react";
import { motion ,AnimatePresence} from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '@clerk/clerk-react';
import DailyMissionCard from "@/components/DailyMissionCard";
const backend_url = import.meta.env.VITE_API_BASE_URL;


const StudentDashboard = () => {
  const navigate = useNavigate();
  const [availableQuizzes, setAvailableQuize] = useState([]);
  const [communityPost, setCommunityPost] = useState([]);
  const [drives, setDrives] = useState([]);
  const { getToken } = useAuth();
  const [registered, setRegistered] = useState({});
  const [activeDrive, setActiveDrive] = useState(null);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
 

   const getALLQuize = async () => {
        const token = await getToken();
        try {
          const res = await axios.get(`${backend_url}/quiz/get-all-quiz`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          // backend returns { quizes: [...], total: ... }
          if (res.data && Array.isArray(res.data.quizes)) {
            setAvailableQuize(res.data.quizes);
          } else {
            console.error("Unexpected response format:", res.data);
          }
        } catch (err) {
          console.error("Error fetching quizzes:", err);
        }
  };
  
  const getAllCommunityPost = async () => {
    const token = await getToken();
    
    try {
        const res = await axios.get(`${backend_url}/post/get-user-post`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
      setCommunityPost(res.data.posts);
    }
    catch (err) {
      alert('error in fetching community Post');
      console.log(err.message);
    }

    
  }
  
  const handleDelete = async (postId)=>{
    const token =  await  getToken();
    try {
        const res = await axios.delete(
          `${backend_url}/post/delete-post/${postId}`, {
            headers: {
                Authorization:`Bearer ${token}`
             }
          }
      );
      
      alert(res.data.message);
    }
    catch (err) {
      alert("error while deleting the post");
      console.log("error while deleting the post", err.message);
    }
  }
  
  const fetchedAllDrive = async () => {
      const token = await getToken();
      try {
        const res = await axios.get(`${backend_url}/drives/get-all-drives`, {
          headers: {
              Authorization:`Bearer ${token}`
            }
        })
        
        if (!res.data.success) {
          alert("error while fetching drive data");
        }
        setDrives(res.data.drives);
        console.log(res.data.drives);
      }
      catch (err) {
        alert('error while fetching drives data');
        console.log("error while fetching drive data", err.message);
      }
    }
  
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

    try {
      await axios.post(
        `${backend_url}/community/complete-drive/${activeDrive._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("✅ Drive completed successfully!");
      setActiveDrive(null);
      setDescription("");
      setImage(null);
    } catch (err) {
      console.error("Error completing drive:", err);
      alert("❌ Failed to complete drive");
    }
  };

    const handleCardClick = (id) => {
      navigate(`/drive/${id}`); // Navigate to dedicated drive page
    };

  useEffect(() => {
    getALLQuize();
    getAllCommunityPost();
    fetchedAllDrive();
  },[])

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


  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-gradient-to-br from-green-50 via-white to-emerald-50 min-h-screen">
      {/* Student Profile */}
      <DailyMissionCard />

      {/* XP Progress Chart */}
      <Card className="lg:col-span-2 w-full h-100 shadow-2xl rounded-2xl border border-gray-200 bg-white">
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
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              />
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
        {/* Badges Section */}
        <Card className="lg:col-span-1 m-5 shadow-2xl rounded-2xl border border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-yellow-600">
              <Medal /> Earned Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {student.badges.map((badge, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, rotate: 1 }}
                  className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl text-sm font-semibold shadow"
                >
                  <Award className="w-4 h-4" /> {badge}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Games Section */}
        <Card className="lg:col-span-2 shadow-2xl rounded-2xl border border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-purple-700">
              <Gamepad2 /> Play Games to Earn XP
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {student.games.map((game) => (
              <motion.div
                key={game.id}
                whileHover={{ scale: 1.03 }}
                className="flex justify-between items-center bg-purple-50 p-4 rounded-xl shadow hover:shadow-xl transition"
              >
                <div>
                  <h3 className="font-semibold text-lg">{game.title}</h3>
                  <p className="text-sm text-gray-500">+{game.xpBoost} XP</p>
                </div>
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-5 py-2"
                  onClick={() => navigate("/gamesection")}
                >
                  Play Now
                </Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </Card>

      {/* Available Quizzes */}
      <Card className="lg:col-span-3 shadow-2xl rounded-2xl border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-blue-700">
            <Star /> Available Quizzes
          </CardTitle>
        </CardHeader>
        <CardContent>
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
                  onClick={() =>
                    navigate((window.location.href = `/takequiz/${quiz._id}`))
                  }
                >
                  Take Quiz
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Event Drives */}
      <Card className="lg:col-span-3 shadow-2xl rounded-2xl border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-red-700">
            <Activity /> Current Event Drives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {drives.map((d) => (
              <motion.div
                key={d._id}
                whileHover={{ scale: 1.03 }}
                className="flex-shrink-0 w-72 p-4 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 shadow-md flex flex-col gap-3 transition-all cursor-pointer"
                onClick={() => handleCardClick(d._id)} // Navigate on click
              >
                {/* Title + delete */}
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-gray-900 text-base line-clamp-1">
                    {d.title}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card navigation when deleting
                      deleteDrive(d._id);
                    }}
                    className="p-1.5 rounded-full hover:bg-red-100 transition"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs text-gray-600">
                    👥 By {d.creator?.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    🌍 Impact: {d.impactLevel}
                  </p>
                  <p className="text-xs text-gray-600">
                    👤 {d.total_participants} slots
                  </p>
                  <p className="text-xs font-medium text-green-700">
                    ✨ +{d.ecoPoints} eco-points / participant
                  </p>
                </div>

                {/* Action Buttons */}
                {registered[d._id] ? (
                  <p className="text-sm font-medium text-green-600 bg-green-100 rounded-lg px-3 py-1 text-center">
                    ✅ Registered
                  </p>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card navigation
                      handleEnter(d._id);
                    }}
                    className="w-full py-2 text-sm rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 transition"
                  >
                    🚀 Enter
                  </button>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card navigation
                    handleComplete(d);
                  }}
                  className="w-full py-2 text-sm rounded-xl font-semibold text-white bg-yellow-500 hover:bg-yellow-600 transition"
                >
                  ✅ Complete
                </button>
              </motion.div>
            ))}
          </div>
        </CardContent>

        {/* Complete Modal */}
        <AnimatePresence>
          {activeDrive && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl p-6"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
              >
                <button
                  onClick={() => setActiveDrive(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>

                <h3 className="text-2xl font-bold text-green-700 mb-4">
                  Complete Drive: {activeDrive.title}
                </h3>

                <form onSubmit={handleSubmitCompletion} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      placeholder="Describe what was done in this drive..."
                      className="w-full rounded-lg border px-4 py-2 text-gray-800 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      className="w-full rounded-lg border px-4 py-2 text-gray-800 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 transition"
                  >
                    Submit Completion
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Community Posts */}
      <Card className="lg:col-span-3 shadow-2xl rounded-2xl border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-green-700">
            <Newspaper /> Community Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {communityPost.map((post) => (
              <motion.div
                key={post._id}
                whileHover={{ scale: 1.03 }}
                className="relative min-w-[250px] bg-green-50 rounded-xl shadow-lg p-3 flex flex-col"
              >
                {/* Delete button (cross icon) */}
                <button
                  onClick={() => handleDelete(post._id)}
                  className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 hover:shadow-md transition"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>

                {/* Post image */}
                <img
                  src={post.mediaUrl}
                  alt={post.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />

                {/* Post content */}
                <h3 className="font-semibold text-base text-gray-800 mb-1">
                  {post.content.slice(0, 25)}...
                </h3>

                {/* Optional: small footer */}
                <p className="text-xs text-gray-500">
                  By: {post.user?.name || "Unknown"}
                </p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;

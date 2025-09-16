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
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useAuth} from '@clerk/clerk-react'
const backend_url = import.meta.env.VITE_API_BASE_URL;

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [availableQuizzes, setAvailableQuize] = useState([]);
  const { getToken} = useAuth();

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
            console.log(res.data.quizes);
          } else {
            console.error("Unexpected response format:", res.data);
          }
        } catch (err) {
          console.error("Error fetching quizzes:", err);
        }
      };

  useEffect(() => {
    getALLQuize(); 
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

  // Dummy data for new sections
 const communityPosts = [
   {
     id: 1,
     title: "Beach Cleanup Highlights",
     img: "../../public/communityPostDemo/img1.jpg",
   },
   {
     id: 2,
     title: "Plastic-Free Market Day",
     img: "../../public/communityPostDemo/img2.jpg",
   },
   {
     id: 3,
     title: "Tree Plantation Drive",
     img: "../../public/communityPostDemo/img3.jpg",
   },
   {
     id: 3,
     title: "Tree Plantation Drive",
     img: "../../public/communityPostDemo/img4.jpg",
   },
   {
     id: 3,
     title: "Tree Plantation Drive",
     img: "../../public/communityPostDemo/img1.jpg",
   },
   {
     id: 3,
     title: "Tree Plantation Drive",
     img: "../../public/communityPostDemo/img2.jpg",
   },
  ];
  
  const eventDrives = [
    { id: 1, title: "River Cleaning Drive", date: "20 Sept" },
    { id: 2, title: "Urban Gardening Week", date: "25 Sept" },
    { id: 3, title: "E-Waste Collection", date: "30 Sept" },
  ];

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-gradient-to-br from-green-50 via-white to-emerald-50 min-h-screen">
      {/* Student Profile */}
      <motion.div whileHover={{ scale: 1.02 }} className="lg:col-span-1">
        <Card className="shadow-2xl rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-green-50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-green-700">
              Student Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <motion.img
              src={avatar}
              alt="Avatar"
              whileHover={{ rotate: 2, scale: 1.05 }}
              className="w-28 h-28 rounded-full border-4 border-green-400 shadow-lg"
            />
            <h2 className="text-xl font-bold mt-4">{student.name}</h2>
            <p className="text-gray-600 text-sm">Level {student.level}</p>
            <div className="mt-4 w-full">
              <Progress value={(student.xp % 1000) / 10} className="h-3" />
              <p className="text-sm mt-1 text-gray-500">XP: {student.xp}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* XP Progress Chart */}
      <Card className="lg:col-span-2 shadow-2xl rounded-2xl border border-gray-200 bg-white">
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
      </Card>

      {/* Badges Section */}
      <Card className="lg:col-span-1 shadow-2xl rounded-2xl border border-gray-200 bg-white">
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
                  Earn {" "}
                  {quiz.level === "Easy"
                    ? quiz.total_questions * 2
                    : quiz.level === "Medium"
                    ? quiz.total_questions * 3
                      : quiz.total_questions * 5}
                  {" "}
                  Points
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
            {eventDrives.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ scale: 1.03 }}
                className="min-w-[250px] bg-red-50 rounded-xl shadow p-4"
              >
                <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                <p className="text-gray-600">Date: {event.date}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
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
            {communityPosts.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ scale: 1.03 }}
                className="min-w-[250px] bg-green-50 rounded-xl shadow p-3"
              >
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="font-semibold text-lg">{post.title}</h3>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;

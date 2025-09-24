import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Trophy, Users, Star, X } from "lucide-react";
import heroTurtle from "../assets/unnamed.png";
import winnerAvatar from "../assets/winner-avatar.png";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { name: "Tree Planting", value: 45, icon: "🌳" },
  { name: "Recycling", value: 70, icon: "♻️" },
  { name: "Beach Cleanup", value: 30, icon: "🏖️" },
  { name: "Awareness", value: 55, icon: "📣" },
];

const Home = () => {
  const [showDemo, setShowDemo] = useState(false);
  const videoRef = useRef(null);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setShowDemo(false);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden font-poppins bg-gradient-to-b from-green-50 via-cyan-50 to-emerald-100">
      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-green-300 rounded-full opacity-30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -15 + Math.random() * 10, 0] }}
          transition={{ repeat: Infinity, duration: 5 + Math.random() * 5 }}
        />
      ))}

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-fredoka leading-tight bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-cyan-500 to-blue-400 drop-shadow-lg"
          >
            Learn. Play. <br />
            and Save the{" "}
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              Planet 🌍
            </motion.span>
          </motion.h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-xl drop-shadow-sm">
            Planet Guardian is a gamified platform where missions, rewards, and
            badges turn learning about the environment into an exciting
            adventure!
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <motion.div whileHover={{ scale: 1.1 }} className="relative">
              <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-xl text-lg font-bold animate-pulse">
                Get Started!
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                onClick={() => setShowDemo(true)}
                className="bg-white border-2 border-green-500 hover:bg-green-100 text-green-600 px-6 py-3 rounded-full shadow-lg text-lg font-bold"
              >
                Watch Demo
              </Button>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center relative"
        >
          <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-full p-6 shadow-2xl animate-bounce">
            <motion.img
              src={heroTurtle}
              alt="Planet Guardian Turtle"
              className="w-72 md:w-80 h-80 object-cover rounded-full drop-shadow-xl"
              animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Demo Video Popup */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-4 relative w-11/12 max-w-md"
            >
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-yellow-400 hover:text-gray-900"
              >
                <X className="w-7 h-7" />
              </button>
              <video
                ref={videoRef}
                src="/demo.mp4"
                controls
                autoPlay
                className="w-full h-96 rounded-2xl shadow-lg mt-6"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EcoHero + Missions */}
      <section className="py-20 container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-fredoka text-center text-gray-800 mb-12 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 animate-pulse">
          🌟 EcoHero of the Month 🌟
        </h2>
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Hero Card */}
          <Card className="relative rounded-3xl shadow-2xl p-6 text-center border-b-4 border-yellow-400 bg-white/80 backdrop-blur-md hover:scale-105 transition-transform overflow-hidden">
            <motion.div
              className="absolute w-4 h-4 bg-yellow-300 rounded-full top-4 left-4"
              animate={{ y: [0, -10, 0], x: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            <img
              src={winnerAvatar}
              alt="Winner"
              className="w-28 h-28 rounded-full border-4 border-yellow-400 shadow-lg mx-auto mb-4"
            />
            <h3 className="text-2xl font-bold text-gray-800">Aarav Sharma</h3>
            <p className="text-gray-500 mb-2">Eco-Volunteer, Mumbai</p>
            <div className="flex justify-center text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400" />
              ))}
            </div>
          </Card>

          {/* Missions Chart */}
          <Card className="md:col-span-2 shadow-2xl rounded-3xl p-6 bg-white/80 backdrop-blur-md border border-green-200">
            <h4 className="text-xl font-bold text-gray-700 text-center mb-6">
              🌱 Mission Progress
            </h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data} barGap={24}>
                <XAxis
                  dataKey="name"
                  stroke="#16a34a"
                  tick={{ fontSize: 14 }}
                />
                <YAxis stroke="#16a34a" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#d1fae5",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                    border: "1px solid #34d399",
                    fontWeight: "bold",
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill="#22c55e"
                      className="hover:fill-green-600 transition-all"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-fredoka text-center text-gray-800 mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-cyan-400 to-blue-400 animate-pulse">
          Why Join Planet Guardian?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Leaf className="h-8 w-8" />,
              title: "Gamified Learning",
              desc: "Learn about our planet with fun missions, challenges, and exciting rewards!",
              color: "green",
            },
            {
              icon: <Trophy className="h-8 w-8" />,
              title: "Leaderboards & Rewards",
              desc: "Compete with friends, climb ranks, and unlock badges!",
              color: "yellow",
            },
            {
              icon: <Users className="h-8 w-8" />,
              title: "Eco Community",
              desc: "Join EcoHeroes and make a real difference together!",
              color: "blue",
            },
          ].map((card, idx) => (
            <Card
              key={idx}
              className={`bg-white rounded-3xl shadow-2xl p-8 text-center hover:scale-105 transition-transform border-b-4 border-${card.color}-400`}
            >
              <CardContent>
                <div
                  className={`bg-${card.color}-100 text-${card.color}-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 animate-bounce`}
                >
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600">{card.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

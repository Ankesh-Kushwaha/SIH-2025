import { motion, AnimatePresence } from "framer-motion";
import { useState,useRef } from "react";
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
  { name: "Tree Planting", value: 45 },
  { name: "Recycling", value: 70 },
  { name: "Beach Cleanup", value: 30 },
  { name: "Awareness", value: 55 },
];

const Home = () => {
  const [showDemo, setShowDemo] = useState(false);
   const videoRef = useRef(null);

   const handleClose = () => {
     if (videoRef.current) {
       videoRef.current.pause(); // ⏸ pause video
       videoRef.current.currentTime = 0; // 🔄 reset to start
     }
     setShowDemo(false);
   };

  return (
    <div className="min-h-screen bg-[#E8F9FF] font-poppins">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Poppins:wght@400;500;600;700&display=swap');

          body {
            font-family: 'Poppins', sans-serif;
          }

          .font-fredoka {
            font-family: 'Fredoka One', sans-serif;
          }
        `}
      </style>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-20 grid md:grid-cols-2 gap-12 items-center relative">
        <div className="space-y-6 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-fredoka leading-tight text-gray-800"
          >
            Learn. Play. <br /> and Save the
            <span className="text-cyan-500"> Planet 🌍</span>
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-xl">
            Planet Guardian is a super fun platform for environmental education.
            Explore awesome missions, earn shiny rewards, and become an EcoHero!
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg text-lg font-semibold">
              Get Started!
            </Button>
            <Button
              onClick={() => setShowDemo(true)}
              className="bg-white border-2 border-green-500 hover:bg-gray-100 text-green-600 px-6 py-3 rounded-full shadow-lg text-lg font-semibold"
            >
              Watch Demo
            </Button>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-full p-6 shadow-xl">
            <motion.img
              src={heroTurtle}
              alt="Planet Guardian Turtle"
              className="w-72 md:w-80 h-80 object-cover rounded-full"
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
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
              className="bg-white rounded-xl shadow-lg p-4 relative w-11/12 max-w-md"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute flex items-center top-3 right-3 text-yellow-500 hover:text-gray-900"
              >
                <X className="w-7 h-7" />
              </button>

              {/* Demo Video */}
              <video
                ref={videoRef}
                src="/demo.mp4"
                controls
                autoPlay
                className="w-full h-96 rounded-lg mt-6"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EcoHero of the Month */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-fredoka text-center text-gray-800 mb-12">
            🌟 EcoHero of the Month 🌟
          </h2>
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
              <img
                src={winnerAvatar}
                alt="Winner"
                className="w-28 h-28 rounded-full border-4 border-yellow-300 shadow-md mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-800">Aarav Sharma</h3>
              <p className="text-gray-500 mb-2">Eco-Volunteer, Mumbai, India</p>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-yellow-400" />
                ))}
              </div>
              <div className="flex flex-col gap-3 w-full">
                <Button className="bg-green-100 text-green-700 hover:bg-green-200 rounded-full py-2 text-md font-semibold">
                  + Follow
                </Button>
                <Button className="bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-full py-2 text-md font-semibold">
                  View Profile
                </Button>
              </div>
            </div>
            <Card className="md:col-span-2 shadow-lg rounded-2xl p-6">
              <h4 className="text-xl font-semibold text-gray-700 text-center mb-6">
                Social Service Activity
              </h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill="#22c55e"
                        className="hover:fill-green-600"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Join Planet Guardian */}
      <section className="bg-[#E8F9FF] py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-fredoka text-center text-gray-800 mb-12">
            Why Join Planet Guardian?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all border-b-4 border-green-400">
              <CardContent>
                <div className="bg-green-100 text-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Gamified Learning
                </h3>
                <p className="text-gray-600">
                  Learn our planet with fun games, challenges, and exciting
                  missions!
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all border-b-4 border-yellow-400">
              <CardContent>
                <div className="bg-yellow-100 text-yellow-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Leaderboards & Rewards
                </h3>
                <p className="text-gray-600">
                  Compete with friends, climb ranks, and unlock badges and
                  prizes!
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all border-b-4 border-blue-400">
              <CardContent>
                <div className="bg-blue-100 text-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Eco Community
                </h3>
                <p className="text-gray-600">
                  Team up with EcoHeroes and make a real difference together!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

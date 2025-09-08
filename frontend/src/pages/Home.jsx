import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Trophy, Users, Star } from "lucide-react";
 newankit/admin
import heroTurtle from "../assets/unnamed.png";
import winnerAvatar from "../assets/winner-avatar.png";

import heroTurtle from "../assets/hero-turtle.png";
import winnerAvatar from '../assets/winner-avatar.png'

 main
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
  return (
 newankit/admin
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

    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-16">
        <div className="md:w-1/2 space-y-6">
 main
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
 newankit/admin
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
            <Button className="bg-white border-2 border-green-500 hover:bg-gray-100 text-green-600 px-6 py-3 rounded-full shadow-lg text-lg font-semibold">
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
          
            className="text-4xl md:text-6xl font-extrabold text-orange-600"
          >
            Learn. Play. and Save the Planet 🌍
          </motion.h1>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Planet Guardian's is your{" "}
            <span className="font-bold text-orange-500">
              gamified platform{" "}
            </span>
            for environmental education. Explore fun missions, earn rewards, and
            become an EcoHero!
          </p>

          <div className="flex space-x-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-3 text-lg">
              Get Started
            </Button>
            <Button
              variant="outline"
              className="border-green-600 text-green-700 hover:bg-green-100 rounded-xl px-6 py-3 text-lg"
            >
              Watch Demo
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 2 }}
          className="md:w-1/2 flex justify-center mt-10 md:mt-0"
        >
          <motion.img
            src={heroTurtle}
            alt="EcoVerse Turtle Avatar"
            className="w-96 drop-shadow-2xl bg-none rounded-full"
            initial={{ rotateY: 10, rotateX: 5 }}
            animate={{ rotateY: -10, rotateX: -5 }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 4,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </section>

      {/* Monthly Winner Section */}
      <section id="winner" className="px-10 md:px-20 py-20 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-12">
          🌟 EcoHero of the Month 🌟
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Winner Info */}
          <div className="md:w-1/2 bg-green-50 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center">
            <img
              src={winnerAvatar}
              alt="Winner Avatar"
              className="w-36 h-36 rounded-full border-4 border-green-500 shadow-md mb-4"
            />
            <h3 className="text-2xl font-bold text-green-700">Aarav Sharma</h3>
            <p className="text-gray-600">Top EcoWarrior • Mumbai, India</p>

            {/* Rating */}
            <div className="flex items-center space-x-1 my-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>

            {/* Badges */}
            <div className="flex space-x-3 mt-4">
              <span className="px-4 py-2 bg-green-200 rounded-full text-green-800 font-semibold shadow-md">
                ♻ Recycler Pro
              </span>
              <span className="px-4 py-2 bg-yellow-200 rounded-full text-yellow-800 font-semibold shadow-md">
                🌿 Tree Planter
              </span>
              <span className="px-4 py-2 bg-blue-200 rounded-full text-blue-800 font-semibold shadow-md">
                🌊 Ocean Saver
              </span>
            </div>
          </div>

          {/* Winner Graph */}
          <motion.div
            className="md:w-1/2 bg-green-50 p-8 rounded-2xl shadow-xl"
            initial={{ rotateX: 15, rotateY: -10, opacity: 8 }}
            animate={{ rotateX: 0, rotateY: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ perspective: 1000 }}
          >
            <h4 className="text-xl font-semibold text-green-700 mb-4 text-center">
              Social Service Activity
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" />
                <Tooltip />
                <Bar dataKey="value" radius={[12, 12, 4, 4]}>
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill="#22c55e"
                      className="transition-all duration-300"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-10 md:px-20 py-16 bg-green-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-12">
          Why Join EcoVerse?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className="shadow-xl rounded-2xl">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Leaf className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Gamified Learning
                </h3>
                <p className="text-gray-600">
                  Learn sustainability through interactive games, challenges,
                  and missions.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className="shadow-xl rounded-2xl">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Trophy className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Leaderboard & Rewards
                </h3>
                <p className="text-gray-600">
                  Compete with friends, climb the ranks, and unlock exclusive
                  badges.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className="shadow-xl rounded-2xl">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Users className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Eco Community</h3>
                <p className="text-gray-600">
                  Connect with like-minded EcoHeroes and join global
                  sustainability drives.
                </p>
              </CardContent>
            </Card>
          </motion.div>
 main
        </div>
      </section>
    </div>
  );
};

export default Home;
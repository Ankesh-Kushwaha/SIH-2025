import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Trophy, Users, Star } from "lucide-react";
import heroTurtle from "../assets/hero-turtle.png";
import winnerAvatar from '../assets/winner-avatar.png'

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
  { name: "Tree Planting", value: 35 },
  { name: "Recycling", value: 50 },
  { name: "Beach Cleanup", value: 20 },
  { name: "Awareness Drives", value: 40 },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-16">
        <div className="md:w-1/2 space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold text-orange-600"
          >
            Learn. Play. and Save the Planet 🌍
          </motion.h1>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            EcoVerse is your{" "}
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
                ♻️ Recycler Pro
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
        </div>
      </section>
    </div>
  );
};

export default Home;

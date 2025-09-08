import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Trophy, Users, Star } from "lucide-react";
import heroTurtle from "../assets/hero-turtle.png"; // ✅ keep one version
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
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50 font-poppins">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-16">
        <div className="md:w-1/2 space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-extrabold leading-tight text-gray-800"
          >
            Learn. Play. <br /> and Save the
            <span className="text-green-600"> Planet 🌍</span>
          </motion.h1>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Planet Guardian is a{" "}
            <span className="font-bold text-green-600">gamified platform</span>{" "}
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
            alt="Planet Guardian Turtle"
            className="w-96 drop-shadow-2xl rounded-full"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* EcoHero of the Month */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
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
                      <Cell key={`cell-${index}`} fill="#22c55e" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Join Planet Guardian */}
      <section className="bg-green-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
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
                  Learn our planet with fun games, challenges, and missions!
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

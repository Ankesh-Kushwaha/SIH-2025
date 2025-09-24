import React from "react";
import SustainabilityChart from "./SustainaibilityChart";
import ChatBot from "./Chatboat";
import { motion } from "framer-motion";

const AboutEchoVerse = () => {
  return (
    <div
      className="relative min-h-screen p-8"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Background gradient + floating elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-200 via-emerald-100 to-cyan-100 -z-10 overflow-hidden">
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute w-40 h-40 bg-emerald-200 opacity-20 rounded-full top-10 left-10"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute w-32 h-32 bg-cyan-200 opacity-20 rounded-full bottom-20 right-20"
        />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-emerald-700 mb-4 flex items-center justify-center gap-3 relative"
          >
            About Planet Guardian
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="text-4xl text-emerald-500"
            >
              🐢
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl text-emerald-700 max-w-3xl mx-auto mt-4 bg-white/50 p-6 rounded-2xl shadow-lg"
          >
            Planet Guardian is a gamified environmental education platform
            designed to make sustainability fun and engaging! Through quizzes,
            challenges, leaderboards, and community-driven activities, we
            empower users to contribute to a greener planet.
          </motion.p>
        </div>

        {/* Impact Chart */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-16 p-6 rounded-2xl shadow-lg bg-white/70 backdrop-blur-md"
        >
          <SustainabilityChart />
        </motion.div>

        {/* ChatBot */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="p-6 rounded-2xl shadow-lg bg-white/70 backdrop-blur-md"
        >
          <ChatBot />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutEchoVerse;

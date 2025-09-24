import React from "react";
import GameCard from "./GameCard";
import { motion } from "framer-motion";

const GameList = ({ modules, onPreview }) => {
  return (
    <>
      {modules && modules.length > 0 ? (
        modules.map((module, moduleIndex) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: moduleIndex * 0.15 }}
            className="space-y-4 mb-12"
          >
            {/* Section Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-extrabold text-green-800 tracking-tight flex items-center gap-3">
                🌿 {module.title}
                {module.level && (
                  <span className="bg-yellow-400 text-green-900 px-3 py-1 rounded-full font-semibold shadow animate-pulse text-sm">
                    Level {module.level}
                  </span>
                )}
              </h2>
              <span className="text-sm text-green-700 bg-green-100 px-3 py-1 rounded-full font-semibold shadow">
                {module.lessons.length} Lessons
              </span>
            </div>

            {/* Lessons List */}
            <div className="relative">
              <motion.div
                className="flex gap-6 overflow-x-auto pb-6 px-2 scroll-smooth"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {module.lessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
                  >
                    <GameCard
                      lesson={lesson}
                      onPreview={onPreview}
                      className="bg-gradient-to-br from-green-50 via-green-100 to-green-200 hover:from-green-100 hover:via-green-200 hover:to-green-300 shadow-2xl rounded-2xl transition-all"
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Scroll Shadow Effect */}
              <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-green-50 to-transparent pointer-events-none" />
              <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-green-50 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        ))
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 text-center text-lg font-medium mt-16"
        >
          ⚠️ No modules available yet. Please check back later.
        </motion.p>
      )}
    </>
  );
};

export default GameList;

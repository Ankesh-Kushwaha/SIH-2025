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
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: moduleIndex * 0.1 }}
            className="space-y-4 mb-10"
          >
            {/* Section Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-extrabold text-green-600 tracking-tight">
                🌿 {module.title}
              </h2>
              <span className="text-sm text-gray-500 bg-green-100 px-3 py-1 rounded-full shadow-sm">
                {module.lessons.length} Lessons
              </span>
            </div>

            {/* Lessons List */}
            <div className="relative">
              <motion.div
                className="flex gap-6 overflow-x-auto pb-4 px-1 scroll-smooth"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {module.lessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex-shrink-0"
                  >
                    <GameCard lesson={lesson} onPreview={onPreview} />
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
          className="text-gray-500 text-center text-lg font-medium mt-10"
        >
          ⚠️ No modules available yet. Please check back later.
        </motion.p>
      )}
    </>
  );
};

export default GameList;

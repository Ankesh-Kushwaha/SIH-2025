/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import {motion} from 'framer-motion'
import { xpImages } from '@/data/moduleData'

const Xprender = () => {
   const [xp, setXp] = useState(700); // Later fetch dynamically from API/user profile
   const currentXPImage = xpImages.find(
     (img) => xp >= img.min && xp <= img.max
   );
  const xpPercentage = Math.min((xp / 1000) * 100, 100);
  
  return (
    <div>
      {/* ================= XP 3D IMAGE + 3D PROGRESS BAR ================= */}
      <motion.div
        className="w-full flex flex-col items-center justify-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 3D XP Image */}
        <motion.img
          src={currentXPImage.img}
          alt={currentXPImage.title}
          className="w-96  object-contain drop-shadow-2xl rounded-full"
          style={{ perspective: 1200, transformStyle: "preserve-3d" }}
          whileHover={{
            rotateX: 10,
            rotateY: 10,
            scale: 1.1,
            transition: { duration: 0.4 },
          }}
          whileTap={{ rotateX: -5, rotateY: -5, scale: 1.05 }}
        />

        <h2 className="mt-4 text-2xl font-bold text-green-700">
          {currentXPImage.title} 🌿
        </h2>
        <p className="text-gray-600 text-lg">
          Your XP: <span className="text-green-700 font-semibold">{xp}</span>
        </p>

        {/* 3D Circular Progress Bar */}
        <motion.div
          className="relative mt-6"
          initial={{ rotate: -90 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="transparent"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              stroke="#16a34a"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 70}
              strokeDashoffset={2 * Math.PI * 70 * (1 - xpPercentage / 100)}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: xpPercentage / 100 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <text
              x="50%"
              y="52%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xl font-bold fill-green-700"
            >
              {Math.round(xpPercentage)}%
            </text>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Xprender
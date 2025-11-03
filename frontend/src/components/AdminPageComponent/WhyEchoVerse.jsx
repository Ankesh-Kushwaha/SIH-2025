/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

export default function WhyEchoVerse() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-8 bg-blue-50 rounded-2xl shadow-lg border border-blue-200"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Why
        <span
          className="relative inline-flex items-center gap-2
                font-extrabold text-transparent 
                bg-gradient-to-r from-green-500 via-emerald-400 to-blue-500
                bg-clip-text tracking-wide drop-shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-green-400 animate-pulse"
          >
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 17.93V20a8 8 0 010-16v2.07A6 6 0 0118 12a6 6 0 01-5 5.93z" />
          </svg>
          Planet&nbsp;Guardian ?
        </span>

      </h2>
      
      <p className="text-blue-800 text-lg font-medium">
        We turn learning into an exciting adventure, empowering students to make
        a real-world impact. We try to build our future generation to looks like as a safeguard to our 
        planet Earth!
      </p>
    </motion.div>
  );
}

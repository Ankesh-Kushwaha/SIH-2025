import { motion } from "framer-motion";

export default function QuickActions() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-8 bg-white rounded-2xl shadow-lg border border-blue-100"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Quick Power-Ups</h2>
      <div className="grid grid-cols-2 gap-4">
        <button className="p-4 bg-yellow-300 rounded-xl font-bold text-gray-900 shadow-md hover:scale-105 transition">
          Create Quiz
        </button>
        <button className="p-4 bg-green-300 rounded-xl font-bold text-gray-900 shadow-md hover:scale-105 transition">
          Assign Task
        </button>
        <button className="p-4 bg-blue-300 rounded-xl font-bold text-gray-900 shadow-md hover:scale-105 transition">
          Start Drive
        </button>
        <button className="p-4 bg-pink-300 rounded-xl font-bold text-gray-900 shadow-md hover:scale-105 transition">
          Give Reward
        </button>
      </div>
    </motion.div>
  );
}

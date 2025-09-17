import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Sparkles } from "lucide-react"; // decorative icons

export default function UserProgress({
  xp,
  points,
  xpLevel,
  pendingVerifications = 12,
  onLaunchVerification,
}) {
  // % of XP toward next level (0–100)
  const progressPct = Math.min(((xp % 1000) / 1000) * 100, 100);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden p-8 rounded-3xl shadow-xl
                 bg-gradient-to-br from-green-50 via-blue-50 to-green-100
                 border border-green-200 text-center"
    >
      {/* Decorative glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />

      {/* Title */}
      <h2 className="text-4xl font-extrabold text-emerald-800 flex items-center justify-center gap-2 mb-6">
        <Sparkles className="text-yellow-500 h-7 w-7 animate-pulse" />
        User Progress
      </h2>

      {/* Level Badge */}
      <motion.div
        whileHover={{ rotate: 5 }}
        className="mx-auto mb-6 w-44 h-44 bg-gradient-to-br from-green-400 to-blue-400
                   rounded-full flex flex-col items-center justify-center shadow-2xl"
      >
        <span className="text-6xl font-black text-white drop-shadow-lg">
          {xpLevel}
        </span>
        <span className="mt-1 text-white text-lg font-semibold tracking-wide">
          Eco-Warrior
        </span>
      </motion.div>

      {/* Points */}
      <p className="text-xl font-bold text-emerald-700 mb-4">
        {points} / 400 students
      </p>

      {/* XP Progress Bar */}
      <div className="bg-emerald-100 rounded-full h-6 relative overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 1 }}
          className="bg-gradient-to-r from-green-500 to-blue-500 h-6
                     text-xs text-center font-bold text-white flex items-center justify-center"
        >
          {Math.round(progressPct)}%
        </motion.div>
      </div>

      {/* Verification Section */}
      <div className="mt-8">
        <p className="text-md font-medium text-gray-700 mb-3 flex justify-center items-center gap-2">
          <ShieldCheck className="text-green-600 h-5 w-5" />
          Pending Verifications:
          <span className="font-extrabold text-green-700 ml-1">
            {pendingVerifications}
          </span>
        </p>

        <Button
          variant="outline"
          className="bg-green-500 text-white hover:bg-green-600 shadow-md
                     hover:shadow-lg transition-transform transform hover:-translate-y-0.5"
          onClick={onLaunchVerification}
          disabled={pendingVerifications === 0}
        >
          Launch Verification
        </Button>
      </div>
    </motion.div>
  );
}

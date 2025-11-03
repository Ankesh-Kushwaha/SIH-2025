import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Crown, Star, ChevronDown, ChevronUp } from "lucide-react";

/**
 * @param {Array} leaderboard - Array of users [{ id, name, ecoPoints }]
 * @param {String} currentUserId - The logged-in user's ID
 */
export default function LeaderboardCard({ leaderboard, currentUserId }) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const updateSize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const visibleLeaders = showAll ? leaderboard : leaderboard.slice(0, 4);

  // 🎉 Only show confetti if logged-in user is the top scorer
  const isCurrentUserTop =
    leaderboard.length > 0 && leaderboard[0].id === currentUserId;

  return (
    <Card className="relative bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-200 p-6 rounded-3xl shadow-2xl border border-emerald-300 overflow-hidden">
      {/* 🎊 Confetti for current user if they’re #1 */}
      {isCurrentUserTop && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height / 2}
          numberOfPieces={100}
          recycle={false}
          gravity={0.3}
        />
      )}

      {/* Header */}
      <CardHeader className="p-0 mb-6 flex items-center justify-between">
        <CardTitle className="text-3xl font-extrabold flex items-center text-emerald-900 drop-shadow-md">
          <Trophy className="text-yellow-500 mr-2 h-7 w-7" /> Leaderboard
        </CardTitle>
        <Badge className="bg-green-600/90 text-white text-sm px-3 py-1 shadow-sm">
          {leaderboard.length} Players
        </Badge>
      </CardHeader>

      {/* Leaderboard List */}
      <CardContent className="p-0">
        <ul className="space-y-4">
          <AnimatePresence>
            {visibleLeaders.map((u, i) => {
              const isTop = i === 0;
              const isSecond = i === 1;
              const isThird = i === 2;

              const bgColors = isTop
                ? "bg-yellow-100/70"
                : isSecond
                ? "bg-gray-100/70"
                : isThird
                ? "bg-orange-100/70"
                : "bg-white/80";

              const ringColor = isTop
                ? "ring-yellow-400"
                : isSecond
                ? "ring-gray-400"
                : isThird
                ? "ring-orange-400"
                : "ring-emerald-400";

              return (
                <motion.li
                  key={u.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center space-x-4 p-4 rounded-2xl ${bgColors} hover:scale-[1.02] transition-transform shadow-sm`}
                >
                  {/* Rank */}
                  <span
                    className={`font-extrabold w-8 text-center ${
                      isTop
                        ? "text-yellow-600 text-2xl"
                        : isSecond
                        ? "text-gray-600 text-xl"
                        : isThird
                        ? "text-orange-500 text-xl"
                        : "text-emerald-600 text-lg"
                    }`}
                  >
                    {i + 1}
                  </span>

                  {/* Avatar */}
                  <Avatar
                    className={`rounded-full w-12 h-12 ring-2 ${ringColor}`}
                  >
                    <AvatarFallback className="bg-emerald-900 text-white font-bold">
                      {u.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  {/* Name + Points */}
                  <div className="flex-1">
                    <p
                      className={`font-semibold ${
                        isTop ? "text-emerald-900 text-lg" : "text-green-900"
                      }`}
                    >
                      {u.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-3 w-full bg-green-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min((u.ecoPoints / 25) * 5, 100)}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-green-800 font-semibold">
                        {u.ecoPoints} pts
                      </span>
                    </div>
                  </div>

                  {/* Icon Badges (No Text) */}
                  {isTop && (
                    <Badge className="ml-auto bg-yellow-400 text-white p-2 shadow-md rounded-full">
                      <Crown className="h-4 w-4" />
                    </Badge>
                  )}
                  {isSecond && (
                    <Badge className="ml-auto bg-gray-400 text-white p-2 shadow-md rounded-full">
                      <Star className="h-4 w-4" />
                    </Badge>
                  )}
                  {isThird && (
                    <Badge className="ml-auto bg-orange-400 text-white p-2 shadow-md rounded-full">
                      <Star className="h-4 w-4" />
                    </Badge>
                  )}
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        {/* Show More / Less Button */}
        {leaderboard.length > 4 && (
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="mt-6 w-full flex items-center justify-center gap-2 text-green-700 font-bold py-3 rounded-2xl bg-gradient-to-r from-emerald-100 to-green-200 hover:from-emerald-200 hover:to-green-300 shadow-md transition-all"
            whileHover={{ scale: 1.03 }}
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Show More <ChevronDown className="h-4 w-4" />
              </>
            )}
          </motion.button>
        )}
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Crown, Star } from "lucide-react";
import { motion } from "framer-motion";
import Confetti from "react-confetti"; // Optional: install via npm i react-confetti
import { useState, useEffect } from "react";

export default function LeaderboardCard({ leaderboard }) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-3xl shadow-2xl border border-green-200 relative">
      {/* Confetti for top player */}
      {leaderboard[0] && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height / 2}
          numberOfPieces={100}
          recycle={false}
          gravity={0.3}
        />
      )}

      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-extrabold flex items-center text-green-900">
          <Trophy className="text-yellow-500 mr-2 h-6 w-6" /> Leaderboard
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <ul className="space-y-4">
          {leaderboard.map((u, i) => {
            const isTop = i === 0;
            const isSecond = i === 1;
            const isThird = i === 2;
            const bgColors = isTop
              ? "bg-yellow-200/30"
              : isSecond
              ? "bg-gray-200/50"
              : isThird
              ? "bg-orange-200/50"
              : "bg-white/60";

            return (
              <motion.li
                key={u.id}
                className={`flex items-center space-x-3 p-4 rounded-xl ${bgColors} hover:scale-105 transition-transform shadow-md`}
                whileHover={{ scale: 1.05 }}
              >
                {/* Rank */}
                <span
                  className={`text-lg font-bold w-8 text-center ${
                    isTop
                      ? "text-yellow-500 text-2xl"
                      : isSecond
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  {i + 1}
                </span>

                {/* Avatar */}
                <Avatar
                  className={`${
                    isTop
                      ? "w-16 h-16 ring-4 ring-yellow-400"
                      : "w-12 h-12 ring-2 ring-green-400"
                  } rounded-full`}
                >
                  <AvatarFallback className="bg-gray-200 text-lg font-bold">
                    {u.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Name & Points */}
                <div className="flex-1">
                  <p
                    className={`font-semibold ${
                      isTop ? "text-green-900 text-lg" : "text-green-900"
                    }`}
                  >
                    {u.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-3 w-full bg-green-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(u.points / 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-green-700 font-medium">
                      {u.points} pts
                    </span>
                  </div>
                </div>

                {/* Badges for top ranks */}
                {isTop && (
                  <Badge className="ml-auto bg-yellow-400 text-white flex items-center gap-1 shadow-lg animate-pulse">
                    <Crown className="h-4 w-4" /> Champion
                  </Badge>
                )}
                {isSecond && (
                  <Badge className="ml-auto bg-gray-400 text-white flex items-center gap-1 shadow-lg">
                    <Star className="h-4 w-4" /> Silver
                  </Badge>
                )}
                {isThird && (
                  <Badge className="ml-auto bg-orange-400 text-white flex items-center gap-1 shadow-lg">
                    <Star className="h-4 w-4" /> Bronze
                  </Badge>
                )}
              </motion.li>
            );
          })}
        </ul>

        <motion.button
          className="mt-6 w-full text-green-600 font-bold py-3 rounded-2xl bg-green-50 hover:bg-green-100 shadow-md transition-all"
          whileHover={{ scale: 1.03 }}
        >
          Show More
        </motion.button>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LeaderboardCard({ leaderboard }) {
  return (
    <Card className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-xl font-bold flex items-center">
          <Trophy className="text-yellow-500 mr-2 h-6 w-6" /> Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="space-y-4">
          {leaderboard.map((u, i) => (
            <li key={u.id} className="flex items-center space-x-3">
              <span
                className={`text-lg font-bold w-6 text-center ${
                  i === 0 ? "text-yellow-500" : "text-gray-400"
                }`}
              >
                {i + 1}
              </span>
              <Avatar className="w-10 h-10 rounded-full">
                <AvatarFallback className="bg-gray-200">
                  {u.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{u.name}</p>
                <p className="text-sm text-gray-500">
                  {u.points.toLocaleString()} pts
                </p>
              </div>
              {i === 0 && (
                <Badge className="ml-auto bg-yellow-100 text-yellow-800">
                  <Crown className="h-3.5 w-3.5 mr-1" /> Champion
                </Badge>
              )}
            </li>
          ))}
        </ul>
        <Button
          className="mt-4 w-full text-green-600 font-semibold py-2 rounded-lg hover:bg-green-50"
          variant="ghost"
        >
          Show more
        </Button>
      </CardContent>
    </Card>
  );
}

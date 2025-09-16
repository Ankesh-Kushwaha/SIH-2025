import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Flame, Sparkles } from "lucide-react";
import NumberStat from "./NumberState";
import ProgressDonut from "./ProgressDonut";

export default function ProfileCard({ me }) {
  return (
    <Card className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-xl font-bold flex items-center">
          <Users className="text-green-500 mr-2 h-6 w-6" /> Your Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="w-16 h-16 rounded-full border-4 border-green-400">
              <AvatarImage src={me.avatar} alt={me.name} />
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
            <Badge className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              Pro
            </Badge>
          </div>
          <div>
            <h3 className="font-bold text-lg">{me.name}</h3>
            <p className="text-gray-500 text-sm">{me.username}</p>
          </div>
        </div>

        <p className="text-gray-600 mb-4 text-sm">{me.bio}</p>

        <div className="grid grid-cols-3 gap-2 text-center text-sm mb-6">
          <NumberStat label="Following" value={me.following} />
          <NumberStat label="Followers" value={me.followers} />
          <NumberStat label="Points" value={me.points} />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold">Next Badge</p>
            <p className="text-sm text-gray-500">Progress Crusader: Silver</p>
          </div>
          <ProgressDonut value={me.levelProgress} />
        </div>

        <div className="space-y-2">
          <Badge className="bg-blue-100 text-blue-800">
            <Award className="h-4 w-4 mr-2" /> Tree Planter
          </Badge>
          <Badge className="bg-yellow-100 text-yellow-800">
            <Flame className="h-4 w-4 mr-2" /> Plastic Warrior
          </Badge>
          <Badge className="bg-purple-100 text-purple-800">
            <Sparkles className="h-4 w-4 mr-2" /> Soil Champ
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

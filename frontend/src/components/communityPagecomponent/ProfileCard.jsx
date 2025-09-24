import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Flame, Sparkles, Leaf } from "lucide-react";
import NumberStat from "./NumberState";
import ProgressDonut from "./ProgressDonut";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import profileImage from "../../../public/images/master.png";

const backend_url = import.meta.env.VITE_API_BASE_URL;

export default function ProfileCard({ me, gamified }) {
  const { getToken } = useAuth();
  const [user, setUser] = useState({});

  const getUserProfile = async () => {
    const token = await getToken();
    try {
      const res = await axios.get(`${backend_url}/user/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (err) {
      console.error("Error fetching user profile:", err.message);
      alert("Error fetching user profile");
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${
        gamified
          ? "bg-gradient-to-br from-green-200 to-teal-300 shadow-2xl hover:shadow-3xl"
          : "bg-white shadow-lg"
      } p-6 rounded-3xl border border-green-300`}
    >
      <CardHeader className="p-0 mb-5">
        <CardTitle className="text-2xl font-extrabold flex items-center text-green-900">
          <Users className="mr-3 h-6 w-6" /> Your Profile
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 space-y-5">
        {/* Avatar & Info */}
        <div className="flex items-center space-x-5">
          <motion.div
            whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
            className="relative"
          >
            <Avatar className="w-20 h-20 rounded-full ring-4 ring-yellow-400 shadow-lg">
              <AvatarImage src={profileImage} alt={user.name} />
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
            <Badge className="absolute bottom-0 right-0 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse shadow-lg">
              Pro
            </Badge>
          </motion.div>

          <div>
            <h3 className="font-extrabold text-2xl text-green-900">
              {user.name || "Loading..."}
            </h3>
            <p className="text-gray-700 text-sm opacity-80">
              {user?.email?.slice(0, 15) || ""}...
            </p>
          </div>
        </div>

        <p className="text-green-900 mb-5 text-sm opacity-90">{me.bio}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm mb-6">
          <NumberStat
            label="Following"
            value={me.following}
            icon={<Leaf className="h-5 w-5 text-green-600 mx-auto" />}
          />
          <NumberStat
            label="Followers"
            value={me.followers}
            icon={<Users className="h-5 w-5 text-green-700 mx-auto" />}
          />
          <NumberStat
            label="Points"
            value={me.points}
            icon={<Award className="h-5 w-5 text-yellow-500 mx-auto" />}
          />
        </div>

        {/* Next Badge */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="font-semibold text-green-900">Next Badge</p>
            <p className="text-sm text-green-800 opacity-90">
              Progress Crusader: Silver
            </p>
          </div>
          <ProgressDonut value={me.levelProgress} gamified />
        </div>

        {/* Achievements */}
        <div className="flex flex-wrap gap-3">
          <motion.div whileHover={{ scale: 1.15 }} className="transition-all">
            <Badge className="bg-gradient-to-tr from-green-400 to-teal-500 text-white flex items-center gap-1 shadow-lg px-3 py-1.5 rounded-full">
              <Award className="h-4 w-4" /> Tree Planter
            </Badge>
          </motion.div>
          <motion.div whileHover={{ scale: 1.15 }} className="transition-all">
            <Badge className="bg-gradient-to-tr from-yellow-400 to-yellow-500 text-white flex items-center gap-1 shadow-lg px-3 py-1.5 rounded-full">
              <Flame className="h-4 w-4" /> Plastic Warrior
            </Badge>
          </motion.div>
          <motion.div whileHover={{ scale: 1.15 }} className="transition-all">
            <Badge className="bg-gradient-to-tr from-purple-400 to-purple-500 text-white flex items-center gap-1 shadow-lg px-3 py-1.5 rounded-full">
              <Sparkles className="h-4 w-4" /> Soil Champ
            </Badge>
          </motion.div>
          <motion.div whileHover={{ scale: 1.15 }} className="transition-all">
            <Badge className="bg-gradient-to-tr from-blue-400 to-indigo-500 text-white flex items-center gap-1 shadow-lg px-3 py-1.5 rounded-full">
              <Leaf className="h-4 w-4" /> Eco Guru
            </Badge>
          </motion.div>
        </div>
      </CardContent>
    </motion.div>
  );
}

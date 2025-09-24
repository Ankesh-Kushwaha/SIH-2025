/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Trophy, CheckCircle, Rocket, User, Star } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import profileImg from "../../public/images/master.png";

const backend_url = import.meta.env.VITE_API_BASE_URL;

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [submission, setSubmission] = useState(null);
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(null);
  const [mission, setMission] = useState([]);
  const [accepted, setAccepted] = useState(false);
  const [user, setUser] = useState({});
  const { getToken } = useAuth();

  const student = {
    name: "Emma Johnson",
    level: 5,
    xp: 2450,
    badges: ["Eco Hero", "Green Warrior", "Sustainability Star"],
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSubmission(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!submission) {
      alert("⚠️ Please upload an image submission");
      return;
    }
    const formData = new FormData();
    formData.append("mission_id", mission._id);
    formData.append("image", submission);
    formData.append("description", description);

    const token = await getToken();
    try {
      await axios.post(`${backend_url}/task/submission`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Submission successful!");
      setOpen(false);
      setSubmission(null);
      setDescription("");
      setPreview(null);
    } catch (err) {
      console.error("Error submitting mission:", err);
      alert("❌ Something went wrong");
    }
  };

  const fetchTodayMission = async () => {
    const token = await getToken();
    try {
      const res = await axios.get(`${backend_url}/daily-mission/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMission(res.data.mission);
    } catch (err) {
      alert("Error while fetching mission");
    }
  };

  const getUserProfile = async () => {
    const token = await getToken();
    try {
      const res = await axios.get(`${backend_url}/user/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (err) {
      alert("Error while fetching user profile");
    }
  };

  useEffect(() => {
    fetchTodayMission();
    getUserProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-2 space-y-2">
      {/* --- Profile & Mission Side by Side --- */}
      <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
        {/* --- Student Profile Card --- */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex-1 flex flex-col"
        >
          <Card className="shadow-2xl rounded-3xl border-0 bg-gradient-to-tr from-green-800/80 to-green-600/70 backdrop-blur-md flex-1 flex flex-col p-6 gap-4">
            <motion.img
              src={profileImg}
              alt="Avatar"
              whileHover={{ rotate: 5, scale: 1.1 }}
              className="w-36 h-36 rounded-full border-4 border-green-400 shadow-xl mx-auto"
            />
            <div className="text-center mt-2">
              <h2 className="text-3xl font-extrabold text-white">
                {user.name || student.name}
              </h2>
              <h3 className="text-lg text-green-200">
                {user.email || "student@example.com"}
              </h3>
              <p className="text-green-300 font-semibold mt-2">
                Level {student.level}
              </p>
            </div>

            {/* --- Scrollable Content for Badges, XP, etc. --- */}
            <div className="flex-1 overflow-y-auto w-full mt-2">
              <div className="mb-4">
                <Progress
                  value={(student.xp % 1000) / 10}
                  className="h-4 rounded-full transition-all duration-1000 ease-in-out"
                />
                <p className="text-sm mt-1 text-gray-200 text-center">
                  Eco-points: {user.ecoPoints || 0}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {student.badges.map((badge, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    className="flex items-center gap-1 bg-yellow-400/20 border border-yellow-300 rounded-xl px-3 py-1 text-sm font-semibold text-yellow-200 shadow-md hover:shadow-lg transition"
                  >
                    <Star className="w-4 h-4 text-yellow-300" /> {badge}
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* --- Today’s Mission Card --- */}
        {mission.map((m) => (
          <motion.div
            key={m._id}
            whileHover={{ scale: 1.02 }}
            className="flex-1 flex flex-col"
          >
            <Card className="shadow-2xl rounded-3xl border-0 bg-gradient-to-tr from-green-700/70 to-green-500/60 backdrop-blur-md flex-1 flex flex-col overflow-hidden">
              <div className="relative">
                <img
                  src={m.banner_url}
                  alt="Mission Banner"
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-green-700 font-bold shadow-lg">
                  +{m.ecoPoints} XP
                </div>
              </div>
              <CardContent className="flex flex-col gap-4 p-6 flex-1">
                <CardTitle className="text-2xl font-extrabold text-white flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-400" /> {m.title}
                </CardTitle>
                <p className="text-gray-200 text-sm flex-1">
                  {m.description ||
                    "Complete today’s mission and earn eco points!"}
                </p>
                <div className="flex gap-4 mt-auto">
                  {!accepted ? (
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border-green-400 text-green-200 hover:bg-green-800 transition"
                      onClick={() => setAccepted(true)}
                    >
                      <Rocket className="w-5 h-5" /> Accept Challenge
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-900 text-green-100 border border-green-400 shadow-inner"
                    >
                      ✅ Challenge Accepted
                    </Button>
                  )}
                  <Button
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 shadow-lg transition duration-300"
                    onClick={() => setOpen(true)}
                  >
                    <CheckCircle className="w-5 h-5" /> Complete Mission
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* --- Submission Dialog --- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl bg-gradient-to-b from-green-600/50 to-green-400/40 shadow-2xl backdrop-blur-lg border border-green-500 p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
              🌿 Submit Your Mission
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Upload Submission (Image)
              </label>
              <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-green-300 rounded-xl p-4 hover:border-green-500 transition cursor-pointer bg-white/20">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-44 object-cover rounded-lg shadow-lg"
                  />
                ) : (
                  <p className="text-gray-200 text-sm">
                    Click to upload your image
                  </p>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Description
              </label>
              <Textarea
                placeholder="Describe your eco action..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-xl border-green-200 focus:ring-green-400 bg-white/20 text-white"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              className="rounded-xl border-gray-300 hover:bg-gray-100 text-black"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-600 text-white hover:bg-green-700 rounded-xl shadow-lg px-6 transition duration-300"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

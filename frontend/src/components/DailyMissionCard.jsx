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
import { Trophy, CheckCircle, Rocket, User } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
const backend_url = import.meta.env.VITE_API_BASE_URL;
import profileImg from "../../public/images/master.png";

const student = {
  name: "Emma Johnson",
  level: 5,
  xp: 2450,
};

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [submission, setSubmission] = useState(null);
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(null);
  const { getToken } = useAuth();
  const [mission, setMission] = useState([]);
  const [accepted, setAccepted] = useState(false);
  const [user, setUser] = useState({});

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
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
      {/* --- Student Profile Card --- */}
      <motion.div whileHover={{ scale: 1.01 }} className="h-full">
        <Card className="shadow-xl rounded-3xl border border-green-100 bg-gradient-to-b from-white to-green-50 h-full flex flex-col">
          <CardHeader className="flex flex-row items-center gap-2">
            <User className="w-6 h-6 text-green-600" />
            <CardTitle className="text-2xl font-bold text-green-700">
              Student Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-between flex-1">
            <motion.img
              src={profileImg}
              alt="Avatar"
              whileHover={{ rotate: 2, scale: 1.05 }}
              className="w-28 h-28 rounded-full border-4 border-green-400 shadow-lg"
            />
            <h2 className="text-xl font-bold mt-4">{user.name}</h2>
            <p className="text-gray-600 text-sm">Level {student.level}</p>
            <div className="mt-4 w-full">
              <Progress value={(student.xp % 1000) / 10} className="h-3" />
              <p className="text-sm mt-1 text-gray-500 text-center">
                XP: {user.ecoPoints}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* --- Today’s Challenge Section --- */}
      {mission.map((m) => (
        <motion.div key={m._id} whileHover={{ scale: 1.01 }} className="h-full">
          <Card className="shadow-xl rounded-3xl border border-green-100 bg-gradient-to-b from-white to-green-50 h-full flex flex-col">
            <div className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3">
              <h2 className="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
                🌟 Today’s Challenge
              </h2>
            </div>

            <div className="relative">
              <img
                src={m.banner_url}
                alt="Mission Banner"
                className="w-full h-56 object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-green-700 font-semibold shadow">
                +{m.ecoPoints} XP
              </div>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-extrabold text-green-700 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                {m.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center gap-4 flex-1">
              <p className="text-gray-600 text-sm text-center leading-relaxed">
                Complete today’s mission and earn rewards for your eco-friendly
                actions 🌍
              </p>

              <div className="flex gap-3 w-full justify-center mt-auto">
                {!accepted ? (
                  <Button
                    variant="outline"
                    className="rounded-xl flex items-center gap-2 px-4 py-2 border-green-500 text-green-600 hover:bg-green-50"
                    onClick={() => setAccepted(true)}
                  >
                    <Rocket className="w-4 h-4" /> Take Challenge
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="rounded-xl flex items-center gap-2 px-4 py-2 bg-green-900 text-green-100 border border-green-300 shadow-inner"
                  >
                    ✅ Challenge Accepted
                  </Button>
                )}

                <Button
                  className="bg-green-600 text-white rounded-xl flex items-center gap-2 px-4 py-2 hover:bg-green-700 shadow"
                  onClick={() => setOpen(true)}
                >
                  <CheckCircle className="w-4 h-4" /> Complete Mission
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {/* --- Submission Dialog --- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl bg-gradient-to-b from-white to-green-50 shadow-2xl border border-green-100 p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-700 flex items-center gap-2">
              🌿 Submit Your Mission
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Submission (Image)
              </label>
              <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-green-300 bg-white/80 rounded-xl p-6 hover:border-green-500 transition cursor-pointer">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-44 object-cover rounded-lg shadow-md"
                  />
                ) : (
                  <p className="text-gray-400 text-sm">
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <Textarea
                placeholder="Describe your eco action..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-xl border-green-200 focus:ring-green-400"
              />
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              className="rounded-xl border-gray-300 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-600 text-white hover:bg-green-700 rounded-xl shadow-md px-6"
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

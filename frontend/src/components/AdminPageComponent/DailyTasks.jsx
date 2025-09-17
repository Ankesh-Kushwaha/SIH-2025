import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { Upload, Image as ImageIcon } from "lucide-react";

const backend_url = import.meta.env.VITE_API_BASE_URL;

export default function DailyTasks() {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [mission, setMission] = useState({
    title: "",
    ecoPoints: "",
    proofType: "Image",
    banner: null,
  });
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMission((prev) => ({ ...prev, banner: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (field, value) => {
    setMission((prev) => ({ ...prev, [field]: value }));
  };

  const generateMission = async (e) => {
    e.preventDefault();
    if (!mission.title || !mission.ecoPoints || !mission.proofType) {
      alert("⚠️ Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append("title", mission.title);
      formData.append("ecoPoints", mission.ecoPoints);
      formData.append("proofType", mission.proofType);
      if (mission.banner) formData.append("banner", mission.banner);

      await axios.post(`${backend_url}/mission/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Mission generated successfully!");
      setMission({
        title: "",
        ecoPoints: "",
        proofType: "Image",
        banner: null,
      });
      setPreview(null);
    } catch (err) {
      console.error("Error creating mission:", err);
      alert("❌ Failed to generate mission");
    } finally {
      setLoading(false);
    }
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8 bg-white rounded-3xl shadow-xl border border-green-100"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-2xl shadow mb-6">
        <h2 className="text-3xl font-extrabold flex items-center gap-3">
          <span className="material-icons text-4xl">eco</span>
          Generate Today’s Mission
        </h2>
        <p className="text-sm opacity-90 mt-1">
          Create impactful daily eco-missions for the community 🌍
        </p>
      </div>

      {/* Form */}
      <form onSubmit={generateMission} className="space-y-6">
        {/* Mission Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Mission Title
          </label>
          <input
            type="text"
            value={mission.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="e.g. Plant a tree in your garden"
            className="w-full rounded-lg border px-4 py-1 text-gray-800 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        {/* Eco Points */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Eco Points
          </label>
          <input
            type="number"
            min={10}
            value={mission.ecoPoints}
            onChange={(e) => handleChange("ecoPoints", e.target.value)}
            placeholder="Enter reward points"
            className="w-full rounded-lg border px-4 py-1 text-gray-800 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        {/* Proof Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Proof Submission Type
          </label>
          <select
            value={mission.proofType}
            onChange={(e) => handleChange("proofType", e.target.value)}
            className="w-full rounded-lg border px-4 py-1 shadow-sm text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none"
          >
            <option>Image</option>
            <option>Description</option>
            <option>Both</option>
          </select>
        </div>

        {/* Banner Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Banner Image
          </label>
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-green-400 transition relative overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Banner Preview"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <ImageIcon className="w-10 h-10 mb-2" />
                <span className="text-sm">Click to upload banner</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-60"
        >
          {loading ? "Generating Mission..." : "🚀 Generate Mission"}
        </button>
      </form>
    </motion.div>
  );
}

import { useState, memo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const backend_url = import.meta.env.VITE_API_BASE_URL;

export default function CommunityDrivesWrapper() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 flex flex-col items-center gap-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-green-700 shadow-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 transform hover:scale-105"
      >
        🚀 Create Community Drive
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <CommunityDrivesModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* Modal component */
function CommunityDrivesModal({ onClose }) {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [drive, setDrive] = useState({
    title: "",
    organiser: "",
    impactLevel: "Local",
    total_participants: "",
    driveDateTime: "",
    location: "",
    description: "",
    ecoPoints: "",
  });

  const handleChange = (field, value) =>
    setDrive((prev) => ({ ...prev, [field]: value }));

  const resetForm = () => {
    setDrive({
      title: "",
      organiser: "",
      impactLevel: "Local",
      total_participants: "",
      driveDateTime: "",
      location: "",
      description: "",
      ecoPoints: "",
    });
    setBannerFile(null);
    setBannerPreview(null);
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBannerFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setBannerPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const createDrive = async (e) => {
    e.preventDefault();

    const required = [
      "title",
      "organiser",
      "impactLevel",
      "total_participants",
      "driveDateTime",
      "location",
      "ecoPoints",
    ];
    for (const field of required)
      if (!drive[field]) return alert(`⚠️ Please fill the ${field} field.`);

    setLoading(true);
    try {
      const token = await getToken();

      const formData = new FormData();
      Object.keys(drive).forEach((key) => formData.append(key, drive[key]));
      if (bannerFile) formData.append("banner", bannerFile);

      await axios.post(`${backend_url}/drives/create-drive`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Community drive created successfully!");
      resetForm();
      onClose();
    } catch (err) {
      console.error("Error creating drive:", err);
      alert("❌ Failed to create drive");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-3xl mx-4 bg-white rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh] p-8 sm:p-10"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            <span className="material-icons text-green-600 text-4xl">
              groups
            </span>
            <h2 className="text-3xl font-extrabold text-green-700">
              Create Community Drive
            </h2>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Launch impactful drives and engage participants for real-world
            change 🌍
          </p>
        </div>

        {/* Form */}
        <form onSubmit={createDrive} className="space-y-6">
          <Input
            label="Drive Title"
            value={drive.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="e.g. Plastic-Free Campus"
          />
          <Input
            label="Organiser"
            value={drive.organiser}
            onChange={(e) => handleChange("organiser", e.target.value)}
            placeholder="e.g. Eco Club, John Doe"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Impact Level
              </label>
              <select
                value={drive.impactLevel}
                onChange={(e) => handleChange("impactLevel", e.target.value)}
                className="w-full rounded-xl border px-4 py-2 text-gray-800 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition"
              >
                <option>Local</option>
                <option>District</option>
                <option>State</option>
                <option>National</option>
              </select>
            </div>

            <Input
              label="Total Participants"
              type="number"
              min={1}
              value={drive.total_participants}
              onChange={(e) =>
                handleChange("total_participants", e.target.value)
              }
              placeholder="e.g. 50"
            />
          </div>

          <Input
            label="Drive Date & Time"
            type="datetime-local"
            value={drive.driveDateTime}
            onChange={(e) => handleChange("driveDateTime", e.target.value)}
          />

          <Input
            label="Location"
            value={drive.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="e.g. Central Park, Mumbai"
          />

          {/* Banner Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Banner Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerChange}
              className="w-full rounded-xl border px-4 py-2 text-gray-800 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition"
            />
            {bannerPreview && (
              <img
                src={bannerPreview}
                alt="Banner Preview"
                className="mt-2 w-full h-48 object-cover rounded-xl shadow-md"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description (optional)
            </label>
            <textarea
              value={drive.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
              placeholder="Brief details about the drive…"
              className="w-full rounded-xl border px-4 py-2 text-gray-800 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition"
            />
          </div>

          <Input
            label="Eco-Points per Participant"
            type="number"
            min={0}
            value={drive.ecoPoints}
            onChange={(e) => handleChange("ecoPoints", e.target.value)}
            placeholder="e.g. 100"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-green-700 shadow-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-60"
          >
            {loading ? "Creating Drive..." : "🚀 Create Drive"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* Input Component */
const Input = memo(({ label, ...props }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <input
      {...props}
      className="w-full rounded-xl border px-4 py-2 text-gray-800 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition"
    />
  </div>
));

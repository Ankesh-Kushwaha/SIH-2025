import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import {useAuth} from '@clerk/clerk-react'
import axios from "axios";

const backend_url = import.meta.env.VITE_API_BASE_URL;

export default function CommunityDriveList() {
  const [drives, setDrives] = useState([]);
  
  const {getToken } = useAuth();

  const fetchedAllDrive = async () => {
    const token = await getToken();
    try {
      const res = await axios.get(`${backend_url}/drives/get-all-drives`, {
        headers: {
            Authorization:`Bearer ${token}`
          }
      })
      
      if (!res.data.success) {
        alert("error while fetching drive data");
      }
      setDrives(res.data.drives);
      console.log(res.data.drives);
    }
    catch (err) {
      alert('error while fetching drives data');
      console.log("error while fetching drive data", err.message);
    }
  }

  const deleteDrive = async (id) => {
    const token = await getToken();
    try {
      const res = await axios.delete(`${backend_url}/drives/delete-drive/${id}`, {
        headers: {
           Authorization:`Bearer ${token}`
         }
      })
      
      if (!res.data.success) {
        alert(`error while deleting drive`);
      }
      else {
        alert(`drive deleted successfully`);
      }
    }
    catch (err) {
      alert("error while deleting drive.");
      console.log("error while deleting the drive", err.message);
    }
  }

  useEffect(() => {
    fetchedAllDrive();
  },[])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-white border-t border-gray-200 py-4 px-6 overflow-x-auto flex gap-4 shadow-lg custom-scrollbar"
    >
      {/* Optional Header */}
      <div className="flex-shrink-0 flex items-center px-4">
        <h3 className="text-lg font-bold text-green-700">Active Drives</h3>
      </div>

      {drives.length === 0 ? (
        <p className="text-sm text-gray-400 text-center w-full">
          No active drives yet.
        </p>
      ) : (
        drives.map((d) => (
          <motion.div
            key={d._id}
            whileHover={{ scale: 1.03 }}
            className="flex-shrink-0 w-64 p-4 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 shadow-md flex flex-col gap-2 transition-all"
          >
            {/* Title + delete */}
            <div className="flex justify-between items-start">
              <p className="font-semibold text-gray-900 text-base line-clamp-1">
                {d.title}
              </p>
              <button
                onClick={() => deleteDrive(d._id)}
                className="p-1.5 rounded-full hover:bg-red-100 transition"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-0.5">
              <p className="text-xs text-gray-600">👥 By {d.creator.name}</p>
              <p className="text-xs text-gray-600">
                🌍 Impact: {d.impactLevel}
              </p>
              <p className="text-xs text-gray-600">
                👤 {d.total_participants} slots
              </p>
              <p className="text-xs font-medium text-green-700">
                ✨ +{d.ecoPoints} eco-points / participant
              </p>
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
}

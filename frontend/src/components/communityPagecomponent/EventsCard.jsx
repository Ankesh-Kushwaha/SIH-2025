import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const backend_url = import.meta.env.VITE_API_BASE_URL;

export default function EventsCard() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const getAllDrive = async () => {
    const token = await getToken();
    try {
      const res = await axios.get(`${backend_url}/drives/get-all-drives`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data.drives);
    } catch (err) {
      console.error("❌ Error while getting drives data:", err.message);
    }
  };

  // 🔄 Fetch drives on mount + every 10 seconds
  useEffect(() => {
    getAllDrive(); // initial fetch
    const interval = setInterval(getAllDrive, 10000); // reload every 10s
    return () => clearInterval(interval); // cleanup on unmount
  },[]);

  if (!events.length) {
    return (
      <Card className="bg-gradient-to-br from-green-100 to-emerald-200 p-6 rounded-2xl shadow-lg border border-emerald-300 text-center">
        <p className="text-emerald-700 font-semibold animate-pulse">
          Loading events...
        </p>
      </Card>
    );
  }

  return (
    <div className="max-h-[600px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
      {events.map((ev) => (
        <motion.div
          key={ev._id}
          whileHover={{ scale: 1.03 }}
          className="cursor-pointer"
          onClick={() => navigate(`/drive/${ev._id}`)}
        >
          <Card className="bg-gradient-to-tr from-emerald-50 to-green-100 border-2 border-emerald-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex items-center gap-2 pb-0">
              <Leaf className="text-emerald-600 h-6 w-6" />
              <CardTitle className="text-xl font-bold text-emerald-800">
                Upcoming Event
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 space-y-3">
              <h3 className="text-2xl font-bold text-emerald-900">
                {ev.title.replace(/_/g, " ")}
              </h3>

              <div className="flex flex-wrap justify-between gap-2">
                <span className="text-sm font-medium text-gray-700 bg-emerald-100 px-2 py-1 rounded-full shadow-inner">
                  Participants:{" "}
                  <span className="font-bold text-emerald-800">
                    {ev.total_participants}
                  </span>
                </span>
                <span className="text-sm font-medium text-gray-700 bg-emerald-100 px-2 py-1 rounded-full shadow-inner">
                  Eco-Points:{" "}
                  <span className="font-bold text-emerald-800">
                    {ev.ecoPoints}
                  </span>
                </span>
              </div>

              <Button
                onClick={async (e) => {
                  e.stopPropagation();
                  try {
                    const token = await getToken();
                    await axios.post(
                      `${backend_url}/drives/register/${ev._id}`,
                      {},
                      { headers: { Authorization: `Bearer ${token}` } }
                    );
                    alert(`✅ Registered for ${ev.title}`);
                    getAllDrive(); // refresh after register
                  } catch (err) {
                    alert("❌ Error while registering");
                    console.error("Error while registering:", err.message);
                  }
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 py-2 shadow-lg font-semibold w-full transition-all duration-300"
              >
                Register
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

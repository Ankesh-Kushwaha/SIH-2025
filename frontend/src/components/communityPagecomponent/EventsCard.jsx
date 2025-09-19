import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

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
      alert("Error while getting drives data");
      console.error("error while getting drives data", err.message);
    }
  };

  useEffect(() => {
    getAllDrive();
  }, []);

  if (!events.length) {
    return (
      <Card className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center">
        <p className="text-green-700">Loading events...</p>
      </Card>
    );
  }

  return (
    // ✅ Outer scrollable container
    <div className="max-h-[600px] overflow-y-auto pr-2">
      {/* Optional padding-right to avoid scrollbar overlap */}
      <div className="flex flex-col gap-6">
        {events.map((ev) => (
          <Card
            key={ev._id}
            onClick={() =>navigate(`/drive/${ev._id}`)}
            className="cursor-pointer transition-transform duration-300 hover:scale-[1.02] bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-emerald-200 rounded-2xl shadow-lg"
          >
            <CardHeader className="flex items-center gap-2 pb-0">
              <Leaf className="text-emerald-600 h-6 w-6" />
              <CardTitle className="text-2xl font-bold text-emerald-800">
                Upcoming Event
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 space-y-4">
              <h3 className="text-xl font-semibold text-emerald-900">
                {ev.title.replace(/_/g, " ")}
              </h3>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Participants:{" "}
                  <span className="text-emerald-700 font-bold">
                    {ev.total_participants}
                  </span>
                </span>

                <span className="text-sm font-medium text-gray-700">
                  Eco-Points:{" "}
                  <span className="text-emerald-700 font-bold">
                    {ev.ecoPoints}
                  </span>
                </span>
              </div>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Registered for ${ev.title}`);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 py-2 shadow-md"
              >
                Register
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

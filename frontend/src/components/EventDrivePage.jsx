import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  Users,
  Leaf,
  Building2,
  Navigation,
} from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const backend_url = import.meta.env.VITE_API_BASE_URL;

export default function DrivePage() {
  const { getToken } = useAuth();
  const { driveId } = useParams();
  const [drive, setDrive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [driveLatLng, setDriveLatLng] = useState([0, 0]);

  // Fetch drive data
  const getDrive = async () => {
    setLoading(true);
    const token = await getToken();
    try {
      const res = await axios.get(
        `${backend_url}/drives/get-single-drive/${driveId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const driveData = res.data.drive;

      setDrive(driveData);

      // Use lat/lng if backend provides, else geocode location
      if (driveData.latitude && driveData.longitude) {
        setDriveLatLng([driveData.latitude, driveData.longitude]);
      } else if (driveData.location) {
        const geoRes = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            driveData.location
          )}`
        );
        if (geoRes.data.length > 0) {
          setDriveLatLng([
            parseFloat(geoRes.data[0].lat),
            parseFloat(geoRes.data[0].lon),
          ]);
        }
      }
    } catch (err) {
      console.error("Error fetching drive:", err.message);
      alert("Error while fetching drive data.");
    } finally {
      setLoading(false);
    }
  };

  // Get user's current location
  useEffect(() => {
    getDrive();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setCurrentLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]),
        (err) => console.error("Error getting current location", err)
      );
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <p className="text-green-600 font-semibold text-lg">
          Loading drive details...
        </p>
      </div>
    );
  }

  if (!drive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <p className="text-red-600 font-semibold text-lg">Drive not found.</p>
      </div>
    );
  }

  const handleNavigate = () => {
    if (!currentLocation) {
      alert("Cannot get your current location!");
      return;
    }
    const [lat, lng] = driveLatLng;
    const [curLat, curLng] = currentLocation;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${curLat},${curLng}&destination=${lat},${lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-10 px-4 space-y-8">
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden shadow-xl h-64 sm:h-80"
      >
        <img
          src={
            drive.banner_url ||
            "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1600&q=80"
          }
          alt="Drive Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl sm:text-4xl font-extrabold drop-shadow-lg">
            {drive.title}
          </h1>
          <p className="text-sm font-medium mt-1 drop-shadow">
            Organised by {drive.organiser}
          </p>
        </div>
      </motion.div>

      {/* Drive Details Card */}
      <Card className="rounded-3xl shadow-lg border border-green-100 bg-gradient-to-b from-white to-green-50 space-y-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-700">
            🌍 Event Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Date & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <p className="text-gray-500 text-sm">Date & Time</p>
                <p className="font-semibold text-gray-800">
                  {new Date(drive.driveDateTime).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-red-500 mt-1" />
              <div>
                <p className="text-gray-500 text-sm">Location</p>
                <p className="font-semibold text-gray-800">{drive.location}</p>
              </div>
            </div>
          </div>

          {/* Organiser & Participants */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Building2 className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <p className="text-gray-500 text-sm">Organiser</p>
                <p className="font-semibold text-gray-800">{drive.organiser}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-6 h-6 text-purple-600 mt-1" />
              <div>
                <p className="text-gray-500 text-sm">Participants</p>
                <p className="font-semibold text-gray-800">
                  {drive.total_participants} people
                </p>
              </div>
            </div>
          </div>

          {/* Impact & Eco Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Leaf className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <p className="text-gray-500 text-sm">Impact Level</p>
                <p className="font-semibold text-gray-800">
                  {drive.impactLevel}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-500 text-2xl font-bold">🏅</span>
              <div>
                <p className="text-gray-500 text-sm">Eco Points</p>
                <p className="font-semibold text-gray-800">
                  {drive.ecoPoints} Points
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-600 leading-relaxed">{drive.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Map Section */}
      <Card className="rounded-3xl shadow-lg border border-green-100 overflow-hidden">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-green-700">
            🗺️ Event Location & Navigation
          </CardTitle>
          <button
            onClick={handleNavigate}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow font-semibold transition"
          >
            <Navigation className="w-4 h-4" /> Navigate
          </button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative w-full h-96">
            <MapContainer
              center={driveLatLng}
              zoom={15}
              className="w-full h-full z-0"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={driveLatLng}>
                <Popup>{drive.title}</Popup>
              </Marker>
              {currentLocation && (
                <Marker position={currentLocation}>
                  <Popup>Your Location</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

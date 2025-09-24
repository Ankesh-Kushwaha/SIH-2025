import React, { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const backend_url = import.meta.env.VITE_API_BASE_URL;

const Headers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn, getToken } = useAuth();
  const [ecoPoints, setEcoPoints] = useState(0);

  const isActive = (path) => location.pathname === path;

  // Fetch user data
  useEffect(() => {
    const callBackend = async () => {
      if (isSignedIn) {
        try {
          const token = await getToken();
          const res = await axios.get(`${backend_url}/user/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(res.data);
          setEcoPoints(res.data.ecoPoints || 0); // Assume backend sends ecoPoints
        } catch (err) {
          console.error("Error fetching /me:", err);
        }
      }
    };
    callBackend();
  }, [isSignedIn, getToken]);

  const navLinks = [
    { to: "/features", label: "Features" },
    { to: "/leaderboard", label: "Leaderboard" },
    { to: "/about", label: "About" },
    { to: "/community", label: "Community" },
    { to: "/gamesection", label: "Game Section" },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 shadow-2xl">
      {/* Background: Eco gradient + energy glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-300 via-emerald-100 to-cyan-200 backdrop-blur-md overflow-hidden">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 w-64 h-64 bg-emerald-200 rounded-full opacity-20 -translate-x-1/2"
        />
      </div>

      <div className="relative container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo + Mascot */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.1,
            rotate: -3,
            textShadow: "0px 0px 10px #34d399",
          }}
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => navigate("/")}
        >
          <motion.div
            className="text-3xl md:text-4xl font-extrabold text-emerald-700"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 8 }}
          >
            🐢
          </motion.div>
          <span className="text-2xl md:text-3xl font-extrabold text-emerald-800">
            Planet Guardian
          </span>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-3 text-lg font-semibold">
          {navLinks.map((link) => (
            <motion.div
              key={link.to}
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 12px #34d399" }}
              className={`px-5 py-2 rounded-full transition-all border-2 ${
                isActive(link.to)
                  ? "bg-emerald-500 text-white border-emerald-600 shadow-lg"
                  : "bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-100 hover:text-emerald-800"
              }`}
            >
              <Link to={link.to}>{link.label}</Link>
            </motion.div>
          ))}
        </nav>

        {/* User / Gamified Status */}
        <div className="flex items-center gap-4">
          {/* Eco Points Badge */}
          <SignedIn>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold shadow-md select-none"
            >
              🌿 {ecoPoints} XP
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6 }}
                className="text-xl"
              >
                ⚡
              </motion.div>
            </motion.div>
          </SignedIn>

          {/* Auth Section */}
          <SignedOut>
            <SignInButton>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-full text-lg font-bold shadow-lg hover:scale-110 transition-transform">
                Login
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-12 h-12 ring-2 ring-emerald-400 hover:ring-emerald-500",
                  },
                }}
              />
            </motion.div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Headers;

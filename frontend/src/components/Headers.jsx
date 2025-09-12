import React, { useEffect } from "react";
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

  const isActive = (path) => location.pathname === path;

  // Call backend API when user logs in
  useEffect(() => {
    const callBackend = async () => {
      if (isSignedIn) {
        try {
          const token = await getToken();
          const res = await axios.get(`${backend_url}/user/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(res.message);
        } catch (err) {
          console.error("Error fetching /me:", err);
        }
      }
    };

    callBackend();
  }, [isSignedIn, getToken]);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 shadow-lg">
      {/* Gradient eco background */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-emerald-50 to-cyan-100 backdrop-blur-md"></div>

      <div className="relative container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, rotate: -2 }}
          className="text-2xl font-extrabold text-emerald-600 flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Planet Guardian <span className="text-3xl">🐢</span>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-4 text-lg font-semibold">
          {[
            { to: "/features", label: "Features" },
            { to: "/leaderboard", label: "LeaderBoard" },
            { to: "/about", label: "About" },
            { to: "/community", label: "Community" },
            { to: "/gamesection", label: "GameSection" },
          ].map((link) => (
            <motion.div
              key={link.to}
              whileHover={{ scale: 1.1 }}
              className={`px-4 py-2 rounded-full transition-all ${
                isActive(link.to)
                  ? "bg-emerald-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-emerald-100 hover:text-emerald-700"
              }`}
            >
              <Link to={link.to}>{link.label}</Link>
            </motion.div>
          ))}
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-full text-lg font-semibold shadow-md hover:scale-105 transition-transform">
                Login
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-11 h-11 ring-2 ring-emerald-400",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Headers;

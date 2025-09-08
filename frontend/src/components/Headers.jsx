import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBigRight } from "lucide-react";

const Headers = () => {
  const naviagte = useNavigate();
  return (
    <header className="sticky top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Branding */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-[Fredoka One] text-cyan-600 flex items-center gap-2 cursor-pointer"
          onClick={() => {
            naviagte("/");
          }}
        >
          
          Planet Guardian <span className="text-2xl">🐢</span>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-lg font-medium">
          <Link
            to="/features"
            className="text-gray-700 hover:text-cyan-500 transition-colors"
          >
            Features
          </Link>
          <Link
            to="/leaderboard"
            className="text-gray-700 hover:text-cyan-500 transition-colors"
          >
            LeaderBoard
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-cyan-500 transition-colors"
          >
            About
          </Link>
          <Link
            to="/community"
            className="text-gray-700 hover:text-cyan-500 transition-colors"
          >
            Community
          </Link>
          <Link
            to="/gamesection"
            className="text-gray-700 hover:text-cyan-500 transition-colors"
          >
            GameSection
          </Link>
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-full text-lg font-semibold shadow-md">
                Login
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
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

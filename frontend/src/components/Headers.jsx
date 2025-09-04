import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import {Link} from  'react-router-dom'
import { ArrowBigRight } from "lucide-react";

const Headers = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo / Branding */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
        >
          <span className="font-extrabold font-3xl text-orange-500">
            EchoVerse
          </span>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link
            to="/features"
            className="hover:text-indigo-600 transition-colors"
          >
            Features
          </Link>
          <Link
            to="/leaderboard"
            className="hover:text-indigo-600 transition-colors"
          >
            LeaderBoard
          </Link>
          <Link to="/about" className="hover:text-indigo-600 transition-colors">
            About
          </Link>
          <Link
            to="/community"
            className="hover:text-indigo-600 transition-colors"
          >
            Community
          </Link>
          <Link to="/gamesection" className="hover:text-indigo-600 transition-colors">
            GameSection
          </Link>
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton>
              <Button className="rounded-full px-6 bg-orange-500 hover:bg-orange-700 text-white">
                Login
                <ArrowBigRight className="h-1" />
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

import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Facebook, Twitter, Instagram, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-green-600 text-gray-100 flex flex-row justify-center">
      <div className="max-w-5xl mx-auto px-2 py-5 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="text-orange-400 h-6 w-6" />
            <h2 className="text-2xl font-bold text-white">EcoVerse</h2>
          </div>
          <p className="text-gray-300 text-sm">
            Building a greener future through community, awareness, and action.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm flex flex-row gap-1 flex-1 justify-center">
            <li>
              <Link to="/features" className="hover:text-orange-400 transition">
                Features .
              </Link>
            </li>
            <li>
              <Link
                to="/leaderboard"
                className="hover:text-orange-400 transition"
              >
                Leaderboard.
              </Link>
            </li>
            <li>
              <Link
                to="/community"
                className="hover:text-orange-400 transition"
              >
                Community.
              </Link>
            </li>
            <li>
              <Link
                to="/gamesection"
                className="hover:text-orange-400 transition"
              >
                Games
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-400 transition">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect with us</h3>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-orange-400">
              <Facebook />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-orange-400">
              <Twitter />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-orange-400"
            >
              <Instagram />
            </a>
            <a href="#" aria-label="Github" className="hover:text-orange-400">
              <Github />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-green-600 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} EcoVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

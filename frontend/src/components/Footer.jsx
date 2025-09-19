import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Facebook, Twitter, Instagram, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Left Section: Brand & Tagline */}
        <div className="flex flex-col items-start w-full md:w-1/3 mb-6 md:mb-0">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="text-orange-400 h-6 w-6" />
            <h2 className="text-2xl font-bold text-white">Planet Guardian</h2>
          </div>
          <p className="text-sm text-gray-300">
            Building a greener future through community, awareness, and action.
          </p>
        </div>

        {/* Center Section: Quick Links */}
        <div className="flex flex-col items-start w-full md:w-1/3 mb-6 md:mb-0 md:text-center md:items-center">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="flex flex-wrap space-x-4 text-sm text-gray-300">
            <li>
              <Link to="/features" className="hover:text-white transition">
                Features
              </Link>
            </li>
            <li>
              <Link to="/leaderboard" className="hover:text-white transition">
                Leaderboard
              </Link>
            </li>
            <li>
              <Link to="/community" className="hover:text-white transition">
                Community
              </Link>
            </li>
            <li>
              <Link to="/gamesection" className="hover:text-white transition">
                Games
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section: Connect with us */}
        <div className="flex flex-col items-start w-full md:w-1/3 md:items-end md:text-right">
          <h3 className="text-lg font-semibold mb-2">Connect with us</h3>
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="text-white hover:text-green-500"
            >
              <Facebook />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-white hover:text-green-500"
            >
              <Twitter />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-white hover:text-green-500"
            >
              <Instagram />
            </a>
            <a
              href="#"
              aria-label="Github"
              className="text-white hover:text-green-500"
            >
              <Github />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

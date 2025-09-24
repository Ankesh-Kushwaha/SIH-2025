import Header from "./Header";
import ProfileCard from "./ProfileCard";
import EventsCard from "./EventsCard";
import Feed from "./Feed";
import LeaderboardCard from "./LeaderboardCard";
import LearningHubCard from "./LearningHubCard";
import { useAuth } from "@clerk/clerk-react";
import { leaderboard, me, initialChats } from "../../data/communityPageData.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const backend_url = import.meta.env.VITE_API_BASE_URL;

export default function CommunityPage() {
  const [feedData, setFeedData] = useState([]);
  const { getToken } = useAuth();

  const fetchData = async () => {
    const token = await getToken();
    try {
      const res = await axios.get(`${backend_url}/post/get-all-post`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedData(res.data.posts || []);
    } catch (err) {
      console.error("Error fetching feed data", err);
    }
  };

  const handlePostUpdate = (updatedPost) => {
    setFeedData((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    );
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100 font-[Poppins]">
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8 space-y-8">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <aside className="col-span-12 lg:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProfileCard me={me} gamified />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <EventsCard gamified />
            </motion.div>
          </aside>

          {/* Feed */}
          <main className="lg:col-span-6 h-[calc(100vh-8rem)] overflow-y-auto pr-2 scroll-smooth custom-scrollbar space-y-6">
            {feedData.length === 0 && (
              <motion.div
                className="bg-gray-800 rounded-2xl p-6 text-center text-gray-300 shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No posts yet. Be the first to share your eco-action!
              </motion.div>
            )}

            {feedData.map((post) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Feed posts={[post]} onUpdatePost={handlePostUpdate} gamified />
              </motion.div>
            ))}
          </main>

          {/* Right Sidebar */}
          <aside className="col-span-12 lg:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LeaderboardCard leaderboard={leaderboard} gamified />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <LearningHubCard chats={initialChats} gamified />
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}

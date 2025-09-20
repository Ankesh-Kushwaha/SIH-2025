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

const backend_url = import.meta.env.VITE_API_BASE_URL;

export default function CommunityPage() {
  const [feedData, setFeedData] = useState([]); // start with empty array
  const { getToken } = useAuth();

  // Fetch all posts
  const fetchData = async () => {
    const token = await getToken();
    try {
      const res = await axios.get(`${backend_url}/post/get-all-post`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFeedData(res.data.posts || []);
    } catch (err) {
      console.error("error while fetching feed data", err);
    }
  };

  // Called when a child PostCard successfully updates a post
  const handlePostUpdate = (updatedPost) => {
    setFeedData((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    );
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 20000);
    return () => clearInterval(interval);
  }, []); 

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="col-span-12 lg:col-span-3 space-y-8">
            <ProfileCard me={me} />
            <EventsCard />
          </aside>

          <main className="lg:col-span-6">
            {/* Pass both posts and the update handler */}
            <Feed posts={feedData} onUpdatePost={handlePostUpdate} />
          </main>

          <aside className="col-span-12 lg:col-span-3 space-y-8">
            <LeaderboardCard leaderboard={leaderboard} />
            <LearningHubCard chats={initialChats} />
          </aside>
        </div>
      </div>
    </div>
  );
}

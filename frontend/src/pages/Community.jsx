import React, { useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Award,
  MessageCircle,
  ThumbsUp,
  Share2,
  Filter,
  Send,
  Users,
  Trophy,
  Flame,
  Leaf,
  PlusCircle,
  Search,
  Image as ImageIcon,
  Sparkles,
  Crown,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

// ------------------------------------------------------------
// Utility: Fake data generators
// ------------------------------------------------------------
const sampleBadges = [
  { id: 1, label: "Tree Planter", icon: <Leaf className="h-3.5 w-3.5" /> },
  { id: 2, label: "Plastic Warrior", icon: <Flame className="h-3.5 w-3.5" /> },
  { id: 3, label: "Soil Champ", icon: <Sparkles className="h-3.5 w-3.5" /> },
];

const me = {
  id: "u_me",
  name: "Aarav Gupta",
  username: "@aarav_gupta",
  bio: "Building a greener campus, one habit at a time.",
  description:
    "I organize weekly clean-up drives and help schools set up waste segregation.",
  avatar:
    "https://images.unsplash.com/photo-1511367461989-f834a9fc27b7?q=80&w=320&auto=format&fit=crop",
  followers: 312,
  following: 1280,
  points: 9420,
  levelProgress: 72,
  badges: sampleBadges,
};

const demoPosts = [
  {
    id: "p1",
    author: {
      name: "Neha Sharma",
      username: "@neha.green",
    },
    content:
      "Planted 50 saplings near the riverbank with our college eco-club! So fulfilling to see them grow. 🌱✨",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop",
    likes: 214,
    comments: 28,
    time: "4h ago",
    tags: ["tree-planting", "college", "community"],
  },
  {
    id: "p2",
    author: {
      name: "Rahul Verma",
      username: "@rahulv",
    },
    content:
      "Just finished my week-long challenge of going zero-waste. It was tough but rewarding. Check out my blog for tips!",
    image: "",
    likes: 156,
    comments: 42,
    time: "1d ago",
    tags: ["zerowaste", "sustainability", "challenge"],
  },
  {
    id: "p3",
    author: {
      name: "Isha Roy",
      username: "@isharoy",
    },
    content:
      "Our community garden is finally showing some colors! 🍅🥕 So proud of what we achieved together. #communitygarden #urbanfarming",
    image:
      "https://images.unsplash.com/photo-1628102491629-a23d83d16687?q=80&w=1200&auto=format&fit=crop",
    likes: 302,
    comments: 51,
    time: "2d ago",
    tags: ["cleanup", "beach", "volunteers"],
  },
];

const leaderboard = [
  { id: "l1", name: "Isha Roy", points: 10410 },
  { id: "l2", name: "Rahul Verma", points: 9820 },
  { id: "l3", name: "Aarav Gupta", points: 9420 },
  { id: "l4", name: "Neha Sharma", points: 9500 }, // Note: Points from image
  { id: "l5", name: "Kabir Singh", points: 8990 },
];

const initialChats = [
  {
    id: "c1",
    from: "bot",
    text: "Welcome to the Learning Hub! Ready to boost your eco-knowledge?",
    time: null,
  },
  {
    id: "c2",
    from: "you",
    text: "Yes! Tell me about composting.",
    time: null,
  },
  {
    id: "c3",
    from: "bot",
    text: "Great choice! Composting is nature's way of recycling. You mix organic waste (like fruit peels & coffee grounds) and let it decompose. The result is nutrient-rich soil for your plants!",
    time: null,
  },
];

// ------------------------------------------------------------
// Reusable UI bits
// ------------------------------------------------------------
function NumberStat({ label, value }) {
  return (
    <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 text-sm">
      <span className="text-lg font-bold">{value.toLocaleString()}</span>
      <span className="text-gray-500">{label}</span>
    </div>
  );
}

// Custom SVG-based progress ring
function ProgressDonut({ value = 65 }) {
  const strokeDasharray =` ${value}, 100`;
  return (
    <div className="relative w-16 h-16">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          className="text-gray-200"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        ></path>
        <path
          className="text-green-500"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          strokeWidth="3"
        ></path>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
        {value}%
      </div>
    </div>
  );
}

function Pill({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        "px-3 py-1.5 rounded-full text-xs font-medium border transition-all " +
        (active
          ? "bg-green-600 text-white border-green-600 shadow-sm"
          : "bg-white/70 dark:bg-zinc-900/60 text-muted-foreground border-zinc-200 dark:border-zinc-800 hover:border-green-500")
      }
    >
      {children}
    </button>
  );
}

// ------------------------------------------------------------
// Main Component
// ------------------------------------------------------------
export default function EcoVerseCommunityPage() {
  const [filter, setFilter] = useState("recent");
  const [posts, setPosts] = useState(demoPosts);
  const [newPost, setNewPost] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chat, setChat] = useState(initialChats);
  const [chatInput, setChatInput] = useState("");
  const [following, setFollowing] = useState(false);

  const fileRef = useRef(null);

  const sortedPosts = useMemo(() => {
    if (filter === "trending")
      return [...posts].sort((a, b) => b.likes - a.likes);
    if (filter === "most-liked")
      return [...posts].sort((a, b) => b.likes - a.likes);
    return posts; // recent order as-is
  }, [filter, posts]);

  function handlePublish() {
    if (!newPost.trim()) return;
    const p = {
      id: crypto.randomUUID(),
      author: { name: me.name, username: me.username },
      content: newPost,
      image: "",
      likes: 0,
      comments: 0,
      time: "now",
      tags: ["community"],
    };
    setPosts([p, ...posts]);
    setNewPost("");
  }

  function likePost(id) {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  }

  function sendMsg() {
    if (!chatInput.trim()) return;
    setChat((c) => [
      ...c,
      {
        id: crypto.randomUUID(),
        from: "Aarav (you)",
        text: chatInput,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setChatInput("");
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen w-full bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-2xl bg-green-500 text-white grid place-items-center shadow-lg">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Planet Guardian Community
                </h1>
                <p className="text-gray-500 text-sm">
                  Where green impacts come together - one leaf at a time on the
                  planet.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:flex">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search people, posts, tags..."
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 w-64 transition-all"
                />
              </div>
              <Button className="flex items-center bg-green-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-green-600 transition-colors shadow-md">
                <PlusCircle className="mr-2 h-5 w-5" /> New Post
              </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Profile & Events */}
            <aside className="col-span-12 lg:col-span-3 space-y-8">
              {/* Profile Card */}
              <Card className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl font-bold flex items-center">
                    <Users className="text-green-500 mr-2 h-6 w-6" /> Your
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16 rounded-full border-4 border-green-400">
                        <AvatarImage src={me.avatar} alt={me.name} />
                        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-sky-500 text-white">
                          AG
                        </AvatarFallback>
                      </Avatar>
                      <Badge className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                        Pro
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{me.name}</h3>
                      <p className="text-gray-500 text-sm">{me.username}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">{me.bio}</p>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm mb-6">
                    <NumberStat label="Following" value={me.following} />
                    <NumberStat label="Followers" value={me.followers} />
                    <NumberStat label="Points" value={me.points} />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold">Next Badge</p>
                      <p className="text-sm text-gray-500">
                        Progress Crusader: Silver
                      </p>
                    </div>
                    <ProgressDonut value={me.levelProgress} />
                  </div>
                  <div className="space-y-2">
                    <Badge className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                      <Award className="h-4 w-4 mr-2" /> Tree Planter
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
                      <Flame className="h-4 w-4 mr-2" /> Plastic Warrior
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">
                      <Sparkles className="h-4 w-4 mr-2" /> Soil Champ
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events Card */}
              <Card className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl font-bold flex items-center">
                    <Leaf className="text-purple-500 mr-2 h-6 w-6" /> Upcoming
                    Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold">Beach Cleanup Drive</h3>
                    <p className="text-sm text-gray-500">
                      15 Sept 2023 | Juhu Beach, Mumbai
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-green-500 font-bold bg-green-100 px-3 py-1 rounded-full text-sm">
                        +200 pts
                      </span>
                      <Button
                        size="sm"
                        className="bg-green-500 text-white font-semibold px-3 py-1 rounded-full hover:bg-green-600 text-sm transition-colors"
                      >
                        Join
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold">E-Waste Recycling Camp</h3>
                    <p className="text-sm text-gray-500">
                      18 Sept 2023 | Sublic Tech Park
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-green-500 font-bold bg-green-100 px-3 py-1 rounded-full text-sm">
                        +250 pts
                      </span>
                      <Button
                        size="sm"
                        className="bg-green-500 text-white font-semibold px-3 py-1 rounded-full hover:bg-green-600 text-sm transition-colors"
                      >
                        Join
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold">Sustainable Living Workshop</h3>
                    <p className="text-sm text-gray-500">
                      23 Sept 2023 | Online Event
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-blue-500 font-bold bg-blue-100 px-3 py-1 rounded-full text-sm">
                        21 attending
                      </span>
                      <Button
                        size="sm"
                        className="bg-blue-500 text-white font-semibold px-3 py-1 rounded-full hover:bg-blue-600 text-sm transition-colors"
                      >
                        Register
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Middle: Feed */}
            <main className="lg:col-span-6 space-y-8">
              {sortedPosts.map((p) => (
                <Card
                  key={p.id}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
                >
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12 rounded-full">
                        <AvatarFallback className="bg-green-600 text-white">
                          {p.author.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold">{p.author.name}</h3>
                          {p.author.name === "Neha Sharma" && (
                            <span className="text-blue-500 text-lg">
                              verified
                            </span>
                          )}
                          <span className="text-sm text-gray-500">
                            · {p.time}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-800">{p.content}</p>
                      </div>
                    </div>
                    {p.image && (
                      <div className="mt-4">
                        <img
                          src={p.image}
                          alt="post"
                          className="rounded-2xl w-full h-auto object-cover"
                        />
                      </div>
                    )}
                    <div className="flex justify-between items-center mt-4 text-gray-600">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                        >
                          <ThumbsUp className="h-5 w-5" />
                          <span>{p.likes}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
                        >
                          <MessageCircle className="h-5 w-5" />
                          <span>{p.comments}</span>
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-1 hover:text-green-500 transition-colors"
                      >
                        <Share2 className="h-5 w-5" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </main>

            {/* Right: Leaderboard & Learning Hub */}
            <aside className="col-span-12 lg:col-span-3 space-y-8">
              {/* Leaderboard Card */}
              <Card className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl font-bold flex items-center">
                    <Trophy className="text-yellow-500 mr-2 h-6 w-6" />{" "}
                    Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-4">
                    {leaderboard.map((u, i) => (
                      <li key={u.id} className="flex items-center space-x-3">
                        <span
                          className={`text-lg font-bold w-6 text-center ${
                            i === 0 ? "text-yellow-500" : "text-gray-400"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <Avatar className="w-10 h-10 rounded-full">
                          <AvatarFallback className="bg-gray-200">
                            {u.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{u.name}</p>
                          <p className="text-sm text-gray-500">
                            {u.points.toLocaleString()} pts
                          </p>
                        </div>
                        {i === 0 && (
                          <Badge className="ml-auto bg-yellow-100 text-yellow-800">
                            <Crown className="h-3.5 w-3.5 mr-1" /> Champion
                          </Badge>
                        )}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-4 w-full text-green-600 font-semibold py-2 rounded-lg hover:bg-green-50 transition-colors"
                    variant="ghost"
                  >
                    Show more
                  </Button>
                </CardContent>
              </Card>

              {/* Learning Hub Card */}
              <Card className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                    <MessageCircle className="text-blue-500 mr-2 h-6 w-6" />{" "}
                    Learning Hub
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-96 flex flex-col space-y-4 pr-2 overflow-y-auto">
                    {initialChats.map((m) => (
                      <div
                        key={m.id}
                        className={`flex ${
                          m.from.includes("you")
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs p-3 rounded-lg ${
                            m.from.includes("you")
                              ? "bg-blue-500 text-white rounded-br-none"
                              : "bg-gray-100 text-gray-800 rounded-bl-none"
                          }`}
                        >
                          <p className="text-sm">{m.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center relative">
                    <Input
                      className="w-full bg-gray-100 text-gray-800 placeholder-gray-500 rounded-full py-2 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Ask something..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                    />
                    <Button
                      onClick={sendMsg}
                      className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
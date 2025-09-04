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
  { id: 2, label: "Plastic Buster", icon: <Flame className="h-3.5 w-3.5" /> },
  { id: 3, label: "Solar Champ", icon: <Sparkles className="h-3.5 w-3.5" /> },
];

const me = {
  id: "u_me",
  name: "Aarav Gupta",
  username: "@eco_aarav",
  bio: "Building a greener campus, one habit at a time.",
  description:
    "I organize weekly clean-up drives and help schools set up waste segregation.",
  avatar: "",
  followers: 1280,
  following: 312,
  points: 8420,
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
      "Planted 50 saplings near the riverbank with our college eco-club! 🌱✨",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop",
    likes: 214,
    comments: 39,
    time: "2h",
    tags: ["tree-planting", "college", "community"],
  },
  {
    id: "p2",
    author: {
      name: "Rahul Verma",
      username: "@rahulv",
    },
    content:
      "Conducted a workshop on home composting. Kids loved the DIY compost bin activity! ♻️",
    image:
      "https://images.unsplash.com/photo-1528323273322-d81458248d40?q=80&w=1200&auto=format&fit=crop",
    likes: 168,
    comments: 22,
    time: "5h",
    tags: ["composting", "workshop"],
  },
  {
    id: "p3",
    author: {
      name: "Ishita Roy",
      username: "@ishita.r",
    },
    content:
      "Beach cleanup drive with 120 volunteers. 300 kg waste removed. Proud of the team! 🏖️",
    image:
      "https://images.unsplash.com/photo-1508186225823-0963cf9ab0de?q=80&w=1200&auto=format&fit=crop",
    likes: 302,
    comments: 51,
    time: "1d",
    tags: ["cleanup", "beach", "volunteers"],
  },
];

const leaderboard = [
  { id: "l1", name: "Zara Khan", points: 9800 },
  { id: "l2", name: "Arjun Mehta", points: 9520 },
  { id: "l3", name: "Ishita Roy", points: 9340 },
  { id: "l4", name: "Rahul Verma", points: 9105 },
  { id: "l5", name: "Neha Sharma", points: 9050 },
  { id: "l6", name: "Kabir Singh", points: 8990 },
  { id: "l7", name: "Aman Jain", points: 8740 },
  { id: "l8", name: "Riya Patel", points: 8665 },
  { id: "l9", name: "Devika Nair", points: 8540 },
  { id: "l10", name: "Harsh Vardhan", points: 8425 },
];

const initialChats = [
  {
    id: "c1",
    from: "Zara",
    text: "Anyone joining the e-waste drive?",
    time: "09:12",
  },
  { id: "c2", from: "Aarav (you)", text: "Count me in!", time: "09:14" },
  { id: "c3", from: "Rahul", text: "Let’s prep a checklist.", time: "09:16" },
];

// ------------------------------------------------------------
// Reusable UI bits
// ------------------------------------------------------------
function NumberStat({ label, value }) {
  return (
    <div className="flex flex-col items-center p-3 rounded-xl bg-white/60 dark:bg-zinc-900/60 shadow-sm">
      <span className="text-xl font-semibold">{value.toLocaleString()}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

function ProgressDonut({ value = 65 }) {
  const chartData = useMemo(() => [{ name: "progress", value }], [value]);
  return (
    <div className="h-28 w-28">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={chartData}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" cornerRadius={50} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="-mt-20 flex items-center justify-center">
        <span className="text-sm font-medium">{value}%</span>
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
      <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-white to-sky-50 dark:from-zinc-400 dark:via-zinc-450 dark:to-zinc-500">
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0.9, rotate: -8 }}
                animate={{ scale: 1, rotate: 0 }}
                className="h-10 w-10 rounded-2xl bg-emerald-600 text-white grid place-items-center shadow-lg"
              >
                <Leaf className="h-6 w-6" />
              </motion.div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  EcoVerse Community
                </h1>
                <p className="text-sm text-muted-foreground">
                  Share your impact. Learn together. Level up for the planet.
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search people, posts, tags"
                  className="pl-8 w-72"
                />
              </div>
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" /> New Post
              </Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Profile */}
            <div className="lg:col-span-3">
              <Card className="rounded-2xl shadow-md border-emerald-100/60">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="h-5 w-5 text-emerald-600" /> Your Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-14 w-14 border-2 border-emerald-500/40">
                      <AvatarImage src={me.avatar} alt={me.name} />
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-sky-500 text-white">
                        AG
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold leading-tight">
                        {me.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {me.username}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Badge variant="secondary" className="gap-1">
                        <Crown className="h-3.5 w-3.5 text-amber-500" /> Pro
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{me.bio}</p>

                  <div className="grid grid-cols-3 gap-2">
                    <NumberStat label="Followers" value={me.followers} />
                    <NumberStat label="Following" value={me.following} />
                    <NumberStat label="Eco Points" value={me.points} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Next Badge</div>
                      <div className="text-xs text-muted-foreground">
                        Progress towards "River Saver"
                      </div>
                    </div>
                    <ProgressDonut value={me.levelProgress} />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {me.badges.map((b) => (
                      <Tooltip key={b.id}>
                        <TooltipTrigger asChild>
                          <Badge className="gap-1" variant="outline">
                            {b.icon} {b.label}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>{b.label}</TooltipContent>
                      </Tooltip>
                    ))}
                  </div>

                  <div className="rounded-xl bg-emerald-50 dark:bg-zinc-900/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-100/60 dark:border-zinc-800">
                    {me.description}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="w-full"
                      variant={following ? "secondary" : "default"}
                      onClick={() => setFollowing((f) => !f)}
                    >
                      {following ? "Following" : "Follow"}
                    </Button>
                    <Button className="w-full" variant="outline">
                      <BookOpen className="h-4 w-4 mr-1" /> Lessons
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-5 w-4xl">
                <Card className="rounded-2xl shadow-md border-green-200 bg-gradient-to-br from-green-50 via-white to-green-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-green-700">
                      <Leaf className="h-5 w-5 text-green-600" /> Upcoming
                      Drives & Social Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar">
                      {[
                        {
                          id: 1,
                          title: "Beach Cleanup Drive",
                          date: "10 Sept 2025",
                          location: "Juhu Beach, Mumbai",
                          points: 300,
                        },
                        {
                          id: 2,
                          title: "E-Waste Recycling Camp",
                          date: "14 Sept 2025",
                          location: "Delhi Tech Park",
                          points: 250,
                        },
                        {
                          id: 3,
                          title: "Tree Plantation Drive",
                          date: "18 Sept 2025",
                          location: "Cubbon Park, Bangalore",
                          points: 400,
                        },
                        {
                          id: 4,
                          title: "Sustainable Living Workshop",
                          date: "22 Sept 2025",
                          location: "IIT Madras, Chennai",
                          points: 200,
                        },
                      ].map((event) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="min-w-[250px] rounded-xl border bg-white p-4 shadow-sm hover:shadow-lg transition"
                        >
                          <h3 className="font-semibold text-green-700 text-base">
                            {event.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {event.date}
                          </p>
                          <p className="text-xs text-gray-500">
                            {event.location}
                          </p>
                          <div className="mt-3 flex items-center justify-between">
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800"
                            >
                              +{event.points} pts
                            </Badge>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              Join Now
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Middle: Feed */}
            <div className="lg:col-span-6 space-y-6">
              <ScrollArea className="h-[620px] pr-2">
                <div className="space-y-4">
                  {sortedPosts.map((p) => (
                    <Card
                      key={p.id}
                      className="rounded-2xl overflow-hidden border-green-200"
                    >
                      <CardContent className="p-4 md:p-5">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-green-600 text-white">
                              {p.author.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-semibold leading-tight">
                                  {p.author.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {p.author.username} • {p.time}
                                </div>
                              </div>
                            </div>
                            <p className="mt-3 text-sm">{p.content}</p>
                            {p.image && (
                              <div className="mt-3 overflow-hidden rounded-xl">
                                <img
                                  src={p.image}
                                  alt="post"
                                  className="w-full object-cover max-h-[360px]"
                                />
                              </div>
                            )}
                            <div className="mt-4 flex items-center gap-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-1"
                              >
                                <ThumbsUp className="h-4 w-4" /> {p.likes}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-1"
                              >
                                <MessageCircle className="h-4 w-4" />{" "}
                                {p.comments}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-1 ml-auto"
                              >
                                <Share2 className="h-4 w-4" /> Share
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Filter:</span>
                {[
                  { key: "recent", label: "Recent" },
                  { key: "trending", label: "Trending" },
                  { key: "most-liked", label: "Most Liked" },
                ].map((f) => (
                  <Pill
                    key={f.key}
                    active={filter === f.key}
                    onClick={() => setFilter(f.key)}
                  >
                    {f.label}
                  </Pill>
                ))}
              </div>
            </div>

            {/* Right: Leaderboard + Chat */}
            <div className="lg:col-span-3 space-y-6">
              <Card className="rounded-2xl shadow-md border-amber-100/60">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Trophy className="h-5 w-5 text-amber-500" /> Top 10 This
                    Month
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ScrollArea className="h-[360px] pr-2">
                    <div className="space-y-2">
                      {leaderboard.map((u, i) => (
                        <div
                          key={u.id}
                          className="flex items-center gap-3 rounded-xl p-2 hover:bg-amber-50/60 dark:hover:bg-zinc-900/40 transition"
                        >
                          <div className="h-9 w-9 rounded-full grid place-items-center bg-gradient-to-br from-amber-500 to-rose-500 text-white font-semibold">
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium flex items-center gap-2">
                              {u.name}
                              {i < 3 && (
                                <Award className="h-4 w-4 text-amber-500" />
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {u.points.toLocaleString()} pts
                            </div>
                          </div>
                          {i === 0 && (
                            <Badge className="gap-1">
                              <Crown className="h-3.5 w-3.5" /> Champion
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-md border-sky-100/60">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MessageCircle className="h-5 w-5 text-sky-600" /> Learning
                    Chat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-xl border bg-white/70 dark:bg-zinc-900/50 p-2">
                    <div className="h-64 overflow-y-auto space-y-2 pr-2">
                      {chat.map((m) => (
                        <div
                          key={m.id}
                          className={`flex ${
                            m.from.includes("you")
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                              m.from.includes("you")
                                ? "bg-sky-600 text-white"
                                : "bg-white dark:bg-zinc-800 border"
                            }`}
                          >
                            {!m.from.includes("you") && (
                              <div className="text-[10px] text-muted-foreground mb-0.5">
                                {m.from}
                              </div>
                            )}
                            <div>{m.text}</div>
                            <div
                              className={`text-[10px] mt-0.5 ${
                                m.from.includes("you")
                                  ? "text-white/80"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {m.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask a question about today’s lesson..."
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            sendMsg();
                          }
                        }}
                      />
                      <Button onClick={sendMsg} className="gap-2">
                        <Send className="h-4 w-4" /> Send
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Real-time via
                    Socket.IO (stubbed here)
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Floating chat dock (mobile) */}
          <AnimatePresence>
            {!chatOpen && (
              <motion.button
                onClick={() => setChatOpen(true)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-4 right-4 md:hidden rounded-full shadow-lg bg-sky-600 text-white p-4"
                aria-label="Open chat"
              >
                <MessageCircle className="h-6 w-6" />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {chatOpen && (
              <motion.div
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 300, opacity: 0 }}
                className="fixed bottom-4 inset-x-4 md:hidden rounded-2xl border bg-white dark:bg-zinc-900 p-3 shadow-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" /> Learning Chat
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setChatOpen(false)}
                  >
                    Close
                  </Button>
                </div>
                <div className="h-56 overflow-y-auto space-y-2 pr-1">
                  {chat.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${
                        m.from.includes("you") ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                          m.from.includes("you")
                            ? "bg-sky-600 text-white"
                            : "bg-white dark:bg-zinc-800 border"
                        }`}
                      >
                        {!m.from.includes("you") && (
                          <div className="text-[10px] text-muted-foreground mb-0.5">
                            {m.from}
                          </div>
                        )}
                        <div>{m.text}</div>
                        <div
                          className={`text-[10px] mt-0.5 ${
                            m.from.includes("you")
                              ? "text-white/80"
                              : "text-muted-foreground"
                          }`}
                        >
                          {m.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your message..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMsg();
                      }
                    }}
                  />
                  <Button onClick={sendMsg} className="gap-2">
                    <Send className="h-4 w-4" /> Send
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-10 text-[11px] text-muted-foreground text-center">
            Prototype • Posts, chat & leaderboard use mock data. Hook these to
            your API/DB.
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Pencil, Star, Send } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const backend_url = import.meta.env.VITE_API_BASE_URL;

// Highlight "environment" & bold the rest
function formatContent(text = "") {
  const parts = text.split(/(environment)/gi);
  return (
    <span className="font-bold text-green-800">
      {parts.map((part, i) =>
        /environment/i.test(part) ? (
          <span key={i} className="px-1 bg-green-200 rounded-md animate-pulse">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
}

export default function PostCard({ post, onUpdate }) {
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [liked, setLiked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);
  const { getToken } = useAuth();

  const userName =
    typeof post.user === "object"
      ? post.user?.name || "Unknown"
      : post.user || "Unknown";
  const avatarText = userName.slice(0, 2).toUpperCase();
  const timeString = new Date(post.createdAt).toLocaleString();

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${backend_url}/post/${post._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: post.content + " (updated)" }),
      });
      if (!res.ok) throw new Error("Update failed");
      const data = await res.json();
      onUpdate?.(data);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleLike = async () => {
    try {
      const token = await getToken();
      const res = await axios.put(
        `${backend_url}/post/like/${post._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setLiked(res.data.liked);
        setLikes(res.data.totalLikes);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    const token = await getToken();
    try {
      const res = await axios.post(
        `${backend_url}/post/comment/${post._id}`,
        { text: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setComments(res.data.comments);
        setComment("");
        setShowCommentBox(false);
        setShowComments(true); // auto-expand comments when new one is added
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className=" cursor-grab relative bg-gradient-to-tr from-green-50 to-emerald-100 p-4 rounded-2xl shadow-md border border-green-200 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]">
        <CardContent className="p-0 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <Avatar className="w-10 h-10 rounded-full ring-2 ring-green-300">
                <AvatarFallback className="bg-green-600 text-white text-sm font-semibold">
                  {avatarText}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {userName}
                  </h3>
                  <span className="text-[11px] text-gray-500">
                    · {timeString}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center space-x-1">
                  <Star className="h-3.5 w-3.5 text-yellow-500 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-700">
                    {likes} Eco-Points
                  </span>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="xs"
              className="flex items-center space-x-1 text-xs hover:bg-green-100 px-2 py-1"
              onClick={handleUpdate}
            >
              <Pencil className="h-3.5 w-3.5" /> <span>Update</span>
            </Button>
          </div>

          {/* Content */}
          <p className="text-sm leading-relaxed tracking-wide">
            {formatContent(post.content)}
          </p>

          {post.mediaUrl && (
            <div>
              <img
                src={post.mediaUrl}
                alt="post"
                className="rounded-xl w-full object-cover max-h-56 border border-green-200 shadow-sm"
              />
            </div>
          )}

          {/* Footer actions */}
          <div className="flex justify-between items-center text-emerald-800 pt-2 border-t border-green-200">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center space-x-1 text-xs hover:text-red-600 ${
                  liked ? "text-red-600" : ""
                }`}
                onClick={handleLike}
              >
                <Heart
                  className={`h-4 w-4 transition ${
                    liked ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                <span>{likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-xs hover:text-green-900"
                onClick={() => setShowCommentBox(!showCommentBox)}
              >
                <MessageCircle className="h-4 w-4" />
                <span>{comments.length}</span>
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1 text-xs hover:text-green-900"
              onClick={() => setShowComments(!showComments)}
            >
              <Share2 className="h-4 w-4" />
              <span>{showComments ? "Hide" : "Comments"}</span>
            </Button>
          </div>

          {/* Comment Box */}
          <AnimatePresence>
            {showCommentBox && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 space-y-2 overflow-hidden"
              >
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full rounded-lg border text-sm text-black border-green-300 px-2 py-1.5 focus:ring-2 focus:ring-green-500 outline-none"
                />
                <Button
                  size="sm"
                  onClick={handleCommentSubmit}
                  className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-xs px-3 py-1.5"
                >
                  <Send className="h-3.5 w-3.5" /> Post
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Comments */}
          <AnimatePresence>
            {showComments && comments.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 space-y-1.5 overflow-hidden"
              >
                {comments.map((c, i) => (
                  <div
                    key={i}
                    className="bg-white/70 px-2 py-1.5 rounded-md text-xs text-gray-700 shadow-sm"
                  >
                    {c.content}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Pencil, Star, Send } from "lucide-react";
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios';
const backend_url = import.meta.env.VITE_API_BASE_URL;

// Highlight the word "environment" and bold the full content
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
  const { getToken} = useAuth();
  // If user is populated, we’ll have post.user.name
  const userName =
    typeof post.user === "object"
      ? post.user?.name || "Unknown"
      : post.user || "Unknown";

  const avatarText =
    typeof post.user === "object"
      ? (post.user?.name?.slice(0, 2) || "??").toUpperCase()
      : (post.user?.slice(0, 2) || "??").toUpperCase();

  const timeString = new Date(post.createdAt).toLocaleString();

  // Handle Update
  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/post/${post._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: post.content + " (updated)",
        }),
      });

      if (!res.ok) throw new Error("Failed to update post");
      const data = await res.json();
      onUpdate?.(data);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // Handle Like
  const handleLike = async (postId) => {
    try {
      const token = await getToken(); // fetch JWT/session token

      const res = await axios.put(
        `${backend_url}/post/like/${postId}`,
        {}, // empty body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setLiked(res.data.liked);
        setLikes(res.data.totalLikes);
      } else {
        alert(res.data.message || "Like failed");
      }
    } catch (err) {
      console.error(err);
      alert("Like failed");
    }
  };


  // Handle Comment
  const handleCommentSubmit = async (postId) => {
    if (!comment.trim()) return;

    const token = await getToken();

    try {
      const res = await axios.post(
        `${backend_url}/post/comment/${postId}`,
        { text: comment }, // body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setComments(res.data.comments); // update with fresh populated comments
        setComment("");
        setShowCommentBox(false);
      } else {
        alert(res.data.message || "Comment failed");
      }
    } catch (err) {
      console.error(err);
      alert("Comment failed");
    }
  };


  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-3xl shadow-lg border border-green-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-0 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="w-14 h-14 rounded-full ring-4 ring-green-300">
              <AvatarFallback className="bg-green-600 text-white text-lg font-semibold">
                {avatarText}
              </AvatarFallback>
            </Avatar>

            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-md text-gray-800">{userName}</h3>
                <span className="text-xs text-gray-500">· {timeString}</span>
              </div>

              {/* Gamified eco-points */}
              <div className="mt-1 flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-semibold text-emerald-700">
                  {likes} Eco-Points
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-1 hover:bg-green-100"
            onClick={handleUpdate}
          >
            <Pencil className="h-4 w-4" />
            <span>Update</span>
          </Button>
        </div>

        {/* Content */}
        <p className="text-lg leading-relaxed tracking-wide">
          {formatContent(post.content)}
        </p>

        {/* Image */}
        {post.mediaUrl && (
          <div>
            <img
              src={post.mediaUrl}
              alt="post"
              className="rounded-2xl w-full object-cover max-h-80 border-2 border-green-300 shadow-md"
            />
          </div>
        )}

        {/* Footer actions */}
        <div className="flex justify-between items-center text-emerald-800 pt-3 border-t border-green-200">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className={`flex items-center space-x-1 hover:text-red-600 transition ${
                liked ? "text-red-600" : ""
              }`}
              onClick={()=>{handleLike(post._id)}}
            >
              <Heart
                className={`h-5 w-5 transition ${
                  liked ? "fill-red-500 text-red-500" : ""
                }`}
              />
              <span>{likes}</span>
            </Button>

            <Button
              variant="ghost"
              className="flex items-center space-x-1 hover:text-green-900"
              onClick={() => setShowCommentBox(!showCommentBox)}
            >
              <MessageCircle className="h-5 w-5" />
              <span>{comments.length}</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            className="flex items-center space-x-1 hover:text-green-900"
          >
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </Button>
        </div>

        {/* Comment box */}
        {showCommentBox && (
          <div className="mt-3 space-y-3">
            <input
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded-xl border border-green-300 px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
            <Button
              size="sm"
              onClick={()=>{handleCommentSubmit(post._id)}}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
            >
              <Send className="h-4 w-4" /> Post
            </Button>
          </div>
        )}

        {/* Show comments */}
        {comments.length > 0 && (
          <div className="mt-3 space-y-2">
            {comments.map((c, i) => (
              <div
                key={i}
                className="bg-white/70 px-3 py-2 rounded-lg text-sm text-gray-700 shadow-sm"
              >
                {c.content}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

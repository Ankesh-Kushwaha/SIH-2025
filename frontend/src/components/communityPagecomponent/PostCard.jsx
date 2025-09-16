import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageCircle, Share2, Pencil, Star } from "lucide-react";

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
  // If user is populated, we’ll have post.user.name
  const userName =
    typeof post.user === "object"
      ? post.user?.name || "Unknown"
      : post.user || "Unknown";

  // Use first two letters of userName (or user ID string) for the avatar
  const avatarText =
    typeof post.user === "object"
      ? (post.user?.name?.slice(0, 2) || "??").toUpperCase()
      : (post.user?.slice(0, 2) || "??").toUpperCase();

  const timeString = new Date(post.createdAt).toLocaleString();

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/posts/${post._id}`, {
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

              {/* Gamified badge showing eco-points */}
              <div className="mt-1 flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-semibold text-emerald-700">
                  {post.likes?.length || 0} Eco-Points
                </span>
              </div>
            </div>
          </div>

          {/* Update button */}
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
              className="flex items-center space-x-1 hover:text-green-900"
            >
              <ThumbsUp className="h-5 w-5" />
              <span>{post.likes?.length || 0}</span>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center space-x-1 hover:text-green-900"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{post.comments?.length || 0}</span>
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
      </CardContent>
    </Card>
  );
}

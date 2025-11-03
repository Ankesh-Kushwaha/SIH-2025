/* eslint-disable no-unused-vars */
// Header.jsx
import { useState } from "react";
import { PlusCircle, Search, Leaf, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const backend_url = import.meta.env.VITE_API_BASE_URL;

export default function Header({ onSearchChange }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { getToken } = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handlePost = async () => {
    if (!content.trim()) return alert("Content cannot be empty");

    const formData = new FormData();
    formData.append("content", content);
    if (image?.file) formData.append("image", image.file);

    const token = await getToken();

    try {
      await axios.post(`${backend_url}/post/create`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Post published successfully ✅");
      setContent("");
      setImage(null);
    } catch (err) {
      console.error("Post error:", err);
      alert("Something went wrong ❌");
    }
  };

  // 🔍 Handle search change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value); // send value up to CommunityPage
  };

  return (
    <header className="flex flex-col md:flex-row justify-end items-start md:items-center mb-8 gap-6 px-4 md:px-8">
      <div className="flex flex-col md:flex-row items-center md:space-x-4 w-full md:w-auto gap-4">
        <div className="relative flex-1 md:flex hidden">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-300" />
          <Input
            placeholder="Search heroes, posts, tags..."
            className="pl-10 w-250 pr-4 py-2 text-black rounded-full border border-green-300 bg-green-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm transition-all hover:shadow-md"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* New Post Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center bg-gradient-to-tr from-green-400 to-emerald-600 text-white font-bold px-4 py-2 rounded-full hover:scale-105 hover:shadow-xl transition-transform shadow-lg">
              <PlusCircle className="mr-2 h-5 w-5" /> New Post
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            <DialogHeader className="p-6 border-b border-green-200">
              <DialogTitle className="text-xl font-extrabold text-green-900">
                Share Your Eco-Action 🌿
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <div className="flex items-center gap-3 border-b border-green-200 pb-4">
                <motion.img
                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=60&h=60&fit=crop"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-green-400 shadow-md"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div>
                  <p className="font-semibold text-green-900">You</p>
                  <p className="text-sm text-green-700 opacity-90">
                    Share your impact with the community
                  </p>
                </div>
              </div>

              <Textarea
                placeholder="What did you do to help the planet today?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                className="border-green-300 rounded-2xl focus:ring-2 focus:ring-emerald-400 bg-green-50 shadow-inner"
              />

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block cursor-pointer">
                  <div className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-green-300 rounded-2xl hover:border-emerald-400 transition-colors bg-green-100 hover:bg-green-50 shadow-inner hover:shadow-md">
                    <ImageIcon className="h-8 w-8 text-green-400" />
                    <span className="text-sm text-green-700 opacity-90">
                      Click to upload or drag & drop
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>

                {image?.preview && (
                  <motion.div
                    className="mt-3 rounded-2xl border border-green-300 overflow-hidden shadow-md"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={image.preview}
                      alt="Preview"
                      className="object-cover w-full max-h-64"
                    />
                  </motion.div>
                )}
              </div>
            </div>

            <DialogFooter className="p-6 border-t border-green-200 flex justify-end gap-3 bg-green-50 rounded-b-3xl">
              <Button
                variant="outline"
                className="px-6 py-2 rounded-full border border-green-300 hover:bg-green-100 hover:shadow-sm transition-all"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePost}
                className="bg-gradient-to-tr from-green-400 to-emerald-600 text-white font-bold px-6 py-2 rounded-full hover:scale-105 hover:shadow-xl transition-transform shadow-lg"
              >
                Post
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}

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
import {useAuth} from '@clerk/clerk-react'

const backend_url = import.meta.env.VITE_API_BASE_URL;

export default function Header() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const { getToken } = useAuth();

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  // Simulate API post call
  const handlePost = async () => {
   if (!content.trim()) return alert("Content cannot be empty");

   const formData = new FormData();
   formData.append("content", content);
   if (image?.file) formData.append("image", image.file);

   const token = await getToken();

   try {
     const res = await axios.post(`${backend_url}/post/create`, formData, {
       headers: {
         Authorization:`Bearer ${token}`,
       },
     });

     alert("Post published successfully ✅");
     setContent("");
     setImage(null);
   } catch (err) {
     console.error("Post error:", err);
     alert("Something went wrong ❌");
   }
 };


  return (
    <header className="flex justify-between items-center mb-8">
      {/* Left: Logo + Title */}
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

      {/* Right: Search + New Post */}
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:flex">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search people, posts, tags..."
            className="pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 w-64 transition-all"
          />
        </div>

        {/* New Post Button with Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center bg-green-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-green-600 transition-colors shadow-md">
              <PlusCircle className="mr-2 h-5 w-5" /> New Post
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            {/* Header */}
            <DialogHeader className="p-6 border-b border-gray-200">
              <DialogTitle className="text-xl font-semibold text-gray-800">
                Create a Post
              </DialogTitle>
            </DialogHeader>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {/* Top section with avatar */}
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <img
                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=60&h=60&fit=crop"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">You</p>
                  <p className="text-sm text-gray-500">
                    Sharing with community
                  </p>
                </div>
              </div>

              {/* Post Form */}
              <Textarea
                placeholder="What do you want to talk about?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                className="border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400"
              />

              {/* Image upload */}
              <div className="space-y-2">
                <label className="block">
                  <div className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-400 transition-colors">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-600">
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
                  <div className="mt-3">
                    <img
                      src={image.preview}
                      alt="Preview"
                      className="rounded-lg border border-gray-200 object-cover w-full max-h-64"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Footer */}
            <DialogFooter className="p-6 border-t border-gray-200 flex justify-end gap-3 bg-white">
              <Button
                variant="outline"
                className="px-6 py-2 rounded-full border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePost}
                className="bg-green-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-green-600 transition-colors shadow-md"
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

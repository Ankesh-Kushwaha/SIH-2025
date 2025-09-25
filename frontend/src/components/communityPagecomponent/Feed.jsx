import PostCard from "./PostCard";
import { motion } from "framer-motion";

export default function Feed({ posts = [], onUpdatePost }) {
  return (
    <div className="space-y-8">
      {posts.map((p) => (
        <motion.div
          key={p._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <PostCard post={p} onUpdate={onUpdatePost} />
        </motion.div>
      ))}
    </div>
  );
}
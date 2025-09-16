import PostCard from "./PostCard";

export default function Feed({ posts = [], onUpdatePost }) {
  return (
    <div
      className="space-y-8 overflow-y-auto pr-2" // Tailwind: adds right padding & scroll
      style={{
        maxHeight: "100vh", // you can change to '90vh' or a fixed px value
      }}
    >
      {posts.map((p) => (
        <PostCard
          key={p._id}
          post={p}
          // Pass a handler that updates the specific post in parent state
          onUpdate={(updated) => {
            if (onUpdatePost) onUpdatePost(updated);
          }}
        />
      ))}
    </div>
  );
}

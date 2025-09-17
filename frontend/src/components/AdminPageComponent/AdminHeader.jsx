export default function AdminHeader({ points }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-5xl font-extrabold text-gray-800">
        Admin{" "}
        <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
          Dashboard
        </span>
      </h1>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-bold text-lg text-amber-500">+{points} Points</p>
          <p className="text-sm text-gray-500">Admin Action</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
          A
        </div>
      </div>
    </div>
  );
}

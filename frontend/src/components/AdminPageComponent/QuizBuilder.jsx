import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

export default function QuizBuilder({
  quizForm,
  setQuizForm,
  generateQuiz,
  quizzes,
  handleDelete,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="p-8 bg-white rounded-2xl shadow-lg border border-blue-100"
    >
      {/* Header */}
      <div className="flex items-center space-x-6">
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-2xl shadow-md">
          <span className="material-icons text-5xl text-blue-500">
            extension
          </span>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Engaging Quiz Builder
          </h2>
          <p className="text-gray-600 text-lg">
            Craft interactive quizzes with our playful builder.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={generateQuiz} className="mt-6 space-y-3">
        <input
          placeholder="Quiz title (e.g. Waste Sorting 101)"
          value={quizForm.topic}
          onChange={(e) =>
            setQuizForm((s) => ({ ...s, topic: e.target.value }))
          }
          className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
        />
        <div className="flex gap-3 items-center">
          <input
            type="number"
            min={1}
            value={quizForm.questions}
            onChange={(e) =>
              setQuizForm((s) => ({ ...s, questions: Number(e.target.value) }))
            }
            className="w-24 rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
          />
          <select
            value={quizForm.level}
            onChange={(e) =>
              setQuizForm((s) => ({ ...s, level: e.target.value }))
            }
            className="rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <input
            type="number"
            min={1}
            max={10}
            value={quizForm.length}
            onChange={(e) =>
              setQuizForm((s) => ({ ...s, length: Number(e.target.value) }))
            }
            className="w-24 rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
            placeholder="Lines"
          />
          <button className="ml-auto rounded-lg px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold shadow">
            Generate
          </button>
        </div>
      </form>

      {/* Quiz list */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Available Quizzes ({quizzes.length})
        </h3>
        {quizzes.length === 0 ? (
          <p className="text-gray-400">No quizzes available.</p>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-50">
            {quizzes.map((q) => (
              <motion.div
                key={q._id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="relative min-w-[250px] cursor-pointer rounded-2xl border border-gray-200 p-6 shadow-md 
                bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300"
              >
                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(q._id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 transition"
                >
                  <Trash2 size={16} />
                </button>

                {/* Quiz content */}
                <div
                  onClick={() => (window.location.href = `/takequiz/${q._id}`)}
                >
                  <div className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
                    {q.topic || "Untitled Quiz"}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>📘 {q.questions?.length || 0} questions</p>
                    <p>⚡ Level: {q.level}</p>
                    <p>📝 {q.length} lines</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

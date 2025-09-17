import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

// Import components
import AdminHeader from "../components/AdminPageComponent/AdminHeader";
import QuizBuilder from "../components/AdminPageComponent/QuizBuilder";
import DailyTasks from "../components/AdminPageComponent/DailyTasks";
import CommunityDrives from "../components/AdminPageComponent/CommunityDrives";
import UserProgress from "../components/AdminPageComponent/UserProgress";
import QuickActions from "../components/AdminPageComponent/QuickActions";
import WhyEchoVerse from "../components/AdminPageComponent/WhyEchoVerse";
import CommunityDriveList from "@/components/AdminPageComponent/CommunityDriveList";

const backend_url = import.meta.env.VITE_API_BASE_URL;

export default function Admin() {
  const { getToken } = useAuth();

  // State
  const [xp, setXp] = useState(4200);
  const [points, setPoints] = useState(240);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Segregate 10 virtual items", completed: false, xp: 50 },
    { id: 2, title: "Attend Waste Sorting Quiz", completed: false, xp: 80 },
    { id: 3, title: "Plant a seed (report) 🎋", completed: false, xp: 120 },
  ]);

  const [communityDrives] = useState([
    { id: 1, title: "Campus Clean-up", organizers: 12, impact: "High" },
    { id: 2, title: "Plastic-Free Week", organizers: 6, impact: "Medium" },
    { id: 3, title: "Tree Planting", organizers: 4, impact: "High" },
  ]);

  const [quizForm, setQuizForm] = useState({
    topic: "",
    questions: 3,
    level: "Medium",
    length: 1,
  });
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);

  const xpLevel = useMemo(() => Math.floor(xp / 1000), [xp]);

  // Task completion
  function completeTask(id) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id && !t.completed) {
          setXp((x) => x + t.xp);
          setPoints((p) => p + Math.round(t.xp / 10));
          return { ...t, completed: true };
        }
        return t;
      })
    );
  }

  // API: Generate quiz
  async function generateQuiz(e) {
    e.preventDefault();
    if (!quizForm.topic) return alert("Please enter a quiz title.");
    setLoading(true);
    const token = await getToken();
    try {
      await axios.post(`${backend_url}/quiz/generate`, quizForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await getAllQuizzes();
    } catch (err) {
      console.error("Error generating quiz:", err);
    } finally {
      setLoading(false);
    }
  }

  // API: Get all quizzes
  async function getAllQuizzes() {
    const token = await getToken();
    try {
      const res = await axios.get(`${backend_url}/quiz/get-all-quiz`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data && Array.isArray(res.data.quizes)) {
        setQuizzes(res.data.quizes);
      }
    } catch (err) {
      console.error("Error fetching quizzes:", err);
    }
  }

  // API: Delete quiz
  async function handleDelete(quizId) {
    const token = await getToken();
    try {
      await axios.delete(`${backend_url}/quiz/delete-a-single-quiz/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes((prev) => prev.filter((q) => q._id !== quizId));
    } catch (err) {
      console.error("Error while deleting quiz:", err);
    }
  }

  const onLaunchVerification = async () => {
    
  }

  useEffect(() => {
    getAllQuizzes();
  }, []);

  return (
    <section className="mx-auto max-w-7xl p-6">
      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mb-4"></div>
          <h2 className="text-white text-2xl font-bold text-center">
            Generating Quiz...
            <br /> Please wait a few seconds
          </h2>
        </div>
      )}

      <AdminHeader points={points} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side */}
        <div className="lg:col-span-2 space-y-8">
          <QuizBuilder
            quizForm={quizForm}
            setQuizForm={setQuizForm}
            generateQuiz={generateQuiz}
            quizzes={quizzes}
            handleDelete={handleDelete}
          />

          <CommunityDrives communityDrives={communityDrives} />
          <DailyTasks tasks={tasks} completeTask={completeTask} />
        </div>

        {/* Right side */}
        <div className="space-y-8">
          <UserProgress
            xp={xp}
            points={points}
            xpLevel={xpLevel}
            onLaunchVerification={onLaunchVerification}
          />
          <QuickActions />
          <WhyEchoVerse />
          <CommunityDriveList />
        </div>
      </div>
    </section>
  );
}

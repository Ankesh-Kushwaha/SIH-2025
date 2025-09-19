import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  ClerkProvider,
  SignedOut,
  RedirectToSignIn,
  useUser,
} from "@clerk/clerk-react";

import { Button } from "@/components/ui/button";

import Headers from "./components/Headers";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Features from "./pages/Features";
import LeaderBoard from "./pages/LeaderBoard";
import Community from "./pages/Community";
import GameSectionPage from "./pages/GameSectionPage";
import AboutSection from "./pages/AboutSection";
import GamePage from "./pages/GamePage";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/admin";
import StudentDashboard from "./pages/StudentDashboard";
import QuizPage from "./pages/QuizPage";
import SchoolDashboard from "./pages/SchoolDashboard";
import { useAuth } from "@clerk/clerk-react";
import DrivePage from "./components/EventDrivePage";


// ✅ Protected Route Component

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useUser();
  if (!user) {
    return <RedirectToSignIn />;
  }

  const role = user?.publicMetadata?.role || "user";

  if (allowedRoles && !allowedRoles.includes(role)) {
    return role === "admin" ? (
      <Navigate to="/admin/dashboard" replace />
    ) : (
      <Navigate to="/student/dashboard" replace />
    );
  }

  return children;
}

// ✅ HomeRedirect Component
function HomeRedirect() {
  const { user, isSignedIn } = useUser();
 
  if (!isSignedIn) {
    return <Home />; // Show normal landing page
  }

  const role = user?.publicMetadata?.role || "user";

  return role === "admin" ? (
    <Navigate to="/admin/dashboard" replace />
  ) : (
    <Navigate to="/student/dashboard" replace />
  );
}

export default  function App() {
   const { getToken } = useAuth();

   const token_generate = async () => {
     const token = await getToken();
     console.log(token);
  };
  
  token_generate();
  return (
    <>
      <Headers />
      <Routes>
        {/* ✅ Root route: signed-out → Home, signed-in → role dashboard */}
        <Route path="/" element={<HomeRedirect />} />

        {/* Public Routes */}
        <Route path="/features" element={<Features />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/about" element={<AboutSection />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gamesection"
          element={
            <ProtectedRoute>
              <GameSectionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game/:gameId"
          element={
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/takequiz/:quizId"
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />

        {/* ✅ Role-Based Dashboards */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback → Sign-in */}
        <Route
          path="*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />

        <Route path="/school/dashboard" element={<SchoolDashboard />} />
        <Route path="/drive/:driveId" element={<DrivePage/>} />
      </Routes>

      <Footer />
    </>
  );
}

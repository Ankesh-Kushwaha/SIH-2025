import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  ClerkProvider,
  SignedOut,
  RedirectToSignIn,
  useUser,
} from "@clerk/clerk-react";

import { Button } from "@/components/ui/button";
import DragAndDropWasteGame from "./components/gamesModule/game";
import Headers from "./components/Headers";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Features from "./pages/Features";
import LeaderBoard from "./pages/LeaderBoard";
import Community from "./pages/Community";
import GameSectionPage from "./pages/GameSectionPage";
import AboutSection from "./pages/AboutSection";
import GamePage from "./pages/GamePage";
 newankit/admin
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/admin";
import StudentDashboard from "./pages/StudentDashboard";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";



// ✅ Protected Route Component
function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useUser();
 main

  if (!user) {
    // Not signed in → Redirect to Clerk sign-in page
    return <RedirectToSignIn />;
  }

  // If no role is defined, default to "user"
  const role = user?.publicMetadata?.role || "user";

  // If roles are restricted but user's role not allowed
  if (allowedRoles && !allowedRoles.includes(role)) {
    return role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/student/dashboard" />
    );
  }

  return children;
}

export default function App() {
  return (
    <>
      <Headers />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/admin-dashboard" element={<Admin/>} />
        <Route path="/dashboard" element={<Dashboard />} />
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
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        

        {/* Normal dashboard route, auto redirect handled in ProtectedRoute */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback → Sign-in page */}
        <Route
          path="*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

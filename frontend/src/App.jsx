import { Button } from "@/components/ui/button"; // assuming you're using shadcn/ui
import DragAndDropWasteGame from "./components/gamesModule/game"; 
import Headers from "./components/Headers";
import Footer from "./components/Footer";
import Home from './pages/Home'
import { Routes,Route } from "react-router-dom";
import Features from "./pages/Features";
import LeaderBoard from "./pages/LeaderBoard";
import Community from "./pages/Community";
import GameSectionPage from "./pages/GameSectionPage";
import AboutSection from "./pages/AboutSection";
import GamePage from "./pages/GamePage";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/admin";




export default function App() {
  return (
    <>
      <Headers />
      {/**Define all the routes here  */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-dashboard" element={<Admin/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/features" element={<Features />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/community" element={<Community />} />
        <Route path="/gamesection" element={<GameSectionPage />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/game/:gameId" element={<GamePage />} />
      </Routes>
      <Footer />
    </>
  );
}

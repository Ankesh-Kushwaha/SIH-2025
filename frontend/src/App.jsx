import { Button } from "@/components/ui/button"; // assuming you're using shadcn/ui
import DragAndDropWasteGame from "./components/gamesModule/game"; 
import Headers from "./components/Headers";
import Footer from "./components/Footer";
import Home from './pages/Home'
import { Routes,Route } from "react-router-dom";
import Features from "./pages/Features";
import LeaderBoard from "./pages/LeaderBoard";
import Community from "./pages/Community";
import GameSection from "./pages/GameSection";
import AboutSection from "./pages/AboutSection";


export default function App() {
  return (
    <>
      <Headers />
      {/**Define all the routes here  */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/community" element={<Community />} />
        <Route path="/gamesection" element={<GameSection />} />
        <Route path="/about" element={<AboutSection/>} />
      </Routes>
      <Footer />
    </>
  );
}

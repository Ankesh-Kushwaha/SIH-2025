import React from "react";
import SustainabilityChart from "./SustainaibilityChart";
import ChatBot from "./Chatboat";


const AboutEchoVerse = () => {
  return (
    <div
      className="p-8"
      style={{
        backgroundColor: "#D1FAE5",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-emerald-700 text-shadow mb-4 flex items-center justify-center">
            About Planet Guardian
            <span className="material-icons text-4xl ml-2 text-emerald-500">
              eco
            </span>
          </h1>
          <p className="text-lg text-emerald-600 max-w-3xl mx-auto">
            Planet Guardian is a gamified environmental education platform designed to
            make sustainability fun and engaging! Through quizzes, challenges,
            leaderboards, and community-driven activities, we empower users to
            contribute to a greener planet.
          </p>
        </div>

        {/* Impact Chart */}
        <SustainabilityChart/>

        {/* ChatBot */}
        <ChatBot />
      </div>
    </div>
  );
};

export default AboutEchoVerse;

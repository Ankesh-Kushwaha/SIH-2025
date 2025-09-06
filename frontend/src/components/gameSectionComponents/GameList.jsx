import React from "react";
import GameCard from "./GameCard";

const GameList = ({ modules, onPreview }) => {
  return (
    <>
      {modules && modules.length > 0 ? (
        modules.map((module) => (
          <div key={module.id} className="space-y-4">
            <h2 className="text-xl font-semibold text-green-600">
              {module.title}
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {module.lessons.map((lesson) => (
                <GameCard
                  key={lesson.id}
                  lesson={lesson}
                  onPreview={onPreview}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center text-lg font-medium">
          ⚠️ No modules available yet.
        </p>
      )}
    </>
  );
};

export default GameList;

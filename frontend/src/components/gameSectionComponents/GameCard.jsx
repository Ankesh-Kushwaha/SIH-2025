import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GameCard = ({ lesson, onPreview }) => {
  return (
    <Card
      className="min-w-[280px] shadow-lg hover:scale-105 transition-transform cursor-pointer"
      onClick={() => onPreview(lesson)}
    >
      <CardHeader>
        <CardTitle>{lesson.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm mb-2">{lesson.description}</p>
        <Button variant="outline" className="w-full mt-2">
          Preview & Impact
        </Button>
      </CardContent>
    </Card>
  );
};

export default GameCard;

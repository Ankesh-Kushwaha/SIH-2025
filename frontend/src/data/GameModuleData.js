import DragAndDropWasteGame from "@/components/gamesModule/game";
import RecycleRush from "@/components/gamesModule/RecycleRush";


const gamesData = {
  wasteSegregation: {
    gameId: "102",
    title: "Waste Segregation Challenge",
    description: "Sort the waste into the right bins and learn how recycling helps the planet!",
    thumbnail: "/images/waste-segregation.png",
    component: DragAndDropWasteGame,
    data: {
      ITEMS: [
        { id: "1", label: "Plastic Bottle", type: "recyclable", emoji: "🧴" },
        { id: "2", label: "Apple Core", type: "organic", emoji: "🍎" },
        { id: "3", label: "Old Phone", type: "ewaste", emoji: "📱" },
        { id: "4", label: "Styrofoam", type: "general", emoji: "🍽️" },
      ],
      BINS: [
        { id: "recyclable", title: "Recyclable", color: "bg-blue-300" },
        { id: "organic", title: "Organic", color: "bg-green-300" },
        { id: "ewaste", title: "E-Waste", color: "bg-yellow-300" },
        { id: "general", title: "General", color: "bg-gray-300" },
      ],
    },
  },

  RecycleRush: {
    gameId: "103",
    title: "Basic recyle game",
    description: "Sort the waste into the right bins and learn how recycling helps the planet!",
    thumbnail: "/images/waste-segregation.png",
    component: RecycleRush,
    data: {
      ITEMS: [
          { name: "Plastic Bottle", type: "Plastic" },
          { name: "Newspaper", type: "Paper" },
          { name: "Aluminum Can", type: "Metal" },
          { name: "Apple Core", type: "Organic" },
      ],
      BINS: ["Plastic", "Paper", "Metal", "Organic"]
    },
  },


  waterConservation: {
    gameId: "104",
    title: "Water Conservation Quest",
    description: "Learn how to save water through fun challenges and interactive missions!",
    thumbnail: "/images/water-conservation.png",
    component: "",
    data: {
      ITEMS: [
        { id: "1", label: "Running Tap", type: "waste", emoji: "🚰" },
        { id: "2", label: "Rainwater Harvesting", type: "save", emoji: "🌧️" },
      ],
      BINS: [
        { id: "save", title: "Water-Saving", color: "bg-green-400" },
        { id: "waste", title: "Water-Wasting", color: "bg-red-400" },
      ],
    },
  },
};

export default gamesData;

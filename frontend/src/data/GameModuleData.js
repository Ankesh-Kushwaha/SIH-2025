import ClimateCrisisSimulator from "@/components/gamesModule/ClimateCrisisSimulator";
import EnergyConservationGame from "@/components/gamesModule/EnergyConservationGame";
import DragAndDropWasteGame from "@/components/gamesModule/game";
import PlantationGame from "@/components/gamesModule/PlantationGame";
import RecycleRush from "@/components/gamesModule/RecycleRush";
import WasteSortingGame from "@/components/gamesModule/wasteSegregation2";


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

  WasteSortingGame: {
    gameId: "104",
    title: "Waste Segregation Challenge",
    description: "Sort the waste into the right bins and learn how recycling helps the planet!",
    thumbnail: "/images/waste-segregation.png",
    component: WasteSortingGame,
    data: {
     BIN_DEFS :[
            {
              key: "organic",
              label: "Organic",
              hint: "Food, leaves",
              color: "bg-green-100 border-green-300",
              icon: "🥬",
            },
            {
              key: "recyclable",
              label: "Recyclables",
              hint: "Paper, plastic, glass",
              color: "bg-blue-100 border-blue-300",
              icon: "♻",
            },
            {
              key: "ewaste",
              label: "E‑Waste",
              hint: "Batteries, gadgets",
              color: "bg-amber-100 border-amber-300",
              icon: "🔌",
            },
          {
            key: "hazard",
            label: "Hazardous",
            hint: "Chemicals, paint",
            color: "bg-red-100 border-red-300",
            icon: "☣",
          },
        ],
     ITEM_POOL : [
          { name: "Banana Peel", type: "organic", emoji: "🍌" },
          { name: "Apple Core", type: "organic", emoji: "🍎" },
          { name: "Tea Leaves", type: "organic", emoji: "🍵" },
          { name: "Plastic Bottle", type: "recyclable", emoji: "🍼" },
          { name: "Newspaper", type: "recyclable", emoji: "🗞" },
          { name: "Tin Can", type: "recyclable", emoji: "🥫" },
          { name: "Glass Jar", type: "recyclable", emoji: "🫙" },
          { name: "AA Battery", type: "ewaste", emoji: "🔋" },
          { name: "Old Phone", type: "ewaste", emoji: "📱" },
          { name: "Headphones", type: "ewaste", emoji: "🎧" },
          { name: "Paint Can", type: "hazard", emoji: "🎨" },
          { name: "Bleach Bottle", type: "hazard", emoji: "🧴" },
          { name: "Thermometer", type: "hazard", emoji: "🌡" },
      ],
       LEVELS :[
      {
        level: 1,
        duration: 60,
        target: 12,
        bins: ["organic", "recyclable", "ewaste"],
        lives: 3,
      },
      {
        level: 2,
        duration: 60,
        target: 16,
        bins: ["organic", "recyclable", "ewaste", "hazard"],
        lives: 3,
      },
      {
        level: 3,
        duration: 60,
        target: 20,
        bins: ["organic", "recyclable", "ewaste", "hazard"],
        lives: 2,
      },
    ],
    },
  },

  ClimateCrisisSimulator: {
    gameId: "105",
    title: "Climate Crisis Simulator",
    description: "visualise the impact of current global warming emission and their future effects",
    thumbnail: "/images/water-conservation.png",
    component: ClimateCrisisSimulator,
    data:[],
  },
  
  EnergyConservationGame: {
    gameId: "106",
    title: "Enery Conservation",
    description: "learn how to conserve energy using real game module",
    thumbnail: "/images/water-conservation.png",
    component: EnergyConservationGame,
    data: {
      events: [
        { id: 1, text: "Lights are ON in the morning 🌞", correctAction: "Turn Off" },
        {
          id: 2,
          text: "AC is running with windows open ❄️",
          correctAction: "Turn Off",
        },
        {
          id: 3,
          text: "TV is ON with nobody watching 📺",
          correctAction: "Turn Off",
        },
        {
          id: 4,
          text: "Solar panel ready to generate energy ☀️",
          correctAction: "Activate",
        },
        { id: 5, text: "Laptop charging overnight 🔌", correctAction: "Unplug" },
        {
          id: 6,
          text: "Using washing machine at peak hours 🕒",
          correctAction: "Reschedule",
        },
      ],
    }
  },

  waterConservation: {
    gameId: "106",
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

  PlantationGame: {
    gameId: "107",
    title: "Plant a tree and grow your virtual forest",
    description: "Learn how to plant a tree and look around it virtually",
    thumbnail: "/images/water-conservation.png",
    component: PlantationGame,
    data: {
     stages : ["seed", "sapling", "tree"],
     eventTypes : [
        { type: "drought", message: "🌞 Drought! Water your trees quickly!" },
        { type: "pests", message: "🐛 Pest Attack! Save your trees!" },
    ],
    }
  }


};

export default gamesData;

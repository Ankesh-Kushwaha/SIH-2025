import ClimateCrisisSimulator from "@/components/gamesModule/ClimateCrisisSimulator";
import EchoEffectGame from "@/components/gamesModule/EchoEffectGame";
import EcosystemAwareness1 from "@/components/gamesModule/EcoSystemAwarness1";
import EcosystemAwareness from "@/components/gamesModule/EcoSystemAwerness";
import EnergyConservationGame from "@/components/gamesModule/EnergyConservationGame";
import DragAndDropWasteGame from "@/components/gamesModule/game";
import NaturesPathGame from "@/components/gamesModule/NaturesPathGame";

import PlantationGame from "@/components/gamesModule/PlantationGame";
import PurifyPipelineGame from "@/components/gamesModule/PurifyPipelineGame";
import RecycleRush from "@/components/gamesModule/RecycleRush";
import WasteSortingGame from "@/components/gamesModule/wasteSegregation2";
import WaterConservation1 from "@/components/gamesModule/waterConservation1";


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
  },

  WaterConservation1: {
    gameId: "108",
    title: "Learn how to conserv water",
    description: "Learn how to conserve water through a grid game. ",
    thumbnail: "/images/water-conservation.png",
    component: WaterConservation1,
    data: {}
  },

  NaturesPathGame: {
    gameId: "109",
    title: "Narrative Based game",
    description: "This game is a choice-based narrative where your decisions affect your Respect Score and the outcome of your hike.",
    thumbnail: "/images/water-conservation.png",
    component: NaturesPathGame,
    data: {
    storyData :{
      start: {
        text: "You stand at the trailhead of a beautiful mountain path. The air is fresh and the sun is warm. Your goal is to reach the summit with the highest respect for nature.",
        image:
          "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1350",
        choices: [{ text: "Begin the hike", nextScene: "meadow" }],
      },
      meadow: {
        text: "You enter a meadow filled with colorful wildflowers. A particularly beautiful blue flower catches your eye.",
        image:
          "https://images.unsplash.com/photo-1494951421735-a45a3a1f4965?auto=format&fit=crop&w=1350",
        choices: [
          {
            text: "Take a photo of it",
            nextScene: "fallenBird",
            effect: {
              score: 5,
              message: "A beautiful memory, captured harmlessly.",
            },
          },
          {
            text: "Pick the flower",
            nextScene: "fallenBird",
            effect: {
              score: -10,
              message:
                "It looks nice, but now the bees and butterflies can't use it.",
            },
          },
        ],
      },
      fallenBird: {
        text: "Further up the path, you see a tiny baby bird on the ground that has fallen from its nest.",
        image:
          "https://images.unsplash.com/photo-1550866038-d2383c27d383?auto=format&fit=crop&w=1350",
        choices: [
          {
            text: "Leave it alone. The parent is likely nearby.",
            nextScene: "streamCrossing",
            effect: {
              score: 15,
              message:
                "Wise choice! As you walk away, you see the mother bird return.",
            },
          },
          {
            text: "Try to put it back in the nest.",
            nextScene: "streamCrossing",
            effect: {
              score: -10,
              message:
                "Though your heart was in the right place, your scent could make the parents abandon the nest.",
            },
          },
          {
            text: "Take it with you to 'save' it.",
            nextScene: "streamCrossing",
            effect: {
              score: -15,
              message:
                "Removing wildlife is almost never the right answer. It will likely not survive without its parents.",
            },
          },
        ],
      },
      streamCrossing: {
        text: "The path is blocked by a wide, rushing stream. The other side is just a short distance away.",
        image:
          "https://images.unsplash.com/photo-1505963721598-522617596a28?auto=format&fit=crop&w=1350",
        choices: [
          {
            text: "Throw rocks in the stream to make a path.",
            nextScene: "summit",
            effect: {
              score: -20,
              message:
                "You made it across, but disturbed the delicate stream ecosystem.",
            },
          },
          {
            text: "Hike upstream to find a safer crossing.",
            nextScene: "summit",
            effect: {
              score: 10,
              message:
                "Patience pays off. You found a fallen log and crossed without a trace.",
            },
          },
        ],
      },
      summit: {
        text: "You've reached the summit! The view is breathtaking. You've made choices along the way that reflect your respect for this place.",
        image:
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1350",
        choices: [
          // Instead of nextScene 'end', call a handler that will check score
          { text: "See your result", nextScene: "final" },
        ],
      },
      endGood: {
        text: "You ended your hike with a high Respect Score. You are a true Nature's Guardian, leaving the trail better than you found it. Well done!",
        image:
          "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1350",
        choices: [{ text: "Play Again", nextScene: "start" }],
      },
      endBad: {
        text: "Your Respect Score is low. While you reached the summit, your actions along the way caused harm to the environment. Remember to always leave no trace.",
        image:
          "https://images.unsplash.com/photo-1582235940938-1db259a43aeb?auto=format&fit=crop&w=1350",
        choices: [{ text: "Try Again", nextScene: "start" }],
      },
    }
    }
  },

  EcosystemAwareness: {
    gameId: "110",
    title: "Ecosystem Awareness",
    description: "This game is a choice-based narrative where your decisions affect your Respect Score and the outcome of your hike.",
    thumbnail: "/images/water-conservation.png",
    component:EcosystemAwareness,
    data: {
      
    }
  },

   EcosystemAwareness1: {
    gameId: "111",
    title: "Ecosystem Awareness",
    description: "This game is a choice-based narrative where your decisions affect your Respect Score and the outcome of your hike.",
    thumbnail: "/images/water-conservation.png",
    component:EcosystemAwareness1,
    data: {
      
     }
     ,
  },
   
   EchoEffectGame: {
    gameId: "112",
    title: "EchoEffect Game",
    description: "This game is a choice-based narrative where your decisions affect your Respect Score and the outcome of your hike.",
    thumbnail: "/images/water-conservation.png",
    component:EchoEffectGame,
    data: {
      
     }
  },
   
   PurifyPipelineGame: {
    gameId: "113",
    title: "PurifyPipeLine Game",
    description: "you have given some situation where you have to take some desicion.",
    thumbnail: "/images/water-conservation.png",
    component:PurifyPipelineGame,
    data: {
      
     }
    
   }
};

export default gamesData;

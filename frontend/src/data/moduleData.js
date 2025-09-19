import DragAndDropWasteGame from "@/components/gamesModule/game";
import gamesData from "./GameModuleData";
import RecycleRush from "@/components/gamesModule/RecycleRush";
import WasteSortingGame from "@/components/gamesModule/wasteSegregation2";
import ClimateCrisisSimulator from "@/components/gamesModule/ClimateCrisisSimulator";
import EnergyConservationGame from "@/components/gamesModule/EnergyConservationGame";
import PlantationGame from "@/components/gamesModule/PlantationGame";
import WaterConservation1 from "@/components/gamesModule/waterConservation1";
import NaturesPathGame from "@/components/gamesModule/NaturesPathGame";
import EcosystemAwareness from "@/components/gamesModule/EcoSystemAwerness";
import EcosystemAwareness1 from "@/components/gamesModule/EcoSystemAwarness1";
import EchoEffectGame from "@/components/gamesModule/EchoEffectGame";
import PurifyPipelineGame from "@/components/gamesModule/PurifyPipelineGame";

export const modulesData = [
  {
    id: 1,
    title: "Waste Management",
   
    lessons: [
      {
        id: 101, // must match GameModuleData key
        title: "Waste Segregation",
        description: "Learn how to separate waste effectively.",
        gameId: gamesData.wasteSegregation.gameId,
        steps: [
          "Identify dry and wet waste",
          "Segregate them into separate bins",
          "Send recyclables to the correct facility",
        ],
        impactGraph: [
          { step: "Start", impact: 0 },
          { step: "Segregate", impact: 30 },
          { step: "Recycle", impact: 60 },
          { step: "Final Impact", impact: 90 },
        ],
      },
      {
        id: 103,
        title: "Recycling Basics",
        description: "Understand recycling processes and impacts.",
        gameId: gamesData.RecycleRush.gameId,
        steps: [
          "Collect recyclable materials",
          "Clean and separate them",
          "Send them to recycling units",
        ],
        impactGraph: [
          { step: "Start", impact: 0 },
          { step: "Collect", impact: 25 },
          { step: "Recycle", impact: 70 },
          { step: "Final Impact", impact: 100 },
        ],
      },
      {
        id: 104,
        title: "Waste Sorting Basics",
        description: "Sorting the waste on the basis of their type.",
        gameId: gamesData.WasteSortingGame.gameId,
        steps: [
          "Collect recyclable materials",
          "Clean and separate them",
          "Send them to recycling units",
        ],
        impactGraph: [
          { step: "Start", impact: 0 },
          { step: "Collect", impact: 25 },
          { step: "Recycle", impact: 70 },
          { step: "Final Impact", impact: 100 },
        ],
      },
    ],
  },


  {
    id: 2,
    title: "Energy Conservation",
    lessons: [
      {
        id: 204,
        title: "Energy Crisis simulator",
        description: "Learn tips to reduce power consumption.",
        gameId: 201,
        steps: [
          "Switch off unused appliances",
          "Use LED lights",
          "Install solar panels",
        ],
        impactGraph: [
          { step: "Start", impact: 0 },
          { step: "Switch Off", impact: 40 },
          { step: "LED Usage", impact: 65 },
          { step: "Solar Power", impact: 95 },
        ],
      },
      {
        id: 205,
        title: "Climate Crisis Simulator ",
        description: "Learn about the global emission impact",
        gameId: gamesData.ClimateCrisisSimulator.gameId,
        steps: [
          "Switch off unused appliances",
          "Use LED lights",
          "Install solar panels",
        ],
        impactGraph: [
          { step: "Start", impact: 0 },
          { step: "Switch Off", impact: 40 },
          { step: "LED Usage", impact: 65 },
          { step: "Solar Power", impact: 95 },
        ],
      },
      {
        id: 205,
        title: "Save electricity",
        description: "learn how to conserve energy",
        gameId: gamesData.EnergyConservationGame.gameId,
        steps: [
          "Switch off unused appliances",
          "Use LED lights",
          "Install solar panels",
        ],
        impactGraph: [
          { step: "Start", impact: 0 },
          { step: "Switch Off", impact: 40 },
          { step: "LED Usage", impact: 65 },
          { step: "Solar Power", impact: 95 },
        ],
      },
    ],
  },

  {
    id: 3,
    title: "Plantation",
    lessons: [
      {
        id: 205,
        title: "Plant and Grow",
        description: "learn how to do proper plantation",
        gameId: gamesData.PlantationGame.gameId,
        steps: [
          "Plant a tree with the seed",
          "Look after it",
          "Grow as tree and turn your field in mini forest",
        ],
        impactGraph: [
          { step: "Start", impact: 0 },
          { step: "Plant", impact: 40 },
          { step: "Look after", impact: 65 },
          { step: "Grow as tree", impact: 95 },
        ],
      },
    ]
  }
  ,
  {
    id: 4,
    title: "Water Management",
    lessons: [
       {
        id: 105,
        title: "Water conservation basic",
        description: "Sort the whole grid to conserve maximum water",
        gameId: gamesData.WaterConservation1.gameId,
        steps: [
          "shows the grid ",
          "Red is the area of leaking",
          "make a logical way to connect and closed all the leaks.",
        ],
        impactGraph: [
          { step: "Start", impact: 0 },
          { step: "Collect", impact: 25 },
          { step: "Recycle", impact: 70 },
          { step: "Final Impact", impact: 100 },
        ],
      },
      {
        id: 106,
        title: "EchoEffect Game ",
        description: "Learn in a interactive way of Eco-effect",
        gameId: gamesData.EchoEffectGame.gameId,
        steps: [
          "shows the grid ",
          "Red is the area of leaking",
          "make a logical way to connect and closed all the leaks.",
        ],
        impactGraph: [
          { step: "Start", impact: 0 },
          { step: "Collect", impact: 25 },
          { step: "Recycle", impact: 70 },
          { step: "Final Impact", impact: 100 },
        ],
      },
      {
        id: 107,
        title: "PurifyPipeLine Game",
        description: "Learn in a interactive way of Purify-Pipeline",
        gameId: gamesData.PurifyPipelineGame.gameId,
        steps: [
          "shows the grid ",
          "Red is the area of leaking",
          "make a logical way to connect and closed all the leaks.",
        ],
        impactGraph: [
          { step: "Start", impact: 0 },
          { step: "Collect", impact: 25 },
          { step: "Recycle", impact: 70 },
          { step: "Final Impact", impact: 100 },
        ],
      },
    ]
  },

  {
    id: 5,
    title: "EcoSystem",
    lessons: [
       {
        id: 108,
        title: "Story based game.",
        description: "Sort the whole grid to conserve maximum water",
        gameId: gamesData.NaturesPathGame.gameId,
        steps: [
          "Read step by step instruction  ",
          "and implement your thinking on that basis",
          "make a logical way to win the game.",
        ],
        impactGraph: [
          { step: "Start", impact: 0 },
          { step: "Collect", impact: 25 },
          { step: "Recycle", impact: 70 },
          { step: "Final Impact", impact: 100 },
        ],
      },
      
     {
        id: 109,
        title: "EcoSystem Awarness",
        description: "assign species to habitats under constraints.",
        gameId: gamesData.EcosystemAwareness.gameId,
        steps: [
          "choose a specific animal ",
          "try to keep them in their specific eco-group",
          "make a logical way to win the game.",
        ],
        impactGraph: [
          { step: "Start", impact: 0 },
          { step: "Collect", impact: 25 },
          { step: "Recycle", impact: 70 },
          { step: "Final Impact", impact: 100 },
        ],
      },

      {
        id: 110,
        title: "EcoSystem Awarness2",
        description: "assign species to habitats under constraints.",
        gameId: gamesData.EcosystemAwareness1.gameId,
        steps: [
          "choose a specific animal ",
          "try to keep them in their specific eco-group",
          "make a logical way to win the game.",
        ],
        impactGraph: [
          { step: "Start", impact: 0 },
          { step: "Collect", impact: 25 },
          { step: "Recycle", impact: 70 },
          { step: "Final Impact", impact: 100 },
        ],
      },
    ]
  }
];


export const xpImages = [
  {
    title: "Eco rookie",
    min: 0,
    max: 100,
    img: "/images/rookie-image.png",
  },
  {
    title: "Green master",
    min: 101,
    max: 300,
    img: "/images/master.png",
  },
  {
    title: "Eco gradmaster",
    min: 301,
    max: 600,
    img: "/images/grandmaster.png",
  },
  {
    title: "Planet Guardian",
    min: 601,
    max: 1000,
    img: "/images/guardian.png",
  },
];




export const gameComponent = [
  {
    gameComponentId: gamesData.wasteSegregation.gameId,
    component: DragAndDropWasteGame,
    data: gamesData.wasteSegregation.data,
  },
  {
    gameComponentId: gamesData.RecycleRush.gameId,
    component: RecycleRush,
    data: gamesData.RecycleRush.data,
  },
  {
    gameComponentId: gamesData.WasteSortingGame.gameId,
    component: WasteSortingGame,
     data:gamesData.WasteSortingGame.data
    
  },
  {
    gameComponentId: gamesData.ClimateCrisisSimulator.gameId,
    component: ClimateCrisisSimulator,
    data:gamesData.ClimateCrisisSimulator.data
  },
  {
    gameComponentId: gamesData.EnergyConservationGame.gameId,
    component: EnergyConservationGame,
    data:gamesData.EnergyConservationGame.data
  },
  {
    gameComponentId: gamesData.PlantationGame.gameId,
    component: PlantationGame,
    data:gamesData.PlantationGame.data
  },
  {
    gameComponentId: gamesData.WaterConservation1.gameId,
    component: WaterConservation1,
    data: gamesData.WaterConservation1.data
  },
    {
    gameComponentId: gamesData.NaturesPathGame.gameId,
    component: NaturesPathGame,
    data: gamesData.NaturesPathGame.data.storyData
  },
  {
    gameComponentId: gamesData.EcosystemAwareness.gameId,
    component: EcosystemAwareness,
    data: gamesData.EcosystemAwareness.data,
  },
  {
    gameComponentId: gamesData.EcosystemAwareness1.gameId,
    component: EcosystemAwareness1,
    data: gamesData.EcosystemAwareness1.data,
  },
  {
    gameComponentId: gamesData.EchoEffectGame.gameId,
    component:EchoEffectGame,
    data: gamesData.EchoEffectGame.data,
  },
   {
    gameComponentId: gamesData.PurifyPipelineGame.gameId,
    component:PurifyPipelineGame,
    data: gamesData.PurifyPipelineGame.data,
  },
];
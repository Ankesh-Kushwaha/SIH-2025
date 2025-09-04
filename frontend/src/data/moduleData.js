export const modulesData = [
  {
    id: 1,
    title: "Waste Management",
    lessons: [
      {
        id: 101,
        title: "Waste Segregation",
        description: "Learn how to separate waste effectively.",
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
        id: 102,
        title: "Recycling Basics",
        description: "Understand recycling processes and impacts.",
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
        id: 201,
        title: "Save Electricity",
        description: "Learn tips to reduce power consumption.",
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

import express from "express";
import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import cors from "cors";
import { handleChatMessage } from "./controllers/chat.controller.js";
import chatRoute from "./routes/chatboat.route.js";
import quizRoute from './routes/quiz.route.js'
dotenv.config();
import databaseConnection from "./config/db.js";
import { clerkMiddleware, } from '@clerk/express'
import userRoutes from './routes/userRoutes/user.route.js'
import postRoute from './routes/postRoutes/postRoute.js'
import DrivesRoutes from './routes/drives.route.js'
import dailyMissionRoute from './routes/dailyMission.route.js'
import taskSubmissionRoute from './routes/taskSubmission.route.js'
import badgeRoute from './routes/badges.route.js'

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(clerkMiddleware());
databaseConnection(); 

//all routes requests
app.use("/api/chat", chatRoute);
app.use("/api/quiz",quizRoute)
app.use("/api/user", userRoutes);
app.use('/api/post', postRoute);
app.use('/api/drives', DrivesRoutes);
app.use('/api/daily-mission', dailyMissionRoute);
app.use('/api/task', taskSubmissionRoute);
app.use('/api/badges', badgeRoute);




const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// WebSocket Server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("✅ Client connected via WebSocket");

  ws.on("message", async (msg) => {
    const userMessage = msg.toString();
    console.log("📩 User:", userMessage);

    try {
      const reply = await handleChatMessage(userMessage);

      // ✅ Send final structured response
      ws.send(
        JSON.stringify({
          type: "final",
          response: reply.response,
        })
      );
    } catch (err) {
      console.error("❌ Error:", err);
      ws.send(
        JSON.stringify({
          type: "error",
          response: {
            summary:
              "⚠️ Oops! Something went wrong. Please try again in a moment.",
          },
        })
      );
    }
  });

  ws.on("close", () => console.log("❌ Client disconnected"));
});



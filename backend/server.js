import express from "express";
import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import cors from "cors";
import { handleChatMessage } from "./controllers/chat.controller.js";
import chatRoute from "./routes/chatboat.route.js";
import quizRoute from "./routes/quiz.route.js";
import databaseConnection from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import userRoutes from "./routes/userRoutes/user.route.js";
import postRoute from "./routes/postRoutes/postRoute.js";
import DrivesRoutes from "./routes/drives.route.js";
import dailyMissionRoute from "./routes/dailyMission.route.js";
import taskSubmissionRoute from "./routes/taskSubmission.route.js";
import badgeRoute from "./routes/badges.route.js";
import { connectRedis } from "./config/redis.js";
import ecoPointRoute from "./routes/ecoPoints.route.js";

dotenv.config();

const app = express();

// ✅ Use Render's provided port or fallback to 5000 for local dev
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

app.use(clerkMiddleware());

// DB connection
databaseConnection();

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is healthy ✅" });
});

// API routes
app.use("/api/chat", chatRoute);
app.use("/api/quiz", quizRoute);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoute);
app.use("/api/drives", DrivesRoutes);
app.use("/api/daily-mission", dailyMissionRoute);
app.use("/api/task", taskSubmissionRoute);
app.use("/api/badges", badgeRoute);
app.use("/api/ecopoints", ecoPointRoute);

// Start HTTP + WebSocket on same port
const server = app.listen(PORT, async () => {
  await connectRedis();
  console.log(`🚀 Server and WebSocket running on port ${PORT}`);
});

// ✅ Attach WebSocket server to the same HTTP server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("✅ Client connected via WebSocket");

  ws.on("message", async (msg) => {
    const userMessage = msg.toString();
    console.log("📩 User:", userMessage);

    try {
      const reply = await handleChatMessage(userMessage);
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

// Optional: Handle Render’s graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Shutting down gracefully...");
  server.close(() => process.exit(0));
});

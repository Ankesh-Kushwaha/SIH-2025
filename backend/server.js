import express from "express";
import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import cors from "cors";
import { handleChatMessage } from "./controllers/chat.controller.js";
import chatRoute from "./routes/chatboat.route.js";
import quizRoute from './routes/quiz.route.js'
dotenv.config();
import databaseConnection from "./config/db.js";


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
databaseConnection(); 


app.use("/api/chat", chatRoute);
app.use("/api/quiz",quizRoute)












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

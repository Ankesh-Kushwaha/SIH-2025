import express from "express";
import { handleChatMessage } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const reply = await handleChatMessage(message);
  console.log(reply);
  res.json({ reply });
});

export default router;

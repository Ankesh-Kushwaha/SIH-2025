import { createClient } from "redis";
import axios from "axios";
import { runMLModel, loadModel } from "./model.js"; // <-- load model once
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// -------------------- CONFIG --------------------
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
const BACKEND_URL = process.env.BACKEND_URL || "https://sih-2025-d510.onrender.com";
const QUEUE_KEY = "submissionQueue";
const POLL_TIMEOUT = 30; // seconds
const AXIOS_TIMEOUT = 10000; // ms
// ------------------------------------------------

const client = createClient({ url: REDIS_URL });
await client.connect();

console.log("🤖 ML Worker started — connecting to Redis...");

// Preload your ML model once to avoid reloading on every job
console.log("🧠 Loading ML model into memory...");
await loadModel(); // Make sure model.js exports a loadModel() that initializes model once
console.log("✅ ML model ready.");

// Create an Axios instance with retry + timeout
const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: AXIOS_TIMEOUT,
});

// Simple exponential backoff utility
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ------------- Core processing function -------------
async function handleSubmission(submission) {
  const { mission_id, evidenceUrl, _id: submissionId } = submission;
  console.log(`🚀 Processing submission ${submissionId}...`);

  if (!evidenceUrl) throw new Error("Missing evidenceUrl");

  const mlResult = await runMLModel(evidenceUrl);
  const status = mlResult.isValid ? "success" : "failed";

  await api.put("/api/task/updation", {
    status,
    mlOutput: mlResult,
    mission_id,
  });

  console.log(`✅ Submission ${submissionId} updated → ${status}`);
}
// -----------------------------------------------------

// ------------- Worker loop with resilience ------------
async function startWorker() {
  let backoff = 1000; // start at 1s

  while (true) {
    try {
      // wait for submission (BRPOP blocks up to POLL_TIMEOUT seconds)
      const result = await client.brPop(QUEUE_KEY, POLL_TIMEOUT);

      if (!result) {
        // timeout expired, no job — loop again
        continue;
      }

      const submission = JSON.parse(result.element);
      console.log("🧾 Received submission:", submission);

      await handleSubmission(submission);

      // reset backoff after success
      backoff = 1000;
    } catch (err) {
      console.error("❌ Worker error:", err.message);

      // try marking failed if mission_id exists
      if (err.mission_id) {
        try {
          await api.put("/api/task/updation", {
            status: "failed",
            mission_id: err.mission_id,
            error: err.message,
          });
          console.log("⚠️ Marked submission as failed in backend.");
        } catch (markErr) {
          console.error("Failed to update backend after error:", markErr.message);
        }
      }

      // reconnect Redis if connection lost
      if (err.message.includes("connection") || err.code === "ECONNRESET") {
        console.log("🔁 Redis connection lost, reconnecting...");
        try {
          if (client.isOpen) await client.disconnect();
          await client.connect();
          console.log("✅ Redis reconnected.");
        } catch (e) {
          console.error("⚠️ Reconnect failed:", e.message);
        }
      }

      // exponential backoff to prevent hot error loop
      await sleep(backoff);
      backoff = Math.min(backoff * 2, 15000);
    }
  }
}
// -----------------------------------------------------

// Simple health check endpoint
app.get("/health", (req, res) => res.status(200).json({ status: "healthy" }));

// Start Express + worker
app.listen(3000, () => {
  console.log("🌍 Worker HTTP server listening on port 3000");
  startWorker();
});

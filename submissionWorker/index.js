// worker.js
import { createClient } from "redis";
import axios from "axios";
import { runMLModel } from "./model.js";

const client = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

const blockingClient = client.duplicate();

client.on("error", (err) => console.error("Redis error:", err));
blockingClient.on("error", (err) => console.error("Blocking Redis error:", err));

await client.connect();
await blockingClient.connect();

console.log("🤖 ML Worker started — waiting for submissions...");

// Process a single submission safely
async function handleSubmission(submission) {
  const { mission_id, evidenceUrl, _id: submissionId } = submission;
  console.log(`🚀 Processing submission ${submissionId}...`);

  if (!evidenceUrl) {
    console.warn(`⚠️ Submission ${submissionId} missing evidenceUrl`);
    return;
  }

  try {
    // Run ML model
    console.log("🧠 Running ML model on:", evidenceUrl);
    const mlResult = await runMLModel(evidenceUrl);

    const status = mlResult.isValid ? "success" : "failed";

    // Update backend
    await axios.put("http://localhost:5000/api/task/updation", {
      status,
      mlOutput: mlResult,
      mission_id,
    });

    console.log(`✅ Submission ${submissionId} updated → ${status}`);
  } catch (err) {
    const errorMsg = err.response?.data || err.message;
    console.error(`❌ ML failed for submission ${submissionId}:`, errorMsg);

    // Attempt to mark submission as failed
    try {
      await axios.put("http://localhost:5000/api/task/updation", {
        status: "failed",
        mission_id,
        error: errorMsg,
      });
      console.log(`⚠️ Submission ${submissionId} marked as failed in backend`);
    } catch (innerErr) {
      console.error(`⚠️ Failed to mark submission ${submissionId} as failed:`, innerErr);
    }
  }
}

// Continuously process submissions from Redis
async function startWorker() {
  while (true) {
    try {
      // Blocking pop waits until a submission exists
      const result = await blockingClient.brPop("submissionQueue", 0);

      if (!result || !result.element) {
        console.warn("⚠️ No submission found, continuing...");
        continue;
      }

      const submission = JSON.parse(result.element);
      console.log("🧾 Received submission:", submission);

      // Await processing to prevent overlapping requests
      await handleSubmission(submission);

    } catch (err) {
      console.error("❌ Worker error:", err.message);

      if (err.message.includes("connection") || err.code === "ECONNRESET") {
        console.log("🔁 Reconnecting Redis blocking client...");
        try {
          await blockingClient.connect();
        } catch (e) {
          console.error("⚠️ Failed to reconnect, retrying in 3s...");
          await new Promise((r) => setTimeout(r, 3000));
        }
      } else {
        // Avoid tight loop
        await new Promise((r) => setTimeout(r, 2000));
      }
    }
  }
}

startWorker();

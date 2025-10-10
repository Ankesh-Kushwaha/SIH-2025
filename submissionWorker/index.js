// worker.js
import { createClient } from "redis";
import axios from "axios";
import { runMLModel } from "./model.js";

const client = createClient();
client.on("error", (err) => console.error("Redis error:", err));
await client.connect();
console.log("🤖 ML Worker started — waiting for submissions...");

async function startWorker() {
  while (true) {
    try {
      // Wait for next job (blocks until available)
      const result = await client.brPop("submissionQueue", 0);

      if (!result || !result.element) {
        console.warn("⚠️ No result found, continuing...");
        continue;
      }

      const submission = JSON.parse(result.element);
      console.log("🧾 Received submission:", submission);

      const { mission_id, evidenceUrl, _id: submissionId } = submission;

      if (!evidenceUrl) {
        console.warn("⚠️ Missing evidenceUrl in submission:", submission);
        continue;
      }

      // Step 1: Run ML model
      const mlResult = await runMLModel(evidenceUrl);

      // Step 2: Determine status
      const status = mlResult.isValid ? "success" : "failed";

      // Step 3: Update API
      await axios.put(`http://localhost:5000/api/task/updation`, {
        status,
        mlOutput: mlResult,
        mission_id,
      });

      console.log(`✅ Updated submission ${submissionId} → ${status}`);
    } catch (err) {
      console.error("❌ Worker error:", err);
      await new Promise((r) => setTimeout(r, 2000)); // small delay to avoid loops
    }
  }
}

startWorker();

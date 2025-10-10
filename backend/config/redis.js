// src/config/redis.js
import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("❌ Redis Client Error:", err));

const publisher = redisClient.duplicate();

async function connectRedis() {
  try {
    await redisClient.connect();
    await publisher.connect();
    console.log("✅ Redis connected successfully");
  } catch (err) {
    console.error("❌ Redis connection error:", err);
  }
}

export { redisClient, publisher, connectRedis };

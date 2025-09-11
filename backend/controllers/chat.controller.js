import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyAenFro3lJEAHUOg1Of_XOoaLdtcvLM5-s'); // 🔑 Better: use env var
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function generateWithRetry(prompt, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await model.generateContent(prompt);
    } catch (err) {
      // Retry only if 503
      if (err.status === 503 && i < retries - 1) {
        console.warn(`⚠️ Gemini overloaded. Retrying in ${delay}ms...`);
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2; // exponential backoff
      } else {
        throw err;
      }
    }
  }
}

export const handleChatMessage = async (message) => {
  try {
    const prompt = `
      You are EcoBot 🌱, an AI assistant for environmental awareness.
      Answer user queries in **strict JSON format only**.
      Do NOT include backticks, markdown, code blocks, or explanations.

      JSON FORMAT:
      {
        "status": "success",
        "query": "<repeat user query>",
        "response": {
          "summary": "<short summary>",
          "data_points": ["Fact 1", "Fact 2", "Fact 3"],
          "sources": ["https://source1.com", "https://source2.com"]
        }
      }

      User Query: ${message}
    `;

    // ✅ Call with retry
    const result = await generateWithRetry(prompt);

    // ✅ Extract Gemini's text output safely
    let generatedText = result.response.candidates[0].content.parts[0].text.trim();

    // ✅ Clean unwanted wrappers
    generatedText = generatedText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // ✅ Parse JSON safely
    const parsed = JSON.parse(generatedText);
    return parsed;

  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return {
      status: "error",
      response: {
        summary: "⚠️ Sorry, I couldn't fetch environmental data right now. Try again later.",
      },
    };
  }
};

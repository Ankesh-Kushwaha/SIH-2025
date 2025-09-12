import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyC9TNmippOPnD6NY0th6o6JIBu0fNzsn60'); // 🔑 Better: use env var
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

export const handleQuizgeneration = async (req,res) => {
  try {
    const { topic, questions, level, length }=req.body;
    const prompt = `
      You are a quiz generator. Generate a quiz in JSON format only, without extra text or explanation.  

      The quiz must follow these rules:
      - topic of the quiz: ${topic},
      - Number of questions: ${questions}  
      - Difficulty level: ${level}  
      - Question length: ${length}  
      - Each question must have:  
        - "id" (unique number)  
        - "question" (the question text)  
        - "options" (list of 4 plausible answer choices)  
        - "correct_answer" (the exact correct option string)  
        - "points" (integer score for the question, e.g., 1–5 depending on difficulty)  

      The JSON must be well-structured as:  

      {
        "quiz": {
           "topic":${topic},
          "level": "${level}",
          "total_questions": ${questions},
          "questions": [
            {
              "id": 1,
              "question": "Sample question?",
              "options": ["A", "B", "C", "D"],
              "correct_answer": "B",
              "eco-points": 2
            }
          ]
        }
        }
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
    console.log(parsed);
    return res.status(200).json({
      success: true,
      message:"quiz generated successfully",
      quiz:parsed
    })
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return {
      status: "error",
      response: {
        summary: "⚠️ Sorry, I couldn't generate quiz data right now. Try again later.",
      },
    };
  }
};

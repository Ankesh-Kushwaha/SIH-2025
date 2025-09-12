import { GoogleGenerativeAI } from "@google/generative-ai";
import { Quize } from "../model/Schema.js";

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
              "points": 2
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
    const parsedquiz = parsed.quiz;
    await Quize.create(parsedquiz);

    return res.status(200).json({
      success: true,
      message:"quiz generated successfully",
      parsed
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



export const allAvailableQuiz = async (req, res) => {
  try {
    const quizes = await Quize.find();
    const count = await Quize.countDocuments();
    res.status(200).json({
      quizes,
      total:count,
    })
  }
  catch (err) {
    throw new Error("error while finding all quiz", err.message);
    res.status(500).json({
      success: false,
      message:"something went wrong"
    })
  }
}

export const findASingleQuiz = async (req, res) => {
  try {
    const {quizId }= req.params;
    if (!quizId) return res.status(400).json({
      success: false,
      message:"Quiz id is required",
    })

    const quiz = await Quize.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message:"quiz does not exist"
       })
    }

    res.status(200).json({ quiz });
  }
  catch (err) {
    throw new Error("error while finding a single Quize", err);
    res.status(500).json({
      success: true,
      message:"something went wrong"
    })
  }
}


export const DeleteAsingleQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    if (!quizId) {
      return res.status(400).json({
        success: false,
        message: "Quiz id is required",
      });
    }

    const quiztoBeDeleted = await Quize.findByIdAndDelete(quizId);

    if (!quiztoBeDeleted) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    return res.status(202).json({
      success: true,
      message: "Quiz deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting quiz:", err.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting quiz",
      error: err.message, // optional: send error details
    });
  }
};

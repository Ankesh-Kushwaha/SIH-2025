import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { number } from 'zod';

const SchoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  leaderboard: { type: Schema.Types.ObjectId, ref: "Leaderboard" },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now }
});


const QuizeSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true
  },
  total_questions: {
    type: Number,
    min: 1,
    required: true
  },
  questions: [
    {
      id: {
        type: Number,
        min: 1,
        required: true
      },
      question: {
        type: String,
        required: true
      },
      options: {
        type: [String],
        validate: {
          validator: function (arr) {
            return arr.length >= 2;
          },
          message: "At least 2 options are required"
        },
        required: true
      },
      correct_answer: {
        type: String,
        required: true
      },
      points: {
        type: Number,
        min: 1,
        required: true
      }
    }
  ],
});
















const Quize=mongoose.model('Quize',QuizeSchema)
const Schools=mongoose.model('Schools',SchoolSchema)

export {
  Schools,
  Quize
}
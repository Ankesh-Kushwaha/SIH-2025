import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { number } from 'zod';

const SchoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  schoolCode:{ type :Number,required:true},
  leaderboard: { type: Schema.Types.ObjectId, ref: "Leaderboard" },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }]
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

const LeaderboardSchema = new Schema({
  school: { type: Schema.Types.ObjectId, ref: "School" },
  rankings: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      ecoPoints: Number
    }
  ],
  updatedAt: { type: Date, default: Date.now }
});


const BadgeSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  iconUrl: String,
  criteria: String, // e.g. "Complete 10 missions", "Score 1000 points"
});

const EcoPointSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  points: Number,
  reason: String, // e.g. "Completed Mission", "Game Won"
  createdAt: { type: Date, default: Date.now }
});

const GameSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  ecoPointsReward: Number
});

const UserGameProgressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  game: { type: Schema.Types.ObjectId, ref: "Game" },
  level: Number,
  score: Number,
  completed: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now }
});

const TaskSubmissionSchema=new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  mission: { type: Schema.Types.ObjectId, ref: "Mission" },
  evidenceUrl: String, // photo/video of task
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  startDate: Date,
  endDate: Date,
  missions: [{ type: Schema.Types.ObjectId, ref: "Mission" }],
  submissions: [{ type: Schema.Types.ObjectId, ref: "Submission" }]
});

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  ecoPointsReward: Number,
  event: { type: Schema.Types.ObjectId, ref: "Event" }
});

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  content: String,
  mediaUrl: String,
  likes: [
    { type: Schema.Types.ObjectId, ref: "User" },
    {total:Number}
  ],
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});



const Posts = mongoose.model('Posts', PostSchema);
const Tasks = mongoose.model('Tasks', TaskSchema);
const Events = mongoose.model('Events', EventSchema);
const TaskSubmission = mongoose.model('TaskSubmission', TaskSubmissionSchema);
const userGameProgress = mongoose.model("userGameProgress", UserGameProgressSchema);
const Games = mongoose.model('Games', GameSchema);
const EcoPoints = mongoose.model('EcoPoints', EcoPointSchema);
const Badges = mongoose.model('Badges', BadgeSchema);
const Leaderboard = mongoose.model('LeaderBoard', LeaderboardSchema);
const Quize = mongoose.model('Quize', QuizeSchema);
const Schools = mongoose.model('Schools', SchoolSchema);

export {
  Schools,
  Quize,
  Leaderboard,
  Badges,
  Games,
  EcoPoints,
  userGameProgress,
  TaskSubmission,
  Events,
  Tasks,
 Posts
}
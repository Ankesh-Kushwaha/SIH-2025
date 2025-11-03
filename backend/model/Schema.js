import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { number } from 'zod';


//left
const SchoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  schoolCode:{ type :Number,required:true},
  leaderboard: { type: Schema.Types.ObjectId, ref: "Leaderboard" },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now }
});


//completed
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


//left
const LeaderboardSchema = new mongoose.Schema({
  school: { type: Schema.Types.ObjectId, ref: "School" },
  rankings: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      ecoPoints: Number
    }
  ],
  updatedAt: { type: Date, default: Date.now }
});

//left 
const BadgeSchema = new Schema({
  title: { type: String, required: true },
  description: {type:String,required:true},
  iconUrl: {type:String,required:true},
  criteria: {type:String,required:true}, // e.g. "Complete 10 missions", "Score 1000 points"
});

//left
const EcoPointSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  points: Number,
  reason: String, // e.g. "Completed Mission", "Game Won"
  createdAt: { type: Date, default: Date.now }
});

//left
const GameSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  ecoPointsReward: Number
});

//left
const UserGameProgressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  game: { type: Schema.Types.ObjectId, ref: "Game" },
  level: Number,
  score: Number,
  completed: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now }
});

//competed partially-> taskSubmissionStatus updation and ecopoints updation left
const TaskSubmissionSchema = new mongoose.Schema({
  user:{type: Schema.Types.ObjectId, ref: "User" },
  drives: { type: Schema.Types.ObjectId, ref: "Drives" },
  mission_id: { type: String, required: true },
  ecoPoints:{type:Number,required:true},
  participant_id:{type:String,required:true},
  description:{type:String,required:true},
  evidenceUrl: {type:String,required:true},
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});


//left
const EventSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  startDate: Date,
  endDate: Date,
  missions: [{ type: Schema.Types.ObjectId, ref: "Mission" }],
  submissions: [{ type: Schema.Types.ObjectId, ref: "Submission" }]
});


//completed 
const CommunityDriveSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    creator: { type: Schema.Types.ObjectId, ref: "User" }, 
    organiser: { type: String, required: true, trim: true },
    impactLevel: {
      type: String,
      enum: ["Local", "District", "State", "National"],
      required: true,
    },
    total_participants: {
      type: Number,
      required: true,
      min: 0,
    },

    driveDateTime: { type: Date, required: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    ecoPoints: { type: Number, default: 0, min: 0 },
    event: { type: Schema.Types.ObjectId, ref: "Event" },
     banner_url: { type: String, required: true },
  },
  {
    timestamps: true, 
  }
);


//completed-> partially likes and comments 
const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  userName: { type: String },
  content: String,
  mediaUrl: String,
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

//completed->partially ->verification of ml model required
const dailyMissionSchema = new Schema({
  title: { type: String, required: true },
  mission_id:{type:String,},
  created_by:{ type: Schema.Types.ObjectId, ref: "User" }, 
  ecoPoints: { type: Number, required: true },
  required_Submission_Type: { type: String, required: true },
  banner_url: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})


const Posts = mongoose.model('Posts', PostSchema);
const Drives = mongoose.model('Drives', CommunityDriveSchema);
const Events = mongoose.model('Events', EventSchema);
const TaskSubmission = mongoose.model('TaskSubmission', TaskSubmissionSchema);
const userGameProgress = mongoose.model("userGameProgress", UserGameProgressSchema);
const Games = mongoose.model('Games', GameSchema);
const EcoPoints = mongoose.model('EcoPoints', EcoPointSchema);
const Badges = mongoose.model('Badges', BadgeSchema);
const Leaderboard = mongoose.model('LeaderBoard', LeaderboardSchema);
const Quize = mongoose.model('Quize', QuizeSchema);
const Schools = mongoose.model('Schools', SchoolSchema);
const dailyMission = mongoose.model('DailyMission', dailyMissionSchema);


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
  Drives,
  Posts,
  dailyMission,
}
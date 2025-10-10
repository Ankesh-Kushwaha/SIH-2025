import { uploadToCloudinary } from "../config/cloudinary.js";
import { dailyMission} from "../model/Schema.js";
import User from "../model/userSchema.js";


export const createDailyMission = async(req, res) =>{
  try {
    const userId = req.userId;
    const { title, ecoPoints, proofType } = req.body;
   
    if (!title || !ecoPoints || !proofType) {
      return res.status(200).json({
        success: true,
        message:"all fields required."
       })
    }

    if (!req.file.buffer) {
      return res.status(400).json({
        success: false,
        message:"banner image required for upload"
       })
    }
    
    const user = await User.findById(userId);

    if (user.role!=='admin') {
      return res.status(401).json({
        success: false,
        message:"admin access required"
      })
    }

    const dailyMissionCount = await dailyMission.countDocuments();
    if (dailyMissionCount >= 1) {
      return res.status(403).json({
        success: false,
        message:"today's mission already created",
       })
    }
   
    //upload banner image to cloudinary
    const imageUpload = await uploadToCloudinary(req.file.buffer);
    const banner_url = imageUpload.secure_url;
    //create daily mission 
    const newDailyMission = await dailyMission.create({
      title,
      ecoPoints,
      required_Submission_Type: proofType,
      banner_url
    });
    
    if (!newDailyMission) {
      return res.status(400).json({
        success: false,
        message:"error while creating dailyMission",
       })
    }

    res.status(200).json({
      success: true,
      message: "daily mission created successfully",
      dailyMission,
    })
  }
  catch (errr) {
    console.error('error while creating map', errr.message);
    res.status(500).json({
      success: false,
      message: "something went wrong",
    })
  }
}

export const getDailyMission = async (req, res) => {
  try {
    const mission = await dailyMission.find();
    if (!mission) {
      res.status(200).json({
        success: true,
        message: "no mission exits",
        mission:{},
       })
    }

    res.status(200).json({
      success: false,
      message: "mission fetched successfully",
      mission,
    })
  }
  catch (err) {
    console.error("error while getting daily mission", err.message);
    res.status(500).json({
      success: true,
      message:"something went wrong."
    })
  }
}


export const deleteDailyMission = async (req, res) => {
  try {
    const count = await dailyMission.countDocuments();
    if (count > 1) {
      await dailyMission.collection.drop();
      return res.status(200).json({
        success: true,
        message: "Daily mission reset."
      });
    }
    else {
      res.status(200).json({
        success: false,
        message: "no mission found"
      });
    }
  } catch (err) {
    console.error("error while deleting the mission", err.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};


import { uploadToCloudinary } from "../config/cloudinary.js";
import { TaskSubmission } from "../model/Schema.js";
import User from "../model/userSchema.js";
import { redisClient } from '../config/redis.js'
import mongoose from "mongoose";

export const submitTask = async (req, res) => {
  try {
    const userId = req.userId;
    const {description,mission_id,ecoPoints}  = req.body;
  
    const imageUrl = req.file?.buffer; //extract the image from the req;
    if (!description || !imageUrl) {
      return res.status(400).json({
        success: true,
        message:"description  is required",
       })
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message:"user does not exit",
      })
    }

    //upload the evidence to cloudinary
    const imageUpload = await uploadToCloudinary(imageUrl);
    const evidence_url = imageUpload.secure_url;
    if (!evidence_url) {
      return res.status(400).json({
        success: false,
        message:"evidence upload got failed"
       })
    }

    //create a taskSubmission
    const newLyTaskSubmitted = await TaskSubmission.create({
      user:user._id,
      description,
      mission_id:mission_id,
      evidenceUrl: evidence_url,
      participant_id: user._id,
      ecoPoints,
    });

    if (!newLyTaskSubmitted) {
      return res.status(400).json({
        success: false,
        message:"task submission got failed"
      })
    }
    
    //publish the task to a redis submission queue from where it get picked by the microservice
    //and update the submission status on the basis of ml output
    await redisClient.lPush("submissionQueue", JSON.stringify(newLyTaskSubmitted.toObject()));

    res.status(200).json({
      success: true,
      message: "task submission completed successfully.",
      newLyTaskSubmitted,
    })
  }
  catch (err) {
    console.error('error while submitting task', err.message);
    res.status(500).json({
      success: false,
      message:"something went wrong.Try after sometime"
    })
  }
}



export const updateTaskStatus = async (req, res) => {
  const { status, mlOutput, mission_id } = req.body;
  console.log("Status of verification:", status);

  try {
    const mission = await TaskSubmission.findOne({ mission_id }).populate('user');
    console.log(mission);
    if (!mission) {
      return res.status(404).json({ success: false, message: "Mission does not exist" });
    }

    if (!mission.user) {
      return res.status(400).json({ success: false, message: "User not linked" });
    }

    const userId = mission.user._id; // ✅ safe ObjectId

    let updatedSubmission;

    if (status==="failed") {
      // Verification failed
      updatedSubmission = await TaskSubmission.findOneAndUpdate(
        { mission_id },
        { status: "Rejected" },
        { new: true }
      );

      // const user = await User.findById(userId);
      // if (user) {
      //   user.ecoPoints = Math.max(user.ecoPoints - mission.ecoPoints, 0);
      //   await user.save();
      // }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      return res.status(400).json({ success: false, message: "Evidence verification failed", updatedSubmission });
    } else {
      // Verification passed
      updatedSubmission = await TaskSubmission.findOneAndUpdate(
        { mission_id },
        { status: "Accepted" },
        { new: true }
      );

      await User.findOneAndUpdate(
        { _id: userId },
        { $inc: { ecoPoints: mission.ecoPoints } },
        { new: true }
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(updatedSubmission);
      return res.status(200).json({ success: true, message: "Submission accepted", updatedSubmission });
    }
  } catch (err) {
    console.error("Error while verifying the submission:", err);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};




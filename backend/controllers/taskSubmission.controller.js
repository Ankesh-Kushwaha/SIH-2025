import { uploadToCloudinary } from "../config/cloudinary.js";
import { TaskSubmission } from "../model/Schema.js";
import User from "../model/userSchema.js";
import {publisher} from '../config/redis.js'

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
    await publisher.lPush("submissionQueue", JSON.stringify(newLyTaskSubmitted.toObject()));

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
    const {status,mlOutput,mission_id} = req.body;
    console.log("status of verification :",status);
    try{
         
    }
    catch(err){

    }
}


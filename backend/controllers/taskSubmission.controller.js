import { uploadToCloudinary } from "../config/cloudinary.js";
import { TaskSubmission } from "../model/Schema.js";
import User from "../model/userSchema.js";


export const submitTask = async (req, res) => {
  try {
    const userId = req.userId;
    const {description,mission_id}  = req.body;
    
    const imageUrl = req.file?.buffer; //etract the image from the req;
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
      evidenceUrl: evidence_url,
      uploadedBy: user._id,
      mission_id,
    });

    if (!newLyTaskSubmitted) {
      return res.status(400).json({
        success: false,
        message:"task submission got failed"
      })
    }

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
   
}

export const updateTheEcoPoint = async (req, res) => {
  
}
import { uploadToCloudinary } from "../config/cloudinary.js";
import { Badges } from "../model/Schema.js";
import User from "../model/userSchema.js";

export const createBadge = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, description, criteria } = req.body;
    const imageUrl = req.file?.buffer;
    if (!title || !description || !criteria || !imageUrl) {
      return res.status(400).json({
        success: false,
        message:"all fields required",
       })
    }

    const user = await User.findById(userId);
    if (user.role === 'admin') {
      return res.status(400).json({
        success: true,
        message:"admin access required",
      })
    }

    //upload the image url to the cloudinary
    const uploadedImg = await uploadToCloudinary(imageUrl);
    const iconUrl = uploadedImg.secure_url;

    if (!iconUrl) {
      return res.status(400).json({
        success: true,
        message:"badge creation failed"
       })
    }

    //create badge 
    const newBadge = await Badges.create({
      title,
      description,
      criteria,
      iconUrl,
    })

    if (!newBadge) {
      return res.status(400).json({
             success:false,
             message:"Badge creation got failed"
       })
    }

    res.status(200).json({
      success: true,
      message: "badge created successfully",
      badge:newBadge,
    })
  }
  catch (err) {
    console.error('error while creating badge', err.message);
    res.status(500).json({
      success: true,
      message:"something went wrong.Please try after some time"
    })
  }
}


export const updateBadge = async (req, res) => {
  
}

export const deleteBadge = async (req, res) => {
  
}

export const getSingleBadge = async (req, res) => {
  
}

export const getAllBadges = async (req, res) => {
  
}
import { Drives } from "../model/Schema.js";
import User from "../model/userSchema.js";
import mongoose from "mongoose";

export const createDriveController = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, organiser, impactLevel, total_participants, driveDateTime, location, description, ecoPoints, } = req.body;
    
    const user = await User.findById(userId);
    if (user.role !== 'admin'){
      return res.status(400).json({
        success: false,
        message:"admin access required"
       })
    };
    
    //create drive
    const newDrive = await Drives.create({
      title,
      organiser,
      impactLevel,
      total_participants,
      driveDateTime,
      location,
      description,
      ecoPoints,
      creator:user._id
    })

    if (!newDrive) {
      return res.status(402).json({
        success: false,
        message:"Drives creation fails"
       })
    }

    res.status(200).json({
      success: true,
      message: "drive created successfully",
      drive:newDrive
    })
  }
  catch (err) {
    new Error("error while creating a drive", err.message);
    res.status(500).json({
      success: false,
      message:"something went wrong.please try after sometime",
    })
  }
}

export const getAllDrives = async (req, res) => {
  try{
    const drives = await Drives.find().sort({ driveDateTime: 1 }).populate('creator',"name"); 
    if (!drives){
      return res.status(200).json(
        {
          success: true,
          message:"no drives presently"
         }
       )
    }

    res.status(200).json({
      success: true,
      message: "drives fetched successfully!",
      drives,
    })
  }
  catch (err) {
    console.error("error while fetching all drive", err.message);
    res.status(500).json({
      success: false,
      message:"something went wrong"
    })
  }
}

export const getASingleDrive = async (req, res) => {
  try {
    const driveId = req.params;
    const drive = await Drives.findById(driveId);
    if (!drive) {
      return res.status(404).json({
        success: false,
        message:"post does not exit"
       })
    }
    res.status(200).json({
      success: true,
      message: "drive fetched successfully!",
      drive,
    })
  }
  catch (err) {
    console.error("error while fetching a single drive", err.message);
    res.status(500).json({
      success: true,
      message:"something went wrong."
    })
  }
}

export const DeleteDriveController = async (req, res) => {
  try {
    const { driveId } = req.params;   
    const userId = req.userId;


    if (!mongoose.Types.ObjectId.isValid(driveId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid drive ID",
      });
    }

    const drive = await Drives.findById(driveId);
    if (!drive) {
      return res.status(404).json({
        success: false,
        message: "Drive does not exist",
      });
    }

    if (userId.toString() !== drive.creator.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this drive",
      });
    }

    const deletedDrive = await Drives.findByIdAndDelete(driveId);

    res.status(200).json({
      success: true,
      message: "Drive deleted successfully",
      drive: deletedDrive,
    });
  } catch (err) {
    console.error("Error while deleting drive:", err.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
      error: err.message,
    });
  }
};


export const submitDriveReport = async (req, res) => {
  
}




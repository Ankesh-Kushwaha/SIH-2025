import User from "../model/userSchema.js";

export const increaseEcoPoints = async (req, res) => {
  try {
    const userId = req.userId;
    const points = req.body;
    
    if (!userId) return res.json("userId is required");

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message:"authentication required",
        })
    }

    //update ecoPoints;
    const updatedUser = await User.findByIdAndUpdate(userId,
       { _id: userId },
       { $inc: { ecoPoints: points } },
       { new: true }
    )

    if (updatedUser) {
      return res.status(200).json({
        success: true,
        message: "user ecopoints updated successfully",
        updatedUser
      });
    }
  }
  catch (err) {
    console.log('error while updating user ecopoints', err.message);
    res.status(500).json({
      success: false,
      message:'something went wrong.Try after sometime',
    })
  }
}


export const decreaseEcoPoints = async (req, res) => {
  try {
    const userId = req.userId;
    const ecoPoints = req.body;
    if (!userId) return res.status(402).json("userId is required");

    const user = await User.findById(userId);
    if (!user) return res.status(401).json("user does not exist");

    //decrease the points
    user.ecoPoints = Math.max((user.ecoPoints - ecoPoints), 0);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "user points get updated",
      user,
    })
    
  }
  catch (err) {
    console.log("error while decresing ecopoints :", err.message); 
    res.status(500).json({
      success: false,
      message:"something went wrong."
    })
  }
}


export const topPerformer = async (req,res) => {
  try {
    const topUser = await User.find().sort({ ecoPoints: -1 }).limit(10);
    return res.status(200).json({
      success: true,
      message: 'top Performers',
      topUser,
    })
  } 
  catch (err) {
    console.error("error while getting top performers:", err.message);
    return res.status(500).json({
      success: false,
      message:'something went wrong',
    })
  }
}

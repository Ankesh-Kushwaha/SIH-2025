import { clerkClient, getAuth } from "@clerk/express";
import User from "../model/userSchema.js";

export const authController = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await clerkClient.users.getUser(userId);

    const privateData = user.privateMetadata;
    const role = privateData.role || "user";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    const email =
      (user.emailAddresses && user.emailAddresses[0]?.emailAddress) || null;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "No email found for this Clerk user",
      });
    }

    // ✅ Use findOne instead of find
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const newUser = await User.create({
        name: `${firstName} ${lastName}`.trim(),
        email,
        role,
      });

      if (!newUser) {
        return res.status(400).json({
          success: false,
          message: "User creation failed",
        });
      }
      

      req.userId = newUser._id;
      return res.status(201).json({
        success: true,
        message: "User creation successful!",
        data: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      });
    }

    // If user already exists
    if (existingUser) {
      req.userId = existingUser._id;
    }

    return res.status(200).json({
      success: true,
      message: "User already exists",
      data: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (err) {
    console.error("❌ Error in authController:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
      error: err.message,
    });
  }
};


const adminController = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId);
    if (user.role !== 'admin') {
      return res.status(400).json({                 
      })
    }
  }
  catch (err) {
    
  }
}
import {cloudinary,uploadToCloudinary }from '../config/cloudinary.js'
import { Posts } from '../model/Schema.js';

export const createPostController = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.userId;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image file required for post",
      });
    }

    // Upload to Cloudinary
    const uploaded = await uploadToCloudinary(file.buffer);
    const mediaUrl = uploaded.secure_url;

    // Create post
    const newPost = await Posts.create({ content, mediaUrl, user: userId });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (err) {
    console.error("Create post error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while creating post",
      error: err.message,
    });
  }
};


export const updatePostController = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;
    const file = req.file;
    const userId = req.userId;

    if (!content && !file) {
      return res.status(400).json({ success: false, message: "Content or image required to update the post." });
    }

    const post_before_update = await Posts.findById(postId);
    if (!post_before_update) {
      return res.status(404).json({ success: false, message: "Post does not exist" });
    }

    if (post_before_update.user.toString()!== userId.toString()) {
      return res.status(403).json({ success: false, message: "Post does not belong to you." });
    }

    let mediaUrl;
    if (file) {
      const uploaded_image = await uploadToCloudinary(file.buffer);
      mediaUrl = uploaded_image.secure_url;
    }

    const updateData = {};
    if (content) updateData.content = content;
    if (mediaUrl) updateData.mediaUrl = mediaUrl;

    const updated_post = await Posts.findByIdAndUpdate(postId, updateData, { new: true, runValidators: true });

    if (!updated_post) {
      return res.status(400).json({ success: false, message: "Post could not be updated" });
    }

    res.status(200).json({ success: true, message: "Post updated successfully", post: updated_post });
  } catch (err) {
    console.error('updatePostController error:', err);
    return res.status(500).json({ success: false, message: "Something went wrong. Please try again later" });
  }
};


export const deletePostController = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;
    
    if (!postId) return res.status(400).json({ message: "postId is required" });
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(400).json({
        success: false,
        message:"post does not exist",
      })
    }

    if (post.user.toString() !== userId.toString()) {
      return res.status(400).json({
        success: false,
        message:"You cannot delete the Post.Because it does not belong to you."
       })
    }

    //delete the particular post ;
    const deletedPost = await Posts.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(400).json({
        success: false,
        message:"post cannot be delete.try after sometime"
      })
    }

    res.status(200).json({
      success: true,
      message: "post deleted successfully",
      deletedPost,
    })
  }
  catch (error) {
    throw new Error("error while deleting the post", error.message);
    res.status(500).json({
      success: false,
      message:"something went wrong",
    })
  }
}

export const getSinglePostController = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({
        success: false,
        message:"postId is required"
      })
    }
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message:"no post exist",
       })
    }

    res.status(200).json({
      success: true,
      message: "post fetched successfully",
      post,
    })
  }
  catch (err) {
    throw new Error("error while fetching a single post");
    res.status(200).json({
      success: true,
      message:"something went wrong.try after sometime."
    })
  }
}

export const getAllPostController = async (req, res) => {
  try {
    const posts = await Posts.find({})
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      message: "posts fetched successfully",
      posts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "error while getting all Posts",
    });
  }
};

export const getALLPostofCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) res.status(401).json({
      success: false,
      message:"unauthorised",
    })
    
  const posts = await Posts.find({ user: userId }).populate("user", "name");

    if (!posts) {
      return res.status(404).json({
        success: true,
        message:"no post found"
       })
    }

    res.status(200).json({
      success: true,
      message: "post fetched successfully",
      posts,
    })
  }
  catch (err) {
    new Error("error while getting user post", err.message);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error:err.message,
    })
  }
}


export const postLikeController = async (req, res) => {
    try {
      const { postId } = req.params;           
      const userId = req.userId;               

      if (!postId) {
        return res.status(400).json({ success: false, message: "postId required" });
      }

      const post = await Posts.findById(postId);
      if (!post) {
        return res.status(404).json({ success: false, message: "Post not found" });
      }

      const alreadyLiked = post.likes.includes(userId);

      if (alreadyLiked) {
        post.likes.pull(userId);
      } else {
        post.likes.push(userId);
      }

      await post.save();

      res.status(200).json({
        success: true,
        liked: !alreadyLiked,
        totalLikes: post.likes.length,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Error toggling like" });
    }
};

export const postCommentController = async (req, res) => {
    try {
      const { postId } = req.params;            
      const { text } = req.body;
      const userId = req.userId;

      if (!text) {
        return res.status(400).json({ success: false, message: "Comment text required" });
      }

      const post = await Posts.findById(postId);
      if (!post) {
        return res.status(404).json({ success: false, message: "Post not found" });
      }

      const newComment = { user: userId, text };

      post.comments.push(newComment);
      await post.save();

      // populate the user name of the new comment if you want to send it back
      const populatedPost = await Posts.findById(postId)
        .populate("comments.user", "name");

      res.status(201).json({
        success: true,
        message: "Comment added",
        comments: populatedPost.comments,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Error adding comment" });
  }
};


export const getAllcomment = async (req, res) => {
  
}

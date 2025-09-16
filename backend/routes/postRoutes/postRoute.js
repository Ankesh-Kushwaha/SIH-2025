import express from 'express';
const router = express.Router();
import multer from 'multer'
import { createPostController, updatePostController, deletePostController, getSinglePostController, getAllPostController, postLikeController, postCommentController } from '../../controllers/post.controller.js'
import { isLogin } from '../../middleware/auth.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB in bytes
  },
});

router.use(isLogin);
router.post('/create',upload.single('image'), createPostController);
router.put('/update-post/:postId',upload.single('image'), updatePostController);
router.delete('/delete-post/:postId', deletePostController);
router.get('/get-a-single-post/:postId', getSinglePostController);
router.get('/get-all-post', getAllPostController);
router.post('/likes/:postId', postLikeController);
router.post('/comments/:postId', postCommentController);

export default router;

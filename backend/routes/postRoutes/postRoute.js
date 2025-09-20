import express from 'express';
const router = express.Router();
import multer from 'multer'
import { createPostController, updatePostController, deletePostController, getSinglePostController, getAllPostController, postLikeController, postCommentController, getALLPostofCurrentUser} from '../../controllers/post.controller.js'
import { isLogin } from '../../middleware/auth.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB in bytes
  },
});

router.get('/get-all-post', getAllPostController);
router.use(isLogin);
router.post('/create',upload.single('image'), createPostController);
router.put('/update-post/:postId',upload.single('image'), updatePostController);
router.delete('/delete-post/:postId', deletePostController);
router.get('/get-a-single-post/:postId', getSinglePostController);
router.get('/get-user-post', getALLPostofCurrentUser);
router.put("/like/:postId", postLikeController);
router.post("/comment/:postId", postCommentController);

export default router;

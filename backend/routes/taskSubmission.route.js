import express from 'express';
import { isLogin } from '../middleware/auth.js';
import { submitTask } from '../controllers/taskSubmission.controller.js';
import {upload} from '../config/multer.js'
const router = express.Router();


router.use(isLogin);
router.post('/submission',upload.single('image'), submitTask);


export default router;
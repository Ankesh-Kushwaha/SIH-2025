import express from 'express';
import { isLogin } from '../middleware/auth.js';
import {upload} from '../config/multer.js'
import { createBadge, deleteBadge, getAllBadges, getSingleBadge, updateBadge } from '../controllers/badge.controller.js';
const router = express.Router();



router.use(isLogin);
router.post('/create', upload.single('image'), createBadge);
router.put('/update', updateBadge);
router.delete('/delete/:badgeId', deleteBadge);
router.get('/single-badge', getSingleBadge);
router.get('/get-all-badge', getAllBadges);


export default router;
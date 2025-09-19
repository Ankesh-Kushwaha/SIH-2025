import express from 'express';
import { createDailyMission, getDailyMission } from '../controllers/dailyMission.controller.js';
import { isLogin } from '../middleware/auth.js';
import multer from 'multer';
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB in bytes
  },
});

router.use(isLogin);
router.post('/create', upload.single('image'), createDailyMission);
router.get(`/get`, getDailyMission);

export default router;
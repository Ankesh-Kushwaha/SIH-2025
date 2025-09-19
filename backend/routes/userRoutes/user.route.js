import express from 'express';
import { authController, getCurrentUser, isLogin } from '../../middleware/auth.js';
import { requireAuth } from '@clerk/express';
const router = express.Router();

router.use(requireAuth());
router.get('/me', authController);
router.use(isLogin);
router.get('/get', getCurrentUser);



export default router;
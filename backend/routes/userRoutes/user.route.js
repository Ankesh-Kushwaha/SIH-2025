import express from 'express';
import { authController } from '../../middleware/auth.js';
import { requireAuth } from '@clerk/express';
const router = express.Router();

router.use(requireAuth());
router.get('/me',authController);


export default router;
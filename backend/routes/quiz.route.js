import express from 'express';
import { handleQuizgeneration } from '../controllers/quiz.controller';
const router = express.Router();

router.post('/generate', handleQuizgeneration);
export default router;
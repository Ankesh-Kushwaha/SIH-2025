import express from 'express';
import { allAvailableQuiz, DeleteAsingleQuiz, findASingleQuiz, handleQuizgeneration } from '../controllers/quiz.controller.js';
const router = express.Router();

router.post('/generate', handleQuizgeneration);
router.get('/get-all-quiz', allAvailableQuiz);
router.get('/get-a-single-quiz/:quizId', findASingleQuiz);
router.delete('/delete-a-single-quiz/:quizId', DeleteAsingleQuiz);

export default router;
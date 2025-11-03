import express from 'express';
import { decreaseEcoPoints, increaseEcoPoints, topPerformer } from '../controllers/ecoPoint.controller.js';
const router = express.Router();


router.put('/decrease-point', decreaseEcoPoints);
router.put('/increase-point', increaseEcoPoints);
router.get('/top-performer', topPerformer);

export default router;
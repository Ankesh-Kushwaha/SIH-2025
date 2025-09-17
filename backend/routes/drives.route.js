import express from 'express';
import { createDriveController, DeleteDriveController, getAllDrives, getASingleDrive } from '../controllers/drives.controller.js';
import { isLogin } from '../middleware/auth.js';
const router = express.Router();

router.use(isLogin);
router.post('/create-drive', createDriveController);
router.get('/get-all-drives', getAllDrives);
router.get('/get-single-drive/:driveId', getASingleDrive);
router.delete('/delete-drive/:driveId', DeleteDriveController);

export default router;
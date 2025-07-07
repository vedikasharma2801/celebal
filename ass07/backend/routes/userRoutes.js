import express from 'express';
const router = express.Router();
import { authUser, registerUser, logoutUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile); // This route is protected

export default router;
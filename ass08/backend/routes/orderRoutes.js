import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById, // Make sure this is imported
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
// --- THIS IS THE CRITICAL LINE ---
router.route('/:id').get(protect, getOrderById);
// ---------------------------------
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
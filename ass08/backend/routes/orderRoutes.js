import express from 'express';
const router = express.Router();
import {
   addOrderItems,
  getOrderById,
  updateOrderToPaid,
  createStripePaymentIntent,
  getMyOrders
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/create-stripe-payment-intent').post(protect, createStripePaymentIntent);
export default router;
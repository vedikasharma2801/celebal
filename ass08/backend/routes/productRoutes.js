import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  getTopProducts,
} from '../controllers/productController.js';

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
router.route('/top').get(getTopProducts);

export default router;
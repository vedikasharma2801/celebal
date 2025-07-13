import stripe from 'stripe';
import Order from '../models/orderModel.js';

// Initialize Stripe with your secret key
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      // We map over the orderItems to ensure the product ID is set correctly
      // and we remove the client-side _id to let MongoDB generate a new one for the sub-document.
      orderItems: orderItems.map(x => ({ ...x, product: x._id, _id: undefined })),
      user: req.user._id, // This comes from our 'protect' middleware
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  // .populate() fetches related data from another collection.
  // Here, we're getting the name and email from the 'User' collection.
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
};

// @desc    Update order to paid status
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // Save payment details (e.g., from Stripe)
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
};


// @desc    Create a Stripe payment intent
// @route   POST /api/orders/:id/create-stripe-payment-intent
// @access  Private
const createStripePaymentIntent = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    const paymentIntent = await stripeInstance.paymentIntents.create({
      // Stripe requires the amount in the smallest currency unit (e.g., cents for USD)
      amount: Math.round(order.totalPrice * 100),
      currency: 'usd', // IMPORTANT: Must be a currency your Stripe account supports
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
};

const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
};
// --- Admin specific controllers can be added later ---
// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
// const updateOrderToDelivered = async (req, res) => { ... };

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
// const getOrders = async (req, res) => { ... };


export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  createStripePaymentIntent,
  // updateOrderToDelivered,
  getMyOrders,
};
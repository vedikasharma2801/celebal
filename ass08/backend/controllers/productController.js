import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {};

    const products = await Product.find({ ...keyword });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch a single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
};
const getTopProducts = async (req, res) => {
 try {
    // Build the query first, then execute it with 'await'
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    
    res.status(200).json(products);
  } catch (error) {
    // If anything goes wrong, send back a proper error response
    res.status(500).json({ message: 'Server Error: Could not fetch top products' });
    console.error(error); // Also log the error for debugging
  }
};
export { getProducts, getProductById, getTopProducts  };
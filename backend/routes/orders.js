const router = require('express').Router();
const Order = require('../models/Order');
const { protect, adminOnly } = require('../middleware/auth');

// Submit enquiry (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, category, message } = req.body;
    if (!name || !email || !phone || !category)
      return res.status(400).json({ message: 'Name, email, phone and category are required' });
    const order = await Order.create({ name, email, phone, category, message });
    res.status(201).json({ message: 'Enquiry submitted! We will contact you within 24 hours.', order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all orders (admin only)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update order status (admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete order (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

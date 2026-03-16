const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, required: true },
  category: { type: String, required: true },
  message: { type: String, default: '' },
  status: {
    type: String,
    enum: ['new', 'contacted', 'confirmed', 'completed', 'cancelled'],
    default: 'new'
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

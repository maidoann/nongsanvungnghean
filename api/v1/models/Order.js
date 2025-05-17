const mongoose = require('mongoose');
const { cartItemSchema } = require('../../models/User');

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customer_info: {
    customer_name: { type: String, required: true },
    phone_number: { type: String, required: true }
  },
  products: [cartItemSchema], // Tái sử dụng schema cart item
  total_price: { type: Number, required: true },
  order_date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shipping_address: { type: String, required: true },
  payment_method: {
    type: String,
    enum: ['cash', 'bank_transfer', 'momo'],
    default: 'cash'
  },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

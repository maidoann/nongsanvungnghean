const mongoose = require('mongoose');
const genarate = require('../../../helpers/generate')
// Schema con cho từng sản phẩm trong giỏ hàng
const cartItemSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unit_price: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  _id: false
}); // Không tạo _id riêng cho từng item

// Schema giỏ hàng
const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
  total_price: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  _id: false
});

// Schema người dùng
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  phone_number: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
    default: genarate()
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  },
  address: {
    type: String
  },
  avatar: {
    type: String
  }, // đường dẫn ảnh đại diện
  is_active: {
    type: Boolean,
    default: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  cart: cartSchema
}, {
  timestamps: true
});


const User = mongoose.model("User", userSchema, "users");
module.exports = {
  User,
  cartItemSchema
};
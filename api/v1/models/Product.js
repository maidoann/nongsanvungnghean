const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  images: [{
    link: {
      type: String
    },
  }, ],
  description: {
    type: String,
    required: true
  },
  sale_unit: [{
    unit_type: {
      type: String,
      default: "weight"
    },
    unit_name: {
      type: String
    },
    price_per_unit: {
      type: Number,
      required: true
    },
  }, ],
  inventory: [{
    total_unit: {
      type: Number,
      required: true
    },
    unit_type: {
      type: String,
      default: "weight"
    },
    unit_name: {
      type: String
    },
  }, ],
  origin: {
    type: String
  },


  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  harvest_date: {
    type: Date,
    required: true
  },
  expiration_date: {
    type: Date,
    required: true
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
  deleted: Boolean,
}, {
  timestamps: true
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
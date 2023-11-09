const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  numInStock: { type: String, required: true }
})

ProductSchema.virtual('url').get(function() {
  return `/stock/product/${this._id}`;
})

module.exports = mongoose.model('Product', ProductSchema);

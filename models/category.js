const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true }
})

CategorySchema.virtual('url').get(function() {
  return `/stock/category/${this.name}`;
});

module.exports = mongoose.model('Category', CategorySchema);

const Category = require('../models/category');
const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.products_in_category = asyncHandler(async (req, res, next) => {
  const categoryName = req.params.name;
  const allProductsInCategory = await Product.find({ category: categoryName })
  res.render('product_list', { allProducts: allProductsInCategory, title: req.params.name })
})

exports.product_detail = asyncHandler(async (req, res, next) => {
  const itemId = req.params.id;
  const item = await Product.findById(itemId);
  res.render('product_detail', { item });
})

exports.product_list = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find();
  res.render('product_list', { allProducts, title: "ALL PRODUCTS" });
})

exports.update_qty = asyncHandler(async (req, res, next) => {
  const newQty = req.params.qty;
  const itemId = req.params.id;

  if (newQty && newQty >= 0) {
    await Product.findOneAndUpdate({ _id: itemId }, { numInStock: newQty.toString() })
  }

  res.json({ success: true, message: 'Quantity updated successfully' })
})

const Category = require('../models/category');
const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.products_in_category = asyncHandler(async (req, res, next) => {
  const categoryName = req.params.name;
  const allProductsInCategory = await Product.find({ category: categoryName })
  res.render('products_in_category', { products_list: allProductsInCategory, title: req.params.name })
})

exports.product_detail = asyncHandler(async (req, res, next) => {
  const itemId = req.params.id;
  const item = await Product.findById(itemId);
  res.render('product_detail', { item });
})

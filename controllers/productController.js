const Category = require('../models/category');
const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.products_in_category = asyncHandler(async (req, res, next) => {
  const categoryName = req.params.name;
  const allProductsInCategory = await Product.find({ category: categoryName })
  res.render('products_in_category', { products_list: allProductsInCategory, title: req.params.name })
})


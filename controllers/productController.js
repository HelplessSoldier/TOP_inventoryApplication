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

  if (newQty >= 0) {
    await Product.findOneAndUpdate({ _id: itemId }, { numInStock: newQty.toString() })
  }

  res.json({ success: true, message: 'Quantity updated successfully' })
})

exports.add_product_form_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find();
  res.render('add_product_form', {
    category_list: allCategories,
    errors: { errors: [] },
    inputValues: {
      name: "",
      description: "",
      category: "Arms",
      price: "",
      qty: ""
    }
  });
})

exports.add_product_form_post = [
  body('name', 'Invalid Name')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('description', 'Invalid Description')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('category', 'Invalid Category')
    .escape(),
  body('price', 'Invalid Price')
    .isNumeric()
    .escape(),
  body('qty', 'Invalid Quantity')
    .isNumeric()
    .escape(),

  asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find();
    const errors = validationResult(req);
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      numInStock: req.body.qty,
    });

    if (!errors.isEmpty()) {
      console.log(errors);
      res.render('add_product_form', {
        category_list: allCategories,
        errors,
        inputValues: {
          name: req.body.name,
          description: req.body.description,
          category: req.body.category,
          price: req.body.price,
          qty: req.body.qty
        }
      });
    } else {
      await product.save();
      res.redirect(product.url);
    }
  })
]

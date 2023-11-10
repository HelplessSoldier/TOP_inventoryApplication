const express = require('express');
const router = express.Router();

const category_controller = require('../controllers/categoryController');
const product_controller = require('../controllers/productController');

router.get('/categories', category_controller.category_list)
router.get('/category/:name', product_controller.products_in_category)

module.exports = router;

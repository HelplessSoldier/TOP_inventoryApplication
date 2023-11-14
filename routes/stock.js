const express = require('express');
const router = express.Router();

const category_controller = require('../controllers/categoryController');
const product_controller = require('../controllers/productController');

router.get('/categories', category_controller.category_list);

router.get('/category/:name', product_controller.products_in_category);

router.get('/products', product_controller.product_list)

router.get('/product/:id', product_controller.product_detail);

router.get('/product/edit/:id', product_controller.edit_product);

router.post('/updateQty/:id/:qty', product_controller.update_qty);

router.get('/add_product_form', product_controller.add_product_form_get);

router.post('/add_product_form', product_controller.add_product_form_post);

module.exports = router;

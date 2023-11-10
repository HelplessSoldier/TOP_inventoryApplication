const express = require('express');
const router = express.Router();

const category_controller = require('../controllers/categoryController');

router.get('/categories', category_controller.category_list)

module.exports = router;

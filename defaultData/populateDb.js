const settings = require('../settings.json');
const mongoose = require('mongoose');
const categories = require('./categoriesDefaultData.json');
const Category = require('../models/category');
const products = require('./productsDefaultData.json');
const Product = require('../models/product');

main().catch((err) => { console.error(err) });

async function main() {
  console.log('This should populate the database with fields from the default data json')
  const dbUrl = settings.dbUrl + '/' + settings.dbName;
  console.log('attempting to connect to mongo db');
  connectToMongo(dbUrl);
  console.log('adding data');
  await createCategories();
  await createProducts();
  console.log(`debug: Closing mongoose`);
  mongoose.connection.close();
}

async function connectToMongo(url) {
  try {
    await mongoose.connect(url);
    console.log(`Connected to db: ${url}`)
  } catch (err) {
    console.error(err);
  }
}

async function createCategories() {
  for (let category of categories) {
    const newCategory = new Category({
      name: category.name,
    });
    await newCategory.save();
    console.log(`added category: ${category.name}`)
  }
}

async function createProducts() {
  for (let product of products) {
    const newProduct = new Product({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      numInStock: product.numInStock
    });
    await newProduct.save();
    console.log(`added product: ${product.name}`);
  }
}


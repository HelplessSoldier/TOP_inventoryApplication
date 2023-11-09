const settings = require('../settings.json');
const mongoose = require('mongoose');
const categories = require('./categoriesDefaultData.json');
const products = require('./productsDefaultData.json');

function main() {
  console.log('This should populate the database with fields from the default data json')
  const dbUrl = settings.dbUrl + '/' + settings.dbName;
  console.log('attempting to connect to mongo db')
  connectToMongo(dbUrl);
}

async function connectToMongo(url) {
  try {
    await mongoose.connect(url);
    console.log(`Connected to db: ${url}`)
  } catch (err) {
    console.error(err);
  }
}

const db = require('./db.js');
const collection = 'categories';
db.createDatabase();

var categories = {
    categoryname: "Pool Chemicals"
}

db.insertOne(collection, categories);

var categories = {
    categoryname: "Pumps"
}

db.insertOne(collection, categories);

var categories = {
    categoryname: "Lights"
}

db.insertOne(collection, categories);

var categories = {
    categoryname: "Cleaning Accessories"
}

db.insertOne(collection, categories);
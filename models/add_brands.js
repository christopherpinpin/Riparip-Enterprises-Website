const db = require('./db.js');
const collection = 'brands';
db.createDatabase();

var brands = {
    brandname: "Honda"
}

db.insertOne(collection, brands);

var brands = {
    brandname: "Toyota"
}

db.insertOne(collection, brands);

var brands = {
    brandname: "Mitsubishi"
}

db.insertOne(collection, brands);
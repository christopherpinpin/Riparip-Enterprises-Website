const db = require('./db.js');
const collection = 'products';
db.createDatabase();

var date = new Date();

var product = {
    prodpic: "http://res.cloudinary.com/debsp3fca/image/upload/v1629636029/cuoizs4iy7vqd3w909fw.png",
    productname: "Honda Pool Chemical",
    model: "LSCUS11030",
    productdesc: "I thought that I was dreamin' When you said you love me The start of nothin' I had no chance to prepare I couldn't see you comin'",
    category: "Pool Chemicals",
    brand: "Honda",
    date: date
}

db.insertOne(collection, product);

var product = {
    prodpic: "http://res.cloudinary.com/debsp3fca/image/upload/v1629636029/cuoizs4iy7vqd3w909fw.png",
    productname: "Toyota Pump",
    model: "LSCUS11030",
    productdesc: "Some people bring you a million blessings. Some people teach you a million lessons. All that I learned, it wasn't my turn. It wasn't thе right time",
    category: "Pumps",
    brand: "Toyota",
    date: date
}

db.insertOne(collection, product);

var product = {
    prodpic: "http://res.cloudinary.com/debsp3fca/image/upload/v1629636029/cuoizs4iy7vqd3w909fw.png",
    productname: "Mitsubishi Pump",
    model: "LSCUS11030",
    productdesc: "California sunshine, but sometimes it's gonna rain. I wish it was always blue skies, but they can turn to gray.",
    category: "Pumps",
    brand: "Mitsubishi",
    date: date
}

db.insertOne(collection, product);

var product = {
    prodpic: "http://res.cloudinary.com/debsp3fca/image/upload/v1629636029/cuoizs4iy7vqd3w909fw.png",
    productname: "Mitsubishi Pool Chemical",
    model: "LSCUS11030",
    productdesc: "It's been way too long. Since I seen you, looked you in your eyes. Riding round the town and staying out I don't wanna say goodbye",
    category: "Pool Chemicals",
    brand: "Mitsubishi",
    date: date
}

db.insertOne(collection, product);

var product = {
    prodpic: "http://res.cloudinary.com/debsp3fca/image/upload/v1629636029/cuoizs4iy7vqd3w909fw.png",
    productname: "Toyota Lights",
    model: "LSCUS11030",
    productdesc: "Sunrise, but the night still young. No words, but we speak in tongues. If you let me, I might say too much",
    category: "Lights",
    brand: "Toyota",
    date: date
}

db.insertOne(collection, product);
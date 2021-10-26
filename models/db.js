const mongodb = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();
const client = mongodb.MongoClient;
const url = "mongodb://localhost:27017";
const options = { useUnifiedTopology: true};

const dbname = "riparip";

const database = {

    //creates database
    createDatabase: function() {
        client.connect(url, options, function (err, db) {
            if(err) throw err;
            console.log('Database created!');
            db.close();
        });
    },
    
    //creates collection collection
    createCollection: function(collection) {
        client.connect(url, options, function(err, db) {
            if(err) throw err;
            var database = db.db(dbname);
            database.createCollection(collection, function (err, res) {
                if(err) throw err;
                console.log('Collection ' + collection + ' created');
                db.close();
            });
        });
    },

    insertOne: function(collection, doc){
        client.connect(url, options, function (err, db) {
            if(err) throw err;
            var database = db.db(dbname);
            database.collection(collection).insertOne(doc, function(err, res) {
                if(err) throw err;
                console.log('1 document inserted');
                db.close();
            });
        });
    },

    insertMany: function(collection, docs) {
        client.connect(url, options, function (err, db) {
            if(err) throw err;
            var database = db.db(dbname);
            database.collection(collection).insertMany(docs, function (err, res) {
                if(err) throw err;
                console.log('Documents inserted: ' + res.insertedCount);
                db.close();
            });
        });
    },

    findOne: function(collection, query, callback) {
        client.connect(url, options, function (err, db) {
            if(err) throw err;
            var database = db.db(dbname);
            database.collection(collection).findOne(query, function (err, result) {
                if(err) throw err;
                db.close();
                return callback(result);
            });
        });
    },

    findMany: function(collection, query, sort=null, projection=null, callback) {
        client.connect(url, options, function (err, db) {
            if(err) throw err;
            var database = db.db(dbname);
            database.collection(collection).find(query, {projection: projection}).sort(sort).toArray(function (err, result) {
                if(err) throw err;
                console.log(result);
                db.close();
                return callback(result);
            });
        });
    },

    deleteOne: function(collection, filter) {
        client.connect(url, options, function (err, db) {
            if(err) throw err;
            var database = db.db(dbname);
            database.collection(collection).deleteOne(filter, function (err, res) {
                if(err) throw err;
                console.log('1 document deleted');
                db.close();
            });
        });
    },

    deleteMany: function(collection, filter) {
        client.connect(url, options, function (err, db) {
            if(err) throw err;
            var database = db.db(dbname);
            database.collection(collection).deleteMany(filter, function (err, res) {
                if(err) throw err;
                console.log('Documents deleted ' + res.deletedCount);
                db.close();
            });
        });
    },

    updateOne: function(collection, filter, update) {
        client.connect(url, options, function (err, db) {
            if(err) throw err;
            var database = db.db(dbname);
            database.collection(collection).updateOne(filter, update, function (err, res) {
                if(err) throw err;
                console.log('1 document updated');
                db.close();
            });
        });
    },

    updateMany: function(collection, filter, update) {
        client.connect(url, options, function (err, db) {
            if(err) throw err;
            var database = db.db(dbname);
            database.collection(collection).updateMany(filter, update, function (err, res) {
                if(err) throw err;
                console.log('Documents updated: ' + res.modifiedCount);
                db.close();
            });
        });
    }
}

module.exports = database;
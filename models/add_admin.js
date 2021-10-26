const db = require('./db.js');
const collection = 'users';
const bcrypt = require ('bcrypt');
db.createDatabase();

bcrypt.hash('p@ssw0rd', 10, function (error, hash){
    db.insertOne('users', {
        username: 'admin',
        password: hash
    });
});
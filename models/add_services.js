const db = require('./db.js');
const collection = 'services';
db.createDatabase();

var date = new Date();

var service = {
    servicename: "Pool Cleaning",
    servicedesc: "At times I wonder why I fool with you But this is new to me, this is new to you. Initially, I didn't wanna fall for you. Gather my attention it was all for you, so don't. Take advantage, don't leave my heart damaged. To understand that things go a little bit better when you plan it",
    date: date
}

db.insertOne(collection, service);

var service = {
    servicename: "Coding Services",
    servicedesc: "The hard part always seems to last forever. Sometimes I forget that we aren't together. Deep down in my heart, I hope you're doing alright. But from time to time I often think of why you aren't mine",
    date: date
}

db.insertOne(collection, service);

var service = {
    servicename: "Speed Express Papers",
    servicedesc: "I can think of all the times. You told me not to touch the light. I never thought that you would be the one. I couldn't really justify. How you even thought it could be right. Cause everything we cherished is gone",
    date: date
}

db.insertOne(collection, service);

var service = {
    servicename: "Grammar tutorials",
    servicedesc: "I'm sure we're taller in another dimension. You say we're small and not worth the mention. You're tired of movin', your body's achin'. We could vacay, there's places to go",
    date: date
}

db.insertOne(collection, service);

var service = {
    servicename: "Python 101",
    servicedesc: "Moon river, wider than a mile. I'm crossing you in style some day. Oh, dream maker, you heart breaker. Wherever you're goin', I'm goin' your way",
    date: date
}

db.insertOne(collection, service);
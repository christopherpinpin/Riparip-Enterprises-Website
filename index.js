const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const routes = require('./routes/routes.js');
const db = require('./models/db.js');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
app.use(
    session({
        secret: 'database',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl:"mongodb://localhost:27017/database"})
    })
);
app.use(bodyParser.urlencoded({extended: false}));

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

hbs.registerHelper('each_upto', function(ary, max, options) {
    if(!ary || ary.length == 0)
        return options.inverse(this);

    var result = [ ];
    for(var i = 0; i < max && i < ary.length; ++i)
        result.push(options.fn(ary[i]));
    return result.join('');
});

hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('ifIn', function(elem, list, options) {
    if(list.indexOf(elem) > -1) {
      return options.fn(this);
    }
    return options.inverse(this);
});


app.use(express.static(path.join(__dirname,'views')));

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + `/views/partials`);

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.use(express.static(`public`));
app.use(`/`, routes);


app.listen(port, hostname, function () {
    console.log(`Server is running at:`);
    console.log(`http://` + hostname + `:` + port);
});

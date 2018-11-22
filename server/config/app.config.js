let app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require("passport");
const flash = require('connect-flash');
const morgan = require('morgan');
let MongoStore = require('connect-mongo')(session);
let secretKeys = require('./secret.keys');

/*** Using Express Middleware *****/
/**********************************/
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser(secretKeys.session));
app.use(session({
    secret: secretKeys.session,
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(session({
    secret: secretKeys.session,
    saveUninitialized: true,
    resave: false,
    cookie: { expires: false }
    //store: new MongoStore({ url: 'mongodb://localhost/db_address_book' })
}));

app.use(flash());
app.use(morgan('dev'));

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.');
        var root = namespace.shift();
        var formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

module.exports = app;
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require("passport");
const morgan = require('morgan');
const MongoStore = require('connect-mongo')(session);
let secretKeys = require('./secret.keys');

let envConfig = require('./env.config');
//let dbUrl = envConfig.db.db_url;
let dbUrl = `mongodb://${envConfig.db.user}:${envConfig.db.password}@${envConfig.db.host}:${envConfig.db.port}/${envConfig.db.db_name}`;

/*** Using Express Middleware *****/
/**********************************/
app.use(cors({
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser(secretKeys.session));
console.log(dbUrl);
app.use(session({
  name: 'x-auth',
  secret: secretKeys.session,
  saveUninitialized: true,
  resave: false,
  cookie: {
    name: "x-auth",
    expires: false
  },
  store: new MongoStore({
    url: dbUrl
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));

// Express Validator
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
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

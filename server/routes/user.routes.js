let app = require('express')();

let signup = require('../controllers/signup.controller');
let signin = require('../controllers/signin.controller');

app.route('/signup')
    .get(signup.ensureAuthenticated, signup.get)
    .post(signup.ensureAuthenticated, signup.post);

app.route('/signin')
    .get(signin.ensureAuthenticated, signin.get)
    .post(signin.ensureAuthenticated, signin.authenticate, signin.post);


module.exports = app;
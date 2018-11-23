let app = require('express')();

let signup = require('../controllers/signup.controller');
let signin = require('../controllers/signin.controller');
let dashboard = require('../controllers/dashboard.controller');

app.route('/signup')
    .get(signup.ensureAuthenticated, signup.get)
    .post(signup.ensureAuthenticated, signup.post);

app.route('/signin')
    .get(signin.ensureAuthenticated, signin.get)
    .post(signin.ensureAuthenticated, signin.authenticate, signin.post);

app.route('/dashboard')
    .get(dashboard.ensureAuthenticated, dashboard.get)
    .put(dashboard.ensureAuthenticated, dashboard.put)
    .delete(dashboard.ensureAuthenticated, dashboard.delete);

app.route('/signout')
    .get(dashboard.ensureAuthenticated, signin.signout);

module.exports = app;
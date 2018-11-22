let app = require('express')();
let User = require('../models/user.model');

let signup = require('../controllers/signup.controller')

app.route('/signup')
    .get(signup.isAuthenticated, signup.get)
    .post(signup.isAuthenticated, signup.post);

module.exports = app;
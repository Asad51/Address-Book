let app = require('express')();

let signup = require('../controllers/signup.controller');
let signin = require('../controllers/signin.controller');
let dashboard = require('../controllers/dashboard.controller');

app.route('/signup')
  .post(signup.post);

app.route('/signin')
  .post(signin.post);

app.route('/dashboard')
  .get(dashboard.ensureAuthenticated, dashboard.get)
  .put(dashboard.ensureAuthenticated, dashboard.put)
  .delete(dashboard.ensureAuthenticated, dashboard.delete);

app.route('/dashboard/password')
  .put(dashboard.ensureAuthenticated, dashboard.changePassword);

app.route('/signout')
  .get(signin.signout);

module.exports = app;

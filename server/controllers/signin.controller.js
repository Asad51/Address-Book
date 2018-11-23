let passport = require('../config/passport.config');

module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/user/dashboard');
        } else {
            next();
        }
    },

    get: (req, res, next) => {
        res.status(200).send({ "title": "Login to system." });
    },

    authenticate: passport.authenticate('local', { failureRedirect: '/user/signin', failureFlash: true }),

    post: (req, res, next) => {
        //res.redirect('/dashboard');
        res.send("Success");
    },

    signout: (req, res, next) => {
        req.logout();
        req.flash('success_msg', 'You are logged out');
        res.redirect('/user/signin');
    }
}
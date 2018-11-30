let passport = require('../config/passport.config');

module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return res.status(200).send(true);
        } else {
            next();
        }
    },

    authenticate: passport.authenticate('local'),

    post: (req, res, next) => {
        //res.redirect('/dashboard');
        res.status(200).send({ success: "Login successful" });
    },

    signout: (req, res, next) => {
        req.logout();
        req.status(200).send('You are logged out');
    }
}
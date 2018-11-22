let crypto = require('../libs/data.encryption');
let User = require('../models/user.model');
let secretKeys = require('../config/secret.keys');

module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            req.flash('error_msg', 'You are not logged in');
            res.redirect('/user/signin');
        }
    },

    get: function(req, res, next) {
        let userid = req.user.id;
        User.findById(userid, function(err, user) {
            if (err) {
                res.send("Error in finding user.");
            } else {
                if (!user) {
                    req.flash("Can't find user.");
                    res.redirect('/user/signin');
                } else {
                    user.email = crypto.decrypt(user.email, secretKeys.emailKey);
                    user.password = crypto.decrypt(user.password, secretKeys.passwordKey);
                    res.send({ name: user.name, userName: user.userName, email: user.email });
                }
            }
        })
    },

    put: (req, res, next) => {

    },

    delete: (req, res, next) => {
        let userid = req.user.id;
        User.findByIdAndRemove(userid, function(err, user) {
            if (err) {
                res.send("Server Error");
            } else if (!user) {
                res.redirect('/user/signin')
            } else {
                res.send("user deleted");
            }
        });

    }
};
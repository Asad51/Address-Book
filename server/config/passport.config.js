let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

let User = require('../models/user.model');
let crypto = require('../libs/data.encryption');
let secretKeys = require('./secret.keys');

passport.use(new LocalStrategy({ usernameField: "userName", passwordField: "password" },
    function(username, password, done) {
        let userName = crypto.encrypt(username.toLowerCase(), secretKeys.userNameKey, secretKeys.userNameIV);
        User.findOne({ userName: userName })
            .exec()
            .then(function(user) {
                if (!user) {
                    res.send("Incorrect Username");
                } else {
                    user.password = crypto.decrypt(user.password, secretKeys.passwordKey);
                    if (password != user.password) {
                        return done(null, false, { message: 'Incorrect password.' });
                    } else {
                        return done(null, user);
                    }
                }
            })
            .catch((err) => {
                res.status(500).send("Server Error");
            });

    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

let User = require('../models/user.model');
let crypto = require('../libs/data.encryption');
let secretKeys = require('./secret.keys');

passport.use(new LocalStrategy({ usernameField: "userName", passwordField: "password" },
    function(username, password, done) {
        let userName = username.toLocaleLowerCase();
        User.findOne({ userName: userName }, function(err, user) {
            if (err) {
                console.log(err);
                return done(null, false);
            } else if (!user) {
                return done(null, false);
            }

            user.password = crypto.decrypt(user.password, secretKeys.passwordKey);
            if (password != user.password) {
                return done(null, false);
            }
            return done(null, user);
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
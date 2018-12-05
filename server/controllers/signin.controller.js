let passport = require('../config/passport.config');
const jwt = require('jsonwebtoken');
let secretKeys = require('../config/secret.keys');

module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            res.status(200).send({
                "success": "true"
            });
        } else {
            res.status(401).send({
                "error": "false"
            });
        }
    },

    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return res.status(422).send({
                error: "true"
            });
        } else {
            next();
        }
    },

    authenticate: (req, res, next) => {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return res.status(500).send({
                    error: "Server Error"
                });
            }
            if (!user) {
                res.status(401).send({
                    error: "Incorrect Username or Password"
                });
            } else {
                req.login(user, (err) => {
                    if (err) {
                        return res.status(500).send({
                            error: "Server Error"
                        });
                    }
                    const body = {
                        _id: user._id,
                        email: user.email
                    };
                    const token = jwt.sign({
                        user: body
                    }, secretKeys.jwt);
                    res.status(200).send({
                        success: "Login Successful"
                    });
                });
            }
        })(req, res, next);
    },

    post: (req, res, next) => {
        res.status(200).send({
            success: "Login Successful"
        });
    },

    signout: (req, res, next) => {
        req.logout();
        res.status(200).send({ success: 'You are now logged out' });
    }
}
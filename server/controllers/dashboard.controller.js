let crypto = require('../libs/data.encryption');
let User = require('../models/user.model');
let secretKeys = require('../config/secret.keys');
let passport = require('../config/passport.config');

function updateUserProfile(userId, user, res) {
    User.findOneAndUpdate({ _id: userId }, user, (err, result) => {
        if (err) {
            res.status(500).send({ error: "Server Error" });
            console.log(err);
        } else {
            res.status(200).send({ success: "Profile updated successfully" });
        }
    });
}

module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status(401).send({ error: "Your are not logged in." });
        }
    },

    get: function(req, res, next) {
        let userid = req.user.id;
        User.findById(userid, ("name userName email"), function(err, user) {
            if (err) {
                res.status(500).send({ error: "Server Error" });
                console.log(err);
            } else {
                if (!user) {
                    res.status(401).send({ error: 'You are not logged in' });
                } else {
                    user.email = crypto.decrypt(user.email, secretKeys.emailKey);
                    res.status(200).send(user);
                }
            }
        })
    },


    put: (req, res, next) => {
        if (Object.keys(req.body).length != 3) {
            res.status(422).send({ error: "Invalid format" });
        } else {
            let userId = req.user.id;
            let name = req.body.name;
            let userName = req.body.userName;
            let email = req.body.email;

            let updatedUser = {
                name: name,
                userName: userName.toLowerCase(),
                email: crypto.encrypt(email.toLowerCase(), secretKeys.emailKey, secretKeys.emailIV)
            }

            if (updatedUser.userName == req.user.userName && updatedUser.email == req.user.email) {
                updateUserProfile(userId, updatedUser, res);
            } else if (updatedUser.userName == req.user.userName && updatedUser.email != req.user.email) {
                User.findOne({ email: updatedUser.email }, (err, user) => {
                    if (err) {
                        res.status(500).send({ error: "Server Error" });
                        console.log(err);
                    } else if (user) {
                        res.status(422).send({ error: "Email is Already exist" });
                    } else {
                        updateUserProfile(userId, updatedUser, res);
                    }
                });
            } else if (updatedUser.userName != req.user.userName && updatedUser.email == req.user.email) {
                User.findOne({ userName: updatedUser.userName }, (err, user) => {
                    if (err) {
                        res.status(500).send({ error: "Server Error" });
                        console.log(err);
                    } else if (user) {
                        res.status(422).send({ error: "Username is Already exist" });
                    } else {
                        updateUserProfile(userId, updatedUser, res);
                    }
                });
            } else {
                User.findOne({ userName: updatedUser.userName }, (err, user) => {
                    if (err) {
                        res.status(500).send({ error: "Server Error" });
                        console.log(err);
                    } else if (user) {
                        res.status(422).send({ error: "Username is Already exist" });
                    } else {
                        User.findOne({ email: updatedUser.email }, (err, user) => {
                            if (err) {
                                res.status(500).send({ error: "Server Error" });
                                console.log(err);
                            } else if (user) {
                                res.status(422).send({ error: "Email is Already exist" });
                            } else {
                                updateUserProfile(userId, updatedUser, res);
                            }
                        });
                    }
                });
            }
        }
    },

    delete: (req, res, next) => {
        let userId = req.user.id;
        User.findOneAndDelete({ _id: userId }, function(err, user) {
            if (err) {
                res.status(500).send({ error: "Server Error" });
            } else if (!user) {
                res.status(401).send({ error: "You are not logged in" });
            } else {
                res.status(200).send({ success: "User deleted" });
            }
        });
    },

    changePassword: (req, res, next) => {
        let userId = req.user.id;
        if (Object.keys(req.body).length != 3) {
            return res.status(422).send({ error: "Invalid Format" });
        }
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;
        let confirmPassword = req.body.confirmPassword;
        User.find({ _id: userId }, (req, res, next) => {
            if (err) {
                res.status(500).send({ error: "Server Error" });
            } else if (!user) {
                res.status(401).send({ error: "You are not logged in" });
            } else {}
        })
    }
};
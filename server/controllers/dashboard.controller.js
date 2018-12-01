let crypto = require('../libs/data.encryption');
let User = require('../models/user.model');
let secretKeys = require('../config/secret.keys');


function updateUserProfile(userId, user, res) {
    User.findOneAndUpdate({ _id: userId }, user, (err, result) => {
        if (err) {
            res.send("Server Error");
            console.log(err);
        } else {
            res.send("Updated user " + result);
        }
    });
}

module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status(401).send("Your are not logged in.");
        }
    },

    get: function(req, res, next) {
        let userid = req.user.id;
        User.findById(userid, ("name userName email"), function(err, user) {
            if (err) {
                res.status(500).send("Server Error");
                console.log(err);
            } else {
                if (!user) {
                    res.status(401).send('You are not logged in');
                } else {
                    user.email = crypto.decrypt(user.email, secretKeys.emailKey);
                    res.status(200).send({ name: user.name, userName: user.userName, email: user.email });
                }
            }
        })
    },

    put: (req, res, next) => {
        if (Object.keys(req.body).length < 1) {
            res.status(422).send("Invalid format");
        } else {
            let userId = req.user.id;
            let name = req.body.name || req.user.name;
            let userName = req.body.userName || req.user.userName;
            let email = req.body.email || crypto.decrypt(req.user.email, secretKeys.emailKey);
            let password = req.body.password || crypto.decrypt(req.user.password, secretKeys.passwordKey);;

            let updatedUser = {
                name: name,
                userName: userName.toLowerCase(),
                email: crypto.encrypt(email.toLowerCase(), secretKeys.emailKey, secretKeys.emailIV),
                password: crypto.encrypt(password, secretKeys.passwordKey)
            }
            if (updatedUser.userName == req.user.userName && updatedUser.email == req.user.email) {
                updateUserProfile(userId, updatedUser, res);
            } else if (updatedUser.userName == req.user.userName && updatedUser.email != req.user.email) {
                User.findOne({ email: updatedUser.email }, (err, user) => {
                    if (err) {
                        res.send("Server Error");
                        console.log(err);
                    } else if (user) {
                        res.send("Email is Already exist");
                    } else {
                        updateUserProfile(userId, updatedUser, res);
                    }
                });
            } else if (updatedUser.userName != req.user.userName && updatedUser.email == req.user.email) {
                User.findOne({ userName: updatedUser.userName }, (err, user) => {
                    if (err) {
                        res.send("Server Error");
                        console.log(err);
                    } else if (user) {
                        res.send("Username is Already exist");
                    } else {
                        updateUserProfile(userId, updatedUser, res);
                    }
                });
            } else {
                User.findOne({ userName: updatedUser.userName }, (err, user) => {
                    if (err) {
                        res.send("Server Error");
                        console.log(err);
                    } else if (user) {
                        res.send("Username is Already exist");
                    } else {
                        User.findOne({ email: updatedUser.email }, (err, user) => {
                            if (err) {
                                res.send("Server Error");
                                console.log(err);
                            } else if (user) {
                                res.send("Email is Already exist");
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
        let userid = req.user.id;
        User.findOneAndDelete({ _id: userId }, function(err, user) {
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
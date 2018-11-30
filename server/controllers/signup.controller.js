let User = require('../models/user.model');
let crypto = require('../libs/data.encryption');
let secretKeys = require('../config/secret.keys');

module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return res.status(200).send(true);
        } else {
            next();
        }
    },

    post: (req, res, next) => {
        if (Object.keys(req.body).length !== 5) {
            res.send("Invalid format");
        } else {
            let name = req.body.name;
            let email = req.body.email;
            let userName = req.body.userName;
            let password = req.body.password;
            let confirmPassword = req.body.confirmPassword;

            // Validation
            req.checkBody('name', 'Name is required').notEmpty();
            req.checkBody('email', 'Email is required').notEmpty();
            req.checkBody('email', 'Email is not valid').isEmail();
            req.checkBody('userName', 'Username is required').notEmpty();
            req.checkBody('password', 'Password is required').notEmpty();
            req.checkBody('confirmPassword', 'Passwords do not match').equals(password);
            let errors = req.validationErrors();

            if (errors) {
                res.send(errors);
            } else {
                email = crypto.encrypt(email.toLowerCase(), secretKeys.emailKey, secretKeys.emailIV);
                password = crypto.encrypt(password, secretKeys.passwordKey);
                userName = userName.toLowerCase();
                User.findOne({ userName: userName }, (err, user) => {
                    if (err) {
                        res.status(500).send("Server Error");
                        console.log(err);
                    } else if (user) {
                        res.status(422).send("Username is exist");
                    } else {
                        User.findOne({ email: email }, (err, user) => {
                            if (err) {
                                res.status(500).send("Server Error");
                                console.log(err);
                            } else if (user) {
                                res.status(422).send("Email is exist");
                            } else {
                                let newUser = new User({
                                    name: name,
                                    userName: userName,
                                    email: email,
                                    password: password
                                });
                                newUser.save(newUser, (err, user) => {
                                    if (err) {
                                        res.status(500).send("Server Error");
                                        console.log(err);
                                    } else {
                                        res.status(201).send({ success: "Registration successful" });
                                    }
                                })
                            }
                        })
                    }
                });

            }
        }
    }
};
let crypto = require('../libs/data.encryption');
let secretKeys = require('../config/secret.keys');
let {
    userController
} = require('../controllers/database.controller');

module.exports = {
    post: async(req, res, next) => {
        if (Object.keys(req.body).length !== 5) {
            res.status(422).send({
                error: "Invalid format"
            });
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
                res.status(422).send(errors);
            } else {
                email = crypto.encrypt(email.toLowerCase(), secretKeys.emailKey, secretKeys.emailIV);
                password = crypto.encrypt(password, secretKeys.passwordKey);
                userName = userName.toLowerCase();

                let user = await userController.findUser({
                    userName: userName
                }, res);
                if (user) {
                    return res.status(422).send({
                        error: "Username is exist"
                    });
                }

                user = await userController.findUser({
                    email: email
                }, res);
                if (user) {
                    return res.status(422).send({
                        error: "Email is exist"
                    });
                }

                let newUser = {
                    name: name,
                    userName: userName,
                    email: email,
                    password: password
                };
                userController.createUser(newUser, res);
            }
        }
    }
};
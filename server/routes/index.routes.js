let app = require('express')();
let User = require('../models/user.model');

app.route('/')
    .get((req, res, next) => {
        User.find({})
            .exec()
            .then((result) => {
                res.status(200).send(result.length.toString());
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send("server Error");
            });
    });

module.exports = app;
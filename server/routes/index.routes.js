let app = require('express')();
let User = require('../models/user.model');

app.route('/')
    .get((req, res, next) => {
        User.find({})
            .exec()
            .then((users) => {
                res.status(200).send({ success: "Total Users " + users.length })
            })
            .catch((err) => {
                res.status(500).send({ error: "Server Error" });
            });
    });

module.exports = app;
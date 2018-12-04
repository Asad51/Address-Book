let Contact = require('../models/contact.model');

module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/user/signin');
        }
    },

    get: (req, res, next) => {
        let userId = req.user.id;
        Contact.find({ userId: userId }, (err, contacts) => {
            if (err) {
                res.send("Server Error");
                console.log(err);
            } else {
                res.send(contacts);
            }
        });
    },

    post: (req, res, next) => {
        let newContact = Contact({
            userId: req.user.id,
            name: req.body.name || "",
            nickName: req.body.nickName || "",
            phone: req.body.phone || [],
            address: req.body.address || null,
            website: req.body.website || "",
            birthDate: req.body.birthDate || null
        });

        newContact.save(newContact, (err, contact) => {
            if (contact) {
                return res.status(200).send({ "success": "Contact added successfully." });
            } else {
                return res.status(500).send("Server Error");
            }
        })
    }
};
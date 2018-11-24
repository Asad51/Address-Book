let Contact = require('../models/contact.model');

module.exports = {
    get: (req, res, next) => {
        let contactId = req.params.contactId;
        Contact.findById(contactId, (err, contact) => {
            if (err) {
                res.status(500).send("Server Error");
            } else if (!contact || contact.userId != req.user.id) {
                res.send("No contacts found");
            } else {
                res.send(contact);
            }
        });
    },

    put: (req, res, next) => {
        let contactId = req.params.contactId;
        Contact.findById(contactId, (err, contact) => {
            if (err) {
                res.status(500).send("Server Error");
                console.log(err);
            } else if (!contact || contact.userId != req.user.id) {
                res.send("No contacts found");
            } else {
                contact.name = req.body.name || contact.name;
                contact.nickName = req.body.nickName || contact.nickName;
                contact.phone.push(req.body.phone);
                contact.address = req.body.address || contact.address;
                contact.website = req.body.website || contact.website;
                contact.birthDate = req.body.birthDate || contact.birthDate;

                Contact.findByIdAndUpdate(contactId, contact, (err, contact) => {
                    if (err) {
                        res.status(500).send("Server Error");
                        console.log(err);
                    } else {
                        res.send("Updated");
                    }
                });
            }
        });
    },

    delete: (req, res, next) => {
        let contactId = req.params.contactId;
        Contact.findById(contactId, (err, contact) => {
            if (err) {
                res.status(500).send("Server Error");
            } else if (!contact || contact.userId != req.user.id) {
                res.send("No contacts found");
            } else {
                Contact.findByIdAndRemove(contactId, (err, contact) => {
                    if (err) {
                        res.status(500).send("Server Error");
                        console.log(err);
                    } else {
                        res.send("Deleted");
                    }
                });
            }
        });
    }
}
let User = require('../models/user.model');
let Contact = require('../models/contact.model');


/***** CRUD Operation User Collection ******/
exports.userController = {
    findUser: async(query, res) => {
        let user = await User.findOne(query, (err, foundUser) => {
            if (err) {
                res.status(500).send({ error: "Server Error" });
                return null;
            } else {
                return foundUser || null;
            }
        });
        return user;
    },

    createUser: (newUser, res) => {
        let newUsr = new User(newUser);
        newUsr.save(newUsr, (err, savedUser) => {
            if (err) {
                res.status(500).send({ error: "Server Error" });
            } else {
                res.status(201).send({ success: "Registration Successful" });
            }
        });
    },

    updateUser: (userId, body, res) => {
        User.updateOne({ _id: userId }, body, { new: true }, (err, updatedUser) => {
            if (err) {
                res.status(500).send({ error: "Server Error" });
            } else {
                res.status(202).send({ success: "User Profile Updated" });
            }
        });
    },

    deleteUser: (userId, res) => {
        User.deleteOne({ _id: userId }, async(err, deletedUser) => {
            if (err) {
                res.status(500).send({ error: "Server Error" });
            } else {
                await deleteAllContactByUserId(userId);
                res.status(200).send({ success: "User Profile Deleted" });
            }
        });
    }
}

/*** ---------------------------------------------- ***/
/******  CRUD Operation on Contact Collection ******/

function deleteAllContactByUserId(userId) {
    Contact.deleteMany({ userId: userId }, (err, users) => {
        if (err) {
            console.log(err);
        }
    });
}

exports.contactController = {
    findContact: async(query, res) => {
        let contact = await Contact.findOne(query, (err, foundContact) => {
            if (err) {
                res.status(500).send({ error: "Server Error" });
                return null;
            } else {
                return foundContact || null;
            }
        });
        return contact;
    },

    createContact: async(newContact, res) => {
        let contact = await newContact.save(newContact, (err, savedContact) => {
            if (err) {
                res.status(500).send({ error: "Server Error" });
                return null;
            } else {
                return savedContact;
            }
        });
        return contact;
    },

    updateContact: async(query, body, res) => {
        let contact = await Contact.updateOne(query, body, { new: true }, (err, updatedContact) => {
            if (err) {
                res.status(500).send({ error: "Server Error" });
                return null;
            } else {
                return savedContact;
            }
        });
        return contact;
    },

    deleteContact: async(userId, res) => {
        let contact = await Contact.deleteOne(query, (err, deletedContact) => {
            if (err) {
                res.status(500).send({ error: "Server Error" });
                return null;
            } else {
                return deletedContact;
            }
        });
        return contact;
    }
}
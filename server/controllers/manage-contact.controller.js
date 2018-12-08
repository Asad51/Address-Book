let {
    contactController
} = require('../controllers/database.controller');

module.exports = {
    get: async(req, res, next) => {
        let contactId = req.params.contactId;
        let contact = await contactController.findContact({ _id: contactId, userId: req.user.id }, res);
        if (contact.length <= 0) {
            return res.status(200).send({ success: "No Contact Found" });
        }
        res.status(200).send(contact);
    },

    put: async(req, res, next) => {
        let contactId = req.params.contactId;
        let contact = await contactController.findContact({ _id: contactId, userId: req.user.id }, res);
        if (contact.length <= 0) {
            return res.status(200).send({ error: "No contact found" });
        }
        contact.name = req.body.name || contact.name;
        contact.nickName = req.body.nickName || contact.nickName;
        contact.email = req.body.email || contact.email;
        contact.phone = req.body.phone || contact.phone;
        contact.address = req.body.address || contact.address;
        contact.website = req.body.website || contact.website;
        contact.birthDate = req.body.birthDate || contact.birthDate;
        contact.imagePath = req.body.imagePath || contact.imagePath;

        contactController.updateContact({ _id: contactId, userId: req.user.id }, contact, res);
    },

    delete: async(req, res, next) => {
        let contactId = req.params.contactId;
        let contact = await contactController.findContact({ _id: contactId, userId: req.user.id }, res);
        if (contact.length <= 0) {
            return res.status(200).send({ error: "No contact found" });
        }
        contactController.deleteContact()
    }
}
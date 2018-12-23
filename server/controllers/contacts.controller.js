let Contact = require('../models/contact.model');
let {
  contactController
} = require('../controllers/database.controller');

module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.clearCookie('x-auth');
      res.status(401).send({
        error: "You are not logged in."
      });
    }
  },

  get: async (req, res, next) => {
    let userId = req.user.id;
    let contacts = await contactController.findContact({
      userId: userId
    }, res);
    if (contacts.length <= 0) {
      return res.status(200).send({
        success: "No Contact found"
      });
    }
    res.status(200).send(contacts);
  },

  post: (req, res, next) => {
    let newContact = Contact({
      userId: req.user.id,
      name: req.body.name || "",
      nickName: req.body.nickName || "",
      email: req.body.email || "",
      phones: req.body.phones || [],
      address: req.body.address || null,
      website: req.body.website || "",
      birthDate: req.body.birthDate || "",
      imagePath: req.body.imagePath || "/assets/images/user-profile.png"
    });
    contactController.createContact(newContact, res);
  }
};

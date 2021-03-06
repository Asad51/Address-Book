let app = require('express')();

let contacts = require('../controllers/contacts.controller');
let manageContact = require('../controllers/manage-contact.controller');
let csvGenerator = require('../controllers/csv-generator');

app.route('/')
    .get(contacts.ensureAuthenticated, contacts.get)
    .post(contacts.ensureAuthenticated, contacts.post);

app.route('/download')
    .get(contacts.ensureAuthenticated, csvGenerator.generateCSV);

app.route('/:contactId')
    .get(contacts.ensureAuthenticated, manageContact.get)
    .put(contacts.ensureAuthenticated, manageContact.put)
    .delete(contacts.ensureAuthenticated, manageContact.delete);

module.exports = app;
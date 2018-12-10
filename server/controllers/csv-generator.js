const json2csv = require('json2csv').parse;
const fs = require('fs');
const path = require('path');

const Contact = require('../models/contact.model');

function generateCSV(req, res, next) {
    let fields = ['_id', 'name', 'nickName', 'phones', 'email', 'address', 'birthDate', 'website'];
    let projections = 'name nickName phones email address birthDate website';
    Contact.find({
        userId: req.user.id
    }, projections, (err, contacts) => {
        if (err) {
            res.status(500).send({
                error: "Server Error"
            });
        } else {
            //return res.send(contacts);
            let csv = json2csv(contacts, {
                fields
            });
            let filePath = `../public/csvFiles/${req.user.id}.contacts.csv`;
            fs.writeFile(path.join(__dirname, filePath), csv, (err) => {
                if (err) {
                    return res.status(500).send({
                        error: "Server Error"
                    })
                }
                res.status(200).download(path.join(__dirname, filePath));
            });
        }
    });

}

module.exports = {
    generateCSV
};
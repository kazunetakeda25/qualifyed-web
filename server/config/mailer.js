var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: "",
    port: 2525,
    secure: false,
    auth: {
        user: '',
        pass: ''
    },

    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});

module.exports = transporter;
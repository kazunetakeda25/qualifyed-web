let plivo = require('plivo');
let client = new plivo.Client('XXXXXXXX', 'XXXXXXXXXX');

function messageSender(to, msg, callback) {
    client.messages.create(
        '919876543210',
        to,
        msg
    ).then(function(message_created) {
        callback(message_created);
    });
}

module.exports = messageSender;
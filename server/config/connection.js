var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'qualifye_career',
    password: 'Career@321!',
    database: 'qualifye_career'

});
conn.connect();
module.exports = conn;
var express = require('express');
var session = require('express-session');
const cookie = require('cookie-parser');
var path = require('path');



const app = express();

var server = require("http").createServer(app);
var io = require("socket.io")(server, {
    upgradeTimeout: 30000
});

app.use(cookie());
app.use(session({
    name: 'qualifyed_session',
    secret: 'qualified_secret',
    resave: false,
    saveUninitialized: false,
}));

app.get('/setSessionData', function(req, res) {
    req.session.checdata = "HELLO WORLD";
	req.session.checdata2 = "HELLO WORLD";
	req.session.checdata3 = "HELLO WORLD";
	req.session.checdata4 = "HELLO WORLD";
	req.session.checdata5 = "HELLO WORLD";
	req.session.checdata6 = "HELLO WORLD";
	req.session.checdata7 = "HELLO WORLD";
    res.send("session set");
});

app.get('/getSessionData', function(req, res) {
    
    res.send(req.session);
});


server.listen(2222, function() {
    console.log("server connect on 8008");
});
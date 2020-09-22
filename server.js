var express = require('express');
var session = require('express-session');
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');
var path = require('path');
var api = require('./server/router/api');
var userapi = require('./server/router/userapi');
var database = require('./server/model/database');
var imager = require('multer-imager');
var cors = require('cors')

const RTCMultiConnectionServer = require('rtcmulticonnection-server');

const BASH_COLORS_HELPER = RTCMultiConnectionServer.BASH_COLORS_HELPER;
const getValuesFromConfigJson = RTCMultiConnectionServer.getValuesFromConfigJson;
const getBashParameters = RTCMultiConnectionServer.getBashParameters;
const jsonPath = {
    config: 'config.json',
    logs: 'logs.json'
};

var config = getValuesFromConfigJson(jsonPath);
config = getBashParameters(config, BASH_COLORS_HELPER);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

var server = require("http").createServer(app);
var io = require("socket.io")(server, {
    upgradeTimeout: 30000
});


const whitelist = ['https://careerqualifyed.com', 'https://careerqualifyed.com/']
const corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.use(cookie());
app.use(session({
    secret: 'qualified',
    resave: false,
    saveUninitialized: false,
}));

app.use(express.static(path.join(__dirname + "/dist/angular")));

app.use("/api", api);
app.use("/userapi", userapi);

var rooms = [];
var username;
var usernames = {};
var to;
var socke;
app.post("/insert", function(req, res) {
    username = req.session.userid;
    to = req.body.chat_id;
    var i = req.body.i
    var data = req.body;
    data.user_login_id = req.session.userid

    data.room = data.chat_id + '-' + data.user_login_id

    database.fetchRoom(data, function(err, data1) {
        if (data1 == undefined || data1 == '') {
            database.createRoom(data, function(err, data2) {
                database.fetchRoom(data, function(err, result) {
                    rooms = result[0].room
                    result[0].i = i;
                    return res.json(result);
                })
            })
        } else {
            to = req.body.chat_id;
            rooms = data1[0].room
            data1[0].i = i;

            return res.json(data1)
        }

    })

})


app.use("*", function(req, res) {
    res.sendFile(path.join(__dirname + "/dist/angular/index.html"));
});

app.use(express.static("public"));



io.sockets.on('connection', function(socket) {
    RTCMultiConnectionServer.addSocket(socket, config);

    socket.on('adduser', function(data) {
        var room = data;
        if (rooms.indexOf(room) != -1) {
            socket.username = username;
            socket.room = room;
            usernames[username] = username;
            socket.join(room);
            socket.emit('check', 'SERVER', 'You are connected. Start chatting');
            socket.broadcast.to(room).emit('check', 'SERVER', username + ' has connected to this room');


        } else {
            socket.emit('check', 'SERVER', 'Please enter valid code.');
        }
    });

    socket.on('sendchat', function(data) {

        var message = {};

        if (typeof data.media === 'number') {
            message.base64 = '';
            message.media = data.media;

        } else {
            message.base64 = data.media;
            message.media = 0;
        }

        message.from = socket.username;
        message.to = data.id;
        message.room = data.room;
        message.msg = data.msg;
        io.sockets.in(data.room).emit('updatechat', socket.username, data.msg, data.media, data.id);
        database.insertChat(message, function(req, res) {
            return res;
        });

    });

    socket.on('startVideoChat', function(data) {
        io.sockets.in(data.room).emit('updatechat', data.id, "GETTING_CALL_REQ", true);
    });

    socket.on('acceptCall', function(data) {
        io.sockets.in(data.room).emit('updatechat', data.id, "ACEEPTED_CALL", true);
    });

    socket.on('rejectCall', function(data) {
        io.sockets.in(data.room).emit('updatechat', data.id, "REJECT_CALL", true);
    });

    // socket.on('disconnect', function() {
    //     console.log("disconnected");
    // });


});




server.listen(2222, function() {
    console.log("server connect on 2222");

});
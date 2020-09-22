var express = require('express');
var router = express.Router();
var database = require('../model/database');
var multer = require('multer');
var path = require('path');
var md5 = require('md5');
var viewProfile = require('../services/view_profile');
var fs = require('fs');

router.post("/getAllSetting", function(req, res) {
    viewProfile.getAllSetting(req.body, function(err, data) {
        if (data == undefined) {
            return res.json({
                status: false
            })
        }
        return res.json(data)
    })
})

router.post("/getConnection", function(req, res) {
    var data = {}
    data = req.body
    data.userid = req.session.userid;
    viewProfile.getConnection(data, function(err, data) {

        return res.json(data);
    })
})
router.post("/connectionCount", function(req, res) {
    var data = req.body
    viewProfile.connectionCount(data, function(err, result) {
        return res.json(result)
    })
})
router.post('/directInterReq', function(req, res) {
    req.body.user_login_id = req.session.userid;
    viewProfile.check(req.body, function(err, data) {
        if (data.length < 1) {
            viewProfile.directInterReq(req.body, function(err, result) {
                return res.json({
                    status: true,
                    msg: "Interview Requst send successfully"
                });
            });
        } else {
            return res.json({
                status: false,
                msg: "Interview request already exist"
            });
        }
    })
});

router.post('/directvideoInterReq', function(req, res) {
    req.body.user_login_id = req.session.userid;
    viewProfile.check(req.body, function(err, data) {
        if (data.length < 1) {
            viewProfile.directvideoInterReq(req.body, function(err, result) {
                return res.json({
                    status: true,
                    msg: "Interview Requst send successfully"
                });
            });
        } else {
            return res.json({
                status: false,
                msg: "Interview request already exist"
            });
        }
    })
});

router.post("/getblock", function(req, res) {
    var data = req.body.userid
    viewProfile.blockData(data, function(err, result) {
        return res.json(result)
    })
})
router.post("/workdaydata_profile", function(req, res) {
    viewProfile.workdaydata(req.body, function(err, data) {
        return res.json(data);
    })
})
module.exports = router;
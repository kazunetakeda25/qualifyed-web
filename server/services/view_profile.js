var conn = require('../config/connection');
var database = new function() {
    this.getAllSetting = function(data, callback) {
        var sql = "SELECT * FROM `users_setting` where  user_login_id = " + data.id + "  "
        conn.query(sql, function(err, result) {
            callback(err, result)
        })
    }

    this.getConnection = function(data, callback) {

        // var sql = "SELECT status FROM `users_connection` where user_login_id="+data.userid+" AND connection_id = "+data.id+"  "
        var sql = "SELECT * FROM `users_connection` where (user_login_id = " + data.userid + " OR connection_id = " + data.userid + ") AND (user_login_id = " + data.id + " OR connection_id = " + data.id + ")   "
        conn.query(sql, function(err, data) {
            callback(err, data)
        })
    }
    this.connectionCount = function(data, callback) {
        //var sql = "SELECT count(connection_id) as count FROM `users_connection` where user_login_id="+data.userid+" "
        var sql = "SELECT count(connection_id) as count FROM `users_connection` where (user_login_id=" + data.userid + " OR connection_id=" + data.userid + ") AND status=1 "
        conn.query(sql, function(err, data) {
            callback(err, data)
        })

    }

    this.check = function(data, callback) {

        var sql = "SELECT * FROM `opportunit_interview_request` where opportunity_id=" + data.oppId + " and user_id=" + data.userid;
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data)
        })

    }

    this.directInterReq = function(data, callback) {
        var insertData = {
            opportunity_id: data.oppId,
            user_id: data.userid,
            request_datetime: data.date_time,
            request_status: 2,
            interview_datetime: data.date_time,
            interview_type: 1
        }
        var insertDataSec = {
            interview_request_id: 0,
            user_id: data.userid,
            business_id: data.user_login_id,
            opportunity_id: data.oppId,
            interview_date: date.date_time,
            parent_id: 0,
            responded_by: data.user_login_id,
            rejection_note: data.comment,
            status: 1,
            interview_type: 1
        }
        var insertSql = "INSERT INTO opportunit_interview_request SET ?";
        var insertSqlSec = "INSERT INTO oppprtunity_interview_logs SET ?";
        conn.query(insertSql, insertData, function(err, res) {
            if (err) {
                console.log(err);
            } else {
                insertDataSec.interview_request_id = res.insertId;
                conn.query(insertSqlSec, insertDataSec, function(err, resp) {
                    if (err) {
                        console.log(err);
                    }
                    callback(err, resp)
                })
            }

        });

    }

    this.directvideoInterReq = function(data, callback) {
        var insertData = {
            opportunity_id: data.oppId,
            user_id: data.userid,
            request_datetime: data.date_time,
            request_status: 2,
            interview_datetime: data.date_time,
            interview_type: 2
        }
        var insertDataSec = {
            interview_request_id: 0,
            user_id: data.userid,
            business_id: data.user_login_id,
            opportunity_id: data.oppId,
            interview_date: date.date_time,
            parent_id: 0,
            responded_by: data.user_login_id,
            rejection_note: data.comment,
            status: 1,
            interview_type: 2
        }
        var insertSql = "INSERT INTO opportunit_interview_request SET ?";
        var insertSqlSec = "INSERT INTO oppprtunity_interview_logs SET ?";
        conn.query(insertSql, insertData, function(err, res) {
            if (err) {
                console.log(err);
            } else {
                insertDataSec.interview_request_id = res.insertId;
                conn.query(insertSqlSec, insertDataSec, function(err, resp) {
                    if (err) {
                        console.log(err);
                    }
                    callback(err, resp)
                })
            }

        });

    }

    this.blockData = function(data, callback) {

        var sql = "SELECT user_login_id, blocked_user_id FROM `users_block` WHERE user_login_id = " + data + " OR  blocked_user_id =" + data
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data)
        })

    }

    this.workdaydata = function(data, callback) {
        conn.query("SELECT * FROM `users_working_hours` WHERE login_id  =" + data.userid, function(err, data) {


            callback(err, data);
        })
    }
}
module.exports = database;
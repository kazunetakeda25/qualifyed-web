var conn = require('../config/connection');
var database = new function() {

    this.fetchNotification = function(data, callback) {
        var query = "select * from users_notification where user_login_id=" + data.userid + " and status != 2 AND notification_type NOT IN (SELECT notification_type FROM `users_notification_setting` where user_login_id = " + data.userid + " AND status = 0) ORDER BY created_date DESC LIMIT " + data.limit
        conn.query(query, false, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data)
        })
    }
    this.getsuggestion = function(data, callback) {
        //var query="select * from users_notification where user_login_id="+data.userid+" and status != 2 ORDER BY created_date DESC limit "+data.limit
        var query = "SELECT u.login_id as user_login_id, u.name as name, u.profile_pic_id as profile_pic_id, fr.name as profile_pic FROM users u LEFT JOIN files_record as fr ON fr.id = u.profile_pic_id where u.login_id IN(SELECT t1.user_login_id as ffid  FROM `users_connection` as t1 WHERE connection_id IN (SELECT user_login_id as fid FROM `users_connection` WHERE connection_id =" + data.userid + " union SELECT connection_id as fid FROM `users_connection` WHERE user_login_id=" + data.userid + ") union SELECT t1.connection_id as ffid  FROM `users_connection` as t1 WHERE user_login_id IN (SELECT user_login_id as fid FROM `users_connection` WHERE connection_id =" + data.userid + " union SELECT connection_id as fid FROM `users_connection` WHERE user_login_id=" + data.userid + ")) AND u.login_id != " + data.userid + "  AND u.login_id NOT IN(SELECT user_login_id as fid FROM `users_connection` WHERE connection_id =" + data.userid + " union SELECT connection_id as fid FROM `users_connection` WHERE user_login_id=" + data.userid + ") UNION SELECT b.loginid as user_login_id, b.name as name, b.profile_pic_id as profile_pic_id, fr.name as profile_pic FROM bussiness_profile b LEFT JOIN files_record as fr ON fr.id = b.profile_pic_id where b.loginid IN(SELECT t1.user_login_id as ffid  FROM `users_connection` as t1 WHERE connection_id IN (SELECT user_login_id as fid FROM `users_connection` WHERE connection_id =" + data.userid + " union SELECT connection_id as fid FROM `users_connection` WHERE user_login_id=" + data.userid + ") union SELECT t1.connection_id as ffid  FROM `users_connection` as t1 WHERE user_login_id IN (SELECT user_login_id as fid FROM `users_connection` WHERE connection_id =" + data.userid + " union SELECT connection_id as fid FROM `users_connection` WHERE user_login_id=" + data.userid + ")) AND b.loginid != " + data.userid + " AND b.loginid NOT IN(SELECT user_login_id as fid FROM `users_connection` WHERE connection_id =" + data.userid + " union SELECT connection_id as fid FROM `users_connection` WHERE user_login_id=" + data.userid + ") limit " + data.limit + ""
            // console.log("sql_suqet-----------------------------",query)
        conn.query(query, false, function(err, data) {
            if (err) {
                console.log(err);
            }
            //  console.log("***********************",data)
            callback(err, data)
        })
    }


    this.getOpportunities = function(data, callback) {

        //console.log("data *1*********",data.skill)
        var skills = data.skill;


        var conditions = "";
        for (var i = 0; i < skills.length; i++) {
            if (conditions == "") {
                conditions += " o.skills_ids like '%" + skills[i] + "%' ";
            } else {
                conditions += " OR o.skills_ids like '%" + skills[i] + "%' ";
            }

        }
        //var query = "SELECT o.id as oportunity_id, o.title, o.user_id, b.name, fr.name as profile_pc FROM `opportunities` as o JOIN bussiness_profile as b ON(b.loginid = o.user_id ) JOIN files_record as fr ON(fr.id = b.profile_pic_id ) where  "+conditions+"  LIMIT "+data.limit+"" 
        var query = "SELECT o.id as oportunity_id, o.title, o.user_id, b.name, fr.name as profile_pc FROM `opportunities` as o JOIN bussiness_profile as b ON(b.loginid = o.user_id ) JOIN files_record as fr ON(fr.id = b.profile_pic_id ) where  (" + conditions + ") AND o.id NOT IN(SELECT opportunity_id FROM opportunit_interview_request where user_id = " + data.userid + " ) LIMIT " + data.limit + "" //console.log("sqlquery**********",query)
        conn.query(query, false, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data)
        })


    }
    this.getOpportunities1 = function(data, callback) {

        var skills = data.skill;


        var conditions = "";
        for (var i = 0; i < skills.length; i++) {
            if (conditions == "") {
                conditions += " o.skills_ids like '%" + skills[i] + "%' ";
            } else {
                conditions += " OR o.skills_ids like '%" + skills[i] + "%' ";
            }

        }
        // var query = "SELECT o.id as oportunity_id, o.title, o.user_id, b.name, fr.name as profile_pc FROM `opportunities` as o JOIN bussiness_profile as b ON(b.loginid = o.user_id ) JOIN files_record as fr ON(fr.id = b.profile_pic_id ) where  "+conditions+" LIMIT "+data.limit+"" 
        var query = "SELECT o.id as oportunity_id, o.title, o.user_id, b.name, fr.name as profile_pc FROM `opportunities` as o JOIN bussiness_profile as b ON(b.loginid = o.user_id ) JOIN files_record as fr ON(fr.id = b.profile_pic_id ) where  (" + conditions + ") AND o.id NOT IN(SELECT opportunity_id FROM opportunit_interview_request where user_id = " + data.userid + " ) LIMIT " + data.limit + "" //console.log("sqlquery**********",query)

        conn.query(query, false, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data)
        })


    }
    this.getOpportunitiesCount = function(data, callback) {

        //console.log("data *1*********",data.skill)
        var skills = data.skill;


        var conditions = "";
        for (var i = 0; i < skills.length; i++) {
            if (conditions == "") {
                conditions += " o.skills_ids like '%" + skills[i] + "%' ";
            } else {
                conditions += " OR o.skills_ids like '%" + skills[i] + "%' ";
            }

        }
        //var query = "SELECT o.id as oportunity_id, o.title, o.user_id, b.name, fr.name as profile_pc FROM `opportunities` as o JOIN bussiness_profile as b ON(b.loginid = o.user_id ) JOIN files_record as fr ON(fr.id = b.profile_pic_id ) where  "+conditions 
        var query = "SELECT o.id as oportunity_id, o.title, o.user_id, b.name, fr.name as profile_pc FROM `opportunities` as o JOIN bussiness_profile as b ON(b.loginid = o.user_id ) JOIN files_record as fr ON(fr.id = b.profile_pic_id ) where  (" + conditions + ") AND o.id NOT IN(SELECT opportunity_id FROM opportunit_interview_request where user_id = " + data.userid + " ) " //console.log("sqlquery**********",query)

        //console.log("sqlquery**********",query)
        conn.query(query, false, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data)
        })


    }
    this.fetchearlierNotification = function(data, callback) {
        var query = "select * from users_notification where user_login_id=" + data.userid + " and status != 2 AND notification_type NOT IN (SELECT notification_type FROM `users_notification_setting` where user_login_id = " + data.userid + " AND status = 0) ORDER BY created_date DESC LIMIT " + data.limit
        conn.query(query, false, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data)
        })
    }

    this.notificationSeen = function(data, callback) {
        var query = "update users_notification SET status =1 where id=" + data.id + " and status = 0"
        conn.query(query, false, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data)
        })
    }


    this.allnotificationCount = function(data, callback) {
        var query = "select Count(count_status) as allnotification_count from users_notification where user_login_id=" + data + " and count_status = 0 and notification_type NOT IN(SELECT notification_type FROM `users_notification_setting` where user_login_id = " + data + " AND status = 0)"
        conn.query(query, false, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data)
        })
    }

    this.deleteNotification = function(data, callback) {
        var query = "update users_notification SET status = 2 where id=" + data.id
        conn.query(query, false, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data)
        })
    }

    this.hideNotification = function(data, callback) {
        var query = "update users_notification_setting SET status = 0 where user_login_id= " + data.userid + " and notification_type = " + data.type + "  "
        conn.query(query, false, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data)
        })
    }

    this.markRead = function(data, callback) {
        var query = "update users_notification SET status = 1 where id = " + data.id
        conn.query(query, false, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data)
        })
    }

    this.getconnectioncountting = function(data, callback) {
        var sql = " SELECT count(id) as total_connections  FROM `users_connection` WHERE ( user_login_id = " + data.id + " OR connection_id = " + data.id + " ) AND status = 1"
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }
    this.suggestioncounting = function(data, callback) {
        var query = "SELECT u.login_id as user_login_id, u.name as name, u.profile_pic_id as profile_pic_id, fr.name as profile_pic FROM users u LEFT JOIN files_record as fr ON fr.id = u.profile_pic_id where u.login_id IN(SELECT t1.user_login_id as ffid  FROM `users_connection` as t1 WHERE connection_id IN (SELECT user_login_id as fid FROM `users_connection` WHERE connection_id =" + data.userid + " union SELECT connection_id as fid FROM `users_connection` WHERE user_login_id=" + data.userid + ") union SELECT t1.connection_id as ffid  FROM `users_connection` as t1 WHERE user_login_id IN (SELECT user_login_id as fid FROM `users_connection` WHERE connection_id =" + data.userid + " union SELECT connection_id as fid FROM `users_connection` WHERE user_login_id=" + data.userid + "))  AND u.login_id NOT IN(SELECT user_login_id as fid FROM `users_connection` WHERE connection_id =" + data.userid + " union SELECT connection_id as fid FROM `users_connection` WHERE user_login_id=" + data.userid + ") UNION SELECT b.loginid as user_login_id, b.name as name, b.profile_pic_id as profile_pic_id, fr.name as profile_pic FROM bussiness_profile b LEFT JOIN files_record as fr ON fr.id = b.profile_pic_id where b.loginid IN(SELECT t1.user_login_id as ffid  FROM `users_connection` as t1 WHERE connection_id IN (SELECT user_login_id as fid FROM `users_connection` WHERE connection_id =" + data.userid + " union SELECT connection_id as fid FROM `users_connection` WHERE user_login_id=" + data.userid + ") union SELECT t1.connection_id as ffid  FROM `users_connection` as t1 WHERE user_login_id IN (SELECT user_login_id as fid FROM `users_connection` WHERE connection_id =" + data.userid + " union SELECT connection_id as fid FROM `users_connection` WHERE user_login_id=" + data.userid + ")) AND b.loginid NOT IN(SELECT user_login_id as fid FROM `users_connection` WHERE connection_id =" + data.userid + " union SELECT connection_id as fid FROM `users_connection` WHERE user_login_id=" + data.userid + ")"
        conn.query(query, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.readallnotification = function(data, callback) {
        var sql = "update users_notification SET status =1 where user_login_id=" + data
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.readallnotification_count = function(data, callback) {
        var sql = "update users_notification SET count_status =1 where user_login_id=" + data
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.getReadStatus = function(data, callback) {
        var sql = "select status from users_notification where user_login_id=" + data + " and status = 0"
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }


    this.getPic = function(data, callback) {
        var sql = "select name as pic_name from files_record where id=" + data.pic_id
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }

            callback(err, data);
        })
    }
}

module.exports = database;
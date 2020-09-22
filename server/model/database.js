var conn = require('../config/connection');


var database = new function() {
    this.fetch = function(data, callback) {

        conn.query("select id,email,name,password,type,status from user_login where email='" + data.email + "' and password='" + data.password + "' and status != 3", function(err, data) {

            callback(err, data)
        })
    }



    this.get_emailid = function(data, callback) {

        conn.query("select email from user_login where email='" + data.email + "'", function(err, data) {
            callback(err, data)
        })
    }

    this.checkSession = function(data, callback) {
        var selectQuery = "SELECT * FROM user_login_log WHERE user_login_id = " + data.id + " and ip_address = '" + data.ip + "'";
        conn.query(selectQuery, function(err, res) {
            if (err) {
                console.log(err);
            }
            if (res.length > 0) {
                callback(err, {
                    status: true
                });
            } else {
                callback(err, {
                    status: false
                });
            }
        });
    }

    this.chatAttach = function(data, callback) {
        var InsertQue = "INSERT INTO files_record SET ?";
        conn.query(InsertQue, data, function(err, res) {
            if (err) {
                console.log(err);
            }
            callback(err, res);
        });
    }



    this.report_on_comment = function(data, callback) {
        var query = "INSERT INTO report_abuse SET ? ";
        var insertData = {
            user_login_id: data.userid,
            entity_type: data.entity_type,
            entity_id: data.entity_id,
            comments: data.comments,
            created_date: new Date()
        }
        conn.query(query, insertData, function(err, result) {
            if (err) {
                console.log(err);
            }
            callback(err, result);
        })

    }

    this.getchatRoom = function(data, callback) {
        var sql = "SELECT uc.*,(SELECT count(id) FROM users_chat WHERE room = '" + data.roomid + "' AND is_read = 0 AND message_to = " + data.userid + " ) as unread_count FROM `users_chat` as uc  WHERE uc.room = '" + data.roomid + "' AND uc.status = 1 ORDER BY created_date DESC LIMIT 1"
        console.log(sql);

        conn.query(sql, false, function(err, res) {
            if (err) {
                console.log(err)
            };
            callback(err, res);
        });
    }

    this.markChatReadWhere = function(data, callback) {
        var sql = "UPDATE users_chat SET is_read = 1 WHERE room = '" + data.room_id + "' and message_from = " + data.id;
        conn.query(sql, false, function(err, result) {
            if (err) {
                console.log(err);
            }
            callback(err, result);
        });
    }

    this.setLocation = function(data, callback) {

        var selectQuery = "DELETE FROM user_login_log WHERE user_login_id = " + data.userid + " and ip_address = '" + data.ip + "'";
        var insertData = {
            user_login_id: data.userid,
            ip_address: data.ip,
            latitude: data.lat,
            address: data.address,
            isp: data.isp,
            longitue: data.long
        }
        conn.query(selectQuery, false, function(er, re) {
            if (er) {
                console.log(er);
            }
            var insertSql = "INSERT INTO user_login_log SET ? ";

            conn.query(insertSql, insertData, function(err, resul) {
                if (err) {
                    console.log(err)
                }
                callback(err, resul);
            })
        })
    }

    this.logoutSession = function(data, callback) {
        var selectQuery = "DELETE FROM user_login_log WHERE ip_address = '" + data.ip + "' and user_login_id = " + data.id;
        conn.query(selectQuery, false, function(er, re) {
            if (er) {
                console.log(er);
            }
            callback(er, re);
        })
    }


    this.getSetting = function(data, callback) {
        var query = "SELECT * FROM users_setting WHERE user_login_id = " + data[0].id;
        conn.query(query, false, function(err, result) {
            if (err) {
                console.log(err);
            }
            callback(err, result);
        });
    }

    this.shareFeed = function(data, callback) {
        console.log("hello-------", data)
        var query = "INSERT INTO users_post SET ? ";
        var insertData = {
            user_login_id: data.user_login_id,
            privacy: data.privacy,
            post: data.postName,
            // media_id: '',
            created_date: new Date(),
            comment_count: 0,
            like_count: 0,
            parent_id: data.parentId,
            status: 1
        }
        console.log("hello,dev-------", insertData)
        conn.query(query, insertData, function(err, result) {
            if (err) {
                console.log(err);
            }
            callback(err, result.insertId);
        })

    }

    this.getFeedParent = function(data, callback) {
        //            var sql = "SELECT t1.id as p_id, t1.post as p_post,t4.name as picname,t4.file_type as type ,t1.user_login_id as p_user_login_id, t1.media_id as p_media, t1.created_date p_created, t2.name as p_user_name , t3.name as p_profile FROM `users_post` as t1 LEFT JOIN bussiness_profile as t2 ON t2.loginid = t1.user_login_id LEFT JOIN files_record as t3 ON t3.id = t2.profile_pic_id LEFT JOIN files_record as t4 ON t4.id = t1.media_id WHERE t1.id = "+data.count;            
        var sql = "SELECT t1.id as p_id, t1.post as p_post,t4.name as picname,t4.file_type as type ,t1.user_login_id as p_user_login_id, t1.media_id as p_media, t1.created_date p_created, t2.name as p_user_name , t3.name as p_profile FROM `users_post` as t1 INNER JOIN bussiness_profile as t2 ON t2.loginid = t1.user_login_id LEFT JOIN files_record as t3 ON t3.id = t2.profile_pic_id LEFT JOIN files_record as t4 ON t4.id = t1.media_id WHERE t1.id ='" + data.count + "' UNION SELECT t1.id as p_id, t1.post as p_post,t4.name as picname,t4.file_type as type,t1.user_login_id as p_user_login_id , t1.media_id as p_media, t1.created_date p_created, t2.name as p_user_name , t3.name as p_profile FROM `users_post` as t1 INNER JOIN users as t2 ON t2.login_id = t1.user_login_id LEFT JOIN files_record as t3 ON t3.id = t2.profile_pic_id LEFT JOIN files_record as t4 ON t4.id = t1.media_id WHERE t1.id = " + data.count;
        conn.query(sql, false, function(err, result) {
            if (err) {
                console.log(err);
            }
            callback(err, result);
        })
    }
    this.getFeedParent1 = function(data, callback) {
        //  var sql = "SELECT t1.id as p_id, t1.post as p_post,t4.name as picname,t4.file_type as type , t1.media_id as p_media, t1.created_date p_created, t2.name as p_user_name , t3.name as p_profile FROM `users_post` as t1 LEFT JOIN users as t2 ON t2.login_id = t1.user_login_id LEFT JOIN files_record as t3 ON t3.id = t2.profile_pic_id LEFT JOIN files_record as t4 ON t4.id = t1.media_id WHERE t1.id = "+data.count;            
        var sql = "SELECT t1.id as p_id, t1.post as p_post,t4.name as picname,t4.file_type as type ,t1.user_login_id as p_user_login_id, t1.media_id as p_media, t1.created_date p_created, t2.name as p_user_name , t3.name as p_profile FROM `users_post` as t1 INNER JOIN bussiness_profile as t2 ON t2.loginid = t1.user_login_id LEFT JOIN files_record as t3 ON t3.id = t2.profile_pic_id LEFT JOIN files_record as t4 ON t4.id = t1.media_id WHERE t1.id ='" + data.count + "' UNION SELECT t1.id as p_id, t1.post as p_post,t4.name as picname,t4.file_type as type,t1.user_login_id as p_user_login_id , t1.media_id as p_media, t1.created_date p_created, t2.name as p_user_name , t3.name as p_profile FROM `users_post` as t1 INNER JOIN users as t2 ON t2.login_id = t1.user_login_id LEFT JOIN files_record as t3 ON t3.id = t2.profile_pic_id LEFT JOIN files_record as t4 ON t4.id = t1.media_id WHERE t1.id = " + data.count;

        conn.query(sql, false, function(err, result) {
            if (err) {
                console.log(err);
            }

            callback(err, result);
        })
    }

    this.insertUserlogin = function(data, callback) {
        var date = Date.now() + 3600000 * 24;
        var sql = "insert into user_login SET?"
        var formdata = {
            email: data.email,
            name: data.bussinessname,
            password: data.password,
            type: 1,
            currentdate: new Date(),
            updateDate: new Date(),
            registration_otp: data.hash,
            registration_otp_expiry_date: date
        }

        conn.query(sql, formdata, function(err, result) {
            if (err) {
                console.log(err);
            }
            callback(err, result.insertId);
        })

    }

    this.getCommentCount = function(data, callback) {
        var query = "select COUNT(id) from user_post_comment where entity_id= " + data;
        conn.query(query, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        });
    }
    this.getCountComment = function(data, callback) {
        var query = "select COUNT(id) as count from user_post_comment where entity_id= " + data.id;
        conn.query(query, function(err, data) {
            if (err) {
                console.log(err)
            }

            callback(err, data)
        });
    }

    this.updateData = function(data, callback) {
        conn.query("select * from bussiness_profile where loginid=" + data, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })

    }

    this.Deactivate = function(data, callback) {
        var sql = "update user_login SET? where id=" + data
        var formdata = {
            status: 0

        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })

    }

    this.insertBussinessprofile = function(data, callback) {
        console.log("----===-=-=", data)

        var sql = "insert into bussiness_profile SET?"
        var formdata = {
            loginid: data.loginid,
            name: data.bussinessname,
            addressline1: data.address1,
            addressline2: data.address2,
            phone: data.phone,
            country_id: data.country,
            state_id: data.state,
            city: data.city,
            zipcode: data.zipcode,
            email: data.email,
            work: data.work,
            description: data.description,
            website: data.website,
            companysize: data.companysize,
            location: data.location,
            companytype: data.companytype,
            date: data.date,

        }
        if (data.companysize == '') {
            formdata.companysize = 0
        }
        if (data.companytype == '') {
            formdata.companytype = 0
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data.insertId);
        })
    }

    this.insertSearch = function(data, callback) {
        var sql = "insert into search SET?"
        var formData = {
            entity_id: 3,
            element_id: data.loginid,
            user_login_id: data.loginid,
            is_published: 1,
            title: data.bussinessname,
            email: data.email,
            phone: data.phone,
            country: data.country,
            state: data.state,
            city: data.city,
            about_us: data.description
        }
        conn.query(sql, formData, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }


    this.imgDelete = function(data, callback) {
        var sql = "update files_record SET? where id='" + data.img_id + " and user_login_id=" + data.id + "'";
        var query = "update search SET pic_path = 'avatar.png' where entity_id =1 and user_login_id = " + data.id
        var formdata = {
            name: "avatar.png",
            file_size: '',
            updated_date: new Date()

        }
        conn.query(sql, formdata, function(err, data) {
            conn.query(query, false, function(err, result) {
                if (err) {
                    console.log(err)
                }
                callback(err, data)
            })

        })
    }

    this.videoDelete = function(data, callback) {
        var sql = "update files_record SET? where id='" + data.bio_id + " and user_login_id=" + data.id + "'";
        var formdata = {
            name: "novideo.jpg",
            file_size: '',
            updated_date: new Date()

        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }

    this.docDelete = function(data, callback) {
        var sql = "update files_record SET? where id='" + data.doc_id + " and user_login_id=" + data.id + "'";
        var formdata = {
            name: "nodoc.jpg",
            file_size: '',
            updated_date: new Date()

        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }
    this.checkMail = function(data, callback) {
        conn.query("select email from user_login where email='" + data.email + "'", function(err, data) {

            callback(err, data)
        })
    }
    this.get_email = function(data, callback) {
        conn.query("select email from user_login where id=" + data.userid + "", function(err, data) {
            console.log(data);

            callback(err, data)
        })
    }

    this.fetchName = function(data, callback) {
        conn.query("select name,status from user_login where email='" + data.email + "'", function(err, data) {

            callback(err, data)
        })
    }

    this.checkMail1 = function(data, callback) {
        // console.log("dbemail",JSON.stringify(data))
        var query = "select email from user_login where email='" + data.email_name + "'";
        conn.query(query, function(err, data) {

            callback(err, data)
        })
    }


    this.findData = function(data, callback) {
        conn.query("select * from user_login where id='" + data + "'", function(err, data) {

            callback(err, data)

        })
    }

    this.Country = function(callback) {
        conn.query("select * from master_country where status = 1 ", function(err, result) {
            callback(err, result);
        })
    }

    this.companySize = function(callback) {
        conn.query("select * from master_company_size where status = 1 ", function(err, result) {
            callback(err, result);
        })
    }

    this.companyType = function(callback) {
        conn.query("select * from master_company_type where status = 1 ", function(err, result) {
            callback(err, result);
        })
    }

    this.State = function(data, callback) {
        conn.query("select * from master_state where country_id='" + data + "' and status = 1", function(err, result) {
            callback(err, result);
        })
    }

    this.State1 = function(data, callback) {
        conn.query("select * from master_state where country_id='" + data + "' and status = 1", function(err, result) {
            callback(err, result);
        })
    }

    this.workIndustry = function(callback) {
        conn.query("select * from master_work_industry where status = 1 ", function(err, result) {
            callback(err, result);
        })

    }

    this.updateAbout = function(data, callback) {
        var sql = "update bussiness_profile SET ? where loginid=" + data.id
        formdata = {
            name: data.bussinessname,
            addressline1: data.addressline1,
            addressline2: data.addressline2,
            phone: data.phone,
            country_id: data.country,
            state_id: data.state,
            city: data.city,
            zipcode: data.zipcode,
            work: data.work,
            description: data.bio

        }
        conn.query(sql, formdata, function(err, result) {
            if (err) {
                console.log(err);
            }
            var sql1 = "update search SET ? where element_id=" + data.id
                // console.log("sql is", sql1)
            var formData = {
                title: data.bussinessname,
                phone: data.phone,
                country: data.country,
                state: data.state,
                city: data.city,
                description: data.bio,
            }
            conn.query(sql1, formData, function(err, result1) {
                if (err) {
                    console.log(err);
                }
                var sql2 = "update user_login SET ? where id=" + data.id
                    //console.log("sql is", sql1)
                var formData1 = {
                    name: data.bussinessname
                }
                conn.query(sql2, formData1, function(err, result2) {
                    if (err) {
                        console.log(err);
                    }

                    callback(err, result2)
                })

            })
        })
    }

    this.updateInfo = function(data, callback) {
        var sql = "update bussiness_profile SET ? where loginid=" + data.id
        formdata = {
            website: data.website,
            companysize: data.companysize,
            companytype: data.companytype,
            location: data.location,
            date: data.date


        }
        conn.query(sql, formdata, function(err, result) {
            if (err) {
                console.log(err);
            }

            callback(err, result)
        })
    }



    this.updateCheck = function(data, callback) {
        var sql = "select id,password from user_login where id='" + data.id + "' and password='" + data.oldpassword + "'";
        conn.query(sql, function(err, result) {
            if (err) {
                console.log(err);
            }

            callback(err, result)
        })
    }


    this.updatePass = function(data, callback) {
        var sql = "update user_login SET ? where id='" + data.id + "' and password='" + data.oldpassword + "'"
        formdata = {
            password: data.newpassword


        }
        conn.query(sql, formdata, function(err, result) {
            if (err) {
                console.log(err);
            }

            callback(err, result)
        })
    }


    this.profilePicUpload = function(data, callback) {
        var sql = "insert into files_record SET ?"
        var formdata = {
            name: data.img,
            user_login_id: data.id,
            file_size: data.size,
            file_type: 1,
            status: 1,
            created_date: new Date(),
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err);
            }

            callback(err, data.insertId)
        })
    }

    this.videoUpload = function(data, callback) {
        var sql = "insert into files_record SET ?"
        var formdata = {
            name: data.vname,
            user_login_id: data.id,
            file_size: data.size,
            file_type: 2,
            status: 1,
            created_date: new Date(),
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err);
            }

            callback(err, data.insertId);
        })
    }

    this.updateProfile_pic = function(data, callback) {
        var sql = "update bussiness_profile SET? where loginid='" + data.bussinessid + "'";
        var formdata = {
            profile_pic_id: data.imageId,
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }

    this.updatesearchPic_id = function(data, callback) {
        var sql = "update search SET? where element_id='" + data.bussinessid + "'";
        var formdata = {
            pic_path: data.imageId,
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }


    this.updateProfile_video = function(data, callback) {
        var sql = "update bussiness_profile SET? where loginid=" + data.bussinessid;
        var formdata = {
            bio_video_id: data.videoId,
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }


    this.forgotMail = function(data, callback) {
        conn.query("select email,name,status from user_login where email='" + data.email + "'", function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })

    }


    this.insertHash = function(data, callback) {
        var date = Date.now() + 3600000 * 24;
        var sql = "update user_login SET? where email='" + data.email + "'";
        var formdata = {
            resetpassword_token: data.token,
            reset_password_expiry_date: date
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })

    }

    this.insertHash1 = function(data, callback) {
        var date = Date.now() + 3600000 * 24;
        var sql = "update user_login SET? where email='" + data.email + "'";
        var formdata = {
            registration_otp: data.token,
            registration_otp_expiry_date: date
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })

    }

    this.updateHash = function(data, callback) {

        var date = Date.now() + 3600000 * 24;
        var sql = "update user_login SET? where email='" + data.email + "' and status = 2";
        var formdata = {
            registration_otp: data.account_code,
            registration_otp_expiry_date: date
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }

    this.checkHash = function(data, callback) {
        conn.query("select resetpassword_token from user_login where resetpassword_token='" + data + "'", function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }


    this.checkCode = function(data, callback) {
        conn.query("select id,reset_password_expiry_date  from user_login where resetpassword_token='" + data.code + "'", function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }


    this.updatePassword = function(data, callback) {
        var sql = "update user_login SET? where id='" + data.id + "'";
        var formdata = {
            password: data.password
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }

    this.deleteCode = function(data, callback) {
        var sql = "update user_login SET? where id=" + data.id;
        var formdata = {
            resetpassword_token: '',
            reset_password_expiry_date: ''
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }

    this.resetToken = function(data, callback) {
        var sql = "update user_login SET? where resetpassword_token=" + data.code;
        var formdata = {
            resetpassword_token: '',
            reset_password_expiry_date: ''
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }


    // SELECT members.`first_name` , members.`last_name` , movies.`title`
    // FROM members ,movies
    // WHERE movies.`id` = members.`movie_id`

    this.namedata = function(data, callback) {
        // conn.query("select fname from users where login_id="+data, function(err, data) {
        conn.query("SELECT  t1.*,t2.name as profile_pic_name, t3.name as video_name,t4.name as resume_name,t5.*,t6.name as state_name,t7.name as country_name,t8.type as user_type FROM `users` as t1 LEFT JOIN files_record as t2 ON t2.id = t1.profile_pic_id LEFT JOIN files_record as t3 ON t3.id = t1.bio_video_id LEFT JOIN files_record as t4 ON t4.id = t1.resume_file_id LEFT JOIN users_other_info as t5 ON t5.login_id = t1.login_id LEFT JOIN master_state as t6 ON t6.id = t1.state_id LEFT JOIN master_country as t7 ON t7.id = t1.country_id LEFT JOIN user_login as t8 ON t8.id = t1.login_id   WHERE t1.login_id =" + data.userid, function(err, data) {

            callback(err, data);
        })
    }

    this.educationdata = function(data, callback) {
        // conn.query("select fname from users where login_id="+data, function(err, data) {
        conn.query("SELECT * FROM `users_education` WHERE user_login_id  =" + data.userid, function(err, data) {

            callback(err, data);
        })
    }


    this.skillsdata = function(data, callback) {
        // conn.query("select fname from users where login_id="+data, function(err, data) {
        conn.query("SELECT * FROM `user_skills` WHERE user_login_id  =" + data.userid, function(err, data) {

            callback(err, data);
        })
    }

    this.workdaydata = function(data, callback) {
        // conn.query("select fname from users where login_id="+data, function(err, data) {
        conn.query("SELECT * FROM `users_working_hours` WHERE login_id  =" + data.userid, function(err, data) {


            callback(err, data);
        })
    }
    this.masterhour = function(data, callback) {
        conn.query("SELECT * FROM `master_working_hours` WHERE status=1  ", function(err, data) {

            callback(err, data);
        })
    }
    this.experiencedata = function(data, callback) {
        // conn.query("select fname from users where login_id="+data, function(err, data) {
        conn.query("SELECT * FROM `users_experience` WHERE user_login_id  =" + data.userid, function(err, data) {

            callback(err, data);
        })
    }

    this.workdata = function(data, callback) {
        // conn.query("select fname from users where login_id="+data, function(err, data) {
        conn.query("SELECT * FROM `users_working_hours` WHERE login_id  =" + data.userid, function(err, data) {

            callback(err, data);
        })
    }

    this.namedata1 = function(data, callback) {
        // conn.query("select fname from users where login_id="+data, function(err, data) {
        var query = "SELECT t1.*,t2.name as profile_pic_name, t3.name as video_name,t4.name as industry_name,t5.name as state_name,t6.name as country_name,t8.name as company_type,t9.size as company_size,t10.type as user_type FROM `bussiness_profile` as t1 LEFT JOIN files_record as t2 ON t2.id = t1.profile_pic_id LEFT JOIN files_record as t3 ON t3.id = t1.bio_video_id LEFT JOIN master_work_industry as t4 on t4.id = t1.work LEFT JOIN master_state as t5 ON t5.id = t1.state_id LEFT JOIN master_country as t6 ON t6.id = t1.country_id LEFT JOIN master_company_type as t8 on t8.id = t1.companytype LEFT JOIN master_company_size as t9 on t9.id = t1.companysize LEFT JOIN user_login as t10 ON t10.id = t1.loginid WHERE t1.loginid = " + data.userid;
        conn.query(query, function(err, data) {

            callback(err, data);
        })
    }

    this.postData = function(data, callback) {

        // conn.query("select fname from users where login_id="+data, function(err, data) {
        var q = "SELECT t2.*,t3.name as picname,t4.file_type as type,t5.status as like_status FROM `users_post` as t2 LEFT JOIN files_record as t3 on t3.id=t2.media_id LEFT JOIN files_record as t4 on t4.id=t2.media_id LEFT JOIN users_like as t5 on t5.entity_id = t2.id and t5.user_login_id = " + data.userid + " WHERE t2.user_login_id = " + data.userid + " AND t2.status = 1 ORDER BY t2.created_date DESC";
        conn.query(q, function(err, data) {

            callback(err, data);
        })
    }


    this.getPostWhere = function(data, callback) {
        var sql = "SELECT t2.*,t3.name as picname,t4.file_type as type ,t6.name as pro_name ,t7.name as profile_picture FROM `users_post` as t2 LEFT JOIN files_record as t3 on t3.id=t2.media_id LEFT JOIN files_record as t4 on t4.id=t2.media_id INNER JOIN bussiness_profile as t6 ON t6.loginid  = t2.user_login_id LEFT JOIN files_record as t7 ON t7.id = t6.profile_pic_id WHERE t2.id = " + data.id + " UNION SELECT t2.*,t3.name as picname,t4.file_type as type ,t6.name as pro_name ,t7.name as profile_picture FROM `users_post` as t2 LEFT JOIN files_record as t3 on t3.id=t2.media_id LEFT JOIN files_record as t4 on t4.id=t2.media_id INNER JOIN users as t6 ON t6.login_id  = t2.user_login_id LEFT JOIN files_record as t7 ON t7.id = t6.profile_pic_id WHERE t2.id = " + data.id;
        conn.query(sql, function(err, data) {
            callback(err, data);
        })
    }

    this.getConnectionPost = function(data, callback) {
        var sql = "SELECT CONCAT(user_login_id,',', connection_id) AS ids FROM `users_connection` WHERE STATUS = 1 and (user_login_id = " + data.userid + " OR connection_id = " + data.userid + ")";
        conn.query(sql, function(err, data) {
            callback(err, data);
        })
    }


    this.postData1 = function(data, callback) {

        var query = 'SELECT t1.*,t2.name as picname,t2.file_type as type,t3.status as like_status ,t4.type as user_type FROM `users_post` as t1 LEFT JOIN files_record as t2 on t2.id=t1.media_id LEFT JOIN users_like as t3 on t3.entity_id = t1.id and t3.user_login_id = ' + data.userid + ' LEFT JOIN user_login as t4 on t4.id = t1.user_login_id WHERE t1.user_login_id IN (' + data.ids + ') and t1.status = 1 AND((t1.user_login_id = ' + data.userid + ') OR (t1.privacy !=2)) ORDER BY  t1.created_date DESC  LIMIT ' + data.limit
        conn.query(query, function(err, data) {
            if (err) {
                console.log(err);
            }

            callback(err, data);
        })
    }
    this.postData12 = function(data, callback) {
        // conn.query("select fname from users where login_id="+data, function(err, data) {
        // var query = "SELECT t2.*,t3.name as picname,t5.status as like_status,t4.file_type as type FROM `users_post` as t2  LEFT JOIN files_record as t3 on t3.id=t2.media_id LEFT JOIN files_record as t4 on t4.id=t2.media_id LEFT JOIN users_like as t5 on t5.entity_id = t2.id and t5.user_login_id = " + data.userid + " WHERE t2.user_login_id =" + data.userid + " and t2.status = 1 ORDER BY t2.created_date DESC LIMIT "+data.limit;
        // var query = "SELECT t6.name as profile_picture ,t1.name as user_name,t2.*,t3.name as picname,t5.status as like_status,t4.file_type as type FROM `users_post` as t2  LEFT JOIN files_record as t3 on t3.id=t2.media_id LEFT JOIN files_record as t4 on t4.id=t2.media_id LEFT JOIN users_like as t5 on t5.entity_id = t2.id and t5.user_login_id = "+data.userid+" LEFT JOIN bussiness_profile as t1 ON t1.loginid = t2.user_login_id LEFT JOIN files_record as t6 ON t6.id = t1.profile_pic_id WHERE t2.user_login_id IN ("+data.ids+") and t2.status = 1 ORDER BY t2.created_date"
        ///var query = 'SELECT t1.*,t2.name as picname,t2.file_type as type,t3.status as like_status ,t4.type as user_type FROM `users_post` as t1 LEFT JOIN files_record as t2 on t2.id=t1.media_id LEFT JOIN users_like as t3 on t3.entity_id = t1.id and t3.user_login_id = ' + data.userid + ' LEFT JOIN user_login as t4 on t4.id = t1.user_login_id WHERE t1.user_login_id IN (' + data.ids + ') and t1.status = 1 ORDER BY t1.created_date DESC LIMIT ' + data.limit
        // var query = 'SELECT t1.*,t2.name as picname,t2.file_type as type,t3.status as like_status ,t4.type as user_type FROM `users_post` as t1 LEFT JOIN files_record as t2 on t2.id=t1.media_id LEFT JOIN users_like as t3 on t3.entity_id = t1.id and t3.user_login_id = ' + data.id+ ' LEFT JOIN user_login as t4 on t4.id = t1.user_login_id WHERE t1.user_login_id IN (' + data.ids + ') and t1.status = 1 ORDER BY t1.created_date DESC LIMIT ' + data.limit
        //var query = 'SELECT t1.*,t2.name as picname,t2.file_type as type,t3.status as like_status ,t4.type as user_type FROM `users_post` as t1 LEFT JOIN files_record as t2 on t2.id=t1.media_id LEFT JOIN users_like as t3 on t3.entity_id = t1.id and t3.user_login_id = ' + data.userid + ' LEFT JOIN user_login as t4 on t4.id = t1.user_login_id WHERE t1.user_login_id IN (' + data.ids + ') and t1.status = 1 AND((t1.user_login_id = ' + data.userid + ') OR (t1.privacy !=2)) ORDER BY  t1.created_date DESC  LIMIT ' + data.limit
        //var query = '(SELECT u.name as name, t1.*,t2.name as picname,t2.file_type as type,t3.status as like_status ,t4.type as user_type FROM `users_post` as t1 LEFT JOIN files_record as t2 on t2.id=t1.media_id LEFT JOIN users_like as t3 on t3.entity_id = t1.id and t3.user_login_id = ' + data.id+ ' JOIN user_login as t4 on t4.id = t1.user_login_id JOIN users as u on u.login_id = t1.user_login_id WHERE t1.user_login_id IN (' + data.ids + ') and t1.status = 1 UNION SELECT u.name as name, t1.*,t2.name as picname,t2.file_type as type,t3.status as like_status ,t4.type as user_type FROM `users_post` as t1 LEFT JOIN files_record as t2 on t2.id=t1.media_id LEFT JOIN users_like as t3 on t3.entity_id = t1.id and t3.user_login_id = ' + data.id + ' JOIN user_login as t4 on t4.id = t1.user_login_id JOIN bussiness_profile as u on u.loginid = t1.user_login_id WHERE t1.user_login_id IN (' + data.ids + ') and t1.status = 1) ORDER BY  t1.created_date DESC  LIMIT ' + data.limit
        //var query = 'SELECT * FROM (SELECT u.name as name, t1.*,t2.name as picname,t2.file_type as type,t3.status as like_status ,t4.type as user_type FROM `users_post` as t1 LEFT JOIN files_record as t2 on t2.id=t1.media_id LEFT JOIN users_like as t3 on t3.entity_id = t1.id and t3.user_login_id = ' + data.id+ ' JOIN user_login as t4 on t4.id = t1.user_login_id JOIN users as u on u.login_id = t1.user_login_id WHERE t1.user_login_id IN (' + data.ids + ') and t1.status = 1 UNION SELECT u.name as name, t1.*,t2.name as picname,t2.file_type as type,t3.status as like_status ,t4.type as user_type FROM `users_post` as t1 LEFT JOIN files_record as t2 on t2.id=t1.media_id LEFT JOIN users_like as t3 on t3.entity_id = t1.id and t3.user_login_id = ' + data.id + ' JOIN user_login as t4 on t4.id = t1.user_login_id JOIN bussiness_profile as u on u.loginid = t1.user_login_id WHERE t1.user_login_id IN (' + data.ids + ') and t1.status = 1) AS post ORDER BY created_date DESC LIMIT ' + data.limit
        var query = 'SELECT * FROM (SELECT u.login_id, u.name as name, t1.*,t2.name as picname,t2.file_type as type,t3.status as like_status ,t4.type as user_type FROM `users_post` as t1 LEFT JOIN files_record as t2 on t2.id=t1.media_id LEFT JOIN users_like as t3 on t3.entity_id = t1.id and t3.entity_type = 1  and t3.user_login_id = ' + data.userid + ' JOIN user_login as t4 on t4.id = t1.user_login_id JOIN users as u on u.login_id = t1.user_login_id WHERE t1.user_login_id IN (' + data.id + ') and t1.status = 1  AND t1.privacy !=2 UNION SELECT u.loginid, u.name as name, t1.*,t2.name as picname,t2.file_type as type,t3.status as like_status ,t4.type as user_type FROM `users_post` as t1 LEFT JOIN files_record as t2 on t2.id=t1.media_id LEFT JOIN users_like as t3 on t3.entity_id = t1.id and t3.entity_type = 1  and t3.user_login_id = ' + data.userid + ' JOIN user_login as t4 on t4.id = t1.user_login_id JOIN bussiness_profile as u on u.loginid = t1.user_login_id WHERE t1.user_login_id IN (' + data.id + ') and t1.status = 1  AND t1.privacy !=2) AS post ORDER BY created_date DESC LIMIT ' + data.limit
        conn.query(query, function(err, data) {
            if (err) {
                console.log(err);
            }

            callback(err, data);
        })
    }
    this.getUserBusinessDataId = function(data, callback) {
        if (data.type == 1) {
            var query = "SELECT t1.name as user_name, t2.name as profile_picture,t3.name as first_display, t4.name as country_name , t5.name as state_name FROM bussiness_profile as t1 LEFT JOIN files_record as t2 ON t2.id = t1.profile_pic_id LEFT JOIN master_work_industry as t3 ON t3.id = t1.work LEFT JOIN master_country as t4 ON t4.id = t1.country_id LEFT JOIN master_state as t5 ON t5.id = t1.state_id WHERE t1.loginid = " + data.loginId;
        } else {
            var query = "SELECT t1.name as user_name, t2.name as profile_picture,t3.name as first_display, t4.name as country_name , t5.name as state_name FROM users as t1 LEFT JOIN files_record as t2 ON t2.id = t1.profile_pic_id LEFT JOIN users_other_info as t7 ON t7.login_id = t1.login_id LEFT JOIN master_primary_field_interest as t3 ON t3.id = t7.primary_field_interest_id LEFT JOIN master_country as t4 ON t4.id = t1.country_id LEFT JOIN master_state as t5 ON t5.id = t1.state_id WHERE t1.login_id = " + data.loginId;
        }
        conn.query(query, function(err, data) {
            if (err) {
                console.log(err);
            }

            callback(err, data);
        })

    }

    /*this.insertRegHash=function(data,callback){
       console.log("insertmail database",data.email)
      var date=Date.now() + 3600000*' + data.userid + ';
      console.log("date is",date)
      var sql="update user_login SET? where email='"+data.email+"'";
        var formdata={
             registration_otp :data.token,
              registration_otp_expiry_date :date
      }
      conn.query(sql,formdata,function(err,data){
          if(err){
          console.log(err)
        }
        callback(err,data)
      })
        }*/

    this.checkverifyCode = function(data, callback) {
        conn.query("select registration_otp_expiry_date from user_login where email='" + data.email + "' and registration_otp='" + data.otp + "'", function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }

    this.resetverifyCode = function(data, callback) {
        var sql = "update user_login SET? where email='" + data.email + "'";
        var formdata = {
            status: 1,
            registration_otp: '',
            registration_otp_expiry_date: ''
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }

    this.resetverifyToken = function(data, callback) {
        var sql = "update user_login SET? where email='" + data.email + "'";
        var formdata = {
            registration_otp: '',
            registration_otp_expiry_date: ''
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }

    this.Post = function(data, callback) {
        var sql = "insert into users_post SET?"
        var formdata = {
            user_login_id: data.id,
            privacy: data.privacy,
            post: data.post,
            created_date: new Date(),
            status: 1
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }

    this.fetchImage = function(data, callback) {

        conn.query("select * from files_record where user_login_id=" + data + " and file_type=" + 1, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }

    this.fetchVideo = function(data, callback) {
        conn.query("select * from files_record where user_login_id=" + data + " and file_type=" + 2, function(err, data) {

            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }


    this.fetchDoc = function(data, callback) {
        conn.query("select * from files_record where user_login_id=" + data + " and file_type=" + 3, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }

    this.updateImage = function(data, callback) {
        var sql = "update files_record SET? where id=" + data.id;
        var query = "update search SET pic_path='" + data.imagename + "' where entity_id =1 and user_login_id =" + data.user_login_id
        var formdata = {
            name: data.imagename,
            file_size: data.size,
            updated_date: new Date()
        }

        conn.query(sql, formdata, function(err, data) {
            conn.query(query, false, function(err, result) {
                if (err) {
                    console.log(err)
                }
                callback(err, data)
            })

        })
    }

    this.updateImage1 = function(data, callback) {
        var sql = "update files_record SET? where id=" + data.id;
        var formdata = {
            name: data.imagename,
            file_size: data.size,
            updated_date: new Date()
        }

        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }

    this.updateVideo = function(data, callback) {
        var sql = "update files_record SET ? where id=" + data.id;
        console.log(sql);
        var formdata = {
            name: data.vname,
            file_size: data.size,
            updated_date: new Date()
        }
        console.log(formdata);
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }



    this.insertvideoUpdate = function(data, callback) {
        var sql = "insert into files_record SET? "
        var formdata = {
            name: data.vname,
            user_login_id: data.id,
            file_size: data.size,
            file_type: 2,
            status: 1,
            created_date: new Date(),
        }

        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data.insertId)
        })
    }

    this.insertdocUpdate = function(data, callback) {
        var sql = "insert into files_record SET? "
        var formdata = {
            name: data.vname,
            user_login_id: data.id,
            file_size: data.size,
            file_type: 3,
        }

        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data.insertId)
        })
    }
    this.insertimageUpdate = function(data, callback) {
        var sql = "insert into files_record SET? "
        var query = "update search SET pic_path = '" + data.imagename + "' where entity_id =1 and user_login_id = " + data.id
        var formdata = {
            name: data.imagename,
            user_login_id: data.id,
            file_size: data.size,
            file_type: 1,
            status: 1,
            created_date: new Date(),
        }

        conn.query(sql, formdata, function(err, data) {

            conn.query(query, false, function(err, result) {
                if (err) {
                    console.log(err)
                }
                callback(err, data.insertId)
            })

        })
    }

    this.insertimageUpdate1 = function(data, callback) {
        var sql = "insert into files_record SET? "
            //var query = "update search SET pic_path = '" + data.imagename + "' where entity_id =1 and user_login_id = " + data.id
        var formdata = {
            name: data.imagename,
            user_login_id: data.id,
            file_size: data.size,
            file_type: 1,
            status: 1,
            created_date: new Date(),
        }

        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data.insertId)
        })
    }

    this.updatedocUpdate = function(data, callback) {
        var sql = "update users SET? where login_id='" + data.id + "'";
        var formdata = {
            resume_file_id: data.insertid,
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }

    this.updatevideoUpdate = function(data, callback) {
        var sql = "update bussiness_profile SET? where loginid='" + data.id + "'";
        var formdata = {
            bio_video_id: data.insertid,
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }

    this.updatevideoUpdate1 = function(data, callback) {
        var sql = "update users SET? where login_id='" + data.id + "'";
        var formdata = {
            bio_video_id: data.insertid,
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }


    this.updatevideoUpdate2 = function(data, callback) {
        var sql = "update users SET? where loginid='" + data.id + "'";
        var formdata = {
            resume_file_id: data.insertid,
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }

    this.updateimageUpdate = function(data, callback) {

        var sql = "update bussiness_profile SET? where loginid='" + data.id + "'";
        var formdata = {
            profile_pic_id: data.insertid,
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            var sql1 = "update search SET? where element_id='" + data.id + "'";
            var formdata1 = {
                pic_path: data.insertid,
            }
            conn.query(sql1, formdata1, function(err, data1) {
                if (err) {
                    console.log(err)
                }
                callback(err, data1)
            })
        })
    }

    this.updateimageUpdate1 = function(data, callback) {
        var sql = "update users SET? where login_id='" + data.id + "'";
        var query = "update search SET? pic_path=" + data.insertid + " where element_id =" + data.id
        var formdata = {
            profile_pic_id: data.insertid,
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            conn.query(query, function(err, data) {
                if (err) {
                    console.log(err)
                }
                callback(err, data)
            })
        })
    }

    this.updateDoc = function(data, callback) {
        var sql = "update files_record SET ? where id = " + data.id;
        var formdata = {
            name: data.vname,
            file_size: data.size,
            updated_date: new Date()
        }

        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data.insertid)
        })
    }

    this.checkBlock = function(data, callback) {
        var sql = "SELECT CONCAT (user_login_id,',', blocked_user_id) as ids FROM `users_block` WHERE user_login_id = " + data.userid + " OR  blocked_user_id =" + data.userid
        conn.query(sql, false, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }

    this.userdata = function(data, callback) {
        // var sql="select t1.*,t2.name as work_industry,t3.name as company_type from `bussiness_profile` as t1 LEFT JOIN master_work_industry as t2 on t2.id=t1.work LEFT JOIN master_company_type as t3 on t3.id=t1.companytype"
        //var sql = "select t1.name,t1.loginid as id,t2.name as work_industry,t3.name as company_type, t4.size as companysize, t5.name as profile_pic,t6.status from `bussiness_profile` as t1 LEFT JOIN master_work_industry as t2 on t2.id=t1.work LEFT JOIN master_company_type as t3 on t3.id=t1.companytype LEFT JOIN master_company_size as t4 ON t4.id = t1.companysize LEFT JOIN files_record as t5 ON t5.id = t1.profile_pic_id LEFT JOIN user_login as t6 ON t6.id = t1.loginid where (t1.name like '%" + data.country_id + "%' OR t1.city like '%" + data.country_id + "%' OR t2.name like '%" + data.country_id + "%' OR t3.name like '%" + data.country_id + "%') and t6.status = 1 LIMIT 0 , 5"
        if (data.blockedIds != '') {
            if (data.type == 1) {
                var sql = "SELECT t1.*,t2.name FROM `search` AS t1 LEFT JOIN files_record AS t2 ON t2.id =t1.pic_path WHERE (t1.title LIKE '%" + data.string + "%' OR t1.title LIKE '%" + data.string + "%' OR t1.skills like '%" + data.string + "%' OR t1.skills LIKE '%" + data.string + "%')  AND t1.user_login_id NOT IN(" + data.blockedIds + ")  limit 0,5 "
            } else if (data.type == 2) {
                var sql = "SELECT t1.*,t2.name FROM `search` AS t1 LEFT JOIN files_record AS t2 ON t2.id =t1.pic_path WHERE (t1.title LIKE '%" + data.string + "%' OR t1.title LIKE '%" + data.string + "%' OR t1.skills like '%" + data.string + "%' OR t1.skills LIKE '%" + data.string + "%') AND t1.entity_id =1 AND t1.user_login_id NOT IN(" + data.blockedIds + ") limit 0,5 "
            } else if (data.type == 3) {
                var sql = "SELECT t1.*,t2.name FROM `search` AS t1 LEFT JOIN files_record AS t2 ON t2.id =t1.pic_path WHERE (t1.title LIKE '%" + data.string + "%' OR t1.title LIKE '%" + data.string + "%' OR t1.skills like '%" + data.string + "%' OR t1.skills LIKE '%" + data.string + "%') AND t1.entity_id =2 AND t1.user_login_id NOT IN(" + data.blockedIds + ") limit 0,5 "
            } else if (data.type == 4) {
                var sql = "SELECT t1.*,t2.name FROM `search` AS t1 LEFT JOIN files_record AS t2 ON t2.id =t1.pic_path WHERE (t1.title LIKE '%" + data.string + "%' OR t1.title LIKE '%" + data.string + "%' OR t1.skills like '%" + data.string + "%' OR t1.skills LIKE '%" + data.string + "%') AND t1.entity_id =3 AND t1.user_login_id NOT IN(" + data.blockedIds + ") limit 0,5 "
            }
        } else {
            if (data.type == 1) {
                var sql = "SELECT t1.*,t2.name FROM `search` AS t1 LEFT JOIN files_record AS t2 ON t2.id =t1.pic_path WHERE (t1.title LIKE '%" + data.string + "%' OR t1.title LIKE '%" + data.string + "%' OR t1.skills like '%" + data.string + "%' OR t1.skills LIKE '%" + data.string + "%')   limit 0,5 "
            } else if (data.type == 2) {
                var sql = "SELECT t1.*,t2.name FROM `search` AS t1 LEFT JOIN files_record AS t2 ON t2.id =t1.pic_path WHERE (t1.title LIKE '%" + data.string + "%' OR t1.title LIKE '%" + data.string + "%' OR t1.skills like '%" + data.string + "%' OR t1.skills LIKE '%" + data.string + "%') AND t1.entity_id =1 limit 0,5 "
            } else if (data.type == 3) {
                var sql = "SELECT t1.*,t2.name FROM `search` AS t1 LEFT JOIN files_record AS t2 ON t2.id =t1.pic_path WHERE (t1.title LIKE '%" + data.string + "%' OR t1.title LIKE '%" + data.string + "%' OR t1.skills like '%" + data.string + "%' OR t1.skills LIKE '%" + data.string + "%') AND t1.entity_id =2 limit 0,5 "
            } else if (data.type == 4) {
                var sql = "SELECT t1.*,t2.name FROM `search` AS t1 LEFT JOIN files_record AS t2 ON t2.id =t1.pic_path WHERE (t1.title LIKE '%" + data.string + "%' OR t1.title LIKE '%" + data.string + "%' OR t1.skills like '%" + data.string + "%' OR t1.skills LIKE '%" + data.string + "%') AND t1.entity_id =3 limit 0,5 "
            }
        }
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.fetchsearchresult = function(data, callback) {
        // var sql="select t1.*,t2.name as work_industry,t3.name as company_type from `bussiness_profile` as t1 LEFT JOIN master_work_industry as t2 on t2.id=t1.work LEFT JOIN master_company_type as t3 on t3.id=t1.companytype"
        //var sql = "select t1.name,t1.loginid as id,t2.name as work_industry,t3.name as company_type, t4.size as companysize, t5.name as profile_pic,t6.status from `bussiness_profile` as t1 LEFT JOIN master_work_industry as t2 on t2.id=t1.work LEFT JOIN master_company_type as t3 on t3.id=t1.companytype LEFT JOIN master_company_size as t4 ON t4.id = t1.companysize LEFT JOIN files_record as t5 ON t5.id = t1.profile_pic_id LEFT JOIN user_login as t6 ON t6.id = t1.loginid where (t1.name like '%" + data.country_id + "%' OR t1.city like '%" + data.country_id + "%' OR t2.name like '%" + data.country_id + "%' OR t3.name like '%" + data.country_id + "%') and t6.status = 1 LIMIT 0 , 5"
        if (data.blockedIds != '') {
            if (data.type == 1) {
                var sql = "SELECT t1.*,t2.name FROM `search` AS t1 LEFT JOIN files_record AS t2 ON t2.id =t1.pic_path WHERE (t1.title LIKE '%" + data.keyword + "%' OR t1.title LIKE '%" + data.keyword + "%' OR t1.skills like '%" + data.keyword + "%' OR t1.skills LIKE '%" + data.keyword + "%') AND t1.user_login_id NOT IN(" + data.blockedIds + ") limit  " + data.limit
            } else if (data.type == 2) {
                var sql = "SELECT t1.*,t2.name FROM `search` AS t1 LEFT JOIN files_record AS t2 ON t2.id =t1.pic_path WHERE (t1.title LIKE '%" + data.keyword + "%' OR t1.title LIKE '%" + data.keyword + "%' OR t1.skills like '%" + data.keyword + "%' OR t1.skills LIKE '%" + data.keyword + "%') AND t1.entity_id =1 AND t1.user_login_id NOT IN(" + data.blockedIds + ") limit " + data.limit
            } else if (data.type == 3) {
                var sql = "SELECT t1.*,t2.name FROM `search` AS t1 LEFT JOIN files_record AS t2 ON t2.id =t1.pic_path WHERE (t1.title LIKE '%" + data.keyword + "%' OR t1.title LIKE '%" + data.keyword + "%' OR t1.skills like '%" + data.keyword + "%' OR t1.skills LIKE '%" + data.keyword + "%') AND t1.entity_id =2 AND t1.user_login_id NOT IN(" + data.blockedIds + ") limit " + data.limit
            } else if (data.type == 4) {
                var sql = "SELECT t1.*,t2.name FROM `search` AS t1 LEFT JOIN files_record AS t2 ON t2.id =t1.pic_path WHERE (t1.title LIKE '%" + data.keyword + "%' OR t1.title LIKE '%" + data.keyword + "%' OR t1.skills like '%" + data.keyword + "%' OR t1.skills LIKE '%" + data.keyword + "%') AND t1.entity_id =3 AND t1.user_login_id NOT IN(" + data.blockedIds + ") limit " + data.limit
            }
        } else {
            if (data.type == 1) {
                var sql = "SELECT t1.*,t2.name FROM `search` AS t1 LEFT JOIN files_record AS t2 ON t2.id =t1.pic_path WHERE (t1.title LIKE '%" + data.keyword + "%' OR t1.title LIKE '%" + data.keyword + "%' OR t1.skills like '%" + data.keyword + "%' OR t1.skills LIKE '%" + data.keyword + "%') limit  " + data.limit
            } else if (data.type == 2) {
                var sql = "SELECT t1.*,t2.name FROM `search` AS t1 LEFT JOIN files_record AS t2 ON t2.id =t1.pic_path WHERE (t1.title LIKE '%" + data.keyword + "%' OR t1.title LIKE '%" + data.keyword + "%' OR t1.skills like '%" + data.keyword + "%' OR t1.skills LIKE '%" + data.keyword + "%') AND t1.entity_id =1  limit " + data.limit
            } else if (data.type == 3) {
                var sql = "SELECT t1.*,t2.name FROM `search` AS t1 LEFT JOIN files_record AS t2 ON t2.id =t1.pic_path WHERE (t1.title LIKE '%" + data.keyword + "%' OR t1.title LIKE '%" + data.keyword + "%' OR t1.skills like '%" + data.keyword + "%' OR t1.skills LIKE '%" + data.keyword + "%') AND t1.entity_id =2  limit " + data.limit
            } else if (data.type == 4) {
                var sql = "SELECT t1.*,t2.name FROM `search` AS t1 LEFT JOIN files_record AS t2 ON t2.id =t1.pic_path WHERE (t1.title LIKE '%" + data.keyword + "%' OR t1.title LIKE '%" + data.keyword + "%' OR t1.skills like '%" + data.keyword + "%' OR t1.skills LIKE '%" + data.keyword + "%') AND t1.entity_id =3  limit " + data.limit
            }

        }
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.fetchsearchcount = function(data, callback) {
        var sql = "SELECT Count(id) as total_count  FROM `search`   WHERE title LIKE '%" + data.keyword + "%' OR title LIKE '%" + data.keyword + "%' OR skills like '%" + data.keyword + "%' OR skills LIKE '%" + data.keyword + "%' "
        conn.query(sql, false, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.messageSearchdata = function(data, callback) {


        var sql = "SELECT * FROM (SELECT u.login_id as user_login_id, u.name as name, u.profile_pic_id as profile_pic_id, fr.name as profile_pic FROM users u LEFT JOIN files_record as fr ON fr.id = u.profile_pic_id where u.login_id IN(SELECT user_login_id as fid FROM `users_connection` WHERE user_login_id =" + data.userid + " OR connection_id = " + data.userid + " AND status =1 union SELECT connection_id as fid FROM `users_connection` WHERE user_login_id =" + data.userid + " OR connection_id = " + data.userid + " AND status =1)  AND u.login_id !=" + data.userid + " UNION SELECT b.loginid as user_login_id, b.name as name, b.profile_pic_id as profile_pic_id, fr.name as profile_pic FROM bussiness_profile b LEFT JOIN files_record as fr ON fr.id = b.profile_pic_id where b.loginid IN(SELECT user_login_id as fid FROM `users_connection` WHERE user_login_id =" + data.userid + " OR connection_id = " + data.userid + " AND status =1 union SELECT connection_id as fid FROM `users_connection` WHERE user_login_id =" + data.userid + " OR connection_id = " + data.userid + " AND status =1)   AND b.loginid !=" + data.userid + " ) as friend_list WHERE name LIKE '%" + data.string + "%'"

        conn.query(sql, false, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.postImage = function(data, callback) {


        var sql = "insert into files_record SET?"
        var formData = {

            // login_id: data.login_id,
            user_login_id: data.id,
            name: data.originalname,
            file_type: 1,
            file_size: data.size,
            created_date: new Date(),

        }

        conn.query(sql, formData, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data.insertId);
        })
    }


    this.postVideo = function(data, callback) {


        var sql = "insert into files_record SET?"
        var formData = {

            user_login_id: data.id,
            name: data.originalname,
            file_type: 2,
            file_size: data.size,
            created_date: new Date()

        }

        conn.query(sql, formData, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data.insertId);
        })
    }

    this.postDoc = function(data, callback) {


        var sql = "insert into files_record SET?"
        var formData = {

            user_login_id: data.id,
            name: data.originalname,
            file_type: 3,
            file_size: data.size,
            created_date: new Date()

        }

        conn.query(sql, formData, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data.insertId);
        })
    }

    this.createPost = function(data, callback) {
        // console.log("data"+JSON.stringify(data));

        // console.log("data"+ data);
        var sql = "insert into users_post SET?"
        var formdata = {
            user_login_id: data.id,
            privacy: data.privacy,
            post: data.postName,
            created_date: new Date(),
            status: 1

        }
        console.log("formdatapoat", formdata)
        console.log("sqlpost", sql)
        conn.query(sql, formdata, function(err, result) {
            if (err) {
                console.log(err);
            }
            callback(err, result.insertId);
        })

    }

    this.updateFormPost = function(data, callback) {

        var sql = "update  users_post SET? where id='" + data.id + "'";
        var aboutYou = {

                media_id: data.post_id,

            }
            // console.log(aboutYou);
        conn.query(sql, aboutYou, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.checkLike = function(data, callback) {
        var sql = "SELECT * FROM `users_like` WHERE user_login_id =" + data.userid + " and entity_id =" + data.post_id;

        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }


    this.insertLike = function(data, callback) {

        var sql = "insert into users_like SET?"
        var formdata = {
                user_login_id: data.userid,
                entity_type: 1,
                status: 1,
                entity_id: data.post_id,
                created_date: new Date()
            }
            //console.log("insertLike form",formdata)
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }
    this.insertLikeComments = function(data, callback) {
        //console.log("insertLike",data)

        var sql = "insert into users_like SET?"
        var formdata = {
            user_login_id: data.userid,
            entity_type: 4,
            status: 1,
            entity_id: data.post_id,
            created_date: new Date()
        }

        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.unLike = function(data, callback) {
        //console.log("unlike",data)
        var sql = "update users_like SET ? where entity_id=" + data[0].entity_id + " and status=" + data[0].status + " and user_login_id = " + data[0].user_login_id;
        var formdata = {
            status: 0
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.Like = function(data, callback) {

        var sql = "update users_like SET ? where entity_id=" + data[0].entity_id + " and status=" + data[0].status + " and user_login_id = " + data[0].user_login_id;
        var formdata = {
            status: 1
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }
    this.getLikeStatus = function(data, callback) {
        var sql = "SELECT * FROM `users_like` WHERE user_login_id=" + data.userid + " AND entity_id=150 "
            // console.log("sql----",sql)
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }
    this.Count = function(data, callback) {
        var sql = "SELECT count(entity_id) as count ,entity_id FROM users_like WHERE entity_id =" + data[0].entity_id + " and status = 1"
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }
    this.Count_comment = function(data, callback) {
        var sql = "SELECT count(entity_id) as count ,entity_id FROM users_like WHERE entity_id =" + data[0].entity_id + " and status = 1"
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.Count_comment_post = function(data, callback) {
        var sql = "SELECT count(entity_id) as count ,entity_id FROM user_post_comment WHERE entity_id =" + data[0].entity_id + " and status = 1"
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }
    this.getCommentAll = function(data, callback) {
        var sql = "SELECT * FROM ((SELECT user_post_comment.id as comment_id,user_post_comment.user_login_id,user_post_comment.entity_id,user_post_comment.comment,user_post_comment.created_date as comment_date ,bussiness_profile.name as user_name,fr.name as profile_pic_name FROM `user_post_comment` INNER JOIN bussiness_profile ON bussiness_profile.loginid = user_post_comment.user_login_id LEFT JOIN files_record as fr ON fr.id = bussiness_profile.profile_pic_id WHERE user_post_comment.entity_id = " + data.id + ") UNION (SELECT user_post_comment.id as comment_id,user_post_comment.entity_id,user_post_comment.user_login_id,user_post_comment.comment,user_post_comment.created_date as comment_date ,users.name as user_name, fl.name as profile_pic_name FROM `user_post_comment` INNER JOIN users ON users.login_id = user_post_comment.user_login_id LEFT JOIN files_record as fl ON fl.id = users.profile_pic_id WHERE user_post_comment.entity_id = " + data.id + ")) t_union ORDER BY comment_date DESC LIMIT 0,5 "
            //console.log("com sql",sql)
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);

            }
            console.log("commentOndatabase", data)
            callback(err, data)
        })
    }


    this.getConnectStatus = function(data, callback) {
        //var sql = "SELECT `status` FROM `users_connection` WHERE user_login_id =" + data.id + " AND connection_id =" + data.con_id + ""
        // var sql = "SELECT * FROM `users_connection` WHERE (user_login_id =" + data.id + "  OR connection_id =" + data.id + ") AND (user_login_id =" + data.con_id + "  OR  connection_id=" + data.con_id + ")"
        // console.log("sqlsqlsqlsql", sql)
        var sql = "SELECT * FROM users_connection WHERE (connection_id = " + data.id + " and user_login_id = " + data.con_id + ") OR (connection_id = " + data.con_id + " and user_login_id = " + data.id + ") ORDER BY id DESC LIMIT 0,1  "

        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err)
            }
            console.log("testunder", data)
            callback(err, data)
        })

    }
    this.unfriend = function(data, callback) {
        //var sql = "UPDATE `users_connection` SET ? WHERE user_login_id =" + data.id + " AND connection_id =" + data.con_id + " "
        var sql = "UPDATE `users_connection` SET ?  WHERE (user_login_id =" + data.id + "  OR connection_id =" + data.id + ") AND (user_login_id =" + data.con_id + "  OR  connection_id=" + data.con_id + ") "
        var formdata = {
            status: 4
        }
        conn.query(sql, formdata, function(err, data) {
            callback(err, data)
        })
    }

    this.newCount = function(data, callback) {
        //  console.log("newcount",data)
        var sql = "SELECT count(entity_id) as count,entity_id FROM `users_like` WHERE entity_id =" + data.post_id

        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.fetchLike = function(data, callback) {
        // console.log("count",data)
        var sql = "SELECT entity_id,status FROM `users_like` WHERE user_login_id=" + data;

        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.insertComment = function(data, callback) {

        var sql = "insert into user_post_comment SET?"
        var formdata = {
            user_login_id: data.userid,
            entity_type: 1,
            entity_id: data.id,
            comment: data.comment,
            status: 1,
            created_date: new Date()
        }
        conn.query(sql, formdata, function(err, result) {

            var sql1 = "select Count(id) as total from user_post_comment where entity_id='" + data.id + "'"
            conn.query(sql1, formdata, function(err, data) {
                if (err) {
                    console.log(err);
                }
                callback(err, data);

            })

        })

    }

    this.insertCommentUser = function(data, callback) {
        var sql = "insert into user_post_comment SET?"
        var formdata = {
            user_login_id: data.userid,
            entity_type: 1,
            entity_id: data.id,
            comment: data.comment,
            status: 1,
            created_date: new Date()
        }
        conn.query(sql, formdata, function(err, result) {

            var sql1 = "select Count(id) as total from user_post_comment where entity_id='" + data.id + "'"
            conn.query(sql1, formdata, function(err, data) {
                if (err) {
                    console.log(err);
                }
                callback(err, data);

            })

        })

    }


    this.fetchbussinessView = function(data, callback) {
        //console.log(data)
        var sql = "SELECT t1.*,t2.name as profile_pic_name, t3.name as video_name,t4.name as industry_name,t5.name as state_name,t6.name as country_name,t8.name as company_type,t9.size as company_size,t10.type as user_type FROM `bussiness_profile` as t1 LEFT JOIN files_record as t2 ON t2.id = t1.profile_pic_id LEFT JOIN files_record as t3 ON t3.id = t1.bio_video_id LEFT JOIN master_work_industry as t4 on t4.id = t1.work LEFT JOIN master_state as t5 ON t5.id = t1.state_id LEFT JOIN master_country as t6 ON t6.id = t1.country_id LEFT JOIN master_company_type as t8 on t8.id = t1.companytype LEFT JOIN master_company_size as t9 on t9.id = t1.companysize LEFT JOIN user_login as t10 ON t10.id = t1.loginid WHERE t1.loginid=" + data.id
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }
    this.insertConnection = function(data, callback) {

        var sql = "insert into users_connection SET?"



        var formdata = {
            user_login_id: data.userid,
            connection_id: data.connection_id,
            created_date: new Date(),
            responed_by: null
        }
        conn.query(sql, formdata, function(err, result) {
            if (err) {
                console.log(err);
            }
            var sql1 = "insert into users_notification SET?"
            var formdata1 = {
                user_login_id: data.connection_id,
                notification_type: 1,
                message: data.message,
                created_date: new Date()
            }
            conn.query(sql1, formdata1, function(err, result1) {
                if (err) {
                    console.log(err);
                }
                callback(err, result.insertId);
            })
        })
    }

    this.fetchuserView = function(data, callback) {

        var sql = "SELECT t1.*,t2.name as profile_pic_name, t3.name as video_name,t4.name as resume_name,t5.*,t6.name as state_name,t7.name as country_name,t8.type as user_type FROM `users` as t1 LEFT JOIN files_record as t2 ON t2.id = t1.profile_pic_id LEFT JOIN files_record as t3 ON t3.id = t1.bio_video_id LEFT JOIN files_record as t4 ON t4.id = t1.resume_file_id LEFT JOIN users_other_info as t5 ON t5.login_id = t1.login_id LEFT JOIN master_state as t6 ON t6.id = t1.state_id LEFT JOIN master_country as t7 ON t7.id = t1.country_id LEFT JOIN user_login as t8 ON t8.id = t1.login_id WHERE t1.login_id=" + data.id
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.fetchbussinesspost = function(data, callback) {

        // conn.query("select fname from users where login_id="+data, function(err, data) {
        var que = "SELECT t2.*,t3.name as picname,t4.file_type as type FROM `users_post` as t2  LEFT JOIN files_record as t3 on t3.id=t2.media_id LEFT JOIN files_record as t4 on t4.id=t2.media_id WHERE t2.user_login_id =" + data.id + " and t2.privacy = 1 ORDER BY t2.created_date DESC";
        var q = "SELECT t2.*,t3.name as picname,t4.file_type as type,t5.status as like_status FROM `users_post` as t2 LEFT JOIN files_record as t3 on t3.id=t2.media_id LEFT JOIN files_record as t4 on t4.id=t2.media_id LEFT JOIN users_like as t5 on t5.entity_id = t2.id and t5.user_login_id = " + data.reqId + " WHERE t2.user_login_id = " + data.id + " and t2.privacy = 1 ORDER BY t2.created_date DESC";
        conn.query(q, function(err, data) {
            callback(err, data);
        })
    }

    this.fetchuserpost = function(data, callback) {


        // conn.query("select fname from users where login_id="+data, function(err, data) {
        var que = "SELECT t2.*,t3.name as picname,t4.file_type as type FROM `users_post` as t2  LEFT JOIN files_record as t3 on t3.id=t2.media_id LEFT JOIN files_record as t4 on t4.id=t2.media_id WHERE t2.user_login_id =" + data.id + " and t2.privacy = 1 ORDER BY t2.created_date DESC";
        conn.query(que, function(err, data) {

            callback(err, data);
        })
    }

    // this.insertConnection=function(data,callback){
    // console.log("test",data)

    //     var sql="insert into users_connection SET?"



    //     var formdata={
    //         user_login_id:data.userid,
    //         connection_id:data.connection_id,
    //         created_date: new Date(),
    //         responed_by:null
    //     }
    //     conn.query(sql,formdata,function(err,result){
    //     if (err) {
    //        console.log(err);
    //     }


    //      var sql1="insert into users_notification SET?"
    //      var formdata1={
    //       user_login_id:data.connection_id,
    //       notification_type:1,
    //       message:data.message,
    //       created_date:new Date()
    //     }
    //      conn.query(sql1,formdata1,function(err,result1){
    //     if (err) {
    //        console.log(err);
    //     }
    //     callback(err,result1);
    //   })
    //   })
    // }
    this.getConnectionDataUser = function(data, callback) {

        var sql = "select t1.*, t2.name as user_name , t3.name as country , t4.name as second_display ,t6.name as profile from users_connection as t1 LEFT JOIN users_other_info as t5 ON t5.id = t1.user_login_id LEFT JOIN users as t2 ON t2.login_id = t1.user_login_id LEFT JOIN master_country as t3 ON t3.id = t2.country_id LEFT JOIN master_primary_field_interest as t4 on t4.id = t5.primary_field_interest_id left join files_record as t6 ON t6.id = t2.profile_pic_id where t1.user_login_id =" + data
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    /*this.userConnectiondata=function(data,callback){
        var sql="SELECT t1.login_id as userid,t1.name,t1.country_id,t1.state_id,t1.city,t1.profile_pic_id,t2.name as logo,t4.name as country,t5.name as state,t6.primary_field_interest_id,t7.name as industry_name FROM users as t1 LEFT JOIN master_country as t4 ON t1.country_id=t4.id LEFT JOIN master_state as t5 ON t1.state_id=t5.id LEFT JOIN files_record as t2 ON t1.profile_pic_id=t2.id LEFT JOIN users_other_info as t6 ON t6.login_id =t1.login_id LEFT JOIN master_primary_field_interest as t7 ON t7.id=t6.primary_field_interest_id  WHERE t1.login_id="+data
        conn.query(sql,function(err,data){
        if (err) {
           console.log(err);
>>>>>>> 1fea200c6cc4c' + data.userid + 'b2c0153101cc0718366585958
        }
        callback(err,data);
      })
    }

    this.bussConnectiondata=function(data,callback){
        var sql="SELECT t1.loginid as userid,t1.name,t1.country_id,t1.state_id,t1.city,t1.profile_pic_id,t1.work,t2.name as logo,t4.name as country,t5.name as state,t6.name as industry FROM bussiness_profile as t1 LEFT JOIN master_country as t4 ON t1.country_id=t4.id LEFT JOIN master_state as t5 ON t1.state_id=t5.id LEFT JOIN files_record as t2 ON t1.profile_pic_id=t2.id LEFT JOIN master_work_industry as t6 ON t6.id=t1.work  WHERE t1.loginid="+data
        conn.query(sql,function(err,data){
        if (err) {
           console.log(err);
        } 
                callback(err, data);
            })
    }*/

    this.friendData = function(data, callback) {
        var sql = "SELECT t1.loginid as userid,t1.name,t1.country_id,t1.state_id,t1.city,t1.profile_pic_id,t2.name as logo,t4.name as country,t5.name as state FROM bussiness_profile as t1 LEFT JOIN master_country as t4 ON t1.country_id=t4.id LEFT JOIN master_state as t5 ON t1.state_id=t5.id LEFT JOIN files_record as t2 ON t1.profile_pic_id=t2.id WHERE t1.loginid IN(" + data.id + ") and t1.loginid !=" + data.userid + " UNION SELECT t1.login_id as userid,t1.name,t1.country_id,t1.state_id,t1.city,t1.profile_pic_id,t2.name as logo,t4.name as country,t5.name as state FROM users as t1 LEFT JOIN master_country as t4 ON t1.country_id=t4.id LEFT JOIN master_state as t5 ON t1.state_id=t5.id LEFT JOIN files_record as t2 ON t1.profile_pic_id=t2.id WHERE t1.login_id IN(" + data.id + ") and t1.login_id !=" + data.userid

        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }


    /*  this.friendData=function(data,callback){
          console.log(data)
          return false;
        var sql="select * from (Select cn.connection_id as id, cn.created_date , b.name, u.id as user_id, u.type, c.name as country, fr.name as profile_pic from users_connection as cn JOIN bussiness_profile as b on(b.loginid = cn.user_login_id) JOIN user_login as u on(u.id = cn.user_login_id AND u.status=1) JOIN master_country as c on(c.id=b.country_id) LEFT JOIN  files_record as fr ON (fr.id = b.profile_pic_id) WHERE  cn.connection_id = "+data.userid+" AND cn.status =1  UNION Select cn.connection_id as id, cn.created_date ,usr.name, u.id as user_id, u.type, c.name as country, fr.name as profile_pic from users_connection as cn JOIN users as usr on(usr.login_id = cn.user_login_id) JOIN user_login as u on(u.id =cn.user_login_id AND u.status=1) JOIN master_country as c on(c.id=usr.country_id) LEFT JOIN  files_record as fr ON (fr.id =usr.profile_pic_id) WHERE  cn.connection_id = "+data.userid+" AND cn.status =1) as connection_list ORDER BY created_date DESC limit "+data.limit
        conn.query(sql,function(err,data){
        if (err) {
           console.log(err);
        } 
                callback(err, data);
            })
    }*/

    // this.Count = function(data, callback) {
    //     var sql = "SELECT count(entity_id) as count ,entity_id FROM users_like WHERE entity_id =" + data[0].entity_id + " and status = 1"
    //     conn.query(sql, function(err, data) {
    //         if (err) {
    //             console.log(err);
    //         }
    //         callback(err, data);
    //     })
    // }
    this.getCommentAll = function(data, callback) {
        var sql = "SELECT * FROM ((SELECT user_post_comment.id as comment_id,user_post_comment.entity_id,user_post_comment.comment,user_post_comment.created_date as comment_date ,bussiness_profile.name as user_name,fr.name as profile_pic_name FROM `user_post_comment` INNER JOIN bussiness_profile ON bussiness_profile.loginid = user_post_comment.user_login_id LEFT JOIN files_record as fr ON fr.id = bussiness_profile.profile_pic_id WHERE user_post_comment.entity_id = " + data.id + ") UNION (SELECT user_post_comment.id as comment_id,user_post_comment.entity_id,user_post_comment.comment,user_post_comment.created_date as comment_date ,users.name as user_name, fl.name as profile_pic_name FROM `user_post_comment` INNER JOIN users ON users.login_id = user_post_comment.user_login_id LEFT JOIN files_record as fl ON fl.id = users.profile_pic_id WHERE user_post_comment.entity_id = " + data.id + ")) t_union ORDER BY comment_date DESC LIMIT 0,5 "
            //console.log("com sql",sql)
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);

            }
            callback(err, data)
        })
    }


    // this.getConnectStatus = function(data,callback){
    //     console.log("inout",data)
    //     var sql ="SELECT `status` FROM `users_connection` WHERE user_login_id ="+data.id+" AND connection_id ="+data.con_id+""
    //      console.log("sqlsqlsqlsql",sql)
    //      conn.query(sql,function(err,data){
    //          if(err){
    //              console.log(err)
    //          }
    //          console.log("testunder",data)
    //          callback(err,data)
    //      })
    //     }


    this.usereducationdata = function(data, callback) {
        var sql = "SELECT * FROM `users_education` where user_login_id=" + data.id + " "
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }
    this.getExperience = function(data, callback) {
        var sql = "SELECT * FROM `users_experience` where user_login_id=" + data.id + " "
        conn.query(sql, function(err, result) {
            if (err) {
                console.log(err)
            }
            callback(err, result)
        })
    }

    this.getSkills = function(data, callback) {
        //console.log("aaaaaaaaaaaaaaa",data)
        var sql = "SELECT skills FROM `user_skills` WHERE user_login_id=" + data.id + " "
        conn.query(sql, function(err, data) {
            callback(err, data)
        })
    }
    this.getSkills1 = function(data, callback) {
        var sql = "SELECT skills FROM `user_skills` WHERE user_login_id=" + data.id + " LIMIT=" + data.limit + " "
        conn.query(sql, function(err, data) {
            callback(err, data)
        })
    }

    this.getSkillsValue = function(data, callback) {
        var sql = "SELECT title FROM `master_skills` where id = " + data.id + " "
        conn.query(sql, function(err, data) {
            callback(err, data)
        })
    }

    this.fetchType = function(data, callback) {
        var sql = "select type,status from user_login where id=" + data.id
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }




    this.insertCount = function(data, callback) {
            var sql = "update users_post SET? where id=" + data.id
            var formData = {
                comment_count: data.total
            }

            conn.query(sql, formData, function(err, data) {
                if (err) {
                    console.log(err);
                }

                callback(err, data);
            })
        }
        //user count
    this.insertCountUser = function(data, callback) {
        var sql = "update users_post SET? where id=" + data.id
        var formData = {
            comment_count: data.total
        }

        conn.query(sql, formData, function(err, data) {
            if (err) {
                console.log(err);
            }

            callback(err, data);
        })
    }

    this.fetchComment = function(data, callback) {
        // console.log("hello++++++++++++++>",data)
        var sql = "SELECT t1.*,ids.name as name, fr.name as profile_pic FROM user_post_comment as t1 JOIN ((SELECT u.login_id as user_login_id, u.name as name, u.profile_pic_id as profile_pic_id FROM users u ) UNION (SELECT b.loginid as user_login_id, b.name as name, b.profile_pic_id as profile_pic_id FROM bussiness_profile b)) ids ON t1.user_login_id = ids.user_login_id JOIN user_login u ON u.id =  t1.user_login_id AND u.status = 1 LEFT JOIN files_record as fr ON fr.id = ids.profile_pic_id WHERE t1.entity_type = 1 AND t1.entity_id=" + data.id + " AND t1.status = 1 ORDER BY created_date DESC LIMIT " + data.limit
            //console.log("hello+++++++++++++sql+>",sql)
            //var sql="SELECT t1.*,ur.name,ur.profile_pic FROM `user_post_comment` as t1 INNER JOIN ((SELECT users.login_id as user_login_id, users.name,fr.name as profile_pic FROM users LEFT JOIN files_record as fr ON fr.id = users.profile_pic_id) UNION (SELECT bussiness_profile.name,bussiness_profile.loginid as user_login_id,fr.name as profile_pic FROM bussiness_profile LEFT JOIN files_record as fr ON fr.id = bussiness_profile.profile_pic_id )) as ur ON ur.user_login_id=t1.user_login_id WHERE t1.entity_type = 1 AND t1.entity_id="+data.id+" AND t1.status = 1 ORDER BY created_date DESC LIMIT "+data.limit
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            //console.log("hello++++++++++++++daa>",data)

            callback(err, data);
        })
    }
    this.getcommentreply = function(data, callback) {
        var sql = "SELECT t1.*,ids.name as name, fr.name as profile_pic FROM user_post_comment as t1 JOIN ((SELECT u.login_id as user_login_id, u.name as name, u.profile_pic_id as profile_pic_id FROM users u ) UNION (SELECT b.loginid as user_login_id, b.name as name, b.profile_pic_id as profile_pic_id FROM bussiness_profile b)) ids ON t1.user_login_id = ids.user_login_id JOIN user_login u ON u.id =  t1.user_login_id AND u.status = 1 LEFT JOIN files_record as fr ON fr.id = ids.profile_pic_id WHERE t1.entity_type = 4 AND t1.entity_id=" + data.id + " AND t1.status = 1 ORDER BY created_date DESC LIMIT " + data.limit
            //var sql="SELECT t1.*,ur.name,ur.profile_pic FROM `user_post_comment` as t1 INNER JOIN ((SELECT users.login_id as user_login_id, users.name,fr.name as profile_pic FROM users LEFT JOIN files_record as fr ON fr.id = users.profile_pic_id) UNION (SELECT bussiness_profile.name,bussiness_profile.loginid as user_login_id,fr.name as profile_pic FROM bussiness_profile LEFT JOIN files_record as fr ON fr.id = bussiness_profile.profile_pic_id )) as ur ON ur.user_login_id=t1.user_login_id WHERE t1.entity_type = 1 AND t1.entity_id="+data.id+" AND t1.status = 1 ORDER BY created_date DESC LIMIT "+data.limit
            //console.log("hello hi*/*************",sql)
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }

            callback(err, data);
        })
    }


    this.getStatusCommentlike = function(data, callback) {
        // console.log("------------==========",data)
        // var sql="SELECT count(id) as saved_status FROM `user_saved_opportunity` WHERE opportunity_id = "+data.id+" AND user_id ="+data.user_id+" AND saved_status = 1" 
        // var sql="SELECT count(id) as saved_status FROM `users_like` WHERE entity_id = "+data.id+" AND user_login_id ="+data.user_id+" " 
        var sql = "SELECT status as saved_status FROM `users_like` WHERE entity_id = " + data.id + " AND user_login_id =" + data.user_id + " LIMIT " + data.limit + " "
            //console.log("------------==========>sql",sql)
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);

        })
    }

    this.fetchbussinessView = function(data, callback) {
        //console.log(data)
        var sql = "SELECT t1.*,t2.name as profile_pic_name, t3.name as video_name,t4.name as industry_name,t5.name as state_name,t6.name as country_name,t8.name as company_type,t9.size as company_size,t10.type as user_type FROM `bussiness_profile` as t1 LEFT JOIN files_record as t2 ON t2.id = t1.profile_pic_id LEFT JOIN files_record as t3 ON t3.id = t1.bio_video_id LEFT JOIN master_work_industry as t4 on t4.id = t1.work LEFT JOIN master_state as t5 ON t5.id = t1.state_id LEFT JOIN master_country as t6 ON t6.id = t1.country_id LEFT JOIN master_company_type as t8 on t8.id = t1.companytype LEFT JOIN master_company_size as t9 on t9.id = t1.companysize LEFT JOIN user_login as t10 ON t10.id = t1.loginid WHERE t1.loginid=" + data.id
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }


    this.fetchuserView = function(data, callback) {


        var sql = "SELECT t1.*,t2.name as profile_pic_name, t3.name as video_name,t4.name as resume_name,t5.*,t6.name as state_name,t7.name as country_name,t8.type as user_type FROM `users` as t1 LEFT JOIN files_record as t2 ON t2.id = t1.profile_pic_id LEFT JOIN files_record as t3 ON t3.id = t1.bio_video_id LEFT JOIN files_record as t4 ON t4.id = t1.resume_file_id LEFT JOIN users_other_info as t5 ON t5.login_id = t1.login_id LEFT JOIN master_state as t6 ON t6.id = t1.state_id LEFT JOIN master_country as t7 ON t7.id = t1.country_id LEFT JOIN user_login as t8 ON t8.id = t1.login_id WHERE t1.login_id=" + data.id
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.fetchbussinesspost = function(data, callback) {

        // conn.query("select fname from users where login_id="+data, function(err, data) {
        var que = "SELECT t2.*,t3.name as picname,t4.file_type as type FROM `users_post` as t2  LEFT JOIN files_record as t3 on t3.id=t2.media_id LEFT JOIN files_record as t4 on t4.id=t2.media_id WHERE t2.user_login_id =" + data.id + " and t2.privacy = 1 ORDER BY t2.created_date DESC";
        var q = "SELECT t2.*,t3.name as picname,t4.file_type as type,t5.status as like_status FROM `users_post` as t2 LEFT JOIN files_record as t3 on t3.id=t2.media_id LEFT JOIN files_record as t4 on t4.id=t2.media_id LEFT JOIN users_like as t5 on t5.entity_id = t2.id and t5.user_login_id = " + data.reqId + " WHERE t2.user_login_id = " + data.id + " and t2.privacy = 1 ORDER BY t2.created_date DESC";
        conn.query(q, function(err, data) {
            callback(err, data);
        })
    }

    this.fetchuserpost = function(data, callback) {


        // conn.query("select fname from users where login_id="+data, function(err, data) {
        var que = "SELECT t2.*,t3.name as picname,t4.file_type as type FROM `users_post` as t2  LEFT JOIN files_record as t3 on t3.id=t2.media_id LEFT JOIN files_record as t4 on t4.id=t2.media_id WHERE t2.user_login_id =" + data.id + " and t2.privacy = 1 ORDER BY t2.created_date DESC";
        conn.query(que, function(err, data) {

            callback(err, data);
        })
    }
    this.connectionData = function(data, callback) {
        var sql = "SELECT CONCAT(user_login_id,',', connection_id) AS ids FROM `users_connection` WHERE STATUS = 1 and (user_login_id = " + data.userid + " OR connection_id = " + data.userid + ")  ORDER BY created_date DESC limit " + data.limit;
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }



    this.fechConnection = function(data, callback) {

        // var sql = "select * from users_connection where user_login_id=" + data.userid + " and connection_id=" + data.connection_id
        //// var sql = "select * from users_connection where (user_login_id=" + data.userid + " OR connection_id=" + data.userid + ") AND (user_login_id= "+ data.connection_id+" OR connection_id="+  data.connection_id+")" 
        var sql = "select * from users_connection where (user_login_id=" + data.userid + " OR connection_id=" + data.userid + ") AND (user_login_id= " + data.connection_id + " OR connection_id=" + data.connection_id + ")"
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }


    this.fetchLogo = function(data, callback) {
        var sql = "SELECT t1.profile_pic_id as logo FROM `bussiness_profile` as t1  WHERE t1.loginid= " + data.userid + " UNION SELECT t1.profile_pic_id as logo FROM `users` as t1  WHERE t1.login_id = " + data.userid;
        if (data.user_type == 1) {
            var sql = "SELECT profile_pic_id as logo FROM `bussiness_profile` WHERE loginid=" + data.userid
        } else if (data.user_type == 2) {
            var sql = "SELECT profile_pic_id as logo From `users` WHERE login_id=" + data.userid
        }

        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })

    }

    this.fetchMessage = function(data, callback) {
        var sql = "select * from master_notification where type=" + data.type
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.showConnection = function(data, callback) {
        var sql = "SELECT user_login_id FROM `users_connection` where connection_id =" + data.userid + " and status =2 ORDER BY created_date DESC limit " + data.limit
            //var sql = "select t1.*, t2.type from users_connection as t1 LEFT JOIN user_login as t2 ON t2.id = t1.user_login_id where t1.connection_id =" + data.userid + " and t1.status != 1 and t1.status != 3 ORDER BY t1.created_date DESC limit "+data.limit
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.getConnectionData = function(data, callback) {

        //var sql = "select t1.*, t2.name as user_name , t3.name as country , t4.name as second_display ,t6.name as profile from users_connection as t1 INNER JOIN bussiness_profile as t2 ON t2.loginid = t1.user_login_id INNER JOIN master_country as t3 ON t3.id = t2.country_id INNER JOIN master_work_industry as t4 on t4.id = t2.work INNER join files_record as t6 ON t6.id = t2.profile_pic_id where t1.user_login_id IN(" + data + ") UNION select t1.*, t2.name as user_name , t3.name as country , t4.name as second_display ,t6.name as profile from users_connection as t1 INNER JOIN users_other_info as t5 ON t5.id = t1.user_login_id INNER JOIN users as t2 ON t2.login_id = t1.user_login_id INNER JOIN master_country as t3 ON t3.id = t2.country_id INNER JOIN master_primary_field_interest as t4 on t4.id = t5.primary_field_interest_id INNER join files_record as t6 ON t6.id = t2.profile_pic_id where t1.user_login_id IN(" + data + ") "
        //var sql = "select t1.*, t2.name as user_name , t3.name as country , t4.name as second_display ,t6.name as profile from users_connection as t1 INNER JOIN bussiness_profile as t2 ON t2.loginid = t1.user_login_id INNER JOIN master_country as t3 ON t3.id = t2.country_id INNER JOIN master_work_industry as t4 on t4.id = t2.work INNER join files_record as t6 ON t6.id = t2.profile_pic_id where t1.user_login_id IN(" + data + ") UNION select t1.*, t2.name as user_name , t3.name as country , t4.name as second_display ,t6.name as profile from users_connection as t1 INNER JOIN users_other_info as t5 ON t5.id = t1.user_login_id INNER JOIN users as t2 ON t2.login_id = t1.user_login_id INNER JOIN master_country as t3 ON t3.id = t2.country_id INNER JOIN master_primary_field_interest as t4 on t4.id = t5.primary_field_interest_id INNER join files_record as t6 ON t6.id = t2.profile_pic_id where t1.user_login_id IN(" + data + ") "
        var sql = "select * from (Select cn.user_login_id as id, cn.created_date , b.name, u.id as user_id, u.type, c.name as country, fr.name as profile_pic from users_connection as cn JOIN bussiness_profile as b on(b.loginid = cn.user_login_id) JOIN user_login as u on(u.id = cn.user_login_id AND u.status=1) JOIN master_country as c on(c.id=b.country_id) LEFT JOIN  files_record as fr ON (fr.id = b.profile_pic_id) WHERE  cn.connection_id = " + data.userid + " AND cn.status =2  UNION   Select cn.user_login_id as id, cn.created_date ,usr.name, u.id as user_id, u.type, c.name as country, fr.name as profile_pic from users_connection as cn JOIN users as usr on(usr.login_id = cn.user_login_id) JOIN user_login as u on(u.id =cn.user_login_id AND u.status=1) JOIN master_country as c on(c.id=usr.country_id) LEFT JOIN  files_record as fr ON (fr.id =usr.profile_pic_id) WHERE  cn.connection_id = " + data.userid + " AND cn.status =2) as connection_list ORDER BY created_date DESC limit " + data.limit
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }




    this.updateConnection = function(data, callback) {


        // var sql = "update  users_connection SET? where user_login_id=" + data.userid + " and connection_id=" + data.connection_id
        var sql = "update users_connection SET ? where (user_login_id=" + data.userid + " OR connection_id=" + data.userid + ") AND (user_login_id=" + data.connection_id + " OR connection_id=" + data.connection_id + ")"
        var formdata = {
            connection_id: data.connection_id,
            user_login_id: data.userid,
            created_date: new Date(),
            status: 2
        }
        var sql1 = "insert into users_notification SET?"
        var formdata1 = {
            user_login_id: data.connection_id,
            notification_type: 1,
            message: data.message,
            created_date: new Date()
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err);
            }

            conn.query(sql1, formdata1, function(err, result1) {
                if (err) {
                    console.log(err);
                }
                callback(err, result1);
            })
        })
    }

    this.unfollowConnection = function(data, callback) {

        var sql = "update  users_connection SET? where user_login_id=" + data.userid + " and connection_id=" + data.connection_id
        var formdata = {
            response_date: new Date(),
            status: 3,
            responed_by: 1
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.cancelConnection = function(data, callback) {

        var sql = "update users_connection SET? where user_login_id=" + data.userid + " and connection_id=" + data.connection_id + ""
        var formdata = {
            response_date: new Date(),
            status: 3,
            responed_by: 2
        }
        conn.query(sql, formdata, function(err, result) {
            if (err) {
                console.log(err);
            }
            if (result.affectedRows == 0) {
                var sql = "update users_connection SET? where user_login_id=" + data.connection_id + " and connection_id=" + data.userid + ""
                var formdata = {
                    response_date: new Date(),
                    status: 3,
                    responed_by: 1
                }
                conn.query(sql, formdata, function(err, data) {
                    if (err) {
                        console.log(err);
                    }
                    callback(err, data);
                });
            } else {
                callback(err, result);
            }
        })
    }

    this.getConnection = function(data, callback) {

        ////var sql = "select * from users_connection where connection_id=" + data.id + " and user_login_id=" + data.userid + ""
        var sql = "select * from users_connection where (connection_id= " + data.id + "  OR user_login_id=" + data.id + " ) AND (connection_id= " + data.userid + " OR user_login_id=" + data.userid + ") "
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }
    this.getConnection01 = function(data, callback) {

        ////var sql = "select * from users_connection where connection_id=" + data.id + " and user_login_id=" + data.userid + ""
        var sql = "SELECT * FROM users_connection WHERE (connection_id = " + data.id + " and user_login_id = " + data.userid + ") OR (connection_id = " + data.userid + " and user_login_id = " + data.id + ") ORDER BY id DESC LIMIT 0,1  "
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }


    this.Data = function(data, callback) {

        var sql = "select t1.name,t1.loginid as id,t2.name as work_industry,t3.name as company_type, t4.size as companysize, t5.name as profile_pic,t6.status,t7.name as country from `bussiness_profile` as t1 LEFT JOIN master_work_industry as t2 on t2.id=t1.work LEFT JOIN master_company_type as t3 on t3.id=t1.companytype LEFT JOIN master_company_size as t4 ON t4.id = t1.companysize LEFT JOIN files_record as t5 ON t5.id = t1.profile_pic_id LEFT JOIN user_login as t6 ON t6.id = t1.loginid LEFT JOIN master_country as t7 on t7.id=t1.country_id where t1.loginid=" + data[0].user_login_id

        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.getconnectionCount = function(data, callback) {
        var sql = " SELECT count(id) as total_connections FROM `users_connection` WHERE ( user_login_id = " + data + " OR connection_id = " + data + " ) AND status = 1"
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.getuserconnectionCount = function(data, callback) {
        var sql = " SELECT count(id) as total_connections FROM `users_connection` WHERE ( user_login_id = " + data + " OR connection_id = " + data + " ) AND status = 1"
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }


    this.getconnectionResult = function(data, callback) {
        var sql = " SELECT count(id) as result_connections FROM `users_connection` WHERE connection_id = " + data + " AND status = 2"
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.getuserconnectionResult = function(data, callback) {
        var sql = " SELECT count(id) as result_connections FROM `users_connection` WHERE connection_id = " + data + " AND status = 2"
        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.requestAccept = function(data, callback) {

        var sql = "update users_connection SET ? where user_login_id =" + data.id + " and connection_id =" + data.userid
        var formData = {
            response_date: new Date(),
            status: 1,
            responed_by: 1
        }

        var sql1 = "insert into users_notification SET?"

        var formdata1 = {
            user_login_id: data.id,
            notification_type: 4,
            message: data.message,
            created_date: new Date()
        }
        conn.query(sql, formData, function(err, data) {
            if (err) {
                console.log(err);
            }
            conn.query(sql1, formdata1, function(err, data) {
                if (err) {
                    console.log(err);
                }
                callback(err, data);
            })
        })
    }

    this.requestDecline = function(data, callback) {

        var sql = "update users_connection SET? where user_login_id=" + data.id + " and connection_id =" + data.userid
        var formData = {
            response_date: new Date(),
            status: 3,
            responed_by: 1
        }
        var sql1 = "insert into users_notification SET?"

        var formdata1 = {
            user_login_id: data.id,
            notification_type: 5,
            message: data.message,
            created_date: new Date()
        }

        conn.query(sql, formData, function(err, data) {
            if (err) {
                console.log(err);
            }
            var sql1 = "insert into users_notification SET?"

            conn.query(sql1, formdata1, function(err, result1) {
                if (err) {
                    console.log(err);
                }

                callback(err, result1);
            })
        })
    }

    this.getpostCount = function(data, callback) {
        // var query = "SELECT count(id) as post_count FROM users_post WHERE status = 1 and user_login_id IN( " + data.ids + ")";
        // console.log(query);
        var query = 'SELECT count(id) as post_count FROM `users_post` as t1 WHERE t1.user_login_id IN (' + data.ids + ') and t1.status = 1 AND t1.privacy != 2 ORDER BY  t1.created_date DESC'
        conn.query(query, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.getpostCount1 = function(data, callback) {
        var query = "SELECT count(id) as post_count FROM users_post WHERE status = 1 and user_login_id IN( " + data.idd + ")";
        conn.query(query, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }
    this.getSharePost = function(data, callback) {

    }
    this.profileViewInsertion = function(data, callback) {
        var query = "insert into view_log SET?";
        var sql = "insert into users_notification SET?"
        console.log("---------------", data, query, sql)

        var formdata1 = {
            user_login_id: data.userloginid,
            notification_type: 6,
            message: data.message,
            created_date: new Date()
        }
        formdata = {
            user_login_id: data.userloginid,
            view_by_id: data.viewby,
            entity_type: 1,
            created_date: new Date()
        }
        conn.query(query, formdata, function(err, data) {
            if (err) {
                console.log(err);
            }

            conn.query(sql, formdata1, function(err, data) {
                if (err) {
                    console.log(err);
                }

                callback(err, data);
            })
        })
    }

    this.checkView = function(data, callback) {
        var query = "select * from view_log where user_login_id = " + data.userloginid + " and view_by_id = " + data.viewby + " AND entity_type = 1 ";
        conn.query(query, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }


    this.blockUser = function(data, callback) {
        var query = "insert into users_block SET ?";
        var query1 = "update users_connection SET status = 5 where (user_login_id =" + data.user_login_id + " or connection_id =" + data.user_login_id + ") and (user_login_id =" + data.userid + " or connection_id =" + data.userid + ")"
        var formdata = {
            user_login_id: data.userid,
            blocked_user_id: data.user_login_id,
            created_date: new Date()
        }
        conn.query(query, formdata, function(err, data) {
            if (err) {
                console.log(err);
            }
            conn.query(query1, function(err, data) {
                if (err) {
                    console.log(err);
                }
                callback(err, data);
            })
        })
    }

    this.checkbioView = function(data, callback) {
        var query = "select * from view_log where user_login_id = " + data.userloginid + " and view_by_id = " + data.viewby + " AND entity_type = 2 ";
        conn.query(query, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.profileViewCount = function(data, callback) {
        var query = "SELECT count(id) as total_view_profile FROM `view_log` WHERE user_login_id = " + data + " AND entity_type = 1 ";
        conn.query(query, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.bioViewInsertion = function(data, callback) {
        var query = "insert into view_log SET?";
        formdata = {
            user_login_id: data.userloginid,
            view_by_id: data.viewby,
            entity_type: 2,
            created_date: new Date()
        }

        var sql = "insert into users_notification SET?"

        var formdata1 = {
            user_login_id: data.userloginid,
            notification_type: 7,
            message: data.message,
            created_date: new Date()
        }
        conn.query(query, formdata, function(err, data) {
            if (err) {
                console.log(err);
            }
            conn.query(sql, formdata1, function(err, data) {
                if (err) {
                    console.log(err);
                }
                callback(err, data);
            })
        })
    }

    this.bioViewCount = function(data, callback) {
        var query = "SELECT count(id) as total_view_bio FROM `view_log` WHERE user_login_id = " + data + " AND entity_type = 2 ";
        conn.query(query, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }


    this.profileviewList = function(data, callback) {
        var query = "select *from (SELECT t1.*,t2.profile_pic_id,t2.name,t2.loginid as userid ,t3.name as logo FROM `view_log` as t1 INNER JOIN bussiness_profile as t2 ON t2.loginid = t1.view_by_id LEFT JOIN files_record as t3 on t3.id = t2.profile_pic_id where t1.user_login_id =" + data.userid + " AND t1.entity_type =1 UNION SELECT t1.*,t2.profile_pic_id,t2.name,t2.login_id as userid,t3.name as logo FROM `view_log` as t1 INNER JOIN users as t2 ON t2.login_id = t1.view_by_id LEFT JOIN files_record as t3 on t3.id = t2.profile_pic_id where t1.user_login_id =" + data.userid + " AND t1.entity_type =1) t_union ORDER BY created_date DESC LIMIT " + data.limit

        conn.query(query, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.bioviewList = function(data, callback) {
        var query = "select * from (SELECT t1.*,t2.profile_pic_id,t2.name,t2.loginid as userid ,t3.name as logo FROM `view_log` as t1 INNER JOIN bussiness_profile as t2 ON t2.loginid = t1.view_by_id LEFT JOIN files_record as t3 on t3.id = t2.profile_pic_id where t1.user_login_id =" + data.userid + " AND t1.entity_type =2 UNION SELECT t1.*,t2.profile_pic_id,t2.name,t2.login_id as userid,t3.name as logo FROM `view_log` as t1 INNER JOIN users as t2 ON t2.login_id = t1.view_by_id LEFT JOIN files_record as t3 on t3.id = t2.profile_pic_id where t1.user_login_id =" + data.userid + " AND t1.entity_type =2) t_union ORDER BY created_date DESC LIMIT " + data.limit

        conn.query(query, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.get_about_us_content = function(data, callback) {
        var sql = "SELECT * FROM `cms_pages` "
        conn.query(sql, function(err, data) {
            callback(err, data)
        })
    }

    this.replay_comments = function(data, callback) {
        var sql = "insert into user_post_comment SET?"
        formdata = {
            user_login_id: data.userid,
            entity_type: 4,
            entity_id: data.entity_id,
            comment: data.commentreply,
            created_date: new Date(),
            updated_date: new Date(),
            status: 1
        }
        conn.query(sql, formdata, function(err, result) {
            callback(err, result)
        })
    }

    this.getmessageList = function(data, callback) {
        var query = "SELECT u.login_id as user_login_id, u.name as name, u.profile_pic_id as profile_pic_id, fr.name as profile_pic FROM users u LEFT JOIN files_record as fr ON fr.id = u.profile_pic_id where u.login_id IN( SELECT user_login_id as fid FROM `user_chat_room` WHERE chat_user_id =" + data + " union SELECT chat_user_id as fid FROM `user_chat_room` WHERE user_login_id=" + data + " ) AND u.login_id !=" + data + " UNION SELECT b.loginid as user_login_id, b.name as name, b.profile_pic_id as profile_pic_id, fr.name as profile_pic FROM bussiness_profile b LEFT JOIN files_record as fr ON fr.id = b.profile_pic_id where b.loginid IN( SELECT user_login_id as fid FROM `user_chat_room` WHERE chat_user_id =" + data + " union SELECT chat_user_id as fid FROM `user_chat_room` WHERE user_login_id=" + data + " ) AND b.loginid !=" + data;
        // console.log(query, "GET MESSAGE AND USER LIST");
        conn.query(query, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }



    this.createRoom = function(data, callback) {
        var query = "insert into user_chat_room SET?"
        var formdata = {
            user_login_id: data.user_login_id,
            chat_user_id: data.chat_id,
            room: data.room,
            created_date: new Date()
        }

        conn.query(query, formdata, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.fetchRoom = function(data, callback) {
        // var query="select room from user_chat_room as t1 where ( user_login_id ="+data.user_login_id+" or chat_user_id ="+data.user_login_id+" ) and ( user_login_id ="+data.chat_id+" or chat_user_id ="+data.chat_id+" )  "
        var query = "select t1.room, t1.chat_status, t1.status_by ,t2.id, t2.status from user_chat_room as t1 LEFT JOIN users_connection as t2 ON ((t2.user_login_id = " + data.user_login_id + " and t2.connection_id = " + data.chat_id + ") OR (t2.user_login_id = " + data.chat_id + " and t2.connection_id = " + data.user_login_id + ")) where ( t1.user_login_id =" + data.user_login_id + " or t1.chat_user_id =" + data.user_login_id + " ) and ( t1.user_login_id =" + data.chat_id + " or t1.chat_user_id =" + data.chat_id + " )  ";
        console.log(query);
        conn.query(query, function(err, data) {
            if (err) {
                console.log(err);
            }

            callback(err, data);
        })
    }
    this.getmedia = function(data, callback) {
        var que = "SELECT * FROM files_record WHERE id = " + data.id;
        conn.query(que, false, function(err, res) {
            if (err) {
                console.log(err);
            }
            callback(err, res);
        });
    }
    this.insertChat = function(data, callback) {

        var query = "insert into users_chat SET?"
        var formdata = {
            message_from: data.from,
            message_to: data.to,
            room: data.room,
            created_date: new Date(),
            message: data.msg,
            media_id: data.media,
            base64: data.base64
        }
        conn.query(query, formdata, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.fetchChat = function(data, callback) {
        var query = "select * from users_chat where room = '" + data.room_id + "'";
        conn.query(query, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.insertSearchlog = function(data, callback) {
        var query = "insert into search_log SET?"
        var formdata = {
            user_id: data.userid,
            search_key: data.keyword,
            search_results: data.keyresult,
            search_datetime: new Date()
        }
        conn.query(query, formdata, function(err, res) {
            if (err) {
                console.log(err);
            }
            callback(err, res);
        });
    }

    this.alloweUser = function(data, callback) {
        var query = "UPDATE user_chat_room set chat_status = " + data.type + " ,status_by = " + data.user_id + " WHERE user_login_id = " + data.chatId + " and chat_user_id = " + data.user_id + " OR user_login_id = " + data.user_id + " and chat_user_id = " + data.chatId
        conn.query(query, false, function(err, res) {
            if (err) {
                console.log(err);
            }
            callback(err, res);
        });
    }


    this.get_user_name = function(data, callback) {
        var sql = "SELECT name FROM `user_login` WHERE id=" + data.id + " "
        console.log("------------", sql)
        conn.query(sql, function(err, res) {
            callback(err, res)
        })

    }

    this.getopportunitydata = function(data, callback) {
        var query = "select * from opportunities where id =" + data.id
        conn.query(query, false, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data)
        })
    }

}
module.exports = database;
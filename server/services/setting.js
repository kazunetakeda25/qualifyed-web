var conn = require('../config/connection');

var database=new function() {

    this.changePasswordCheck = function(data, callback)
    {
        var selQuery = "SELECT password FROM user_login WHERE id = "+data.userid;
        conn.query(selQuery,false,function(err,res){
            callback(err, res);      
        })
    }
     this.getblockUser = function(data, callback)
    {
        var selQuery = "SELECT t1.*,t2.name FROM `users_block` AS t1 LEFT JOIN user_login AS t2 ON t2.id=t1.blocked_user_id where t1.user_login_id ="+data+" order by created_date desc"
        conn.query(selQuery,false,function(err,res){
            callback(err, res);      
        })
    }


    this.changePassword = function(data, callback)
    {
        var query = "UPDATE user_login SET ? WHERE id = "+data.userid;
         var query1 = "INSERT into users_activity_log SET ?"
         var formdata={
             user_login_id:data.userid,
             activity_type:7,
             activity_id:0,
             activity_message:"user change password",
             created_date:new Date()
         }
        conn.query(query,{password : data.new_password},function(err,res){
            if(err)
             {
                console.log(err); 
             }
        conn.query(query1,formdata,function(err,result){
            if(err)
             {
                console.log(err); 
             }
              callback(err, result); 
         })
                
        })   
    }


this.getCreatedPassword=function(data,callback){
    var sql = "SELECT * FROM `users_activity_log` where user_login_id="+data.userid+" ORDER BY created_date DESC LIMIT 0,1"

    conn.query(sql, false,function(err, result){
            if(err)
            {
                console.log(err);
            }
            callback(err, result);
        })
}
    this.signout = function(data, callback)
    {
        var deleteQuery = "DELETE FROM `user_login_log` WHERE user_login_id = "+data.id+" and ip_address = '"+data.ip+"'";
        conn.query(deleteQuery, false,function(err, result){
            if(err)
            {
                console.log(err);
            }
            callback(err, result);
        })
    }

    this.getAllLoginSesssion = function(data, callback)
    {
        var query = "SELECT * FROM user_login_log WHERE user_login_id = "+data.data;
        conn.query(query, false, function(err, res){
               if(err)
               {
                   console.log(err);
               }
               callback(err, res);
        })
    }

    this.two_factor_auth = function(data, callback)
    {
        var query = "SELECT * FROM users_setting WHERE user_login_id = "+data.userid;
        var insertQuery = "INSERT INTO users_setting SET ?";
        var insertData = {
            user_login_id : data.userid,
            is_tofactor_auth : data.is_tofactor_auth
        }
        var updateQuery = "UPDATE users_setting SET is_tofactor_auth = "+data.is_tofactor_auth+" WHERE user_login_id = "+data.userid;
        conn.query(query, false, function(err, result){
            if(err)
            {
                console.log(err);
            }
            if(result.length > 0)
            {
                conn.query(updateQuery, false, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }else{
                conn.query(insertQuery, insertData, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }
        });
    }
    this.two_factor_auth_disable = function(data,callback){
      
        var query = "SELECT * FROM users_setting WHERE user_login_id = "+data.userid;
        var insertQuery = "INSERT INTO users_setting SET ?";
        var insertData = {
            user_login_id : data.userid,
            is_tofactor_auth : data.is_tofactor_auth
        }
        var updateQuery = "UPDATE users_setting SET is_tofactor_auth = "+data.is_tofactor_auth+" WHERE user_login_id = "+data.userid;
        conn.query(query, false, function(err, result){
            if(err)
            {
                console.log(err);
            }
            if(result.length > 0)
            {
                conn.query(updateQuery, false, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }else{
                conn.query(insertQuery, insertData, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }
        });

    }

      this.Emailnotification = function(data,callback){
      
        var query = "SELECT * FROM users_setting WHERE user_login_id = "+data.userid;
        var insertQuery = "INSERT INTO users_setting SET ?";
        var insertData = {
            user_login_id : data.userid,
            email_notification : data.is_emailnotification
        }
        var updateQuery = "UPDATE users_setting SET email_notification = "+data.is_emailnotification+" WHERE user_login_id = "+data.userid;
        conn.query(query, false, function(err, result){
            if(err)
            {
                console.log(err);
            }
            if(result.length > 0)
            {
                conn.query(updateQuery, false, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }else{
                conn.query(insertQuery, insertData, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }
        });

    }

        




    this.email_seen = function(data, callback)
    {
        var query = "SELECT * FROM users_setting WHERE user_login_id = "+data.userid;
        var insertQuery = "INSERT INTO users_setting SET ?";
        var insertData = {
            user_login_id : data.userid,
            show_emai_to : data.show_emai_to
        }
        var updateQuery = "UPDATE users_setting SET show_emai_to = "+data.show_emai_to+" WHERE user_login_id = "+data.userid;
        conn.query(query, false, function(err, result){
            if(err)
            {
                console.log(err);
            }
            if(result.length > 0)
            {
                conn.query(updateQuery, false, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }else{
                conn.query(insertQuery, insertData, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }
        });
    }


  this.profile_viewed = function(data,callback){
        var query = "SELECT * FROM users_setting WHERE user_login_id = "+data.userid;
        var insertQuery = "INSERT INTO users_setting SET ?";
        var insertData = {
            user_login_id : data.userid,
             viewers_also_viewed : data.profile_viewed
        }
        var updateQuery = "UPDATE users_setting SET viewers_also_viewed = "+data.profile_viewed+" WHERE user_login_id = "+data.userid;
        conn.query(query, false, function(err, result){
            if(err)
            {
                console.log(err);
            }
            if(result.length > 0)
            {
                conn.query(updateQuery, false, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }else{
                conn.query(insertQuery, insertData, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }
        });

    }


      this.profile_viewed_disabled = function(data,callback){
        var query = "SELECT * FROM users_setting WHERE user_login_id = "+data.userid;
        var insertQuery = "INSERT INTO users_setting SET ?";
        var insertData = {
            user_login_id : data.userid,
            viewers_also_viewed : data.profile_viewed
        }
        var updateQuery = "UPDATE users_setting SET viewers_also_viewed = "+data.profile_viewed+" WHERE user_login_id = "+data.userid;
        conn.query(query, false, function(err, result){
            if(err)
            {
                console.log(err);
            }
            if(result.length > 0)
            {
                conn.query(updateQuery, false, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }else{
                conn.query(insertQuery, insertData, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }
        });

    }


    this.phone_seen = function(data, callback)
    {
        var query = "SELECT * FROM users_setting WHERE user_login_id = "+data.userid;
        var insertQuery = "INSERT INTO users_setting SET ?";
        var insertData = {
            user_login_id : data.userid,
            show_phone_to : data.show_phone_to
        }
        var updateQuery = "UPDATE users_setting SET show_phone_to = "+data.show_phone_to+" WHERE user_login_id = "+data.userid;
        conn.query(query, false, function(err, result){
            if(err)
            {
                console.log(err);
            }
            if(result.length > 0)
            {
                conn.query(updateQuery, false, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }else{
                conn.query(insertQuery, insertData, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }
        });
    }
    this.commonSetting = function(data,callback)
    {

    }

    this.getSetting = function(data, callback)
    {
        var query = "SELECT * FROM `users_setting` WHERE user_login_id = "+data.data;
        conn.query(query,false,function(err, result){
            callback(err, result);
        });
    }
    this.seen_resume = function(data, callback)
    {
        var query = "SELECT * FROM users_setting WHERE user_login_id = "+data.userid;
        var insertQuery = "INSERT INTO users_setting SET ?";
        var insertData = {
            user_login_id : data.userid,
            show_resume_to : data.show_resume_to
        }
        var updateQuery = "UPDATE users_setting SET show_resume_to = "+data.show_resume_to+" WHERE user_login_id = "+data.userid;
        conn.query(query, false, function(err, result){
            if(err)
            {
                console.log(err);
            }
            if(result.length > 0)
            {
                conn.query(updateQuery, false, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }else{
                conn.query(insertQuery, insertData, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }
        });
    }

    this.connection_seen = function(data, callback)
    {
        var query = "SELECT * FROM users_setting WHERE user_login_id = "+data.userid;
        var insertQuery = "INSERT INTO users_setting SET ?";
        var insertData = {
            user_login_id : data.userid,
            show_connections_to : data.show_connections_to
        }
        var updateQuery = "UPDATE users_setting SET show_connections_to = "+data.show_connections_to+" WHERE user_login_id = "+data.userid;
        conn.query(query, false, function(err, result){
            if(err)
            {
                console.log(err);
            }
            if(result.length > 0)
            {
                conn.query(updateQuery, false, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }else{
                conn.query(insertQuery, insertData, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }
        });
    }

    this.last_name_seen = function(data, callback)
    {
        var query = "SELECT * FROM users_setting WHERE user_login_id = "+data.userid;
        var insertQuery = "INSERT INTO users_setting SET ?";
        var insertData = {
            user_login_id : data.userid,
            show_lastname_to : data.show_lastname_to
        }
        var updateQuery = "UPDATE users_setting SET show_lastname_to = "+data.show_lastname_to+" WHERE user_login_id = "+data.userid;
        conn.query(query, false, function(err, result){
            if(err)
            {
                console.log(err);
            }
            if(result.length > 0)
            {
                conn.query(updateQuery, false, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }else{
                conn.query(insertQuery, insertData, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }
        });
    }

    this.active_seen = function(data, callback)
    {
        var query = "SELECT * FROM users_setting WHERE user_login_id = "+data.userid;
        var insertQuery = "INSERT INTO users_setting SET ?";
        var insertData = {
            user_login_id : data.userid,
            online_status : data.online_status
        }
        var updateQuery = "UPDATE users_setting SET online_status = "+data.online_status+" WHERE user_login_id = "+data.userid;
        conn.query(query, false, function(err, result){
            if(err)
            {
                console.log(err);
            }
            if(result.length > 0)
            {
                conn.query(updateQuery, false, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }else{
                conn.query(insertQuery, insertData, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }
        });
    }

        this.active_timeline = function(data, callback)
    {
        var query = "SELECT * FROM users_setting WHERE user_login_id = "+data.userid;
        var insertQuery = "INSERT INTO users_setting SET ?";
        var insertData = {
            user_login_id : data.userid,
            who_can_see_timeline : data.timeline_status
        }
        var updateQuery = "UPDATE users_setting SET who_can_see_timeline  = "+data.timeline_status+" WHERE user_login_id = "+data.userid;
        conn.query(query, false, function(err, result){
            if(err)
            {
                console.log(err);
            }
            if(result.length > 0)
            {
                conn.query(updateQuery, false, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }else{
                conn.query(insertQuery, insertData, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }
        });
    }


      this.message_Prefrence = function(data, callback)
    {
        var query = "SELECT * FROM users_setting WHERE user_login_id = "+data.userid;
        var insertQuery = "INSERT INTO users_setting SET ?";
        var insertData = {
            user_login_id : data.userid,
                who_can_send_message : data.message_status
        }
        var updateQuery = "UPDATE users_setting SET who_can_send_message  = "+data.message_status+" WHERE user_login_id = "+data.userid;
        conn.query(query, false, function(err, result){
            if(err)
            {
                console.log(err);
            }
            if(result.length > 0)
            {
                conn.query(updateQuery, false, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }else{
                conn.query(insertQuery, insertData, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }
        });
    }
 

    this.getEmails = function(data, callback)
    {
        query = "SELECT * FROM users_email WHERE user_login_id = "+data.data;
        conn.query(query, false, function(err, result){
            if(err)
            {
                console.log(err);
            }
            callback(err, result);
        });
    }
    this.getPhones = function(data, callback)
    {
        query = "SELECT * FROM users_phone_number WHERE user_login_id = "+data.data;
        conn.query(query, false, function(err, result){
            if(err)
            {
                console.log(err);
            }
            callback(err, result);
        });
    }
    this.addNewEmailPost = function(data, callback)
    {
        var selectQuery = "SELECT * FROM users_email WHERE email = '"+data.email+"' and status != 4";
        var insertQuery = "INSERT INTO users_email SET ?";
        var insertData = {
            email : data.email,
            user_login_id : data.userid,
            is_primary : 0,
            status : 0,
            otp : data.otp,
            expiry_date : new Date()
        }

        conn.query(selectQuery, false, function(err, result){
            if(err)
            {
                console.log(err)
            }

            if(result.length > 0)
            {
                callback(err, {success : false, msg : " User email already exists "});
            }else{
                conn.query(insertQuery, insertData, function(err, result1){
                    if(err)
                    {
                        console.log(err);
                    }
                    conn.query(selectQuery, false, function(err, result2){
                        if(err)
                        {
                            console.log(err);
                        }
                        callback(err,result2);
                    })
                });              
            }
        });



    }

    this.addNewPhonePost = function(data, callback)
    {
        var selectQuery = "SELECT * FROM users_phone_number WHERE phone_number = '"+data.phone+"' and status != 4";
        var insertQuery = "INSERT INTO users_phone_number SET ?";
        var insertData = {
            phone_number : data.phone,
            user_login_id : data.userid,
            is_primary : 0,
            status : 0,
            otp : data.otp,
            expiry_date : new Date()
        }

        conn.query(selectQuery, false, function(err, result){
            if(err)
            {
                console.log(err)
            }

            if(result.length > 0)
            {
                callback(err, {success : false, msg : " User phone number already exists "});
            }else{
                conn.query(insertQuery, insertData, function(err, result1){
                    if(err)
                    {
                        console.log(err);
                    }
                    conn.query(selectQuery, false, function(err, result2){
                        if(err)
                        {
                            console.log(err);
                        }
                        callback(err,result2);
                    })
                });              
            }
        });



    }
    this.activeEmail = function(data,callback)
    {
        userSql = "SELECT * FROM user_login WHERE id = "+data.userid+" and password = '"+data.password+"'";
        updateQuery = "UPDATE users_email SET status = 1 WHERE user_login_id = "+data.userid+" and id = "+data.gID+" and otp = '"+data.otp+"'";
        selectSql = "SELECT * FROM users_email WHERE id = "+data.gID;
        conn.query(userSql, false,  function(err, result){
            if(err)
            {
                console.log(err);
            }
            if(result.length > 0)
            {
                conn.query(updateQuery, false, function(err1, result1){
                    if(err1)
                    {
                        console.log(err1);
                    }
                    if(result1.affectedRows == 0)
                    {
                        callback(err, {success:false, msg : "Incorrect Otp or something went wrong, Please try again"})
                    }else{
                         conn.query(selectSql, false, function(err3, res3){
                             if(err3)
                             {
                                 console.log(err3);
                             }
                             callback(err3, res3);
                         })   
                    }
                });
            }else{
                callback(err, {success:false, msg : "User password incorrect"})
            }
        });
    }


    this.activePhone = function(data,callback)
    {
        userSql = "SELECT * FROM user_login WHERE id = "+data.userid+" and password = '"+data.password+"'";
        updateQuery = "UPDATE users_phone_number SET status = 1 WHERE user_login_id = "+data.userid+" and id = "+data.gID+" and otp = '"+data.otp+"'";
        selectSql = "SELECT * FROM users_phone_number WHERE id = "+data.gID;
        conn.query(userSql, false,  function(err, result){
            if(err)
            {
                console.log(err);
            }
            if(result.length > 0)
            {
                conn.query(updateQuery, false, function(err1, result1){
                    if(err1)
                    {
                        console.log(err1);
                    }
                    if(result1.affectedRows == 0)
                    {
                        callback(err, {success:false, msg : "Incorrect Otp or something went wrong, Please try again"})
                    }else{
                         conn.query(selectSql, false, function(err3, res3){
                             if(err3)
                             {
                                 console.log(err3);
                             }
                             callback(err3, res3);
                         })   
                    }
                });
            }else{
                callback(err, {success:false, msg : "User password incorrect"})
            }
        });
    }
    this.setPrimary = function(data, callback)
    {
        var sql = "SELECT * FROM users_email WHERE id = "+data.id;
        conn.query(sql, false, function(err, result){
            if(result[0].status == 0)
            {
                callback(err, {success : false,msg :"Please verify your account first" });
            }else{

                updateQuery1 = "UPDATE user_login SET email = '"+result[0].email+"' WHERE id = "+data.userid;
                updateQuery2 = "UPDATE users_email SET is_primary = 0 WHERE user_login_id = "+data.userid;
                updateQuery3 = "UPDATE users_email SET is_primary = 1 WHERE user_login_id = "+data.userid+" and id = "+data.id;
                conn.query(updateQuery1, false,function(err1, result1)
                {
                    console.log(123)
                    if(err1)
                    {
                        console.log(err1);
                    }
                    conn.query(updateQuery2, false,function(err2, result2){
                        console.log(12)
                        if(err2)
                        {
                            console.log(err2);
                        }
                        conn.query(updateQuery3, false,function(err3, result3){
                            console.log(1)
                            if(err3)
                            {
                                console.log(err3);
                            }
                            var selectSql = "SELECT * FROM users_email WHERE user_login_id = "+data.userid;
                            conn.query(selectSql, false,function(err4, result4){
                                if(err4)
                                {
                                    console.log(err4);
                                }
                                callback(err4,result4);
                            })
                        })
                    })

                })
            }
        })
    }


    this.setPrimaryPhone = function(data, callback)
    {
        var sql = "SELECT * FROM users_phone_number WHERE id = "+data.id;
        conn.query(sql, false, function(err, result){
            if(result[0].status == 0)
            {
                callback(err, {success : false,msg :"Please verify your account first" });
            }else{
                if(data.userType == 2)
                {
                    updateQuery1 = "UPDATE users SET phone = '"+result[0].phone_number+"' WHERE login_id = "+data.userid;
                }else{
                    updateQuery1 = "UPDATE bussiness_profile SET phone = '"+result[0].phone_number+"' WHERE loginid = "+data.userid;
                }
                updateQuery2 = "UPDATE users_phone_number SET is_primary = 0 WHERE user_login_id = "+data.userid;
                updateQuery3 = "UPDATE users_phone_number SET is_primary = 1 WHERE user_login_id = "+data.userid+" and id = "+data.id;
                conn.query(updateQuery1, false,function(err1, result1)
                {
                    if(err1)
                    {
                        console.log(err1);
                    }
                    conn.query(updateQuery2, false,function(err2, result2){
                        if(err2)
                        {
                            console.log(err2);
                        }
                        conn.query(updateQuery3, false,function(err3, result3){
                            if(err3)
                            {
                                console.log(err3);
                            }
                            var selectSql = "SELECT * FROM users_phone_number WHERE user_login_id = "+data.userid;
                            conn.query(selectSql, false,function(err4, result4){
                                if(err4)
                                {
                                    console.log(err4);
                                }
                                callback(err4,result4);
                            })
                        })
                    })

                })
            }
        })
    }
    this.removeEmail = function(data, callback)
    {
        var deleteQuery = "DELETE FROM `users_email` WHERE id = "+data.id;
        conn.query(deleteQuery, false,function(err3, result3){
            if(err3)
            {
                console.log(err3);
            }
            var selectSql = "SELECT * FROM users_email WHERE user_login_id = "+data.userid;
            conn.query(selectSql, false,function(err4, result4){
                if(err4)
                {
                    console.log(err4);
                }
                callback(err4,result4);
            })
        })
    }

    this.getAllcountry = function(data, callback)
    {
        var query = "select * FROM master_country WHERE status = 1";
        conn.query(query, false, function(err, result){
            if(err)
            {
                console.log(err);
            }
            callback(err, result);
        });
    }

    this.getAllUnfollow = function(data, callback)
    {
        var query = "SELECT t1.*,t2.name FROM `users_connection` AS t1 LEFT JOIN user_login AS t2 ON t2.id =t1.connection_id where t1.status =4 and t1.user_login_id ="+data;
       
        conn.query(query, false, function(err, result){
            if(err)
            {
                console.log(err);
            }
            callback(err, result);
        });
    }

     this.getPassword = function(data, callback)
    {
        var query = "select * from users_activity_log where user_login_id ="+data+" order by created_date desc"
       
        conn.query(query, false, function(err, result){
            if(err)
            {
                console.log(err);
            }
            callback(err, result);
        });
    }

    this.unBlock = function(data, callback)
    {
        var query1="delete from users_block where user_login_id="+data.user_login_id+" and blocked_user_id="+data.id
        var query = "update users_connection SET?where (user_login_id ="+data.id+" or connection_id="+data.id+") and (user_login_id ="+data.user_login_id+" or connection_id="+data.user_login_id+")"
        formdata={
            status:1,
            created_date:new Date()
        }
        conn.query(query, formdata, function(err, result){
            if(err)
            {
                console.log(err);
            }
              conn.query(query1, function(err, result1){
            if(err)
            {
                console.log(err);
            }
            callback(err, result1);
          });
       });
    }

    this.removePhone = function(data, callback)
    {
        var deleteQuery = "DELETE FROM `users_phone_number` WHERE id = "+data.id;
        conn.query(deleteQuery, false,function(err3, result3){
            if(err3)
            {
                console.log(err3);
            }
            var selectSql = "SELECT * FROM users_phone_number WHERE user_login_id = "+data.userid;
            conn.query(selectSql, false,function(err4, result4){
                if(err4)
                {
                    console.log(err4);
                }
                callback(err4,result4);
            })
        })
    }
    this.deleteaccount = function(data, callback)
    {
        console.log(data);
        var selectQuery = "SELECT id FROM user_login WHERE id = "+data.userid+" and password = '"+data.password+"'";
        var deleteQuery = "UPDATE user_login SET status = 3 WHERE id = "+data.userid;
        var deleteQuery2 = "DELETE FROM user_login_log WHERE user_login_id = "+data.userid;
        var deleteQuery3 = "UPDATE users_email SET status = 4 WHERE user_login_id = "+data.userid;
        var deleteQuery4 = "UPDATE users_phone_number SET status = 4 WHERE user_login_id = "+data.userid;
        var deleteQuery5 = "UPDATE users_post SET status = 2 WHERE user_login_id = "+data.userid;

        conn.query(selectQuery, false, function(err, res){
            if(res.length > 0)
            {
                conn.query(deleteQuery, false, function(err, resu){
                    if(resu.affectedRows > 0)
                    {
                        conn.query(deleteQuery2, false, function(err, result){
                            conn.query(deleteQuery3, false, function(err, result){
                                conn.query(deleteQuery4, false, function(err, result){
                                    conn.query(deleteQuery5, false, function(err, result){
                                        callback(err, {success : true, msg : "Account deleted successfully"});
                                    });
                                });
                            });
                        });
                    }else{
                        callback(err, {success : false, msg : "Please try again"});
                    }
                });
            }else{
                callback(err, {success : false, msg : "Incorrect password"});
            }
        });
    }
 /*   this.historyPref = function(data, callback)
    {
        console.log()
        if(parseInt(data.time) == 1)
        {
            var insertData = {
                user_login_id : data.userid,
                history_preference : data.time,
                history_preference : data.time,
                history_unit_type : data.time
            }

            var updateQuery = "UPDATE users_setting SET history_preference = "+data.time+" , histroy_count_days = "+data.days+" , history_unit_type = "+data.unit+" WHERE user_login_id = "+data.userid;

        }else{
            var insertData = {
                user_login_id : data.userid,
                history_preference : data.time
            }
            var updateQuery = "UPDATE users_setting SET history_preference = "+data.time+" WHERE user_login_id = "+data.userid;
        }
        var query = "SELECT * FROM users_setting WHERE user_login_id = "+data.userid;
        var insertQuery = "INSERT INTO users_setting SET ?";
       
        conn.query(query, false, function(err, result){
            if(err)
            {
                console.log(err);
            }
            if(result.length > 0)
            {
                conn.query(updateQuery, false, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }else{
                conn.query(insertQuery, insertData, function(err, result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result);
                });
            }
        });
    }*/

    this.historyPref = function(data, callback){
        var sql = "DELETE FROM search_log WHERE search_datetime <= date('"+data.date_time+"') and user_id = "+data.userid;
        var sql_1 = "DELETE FROM view_log WHERE created_date <= date('"+data.date_time+"') and user_login_id = "+data.userid;
        conn.query(sql, false, function(err, res){
            if(err)
            {
                console.log(err);
            }

            conn.query(sql_1, false, function(err, res){
                if(err)
                {
                    console.log(err);
                }
                callback(err, res);
            });
        });
    }

    this.closeOpp = function(data, callback)
    {
        var que = "UPDATE `opportunities` SET is_closed = 0 WHERE id = "+data.id;
        conn.query(que, false, function(err, res){
            if(err)
            {
                console.log(err);
            }
            callback(err, res);
        })
    }

          this.getmasterNotification = function(callback)
    {
        var query="select * from master_notification"
        conn.query(query,false,function(err,data){
            if(err)
            {
                console.log(err);
            }
            callback(err,data)
        })   
    }

           this.getviewierData = function(data,callback)
    {
        var query="select viewers_also_viewed from users_setting where user_login_id = "+data
        conn.query(query,false,function(err,data){
            if(err)
            {
                console.log(err);
            }
            callback(err,data)
        })   
    }
    this.changeNotificationSettings = function(data,callback)
    {
        var sql = "UPDATE users_notification_setting SET status = "+data.type+" WHERE user_login_id = "+data.user_id+" and notification_type = "+data.id;
        conn.query(sql, false, function(err, data){
            if(err)
            {
                console.log(err);
            }
            callback(err, data);
        });
    }
    this.notificationSetting = function(data, callback)
    {
        var sql = "SELECT notification_type FROM users_notification_setting WHERE user_login_id = "+data.data+" and status = 1";
        conn.query(sql, false, function(err, data){
            if(err)
            {
                console.log(err)
            }
            callback(err, data);
        })
    }
}

module.exports=database;
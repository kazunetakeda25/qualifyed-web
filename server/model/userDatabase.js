var conn = require('../config/connection');

var database = new function() {




    this.insertInUserProfile = function(data, callback) {
        var sql = "insert into user_login SET?";
        var aboutYou = {
                password: data.passwordField,
                name: data.fname + ' ' + data.lname,
                type: 2,
                email: data.email,
                currentdate: new Date(),
                updatedate: new Date()
            }
            // console.log(aboutYou);

        conn.query(sql, aboutYou, function(err, result) {
            if (err) {
                // console.log(err);
            }
            callback(err, result.insertId);
        })
    }

    this.getSkills = function(callback) {
        var sql = "SELECT title as name from master_skills where status = 1";

        conn.query(sql, function(err, result) {
            if (err) {
                console.log(err);
            }
            callback(err, result);
        })
    }
    this.insertInPersonalInfo = function(data, callback) {
        // console.log("datadata======================,", data);
        var sql = "insert into users SET?";
        var aboutYou = {
            login_id: data.login_id,
            fname: data.fname,
            lname: data.lname,
            name: data.fname + ' ' + data.lname,
            email: data.email,
            phone: data.phone,
            country_id: data.country,

            state_id: data.state,
            city: data.city,

            zipCode: data.zipCode,
            dob: data.dob,

            gender: data.gender,
            // profile_pic_id: data.uploadPicture,
            // resume_file_id: data.uploadResume,
            // bio_video_id: data.uploadBioVideo,
            created_date: new Date(),
            updated_date: new Date(),
            password: data.passwordField,

        }
        var searchData = {
                entity_id: 2,
                element_id: data.login_id,
                user_login_id: data.login_id,
                is_published: 1,
                title: data.fname + ' ' + data.lname,
                email: data.email,
                phone: data.phone,
                country: data.country,
                state: data.state,
                city: data.city,
                degree: 0,
                skills: 0,
                //pic_path : data.uploadPicture,
            }
            // console.log(aboutYou);
        conn.query(sql, aboutYou, function(err, data) {

            if (err) {
                console.log(err);
            }

            var insertSql = "insert into search SET ?";
            conn.query(insertSql, searchData, function(err, data) {
                if (err) {
                    console.log(err);
                }
            })
            callback(err, data);
            // console.log("data  :"+JSON.stringify(data));
        })
    }

    this.updatesearchPic_id = function(data, callback) {
        var sql = "update search SET? where element_id='" + data.loginId + "'";
        var formdata = {
            pic_path: data.media_id,
        }
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err)
            }
            callback(err, data)
        })
    }


    //updateIn PersonalInfo
    this.updatePersonalInfo = function(data, callback) {
        var sql = "update users SET ? where login_id=" + data.id
        formdata = {
            fname: data.fname,
            lname: data.lname,
            name: data.fname + ' ' + data.lname,
            email: data.email,
            phone: data.phone,
            country_id: data.country,

            state_id: data.state,
            city: data.city,

            zipCode: data.zipCode,
            dob: data.dob,

            gender: data.gender,

        }
        conn.query(sql, formdata, function(err, result) {
            if (err) {
                console.log(err);
            }

            callback(err, result)
        })
    }

    // this.insertInReference = function(data, callback) {

    //     console.log("ref data:   " + JSON.stringify(data));
    //     var sql = "insert into users_references SET ?"

    //         var formdata = {
    //             login_id: data.login_id,
    //             Name: data.refName,
    //             Relationship: data.refRelation,
    //             years_known: data.yearsKnown,
    //             months_known: data.monthsKnown,
    //             employer: data.employer,
    //             current_position: data.currentPosition,
    //             phone_number: data.phoneRef,
    //             email_address: data.refEmail,
    //         }
    //         // console.log("refdata  :" + formdata)
    //         conn.query(sql, formdata, function(err, data) {if (err) {
    //             console.log(err);
    //         }
    //             callback();
    //         });

    //     callback();
    // }

    this.insertInReference = function(data, callback) {
        // console.log("mesg",data);
        // var data = data.sections[0];
        var sql = "insert into users_references SET ?"
        if (data.refName != '' && data.refName != undefined && data.refName != null) {
            var formdata = {
                    login_id: data.login_id,
                    Name: data.refName,
                    Relationship: data.refRelation,
                    years_known: data.yearsKnown,
                    months_known: data.monthsKnown,
                    employer: data.employer,
                    current_position: data.currentPosition,
                    phone_number: data.phoneRef,
                    email_address: data.refEmail,
                }
                // console.log('formdata======>>>>>>>',formdata);
            conn.query(sql, formdata, function(err, data) {
                callback(err, data);
            });
        }

    }
    this.insertInOtherInfo = function(data, callback) {
        console.log("other data----------------", data)

        var sql = "insert into users_other_info SET?"
        var update = "update search set description = '" + data.aboutYourSelf + "' where element_id = " + data.login_id;
        var formData = {

            login_id: data.login_id,
            primary_field_interest_id: data.primaryFieldIntrest,
            secondry_interest_id: data.secondaryFieldInterest,
            work_additional_info: data.discriptionAboutWork,
            hours_per_week: data.workHoursPerWeek,
            travel_location: data.willingToTravel,
            is_transportation: data.transportation,
            additional_skill: data.skills,
            about_bio: data.aboutYourSelf,
            upadated_date: new Date()

        }

        if (data.secondaryFieldInterest == null || data.secondaryFieldInterest == '' || data.secondaryFieldInterest == undefined) {
            formData.secondry_interest_id = 0;
        }

        conn.query(sql, formData, function(err, data) {
            if (err) {
                console.log(err);
            }

            conn.query(update, function(err, data22) {
                if (err) {
                    console.log(err);
                }
            })

            callback(err, data);
        })
    }



    //update skills

    // this.updateSkills=function(data,callback){
    // console.log("ddddddddddddd",JSON.stringify(data))
    //     var json = [];
    //     json.push(data);
    //     var get_sql="select additional_skill from users_other_info where login_id ="+data.id;

    //     conn.query(get_sql,false,function(err,result){
    //         if(result && result[0].additional_skill != '' && result[0].additional_skill != undefined && result != undefined)
    //         {
    //             newJson = JSON.parse(result[0].additional_skill);
    //             for (var i = newJson.length - 1; i >= 0; i--) {
    //                 json.push(newJson[i]);
    //             }
    //         }
    // console.log("=======>",JSON.stringify(json))
    //         formdata={
    //              additional_skill:JSON.stringify(json),
    //         }

    //         console.log('formdata',formdata);

    //         var sql="update users_other_info SET ? where login_id ="+data.id;
    //         conn.query(sql,formdata,function(err,result){
    //             if(err)
    //             {
    //                 console.log(err);
    //             }
    //             callback(err,result)
    //         })
    //     })
    // }
    this.getUserSkills = function(data, callback) {
            var search_sql = "SELECT * FROM user_skills WHERE user_login_id = " + data.userid;
            conn.query(search_sql, function(err, result) {
                if (err) {
                    console.log(err);
                }
                callback(err, result);
            })
        }
        // this.getSkillsId = function(data, callback)
        // {
        //   var search_sql = "SELECT id as id , title as name FROM master_skills WHERE id IN ("+data.ids+")";
        //   conn.query(search_sql,function(err,result){
        //     if(err)
        //     {
        //       console.log(err);
        //     }
        //     callback(err, result);
        //   })
        // }

    this.updateSkills = function(data, callback) {
            var insert_sql = "insert into user_skills (skills, user_login_id) VALUES ('" + data.ids + "'," + data.userid + ")";
            var search_sql = "SELECT * FROM user_skills WHERE user_login_id = " + data.userid;
            var update_sql = "UPDATE user_skills SET skills = '" + data.ids + "' WHERE user_login_id = " + data.userid;
            conn.query(search_sql, function(err, result) {
                if (err) {
                    console.log(err);
                }
                if (result.length > 0) {
                    conn.query(update_sql, function(err1, result1) {
                        if (err1) {
                            console.log(err1)
                        }
                        callback(err1, result1)
                    });
                } else {
                    conn.query(insert_sql, function(err2, result2) {
                        if (err2) {
                            console.log(err2)
                        }
                        callback(err2, result2)
                    });
                }
            })
        }
        //contact_us
    this.contactUs = function(data, callback) {

        var sql = "insert into contact_us SET?"
        var formdata = {

                login_id: data.id,
                email: data.fromemail,
                reason: data.reason,
                tell_us_about: data.about,
                created_date: new Date(),
                user_type: data.usertype


            }
            // console.log("refdata  :" + formdata)
        conn.query(sql, formdata, function(err, data) {
            callback(err, data);
        })
    }


    this.contactUs1 = function(data, callback) {

        console.log("databsae logout data:   ", JSON.stringify(data));
        var sql = "insert into contact_us SET?"
        var formdata = {

            login_id: 0,
            email: data.fromemail,
            reason: data.reason,
            tell_us_about: data.about,
            created_date: new Date(),
            user_type: 0


        }
        console.log("refdata  :" + formdata)
        conn.query(sql, formdata, function(err, data) {
            callback(err, data);
        })
    }

    // this.updateEduaction=function(data,callback){
    //   console.log("fffffffff>",data)
    //   var sql="update users_other_info SET ? where login_id="+data.id
    //   formdata={

    //            education: JSON.stringify(data),

    //   }
    //   conn.query(sql,formdata,function(err,result){
    //           if(err)
    //         {
    //           console.log(err);
    //         }

    //     callback(err,result)
    //   })
    // }


    /*this.experience=function(data,callback){
    // console.log("ddddddddddddd",JSON.stringify(data))
        var json = [];
        json.push(data);
        var get_sql="select experience from users_other_info where login_id ="+data.id;

        conn.query(get_sql,false,function(err,result){
            if(result && result[0].experience != '' && result[0].experience != undefined && result != undefined)
            {
                newJson = JSON.parse(result[0].experience);
                for (var i = newJson.length - 1; i >= 0; i--) {
                    json.push(newJson[i]);
                }
            }
    // console.log("=======>",JSON.stringify(json))
            formdata={
                 experience:JSON.stringify(json),
            }

            // console.log('formdata',formdata);

            var sql="update users_other_info SET ? where login_id ="+data.id;
            conn.query(sql,formdata,function(err,result){
                if(err)
                {
                    console.log(err);
                }
                callback(err,result)
            })
        })
    }*/


    this.getExperience = function(data, callback) {

            conn.query(sql, false, function(err, result) {
                if (err) {
                    console.log(err);
                }
                callback(err, result)
            })
        }
        //

    //skills
    //update work
    this.updateWork = function(data, callback) {
        // console.log("database",data.id)
        var sql = "update users_other_info SET ? where login_id=" + data.id
        formdata = {

            work_additional_info: data.discriptionAboutWork,
            hours_per_week: data.workHoursPerWeek,
            travel_location: data.willingToTravel,
            is_transportation: data.transportation,
            about_bio: data.aboutYourSelf,
        }
        conn.query(sql, formdata, function(err, result) {
            if (err) {
                console.log(err);
            }

            callback(err, result)
        })
    }

    this.updateInWorkinhHours = function(data, callback) {
        console.log("woddrk", data);

        var sql = "update users_working_hours SET ? where login_id=" + data.user_login_id + " AND day = '" + data.day + "'";
        var formData = {
            woking_hours: data.working_hours,
        }

        conn.query(sql, formData, function(err, data) {
            if (err) {
                console.log("error", err);
            }
            callback(err, data);
        })
    }

    //
    //updateIn PersonalInfo

    // this.updateEduaction=function(data,callback){
    //   console.log("database",JSON.stringify(data));
    //   var sql="insert into users_education SET ? "


    // if(data.collage_attending != '' && data.degree != '' && data.collageStartDate != '' && data.collageEndDate != '')
    // {

    //   formdata={
    //     user_login_id: data.id,
    //     school_name: data.collage_attending,
    //     degree: data.degree,
    //     collage_start_date: data.collageStartDate,
    //     collage_end_date: data.collageEndDate,
    //     created_date:new Date()
    //   }
    //   conn.query(sql,formdata,function(err,result){
    //           if(err)
    //         {
    //           console.log(err);
    //         }

    //     callback(err,result)
    //   })
    // }
    //   callback(false,false
    //     );
    // }

    this.updateEduaction1 = function(data, callback) {

        // var sql="insert into users_education SET ? "
        // formdata={
        //   user_login_id: data.login_id,
        //   school_name: data.collegeAttending,
        //   degree: data.degree,
        //   collage_start_date: data.collegeStartDate,
        //   collage_end_date: data.CollegeEndDate,
        //   created_date:new Date()
        // }
        // conn.query(sql,formdata,function(err,result){
        //   if(err)
        //   {
        //     console.log(err);
        //   }
        //   callback(err,result)
        // })
        var sql = "insert into users_education SET ? "
        if (data.collegeAttending != '' && data.degree != '' && data.collegeStartDate != '' && data.CollegeEndDate != '') {
            formdata = {
                user_login_id: data.login_id,
                school_name: data.collegeAttending,
                degree: data.degree,
                collage_start_date: data.collegeStartDate,
                collage_end_date: data.CollegeEndDate,
                created_date: new Date()

            }
            conn.query(sql, formdata, function(err, result) {
                if (err) {
                    console.log(err);
                }

                callback(err, result)
            })
        }
        callback(false, false);
    }


    //Edit education 

    this.updateEduaction = function(data, callback) {
        console.log("education", JSON.stringify(data));

        var sql = "insert into users_education SET ? "
        if (data.collage_attending != '' && data.degree != '' && data.collageStartDate != '' && data.collageEndDate != '') {
            formdata = {
                user_login_id: data.id,
                school_name: data.collage_attending,
                degree: data.degree,
                collage_start_date: data.collageStartDate,
                collage_end_date: data.collageEndDate,
                created_date: new Date()

            }
            conn.query(sql, formdata, function(err, result) {
                if (err) {
                    console.log(err);
                }

                callback(err, result)
            })
        }
        callback(false, false);
    }
    this.editEduaction = function(data, callback) {
        console.log("education", JSON.stringify(data));
        var sql = "update users_education SET ? where id=" + data.id
        formdata = {
            school_name: data.collage_attending,
            degree: data.degree,
            collage_start_date: data.start,
            collage_end_date: data.collageEndDate,
            created_date: new Date()

        }
        conn.query(sql, formdata, function(err, result) {
            if (err) {
                console.log(err);
            }

            callback(err, result)
        })
    }


    //insert  experience
    this.experience = function(data, callback) {
        // console.log("database",JSON.stringify(data));
        var sql = "insert into users_experience SET ? "
        formdata = {
            user_login_id: data.id,
            position: data.position,
            employer: data.employer,
            start_date: data.experienceStart,
            end_date: data.experienceEnd,
            created_date: new Date()

        }
        conn.query(sql, formdata, function(err, result) {
            if (err) {
                console.log(err);
            }

            callback(err, result)
        })
    }



    //update  experience
    this.updateExperience = function(data, callback) {
        console.log("database", JSON.stringify(data));
        var sql = "update users_experience SET ? where id=" + data.id
        formdata = {
            position: data.position,
            employer: data.employer,
            start_date: data.experienceStart,
            end_date: data.experienceEnd,
            created_date: new Date()

        }
        conn.query(sql, formdata, function(err, result) {
            if (err) {
                console.log(err);
            }

            callback(err, result)
        })
    }


    // delete exprience 
    this.deleteExperience = function(data, callback) {

        var sql = "delete from users_experience where id=" + data.id

        conn.query(sql, function(err, result) {
            if (err) {
                console.log(err);
            }

            callback(err, result)
        })
    }



    //delete Education
    this.deleteEducation = function(data, callback) {

            var sql = "delete from users_education where id=" + data.id

            conn.query(sql, function(err, result) {
                if (err) {
                    console.log(err);
                }

                callback(err, result)
            })
        }
        // this.updateEduaction=function(data,callback){
        // console.log("ddddddddddddd",JSON.stringify(data))
        //     var json = [];
        //     json.push(data);
        //     var get_sql="select education from users_other_info where login_id ="+data.id;

    //     conn.query(get_sql,false,function(err,result){
    //         if(result && result[0].education != '' && result[0].education != undefined && result != undefined)
    //         {
    //             newJson = JSON.parse(result[0].education);
    //             for (var i = newJson.length - 1; i >= 0; i--) {
    //                 json.push(newJson[i]);
    //             }
    //         }
    // console.log("=======>",JSON.stringify(json))
    //         formdata={
    //              education:JSON.stringify(json),
    //         }

    //         console.log('formdata',formdata);

    //         var sql="update users_other_info SET ? where login_id ="+data.id;
    //         conn.query(sql,formdata,function(err,result){
    //             if(err)
    //             {
    //                 console.log(err);
    //             }
    //             callback(err,result)
    //         })
    //     })
    // }

    this.getExperience = function(data, callback) {

        conn.query(sql, false, function(err, result) {
            if (err) {
                console.log(err);
            }
            callback(err, result)
        })
    }

    this.insertInWorkinhHours = function(data, callback) {

        // console.log("database ",JSON.stringify(data))
        var sql = "insert into users_working_hours SET?"
        var formData = {

            login_id: data.user_login_id,
            day: data.day,
            woking_hours: data.working_hours,
            is_all: 0
        }

        conn.query(sql, formData, function(err, data) {
            if (err) {
                // console.log(err);
            }
            callback(err, data);
        })
    }



    this.insertImage = function(data, callback) {

        // console.log("database",JSON.stringify(data))
        var sql = "insert into files_record SET?"
        var formData = {

            // login_id: data.login_id,
            name: data.devimg,
            file_type: 1,
            file_size: data.size,
            user_login_id: data.login_id,
            created_date: new Date()

        }

        conn.query(sql, formData, function(err, data) {
            if (err) {
                console.log(err);
            }
            // console.log(data)
            callback(err, data.insertId);
        })
    }
    this.insertResume = function(data, callback) {


        var sql = "insert into files_record SET?"
        var formData = {

            // login_id: data.login_id,
            name: data.devResume,
            file_type: 3,
            file_size: data.size,
            user_login_id: data.login_id,
            created_date: new Date()

        }

        conn.query(sql, formData, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data.insertId);
        })
    }

    this.insertBio = function(data, callback) {


        var sql = "insert into files_record SET ?"
        var formData = {

            // login_id: data.login_id,
            name: data.devBio,
            file_size: data.size,
            user_login_id: data.login_id,
            file_type: 2,
            created_date: new Date()

        }

        conn.query(sql, formData, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data.insertId);
        })
    }

    this.updateImage = function(data, callback) {
        var sql = "update  users SET? where login_id='" + data.loginId + "'";
        var aboutYou = {
            profile_pic_id: data.media_id,
        }
        conn.query(sql, aboutYou, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.updateResume = function(data, callback) {
        var sql = "update  users SET? where login_id='" + data.loginId + "'";
        var aboutYou = {
            resume_file_id: data.media_id,
        }
        conn.query(sql, aboutYou, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.updateVideo = function(data, callback) {
        var sql = "update  users SET? where login_id='" + data.loginId + "'";
        var aboutYou = {
            bio_video_id: data.media_id,
        }
        conn.query(sql, aboutYou, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }



    // resume_file_id: data.resume_id,
    // bio_video_id: data.bio_id,

    //
    this.updateFormPost = function(data, callback) {
        // console.log('update_dadddddddddddta ',JSON.stringify(data));
        // console.log("update11 : "+data.id);
        var sql = "update  users_post SET? where user_login_id='" + data.id + "'";
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

    //


    this.postImage = function(data, callback) {
        // console.log("dataBAse"+JSON.stringify(data))


        var sql = "insert into files_record SET?"
        var formData = {

            // login_id: data.login_id,
            user_login_id: data.id,
            name: data.originalname,
            file_type: 1,
            file_size: data.size,
            created_date: new Date()

        }

        conn.query(sql, formData, function(err, data) {
            if (err) {
                // console.log(err);
            }
            callback(err, data.insertId);
        })
    }

    //

    this.postVideo = function(data, callback) {
        // console.log("dataBAse video "+JSON.stringify(data))


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
                // console.log(err);
            }
            callback(err, data.insertId);
        })
    }

    //

    //

    this.postDoc = function(data, callback) {
        // console.log("dataBAse doc"+JSON.stringify(data))


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
                // console.log(err);
            }
            callback(err, data.insertId);
        })
    }

    //

    this.Country = function(callback) {
        conn.query("select * from master_country where status = 1 ", function(err, result) {
            callback(err, result);
        })
    }

    this.masterhour = function(callback) {
        conn.query("select * from master_working_hours where status = 1 ", function(err, result) {
            callback(err, result);
        })
    }
    this.Reason = function(callback) {
        conn.query("select * from master_contact_reason where status = 1 ", function(err, result) {
            callback(err, result);
        })
    }

    this.Primaryfield = function(callback) {
        conn.query("select * from master_primary_field_interest where status = 1 ", function(err, result) {
            callback(err, result);
        })
    }

    // this.myworkinghour = function(callback) {
    //   console.log("data",data.userid)
    //         conn.query("select * from users_working_hours where status = 1 ", function(err, result) {
    //             callback(err, result);
    //         })
    //     }

    this.myworkinghour = function(data, callback) {
        //console.log("data ssssssssssss"+data.userid);
        // conn.query("select fname from users where login_id="+data, function(err, data) {
        conn.query("SELECT * FROM `users_working_hours` WHERE login_id  =" + data.userid, function(err, data) {

            callback(err, data);
        })
    }


    //  this.emailbody = function(data,callback) {
    // console.log("data===>"+data.id);
    //     // conn.query("select fname from users where login_id="+data, function(err, data) {
    //     conn.query("SELECT * FROM `email_templates` WHERE id  ="+data.id, function(err, data) {

    //         callback(err, data);
    //     })
    // }
    this.Secondaryfield = function(callback) {
        conn.query("select * from master_secondary_field_interest where status = 1 ", function(err, result) {
            callback(err, result);
        })
    }
    this.states = function(callback) {
        conn.query("select * from master_state where status = 1 ", function(err, result) {
            callback(err, result);
        })
    }

    this.location = function(callback) {
        conn.query("select * from master_travel_location where status = 1 ", function(err, result) {
            callback(err, result);
        })
    }
    this.workinghour = function(callback) {
        conn.query("select * from master_working_hours where status =1 ", function(err, result) {
            callback(err, result)
        })
    }
    this.City = function(data, callback) {
        // console.log(data);
        conn.query("select * from master_state where status=1 && country_id='" + data + "'", function(err, result) {
            callback(err, result);
        })
    }

    this.hours = function(data, callback) {
        conn.query("select title from master_working_hours where status=1 && id IN (" + data + ") order by id", function(err, result) {
            //console.log("result",result)

            callback(err, result);
        })
    }

    this.skillsid = function(data, callback) {
        // console.log("datadata",data)
        var a = "select * from master_skills where status = 1 AND id IN(" + data + ")"
        conn.query(a, function(err, result) {
            callback(err, result)
        })
    }
    this.checkMail = function(data, callback) {
        //console.log("email"+data.email)
        conn.query("select email from user_login where email='" + data.email + "'", function(err, data) {

            callback(err, data)
        })
    }

    this.userdata = function(data, callback) {
        // console.log("data"+JSON.stringify(data));
        // where name like '%"+data.country_id+"%' 
        conn.query("select * from user_login ", function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.createPost = function(data, callback) {
        console.log("data=========?>" + JSON.stringify(data));

        // console.log("data"+ data);
        var sql = "insert into users_post SET?"
        var formdata = {
            user_login_id: data.user_login_id,
            privacy: data.privacy,
            post: data.postName,
            media_id: '',
            created_date: new Date(),
            comment_count: 0,
            like_count: 0,
            parent_id: data.parentId

        }

        conn.query(sql, formdata, function(err, result) {
            if (err) {
                console.log(err);
            }
            // console.log(result);
            callback(err, result);
        })

    }


    this.removeSkills = function(data, callback) {
        console.log("=>database", JSON.stringify(data))
        var sql = "delete from user_skills where id=" + data.id

        conn.query(sql, function(err, result) {
            if (err) {
                console.log(err);
            }

            callback(err, result)
        })
    }

    this.editpost = function(data, callback) {
        var sql = "UPDATE users_post set ? WHERE user_login_id = '" + data.userid + "' AND id='" + data.id + "'";

        console.log("databsase sql", sql)
        var aboutYou = {

            post: data.postName,

        }
        console.log(aboutYou);
        conn.query(sql, aboutYou, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })
    }

    this.delpost = function(data, callback) {
        console.log("batabase del post", data)
        var sql = "update users_post set ? where id = '" + data.id + "' AND user_login_id = '" + data.userid + "'"
        console.log("sql del post", sql)
        var formdata = {
            status: 0
        }
        console.log("formdata", formdata)
        conn.query(sql, formdata, function(err, data) {
            if (err) {
                console.log(err);
            }
            callback(err, data);
        })

    }

    this.selectprimary = function(id, callback) {
        var sql = "SELECT * FROM `master_primary_field_interest` WHERE id = '" + id + "'"
        conn.query(sql, function(err, result) {
            callback(err, result)
        })
    }
}


module.exports = database;
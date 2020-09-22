var express = require('express');
var router = express.Router();
var database = require('../model/userDatabase');

const nodemailer = require("nodemailer");
var bodyParser = require('body-parser');
var md5 = require('md5');
var session = require('express-session');
var fs = require('fs');
var base64ToImage = require('base64-to-image');

router.use(bodyParser.json());

var multer = require('multer');
var path = require('path');
var imagepost;
var devimg;
var email;
var fname;
var user_profile_id;
var sess;

var userid;
var personalInfo;
router.get("/", function(req, res) {
    res.send("welcome to express")
})

router.get("/checkMD", function(req, res) {
    // console.log(md5("123456"));
});


router.use(express.static(path.join(__dirname, 'uploads')));
// headers and content type
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var transporter = nodemailer.createTransport({
    host: "",
    port: 2525,
    secure: false,
    auth: {
        user: '',
        pass: ''
    },

    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});


function sendMailer(message, cb) {
    var msg;
    transporter.sendMail(message, function(error) {
        if (error) {
            return msg = error;
        } else {
            return msg = "Mail Sent Succesfully";
        }
    });
    cb("NO ERROR", "SENT SUCESS");
}

router.post('/mailcheck', function(req, res) {
    var message = {
        from: '',
        to: this.email,
        subject: this.fname + 'Welcome To Qualifyed', //'Nodemailer is unicode friendly ✔', 
        html: '<h1>Welcome ,</h1>' + this.fname + '<h5>Qualifyed is the world largest professional network.</h5><h3>Thanks & Regards, <br> Team Qualifyed </h3>' //'Hello to myself!',
    };
    sendMailer(message, function(err, result) {
        console.log(result);
    });

});


//images
var images = multer.diskStorage({
    // destination
    destination: function(req, file, cb) {
        cb(null, './src/assets/uploads/images/')
    },
    filename: function(req, file, cb) {
        var imagename = Date.now() + '_' + file.originalname

        cb(null, imagename);
    }
});
var uploadImage = multer({
    storage: images
});


router.post("/images", uploadImage.array("uploads[]", 12), function(req, res) {

    if (req.body.imag != '') {

        if (req.body.image_name != 'Drag and drop or browse') {
            var base64Str = req.body.imag;
            var path = './src/assets/uploads/images/';

            var optionalObj = {
                'fileName': Date.now() + '_' + req.body.image_name
            };
            var imageInfo = base64ToImage(base64Str, path, optionalObj);
            var image_insert = optionalObj.fileName

        }
    }
    var data = {}

    if (req.body.image_name == 'Drag and drop or browse' || req.body.imag == '') {
        imagename = 'avatar.png';
        data.devimg = imagename;
        data.size = 0;
        data.login_id = req.session.login_id;

    } else {
        imagename = image_insert;
        data.size = req.body.image_size
        data.login_id = req.session.login_id
        var image_array = imagename.split('.');
        if (image_array[1] != 'png' && image_array[1] != 'jpg' && image_array[1] != 'jpeg') {
            fs.unlink(path, function(err) {
                if (err) {
                    console.log(err);
                }
            });
            imagename = 'avatar.png';

        } else {

            imagename = image_insert
            data.devimg = imagename
            data.size = req.body.image_size
            data.login_id = req.session.login_id
        }

    }
    database.insertImage(data, function(err, refImage) {
        if (err) {
            return res.json({
                msg: "dont save",
                status: false
            });
        } else {
            var loginId = req.session.login_id
                // sess.image_id = refImage
            database.updateImage({
                loginId: loginId,
                media_id: refImage
            }, function(err, resUpdate) {
                if (err) {
                    return res.json({
                        msg: "dont save",
                        status: false
                    });
                } else {
                    database.updatesearchPic_id({
                        loginId: loginId,
                        media_id: refImage
                    }, function(err, result1) {
                        if (err) {
                            return res.json({
                                status: false
                            })
                        }
                        return res.json({
                            status: true
                        })
                    })

                }

            })
        }

    });

});
//
var resume = multer.diskStorage({
    // destination
    destination: function(req, file, cb) {
        cb(null, './src/assets/uploads/resume/')
    },
    filename: function(req, file, cb) {

        var resumename = Date.now() + '_' + file.originalname

        cb(null, resumename);
    }
});
var uploadResume = multer({
    storage: resume
});

router.post("/resume", uploadResume.array("uploads[]", 12), function(req, res) {

    data = {}
    if (req.files[0] == undefined) {
        return res.json({
            status: false
        });
    } else {
        var originalname = req.files[0].filename
        data.size = req.files[0].size
        data.login_id = req.session.login_id
        data.devResume = originalname;


    }
    database.insertResume(data, function(err, refResume) {

        if (err) {
            return res.json({
                msg: "dont save",
                status: false
            });

        } else {
            var loginId = req.session.login_id
                // sess.resume_id = refResume
            database.updateResume({
                loginId: loginId,
                media_id: refResume
            }, function(err, resUpdate) {
                if (err) {
                    return res.json({
                        msg: "dont save",
                        status: false
                    });
                } else {
                    return res.json({
                        status: true
                    })
                }

            })
        }

    })
});


//
var video = multer.diskStorage({
    // destination
    destination: function(req, file, cb) {
        cb(null, './src/assets/uploads/bio_video/')
    },
    filename: function(req, file, cb) {

        var videoname = Date.now() + '_' + file.originalname

        cb(null, videoname);
    }
});
var uploadVideo = multer({
    storage: video
});

router.post("/bio_video", uploadVideo.array("uploads[]", 12), function(req, res) {
    data = {}
        // res.send(req.files);
    if (req.files[0] == undefined) {
        return res.json({
            status: false
        });
    } else {
        var originalname = req.files[0].filename
        data.size = req.files[0].size
        data.login_id = req.session.login_id
        data.devBio = originalname;



    }
    database.insertBio(data, function(err, refBio) {

        if (err) {
            return res.json({
                msg: "dont save",
                status: false
            });


        } else {

            // sess.bio_id = refBio
            var loginId = req.session.login_id
            database.updateVideo({
                loginId: loginId,
                media_id: refBio
            }, function(err, resUpdate) {
                if (err) {
                    return res.json({
                        msg: "dont save",
                        status: false
                    });
                } else {
                    return res.json({
                        status: true
                    })
                }

            })

        }
    });
});

//

//post Images
var images = multer.diskStorage({
    // destination
    destination: function(req, file, cb) {
        cb(null, './src/assets/createpost/images/')
    },
    filename: function(req, file, cb) {
        var imagename = Date.now() + '_' + file.originalname

        cb(null, imagename);
    }
});
var uploadImage = multer({
    storage: images
});


router.post("/imagepost", uploadImage.array("uploads[]", 12), function(req, res) {
    var name = req.files[0]
        // console.log("myfle   "+ JSON.stringify(name))
    if (req.files[0] == undefined) {
        return res.json({
            status: true
        })
    } else {
        var originalname = req.files[0].filename
        var size = req.files[0].size

        var id = req.session.userid
        data = {}
        data.id = id;
        data.originalname = originalname;
        data.size = size;


        database.postImage(data, function(err, infoRes) {
            if (err) {
                return res.json({
                    msg: "dont save",
                    status: false
                });
            } else {

                // console.log("imadddddgeID  : "+ infoRes)

                return res.json({
                    status: true,
                    post_id: infoRes
                });
            }

        });


    }
});


//

//post video
var video = multer.diskStorage({
    // destination
    destination: function(req, file, cb) {
        cb(null, './src/assets/createpost/video/')
    },
    filename: function(req, file, cb) {
        var videoname = Date.now() + '_' + file.originalname


        cb(null, videoname);
    }
});
var uploadVideo = multer({
    storage: video
});


router.post("/videopost", uploadVideo.array("uploads[]", 12), function(req, res) {
    if (req.files[0] == undefined) {
        return res.json({
            status: true
        })
    } else {
        var originalname = req.files[0].originalname
        var size = req.files[0].size
        var id = req.session.userid
        data = {}
        data.id = id;
        data.originalname = originalname;
        data.size = size;


        database.postVideo(data, function(err, infoRes) {
            if (err) {
                return res.json({
                    msg: "dont save",
                    status: false
                });
            } else {
                return res.json({
                    status: true,
                    post_id: infoRes
                });
            }

        });

    }
});


//
//post document
var docs = multer.diskStorage({
    // destination
    destination: function(req, file, cb) {
        cb(null, './src/assets/createpost/attatch/')
    },
    filename: function(req, file, cb) {
        var docsname = Date.now() + '_' + file.originalname

        cb(null, docsname);
    }
});
var uploadDocs = multer({
    storage: docs
});


router.post("/doc", uploadDocs.array("uploads[]", 12), function(req, res) {
    if (req.files[0] == undefined) {
        return res.json({
            status: true
        })
    } else {
        var originalname = req.files[0].originalname
        var size = req.files[0].size
        var id = req.session.userid
        data = {}
        data.id = id;
        data.originalname = originalname;
        data.size = size;
        database.postDoc(data, function(err, infoRes) {
            if (err) {
                return res.json({
                    msg: "dont save",
                    status: false
                });
            } else {

                return res.json({
                    status: true,
                    post_id: infoRes
                });
            }

        });

    }
});




router.post("/userpersonalinfo", function(req, res) {
    sess = req.session;
    var data = req.body;
    //     var dob=req.body.dob
    //     var newd = new Date(dob);
    // var year = newd.getFullYear();

    // var month = newd.getMonth();
    // var day = newd.getDate();
    // var changedDate = new Date(Date.UTC(year, month, day));
    // year = changedDate.getFullYear();
    // month = ((changedDate.getMonth() + 1) < 10 ? '0' : '') + (changedDate.getMonth() + 1);
    // day = (changedDate.getDate() < 10 ? '0' : '') + changedDate.getDate();

    // var formatedDate = year + "-" + month + "-" + day;

    // data.dob=formatedDate
    var newData = JSON.stringify(data);
    sess.personalInfo = newData;


})


router.post("/social", function(req, res) {

    var data = req.body;
    // console.log("data++ " +data);
})

router.post("/emailcheck", function(req, res) {
    var data = req.body;
    database.checkMail(data, function(err, data) {
        return res.json(data);
    })
})


router.post("/useraboutwork", function(req, res) {
    var reqBody = req.body;

    var newData1 = JSON.stringify(reqBody);
    sess.aboutwork = newData1;

})


router.post("/usercreatepassword", function(req, res) {

    var reqBody = req.body;
    var newData2 = JSON.stringify(reqBody);
    sess.reference = newData2;


    var refrence = JSON.parse(sess.reference);

    var personalInfo = JSON.parse(sess.personalInfo);
    var aboutwork = JSON.parse(sess.aboutwork);

    function extend(target) {
        var sources = [].slice.call(arguments, 1);
        sources.forEach(function(source) {
            for (var prop in source) {
                target[prop] = source[prop];
            }
        });
        return target;
    }

    var object3 = extend({}, refrence, personalInfo, aboutwork);
    var pass = object3.passwordField;
    var pass1 = object3.confirmPasswordField;

    const passwordField = md5(pass);
    const confirmPasswordField = md5(pass1);

    object3.passwordField = passwordField;
    object3.confirmPasswordField = passwordField;

    this.email = object3.email;
    this.fname = object3.fname;

    //  object3.image_id=sess.image_id;
    //  object3.resume_id=sess.resume_id;

    // object3.bio_id= sess.bio_id;








    database.insertInUserProfile(object3, function(err, insertRes) {


        if (err) {
            return res.json({
                msg: "dont save",
                status: false
            });
        } else {

            object3.login_id = insertRes
            req.session.login_id = insertRes;

            database.insertInPersonalInfo(object3, function(err, infoRes) {
                if (err) {
                    // return res.json({
                    //     msg: "dont save",
                    //     status: false
                    // });
                    // return false;

                }
            });
            for (var i = 0; i < refrence.sections.length; i++) {
                refrence.sections[i].login_id = object3.login_id;
                database.insertInReference(refrence.sections[i], function(err, infoRes) {
                    // if (err) {
                    //     return res.json({
                    //         msg: "dont save",
                    //         status: false
                    //     });
                    //     return false;

                    // }
                });
            }

            database.updateEduaction1(object3, function(err, infoRes) {
                if (err) {
                    return res.json({
                        msg: "dont save",
                        status: false
                    });
                    return false;

                }
            });

            database.insertInOtherInfo(object3, function(err, otherRes) {
                if (err) {
                    // return res.json({
                    //     msg: "dont save",
                    //     status: false
                    // })
                    // return false;
                }
            });
            //console.log("==>",JSON.stringify(object3.mytime))
            var user = {};
            var myObj = {};
            for (var k in object3.mytime) {

                if (object3.mytime[k] == '') {
                    object3.mytime[k] = 'n/a';
                }
                myObj.user_login_id = object3.login_id;
                myObj.day = k;

                myObj.working_hours = object3.mytime[k];
                database.insertInWorkinhHours(myObj, function(err, refWork) {

                });
            }
            return res.json({
                status: true
            })




        }

    });
});

router.get("/country", function(req, res) {
    database.Country(function(err, result) {
        return res.json(result);
    })
})
router.get("/masterhour", function(req, res) {
    database.masterhour(function(err, result) {
        return res.json(result);
    })
})

router.get("/states", function(req, res) {
    database.states(function(err, result) {
        return res.json(result);
    })
})
router.get("/getSkills", function(req, res) {
    database.getSkills(function(err, result) {
        return res.json(result);
    })
})

router.get("/location", function(req, res) {
    database.location(function(err, result) {
        return res.json(result);
    })
})

router.get("/workinghour", function(req, res) {
        database.workinghour(function(err, result) {
            return res.json(result);
        })
    })
    //reason

router.get("/reason", function(req, res) {
    database.Reason(function(err, result) {
        return res.json(result);
    })
})

router.post("/filter", function(req, res) {
    var data = req.body;
    // console.log("req :"+data);
    database.userdata(data, function(err, data) {
        return res.json(data);
    })
})

router.get("/primaryfield", function(req, res) {
    database.Primaryfield(function(err, result) {
        return res.json(result);
    })
})

router.get("/myworkinghour", function(req, res) {
        data = {}
        data.userid = req.session.userid;

        database.myworkinghour(data, function(err, result) {
            return res.json(result);
        })
    })
    // router.get("/emailbody",function(req,res){
    //  data={}
    //     data.id = 3;
    // console.log("data.id",data.id)
    //     database.emailbody(data,function(err,result){
    //         return res.json(result);
    //     })
    // })
router.get("/secondaryfield", function(req, res) {
    database.Secondaryfield(function(err, result) {
        return res.json(result);
    })
})

router.post("/city", function(req, res) {
    id = req.body.country_id
        // console.log(id);
    database.City(id, function(err, result) {
        return res.json(result);
    })
})

router.post("/myhours", function(req, res) {
    // console.log("----------->",req.body)

    id = req.body.id
    database.hours(id, function(err, result) {
        return res.json(result);
    })
})
router.post("/getskillsid", function(req, res) {
        id = req.body.id;
        database.skillsid(id, function(err, result) {
            return res.json(result);
        })
    })
    //
    //edit profle
router.post("/personalinformation", function(req, res) {
    var data = req.body;
    var newData = JSON.stringify(data);
    // console.log(newData);
    return res.json(newData);

})

router.post("/education", function(req, res) {
    var data = req.body;
    var newData = JSON.stringify(data);
    // console.log(newData);
    return res.json(newData);

})

//crreatepost

// router.post("/createPost",function(req,res){
//     var data=req.body;
//      this.data=object3.login_id
//     console.log("data"+JSON.stringify(data));

//   database.createPost(data,function(err,res){ 
//      return res.json({
//        msg:"data Saved",
//        status:true
//      })
//     })
//   })


router.post("/createPost/:id", function(req, res) {
    data = req.body

    var post_id = req.params.id;
    //console.log("uugu.......>:  "+ post_id)
    var info = {}


    data.id = req.session.userid
    database.createPost(data, function(err, data) {
        if (err) {
            return res.json({
                msg: "dont save",
                status: false
            })

        } else {


            info.id = req.session.userid;
            info.post_id = post_id;
            database.updateFormPost(info, function(err, resUpdate) {
                //  console.log("mydata : "+JSON.stringify(info))
                if (err) {
                    return res.json({
                        msg: "dont save",
                        status: false
                    });
                } else {
                    return res.json({
                        status: true
                    })
                }

            })
        }



    })
})

// update about api
router.post("/updatepersonalinfo", function(req, res) {
        data = req.body
        data.id = req.session.userid
            // var dob=req.body.dob
            //   var newd = new Date(dob);
            // var year = newd.getFullYear();

        // var month = newd.getMonth();
        // var day = newd.getDate();
        // var changedDate = new Date(Date.UTC(year, month, day));
        // year = changedDate.getFullYear();
        // month = ((changedDate.getMonth() + 1) < 10 ? '0' : '') + (changedDate.getMonth() + 1);
        // day = (changedDate.getDate() < 10 ? '0' : '') + changedDate.getDate();

        // var formatedDate = year + "-" + month + "-" + day;
        // console.log("--------------",dob)
        // data.dob=dob
        database.updatePersonalInfo(data, function(err, result) {
            if (err) {
                return res.json({
                    status: false
                })
            } else {
                return res.json({
                    status: true
                })
            }
        })
    })
    //

// update Education api 
router.post("/updateeducation", function(req, res) {
    data = req.body
    data.id = req.session.userid
        //   var dob=req.body.collageStartDate
        //    var newd = new Date(dob);
        // var year = newd.getFullYear();

    // var month = newd.getMonth();
    // var day = newd.getDate();
    // var changedDate = new Date(Date.UTC(year, month, day));
    // year = changedDate.getFullYear();
    // month = ((changedDate.getMonth() + 1) < 10 ? '0' : '') + (changedDate.getMonth() + 1);
    // day = (changedDate.getDate() < 10 ? '0' : '') + changedDate.getDate();

    // var formatedDate = year + "-" + month + "-" + day;

    // data.collageStartDate=formatedDate

    //   var dob1=req.body.collageEndDate

    //   var newd1 = new Date(dob1);
    // var year1 = newd1.getFullYear();

    // var month1 = newd1.getMonth();
    // var day1 = newd1.getDate();
    // var changedDate1 = new Date(Date.UTC(year1, month1, day1));
    // yea1r = changedDate1.getFullYear();
    // month1 = ((changedDate1.getMonth() + 1) < 10 ? '0' : '') + (changedDate1.getMonth() + 1);
    // day1 = (changedDate1.getDate() < 10 ? '0' : '') + changedDate1.getDate();

    // var formatedDate1 = year1 + "-" + month1 + "-" + day1;

    // data.collageEndDate=formatedDate1
    database.updateEduaction(data, function(err, result) {
        if (err) {
            return res.json({
                status: false
            })
        }
    });
    return res.json({
        status: true
    });
})

//Edit Education
router.post("/Editeducation", function(req, res) {
    data = req.body
        //console.log("Edit is is",data)
    database.editEduaction(data, function(err, result) {
        if (err) {
            return res.json({
                status: false
            })
        } else {
            return res.json({
                status: true
            })
        }
    })
})

//update work
router.post("/updatework", function(req, res) {
        data = req.body
        data.id = req.session.userid
            // console.log("data is",data)
        database.updateWork(data, function(err, result) {
            if (err) {
                return res.json({
                    status: false
                })
            } else {



                // var user = {};
                //   var myObj = {};
                // for (var k in data.mytime) {

                //   if(data.mytime[k] != '')
                //   {
                //     myObj.id  = data.id;
                //     myObj.day  = k;
                //     myObj.working_hours  = data.mytime[k];
                //     database.updateInWorkinhHours(myObj, function(err, refWork) {
                //         if (err) {

                //         }
                //     });
                //   }
                // }
                var user = {};
                var myObj = {};
                for (var k in data.mytime) {

                    if (data.mytime[k] == '') {
                        data.mytime[k] = 'n/a';
                    }
                    myObj.user_login_id = req.session.userid;
                    myObj.day = k;

                    myObj.working_hours = data.mytime[k];
                    database.updateInWorkinhHours(myObj, function(err, refWork) {

                    });
                }
                return res.json({
                    status: true
                })
            }
        })
    })
    //update skills
router.get("/getUserSkills", function(req, res) {
    database.getUserSkills({
        userid: req.session.userid
    }, function(err, result) {
        console.log(result);
        return res.json(result);
    });
});

router.post("/updateskills", function(req, res) {
    // var data = '';
    // for(var k in req.body)
    // {
    //    if(k == (Object.keys(req.body).length - 1))
    //    {
    //      data += req.body[k];
    //    }else{
    //      data += req.body[k]+',';
    //    } 
    // }
    database.updateSkills({
        ids: req.body,
        userid: req.session.userid
    }, function(err, result) {
        if (err) {
            return res.json({
                status: false
            })
        } else {
            return res.json({
                status: true
            })
        }
    })
})

//contact
router.post("/contactus", function(req, res) {
    data = req.body
    data.id = req.session.userid
    data.usertype = req.session.usertype



    if (req.session.userid == undefined) {
        //console.log(" logout contacct us",data)
        database.contactUs1(data, function(err, result) {
            if (err) {
                return res.json({
                    status: false
                })
            } else {
                return res.json({
                    status: true
                })
            }
        })
    } else if (req.session.userid == data.id) {
        // console.log(" login contacct us",data)
        database.contactUs(data, function(err, result) {
            if (err) {
                return res.json({
                    status: false
                })
            } else {
                return res.json({
                    status: true
                })
            }
        })
    }


})

//remove skills


router.post("/removeskills", function(req, res) {
    data = req.body
        // console.log("skills=======> is",data)
    database.removeSkills(data, function(err, result) {
        if (err) {
            return res.json({
                status: false
            })
        } else {
            return res.json({
                status: true
            })
        }
    })
})


//experience
router.post("/experience", function(req, res) {
    data = req.body;
    data.id = req.session.userid;


    database.experience(data, function(err, result) {
        if (err) {
            return res.json({
                status: false
            })
        } else {
            return res.json({
                status: true
            })
        }
    })
})

//update experience api
router.post("/updateexperience", function(req, res) {
    data = req.body;


    //    var dob=req.body.experienceStart
    //    var newd = new Date(dob);
    // var year = newd.getFullYear();

    // var month = newd.getMonth();
    // var day = newd.getDate();
    // var changedDate = new Date(Date.UTC(year, month, day));
    // console.log("changedDate "+changedDate);
    // year = changedDate.getFullYear();
    // month = ((changedDate.getMonth() + 1) < 10 ? '0' : '') + (changedDate.getMonth() + 1);
    // day = (changedDate.getDate() < 10 ? '0' : '') + changedDate.getDate();

    // var formatedDate = year + "-" + month + "-" + day;

    // data.experienceStart=formatedDate

    //   var dob1=req.body.experienceEnd

    //   var newd1 = new Date(dob1);
    // var year1 = newd1.getFullYear();

    // var month1 = newd1.getMonth();
    // var day1 = newd1.getDate();
    // var changedDate1 = new Date(Date.UTC(year1, month1, day1));
    // console.log("changedDate "+changedDate1);
    // yea1r = changedDate1.getFullYear();
    // month1 = ((changedDate1.getMonth() + 1) < 10 ? '0' : '') + (changedDate1.getMonth() + 1);
    // day1 = (changedDate1.getDate() < 10 ? '0' : '') + changedDate1.getDate();

    // var formatedDate1 = year1 + "-" + month1 + "-" + day1;

    // data.experienceEnd=formatedDate1

    database.updateExperience(data, function(err, result) {
        if (err) {
            return res.json({
                status: false
            })
        } else {
            return res.json({
                status: true
            })
        }
    })
})



//Delete experience api
router.post("/deleteexperience", function(req, res) {
    data = req.body;

    //  console.log("delete",data)

    database.deleteExperience(data, function(err, result) {
        if (err) {
            return res.json({
                status: false
            })
        } else {
            return res.json({
                status: true
            })
        }
    })
})

//Delete Education api
router.post("/deleteeducation", function(req, res) {
    data = req.body;

    // console.log("delete",data)

    database.deleteEducation(data, function(err, result) {
        if (err) {
            return res.json({
                status: false
            })
        } else {
            return res.json({
                status: true
            })
        }
    })
})

router.post("/editpost", function(req, res) {
    data = req.body;
    console.log("editpost", data)
    data.userid = req.session.userid
    database.editpost(data, function(err, result) {
        if (err) {
            return res.json({
                status: false
            })
        } else {
            return res.json({
                status: true
            })
        }
    })
})

//del post
router.post("/delpost", function(req, res) {
    data = req.body
    data.userid = req.session.userid;
    console.log("del post", data)
    database.delpost(data, function(err, result) {
        if (err) {
            return res.json({
                status: false
            })
        } else {
            return res.json({
                status: true
            })
        }
    })
})


module.exports = router;
var express = require('express');
var cookieParser = require('cookie-parser');
var router = express.Router();
var database = require('../model/database');
var multer = require('multer');
var path = require('path');
var base64ToImage = require('base64-to-image');
var thumb = require('node-thumbnail').thumb;


var md5 = require('md5');
var session = require('express-session');
var bodyParser = require('body-parser');

var fs = require('fs');
var mail = require('../helper/helper_function')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
var transporter = require('../config/mailer');

// Rest Roounting

router.use('/opportunity', require('./opportunity'));
router.use('/notification', require('./notification'));
router.use('/setting', require('./setting'));
router.use('/view_profile', require('./view_profile'));

// Rest Roounting End

var storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null, './src/assets/uploads/chatAttachments')
    },
    filename: function(req, file, cb) {

        var videoname = Date.now() + '_' + file.originalname

        cb(null, videoname);
    }
});

var chatAttach = multer({
    storage: storage
});

//video storage path
var storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null, './src/assets/uploads/bio_video')
    },
    filename: function(req, file, cb) {

        var videoname = Date.now() + '_' + file.originalname

        cb(null, videoname);
    }
});


var upload_video = multer({
    storage: storage
});

// Image Storage path
var storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null, './src/assets/uploads/images')
    },
    filename: function(req, file, cb) {
        var name = Date.now() + '_' + file.originalname
        cb(null, name);
    }
});

var upload_img = multer({
    storage: storage
});



//resend otp check Api
router.post('/resendotpcheck', function(req, res) {
    var value = req.body
    database.fetchName(value, function(err, data) {
        if (data[0] == undefined) {
            return res.json({
                status: false
            })
        } else if (data[0] != undefined) {
            return res.json(data)
        }
    })

});

router.post('/getchatRoom', function(req, res) {
    var i = req.body.i;
    req.body.userid = req.session.userid;
    database.getchatRoom(req.body, function(err, result) {
        if (result.length > 0) {
            result[0].i = i;
        }
        return res.json(result);
    })
});



router.post('/markChatReadWhere', function(req, res) {
    database.markChatReadWhere(req.body, function(err, result) {
        return res.json(result);
    });
});
router.post('/get_email', function(req, res) {
    database.get_emailid(req.body, function(err, result) {
        return res.json(result);
    });
});

//get_total_count_comment_reply
router.post("/get_total_count_comment_reply", function(req, res) {
    var j = req.body.i

    database.getCountComment(req.body, function(err, result) {
        result[0].i = j;
        return res.json(result);
    })
})

router.post('/setLocation', function(req, res) {
    database.setLocation(req.body, function(err, result) {

    });
});



router.post('/checkSession', function(req, res) {
    database.checkSession(req.body, function(err, result) {
        return res.json(result);
    })
});

router.get("/get_about_us_content", function(req, res) {
    database.get_about_us_content(req.body, function(err, result) {
        return res.json(result)
    })
})
router.post('/logoutSession', function(req, res) {
    database.logoutSession(req.body, function(err, result) {
        return res.json(result);
    });
});

router.post("/report_on_comment", function(req, res) {
    var data = req.body;
    data.userid = req.session.userid;
    database.report_on_comment(data, function(err, result) {
        return res.json({
            status: true
        })
    })
})

router.post("/likepost", function(req, res) {
    var data = req.body
    data.userid = req.session.userid;
    data.user_name = req.session.username
    data.user_type = req.session.usertype
    database.checkLike(data, function(err, result) {
        if (result[0] == undefined) {
            if (data.type == 4) {
                database.insertLikeComments(data, function(err, result0) {
                    database.newCount(data, function(err, result2) {
                        return res.json({
                            status: 1,
                            data: result2
                        })
                    })

                })
            } else {

                database.insertLike(data, function(err, result3) {
                    database.newCount(data, function(err, result4) {
                        return res.json({
                            status: 1,
                            data: result4
                        })
                    })

                })
            }
        } else {
            if (result[0].status == 1) {
                database.unLike(result, function(err, result3) {
                    database.Count(result, function(err, result2) {
                        return res.json({
                            status: 0,
                            data: result2
                        })
                    })
                })
            } else if (result[0].status == 0) {
                result.id = req.session.userid
                database.Like(result, function(err, result4) {

                    database.Count(result, function(err, result2) {
                        return res.json({
                            status: 1,
                            data: result2
                        })
                    })
                })
            }
        }

    })

})

router.post('/shareFeed', function(req, res) {
    req.body.user_login_id = req.session.userid;
    database.shareFeed(req.body, function(err, result) {
        if (err != '') {
            console.log(err);
        }
        return res.json({
            msg: "POST SUCCESS",
            success: true
        });
    })
});

//like status
router.post("/getLikeStatus", function(req, res) {
        var data = {}
        data = req.body
        data.userid = req.session.userid
            // console.log("req req",data)
        database.getLikeStatus(data, function(err, result) {
            return res.json(result)
        })
    })
    //resend otp Api
router.post('/resendotp', function(req, res) {
    var value = req.body
    database.fetchName(value, function(err, data) {
        if (data[0] == undefined) {
            return res.json({
                status: false
            })
        }

        var hash = generate_hash(6, '01234567899876543210');


        var link = req.get('host') + '/verifyemail';

        var data = {
            business_name: data[0].name,
            account_link: link,
            account_code: hash
        }



        data.email = value.email
        database.updateHash(data, function(err, result) {
            mail.email.sendEmail(1, value.email, Array(), data);
            return res.json({
                status: true
            })
        })
    })

})

//Registration sending mail api
router.post('/sendmail', function(req, res) {

    email = req.body

    var hash = generate_hash(6, '01234567899876543210');
    var link = req.get('host') + '/verifyemail';

    var data = {
        business_name: email.bussinessname,
        account_link: link,
        account_code: hash
    }

    mail.email.sendEmail(1, email.email, Array(), data);
    return res.json({
        status: true,
        data: hash
    })

});

router.post('/getFeedParent', function(req, res) {
    var usertype = req.session.usertype
    if (usertype == 1) {
        database.getFeedParent(req.body, function(err, result) {
            if (result == undefined) {
                return res.json({
                    status: false
                })
            }
            for (var i = 0; i < result.length; i++) {

                if (result[i] == undefined) {
                    return res.json({
                        status: false
                    })
                } else {
                    result[i].counting = req.body.i;
                    return res.json(result)

                }
            }

        });
    } else {
        database.getFeedParent1(req.body, function(err, result) {
            if (result == undefined) {
                return res.json({
                    status: false
                })
            }
            for (var i = 0; i < result.length; i++) {

                if (result[i] == undefined) {
                    return res.json({
                        status: false
                    })
                } else {
                    result[i].counting = req.body.i;
                    return res.json(result)

                }
            }
        });
    }
});


//video upload api 
router.post("/video/:id", upload_video.array("uploads[]", 12), function(req, res) {
    if (req.files[0] == undefined) {
        return res.json({
            status: false
        })
    } else {
        var data = {}
        var id1 = req.params.id;
        var videoname = req.files[0].filename
        data.vname = videoname
        data.id = req.session.user_loginid
        data.size = req.files[0].size
        database.videoUpload(data, function(err, infoRes) {
            if (err) {
                return res.json({
                    status: false
                })
            } else {

                videoid = infoRes
                var data1 = {}
                data1.videoId = videoid
                data1.bussinessid = id1
                database.updateProfile_video(data1, function(err, result) {
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
    }
});


router.post('/postAttach', chatAttach.array("uploads[]", 12), function(req, res) {


    var type = req.files[0].mimetype.split('/');
    var Ftype = type[0];

    if (Ftype == 'video') {
        var fileType = 2;
    } else {
        var fileType = 3;
    }


    var data = {
        name: req.files[0].filename,
        user_login_id: req.session.userid,
        file_size: req.files[0].size,
        file_type: fileType,
        created_date: new Date(),
        updated_date: new Date()
    }
    database.chatAttach(data, function(err, result) {
        return res.json(result)
    });
})

router.get('/mailcheck', function(req, res) {
    var message = {
        from: '',
        to: '',
        subject: '', //'Nodemailer is unicode friendly ✔', 
        html: '' //'Hello to myself!',
    };
    sendMailer(message, function(err, result) {
        if (err == true) {
            console.log(true);
        } else {
            console.log(false);
        }
    });

});




//image upload api 
router.post("/upload/:id", upload_img.array("uploads[]", 12), function(req, res) {
    var data = {}
    var id = req.params.id;
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
    if (req.body.image_name == 'Drag and drop or browse' || req.body.imag == '') {
        imagename = 'avatar.png';
        data.img = imagename;
        data.size = 0;
        data.id = req.session.user_loginid;

    } else {
        imagename = image_insert;
        var image_array = imagename.split('.');
        if (image_array[1] != 'png' && image_array[1] != 'jpg' && image_array[1] != 'jpeg') {
            fs.unlink(path, function(err) {
                if (err) {
                    console.log(err);
                }

            });
            imagename = 'avatar.png';
            data.img = imagename
            data.size = 0
            data.id = req.session.user_loginid
        } else {
            imagename = image_insert

            data.img = imagename
            data.id = req.session.user_loginid
            data.size = req.body.image_size
        }
    }
    data.img = imagename

    database.profilePicUpload(data, function(err, infoRes1) {
        if (err) {
            return res.json({
                status: false
            })
        } else {

            imageid = infoRes1


            var data = {}
            data.imageId = imageid
            data.bussinessid = id
            database.updateProfile_pic(data, function(err, result) {
                if (err) {
                    return res.json({
                        status: false
                    })
                } else {
                    database.updatesearchPic_id(data, function(err, result1) {
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
})

router.post('/getmedia', function(req, res) {
    if (req.body.i && req.body.i != undefined && req.body.i != null) {
        var i = req.body.i;
    } else {
        var i = 0;
    }
    database.getmedia(req.body, function(err, result) {
        if (result.length > 0) {
            result[0].i = i;
        }

        return res.json(result)
    });
})


//image updated api 

/*router.post("/uploadupdate", upload_img.array("uploads[]", 12), function(req, res) {

    if (req.files[0] == undefined) {
        return res.json({
            status: false
        })
    }

    database.fetchImage(req.session.userid, function(err, data) {

        var info = data
        if (data[0] == undefined) {
            var request = {}

            request.imagename = req.files[0].filename
            request.id = req.session.userid
            request.size = req.files[0].size
            database.insertimageUpdate(request, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    var response = {}
                    response.insertid = result
                    response.id = req.session.userid
                    response.name = req.files[0].filename
                    database.updateimageUpdate(response, function(err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            return res.json({
                                status: true
                            })
                        }
                    })
                }
            })
        } else {
            var info = data

            if (info[0].file_type == 1) {
                if (info[0].name !== "avatar.png") {
                    fs.unlink('src/assets/uploads/images/' + info[0].name, function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }

            }
            var data = {}
            data.imagename = req.files[0].filename
            data.size = req.files[0].size
            data.id = info[0].id
            data.user_login_id = req.session.userid
            database.updateImage(data, function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    return res.json({
                        status: true
                    })
                }
            })
        }


    })


})*/

//
//image updated user api 
router.post("/uploadupdate", upload_img.array("uploads[]", 12), function(req, res) {

    var base64Str = req.body.imag;
    var path = './src/assets/uploads/images/';

    var optionalObj = {
        'fileName': Date.now() + '_' + req.body.image_name
    };
    var imageInfo = base64ToImage(base64Str, path, optionalObj);
    var image_insert = optionalObj.fileName




    //  thumb({
    //   source: './src/assets/uploads/images/'+image_insert, // could be a filename: dest/path/image.jpg
    //   destination: './src/assets/uploads/images/thumb/',
    //   concurrency: 4,
    //   width: 800,

    // }, function(files, err, stdout, stderr) {
    //   console.log('All done!');
    //   console.log('files========>',files,stdout,stderr);
    // });
    if (req.body == undefined) {
        return res.json({
            status: false
        })
    }
    database.fetchImage(req.session.userid, function(err, data) {

        var info = data
        if (data[0] == undefined) {
            var request = {}

            request.imagename = image_insert
            request.id = req.session.userid
            request.size = req.body.image_size
            database.insertimageUpdate(request, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    var response = {}
                    response.insertid = result
                    response.id = req.session.userid
                    database.updateimageUpdate(response, function(err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            return res.json({
                                status: true
                            })
                        }
                    })
                }
            })
        } else {
            var info = data

            if (info[0].file_type == 1) {
                if (info[0].name !== "avatar.png") {
                    fs.unlink('src/assets/uploads/images/' + info[0].name, function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }

            }
            var data = {}
            data.imagename = image_insert
            data.size = req.body.image_size
            data.id = info[0].id
            data.user_login_id = req.session.userid
            database.updateImage(data, function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    return res.json({
                        status: true
                    })
                }
            })
        }


    })


})

//
//image updated user api 
router.post("/uploadupdate1", upload_img.array("uploads[]", 12), function(req, res) {

        var base64Str = req.body.imag;
        var path = './src/assets/uploads/images/';

        var optionalObj = {
            'fileName': Date.now() + '_' + req.body.image_name
        };
        var imageInfo = base64ToImage(base64Str, path, optionalObj);
        var image_insert = optionalObj.fileName



        //  thumb({
        //   source: './src/assets/uploads/images/'+image_insert, // could be a filename: dest/path/image.jpg
        //   destination: './src/assets/uploads/images/thumb/',
        //   concurrency: 4,
        //   width: 800,

        // }, function(files, err, stdout, stderr) {
        //   console.log('All done!');
        //   console.log('files========>',files,stdout,stderr);
        // });
        if (req.body == undefined) {
            return res.json({
                status: false
            })
        }
        database.fetchImage(req.session.userid, function(err, data) {

            var info = data
            if (data[0] == undefined) {
                var request = {}

                request.imagename = image_insert
                request.id = req.session.userid
                request.size = req.body.image_size
                database.insertimageUpdate1(request, function(err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        var response = {}
                        response.insertid = result
                        response.id = req.session.userid
                        database.updateimageUpdate1(response, function(err, result) {
                            if (err) {
                                console.log(err);
                            } else {
                                return res.json({
                                    status: true
                                })
                            }
                        })
                    }
                })
            } else {
                var info = data

                if (info[0].file_type == 1) {
                    if (info[0].name !== "avatar.png") {
                        fs.unlink('src/assets/uploads/images/' + info[0].name, function(err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }

                }
                var data = {}
                data.imagename = image_insert
                data.size = req.body.image_size
                data.id = info[0].id
                database.updateImage1(data, function(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.json({
                            status: true
                        })
                    }
                })
            }


        })


    })
    //Video updated api  

router.post("/videoupdate", upload_video.array("uploads[]", 12), function(req, res) {
    if (req.files[0] == undefined) {
        return res.json({
            status: false
        })
    }

    database.fetchVideo(req.session.userid, function(err, data) {
        if (data[0] == undefined) {
            var request = {}
            var videoname = req.files[0].filename
            request.vname = videoname
            request.id = req.session.userid
            request.size = req.files[0].size
            database.insertvideoUpdate(request, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    var response = {}
                    response.insertid = result
                    response.id = req.session.userid
                    database.updatevideoUpdate(response, function(err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            return res.json({
                                status: true
                            })
                        }
                    })


                }
            })
        } else {
            var info1 = data

            if (info1[0].file_type == 2) {
                if (info1[0].name !== "novideo.jpg") {
                    fs.unlink('src/assets/uploads/bio_video/' + info1[0].name, function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }

            }
            var data = {}
            data.vname = req.files[0].filename
            data.size = req.files[0].size
            data.id = info1[0].id
            database.updateVideo(data, function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    return res.json({
                        status: true
                    })
                }
            })
        }


    })


})

//Video update user api

router.post("/videoupdate1", upload_video.array("uploads[]", 12), function(req, res) {
        if (req.files[0] == undefined) {
            return res.json({
                status: false
            })
        }

        database.fetchVideo(req.session.userid, function(err, data) {
            if (data[0] == undefined) {
                var request = {}
                var videoname = req.files[0].filename
                request.vname = videoname
                request.id = req.session.userid
                request.size = req.files[0].size
                database.insertvideoUpdate(request, function(err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        var response = {}
                        response.insertid = result
                        response.id = req.session.userid
                        database.updatevideoUpdate1(response, function(err, result) {
                            if (err) {
                                console.log(err);
                            } else {
                                return res.json({
                                    status: true
                                })
                            }
                        })


                    }
                })
            } else {
                var info1 = data

                if (info1[0].file_type == 2) {
                    if (info1[0].name !== "novideo.jpg") {
                        fs.unlink('src/assets/uploads/bio_video/' + info1[0].name, function(err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }

                }
                var data = {}
                data.vname = req.files[0].filename
                data.size = req.files[0].size
                data.id = info1[0].id
                database.updateVideo(data, function(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.json({
                            status: true
                        })
                    }
                })
            }


        })


    })
    // resume storage path
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

// Document update user api
router.post("/documentupdate", uploadResume.array("uploads[]", 12), function(req, res) {


        if (req.files[0] == undefined) {
            return res.json({
                status: false
            })
        }

        database.fetchDoc(req.session.userid, function(err, data) {
            if (data[0] == undefined) {
                var request = {}
                var vname = req.files[0].filename
                request.vname = vname
                request.id = req.session.userid
                request.size = req.files[0].size
                database.insertdocUpdate(request, function(err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        var response = {}
                        response.insertid = result
                        response.id = req.session.userid
                        database.updatedocUpdate(response, function(err, result) {
                            if (err) {
                                console.log(err);
                            } else {
                                return res.json({
                                    status: true
                                })
                            }
                        })


                    }
                })
            } else {
                var info1 = data


                if (info1[0].file_type == 3) {
                    if (info1[0].name !== "nodoc.jpg") {
                        fs.unlink('src/assets/uploads/resume/' + info1[0].name, function(err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }

                }
                var data = {}
                data.vname = req.files[0].filename
                data.size = req.files[0].size
                data.id = info1[0].id

                database.updateDoc(data, function(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.json({
                            status: true
                        })
                    }
                })
            }


        })


    })
    //
router.get("/", function(req, res) {
    res.send('Welcome in Express');
});


// router.use(function getSessionViaQuerystring(req, res, next) {
//   var sessionId = req.query.sessionId;
//   console.log("sessionId :  "+sessionId);
//   if (!sessionId) return res.send(401); // Or whatever

//   req.cookies['connect.sid'] = req.query.sessionId;
//   next();
// });


//Login Api
router.post("/login", function(req, res) {
    var sid = req.sessionID;

    var data = req.body;
    var pass = data.password
    var password = md5(pass);
    data.password = password
    database.fetch(data, function(err, data) {

        if (data == undefined || data == '' || data == null) {
            return res.json({
                status: false
            })
        } else {
            database.getSetting(data, function(err, result) {
                two_factor_auth = 0;
                if (result && result.length > 0) {
                    two_factor_auth = result[0].is_tofactor_auth;
                } else {
                    two_factor_auth = 0;
                }
                data[0].two_factor_auth = two_factor_auth;
                return res.json(data);
            })

        }


        // req.session.userid=data[0].id

        // if (data[0] == undefined) {
        //     return res.json(data);
        // } else {
        //     req.session.userid = data[0].id
        //     req.session.usertype = data[0].type
        //     req.session.username=data[0].name

        //     return res.json(data);

        // }
        return false;

    })


})


//Login Api
// router.post("/login", function(req, res) {
//     var sid = req.sessionID;
//     // console.log("sid  :  "+sid)
//     // getSessionViaQuerystring(sid);

//     var data = req.body;
//     var pass = data.password
//     var password = md5(pass);
//     data.password = password
//     // console.log(data);        
//     database.fetch(data, function(err, data) {


//         //req.session.userid=data[0].id

//         if (data[0] == undefined) {
//             return res.json(data);
//         } else {
//             req.session.userid = data[0].id
//             req.session.usertype = data[0].type
//             req.session.username = data[0].name

//             return res.json(data);

//         }
//     })


// })

router.post('/generateSendOtp', function(req, res) {
    var hash = generate_hash(6, '01234567899876543210');
    var data = []
    data.token = hash;
    data.email = req.body.email
    var message = {
        from: '',
        to: data.email,
        subject: 'Request for login', //'Nodemailer is unicode friendly ✔', 
        html: '<h1>Qualified</h1><br>Use this otp at the time of registration : ' + data.token + '<h3>Thanks & Regards, <br> Team Qualifyed </h3>' //'Hello to myself!',
    };
    sendMailer(message, function(err, result) {
        console.log(result);
    });

    return res.json({
        hash: hash
    });
});

//Login check api
router.get("/isloggedIn", function(req, res) {
    return !!req.session.userid;
})

//Login status api
router.post("/regenerateSession", function(req, res) {

    req.session.userid = req.body.user_login_id;
    req.session.usertype = req.body.user_type;
    req.session.username = req.body.user_name;
    if (req.session.userid != '' && req.session.userid != undefined && req.session.userid != null) {
        return res.json({
            'status': true,
            'msg': 'session restore successfully'
        });
    } else {
        return res.json({
            'status': false,
            'msg': 'user session expired'
        });
    }

})

router.post("/emailcheck", function(req, res) {
    var data = req.body;
    database.checkMail(data, function(err, data) {
        return res.json(data);
    })
})

router.get("/get_email", function(req, res) {
    var data = {}
    data.userid = req.session.userid
    database.get_email(data, function(err, data) {
        return res.json(data);
    })
})
router.post("/emailcheck1", function(req, res) {
    var data = req.body;
    database.checkMail1(data, function(err, data) {
        return res.json(data);
    })
})

//Bussiness registration api
router.post("/bussinessprofileinsertion", function(req, res) {
    console.log('COCA COLA ', req.body);

    var value = req.body;
    var mail = (value.email).toLowerCase()
    console.log('COCA mail ', mail);
    var pass = value.password;

    var password = md5(pass)


    value.password = password
    value.email = mail







    database.insertUserlogin(value, function(err, insertRes) {

        if (err) {
            return res.json({
                msg: "dont save",
                status: false
            })
        } else {
            var reqBody = req.body;
            this.email = (reqBody.email).toLowerCase();
            this.name = reqBody.bussinessname;

            req.session.user_loginid = insertRes
            reqBody.loginid = insertRes;

            database.insertBussinessprofile(reqBody, function(err, infoRes) {
                if (err) {
                    return res.json({
                        msg: "dont save",
                        status: false
                    })
                } else {

                    var bussinessid = infoRes
                    database.insertSearch(reqBody, function(err, result) {
                        if (err) {
                            return res.json({
                                msg: "dont save",
                                status: false
                            })
                        }
                        return res.json(reqBody.loginid)
                    })


                }

            })
        }

    })
})



router.post('/checkFileExists1', function(req, res) {
    try {
        if (fs.existsSync(req.body.url)) {
            var data = {}
            data.status = true
            data.i = req.body.i
            return res.json({
                data
            });
        } else {
            var data = {}
            data.status = false
            data.i = req.body.i
            return res.json({
                data
            });
        }
    } catch (err) {
        var data = {}
        data.status = false
        data.i = req.body.i
        return res.json({
            data
        });
    }
})
router.post('/checkFileExists', function(req, res) {
    try {
        if (fs.existsSync(req.body.url)) {
            return res.json({
                status: true
            });
        } else {
            return res.json({
                status: false
            });
        }
    } catch (err) {
        return res.json({
            status: false
        });
    }
})

//name api
router.post("/name", function(req, res) {
    // var data1=req.body;

    var data = {};
    data.userid = req.body.userid;
    data.usertype = req.body.usertype;

    if (data.usertype == 2) {
        database.namedata(data, function(err, data) {
            return res.json(data);
        })
    } else if (data.usertype == 1) {
        database.namedata1(data, function(err, data) {

            /*  if(data[0].date == '0000-00-00'){



            return res.json(data);
            }
            else{
            data[0].date=data[0].date.toISOString().slice(0,10);*/

            // var dob = data[0].date

            // var newd = new Date(dob);
            // var year = newd.getFullYear();

            // var month = newd.getMonth();
            // var day = newd.getDate();
            // var changedDate = new Date(Date.UTC(year, month, day));
            // year = changedDate.getFullYear();
            // month = ((changedDate.getMonth() + 1) < 10 ? '0' : '') + (changedDate.getMonth() + 1);
            // day = (changedDate.getDate() < 10 ? '0' : '') + changedDate.getDate();

            // var formatedDate = year + "-" + month + "-" + day;
            // data[0].date = formatedDate
            return res.json(data);

        })
    }

})




//name api
router.post("/educationdata", function(req, res) {
    // var data1=req.body;
    //console.log("in edu api")
    var data = {};
    data.userid = req.body.userid;

    database.educationdata(data, function(err, data) {
        return res.json(data);
    })
})
router.post("/usereducationdata", function(req, res) {
    //console.log("test",req.body)
    var myvar = req.body;
    database.usereducationdata(myvar, function(err, data) {
        return res.json(data)
    })
})

router.post("/getExperience", function(req, res) {
    var data = req.body
        // console.log("expp",data)
    database.getExperience(data, function(err, result) {
        return res.json(result)
    })
})

//
router.post("/getSkills", function(req, res) {
    var data = {}
    data.id = req.body.userid;
    database.getSkills(data, function(err, result) {
        return res.json(result)
    })
})
router.post("/getSkills_post", function(req, res) {
    var data = req.body
    database.getSkills(data, function(err, result) {
        return res.json(result)
    })
})
router.get("/getSkills1", function(req, res) {
    var data = {}
    data = req.body
    data.id = req.session.userid;
    database.getSkills(data, function(err, result) {
        return res.json(result)
    })
})

//skills value
router.post("/getSkillsValue", function(req, res) {
        var valueSkills = req.body;
        database.getSkillsValue(valueSkills, function(err, result) {
            return res.json(result)
        })
    })
    //work day & hour
router.get("/workdaydata", function(req, res) {
    // var data1=req.body;
    var data = {};
    data.userid = req.session.userid;
    data.usertype = req.session.usertype;

    if (data.usertype == 2) {
        database.workdaydata(data, function(err, data) {
            return res.json(data);
        })
    }
})



//name api
router.post("/skills", function(req, res) {
    // var data1=req.body;
    var data = {};
    data.userid = req.body.userid;
    // data.usertype = req.body.usertype;
    // if (data.usertype == 2) {
    database.skillsdata(data, function(err, data) {
            return res.json(data);
        })
        // }


})


//name api
router.post("/experiencedata", function(req, res) {
        // var data1=req.body;
        var data = {};
        data.userid = req.body.userid;
        // data.usertype = req.session.usertype;
        // if (data.usertype == 2) {
        database.experiencedata(data, function(err, data) {
                return res.json(data);
            })
            // }


    })
    //name api
router.get("/workdata", function(req, res) {
    // var data1=req.body;
    var data = {};
    data.userid = req.session.userid;
    data.usertype = req.session.usertype;
    if (data.usertype == 2) {
        database.workdata(data, function(err, data) {
            return res.json(data);
        })
    }


})


//Logout api
router.get('/logout', function(req, res) {
    req.session.destroy();
    return res.json({
        status: true
    })
})

//Country api
router.get("/country", function(req, res) {
    database.Country(function(err, result) {
        return res.json(result);
    })
})

//Company Size api
router.get("/companysize", function(req, res) {
    database.companySize(function(err, result) {
        return res.json(result);
    })
})

//Company Type api
router.get("/companytype", function(req, res) {
    database.companyType(function(err, result) {
        return res.json(result);
    })
})

//Work Industry Api
router.get("/workindustry", function(req, res) {
    database.workIndustry(function(err, result) {
        return res.json(result);
    })
})

//City Api
router.post("/city", function(req, res) {
    id = req.body.country_id
    database.State(id, function(err, result) {
        return res.json(result);
    })
})

//Citys Api
router.post("/citys", function(req, res) {
    id = req.body.country_id
    database.State1(id, function(err, result) {
        return res.json(result);
    })
})

// update about api
router.post("/updateabout", function(req, res) {
    data = req.body
    data.id = req.session.userid
    database.updateAbout(data, function(err, result) {
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


//Delete Image api

router.post("/deleteimage", function(req, res) {
    data = req.body
    data.id = req.session.userid
    database.imgDelete(data, function(err, result) {
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

//Delete Video api

router.post("/deletevideo", function(req, res) {
    data = req.body
    data.id = req.session.userid
    database.videoDelete(data, function(err, result) {
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

//Delete doc api

router.post("/deletedoc", function(req, res) {
    data = req.body
    data.id = req.session.userid
    database.docDelete(data, function(err, result) {
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


//update information api

router.post("/updateinfo", function(req, res) {
    data = req.body
    data.id = req.session.userid
    console.log("-------------------------==-=-=-=", data.date)
        // var dob = req.body.date

    // var newd = new Date(dob);
    // var year = newd.getFullYear();

    // var month = newd.getMonth();
    // var day = newd.getDate();
    // var changedDate = new Date(Date.UTC(year, month, day));
    // year = changedDate.getFullYear();
    // month = ((changedDate.getMonth() + 1) < 10 ? '0' : '') + (changedDate.getMonth() + 1);
    // day = (changedDate.getDate() < 10 ? '0' : '') + changedDate.getDate();

    // var formatedDate = year + "-" + month + "-" + day;
    // data.date = formatedDate
    database.updateInfo(data, function(err, result) {
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

//update Password api

router.post("/updatepass", function(req, res) {
    data = req.body
    data.id = req.session.userid

    var password = md5(data.oldpassword)

    data.oldpassword = password

    var newpass = md5(data.newpassword)

    data.newpassword = newpass
    database.updateCheck(data, function(err, result) {
        if (result[0] == undefined) {
            return res.json({
                status: false
            })
        } else {
            database.updatePass(data, function(err, data) {
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
})

//Forgot mail api
router.post("/forgotmail", function(req, res) {
    mail = req.body

    database.forgotMail(mail, function(err, result) {

        if (err) {
            return res.json({
                msg: 'error occured'
            })
        } else {
            if (result[0] == undefined) {
                return res.json(result)
            } else if (result[0].status == 0) {
                return res.json(result)
            } else {
                var hash = generate_hash(6, '01234567899876543210');
                var data = []
                data.token = hash;
                data.email = mail.email
                data.name = result[0].name
                database.insertHash(data, function(err, result1) {

                    var link = req.get('host') + '/resetpassword';
                    var message = {
                        from: '',
                        to: data.email,
                        subject: 'Request for change password from qualified', //'Nodemailer is unicode friendly ✔', 
                        html: '<h1>Qualified</h1><p>Hello ' + data.name + '</p><br><b>We have received a request for a password reset. Please follow the link and instructions below. If you did not send this request, please ignore this email and contact us for assistance.</b><p>Use this code to reset password </p><p> Code : ' + hash + ' (code expires in 24 hours)</p><p>Copy these link and open in your browser :' + link + '</p><h3>Thanks & Regards, <br> Team Qualifyed </h3>' //'Hello to myself!',
                    };
                    sendMailer(message, function(err, result) {
                        return res.json(result)
                    });
                })
            }

        }


    })
})

//Registration sending mail api
router.post('/sendmail1', function(req, res) {
    email = req.body

    var hash = generate_hash(6, '01234567899876543210');
    var data = []
    data.token = hash;
    data.email = email.email
    database.insertHash1(data, function(err, result1) {

        var link = req.get('host') + '/verifyemail';
        var message = {
            from: '',
            to: data.email,
            subject: 'Welcome To Qualifyed', //'Nodemailer is unicode friendly ✔', 

            html: '<h1>Welcome ,</h1><h5>Qualifyed is the world largest professional network.</h5><b> Please follow the link and instructions below to vertify your account</b><p>Use this code to verify your account </p><p>Link:' + link + '<br> Code : ' + hash + ' (code expires in 24 hours)</p><h3>Thanks & Regards, <br> Team Qualifyed </h3>'
        };

        sendMailer(message, function(err, result) {
            return res.json(result)
        });
    })
});


router.post('/sendcontactmail', function(req, res) {
    var data = {}
    data = req.body
    data.email = "qualifyedllc@gmail.com"
    var message = {
        from: '',
        to: data.email,
        subject: data.reason, //'Nodemailer is unicode friendly ✔', 
        html: '<h1>Hello Qualifyed Admin </h1><br><p>Contact Email : ' + data.fromemail + '</p><p> Contact Reason  : ' + data.reason + '</p><p>Contact Comment : ' + data.about + '</p><h3> Thanks<h3>'
    };


    sendMailer(message, function(err, result) {
        return res.json(result)
    });
})


//Reset password api

router.post("/resetpassword1", function(req, res) {
    var data = req.body
    var pass = data.password
    var password = md5(pass)
    data.password = password
    database.updatePassword(data, function(err, result) {
        if (err) {
            console.log(err)
        } else {
            database.deleteCode(data, function(err, result) {
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

})


// Code Check api

router.post("/resetpassword", function(req, res) {
    var data = req.body
    database.checkCode(data, function(err, result) {

        if (result[0] == undefined) {
            return res.json(result)
        } else if (result[0].reset_password_expiry_date > Date.now()) {
            return res.json(result)
        } else {
            database.resetToken(data, function(err, data) {

                return res.json({
                    status: false
                })
            })
        }
    })

})


//Verify mail api

router.post("/verifymail", function(req, res) {
    var data = req.body
    database.checkverifyCode(data, function(err, result) {

        if (result[0] == undefined) {
            return res.json({
                status: undefined
            })
        } else if (result[0].registration_otp_expiry_date > Date.now()) {
            database.resetverifyCode(data, function(err, data1) {
                if (err) {
                    console.log(err)
                }
                return res.json({
                    status: true
                })
            })

        } else {

            database.resetverifyToken(data, function(err, data) {

                return res.json({
                    status: false
                })
            })
        }
    })

})

// Update Data Refill 
router.get("/updatedata", function(req, res) {

    database.updateData(req.session.userid, function(err, data) {
        return res.json(data);
    })
})

//Post api
router.post("/post", function(req, res) {
    data = req.body
    data.id = req.session.userid
    database.Post(data, function(err, data) {
        if (err) {
            return res.json({
                status: false
            });
        } else {
            return res.json({
                status: true
            });
        }

    })
})
router.post('/getPostWhere', function(req, res) {
    database.getPostWhere(req.body, function(err, result) {
        return res.json(result);
    })
});

router.post('/getpostCount', function(req, res) {
    var data = {};
    data.userid = req.body.userid;
    data.usertype = req.body.usertype;
    database.getConnectionPost(data, function(err, result) {
        if (result == undefined) {
            return res.json({
                status: false
            })
        } else {
            var string = '';
            for (var i = 0; i < result.length; i++) {
                string += result[i].ids + ',';
            }
            str = string.slice(0, -1);
            data.ids = str;
            if (str == '') {
                // var json = [];
                // return res.json(json);

                data.ids = req.session.userid;
            }
            database.getpostCount(data, function(err, data1) {
                return res.json(data1);
            });
        }

    });
});

router.post('/get_comment_like_status', function(req, res) {
    var data = req.body
    data.user_id = req.session.userid
    database.getStatusCommentlike(data, function(err, result) {
        if (result.length < 1) {
            var data = [];
            data.push({
                saved_status: 0,
                cout: req.body.cout
            });
            return res.json(data);
        } else {

            result[0].cout = req.body.cout;
            return res.json(result)
        }
    });
});


router.post('/getmore', function(req, res) {
    database.getpostCount1(req.body, function(err, data) {
        return res.json(data);
    });

});
router.post("/getSharePost", function(req, res) {
        var data = {}
        data = req.body;
        data.userid = req.session.userid;
        database.getSharePost(data, function(err, result) {
            return res.json(result)
        })
    })
    // router.post("/showpost", function(req, res) {
    //     var data = {};
    //     data.userid = req.session.userid;
    //     data.usertype = req.session.usertype;
    //     data.limit = req.body.limit;
    //     if (data.usertype == 2) {
    //         database.postData(data, function(err, data) {
    //             function dateDiff(timestamp) {
    //                 var d = Math.abs(timestamp - new Date().getTime()) / 1000; // delta
    //                 var r = {}; // result
    //                 var s = { // structure
    //                     year: 31536000,
    //                     month: 2592000,
    //                     week: 604800, // uncomment row to ignore
    //                     day: 86400, // feel free to add your own row
    //                     hour: 3600,
    //                     minute: 60,
    //                     second: 1
    //                 };

//                 Object.keys(s).forEach(function(key) {
//                     r[key] = Math.floor(d / s[key]);
//                     d -= r[key] * s[key];
//                 });

//                 return r;
//             };


// for (var i = data.length - 1; i >= 0; i--) {
//   console.log('ids',data[i].id);




//     if (data[i].like_status == null || data[i].like_status == undefined || data[i].like_status == 0) {
//         data[i].like_status = false;
//     } else {
//         data[i].like_status = true;
//     }
//     var dateJson = dateDiff(new Date(data[i].created_date).getTime());

//     if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0 && dateJson.minute == 0) {
//         if (dateJson.second == 0) {
//             data[i].created_date = "Few Seconds Ago";
//         } else {
//             data[i].created_date = dateJson.second + " Seconds Ago";
//         }
//     } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0) {
//         data[i].created_date = dateJson.minute + " Minutes Ago";
//     } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0) {
//         data[i].created_date = dateJson.hour + " hour Ago";
//     } else if (dateJson.year == 0 && dateJson.month == 0) {
//         data[i].created_date = dateJson.day + " Day Ago";
//     } else if (dateJson.year == 0) {
//         data[i].created_date = dateJson.month + " Month Ago";
//     } else if (dateJson.year != 0) {
//         data[i].created_date = dateJson.year + " Year Ago";
//     }

// }
//             return res.json(data);
//         })
//     } else if (data.usertype == 1) {


//         database.postData1(data, function(err, data) {

//             function dateDiff(timestamp) {
//                 var d = Math.abs(timestamp - new Date().getTime()) / 1000; // delta
//                 var r = {}; // result
//                 var s = { // structure
//                     year: 31536000,
//                     month: 2592000,
//                     week: 604800, // uncomment row to ignore
//                     day: 86400, // feel free to add your own row
//                     hour: 3600,
//                     minute: 60,
//                     second: 1
//                 };

//                 Object.keys(s).forEach(function(key) {
//                     r[key] = Math.floor(d / s[key]);
//                     d -= r[key] * s[key];
//                 });

//                 return r;
//             };


//             for (var i = data.length - 1; i >= 0; i--) {
//                 var asdf = i;
//                 if (data[i].like_status == null || data[i].like_status == undefined || data[i].like_status == 0) {
//                     data[i].like_status = false;
//                 } else {
//                     data[i].like_status = true;
//                 }
//                 database.getCommentCount(data[i]['id'], function(err, commenResult, index) {});

//                 var dateJson = dateDiff(new Date(data[i].created_date).getTime());

//                 if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0 && dateJson.minute == 0) {
//                     if (dateJson.second == 0) {
//                         data[i].created_date = "Few Seconds Ago";
//                     } else {
//                         data[i].created_date = dateJson.second + " Seconds Ago";
//                     }
//                 } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0) {
//                     data[i].created_date = dateJson.minute + " Minutes Ago";
//                 } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0) {
//                     data[i].created_date = dateJson.hour + " hour Ago";
//                 } else if (dateJson.year == 0 && dateJson.month == 0) {
//                     data[i].created_date = dateJson.day + " Day Ago";
//                 } else if (dateJson.year == 0) {
//                     data[i].created_date = dateJson.month + " Month Ago";
//                 } else if (dateJson.year != 0) {
//                     data[i].created_date = dateJson.year + " Year Ago";
//                 }

//             }
//             return res.json(data);

//         })
//     }

// })

router.post("/showpost", function(req, res) {
    var data = {};
    data.userid = req.body.userid;
    data.usertype = req.body.usertype;
    data.limit = req.body.limit;
    console.log("----", data)
    database.getConnectionPost(data, function(err, result) {
        if (result == undefined) {
            return res.json({
                status: false
            })
        }
        var string = '';

        for (var i = 0; i < result.length; i++) {
            string += result[i].ids + ',';
        }
        str = string.slice(0, -1);
        data.ids = str;
        if (str == '') {
            data.ids = req.body.userid;
        }

        console.log("aa--------------------aa", data);

        database.postData1(data, function(err1, data) {

            function dateDiff(timestamp) {
                var d = Math.abs(timestamp - new Date().getTime()) / 1000; // delta
                var r = {};
                var s = {
                    year: 31536000,
                    month: 2592000,
                    week: 604800,
                    day: 86400,
                    hour: 3600,
                    minute: 60,
                    second: 1
                };

                Object.keys(s).forEach(function(key) {
                    r[key] = Math.floor(d / s[key]);
                    d -= r[key] * s[key];
                });

                return r;
            };
            console.log("check data---------", data)
            for (var i = data.length - 1; i >= 0; i--) {

                if (data[i].like_status == null || data[i].like_status == undefined || data[i].like_status == 0) {
                    data[i].like_status = false;
                } else {
                    data[i].like_status = true;
                }
                var dateJson = dateDiff(new Date(data[i].created_date).getTime());
                // console.log("------=-=-=-=-=-==-",dateJson)
                if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0 && dateJson.minute == 0) {
                    if (dateJson.second == 0) {
                        data[i].created_date = "Now";
                    } else {
                        data[i].created_date = dateJson.second + " Seconds Ago";
                    }
                } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0) {
                    data[i].created_date = dateJson.minute + " Minutes Ago";
                } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0) {
                    if (dateJson.hour > 1) {
                        data[i].created_date = dateJson.hour + " hours Ago";
                    } else {
                        data[i].created_date = dateJson.hour + " hour Ago";
                    }
                } else if (dateJson.year == 0 && dateJson.month == 0) {
                    if (dateJson.day > 1) {

                        data[i].created_date = dateJson.day + " Days Ago";
                    } else {
                        data[i].created_date = dateJson.day + " Day Ago";
                    }

                } else if (dateJson.year == 0) {
                    if (dateJson.month > 1) {
                        data[i].created_date = dateJson.month + " Months Ago";

                    } else {

                        data[i].created_date = dateJson.month + " Month Ago";
                    }
                } else if (dateJson.year != 0) {
                    if (dateJson.year > 1) {
                        data[i].created_date = dateJson.year + " Years Ago";

                    } else {

                        data[i].created_date = dateJson.year + " Year Ago";
                    }
                }

            }
            return res.json(data);
        });
    });
})
router.post("/showpost1", function(req, res) {
    var data = {};
    data.userid = req.session.userid;
    data.usertype = req.session.usertype;
    data.limit = req.body.limit;
    data.id = req.body.id;
    database.getConnectionPost(data, function(err, result) {
        if (result == undefined) {
            return res.json({
                status: false
            })
        }
        var string = '';

        for (var i = 0; i < result.length; i++) {
            string += result[i].ids + ',';
        }
        str = string.slice(0, -1);
        data.ids = str;
        if (str == '') {
            data.ids = req.session.userid;

        }
        database.postData12(data, function(err1, data) {
            function dateDiff(timestamp) {
                var d = Math.abs(timestamp - new Date().getTime()) / 1000; // delta
                var r = {}; // result
                var s = { // structure
                    year: 31536000,
                    month: 2592000,
                    week: 604800, // uncomment row to ignore
                    day: 86400, // feel free to add your own row
                    hour: 3600,
                    minute: 60,
                    second: 1
                };

                Object.keys(s).forEach(function(key) {
                    r[key] = Math.floor(d / s[key]);
                    d -= r[key] * s[key];
                });

                return r;
            };
            for (var i = data.length - 1; i >= 0; i--) {

                if (data[i].like_status == null || data[i].like_status == undefined || data[i].like_status == 0) {
                    data[i].like_status = false;
                } else {
                    data[i].like_status = true;
                }
                var dateJson = dateDiff(new Date(data[i].created_date).getTime());

                //     if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0 && dateJson.minute == 0) {
                //         if (dateJson.second == 0) {
                //             data[i].created_date = "Now";
                //         } else {
                //             data[i].created_date = dateJson.second + " Seconds Ago";
                //         }
                //     } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0) {
                //         data[i].created_date = dateJson.minute + " Minutes Ago";
                //     } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0) {
                //         data[i].created_date = dateJson.hour + " hour Ago";
                //     } else if (dateJson.year == 0 && dateJson.month == 0) {
                //         data[i].created_date = dateJson.day + " Day Ago";
                //     } else if (dateJson.year == 0) {
                //         data[i].created_date = dateJson.month + " Month Ago";
                //     } else if (dateJson.year != 0) {
                //         data[i].created_date = dateJson.year + " Year Ago";
                //     }

                // }
                if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0 && dateJson.minute == 0) {
                    if (dateJson.second == 0) {
                        data[i].created_date = "Now";
                    } else {
                        data[i].created_date = dateJson.second + " Seconds Ago";
                    }
                } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0) {
                    data[i].created_date = dateJson.minute + " Minutes Ago";
                } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0) {
                    if (dateJson.hour > 1) {
                        data[i].created_date = dateJson.hour + " hours Ago";
                    } else {
                        data[i].created_date = dateJson.hour + " hour Ago";
                    }
                } else if (dateJson.year == 0 && dateJson.month == 0) {
                    if (dateJson.day > 1) {

                        data[i].created_date = dateJson.day + " Days Ago";
                    } else {
                        data[i].created_date = dateJson.day + " Day Ago";
                    }

                } else if (dateJson.year == 0) {
                    if (dateJson.month > 1) {
                        data[i].created_date = dateJson.month + " Months Ago";

                    } else {

                        data[i].created_date = dateJson.month + " Month Ago";
                    }
                } else if (dateJson.year != 0) {
                    if (dateJson.year > 1) {
                        data[i].created_date = dateJson.year + " Years Ago";

                    } else {

                        data[i].created_date = dateJson.year + " Year Ago";
                    }
                }

            }
            return res.json(data);
        });
    });
})

router.post('/getUserBusinessDataId', function(req, res) {
    database.getUserBusinessDataId(req.body, function(err, result) {
        result[0].cout = req.body.i;
        return res.json(result);
    });
});

router.post("/filter", function(req, res) {
    var data = req.body
    data.userid = req.session.userid
    database.checkBlock(data, function(err, result) {
        if (result == undefined) {
            data.blockedIds = ''
        } else {
            var string = '';
            for (var i = 0; i < result.length; i++) {
                string += result[i].ids + ',';
            }
            str = string.slice(0, -1);
            data.blockedIds = str;
            database.userdata(data, function(err, data) {
                return res.json(data);
            });
        }
    })

})

router.post("/searchmessage", function(req, res) {
    var data = req.body
    data.userid = req.session.userid
    database.messageSearchdata(data, function(err, data) {
        return res.json(data);
    })
})

router.post("/searchresult", function(req, res) {
    var test = req.body
    test.userid = req.session.userid
    database.checkBlock(test, function(err, result) {
        if (result == undefined) {
            test.blockedIds = ''
        } else {
            var string = '';
            for (var i = 0; i < result.length; i++) {
                string += result[i].ids + ',';
            }
            str = string.slice(0, -1);
            test.blockedIds = str;
            database.fetchsearchresult(test, function(err, data) {
                return res.json(data)
            })
        }
    })
})

router.post("/getsearchcount", function(req, res) {
    var test = req.body
    database.fetchsearchcount(test, function(err, result) {
        return res.json(result)
    })
})

router.post('/countPostLike', function(req, res) {
    var d = [];
    d.push({
        entity_id: req.body.count
    });
    database.Count(d, function(err, result) {
        result[0].i = req.body.i;
        return res.json(result[0]);
    });
});

router.post('/countPostComment', function(req, res) {
    var d = [];
    d.push({
        entity_id: req.body.count
    });
    database.Count_comment_post(d, function(err, result) {
        result[0].i = req.body.i;
        return res.json(result[0]);
    });
});
router.post('/countPostComment_sub', function(req, res) {
    // var d = [];
    // d.push({
    //     entity_id: req.body.count
    // });
    // database.Count_comment_post(d, function(err, result) {
    //     result[0].i = req.body.i;
    //     return res.json(result[0]);
    //});
});
router.post('/countPostLike_comment', function(req, res) {
    var d = [];
    d.push({
        entity_id: req.body.count
    });
    database.Count_comment(d, function(err, result) {
        result[0].i = req.body.i;
        return res.json(result[0]);
    });
});


//post Images
var images = multer.diskStorage({
    // destination
    destination: function(req, file, cb) {

        cb(null, './src/assets/createpost/images')
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

                req.session.post_id = infoRes
                return res.json({
                    status: true
                });
            }

        });


    }


});


//post video
var video = multer.diskStorage({
    // destination
    destination: function(req, file, cb) {

        cb(null, './src/assets/createpost/video')

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
        var originalname = req.files[0].filename
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
                req.session.post_id = infoRes

                return res.json({
                    status: true
                })
            }

        });

    }
});


//post document
var docs = multer.diskStorage({
    // destination
    destination: function(req, file, cb) {

        cb(null, './src/assets/createpost/attatch')

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
                req.session.post_id = infoRes
                return res.json({
                    status: true
                })

            }

        });

    }
});


router.post("/createPost", function(req, res) {
    data = req.body

    var info = {}

    data.id = req.session.userid
    database.createPost(data, function(err, data) {
        if (err) {
            return res.json({
                msg: "dont save",
                status: false
            })

        } else {

            info.id = data;
            info.post_id = req.session.post_id
            database.updateFormPost(info, function(err, resUpdate) {

                if (err) {
                    return res.json({
                        msg: "dont save",
                        status: false
                    });
                } else {
                    delete req.session.post_id
                    return res.json({
                        status: true
                    })

                }

            })
        }



    })
})

//Like api
router.post("/getlike", function(req, res) {
    // var data1=req.body;


    data = req.body.userid;
    database.fetchLike(data, function(err, data) {
        return res.json(data)
    })
})


//Like api
router.post("/like", function(req, res) {
    // var data1=req.body;

    var data = req.body
    data.user_name = req.session.username
    data.user_type = req.session.usertype
    data.userid = req.session.userid
    database.checkLike(data, function(err, result) {
        if (result[0] == undefined) {
            database.insertLike(data, function(err, result1) {
                database.newCount(data, function(err, result2) {
                    return res.json({
                        status: 1,
                        data: result2
                    })
                })
            })
        } else {
            if (result[0].status == 1) {
                database.unLike(result, function(err, result3) {
                    database.Count(result, function(err, result2) {
                        return res.json({
                            status: 0,
                            data: result2
                        })
                    })
                })
            } else if (result[0].status == 0) {
                result.id = req.session.userid
                database.Like(result, function(err, result4) {
                    database.Count(result, function(err, result3) {
                        return res.json({
                            status: 1,
                            data: result3
                        })
                    })
                })
            }
        }
    })

})

//Comment api
router.post("/comment", function(req, res) {
    // var data1=req.body;

    detail = req.body
    detail.userid = req.session.userid;

    database.insertComment(detail, function(err, data) {
        var info = {}
        info.total = data[0].total
        info.id = detail.id

        database.insertCount(info, function(err, data) {

            return res.json(req.body);
        })
    })
})

//liginid
router.get("/getliginid", function(req, res) {
    var data = {};
    data.id = req.session.userid;
    data.usertype = req.session.usertype;
    return res.json(data)
})

//connect friend status
router.post("/getConnectStatus", function(req, res) {
        var data = {}
        data = req.body;
        data.id = req.session.userid;
        database.getConnectStatus(data, function(err, result) {
            return res.json(result)
        })

    })
    //unfriend
router.post("/unfriend", function(req, res) {
        var data = {}
        data = req.body
        data.id = req.session.userid
        database.unfriend(data, function(err, result) {
            return res.json(result)
        })
    })
    //usercomment
    //Comment api
router.post("/usercomment", function(req, res) {
    // var data1=req.body;
    detail = req.body
    detail.userid = req.session.userid;

    database.insertCommentUser(detail, function(err, data) {
        var info = {}
        info.total = data[0].total
        info.id = detail.id

        database.insertCountUser(info, function(err, data) {

            return res.json(data)
        })
    })
})

//Fetch Comment api
router.post("/getcomment", function(req, res) {
    // var data1=req.body;

    var data = req.body

    database.fetchComment(data, function(err, data) {

        function dateDiff(timestamp) {
            var d = Math.abs(timestamp - new Date().getTime()) / 1000; // delta
            var r = {}; // result
            var s = { // structure
                year: 31536000,
                month: 2592000,
                week: 604800, // uncomment row to ignore
                day: 86400, // feel free to add your own row
                hour: 3600,
                minute: 60,
                second: 1
            };

            Object.keys(s).forEach(function(key) {
                r[key] = Math.floor(d / s[key]);
                d -= r[key] * s[key];
            });

            return r;
        };


        for (var i = data.length - 1; i >= 0; i--) {

            var dateJson = dateDiff(new Date(data[i].created_date).getTime());

            //     if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0 && dateJson.minute == 0) {
            //         if (dateJson.second == 0) {
            //             data[i].created_date = "Few Seconds Ago";
            //         } else {
            //             data[i].created_date = dateJson.second + " Seconds Ago";
            //         }
            //     } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0) {
            //         data[i].created_date = dateJson.minute + " Minutes Ago";
            //     } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0) {
            //         data[i].created_date = dateJson.hour + " hour Ago";
            //     } else if (dateJson.year == 0 && dateJson.month == 0) {
            //         data[i].created_date = dateJson.day + " Day Ago";
            //     } else if (dateJson.year == 0) {
            //         data[i].created_date = dateJson.month + " Month Ago";
            //     } else if (dateJson.year != 0) {
            //         data[i].created_date = dateJson.year + " Year Ago";
            //     }

            // }
            if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0 && dateJson.minute == 0) {
                if (dateJson.second == 0) {
                    data[i].created_date = "Now";
                } else {
                    data[i].created_date = dateJson.second + " Seconds Ago";
                }
            } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0) {
                data[i].created_date = dateJson.minute + " Minutes Ago";
            } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0) {
                if (dateJson.hour > 1) {
                    data[i].created_date = dateJson.hour + " hours Ago";
                } else {
                    data[i].created_date = dateJson.hour + " hour Ago";
                }
            } else if (dateJson.year == 0 && dateJson.month == 0) {
                if (dateJson.day > 1) {

                    data[i].created_date = dateJson.day + " Days Ago";
                } else {
                    data[i].created_date = dateJson.day + " Day Ago";
                }

            } else if (dateJson.year == 0) {
                if (dateJson.month > 1) {
                    data[i].created_date = dateJson.month + " Months Ago";

                } else {

                    data[i].created_date = dateJson.month + " Month Ago";
                }
            } else if (dateJson.year != 0) {
                if (dateJson.year > 1) {
                    data[i].created_date = dateJson.year + " Years Ago";

                } else {

                    data[i].created_date = dateJson.year + " Year Ago";
                }
            }

        }
        return res.json(data)
    })
})
router.post("/getcommentreply", function(req, res) {
    // var data1=req.body;
    var j = req.body.i

    var data = req.body

    database.getcommentreply(data, function(err, data) {

        function dateDiff(timestamp) {
            var d = Math.abs(timestamp - new Date().getTime()) / 1000; // delta
            var r = {}; // result
            var s = { // structure
                year: 31536000,
                month: 2592000,
                week: 604800, // uncomment row to ignore
                day: 86400, // feel free to add your own row
                hour: 3600,
                minute: 60,
                second: 1
            };

            Object.keys(s).forEach(function(key) {
                r[key] = Math.floor(d / s[key]);
                d -= r[key] * s[key];
            });

            return r;
        };


        for (var i = data.length - 1; i >= 0; i--) {

            var dateJson = dateDiff(new Date(data[i].created_date).getTime());

            //     if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0 && dateJson.minute == 0) {
            //         if (dateJson.second == 0) {
            //             data[i].created_date = "Few Seconds Ago";
            //         } else {
            //             data[i].created_date = dateJson.second + " Seconds Ago";
            //         }
            //     } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0) {
            //         data[i].created_date = dateJson.minute + " Minutes Ago";
            //     } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0) {
            //         data[i].created_date = dateJson.hour + " hour Ago";
            //     } else if (dateJson.year == 0 && dateJson.month == 0) {
            //         data[i].created_date = dateJson.day + " Day Ago";
            //     } else if (dateJson.year == 0) {
            //         data[i].created_date = dateJson.month + " Month Ago";
            //     } else if (dateJson.year != 0) {
            //         data[i].created_date = dateJson.year + " Year Ago";
            //     }

            // }
            if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0 && dateJson.minute == 0) {
                if (dateJson.second == 0) {
                    data[i].created_date = "Now";
                } else {
                    data[i].created_date = dateJson.second + " Seconds Ago";
                }
            } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0) {
                data[i].created_date = dateJson.minute + " Minutes Ago";
            } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0) {
                if (dateJson.hour > 1) {
                    data[i].created_date = dateJson.hour + " hours Ago";
                } else {
                    data[i].created_date = dateJson.hour + " hour Ago";
                }
            } else if (dateJson.year == 0 && dateJson.month == 0) {
                if (dateJson.day > 1) {

                    data[i].created_date = dateJson.day + " Days Ago";
                } else {
                    data[i].created_date = dateJson.day + " Day Ago";
                }

            } else if (dateJson.year == 0) {
                if (dateJson.month > 1) {
                    data[i].created_date = dateJson.month + " Months Ago";

                } else {

                    data[i].created_date = dateJson.month + " Month Ago";
                }
            } else if (dateJson.year != 0) {
                if (dateJson.year > 1) {
                    data[i].created_date = dateJson.year + " Years Ago";

                } else {

                    data[i].created_date = dateJson.year + " Year Ago";
                }
            }

        }
        if (data.length > 0) {
            var j = req.body.i
            data[0].i = j;
        }

        return res.json(data)
    })
})

//View Profile Api
router.post("/view_profile", function(req, res) {
    var info = req.body

    database.fetchType(info, function(err, result1) {
        if (result1[0].type == 1 && result1[0].status == 1) {
            database.fetchbussinessView(info, function(err, result) {
                info.reqId = req.session.userid;
                database.fetchbussinesspost(info, function(err, data) {

                    function dateDiff(timestamp) {
                        var d = Math.abs(timestamp - new Date().getTime()) / 1000; // delta
                        var r = {}; // result
                        var s = { // structure
                            year: 31536000,
                            month: 2592000,
                            week: 604800, // uncomment row to ignore
                            day: 86400, // feel free to add your own row
                            hour: 3600,
                            minute: 60,
                            second: 1
                        };

                        Object.keys(s).forEach(function(key) {
                            r[key] = Math.floor(d / s[key]);
                            d -= r[key] * s[key];
                        });

                        return r;
                    };


                    for (var i = data.length - 1; i >= 0; i--) {
                        if (data[i].like_status == null || data[i].like_status == undefined || data[i].like_status == 0) {
                            data[i].like_status = false;
                        } else {
                            data[i].like_status = true;
                        }
                        var dateJson = dateDiff(new Date(data[i].created_date).getTime());

                        //     if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0 && dateJson.minute == 0) {
                        //         if (dateJson.second == 0) {
                        //             data[i].created_date = "Few Seconds Ago";
                        //         } else {
                        //             data[i].created_date = dateJson.second + " Seconds Ago";
                        //         }
                        //     } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0) {
                        //         data[i].created_date = dateJson.minute + " Minutes Ago";
                        //     } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0) {
                        //         data[i].created_date = dateJson.hour + " hour Ago";
                        //     } else if (dateJson.year == 0 && dateJson.month == 0) {
                        //         data[i].created_date = dateJson.day + " Day Ago";
                        //     } else if (dateJson.year == 0) {
                        //         data[i].created_date = dateJson.month + " Month Ago";
                        //     } else if (dateJson.year != 0) {
                        //         data[i].created_date = dateJson.year + " Year Ago";
                        //     }

                        // }
                        if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0 && dateJson.minute == 0) {
                            if (dateJson.second == 0) {
                                data[i].created_date = "Now";
                            } else {
                                data[i].created_date = dateJson.second + " Seconds Ago";
                            }
                        } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0) {
                            data[i].created_date = dateJson.minute + " Minutes Ago";
                        } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0) {
                            if (dateJson.hour > 1) {
                                data[i].created_date = dateJson.hour + " hours Ago";
                            } else {
                                data[i].created_date = dateJson.hour + " hour Ago";
                            }
                        } else if (dateJson.year == 0 && dateJson.month == 0) {
                            if (dateJson.day > 1) {

                                data[i].created_date = dateJson.day + " Days Ago";
                            } else {
                                data[i].created_date = dateJson.day + " Day Ago";
                            }

                        } else if (dateJson.year == 0) {
                            if (dateJson.month > 1) {
                                data[i].created_date = dateJson.month + " Months Ago";

                            } else {

                                data[i].created_date = dateJson.month + " Month Ago";
                            }
                        } else if (dateJson.year != 0) {
                            if (dateJson.year > 1) {
                                data[i].created_date = dateJson.year + " Years Ago";

                            } else {

                                data[i].created_date = dateJson.year + " Year Ago";
                            }
                        }

                    }

                    result[0].postData = JSON.stringify(data);
                    return res.json(result)
                })
            })
        } else if (result1[0].type == 2 && result1[0].status == 1) {
            database.fetchuserView(info, function(err, result) {

                database.fetchuserpost(info, function(err, data) {

                    function dateDiff(timestamp) {
                        var d = Math.abs(timestamp - new Date().getTime()) / 1000; // delta
                        var r = {}; // result
                        var s = { // structure
                            year: 31536000,
                            month: 2592000,
                            week: 604800, // uncomment row to ignore
                            day: 86400, // feel free to add your own row
                            hour: 3600,
                            minute: 60,
                            second: 1
                        };

                        Object.keys(s).forEach(function(key) {
                            r[key] = Math.floor(d / s[key]);
                            d -= r[key] * s[key];
                        });

                        return r;
                    };


                    for (var i = data.length - 1; i >= 0; i--) {

                        var dateJson = dateDiff(new Date(data[i].created_date).getTime());

                        //     if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0 && dateJson.minute == 0) {
                        //         if (dateJson.second == 0) {
                        //             data[i].created_date = "Few Seconds Ago";
                        //         } else {
                        //             data[i].created_date = dateJson.second + " Seconds Ago";
                        //         }
                        //     } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0) {
                        //         data[i].created_date = dateJson.minute + " Minutes Ago";
                        //     } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0) {
                        //         data[i].created_date = dateJson.hour + " hour Ago";
                        //     } else if (dateJson.year == 0 && dateJson.month == 0) {
                        //         data[i].created_date = dateJson.day + " Day Ago";
                        //     } else if (dateJson.year == 0) {
                        //         data[i].created_date = dateJson.month + " Month Ago";
                        //     } else if (dateJson.year != 0) {
                        //         data[i].created_date = dateJson.year + " Year Ago";
                        //     }

                        // }
                        if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0 && dateJson.minute == 0) {
                            if (dateJson.second == 0) {
                                data[i].created_date = "Now";
                            } else {
                                data[i].created_date = dateJson.second + " Seconds Ago";
                            }
                        } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0) {
                            data[i].created_date = dateJson.minute + " Minutes Ago";
                        } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0) {
                            if (dateJson.hour > 1) {
                                data[i].created_date = dateJson.hour + " hours Ago";
                            } else {
                                data[i].created_date = dateJson.hour + " hour Ago";
                            }
                        } else if (dateJson.year == 0 && dateJson.month == 0) {
                            if (dateJson.day > 1) {

                                data[i].created_date = dateJson.day + " Days Ago";
                            } else {
                                data[i].created_date = dateJson.day + " Day Ago";
                            }

                        } else if (dateJson.year == 0) {
                            if (dateJson.month > 1) {
                                data[i].created_date = dateJson.month + " Months Ago";

                            } else {

                                data[i].created_date = dateJson.month + " Month Ago";
                            }
                        } else if (dateJson.year != 0) {
                            if (dateJson.year > 1) {
                                data[i].created_date = dateJson.year + " Years Ago";

                            } else {

                                data[i].created_date = dateJson.year + " Year Ago";
                            }
                        }

                    }
                    result[0].postData = JSON.stringify(data);
                    return res.json(result)
                })
            })
        }
    })

})


//Connection api
router.post("/requestconnection", function(req, res) {
    var data = req.body;

    data.userid = req.session.userid;
    data.user_name = req.session.username
    data.user_type = req.session.usertype
        // console.log(data)
    database.fetchLogo(data, function(err, result1) {

        database.fechConnection(data, function(err, result) {
            // console.log("result==++++==+>", result)

            var notication = {}
            notication.type = 1
            database.fetchMessage(notication, function(err, result2) {

                if (result[0] == undefined) {

                    var value = JSON.stringify({
                        username: data.user_name,
                        message: result2[0].master_message,
                        logo: result1[0].logo,
                        senderid: data.userid,
                        type: result2[0].type,
                        status: result2[0].status
                    })
                    data.message = value;
                    database.insertConnection(data, function(err, mydata) {
                        return res.json({
                            status: true,
                            mydata
                        })
                    })
                } else if (result[0].status == 4) {
                    var value = JSON.stringify({
                        username: data.user_name,
                        message: result2[0].master_message,
                        logo: result1[0].logo,
                        senderid: data.userid,
                        type: result2[0].type,
                        status: result2[0].status
                    })
                    data.message = value;
                    database.updateConnection(data, function(err, data) {
                        return res.json({
                            status: true
                        })
                    })
                } else if (result[0].status == 3) {
                    var value = JSON.stringify({
                        username: data.user_name,
                        message: result2[0].master_message,
                        logo: result1[0].logo,
                        senderid: data.userid,
                        type: result2[0].type,
                        status: result2[0].status
                    })
                    data.message = value;
                    database.updateConnection(data, function(err, data) {
                        return res.json({
                            status: true
                        })
                    })
                }
            })
        })
    })
})

// router.post("/requestconnection", function(req, res) {
//     console.log("-------------------------------------", req.body)
//     var data = req.body;

//     data.userid = req.session.userid;
//     data.user_name = req.session.username
//     data.user_type = req.session.usertype
//     console.log(data)
//     database.insertConnection(data,function(err,result){
//         return res.json(result)
//     })

// })

//Cancel Connection api
router.post("/cancel", function(req, res) {
    var data = {};
    data = req.body;
    data.userid = req.session.userid;

    database.cancelConnection(data, function(err, data) {
        return res.json({
            status: false
        })
    });

})

//Unfollow Connection api
router.post("/unfollow", function(req, res) {
    var data = req.body;

    data.userid = req.session.userid;
    database.unfollowConnection(data, function(err, data) {
        return res.json({
            status: false
        })
    })
})

//get connection status api
// router.post("/getconnection", function(req, res) {
//     data = req.body
//     data.userid = req.session.userid;
//     database.getConnection(data, function(err, data) {

//         return res.json(data)

//     })
// })



router.post("/getconnection", function(req, res) {
    data = req.body
    data.userid = req.session.userid;
    database.getConnection01(data, function(err, data) {

        return res.json(data)

    })
})

router.post("/getconnection_second", function(req, res) {
    var data = {};
    data.userid = req.body.id
    data.id = req.session.userid;
    database.getConnection(data, function(err, data) {
        return res.json(data)
    });
})

/*
//show connection request api
router.post("/showconnections", function(req, res) {
var info=req.body
info.userid = req.session.userid;
database.showConnection(info, function(err, data) {
if(data.length == undefined){
return res.json({status:false})
}
else if(data.length > 0){
for (var i = 0; i < data.length; i++) {
if (data[i].type == 1) {
database.getConnectionData(data[i].user_login_id, function(err, result) {
return res.json(result);
});
}else if (data[i].type == 2) {
database.getConnectionDataUser(data[i].user_login_id, function(err, result) {
return res.json(result);
});
}
}
}

})
})*/

router.post("/showconnections", function(req, res) {
    var info = req.body
    info.userid = req.session.userid;
    /*    database.showConnection(info, function(err, data) {
    if (data == undefined) {
    return res.json({
    status: false
    })
    }
    var string = '';

    for (var i = 0; i < data.length; i++) {
    string += data[i].user_login_id + ',';
    }
    str = string.slice(0, -1);*/
    //data.user_login_id = str;

    database.getConnectionData(info, function(err, result) {
            return res.json(result)
        })
        // })


})




//Accept request api
router.post("/acceptrequest", function(req, res) {
    var data = req.body
    data.user_name = req.session.username
    data.user_type = req.session.usertype
    data.userid = req.session.userid
    database.fetchLogo(data, function(err, result1) {
        var notication = {}
        notication.type = 4
        database.fetchMessage(notication, function(err, result2) {
            var value = JSON.stringify({
                username: data.user_name,
                message: result2[0].master_message,
                logo: result1[0].logo,
                senderid: data.userid,
                type: result2[0].type,
                status: result2[0].status
            })
            data.message = value;
            database.requestAccept(data, function(err, data) {
                return res.json({
                    status: true
                })
            })
        })
    })
})


//Decline request api
router.post("/declinerequest", function(req, res) {
    var data = req.body
    data.user_name = req.session.username
    data.user_type = req.session.usertype
    data.userid = req.session.userid;
    database.fetchLogo(data, function(err, result1) {
        var notication = {}
        notication.type = 5
        database.fetchMessage(notication, function(err, result2) {
            var value = JSON.stringify({
                username: data.user_name,
                message: result2[0].master_message,
                logo: result1[0].logo,
                senderid: data.userid,
                type: result2[0].type,
                status: result2[0].status
            })
            data.message = value;
            database.requestDecline(data, function(err, data) {
                return res.json({
                    status: true
                })
            })
        })
    })

})


//connection count api
router.post("/getconnectioncount", function(req, res) {

    data = req.body.userid
    if (req.body.usertype == 1) {
        database.getconnectionCount(data, function(err, data) {
            return res.json(data)
        })
    } else {
        database.getuserconnectionCount(data, function(err, data) {
            return res.json(data)
        })
    }

})


//request connection  count api
router.get("/resultcount", function(req, res) {

    data = req.session.userid
    if (req.session.usertype == 1) {
        database.getconnectionResult(data, function(err, data) {
            return res.json(data)
        })
    } else {
        database.getuserconnectionResult(data, function(err, data) {
            return res.json(data)
        })
    }

})



/*// get connection data api
router.post("/getconnections", function(req, res) {
var value=req.body
value.userid = req.session.userid
database.connectionData(value, function(err, data) {


for (var i = 0; i < data.length; i++) {
console.log("testing",data[i])
if (data[i].user_type == 1) {
database.bussConnectiondata(data[i].user_id, function(err, result) {
return res.json(result);
});
} 
else if (data[i].user_type == 2) {
database.userConnectiondata(data[i].user_id, function(err, result) {
return res.json(result);
});
}
}

})
})*/

router.post("/getconnections", function(req, res) {
    var frienddata = {}
    var value = req.body
    value.userid = req.session.userid
    database.connectionData(value, function(err, result) {

        if (result.length == undefined) {
            return res.json({
                status: false
            })
        }
        var string = '';

        for (var i = 0; i < result.length; i++) {
            string += result[i].ids + ',';
        }
        str = string.slice(0, -1);
        frienddata.id = str;
        frienddata.userid = req.session.userid
        database.friendData(frienddata, function(err, data) {
            return res.json(data)
        })
    })
})


/*
router.post("/getconnections", function(req, res) {
var value = req.body
value.userid = req.session.userid

database.friendData(value,function(err, data) {
return res.json(data)
})
})*/


router.post("/block", function(req, res) {
    var value = req.body
    value.userid = req.session.userid

    database.blockUser(value, function(err, data) {
        return res.json({
            status: true
        })
    })
})




//Account Deactivate api  
router.get("/deactivate", function(req, res) {

    data = req.session.userid
    database.Deactivate(data, function(err, data) {
        return res.json({
            status: true
        })
    })
})


//profile view count insertion
router.post("/profileviewinsert", function(req, res) {
    console.log("dek liyaz--------------", req.body)
    var data = req.body
    data.viewby = req.session.userid
    data.user_name = req.session.username
    data.user_type = req.session.usertype
    data.userid = req.session.userid;
    database.fetchLogo(data, function(err, result1) {
        var notication = {}
        notication.type = 6
        database.fetchMessage(notication, function(err, result2) {
            var value = JSON.stringify({
                username: data.user_name,
                message: result2[0].master_message,
                logo: result1[0].logo,
                senderid: data.userid,
                type: result2[0].type,
                status: result2[0].status
            })
            data.message = value;
            database.checkView(data, function(err, result3) {
                console.log("result3------------------", result3)
                if (result3 == '') {
                    database.profileViewInsertion(data, function(err, data) {

                        return res.json({
                            status: true
                        })
                    })
                } else {
                    return res.json({
                        status: false
                    })
                }
            })
        })
    })
})


//profile view count insertion
// router.post("/profileviewinsert", function(req, res) {
//     var data = req.body
//     data.viewby = req.session.userid
//     data.user_name = req.session.username
//     data.user_type = req.session.usertype
//     data.userid = req.session.userid;

//     database.checkView(data, function(err, result3) {
//         if (result3 == '') {
//             database.fetchLogo(data, function(err, result1) {
//                 var notication = {}
//                 notication.type = 6
//                 database.fetchMessage(notication, function(err, result2) {
//                     var value = JSON.stringify({
//                         username: data.user_name,
//                         message: result2[0].master_message,
//                         logo: result1[0].logo,
//                         senderid: data.userid,
//                         type: result2[0].type,
//                         status: result2[0].status
//                     })
//                     data.message = value;
//                     database.profileViewInsertion(data, function(err, data) {

//                         return res.json({
//                             status: true
//                         })

//                     })
//                 })
//             })
//         } else {
//             return res.json({
//                 status: false
//             })
//         }
//     })
// })




//bio view count insertion
router.post("/bioviewinsert", function(req, res) {
    var data = req.body
    data.viewby = req.session.userid
    data.user_name = req.session.username
    data.user_type = req.session.usertype
    data.userid = req.session.userid;

    database.checkbioView(data, function(err, result3) {
        if (result3 == '') {
            database.fetchLogo(data, function(err, result1) {
                var notication = {}
                notication.type = 7
                database.fetchMessage(notication, function(err, result2) {
                    var value = JSON.stringify({
                        username: data.user_name,
                        message: result2[0].master_message,
                        logo: result1[0].logo,
                        senderid: data.userid,
                        type: result2[0].type,
                        status: result2[0].status
                    })
                    data.message = value;
                    database.bioViewInsertion(data, function(err, data) {

                        return res.json({
                            status: true
                        })

                    })
                })
            })
        } else {
            return res.json({
                status: false
            })
        }
    })
})

//profile view count 
router.post("/profileviewcount", function(req, res) {
    data = req.body.userid
    database.profileViewCount(data, function(err, data) {
        return res.json(data)
    })
})

//bio view count 
router.post("/bioviewcount", function(req, res) {
    data = req.body.userid
    database.bioViewCount(data, function(err, data) {
        return res.json(data)
    })
})
router.post("/get_user_name", function(req, res) {
    data = req.body
    database.get_user_name(data, function(err, data) {
        return res.json(data)
    })
})


//profile view list 
router.post("/profileviewlist", function(req, res) {
    var value = req.body
    value.userid = req.session.userid
    database.profileviewList(value, function(err, data) {
        function dateDiff(timestamp) {
            var d = Math.abs(timestamp - new Date().getTime()) / 1000; // delta
            var r = {}; // result
            var s = { // structure
                year: 31536000,
                month: 2592000,
                week: 604800, // uncomment row to ignore
                day: 86400, // feel free to add your own row
                hour: 3600,
                minute: 60,
                second: 1
            };

            Object.keys(s).forEach(function(key) {
                r[key] = Math.floor(d / s[key]);
                d -= r[key] * s[key];
            });

            return r;
        };

        if (data.length == undefined) {
            return res.json({
                status: false
            })
        } else {
            for (var i = data.length - 1; i >= 0; i--) {




                if (data[i].like_status == null || data[i].like_status == undefined || data[i].like_status == 0) {
                    data[i].like_status = false;
                } else {
                    data[i].like_status = true;
                }


                var dateJson = dateDiff(new Date(data[i].created_date).getTime());

                if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0 && dateJson.minute == 0) {
                    if (dateJson.second == 0) {
                        data[i].created_date = "Few Seconds Ago";
                    } else {
                        data[i].created_date = dateJson.second + " Seconds Ago";
                    }
                } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0) {
                    data[i].created_date = dateJson.minute + " Minutes Ago";
                } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0) {
                    data[i].created_date = dateJson.hour + " hour Ago";
                } else if (dateJson.year == 0 && dateJson.month == 0) {
                    data[i].created_date = dateJson.day + " Day Ago";
                } else if (dateJson.year == 0) {
                    data[i].created_date = dateJson.month + " Month Ago";
                } else if (dateJson.year != 0) {
                    data[i].created_date = dateJson.year + " Year Ago";
                }

            }
        }
        return res.json(data)
    })
})

router.post('/getUserName', function(req, res) {
    return res.json({
        name: 'demoUser'
    });
});


//Bio view list 
router.post("/bioviewlist", function(req, res) {
    var value = req.body
    value.userid = req.session.userid
    database.bioviewList(value, function(err, data) {
        function dateDiff(timestamp) {
            var d = Math.abs(timestamp - new Date().getTime()) / 1000; // delta
            var r = {}; // result
            var s = { // structure
                year: 31536000,
                month: 2592000,
                week: 604800, // uncomment row to ignore
                day: 86400, // feel free to add your own row
                hour: 3600,
                minute: 60,
                second: 1
            };

            Object.keys(s).forEach(function(key) {
                r[key] = Math.floor(d / s[key]);
                d -= r[key] * s[key];
            });

            return r;
        };

        if (data.length == undefined) {
            return res.json({
                status: false
            })
        } else {
            for (var i = data.length - 1; i >= 0; i--) {


                var dateJson = dateDiff(new Date(data[i].created_date).getTime());

                if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0 && dateJson.minute == 0) {
                    if (dateJson.second == 0) {
                        data[i].created_date = "Few Seconds Ago";
                    } else {
                        data[i].created_date = dateJson.second + " Seconds Ago";
                    }
                } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0) {
                    data[i].created_date = dateJson.minute + " Minutes Ago";
                } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0) {
                    data[i].created_date = dateJson.hour + " hour Ago";
                } else if (dateJson.year == 0 && dateJson.month == 0) {
                    data[i].created_date = dateJson.day + " Day Ago";
                } else if (dateJson.year == 0) {
                    data[i].created_date = dateJson.month + " Month Ago";
                } else if (dateJson.year != 0) {
                    data[i].created_date = dateJson.year + " Year Ago";
                }

            }
        }
        return res.json(data)
    })
})



router.post("/getCommentAll", function(req, res) {
    database.getCommentAll(req.body, function(err, data) {
        return res.json(data)
    })
})


router.post("/getCountComment", function(req, res) {

    database.getCountComment(req.body, function(err, data) {
        return res.json(data)
    })
})

router.get("/messagelist", function(req, res) {
    data = req.session.userid;
    database.getmessageList(data, function(err, data) {
        return res.json(data)
    })
})
router.post("/replay_comments", function(req, res) {
    var test = {}
    test = req.body;
    test.userid = req.session.userid;
    database.replay_comments(test, function(err, result) {
        return res.json(result)
    })
})

router.post("/searchlog", function(req, res) {
    var test = req.body
    test.userid = req.session.userid;
    database.insertSearchlog(test, function(err, result) {
        return res.json({
            status: true
        })
    })
})


router.post("/fetchchat", function(req, res) {
    data = req.body;
    database.fetchChat(data, function(err, data) {
        return res.json(data)
    })
})

router.post("/alloweUser", function(req, res) {
    database.alloweUser(req.body, function(err, data) {
        return res.json(data)
    })
})

router.post("/getopportunitydata", function(req, res) {
    database.getopportunitydata(req.body, function(err, result) {
        return res.json(result);
    })
});

function sendMailer(message, cb) {
    var msg, success;
    transporter.sendMail(message, function(error) {
        if (error) {
            msg = error;
            success = false;
        } else {
            msg = "Mail Sent Succesfully";
            success = true;
        }
        cb(success, msg);
    });
}

function generate_hash(length = '6', possible = '01234560123456789987') {
    var text = "";
    var possible = possible;

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    database.checkHash(text, function(err, result1) {
        if (result1[0] == undefined) {
            return text;
        } else if (text == result1[0].resetpassword_token) {
            return generate_hash(length, possible);
        }

    })
    return text;
}




module.exports = router;
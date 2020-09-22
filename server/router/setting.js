var express = require('express');
var router = express.Router();
var database = require('../model/database');
var multer = require('multer');
var path = require('path');
var md5 = require('md5');
var setService = require('../services/setting');
var fs = require('fs');
var mail = require('../helper/helper_function')
var message = require('../helper/sms.helper');
var message = require('../helper/message');








router.get('/', function(req, res) {
    message('', "hello world", function(result) {
        res.send(result);
    });
});





router.post('/changePassword', function(req, res) {
    req.body.userid = req.session.userid;
    req.body.new_password = md5(req.body.new_password);
    req.body.current_password = md5(req.body.current_password);
    setService.changePasswordCheck(req.body, function(err, result) {
        if (result[0].password == req.body.current_password) {
            if (result[0].password == req.body.new_password) {
                return res.json({
                    success: false,
                    msg: "Old password and new password should not be same"
                });
            } else {
                setService.changePassword(req.body, function(err, result) {
                    return res.json({
                        success: true,
                        msg: "Password changed successfully"
                    });
                })
            }
        } else {
            return res.json({
                success: false,
                msg: "Old password not matched"
            })
        }
    });
});


router.post("/get_created_password", function(req, res) {
    var data = {}
    data.userid = req.body.userid;
    setService.getCreatedPassword(data, function(err, result) {
        return res.json(result)
    })
})
router.post('/two_factor_auth', function(req, res) {
    req.body.userid = req.session.userid;
    setService.two_factor_auth(req.body, function(err, result) {
        if (err) {
            return res.json({
                success: false,
                msg: "Please try again"
            })
        }
        return res.json({
            success: true,
            msg: "Two-factor authentication enabled"
        })
    });
});
router.post("/two_factor_auth_disable", function(req, res) {
    req.body.userid = req.session.userid;
    setService.two_factor_auth_disable(req.body, function(err, result) {
        if (err) {
            return res.json({
                success: false,
                msg: "Please try again"
            })
        } else {
            return res.json({
                success: true,
                msg: "Two-factor authentication disabled"
            })
        }
    })
});

router.post('/profile_viewed', function(req, res) {
    req.body.userid = req.session.userid;
    setService.profile_viewed(req.body, function(err, result) {
        if (err) {
            return res.json({
                success: false,
                msg: "Please try again"
            })
        } else {
            return res.json({
                success: true,
                msg: "Viewers Notification enabled"
            })
        }
    });
});

router.post('/profile_viewed_disable', function(req, res) {
    req.body.userid = req.session.userid;
    setService.profile_viewed_disabled(req.body, function(err, result) {
        if (err) {
            return res.json({
                success: false,
                msg: "Please try again"
            })
        } else {
            return res.json({
                success: true,
                msg: "Viewers Notification disabled"
            })
        }
    });
});

router.post("/email_notification", function(req, res) {
    req.body.userid = req.session.userid;
    setService.Emailnotification(req.body, function(err, result) {
        if (err) {
            return res.json({
                success: false,
                msg: "Please try again"
            })
        } else {
            return res.json({
                success: true,
                msg: "Email Notification enabled"
            })
        }
    })
});

router.post("/email_notification_disable", function(req, res) {
    req.body.userid = req.session.userid;
    setService.Emailnotification_disable(req.body, function(err, result) {
        if (err) {
            return res.json({
                success: false,
                msg: "Please try again"
            })
        } else {
            return res.json({
                success: true,
                msg: "Email Notification disabled"
            })
        }
    })
});

router.post('/email_seen', function(req, res) {
    req.body.userid = req.session.userid;
    setService.email_seen(req.body, function(err, result) {
        if (err) {
            return res.json({
                success: false,
                msg: "Please try again"
            })
        } else {
            return res.json({
                success: true,
                msg: "Status changed successfully"
            });
        }
    });
});

router.post('/phone_seen', function(req, res) {
    req.body.userid = req.session.userid;
    setService.phone_seen(req.body, function(err, result) {
        if (err) {
            return res.json({
                success: false,
                msg: "Please try again"
            })
        } else {
            return res.json({
                success: true,
                msg: "Status changed successfully"
            });
        }
    });
});

router.post('/seen_resume', function(req, res) {
    req.body.userid = req.session.userid;
    setService.seen_resume(req.body, function(err, result) {
        if (err) {
            return res.json({
                success: false,
                msg: "Please try again"
            })
        } else {
            return res.json({
                success: true,
                msg: "Status changed successfully"
            });
        }
    });
});

router.post('/connection_seen', function(req, res) {
    req.body.userid = req.session.userid;
    setService.connection_seen(req.body, function(err, result) {
        if (err) {
            return res.json({
                success: false,
                msg: "Please try again"
            })
        } else {
            return res.json({
                success: true,
                msg: "Status changed successfully"
            });
        }
    });
});

router.post('/last_name_seen', function(req, res) {
    req.body.userid = req.session.userid;
    setService.last_name_seen(req.body, function(err, result) {
        if (err) {
            return res.json({
                success: false,
                msg: "Please try again"
            })
        } else {
            return res.json({
                success: true,
                msg: "Status changed successfully"
            });
        }
    });
});

router.post('/active_seen', function(req, res) {
    req.body.userid = req.session.userid;
    setService.active_seen(req.body, function(err, result) {
        if (err) {
            return res.json({
                success: false,
                msg: "Please try again"
            })
        } else {
            return res.json({
                success: true,
                msg: "Status changed successfully"
            });
        }
    });
});

router.post('/active_timeline', function(req, res) {
    req.body.userid = req.session.userid;
    setService.active_timeline(req.body, function(err, result) {
        if (err) {
            return res.json({
                success: false,
                msg: "Please try again"
            })
        } else {
            return res.json({
                success: true,
                msg: "Status changed successfully"
            });
        }
    });
});

router.post('/message_prefrence', function(req, res) {
    req.body.userid = req.session.userid;
    setService.message_Prefrence(req.body, function(err, result) {
        if (err) {
            return res.json({
                success: false,
                msg: "Please try again"
            })
        } else {
            return res.json({
                success: true,
                msg: "Status changed successfully"
            });
        }
    });
});


router.post('/addNewEmailPost', function(req, res) {
    req.body.userid = req.session.userid;
    req.body.otp = generate_hash(6, '123456789');
    var data = {
        account_link: req.get('host') + '/verifyemailNew',
        account_code: req.body.otp,
    }
    mail.email.sendEmail(4, req.body.email, Array(), data);
    setService.addNewEmailPost(req.body, function(err, result) {
        return res.json(result);
    });
});



router.post('/activeEmail', function(req, res) {
    req.body.userid = req.session.userid;
    req.body.password = md5(req.body.password);
    setService.activeEmail(req.body, function(err, result) {
        return res.json(result);
    });
});

router.post('/activePhone', function(req, res) {
    req.body.userid = req.session.userid;
    req.body.password = md5(req.body.password);
    setService.activePhone(req.body, function(err, result) {
        return res.json(result);
    });
});

router.post('/setPrimary', function(req, res) {
    req.body.userid = req.session.userid;
    setService.setPrimary(req.body, function(err, result) {
        return res.json(result);
    });
});


router.post('/removeEmail', function(req, res) {
    req.body.userid = req.session.userid;
    setService.removeEmail(req.body, function(err, result) {
        return res.json(result);
    });
});

router.post('/removePhone', function(req, res) {
    req.body.userid = req.session.userid;
    setService.removePhone(req.body, function(err, result) {
        return res.json(result);
    });
});

router.post('/setPrimaryPhone', function(req, res) {
    req.body.userid = req.session.userid;
    req.userType = req.session.usertype;

    setService.setPrimaryPhone(req.body, function(err, result) {
        return res.json(result);
    });
});

router.post('/phoneotp', function(req, res) {
    console.log("here", req.body)
    message(req.body.phone, "Your qualifyed phone verifiction code is " + req.body.otp + "   ", function(err, result) {
        return res.json(result);
    });
});

router.post('/addNewPhonePost', function(req, res) {
    console.log(req.body)
    req.body.userid = req.session.userid;
    req.body.otp = generate_hash(6, '123456789');

    setService.addNewPhonePost(req.body, function(err, data) {

        return res.json(data);
    });
});

router.post('/resendOtp', function(req, res) {
    message(req.body.mN, "Your qualifyed phone verifiction code is " + req.body.otp + "   ", function(err, result) {

    });
    return res.json({
        success: true
    });
    return true;
});

router.post('/signout', function(req, res) {
    setService.signout(req.body, function(err, result) {
        setService.getAllLoginSesssion({
            data: req.body.id
        }, function(err, resu) {
            return res.json(resu);
        })

    });
});



router.post('/deleteaccount', function(req, res) {
    req.body.userid = req.session.userid;
    req.body.password = md5(req.body.password);
    setService.deleteaccount(req.body, function(err, result) {
        return res.json(result);
    });
});

router.post('/historyPref', function(req, res) {
    req.body.userid = req.session.userid;
    setService.historyPref(req.body, function(err, result) {
        return res.json(result);
    });

})

router.post('/unblock', function(req, res) {
    setService.unBlock(req.body, function(err, result) {
        return res.json({
            status: true
        });
    });

});


router.post('/closeOpp', function(req, res) {
    setService.closeOpp(req.body, function(err, result) {
        return res.json(result);
    });

});

router.post('/changeNotificationSettings', function(req, res) {
    req.body.user_id = req.body.userid;
    setService.changeNotificationSettings(req.body, function(err, result) {
        return res.json(result);
    });

});



// Get Methods


router.post('/getSetting', function(req, res) {
    setService.getSetting({
        data: req.body.userid
    }, function(err, result) {
        return res.json(result);
    });
});

router.post('/notificationSetting', function(req, res) {
    setService.notificationSetting({
        data: req.body.userid
    }, function(err, result) {
        return res.json(result);
    });
});

router.post('/getblockUser', function(req, res) {
    setService.getblockUser(req.body.userid, function(err, result) {
        return res.json(result);
    });
});


router.post('/getPassword', function(req, res) {
    setService.getPassword(req.body.userid, function(err, result) {
        return res.json(result);
    });
});

router.post('/getEmails', function(req, res) {
    setService.getEmails({
        data: req.body.userid
    }, function(err, result) {
        return res.json(result);
    })
})
router.post('/getPhones', function(req, res) {
    setService.getPhones({
        data: req.body.userid
    }, function(err, result) {
        return res.json(result);
    })
});
router.post('/getAllcountry', function(req, res) {
    setService.getAllcountry({
        data: req.body.userid
    }, function(err, result) {
        return res.json(result);
    })
});
router.post('/getAllLoginSesssion', function(req, res) {
    setService.getAllLoginSesssion({
        data: req.body.userid
    }, function(err, result) {
        return res.json(result);
    })
});

router.post('/getUnfollow', function(req, res) {
    setService.getAllUnfollow(req.body.userid, function(err, result) {
        return res.json(result);
    })
});

//get notification data
router.get('/getnotificationData', function(req, res) {
    setService.getmasterNotification(function(err, result) {
        return res.json(result)
    });
});

//get viewier data
router.get('/getviewier', function(req, res) {
    var data = req.session.userid
    setService.getviewierData(data, function(err, result) {
        return res.json(result)
    });
})

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
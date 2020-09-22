var express = require('express');
var cookieParser = require('cookie-parser');
var router = express.Router();
var database = require('../model/database');
var oppService = require('../services/opportunity');
var multer = require('multer');
var path = require('path');
var md5 = require('md5');
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');

router.get('/', function(req, res) {
    console.log("HELLO WORLD !");
});

// Create new Opportunity

router.post('/', function(req, res) {
    //console.log('req.session.user_loginid',req.session.userid);
    req.body.user_login_id = req.session.userid;
    oppService.createOpportunity(req.body, function(err, result) {
        if (err) {
            return res.json({
                status: false,
                msg: "TRY AGAIN"
            })
        } else {
            return res.json({
                status: true,
                msg: "SUCCESS"
            })
        }

    });
});

router.post('/edit-opportunity', function(req, res) {
    //console.log('req.session.user_loginid',req.session.userid);
    req.body.user_login_id = req.session.userid;
    oppService.editOpportunity(req.body, function(err, result) {
        if (err) {
            return res.json({
                status: false,
                msg: "TRY AGAIN"
            })
        } else {
            return res.json({
                status: true,
                msg: "SUCCESS"
            })
        }

    });
});


router.post('/getReason', function(req, res) {
    oppService.getReason(req.body, function(err, result) {
        return res.json(result);
    })
});

router.post('/getInterScheduleReq', function(req, res) {
    req.body.user_login_id = req.session.userid;
    oppService.getInterScheduleReq(req.body, function(err, result) {
        return res.json(result);
    });
});

router.post('/dashCount', function(req, res) {
    oppService.dashCount({
        id: req.body.userid
    }, function(err, result) {
        console.log(result);
        return res.json(result);
    })
});

router.post('/declineRequestInt', function(req, res) {
    req.body.userId = req.session.userid;
    oppService.declineRequestInt(req.body, function(err, result) {
        if (err != null || err != undefined || err != '') {
            return res.json({
                "msg": "SUCCESS",
                'status': true
            });
        }
        return res.json({
            "msg": "TRYP AGAIN",
            'status': false
        });
    })
});

router.post('/reschRequestInt', function(req, res) {
    req.body.BUId = req.session.userid;
    oppService.rescRequestInt(req.body, function(err, result) {
        if (err != null || err != undefined || err != '') {
            return res.json({
                "msg": "SUCCESS",
                'status': true
            });
        }
        return res.json({
            "msg": "TRYP AGAIN",
            'status': false
        });
    })
});

//get opportunity api
router.post('/useropportunity', function(req, res) {
    var data = req.body
    data.userid = req.session.userid
    oppService.checkAppliedopp(data, function(err, result) {
        if (result.length < 0 || result.length == 0) {
            data.opp_ids = '0';
        } else {
            var string = '';
            for (var i = 0; i < result.length; i++) {
                string += result[i].opportunity_id + ',';
            }
            str = string.slice(0, -1);
            data.opp_ids = str;

        }
        database.checkBlock(data, function(err, result1) {
            if (result1.length < 0 || result1.length == 0) {
                data.blockedIds = '0'
            } else {
                var string1 = '';
                for (var i = 0; i < result1.length; i++) {
                    string1 += result1[i].ids + ',';
                }
                str1 = string1.slice(0, -1);
                data.blockedIds = str1;

            }
            oppService.getOpportunity(data, function(err, data) {
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

                if (data == undefined || data == '') {
                    return res.json({
                        status: false
                    })
                }
                for (var i = data.length - 1; i >= 0; i--) {
                    var asdf = i;
                    database.getCommentCount(data[i]['id'], function(err, commenResult, index) {
                        // console.log('===>',asdf);
                    });

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
                return res.json(data)

            })
        })
    });




    // oppService.getOpportunity(data,function(err,data){
    //   function dateDiff(timestamp){
    //          var d = Math.abs(timestamp - new Date().getTime()) / 1000;                 // delta
    //          var r = {};                                                                // result
    //          var s = {                                                                  // structure
    //              year: 31536000,
    //              month: 2592000,
    //              week: 604800, // uncomment row to ignore
    //              day: 86400,   // feel free to add your own row
    //              hour: 3600,
    //              minute: 60,
    //              second: 1
    //          };

    //          Object.keys(s).forEach(function(key){
    //              r[key] = Math.floor(d / s[key]);
    //              d -= r[key] * s[key];
    //          });

    //          return r;
    //      };

    //          if(data == undefined || data == ''){
    //            return res.json({status:false})
    //          }
    //      for (var i = data.length - 1; i >= 0; i--) {
    //        var asdf = i;
    //        database.getCommentCount(data[i]['id'],function(err,commenResult, index){
    //         // console.log('===>',asdf);
    //        });

    //        var dateJson = dateDiff(new Date(data[i].created_date).getTime());

    //        if(dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0 && dateJson.minute == 0)
    //        {
    //          if(dateJson.second == 0)
    //          {
    //            data[i].created_date = "Few Seconds Ago";          
    //          }else{
    //            data[i].created_date = dateJson.second+" Seconds Ago";          
    //          }         
    //        }
    //        else if(dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0)
    //        {
    //          data[i].created_date = dateJson.minute+" Minutes Ago";          
    //        }
    //        else if(dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0)
    //        {
    //          data[i].created_date = dateJson.hour+" hour Ago";          
    //        }
    //        else if(dateJson.year == 0 && dateJson.month == 0)
    //        {
    //          data[i].created_date = dateJson.day+" Day Ago";          
    //        }
    //        else if(dateJson.year == 0)
    //        {
    //          data[i].created_date = dateJson.month+" Month Ago";          
    //        }
    //        else if(dateJson.year != 0)
    //        {
    //          data[i].created_date = dateJson.year+" Year Ago";          
    //        }

    //      }
    //   return res.json(data)

    // })
});

router.get('/getBusinessData', function(req, res) {
    oppService.getBusinessData({
        data: req.session.userid
    }, function(err, result) {
        return res.json(result)
    });
});

router.get('/getAllOpp', function(req, res) {
    oppService.getAllOppBus({
        data: req.session.userid,
        state: 1
    }, function(err, data) {



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
        abbrev_name = function(str1) {
            var split_names = str1.trim().split(" ");
            if (split_names.length > 1) {
                return (split_names[0].charAt(0) + split_names[1].charAt(0));
            }
            return split_names[0].charAt(0);
        };
        if (data == undefined) {
            return res.json({
                status: false
            })
        }
        for (var i = data.length - 1; i >= 0; i--) {

            if (data[i].description != '' && data[i].description.length > 30) {
                data[i].description = data[i].description.substring(0, 30) + '...';
            }
            randomNUm = function() {
                var random = Math.random() * 10;
                random = String(random).split('.')[0]
                if (random > 7 || random == 0) {
                    randomNUm();
                }
                return random;

            }
            var randomNum = randomNUm();

            data[i].abbrivation = abbrev_name(data[i].title);
            data[i].class = 'color_0' + randomNum;

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
        return res.json(data);
    });

});
router.post('/getAllOpp1', function(req, res) {
    var data = {}
    data = req.body;
    data.state = 1;
    data.userid1 = req.session.userid
    oppService.getAllOppBus1(data, function(err, data) {



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
        abbrev_name = function(str1) {
            var split_names = str1.trim().split(" ");
            if (split_names.length > 1) {
                return (split_names[0].charAt(0) + split_names[1].charAt(0));
            }
            return split_names[0].charAt(0);
        };
        if (data == undefined) {
            return res.json({
                status: false
            })
        }
        for (var i = data.length - 1; i >= 0; i--) {

            if (data[i].description != '' && data[i].description.length > 30) {
                data[i].description = data[i].description.substring(0, 30) + '...';
            }
            randomNUm = function() {
                var random = Math.random() * 10;
                random = String(random).split('.')[0]
                if (random > 7 || random == 0) {
                    randomNUm();
                }
                return random;

            }
            var randomNum = randomNUm();

            data[i].abbrivation = abbrev_name(data[i].title);
            data[i].class = 'color_0' + randomNum;

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
        return res.json(data);
    });

});

router.get('/getAllDecOpp', function(req, res) {
    oppService.getAllOppBus({
        data: req.session.userid,
        state: 0
    }, function(err, data) {

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
        abbrev_name = function(str1) {
            var split_names = str1.trim().split(" ");
            if (split_names.length > 1) {
                return (split_names[0].charAt(0) + split_names[1].charAt(0));
            }
            return split_names[0].charAt(0);
        };
        if (data == undefined) {
            return res.json({
                status: false
            })
        }
        for (var i = data.length - 1; i >= 0; i--) {

            if (data[i].description != '' && data[i].description.length > 30) {
                data[i].description = data[i].description.substring(0, 30) + '...';
            }
            randomNUm = function() {
                var random = Math.random() * 10;
                random = String(random).split('.')[0]
                if (random > 7 || random == 0) {
                    randomNUm();
                }
                return random;

            }
            var randomNum = randomNUm();

            data[i].abbrivation = abbrev_name(data[i].title);
            data[i].class = 'color_0' + randomNum;

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
        return res.json(data);
    });




});


router.post('/deactiveOpp', function(req, res) {
    oppService.deactiveOpp(req.body, function(err, result) {

        if (err != null || err != undefined || err != '') {
            return res.json({
                "msg": "SUCCESS",
                'status': true
            });
        }
        return res.json({
            "msg": "TRYP AGAIN",
            'status': false
        });
    });
});

router.post('/activeOppFun', function(req, res) {
    oppService.activeOppFun(req.body, function(err, result) {
        console.log(err);
        if (err != null || err != undefined || err != '') {
            return res.json({
                "msg": "SUCCESS",
                'status': true
            });
        }
        return res.json({
            "msg": "TRYP AGAIN",
            'status': false
        });
    });
});

router.post('/acceptInterviewRequest', function(req, res) {
    req.body.userId = req.session.userid;
    //console.log(req.body);
    oppService.acceptInterviewRequest(req.body, function(err, result) {
        if (err != null || err != undefined || err != '') {
            return res.json({
                "msg": "SUCCESS",
                'status': true
            });
        }
        return res.json({
            "msg": "TRYP AGAIN",
            'status': false
        });
    })
});

router.get('/getsavedstatus', function(req, res) {
    var data = req.body
    data.user_id = req.session.userid
    oppService.getStatus(data, function(err, result) {
        result[0].cout = req.body.cout;
        return res.json(result)
    });
});

router.post('/getInterReq', function(req, res) {
    var data = req.body
    data.user_id = req.session.userid
    oppService.getInterReq(data, function(err, result) {
        for (var i = 0; i < result.length; i++) {
            result[i].cout = req.body.cout;
        }
        return res.json(result)
    });
});

router.post('/getInterReqAcc', function(req, res) {
    var data = req.body
    data.user_id = req.session.userid
    oppService.getInterReqAcc(data, function(err, result) {
        for (var i = 0; i < result.length; i++) {
            result[i].cout = req.body.cout;
        }
        return res.json(result)
    });
});
router.post('/getInterReqDec', function(req, res) {
    var data = req.body
    data.user_id = req.session.userid
    oppService.getInterReqDec(data, function(err, result) {
        for (var i = 0; i < result.length; i++) {
            result[i].cout = req.body.cout;
        }
        return res.json(result)
    });
});

router.post('/saveopportunity', function(req, res) {
    value = req.body
    value.userid = req.session.userid
        //console.log(value)
    oppService.checkOpportunity(value, function(err, data) {
        // console.log("data is",data)
        if (data[0] == undefined) {
            oppService.saveOpportunity(value, function(err, result) {
                return res.json({
                    status: true
                })
            });
        } else if (data[0].saved_status == 0) {
            oppService.updatesaveOpp(value, function(err, result1) {
                return res.json({
                    status: true
                })
            })
        }

    })

});


router.post('/unsaveopportunity', function(req, res) {
    data = req.body
    data.userid = req.session.userid
    oppService.unsaveOpportunity(data, function(err, result) {
        return res.json({
            status: true
        })
    });
});


router.get('/getsavedopportunity', function(req, res) {
    value = req.session.userid
    oppService.getsavedopportunity(value, function(err, result) {
        return res.json(result)
    });
});

router.post('/getsavedopportunity1', function(req, res) {
    value = req.body
    oppService.getsavedopportunity1(value, function(err, result) {
        return res.json(result)
    });
});
router.post('/get_apply_opp_status', function(req, res) {
    value = req.body
    oppService.get_apply_opp_status(value, function(err, result) {
        return res.json(result)
    });
});


router.post('/sendrequest', function(req, res) {
    data = req.body
    data.userid = req.session.userid
    oppService.sendRequest(data, function(err, result) {
        return res.json({
            status: true
        })
    });
});

router.get('/getappliedopportunity', function(req, res) {
    var value = req.session.userid
        // console.log(value)
    oppService.getappliedopportunity(value, function(err, data) {
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

        if (data == undefined || data == '') {
            return res.json({
                status: false
            })
        }
        for (var i = data.length - 1; i >= 0; i--) {
            var asdf = i;
            database.getCommentCount(data[i]['id'], function(err, commenResult, index) {
                // console.log('===>',asdf);
            });

            var dateJson = dateDiff(new Date(data[i].request_datetime).getTime());

            if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0 && dateJson.minute == 0) {
                if (dateJson.second == 0) {
                    data[i].request_datetime = "Few Seconds Ago";
                } else {
                    data[i].request_datetime = dateJson.second + " Seconds Ago";
                }
            } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0) {
                data[i].request_datetime = dateJson.minute + " Minutes Ago";
            } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0) {
                data[i].request_datetime = dateJson.hour + " hour Ago";
            } else if (dateJson.year == 0 && dateJson.month == 0) {
                data[i].request_datetime = dateJson.day + " Day Ago";
            } else if (dateJson.year == 0) {
                data[i].request_datetime = dateJson.month + " Month Ago";
            } else if (dateJson.year != 0) {
                data[i].request_datetime = dateJson.year + " Year Ago";
            }

        }
        return res.json(data)
    });
});

//get Interview request api
router.post('/getinterviewrequest', function(req, res) {
    var value = req.body.userid
        //console.log(value)
    oppService.getinterviewrequest(value, function(err, data) {

        return res.json(data)
    });
});


//get Interview count api
router.post('/getinterviewcount', function(req, res) {
    var value = req.body.userid
        //console.log(value)
    oppService.getinterviewcount(value, function(err, data) {

        return res.json(data)
    });
});


//get applied count api
router.get('/getappliedcount', function(req, res) {
    var value = req.session.userid
        // console.log(value)
    oppService.getappliedcount(value, function(err, data) {

        return res.json(data)
    });
});

//Accept Interview request api
router.post('/acceptinterviewreq', function(req, res) {
    var value = req.body
    value.userid = req.session.userid
        //console.log(value)
    oppService.fetchInterview(value, function(err, result) {
        result[0].uid = req.session.userid
        result[0].opp_id = value.id
            // console.log(result);
        oppService.acceptinterviewReq(result, function(err, data) {

            return res.json(data)
        });
    })

});

/*//Accept  reschedule Interview request api
router.post('/acceptinterviewreq1',function(req, res){
var value=req.body
   value.userid=req.session.userid
  console.log(value)
  oppService.fetchInterview(value,function(err,result){
    result[0].uid=req.session.userid
    result[0].opp_id=value.id
       oppService.acceptinterviewReq(result,function(err, data){

        return res.json(data)
   });
  })
  
});*/



//Decline Interview request api
router.post('/declineinterviewreq', function(req, res) {
    var value = req.body
    value.userid = req.session.userid
        // console.log(value)
    oppService.fetchInterview(value, function(err, result) {
        result[0].uid = req.session.userid
        result[0].opp_id = value.id,
            result[0].notes = value.reason.reason
        oppService.declineinterviewReq(result, function(err, data) {

            return res.json(data)
        });
    })

});

//Reschedule Interview request api
router.post('/rescheduleinterviewreq', function(req, res) {
    var value = req.body
    value.userid = req.session.userid
    oppService.fetchInterview(value, function(err, result) {
        result[0].uid = req.session.userid
        result[0].opp_id = value.id
        result[0].date_time = value.date_time.date_time,
            result[0].notes = value.date_time.reason
        oppService.rescheduleinterviewReq(result, function(err, data) {

            return res.json(data)
        });
    })

});

//Cancel request api
router.get('/fetchstatus', function(req, res) {
    oppService.fetchStatus({
        data: req.session.userid
    }, function(err, result) {
        return res.json(result)
    });
});

router.post('/rescheduleAppointmentFromBusiness', function(req, res) {
    req.body.userId = req.session.userid;
    oppService.rescheduleAppointmentFromBusiness(req.body, function(err, result) {
        if (err != null || err != undefined || err != '') {
            return res.json({
                "msg": "SUCCESS",
                'status': true
            });
        }
        return res.json({
            "msg": "TRYP AGAIN",
            'status': false
        });
    })
});

router.post('/sendfollowup', function(req, res) {
    var data = req.body
    data.user_name = req.session.username
    data.user_type = req.session.usertype
    data.userid = req.session.userid
    database.fetchLogo(data, function(err, result1) {
        var notication = {}
        notication.type = 8
        database.fetchMessage(notication, function(err, result2) {
            if (result2 == undefined) {
                return res.json({
                    status: false
                })
            }
            var value = JSON.stringify({
                username: data.user_name,
                message: result2[0].master_message,
                logo: result1[0].logo,
                senderid: data.userid,
                type: result2[0].type,
                status: result2[0].status,
                title: data.title
            })
            data.message = value;
            data.notification_type = result2[0].type
            oppService.notificationInsert(data, function(err, result) {
                return res.json({
                    status: true
                })
            })

        })
    })
})

router.post('/appliednotification', function(req, res) {
    var data = req.body
    data.user_name = req.session.username
    data.user_type = req.session.usertype
    data.userid = req.session.userid
    console.log(data)
    database.fetchLogo(data, function(err, result1) {
        var notication = {}
        notication.type = 9
        database.fetchMessage(notication, function(err, result2) {
            if (result2 == undefined) {
                return res.json({
                    status: false
                })
            }
            var value = JSON.stringify({
                username: data.user_name,
                message: result2[0].master_message,
                logo: result1[0].logo,
                senderid: data.userid,
                type: result2[0].type,
                status: result2[0].status,
                title: data.title
            })
            data.message = value;
            data.notification_type = result2[0].type
            oppService.notificationInsert(data, function(err, result) {
                return res.json({
                    status: true
                })
            })

        })
    })
})

router.post('/acceptinterviewnotification', function(req, res) {
    var data = req.body
    data.user_name = req.session.username
    data.user_type = req.session.usertype
    data.userid = req.session.userid
    database.fetchLogo(data, function(err, result1) {
        var notication = {}
        notication.type = 10
        database.fetchMessage(notication, function(err, result2) {
            if (result2 == undefined) {
                return res.json({
                    status: false
                })
            }
            var value = JSON.stringify({
                username: data.user_name,
                message: result2[0].master_message,
                logo: result1[0].logo,
                senderid: data.userid,
                type: result2[0].type,
                status: result2[0].status,
                title: data.title
            })
            data.message = value;
            data.notification_type = result2[0].type
            console.log(data)
            oppService.notificationInsert(data, function(err, result) {
                return res.json({
                    status: true
                })
            })

        })
    })
})


router.post('/interviewacceptnotification', function(req, res) {
    var data = req.body
    data.user_name = req.session.username
    data.user_type = req.session.usertype
    data.userid = req.session.userid
    database.fetchLogo(data, function(err, result1) {
        var notication = {}
        notication.type = 11
        database.fetchMessage(notication, function(err, result2) {
            if (result2 == undefined) {
                return res.json({
                    status: false
                })
            }
            var value = JSON.stringify({
                username: data.user_name,
                message: result2[0].master_message,
                logo: result1[0].logo,
                senderid: data.userid,
                type: result2[0].type,
                status: result2[0].status,
                title: data.title
            })
            data.message = value;
            data.notification_type = result2[0].type
            oppService.notificationInsert(data, function(err, result) {
                return res.json({
                    status: true
                })
            })

        })
    })
})

router.post('/interviewdeclinenotification', function(req, res) {
    var data = req.body
    data.user_name = req.session.username
    data.user_type = req.session.usertype
    data.userid = req.session.userid
    database.fetchLogo(data, function(err, result1) {
        var notication = {}
        notication.type = 12
        database.fetchMessage(notication, function(err, result2) {
            if (result2 == undefined) {
                return res.json({
                    status: false
                })
            }
            var value = JSON.stringify({
                username: data.user_name,
                message: result2[0].master_message,
                logo: result1[0].logo,
                senderid: data.userid,
                type: result2[0].type,
                status: result2[0].status,
                title: data.title
            })
            data.message = value;
            data.notification_type = result2[0].type
            oppService.notificationInsert(data, function(err, result) {
                return res.json({
                    status: true
                })
            })

        })
    })
})


router.post('/interviewreschdulenotification', function(req, res) {
    var data = req.body
    data.user_name = req.session.username
    data.user_type = req.session.usertype
    data.userid = req.session.userid
    database.fetchLogo(data, function(err, result1) {
        var notication = {}
        notication.type = 13
        database.fetchMessage(notication, function(err, result2) {
            if (result2 == undefined) {
                return res.json({
                    status: false
                })
            }
            var value = JSON.stringify({
                username: data.user_name,
                message: result2[0].master_message,
                logo: result1[0].logo,
                senderid: data.userid,
                type: result2[0].type,
                status: result2[0].status,
                title: data.title
            })
            data.message = value;
            data.notification_type = result2[0].type
            oppService.notificationInsert(data, function(err, result) {
                return res.json({
                    status: true
                })
            })

        })
    })
})


router.post('/getopportunitydetail', function(req, res) {
    var data = req.body
    data.userid = req.session.userid
    oppService.getOppdetail(data, function(err, result) {
        return res.json(result)
    });
});

router.post('/getOpportunity_status', function(req, res) {
    var data = req.body
    oppService.opportunity_status(data, function(err, result) {
        return res.json(result);
    });
});

router.post('/virtual', function(req, res) {
    var data = req.body
    data.userid = req.session.userid
    oppService.virtual_status(data, function(err, result) {
        return res.json(result);
    });
});

router.post('/virtual_user', function(req, res) {
    var data = req.body
    data.userid = req.session.userid
    oppService.virtual_status_user(data, function(err, result) {
        return res.json(result);
    });
});

router.post('/likeNotification', function(req, res) {
    var data = req.body
    data.user_name = req.session.username
    data.user_type = req.session.usertype
    data.userid = req.session.userid
    database.fetchLogo(data, function(err, result1) {
        var notication = {}
        notication.type = 3
        database.fetchMessage(notication, function(err, result2) {
            if (result2 == undefined) {
                return res.json({
                    status: false
                })
            }
            var value = JSON.stringify({
                username: data.user_name,
                message: result2[0].master_message,
                logo: result1[0].logo,
                senderid: data.userid,
                type: result2[0].type,
                status: result2[0].status,
                title: data.title
            })
            data.message = value;
            data.notification_type = result2[0].type
            oppService.notificationInsert(data, function(err, result) {
                return res.json({
                    status: true
                })
            })

        })
    })
});

router.post('/comment_Notification', function(req, res) {
    var data = req.body
    data.user_name = req.session.username
    data.user_type = req.session.usertype
    data.userid = req.session.userid
    database.fetchLogo(data, function(err, result1) {
        var notication = {}
        notication.type = 2
        database.fetchMessage(notication, function(err, result2) {
            if (result2 == undefined) {
                return res.json({
                    status: false
                })
            }
            var value = JSON.stringify({
                username: data.user_name,
                message: result2[0].master_message,
                logo: result1[0].logo,
                senderid: data.userid,
                type: result2[0].type,
                status: result2[0].status,
                title: data.title
            })
            data.message = value;
            data.notification_type = result2[0].type
            oppService.notificationInsert(data, function(err, result) {
                return res.json({
                    status: true
                })
            })

        })
    })
});

router.post('/comment_reply_Notification', function(req, res) {
    var data = req.body
    data.user_name = req.session.username
    data.user_type = req.session.usertype
    data.userid = req.session.userid
    database.fetchLogo(data, function(err, result1) {
        var notication = {}
        notication.type = 14
        database.fetchMessage(notication, function(err, result2) {
            if (result2 == undefined) {
                return res.json({
                    status: false
                })
            }
            var value = JSON.stringify({
                username: data.user_name,
                message: result2[0].master_message,
                logo: result1[0].logo,
                senderid: data.userid,
                type: result2[0].type,
                status: result2[0].status,
                title: data.title
            })
            data.message = value;
            data.notification_type = result2[0].type
            oppService.notificationComment_reply(data, function(err, result) {
                return res.json({
                    status: true
                })
            })

        })
    })
});

router.post('/like_comment_Notification', function(req, res) {
    var data = req.body
    data.user_name = req.session.username
    data.user_type = req.session.usertype
    data.userid = req.session.userid
    database.fetchLogo(data, function(err, result1) {
        var notication = {}
        notication.type = 15
        database.fetchMessage(notication, function(err, result2) {
            if (result2 == undefined) {
                return res.json({
                    status: false
                })
            }
            var value = JSON.stringify({
                username: data.user_name,
                message: result2[0].master_message,
                logo: result1[0].logo,
                senderid: data.userid,
                type: result2[0].type,
                status: result2[0].status,
                title: data.title
            })
            data.message = value;
            data.notification_type = result2[0].type
            oppService.notificationLiked_reply(data, function(err, result) {
                return res.json({
                    status: true
                })
            })

        })
    })
});



module.exports = router;
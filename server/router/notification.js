var express=require('express');
var cookieParser = require('cookie-parser');
var router=express.Router();
var database=require('../model/database');
var notificationService=require('../services/notification');
var multer  = require('multer');
var path=require('path');
var md5 = require('md5');
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');

router.get('/check', function(req, res){
    ////console.log("HELLO notiy !");
});
// get notification from user notification api
router.post('/getnotification', function(req, res){
    var data =req.body
     data.userid=req.session.userid
    notificationService.fetchNotification(data,function(err, data){
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

             if(data == undefined){
                 return res.json({status:false})
             }
             else{

            for (var i = data.length - 1; i >= 0; i--) {






                if (data[i].like_status == null || data[i].like_status == undefined || data[i].like_status == 0) {
                    data[i].like_status = false;
                } else {
                    data[i].like_status = true;
                }
                var dateJson = dateDiff(new Date(data[i].created_date).getTime());

                if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0 && dateJson.minute == 0) {
                    if (dateJson.second == 0) {
                        data[i].created_date = "Now";
                    } else {
                        data[i].created_date = dateJson.second + " Seconds Ago";
                    }
                } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0) {
                    data[i].created_date = dateJson.minute + " Minutes Ago";
                } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0) {
                   if(dateJson.hour > 1){
                    data[i].created_date = dateJson.hour + " hours Ago";
                  }else{
                    data[i].created_date = dateJson.hour + " hour Ago";
                   }
                } else if (dateJson.year == 0 && dateJson.month == 0) {
                    if(dateJson.day > 1){

                    data[i].created_date = dateJson.day + " Days Ago";
                    }else{
                    data[i].created_date = dateJson.day + " Day Ago";
                     }

                } else if (dateJson.year == 0) {
                    if(dateJson.month > 1){
                    data[i].created_date = dateJson.month + " Months Ago";

                    }else{

                    data[i].created_date = dateJson.month + " Month Ago";
                    }
                } else if (dateJson.year != 0) {
                    if(dateJson.year > 1){
                    data[i].created_date = dateJson.year + " Years Ago";

                    }else{

                    data[i].created_date = dateJson.year + " Year Ago";
                    }
                }

            }         
          }
           for (var i = 0; i < data.length; i++) {
                var message=JSON.parse( data[i].message)
                   data[i].message=message
            }
        return res.json(data)
    })
});


// get earlier notification from user notification api
router.post('/getearliernotification', function(req, res){
    var data =req.body
     data.userid=req.session.userid
    notificationService.fetchearlierNotification(data,function(err, data){
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

                 if(data == undefined){
                     return res.json({status:false})
                 }
            for (var i = data.length - 1; i >= 0; i--) {






                if (data[i].like_status == null || data[i].like_status == undefined || data[i].like_status == 0) {
                    data[i].like_status = false;
                } else {
                    data[i].like_status = true;
                }
                var dateJson = dateDiff(new Date(data[i].created_date).getTime());

                if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0 && dateJson.minute == 0) {
                    if (dateJson.second == 0) {
                        data[i].created_date = "Now";
                    } else {
                        data[i].created_date = dateJson.second + " Seconds Ago";
                    }
                } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0 && dateJson.hour == 0) {
                    data[i].created_date = dateJson.minute + " Minutes Ago";
                } else if (dateJson.year == 0 && dateJson.month == 0 && dateJson.day == 0) {
                   if(dateJson.hour > 1){
                    data[i].created_date = dateJson.hour + " hours Ago";
                  }else{
                    data[i].created_date = dateJson.hour + " hour Ago";
                   }
                } else if (dateJson.year == 0 && dateJson.month == 0) {
                    if(dateJson.day > 1){

                    data[i].created_date = dateJson.day + " Days Ago";
                    }else{
                    data[i].created_date = dateJson.day + " Day Ago";
                     }

                } else if (dateJson.year == 0) {
                    if(dateJson.month > 1){
                    data[i].created_date = dateJson.month + " Months Ago";

                    }else{

                    data[i].created_date = dateJson.month + " Month Ago";
                    }
                } else if (dateJson.year != 0) {
                    if(dateJson.year > 1){
                    data[i].created_date = dateJson.year + " Years Ago";

                    }else{

                    data[i].created_date = dateJson.year + " Year Ago";
                    }
                }

            }
            for (var i = 0; i < data.length; i++) {
                var message=JSON.parse( data[i].message)
                   data[i].message=message
               /* ////console.log("testing",data[i])*/
            }
           
        return res.json(data)
    })
});


//get notification count api
router.post('/seennotification', function(req, res){
    var data=req.body
    ////console.log(data)
    notificationService.notificationSeen(data,function(err, result){
        return res.json({status:true})
    })
});
router.post('/getsuggestion', function(req, res){
    var data=req.body
    data.userid=req.session.userid
    notificationService.getsuggestion(data,function(err, result){
        return res.json(result)
    })
});



router.post("/getOpportunities",function(req,res){
   // //console.log("oper*********",req.body)
   var data={}
   data=req.body
   data.userid=req.session.userid
    notificationService.getOpportunities(data,function(err,result){
        return res.json(result)
    })
})
router.post("/getOpportunities1",function(req,res){
   ////console.log("oper*********",req.body)
    var data={}
   data=req.body
   data.userid=req.session.userid
    notificationService.getOpportunities1(data,function(err,result){
        return res.json(result)
    })
})
router.post("/getOpportunitiesCount",function(req,res){
   // //console.log("oper*********",req.body)
    var data={}
   data=req.body
   data.userid=req.session.userid
    notificationService.getOpportunitiesCount(data,function(err,result){
        return res.json(result)
    })
})
router.post('/getsuggestion1', function(req, res){
    var data=req.body

    data.userid=req.session.userid
    ////console.log("hello----------------------***",data)
    notificationService.getsuggestion(data,function(err, result){
        return res.json(result)
    })
});
router.post("/getconnectioncountting",function(req,res){
  //  //console.log("hello amdni+++++++++-----------",req.body)
    var i =req.body.i
    notificationService.getconnectioncountting(req.body,function(req,result){
       ////console.log("req*******",req.body)
       result[0].i=i;
        return res.json(result);
    })
})
router.get("/suggestioncounting",function(req,res){
  var data={}
  data.userid=req.session.userid
    notificationService.suggestioncounting(data,function(req,result){
        return res.json(result);
    })
})

//get all notification count api
router.get('/allnotificationCount', function(req, res){
    data = req.session.userid;
    notificationService.allnotificationCount(data,function(err, result){
        return res.json(result)
    })
});

//read al notification
router.get('/readnoti', function(req, res){
    data = req.session.userid;
    notificationService.readallnotification(data,function(err, result){
        return res.json({status:true})
    })
});

//read al notification
router.get('/readnoti_count', function(req, res){
    data = req.session.userid;
    notificationService.readallnotification_count(data,function(err, result){
        return res.json({status:true})
    })
});

//read status notification
router.get('/getstatus', function(req, res){
    data = req.session.userid;
    notificationService.getReadStatus(data,function(err, result){
        return res.json(result)
    })
});




//delte notification api
router.post('/deletenotification', function(req, res){
    var data=req.body
    notificationService.deleteNotification(data,function(err, result){
        return res.json({status:true})
    })
});

//hide notification api
router.post('/hidenotification', function(req, res){
    var data=req.body
    data.userid=req.session.userid
    notificationService.hideNotification(data,function(err, result){
        return res.json({status:true})
    })
});

//getting pic_id in notification api
router.post('/getPic', function(req, res){
    var data=req.body
    var j=data.i;
    notificationService.getPic(data,function(err, result){
        if(result[0] != undefined || result[0] != '' || result[0] != null ){
         result[0].i=j
            } 
       
        return res.json(result)
    })
});

//mark as read notification api
router.post('/markread', function(req, res){
    var data=req.body
    notificationService.markRead(data,function(err, result){
        return res.json({status:true})
    })
});

module.exports=router;


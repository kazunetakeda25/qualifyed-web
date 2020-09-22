var conn = require('../config/connection');
// conn.connect();

var database=new function() {
	// To create new opportunity
	this.createOpportunity=function(data,callback){
        var skil = JSON.stringify(data.skills);

    	var insertData = {};
    	if(data != '')
    	{
    		insertData.user_id = data.user_login_id;
    		insertData.title = data.post_title;
    		insertData.description = data.discription;
    		insertData.country_id = data.country;
    		insertData.state_id = data.state;
    		insertData.city = data.city;
    		insertData.zipcode = data.zipcode;
    		insertData.longvity_classification = data.longevity;
    		insertData.duration = data.opportunity_days;
    		insertData.duration_unit = data.day_type;
    		insertData.employment = data.opp_employee;
    		insertData.pay = data.opp_pay;
    		insertData.skills_ids = skil;
            insertData.prefrences = data.prefrences;
            insertData.tuition = data.tuition;
    		// insertData.last_date_for_apply = data.last_date;
    		insertData.is_published = 1;
    		insertData.created_date = new Date();
    	}

        var searchData = {
            entity_id : 1,
            element_id : 0,
            user_login_id:data.user_login_id,
            is_published : 1,
            title : data.post_title,
            country : data.country,
            state : data.state,
            city : data.city,
            skills : skil,
            description : data.discription,
            pic_path : "",
            email : "",
            phone : "",
            prefrences:data.prefrences
        }

        var selectQuery = "SELECT t1.phone, t2.email, t3.name FROM bussiness_profile as t1 LEFT JOIN user_login as t2 ON t2.id = t1.loginid LEFT JOIN files_record as t3 ON t3.id = t1.profile_pic_id WHERE t1.loginid = "+data.user_login_id;
    	var query = "insert into opportunities set ? ";
        var insertQ = "INSERT INTO search SET ? ";
	    conn.query(query,insertData,function(err,resu){
	    	if(err)
	    	{
	    		console.log(err);
	    	}
            searchData.element_id = resu.insertId;
            conn.query(selectQuery,function(err,resul){
                if(err)
                {
                    console.log(err);
                }
                searchData.pic_path = resul[0].name;
                searchData.email = resul[0].email;
                searchData.phone = resul[0].phone;
                conn.query(insertQ,searchData,function(err,result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result)
                });
            });
	    });
	}


    this.editOpportunity=function(data,callback){
        console.log(data)
        var skil = JSON.stringify(data.skills);

        var insertData = {};
        if(data != '')
        {
            insertData.user_id = data.user_login_id;
            insertData.title = data.post_title;
            insertData.description = data.discription;
            insertData.country_id = data.country;
            insertData.state_id = data.state;
            insertData.city = data.city;
            insertData.zipcode = data.zipcode;
            insertData.longvity_classification = data.longevity;
            insertData.duration = data.opportunity_days;
            insertData.duration_unit = data.day_type;
            insertData.employment = data.opp_employee;
            insertData.pay = data.opp_pay;
            insertData.skills_ids = skil;
            insertData.prefrences = data.prefrences;
            insertData.tuition = data.tuition;
            // insertData.last_date_for_apply = data.last_date;
            insertData.is_published = 1;
            //insertData.created_date = new Date();
        }

        var searchData = {
            entity_id : 1,
           // element_id : 0,
            user_login_id:data.user_login_id,
            is_published : 1,
            title : data.post_title,
            country : data.country,
            state : data.state,
            city : data.city,
            skills : skil,
            description : data.discription,
            prefrences:data.prefrences
        }
         

        //var selectQuery = "SELECT t1.phone, t2.email, t3.name FROM bussiness_profile as t1 LEFT JOIN user_login as t2 ON t2.id = t1.loginid LEFT JOIN files_record as t3 ON t3.id = t1.profile_pic_id WHERE t1.loginid = "+data.user_login_id;
        var query = "update opportunities set ? where id = "+data.id;
        var insertQ = "update search SET ? where element_id = "+data.id;
        conn.query(query,insertData,function(err,resu){
            if(err)
            {
                console.log(err);
            }
            //searchData.element_id = resu.insertId;
          /*  conn.query(selectQuery,function(err,resul){
                if(err)
                {
                    console.log(err);
                }
                searchData.pic_path = resul[0].name;
                searchData.email = resul[0].email;
                searchData.phone = resul[0].phone;*/
                conn.query(insertQ,searchData,function(err,result){
                    if(err)
                    {
                        console.log(err);
                    }
                    callback(err,result)
                });
            });
    }

    this.getReason = function(data, callback)
    {
        var query = "SELECT rejection_note, reschedule_request_date FROM oppprtunity_interview_logs WHERE interview_request_id = "+data.id+" and user_id = "+data.user_id+" and opportunity_id = "+data.oppId+" and status = "+data.status+" ORDER BY id desc LIMIT 1"
        conn.query(query,false,function(err,data){
            if(err)
            {
                console.log(err);
            }
            callback(err,data)
        })   
    }

    this.getInterScheduleReq = function(data, callback)
    {
        var query = "SELECT t1.id, t1.opportunity_id as oppuID,t1.interview_type,t4.reschedule_request_date as Newtime ,t4.interview_date as old_time ,t4.rejection_note as notes,t1.request_status,t1.user_id , t2.name, t3.name as profile FROM opportunit_interview_request as t1 LEFT JOIN users as t2 ON t2.login_id = t1.user_id LEFT JOIN files_record as t3 ON t3.id = t2.profile_pic_id LEFT JOIN oppprtunity_interview_logs as t4 ON t4.id = (SELECT t7.id as OID FROM oppprtunity_interview_logs as t7 WHERE t7.opportunity_id = "+data.id+" AND t7.status = 2 ORDER BY t1.id DESC LIMIT 1) WHERE t1.opportunity_id = "+data.id+" and t1.request_status IN(5,7)"
        conn.query(query,false,function(err,data){
            if(err)
            {
                console.log(err);
            }
            callback(err,data)
        })
    }


    this.dashCount = function(data,callback)
    {
        query = 'SELECT COUNT(t1.id) as count FROM `opportunit_interview_request` as t1 LEFT JOIN opportunities as t2 ON t2.id = t1.opportunity_id WHERE t2.user_id = '+data.id+" and t1.request_status = 1 ";
        conn.query(query,false,function(err,data){
            if(err)
            {
                console.log(err);
            }
            callback(err,data)
        })
    }
    this.getBusinessData = function(data, callback)
    {
        searchSql = "SELECT t1.* , t2.* FROM user_login as t1 LEFT JOIN bussiness_profile as t2 ON t2.loginid = t1.id WHERE t1.id = "+data.data;
        conn.query(searchSql,false,function(err,data){
            if(err)
            {
                console.log(err);
            }

            callback(err,data)
        })
    }
    this.getAllOppBus = function(data, callback)
    {
        var date = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
        // date(last_date_for_apply) >= date('"+date+"')
        searchSql = "SELECT id,title, description,created_date,last_date_for_apply FROM opportunities WHERE is_published = "+data.state+" and user_id = "+data.data+" and is_closed = 1";
        conn.query(searchSql,false,function(err,data){
            if(err)
            {
                console.log(err);
            }

            callback(err,data)
        })   
    } 
    this.getAllOppBus1 = function(data, callback)
    {
        var date = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
        //searchSql = "SELECT id,title, description,created_date,last_date_for_apply FROM opportunities WHERE is_published = "+data.state+" and user_id = "+data.userid+" and date(last_date_for_apply) >= date('"+date+"')";
        searchSql = "SELECT id,title, description,created_date,last_date_for_apply,skills_ids FROM opportunities WHERE is_published ="+data.state+" AND is_closed =1 and user_id ="+data.userid+" AND id not in(SELECT opportunity_id FROM `opportunit_interview_request` WHERE user_id ="+data.userid+" )";
       //searchSql = "SELECT t1.id,t1.title, t1.description,t1.created_date,t1.last_date_for_apply,t2.request_status FROM opportunities AS t1 LEFT JOIN opportunit_interview_request AS t2 ON t2.opportunity_id =t1.id WHERE t1.is_published = "+data.state+" and t1.user_id = "+data.userid+" and date(last_date_for_apply) >= date('"+date+"') and t2.request_status != 1 ";
       // console.log("opp==============>",searchSql)
        conn.query(searchSql,false,function(err,data){
            if(err)
            {
                console.log(err);
            }
        //console.log("opp==============>",data)

            callback(err,data)
        })   
    }
    this.deactiveOpp = function(data, callback)
    {
        updateSql = "UPDATE opportunities SET is_published = 0 WHERE id = "+data.id;
        updateSql1 = "UPDATE search SET is_published = 0 WHERE element_id = "+data.id;
        
        conn.query(updateSql,false,function(err,data){
            if(err)
            {
                console.log(err);
            }
            conn.query(updateSql1,false,function(err,data){
                if(err)
                {
                    console.log(err);
                }

                callback(err,data)
            }) 
        }) 
    }

    this.activeOppFun = function(data, callback)
    {
        updateSql = "UPDATE opportunities SET is_published = 1 WHERE id = "+data.id;
        updateSql1 = "UPDATE search SET is_published = 1 WHERE element_id = "+data.id;

        conn.query(updateSql,false,function(err,data){
            if(err)
            {
                console.log(err);
            }
            conn.query(updateSql1,false,function(err,data){
                if(err)
                {
                    console.log(err);
                }

                callback(err,data)
            }) 
            // callback(err,data)
        }) 
    }

        this.checkAppliedopp = function(data, callback)
    {
       var query="select opportunity_id from opportunit_interview_request where user_id ="+data.userid

        conn.query(query,false,function(err,data){
            if(err)
            {
                console.log(err);
            }

             callback(err,data)
        }) 
    }

    this.getOpportunity=function(data,callback){
    var html = '';
    if(Object.keys(data.location).length - 1 >= 0)
    {
      for (var i = 0; i <= 4; i++) {
        if(i == 0)
        {
          html += 'AND ( master_state.name like ';
        }
        else if(i == 1){
          html += ' OR master_country.name like ';
        }else if(i == 2)
        {
          html += ' OR opportunities.city like ';
        }else if(i == 3)
        {
          html += ' OR opportunities.zipcode like ';
        }
        else if(i == 4)
        {
          html += ' OR master_country.sortname like ';
        }
        for( var obj in data.location ) {
           if(obj == (Object.keys(data.location).length - 1)){
               html += '"%'+data.location[obj]+'%"';
            }else{
               html += '"%'+data.location[obj]+'%" OR ';
            }
        }
      }
      html += ')';
    }
var date = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
    var sql="select opportunities.* ,master_state.name,master_country.name as country_name,bussiness_profile.profile_pic_id,bussiness_profile.name as titlename,files_record.name as logo,oi.id as applied_id from opportunities LEFT JOIN master_state on opportunities.state_id=master_state.id LEFT JOIN master_country ON opportunities.country_id =  master_country.id LEFT JOIN bussiness_profile ON opportunities.user_id = bussiness_profile.loginid LEFT JOIN files_record ON bussiness_profile.profile_pic_id = files_record.id LEFT JOIN opportunit_interview_request as oi ON oi.opportunity_id = opportunities.id AND oi.user_id = "+data.userid+" where opportunities.title LIKE '%"+data.opp+"%'"+html+" and opportunities.is_published=1 and opportunities.is_closed=1  AND opportunities.id NOT IN("+data.opp_ids+") AND opportunities.user_id NOT IN("+data.blockedIds+") limit 0,12";
    conn.query(sql,function(err,data){
    if (err) {
       console.log(err);
    }
    callback(err,data);
  })
}

this.getStatus=function(data,callback){
    var sql="SELECT count(id) as saved_status FROM `user_saved_opportunity` WHERE opportunity_id = "+data.id+" AND user_id ="+data.user_id+" AND saved_status = 1" 
      conn.query(sql,function(err,data){
    if (err) {
       console.log(err);
    }
    callback(err,data);

  })
}

this.fetchStatus=function(data,callback){
    var sql="SELECT request_status FROM `user_saved_opportunity` WHERE opportunity_id = "+data.id+" AND user_id ="+data.user_id+" AND saved_status = 1" 
      conn.query(sql,function(err,data){
    if (err) {
       console.log(err);
    }
    callback(err,data);

  })
}

this.virtual_status=function(data,callback){
    var sql="SELECT COUNT(t1.id) AS id FROM opportunit_interview_request AS t1 LEFT JOIN opportunities AS t2 ON t1.opportunity_id =t2.id AND t2.user_id ="+data.userid+" where t1.user_id ="+data.id+" AND t1.request_status != 6 AND t1.request_status != 3 AND t2.is_closed =1" 
      conn.query(sql,function(err,data){
    if (err) {
       console.log(err);
    }
    callback(err,data);

  })
}

this.virtual_status_user=function(data,callback){
    var sql="SELECT COUNT(t1.id) AS id FROM opportunit_interview_request AS t1 LEFT JOIN opportunities AS t2 ON t1.opportunity_id =t2.id AND t2.user_id ="+data.id+" where t1.user_id ="+data.userid+" AND t1.request_status != 6 AND t1.request_status != 3 AND t2.is_closed =1" 
      conn.query(sql,function(err,data){
    if (err) {
       console.log(err);
    }
    callback(err,data);

  })
}

this.saveOpportunity=function(data,callback){
    var sql="insert into user_saved_opportunity SET?"
    var formdata={
            opportunity_id:data.id,
            user_id:data.userid,
            created_date:new Date()
    }
      conn.query(sql,formdata,function(err,data){
    if (err) {
       console.log(err);
    }
    callback(err,data);
  })
}



    this.getInterReq = function(data, callback)
    {
        var sql="SELECT t1.id, t1.opportunity_id as oppuID, t1.request_status,t1.user_id , t2.name, t3.name as profile FROM opportunit_interview_request as t1 LEFT JOIN users as t2 ON t2.login_id = t1.user_id LEFT JOIN files_record as t3 ON t3.id = t2.profile_pic_id WHERE t1.opportunity_id = "+data.id+" and t1.request_status = 1";
        conn.query(sql,function(err,data){
        if (err) {
           console.log(err);
        }
        callback(err,data);
      })

    }

    this.getInterReqAcc = function(data, callback)
    {
        var sql="SELECT t1.id, t1.opportunity_id as oppuID, t1.request_status,t1.user_id ,t1.interview_type as interview_type, t2.name, t3.name as profile FROM opportunit_interview_request as t1 LEFT JOIN users as t2 ON t2.login_id = t1.user_id LEFT JOIN files_record as t3 ON t3.id = t2.profile_pic_id WHERE t1.opportunity_id = "+data.id+" and t1.request_status IN (2,4) ";
        conn.query(sql,function(err,data){
        if (err) {
           console.log(err);
        }
        console.log(data);
        callback(err,data);
      })

    }

    this.getInterReqDec = function(data, callback)
    {
        var sql="SELECT t1.id, t1.opportunity_id as oppuID, t1.request_status,t1.user_id , t2.name, t3.name as profile FROM opportunit_interview_request as t1 LEFT JOIN users as t2 ON t2.login_id = t1.user_id LEFT JOIN files_record as t3 ON t3.id = t2.profile_pic_id WHERE t1.opportunity_id = "+data.id+" and t1.request_status IN (3,6)";
        conn.query(sql,function(err,data){
        if (err) {
           console.log(err);
        }
        console.log(data);
        callback(err,data);
      })

    }
    this.declineRequestInt = function(data, callback)
    {
        var sql = "INSERT INTO oppprtunity_interview_logs SET ?";
        var updateSql = "UPDATE opportunit_interview_request SET request_status = 3 WHERE opportunity_id = "+data.oppId+" AND user_id = "+data.user_id;
        console.log(updateSql);
        var insertdata = {
            interview_request_id : data.intReq,
            user_id : data.user_id,
            business_id : data.userId,
            opportunity_id : data.oppId,
            responded_by : data.userId,
            rejection_note : data.notes,
            status : 4,
            interview_type:data.inter_type
        }

        conn.query(sql,insertdata,function(err,data){
            if (err) {
               console.log(err);
            }
            conn.query(updateSql,false,function(err,data){
                if (err) {
                    console.log(err);
                }
                callback(err,data);
            })
        
        })
    }

 this.rescRequestInt = function(data, callback)
    {

        var sql = "INSERT INTO oppprtunity_interview_logs SET ?";
        var updateSql = "UPDATE opportunit_interview_request SET request_status = 4 WHERE opportunity_id = "+data.oppId+" AND user_id = "+data.user_id;
        var selectSql = "SELECT * FROM oppprtunity_interview_logs WHERE opportunity_id = "+data.oppId+" and user_id = "+data.user_id+" ORDER BY id DESC LIMIT 0,1";

        var insertdata = {
            interview_request_id : data.interReqId,
            user_id : data.user_id,
            business_id : data.BUId,
            opportunity_id : data.oppId,
            responded_by : data.BUId,
            status : 2,
            interview_type:data.inter_type
        }

            conn.query(updateSql,false,function(err,data){
                if (err) {
                    console.log(err);
                }
                conn.query(selectSql, false, function(err, res1){
                    if(err)
                    {
                        console.log(err);
                    }
                    if(res1.length > 0)
                    {
                        insertdata.parent_id = res1[0].id;
                        interview_date = res1[0].reschedule_request_date;    
                    }
                    conn.query(sql,insertdata,function(err,data){
                        if (err) {
                           console.log(err);
                        }
                        callback(err,data);
                    })
                })
            })

        return false;
    }

    this.acceptInterviewRequest = function(data, callback)
    {
        var sql = "INSERT INTO oppprtunity_interview_logs SET ?";
        var updateSql = "UPDATE opportunit_interview_request SET request_status = 2, interview_datetime     = '"+data.date_time.date_time+"',interview_type= "+data.date_time.interview_type+"  WHERE opportunity_id = "+data.opp+" AND user_id = "+data.user_id;
        var insertdata = {
            interview_request_id : data.id,
            user_id : data.user_id,
            business_id : data.userId,
            opportunity_id : data.opp,
            responded_by : data.userId,
            interview_date : data.date_time.date_time,
            status : 1,
            interview_type :data.date_time.interview_type
        }

        conn.query(sql,insertdata,function(err,data){
            if (err) {
               console.log(err);
            }
            conn.query(updateSql,false,function(err,data){
                if (err) {
                    console.log(err);
                }
                callback(err,data);
            })
        
        })
    }
this.unsaveOpportunity=function(data,callback){
    console.log("here",data)
    var sql="update user_saved_opportunity SET? where opportunity_id="+data.id+" and user_id ="+data.userid;
    var formdata={
           saved_status:0 
    }
      conn.query(sql,formdata,function(err,data){
    if (err) {
       console.log(err);
    }
    callback(err,data);
  })
}

this.updatesaveOpp=function(data,callback){
    var sql="update user_saved_opportunity SET? where opportunity_id="+data.id+" and user_id ="+data.userid;
    var formdata={
           saved_status:1 
    }
      conn.query(sql,formdata,function(err,data){
    if (err) {
       console.log(err);
    }
    callback(err,data);
  })
}

this.checkOpportunity=function(data,callback){
    var sql="select saved_status from user_saved_opportunity where opportunity_id="+data.id+" and user_id="+data.userid+" and saved_status = 0";
   
      conn.query(sql,function(err,data){
    if (err) {
       console.log(err);
    }
    callback(err,data);
  })
}

this.getsavedopportunity=function(data,callback){
    var sql="SELECT t1.*,op.title,op.city,op.country_id,op.state_id,op.created_date,op.last_date_for_apply,mc.name as country_name, ms.name as state_name,us.name as business_name,us.loginid as id , fr.name as file_name FROM `user_saved_opportunity` as t1 LEFT JOIN opportunities as op ON op.id = t1.opportunity_id LEFT JOIN master_country as mc ON mc.id = op.country_id LEFT JOIN master_state as ms ON ms.id = op.state_id LEFT JOIN bussiness_profile as us ON us.loginid = op.user_id LEFT JOIN files_record as fr ON fr.id = us.profile_pic_id WHERE t1.user_id ="+data+" and t1.saved_status=1 and op.is_published =1 and op.is_closed =1"
   
      conn.query(sql,function(err,data){
    if (err) {
       console.log(err);
    }
    callback(err,data);
  })
}

this.getsavedopportunity1=function(data,callback){
    var sql="select * from user_saved_opportunity where opportunity_id ='"+data.id+" and status =1'"
   
      conn.query(sql,function(err,data){
    if (err) {
       console.log(err);
    }
    callback(err,data);
  })
}

this.get_apply_opp_status=function(data,callback){
    var sql="select * from opportunit_interview_request where opportunity_id ="+data.id+" and user_id = "+data.userid+" "
   
      conn.query(sql,function(err,data){
    if (err) {
       console.log(err);
    }
    callback(err,data);
  })
}

this.checkopp=function(data,callback){
    var sql="SELECT is_published,is_closed FROM `opportunities` where id ="+data.id
   
      conn.query(sql,function(err,data){
    if (err) {
       console.log(err);
    }
    callback(err,data);
  })
}

this.sendRequest=function(value,callback){
    var sql="insert into opportunit_interview_request SET?"
    var formdata={
            opportunity_id:value.id,
            user_id:value.userid,
            request_datetime:new Date()
    }
      conn.query(sql,formdata,function(err,data){
    if (err) {
       console.log(err);
    }
    var sql1="update user_saved_opportunity SET? where opportunity_id="+value.id+" and user_id ="+value.userid;
    var formdata1={
           saved_status:2 
    }
      conn.query(sql1,formdata1,function(err,data1){
    if (err) {
       console.log(err);
    }
   callback(err,data1);
  })
    
  })
}

this.getappliedopportunity=function(data,callback){
    var sql="SELECT t1.*,op.title,op.city,op.country_id,op.state_id,op.created_date,mc.name as country_name, ms.name as state_name,us.name as business_name,us.loginid as connection_id , fr.name as file_name FROM `opportunit_interview_request` as t1 LEFT JOIN opportunities as op ON op.id = t1.opportunity_id LEFT JOIN master_country as mc ON mc.id = op.country_id LEFT JOIN master_state as ms ON ms.id = op.state_id LEFT JOIN bussiness_profile as us ON us.loginid = op.user_id LEFT JOIN files_record as fr ON fr.id = us.profile_pic_id WHERE t1.user_id ="+data+" and request_status = 1 and op.is_published =1 and op.is_closed=1"
   
      conn.query(sql,function(err,data){
    if (err) {
       console.log(err);
    }
    callback(err,data);
  })
}


this.getinterviewrequest=function(data,callback){
    var sql="select t2.name as profile,t2.loginid as user_id, t3.name as logo, t4.name as country , t5.name as state,t6.title,t6.id,t1.opportunity_id,t1.interview_datetime, t1.request_status,t1.interview_type FROM opportunit_interview_request as t1 LEFT JOIN opportunities as t6 ON t6.id = t1.opportunity_id LEFT JOIN bussiness_profile as t2 ON t2.loginid = t6.user_id LEFT JOIN files_record as t3 ON t3.id = t2.profile_pic_id LEFT JOIN master_country as t4 ON t4.id = t2.country_id LEFT JOIN master_state as t5 ON t5.id = t2.state_id WHERE t1.request_status != 1 and t1.user_id = "+data+" and t6.is_published =1 and t6.is_closed =1"
      conn.query(sql,function(err,data){
    if (err) {
       console.log(err);
    }
    callback(err,data);
  })
}

  this.acceptinterviewReq = function(data, callback)
    {
        
        var sql = "INSERT INTO oppprtunity_interview_logs SET ?";
        var updateSql = "UPDATE opportunit_interview_request SET request_status = 4 WHERE opportunity_id = "+data[0].opp_id+" AND user_id = "+data[0].uid;
        var insertdata = {
            interview_request_id : data[0].interview_request_id,
            user_id : data[0].uid,
            business_id : data[0].business_id,
            opportunity_id : data[0].opportunity_id,
            interview_date:data[0].interview_date,
            parent_id:data[0].id,
            responded_by : data[0].uid,
            status : 1
        }

        conn.query(sql,insertdata,function(err,data){
            if (err) {
               console.log(err);
            }
            conn.query(updateSql,false,function(err,data){
                if (err) {
                    console.log(err);
                }
                callback(err,data);
            })
        
        })
    }

    this.rescheduleinterviewReq = function(data, callback)
    {
        
        var sql = "INSERT INTO oppprtunity_interview_logs SET ?";
        var updateSql = "UPDATE opportunit_interview_request SET request_status = 5 WHERE opportunity_id = "+data[0].opp_id+" AND user_id = "+data[0].uid;
        var insertdata = {
            interview_request_id : data[0].interview_request_id,
            user_id : data[0].uid,
            business_id : data[0].business_id,
            opportunity_id : data[0].opportunity_id,
            interview_date:data[0].interview_date,
            reschedule_request_date:data[0].date_time,
            parent_id:data[0].id,
            responded_by : data[0].uid,
            rejection_note:data[0].notes,
            status : 2
        }

        conn.query(sql,insertdata,function(err,data){
            if (err) {
               console.log(err);
            }
            conn.query(updateSql,false,function(err,data){
                if (err) {
                    console.log(err);
                }
                callback(err,data);
            })
        
        })
    }

this.fetchInterview=function(data,callback){
    var sql="select * from oppprtunity_interview_logs where opportunity_id="+data.id+" and user_id="+data.userid+" order by id DESC LIMIT 1"
      conn.query(sql,function(err,data){
    if (err) {
       console.log(err);
    }
    callback(err,data);
  })
}

this.getinterviewcount=function(data,callback){
    var sql ="SELECT COUNT(id) as count FROM opportunit_interview_request WHERE user_id = "+data+" AND request_status IN(2,4,3,5,6,7)"

  conn.query(sql,function(err,data){
    if (err) {
       console.log(err);
    }
    callback(err,data);
  })
}

this.getappliedcount=function(data,callback){
    var sql ="SELECT COUNT(id) as count FROM opportunit_interview_request WHERE user_id = "+data+" AND request_status IN(1)"

  conn.query(sql,function(err,data){
    if (err) {
       console.log(err);
    }
    callback(err,data);
  })
}


    this.declineinterviewReq = function(data, callback)
    {
        
        var sql = "INSERT INTO oppprtunity_interview_logs SET ?";
        var updateSql = "UPDATE opportunit_interview_request SET request_status = 6 WHERE opportunity_id = "+data[0].opp_id+" AND user_id = "+data[0].uid;
        var insertdata = {
            interview_request_id : data[0].interview_request_id,
            user_id : data[0].uid,
            business_id : data[0].business_id,
            opportunity_id : data[0].opportunity_id,
            interview_date:data[0].interview_date,
            parent_id:data[0].id,
            responded_by : data[0].uid,
            rejection_note:data[0].notes,
            status : 4
        }

        conn.query(sql,insertdata,function(err,data){
            if (err) {
               console.log(err);
            }
            conn.query(updateSql,false,function(err,data){
                if (err) {
                    console.log(err);
                }
                callback(err,data);
            })
        
        })
    }


    this.rescheduleAppointmentFromBusiness = function(data, callback)
    {

        var sql = "INSERT INTO oppprtunity_interview_logs SET ?";
        var updateSql = "UPDATE opportunit_interview_request SET request_status = 7, interview_datetime     = '"+data.date_time+"' WHERE opportunity_id = "+data.opp+" AND user_id = "+data.user_id;
        var selectSql = "SELECT id , interview_date FROM oppprtunity_interview_logs WHERE interview_request_id = "+data.id+" and user_id = "+data.user_id+" and  status = 2 ORDER BY id DESC LIMIT 1";

        var insertdata = {
            interview_request_id : data.id,
            user_id : data.user_id,
            business_id : data.userId,
            opportunity_id : data.opp,
            rejection_note : data.comment,
            responded_by : data.userId,
            reschedule_request_date : data.date_time,
            status : 2,
            interview_type:data.inter_type
        }

        conn.query(selectSql,false,function(err,data){
            if (err) {
               console.log(err);
            }
            if (data != '') {
                insertdata.interview_date = data[0].interview_date;
                insertdata.parent_id = data[0].id;
            }
            conn.query(sql,insertdata,function(err,data){
                if (err) {
                    console.log(err);
                }
                conn.query(updateSql,false,function(err,data){
                    if (err) {
                        console.log(err);
                    }
                    callback(err,data);
                });

            });
        
        });
    }

    this.notificationInsert=function(data,callback){
          var sql1="insert into users_notification SET?"
         var formdata1={
             user_login_id:data.connection_id,
             notification_type:data.notification_type,
              message:data.message,
              created_date:new Date()
            }
                conn.query(sql1,formdata1,function(err,result1){
                   if (err) {
                          console.log(err);
                    }
                   callback(err,result1);
                })
    }

    this.getOppdetail=function(data,callback){
    var sql ="SELECT t1.*,t2.name AS country_name,t3.name AS state_name FROM `search` AS t1 LEFT JOIN master_country AS t2 ON t1.country=t2.id LEFT JOIN master_state AS t3 ON t3.id = t1.state where t1.element_id="+data.id+" and entity_id =1 "

  conn.query(sql,function(err,data){
    if (err) {
       console.log(err);
    }
    callback(err,data);
  })
}

this.opportunity_status=function(data,callback){
    var sql ="SELECT opportunity_id FROM `opportunit_interview_request` where user_id="+data.login_id
   console.log(sql)
  conn.query(sql,function(err,data){
    if (err) {
       console.log(err);
    }
    callback(err,data);
  })
}

    this.notificationComment_reply = function(data, callback) {
    var sql1 = "insert into users_notification SET?"
    var formdata1 = {
        user_login_id: data.connection_id,
        notification_type: 14,
        message: data.message,
        created_date: new Date()
    }
    conn.query(sql1, formdata1, function(err, result1) {
        if (err) {
            console.log(err);
        }
            callback(err, result1);
        })
}
    this.notificationLiked_reply = function(data, callback) {
    var sql1 = "insert into users_notification SET?"
    var formdata1 = {
        user_login_id: data.connection_id,
        notification_type: 15,
        message: data.message,
        created_date: new Date()
    }
    conn.query(sql1, formdata1, function(err, result1) {
        if (err) {
            console.log(err);
        }
            callback(err, result1);
        })
}

}

module.exports=database;
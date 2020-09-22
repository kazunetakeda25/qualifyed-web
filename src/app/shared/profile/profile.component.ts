import {Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {FormBuilder,Validators,FormGroup , FormControl } from '@angular/forms';
import * as myGlobals from './../../global';
import * as $ from 'jquery';
import {UserService } from './../../user.service';
import {User1Service } from './../../user1.service';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogConfig } from "@angular/material";

@Component({
      selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    userapi = myGlobals.userapi_url;
    media_url = myGlobals.media_url;
    api = myGlobals.api_url;
    submitted = false;
    data: any;
    postdata: any;
    server_name = myGlobals.server_name
    comment: any;
    minDate1 = new Date();
    pdfSrc: any;
    pdfSrcs: any;
    commentForm: any;
    commentdata: any;
    connect: any;
    connection: any;
    interstatus1: any
    connection_status = false;
    follow_status = false;
    pending_status = false;
    pending_status_2 = false;
    cancel_id: any;
    cancel: any;
    getconnection: any;
    interstatus: any
    db: any;
    unfollow_id: any;
    pid: any;
    likestatus: any;
    postid: any;
    lstatus: any;
    id: any;
    BusData: any;
    getCount: any;
    currentCount: any;
    show1: number = 0;
    usertype: any
    commentAll: any
    testcomment: number = 0
    getCommentCount: any
    commentCount: any
    myid: any
    myComment: any
    checkusertype: any
    mycheck: any
    getConnectStatus: any
    con_id: any
    friendStatus: any
    unfriendStatus: any
    edudata: any
    expdata: any
    skillsId: any
    setSkillsId: any
    getSkillsValue: any
    SkillsValue: any
    checkPhone: any
    showAllSetting: any
    is_show_email: number = 0
    getConnection: any
    checkEmail: any
    myLoginId: any
    saved: any
    data1: any
    email_length: any
    resume_length: any
    is_show_phone: number = 0
    is_show_resume: number = 0
    is_show_connections: number = 0
    phone_length: any
    connection_length: any
    is_show_lname: number = 0
    conn_count: any
    showLastName: any
    myLastName: any
    happy: any
    Pid: any
    postData: any
    postUserData: any
    parentId: any
    createPostId: any
    hasImage: any
    hasVideo: any
    haspdf: any
    IntervideoReq: any
    activeOpp: any
    filesToUpload: any
    filesToUpload2: any
    createPost: any
    dev: number = 0
    user_type_check: number = 0
    connection_status1: boolean = null
    skills: any
    myskill: any
    checkskills: any
    conncheck: any
    saved_status: any
    is_show_post: any
    is_show_message: any
    post_length: any
    status: any
    request: any
    skills_opp: any
    showLoader = false;
    chat: any
    cc_id: any = 0;
    api_url_ = myGlobals.api_url_;

    myOpp: any = [];
    common: any;
    InterReq: any;
    oppId: any;
    oppId1: any;
    show: number = 0;
    final: any;
    allcomment: any;
    commentReplyForm: any;
    show_comment_reply: number = 0;
    show_comment_post_btn: number = 0;
    reply_post: number = 0;
    submitted1 = false;
    data2: any
    show_like_comment: number = 0
    hide_opp: number = 0
    hide_message: number = 0
    show_msg_opp: number = 0
    show_opp_div_sd: number = 0
    comment_like_count: any
    check_connection: any
    nameData: any
    img: any
    test_count: any
    count_comments_post: any
    check_comment: any
    check_accept_status: any
    name: any
    myname: any
    check: any
    hide_post_load: any
    report_comment: any
    report_com_status: any
    report_comment_element_id: any
    type: any
    workdaydata: any
    masterhour: any
 lowerlimit : number = 0;   
 upperlimit : number = 5;   
 lowerlimit1:number=7;
 upperlimit1:number=0;
 oppdata:any;
 opdata:any;
 set_login_id:any;
 file_status=false
 commom:any;
 pic_path:any
 virtual_status:any;
 virtual_status_user:any;
     imageSrc:any
show_connection:number=0
connection_count:any
pagination_count:any
currentCount1:any
set_connection:any
token:any
opp_id:any
 finalConnections=[]
    constructor(private dialog: MatDialog, private http: HttpClient, private fb: FormBuilder, private rt: Router, private user: UserService, private user1: User1Service) {

    }


    showmoreComment(id) {
        this.showLoader = true;
        this.lowerlimit = this.lowerlimit + this.upperlimit
        this.user.post("getcomment", {
            id: id,
            limit: "" + this.lowerlimit + "," + this.upperlimit + ""
        }).subscribe(res => {
            this.showLoader = false;
            this.final = res
            for (var j = 0; j < this.final.length; ++j) {
                (this.allcomment).push(this.final[j])
            }
            for (var i = 0; i < this.allcomment.length; ++i) {
             this.user.post("get_total_count_comment_reply",{id:this.allcomment[i].id,i : i}).subscribe(res2=>{
                 this.common = res2;
                  if(this.common.length > 0)
                  {this.allcomment[res2[0].i].subcoment_count = this.common[0].count}
               })
                this.data1=this.allcomment[i].id
                this.data2=this.allcomment[i].user_login_id

                    const url="get_comment_like_status";

                    this.user.post(url,{id:this.data1,limit:"0,5", cout : i}).subscribe(res=>{
                        this.saved=res;
                        this.allcomment[this.saved[0].cout].saved_status = this.saved[0].saved_status;
                    })
                 this.user.post( "countPostLike_comment", {'count': this.allcomment[i].id,i: i}).subscribe(res => {
                    this.db = res;
                    this.allcomment[this.db.i].comment_count = this.db.count;
                })
            }

        })
    }

    showToggle(id, h) {

        this.show = 1;
        this.user.post("getcomment", {
            id: id,
            limit: "0,5"
        }).subscribe(res => {
            this.final = res
            this.allcomment = this.final
            this.check_comment = this.allcomment.length
            ////////console.log("allcomment",this.check_comment)

            for (var i = 0; i < this.allcomment.length; ++i) {
                // this.user.post("getcommentreply", {
                //     id: this.allcomment[i].id,
                //     limit: "0,5",
                //     i: i
                // }).subscribe(res1 => {
                //     this.common = res1;
                //     if (this.common.length > 0) {
                //         this.allcomment[res1[0].i].subcoment = res1
                //     }
                // })
                this.user.post("get_total_count_comment_reply",{id:this.allcomment[i].id,i : i}).subscribe(res2=>{
                 this.common = res2;
                  if(this.common.length > 0)
                  {this.allcomment[res2[0].i].subcoment_count = this.common[0].count}
               })
                this.data1 = this.allcomment[i].id
                this.data2 = this.allcomment[i].user_login_id

                const url = "get_comment_like_status";

                this.user.post(url, {
                    id: this.data1,
                    limit: "0,5",
                    cout: i
                }).subscribe(res => {
                    this.saved = res

                    this.allcomment[this.saved[0].cout].saved_status = this.saved[0].saved_status

                })
                this.user.post("countPostLike_comment", {
                    'count': this.allcomment[i].id,
                    i: i
                }).subscribe(res => {
                    this.db = res;
                    this.allcomment[this.db.i].comment_count = this.db.count;
                })
            }
            this.user.post("getCountComment", {
                id: id
            }).subscribe(res => {
                this.commentCount = res[0].count - 5;

            })

        })
    }
    showToggleV2(id, j) {
        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }
     
        localStorage.setItem("user_open_comment", j);
 if(document.getElementById('commentOpener_' + j) != undefined && document.getElementById('commentOpener_' + j) != null)
 {
     document.getElementById('commentOpener_' + j).classList.toggle('displayNone');
 }

        this.showToggle(id, j)
 if(document.getElementById('commentOpener1_comment'+localStorage.getItem('hide_')) != undefined)
 {
     document.getElementById('commentOpener1_comment'+localStorage.getItem('hide_')).classList.add('displayNone');
 }
if(document.getElementById('commentOpener1_comment_video'+localStorage.getItem('hide_')) != undefined)
{
    document.getElementById('commentOpener1_comment_video'+localStorage.getItem('hide_')).classList.add('displayNone');
}

    }
    showToggle1(id) {
        // $("." + id).toggle();
        // ////////console.log(id);
        this.show = 0;
        //this.lowerlimit=0;
        //this.ngOnInit()
    }


    ngOnInit(value = '') {
      this.token=localStorage.getItem('token')   
        this.lowerlimit = 0;
        this.user.post("view_profile/getblock",{userid:localStorage.getItem('id')}).subscribe(res => {
            this.check = res[0]


        })

        this.showLoader = true;
        this.createPost = this.fb.group({

            parentId: [''],
            postName: [''],
            privacy: [''],
            postImage: [''],
            postVideo: [''],
            postAttach: [''],

        });
        this.commentReplyForm = this.fb.group({
            commentreply: ['']
        })
        this.report_comment = this.fb.group({
            report_comment: [''],

        })

        this.InterReq = this.fb.group({
            date_time: ['', [Validators.required]],
            comment: ['']
        });

        this.IntervideoReq = this.fb.group({
            date_time: ['', [Validators.required]],
            comment: ['']
        });



        // this.user.GET("getliginid").subscribe(res => {
        //     this.checkusertype = res;
        //     this.mycheck = this.checkusertype.usertype
        //     this.myLoginId = this.checkusertype.id

        // })
           this.mycheck = localStorage.getItem('token')
            this.myLoginId = localStorage.getItem('id')
           

        this.user.profileData({userid:localStorage.getItem('id'),usertype:localStorage.getItem('token')}).subscribe(res => {
            this.nameData = res;
            this.img = this.nameData[0].profile_pic_name
            this.myname = this.nameData[0].name
            ////console.log("dd",this.nameData)
        })
        this.getCount = 0;
        // this.http.get(this.api + '/getpostCount').subscribe(res => {

        //     this.getCount = res[0].post_count - 6;
        //     this.currentCount = 0;
        // })


        // this.http.get(this.api + '/getpostCount').subscribe(res => {
        //       this.getCount = res[0].post_count-6;
        //     this.currentCount = 0;
        //   })

        //document.body.scrollTop = document.documentElement.scrollTop = 0;
        /*   if( localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "1"){
            //this.rt.navigate(['view_profile/:data']);
                 }*/
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        var url2 = window.location.href;
        var server_array = url2.split('/');
        this.id = server_array[server_array.length - 1];
        
         localStorage.setItem("con_id",this.id)

        this.http.post(this.api + '/getconnection', {
            id: this.id
        }, httpOptions).subscribe(res => {

            this.conncheck = res;

            if (this.conncheck.length > 0) {
                this.getconnection = res;
                //this.check_connection=this.getconnection[0].connection_id 

                if (this.getconnection == '') {
                    this.http.post(this.api + '/getconnection_second', {
                        id: this.id
                    }, httpOptions).subscribe(res => {
                        this.getconnection = res;
                        ////////////////////console.log("ll",this.getconnection)
                        if (this.getconnection == '') {
                            this.connection_status = true
                        } else {
                            if (this.getconnection[0].status == 1) {
                                this.follow_status = true
                            } else if (this.getconnection[0].status == 2) {
                                this.pending_status_2 = true;
                                this.pending_status = true;
                            } else if (this.getconnection[0].status == 3) {
                                this.connection_status = true
                            }
                        }
                    });
                } else {
                    if (this.getconnection[0].status == 1) {
                        this.follow_status = true
                    } else if (this.getconnection[0].status == 2) {
                        this.pending_status = true
                        //////////////console.log("prnd",this.pending_status)
                    } else if (this.getconnection[0].status == 3) {
                        this.connection_status = true
                    }
                }
            }
        })

     


        const url = this.api + "/view_profile"
        this.http.post(url, {
            id: this.id
        }, httpOptions).subscribe(res => {
            this.data = res
            this.pic_path="src/assets/uploads/images/" + this.data[0].profile_pic_name
            this.Check_picture();
            this.checkPhone = this.data[0].phone
            this.checkEmail = this.data[0].email
            this.BusData = this.data[0]
            if(this.data[0].name.split(" ")[1] != undefined){
                
            this.showLastName = this.data[0].name.split(" ")[0] + " " + this.data[0].name.split(" ")[1].charAt(0)
            }


            this.usertype = this.data[0].user_type
             localStorage.setItem("user_type_con",this.usertype)

            this.con_id = this.data[0].loginid
           
            if (this.con_id == undefined) {
                this.con_id = this.data[0].login_id


            }

            this.user.showpostData1({
                id: this.con_id,
                limit: '0,5'
            }).subscribe(res => {
                this.postData = res;
                this.hide_post_load = this.postData.length
                for (var i = 0; i < this.postData.length; ++i) {
                    let httpOption = {
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json'
                        })
                    }

                    if (this.postData[i].parent_id != 0) {
                        this.http.post(this.api + "/getFeedParent", {
                            'count': this.postData[i].parent_id,
                            'i': i
                        }, httpOption).subscribe(res => {
                            this.postData[res[0].counting].parent_data = res[0];
                        })

                    }


                    this.http.post(this.api + "/countPostLike", {
                        'count': this.postData[i].id,
                        'i': i
                    }, httpOption).subscribe(res => {
                        this.db = res;
                        this.postData[this.db.i].count = this.db.count;
                    })
                    this.http.post(this.api + "/countPostComment", {
                        'count': this.postData[i].id,
                        'i': i
                    }, httpOption).subscribe(res => {
                        this.db = res;
                        this.postData[this.db.i].comment_count_post = this.db.count;
                    })

                    if (this.postData[i].user_login_id != localStorage.getItem('id')) {
                        this.user.getdata(i, this.postData[i].user_login_id, this.postData[i].user_type).subscribe(res => {
                            this.postData[res[0].cout].userDisplayData = res[0];
                        });
                    }

                }
                this.getCount = this.postData.length - 6;
                
            })

            // this.http.get(this.api + '/getpostCount').subscribe(res => {
            //    console.log("-------------",res);
            //     this.getCount = this.postData.length;
            //     this.currentCount = 0;
            // })
            this.user.post('getconnectioncount',{userid:localStorage.getItem('con_id'),usertype:localStorage.getItem('user_type_con')}).subscribe(res=>{
   this.showLoader = false;
     this.connection_count=res[0].total_connections;
     this.pagination_count=res[0].total_connections-10;
     this.currentCount1=0;
   })
    
     this.user.connectionDataConnection({userid:localStorage.getItem('con_id'),usertype:localStorage.getItem('user_type_con'),limit:'0,10'}).subscribe(res=>{
       this.showLoader = false;
     this.finalConnections=res;
     for (var i = 0; i < this.finalConnections.length; ++i) {
          this.user.fileExists1("src/assets/uploads/images/"+this.finalConnections[i].logo,i).subscribe(res => {
          this.finalConnections[res['data'].i].file_status=res['data'].status;
          this.user.post("get_friend_status",{login_id:localStorage.getItem('id'),connection:this.finalConnections[res['data'].i].userid}).subscribe(res1=>{
              this.finalConnections[res['data'].i].fr_status=res1['status']
              this.user.post("getConnectStatus", {
                con_id:this.finalConnections[res['data'].i].userid,userid:localStorage.getItem('id')
            }).subscribe(res2 => {
              this.finalConnections[res['data'].i].pending_fr_status=res2[0]['status']

            })
          })
                      })
                        }

   })
            this.user.post("getmore", {
                idd: this.con_id
            }).subscribe(res => {

                this.getCount = res[0].post_count - 5;

                this.currentCount = 0;
            })
            this.user.post("view_profile/connectionCount", {
                userid: this.con_id
            }).subscribe(res => {
                this.conn_count = res[0].count;
                // ////console.log("res=+++=====>",this.conn_count)
            })
            this.user.post("view_profile/getAllSetting", {
                id: this.con_id
            }).subscribe(res => {
                this.happy = res
                if (this.happy.length > 0) {
                    this.showAllSetting = res[0];

                    if (this.showAllSetting.show_emai_to == 0) {
                        this.is_show_email = 1;
                    } else if (this.showAllSetting.show_emai_to == 2) {
                        this.is_show_email = 0;
                    } else {
                        this.user.post("view_profile/getConnection", {
                            id: this.con_id
                        }).subscribe(res => {
                            this.email_length = res
                            if (this.email_length.length > 0) {
                                this.getConnection = res[0].status;
                                if (this.getConnection == 1) {
                                    this.is_show_email = 1;
                                } else {
                                    this.is_show_email = 0;
                                }
                            }
                        })
                    }


                    ////////////console.log("povvvvvvvvst===>",this.showAllSetting.who_can_see_timeline)
                    if (this.showAllSetting.who_can_see_timeline == 0) {
                        this.is_show_post = 1;
                    } else if (this.showAllSetting.who_can_see_timeline == 2) {
                        this.is_show_post = 0;
                    } else {
                        this.user.post("view_profile/getConnection", {
                            id: this.con_id
                        }).subscribe(res => {
                            this.post_length = res
                            //////////console.log("post===>",res)
                            if (this.post_length.length > 0) {
                                this.getConnection = res[0].status;
                                if (this.getConnection == 1) {
                                    this.is_show_post = 1;
                                } else {
                                    this.is_show_post = 0;
                                }
                            }
                        })
                    }
                    this.is_show_message = this.showAllSetting.who_can_send_message
                    // ////////console.log("=============>", this.is_show_message)
                    if (this.showAllSetting.who_can_send_message == 1) {
                        this.user.post("view_profile/getConnection", {
                            id: this.con_id
                        }).subscribe(res => {
                            this.post_length = res
                            if (this.post_length.length > 0) {
                                this.getConnection = res[0].status;
                                if (this.getConnection == 1) {
                                    this.is_show_message = 4;
                                } else {

                                }
                            }
                        })
                    }



                    if (this.showAllSetting.show_phone_to == 0) {
                        this.is_show_phone = 1;
                    } else if (this.showAllSetting.show_phone_to == 2) {
                        this.is_show_phone = 0;
                    } else {
                        this.user.post("view_profile/getConnection", {
                            id: this.con_id
                        }).subscribe(res => {
                            this.phone_length = res
                            if (this.phone_length.length > 0) {
                                this.getConnection = res[0].status;
                                if (this.getConnection == 1) {
                                    this.is_show_phone = 1;
                                } else {
                                    this.is_show_phone = 0;
                                }
                            }
                        })
                    }
                    if (this.showAllSetting.show_resume_to == 0) {
                        this.is_show_resume = 1;
                    } else if (this.showAllSetting.show_resume_to == 2) {

                        this.is_show_resume = 0;
                    } else {
                        this.user.post("view_profile/getConnection", {
                            id: this.con_id
                        }).subscribe(res => {
                            this.resume_length = res
                            if (this.resume_length.length > 0) {
                                this.getConnection = res[0].status;
                                if (this.getConnection == 1) {
                                    this.is_show_resume = 1;
                                } else {
                                    this.is_show_resume = 0;
                                }
                            }
                        })
                    }

                    if (this.showAllSetting.show_connections_to == 0) {

                        this.is_show_connections = 1;
                    } else if (this.showAllSetting.show_connections_to == 2) {

                        this.is_show_connections = 0;
                    } else {

                        this.user.post("view_profile/getConnection", {
                            id: this.con_id
                        }).subscribe(res => {
                            this.connection_length = res
                            if (this.connection_length.length > 0) {
                                this.getConnection = res[0].status;
                                if (this.getConnection == 1) {
                                    this.is_show_connections = 1;
                                } else {
                                    this.is_show_connections = 0;
                                }
                            }
                        })
                    }
                    //////////////////console.log("cojhndg",this.showAllSetting.show_lastname_to)
                    if (this.showAllSetting.show_lastname_to == 0) {
                        //////////////////console.log("hello")
                        this.is_show_lname = 1;
                    } else if (this.showAllSetting.show_lastname_to == 2) {
                        this.is_show_lname = 7;
                    } else {
                        this.user.post("view_profile/getConnection", {
                            id: this.con_id
                        }).subscribe(res => {
                            this.connection_length = res
                            if (this.connection_length.length > 0) {
                                this.getConnection = res[0].status;
                                if (this.getConnection == 1) {
                                    this.is_show_lname = 1;
                                } else {
                                    this.is_show_lname = 7;
                                }
                            } else {
                                this.is_show_lname = 7;
                            }
                        })
                    }
                }
            })

            this.getOpp();
            this.http.get(this.userapi + "/masterhour").subscribe(res => {
                this.masterhour = res;

            }),
        this.getOpportunity_status();
        if(this.mycheck == 1){

        this.virtual_check();
        }
        if(this.mycheck == 2){
            
        this.virtual_check_user();
        }

 this.user.post("view_profile/workdaydata_profile",{userid:this.con_id}).subscribe(res => {
      this.workdaydata = res;

     for (var i = 0; i < this.workdaydata.length; i++) {
      
      var wh = this.workdaydata[i]['woking_hours'];
      if(wh == 'n/a'){
        var na = [];
        na[0]='N/A';
        this.workdaydata[i]['woking_hours'] = na;
      }else{
      var wha = wh.split(",");
      var whour = [];
       

       for (var j = 0; j < wha.length; j++) {

          var wid = wha[j]-1;
          if(this.masterhour[wid] != undefined)
                            {
                                whour[j] = "   "+this.masterhour[wid]['title'];
                            }
       }
       this.workdaydata[i]['woking_hours'] = whour;
      }
     }


})

            if (this.data[0].user_type == 2) {
                ////////////////////console.log("in user")
                this.user.post("usereducationdata", {
                    id: this.con_id
                }).subscribe(res => {
                    this.edudata = res
                })
                this.user.post("getExperience", {
                    id: this.con_id
                }).subscribe(res => {
                    this.expdata = res;
                })
                this.user.post("getSkills_post", {
                    id: this.con_id
                }).subscribe(res => {
                    this.myskill = res
                    this.checkskills = this.myskill.length
                    ////////console.log("skillsd",this.myskill)
                    if (this.myskill.length > 0) {
                        this.skills = res[0].skills.split(",");
                    }
                })


            }
            ////console.log("coi",this.con_id)
            //////console.log("coi",this.con_id)
         


        });
          console.log("com",localStorage.getItem('con_id'))
        this.user.post("getConnectStatus", {
                con_id: localStorage.getItem('con_id'),userid:localStorage.getItem('id')
            }).subscribe(res => {
                this.getConnectStatus = res;
                console.log("======friendStatus",this.getConnectStatus.length)
                this.set_connection=this.getConnectStatus.length
                console.log("======set_connection",this.set_connection)
                if (this.getConnectStatus.length > 0) {

                    this.friendStatus = this.getConnectStatus[0].status
                    console.log("friend",this.friendStatus)
                    this.check_accept_status = this.getConnectStatus[0].user_login_id

                }
                //////console.log("======logindi",this.check_accept_status)
            })
        // this.http.get(this.api+'/getcomment').subscribe(res=>{
        //         this.comment=res
        //       //////////////////console.log("comment=========>",this.comment)

        // })

        this.commentForm = this.fb.group({
            comment: ['']
        })


        if (value != '') {
            setTimeout(function() {
                $("." + value).show();
            }, 200);
        }

       
        

    }
    getOpp() {
        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }
        if (this.myLoginId == this.con_id) {
            this.hide_opp = 1;

            return false;
        }
        if (this.usertype == 1) {
            this.hide_opp = 0;
                this.showLoader=true
            this.user.post("opportunity/getAllOpp1", {
                userid: this.con_id
            }).subscribe(res => {
                this.showLoader=false
                this.activeOpp = res;
                for (var i = 0; i < this.activeOpp.length; ++i) {
                    this.skills_opp = this.activeOpp[i].skills_ids

                    this.activeOpp[i].skills_ids = JSON.parse(this.skills_opp);

                        console.log("dev",this.activeOpp[i])
                    this.data1 = this.activeOpp[i].id

                    // const url = "opportunity/getsavedstatus";
                    //     console.log("dev",this.data1)
                    // this.user.post(url, {
                    //     id: this.data1,
                    //     cout: i,userid:localStorage.getItem('id')
                    // }).subscribe(res => {
                    //     this.saved = res
                    //     this.activeOpp[this.saved[0].cout].saved_status = this.saved[0].saved_status
                    // })
                }
                console.log('this.resultIF22',this.activeOpp);
                if (this.activeOpp.length == 0) {
                    this.show_msg_opp = 1;
                }

            })
        }
         if(this.myLoginId != this.con_id){
             
        this.user.Profieviewinsert(this.id).subscribe(res => {

        })
         }
    }
    likefunction(value, target, i) {
        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }



        this.pid = JSON.stringify({
            post_id: value,
            userid : localStorage.getItem('id')
        });
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.api + '/like', this.pid, httpOptions).subscribe(res => {
            this.likestatus = res;
            if (this.likestatus.status == 1) {
                target.classList.remove('far');
                target.classList.add('fas');

            } else {
                target.classList.remove('fas');
                target.classList.add('far');
            }
            var el = document.getElementById(String("C_" + i)).innerHTML = " " + this.likestatus.data[0].count;
            this.lstatus = this.likestatus.status
            this.postid = this.likestatus.data[0].entity_id
            // target.classList.add('far');
            // target.classList.add('fas');
        })
    }
    cancel_reuest_api_v2(val) {
        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }

        this.cancel_id = JSON.stringify({
            connection_id: val
        });
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }

        this.http.post(this.api + '/cancel', this.cancel_id, httpOptions).subscribe(res => {
            this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["shared/view_profile/" + val]));
            // this.ngOnInit()

        })


    }

    acceptRequest(val) {
        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }

        this.http.post(this.api + '/acceptrequest', {
            id: val
        }, httpOptions).subscribe(res => {
            this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["shared/view_profile/" + val]));
            //this.ngOnInit()
        })
    }

    Comment(value, i) {
        this.lowerlimit = 0;
        if (this.filesToUpload_comment_video.length >= 1) {

            if (this.filesToUpload_comment_video[0].size >= 20000000) {
                this.showLoader = false;
                Swal.fire({
                    text: "Please select a video less than 20MB",
                    type: "error"
                })
                return false;
            }
        }

        if (this.commentForm.value.comment == '' && this.filesToUpload_comment.length == 0 && this.filesToUpload_comment_video.length == 0) {
            Swal.fire({
                text: "Please type anything to comment or upload media file",
                type: "error"
            });
            return false;
        }

        if (this.commentForm.value.comment == null && this.filesToUpload_comment.length == 0 && this.filesToUpload_comment_video.length == 0) {
            Swal.fire({
                text: "Please type anything to comment or upload media file",
                type: "error"
            });
            return false;
        }

        //console.log("value",value,"====d===========i",i)
        var xyz = localStorage.getItem("user_open_comment");
        if (this.commentForm.value.comment != '' && this.commentForm.value.comment != null) {


            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }
            this.commentdata = this.commentForm.value;
            this.commentdata.id = value
            this.http.post(this.api + '/usercomment', this.commentdata, httpOptions).subscribe(res => {
                this.user.post("countPostComment", {
                    'count': value,
                    'i': i
                }).subscribe(res1 => {
                    this.test_count = res1
                    this.count_comments_post = this.test_count.count
                    this.postData[this.test_count.i].comment_count_post = this.count_comments_post;
                })
                this.commentForm.reset()
                this.filesToUpload_comment = []
                this.showToggle(value, xyz);
            })
        }

        if (this.filesToUpload_comment.length != 0) {
            const formData: any = new FormData();
            const files: Array < File > = this.filesToUpload_comment;

            for (let i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i]['name'], files[i]['size']);
            }

            this.http.post(this.api + '/upload_image_comment_api', formData)
                .map(files => JSON.stringify(files))
                .subscribe(res => {
                    this.filesToUpload_comment = []
                    var aa = JSON.parse(res)
                    this.user.post("insert_in_comment_tble", {
                        image_id: aa['data'].image_id,
                        comment_id: value,
                        userid: localStorage.getItem('id')
                    }).subscribe(res => {
                        this.user.post("countPostComment", {
                            'count': value,
                            'i': i
                        }).subscribe(res1 => {
                            this.test_count = res1
                            this.count_comments_post = this.test_count.count
                            this.postData[this.test_count.i].comment_count_post = this.count_comments_post;
                        })
                        this.commentForm.reset()
                        this.filesToUpload_comment = []
                        this.showToggle(value, xyz);
                    })
                })

        }
        if (this.filesToUpload_comment_video.length != 0) {
            console.log("in video")

            const formData: any = new FormData();
            const files: Array < File > = this.filesToUpload_comment_video;
            // //console.log(files);

            for (let i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i]['name']);
            }
            // //console.log('form data variable :   '+ formData.toString());
            this.http.post(this.api + '/video_comment_api', formData)
                .map(files => JSON.stringify(files))
                .subscribe(res => {
                    console.log("res--", res)
                    var aa = JSON.parse(res)
                    this.user.post("insert_in_comment_tble", {
                        image_id: aa['data'].video_id,
                        comment_id: value,
                        userid: localStorage.getItem('id')
                    }).subscribe(res => {
                        console.log(res)
                        this.user.post("countPostComment", {
                            'count': value,
                            'i': i
                        }).subscribe(res1 => {
                            //console.log("................-----dc---",res1)
                            // this.db = res1;
                            this.test_count = res1
                            this.count_comments_post = this.test_count.count
                            this.postData[this.test_count.i].comment_count_post = this.count_comments_post;
                            //console.log("................-dd--dd--dc---",this.postData)
                        })
                        //this.ngOnInit(xyz)
                        this.commentForm.reset()
                        this.filesToUpload_comment = []
                        this.showToggle(value, xyz);
                    })

                })

        }
        document.getElementById('commentOpener1_comment' + localStorage.getItem('hide_')).classList.add('displayNone');
        this.imageSrc = ''
        document.getElementById('commentOpener1_comment_video' + localStorage.getItem('hide_')).classList.add('displayNone');
        this.filesToUpload_comment = []
        this.filesToUpload_comment_video = []
        this.ngOnInit();
    }

    Request(value) {

        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }

        this.connect = JSON.stringify({
            connection_id: value
        });
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }


        this.http.post(this.api + '/requestconnection', this.connect, httpOptions).subscribe(res => {
            this.connection = res

            if (this.connection.status == true) {
                this.connection_status1 = this.connection.status
                //////////////console.log("connection status true",this.connection_status)
            } else if (this.connection.status == false) {
                this.connection_status1 = this.connection.status
                //////////////console.log("connection status flas",this.connection_status)
            }
            this.connection_status1 = null
            this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["shared/view_profile/" + value]));
            //this.ngOnInit()

        })

    }

    /*cancelRequest(value){
      
      this.cancel_id = JSON.stringify({
                connection_id: value
            });
        const httpOptions = {
            headers: new HttpHeaders({
                  'Content-Type': 'application/json'
            })
        }
        
        ////////////////////console.log("cancel",this.cancel_id)
     
       this.http.post(this.api+'/cancel',this.cancel_id,httpOptions).subscribe(res=>{
          this.rt.navigateByUrl('/contact-us', {skipLocationChange: true}).then(()=>
                              this.rt.navigate(["view_profile/"+value]));
         this.ngOnInit()
           

       })

    }*/

    unfollowRequest(value) {
        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }
        this.unfollow_id = JSON.stringify({
            connection_id: value
        });
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }

        ////////////////////console.log("cancel",this.unfollow_id)

        this.http.post(this.api + '/unfollow', this.unfollow_id, httpOptions).subscribe(res => {
            this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["shared/view_profile/" + value]));
            this.ngOnInit()
            /*this.cancel=res
        this.pending_status=this.cancel.status*/

        })

    }

    videoPop() {
        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }
        if (this.BusData.video_name == '' || this.BusData.video_name == 'novideo.jpg' || this.BusData.video_name == undefined || this.BusData.video_name == null) {
            Swal.fire({
                text: "Sorry no video available",
                type: "error"
            });
        } else {
            Swal.fire({
                html: '<video controls autoplay><source src="' + this.media_url + '/uploads/bio_video/' + this.BusData.video_name + '" type="video/mp4"></video>',
                customClass: {
                    popup: 'animated tada'
                }
            });
            if(this.myLoginId != this.con_id ){
            this.user.post("bioviewinsert", {
                userloginid: this.con_id
            }).subscribe(res => {

            })
        }

        }
        return false;
    }

    Viewvideo() {
        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }
        this.user.post("bioviewinsert", {
            userloginid: this.id
        }).subscribe(res => {

        })
    }
    showdiv() {
        ////////////////////console.log("bef",this.show1)

        this.show1 = 1
        ////////////////////console.log("af",this.show1)
    }
    hidediv() {
        this.show1 = 0
    }
    getComment(id) {

        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }

        this.myid = id
        this.testcomment = 1;
        this.user.post("getCommentAll", {
            id: id,
            limit: "0,5"
        }).subscribe(res => {
            this.commentAll = res;
            for (var i = 0; i < this.commentAll.length; ++i) {
                var abc = this.commentAll[i].user_name.split(" ");
                this.myLastName = abc[0] + " " + abc[1].charAt(0)
                this.commentAll[i].lnametest = this.myLastName




            }
            ////////////////console.log("last comment",this.commentAll)
            this.user.post("getCountComment", {
                id: id
            }).subscribe(res => {
                this.commentCount = res[0].count - 5;
                ////////console.log("in commentCount" ,this.commentCount)

            })

        })
    }
    // hidecomment(id) {
    //     ////////////////////console.log("hied",id)
    //     // this.testcomment = 0;
    //     this.user.post("getCommentAll", {
    //         id: id,
    //         limit: "0,5"
    //     }).subscribe(res => {
    //         this.commentAll = res;
    //         ////////////////////console.log("comenmt------------->",this.commentAll)
    //     })
    // }

    loadMore(id) {

        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }

        if (this.commentCount > 0) {
            this.commentCount = this.commentCount - 5;
            this.currentCount += 5;
            if (this.commentCount < 0) {
                this.commentCount = 0;
            }

            this.user.post("getcomment", {
                id: this.myid,
                limit: ((this.currentCount) + ',' + (5)).toString()
            }).subscribe(res => {
                this.myComment = res


                for (var i = 0; i < this.myComment.length; ++i) {

                    const url = "get_comment_like_status";

                    this.user.post(url, {
                        id: this.myid,
                        limit: "0,5",
                        cout: i
                    }).subscribe(res => {
                        this.saved = res
                        ////////console.log("6666666666",this.saved)

                        this.myComment[this.saved[0].cout].saved_status = this.saved[0].saved_status

                    })
                    // ////////console.log("this.is",this.myComment)
                    //     (this.allcomment).push(res[i]);




                }
                for (var i = 0; i < this.myComment.length; ++i) {
                    (this.allcomment).push(this.myComment[i]);
                }
                ////////console.log("allcomment",this.allcomment)
            })


        } else {
            this.commentCount = 0;
        }
        return false;
    }

    unfriend() {

        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to remove as your friend ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, unfriend!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this.user.post("unfriend", {
                    con_id: this.con_id
                }).subscribe(res => {
                    this.unfriendStatus = res;
                    //this.friendStatus=this.getConnectStatus[0].status
                    ////////////////////console.log("=======unfriendStatus",this.unfriendStatus)
                    this.rt.navigateByUrl('/shared/contact-us', {
                        skipLocationChange: true
                    }).then(() =>
                        this.rt.navigate(["shared/view_profile/" + this.con_id]));
                    Swal.fire({
                        text: "Unfriend Successfully",
                        type: "success"
                    })
                })
            }
        })
    }
    onCreate() {
        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }
        this.pdfSrc = 'src/assets/uploads/resume/' + this.data[0].resume_name;
        this.user.fileExists(this.pdfSrc).subscribe(res => {
            this.common = res;
            if (this.common.status == true) {
                this.pdfSrcs = this.media_url + "/uploads/resume/" + this.data[0].resume_name;
                window.open(this.pdfSrcs, '_blank');
            } else {
                Swal.fire({
                    text: "File not found",
                    type: "error"
                });
                return false;
            }
        });

        // const dialogConfig = new MatDialogConfig();
        // dialogConfig.disableClose = true;
        // dialogConfig.autoFocus = true;
        // dialogConfig.height = "80%";
        // dialogConfig.width = "80%";
        // this.dialog.open(PdfviewierComponent, dialogConfig);

    }
    loadMorePost() {

        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }

        if (this.getCount > 0) {
            this.getCount = this.getCount - 5;
            this.currentCount += 5;
            if (this.getCount < 0) {
                this.getCount = 0;
            }
            //this.user.showpostData1(((this.currentCount + 1) + ',' + (5)).toString()).subscribe(res => {
            this.user.showpostData1({
                id: this.con_id,
                limit: ((this.currentCount) + ',' + (5)).toString()
            }).subscribe(res => {
                // this.postData = res;
                //////////////////console.log("in in in load res",res)

                for (var i = 0; i < res.length; ++i) {
                    this.postData.push(res[i]);
                }


                for (var i = 0; i < this.postData.length; ++i) {
                    let httpOption = {
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json'
                        })
                    }

                    // if (this.postData[i].parent_id != 0) {
                    //     this.http.post(this.api + "/getFeedParent", {
                    //         'count': this.postData[i].parent_id,
                    //         'i': i
                    //     }, httpOption).subscribe(res => {
                    //         this.postData[res[0].counting].parent_data = res[0];
                    //     })
                    // }

                    // this.http.post(this.api + "/countPostLike", {
                    //     'count': this.postData[i].id,
                    //     'i': i
                    // }, httpOption).subscribe(res => {
                    //     this.db = res;
                    //     this.postData[this.db.i].count = this.db.count;
                    // })
                    if (this.postData[i].parent_id != 0) {
                        this.http.post(this.api + "/getFeedParent", {
                            'count': this.postData[i].parent_id,
                            'i': i
                        }, httpOption).subscribe(res => {
                            this.postData[res[0].counting].parent_data = res[0];
                        })

                    }


                    this.http.post(this.api + "/countPostLike", {
                        'count': this.postData[i].id,
                        'i': i
                    }, httpOption).subscribe(res => {
                        this.db = res;
                        this.postData[this.db.i].count = this.db.count;
                    })
                    this.http.post(this.api + "/countPostComment", {
                        'count': this.postData[i].id,
                        'i': i
                    }, httpOption).subscribe(res => {
                        this.db = res;
                        this.postData[this.db.i].comment_count_post = this.db.count;
                    })

                    if (this.postData[i].user_login_id != localStorage.getItem('id')) {
                        this.user.getdata(i, this.postData[i].user_login_id, this.postData[i].user_type).subscribe(res => {
                            this.postData[res[0].cout].userDisplayData = res[0];
                        });
                    }
                }
            })

        } else {
            this.getCount = 0;
        }
        return false;
    }
    public closeModalFunction(): void {

        $('#postModal').hide();
        $('#postModalOpp').hide();
        $('#oppModal').hide();
        $('#oppModal_video').hide();
        $('#postModal_Report').hide();

    }
    myFunction2(id) {
        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }
        this.dev = 1

        // ////////////////console.log("shgareid======>",id)
        // this.createPostId=id
        //         this.user.post("getcreatePost",{post_id:this.createPostId}).subscribe(res=>{
        //           ////////////////console.log("selected",res)

        //         })

        ////////////////console.log("shgareid======>",id)
        let httpOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.api + "/getPostWhere", {
            'id': id
        }, httpOption).subscribe(res => {
            // ////////////////console.log();
            this.postUserData = res[0];
            ////////////////console.log(this.postUserData);
            this.parentId = this.postUserData.id
             this.opp_id=this.postUserData.opp_id
            this.createPost.patchValue({

                privacy: this.postUserData.privacy,
                // postImage: [''],
                // postVideo: [''],
                // postAttach: [''],

            })
            // var y = document.getElementById("pp_pic");
            //        document.getElementsByClassName('ac_c')[0].setAttribute('src', y.getAttribute('src'));
            //        document.getElementsByClassName('ac_c')[1].setAttribute('src', y.getAttribute('src'));

        })

        var x = document.getElementById("postModal");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;

    }

    myFunction() {
        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }
        var x = document.getElementById("postModal");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    onSubmitPost() {
        ////////////////console.log("shareshqater",this.createPost.value)
        // this.showLoader = true;
        if(this.opp_id != 0){
        this.createPost.value.opp_id=this.createPost;
      }else{
        this.createPost.value.opp_id=0;
      }
        this.createPost.value.parentId = this.parentId;
        if (this.createPost.value.privacy == '') {
            this.createPost.value.privacy = 1;
        }

        let httpOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.api + "/shareFeed", this.createPost.value, httpOption).subscribe(res => {
            // this.showLoader = false;
            this.ngOnInit()

            Swal.fire({
                text: "Post Sucessfully",
                type: "success"
            })
            this.closeModalFunction()
        });

    }
    myFunction1() {
          this.show_connection=0
        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        var x = document.getElementById("postModalOpp");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }
    applyopp(id) {
        this.showLoader = true;
        this.user.sendRequest({
            id: id
        }).subscribe(res => {
            this.showLoader = false;
            this.request = res
            Swal.fire({
                title: "Success",
                text: "Interview request sent successfully",
                type: "success"
            })
            this.getOpp();
            this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["shared/view_profile/"+this.con_id]));
            $('#postModalOpp').hide();

        })

    }

    checkRoom(id) {
        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }
        this.chat = [];
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.cc_id = 0;
        this.http.post(this.api_url_ + 'insert', {
            chat_id: id
        }, httpOptions).subscribe(res => {
            this.rt.navigate(['shared/messages'])
            localStorage.setItem("message_id", id);

        })
    }


    saveOpportunity(id) {

        this.user.savedOpportunity({
            id: id
        }).subscribe(res => {
            this.saved_status = res
            Swal.fire({
                title: "Success",
                text: "Opportunity saved successfully",
                type: "success"
            })
            this.getOpp();

        });
    }

    unsaveOpportunity(id) {
        ////////console.log("in unsave",id)
        this.user.unsavedOpportunity({
            id: id
        }).subscribe(res => {
            this.saved_status = res
            Swal.fire({
                title: "Success",
                text: "Opportunity unsaved successfully",
                type: "success"
            })

            this.getOpp();
        });
    }

    sdInterviewReq() {
        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }
              this.showLoader=true
        this.user.post('opportunity/getAllOpp',{userid:localStorage.getItem('id')}).subscribe(res => {
            this.showLoader=false
            this.myOpp = res;

            console.log("this.myOpp =======>",this.myOpp.length);
            if (this.myOpp.length == 0) {
                this.show_opp_div_sd = 1
            }
        });
        var x = document.getElementById("oppModal");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;

        return false;

    }
    videoInterviewReq() {
        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }
          this.showLoader=true
        this.user.post('opportunity/getAllOpp',{userid:localStorage.getItem('id')}).subscribe(res => {
            this.showLoader=false
            console.log("hello__",res);
            this.myOpp = res;
             if (this.myOpp.length == 0) {
                this.show_opp_div_sd = 1
            }
        });
        var x = document.getElementById("oppModal_video");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;

        return false;

    }
    sendIntReq(id) {
        this.oppId = id
        var user_pop_listing = document.getElementById('reschedule_pop');
        var user_pop_listing_close = document.getElementById('reschedule_pop_close');
        var user_pop_listing_close2 = document.getElementById('reschedule_pop_2');

        user_pop_listing.style.visibility = "visible";
        user_pop_listing.style.top = "0";
        user_pop_listing.style.height = "auto";

        user_pop_listing_close.onclick = function(evenet) {
            user_pop_listing.style.visibility = "hidden";
            user_pop_listing.style.top = "-100%";
            user_pop_listing.style.height = "0";

        }
        user_pop_listing_close2.onclick = function(evenet) {
            user_pop_listing.style.visibility = "hidden";
            user_pop_listing.style.top = "-100%";
            user_pop_listing.style.height = "0";
        }

        window.onclick = function(event) {
            if (event.target == user_pop_listing) {
                user_pop_listing.style.visibility = "hidden";
                user_pop_listing.style.top = "-100%";
                user_pop_listing.style.height = "0";
            }
        }
        return false;
    }

    sendvideoIntReq(id) {
        this.oppId1 = id
        var user_pop_listing = document.getElementById('reschedule_pop1');
        var user_pop_listing_close = document.getElementById('reschedule_pop_close1');
        var user_pop_listing_close2 = document.getElementById('reschedule_pop_21');

        user_pop_listing.style.visibility = "visible";
        user_pop_listing.style.top = "0";
        user_pop_listing.style.height = "auto";

        user_pop_listing_close.onclick = function(evenet) {
            user_pop_listing.style.visibility = "hidden";
            user_pop_listing.style.top = "-100%";
            user_pop_listing.style.height = "0";

        }
        user_pop_listing_close2.onclick = function(evenet) {
            user_pop_listing.style.visibility = "hidden";
            user_pop_listing.style.top = "-100%";
            user_pop_listing.style.height = "0";
        }

        window.onclick = function(event) {
            if (event.target == user_pop_listing) {
                user_pop_listing.style.visibility = "hidden";
                user_pop_listing.style.top = "-100%";
                user_pop_listing.style.height = "0";
            }
        }
        return false;
    }
    get resErrSubmit() {
        return this.InterReq.controls;
    }
    get resErrSubmit1() {
        return this.IntervideoReq.controls;
    }

    intReqSubmit() {

        var a = window.location.href.split('/');
        this.submitted = true;

        if (this.InterReq.invalid) {
            Swal.fire({
                text: "Enter interview date and time"
            });
            return false;
        } else {
            this.InterReq.value.userid = a[a.length - 1];
            this.InterReq.value.oppId = this.oppId;
            this.InterReq.value.user_login_id = localStorage.getItem('id');
            console.log( this.InterReq.value)
            this.user.post('view_profile/directInterReq_buss', this.InterReq.value).subscribe(res => {
              console.log("ffff",res);
                this.interstatus = res;
                if (this.interstatus.status == true) {
                    Swal.fire({
                        text: "Success",
                        title: "" + this.interstatus.msg + "",
                        type: "success"
                    })

                    $('#reschedule_pop').hide();
                    $('#oppModal').hide();
                    this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["shared/view_profile/" + localStorage.getItem('con_id')]));
                } else {
                    Swal.fire({
                        text: "Error",
                        title: "" + this.interstatus.msg + "",
                        type: "error"
                    })
                    this.InterReq.reset()
                }
            });
        }

    }
    showCommOnComm(id) {
        var closeClass = document.getElementsByClassName('closeReply');
        for (var i = 0; i < closeClass.length; ++i) {
            if (closeClass[i].getAttribute('id') == 'reply_' + id) {
                document.getElementById('reply_' + id).classList.remove('displayNone');
            } else {
                closeClass[i].classList.add('displayNone');
            }
        }



    }
    CommentReply(id, w) {
        var xyz = localStorage.getItem("user_open_comment");
        if (this.commentReplyForm.value.commentreply == '') {
            Swal.fire({
                text: "Please type anything to comment",
                type: "error"
            });
            return false;
        }
        this.commentReplyForm.value.entity_id = id
        this.user.post("replay_comments", this.commentReplyForm.value).subscribe(res => {
            this.commentReplyForm.reset()

            this.show_comment_reply = 1
        })
        this.showToggle(w, xyz);


    }
    load_more_comment_reply(id){

 this.upperlimit1 =this.lowerlimit1+this.upperlimit1

  // 
for (var i = 0; i < this.allcomment.length; ++i) {

   this.user.post("getcommentreply",{id:id,limit:""+0+","+this.upperlimit1+"", i : i}).subscribe(res1 => {
                  this.common = res1;
                  if(this.common.length > 0 && this.allcomment[res1[0].i].id == id)

                  {this.allcomment[res1[0].i].subcoment = res1} 
                })
   }
 }
    openReplyPost() {
        this.reply_post = 1

    }
    show_comment_post_btnn() {
        this.show_comment_post_btn = 1
    }
    intvideoReqSubmit() {
        var a = window.location.href.split('/');
        this.submitted1 = true;

        if (this.IntervideoReq.invalid) {
            Swal.fire({
                text: "Enter interview date and time"
            });
            return false;
        } else {
            this.IntervideoReq.value.userid = a[a.length - 1];
            this.IntervideoReq.value.oppId = this.oppId1;
            this.IntervideoReq.value.user_login_id = localStorage.getItem('id');
            this.user.post('view_profile/directvideoInterReq', this.IntervideoReq.value).subscribe(res => {
                ////////console.log(res);
                this.interstatus1 = res;
                if (this.interstatus1.status == true) {
                    Swal.fire({
                        text: "Success",
                        title: "" + this.interstatus1.msg + "",
                        type: "success"
                    })
                    this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["shared/view_profile/" + localStorage.getItem('con_id')]));
                } else {
                    Swal.fire({
                        text: "Error",
                        title: "" + this.interstatus1.msg + "",
                        type: "error"
                    })
                    this.IntervideoReq.reset()
                }
            });
        }
    }




    reportFunction(j) {
        document.getElementById('commentOpener1_' + j).classList.toggle('displayNone');
    }
    reportAbouse(element, type) {

        this.report_comment_element_id = element
        this.type = type

        this.report_comment_sub()
    }
    report_comment_sub() {
        var entity_id = this.report_comment_element_id
        var entity_type = this.type


        Swal.fire({
            title: 'Submit your reason ',
            input: 'textarea',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Report',
            showLoaderOnConfirm: true,

        }).then((result) => {
            if (result.value) {
                this.showLoader = true;
                this.user.post("report_on_comment", {
                    entity_id: entity_id,
                    comments: result.value,
                    entity_type: entity_type
                }).subscribe(res => {
                    this.report_com_status = res
                    if (this.report_com_status.status == true)

                    {
                        this.showLoader = false;

                        Swal.fire({
                            text: "Report And Abuse Sent Successfully",
                            type: "success"
                        })
                    } else {
                        Swal.fire({
                            text: "Report And Abuse Sent Failed",
                            type: "warning"
                        })
                    }
                })
                this.report_comment.reset()

                this.closeModalFunction()
            }
        })
    }



    likeOnComment(arg1, w) {

        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }

        this.user.post("likepost", {
            post_id: arg1,
            type: 4
        }).subscribe(res => {
            this.comment_like_count = res
            this.show_like_comment = 0
            // this.ngOnInit(w)
            this.showToggle(w, w)

        })
    }
    /*  bioview(){
          alert("hi")
          if()
         
      }*/
    navi_virtual() {
        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }
        this.rt.navigate(['shared/messages'])
    }

    getOpportunity_status(){
        console.log("hello",this.mycheck)
       if (this.mycheck == 1) {
                this.set_login_id =this.con_id
            }else if(this.mycheck == 2){
                this.set_login_id = localStorage.getItem('id')
            }
        console.log("hello--",this.set_login_id)
         
           this.user.post('opportunity/getOpportunity_status',{login_id:this.set_login_id}).subscribe(res => {
          this.opdata = [];
          console.log("opdat-----------------a",this.opdata)
          this.oppdata = res;
          for (var i = 0; i < this.oppdata.length; ++i) {
            this.opdata.push(this.oppdata[i].opportunity_id);
          }
          console.log("opdata",this.opdata)
        });
    }

    comment_notification(id){
        if(id != this.myLoginId){
    this.user.post("opportunity/comment_Notification",{connection_id:id}).subscribe(res=>{

        })
}
}
likeNotification(id, status){
        if(status.getAttribute('class') != 'fa-heart far' && id != this.myLoginId)
        {
        this.user.post("opportunity/likeNotification",{connection_id:id}).subscribe(res=>{

        })          
        }
   
}
comment_reply_noti(id){
    if(id != this.myLoginId){

      this.user.post("opportunity/comment_reply_Notification",{connection_id:id}).subscribe(res=>{

        })
    }
}
like_reply_noti(id, status){
        if(status == 0 && this.myLoginId != id)
        {
        this.user.post("opportunity/like_comment_Notification",{connection_id:id}).subscribe(res=>{

        })          
        }
   
}
Check_picture(){
    this.user.fileExists(this.pic_path).subscribe(res => {
            this.common = res;
             this.file_status=this.common.status
        });
}

virtual_check(){
    this.user.post("opportunity/virtual",{id:this.con_id}).subscribe(res=>{
        this.virtual_status=res[0].id;
        console.log(this.virtual_status)

    })
}
virtual_check_user(){
    this.user.post("opportunity/virtual_user",{id:this.con_id}).subscribe(res=>{
        this.virtual_status_user=res[0].id;
        console.log(this.virtual_status_user)

    })
}
public onCloseClick(): void {

        this.filesToUpload_comment=[]
this.filesToUpload_comment_video=[]
 document.getElementById('commentOpener1_comment'+localStorage.getItem('hide_')).classList.add('displayNone');
document.getElementById('commentOpener1_comment_video'+localStorage.getItem('hide_')).classList.add('displayNone');

}
filesToUpload_comment: Array < File > = [];
filesToUpload_comment_video: Array < File > = [];

image_upload_comment(event,j){
        document.getElementById('commentOpener1_comment_video'+j).classList.add('displayNone');

   localStorage.setItem("hide_",j)
    document.getElementById('commentOpener1_comment'+j).classList.remove('displayNone');
    // this.hasImage_comment = 1
     this.filesToUpload_comment = < Array < File >> event.target.files;
     if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;
        reader.readAsDataURL(file);
    }
  }
  video_upload_comment(event,j){
     document.getElementById('commentOpener1_comment'+j).classList.add('displayNone');
   this.filesToUpload_comment_video = < Array < File >> event.target.files;
   localStorage.setItem("hide_",j)
    document.getElementById('commentOpener1_comment_video'+j).classList.remove('displayNone');
    // this.hasImage_comment = 1
     $(document).on("change", ".file_multi_video", function(event) {
  var $source = $('#video_here_video'+j);
  $source[0].src = URL.createObjectURL(this.files[0]);
  $source.parent()[0].load();
});
}
show_connectionn(){
    this.show_connection=1
    console.log("show_connectionn",this.show_connection)
}
open_main(){
    this.show_connection=0
    console.log("open_main",this.show_connection)
}
loadMore_con()
    {

      if(this.pagination_count > 0)
      {
        this.pagination_count = this.pagination_count - 10;  
        this.currentCount1 += 10;
        if(this.pagination_count < 0)
        {
          this.pagination_count = 0;  
        }

   this.user.connectionDataConnection({userid:localStorage.getItem('con_id'),usertype:localStorage.getItem('user_type_con'),limit:((this.currentCount1)+','+(10)).toString()}).subscribe(res=>{
                for (var j = 0; j < res.length; ++j) {
                    (this.finalConnections).push(res[j]); 
                         //console.log("load is",this.finalConnections)
                   }
          //           for (var i = 0; i < this.finalConnections.length; ++i) {
          // this.user.fileExists1("src/assets/uploads/images/"+this.finalConnections[i].logo,i).subscribe(res => {
          //               this.finalConnections[res['data'].i].file_status=res['data'].status
          //             })
          //               }
           for (var i = 0; i < this.finalConnections.length; ++i) {
          this.user.fileExists1("src/assets/uploads/images/"+this.finalConnections[i].logo,i).subscribe(res => {
                        this.finalConnections[res['data'].i].file_status=res['data'].status
          this.user.post("get_friend_status",{login_id:localStorage.getItem('id'),connection:this.finalConnections[res['data'].i].userid}).subscribe(res1=>{
              this.finalConnections[res['data'].i].fr_status=res1['status']
              this.user.post("getConnectStatus", {
                con_id:this.finalConnections[res['data'].i].userid,userid:localStorage.getItem('id')
            }).subscribe(res2 => {
              this.finalConnections[res['data'].i].pending_fr_status=res2[0]['status']

            })
          })
                      })
                        }
   })


      }else{
        this.pagination_count = 0;
      }
      return false;
    }
     Request_con(value) {

        if (this.check != undefined) {


            if (this.con_id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked   " + this.data[0].name.split(" ")[0],
                    type: "warning"
                });
                return
            } else if (this.con_id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }

        this.connect = JSON.stringify({
            connection_id: value
        });
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }


        this.http.post(this.api + '/requestconnection', this.connect, httpOptions).subscribe(res => {
            this.connection = res

            if (this.connection.status == true) {
                this.connection_status1 = this.connection.status
                //////////////console.log("connection status true",this.connection_status)
            } else if (this.connection.status == false) {
                this.connection_status1 = this.connection.status
                //////////////console.log("connection status flas",this.connection_status)
            }
            this.connection_status1 = null
            Swal.fire({
                    text: "Connection request sent successfully",
                    type: "success"
                });
            this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["shared/view_profile/" + localStorage.getItem('con_id')]));
            //this.ngOnInit()

        })

    }
    show_connection_msg(){
        Swal.fire({
                    text: "You Should be in connection to see "+this.data[0].name+" connections",
                    // type: "success"
                });
    }
    go_profile(id){
        this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["shared/view_profile/" + id]));
    }
    appliedNotification(title,id,op_id){
   this.showLoader=true;
   this.user.post("opportunity/appliednotification",{title:title,connection_id:id, userid : localStorage.getItem('id'), opp_id : op_id}).subscribe(res=>{
       this.showLoader=false;
   })

 }
}
import { Component, OnInit } from '@angular/core';
import {FormGroup , FormControl ,FormBuilder,Validators} from '@angular/forms';
import $ from 'jquery';

import { Router } from '@angular/router';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import {UserService} from './../../user.service'
import * as myGlobals from './../../global';
import Swal from 'sweetalert2';
import * as io from 'socket.io-client';
import {ElementRef,Renderer2,ViewChild} from '@angular/core';

import {AngularEditorModule ,AngularEditorConfig } from '@kolkov/angular-editor';
import { DatePipe } from '@angular/common'

import 'moment';
import * as _moment from 'moment-timezone';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';

const moment = (_moment as any).default ? (_moment as any).default : _moment;

export const MY_CUSTOM_FORMATS = {
    parseInput: 'LL LT',
    fullPickerInput: 'LL LT',
    datePickerInput: 'LL',
    timePickerInput: 'LT',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
};

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
     showDate:number=0;
       hide:number=1

  date_time:any=''
 api = myGlobals.api_url;
    finalnotification_data: any
    api_url_ = myGlobals.api_url_;
    OpportunityRescheduleForm: any;
    declineData : any;
    OpportunityAccept_user:any
    url = this.api_url_;
    media_url = myGlobals.media_url;
    resopp : any;
    server_name = myGlobals.server_name
    title: any = '';
    notification_data: any
    final_notification = []
    minDate1 =  new Date(); 
    minDate =  new Date(); 
    resData: any
    public show: boolean = false;
    submitted: any = false
    message: any
    submitted1=false;
    OpportunityAccept: any;
    OpportunityAccept_re:any
    notification_count: any
    OpportunityDecline:any
    reschedule_response : any;
    userId : any;
    userD: any;
    acceptData: any;
    rescheduleData : any = {};
    earlier_notificationdata = []
    myshow: number = 0;
    accept_data : any = {} ;
    email_msg:number=0
showmax:number=0
showmin:number=0
    viewier_status: any;
    lowerlimit: number = 3;
    upperlimit: number = 5;
    status: any
    currentCount: any
    final: any
    paginationresult_count: any
    showLoader = false;
    tab1 = true;
    tab2 = false;
    showSuggestion: any
    connection_count = []
    connectionId: any
    show1: number = 1

    totalSuggestionCount: any
    currentCountSuggestion: any
    currentCount1: number = 0
    currentCountopp1: number = 0

    myvar: any
    newfinal: any
    connectionnId: any
    connect: any
    connection: any
    connection_status1: any
    connection_status: any
    cancel_id: any
    skills: any
    suggestionOpportunity: any
    totaloppCount: any
    currentCountOpp: any
    newfinalopp: any
    opp: any
    renewfinalopp: any
    len: any
    skillscheck: any
    disableopp: any
    hide_conn_see_all: any;
    type: any;
    socket: any;
    hide_notification: any;
    check: any;
    read_status: any;
    read_length: any;
    accept_id: any;
    accept: any;
    decline_id: any;
    decline: any;
    mark_status: any;
    file_status = false;
    pic_path: any
    common: any
    notification_len: any
    constructor(public datepipe: DatePipe,private rd: Renderer2, private http: HttpClient, private fb: FormBuilder, private rt: Router, private user: UserService) {
        this.socket = io(this.url);

    }



    @ViewChild('someVar') el: ElementRef;
    // ngAfterViewInit() {
    //       ////////console.log("-----------------------",this.rd); 
    //       this.el.nativeElement.focus();      //<<<=====same as oldest way
    // }
    ngOnInit() {
  this.OpportunityDecline = this.fb.group({
      reason:['',Validators.required]
    })
        this.user.post("view_profile/getblock", {
            userid: localStorage.getItem('id')
        }).subscribe(res => {
            this.check = res[0]
        })
         this.OpportunityAccept_user = this.fb.group({
       email:['',Validators.required],
       phone:['',Validators.required],
    
    })
 
         this.OpportunityRescheduleForm = this.fb.group({
            date_time: ['', [Validators.required]],
            comment: ['', [Validators.required, Validators.maxLength(300)]],
        });
         this.OpportunityAccept_re = this.fb.group({
      reason:['',Validators.required],
      // date_time : ['', [Validators.required]],
    })
        this.OpportunityAccept = this.fb.group({
                // date_time: ['', [Validators.required]],
                additional_details_box: ['', Validators.maxLength(300)],
                interview_type: ['', Validators.required]
            })
            // window.onclick = function(event) {
            //   var a = document.getElementsByClassName('dropdownController')
            //   for (var i = 0; i < a.length; ++i) {
            //     a[i].classList.add('displayNone');
            //   }
            // }
        this.socket.disconnect();
        //  document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.type = localStorage.getItem('token')
        var element = document.getElementById("mainBody");
        element.classList.remove("has-main-navi--fully-opened");
        this.getRecentNotification()
        this.allNotificationCount()
        this.getEarlierNotification()
        this.getSuggestion();
        this.getSkills();
        this.Read_Status();
    }
    get oppErrSubmit() {
        return this.OpportunityAccept.controls;
    }

    get oppErrSubmit1() {
        return this.OpportunityAccept_re.controls;
    }

    get decErrSubmit() { return this.OpportunityDecline.controls; }
get resErrSubmit() {
        return this.OpportunityRescheduleForm.controls;
    }

    clear_all()
    {
        this.user.post('/notification/clearAllMsg', {user_id : localStorage.getItem('id')}).subscribe(res =>{
            Swal.fire({title : "Success", text : '', type : 'success'});

            this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
            this.rt.navigate(["shared/notification"]));
        });
    }

    getSkills() {
        this.user.post("getSkills", {
            userid: localStorage.getItem('id')
        }).subscribe(res => {
            this.skillscheck = res
            if (this.skillscheck.length > 0) {

                this.skills = res[0].skills.split(",");
                this.user.post("notification/getOpportunities", {
                    skill: this.skills,
                    limit: "0,3"
                }).subscribe(res => {
                    this.suggestionOpportunity = res
                    for (var i = 0; i < this.suggestionOpportunity.length; ++i) {
                        this.user.fileExists1("src/assets/uploads/images/" + this.suggestionOpportunity[i].profile_pc, i).subscribe(res => {
                            this.suggestionOpportunity[res['data'].i].file_status = res['data'].status
                        })
                    }
                    this.currentCountOpp = this.suggestionOpportunity.length

                })
                this.user.post("notification/getOpportunitiesCount", {
                    skill: this.skills
                }).subscribe(res1 => {
                    this.opp = res1
                    this.totaloppCount = this.opp.length
                        //////console.log("hell..o",this.totaloppCount)
                })
            }
        })

    }
o(i){
    this.showDate=2
    this.hide=0
    this.date_time=_moment(i._d).format('lll')


}
show_datepicker(){
  this.showDate=0
}

    acceptOppSubmit_re(){
 this.showLoader = true;
    this.submitted = true;

    if (this.OpportunityAccept_re.invalid) {
      Swal.fire({title : "ERROR",html : "Please enter all required fields", type : "error"});
      return;
    }
    this.rescheduleData.date_time = this.OpportunityAccept_re.value;

        // console.log("--------",this.date_time)
        // this.rescheduleData.date_time.date_time=this.date_time
         console.log("====",this.date_time,'today-------->',moment(new Date()).format('lll')) 
      if(this.date_time == ''){
            Swal.fire({
                    title: "Warning",
                    html: "Please select date",
                    type: "error"
                });
          this.showLoader = false
          return false
        }else if(Date.parse(this.date_time) >= Date.parse(moment(new Date()).format('lll'))){
          this.rescheduleData.date_time.date_time=this.date_time
      }else{
          Swal.fire({
                    title: "Warning",
                    html: "Selected date should not be less than current date",
                    type: "error"
                });
           this.showLoader = false;

          return false
      }
      console.log("dev",this.rescheduleData)
       this.user.RescheduleinterviewRequest(this.rescheduleData).subscribe(res=>{
         this.showLoader=false;
                 this.reschedule_response=res;
                 $('#user_request_popup_date_re').hide();
                 
                  Swal.fire({title : "Success",html : " Rescheduled request sent successfully", type : "success"});

                  this.interviewresschedulenotification(this.userId, this.rescheduleData.date_time.date_time, this.title, this.rescheduleData);
          })

        this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["shared/notification"]));
  
}

interviewresschedulenotification(id, date, title, data){
    console.log("-----------------========",id, date, title, data)
             this.showLoader=true;

             this.user.post("opportunity/interviewreschdulenotification",{connection_id:id, date : date, userid : localStorage.getItem('id'), title : title, ex_data : data}).subscribe(res=>{
             this.showLoader=false;
     })
    }

    getSuggestion() {
        this.user.post("notification/getsuggestion", {
            limit: "0,4",
            userid: localStorage.getItem('id')
        }).subscribe(res => {
            this.showSuggestion = res;
            this.currentCountSuggestion = this.showSuggestion.length
            this.hide_conn_see_all = this.currentCountSuggestion
            for (var i = 0; i < this.showSuggestion.length; ++i) {
                this.connectionId = this.showSuggestion[i].user_login_id
                this.user.post("notification/getconnectioncountting", {
                    id: this.connectionId,
                    i: i
                }).subscribe(res1 => {

                    this.showSuggestion[res1[0].i].count = res1[0].total_connections

                    this.user.fileExists1("src/assets/uploads/images/" + this.showSuggestion[res1[0].i].profile_pic, res1[0].i).subscribe(res => {
                        this.showSuggestion[res['data'].i].file_status = res['data'].status
                    })
                })

            }






            this.user.post("notification/suggestioncounting", {
                userid: localStorage.getItem('id')
            }).subscribe(res => {
                this.myvar = res
                this.totalSuggestionCount = this.myvar.length
                    ////////console.log("res",this.totalSuggestionCount)
            })
        })

    }


    getRecentNotification() {
        this.showLoader = true;
        this.user.post("notification/getnotification", {
            limit: "0,3",
            userid: localStorage.getItem('id')
        }).subscribe(res => {
            this.showLoader = false;
            this.notification_data = res
            this.notification_len=this.notification_data.length
            console.log(res, 'res')
            for (var i = 0; i < this.notification_data.length; ++i) {
                this.user.post("notification/getPic", {
                    pic_id: (this.notification_data[i]).message.logo,
                    i: i
                }).subscribe(res => {
                    if (res != null) {
                        this.notification_data[res[0].i].message.pic_name = res[0].pic_name

                        this.user.fileExists1("src/assets/uploads/images/" + res[0].pic_name, res[0].i).subscribe(res => {
                            this.notification_data[res['data'].i].file_status = res['data'].status
                        })
                    }
                })
                this.user.post("get_name_notification", {
                    userid: this.notification_data[i].message.senderid,
                    i: i
                }).subscribe(res => {
                    this.notification_data[res[0].i].noti_username = res[0].name
                })

                if ((this.notification_data[i].notification_type == 9 || this.notification_data[i].notification_type == 10 || this.notification_data[i].notification_type == 13 || this.notification_data[i].notification_type == 19) && this.notification_data[i].message.interview_req_id != '' && this.notification_data[i].message.interview_req_id != null && this.notification_data[i].message.interview_req_id != undefined) {
                    this.user.post("opportunity/getInterviewStatus", {
                        id: this.notification_data[i].message.interview_req_id,
                        i: i
                    }).subscribe(res => {
                        console.log("res_dev",res)
                        this.notification_data[res[0].i].interview_Status = res[0].request_status;
                        this.notification_data[res[0].i].int_type = 1;

                    });
                }

              
                
            }
        })
    }

     acceptRescheduleRequest(id, oppId, userId,type) {

        Swal.fire({
            title: 'Are you sure?',
            text: "Want to accept this time",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Sure'
        }).then((result) => {
            if (result.value) {
              this.user.post("opportunity/reschRequestInt", {
                    user_id: userId,
                    interReqId : id,
                    oppId: oppId,
                    inter_type:type
                }).subscribe(res => {
                    this.resopp = res;
                    if (this.resopp.status == true) {
                        Swal.fire({
                            title: "Accepted",
                            html: "User interview request accepted successfully",
                            type: "success"
                        })
                    } else {
                        Swal.fire({
                            title: "FAILED",
                            html: "User interview request acceptation failed",
                            type: "error"
                        });
                    }
                    this.rt.navigateByUrl('/shared/contact-us', {
                        skipLocationChange: true
                    }).then(() =>
                        this.rt.navigate(["bussiness/opportunities"]));
                });

            }
        })
        return false;
    }

    

    showdetail(type, userId, id, oppId)
    {
           console.log(type, userId, id, oppId)
           this.showLoader=true
         var data = {
                user_id : userId,
                id : id,
                oppId : oppId,
                status : 2
            }

            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }
            this.http.post(this.api + "/opportunity/getReason", data, httpOptions).subscribe(res => {
                this.showLoader=false
                if(res[0].rejection_note != '')
                {
                    this.showLoader=false
                    Swal.fire({html : "<p><span><b> Reason : </b></span>"+res[0].rejection_note+"<p>"});
                }else{
                    this.showLoader=false
                    Swal.fire({html : "<p>Sorry, No details found <p>"});

                }
            })
        return false;    

    }

    open_accept_popup(value,userid){



      this.accept_data['opp_id']=value;
      this.accept_data['userid']=userid;
      $('#user_accept').show();
      var user_pop_listing = document.getElementById('user_accept');

      user_pop_listing.style.visibility = "visible";
      user_pop_listing.style.top = "0";
      user_pop_listing.style.height = "auto";
    }
close_accept(){
    $('#user_accept').hide();
}
keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;

        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    acceptOppSubmit_user(){
  
  if(this.OpportunityAccept_user.value.email=='' && this.OpportunityAccept_user.value.phone==''){
          Swal.fire({
                title: "ERROR",
                html: "Please provide information",
                type: "error"
            });
            
            return false
        }
  if(this.OpportunityAccept_user.value.email != ''){
    var check_email=this.OpportunityAccept_user.value.email;
          var res=check_email.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/)
          if(res == null && check_email != '')
          {
            this.email_msg=1
            return false
          }else{
            this.email_msg=0
          }
  }
  if(this.OpportunityAccept_user.value.phone != ''){
    if(this.OpportunityAccept_user.value.phone.length > 16 ){
      this.showmax=1
       this.showmin=0
      return false;
    }

    if(this.OpportunityAccept_user.value.phone != null){
        if(this.OpportunityAccept_user.value.phone.length <=5){
      this.showmin=1
      this.showmax=0
      return false;
    }
    }
  this.OpportunityAccept_user.value.phone='+1'+this.OpportunityAccept_user.value.phone;
  }
    this.Accept2(this.accept_data.userid,{id:this.accept_data.opp_id,contact_email:this.OpportunityAccept_user.value.email,contact_phone:this.OpportunityAccept_user.value.phone})

}

Accept2(userid,value){
    this.showLoader=true;
  this.user.acceptinterviewRequest(value).subscribe(res=>{
    this.interviewacceptnotification(userid)
      this.showLoader=false;
      $('#user_accept').hide();
       Swal.fire({title:"Accepted",text : "Interview request Accepted successfully", type : "success"}) 
       this.OpportunityAccept_user.reset();
        this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["user/opportunities-user"]));
       // this.interviewRequest() 
  })
}

 interviewacceptnotification(id){
   // console.log(id)
   this.user.post("opportunity/interviewacceptnotification",{connection_id:id}).subscribe(res=>{
       this.showLoader=false;
       this.status=res
   })
 }

    getEarlierNotification() {
        this.showLoader = true;
        this.user.post("notification/getearliernotification", {
            limit: "" + this.lowerlimit + "," + this.upperlimit + "",
            userid: localStorage.getItem('id')
        }).subscribe(res => {
           console.log("check",res)

            this.resData = res
            this.earlier_notificationdata = this.resData
            this.hide_notification = this.earlier_notificationdata.length
            for (var i = 0; i < this.earlier_notificationdata.length; ++i) {
                //console.log((this.earlier_notificationdata[i]).message.logo)
                this.user.post("notification/getPic", {
                    pic_id: (this.earlier_notificationdata[i]).message.logo,
                    i: i
                }).subscribe(res => {
                    this.earlier_notificationdata[res[0].i].message.pic_name = res[0].pic_name
                    this.user.fileExists1("src/assets/uploads/images/" + res[0].pic_name, res[0].i).subscribe(res => {
                        this.earlier_notificationdata[res['data'].i].file_status = res['data'].status
                    })
                })
                this.user.post("get_name_notification", {
                    userid: this.earlier_notificationdata[i].message.senderid,
                    i: i
                }).subscribe(res => {
                    this.earlier_notificationdata[res[0].i].noti_username = res[0].name
                })


                if ((this.earlier_notificationdata[i].notification_type == 9 || this.earlier_notificationdata[i].notification_type == 10 || this.earlier_notificationdata[i].notification_type == 13 || this.earlier_notificationdata[i].notification_type == 19) && this.earlier_notificationdata[i].message.interview_req_id != '' && this.earlier_notificationdata[i].message.interview_req_id != null && this.earlier_notificationdata[i].message.interview_req_id != undefined) {
                      console.log(this.earlier_notificationdata[i].notification_type)
                    this.user.post("opportunity/getInterviewStatus", {
                        id: this.earlier_notificationdata[i].message.interview_req_id,
                        i: i
                    }).subscribe(res => {
                        this.earlier_notificationdata[res[0].i].interview_Status = res[0].request_status;
                        this.earlier_notificationdata[res[0].i].int_type = 1;

                    });
                }
            }

            this.showLoader = false;

        })
    }




    allNotificationCount() {
        this.user.allnotificationCount().subscribe(res => {
            this.notification_count = res
        })
    }

    NotificationSeen(id) {
        this.user.notificationSeen({
            id: id
        }).subscribe(res => {
            //this.notification_count=res
            this.allNotificationCount()

        })
    }

    showtoggle(value) {
        ////////console.log("recent",value)
        var a = document.getElementsByClassName('dropdownController');
        for (var i = 0; i < a.length; ++i) {
            if (a[i].getAttribute('id') != "id_" + value) {
                a[i].classList.add('displayNone');
            }
        }
        document.getElementById("id_" + value).classList.toggle('displayNone');
    }

    close(value) {
        document.getElementById("id_" + value).classList.add('displayNone');

    }



    showtoggle1(value) {
        ////////console.log("earlier",value)
        var a = document.getElementsByClassName('dropdownController');
        for (var i = 0; i < a.length; ++i) {
            if (a[i].getAttribute('id') != "id_" + value) {
                a[i].classList.add('displayNone');
            }
        }
        document.getElementById("id_" + value).classList.toggle('displayNone');
    }
    hidetoggle(value) {
        this.myshow = 0

    }

    deleteNotification(value) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this notification?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.user.post("notification/deletenotification", {
                    id: value
                }).subscribe(res => {
                    this.status = res
                    if (this.status.status == true) {
                        Swal.fire({
                            title: "Success",
                            text: "Notification deleted successfully",
                            type: "success"
                        })
                        this.getRecentNotification()
                        this.getEarlierNotification()
                        this.rt.navigateByUrl('/shared/contact-us', {
                            skipLocationChange: true
                        }).then(() =>
                            this.rt.navigate(["shared/notification"]));
                    } else {
                        Swal.fire({
                            title: "failed",
                            text: "Notification deletion failed",
                            type: "error"
                        })
                    }
                })
            }

        })

    }
    SeeMore() {
        this.showLoader = true
        this.lowerlimit = this.lowerlimit + this.upperlimit
            ////////console.log(this.lowerlimit,this.upperlimit)
        this.user.post("notification/getearliernotification", {
            limit: "" + this.lowerlimit + "," + this.upperlimit + "",
            userid: localStorage.getItem('id')
        }).subscribe(res => {
            this.final = res
            for (var j = 0; j < this.final.length; ++j) {

                (this.earlier_notificationdata).push(this.final[j])
            }
            console.log("again check",this.earlier_notificationdata)
            for (var i = 0; i < this.earlier_notificationdata.length; ++i) {
                this.user.post("notification/getPic", {
                    pic_id: (this.earlier_notificationdata[i]).message.logo,
                    i: i
                }).subscribe(res => {
                    this.earlier_notificationdata[res[0].i].message.pic_name = res[0].pic_name
                        // console.log(this.earlier_notificationdata)

                    this.user.fileExists1("src/assets/uploads/images/" + res[0].pic_name, res[0].i).subscribe(res => {
                        this.earlier_notificationdata[res['data'].i].file_status = res['data'].status
                    })
                })
                this.user.post("get_name_notification", {
                    userid: this.earlier_notificationdata[i].message.senderid,
                    i: i
                }).subscribe(res => {
                    this.earlier_notificationdata[res[0].i].noti_username = res[0].name
                })

                if ((this.earlier_notificationdata[i].notification_type == 9 || this.earlier_notificationdata[i].notification_type == 10 || this.earlier_notificationdata[i].notification_type == 13 || this.earlier_notificationdata[i].notification_type == 19) && this.earlier_notificationdata[i].message.interview_req_id != '' && this.earlier_notificationdata[i].message.interview_req_id != null && this.earlier_notificationdata[i].message.interview_req_id != undefined) {
                    this.user.post("opportunity/getInterviewStatus", {
                        id: this.earlier_notificationdata[i].message.interview_req_id,
                        i: i
                    }).subscribe(res => {
                        this.earlier_notificationdata[res[0].i].interview_Status = res[0].request_status;
                        this.earlier_notificationdata[res[0].i].int_type = 1;

                    });
                }

            }


            this.showLoader = false

        })
    }



    rescheduleAG(userId, id, oppId,type) {
        this.acceptData = {
            id: id,
            opp: oppId,
            user_id: userId,
            inter_type:type
        }




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

    RescheduleOppSubmit() {
      this.submitted = true;

        if (this.OpportunityRescheduleForm.invalid) {
            Swal.fire({
                title: "ERROR",
                html: "Please enter all required fields",
                type: "error"
            });
            return;
        }
        this.acceptData.date_time = this.OpportunityRescheduleForm.value.date_time;
              var dateToSave = new Date(this.acceptData.date_time).getFullYear()+"-"+(new Date(this.acceptData.date_time).getMonth()+1)+"-"+new Date(this.acceptData.date_time).getDate()+" "+new Date(this.acceptData.date_time).getHours()+":"+new Date(this.acceptData.date_time).getMinutes()+":00";
          this.acceptData.date_time=dateToSave
        this.acceptData.comment = this.OpportunityRescheduleForm.value.comment;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.api + "/opportunity/rescheduleAppointmentFromBusiness", this.acceptData, httpOptions).subscribe(res => {
            this.opp = res;
            if (this.opp.status == true) {
                Swal.fire({
                    title: "SUCCESS",
                    html: "Request send successfully",
                    type: "success"
                })
            } else {
                Swal.fire({
                    title: "FAILED",
                    html: "Something went wrong , please try again later",
                    type: "error"
                });
            }
            this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["bussiness/opportunities"]));
        });
        return false;
    }


    Connection() {
        document.getElementById('show_conn').classList.add('current')
        document.getElementById('show_opp').classList.remove('current')
        this.tab1 = true;
        this.tab2 = false;
        this.show1 = 1
            ////////console.log("connection")
    }

    Opportunity() {
        document.getElementById('show_conn').classList.remove('current')
        document.getElementById('show_opp').classList.add('current')
        this.tab1 = false;
        this.tab2 = true;
        this.show1 = 2
    }




    ////////console.log("Opportunity")
    moreConnection() {
        if (this.totalSuggestionCount > 0) {
            this.totalSuggestionCount = this.totalSuggestionCount - 3;
            this.currentCount1 += this.currentCountSuggestion;
            if (this.totalSuggestionCount < 0) {
                this.totalSuggestionCount = 0;
            }

            this.user.post("notification/getsuggestion1", {
                limit: ((this.currentCount1) + ',' + (this.totalSuggestionCount)).toString()
            }).subscribe(res => {
                this.newfinal = res
                for (var i = 0; i < this.newfinal.length; ++i) {
                    this.connectionnId = this.newfinal[i].user_login_id
                    this.user.post("notification/getconnectioncountting", {
                        id: this.connectionnId,
                        i: i
                    }).subscribe(res1 => {

                        this.newfinal[res1[0].i].count = res1[0].total_connections
                    })

                }
                for (var j = 0; j < this.newfinal.length; ++j) {
                    this.showSuggestion.push(this.newfinal[j]);


                }
                for (var i = 0; i < this.showSuggestion.length; ++i) {

                    this.user.fileExists1("src/assets/uploads/images/" + this.showSuggestion[i].profile_pic, i).subscribe(res => {
                        this.showSuggestion[res['data'].i].file_status = res['data'].status
                    })
                }


            })
        } else {
            this.totalSuggestionCount = 0;
        }
        return false;
    }
    moreOpp() {


        if (this.totaloppCount > 0) {
            this.totaloppCount = this.totaloppCount - 4;
            this.currentCountopp1 += this.currentCountOpp;
            if (this.totaloppCount < 0) {
                this.totaloppCount = 0;
            }
            this.user.GET("getSkills1").subscribe(res => {
                this.newfinalopp = res[0].skills.split(",");

                this.user.post("notification/getOpportunities1", {
                    skill: this.skills,
                    limit: ((this.currentCountopp1) + ',' + (this.totaloppCount)).toString()
                }).subscribe(res1 => {
                    this.len = res1

                    for (var j = 0; j < this.len.length; ++j) {
                        this.suggestionOpportunity.push(this.len[j]);
                    }

                    for (var i = 0; i < this.suggestionOpportunity.length; ++i) {
                        this.user.fileExists1("src/assets/uploads/images/" + this.suggestionOpportunity[i].profile_pc, i).subscribe(res => {
                            this.suggestionOpportunity[res['data'].i].file_status = res['data'].status
                        })
                    }
                })


            })
        } else {
            this.totaloppCount = 0;
        }
        return false;
    }
    Request(value) {


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
            var id = value


            if (this.connection.status == true) {
                for (var i = 0; i < this.showSuggestion.length; i++) {
                    if (this.showSuggestion[i].user_login_id == id) {
                        this.showSuggestion.splice(i, 1);
                    }
                }
                this.currentCountSuggestion = this.showSuggestion.length
                    // console.log("skillsii Dev====d=ss>",this.showSuggestion)
            }
            this.getSuggestion()
        })

    }
    oportunity(value, id) {
        if (this.check != undefined) {


            if (id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked this business, you can't send interview request  ",
                    type: "warning"
                });
                return
            } else if (id == this.check.user_login_id) {
                Swal.fire({
                    text: "You are blocked ",
                    type: "warning"
                });
                return
            }
        }
        this.user.sendRequest({
            id: value
        }).subscribe(res => {
            this.disableopp = res
                // ////console.log("hello DEV res ",this.disableopp.status)
            if (this.disableopp.status == true) {
                var id = value;

                for (var i = 0; i < this.suggestionOpportunity.length; i++) {
                    ////console.log("a01",this.suggestionOpportunity[i].oportunity_id)
                    if (this.suggestionOpportunity[i].oportunity_id == id) {
                        this.suggestionOpportunity.splice(i, 1);

                    }
                }
                this.currentCountOpp = this.suggestionOpportunity.length

                ////console.log("skillsii Dev====d=ss>",this.suggestionOpportunity)
            }
            this.getSkills()

            // this.rt.navigateByUrl('/user', {skipLocationChange: true}).then(()=>
            //                      this.rt.navigate(["notification"]));
        })
    }

    hideNotification(type) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to turn off receiving notification like this?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, turn off it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.user.post("notification/hidenotification", {
                    type: type
                }).subscribe(res => {
                    this.status = res
                    if (this.status.status == true) {
                        Swal.fire({
                            title: "Success",
                            text: "Notification turn off succesfully",
                            type: "success"
                        })
                        this.getRecentNotification()
                        this.getEarlierNotification()
                        this.rt.navigateByUrl('/shared/contact-us', {
                            skipLocationChange: true
                        }).then(() =>
                            this.rt.navigate(["shared/notification"]));
                    } else {
                        Swal.fire({
                            title: "failed",
                            text: "Notification turn off failed",
                            type: "error"
                        })
                    }
                })
            }

        })
    }

    notificationread() {
        this.user.post("notification/readnoti", {
            userid: localStorage.getItem('id')
        }).subscribe(res => {
            this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["shared/notification"]));

        })
    }

    Read_Status() {
        this.user.post("notification/getstatus", {
            userid: localStorage.getItem('id')
        }).subscribe(res => {
            this.read_status = res;
            if (this.read_status.length != undefined) {

                this.read_length = this.read_status.length
            }
        })
    }

    Accept(value) {
        this.showLoader = true;
        this.accept_id = JSON.stringify({
            id: value
        })

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.api + '/acceptrequest', this.accept_id, httpOptions).subscribe(res => {
            this.showLoader = false;
            this.accept = res
            if (this.accept.status == true) {
                Swal.fire({
                    text: "Success",
                    title: "Now you are in connection",
                    type: "success"
                })
                this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["shared/notification"]));
            } else {
                Swal.fire({
                    text: "Error",
                    type: "error"
                })
            }

        })
    }


    Decline(value) {


        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to decline connection request ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, decline it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.decline_id = JSON.stringify({
                    id: value
                })
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                }
                this.showLoader = true;
                this.http.post(this.api + '/declinerequest', this.decline_id, httpOptions).subscribe(res => {
                    this.showLoader = false;
                    this.decline = res
                    if (this.decline.status == true) {
                        this.rt.navigateByUrl('/shared/contact-us', {
                            skipLocationChange: true
                        }).then(() =>
                            this.rt.navigate(["shared/notification"]));
                    } else {
                        Swal.fire({
                            text: "Error",
                            type: "error"
                        })
                    }
                })
            }
        })
    }

    Mark(value) {
        this.user.post("notification/markread", {
            id: value
        }).subscribe(res => {
            this.mark_status = res;
            if (this.mark_status.status == true) {

                Swal.fire({
                    text: "Success",
                    title: "Notification mark as read successfully",
                    type: "success"
                })
                this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["shared/notification"]));
            } else {
                Swal.fire({
                    text: "Failed",
                    title: "Notification marking failed",
                    type: "error"
                })
            }
        })
    }

    acceptRequest(id, oppId, user_id, title) {
      this.title = title;
        this.userD = user_id;
        this.acceptData = {
            id: id,
            opp: oppId,
            user_id: user_id
        }




        var user_pop_listing = document.getElementById('user_request_popup_date');
        var user_pop_listing_close = document.getElementById('user_pop_listing_close_date');
        var user_pop_listing_close2 = document.getElementById('user_pop_listing_close_date2');

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

    acceptOppSubmit() {
        this.submitted = true;

        if (this.OpportunityAccept.invalid) {
            Swal.fire({
                title: "ERROR",
                html: "Please fill all required details",
                type: "error"
            });
            return;
        }
        this.showLoader = true;
        this.acceptData.date_time = this.OpportunityAccept.value;

        // this.acceptData.date_time.date_time=this.date_time
        console.log("--------",this.date_time)

        if(this.date_time == ''){
            Swal.fire({
                    title: "Warning",
                    html: "Please select date",
                    type: "error"
                });
          this.showLoader = false
          return false
        }else if(Date.parse(this.date_time) >= Date.parse(moment(new Date()).format('lll'))){
          this.acceptData.date_time.date_time=this.date_time
                   }else{
            Swal.fire({
                    title: "Warning",
                    html: "Selected date should not be less than current date",
                    type: "error"
                });
          this.showLoader = false
          return false
      }
        var dateToSave = new Date(this.acceptData.date_time.date_time).getFullYear() + "-" + (new Date(this.acceptData.date_time.date_time).getMonth() + 1) + "-" + new Date(this.acceptData.date_time.date_time).getDate() + " " + new Date(this.acceptData.date_time.date_time).getHours() + ":" + new Date(this.acceptData.date_time.date_time).getMinutes() + ":00";
        this.acceptData.date_time.date_time = dateToSave

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.api + "/opportunity/acceptInterviewRequest", this.acceptData, httpOptions).subscribe(res => {
            this.opp = res;
            if (this.opp.status == true) {
                this.user.post("/opportunity/get_personal_info", {
                    op_id: this.acceptData.opp
                }).subscribe(res => {
                    this.acceptNotification(this.userD, dateToSave, this.acceptData.date_time.additional_details_box, res[0] ,{extraData : this.acceptData});
                })
                Swal.fire({
                    title: "ACCEPTED SUCCESSFULLY",
                    html: "Interview request accepted successfully",
                    type: "success"
                })
            } else {
                Swal.fire({
                    title: "FAILED",
                    html: "Please Try Again",
                    type: "error"
                });
            }
            this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["shared/notification"]));
        })
    }

    declineRequest(id, intReq, oppId,type : any = 0) {
        console.log(id, intReq, oppId,type)
           
        Swal.fire({
            title: 'Reason for decline (Optional)',
            input: 'textarea',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Decline',
            showLoaderOnConfirm: true,
        }).then((result) => {
            var notes = "";
            if (result.value) {
                notes = result.value;
            }

            if (!result.dismiss) {

              this.showLoader = true;

                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                }
                this.http.post(this.api + "/opportunity/declineRequestInt", {
                    user_id: id,
                    intReq: intReq,
                    oppId: oppId,
                    notes: notes,
                    inter_type:type
                }, httpOptions).subscribe(res => {
                    this.opp = res;
                    if (this.opp.status == true) {
                        Swal.fire({
                            title: "DECLINED",
                            html: "User interview request declined successfully",
                            type: "success"
                        })
                    } else {
                        Swal.fire({
                            title: "FAILED",
                            html: "User interview request declined failed",
                            type: "error"
                        });
                    }
                    this.rt.navigateByUrl('/shared/contact-us', {
                        skipLocationChange: true
                    }).then(() =>
                        this.rt.navigate(["shared/notification"]));
                });
            }
        })

        return false;
    }


    acceptNotification(id, data, additional, personal_info,extraData) {
        this.showLoader = true;
        this.user.post("opportunity/acceptinterviewnotification", {
            title: this.title,
            connection_id: id,
            date: data,
            additional_details_box: additional,
            personal_info: personal_info,
            extraData : extraData
        }).subscribe(res => {
            this.showLoader = false;
        })
    }
    Decline2(id){

    this.declineData = {
      id : id
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You want to decline interview request",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, decline it!'
    }).then((result) => {
      if (result.value) {

    var user_pop_listing1 = document.getElementById('user_request_popup_reason');
  var user_pop_listing_close1 = document.getElementById('user_pop_listing_close_reason');

  user_pop_listing1.style.visibility = "visible";
  user_pop_listing1.style.top = "0";
  user_pop_listing1.style.height = "auto";

  user_pop_listing_close1.onclick = function(evenet) {
    user_pop_listing1.style.visibility = "hidden"; 
    user_pop_listing1.style.top = "-100%";
    user_pop_listing1.style.height = "0";

  }


  window.onclick = function(event){
    if (event.target == user_pop_listing1) {
        user_pop_listing1.style.visibility = "hidden";
        user_pop_listing1.style.top = "-100%";
        user_pop_listing1.style.height = "0";
    }
  }
  return false;
   }
  })
} 
declineOppSubmit(){
   this.showLoader = true;
    this.submitted1 = true;

    if (this.OpportunityDecline.invalid) {
      Swal.fire({title : "ERROR",html : "Please enter  reason", type : "error"});
      return;
    }
    this.declineData.reason = this.OpportunityDecline.value;

this.user.DeclineinterviewRequest(this.declineData).subscribe(res=>{
this.showLoader = false;
$('#user_request_popup_reason').hide();
Swal.fire({title : "Success",html : "Interview declined successfully", type : "success"});
  this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["user/opportunities-user"]));
          })

}


Reschedule(id, userId, title, interview_req_id){
      this.userId = userId;
      this.title = title
      this.rescheduleData = {
          id : id,
          interview_req_id : interview_req_id
        }

    

  

    var user_pop_listing = document.getElementById('user_request_popup_date_re');
  var user_pop_listing_close = document.getElementById('user_pop_listing_close_date_re');
    var user_pop_listing_close2 = document.getElementById('user_pop_listing_close_date2_re');

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

  window.onclick = function(event){
    if (event.target == user_pop_listing) {
        user_pop_listing.style.visibility = "hidden";
        user_pop_listing.style.top = "-100%";
        user_pop_listing.style.height = "0";
    }
  }
  return false;
}

go_profile(id){
      this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["shared/view_profile/"+id]));
}
go_opp(id){
      this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["shared/opportunities_detail/"+id]));
}
}
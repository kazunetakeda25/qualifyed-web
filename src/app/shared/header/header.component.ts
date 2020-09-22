import {OnInit } from '@angular/core';
import {Router } from '@angular/router';
import $ from 'jquery';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {FormBuilder, Validators } from '@angular/forms';
import * as myGlobals from './../../global';
import {UserService } from './../../user.service';
import {Component, Input, ElementRef, ViewChild ,ViewEncapsulation,AfterViewInit} from '@angular/core';
import Swal from 'sweetalert2';
import 'moment';
import * as moment from 'moment-timezone';
import {View, ScheduleComponent, CurrentAction, EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, PopupOpenEventArgs,  } from '@syncfusion/ej2-angular-schedule';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { FormControl } from '@angular/forms';
import * as io from 'socket.io-client';
import {NgxImageCompressService} from 'ngx-image-compress';
import {DOC_ORIENTATION} from 'ngx-image-compress/lib/image-compress';



 @Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService]
})
export class HeaderComponent implements OnInit {
    list: any = []; server_name = myGlobals.server_name; showLoader = false; api_url_ = myGlobals.api_url_; newChat : any = []; showPermission = false; api = myGlobals.api_url; showVideo = false; chat_name: any; room: any; status = false; sendSection = true; checkId: any; connection: any; tab1 = true; permissionboxMsg : any = ""; showButton : any = false; cc_id: any = 0; tab2 = false; chat: any; showAttach = true; myid = localStorage.getItem('id'); image: any; message: string; messages: string[] = []; url = this.api_url_; files: any = []; data: any; id: any; common: any; messageForm: any; set_value: any; current_id: any; searchData: any = []; private socket; check:any;
    common_res : any ;
   status1:any;
   quick_show=0;
    user_name:any
    callAcceptedStatus = false;
    activeRoom : any;
    acceptStatus = false;
     text:  string  =  '';
    //id: any
    userapi = myGlobals.userapi_url;
    //api = myGlobals.api_url;
    //data;
    filterData:any
    customerData: any;
    nameData: any;
    logStatus = false;
    oppArray : any = [];
    userArray : any = [];
    bussArray : any = [];
     chat_div=0;
     show_div : any = 0;
    //server_name = myGlobals.server_name
    media_url = myGlobals.media_url
    show: number = 0
    public showMY: boolean = false;
    user_type: any;
    user_type2: any
    testhref: any
    headerhref: any
    value = 1;
    notification_count: any
    searchAll: any= 1
    show1: number = 0
    //status:any
    showdiv=[]
    finalArray=[]
    token:any
    serachForm:any
    value1:any
    showLoader_wait:any
    response:any
    result:any
    All=0;
    opp=1;
    pop=1;
    buss=1;
    commin:any
    locationRes:any
    message_count : any = 0;
    hide_header_test : any = 0;
    //common:any;
    file_status=false;
    pic_path:any
    login_id:any
token_type:any
  allInterviewReq : any = [];
  result_count : number = 0;
  show_mgs:number=0
 @ViewChild('scheduleObj') scheduleObj: ElementRef;
    private selectionTarget: Element;
 cal_data:any
 cal_dataa:any
 list_len:any
 shine:number=0
 type:number=2
  public selectedDate: Date = new Date();
    public currentView: View = 'Month';
  public eventSettings: EventSettingsModel = {
    dataSource: this.cal_dataa,
    fields: {
      // id: 'Id',
      subject: { name: 'Subject' },
     
      startTime: { name: 'StartTime' },
      // endTime: { name: 'EndTime' },
    }
  };
   time_value= new FormControl('');
 remindme= new FormControl('');
 remindme_time= new FormControl('');
 show_event_options:number=0
    constructor(private imageCompress: NgxImageCompressService,private router: Router, private fb: FormBuilder, private http: HttpClient, private user: UserService, private rt: Router) {
        this.allNotificationCount();
          this.id = localStorage.getItem('chatId')
        this.socket = io('https://careerqualifyed.com', {transports: ['polling']});
        // this.open_calender();
        this.shine=0
    }
    imgResultBeforeCompress: string;
    imgResultAfterCompress: string;
    ngOnInit() {
        this.headerhref = this.router.url;
      this.login_id=localStorage.getItem('id');
      this.token_type=localStorage.getItem('token');
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.token=localStorage.getItem('token')
             
        if (localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "1" || localStorage.getItem('token') == "2") {
            this.logStatus = true;

            $(".search-dropdown-toggle").click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                $(this)
                    .closest(".search-dropdown")
                    .toggleClass("open");
            });

                this.showLoader_wait=true
            this.user.profileData({userid:this.login_id,usertype:this.token_type}).subscribe(res => {
                setTimeout(()=>{
        if(localStorage.getItem('highlight_navv') != undefined || localStorage.getItem('highlight_navv') != null){
             document.getElementById(localStorage.getItem('highlight_navv')).classList.add('highlight_navv');
        }  
            },4000)
               this.showLoader_wait=false
               console.log("dev_header",res)
                this.nameData = res;
                     this.nameData=res;
         this.pic_path="uploads/images/" + this.nameData[0].profile_pic_name
               this.Check_picture()
                this.user_type2 = this.nameData[0].user_type;
            })
        }

        this.allNotificationCount()

        this.serachForm=this.fb.group({
            name:['']
        })
       
 
          this.messageForm = this.fb.group({
            message: [''],
            file: ['']
        })
       

    }




    Menu(value) {
        if (value == 0) {this.searchAll = 1; this.All=0; this.pop=1; this.opp=1; this.buss=1; }
         else if (value == 1) {this.searchAll = 2; this.All=1; this.opp=0; this.buss=1; this.pop=1; }
          else if (value == 2) {this.searchAll = 3; this.All=1; this.pop=0; this.opp=1; this.buss=1; }
           else if (value == 3) {this.searchAll = 4; this.All=1; this.buss=0; this.pop=1; this.opp=1; }
    }



    search(value, ev) {

        if(ev.key == 'Delete' && value.length == 0)
        {
            $('.searchBarContainer').hide();
            this.customerData = '';
            return false;
        }
        if(ev.key == 'Backspace' && value.length == 0)
        {
            $('.searchBarContainer').hide();
            this.customerData = '';
            return false;
        }
        // if(value == ''){
        //     Swal.fire({text:"Error",title:"Please enter something to search",type:"error"})
        // }
        if (value == '') {
            $('.searchBarContainer').hide();
            this.customerData = '';
        } else {
            $('.searchBarContainer').show();
            var newVal = $.trim(value);
            /*  this.data = JSON.stringify({
               string: newVal
              });*/
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }


            this.http.post(this.api + "/filter", {
                string: newVal,
                type: this.searchAll
            }, httpOptions).subscribe(res => {
                this.oppArray = [];
                this.userArray = [];
                this.bussArray = [];
                this.customerData = res;
                for (var i = 0; i < this.customerData.length; ++i) {
             this.pic_path="src/assets/uploads/images/" + this.customerData[i].name
             var path
             if(this.customerData[i].name != null){
                path="uploads/images/" + this.customerData[i].name
             }else{
                path="uploads/images/" + this.customerData[i].pic_path
             }
             this.customerData[i].path=path
             // this.user.fileExists1('src/assets/'+this.customerData[i].path,i).subscribe(res => {
               
                 
             //            this.customerData[res['data'].i].file_status=res['data'].status
             //                         })
                }

                for (var i = 0; i < this.customerData.length; ++i) {
                  if(this.customerData[i].entity_id == 1)
                  {
                    this.oppArray.push(this.customerData[i]);

                  }else if(this.customerData[i].entity_id == 2)
                  {
                    this.userArray.push(this.customerData[i]);

                  }else if(this.customerData[i].entity_id == 3)
                  {
                    this.bussArray.push(this.customerData[i]);
                  }                  
                }

                                var obj = {};

            for ( var i=0, len=this.bussArray.length; i < len; i++ )
                obj[this.bussArray[i]['id']] = this.bussArray[i];

            this.bussArray = new Array();
            for ( var key in obj )
                this.bussArray.push(obj[key]);
                        })
             
                    }
                    

    }
    searchOpp(value, ev) {
      console.log("hi",value, ev)
        if(ev.key == 'Backspace' && value.length == 0)
        {
            $('.searchBarContainer').hide();
            this.customerData = '';
            return false;
        }
           if(value == ''){
            Swal.fire({text:"Error",title:"Please enter something to search",type:"error"})
        }
        if (value == '') {
            $('.searchBarContainer').hide();
            this.customerData = '';
        } else {
            $('.searchBarContainer').show();
            var newVal = $.trim(value);
            /* this.data = JSON.stringify({
              string: newVal
             });*/
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }


            this.http.post(this.api + "/filter", {
                string: newVal,
                type: this.searchAll
            }, httpOptions).subscribe(res => {
         this.oppArray = [];
                this.userArray = [];
                this.bussArray = [];
                this.customerData = res;
                       for (var i = 0; i < this.customerData.length; ++i) {
                  // code...
             this.pic_path="uploads/images/" + this.customerData[i].pic_path
             var path
             path=this.pic_path
          this.customerData[i].path=path
             // this.user.fileExists1('src/assets/'+this.customerData[i].path,i).subscribe(res => {
             //            this.customerData[res['data'].i].file_status=res['data'].status
             //          })
                }
                for (var i = 0; i < this.customerData.length; ++i) {
                  if(this.customerData[i].entity_id == 1)
                  {
                    this.oppArray.push(this.customerData[i]);
                  }else if(this.customerData[i].entity_id == 2)
                  {
                    this.userArray.push(this.customerData[i]);

                  }else if(this.customerData[i].entity_id == 3)
                  {
                    this.bussArray.push(this.customerData[i]);
                  }                  
                }


                                var obj = {};

            for ( var i=0, len=this.bussArray.length; i < len; i++ )
                obj[this.bussArray[i]['id']] = this.bussArray[i];

            this.bussArray = new Array();
            for ( var key in obj )
                this.bussArray.push(obj[key]);
                        })
                    }
          console.log( this.oppArray)
    }

    searchUser(value, ev) {
        if(ev.key == 'Backspace' && value.length == 0)
        {
             $('.searchBarContainer').hide();
            this.customerData = '';
            return false;
        }
           if(value == ''){
            Swal.fire({text:"Error",title:"Please enter something to search",type:"error"})
        }
        if (value == '') {
            $('.searchBarContainer').hide();
            this.customerData = '';
        } else {
            $('.searchBarContainer').show();
            var newVal = $.trim(value);
            /* this.data = JSON.stringify({
              string: newVal
             });*/
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }


            this.http.post(this.api + "/filter", {
                string: newVal,
                type: this.searchAll
            }, httpOptions).subscribe(res => {
           this.oppArray = [];
                this.userArray = [];
                this.bussArray = [];
                this.customerData = res;
                   for (var i = 0; i < this.customerData.length; ++i) {
                  // code...
             this.pic_path="uploads/images/" + this.customerData[i].name
               var path
             path=this.pic_path
          this.customerData[i].path=path
             // this.user.fileExists1('src/assets/'+this.customerData[i].path,i).subscribe(res => {
             //            this.customerData[res['data'].i].file_status=res['data'].status
             //          })
                }
                for (var i = 0; i < this.customerData.length; ++i) {
                  if(this.customerData[i].entity_id == 1)
                  {
                    this.oppArray.push(this.customerData[i]);
                  }else if(this.customerData[i].entity_id == 2)
                  {
                    this.userArray.push(this.customerData[i]);

                  }else if(this.customerData[i].entity_id == 3)
                  {
                    this.bussArray.push(this.customerData[i]);
                  }                  
                }
         

                                var obj = {};

            for ( var i=0, len=this.bussArray.length; i < len; i++ )
                obj[this.bussArray[i]['id']] = this.bussArray[i];

            this.bussArray = new Array();
            for ( var key in obj )
                this.bussArray.push(obj[key]);
                        })
                    }
    }
    searchBus(value, ev) {
        if(ev.key == 'Backspace' && value.length == 0)
        {
            $('.searchBarContainer').hide();
            this.customerData = '';
            return false;
        }
           if(value == ''){
            Swal.fire({text:"Error",title:"Please enter something to search",type:"error"})
        }
        if (value == '') {
            $('.searchBarContainer').hide();
            this.customerData = '';
        } else {
            $('.searchBarContainer').show();
            var newVal = $.trim(value);
            /* this.data = JSON.stringify({
              string: newVal
             });*/
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }


            this.http.post(this.api + "/filter", {
                string: newVal,
                type: this.searchAll
            }, httpOptions).subscribe(res => {
           this.oppArray = [];
                this.userArray = [];
                this.bussArray = [];
                this.customerData = res;
                       for (var i = 0; i < this.customerData.length; ++i) {
             this.pic_path="uploads/images/" + this.customerData[i].name
                 var path
             path=this.pic_path
          this.customerData[i].path=path

             // this.user.fileExists1('src/assets/'+this.customerData[i].path,i).subscribe(res => {
                        
             //            this.customerData[res['data'].i].file_status=res['data'].status
             //          })
                }
                for (var i = 0; i < this.customerData.length; ++i) {
                  if(this.customerData[i].entity_id == 1)
                  {
                    this.oppArray.push(this.customerData[i]);
                  }else if(this.customerData[i].entity_id == 2)
                  {
                    this.userArray.push(this.customerData[i]);

                  }else if(this.customerData[i].entity_id == 3)
                  {
                    this.bussArray.push(this.customerData[i]);
                  }                  
                }


                                var obj = {};

            for ( var i=0, len=this.bussArray.length; i < len; i++ )
                obj[this.bussArray[i]['id']] = this.bussArray[i];

            this.bussArray = new Array();
            for ( var key in obj )
                this.bussArray.push(obj[key]);
                        })
                    }
    }

    // toggle() {
    //     this.show = 1
    // }
     toggle(j) {
        document.getElementById('nav_header_' + j).classList.toggle('displayNone');
    } 
    close_nav(j){
            document.getElementById('nav_header_' + j).classList.add('displayNone');

    }
    closeToggle() {
        this.show = 0
    }
     toggle_show(j) {
        document.getElementById('mobile_header_' + j).classList.toggle('displayNone');
    } 
    toggle_search(j) {
        document.getElementById('mobile_toggle_search_' + j).classList.toggle('displayNone');
    }
    close_mobi_header(j){
            document.getElementById('mobile_header_' + j).classList.add('displayNone');

    }
    close_mobi_search(j){
            document.getElementById('mobile_toggle_search_' + j).classList.add('displayNone');

    } 

    


toggle1() {
        this.show1 = 1

    }
    toggle1Close() {
        this.show1 = 0
    }

    toggle1Close1() {
    if(this.chat_div == 0)
  {
  this.chat_div=1;
  }
  else{
    this.chat_div=0;
  }
    }


     open_quick(){
           // document.getElementById('user_lists').classList.toggle('displayNone')
            this.show_mgs=1
         document.getElementById('message_window').classList.remove('stick_bottom');
        this.set_value = this.user.set_data;
        if (this.set_value.id != undefined && this.set_value.id != '') {

            this.current_id = this.set_value.id
            if (this.current_id != undefined) {
                this.checkRoom(this.current_id)
            }
        }

        this.user.send_data('');
             this.getList();
        


        this.id = localStorage.getItem('chatId');
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        var element = document.getElementById("mainBody");
        element.classList.remove("has-main-navi--fully-opened");

        


        this.user.post("view_profile/getblock",{userid:localStorage.getItem('id')}).subscribe(res => {
            this.check = res[0]
        })
 
 //message logic
   

        var id = 1


        var xyz = localStorage.getItem("message_id");
        if (xyz != null) {

            this.checkRoom(xyz)
            localStorage.removeItem('message_id')

        } else {
            this.user.post("messagelist",{userid:localStorage.getItem('id')}).subscribe(res => {
             this.list = res
             this.list_len=this.list.length
              console.log(this.list_len)
             
             if(this.list != null){
                 
                this.checkRoom(this.list[0].user_login_id)
             }
            })
        }

        this.user
            .getMessages()
            .subscribe((data: any) => {
                if (data.message == 'GETTING_CALL_REQ' && this.id != data.id) {
                    this.status = true;
                    this.checkId = data.id;
                    //this.videoCallReq();
                    
                } else if (data.message == "ACEEPTED_CALL") {
                        this.callAcceptedStatus = true;
                        this.status = false;
                        this.acceptStatus = true;
                } else if (data.message == "REJECT_CALL") {
                    //this.rejectAction();
                } else {
                    this.chatCheckerSetting(localStorage.getItem('chatId'));
                    this.markRead(this.id, this.room);
                    this.common = {};
                    this.common.media = data.media;
                    this.common.message_from = data.id;
                    this.common.message_to = 0;
                    this.common.room = 0;
                    this.common.status = 1;
                    this.common.created_date = new Date();
                    this.common.type = 0;
                    if (typeof data.media === "number") {
                        this.user.post('getmedia', {
                            id: this.common.media
                        }).subscribe(res => {
                            var newRes: any = res
                            if (newRes.length > 0) {
                                this.common.media = 'https://asset.careerqualifyed.com/uploads/chatAttachments/' + res[0].name;
                                this.common.type = res[0].file_type;
                            }
                            this.files = [];
                        });
                    } else if (this.common.media != '' && this.common.media != null && this.common.media != undefined) {
                        this.common.type = 1;
                    } else {
                        this.common.type = 0;
                    }
                    this.common.created_date = new Date();
                    this.common.message = data.message;
                    if ((data.sender == localStorage.getItem('id') && data.id == localStorage.getItem('chatId')) || (data.sender == localStorage.getItem('chatId') && data.id == localStorage.getItem('id'))) {
                        this.chat.push(this.common);
                    }

                    this.chatAssembler();
                    this.getList();
                    this.scrollFunction();
                }

            });
}

close_quick(){
        // document.getElementById('user_lists').classList.add('displayNone')
 this.show_mgs=0
}
  Close_chat()
    {
       document.getElementById('message_window').classList.add('displayNone')
    }

     closeList()
    {
       document.getElementById('message_window').classList.remove('displayNone');
       document.getElementById('message_window').classList.remove('stick_bottom');
       
    }

    stickChat()
    {
         document.getElementById('message_window').classList.toggle('stick_bottom');
         document.getElementById('message_window').classList.remove('displayNone');
    }
    showSecondTog() {
        var element = document.getElementById("mainBody");
        element.classList.toggle("has-main-navi--fully-opened");
    }
    closeTag() {
        //alert("HELLO WORLD");
        document.body.className.replace("has-main-navi--fully-opened", "");
        
    }
    
    highlight_nav(value){
      localStorage.setItem('highlight_navv',value)
               document.getElementById(value).classList.add('highlight_navv');

    }

    refresh() {
        this.ngOnInit()
    }

    allNotificationCount() {
        this.user.allnotificationCount().subscribe(res => {
            this.notification_count = res
        })
    }

 onEnter(value: string, event)
  {
     if(value ==  undefined || value == ''){
            Swal.fire({text:"Error",title:"Please enter something to search",type:"error"})
        } 
        else{
                 this.value1 = value; 
     //console.log("value",this.value1)
     if(this.customerData.length == undefined){
         return false;
     }
     for (var i = 0; i < this.customerData.length; ++i) {
         this.finalArray.push(this.customerData[i].element_id);
    
        
     }
      //console.log("check",this.finalArray)
                             

            var dups = [];
var arr = this.finalArray.filter(function(el) {
  // If it is not a duplicate, return true
  if (dups.indexOf(el) == -1) {
    dups.push(el);
    return true;
  }

  return false;
  
});
this.filterData=arr;
console.log("this.searchAll",this.searchAll)
localStorage.setItem('searchall',this.searchAll)
localStorage.setItem('keyword',this.value1)
localStorage.setItem('filter',JSON.stringify(this.filterData))     
             this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["shared/user-search"]));
        }


 }

 ConnectSocket(){
     this.user.activate()
 }
logout(){
this.showLoader_wait=true
      this.user.logout().subscribe(data => {
          
      this.status1=data
      // console.log(this.status.status)
      if(this.status1.status == true) {
           this.http.get('https://ipinfo.io').subscribe(res => {
            this.commin = res;
            this.locationRes = {
                ip:this.commin.ip,
                id : localStorage.getItem('id')
            }


            this.user.post('/logoutSession', this.locationRes).subscribe(res => {
     /*          localStorage.removeItem('isLoggedIn');
               localStorage.removeItem('token');
               localStorage.removeItem('id');
               localStorage.removeItem('name');*/
               localStorage.clear();
               this.router.navigate([''])
            });
            this.showLoader_wait=false
          });
        
       
      } else {
        this.showLoader_wait=false
        window.alert('Some problem')
      }
    })
  
  
}
removetext(){
  this.bussArray=''
  this.userArray=''
  this.oppArray=''
this.customerData=''
}
Check_picture(){
    this.user.fileExists('src/assets/'+this.pic_path).subscribe(res => {
            this.common = res;
             this.file_status=this.common.status
        });
}
noti_count(){
       this.user.GET("notification/readnoti_count").subscribe(res=>{
    

     })
}
show_header(){
  // if(document.getElementById('search_result_box') != null){
    // document.getElementById('search_result_box').classList.remove('displayNone');
  // }
  this.hide_header_test=1
}

hide_header(){
  this.hide_header_test=0
}
go(id){
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
//calender 3sept
onPopupOpen(args: PopupOpenEventArgs): void {    
  var close_ev=document.getElementsByClassName('e-back-icon e-icons')[0] as HTMLElement
  if(close_ev != undefined){
    close_ev.onclick = function() {
    var close_ev_class=document.getElementsByClassName('e-quick-popup-wrapper e-popup-close e-device e-lib e-popup e-control')[0] as HTMLElement
    close_ev_class.style.display='none';
                                     }
                        }


        var abc=document.getElementsByClassName('e-quick-popup-wrapper e-device')[0] as HTMLElement
        if(abc != undefined){

        abc.style.display='block';
        }
        if (args.data['IsAllDay'] == true && args.type === 'QuickInfo')  {
            args.cancel = true;
        }
        if(args.data['Subject'] !=undefined && args.type === 'Editor'){
          args.cancel = true;
        }else if(args.data['IsAllDay'] == true && args.type === 'Editor'){
          args.cancel = false;
        }
        this.selectionTarget = null;
        this.selectionTarget = args.target;
    }
    close_calender(){
  this.shine=0
}
 open_calender(){

   this.showLoader_wait=true
   if(localStorage.getItem('token')== '1'){


   var u="https://careerqualifyed.com/api/opportunity/getOppBusinnesReq_test"
  const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
   this.http.post(u,{id:localStorage.getItem('id')},httpOptions).subscribe(res=>{
     this.showLoader_wait=false
 console.log("-------------jadu",res)
   this.cal_data=res
   
 this.eventSettings.dataSource= this.cal_data
 this.shine=1
  })
}else{
  var u="https://careerqualifyed.com/api/opportunity/getOppBusinnesReq_user"
  const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
   this.http.post(u,{id:localStorage.getItem('id')},httpOptions).subscribe(res=>{
     this.showLoader_wait=false

   this.cal_data=res
 this.eventSettings.dataSource= this.cal_data
 this.shine=1
})
}
}
checkRoom(id) 
    {
        if (this.check != undefined) {
            if (id == this.check.blocked_user_id) {
                Swal.fire({
                    text: "You blocked this person for Messaging  ",
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

        this.chatCheckerSetting(id);

        // this.sendSection = false;    

        var check = 0;
        for (var i = 0; i < this.list.length; ++i) {
            if (this.list[i].user_login_id == id) {
                check += 1;
            }
        }

        if (check == 0) {
            for (var i = 0; i < this.searchData.length; ++i) {
                if (this.searchData[i].user_login_id == id) {
                    this.list.push(this.searchData[i]);
                }
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
            // console.log(res);
            this.common = res;

           
            localStorage.setItem('chatId', id);
            this.room = res[0].room
            this.user.joinRoom(this.room)
        /*    this.tab1 = false;
            this.tab2 = true;*/
            this.id = localStorage.getItem('chatId')
            this.cc_id = localStorage.getItem('chatId');
            this.user.post("fetchchat", {
                room_id: this.room
            }).subscribe(res => {
                this.chat = res;
                this.markRead(id, this.room);
                this.chatAssembler();
            })
       this.user.post("get_user_name",{id:id}).subscribe(res=>{
           
           this.user_name=res[0].name
       })
        });

        this.searchData = [];
        this.scrollFunction();

    }


      chatCheckerSetting(anotherUserId) {
        var userWhoLogedinId = localStorage.getItem('id');
        const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}) }
        
        this.http.post(this.api_url_ + 'insert', {chat_id: anotherUserId, i: 0 }, httpOptions).subscribe(res => {
            this.common_res = res;
            this.user.post("fetchchat", {room_id: res[0].room }).subscribe(res => {
                var chat : any = res;
                if(this.common_res.length > 0)
                {
                    if(this.common_res[0].status == 1)
                    {
                        this.sendSection = true;
                        this.showPermission = false;
                        
                    }
                    else if(this.common_res[0].status == 2 || this.common_res[0].status == null )
                    {    
                        if(chat.length > 0 && this.common_res[0].chat_status == 0)
                        {

                            if(chat[0].message_from != localStorage.getItem('id') && this.common_res[0].status_by == 0)
                            {
                                this.permissionboxMsg = "";
                                this.showButton = true;
                                this.sendSection = false;
                                this.showPermission = true;
                            }else if(this.common_res[0].status_by != 0)
                            { 
                                          
                                this.user.post('getUserName', {id : this.common_res[0].status_by}).subscribe(res => {
                                    if(this.common_res[0].status_by == localStorage.getItem('id'))
                                    {
                                        this.permissionboxMsg = "You have decline, request for chat with demo user";
                                    }else{
                                        this.permissionboxMsg = "Demo user decline you'r request for chat";
                                    }
                                    this.showButton = false;
                                    this.sendSection = false;
                                    this.showPermission = true;
                                });

                            }else{
                                this.permissionboxMsg = "You have requested to "+this.user_name+" for chat, this message appears because you are not connected, so you both need to agree to start chat";
                                this.showButton = false;
                                this.sendSection = false;
                                this.showPermission = true;
                            }
                        }else{
                            this.showPermission = false;
                            
                            this.sendSection = true;
                        } 
                    }
                    else if(this.common_res[0].status == 3)
                    {
                        this.sendSection = false;
                        this.showPermission = false;
                        
                    }
                    else if(this.common_res[0].status == 4)
                    {
                        this.sendSection = false;
                        this.showPermission = false;
                        
                    }
                    else if(this.common_res[0].status == 5)
                    {
                        this.sendSection = false;
                        this.showPermission = false;
                        
                    }else{
                        if(chat.length > 0 && this.common_res[0].chat_status == 0)
                        {
                            
                            if(chat[0].message_from != localStorage.getItem('id'))
                            {
                                this.permissionboxMsg = "";
                                this.showButton = true;
                                this.sendSection = false;
                                this.showPermission = true;
                            }
                            else if(this.common_res[0].status_by != 0)
                            {

                                this.user.post('getUserName', {id : this.common_res[0].status_by}).subscribe(res => {
                                   
                                    if(this.common_res[0].status_by == localStorage.getItem('id'))
                                    {
                                        this.permissionboxMsg = "You have decline, request for chat with demo user";
                                    }else{
                                        this.permissionboxMsg = "Demo user decline you'r request for chat";
                                    }
                                    this.showButton = false;
                                    this.sendSection = false;
                                    this.showPermission = true;


                                });

                            }
                            else{
                                   
                                this.permissionboxMsg = "You have requested to "+this.user_name+" for chat, this message appears because you are not connected, so you both need to agree to start chat";
                                this.showButton = false;
                                this.sendSection = false;
                                this.showPermission = true;
                            }
                        }else{

                            this.sendSection = true;
                            this.showPermission = false;

                        } 
                    }
                }else{
                    this.sendSection = true;
                    this.showPermission = false;

                }
            })
        })
    }


    chatAssembler(){
        var old_date = 0;
        var finalAray : any = [];
        for (var i = 0; i < this.chat.length; ++i) {
            var date = new Date(this.chat[i].created_date).getFullYear()+(new Date(this.chat[i].created_date).getMonth()+1)+new Date(this.chat[i].created_date).getDate();
            if(old_date == 0)
            {
                var date12 = new Date().getFullYear()+(new Date().getMonth()+1)+new Date().getDate();
                old_date = new Date(this.chat[i].created_date).getFullYear()+(new Date(this.chat[i].created_date).getMonth()+1)+new Date(this.chat[i].created_date).getDate();
                
                if(date12 == old_date)
                {
                    finalAray.push({created_date : "Today" , id : '', cust : 1});
                }else if(date12 == (old_date+1))
                {
                    finalAray.push({created_date : "Yesterday" , id : '', cust : 1});
                }else{
                    finalAray.push({created_date : this.chat[i].created_date , id : '',cust : 0});
                }
               
            }else{
                if(date != old_date)
                {
                    var date12 = new Date().getFullYear()+(new Date().getMonth()+1)+new Date().getDate();

                    old_date = new Date(this.chat[i].created_date).getFullYear()+(new Date(this.chat[i].created_date).getMonth()+1)+new Date(this.chat[i].created_date).getDate();
                    if(date12 == old_date)
                    {
                        finalAray.push({created_date : "Today" , id : '', cust : 1});
                    }else if(date12 == (old_date+1))
                    {
                        finalAray.push({created_date : "Yesterday" , id : '', cust : 1});
                    }else{
                        finalAray.push({created_date : this.chat[i].created_date , id : '',cust : 0});
                    }
                    
                }
            }
            if(this.chat[i].media == '' || this.chat[i].media == undefined || this.chat[i].media == null)
            {

                if (this.chat[i].base64 == '' && this.chat[i].media_id != ''  && this.chat[i].media_id != 0) {
                    // console.log(i ,'ZAMANA ')
                    this.chat[i].type = 0;
                    this.chat[i].media = 0;

                    this.user.post('getmedia', {
                        id: this.chat[i].media_id,
                        i: i
                    }).subscribe(res => {
                        this.common = res;
                        if (this.common.length > 0) {
                            this.chat[res[0].i].media = this.server_name + 'src/assets/uploads/chatAttachments/' + res[0].name;
                            this.chat[res[0].i].type = res[0].file_type;
                            finalAray.push(this.chat[res[0].i]);
                            // console.log(res[0].i);
                        }
                    });

                } else if((this.chat[i].media_id == '' || this.chat[i].media_id == 0) && (this.chat[i].base64 == '' || this.chat[i].base64 == null || this.chat[i].base64 == undefined)){
                    this.chat[i].type = 0;
                    finalAray.push(this.chat[i]);
                    // console.log(i, "DEKHA");
                    
                }else{

                    this.chat[i].media = this.chat[i].base64
                    this.chat[i].type = 1;
                    finalAray.push(this.chat[i]);
                    // console.log(i,"SARA");
                    
                }
            }else{
                finalAray.push(this.chat[i]);
            }

        }
        // console.log(finalAray)
        this.newChat = finalAray;
        // console.log(this.newChat);
        this.scrollFunction();

    }

      scrollFunction() {
        setTimeout(function() {
            $('#data').animate({
                scrollTop: $('#data').prop("scrollHeight")
            }, 500);
        }, 100)
    }

     markRead(id, room_id) {
        this.user.post('markChatReadWhere', {
            id: id,
            room_id: room_id
        }).subscribe(res => {
            for (var i = 0; i < this.list.length; ++i) {
                if (this.list[i].user_login_id == id) {
                    this.list[i].count = 0;
                }
            }
        });
    }

        handleEmoji(e)  {
        this.messageForm.value.message +=  e.char;
        $('#message_type_textarea').val($('#message_type_textarea').val() + e.char);
        return false;
    }
     
    handleCharDelete(e)  {
        if (this.text.length >  0) {
            this.text =  this.text.substr(0,  this.text.length -  2);
        }
    }



 chatsearch(value) {
        if (value == '') {
            $('.searchBarContainer').hide();
            this.searchData = '';
        } else {
            $('.searchBarContainer').show();
            var newVal = $.trim(value);
            /*  this.data = JSON.stringify({
               string: newVal
              });*/
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }


            this.user.post("searchmessage", {
                string: newVal
            }).subscribe(res => {
                this.searchData = res;
            })
        }
    }


      permissionAction(type){
        this.user.post('alloweUser',{type : type, chatId : localStorage.getItem('chatId'), user_id : localStorage.getItem('id')}).subscribe(res => {
             
             this.chatCheckerSetting(localStorage.getItem('chatId'));
        });
    }

    // ===============================
    // Start media chat coding

    showToolBox() {
        document.getElementById('toolbox').classList.toggle('displayNone');
    }

    compressFile(obj) {

        this.imageCompress.uploadFile().then(({
            image,
            orientation
        }) => {
            var a = this.base64MimeType(image);
            if (a.split('/')[0] != 'image') {
                Swal.fire({
                    text: "This is not a image file",
                    type: "error"
                });
                return false;
            }

            this.imageCompress.compressFile(image, orientation, 50, 50).then(result => {
                this.imgResultAfterCompress = result;
            });

        });
        document.getElementById('toolbox').classList.toggle('displayNone');
        this.showAttach = false;
    }

    base64MimeType(encoded) {
        var result = null;

        if (typeof encoded !== 'string') {
            return result;
        }

        var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

        if (mime && mime.length) {
            result = mime[1];
        }

        return result;
    }

    showImg(url, type) {
        var load = this.showLoader;
        setTimeout(function(){
            Swal.fire({
                html: "<video controls autoplay style='width: 100%;'><source src='" + url + "'></video>",
                showConfirmButton : false,
                showCancelButton : true,
                cancelButtonText : 'Close',
            });
        },300)
    }

    removeAttach() {
        this.imgResultAfterCompress = '';
        this.imgResultBeforeCompress = '';
        this.files = [];
    }

    images(fileInput: any) {

        document.getElementById('toolbox').classList.add('displayNone');

        this.files = < Array < File >> fileInput.target.files;
        var type = this.files[0].type.split('/')[0];


        if (type != "video") {
            this.files = [];
            document.getElementById('toolbox').classList.add('displayNone');
            Swal.fire({
                text: "This is not a video file ",
                type: "error"
            });
            return false;
        }

        if (this.files[0].size > 2000000) {
            this.files = [];
            document.getElementById('toolbox').classList.add('displayNone');
            Swal.fire({
                text: "Please select video less than 2 mb",
                type: "error"
            });
            return false;
        }



        this.imgResultBeforeCompress = URL.createObjectURL(this.files[0])
    }

    other(fileInput: any) {

        document.getElementById('toolbox').classList.add('displayNone');
        this.files = < Array < File >> fileInput.target.files;
        var type = this.files[0].name.split('.');
        var ext = type[type.length - 1];
        if (ext != "doc" && ext != "zip" && ext != "docx" && ext != "pdf" && ext != "rar" && ext != "xls" && ext != "xlsx") {
            this.files = [];
            Swal.fire({
                text: "This is not a zip / document file ",
                type: "error"
            });
            return false;
        }

        if (this.files[0].size > 2000000) {
            this.files = [];
            Swal.fire({
                text: "Please select file less than 2 mb",
                type: "error"
            });
            return false;
        }

        this.imgResultBeforeCompress = URL.createObjectURL(this.files[0])
    }

 Message(event) {
        
        if(event != undefined)
        {
            if(event.key != 'Enter')
            {
                return false;
            }
        }
        
        $('#message_type_textarea').focus();
        document.getElementById('toolbox').classList.add('displayNone');

        this.messageForm.value.message = $('#message_type_textarea').val();
        var msg = this.messageForm.value.message;
        

        if ((msg == '' || msg == null) && this.files.length == 0 && (this.imgResultAfterCompress == undefined || this.imgResultAfterCompress == '')) {
            return false;
        }

        if (msg == '' || msg == null || msg == undefined) {
            msg = 'Media';
        }

        if (this.files != '') {
            const formData: any = new FormData();
            const files: Array < File > = this.files;
            formData.append("uploads[]", files[0], files[0]['name']);


            this.http.post(this.api + '/postAttach', formData).subscribe(res => {
                this.common = res;
                this.user.sendMessage({
                    msg: msg,
                    sender : localStorage.getItem('id'),
                    media: this.common.insertId,
                    id: localStorage.getItem('chatId'),
                    room: this.room
                });
            })
            this.files = [];
            this.imgResultBeforeCompress = '';
        } else if (this.imgResultAfterCompress != '') {
            this.user.sendMessage({
                msg: this.messageForm.value.message,
                id: localStorage.getItem('chatId'),
                    sender : localStorage.getItem('id'),

                media: this.imgResultAfterCompress,
                room: this.room
            });
            this.imgResultAfterCompress = ''
            this.files = [];
            this.showVideo = false;
        } else {

            this.user.sendMessage({
                msg: this.messageForm.value.message,
                    sender : localStorage.getItem('id'),

                id: localStorage.getItem('chatId'),
                media: 0,
                room: this.room
            });
        }

        this.messageForm.reset()
    }

     getList() {
        this.user.post("messagelist",{userid:localStorage.getItem('id')}).subscribe(res => {
            this.list = res;
            console.log("check",this.list)

            if (this.list != null) {
                for (var i = 0; i < this.list.length; ++i) {
                    const httpOptions = {
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json'
                        })
                    }
                    this.http.post(this.api_url_ + 'insert', {
                        chat_id: this.list[i].user_login_id,
                        i: i
                    }, httpOptions).subscribe(res => {
                        this.common = res;
                        var room = res[0].room;
                        
                        this.user.post('getchatRoom', {
                            roomid: room,
                            i: res[0].i
                        }).subscribe(res => {
                            var c : any;
                            c = res;
                            if (c.length > 0) {
                                this.list[res[0].i].count = res[0].unread_count;
                                this.list[res[0].i].message = res[0].message;
                                var date = new Date().getFullYear()+new Date().getMonth()+new Date().getDate();
                                var date1 = new Date(res[0].created_date).getFullYear()+new Date(res[0].created_date).getMonth()+new Date(res[0].created_date).getDate();
                                if(date == date1)
                                {
                                    this.list[res[0].i].time = res[0].created_date;
                                    this.list[res[0].i].timeType = 0;
                                }
                                else if(date == (date1+1))
                                {
                                    this.list[res[0].i].time = "Yesterday";
                                    this.list[res[0].i].timeType = 1;
                                }
                                else
                                {
                                    this.list[res[0].i].time = res[0].created_date;
                                    this.list[res[0].i].timeType = 2;
                                }
                            }
                        });

                        this.user.joinRoom(room);
                        
                    })
                }
            }
        })
    }

  


 onCloseClick(){

 var ab=document.getElementsByClassName('e-event-popup')[0] as HTMLElement
 if(ab != undefined){
  ab.style.display='none'
 }
   var abc=document.getElementsByClassName('e-quick-popup-wrapper e-device')[0] as HTMLElement
   if(abc != undefined){
  abc.style.display='none'
}
   var abcd=document.getElementsByClassName('e-quick-popup-wrapper e-popup-close e-device e-lib e-popup e-control')[0] as HTMLElement
  if(abcd != undefined){
 abcd.style.display='none'
}

     }
change_event(e){
             console.log("dev",this.remindme['_pendingValue'])
             if(this.remindme['_pendingValue'] == true){
     this.show_event_options=1
   }else{
     this.show_event_options=0
   }
}
onactionComplete(e){
  if(e != undefined && e.data != undefined){

     if(e.data['Subject'] == 'Add title'){
      Swal.fire({
                text: "Blank event can not be saved",
                 type: "error"
                  })
       return false;
     }else{
  var a=moment(e.data['StartTime']).format('L') + ' '  +this.time_value['_pendingValue']
     var mydata=[{}]
       mydata=e.data
       mydata['userid']=localStorage.getItem('id')
        mydata['StartTime']=moment(a).format('llll')
              mydata['remindme']=this.remindme_time['_pendingValue']
             if(mydata['remindme'] != ''){
           var remind_time=new Date(a).setHours(new Date(a).getHours() - mydata['remindme']);
              mydata['notification_date']=moment(new Date(remind_time)).format("YYYY-MM-DD"); 
        mydata['notification_time'] =moment(new Date(remind_time)).format("HH:mm:ss"); 
       }  

     var u="https://careerqualifyed.com/api/opportunity/my_calender_event_add"
  const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
   this.http.post(u,mydata,httpOptions).subscribe(res=>{
 this.shine=0
 if(res['status']==true){
      Swal.fire({
                text: "Event Added Successfully",
                 type: "success"
                  })
    }
   })
       }
  }

}
  remove_event_calender(e){
    console.log('remove_event_calender',e)
    this.showLoader_wait=true
    var u="https://careerqualifyed.com/api/opportunity/my_calender_event_remove"
  const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
   this.http.post(u,{id:e,userid:localStorage.getItem('id')},httpOptions).subscribe(res=>{
     this.showLoader_wait=false
    this.shine=0
    if(res['status']==true){
      Swal.fire({
                text: "Deleted Successfully",
                 type: "success"
                  })
    }
   })
  }

}
    

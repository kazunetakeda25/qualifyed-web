import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import {UserService} from '../user.service'
import * as myGlobals from '../global';
import Swal from 'sweetalert2';
import * as io from 'socket.io-client';
import {ElementRef,Renderer2,ViewChild} from '@angular/core';



@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
api=myGlobals.api_url;
finalnotification_data:any
api_url_ = myGlobals.api_url_;
url = this.api_url_;
media_url = myGlobals.media_url;
server_name=myGlobals.server_name
notification_data:any
final_notification=[]
 resData:any
public show:boolean = false;
 message:any
 notification_count:any
 earlier_notificationdata=[]
 myshow:number=0;
 viewier_status:any;
 lowerlimit:number=3;
 upperlimit:number=5;
 status:any
 currentCount:any
 final:any
 paginationresult_count:any
   showLoader = false;
   tab1=true;
   tab2=false;
   showSuggestion:any
   connection_count=[]
   connectionId:any
   show1:number=1
   
   totalSuggestionCount:any
   currentCountSuggestion:any
   currentCount1:number=0
   currentCountopp1:number=0

   myvar:any
   newfinal:any
   connectionnId:any
   connect:any
   connection:any
   connection_status1:any
   connection_status:any
   cancel_id:any
   skills:any
   suggestionOpportunity:any
   totaloppCount:any
   currentCountOpp:any
   newfinalopp:any
   opp:any
   renewfinalopp:any
   len:any
   skillscheck:any
   disableopp:any
   hide_conn_see_all : any;
   type:any;
   socket : any;
   hide_notification : any;
   check : any;
   read_status:any;
   read_length:any;
   accept_id:any;
   accept:any;
   decline_id:any;
   decline:any;
   mark_status:any;
   file_status=false;
    pic_path:any
    common:any
 constructor(private rd: Renderer2,private http:HttpClient,private fb:FormBuilder,private rt:Router,private user:UserService) { 
    this.socket = io(this.url);

 }

@ViewChild('someVar') el:ElementRef;
// ngAfterViewInit() {
//       ////////console.log("-----------------------",this.rd); 
//       this.el.nativeElement.focus();      //<<<=====same as oldest way
// }
  ngOnInit() {

        this.user.post("view_profile/getblock",{userid:localStorage.getItem('id')}).subscribe(res => {
            this.check = res[0]


        })
    // window.onclick = function(event) {
    //   var a = document.getElementsByClassName('dropdownController')
    //   for (var i = 0; i < a.length; ++i) {
    //     a[i].classList.add('displayNone');
    //   }
    // }
    this.socket.disconnect();
  //  document.body.scrollTop = document.documentElement.scrollTop = 0;
     this.type=localStorage.getItem('token')
    var element = document.getElementById("mainBody");
        element.classList.remove("has-main-navi--fully-opened");
        this.getRecentNotification()
        this.allNotificationCount()
        this.getEarlierNotification()
        this.getSuggestion();
        this.getSkills();
        this.Read_Status();
  }
 
getSkills(){
  this.user.post("getSkills",{userid:localStorage.getItem('id')}).subscribe(res=>{
    this.skillscheck=res
   if(this.skillscheck.length > 0)
   {

      this.skills=res[0].skills.split(",");
      this.user.post("notification/getOpportunities",{skill:this.skills,limit:"0,3"}).subscribe(res=>{
        this.suggestionOpportunity=res
        for (var i = 0; i < this.suggestionOpportunity.length; ++i) {
        this.user.fileExists1("src/assets/uploads/images/"+this.suggestionOpportunity[i].profile_pc,i).subscribe(res => {
                        this.suggestionOpportunity[res['data'].i].file_status=res['data'].status
                      })
        }
          this.currentCountOpp=this.suggestionOpportunity.length

      })
      this.user.post("notification/getOpportunitiesCount",{skill:this.skills}).subscribe(res1=>{
       this.opp=res1
       this.totaloppCount=this.opp.length
       //////console.log("hell..o",this.totaloppCount)
      })
    }
    })

}
 
  getSuggestion(){
    this.user.post("notification/getsuggestion",{limit:"0,3"}).subscribe(res=>{
      this.showSuggestion =res;
      this.currentCountSuggestion=this.showSuggestion.length
      this.hide_conn_see_all=this.currentCountSuggestion
      for (var i = 0; i < this.showSuggestion.length; ++i) {
        this.connectionId=this.showSuggestion[i].user_login_id
       this.user.post("notification/getconnectioncountting",{id:this.connectionId,i:i}).subscribe(res1=>{
 
           this.showSuggestion[res1[0].i].count=res1[0].total_connections

      this.user.fileExists1("src/assets/uploads/images/"+this.showSuggestion[res1[0].i].profile_pic,res1[0].i).subscribe(res => {
                        this.showSuggestion[res['data'].i].file_status=res['data'].status
                      })
             })

      }



      
     

      this.user.GET("notification/suggestioncounting").subscribe(res=>{
         this.myvar=res
        this.totalSuggestionCount=this.myvar.length
        ////////console.log("res",this.totalSuggestionCount)
      })
    })

  }
 
  
  getRecentNotification(){
     this.showLoader = true;
        this.user.post("notification/getnotification",{limit:"0,3"}).subscribe(res=>{
           this.showLoader = false;
                this.notification_data=res
                   for (var i = 0; i < this.notification_data.length; ++i) {
                     this.user.post("notification/getPic",{pic_id:(this.notification_data[i]).message.logo,i:i}).subscribe(res=>{
                       if(res != null){
                       this.notification_data[res[0].i].message.pic_name=res[0].pic_name
                       
                      this.user.fileExists1("src/assets/uploads/images/"+res[0].pic_name,res[0].i).subscribe(res => {
                        this.notification_data[res['data'].i].file_status=res['data'].status
                      })
                       }
                     })
                    
                   }
                })
  }
 
  
    getEarlierNotification(){
      this.showLoader = true;
      this.user.post("notification/getearliernotification",{limit:""+this.lowerlimit+","+this.upperlimit+""}).subscribe(res=>{
         this.showLoader = false;
         this.resData=res
            this.earlier_notificationdata= this.resData
            this.hide_notification=this.earlier_notificationdata.length
              for (var i = 0; i < this.earlier_notificationdata.length; ++i) {
                     //console.log((this.earlier_notificationdata[i]).message.logo)
                     this.user.post("notification/getPic",{pic_id:(this.earlier_notificationdata[i]).message.logo,i:i}).subscribe(res=>{
                       this.earlier_notificationdata[res[0].i].message.pic_name=res[0].pic_name
                        this.user.fileExists1("src/assets/uploads/images/"+res[0].pic_name,res[0].i).subscribe(res => {
                        this.earlier_notificationdata[res['data'].i].file_status=res['data'].status
                      })
                     })
                   }

      })
  }




  allNotificationCount(){
    this.user.allnotificationCount().subscribe(res=>{
      this.notification_count=res
    })
  }

  NotificationSeen(id){
    this.user.notificationSeen({id:id}).subscribe(res=>{
      //this.notification_count=res
      this.allNotificationCount()

    })
  }

showtoggle(value){
  ////////console.log("recent",value)
 var a = document.getElementsByClassName('dropdownController');
 for (var i = 0; i < a.length; ++i) {
   if(a[i].getAttribute('id') != "id_"+value)
   {
     a[i].classList.add('displayNone');
   }
 }
 document.getElementById("id_"+value).classList.toggle('displayNone');
}

close(value){
 document.getElementById("id_"+value).classList.add('displayNone');

}



showtoggle1(value){
  ////////console.log("earlier",value)
 var a = document.getElementsByClassName('dropdownController');
 for (var i = 0; i < a.length; ++i) {
   if(a[i].getAttribute('id') != "id_"+value)
   {
     a[i].classList.add('displayNone');
   }
 }
 document.getElementById("id_"+value).classList.toggle('displayNone');
}
hidetoggle(value){
this.myshow = 0
 
}

deleteNotification(value){
        Swal.fire({
    title: 'Are you sure?',
    text: 'You want to delete this notification?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
   this.user.post("notification/deletenotification",{id:value}).subscribe(res=>{
     this.status=res
               if(this.status.status == true){
                 Swal.fire({title:"Success",text:"Notification deleted succesfully",type:"success"})
                 this.getRecentNotification()
                 this.getEarlierNotification()
                   this.rt.navigateByUrl('/test', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["notification"]));
               }
               else{
                  Swal.fire({title:"failed",text:"Notification deletion failed",type:"error"})
               }
   })
    }

  })
 
}
SeeMore(){
  this.lowerlimit =this.lowerlimit+this.upperlimit
  ////////console.log(this.lowerlimit,this.upperlimit)
   this.user.post("notification/getearliernotification",{limit:""+this.lowerlimit+","+this.upperlimit+""}).subscribe(res=>{
                  this.final=res
                for (var j = 0; j < this.final.length; ++j) {

                     (this.earlier_notificationdata).push(this.final[j])
                   }

                    for (var i = 0; i < this.earlier_notificationdata.length; ++i) {
                     this.user.post("notification/getPic",{pic_id:(this.earlier_notificationdata[i]).message.logo,i:i}).subscribe(res=>{
                       this.earlier_notificationdata[res[0].i].message.pic_name=res[0].pic_name
                                     // console.log(this.earlier_notificationdata)

                    this.user.fileExists1("src/assets/uploads/images/"+res[0].pic_name,res[0].i).subscribe(res => {
                        this.earlier_notificationdata[res['data'].i].file_status=res['data'].status
                      })
                     })
                   }

                   
                         
   })
}

Connection(){
  this.tab1=true;
this.tab2=false;
this.show1=1
////////console.log("connection")
}

Opportunity(){
this.tab1=false;
this.tab2=true;
this.show1=2
}



    
////////console.log("Opportunity")
moreConnection(){
      if(this.totalSuggestionCount > 0)
      {
        this.totalSuggestionCount = this.totalSuggestionCount - 3;  
        this.currentCount1 += this.currentCountSuggestion;
        if(this.totalSuggestionCount < 0)
        {
          this.totalSuggestionCount = 0;  
        }

   this.user.post("notification/getsuggestion1",{ limit : ((this.currentCount1)+','+(this.totalSuggestionCount)).toString()}).subscribe(res=>{
     this.newfinal=res
    for (var i = 0; i < this.newfinal.length; ++i) {
        this.connectionnId=this.newfinal[i].user_login_id
       this.user.post("notification/getconnectioncountting",{id:this.connectionnId,i:i}).subscribe(res1=>{
 
   this.newfinal[res1[0].i].count=res1[0].total_connections
             })

      }
      for (var j = 0; j < this.newfinal.length; ++j) {
                    this.showSuggestion.push(this.newfinal[j]); 


                   }
                    for (var i = 0; i < this.showSuggestion.length; ++i) {

        this.user.fileExists1("src/assets/uploads/images/"+this.showSuggestion[i].profile_pic,i).subscribe(res => {
                        this.showSuggestion[res['data'].i].file_status=res['data'].status
                      })
        }

                           
   })
      }else{
        this.totalSuggestionCount = 0;
      }
      return false;
}
moreOpp(){


 if(this.totaloppCount > 0)
      {
        this.totaloppCount = this.totaloppCount - 3;  
        this.currentCountopp1 += this.currentCountOpp;
        if(this.totaloppCount < 0)
        {
          this.totaloppCount = 0;  
        }
   this.user.GET("getSkills1").subscribe(res=>{
           this.newfinalopp=res[0].skills.split(",");

 this.user.post("notification/getOpportunities1",{skill:this.skills,limit : ((this.currentCountopp1)+','+(this.totaloppCount)).toString()}).subscribe(res1=>{
    this.len=res1
 
      for (var j = 0; j < this.len.length; ++j) {
                    this.suggestionOpportunity.push(this.len[j]); 
                   }

                    for (var i = 0; i < this.suggestionOpportunity.length; ++i) {
        this.user.fileExists1("src/assets/uploads/images/"+this.suggestionOpportunity[i].profile_pc,i).subscribe(res => {
                        this.suggestionOpportunity[res['data'].i].file_status=res['data'].status
                      })
        }
             })

      
   })
      }
      else{
        this.totaloppCount = 0;
      }
      return false;
}
Request(value){


  this.connect = JSON.stringify({
            connection_id: value
        });
    const httpOptions = {
        headers: new HttpHeaders({
              'Content-Type': 'application/json'
        })
    }
    
 
   this.http.post(this.api+'/requestconnection',this.connect,httpOptions).subscribe(res=>{
         this.connection=res
     var id=value


    if(this.connection.status == true){
      for(var i = 0; i < this.showSuggestion.length; i++) {
                  if(this.showSuggestion[i].user_login_id == id ) {
                      this.showSuggestion.splice(i, 1);
                   }
              }
                    this.currentCountSuggestion=this.showSuggestion.length
              // console.log("skillsii Dev====d=ss>",this.showSuggestion)
                 }
                 this.getSuggestion()
     })

}
oportunity(value,id){
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
  this.user.sendRequest({id:value}).subscribe(res=>{
    this.disableopp=res
   // ////console.log("hello DEV res ",this.disableopp.status)
   if(this.disableopp.status == true){
var id = value;

for(var i = 0; i < this.suggestionOpportunity.length; i++) {
  ////console.log("a01",this.suggestionOpportunity[i].oportunity_id)
    if(this.suggestionOpportunity[i].oportunity_id == id) {
        this.suggestionOpportunity.splice(i, 1);
        
    }
}
                this.currentCountOpp=this.suggestionOpportunity.length

      ////console.log("skillsii Dev====d=ss>",this.suggestionOpportunity)
   }
   this.getSkills()

     // this.rt.navigateByUrl('/test', {skipLocationChange: true}).then(()=>
     //                      this.rt.navigate(["notification"]));
  })
}

hideNotification(type){
          Swal.fire({
    title: 'Are you sure?',
    text: 'You want to turn off receiving notification like this?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, turn off it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
   this.user.post("notification/hidenotification",{type:type}).subscribe(res=>{
     this.status=res
               if(this.status.status == true){
                 Swal.fire({title:"Success",text:"Notification turn off succesfully",type:"success"})
                 this.getRecentNotification()
                 this.getEarlierNotification()
                  this.rt.navigateByUrl('/test', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["notification"]));
               }
               else{
                  Swal.fire({title:"failed",text:"Notification turn off failed",type:"error"})
               }
   })
    }

  })
}

 notificationread(){
     this.user.GET("notification/readnoti").subscribe(res=>{
    this.rt.navigateByUrl('/test', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["notification"]));

     })
 }

 Read_Status(){
    this.user.GET("notification/getstatus").subscribe(res=>{
         this.read_status=res;
         if(this.read_status.length != undefined){

         this.read_length=this.read_status.length
         }
     })
 }

   Accept(value)
  {
this.showLoader = true;
   this.accept_id=JSON.stringify({
     id:value
   })

  const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
this.http.post(this.api+'/acceptrequest', this.accept_id,httpOptions ).subscribe(res=>{
  this.showLoader = false;
  this.accept=res
  if(this.accept.status == true){
    Swal.fire({text:"Success",title:"Now you are in connection",type:"success"})
    this.rt.navigateByUrl('/test', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["notification"]));
  }
  else{
  Swal.fire({text:"Error",type:"error"})
  }
        
      })
  }


    Decline(value){
  

                       Swal.fire({
    title: 'Are you sure?',
    text: 'You want to decline connection request ?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, decline it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
   this.decline_id=JSON.stringify({
     id:value
   })
  const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
          this.showLoader = true;
this.http.post(this.api+'/declinerequest', this.decline_id,httpOptions ).subscribe(res=>{
  this.showLoader = false;
  this.decline=res
          if(this.decline.status == true){
    this.rt.navigateByUrl('/test', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["notification"]));
  }
  else{
  Swal.fire({text:"Error",type:"error"})
  }
      })
}
})
  }

  Mark(value){
this.user.post("notification/markread",{id:value}).subscribe(res=>{
  this.mark_status=res;
  if(this.mark_status.status == true){

 Swal.fire({text:"Success",title:"Notification mark as read successfuly",type:"success"})
    this.rt.navigateByUrl('/test', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["notification"]));
  }
  else{
    Swal.fire({text:"Failed",title:"Notification marking failed",type:"error"})
  }
     })
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import $ from 'jquery';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { FormBuilder,  Validators } from '@angular/forms';
import * as myGlobals from '../global';
import {UserService} from '../user.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-opportunities-user',
  templateUrl: './opportunities-user.component.html',
  styleUrls: ['./opportunities-user.component.css']
})
export class OpportunitiesUserComponent implements OnInit {
oppurtunityForm:any
  api=myGlobals.api_url;
  media_url = myGlobals.media_url;
  data:any
  value:any
  month:any
  day:any
 public show:boolean = false;
 public buttonName:any = 'Show';
  server_name=myGlobals.server_name
  result:any
  showLoader=false;
  saved_status:any
  declineData:any
  tab1=true;
  tab2=false;
  common : any;
  tab3=false;
  tab4=false;
  submitted=false;
  saved:any
  savedopp:any
  saveoppcount:any
  request_status:any
  request:any
  applied_opp:any=[];
  reschedule_response:any
  applyiedoppcount:any
  interview:any
  rescheduleData:any
  interviewcount:any
  icount:any
  OpportunityDecline:any
  OpportunityAccept:any
  submitted1=false;
  cancel_status:any
  status:any
  current_date=new Date()
  minDate =  new Date();  

  constructor(public datepipe: DatePipe,private fb:FormBuilder,private http: HttpClient,private user:UserService,private rt:Router ) { }

  ngOnInit() {
    this.showLoader=true;

       document.body.scrollTop = document.documentElement.scrollTop = 0;
       var element = document.getElementById("mainBody");
        element.classList.remove("has-main-navi--fully-opened");

// element.onclick = function(){
// for (var i = 0; i < document.getElementsByClassName('ul_of_action').length; ++i) {
//     document.getElementsByClassName('ul_of_action')[i].classList.remove('showtab');
//   }
    

// }

  
  this.oppurtunityForm=this.fb.group({
    opportunity:[''],
    location:['']
  })
/*  this.http.get(this.api+"/opportunity/fetchstatus").subscribe(res=>{
   this.cancel_status=res;
})*/

this.user.post("opportunity/getinterviewcount",{userid:localStorage.getItem('id')}).subscribe(res=>{
  this.showLoader=false;
   this.interviewcount=res;
   this.interviewcount=this.interviewcount[0].count
})
this.http.get(this.api+"/opportunity/getappliedcount").subscribe(res=>{
  this.showLoader=false;
  this.applyiedoppcount=res;
  this.applyiedoppcount=this.applyiedoppcount[0].count
})
   this.OpportunityAccept = this.fb.group({
      reason:['',Validators.required],
      date_time : ['', [Validators.required]],
    })

    this.OpportunityDecline = this.fb.group({
      reason:['',Validators.required]
    })

  this.savedOpportunities();

  }


  get oppErrSubmit() { return this.OpportunityAccept.controls; }
  get decErrSubmit() { return this.OpportunityDecline.controls; }




  onSubmit(){
    this.tab4=true;
    this.tab1=false;
    this.tab2=false;
        this.tab3=false;
       

    if(this.oppurtunityForm.value.opportunity != '' && this.oppurtunityForm.value.opportunity != undefined && this.oppurtunityForm.value.opportunity != null)
    {
       this.showLoader=true;
      var location = this.oppurtunityForm.value.location;
      let re = /\,/gi;
      var newLoca = location.replace(re, ' ');
      var location_array = newLoca.split(' ');
      var newArray = [];
      var k = 0;
      for (var i = 0; i <= location_array.length; ++i) {
        if(location_array[i] != '' && location_array[i] != undefined && location_array[i] != null)
        {
          newArray.push(location_array[i]);
          k += 1 ;
        }
      }

            this.value={opp : this.oppurtunityForm.value.opportunity, location : newArray}
    this.user.userOpportinity(this.value).subscribe(res=>{
       this.showLoader=false;
      this.result=res
      for (var i = 0; i <= this.result.length-1; ++i) {
        
        this.data=this.result[i].id
             const url=this.api+"/opportunity/getsavedstatus";
                const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
        
        this.http.post(url,{id:this.data, cout : i},httpOptions).subscribe(res=>{
          this.saved=res
          this.result[this.saved[0].cout].saved_status = this.saved[0].saved_status
          // console.log(this.saved,this.saved[0].cout);
          //console.log('this.resultIF22',this.result);
        })
      }
      
    })
    }else{
      Swal.fire({title : "ERROR", text : "Please specify what type of job you are searching", type : "error"});
    }

  }

  saveOpportunity(id){
    
    this.user.savedOpportunity({id:id}).subscribe(res=>{
            this.saved_status=res
             Swal.fire({title:"Success",text : "Opportunity saved successfully", type : "success"})
      this.onSubmit();

    });
  }

    unsaveOpportunity(id){
    
    this.user.unsavedOpportunity({id:id}).subscribe(res=>{
            this.saved_status=res
            Swal.fire({title:"Success",text : "Opportunity unsaved successfully", type : "success"})
      this.onSubmit();
    });
  }


savedOpportunities(){
this.tab1=true;
this.tab2=false;
this.tab3=false;
this.tab4=false;
this.user.getsaveopp().subscribe(res=>{
  this.showLoader=false;
  this.savedopp=res
  if(this.savedopp == null || this.savedopp == undefined){
    this.saveoppcount=0
  }
  else{
    //console.log("saved opportunity is",this.savedopp)
  
    for (var i = 0; i < this.savedopp.length; ++i) {
      
      
      var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
       var dob = this.savedopp[i].last_date_for_apply
            var newd = new Date(dob);
            var year = newd.getFullYear();

            var month = newd.getMonth();
            var day = newd.getDate();
            var changedDate = new Date(Date.UTC(year, month, day));
             year = changedDate.getFullYear();
             this.month = ((changedDate.getMonth() + 1) < 10 ? '0' : '') + (changedDate.getMonth() + 1);
            this.day = (changedDate.getDate() < 10 ? '0' : '') + changedDate.getDate();

            var formatedDate = year + "-" + this.month + "-" + this.day;
            //console.log(new Date(year, month, day));
            //data[0].date = formatedDate
          var firstDate = new Date(formatedDate);
       var secondDate = new Date();

      var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
             this.savedopp[i].expiry_date=diffDays;
    }

    

  this.saveoppcount=this.savedopp.length
  }
  
  
})
}

appliedOpportunity(){
this.tab1=false;
this.tab2=true;
this.tab3=false;
this.tab4=false;
  this.showLoader=true;
this.user.getappliedopp().subscribe(res=>{
  this.common = res
  if(this.common.status != false)
  {
    this.applied_opp=res
  }
    
    this.showLoader=false;
    this.applyiedoppcount=this.applied_opp.length
})
}  

interviewRequest(){
this.tab1=false;
this.tab2=false;
this.tab3=true;
this.tab4=false;
this.showLoader=true;
this.user.getinterviewRequest({userid:localStorage.getItem('id')}).subscribe(res=>{
  this.showLoader=false;
  this.interview=res;
  this.interviewcount=this.interview.length
  for (var i = 0; i < this.interview.length; ++i) {
    this.interview[i].interview_datetime=this.datepipe.transform(this.interview[i].interview_datetime, 'MMM d, y, h: mm a')
  }
  
})
}

applyopp(id){
  this.showLoader=true;
  this.user.sendRequest({id:id}).subscribe(res=>{
      this.showLoader=false;
    this.request=res
     Swal.fire({title:"Success",text : "Interview request sent successfully", type : "success"})
        this.savedOpportunities()      
  })

}

Accept(id){
    this.showLoader=true;
  this.user.acceptinterviewRequest({id:id}).subscribe(res=>{
      this.showLoader=false;
       Swal.fire({title:"Accepted",text : "Interview request Accepted successfully", type : "success"}) 
       this.interviewRequest() 
  })
}

/*Accept1(id){
  
  this.user.acceptinterviewRequest1({id:id}).subscribe(res=>{
       Swal.fire({title:"Accepted",text : "Interview request Accepted successfully", type : "success"}) 
       this.interviewRequest() 
  })
}*/

showFunction(j)
{
  
  document.getElementById('tab_'+j).classList.toggle('displayNone');
  
  // for (var i = 0; i < document.getElementsByClassName('ul_of_action').length; ++i) {
  //   document.getElementsByClassName('ul_of_action')[i].classList.remove('showtab');
  // }

  // document.getElementById('tab_'+j).classList.toggle('showtab');
  //       
}

close_show_function(j){
  document.getElementById('tab_'+j).classList.add('displayNone');
}

Decline(id){

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
Swal.fire({title : "Success",html : "Interview declined successfully", type : "success"});
                  this.interviewRequest()
 
          })

}


Reschedule(id){

      this.rescheduleData = {
      id : id
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

  window.onclick = function(event){
    if (event.target == user_pop_listing) {
        user_pop_listing.style.visibility = "hidden";
        user_pop_listing.style.top = "-100%";
        user_pop_listing.style.height = "0";
    }
  }
  return false;
}

acceptOppSubmit(){
 this.showLoader = true;
    this.submitted = true;

    if (this.OpportunityAccept.invalid) {
      Swal.fire({title : "ERROR",html : "Please enter all required fields", type : "error"});
      return;
    }
    this.rescheduleData.date_time = this.OpportunityAccept.value;

       this.user.RescheduleinterviewRequest(this.rescheduleData).subscribe(res=>{
         this.showLoader=false;
                 this.reschedule_response=res;
                  Swal.fire({title : "Success",html : " Rescheduled request sent successfully", type : "success"});
                  this.interviewRequest() 
          })
  
}
 toggle() {
  this.show = !this.show;

  // CHANGE THE NAME OF THE BUTTON.
  if (this.show)
   this.buttonName = "Hide";
  else
   this.buttonName = "Show";
 }

 Sendfollowup(title,id){
     this.showLoader=true;
   this.user.post("opportunity/sendfollowup",{title:title,connection_id:id}).subscribe(res=>{
       this.showLoader=false;
       this.status=res
       if(this.status.status == true){
         Swal.fire({text:"Success",title:"follow up sent succesfully",type:"success"})
       }
       else{
            Swal.fire({text:"failed",title:"follow up sending failed",type:"error"})
       }
   })
 }

 appliedNotification(title,id){
   this.showLoader=true;
   this.user.post("opportunity/appliednotification",{title:title,connection_id:id}).subscribe(res=>{
       this.showLoader=false;
       this.status=res
   })

 }

 interviewacceptnotification(id){
   console.log(id)
   this.user.post("opportunity/interviewacceptnotification",{connection_id:id}).subscribe(res=>{
       this.showLoader=false;
       this.status=res
   })
 }


    interviewdeclinenotification(id){
                 this.showLoader=true;
     this.user.post("opportunity/interviewdeclinenotification",{connection_id:id}).subscribe(res=>{
             this.showLoader=false;
     })
    }

    interviewresschedulenotification(id){
                  this.showLoader=true;
     this.user.post("opportunity/interviewreschdulenotification",{connection_id:id}).subscribe(res=>{
             this.showLoader=false;
     })
    }

}

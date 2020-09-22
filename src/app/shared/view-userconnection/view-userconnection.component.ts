import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import {UserService} from './../../user.service'
import * as myGlobals from './../../global';
import Swal from 'sweetalert2';

@Component({
   selector: 'app-view-userconnection',
  templateUrl: './view-userconnection.component.html',
  styleUrls: ['./view-userconnection.component.css']
})
export class ViewUserconnectionComponent implements OnInit {
 connection_count:any
 pagination_count:any
 currentCount:any
 server_name=myGlobals.server_name;
 api=myGlobals.api_url;
 data:any
 showLoader = false;
 file_status = false;
 finalArray:any
 resData=[]
 searchText:any;
 result_count:any
 paginationresult_count:any
 accept_id:any
 accept:any
 decline_id:any
 block_status:any
 decline:any
 finalConnections:any
     chat: any
    cc_id : any = 0;
       api_url_ = myGlobals.api_url_;
       media_url = myGlobals.media_url;
  constructor(private http:HttpClient,private fb:FormBuilder,private rt:Router,private user:UserService) { }

  ngOnInit() {
    this.showLoader = true;
  	  document.body.scrollTop = document.documentElement.scrollTop = 0;
  	 if( localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "1")
  	 {
           this.rt.navigate(['shared/viewuserconnection']);
            
     }
     this.paginationresult_count=0
           this.http.get(this.api+'/resultcount').subscribe(res=>{
             this.showLoader = false;
                  this.result_count=res[0].result_connections;
                   this.paginationresult_count=res[0].result_connections-5;
                 this.currentCount=0;
             })

              this.pagination_count=0
          this.user.ShowConnection('0,5').subscribe(res=>{
            this.showLoader = false;
                          this.resData=res; 
                          for (var i = 0; i < this.resData.length; ++i) {
          this.user.fileExists1("src/assets/uploads/images/"+this.resData[i].profile_pic,i).subscribe(res => {
                        this.resData[res['data'].i].file_status=res['data'].status
                      })
                        }
            })

           this.user.post('getconnectioncount',{userid:localStorage.getItem('id'),usertype:localStorage.getItem('token')}).subscribe(res=>{
             this.showLoader = false;
                  this.connection_count=res[0].total_connections;
                  this.pagination_count=res[0].total_connections-10;
                 this.currentCount=0;
             })


            this.user.connectionData('0,10').subscribe(res=>{
              this.showLoader = false;
         this.finalConnections=res;
         for (var i = 0; i < this.finalConnections.length; ++i) {
          this.user.fileExists1("src/assets/uploads/images/"+this.finalConnections[i].logo,i).subscribe(res => {
                        this.finalConnections[res['data'].i].file_status=res['data'].status
                      })
         }


   })
   }

       loadMore1()
    {

      if(this.paginationresult_count > 0)
      {
        this.paginationresult_count = this.paginationresult_count - 5;  
        this.currentCount += 5;
        if(this.paginationresult_count < 0)
        {
          this.paginationresult_count = 0;  
        }

   this.user.ShowConnection(((this.currentCount)+','+(5)).toString()).subscribe(res=>{
                for (var j = 0; j < res.length; ++j) {
                    (this.resData).push(res[j]); 
                   }
                    for (var i = 0; i < this.resData.length; ++i) {
          this.user.fileExists1("src/assets/uploads/images/"+this.resData[i].profile_pic,i).subscribe(res => {
                        this.resData[res['data'].i].file_status=res['data'].status
                      })
                        }
   })


      }else{
        this.pagination_count = 0;
      }
      return false;
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
    this.rt.navigateByUrl('/shared/contact-us', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["shared/viewuserconnection"]));
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
    this.rt.navigateByUrl('/shared/contact-us', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["shared/viewuserconnection"]));
  }
  else{
  Swal.fire({text:"Error",type:"error"})
  }
      })
}
})
  }


       loadMore()
    {

      if(this.pagination_count > 0)
      {
        this.pagination_count = this.pagination_count - 2;  
        this.currentCount += 2;
        if(this.pagination_count < 0)
        {
          this.pagination_count = 0;  
        }

   this.user.connectionData(((this.currentCount)+','+(10)).toString()).subscribe(res=>{
                for (var j = 0; j < res.length; ++j) {
                    (this.finalConnections).push(res[j]); 
                   }
                   for (var i = 0; i < this.finalConnections.length; ++i) {
          this.user.fileExists1("src/assets/uploads/images/"+this.finalConnections[i].logo,i).subscribe(res => {
                        this.finalConnections[res['data'].i].file_status=res['data'].status
                      })
         }
   })


      }else{
        this.pagination_count = 0;
      }
      return false;
    }

Block(user_id,name){
    
                         Swal.fire({
    title: 'Are you sure?',
    text: 'You want to block '+name+' ?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, block it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
this.showLoader=true;
            this.user.post("block",{user_login_id:user_id}).subscribe(res=>{
                    this.showLoader=false;
                    this.block_status=res
          if(this.block_status.status == true){
            Swal.fire({text:"SUCCESS",title:"User blocked succesfully",type:"success"})
                     this.rt.navigateByUrl('/shared/contact-us', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["shared/viewuserconnection"]));
          }
  else{
  Swal.fire({text:"Error",type:"error"})
  }

            })
    }
})
}

 checkRoom(id) {
        this.chat = [];
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.cc_id = 0;
        this.http.post(this.api_url_+'insert', {
            chat_id: id
        }, httpOptions).subscribe(res => {
          this.rt.navigate(['shared/messages'])
        })
    }

}


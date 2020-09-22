import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import * as myGlobals from '../global';
import * as $ from 'jquery';


@Component({
  selector: 'app-user-profileview',
  templateUrl: './user-profileview.component.html',
  styleUrls: ['./user-profileview.component.css']
})
export class UserProfileviewComponent implements OnInit {
  api=myGlobals.api_url;
  media_url = myGlobals.media_url;
   data:any
   postdata:any
   server_name=myGlobals.server_name
   comment:any
   commentForm:any
   commentdata:any
   connect:any
   connection:any
   connection_status=false
   follow_status=false
   pending_status=false
   cancel_id:any
   cancel:any
   getconnection:any
   unfollow_id:any
   
  constructor(private http:HttpClient,private fb:FormBuilder,private rt:Router) { }
     showToggle(id)
  {
        $("."+id).toggle();
  }

  ngOnInit(value='') {
document.body.scrollTop = document.documentElement.scrollTop = 0;
/*    if( localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "1"){
     //this.rt.navigate(['view_profile/:data']);
          }*/
              const httpOptions = {
        headers: new HttpHeaders({
              'Content-Type': 'application/json'
        })
    }
    var url2 = window.location.href;
    var server_array=url2.split('/');
    var id = server_array[server_array.length-1];
    
    this.http.post(this.api+'/getconnection',{id:id},httpOptions).subscribe(res=>{
     this.getconnection=res

     if(this.getconnection[0].status == 1){
      this.follow_status=true
     }
      else if(this.getconnection[0].status == 2){
      this.pending_status=true
     }
      else if(this.getconnection[0].status == 3){
      this.connection_status=true
     }

    })


  	
  	 const url=this.api+"/view_profile"
   this.http.post(url, {id : id}, httpOptions).subscribe(res =>{
   	this.data=res

     
   this.postdata=JSON.parse(this.data[0].postData)
   });

this.http.get(this.api+'/getcomment').subscribe(res=>{
        this.comment=res

       
})

    this.commentForm=this.fb.group({
  comment:['']
})

    
   if(value != '')
 {
  setTimeout(function(){$("."+value).show();},200);
 }


  }


  Comment(value){
  
  const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.commentdata=this.commentForm.value;
        this.commentdata.id=value

  this.http.post(this.api+'/comment',this.commentdata,httpOptions).subscribe(res=>{
    this.commentForm.reset()
    //this.ngOnInit(value)
})
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
        /* if(this.connection.status == true){
           this.connection_status=this.connection.status
         }
         else if(this.connection.status == false){
           this.connection_status=this.connection.status
         }*/
         this.rt.navigateByUrl('/test', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["view_userprofile/"+value]));
        this.ngOnInit()

   })

}

cancelRequest(value){

  
  this.cancel_id = JSON.stringify({
            connection_id: value
        });
    const httpOptions = {
        headers: new HttpHeaders({
              'Content-Type': 'application/json'
        })
    }
    

 
   this.http.post(this.api+'/cancel',this.cancel_id,httpOptions).subscribe(res=>{
      this.rt.navigateByUrl('/test', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["view_userprofile/"+value]));
     this.ngOnInit()
        

   })

}

unfollowRequest(value){
  
  this.unfollow_id = JSON.stringify({
            connection_id: value
        });
    const httpOptions = {
        headers: new HttpHeaders({
              'Content-Type': 'application/json'
        })
    }
    

 
   this.http.post(this.api+'/unfollow',this.unfollow_id,httpOptions).subscribe(res=>{
      this.rt.navigateByUrl('/test', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["view_userprofile/"+value]));
     this.ngOnInit()
         /*this.cancel=res
        this.pending_status=this.cancel.status*/

   })

}

}
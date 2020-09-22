import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import * as myGlobals from './../../global';
import * as $ from 'jquery';
import {UserService} from './../../user.service';
import {User1Service} from './../../user1.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-search-opportunities',
  templateUrl: './search-opportunities.component.html',
  styleUrls: ['./search-opportunities.component.css']
})
export class SearchOpportunitiesComponent implements OnInit {
id:any
server_name=myGlobals.server_name;
media_url = myGlobals.media_url;
data:any
type:any
saved_status:any
check:any
status=0;
description : any;
prefreces : any;
about:any
pic_path : any;
title : any;
city : any;
state_name : any;
country_name : any;
idnew : any;
user_id : any;
element_id : any;
user_login_id : any;
login_id:any
Address_Line:any
showLoader=false;
request:number=0
status1:number=0
file_status:boolean=false

  constructor(private http:HttpClient,private fb:FormBuilder,private rt:Router,private user:UserService,private user1:User1Service) { }

  ngOnInit() {
  	this.type=localStorage.getItem('token')
      this.login_id = localStorage.getItem("id");

  var url2 = window.location.href;
    var server_array=url2.split('/');
     this.id = server_array[server_array.length-1];
     this.user.post("opportunity/getopportunitydetail",{id:this.id}).subscribe(res=>{
       this.data=res;
       console.log("res",res)
       this.pic_path = this.data[0].pic_path;
       this.title = this.data[0].title;
       this.city = this.data[0].city;
       this.Address_Line = this.data[0].Address_Line;
       this.state_name = this.data[0].state_name;
       this.country_name = this.data[0].country_name;
       this.idnew = this.data[0].id;
       this.user_id = this.data[0].user_id;
       this.element_id = this.data[0].element_id;
       this.user_login_id = this.data[0].user_login_id;
       this.description = this.data[0].description;
        this.prefreces = this.data[0].prefrences;
        this.about = '<p>'+this.data[0].about_us+'</p>';

         this.user.fileExists("src/assets/uploads/images/"+this.data[0].pic_path).subscribe(res => {
                     this.file_status=res['status']
                      })
       
     })
     this.user.post("opportunity/getsavedopportunity1",{id:this.id}).subscribe(res=>{
       this.check=res
        console.log("res",res)
       if(this.check == ''){
         this.status=0;
       }
       else{
         this.status=this.check[0].saved_status
        console.log("res",this.status)
       }
       
         })
     this.user.post("opportunity/get_apply_opp_status",{id:this.id,userid:this.login_id}).subscribe(res=>{
       this.check=res
       if(this.check == ''){
         this.status1=0;
       }
       else{
         if(this.check != null){
           
         this.status1=this.check[0].request_status
         }
       }
       
         })
  }


    saveOpportunity(id){
      this.showLoader=true;
      this.user.savedOpportunity({id:id}).subscribe(res=>{
        this.showLoader=false;
        this.saved_status=res
        if (this.saved_status.status == true) {
          Swal.fire({title:"Success",text : "Opportunity saved successfully", type : "success"})
          this.rt.navigateByUrl('/shared/contact-us', {skipLocationChange: true}).then(()=>
this.rt.navigate(['shared/opportunities_detail/'+id])); 
        }
      });
  }
apply_opp(id){
   this.showLoader=true;
  this.user.sendRequest({id:id}).subscribe(res=>{
      this.showLoader=false;
    this.request=1

     Swal.fire({title:"Success",text : "Interview request sent successfully", type : "success"})
        //this.savedOpportunities()      
  })
}
appliedNotification(title,id){
   this.showLoader=true;
   this.user.post("opportunity/appliednotification",{title:title,connection_id:id, userid : localStorage.getItem('id'), opp_id : this.id}).subscribe(res=>{
       this.showLoader=false;
       this.status1=1
   })

 }
}

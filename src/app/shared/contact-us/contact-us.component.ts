import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import * as myGlobals from './../../global';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import {UserService } from './../../user.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
contact:any;
submitted:any;
   userapi=myGlobals.userapi_url;
      api=myGlobals.api_url;

reason:any;
about:any
setEmail:any
set_disable:number=0
showLoader=false
  constructor(private user: UserService,private rt:Router,private fb:FormBuilder,private http: HttpClient) { }

  ngOnInit() {
    localStorage.removeItem('current_stage');
        localStorage.removeItem('incomplete_id');
        localStorage.removeItem('register_id');
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    var element = document.getElementById("mainBody");
        element.classList.remove("has-main-navi--fully-opened");
        if( localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "1"){
     this.rt.navigate(['shared/contact-us']);
          }
          else if(localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "2"){
           this.rt.navigate(['shared/contact-us']); 
          }


  	this.contact=this.fb.group({
    
       fromemail:['',[Validators.required, Validators.email,Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/)]],
    reason: ['',Validators.required],
    about: ['', Validators.required],
    }),
     this.http.get(this.userapi+"/reason").subscribe(res=>{
      this.reason=res;
      })
      this.user.GET("get_email").subscribe(res=>{
          this.setEmail=res
                if(this.setEmail != null){
                  
                  this.set_disable=1
                 this.contact.patchValue({
               
                fromemail: this.setEmail[0].email,
            });
                }
       })


  }
   get f() { return this.contact.controls; }

onSubmitContact() {
this.submitted = true;
if (this.contact.invalid) {
                    Swal.fire({text:"Please enter the required field",type:"warning"})

            return;
        }
   const httpOptions = {
   	headers : new HttpHeaders({
   		'Content-Type' : 'application/json'
   	})
   }
     this.showLoader=true

this.http.post(this.userapi + "/contactus",this.contact.value,httpOptions).subscribe(res => {
	 this.about=res
                    if(this.about.status==true){
                      const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
                      // console.log("value",this.contact.value)
                      this.user.post("get_contact_data",{id:this.contact.value.reason}).subscribe(res=>{
                        // console.log(res)
                        this.contact.value.reason=res[0].reason
                      
   this.http.post(this.api+"/sendcontactmail",this.contact.value,httpOptions).subscribe(res=>{
      
                       this.rt.navigateByUrl('/shared/user-agreement', {skipLocationChange: true}).then(()=>
            this.rt.navigate(["shared/contact-us"]));
    })
   })
                           Swal.fire({text:"Message sent successfully",type:"success"})
                    }
                    else{
                      this.rt.navigateByUrl('/shared/user-agreement', {skipLocationChange: true}).then(()=>
            this.rt.navigate(["contact-us"]));
                      Swal.fire({text:" Message sent Failed",type:"warning"})
                    }
                  
  this.showLoader=false     
})
}
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import * as myGlobals from '../../global';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import {UserService } from '../../user.service';

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
  constructor(private user: UserService,private rt:Router,private fb:FormBuilder,private http: HttpClient) { }

  ngOnInit() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    var element = document.getElementById("mainBody");
        element.classList.remove("has-main-navi--fully-opened");
        if( localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "1"){
     this.rt.navigate(['contact-us']);
          }
          else if(localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "2"){
           this.rt.navigate(['contact-us']); 
          }


  	this.contact=this.fb.group({
    
       fromemail:['',[Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    reason: ['',Validators.required],
    about: ['', Validators.required],
    }),
     this.http.get(this.userapi+"/reason").subscribe(res=>{
      this.reason=res;
      })
      this.user.GET("get_email").subscribe(res=>{
          this.setEmail=res
                if(this.setEmail != null)
                  this.set_disable=1
                 this.contact.patchValue({
               
                fromemail: this.setEmail[0].email,
            });
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
this.http.post(this.userapi + "/contactus",this.contact.value,httpOptions).subscribe(res => {
	 this.about=res
                    if(this.about.status==true){
                      const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
   this.http.post(this.api+"/sendcontactmail",this.contact.value,httpOptions).subscribe(res=>{
      
                       this.rt.navigateByUrl('/test', {skipLocationChange: true}).then(()=>
            this.rt.navigate(["contact-us"]));
    })
                           Swal.fire({text:"Message sent successfully",type:"success"})
                    }
                    else{
                      this.rt.navigateByUrl('/test', {skipLocationChange: true}).then(()=>
            this.rt.navigate(["contact-us"]));
                      Swal.fire({text:" Message sent Failed",type:"warning"})
                    }
                  
       
})
}
}

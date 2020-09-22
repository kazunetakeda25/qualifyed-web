// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-forgot',
//   templateUrl: './forgot.component.html',
//   styleUrls: ['./forgot.component.css']
// })
// export class ForgotComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder ,Validators } from '@angular/forms';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { UserService } from './../../user.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router'


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
forgotForm:any
submitted=false
data:any
 showLoader = false;
  constructor(private fb:FormBuilder,private http:HttpClient,private user:UserService,private rt:Router) { }

  ngOnInit() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
      if( localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "1"){
     this.rt.navigate(['bussinessprofile']);
          }
          else if(localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "2"){
           this.rt.navigate(['user-profile']); 
          }

  	this.forgotForm=this.fb.group({
  		     email:['',[Validators.required, Validators.email]]
  	})
  }
  get f() { return this.forgotForm.controls; }

  onSubmit(){
   console.log(this.forgotForm.value)
     this.submitted = true;
      this.showLoader = false;
        // stop here if form is invalid
        if (this.forgotForm.invalid) {
          Swal.fire({text:"Please enter email",type: "warning"})
            return;
           
        }
  
 this.showLoader = true;
    this.user.forgotMail(this.forgotForm.value).subscribe(res=>{
      console.log("res",res)
      this.data=res
      this.showLoader = false;
      console.log("data",this.data);
      if(this.data == undefined || this.data == '' || this.data.length <= 1){
      
       Swal.fire({text:"Email Address Not Found",type: "error"});
      }
      else if(this.data[0].status == 3)
      {
       Swal.fire({text:"Email Address Not Found",type: "error"});
      }
      else if(this.data[0].status == 0){
       
       Swal.fire({text:"your accound is deactivated",type: "warning"})

      }
      else{
        Swal.fire({text:"Email sent succesfully, please check your email",type: "success"})
        this.rt.navigate(['shared/resetpassword'])
      }

    })
  }

}
 
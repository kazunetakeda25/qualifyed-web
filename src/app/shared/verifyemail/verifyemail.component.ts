// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-verifyemail',
//   templateUrl: './verifyemail.component.html',
//   styleUrls: ['./verifyemail.component.css']
// })
// export class VerifyemailComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder ,Validators } from '@angular/forms';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { UserService } from './../../user.service';
import {Router} from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.css']
})
export class VerifyemailComponent implements OnInit {
verifyForm:any
data:any
submitted = false;
 showLoader :any = false;
click=false;
value:any

response:any
  constructor(private fb:FormBuilder,private http:HttpClient,private user:UserService,private rt:Router) { }

  ngOnInit() {
document.body.scrollTop = document.documentElement.scrollTop = 0;
      if( localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "1"){
     this.rt.navigate(['bussiness']);
          }
          else if(localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "2"){
           this.rt.navigate(['user']); 
          }

  		this.verifyForm=this.fb.group({
             
  		     email:['',[Validators.required,Validators.email]],
  		     otp:['',Validators.required],
  		     
  	})
     
}
 
get f() {
        return this.verifyForm.controls;
    }

onSubmit(){
   if(this.click){

       if (this.verifyForm.invalid) {
        this.showLoader=false;
          Swal.fire({text:"Please enter required field",type: "warning"})
            return;
           
        }
         //console.log(this.verifyForm.value);
         this.showLoader=true;
this.user.verifyEmail(this.verifyForm.value).subscribe(res=>{
  this.data=res;
  this.showLoader=false;
         if(this.data.status==undefined){
           Swal.fire({text:"Your OTP Is Incorrect",type: "warning"})
           this.verifyForm.reset()
         }
         else if(this.data.status==true){
           Swal.fire({text:"Account Verified Successfully",type: "success"})
           this.rt.navigate([''])
         }
         else if(this.data.status==false){

             Swal.fire({text:"Your Code Expired ",type: "warning"})
             this.verifyForm.reset()
         }
})

   } 
   else{
     //console.log("hi")
     if (this.verifyForm.value.email == '' || this.verifyForm.value.email == undefined) {
        this.showLoader=false;
          Swal.fire({text:"Please enter the email",type: "warning"})
            return;
           
        }
          Swal.fire({
    title: 'Are you sure?',
    text: 'You want to resend otp ?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, send it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {

          this.showLoader = true;


           

       const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
         this.user.resendOtp(this.verifyForm.value).subscribe(res=> {
           this.response=res
           //console.log(this.response)
     this.showLoader = false;
     if(this.response.status == false){
        Swal.fire({text:"Please enter the correct email",type:"error"})
     }
     else if(this.response[0].status == 0){
       Swal.fire({text:"Your account is deactivated,please contact to admin ",type:"error"})
     }
     else if(this.response[0].status == 1){
       Swal.fire({html:"Your account is verified,if you forgot your password <a routerLink="+'/forgot'+">click here to reset your password</a> ",type:"error"})
     }
     else if(this.response[0].status == 2){
        this.user.resendOtp1(this.verifyForm.value).subscribe(res=> {

        this.value=res
        if(this.value.status == false){
          Swal.fire({text:"Please enter the correct email",type:"error"})
        }
        else if(this.value.status == true){
           Swal.fire({text:"Otp sent  Succesfully,please check your mail",type:"success"})
        }

       

      })
     }


               
         
                

            

        })
    } 
  })
   }


	
  	     


}
public Verify():void{
this.click=true;
}

public resendOtp():void{
this.click=false;
}

/*resendOtp(){
  console.log("hi")
    if (this.verifyForm.email.invalid) {
        this.showLoader=false;
          Swal.fire({text:"Please enter the email",type: "warning"})
            return;
           
        }

     Swal.fire({
    title: 'Are you sure?',
    text: 'You want to resend otp ?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, send it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {

          this.showLoader = true;


           

       const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
         this.user.resendOtp().subscribe(res=> {
     this.showLoader = false;

               
          Swal.fire({text:"Otp sent  Succesfully,please check your mail",type:"success"})
                

            

        })
    } 
  })

}*/

}

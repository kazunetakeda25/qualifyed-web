// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-resetpasswordone',
//   templateUrl: './resetpasswordone.component.html',
//   styleUrls: ['./resetpasswordone.component.css']
// })
// export class ResetpasswordoneComponent implements OnInit {

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
   selector: 'app-resetpasswordone',
  templateUrl: './resetpasswordone.component.html',
  styleUrls: ['./resetpasswordone.component.css']
})
export class ResetpasswordoneComponent implements OnInit {
submitted=false;
codeForm:any
id:any
showLoader=false;
  constructor(private fb:FormBuilder,private http:HttpClient,private user:UserService,private rt:Router) { }

  ngOnInit() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
      if( localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "1"){
     this.rt.navigate(['bussinessprofile']);
          }
          else if(localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "2"){
           this.rt.navigate(['user-profile']); 
          }

  	this.codeForm=this.fb.group({
  	code:['',[Validators.maxLength(6)]]
     })
  }

get f() {
        return this.codeForm.controls;
    }


onSubmit(){
     this.submitted = true;

        // stop here if form is invalid
        if (this.codeForm.invalid) {
          this.showLoader=false;
          Swal.fire({text:"Please enter required field",type: "warning"})
            return;
           
        }
    this.showLoader=true;
    this.user.resetPassword(this.codeForm.value).subscribe(res=>{
       this.showLoader=false;
         this.id=res;
       if(this.id[0] == undefined){
         Swal.fire({text:"Invalid Code",type: "warning"})
     }
     else if(this.id.status == false){
                Swal.fire({text:" Your Code is expire",type: "warning"})
     }
     else{
       this.rt.navigate(['shared/resetpasswordd']);
     }
    })
    

  }
}

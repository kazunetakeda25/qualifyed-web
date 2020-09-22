import { Component, OnInit } from '@angular/core';
import { FormBuilder ,Validators } from '@angular/forms';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { UserService } from '../user.service';
import {Router} from '@angular/router'
import Swal from 'sweetalert2';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
resetForm:any
submitted=false
id:any
showLoader = false;

data:any
  constructor(private fb:FormBuilder,private http:HttpClient,private user:UserService,private rt:Router) { }

  ngOnInit() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
      if( localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "1"){
     this.rt.navigate(['bussinessprofile']);
          }
          else if(localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "2"){
           this.rt.navigate(['user-profile']); 
          }
   
  	this.resetForm=this.fb.group({
              id:[''],
  		     password:['',[Validators.required,Validators.minLength(6)]],
  		     cpassword:['',Validators.required],
  		     
  	},
    {
        validator: MustMatch('password','cpassword')
        
 
})
     this.id=this.user.id
     this.resetForm.setValue({
       id:this.id[0].id,
       password:[''],
           cpassword:[''],
     })
  }
  get f() {
        return this.resetForm.controls;
    }
  onSubmit(){
     this.submitted = true;

        // stop here if form is invalid
        if (this.resetForm.invalid) {
          this.showLoader = false;
          Swal.fire({text:"Please enter required field",type: "warning"})
            return;
           
        }

    this.user.resetPassword1(this.resetForm.value).subscribe(res=>{
      this.data=res;
      this.showLoader = false;
        if(this.data.status == false){
          Swal.fire({text:"Error in changing password",type: "warning"})
        }
        else if(this.data.status == true) {
           Swal.fire({text:"Password change succesfully",type: "success"})
           this.rt.navigate([''])
        }
   })

  }

}

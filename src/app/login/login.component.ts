import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService1 } from '../auth.service';
import { UserService } from '../user.service';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import Swal from 'sweetalert2';
import $ from "jquery";
// import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import * as myGlobals from '../global';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    google: any;
    loginForm: any;
    data: any
    checkstatus: any
    submitted = false
    loginstatus: any
    api = myGlobals.api_url;
    commin: any;
    check_email_exist: any;
    locationRes: any = {};
    location:any
    // socialuser: SocialUser
    constructor(

        private fb: FormBuilder, private http: HttpClient, private rt: Router, private auth: AuthService1, private user: UserService) {}

    ngOnInit() {

        this.http.get('https://ipinfo.io').subscribe(res => {
          this.commin = res;
           this.location= this.commin.loc.split(",")
            this.locationRes = {
                lat: this.location[0],
                long: this.location[1],
                ip: this.commin.ip,
                address: this.commin.city + " " + this.commin.region + " " + this.commin.country,
                isp: this.commin.org //internet service provider
            }
        });

        document.body.scrollTop = document.documentElement.scrollTop = 0;


        if (localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "1") {
            this.rt.navigate(['bussinessprofile']);
        } else if (localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "2") {
            this.rt.navigate(['user-profile']);
        }

        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }


    get f() {
        return this.loginForm.controls;
    }

    onLogin() {
        if (navigator.geolocation) {
            navigator.geolocation;
        }
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            Swal.fire({
                text: "Please enter email and password",
                type: "warning"
            })
            return;
            // console.log(this.loginForm.value)
        }

      this.user.post("get_email",{email:this.loginForm.value.email}).subscribe(res=>{
          this.check_email_exist=res
          if(this.check_email_exist.length == 0){
               Swal.fire({
                    text: "User Not Found",
                    type: "warning"
                });
               return ;
          }
          else{
               this.user.getLoginDetails(this.loginForm.value).subscribe(res => {
            this.data = res;

            if (this.data[0] == undefined) {

                Swal.fire({
                    text: "Email or Password is Incorrect",
                    type: "warning"
                });
            } else if (this.checkstatus == true) {
                this.rt.navigate(['bussinessprofile'])
            } else if ((this.data[0].type == '1' || this.data[0].type == '2') && this.data[0].status == '0') {
                Swal.fire({
                    text: "Your account is deactivated,please contact to admin",
                    type: "warning"
                })
            } else if ((this.data[0].type == '1' || this.data[0].type == '2') && this.data[0].status == '2') {
                Swal.fire({
                    text: "Please verify your account",
                    type: "warning"
                })
            }

            if (this.data[0].two_factor_auth == 1) {

                this.user.generateSendOtp(this.data[0].email).subscribe(res => {
                    function modalFun(datas, auth, rt,lc,user) {
                        Swal.fire({
                            title: 'Please enter otp, send to your email',
                            input: 'text',
                            inputAttributes: {
                                autocapitalize: 'off',
                                maxLength: '6'
                            },
                            // html: "<p>Not recived <b>OTP</b> , click <a (click)='regenrate' href=''>here</a> to resend it.<p>",
                            showCancelButton: false,
                            confirmButtonText: 'SUBMIT',
                            showLoaderOnConfirm: true,
                        }).then((result) => {
                            if (result.dismiss) {
                                modalFun(datas, auth, rt,lc,user);
                                return false;

                            }
                            if (result.value) {

                                if (result.value == res['hash']) {
                                    lc.userid = datas[0].id;

                                    user.post('setLocation', lc).subscribe(res => {

                                    });
                                    if (datas[0].type == '2' && datas[0].status == '1') {

                                        localStorage.setItem('isLoggedIn', "true");
                                        localStorage.setItem('token', datas[0].type);
                                        localStorage.setItem('id', datas[0].id);
                                        localStorage.setItem('ip', lc.ip);
                                        if (auth.isLoggedIn()) {
                                            if (localStorage.getItem('token') == '2') {
                                                rt.navigate(['user-profile']);
                                            }
                                        }
                                    } else if (datas[0].type == '1' && datas[0].status == '1') {

                                        localStorage.setItem('isLoggedIn', "true");
                                        localStorage.setItem('token', datas[0].type);
                                        localStorage.setItem('id', datas[0].id);
                                        localStorage.setItem('name', datas[0].name);
                                        localStorage.setItem('ip', lc.ip);

                                        if (auth.isLoggedIn()) {
                                            if (localStorage.getItem('token') == '1') {
                                                rt.navigate(['bussinessprofile']);
                                            }
                                        }
                                    } else {
                                        rt.navigate([''])
                                    }
                                } else {
                                    Swal.fire({
                                        text: "Incorrect otp, please try again",
                                        type: "error"
                                    });
                                    modalFun(datas, auth, rt,lc,user);
                                }
                            }


                        })
                    }

                    modalFun(this.data, this.auth, this.rt, this.locationRes,this.user);
                });
                return false;
            } else {
                this.locationRes.userid = this.data[0].id;
                this.user.post('setLocation', this.locationRes).subscribe(res => {

                });

                if (this.data[0].type == '2' && this.data[0].status == '1') {

                    localStorage.setItem('isLoggedIn', "true");
                    localStorage.setItem('token', this.data[0].type);
                    localStorage.setItem('id', this.data[0].id);
                    localStorage.setItem('name', this.data[0].name);
                    localStorage.setItem('ip', this.locationRes.ip);
                    if (this.auth.isLoggedIn()) {
                        if (localStorage.getItem('token') == '2') {
                            this.rt.navigate(['user-profile']);
                        }
                    }
                } else if (this.data[0].type == '1' && this.data[0].status == '1') {

                    localStorage.setItem('isLoggedIn', "true");
                    localStorage.setItem('token', this.data[0].type);
                    localStorage.setItem('id', this.data[0].id);
                    localStorage.setItem('name', this.data[0].name);
                    localStorage.setItem('ip', this.locationRes.ip);

                    if (this.auth.isLoggedIn()) {
                        if (localStorage.getItem('token') == '1') {
                            this.rt.navigate(['bussinessprofile']);
                        }
                    }
                } else {
                    this.rt.navigate([''])
                }
            }




        });
          }
      })
       
    }
show_password(){
    var x = <HTMLInputElement>document.getElementById("passwordField");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

}


// import { AuthService } from 'angularx-social-login';
// import { SocialUser } from 'angularx-social-login';
// import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';

// this.authService.authState.subscribe((socialuser) => {
//      this.socialuser = socialuser;
//    });


//  signInWithGoogle(): void {
//    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData)=>
//    {
//      alert(JSON.stringify(userData));
//    })
//  }
// signInWithFB(): void {
//    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData)=>
//     {
//       alert("userData")
//     }

//      )

//  }

//  signInWithLinkedIn(): void {
//    this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID).then((userData)=>
//    {
//      alert(JSON.stringify(userData));
//    })
//  }

//  signOut(): void {
//    this.authService.signOut();
//  }
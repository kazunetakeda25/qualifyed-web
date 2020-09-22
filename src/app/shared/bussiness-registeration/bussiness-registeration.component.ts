import { Component, OnInit } from '@angular/core';
import { UserService } from './../../user.service';
import {FormGroup , FormControl ,FormBuilder,Validators} from '@angular/forms';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router'
import { MustMatch } from '../must-match.validator';
import * as myGlobals from './../../global';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import Swal from 'sweetalert2'
import $ from 'jquery';
import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
      selector: 'app-bussiness-registeration',
  templateUrl: './bussiness-registeration.component.html',
  styleUrls: ['./bussiness-registeration.component.css']
})
export class BussinessRegisterationComponent implements OnInit {
    bussinessRegister: FormGroup
    data: any
    mail: any
    submitted = false;
    urlError : any = '';
    country: any
    city: any
    id: any
    image: any
    csize: any
    ctype: any
    lat : any = 0;
    lon : any = 0;
    work: any
    files: Array < File > = [];
    files1: Array < File > = [];
    api = myGlobals.api_url
    attachmentList: any
    imgpath: any
    urlChecker : any = true;
    videopath: any
    data1: any
    videores: any
    work_pref_count: any
    showLoader = false;
    minDate = new Date(new Date().getFullYear() - 116, new Date().getMonth(), new Date().getDate());
    maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    verify: any
    filesToUpload: Array < File > = [];
    filesToUpload1: Array < File > = [];
    imageChangedEvent: any = '';
    croppedImage: any = '';
    setdefault: any = '';
    hi:any
crop_image_status:number=0
disable_upload:number=0
    upload_set_default:number=0
   //reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
   //reg='(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*/?)'
reg='/^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/'




    constructor(private fb: FormBuilder, private http: HttpClient, private user: UserService, private rt: Router) {

    }

    ngOnInit() {

        this.http.get('https://ipinfo.io').subscribe(res => {
          var common : any
          common = res;
          var location = common.loc;
          var location_array = location.split(',');
          this.lat = location_array[0];
          this.lon = location_array[1];


        })

        localStorage.removeItem('current_stage');
        localStorage.removeItem('incomplete_id');
        localStorage.removeItem('register_id');
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.work_pref_count = 0
        $('#chooseFile').bind('change', function() {
            var filename = $("#chooseFile").val();
            if (/^\s*$/.test(filename)) {
                $(".file-upload").removeClass('active');
                $("#noFile").text("No file chosen...");
            } else {
                $(".file-upload").addClass('active');
                $("#noFile").text(filename.replace("C:\\fakepath\\", ""));
            }
        });

        $('#chooseFile1').bind('change', function() {
            var filename = $("#chooseFile1").val();
            if (/^\s*$/.test(filename)) {
                $(".file-upload").removeClass('active');
                $("#noFile1").text("No file chosen...");
            } else {
                $(".file-upload").addClass('active');
                $("#noFile1").text(filename.replace("C:\\fakepath\\", ""));
            }
        });

        $('.chooseFile').bind('change', function() {
            var filename = $(".chooseFile").val();
            if (/^\s*$/.test(filename)) {
                $(".fileup").removeClass('active');
                $(".nofile").text("No file chosen...");
            } else {
                $(".fileup").addClass('active');
                $(".nofile").text(filename.replace("C:\\fakepath\\", ""));
            }
        });

        if (localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "1") {
            this.rt.navigate(['bussiness']);
        } else if (localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "2") {
            this.rt.navigate(['user']);
        }




        this.http.get(this.api + "/country").subscribe(res => {
            this.country = res;
            this.bussinessRegister.controls['country'].setValue(231, {onlySelf: true});
            this.State(231)
        })

        this.http.get(this.api + "/companysize").subscribe(res => {
            this.csize = res;
        })

        this.http.get(this.api + "/companytype").subscribe(res => {
            this.ctype = res;
        })

        this.http.get(this.api + "/workindustry").subscribe(res => {
            this.work = res;
        })

        this.bussinessRegister = this.fb.group({


                bussinessname: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
                address1: ['', [Validators.required, Validators.maxLength(100)]],
                address2: ['', Validators.maxLength(100)],
                phone: ['', [Validators.required,Validators.maxLength(15),Validators.minLength(5)]],
                country: ['', Validators.required],
                state: ['', Validators.required],
                city: ['', [Validators.required,Validators.maxLength(50)]],
                zipcode: ['', [Validators.required,Validators.maxLength(10)]],
                email: ['', [Validators.required, Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/)]],
                work: ['', Validators.required],
                description: ['', [Validators.required, Validators.maxLength(500)]],
                image: ['',[Validators.maxLength(100)]],
                website: [''],
                companysize: [''],
                location: ['',Validators.maxLength(50)],
                companytype: [''],
                date: [''],
                password: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(50)]],
                cpassword: ['', [Validators.required]]
            }, {
                validator: MustMatch('password', 'cpassword')
            }

        )

    }

    myemailobj = {};
    myemailfun(w) {
        this.myemailobj = JSON.stringify({
            email_name: w
        });
        this.user.emailCheck1(this.myemailobj).subscribe(res => {
            this.mail = res;
            if (this.mail[0] == undefined) {} else if (this.mail[0].email == w) {
                Swal.fire({
                    text: "Email Address Already Registered",
                    type: "warning",
                })
            }
        })
    }

    keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;

        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    get f() {
        return this.bussinessRegister.controls;
    }



    onClick() {

        this.submitted = true;

        // stop here if form is invalid
        if (this.bussinessRegister.invalid || this.urlChecker == false) {


          this.showLoader = false;
              if(this.urlChecker == false)
              {
                  this.urlError = "Please enter correct url";
              }else{
                  this.urlError = '';
              }
            Swal.fire({
                text: "Please enter the required field",
                type: "warning"
            })
            return;
        }
  this.bussinessRegister.value.email=this.bussinessRegister.value.email.toLowerCase()
    if(this.filesToUpload1.length != 0){
 if(this.filesToUpload1[0].size >= 20000000){
   this.showLoader = false;
    Swal.fire({text:"Please select a video less than 20MB",type:"error"})
    return false;
  }}
        this.showLoader = true;
        this.user.emailCheck(this.bussinessRegister.value).subscribe(res => {
            this.mail = res;
            if (this.mail[0] == undefined) {
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                }
                this.http.post(this.api + "/sendmail", this.bussinessRegister.value, httpOptions).subscribe(res => {

                    this.verify = res
                    if (this.verify.status == false) {
                        this.showLoader = false;
                        Swal.fire({
                            text: "Please Enter Correct Email",
                            type: "error"
                        })
                    } else if (this.verify.status == true) {
                        this.bussinessRegister.value.hash = this.verify.data
                        this.bussinessRegister.value.lat = this.lat;
                        this.bussinessRegister.value.lon = this.lon;
                        this.user.bussinessRegistration(this.bussinessRegister.value).subscribe(res => {

                            this.data = res;
                            
                            const formData: any = new FormData();
                            const files: Array < File > = this.filesToUpload;

                            for (let i = 0; i < files.length; i++) {
                                formData.append("uploads[]", files[i], files[i]['name']);
                            }
                                     var image_name= document.getElementById("noFile").innerHTML
                                  if(this.setdefault != ''){
                                  var image_size=this.setdefault.file.size
                                  }
                              
                            this.http.post(this.api + '/upload/' + this.data, {imag:this.croppedImage,image_name:image_name,image_size:image_size})
                                .subscribe(res => {
                                    this.data1 = res
       
                                  
  
                                    const formData: any = new FormData();
                                    const files: Array < File > = this.filesToUpload1;

                                    for (let i = 0; i < files.length; i++) {
                                        formData.append("uploads[]", files[i], files[i]['name']);
                                    }
                                    this.http.post(this.api + '/video/' + this.data, formData)
                                        .subscribe(res => {

                                            this.videores = res
                                             this.showLoader = false;
                                            Swal.fire({
                                                text: "Registration successfull, please verify your email",
                                                type: "success"
                                            })

                                            this.bussinessRegister.reset()
                                            this.rt.navigate(['shared/verifyemail']);


                                        })


                                })

                        })
                    }

                })

            } else if (this.mail[0].email == this.bussinessRegister.value.email) {
        this.showLoader = false;

                Swal.fire({
                    text: "Email Address Already Registered",
                    type: "warning",
                })
            }
        })
    }
    State(value) {
        this.id = JSON.stringify({
            country_id: value
        });

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.api + "/city", this.id, httpOptions).subscribe(res => {
            this.city = res;

        })
    }


    images(fileInput: any) {
        this.files = < Array < File >> fileInput.target.files;
       var array = this.files[0].name.split('.');
    if(array[array.length-1] != 'png' && array[array.length-1] != 'jpg' && array[array.length-1] != 'jpeg' && array[array.length-1] != 'gif')
    {
      this.showLoader = false;
      Swal.fire({text:"This file type not allowed, please upload png, jpeg, jpg, gif",type:"error"});
      return false;
    }
    else{
        this.crop_image_status=1;
        this.upload_set_default=1
                  this.imageChangedEvent = event;
        this.filesToUpload = < Array < File >> fileInput.target.files;
    }
        


        //this.product.photo = fileInput.target.files[0]['name'];
    }
     imageCropped(event: ImageCroppedEvent) {

        this.setdefault=event
        this.croppedImage = event.base64;
        console.log("base64",this.setdefault)
    }
    public closeModalFunction(): void {
          this.crop_image_status=0
        this.imageChangedEvent=''
        this.croppedImage =''
        this.disable_upload=1
        this.filesToUpload=[]
       $('#postModal').hide()
        document.body.style.overflow = "initial";

    } 
    public closeModalFunction_save(): void {
          this.crop_image_status=0
        this.imageChangedEvent=''
        this.disable_upload=1
        this.filesToUpload=[]
       $('#postModal').hide()
        document.body.style.overflow = "initial";

    }
    video(fileInput: any) {
        this.files1 = < Array < File >> fileInput.target.files;
        this.filesToUpload1 = < Array < File >> fileInput.target.files;
    //     var array = this.files1[0].name.split('.');
    //  if (array[array.length - 1] != 'mp4' && array[array.length - 1] != 'mkv' && array[array.length - 1] != 'avi' && array[array.length - 1] != 'mov') {
    //             this.showLoader = false;
    //             Swal.fire({
    //                 text: "This file type not allowed, please upload mp4, mkv, avi, mov",
    //                 type: "error"
    //             });
    //             return false;
    //         }
    // else{
    // }
      
    }




    work_pref(ev, value) {
        if (value.length < 500 || ev.key == 'Backspace') {
            if (ev.key == 'Backspace') {
                if (this.work_pref_count > 0) {
                    this.work_pref_count = this.work_pref_count - 1;
                }
            } else {
                this.work_pref_count = value.length + 1;
            }
        } else {
            return false;
        }
    }

    work_pref_change(ev, value) {
        this.work_pref_count = value.length;
    }

  isUrlValid() {

    var userInput = this.bussinessRegister.value.website;
    this.hi=userInput
    this.urlChecker = true;
    console.log("ddd",userInput)
    if(userInput != ''){
    console.log("in if")


    var res = userInput.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);
   console.log("hieete",res)
    if(res == null && userInput != '')
    {
        this.urlChecker = false;    
        this.urlError = "Please enter correct url";
        // Swal.fire({text:"please enter correct url",type:"error"})
        return false;
    }else{
        this.urlError = "";
        this.urlChecker = true;
    }
    }
}

open_div(){

        var x = document.getElementById("postModal");
        if (x.style.display === "block") {
            x.style.display = "none";
            document.body.style.overflow = "auto";
        } else {
            x.style.display = "block";
        }
}
show_password(event){
    if(event.getAttribute('class') == 'fa fa-eye-slash')
    {
         event.setAttribute('class', 'fa fa-eye');   
    }else{
        event.setAttribute('class', 'fa fa-eye-slash');
    }
    var x = <HTMLInputElement>document.getElementById("passwordField");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
      return true;
}
show_password2(event){
    if(event.getAttribute('class') == 'fa fa-eye-slash')
    {
         event.setAttribute('class', 'fa fa-eye');   
    }else{
        event.setAttribute('class', 'fa fa-eye-slash');
    }
    var x = <HTMLInputElement>document.getElementById("passwordField2");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
  return true;
}
}


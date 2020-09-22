import { Component, OnInit } from '@angular/core';
import {FormGroup , FormControl ,FormBuilder,Validators} from '@angular/forms';
import { UserService } from './../../user.service';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import {Router,ActivatedRoute} from '@angular/router';
import { MustMatch } from '../../shared/must-match.validator';
import * as myGlobals from './../../global';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import * as $ from 'jquery';
import {MatDatepickerModule,MatNativeDateModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS} from '../../date.adapter';
@Component({
  selector: 'app-edit-bussinessprofile',
  templateUrl: './edit-bussinessprofile.component.html',
  styleUrls: ['./edit-bussinessprofile.component.css'],
})
export class EditBussinessprofileComponent implements OnInit {
  country: any
    city: any
    id: any
    image: any
    csize: any
    showLoader = false;
    urlChecker : any = true;
    urlError:any;
    ctype: any
    work: any
    api = myGlobals.api_url
    media_url = myGlobals.media_url;
    aboutForm:any
    informationForm:any
    passwordForm:any
    data:any
    citys:any
    ids:any
    about:any
    info:any
    pass:any
    submitted3=false;
    submitted=false;
    submitted1=false;
    isSpecial : any;
        submitted5=false;
        work_pref_count:any
     minDate = new Date(new Date().getFullYear()-116, new Date().getMonth() , new Date().getDate());
    maxDate =  new Date(new Date().getFullYear(), new Date().getMonth() , new Date().getDate()); 
    deleteimg:any
    vid:any
    server_name=myGlobals.server_name
    deletevideo:any
   filesToUpload: Array < File > = [];
    filesToUpload1: Array < File > = [];
    videores:any
    data1:any
    status:any
    result:any
    txtDate:any
    Data:any
    length:any
    deactivate_status:any
    file_status=false;
    common:any;
    pic_path:any;
    imageChangedEvent: any = '';
    croppedImage: any = '';
    setdefault: any = '';
    login_id:any;
usertype_token:any;
crop_image_status:number=0
    upload_set_default:number=0
check_image:any
    reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
   constructor(private fb: FormBuilder, private http: HttpClient, private user: UserService, private rt: Router,private route:ActivatedRoute) {
         this.user.editData({userid:this.login_id,usertype:this.usertype_token}).subscribe(res=>{
      this.data=res;
      this.pic_path="uploads/images/" + this.data[0].profile_pic_name
      this.check_image=this.data[0].profile_pic_name
     // console.log(this.check_image);
      this.Check_picture();
      this.ngOnInit()
    })

    }


  ngOnInit() {
     $(window).scroll(function() {
            if(scrollDistance >= 150)
            {
                $('.infoContent').addClass('settingPageUp');
            }else{
                $('.infoContent').removeClass('settingPageUp');
            }
            var scrollDistance = $(window).scrollTop();
            $('.editProfile-form').each(function(i) {
                if ($(this).position().top <= scrollDistance) {
                    $('.txtBlue').removeClass('active');
                    $('.txtBlue').eq(i).addClass('active');
                }
            });
        }).scroll();
       this.login_id=localStorage.getItem("id");
   this.usertype_token=localStorage.getItem("token");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this. work_pref_count=0

  
  if( localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "1"){
     this.rt.navigate(['bussiness/edit-bussinessprofile']);
          }
          else if(localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "2"){
           this.rt.navigate(['user/edit-profile']); 
          }


         

        this.http.get(this.api + "/companysize").subscribe(res => {
            this.csize = res;
        })

       
        this.http.get(this.api + "/workindustry").subscribe(res => {
            this.work = res;
        })

                 this.user.editData({userid:this.login_id,usertype:this.usertype_token}).subscribe(res=>{
                    this.data=res;
                    console.log('res',res)
                     this.pic_path="uploads/images/" + this.data[0].profile_pic_name
      this.check_image=this.data[0].profile_pic_name
     // console.log(this.check_image);
      this.Check_picture();
                     this.work_pref_count = this.data[0].description.length;
        this.aboutForm.patchValue({
          bussinessname:this.data[0].name,
          addressline1:this.data[0].addressline1,
          addressline2:this.data[0].addressline2,
          phone:this.data[0].phone,
          country:this.data[0].country_id,
          state:this.data[0].state_id,
          city:this.data[0].city,
          zipcode:this.data[0].zipcode,
          email:this.data[0].email,
          work:this.data[0].work,
          bio:this.data[0].description
        })
       
        this.informationForm.setValue({
          website:this.data[0].website,
          // companytype:this.data[0].companytype,
          companysize:this.data[0].companysize,
          location:this.data[0].location,
          date:this.data[0].date
        })
 
             /* this.length= (this.data[0].bio).length
              console.log("length is",(this.length).length)*/
            })
                  this.http.get(this.api + "/country").subscribe(res => {
            this.country = res;
            this.aboutForm.controls['country'].setValue(this.data[0].country_id, {onlySelf: true});
            this.informationForm.controls['companytype'].setValue(this.data[0].companytype, {onlySelf: true});
            this.State(this.data[0].country_id)

             this.http.get(this.api + "/companytype").subscribe(res => {
            this.ctype = res;
        })

        })
      

        this.aboutForm=this.fb.group({
          bussinessname:['',[Validators.required,Validators.maxLength(50),Validators.minLength(3)]],
          addressline1:['',[Validators.required,Validators.maxLength(100)]],
          addressline2:['',Validators.maxLength(100)],
          phone: ['', [Validators.required,Validators.maxLength(15),Validators.minLength(5)]],
          country:['',Validators.required],
          state:['',Validators.required],
          city:['',Validators.required],
          zipcode:['',Validators.required],
          email:['',[Validators.required,Validators.email]],
          work:['',Validators.required],
          bio:['',[Validators.required,Validators.maxLength(500)]]
        })


         

        this.informationForm=this.fb.group({
          website:['',Validators.maxLength(100)],
          companytype:[''],
          companysize:[''],
          location:[''],
          date:['']
        })


        this.passwordForm=this.fb.group({
          oldpassword:['',[Validators.required]],
          newpassword:['',[Validators.required,Validators.minLength(6)]],
          cpassword:['',[Validators.required]]
        },

        {
                validator: MustMatch('newpassword', 'cpassword')
            }
        )
       
  
        //this.data=(this.user.data);
/*
           this.ids = JSON.stringify({
            country_id: this.data[0].country_id
        });

             const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
           this.http.post(this.api + "/citys", this.ids, httpOptions).subscribe(res => {
            this.citys = res;

        })*/

         
        
  }

    // get g() {
    //   return this.aboutForm.controls

    // }
    
     get g() { return this.aboutForm.controls; }

    get k() {
        return this.informationForm.controls;
    }

    get f() {
        return this.passwordForm.controls;
    }

  



  aboutSubmit(){
        this.submitted1 = true;

        // stop here if form is invalid
        if (this.aboutForm.invalid) {
 this.showLoader = false;
            Swal.fire({
                text: "please enter the required field",
                type: "warning"
            })
            return;
        }

          this.showLoader = true;
    

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.api + "/updateabout", this.aboutForm.value, httpOptions).subscribe(res =>{
                    this.about=res
                     this.showLoader = false;
                    if(this.about.status==true){
                      this.rt.navigateByUrl('/shared/contact-us', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["bussiness/edit-bussinessprofile"]));
                           Swal.fire({text:"About Bussiness Updated Successfully",type:"success"})
                    }
                    else{
                      Swal.fire({text:" Updation Failed",type:"warning"})
                    }
        })

  }
  informationSubmit(){
      if (this.urlChecker == false) {


          this.showLoader = false;
              if(this.urlChecker == false)
              {
                Swal.fire({title:"please enter the correct url",type:"error"})
                  this.urlError = "Please enter correct url";
              }else{
                  this.urlError = '';
              }
            return;
        }
   // console.log("new date is",new Date(new Date().getFullYear(), new Date().getMonth() , new Date().getDate()); )
  this.result= this.informationForm.value.date
     //var dateParts = this.result.split("/");
/* var dateObject = new Date(dateParts [2], dateParts [1] - 1, dateParts [0]);
 this.txtDate=moment(dateObject ).format('MM/DD/YYYY');
     console.log("date is",this.txtDate)
          this.showLoader = true;*/

   const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.api + "/updateinfo", this.informationForm.value, httpOptions).subscribe(res => {
            this.showLoader = false;
                         this.info=res
                            if(this.info.status==true){
                              this.rt.navigateByUrl('/shared/contact-us', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["bussiness/edit-bussinessprofile"]));
                           Swal.fire({text:"Additional Information Updated Successfully",type:"success"})
                    }
                     else{
                      Swal.fire({text:" Updation Failed",type:"warning"})
                    }
        })

  }
  passwordSubmit(){
       this.submitted = true;

        // stop here if form is invalid
        if (this.passwordForm.invalid) {
           this.showLoader = false;
            Swal.fire({
                text: "please enter the required field",
                type: "warning"
            })
            return;
        }

        if(this.passwordForm.oldpassword == this.passwordForm.newpassword){
            Swal.fire({
              title:"ERROR",
                text: "Old password and New password cannot be same",
                type: "error"
            })
            return;
        }

    const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
            this.http.post(this.api + "/updatepass", this.passwordForm.value, httpOptions).subscribe(res => {
            this.showLoader = false;
                         this.pass=res
                         if(this.pass.status == false){
                             Swal.fire({text:"Check your old password ",type:"error"})
                         }
                            else if(this.pass.status==true){
                           Swal.fire({text:"Password Updated Successfully",type:"success"})
                    }
                     else{
                      Swal.fire({text:"Password Updation Failed",type:"warning"})
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
            this.citys = res;

        })
    }

  //   onPicture(){

  //                Swal.fire({
  //   title: 'Are you sure?',
  //   text: 'You want to delete your image ?',
  //   type: 'warning',
  //   showCancelButton: true,
  //   confirmButtonText: 'Yes, delete it!',
  //   cancelButtonText: 'No, keep it'
  // }).then((result) => {
  //   if (result.value) {

  //         this.showLoader = true;

  //              this.id = JSON.stringify({
  //          img_id: this.data[0].profile_pic_id
  //       });

  //      const httpOptions = {
  //           headers: new HttpHeaders({
  //               'Content-Type': 'application/json'
  //           })
  //       }
  //       this.http.post(this.api + "/deleteimage", this.id, httpOptions).subscribe(res => {
  //          this.showLoader = false;
  //           this.deleteimg = res;
  //           if(this.deleteimg.status==true){
  //             this.rt.navigateByUrl('/test', {skipLocationChange: true}).then(()=>
  //             this.rt.navigate(["edit-bussinessprofile"]));

  //               Swal.fire({text:"Image Deleted Successfully",type:"success"})
             
  //           }

  //       })
  //   } 
  // })     
  //   }
   onPicture(){

                 Swal.fire({
    title: 'Are you sure?',
    text: 'You want to delete your image ?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {

// this.ngxService.start();
          this.showLoader = true;
        //   console.log("id mage",this.data[0].profile_pic_id)
        //        this.id = JSON.stringify({
        //    img_id: this.data[0].profile_pic_id
        // });

       const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.api + "/deleteimage", {img_id:this.data[0].profile_pic_id,id:localStorage.getItem('id')}, httpOptions).subscribe(res => {
           this.showLoader = false;
            this.deleteimg = res;
            console.log("res res",res)
            if(this.deleteimg.status==true){
              this.rt.navigateByUrl('/shared/contact-us', {skipLocationChange: true}).then(()=>
              this.rt.navigate(["bussiness/edit-bussinessprofile"]));

                Swal.fire({text:"Image Deleted Successfully",type:"success"})
             
            }

        })
    } 
  })     
    }
     onVideo(){
           Swal.fire({
    title: 'Are you sure?',
    text: 'You want to delete your video ?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {

          this.showLoader = true;


           this.vid = JSON.stringify({
            bio_id: this.data[0].bio_video_id
        });

       const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.api + "/deletevideo", this.vid, httpOptions).subscribe(res => {
            this.deletevideo = res;
            if(this.deletevideo.status==true){
              this.rt.navigateByUrl('/shared/contact-us', {skipLocationChange: true}).then(()=>
                this.rt.navigate(["bussiness/edit-bussinessprofile"]));

               
                  Swal.fire({text:"Video Deleted Successfully",type:"success"})
                

            }

        })
    } 
  })
         
    }

    images(fileInput: any) {
      this.crop_image_status=1;
        this.upload_set_default=1
                  this.imageChangedEvent = event;

        this.filesToUpload = < Array < File >> fileInput.target.files;


        //this.product.photo = fileInput.target.files[0]['name'];
    }
     imageCropped(event: ImageCroppedEvent) {

        this.setdefault=event
        this.croppedImage = event.base64;
    }
    video(fileInput: any) {
        this.filesToUpload1 = < Array < File >> fileInput.target.files;
        //this.product.photo = fileInput.target.files[0]['name'];
    }
onUpload(){
           $('#postModal').hide()
          this.showLoader = true;

          if (this.filesToUpload.length === 0) {
    this.showLoader = false;
    Swal.fire({text:"Please select file to upload",type:"error"})
    return false;
  }else{
    var array = this.filesToUpload[0].name.split('.');
    if(array[array.length-1] != 'png' && array[array.length-1] != 'jpg' && array[array.length-1] != 'jpeg' && array[array.length-1] != 'gif')
    {
      this.showLoader = false;
      Swal.fire({text:"This file type not allowed, please upload png, jpeg, jpg, gif",type:"error"});
      return false;
    }
  }


                         const formData: any = new FormData();
                    const files: Array < File > = this.filesToUpload;

                    for (let i = 0; i < files.length; i++) {
                        formData.append("uploads[]", files[i], files[i]['name']);
                    }
                    
                    var image_name= this.filesToUpload[0].name
         //      var check_value = image_name.split('.');

         // if(check_value[check_value.length - 1] == 'jpeg'){
         
         //  var res = image_name.replace(".jpeg", " ");
         // }
         // else if(check_value[check_value.length - 1] == 'jpg'){
         //   var res = image_name.replace(".jpg", " ");
         // }
         // else if(check_value[check_value.length - 1] == 'png'){
         //   var res = image_name.replace(".png", " ");
         // }
           var image_size=this.setdefault.file.size
             
               
                    this.http.post(this.api + '/uploadupdate',  {imag:this.croppedImage,image_name:image_name,image_size:image_size})
                        // .map(files =>  JSON.stringify(files))
                        .subscribe(res => {
                          setTimeout(()=>{
                             this.showLoader = false;
                            this.data1 = res
                            if(this.data1.status==true){
                              
                           this.rt.navigateByUrl('/shared/contact-us', {skipLocationChange: true}).then(()=>
                           
                          this.rt.navigate(["bussiness/edit-bussinessprofile"]));

              
                Swal.fire({text:"Image Updated  Successfully",type:"success"})   
              

                              

            }
            else{

               this.showLoader = false;
                Swal.fire({text:"Please choose file to upload",type:"error"}) 
              

            }
            },3000)
                          })

}
onUpload1(){

          this.showLoader = true;

 console.log(this.filesToUpload1[0].size)
          if (this.filesToUpload1.length === 0) {
    this.showLoader = false;
    Swal.fire({text:"Please select file to upload",type:"error"})
    return false;
  }
  else if(this.filesToUpload1[0].size >= 20000000){
   this.showLoader = false;
    Swal.fire({text:"Please select a video less than 20MB",type:"error"})
    return false;
  }
  // else{
  //   var array = this.filesToUpload1[0].name.split('.');
  //     if (array[array.length - 1] != 'mp4' && array[array.length - 1] != 'mkv' && array[array.length - 1] != 'avi' && array[array.length - 1] != 'mov') {
  //               this.showLoader = false;
  //               Swal.fire({
  //                   text: "This file type not allowed, please upload mp4, mkv, avi, mov",
  //                   type: "error"
  //               });
  //               return false;
  //           }

  // }


          const formData: any = new FormData();
                const files: Array < File > = this.filesToUpload1;

                for (let i = 0; i < files.length; i++) {
                    formData.append("uploads[]", files[i], files[i]['name']);
                }
                this.http.post(this.api + '/videoupdate', formData)
                    /* .map(files =>  JSON.stringify(files))*/
                    .subscribe(res => {
                        this.videores=res
                         if(this.videores.status==true){
                       setTimeout(()=>{
                      this.showLoader = false;
                              this.rt.navigateByUrl('/shared/contact-us', {skipLocationChange: true}).then(()=>
                        this.rt.navigate(["bussiness/edit-bussinessprofile"]));
                          Swal.fire({text:"Video Updated  Successfully",type:"success"})
                      },4000)
  
                             }
                          else{
               this.showLoader = false;
                  
                    Swal.fire({text:"Please choose file to update",type:"error"})

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

Deactivate(){

        Swal.fire({
    title: 'Are you sure?',
    text: 'You want to deactivate your account ?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, deactivate it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
 this.showLoader = true;

     this.http.get(this.api+'/deactivate').subscribe(res=>{
        this.showLoader = false;
   this.deactivate_status=res
    if(this.deactivate_status.status == true){
        this.user.logout().subscribe(data => {
      
      this.status=data
      if(this.status.status == true) {
         localStorage.removeItem('isLoggedIn');
         localStorage.removeItem('token');
         Swal.fire({text:"Account deactivated Successfully",type:"success"})
        this.rt.navigate([''])
       
      } else {
        window.alert('Some problem')
      }
    })
    }

  })

    } 
  })



 
}

  work_pref(ev,value)
  {
    if (value.length < 500 || ev.key == 'Backspace') {
          if(ev.key == 'Backspace')
    {
      if (this.work_pref_count > 0) {
        this.work_pref_count = this.work_pref_count-1 ;  
      }
    }
    else{
      this.work_pref_count = value.length+1;
    }
  }
  else{
    return false;
  }
  }

  work_pref_change(ev, value)
  {

      this.work_pref_count = value.length;
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  isUrlValid() {
    var userInput = this.informationForm.value.website;
    
    var res = userInput.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);
       if(res == null)
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

Check_picture(){
    this.user.fileExists("src/assets/"+this.pic_path).subscribe(res => {
            this.common = res;
             this.file_status=this.common.status
             console.log("ddd",this.file_status)
        });
}
open_div(){
           
        var x = document.getElementById("postModal");
        if (x.style.display === "block") {
            x.style.display = "none";
            document.body.style.overflow = "auto";
        } else {
            x.style.display = "block";
            // document.body.style.overflow = "hidden";
        }
}
public closeModalFunction(): void {
  this.upload_set_default =0
          this.crop_image_status=0
       $('#postModal').hide()
        document.body.style.overflow = "initial";
        this.imageChangedEvent=''
        this.filesToUpload=[]
    }
    show_password(){
    var x = <HTMLInputElement>document.getElementById("passwordField");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
show_password2(){
    var x = <HTMLInputElement>document.getElementById("passwordField2");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}show_password3(){
    var x = <HTMLInputElement>document.getElementById("passwordField3");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
}

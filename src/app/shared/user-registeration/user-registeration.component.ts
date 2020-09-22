import { Component, OnInit } from '@angular/core';
import $ from "jquery";
import { FormGroup, FormControl } from '@angular/forms';
import { User1Service } from './../../user1.service';
import { UserService } from './../../user.service';
import Swal from 'sweetalert2'
import * as myGlobals from './../../global';
import {MatDatepickerModule,MatNativeDateModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormArray,  } from '@angular/forms';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS} from './../../date.adapter';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { FormBuilder,  Validators } from '@angular/forms';
import { MustMatch } from '../must-match.validator';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { phoneNumberValidator } from '../phone-validator';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
   selector: 'app-user-registeration',
  templateUrl: './user-registeration.component.html',
  styleUrls: ['./user-registeration.component.css']
})
export class UserRegisterationComponent implements OnInit {


id:any
city:any
country:any
emailbody:any
primaryfield:any;
secondaryfield:any;
submitted = false;
submitted1 = false;
submitted3 = false;
checked:any
mail:any;
validator:any;
aboutYou:any;
date:any;
aboutWorkForm:any;
days =[];
data:any;
lat : any = 0;
lon : any = 0;
userapi=myGlobals.userapi_url;
api=myGlobals.api_url;
referenceFrom: FormGroup;
no:any=1;
show:any
show2:any
show3:any
show4:any
show5:any
show6:any
show7:any
skills_count = 0;
work_pref_count = 0;
bio_count = 0;
showLoader = false;
controls:any;
model: any = {};
selectedCountry:any=231;
private variable: boolean = true;
datestart:any
dateend:any
default: any=231;
states:any;
location:any
Monday : any = [];
Tuesday : any = [];
Wednesday : any = [];
Thursday : any = [];
Friday : any = [];
Saturday : any = [];
Sunday : any = [];

workinghour:any
collegeAttending:any
imageChangedEvent: any = '';
croppedImage: any = '';
setdefault: any = '';

crop_image_status:number=0
upload_set_default:number=0
disable_upload:number=0

edudata:any
select_gender:any
primary_id:any
secondary_id:any
selectedd:any
agree:any
show_my:any
stage:any
show_monday_data:number=0
show_tuesday_data:number=0
show_wednesday_data:number=0
show_thursday_data:number=0
show_friday_data:number=0
show_saturday_data:number=0
show_sunday_data:number=0
hide_monday_hour:number=0
myworkinghour: any
mondayselect: any
tuesdayselect: any
wednesdayelect: any
thursdayselect: any
fridayselect: any
saturdayselect: any
sundayselect: any
firdayArray = []
saturdayArray = []
sundayArray = []
tuesdayArray = []
wednesdayArray = []
thursdayArray = []
fria: any;
satur: any;
sund: any;
mondayArray = []
mondaycheck: any
  work: any;
  about_bio_: any;
    constructor(private user:UserService,private user1:User1Service,private fb:FormBuilder,private http: HttpClient,private rt: Router, ) 
    {

    }
    
      imageLoaded() {
    }
    cropperReady() {
    }
    loadImageFailed() {
    }

     getUnique(array) {
        var uniqueArray = [];

        for (var i = 0; i < array.length; i++) {
            if (uniqueArray.indexOf(array[i]) === -1) {
                uniqueArray.push(array[i]);
            }
        }
        return uniqueArray;
    }
      myparsint(array) {
        var newArray = [];
        for (var i = 0; i < array.length; ++i) {
            newArray[i] = parseInt(array[i]);
        }
        return newArray;
    }
ngOnInit() {
 // 18july

  this.http.get('https://ipinfo.io').subscribe(res => {
      var common : any
      common = res;
      var location = common.loc;
      var location_array = location.split(',');
      this.lat = location_array[0];
      this.lon = location_array[1];


  })
 this.show_my=localStorage.getItem('incomplete_id')
 this.stage=localStorage.getItem('current_stage')
 console.log(localStorage.getItem('incomplete_id'),'ff',this.stage)
 if(localStorage.getItem('incomplete_id')!= null){
   console.log("dev",localStorage.getItem('incomplete_id'),localStorage.getItem('current_stage'))
    this.user.editData1(localStorage.getItem('incomplete_id')).subscribe(res => {
             this.data = res;
             
          this.aboutYou.controls['country'].setValue(this.data[0].country_id, {onlySelf: true});
         this.aboutYou.controls['state'].setValue(this.data[0].state_id, {onlySelf: true});
          this.State(this.data[0].country_id)
                   this.user.educationData1(localStorage.getItem('incomplete_id')).subscribe(res1 => {
            this.edudata = res1;
            console.log("edu",res1)

             console.log(res[0])
          if(this.data[0].primary_field_interest_id != null){
          this.aboutYou.controls['primaryFieldIntrest'].setValue(this.data[0].primary_field_interest_id, {onlySelf: true});
          }
          if(this.data[0].secondry_interest_id != null){
          this.aboutYou.controls['secondaryFieldInterest'].setValue(this.data[0].secondry_interest_id, {onlySelf: true});
          }
            
                if( localStorage.getItem('current_stage') == '1' || localStorage.getItem('current_stage') == '2'){
                     console.log("in 1")
                     this.aboutYou.patchValue({
                     fname:this.data[0].fname,
                    lname: this.data[0].lname,
                    email:this.data[0].email,
                    phone: this.data[0].phone,
                  
                    city: this.data[0].city,
                    zipCode:this.data[0].zipCode,
                    dob: this.data[0].dob,
                    passwordField: 123654,
                    confirmPasswordField: 123654,
                  })
                     if( localStorage.getItem('current_stage') == '1' || localStorage.getItem('current_stage') == '2'){
                       if(this.edudata.length != 0 ){

                       this.aboutYou.patchValue({
                        degree:this.edudata[0].degree,
                  collegeAttending:this.edudata[0].school_name,
                  collegeStartDate:this.edudata[0].collage_start_date,
                  CollegeEndDate:this.edudata[0].collage_end_date,
                    })
                       }
                     }
                this.select_gender = JSON.stringify(this.data[0].gender);

                this.selectedd = JSON.stringify(this.data[0].is_transportation);
                this.agree=1
                        this.aboutWorkForm.patchValue({
    
                  discriptionAboutWork:this.data[0].work_additional_info,
                  
                
                skills:this.data[0].additional_skill,
                aboutYourSelf:this.data[0].about_bio,
                 }
                 )
                        console.log("ddd",this.data[0].hours_per_week)
          if(this.data[0].hours_per_week != null){
     this.aboutWorkForm.controls['workHoursPerWeek'].setValue(this.data[0].hours_per_week, {onlySelf: true});
          }
          if(this.data[0].travel_location != null){
     this.aboutWorkForm.controls['willingToTravel'].setValue(this.data[0].travel_location, {onlySelf: true});
          } 
          this.about_bio_= this.data[0].about_bio
             console.log("this.about_bio",this.about_bio_)

                }
                
              })
                     })

 //24 july
  this.user1.post("myworkinghour_register",{userid:localStorage.getItem('incomplete_id')}).subscribe(res => {
            this.myworkinghour = res;
            console.log("dddddddddd",res)

            this.mondayselect = this.myworkinghour[0].woking_hours
            this.tuesdayselect = this.myworkinghour[1].woking_hours
            this.wednesdayelect = this.myworkinghour[2].woking_hours
            this.thursdayselect = this.myworkinghour[3].woking_hours
            this.fridayselect = this.myworkinghour[4].woking_hours
            this.saturdayselect = this.myworkinghour[5].woking_hours
            this.sundayselect = this.myworkinghour[6].woking_hours

            if (this.mondayselect != 'n/a' && this.mondayselect != '') {
                this.mondayArray = this.mondayselect.split(/,/g);
                this.mondayArray = this.myparsint(this.mondayArray);
            }
            if (this.tuesdayselect != 'n/a' && this.tuesdayselect != '') {
                this.tuesdayArray = this.tuesdayselect.split(/,/g);
                this.tuesdayArray = this.myparsint(this.tuesdayArray);
            }

            if (this.wednesdayelect != 'n/a' && this.wednesdayelect != '') {
                this.wednesdayArray = this.wednesdayelect.split(/,/g);
                this.wednesdayArray = this.myparsint(this.wednesdayArray);
            }

            if (this.thursdayselect != 'n/a' && this.thursdayselect != '') {
                this.thursdayArray = this.thursdayselect.split(/,/g);
                this.thursdayArray = this.myparsint(this.thursdayArray);


            };
            if (this.fridayselect != 'n/a' && this.fridayselect != '') {
                this.firdayArray = this.fridayselect.split(/,/g);
                this.firdayArray = this.myparsint(this.firdayArray);

            };
            if (this.saturdayselect != 'n/a' && this.saturdayselect != '') {
                this.saturdayArray = this.saturdayselect.split(/,/g);
                this.saturdayArray = this.myparsint(this.saturdayArray);
            };


            if (this.sundayselect != 'n/a' && this.sundayselect != '') {
                this.sundayArray = this.sundayselect.split(/,/g);
                this.sundayArray = this.myparsint(this.sundayArray);
            }
        });

 }


  $('ul.tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');
    if($(this).hasClass('completed') == true)
    {
      $('ul.tabs li').removeClass('current');
      $('.tab-content').removeClass('current');

      $(this).addClass('current');
      $("#"+tab_id).addClass('current');
    }
  });
 document.body.scrollTop = document.documentElement.scrollTop = 0;
 this.State(231);
    $(".toggle-password").click(function() {
  $(".toggle-password > i").toggleClass("fa-eye fa-eye-slash");
  var input = $(this).prev();
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});


  $('#end_date').on('change', function(){
    var start_date = $('#start_date').val();
    var end_date = $('#end_date').val();
  });



$(".toggle-password1").click(function() {
  $(".toggle-password1 > i").toggleClass("fa-eye fa-eye-slash");
  var input =  $(this).prev();
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});

$('.chk').click(function(){
  $(this).parent().parent().next().toggleClass("show");
})

$('#chooseFile').bind('change', function () {
  var filename = $("#chooseFile").val();
  if (/^\s*$/.test(filename)) {
    $(".file-upload").removeClass('active');
    $("#noFile").text("No file chosen..."); 
  }
  else {
    $(".file-upload").addClass('active');
    $("#noFile").text(filename.replace("C:\\fakepath\\", "")); 
  }
});
$('#chooseFile1').bind('change', function () {
  var filename = $("#chooseFile1").val();
  if (/^\s*$/.test(filename)) {
    $(".file-upload").removeClass('active');
    $("#noFile1").text("No file chosen..."); 
  }
  else {
    $(".file-upload").addClass('active');
    $("#noFile1").text(filename.replace("C:\\fakepath\\", "")); 
  }
});
$('#chooseFile2').bind('change', function () {
  var filename = $("#chooseFile2").val();
  if (/^\s*$/.test(filename)) {
    $(".file-upload").removeClass('active');
    $("#noFile2").text("No file chosen..."); 
  }
  else {
    $(".file-upload").addClass('active');
    $("#noFile2").text(filename.replace("C:\\fakepath\\", "")); 
  }
});
$('.chk').click(function(){
  $(this).parent().parent().next().toggleClass('show');
});
   if( localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "1"){
     this.rt.navigate(['bussiness']);
          }
          else if(localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "2"){
           this.rt.navigate(['user']); 
          }


    this.http.get(this.userapi+"/country").subscribe(res=>{
      this.country=res;
      if(localStorage.getItem('current_stage') == '' || localStorage.getItem('current_stage') == null){
       this.aboutYou.controls['country'].setValue(this.default, {onlySelf: true});
      }
      
    }),
    
this.http.get(this.userapi+"/states").subscribe(res=>{
      this.states=res;
      }),
    
    this.http.get(this.userapi+"/primaryfield").subscribe(res=>{
      this.primaryfield=res;
      
    }),
    
   this.http.get(this.userapi+"/secondaryfield").subscribe(res=>{
      this.secondaryfield=res;
      
    }),
   this.http.get(this.userapi+"/location").subscribe(res=>{
     this.location=res;
});
   this.http.get(this.userapi+"/workinghour").subscribe(res=>{
     this.workinghour=res;
   })

    this.aboutYou=this.fb.group({
      tab:['tab-2'],
      currentTab:['tab-1'],
       fname:['',[Validators.required,Validators.maxLength(50),Validators.minLength(3)]],
    lname: ['',[Validators.required,Validators.maxLength(50),Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/)]],
    phone: ['',[Validators.minLength(5),Validators.maxLength(15)]],
    country: ['',Validators.required],
    state: ['',Validators.required],
    city: ['',Validators.required],
    zipCode: ['',Validators.maxLength(10)],
    dob: ['',Validators.required],
    gender: ['',Validators.required],
    uploadPicture: [''],
   uploadResume:[''],
  uploadBioVideo:[''],  
  primaryFieldIntrest:['',Validators.required],
  secondaryFieldInterest:[''],
  degree:[''],
  collegeAttending:[''],
  collegeStartDate:[''],
  CollegeEndDate:[''],
  passwordField:['',[Validators.required, Validators.minLength(6)]],
  confirmPasswordField:['',[Validators.required]],
   }, {
            validator: MustMatch('passwordField', 'confirmPasswordField'),
             
        }
   ),

     this.aboutWorkForm=this.fb.group({
       
        tab:['tab-3'],
      currentTab:['tab-2'],
    discriptionAboutWork: ['',[Validators.required,Validators.maxLength(500)]],
    workHoursPerWeek: ['',Validators.required],
   day1: [''],
    day2: [''],
    day3: [''],
    day4: [''],
    day5: [''],
    day6: [''],
    day7: [''],
    
    mon_hide:[''],
    tues_hide:[''],
    wed_hide:[''],
    thur_hide:[''],
    fri_hide:[''],
    sat_hide:[''],
    sun_hide:[''],
     mon_time: [''],
                tues_time: [''],
                wed_time: [''],
                thurs_time: [''],
                friday_time: [''],
                sat_time: [''],
                sun_time: [''],
willingToTravel:['',Validators.required],
  transportation:['',Validators.required],  
  skills:['',Validators.maxLength(1000)],
  aboutYourSelf:['',[Validators.required,Validators.maxLength(500)]],
  agree:[''],

   }
   ),

 

 
 this.referenceFrom = new FormGroup({
   tab: new FormControl('tab-4'),
      currentTab:new FormControl('tab-3'),
      sections: new FormArray([
        this.initSection(),
      ]),
    });
  
}

   initSection() {
    return new FormGroup({
      
      refName:  new FormControl(''),
    refRelation: new FormControl(''),
    yearsKnown:  new FormControl(''),
    monthsKnown:  new FormControl(''),
    employer:  new FormControl(''),
    currentPosition:  new FormControl(''),
    phoneRef:  new FormControl(''),
    refEmail:  new FormControl(''),
    });
  }
  
  

  addSection() {
    setTimeout(function(){
      $('.count_refNO').each(function(index){
        $(this).html('Refrence #'+(index+1));
      });
    },50);

    const control = <FormArray>this.referenceFrom.get('sections');
    control.push(this.initSection());
  }

 
  getSections(form) {

    return form.controls.sections.controls;
  }
  
  
removeSection(i){
   const control = <FormArray>this.referenceFrom.get('sections');
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to remove this section",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.value) {
     control.removeAt(i);
         setTimeout(function(){
            $('.count_refNO').each(function(index){
              $(this).html('Refrence #'+(index+1));
            });
          },50);
        
      }
    })
   return false;

  }
   onSubmit(form){
    
  }

  minDate = new Date(new Date().getFullYear() - 116, new Date().getMonth() , new Date().getDay());
  maxDate =  new Date(new Date().getFullYear() - 16, new Date().getMonth() , new Date().getDay());  
      maxDate1 =  new Date(new Date().getFullYear() +5, new Date().getMonth() , new Date().getDay()); 
        min_collage_date =  new Date(new Date().getFullYear() - 5, new Date().getMonth() , new Date().getDay());  
 


   callall(){

        this.upload();
       this.upload1();
       this.upload2();

}

option1(){
    this.show = !this.show;
   }
    option2(){
    this.show2 = !this.show2;
   }
    option3(){
    this.show3 = !this.show3;
   }
    option4(){
    this.show4 = !this.show4;
   }
    option5(){
    this.show5 = !this.show5;
   }
    option6(){
    this.show6 = !this.show6;
   }
    option7(){
    this.show7 = !this.show7;
   }
     myarray = {}
    mytime = {}
    fun1(w,event) {
        this.myarray['day1'] = w
       
        if(event == false){
            this.show_monday_data = 0
            this.aboutWorkForm.controls['mon_hide'].setValue(false, {
                onlySelf: true
            });
           }
    }
    fun2(w,event) {
        this.myarray['day2'] = w
        if(event == false){
            this.show_tuesday_data = 0
            this.aboutWorkForm.controls['tues_hide'].setValue(false, {
                onlySelf: true
            });
           }
    }
    fun3(w,event) {
        this.myarray['day3'] = w
      if(event == false){
            this.show_wednesday_data = 0
            this.aboutWorkForm.controls['wed_hide'].setValue(false, {
                onlySelf: true
            });
           }
    }
    fun4(w,event) {
        this.myarray['day4'] = w
         if(event == false){
            this.show_thursday_data = 0
            this.aboutWorkForm.controls['thur_hide'].setValue(false, {
                onlySelf: true
            });
           }
    }
    fun5(w,event) {
        this.myarray['day5'] = w
           if(event == false){
            this.show_friday_data = 0
            this.aboutWorkForm.controls['fri_hide'].setValue(false, {
                onlySelf: true
            });
           }
    }
    fun6(w,event) {
        this.myarray['day6'] = w
           if(event == false){
            this.show_saturday_data = 0
            this.aboutWorkForm.controls['sat_hide'].setValue(false, {
                onlySelf: true
            });
           }
    }
    fun7(w,event) {
        this.myarray['day7'] = w
           if(event == false){
            this.show_sunday_data = 0
            this.aboutWorkForm.controls['sun_hide'].setValue(false, {
                onlySelf: true
            });
           }
    }


timefunction(checkBoxData, weekName, pname) {

        this.mondayArray = this.getUnique(this.mondayArray);
        this.tuesdayArray = this.getUnique(this.tuesdayArray);
        this.wednesdayArray = this.getUnique(this.wednesdayArray);
        this.thursdayArray = this.getUnique(this.thursdayArray);
        this.firdayArray = this.getUnique(this.firdayArray);
        this.saturdayArray = this.getUnique(this.saturdayArray);
        this.sundayArray = this.getUnique(this.sundayArray);



        var el = document.getElementsByClassName(weekName).length;

        var a = 0;
        var checkBoxID = checkBoxData.id;
        var checkBoxValue = parseInt(checkBoxData.value);
        var checkBox = < HTMLInputElement > document.getElementById(checkBoxID);
        var pCheckBox = < HTMLInputElement > document.getElementById(pname);


        if (weekName == 'Monday') {


            a = this.mondayArray.indexOf(checkBoxValue);
            

            if (checkBox.checked == true) {
                if (a == -1) {
                    this.mondayArray.push(checkBoxValue);
                }
            }
             else {
                this.mondayArray.splice(a, 1);
                
                
            }
        } else if (weekName == 'Tuesday') {
            a = this.tuesdayArray.indexOf(checkBoxValue);
            if (checkBox.checked == true) {
                if (a == -1) {
                    this.tuesdayArray.push(checkBoxValue);
                }

            } else {
                this.tuesdayArray.splice(a, 1);
            }
            console.log("this.tuesdayArray",this.tuesdayArray)
        } else if (weekName == 'Wednesday') {
            a = this.wednesdayArray.indexOf(checkBoxValue);
            if (checkBox.checked == true) {
                if (a == -1) {
                    this.wednesdayArray.push(checkBoxValue);
                }

            } else {
                this.wednesdayArray.splice(a, 1);
            }
        } else if (weekName == 'Thursday') {
            a = this.thursdayArray.indexOf(checkBoxValue);
            if (checkBox.checked == true) {
                if (a == -1) {
                    this.thursdayArray.push(checkBoxValue);
                }

            } else {
                this.thursdayArray.splice(a, 1);
            }
        } else if (weekName == 'Friday') {
            a = this.firdayArray.indexOf(checkBoxValue);
            if (checkBox.checked == true) {
                if (a == -1) {
                    this.firdayArray.push(checkBoxValue);
                }

            } else {
                this.firdayArray.splice(a, 1);
            }
        } else if (weekName == 'Saturday') {
            a = this.saturdayArray.indexOf(checkBoxValue);
            if (checkBox.checked == true) {
                if (a == -1) {
                    this.saturdayArray.push(checkBoxValue);
                }

            } else {
                this.saturdayArray.splice(a, 1);
            }
        } else if (weekName == 'Sunday') {
            a = this.sundayArray.indexOf(checkBoxValue);
            if (checkBox.checked == true) {
                if (a == -1) {
                    this.sundayArray.push(checkBoxValue);
                }

            } else {
                this.sundayArray.splice(a, 1);
            }
        }
        this.mondayArray = this.getUnique(this.mondayArray);
        this.tuesdayArray = this.getUnique(this.tuesdayArray);
        this.wednesdayArray = this.getUnique(this.wednesdayArray);
        this.thursdayArray = this.getUnique(this.thursdayArray);
        this.firdayArray = this.getUnique(this.firdayArray);
        this.saturdayArray = this.getUnique(this.saturdayArray);
        this.sundayArray = this.getUnique(this.sundayArray);

    }


filesToUpload: Array<File> = [];
   upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    for(let i =0; i < files.length; i++){
        formData.append("uploads[]", files[i], files[i]['name']);
    }

  var image_name= document.getElementById("noFile").innerHTML
  if(this.setdefault != ''){
  var image_size=this.setdefault.file.size
  }

    this.http.post(this.userapi+'/images', {imag:this.croppedImage,image_name:image_name,image_size:image_size})
        .map(files =>  JSON.stringify(files))
        .subscribe(res =>{ 

        })
         
   }
   upload_update() {
      console.log("in upload-----")
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    for(let i =0; i < files.length; i++){
        formData.append("uploads[]", files[i], files[i]['name']);
    }

  var image_name= document.getElementById("noFile").innerHTML
  if(this.setdefault != ''){
  var image_size=this.setdefault.file.size
  }

    this.http.post(this.api+'/uploadupdate1_update', {login_id:localStorage.getItem('incomplete_id'),imag:this.croppedImage,image_name:image_name,image_size:image_size})
        .map(files =>  JSON.stringify(files))
        .subscribe(res =>{ 

        })
         
   }
   filesToUpload1: Array<File> = [];

upload1() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload1;

    for(let i =0; i < files.length; i++){
        formData.append("uploads[]", files[i], files[i]['name']);
    }
    this.http.post(this.userapi+'/resume', formData)
        .map(files =>  JSON.stringify(files))
        .subscribe(files => console.log('files', files))
}
upload1_update() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload1;

    for(let i =0; i < files.length; i++){
        formData.append("uploads[]", files[i], files[i]['name']);
    }
    var local_var=localStorage.getItem('incomplete_id')
    this.http.post(this.api+'/documentupdate_register/'+local_var, formData)
        .map(files =>  JSON.stringify(files))
        .subscribe(files => console.log('files', files))
}


   filesToUpload2: Array<File> = [];

upload2() {

    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload2;

    for(let i =0; i < files.length; i++){
      
        formData.append("uploads[]", files[i], files[i]['name']);
    }
    this.http.post(this.userapi+'/bio_video', formData)
        .map(files =>  JSON.stringify(files))
        .subscribe(files => console.log('files', files))
}

upload2_update() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload2;

    for(let i =0; i < files.length; i++){
        formData.append("uploads[]", files[i], files[i]['name']);
    }
    var local_var_id=localStorage.getItem('incomplete_id')
    this.http.post(this.api+'/videoupdate1_register/'+local_var_id, formData)
        .map(files =>  JSON.stringify(files))
        .subscribe(files => console.log('files', files))
}

images(fileInput: any) {
  this.crop_image_status=1;
        this.upload_set_default=1
                  this.imageChangedEvent = event;
    this.filesToUpload = <Array<File>>fileInput.target.files;
}
 imageCropped(event: ImageCroppedEvent) {

        this.setdefault=event
        this.croppedImage = event.base64;
        console.log("base64",this.setdefault)
    }
resume(fileInput: any) {
    this.filesToUpload1 = <Array<File>>fileInput.target.files;
    var a  = fileInput.target.files[0]['name'];
    var ar = a.split('.');
    if(ar[ar.length - 1] != 'pdf' && ar[ar.length - 1] != 'doc' && ar[ar.length - 1] != 'docx' && ar[ar.length - 1] != 'xlsx' && ar[ar.length - 1] != 'xls'){
      Swal.fire({title : 'Not a document' , text : 'This is not a document file, please select pdf, xlsx, doc, docx', type : 'error'});
      this.filesToUpload1 = [];
    }
}
bioVideo(fileInput: any) {
  this.filesToUpload2 = <Array<File>>fileInput.target.files;
}

  get f()  { return this.aboutYou.controls; }
  get f1() { return this.aboutWorkForm.controls; }
  get f3() { return this.referenceFrom.controls; }

keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
keyPress1(event: any) {
    const pattern = /[a-zA-Z+\-\s]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  
save_data(){
  console.log(this.aboutYou.value)
  this.submitted = true;
        if (this.aboutYou.invalid) {
                    Swal.fire({text:"Please enter the required field",type:"warning"})

            return;
        }
        $('.tab-link').removeClass('current');
        $('.tab-content').removeClass('current');
        $('#'+this.aboutYou.value.tab).addClass('current');
        $('#tab-'+this.aboutYou.value.tab).addClass('current');
        $('#'+this.aboutYou.value.currentTab).addClass('completed');
        $('#tab-'+this.aboutYou.value.currentTab).addClass('completed');
}

onSubmitAbout() {

  if(this.filesToUpload2.length != 0){

if(this.filesToUpload2[0].size >= 20000000){
   this.showLoader = false;
    Swal.fire({text:"Please select a video less than 20MB",type:"error"})
    return false;
  }
  }

  if(this.show_my != null){
    this.aboutYou.value.passwordField=123654
    this.aboutYou.value.confirmPasswordField=123654
  }


this.collegeAttending=this.aboutYou.value.collegeAttending;

this.datestart=this.aboutYou.value.collegeStartDate;
this.dateend=this.aboutYou.value.CollegeEndDate;
if( this.collegeAttending !=''){
if(this.datestart != '' && this.dateend !=''){
if(this.datestart >= this.dateend)
{
   Swal.fire({text:"College end date must be greater than college start date",type:"warning"})
   return false;

}
}
}
  this.submitted = true;
        if (this.aboutYou.invalid) {
                    Swal.fire({text:"Please enter the required field",type:"warning"})

            return;
        }
         this.aboutYou.value.email=this.aboutYou.value.email.toLowerCase()
        $('html, body').animate({scrollTop:0}, '300');
        //18july
        if(localStorage.getItem('current_stage') == '1' || localStorage.getItem('current_stage') == '2'){
         this.aboutYou.value.login_id=localStorage.getItem('incomplete_id')
         this.user1.post("update_user_about_you",this.aboutYou.value).subscribe(res=>{
  
  if(this.aboutYou.value.uploadPicture != '' ){
    this.upload_update();
  }
  if(this.filesToUpload1.length > 0 ){
    this.upload1_update();
    }
    if(this.filesToUpload2.length > 0){
      this.upload2_update()
    }
         })
        }else{
          this.aboutYou.value.lat = this.lat;
          this.aboutYou.value.lon = this.lon;
           this.user1.insertuserInfo(this.aboutYou.value).subscribe(res=>{
             console.log(res['id'],"in new regi you");
           localStorage.setItem("incomplete_id",res['id'])
           //this.callall();
            
    this.upload();
  
  if(this.filesToUpload1.length > 0){
    this.upload1();
    }
    
    if(this.filesToUpload2.length > 0){
      this.upload2()
    }
          

          })
        }



        $('.tab-link').removeClass('current');
        $('.tab-content').removeClass('current');
        $('#'+this.aboutYou.value.tab).addClass('current');
        $('#tab-'+this.aboutYou.value.tab).addClass('current');
        $('#'+this.aboutYou.value.currentTab).addClass('completed');
        $('#tab-'+this.aboutYou.value.currentTab).addClass('completed');
  


  
 
  
} 
 isNonTrade: boolean = false
  checkAllNonTrades: boolean = false
changeTradesByCategory(event) {
    if (event.target.name == 'nontrades') {
      this.isNonTrade = true
    }
    if (this.isNonTrade && this.checkAllNonTrades) {
      event.target.checked = true
    }
  }

   checkUncheckAll(event) {

        this.mondayArray = this.getUnique(this.mondayArray);
        this.tuesdayArray = this.getUnique(this.tuesdayArray);
        this.wednesdayArray = this.getUnique(this.wednesdayArray);
        this.thursdayArray = this.getUnique(this.thursdayArray);
        this.firdayArray = this.getUnique(this.firdayArray);
        this.saturdayArray = this.getUnique(this.saturdayArray);
        this.sundayArray = this.getUnique(this.sundayArray);

        var checkBoxID = event.target.id;
        var checkBoxName = event.target.name;
        var classname = event.target.className;
        var checkBox = < HTMLInputElement > document.getElementById(checkBoxID);
        var items;

        items = document.getElementsByClassName(classname);
        if (checkBox.checked == true) {
            const checked = event.target.checked;
            for (var i = 0; i < items.length; i++) {
                if (items[i]['type'] == 'checkbox')
                    items[i]['checked'] = true;
            }
        } else {
            for (var i = 0; i < items.length; i++) {
                if (items[i]['type'] == 'checkbox')
                    items[i]['checked'] = false;
            }
        }
        var a = 0;
        var checkBoxID = event.target.id;

        var checkBox = < HTMLInputElement > document.getElementById(checkBoxID);

       if(event.target.checked == false && event.target.name == 'Monday'){
         this.mondayArray= []
       }else if(event.target.checked == false && event.target.name == 'Tuesday'){
         this.tuesdayArray= []
       }else if(event.target.checked == false && event.target.name == 'Wednesday'){
         this.wednesdayArray= []
       }else if(event.target.checked == false && event.target.name == 'Thursday'){
         this.thursdayArray= []
       }else if(event.target.checked == false && event.target.name == 'Friday'){
         this.firdayArray= []
       }else if(event.target.checked == false && event.target.name == 'Saturday'){
         this.saturdayArray= []
       }else if(event.target.checked == false && event.target.name == 'Sunday'){
         this.sundayArray= []
       }
       

        if (checkBoxName == 'Monday') {
            this.Monday = []
            a = this.Monday.indexOf(document.getElementsByClassName(classname)['value']);

            if (checkBox.checked == true) {
                for (var i = 0; i < document.getElementsByClassName(classname).length; i++) {
                    var cv = document.getElementsByClassName(classname)[i]['value']
                    if (cv != 'on') {
                        this.mondayArray.push(parseInt(document.getElementsByClassName(classname)[i]['value']));    
                    }
                }

            }
        } else if (checkBoxName == 'Tuesday') {
            this.Tuesday = []
            a = this.Tuesday.indexOf(document.getElementsByClassName(classname)['value']);

            if (checkBox.checked == true) {
                for (var i = 0; i < document.getElementsByClassName(classname).length; i++) {
                    var cv = document.getElementsByClassName(classname)[i]['value']
                    if (cv != 'on') {
                        this.tuesdayArray.push(parseInt(document.getElementsByClassName(classname)[i]['value']))
                    }
                }

            }
        } else if (checkBoxName == 'Wednesday') {
            this.Wednesday = []
            a = this.Wednesday.indexOf(document.getElementsByClassName(classname)['value']);

            if (checkBox.checked == true) {
                for (var i = 0; i < document.getElementsByClassName(classname).length; i++) {
                    var cv = document.getElementsByClassName(classname)[i]['value']
                    if (cv != 'on') {
                        this.wednesdayArray.push(parseInt(document.getElementsByClassName(classname)[i]['value']))
                    }
                }

            }
        } else if (checkBoxName == 'Thursday') {

            this.Thursday = []
            a = this.Thursday.indexOf(document.getElementsByClassName(classname)['value']);
            if (checkBox.checked == true) {
                for (var i = 0; i < document.getElementsByClassName(classname).length; i++) {
                    var cv = document.getElementsByClassName(classname)[i]['value']
                    if (cv != 'on') {
                        this.thursdayArray.push(parseInt(document.getElementsByClassName(classname)[i]['value']))
                    }
                }

            }

        } else if (checkBoxName == 'Friday') {
            a = this.Friday.indexOf(document.getElementsByClassName(classname)['value']);
            this.Friday = []
            if (checkBox.checked == true) {
                for (var i = 0; i < document.getElementsByClassName(classname).length; i++) {
                    var cv = document.getElementsByClassName(classname)[i]['value']
                    if (cv != 'on') {
                        this.firdayArray.push(parseInt(document.getElementsByClassName(classname)[i]['value']))
                    }
                }

            }
        } else if (checkBoxName == 'Saturday') {
            console.log("hi ")
            this.Saturday = []
            a = this.Saturday.indexOf(document.getElementsByClassName(classname)['value']);

            if (checkBox.checked == true) {
                for (var i = 0; i < document.getElementsByClassName(classname).length; i++) {
                    var cv = document.getElementsByClassName(classname)[i]['value']
                    if (cv != 'on') {
                        this.saturdayArray.push(parseInt(document.getElementsByClassName(classname)[i]['value']))
                    }
                }

            }
                    console.log("saturdayArray======>",this.saturdayArray)
        } else if (checkBoxName == 'Sunday') {
            this.Sunday = []
            a = this.Sunday.indexOf(document.getElementsByClassName(classname)['value']);

            if (checkBox.checked == true) {
                for (var i = 0; i < document.getElementsByClassName(classname).length; i++) {
                    var cv = document.getElementsByClassName(classname)[i]['value']
                    if (cv != 'on') {
                        this.sundayArray.push(parseInt(document.getElementsByClassName(classname)[i]['value']))
                    }
                }

            }
        }
          this.mondayArray = this.getUnique(this.mondayArray);
        this.tuesdayArray = this.getUnique(this.tuesdayArray);
        this.wednesdayArray = this.getUnique(this.wednesdayArray);
        this.thursdayArray = this.getUnique(this.thursdayArray);
        this.firdayArray = this.getUnique(this.firdayArray);
        this.saturdayArray = this.getUnique(this.saturdayArray);
        this.sundayArray = this.getUnique(this.sundayArray);
    }

  
onSubmitWork() {
 
this.aboutWorkForm.value.primaryFieldIntrest=this.aboutYou.value.primaryFieldIntrest
this.aboutWorkForm.value.secondaryFieldInterest=this.aboutYou.value.secondaryFieldInterest

 this.aboutWorkForm.value.day = this.myarray

        this.mondayArray = this.getUnique(this.mondayArray);
        this.tuesdayArray = this.getUnique(this.tuesdayArray);
        this.wednesdayArray = this.getUnique(this.wednesdayArray);
        this.thursdayArray = this.getUnique(this.thursdayArray);
        this.firdayArray = this.getUnique(this.firdayArray);
        this.saturdayArray = this.getUnique(this.saturdayArray);
        this.sundayArray = this.getUnique(this.sundayArray);


        var Mondaydata = '';
        for (var i = 0; i < this.mondayArray.length; i++) {
            if (this.mondayArray.length - 1 == i) {
                Mondaydata += this.mondayArray[i];
            } else {
                Mondaydata += this.mondayArray[i] + ',';
            }
        }


        if (this.workinghour.length == this.mondayArray.length)

        {
            var mondayCheckAll = 1;
        }

        var Tuesdaydata = '';




        for (var i = 0; i < this.tuesdayArray.length; i++) {
            if (this.tuesdayArray.length - 1 == i) {
                Tuesdaydata += this.tuesdayArray[i];
            } else {
                Tuesdaydata += this.tuesdayArray[i] + ',';
            }
        }
        var Wednesdaydata = '';
        for (var i = 0; i < this.wednesdayArray.length; i++) {
            if (this.wednesdayArray.length - 1 == i) {
                Wednesdaydata += this.wednesdayArray[i];
            } else {
                Wednesdaydata += this.wednesdayArray[i] + ',';
            }
        }
        var Thursdaydata = '';
        for (var i = 0; i < this.thursdayArray.length; i++) {
            if (this.thursdayArray.length - 1 == i) {
                Thursdaydata += this.thursdayArray[i];
            } else {
                Thursdaydata += this.thursdayArray[i] + ',';
            }
        }
        var Fridaydata = '';
        for (var i = 0; i < this.firdayArray.length; i++) {
            if (this.firdayArray.length - 1 == i) {
                Fridaydata += this.firdayArray[i];
            } else {
                Fridaydata += this.firdayArray[i] + ',';
            }
        }
        var Saturdaydata = '';
        for (var i = 0; i < this.saturdayArray.length; i++) {
            if (this.saturdayArray.length - 1 == i) {
                Saturdaydata += this.saturdayArray[i];
            } else {
                Saturdaydata += this.saturdayArray[i] + ',';
            }
        }
        console.log("kk",Saturdaydata)
        var Sundaydata = '';
        for (var i = 0; i < this.sundayArray.length; i++) {
            if (this.sundayArray.length - 1 == i) {
                Sundaydata += this.sundayArray[i];
            } else {
                Sundaydata += this.sundayArray[i] + ',';
            }
        }



        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        // usage example:
        var a = ['a', 1, 'a', 2, '1'];
        var unique = a.filter(onlyUnique);
        this.aboutWorkForm.value.Monday_time = Mondaydata;
        this.aboutWorkForm.value.Tuesday_time = Tuesdaydata;
        this.aboutWorkForm.value.wednsday_time = Wednesdaydata;
        this.aboutWorkForm.value.Thursday_time = Thursdaydata;
        this.aboutWorkForm.value.Friday_time = Fridaydata;
        this.aboutWorkForm.value.Saturday_time = Saturdaydata;
        this.aboutWorkForm.value.Sunday_time = Sundaydata;



        this.mytime['Monday'] = this.aboutWorkForm.value.Monday_time
        this.mytime['Tuesday'] = this.aboutWorkForm.value.Tuesday_time
        this.mytime['Wednesday'] = this.aboutWorkForm.value.wednsday_time
        this.mytime['Thursday'] = this.aboutWorkForm.value.Thursday_time
        this.mytime['Friday'] = this.aboutWorkForm.value.Friday_time
        this.mytime['Saturday'] = this.aboutWorkForm.value.Saturday_time
        this.mytime['Sunday'] = this.aboutWorkForm.value.Sunday_time
        this.aboutWorkForm.value.mytime = this.mytime



        this.aboutWorkForm.value.mytime = this.mytime;

        this.submitted1 = true;
        console.log(this.stage,'fffddd')
           if(this.stage == '2'){
            
             this.aboutWorkForm.value.agree = true
           }
           if (this.aboutWorkForm.invalid) {
                    Swal.fire({text:"Please enter the required field",type:"warning"})
         
            return;
          }
           
           if( this.aboutWorkForm.value.agree != true )
            {
             Swal.fire({text:"Please agree terms and conditions",type:"warning"})
            return;
          }
          $('html, body').animate({scrollTop:0}, '300');
          

   //18july
    if(localStorage.getItem('current_stage') == '1' || localStorage.getItem('current_stage') == '2'){
         console.log("in sec if")
         this.aboutWorkForm.value.login_id=localStorage.getItem('incomplete_id')
         this.user1.post("update_user_aboutWorkForm",this.aboutWorkForm.value).subscribe(res=>{
         console.log("step2",res)
         })
        }else{
         console.log("in else hi") 
         this.aboutWorkForm.value.login_id=localStorage.getItem('incomplete_id')
  this.user1.insertuserWork(this.aboutWorkForm.value).subscribe(res=>{
     // console.log(res);
  })
}
           $('.tab-link').removeClass('current');
        $('.tab-content').removeClass('current');
        $('#'+this.aboutWorkForm.value.tab).addClass('current');
        $('#tab-'+this.aboutWorkForm.value.tab).addClass('current');
        $('#'+this.aboutWorkForm.value.currentTab).addClass('completed');
        $('#tab-'+this.aboutWorkForm.value.currentTab).addClass('completed');

   
}

 State(value){
   this.id=JSON.stringify({country_id : value});

   const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
   this.http.post(this.userapi+"/city",this.id,httpOptions).subscribe(res=>{
      this.city=res;

    })
 }
myemailobj={};
 myemailfun(w){
      this.myemailobj=JSON.stringify({email_name : w});
      this.user.emailCheck1( this.myemailobj).subscribe(res=>{
        console.log("hurry",res)
        this.mail = res;
            if (this.mail[0] == undefined) {
            }else if (this.mail[0].email == w) {
                Swal.fire({
                    text: "Email already registered",
                    type: "warning",
                })
            }
            // else if (this.mail[0].email == w && this.mail[0].current_stage == 1 || this.mail[0].current_stage == 2) {
            //     Swal.fire({
            //         text: "You have incomplete steps,Please login to continue registration.",
            //         type: "warning",
            //     })
            // }
   })
 }

 onSubmitReference(form) {

       console.log("---this.referenceFrom.value--------",this.referenceFrom.value)
    this.submitted3 = true;
    for (var i = this.referenceFrom.value.sections.length - 1; i >= 0; i--) {
       var fdata = this.referenceFrom.value.sections[i];
       console.log("-----------",fdata.refName,fdata.refRelation)
       if(fdata.refName == '' || fdata.refRelation == '' || fdata.yearsKnown == '' || fdata.monthsKnown == '' ||  fdata.phoneRef == ''  )
       {
       if(fdata.refName == '')
        {
          $('#refname_'+i).text("Please enter reference name");
        }else{
          $('#refname_'+i).text(" ");
        }

        if(fdata.refRelation == '')
        {
          $('#refRelation'+i).text("Please enter reference relation");
        }else{
          $('#refRelation'+i).text(" ");
        }

        if(fdata.yearsKnown == '')
        {
          $('#yearsKnown'+i).text("Please enter years known");
        }else{
          $('#yearsKnown'+i).text(" ");
        }
        if(fdata.monthsKnown == '')
        {
          $('#monthsKnown'+i).text("Please enter months known");
        }else{
          $('#monthsKnown'+i).text(" ");
        }
       
         if(fdata.phoneRef == '')
        {
          $('#phoneRef'+i).text("Please enter phone number");
        }else{
          $('#phoneRef'+i).text(" ");
        }
           
        return false;

       }
    }


        if (this.referenceFrom.invalid) {
                    Swal.fire({text:"please enter the required field",type:"warning"})

            return;
        }



$('html, body').animate({scrollTop:0}, '300');
    this.showLoader = true;
  this.referenceFrom.value.login_id=localStorage.getItem('incomplete_id')
  this.user1.insertuserRef(this.referenceFrom.value).subscribe(res=>{

    

     this.data=res;

    if(this.data.status == true){
      $('.tab-link').removeClass('completed');
    this.showLoader = false;
      Swal.fire({text:"Registration successful, please verify your email", type: "success",})
       const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}

   this.http.post(this.api+"/sendmail1",this.aboutYou.value,httpOptions).subscribe(res=>{

      
    })

    }else{
    this.showLoader = false;

      Swal.fire({text:"Registration failed", type: "warning",})
    
        }
    })


    $('.tab-link').removeClass('current');
        $('.tab-content').removeClass('current');
        $('#'+this.referenceFrom.value.tab).addClass('current');
        $('#tab-'+this.referenceFrom.value.tab).addClass('current');
        $('#'+this.referenceFrom.value.currentTab).addClass('completed');
        $('#tab-'+this.referenceFrom.value.currentTab).addClass('completed');
}

refCustomsubmit()
{

   Swal.fire({
      title: 'Are you sure?',
      text: "You want to skip References",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, skip it!'
    }).then((result) => {
      if (result.value) {
    this.showLoader = true;

         $('html, body').animate({scrollTop:0}, '300');
 
        
      this.user1.post("update_current_stage",{login_id:localStorage.getItem('incomplete_id')}).subscribe(res=>{
        console.log(res)
      })
      $('.tab-link').removeClass('completed');
    this.showLoader = false;

      Swal.fire({text:"Registration successfull, please verify your email", type: "success",})
       const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
   this.http.post(this.api+"/sendmail1",this.aboutYou.value,httpOptions).subscribe(res=>{
      console.log(res);
      
      
    })

    
    this.showLoader = false;
      

    $('.tab-link').removeClass('current');
        $('.tab-content').removeClass('current');
        $('#'+this.referenceFrom.value.tab).addClass('current');
        $('#tab-'+this.referenceFrom.value.tab).addClass('current');
        $('#'+this.referenceFrom.value.currentTab).addClass('completed');
        $('#tab-'+this.referenceFrom.value.currentTab).addClass('completed');
        
      }
    })




  
}
  work_pref(ev,value)
  {if (value.length < 500 || ev.key == 'Backspace') {
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

  skills_fun(ev,value)
  {if (value.length < 1000 || ev.key == 'Backspace') {
    if(ev.key == 'Backspace')
    {
      if (this.skills_count > 0) {
        this.skills_count = this.skills_count-1 ;  
      }
    }
    else{
      this.skills_count = value.length+1;
    }
  }
  else {return false;}
  }

  skills_fun1(ev, value)
  {

      this.skills_count = value.length;
  }

  bio_fun(ev,value)
  {

    if (value.length < 500 || ev.key == 'Backspace') {
      if(ev.key == 'Backspace')
      {
        if (this.bio_count > 0) {
          this.bio_count = this.bio_count-1 ;  
        }
      }
      else{
        this.bio_count = value.length+1;
      }
    }else{

      return false;
    }
  }

  bio_fun1(ev, value)
  {

      this.bio_count = value.length;
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

    //24 july
    check(event){
    if(event.target.checked == true && event.target.defaultValue == 'monday_hide')
    {
        this.show_monday_data = 1
    }else if(event.target.checked == false && event.target.defaultValue == 'monday_hide')
    {
        this.show_monday_data = 0
    }if(event.target.checked == true && event.target.defaultValue == 'tuesday_hide')
    {
        this.show_tuesday_data = 1
    }else if(event.target.checked == false && event.target.defaultValue == 'tuesday_hide')
    {
        this.show_tuesday_data = 0
    }if(event.target.checked == true && event.target.defaultValue == 'wednesday_hide')
    {
        this.show_wednesday_data = 1
    }else if(event.target.checked == false && event.target.defaultValue == 'wednesday_hide')
    {
        this.show_wednesday_data = 0
    }if(event.target.checked == true && event.target.defaultValue == 'thursday_hide')
    {
        this.show_thursday_data = 1
    }else if(event.target.checked == false && event.target.defaultValue == 'thursday_hide')
    {
        this.show_thursday_data = 0
    }if(event.target.checked == true && event.target.defaultValue == 'friday_hide')
    {
        this.show_friday_data = 1
    }else if(event.target.checked == false && event.target.defaultValue == 'friday_hide')
    {
        this.show_friday_data = 0
    }if(event.target.checked == true && event.target.defaultValue == 'saturday_hide')
    {
        this.show_saturday_data = 1
    }else if(event.target.checked == false && event.target.defaultValue == 'saturday_hide')
    {
        this.show_saturday_data = 0
    }if(event.target.checked == true && event.target.defaultValue == 'sunday_hide')
    {
        this.show_sunday_data = 1
    }else if(event.target.checked == false && event.target.defaultValue == 'sunday_hide')
    {
        this.show_sunday_data = 0
    }
}
show_password1(event){
   
    var x = <HTMLInputElement>document.getElementById("password1");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
      return true;
}
show_password2(event){
    
    var x = <HTMLInputElement>document.getElementById("passwordField_show2");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
  return true;
}
}

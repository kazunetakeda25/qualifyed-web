import { Component, OnInit } from '@angular/core';
import $ from "jquery";
import { FormGroup, FormControl } from '@angular/forms';
import { User1Service } from '../user1.service';
import { UserService } from '../user.service';

import Swal from 'sweetalert2'
import * as myGlobals from '../global';
import {MatDatepickerModule,MatNativeDateModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormArray,  } from '@angular/forms';

import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS} from '../date.adapter';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { FormBuilder,  Validators } from '@angular/forms';
import { MustMatch } from './must-match.validator';
// import { ShowHidePasswordModule } from 'ngx-show-hide-password';

import { phoneNumberValidator } from './phone-validator';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {


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
    constructor(private user:UserService,private user1:User1Service,private fb:FormBuilder,private http: HttpClient,private rt: Router, ) 
    {

    }
    validator:any;
    aboutYou:any;
    date:any;
    aboutWorkForm:any;
    days =[];
    data:any;
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
ngOnInit() {
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
    // console.log(start_date, end_date);
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
     this.rt.navigate(['bussinessprofile']);
          }
          else if(localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "2"){
           this.rt.navigate(['user-profile']); 
          }


    this.http.get(this.userapi+"/country").subscribe(res=>{
      this.country=res;
       this.aboutYou.controls['country'].setValue(this.default, {onlySelf: true});
      
    }),
    
this.http.get(this.userapi+"/states").subscribe(res=>{
      this.states=res;
      //console.log(res)
       // this.aboutYou.controls['state'].setValue(this.default, {onlySelf: true});
      
    }),
    
    this.http.get(this.userapi+"/primaryfield").subscribe(res=>{
      // console.log(res);
      this.primaryfield=res;
      
    }),
    // this.http.get(this.userapi+"/emailbody").subscribe(res=>{
    
    //   this.emailbody=res;
    //     console.log(this.emailbody[0].body);
      
    // }),
   this.http.get(this.userapi+"/secondaryfield").subscribe(res=>{
      // console.log(res);
      this.secondaryfield=res;
      
    }),
   this.http.get(this.userapi+"/location").subscribe(res=>{
     this.location=res;
});
   this.http.get(this.userapi+"/workinghour").subscribe(res=>{
     this.workinghour=res;
     //console.log("working=>",this.workinghour)
   })

    this.aboutYou=this.fb.group({
      tab:['tab-2'],
      currentTab:['tab-1'],
       fname:['',[Validators.required,Validators.maxLength(50)]],
    lname: ['',[Validators.required,Validators.maxLength(50)]],
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
       // id:[''],
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
    mon_time: [''],
    tues_time: [''],
    wed_time: [''],
    thurs_time: [''],
    Friday_time:[''],
    sat_time:[''],
    sun_time:[''],
willingToTravel:['',Validators.required],
  transportation:['',Validators.required],  
  skills:['',Validators.maxLength(1000)],
  aboutYourSelf:['',[Validators.required,Validators.maxLength(500)]],
  agree:['']
   }
   ),

 
// this.referenceFrom=this.fb.group({
      
//         tab:['tab-4'],
//       currentTab:['tab-3'],
//     refName: ['',Validators.required],
//     refRelation: ['',Validators.required],
//     yearsKnown: ['',Validators.required],
//     monthsKnown: ['',Validators.required],
//     employer: ['',Validators.required],
//     currentPosition: ['',Validators.required],
//     phoneRef: ['',Validators.required],
//     refEmail: ['', [Validators.required, Validators.email]]
    
//    }
//    )
 
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

    // console.log(form.get('sections').controls);
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
    // console.log("ddddd=>",this.referenceFrom.value)
    
  }

  minDate = new Date(new Date().getFullYear() - 116, new Date().getMonth() , new Date().getDay());
  maxDate =  new Date(new Date().getFullYear() - 16, new Date().getMonth() , new Date().getDay());  
    // maxDate1 = new Date(new Date().setDate(new Date().getDate()));
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
     myarray={}
     mytime={}
   fun1(w){
    this.myarray['day1']=w
}
fun2(w){
    this.myarray['day2']=w
}
fun3(w){
    this.myarray['day3']=w
}
fun4(w){
    this.myarray['day4']=w
}
fun5(w){
    this.myarray['day5']=w
}
fun6(w){
    this.myarray['day6']=w
}
fun7(w){
    this.myarray['day7']=w
}


timefunction(checkBoxData,weekName,pname)
{
  //console.log("===>==>",pname)
  var el = document.getElementsByClassName(weekName).length;
  

  var a=0;
  var checkBoxID = checkBoxData.id;
  var checkBoxValue = checkBoxData.value;
  var checkBox = <HTMLInputElement> document.getElementById(checkBoxID);
  var pCheckBox = <HTMLInputElement> document.getElementById(pname);
  
    // console.log("in "+weekName+"===>>"+checkBoxValue);
    

    if(weekName == 'Monday'){
      a = this.Monday.indexOf(checkBoxValue);
      if(checkBox.checked == true)
      {
         if(a == -1){
           this.Monday.push(checkBoxValue);
         }
        
      }
      else{
        this.Monday.splice(a, 1);
      }
     // console.log("in======>"+this.Monday);
    }else if(weekName == 'Tuesday'){
      a = this.Tuesday.indexOf(checkBoxValue);
      if(checkBox.checked == true)
      {
         if(a == -1){
           this.Tuesday.push(checkBoxValue);
         }
        
      }
      else{
        this.Tuesday.splice(a, 1);
      }
      //console.log("in======>"+this.Tuesday);
    }else if(weekName == 'Wednesday'){
      a = this.Wednesday.indexOf(checkBoxValue);
      if(checkBox.checked == true)
      {
         if(a == -1){
           this.Wednesday.push(checkBoxValue);
         }
        
      }
      else{
        this.Wednesday.splice(a, 1);
      }
      //console.log("in======>"+this.Wednesday);
    }else if(weekName == 'Thursday'){
      a = this.Thursday.indexOf(checkBoxValue);
      if(checkBox.checked == true)
      {
         if(a == -1){
           this.Thursday.push(checkBoxValue);
         }
        
      }
      else{
        this.Thursday.splice(a, 1);
      }
     // console.log("in======>"+this.Thursday);
    }else if(weekName == 'Friday'){
      a = this.Friday.indexOf(checkBoxValue);
      if(checkBox.checked == true)
      {
         if(a == -1){
           this.Friday.push(checkBoxValue);
         }
        
      }
      else{
        this.Friday.splice(a, 1);
      }
     // console.log("in======>"+this.Friday);
    }else if(weekName == 'Saturday'){
      a = this.Saturday.indexOf(checkBoxValue);
      if(checkBox.checked == true)
      {
         if(a == -1){
           this.Saturday.push(checkBoxValue);
         }
        
      }
      else{
        this.Saturday.splice(a, 1);
      }
      //console.log("in======>"+this.Saturday);
    }else if(weekName == 'Sunday'){
      a = this.Sunday.indexOf(checkBoxValue);
      if(checkBox.checked == true)
      {
         if(a == -1){
           this.Sunday.push(checkBoxValue);
         }
        
      }
      else{
        this.Sunday.splice(a, 1);
      }
     // console.log("in======>"+this.Sunday);
    }


      

    var le = document.querySelectorAll('.'+weekName+':checked').length; 
    if(le == el){
        pCheckBox.checked = true;
    }else{
        pCheckBox.checked = false;
    }

    
  
  
}


filesToUpload: Array<File> = [];
   upload() {
     // console.log("in image api")
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
   filesToUpload1: Array<File> = [];

upload1() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload1;
    // console.log(files);

    for(let i =0; i < files.length; i++){
        formData.append("uploads[]", files[i], files[i]['name']);
    }
    // console.log('form data variable :   '+ formData.toString());
    this.http.post(this.userapi+'/resume', formData)
        .map(files =>  JSON.stringify(files))
        .subscribe(files => console.log('files', files))
}

   filesToUpload2: Array<File> = [];

upload2() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload2;
    // console.log(files);

    for(let i =0; i < files.length; i++){
        formData.append("uploads[]", files[i], files[i]['name']);
    }
    // console.log('form data variable :   '+ formData.toString());
    this.http.post(this.userapi+'/bio_video', formData)
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
    //this.product.photo = fileInput.target.files[0]['name'];
}
bioVideo(fileInput: any) {
    this.filesToUpload2 = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
}

 get f() { return this.aboutYou.controls; }
get f1() { return this.aboutWorkForm.controls; }
// get f2() { return this.referenceFrom.controls; }
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
  


onSubmitAbout() {

  
// var a = document.getElementsByClassName('tabs');


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
// this.aboutYou.value.body=this.emailbody[0].body
  this.submitted = true;
        if (this.aboutYou.invalid) {
                    Swal.fire({text:"Please enter the required field",type:"warning"})

            return;
        }
        $('html, body').animate({scrollTop:0}, '300');
this.user1.insertuserInfo(this.aboutYou.value).subscribe(res=>{
    
  })



        $('.tab-link').removeClass('current');
        $('.tab-content').removeClass('current');
        $('#'+this.aboutYou.value.tab).addClass('current');
        $('#tab-'+this.aboutYou.value.tab).addClass('current');
        $('#'+this.aboutYou.value.currentTab).addClass('completed');
        $('#tab-'+this.aboutYou.value.currentTab).addClass('completed');
  // console.log(this.aboutYou.value);

// console.log(this.aboutYou.value.tab);
// console.log(this.aboutYou.value.currentTab);




  
 
  
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

  checkUncheckAll(event)
  {
    //console.log("in function select all");
    var checkBoxID = event.target.id;
    var checkBoxName = event.target.name;
    var classname = event.target.className; 
    var checkBox = <HTMLInputElement> document.getElementById(checkBoxID);
    var items;
    
      items= document.getElementsByClassName(classname);
      if(checkBox.checked == true)
      {        
         const checked = event.target.checked;         
        for(var i=0; i<items.length; i++){
          if(items[i]['type']=='checkbox')
            items[i]['checked']=true;
        }
      }
      else{       
            for(var i=0; i<items.length; i++){
            if(items[i]['type']=='checkbox')
              items[i]['checked']=false;
          }
      }
 var a=0;
  var checkBoxID = event.target.id;
  //console.log("checlid",checkBoxID)
  var checkBox = <HTMLInputElement> document.getElementById(checkBoxID);
  
  if(checkBoxName == 'Monday'){
    this.Monday=[]
    a = this.Monday.indexOf(document.getElementsByClassName(classname)['value']);
   // console.log("a",a)

    if(checkBox.checked == true)
      {
        for (var i = 0; i < document.getElementsByClassName(classname).length; i++) {
           var cv =  document.getElementsByClassName(classname)[i]['value']
         if(cv != 'on'){
          this.Monday.push(document.getElementsByClassName(classname)[i]['value'])
         }
        }
      
      }
  }else if(checkBoxName == 'Tuesday'){
    this.Tuesday=[]
    a = this.Tuesday.indexOf(document.getElementsByClassName(classname)['value']);
    //console.log("a",a)

    if(checkBox.checked == true)
      {
        for (var i = 0; i < document.getElementsByClassName(classname).length; i++) {
           var cv =  document.getElementsByClassName(classname)[i]['value']
         if(cv != 'on'){
          this.Tuesday.push(document.getElementsByClassName(classname)[i]['value'])
         }
        }
      
      }
  }else if(checkBoxName == 'Wednesday'){
    this.Wednesday=[]
    a = this.Wednesday.indexOf(document.getElementsByClassName(classname)['value']);
   // console.log("a",a)
      
    if(checkBox.checked == true)
      {
        for (var i = 0; i < document.getElementsByClassName(classname).length; i++) {
           var cv =  document.getElementsByClassName(classname)[i]['value']
         if(cv != 'on'){
          this.Wednesday.push(document.getElementsByClassName(classname)[i]['value'])
         }
        }
      
      }
  }else if(checkBoxName == 'Thursday'){
    
    this.Thursday=[]
    a = this.Thursday.indexOf(document.getElementsByClassName(classname)['value']);
   // console.log("a",a)
    if(checkBox.checked == true)
      {
        for (var i = 0; i < document.getElementsByClassName(classname).length; i++) {
           var cv =  document.getElementsByClassName(classname)[i]['value']
         if(cv != 'on'){
          this.Thursday.push(document.getElementsByClassName(classname)[i]['value'])
         }
        }
      
      }
      
  }else if(checkBoxName == 'Friday'){
    a = this.Friday.indexOf(document.getElementsByClassName(classname)['value']);
   // console.log("a",a)
    this.Friday=[]
    if(checkBox.checked == true)
      {
        for (var i = 0; i < document.getElementsByClassName(classname).length; i++) {
          var cv =  document.getElementsByClassName(classname)[i]['value']
         if(cv != 'on'){
          this.Friday.push(document.getElementsByClassName(classname)[i]['value'])
         }
        }
      
      }
  }else if(checkBoxName == 'Saturday'){
    this.Saturday=[]
    a = this.Saturday.indexOf(document.getElementsByClassName(classname)['value']);
  //  console.log("a",a)

    if(checkBox.checked == true)
      {
        for (var i = 0; i < document.getElementsByClassName(classname).length; i++) {
         var cv =  document.getElementsByClassName(classname)[i]['value']
         if(cv != 'on'){
          this.Saturday.push(document.getElementsByClassName(classname)[i]['value'])
         }
        }
      
      }
  }else if(checkBoxName == 'Sunday'){
    this.Sunday=[]
    a = this.Sunday.indexOf(document.getElementsByClassName(classname)['value']);
   // console.log("a",a)

    if(checkBox.checked == true)
      {
        for (var i = 0; i < document.getElementsByClassName(classname).length; i++) {
         var cv =  document.getElementsByClassName(classname)[i]['value']
         if(cv != 'on'){
          this.Sunday.push(document.getElementsByClassName(classname)[i]['value'])
         }
        }
      
      }
  }

    



    //console.log('dddddd',this.Monday)
  }


  
onSubmitWork() {
 
this.aboutWorkForm.value.day=this.myarray


  var Mondaydata = '';
  for (var i = 0; i < this.Monday.length; i++) {
   if(this.Monday.length - 1 == i)
   {
     Mondaydata += this.Monday[i];
   }
   else{
          Mondaydata += this.Monday[i]+',';
    }
   }


   var Tuesdaydata = '';
  for (var i = 0; i < this.Tuesday.length; i++) {
   if(this.Tuesday.length - 1 == i)
   {
     Tuesdaydata += this.Tuesday[i];
   }
   else{
          Tuesdaydata += this.Tuesday[i]+',';
    }
   }
   var Wednesdaydata = '';
  for (var i = 0; i < this.Wednesday.length; i++) {
   if(this.Wednesday.length - 1 == i)
   {
     Wednesdaydata += this.Wednesday[i];
   }
   else{
          Wednesdaydata += this.Wednesday[i]+',';
    }
   }
   var Thursdaydata = '';
  for (var i = 0; i < this.Thursday.length; i++) {
   if(this.Thursday.length - 1 == i)
   {
     Thursdaydata += this.Thursday[i];
   }
   else{
          Thursdaydata += this.Thursday[i]+',';
    }
   }
   var Fridaydata = '';
  for (var i = 0; i < this.Friday.length; i++) {
   if(this.Friday.length - 1 == i)
   {
     Fridaydata += this.Friday[i];
   }
   else{
          Fridaydata += this.Friday[i]+',';
    }
   }
   var Saturdaydata = '';
  for (var i = 0; i < this.Saturday.length; i++) {
   if(this.Saturday.length - 1 == i)
   {
     Saturdaydata += this.Saturday[i];
   }
   else{
          Saturdaydata += this.Saturday[i]+',';
    }
   }
   //console.log("kk",Saturdaydata)
   var Sundaydata = '';
  for (var i = 0; i < this.Sunday.length; i++) {
   if(this.Sunday.length - 1 == i)
   {
     Sundaydata += this.Sunday[i];
   }
   else{
          Sundaydata += this.Sunday[i]+',';
    }
   }
  this.aboutWorkForm.value.Monday_time = Mondaydata;
//console.log("hi=>",Mondaydata)

    this.aboutWorkForm.value.Tuesday_time = Tuesdaydata;
  this.aboutWorkForm.value.wednsday_time = Wednesdaydata;
  this.aboutWorkForm.value.Thursday_time = Thursdaydata;
  this.aboutWorkForm.value.Friday_time = Fridaydata;
  this.aboutWorkForm.value.Saturday_time = Saturdaydata;
    this.aboutWorkForm.value.Sunday_time = Sundaydata;


   this.mytime['Monday']=this.aboutWorkForm.value.Monday_time
 this.mytime['Tuesday']=this.aboutWorkForm.value.Tuesday_time
 this.mytime['Wednesday']=this.aboutWorkForm.value.wednsday_time
 this.mytime['Thursday']=this.aboutWorkForm.value.Thursday_time
 this.mytime['Friday']=this.aboutWorkForm.value.Friday_time
 this.mytime['Saturday']=this.aboutWorkForm.value.Saturday_time
 this.mytime['Sunday']=this.aboutWorkForm.value.Sunday_time
this.aboutWorkForm.value.mytime=this.mytime

        this.submitted1 = true;

           if (this.aboutWorkForm.invalid) {
                    Swal.fire({text:"Please enter the required field",type:"warning"})
         
            return;
          }

          else if( this.aboutWorkForm.value.agree != true )
            {
             Swal.fire({text:"Please agree terms and conditions",type:"warning"})
            return;
          }
          $('html, body').animate({scrollTop:0}, '300');
          // else if( this.aboutWorkForm.value.agree != true)
          //   {
          //    Swal.fire({text:"Please agree terms and conditions",type:"warning"})
          //   return;
          // }
  this.user1.insertuserWork(this.aboutWorkForm.value).subscribe(res=>{
     // console.log(res);
  })

           $('.tab-link').removeClass('current');
        $('.tab-content').removeClass('current');
        $('#'+this.aboutWorkForm.value.tab).addClass('current');
        $('#tab-'+this.aboutWorkForm.value.tab).addClass('current');
        $('#'+this.aboutWorkForm.value.currentTab).addClass('completed');
        $('#tab-'+this.aboutWorkForm.value.currentTab).addClass('completed');

   
}

 State(value){
   // console.log()
   this.id=JSON.stringify({country_id : value});
   // console.log(this.id);

   const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
   this.http.post(this.userapi+"/city",this.id,httpOptions).subscribe(res=>{
      // console.log(res);
      this.city=res;
             // this.aboutYou.controls['state'].setValue(this.default, {onlySelf: true});

    })
 }
myemailobj={};
 myemailfun(w){
      this.myemailobj=JSON.stringify({email_name : w});
      this.user.emailCheck1( this.myemailobj).subscribe(res=>{
        this.mail = res;
            if (this.mail[0] == undefined) {
            }else if (this.mail[0].email == w) {
                Swal.fire({
                    text: "Email already registered",
                    type: "warning",
                })
            }
   })
 }

 onSubmitReference(form) {

    this.submitted3 = true;
    for (var i = this.referenceFrom.value.sections.length - 1; i >= 0; i--) {
       var fdata = this.referenceFrom.value.sections[i];
       if(fdata.refName == '' && fdata.refRelation == '' && fdata.yearsKnown == '' && fdata.yearsKnown == '' && fdata.monthsKnown == '' && fdata.employer == '' && fdata.currentPosition == '' && fdata.phoneRef == '' && fdata.refEmail == '' )
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
        // if(fdata.employer == '')
        // {
        //   $('#employer'+i).text("Please enter company name");
        // }else{
        //   $('#employer'+i).text(" ");
        // }
        // if(fdata.currentPosition == '')
        // {
        //   $('#currentPosition'+i).text("Please enter current position");
        // }else{
        //   $('#currentPosition'+i).text(" ");
        // }
         if(fdata.phoneRef == '')
        {
          $('#phoneRef'+i).text("Please enter phone number");
        }else{
          $('#phoneRef'+i).text(" ");
        }
        //  if(fdata.refEmail == '')
        // {
        //   $('#refEmail'+i).text("Please enter reference name");
        // }else{
        //   $('#refEmail'+i).text(" ");
        // }
        //   
        return false;

       }
    }


        if (this.referenceFrom.invalid) {
                    Swal.fire({text:"please enter the required field",type:"warning"})

            return;
        }

$('html, body').animate({scrollTop:0}, '300');
    this.showLoader = true;

  this.user1.insertuserRef(this.referenceFrom.value).subscribe(res=>{

     // console.log("ref res  "+res);
                                   this.callall();

     this.data=res;

    if(this.data.status == true){
      $('.tab-link').removeClass('completed');
    this.showLoader = false;
      Swal.fire({text:"Registration successful, please verify your email", type: "success",})
       const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}

   this.http.post(this.api+"/sendmail1",this.aboutYou.value,httpOptions).subscribe(res=>{
      // console.log(res);

      
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
      text: "You want to skip refrence's",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, skip it!'
    }).then((result) => {
      if (result.value) {
    this.showLoader = true;

         $('html, body').animate({scrollTop:0}, '300');
  this.user1.insertuserRef(this.referenceFrom.value).subscribe(res=>{
    this.callall();

    // console.log("ref res  "+res);
     this.data=res;

    if(this.data.status == true){
      $('.tab-link').removeClass('completed');
    this.showLoader = false;

      Swal.fire({text:"Registration successfull, please verify your email", type: "success",})
       const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
   this.http.post(this.api+"/sendmail1",this.aboutYou.value,httpOptions).subscribe(res=>{
      // console.log(res);
      
      
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
      //console.log('value.length ====>',value.length); 
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
     // console.log('value.length ====>',value.length); 
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
      //console.log('value.length ====>',value.length); 
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
    show_password2(){
    var x = <HTMLInputElement>document.getElementById("passwordField_show2");
  if (x.type === "password") {
     x.type = "text";
   
  } else {
    x.type = "password";
    
  }
}  
show_password1(){
    var x = <HTMLInputElement>document.getElementById("password1");
  if (x.type === "password") {
     x.type = "text";
   
  } else {
    x.type = "password";
    
  }
}
}

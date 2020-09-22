import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { FormBuilder,  Validators ,FormControl} from '@angular/forms';
import * as myGlobals from '../../global';
import {MatDatepickerModule,MatNativeDateModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import Swal from 'sweetalert2'
import * as $ from 'jquery';
import { User1Service } from './../../user1.service';
import { UserService } from './../../user.service';
import { Router } from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipsModule} from '@angular/material/chips';
import {MatChipInputEvent} from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";

import {MatAutocompleteSelectedEvent,  MatAutocomplete} from '@angular/material';
import { ElementRef, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS} from '../../date.adapter';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
     selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
    common : any;
    id;
    userapi = myGlobals.userapi_url;
    api_url_ = myGlobals.api_url_;
    media_url = myGlobals.media_url;
    api = myGlobals.api_url;
    dev: any;
    ids: any
    data;
    filterData;
    customerData: any;
    deleteedu: any
    delete_id: any
    deleteid: any
    showLoader = false;
    deleteexp: any
    city: any;
    nameData: any;
    skillid: any
    pdfSrcs : any = ""
    country: any;
    submitted6 = false;
    submitted5 = false;
    submitted = false;
    submitted1 = false;
    submitted2 = false;
    submitted3 = false;
    edudata: any
    updateexp: any
    citys: any
    isSpecial: any;
    personalInformation: any;
    education: any;
    work: any;
    skills: any;
    skills1: any;
    experience: any;
    updateedu: any
    visible = true;
    selectable = true;
    removable = true;
    about: any;
    addOnBlur = true;
    submitted4 = false;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    deleteimg: any;
    vid: any;
    deletevideo: any;
    deletedoc: any
    filesToUpload: Array < File > = [];
    filesToUpload1: Array < File > = [];
    filesToUpload2: Array < File > = [];
    docres: any
    videores: any
    data1: any
    server_name = myGlobals.server_name
    doc: any;
    myexperience: any;
    experience2: any;
    experience1: any;
    status: any
    showBtn = -1
    showBtn1 = -1
    selectedd: any
    workselect: any
    workselect1: any
    workselect2: any
    workselect3: any
    workselect4: any
    workselect5: any
    workselect6: any
    select_gender: any;
    education2: any
    show: any
    show2: any
    show3: any
    show4: any
    show5: any
    show6: any
    sub = false;
    show7: any
    show8: any
    education1: any
    deactivate_status: any
    expdata: any
    workdata: any;
    skillsdata: any
    workdaydata: any
    pdfSrc: string
    fruitCtrl = new FormControl();
    filteredFruits: Observable < string[] > ;
    fruits: any = [];
    workinghour: any = [];
    Monday: any = [];
    Tuesday: any = [];
    Wednesday: any = [];
    Thursday: any = [];
    Friday: any = [];
    Saturday: any = [];
    Sunday: any = [];
    collageStartDate: any
    collageEndDate: any
    location: any
    myworkinghour: any
    mondayselect: any
    tuesdayselect: any
    wednesdayelect: any
    thursdayselect: any
    fridayselect: any
    saturdayselect: any
    sundayselect: any
    mydata: any
    wh: any
    myskills: any
    experienceStart: any
    experienceEnd: any
    result: any
    myarray11 = []
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
    skillscheck: any
    allFruits: any = [];
   show_monday_data:number=0
   show_tuesday_data:number=0
show_wednesday_data:number=0
show_thursday_data:number=0
show_friday_data:number=0
show_saturday_data:number=0
show_sunday_data:number=0
hide_monday_hour:number=0
    file_status=false;
    pic_path:any;
imageChangedEvent: any = '';
    croppedImage: any = '';
    setdefault: any = '';
    crop_image_status:number=0
    upload_set_default:number=0
    check_image:any
    check_resume:any
        work_pref_count = 0;
        bio_count = 0;
   login_id=localStorage.getItem("id");
   usertype_token=localStorage.getItem("token");
    @ViewChild('fruitInput') fruitInput: ElementRef < HTMLInputElement > ;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    getUnique(array) {
        var uniqueArray = [];

        for (var i = 0; i < array.length; i++) {
            if (uniqueArray.indexOf(array[i]) === -1) {
                uniqueArray.push(array[i]);
            }
        }
        return uniqueArray;
    }
    inArrayF(array, param) {
        var a = array.indexOf(String(param));
        if (a >= 0) {
            return true;
        } else {
            return false;
        }
    }

    myparsint(array) {
        var newArray = [];
        for (var i = 0; i < array.length; ++i) {
            newArray[i] = parseInt(array[i]);
        }
        return newArray;
    }

    explode(array) {
        return "";
    }

    constructor(private dialog: MatDialog, private rt: Router, private user1: User1Service, private user: UserService, private fb: FormBuilder, private http: HttpClient, ) {
        this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));

        this.user.editData({userid:this.login_id,usertype:this.usertype_token}).subscribe(res => {

            this.data = res;
            //this.pdfSrc = './assets/uploads/resume/' + this.data.resume_name;
            this.pdfSrc= "assets/uploads/resume/"+this.data[0].resume_name;
            this.pic_path="uploads/images/" + this.data[0].profile_pic_name
            
            this.check_image=this.data[0].profile_pic_name
            this.check_resume=this.data[0].resume_name
            // this.pdfSrc = this.server_name+"/src/assets/uploads/resume/"+this.data[0].resume_name;
            // this.user.post("remove_video",{video_name:this.data[0].video_name.split('.')[0]+'.mov'}).subscribe(res=>{
            //         console.log("res--",res)
            //     })
             this.Check_picture();

            this.ngOnInit()
        })



    }

    ngOnInit() {
   
        // var profile_pic_button = document.getElementById("#edit_profile_pic");
        // var popup_profile = document.getElementById("#postModal");


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

        this.http.get(this.userapi + "/location").subscribe(res => {
            this.location = res;

        });

        this.http.get(this.userapi + "/getSkills").subscribe(res => {
            this.common = res;
            for (var i = 0; i < this.common.length; ++i) {
                this.allFruits[i] = res[i].name;
            }

        })

        this.http.get(this.userapi + "/myworkinghour").subscribe(res => {
            this.myworkinghour = res;

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




        this.http.get(this.userapi + "/getUserSkills").subscribe(res => {
               this.skillscheck=res
            //console.log(this.skillscheck.length)
               if(this.skillscheck.length >0){
              this.fruits = res[0].skills.split(',');    
               }

        })

        this.http.get(this.userapi + "/country").subscribe(res => {
            this.country = res;
        })


        this.http.get(this.userapi + "/workinghour").subscribe(res => {
            this.workinghour = res;
        })




        this.http.get(this.userapi + "/workinghour").subscribe(res => {


        })

        this.personalInformation = this.fb.group({

                // fname: ['', Validators.required],
                // lname: ['', Validators.required],
                fname:['',[Validators.required,Validators.maxLength(50),Validators.minLength(3)]],
    lname: ['',[Validators.required,Validators.maxLength(50),Validators.minLength(3)]],
                email: ['', [Validators.required, Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/)]],
                phone: ['', [Validators.minLength(5), Validators.maxLength(15)]],
                country: ['', Validators.required],
                state: ['', Validators.required],
                city: ['', Validators.required],
                zipCode: ['', [Validators.minLength(1), Validators.maxLength(10)]],
                dob: ['', Validators.required],
                gender: ['', Validators.required],

            }),
            this.user.editData({userid:this.login_id,usertype:this.usertype_token}).subscribe(res => {
                 console.log("------------",res)
                this.data = res;

                if (this.data != undefined && this.data != null && this.data != '' && this.data.length > 0) {

                    this.selectedd = JSON.stringify(this.data[0].is_transportation);

                    this.select_gender = JSON.stringify(this.data[0].gender);
                    

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
                    });

                }

            });



        this.user.educationData(this.login_id).subscribe(res => {
            this.edudata = res;

        })

        this.user.experienceData(this.login_id).subscribe(res => {
            this.expdata = res;

        })


        this.user.workData().subscribe(res => {
            this.workdata = res

            this.workselect = this.workdata[0].woking_hours;
            this.workselect1 = this.workdata[1].woking_hours
            this.workselect2 = this.workdata[2].woking_hours;
            this.workselect3 = this.workdata[3].woking_hours;
            this.workselect4 = this.workdata[4].woking_hours;
            this.workselect5 = this.workdata[5].woking_hours;
            this.workselect6 = this.workdata[6].woking_hours;
        })


        if (this.data != undefined && this.data != null && this.data != '' && this.data.length > 0) {

            this.personalInformation.patchValue({
                fname: this.data[0].fname,
                lname: this.data[0].lname,
                email: this.data[0].email,
                phone: this.data[0].phone,
                country: this.data[0].country_id,
                state: this.data[0].state_id,
                city: this.data[0].city,
                zipCode: this.data[0].zipCode,
                dob: this.data[0].dob,
                gender: this.data[0].gender,
            });
        }

        this.education = this.fb.group({

                collage_attending: ['', Validators.required],
                degree: ['', Validators.required],
                collageStartDate: [''],
                collageEndDate: [''],

            }),

            this.education1 = this.fb.group({
                id: [''],
                collage_attending: ['', Validators.required],
                degree: ['', Validators.required],
                start: [''],
                collageEndDate: [''],

            }),

            this.work = this.fb.group({

                discriptionAboutWork: ['', Validators.required],
                workHoursPerWeek: [''],
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
                friday_time: [''],
                sat_time: [''],
                sun_time: [''],
                willingToTravel: [''],
                transportation: [''],
                mon_hide:[''],
                tues_hide:[''],
                wed_hide:[''],
                thur_hide:[''],
                fri_hide:[''],
                sat_hide:[''],
                sun_hide:[''],
                aboutYourSelf:['',Validators.required]
            })

        if (this.data != undefined && this.data != null && this.data != '' && this.data.length > 0) {
            this.work.patchValue({
                discriptionAboutWork: this.data[0].work_additional_info,
                workHoursPerWeek: this.data[0].hours_per_week,
                willingToTravel: this.data[0].travel_location,
                aboutYourSelf: this.data[0].about_bio,
            });
        }


        this.skills = this.fb.group({
                skills: [''],
            }),

            this.experience = this.fb.group({

                position: ['', Validators.required],
                employer: ['', Validators.required],
                experienceStart: ['', Validators.required],
                experienceEnd: ['', Validators.required],

            }),
            this.experience1 = this.fb.group({

                id: [''],
                position: ['', Validators.required],
                employer: ['', Validators.required],
                experienceStart: ['', Validators.required],
                experienceEnd: ['', Validators.required],

            })




    }
    InputControl(event) {

    }

    scrollToElement($element): void {
        $element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
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

    // add(event: MatChipInputEvent): void {

    //     let isValueTrue = this.allFruits.filter(myAlias =>
    //         myAlias.name === event.value);
    //     if (isValueTrue.length === 0) {
    //         this.fruitCtrl.setValue(null);
    //         event.input.value = '';
    //         event.input.blur();
    //         return;
    //     }

    //     let isValueTrue2 = this.fruits.filter(myAlias =>
    //         myAlias.name === event.value);
    //     if (isValueTrue2.length != 0) {
    //         this.fruitCtrl.setValue(null);
    //         event.input.blur();
    //         event.input.value = '';
    //         return;
    //     }



    //     const input = event.input;
    //     const value = event.value;
    //     // Add our fruit
    //     if ((value || '').trim()) {
    //         this.fruits.push({
    //             id: Math.random(),
    //             name: value.trim()
    //         });
    //         event.input.blur();

    //     }

    //     // Reset the input value
    //     if (input) {
    //         input.value = '';
    //         event.input.blur();

    //     }

    //     this.fruitCtrl.setValue(null);
    //     event.input.blur();

    // }

    // remove(fruit, indx, w): void {
    //     this.fruits.splice(indx, 1);

    // }

    // selected(event: MatAutocompleteSelectedEvent): void {
    //     // console.log(event.option.value,'event.option.value');

    //     let isValueTrue2 = this.fruits.filter(myAlias =>
    //         myAlias.name === event.option.value.name);
    //     if (isValueTrue2.length != 0) {
    //         this.fruitCtrl.setValue(null);
    //         this.fruitInput.nativeElement.value = '';
    //         this.fruitInput.nativeElement.blur();

    //         return;
    //     }


    //     this.fruits.push(event.option.value);
    //     this.fruitInput.nativeElement.value = '';
    //     this.fruitInput.nativeElement.blur();
    //     this.fruitCtrl.setValue(null);

    // }

    // private _filter(value: any): string[] {
    //     return this.allFruits.filter(fruit => fruit.name.toLowerCase().indexOf(value) === 0);
    // }


     add(event: MatChipInputEvent): void {

    
        if (!this.matAutocomplete.isOpen) {
          const input = event.input;
          const value = event.value;
          // Add our fruit
          
            let isValueTrue2 = this.fruits.filter(alias => alias == value);
            if (isValueTrue2.length != 0) {
                input.value = '';
                this.fruitCtrl.setValue(null);
                return;
            }

          if ((value || '').trim()) {
            this.fruits.push(value.trim());
          }
          // Reset the input value
          if (input) {
            input.value = '';
          }

          this.fruitCtrl.setValue(null);
        }
      }

      remove(fruit: string): void {
        const index = this.fruits.indexOf(fruit);

        if (index >= 0) {
          this.fruits.splice(index, 1);
        }
      }

      selected(event: MatAutocompleteSelectedEvent): void {
          let isValueTrue2 = this.fruits.filter(alias => alias == event.option.viewValue);
            if (isValueTrue2.length != 0) {
                this.fruitInput.nativeElement.value = '';
                this.fruitCtrl.setValue(null);
                return;
            }
        this.fruits.push(event.option.viewValue);
        this.fruitInput.nativeElement.value = '';
        this.fruitCtrl.setValue(null);
      }

      private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
      }

    keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;

        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    keyPress1(event: any) {
        const pattern = /[a-zA-Z\s]/;

        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    get f() {
        return this.personalInformation.controls;
    }
    get f1() {
        return this.education.controls;
    }
    get f2() {
        return this.work.controls;
    }
    get f3() {
        return this.experience.controls;
    }
    get f4() {
        return this.experience1.controls;
    }
    get f5() {
        return this.education1.controls;
    }
    get f6() {
        return this.education.controls;
    }



    option1() {
        this.show = !this.show;
    }
    option2() {
        this.show2 = !this.show2;
    }
    option3() {
        this.show3 = !this.show3;
    }
    option4() {
        this.show4 = !this.show4;
    }
    option5() {
        this.show5 = !this.show5;
    }
    option6() {
        this.show6 = !this.show6;
    }
    option7() {
        this.show7 = !this.show7;
    }

    option8(i) {
        this.showBtn1 = i;
        this.experience1.setValue({
            id: this.expdata[i].id,
            position: this.expdata[i].position,
            employer: this.expdata[i].employer,
            experienceStart: this.expdata[i].start_date,
            experienceEnd: this.expdata[i].end_date,

        })
    }
    close8(index) {
        this.showBtn1 = -1;
    }

    showUndoBtn(i) {
        this.showBtn = i;
        this.education1.setValue({
            id: this.edudata[i].id,
            collage_attending: this.edudata[i].school_name,
            degree: this.edudata[i].degree,
            start: this.edudata[i].collage_start_date,
            collageEndDate: this.edudata[i].collage_end_date,

        })
    }

    close(index) {
        this.showBtn = -1;
    }
 





    myarray = {}
    mytime = {}
    fun1(w,event) {
        this.myarray['day1'] = w
       
        if(event == false){
            this.show_monday_data = 0
            this.work.controls['mon_hide'].setValue(false, {
                onlySelf: true
            });
           }
    }
    fun2(w,event) {
        this.myarray['day2'] = w
        if(event == false){
            this.show_tuesday_data = 0
            this.work.controls['tues_hide'].setValue(false, {
                onlySelf: true
            });
           }
    }
    fun3(w,event) {
        this.myarray['day3'] = w
      if(event == false){
            this.show_wednesday_data = 0
            this.work.controls['wed_hide'].setValue(false, {
                onlySelf: true
            });
           }
    }
    fun4(w,event) {
        this.myarray['day4'] = w
         if(event == false){
            this.show_thursday_data = 0
            this.work.controls['thur_hide'].setValue(false, {
                onlySelf: true
            });
           }
    }
    fun5(w,event) {
        this.myarray['day5'] = w
           if(event == false){
            this.show_friday_data = 0
            this.work.controls['fri_hide'].setValue(false, {
                onlySelf: true
            });
           }
    }
    fun6(w,event) {
        this.myarray['day6'] = w
           if(event == false){
            this.show_saturday_data = 0
            this.work.controls['sat_hide'].setValue(false, {
                onlySelf: true
            });
           }
    }
    fun7(w,event) {
        this.myarray['day7'] = w
           if(event == false){
            this.show_sunday_data = 0
            this.work.controls['sun_hide'].setValue(false, {
                onlySelf: true
            });
           }
    }
    timefun(w) {
        this.mytime['monday_time'] = w
    }
    timefun1(w) {
        this.mytime['tuesday_time'] = w
    }
    timefun2(w) {
        this.mytime['wednesday_time'] = w
    }
    timefun3(w) {
        this.mytime['thursday_time'] = w
    }
    timefun4(w) {
        this.mytime['friday_time'] = w
    }
    timefun5(w) {
        this.mytime['saturday_time'] = w
    }
    timefun6(w) {
        this.mytime['sunday_time'] = w
    }

    minDate = new Date(new Date().getFullYear() - 116, new Date().getMonth(), new Date().getDay());
    maxDate = new Date(new Date().getFullYear() - 16, new Date().getMonth(), new Date().getDay());
     min_collage_date =  new Date(new Date().getFullYear() - 5, new Date().getMonth() , new Date().getDay());

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
            // console.log("a",a)

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
            // console.log("a",a)
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
            // console.log("a",a)
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
            //  console.log("a",a)

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
            // console.log("a",a)

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

    onSubmitAbout() {
       

        this.submitted = true;
        if (this.personalInformation.invalid) {
            Swal.fire({
                text: "Please enter the required field",
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
        this.http.post(this.userapi + "/updatepersonalinfo", this.personalInformation.value, httpOptions).subscribe(res => {
            this.about = res
            if (this.about.status == true) {
                this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["user/edit-profile"]));
                Swal.fire({
                    text: "Personal Information Updated Successfully",
                    type: "success"
                })
            } else {
                this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["user/edit-profile"]));
                Swal.fire({
                    text: " Updation Failed",
                    type: "warning"
                })
            }
        })
    }
    onSubmitEducation() {



        this.collageStartDate = this.education.value.collageStartDate;
        this.collageEndDate = this.education.value.collageEndDate;


        if (this.collageStartDate != '' && this.collageEndDate != '') {

            if (new Date(this.collageStartDate) >= new Date(this.collageEndDate)) {

                Swal.fire({
                    text: "College end date must be greater than college start date",
                    type: "warning"
                })
                return false;

            }
        }
        this.submitted6 = true;
        if (this.education.invalid) {
            Swal.fire({
                text: "Please fill all required fields",
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
        this.http.post(this.userapi + "/updateeducation", this.education.value, httpOptions).subscribe(res => {
            this.about = res
            if (this.about.status == true) {
                //this.education.reset();
                this.ngOnInit()
                this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["user/edit-profile"]));
                Swal.fire({
                    text: "Education Field added Successfully",
                    type: "success"
                })
            } else {
                this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["user/edit-profile"]));
                Swal.fire({
                    text: " Updation Failed",
                    type: "warning"
                })
            }
        })
    }
    onSubmitWork() {

        this.submitted2 = true;
        this.work.value.day = this.myarray

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
        //console.log("kk",Saturdaydata)
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
        this.work.value.Monday_time = Mondaydata;
        this.work.value.Tuesday_time = Tuesdaydata;
        this.work.value.wednsday_time = Wednesdaydata;
        this.work.value.Thursday_time = Thursdaydata;
        this.work.value.Friday_time = Fridaydata;
        this.work.value.Saturday_time = Saturdaydata;
        this.work.value.Sunday_time = Sundaydata;



        this.mytime['Monday'] = this.work.value.Monday_time
        this.mytime['Tuesday'] = this.work.value.Tuesday_time
        this.mytime['Wednesday'] = this.work.value.wednsday_time
        this.mytime['Thursday'] = this.work.value.Thursday_time
        this.mytime['Friday'] = this.work.value.Friday_time
        this.mytime['Saturday'] = this.work.value.Saturday_time
        this.mytime['Sunday'] = this.work.value.Sunday_time
        this.work.value.mytime = this.mytime


        //console.log("===================>",this.work.value)

        this.work.value.mytime = this.mytime;
        // console.log("MYWORK",this.work.value)
        if (this.work.invalid) {
            Swal.fire({
                text: "Please enter the required field",
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
        this.http.post(this.userapi + "/updatework", this.work.value, httpOptions).subscribe(res => {
            this.about = res
            if (this.about.status == true) {
                this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["user/edit-profile"]));

                Swal.fire({
                    text: "Work Information Updated Successfully",
                    type: "success"
                })
            } else {
                this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["user/edit-profile"]));
                Swal.fire({
                    text: " Updation Failed",
                    type: "warning"
                })
            }
        })
    }

    empty() {
        //empty your array
        this.fruits = [];

    }
    get g() {
        return this.personalInformation.controls;
    }

    onSubmitSkills() {
        if (this.fruits.length === 0) {
            Swal.fire({
                title: "SELECT SKILLS",
                text: "Please select atlest one skill to update your skills",
                type: 'error'
            });
            return false;
        }
        


        const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}) }

        this.showLoader = true;
        this.http.post(this.userapi + "/updateskills", this.fruits, httpOptions).subscribe(res => {
            this.about = res
            if (this.about.status == true) {
                this.empty()
                this.fruits = null
                this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["user/edit-profile"]));
                Swal.fire({
                    text: "Skills Updated Successfully",
                    type: "success"
                })
            } else {
                this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["user/edit-profile"]));
                Swal.fire({
                    text: " Updation Failed",
                    type: "warning"
                })
            }
        })


    }


    onSubmitExperience() {

        this.experienceStart = this.experience.value.experienceStart;
        this.experienceEnd = this.experience.value.experienceEnd;


        if (this.experienceStart != '' && this.experienceEnd != '') {

            if (new Date(this.experienceStart) >= new Date(this.experienceEnd)) {

                Swal.fire({
                    text: "Experience end date must be greater than experience start date",
                    type: "warning"
                })
                return false;

            }
        }
        this.submitted3 = true;
        if (this.experience.invalid) {
            Swal.fire({
                text: "Please enter the required field",
                type: "warning"
            })

            return;
        }
        this.showLoader = true;
        this.myexperience = JSON.stringify(this.experience.value);

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.userapi + "/experience", this.myexperience, httpOptions).subscribe(res => {
            this.experience = res;
            if (this.experience.status == true) {
                this.ngOnInit()
                this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["user/edit-profile"]));
                Swal.fire({
                    text: "Experience added Successfully",
                    type: "success"
                })


            } else {
                this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["user/edit-profile"]));
                Swal.fire({
                    text: " Updation Failed",
                    type: "warning"
                })



            }
        })
    }
    delete() {

    }

    onPicture() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete your image ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.showLoader = true;
                this.id = JSON.stringify({
                    img_id: this.data[0].profile_pic_id,
                    id: localStorage.getItem('id')
                });

                console.log(this.id);

                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                }
                this.http.post(this.api + "/deleteimage", this.id, httpOptions).subscribe(res => {
                    this.deleteimg = res;
                   this.showLoader = false
                    if (this.deleteimg.status == true) {
                        this.rt.navigateByUrl('/shared/contact-us', {
                            skipLocationChange: true
                        }).then(() =>
                            this.rt.navigate(["user/edit-profile"]));
                        Swal.fire({
                            text: "Image Deleted Succesfully",
                            type: "success"
                        })
                    }

                })
            }
        })
    }
    onVideo() {

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
                     this.showLoader = false;
                    if (this.deletevideo.status == true) {
                        this.rt.navigateByUrl('/shared/contact-us', {
                            skipLocationChange: true
                        }).then(() =>
                            this.rt.navigate(["user/edit-profile"]));
                        Swal.fire({
                            text: "Video Deleted Succesfully",
                            type: "success"
                        })
                    }

                })
            }
        })
    }

    onDoc() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete your resume ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.showLoader = true;
                this.doc = JSON.stringify({
                    doc_id: this.data[0].resume_file_id
                });

                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                }
                this.http.post(this.api + "/deletedoc", this.doc, httpOptions).subscribe(res => {
                    this.deletedoc = res;
                    this.showLoader = false;
                    if (this.deletedoc.status == true) {
                        this.rt.navigateByUrl('/shared/contact-us', {
                            skipLocationChange: true
                        }).then(() =>
                            this.rt.navigate(["user/edit-profile"]));
                        Swal.fire({
                            text: "Document Deleted Succesfully",
                            type: "success"
                        })
                    }

                });
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
        //this.filesToUpload1 = < Array < File >> fileInput.target.files;
        this.filesToUpload1 = < Array < File >> fileInput.target.files;
        //this.product.photo = fileInput.target.files[0]['name'];
    }
    document(fileInput: any) {
        this.filesToUpload2 = < Array < File >> fileInput.target.files;
        //this.product.photo = fileInput.target.files[0]['name'];
    }
    onUpload() {
          $('#postModal').hide()
        this.showLoader = true;


        if (this.filesToUpload.length === 0) {
            this.showLoader = false;
            Swal.fire({
                text: "Please select file to upload",
                type: "error"
            })
            return false;
        } else {
            var array = this.filesToUpload[0].name.split('.');
            //console.log(array[array.length - 1]);
            if (array[array.length - 1] != 'png' && array[array.length - 1] != 'jpg' && array[array.length - 1] != 'jpeg' && array[array.length - 1] != 'gif') {
                this.showLoader = false;
                Swal.fire({
                    text: "This file type not allowed, please upload png, jpeg, jpg, gif",
                    type: "error"
                });
                return false;
            }
        }



        const formData: any = new FormData();
        const files: Array < File > = this.filesToUpload;

        for (let i = 0; i < files.length; i++) {
            formData.append("uploads[]", files[i], files[i]['name']);
        }
 

         var image_name= this.filesToUpload[0].name
         // var check_value = image_name.split('.');

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

        this.http.post(this.api + '/uploadupdate1', {imag:this.croppedImage,image_name:image_name,image_size:image_size})
            // .map(files =>  JSON.stringify(files))
            .subscribe(res => {
            setTimeout(()=>{
                    
                
                this.data1 = res
                if (this.data1.status == true) {

                    this.rt.navigateByUrl('/shared/contact-us', {
                        skipLocationChange: true
                    }).then(() =>
                        this.rt.navigate(["user/edit-profile"]));

                    Swal.fire({
                        text: "Image Updated  Succesfully",
                        type: "success"
                    })
                } else {
                    this.showLoader = false;
                    Swal.fire({
                        text: "Please select file to update",
                        type: "error"
                    })
                }
                },3000)
            })

    }
    onUpload1() {
        this.showLoader = true;
        if (this.filesToUpload1.length === 0) {
            this.showLoader = false;
            Swal.fire({
                text: "Please select file to upload",
                type: "error"
            })
            return false;
        }else if(this.filesToUpload1[0].size >= 20000000){
   this.showLoader = false;
    Swal.fire({text:"Please select a video less than 20MB",type:"error"})
    return false;
  }
        // } else {
        //     var array = this.filesToUpload1[0].name.split('.');

        //     if (array[array.length - 1] != 'mp4' && array[array.length - 1] != 'mkv' && array[array.length - 1] != 'avi' && array[array.length - 1] != 'mov') {
        //         this.showLoader = false;
        //         Swal.fire({
        //             text: "This file type not allowed, please upload mp4, mkv, avi, mov",
        //             type: "error"
        //         });
        //         return false;
        //     }
        // }




        const formData: any = new FormData();
        const files: Array < File > = this.filesToUpload1;

        for (let i = 0; i < files.length; i++) {
            formData.append("uploads[]", files[i], files[i]['name']);
        } 
        // console.log("hello",formData)
      
        this.http.post(this.api + '/videoupdate1', formData)
            /* .map(files =>  JSON.stringify(files))*/
            .subscribe(res => {
                  console.log(res)
                this.videores = res
                // this.user.post("remove_video",{video_name:this.videores.image+'.mov'}).subscribe(res=>{
                //     console.log("res--",res)
                // })
                if (this.videores.status == true) {
                     setTimeout(()=>{
                    this.showLoader = false;
                    this.rt.navigateByUrl('/shared/contact-us', {
                        skipLocationChange: true
                    }).then(() =>
                        this.rt.navigate(["user/edit-profile"]));
                    Swal.fire({
                        text: "Video Updated  Succesfully",
                        type: "success"
                    })
                     },4000)
                } else {
                    this.showLoader = false;

                    Swal.fire({
                        text: "Please select file to update ",
                        type: "error"
                    })
                }
            })

    }
    onUpload2() {
        this.showLoader = true;
        if (this.filesToUpload2.length === 0) {
            this.showLoader = false;
            Swal.fire({
                text: "Please select file to upload",
                type: "error"
            })
            return false;
        } else {
            var array = this.filesToUpload2[0].name.split('.');
            if (array[array.length - 1] != 'doc' && array[array.length - 1] != 'docx' && array[array.length - 1] != 'pdf') {
                this.showLoader = false;
                Swal.fire({
                    text: "This file type not allowed, please upload doc, docx, pdf",
                    type: "error"
                });
                return false;
            }
        }


        const formData: any = new FormData();
        const files: Array < File > = this.filesToUpload2;

        for (let i = 0; i < files.length; i++) {
            formData.append("uploads[]", files[i], files[i]['name']);
        }
        this.http.post(this.api + '/documentupdate', formData)
            /* .map(files =>  JSON.stringify(files))*/
            .subscribe(res => {

                this.docres = res
                if (this.docres.status == true) {
                    this.ngOnInit()
                    this.rt.navigateByUrl('/shared/contact-us', {
                        skipLocationChange: true
                    }).then(() =>
                        this.rt.navigate(["user/edit-profile"]));
                    Swal.fire({
                        text: "Document Updated  Succesfully",
                        type: "success"
                    })
                } else {
                    this.showLoader = false;

                    Swal.fire({
                        text: "Please select file to update",
                        type: "error"
                    })
                }
            })

    }

    Deactivate() {

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
                this.http.get(this.api + '/deactivate').subscribe(res => {
                    this.deactivate_status = res
                    // console.log("daective",this.deactivate_status)
                    if (this.deactivate_status.status == true) {
                        this.user.logout().subscribe(data => {

                            this.status = data
                            // console.log(this.status.status)
                            if (this.status.status == true) {
                                localStorage.removeItem('isLoggedIn');
                                localStorage.removeItem('token');
                                Swal.fire({
                                    text: "Account deactivated Succesfully",
                                    type: "success"
                                })
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
    onSubmitExperience1() {

        this.submitted4 = true;
        if (this.experience1.invalid) {
            Swal.fire({
                text: "Please enter the required field",
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
        this.http.post(this.userapi + "/updateexperience", this.experience1.value, httpOptions).subscribe(res => {
            this.updateexp = res;
            if (this.updateexp.status == true) {
                this.ngOnInit()
                this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["user/edit-profile"]));
                Swal.fire({
                    text: "Experience Updated Successfully",
                    type: "success"
                })


            } else {
                this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["user/edit-profile"]));
                Swal.fire({
                    text: " Updation Failed",
                    type: "warning"
                })



            }
        })

    }
    deleteExperience(i) {
        this.delete_id = this.expdata[i].id
        this.showLoader = true;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.userapi + "/deleteexperience", {
            id: this.delete_id
        }, httpOptions).subscribe(res => {
            this.deleteexp = res;
            if (this.deleteexp.status == true) {
                this.ngOnInit()
                this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["user/edit-profile"]));
                Swal.fire({
                    text: "Experience Deleted Successfully",
                    type: "success"
                })


            } else {
                this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["user/edit-profile"]));
                Swal.fire({
                    text: " Deletion Failed",
                    type: "error"
                })



            }
        })

    }

    onSubmitEducation1() {
        this.submitted5 = true;
        if (this.education1.invalid) {
            Swal.fire({
                text: "Please enter the required field",
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
        this.http.post(this.userapi + "/Editeducation", this.education1.value, httpOptions).subscribe(res => {
            this.updateedu = res;
            if (this.updateedu.status == true) {
                this.ngOnInit()
                this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["user/edit-profile"]));
                Swal.fire({
                    text: "Experience Updated Successfully",
                    type: "success"
                })


            } else {
                this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["user/edit-profile"]));
                Swal.fire({
                    text: " Updation Failed",
                    type: "warning"
                })



            }
        })
    }

    deleteEducation(i) {
        this.deleteid = this.edudata[i].id;
        this.showLoader = true;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.userapi + "/deleteeducation", {
            id: this.deleteid
        }, httpOptions).subscribe(res => {
            this.deleteedu = res;
            if (this.deleteedu.status == true) {
                this.ngOnInit()
                this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["user/edit-profile"]));
                Swal.fire({
                    text: "Education Deleted Successfully",
                    type: "success"
                })


            } else {
                this.rt.navigateByUrl('/shared/contact-us', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["user/edit-profile"]));
                Swal.fire({
                    text: " Deletion Failed",
                    type: "error"
                })



            }
        })
    }

    removeskills(value) {
        // console.log("id=========>",value)
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete your skills ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.showLoader = true;
                this.skillid = value

                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                }
                this.http.post(this.userapi + "/removeskills", {
                    id: this.skillid
                }, httpOptions).subscribe(res => {
                    this.deleteimg = res;
                    if (this.deleteimg.status == true) {
                        this.rt.navigateByUrl('/shared/contact-us', {
                            skipLocationChange: true
                        }).then(() =>
                            this.rt.navigate(["user/edit-profile"]));
                        Swal.fire({
                            text: "Skills Deleted Succesfully",
                            type: "success"
                        })
                    }

                })
            }
        })
    }

    myFunctionResume() {
     // this.showLoader=true
     
     // var array = this.pdfSrc.split('.');
           
     //        if(array[array.length - 1] == 'pdf'){
     //    this.user.fileExists(this.pdfSrc).subscribe( res => {
     //        this.common = res;
     //        if (this.common.status == true) {
     //            setTimeout(()=>{
     //                this.showLoader = false;
     //                this.pdfSrcs = this.media_url + "/uploads/resume/" + this.data[0].resume_name;
     //                window.open(this.pdfSrcs,'_blank')
     //            },6000)
     //        }
     //        else
     //        {this.showLoader = false;
     //            Swal.fire({text : "File not found", type : "error"});
     //            return false;
     //        }
     //    });
        
     //     }
     //     else{
     //        this.user.fileExists(this.pdfSrc).subscribe( res => {
     //        this.common = res;
     //        if (this.common.status == true) {
     //                 setTimeout(()=>{
     //                this.showLoader = false;
     //                this.pdfSrcs = this.media_url + "/uploads/resume/" + this.data[0].resume_name;
     //                window.open(this.pdfSrcs,'_blank')
     //            },2000)
                
     //        }
     //        else
     //        {this.showLoader = false;
     //            Swal.fire({text : "File not found", type : "error"});
     //            return false;
     //        }
     //    });

     //     }   

     this.pdfSrcs = this.media_url + "/uploads/resume/" + this.data[0].resume_name;
               window.open(this.pdfSrcs, '_blank');
            
     }
      public closeModalFunction(): void {
            this.upload_set_default =0

          this.crop_image_status=0
      $('#postModalResume').hide();
       $('#postModal').hide()
        document.body.style.overflow = "initial";
        this.imageChangedEvent=''
        this.filesToUpload=[]
    }
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

    Check_picture(){
    this.user.fileExists("src/assets/"+this.pic_path).subscribe(res => {
            this.common = res;
             this.file_status=this.common.status
        });
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
}

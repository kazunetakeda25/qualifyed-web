import { Component, OnInit } from '@angular/core';
import {FormGroup , FormControl ,FormBuilder,Validators} from '@angular/forms';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router'
import * as myGlobals from './../../global';
import Swal from 'sweetalert2'
import $ from 'jquery';
import { DatePipe } from '@angular/common'
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipsModule} from '@angular/material/chips';
import {MatChipInputEvent} from '@angular/material';
import {MatAutocompleteSelectedEvent,  MatAutocomplete} from '@angular/material';
import { ElementRef, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {UserService} from './../../user.service';
import {AngularEditorModule ,AngularEditorConfig } from '@kolkov/angular-editor';
import 'moment';
import * as _moment from 'moment-timezone';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
const moment = (_moment as any).default ? (_moment as any).default : _moment;
export const MY_CUSTOM_FORMATS = {
    parseInput: 'LL LT',
    fullPickerInput: 'LL LT',
    datePickerInput: 'LL',
    timePickerInput: 'LT',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
};
@Component({
     selector: 'app-opportunities-bussiness',
  templateUrl: './opportunities-bussiness.component.html',
  styleUrls: ['./opportunities-bussiness.component.css'],
  providers: [
        {provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE]},
        {provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS},
    ],
})
export class OpportunitiesBussinessComponent implements OnInit {
     public dateTime = new moment();
     showDate:number=0;
       hide:number=1
    minDate = new Date();
    country: any;
    common : any;
    api = myGlobals.api_url;
    server_name = myGlobals.server_name;
   media_url = myGlobals.media_url;
    state: any;
    resopp:any;
    showLoader=false;
    interReq: any = 0;
    day_count: any = [];
    userD : any;
    Reschedule_user_2: any = [];
    userapi = myGlobals.userapi_url;
    day_count_acc: any = [];
    BusinessOpportunity: any;
    OpportunityRescheduleForm: any;
    OpportunityAccept: any;
    submitted = false;
    removable = true;
    day_count_1 = [];
    userData: any;
    title:any
    tab1 = true;
    day_count_acc_final_2: any = [];
    lat : any = 0;
    lon : any = 0;
    day_count_acc_final: any = [];
    Reschedule_user: any = [];
    day_count_dec_final: any = [];
    day_count_dec_final_2: any = [];
    allOppcount = 0;
    tab2 = false;
    inactiveOpp: any;
    OPPNAME: any = '';
    tab3 = false;
    fruitCtrl = new FormControl();
    filteredFruits: Observable < string[] > ;
    fruits: any = [];
    allFruits: any = [];
    default: any = 231;
    opp: any;
    addOnBlur = true;
    activeOpp: any;
    acceptData: any = {};
    minDate1 =  new Date(); 
    required=1; 
    contact_email_required:number=0;
contact_phone_required:number=0;
show_invalid_email:number=0;
contact_phone_required_minlength:number=0;
contact_phone_required_maxlength:number=0;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    @ViewChild('fruitInput') fruitInput: ElementRef < HTMLInputElement > ;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
  date_time:any=''

    constructor(private fb: FormBuilder, private http: HttpClient, private rt: Router,public datepipe: DatePipe,private user:UserService) {
        this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice())
        );
    }

    editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '10rem',
    placeholder: 'Enter text here...',
    translate: 'no',
  };

    ngOnInit() {

        this.http.get('https://ipinfo.io').subscribe(res => {
          var common : any
          common = res;
          var location = common.loc;
          var location_array = location.split(',');
          this.lat = location_array[0];
          this.lon = location_array[1];
        })

        this.user.post("opportunity/dashCount_opp",{userid:localStorage.getItem('id')}).subscribe(res => {
            this.interReq = res;
            this.interReq = this.interReq[0].count;
        });



        this.OpportunityAccept = this.fb.group({
            additional_details_box: ['',Validators.maxLength(300)],
            interview_type:['',Validators.required]
        })

        this.OpportunityRescheduleForm = this.fb.group({
            comment: ['', [Validators.required, Validators.maxLength(300)]],
        });

        var element = document.getElementById("mainBody");
        element.classList.remove("has-main-navi--fully-opened");
        this.GetOpp();
        this.http.get(this.userapi + "/getSkills").subscribe(res => {
            this.common = res;
            for (var i = 0; i < this.common.length; ++i) {
                this.allFruits[i] = res[i].name;
            }

        })

    }

    declineRequest(id, intReq, oppId,type) {
        Swal.fire({
            title: 'Reason for decline (Optional)',
            input: 'textarea',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Decline',
            showLoaderOnConfirm: true,
        }).then((result) => {
            var notes = "";
            if (result.value) {
                notes = result.value;
            }

            if (!result.dismiss) {

                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                }
                this.showLoader=true
                this.http.post(this.api + "/opportunity/declineRequestInt", {
                    user_id: id,
                    intReq: intReq,
                    oppId: oppId,
                    notes: notes,
                    inter_type:type
                }, httpOptions).subscribe(res => {
                    this.showLoader=false
                    this.opp = res;
                    if (this.opp.status == true) {
                        Swal.fire({
                            title: "DECLINED",
                            html: "User interview request declined successfully",
                            type: "success"
                        })
                    } else {
                        Swal.fire({
                            title: "FAILED",
                            html: "User interview request declined failed",
                            type: "error"
                        });
                    }
                    this.rt.navigateByUrl('/shared/contact-us', {
                        skipLocationChange: true
                    }).then(() =>
                        this.rt.navigate(["bussiness/opportunities"]));
                });
            }
        })

        return false;
    }


    acceptRequest(id, oppId, user_id) {
        this.userD = user_id;
        this.acceptData = {
            id: id,
            opp: oppId,
            user_id: user_id
        }




        var user_pop_listing = document.getElementById('user_request_popup_date');
        var user_pop_listing_close = document.getElementById('user_pop_listing_close_date');
        var user_pop_listing_close2 = document.getElementById('user_pop_listing_close_date2');

        user_pop_listing.style.visibility = "visible";
        user_pop_listing.style.top = "0";
        user_pop_listing.style.height = "auto";

        user_pop_listing_close.onclick = function(evenet) {
            user_pop_listing.style.visibility = "hidden";
            user_pop_listing.style.top = "-100%";
            user_pop_listing.style.height = "0";

        }
        user_pop_listing_close2.onclick = function(evenet) {
            user_pop_listing.style.visibility = "hidden";
            user_pop_listing.style.top = "-100%";
            user_pop_listing.style.height = "0";
        }

        window.onclick = function(event) {
            if (event.target == user_pop_listing) {
                user_pop_listing.style.visibility = "hidden";
                user_pop_listing.style.top = "-100%";
                user_pop_listing.style.height = "0";
            }
        }
        return false;

    }

    get oppErr() {
        return this.BusinessOpportunity.controls;
    }
    get oppErrSubmit() {
        return this.OpportunityAccept.controls;
    }
    get resErrSubmit() {
        return this.OpportunityRescheduleForm.controls;
    }

    GetOpp() {
        this.tab1 = true;
        this.tab2 = false;
        this.tab3 = false;
        this.user.post("opportunity/getAllOpp",{userid:localStorage.getItem('id')}).subscribe(res => {
            this.activeOpp = res;
            this.allOppcount = this.activeOpp.length
        });
        this.user.post("opportunity/getAllDecOpp",{userid:localStorage.getItem('id')}).subscribe(res => {
            this.inactiveOpp = res;
            this.allOppcount += this.inactiveOpp.length;
        });
    }

    createOpp() {
        this.tab1 = false;
        this.tab2 = true;
        this.tab3 = false;

        this.BusinessOpportunity = this.fb.group({
            post_title: ['', [Validators.required, Validators.maxLength(50)]],
            country: ['', [Validators.required]],
            state: ['', [Validators.required]],
            city: ['', [Validators.required, Validators.maxLength(20)]],
            address_line: ['', [Validators.required, Validators.maxLength(50)]],
            zipcode: ['', [Validators.required, Validators.maxLength(50)]],
            longevity: ['', [Validators.required]],
            opportunity_days: [''],
            day_type: [''],
            opp_employee: ['', [Validators.required]],
            opp_pay: ['', [Validators.required]],
            tuition: ['',[Validators.required]],
            prefrences: [''],
            discription: [''],
            skills: [''],
            is_published : [''],
            contact_email:[''],
             contact_phone:['',],
             cc:['',]
        })

        this.http.get(this.api + "/country").subscribe(res => {
            this.country = res;
            this.BusinessOpportunity.controls['country'].setValue(this.default, {
                onlySelf: true
            });
        });
        this.user.post('setting/getAllcountry',{userid:localStorage.getItem('id')}).subscribe(res => {
      this.country= res;
             this.BusinessOpportunity.controls['cc'].setValue(231, {onlySelf: true});

    });

        this.http.get(this.api + "/opportunity/getBusinessData").subscribe(res => {
            this.userData = res;
            this.BusinessOpportunity.controls['country'].setValue(this.userData[0].country_id, {
                onlySelf: true
            });
            this.BusinessOpportunity.controls['city'].setValue(this.userData[0].city, {
                onlySelf: true
            });
          /*  this.BusinessOpportunity.controls['day_type'].setValue(0, {
                onlySelf: true
            });*/

            this.BusinessOpportunity.controls['is_published'].setValue(1, {
                onlySelf: true
            });
            
            // this.BusinessOpportunity.controls['opportunity_days'].setValue(1, {
            //     onlySelf: true
            // });
            this.BusinessOpportunity.controls['zipcode'].setValue(this.userData[0].zipcode, {
                onlySelf: true
            });
            this.getState( 'a:'+ this.userData[0].country_id);
            this.BusinessOpportunity.controls['state'].setValue(this.userData[0].state_id, {
                onlySelf: true
            });
        });

        for (var i = 1; i <= 100; ++i) {
            this.day_count_1[i - 1] = i;
        }
    }

    getRequest() {
        this.tab1 = false;
        this.tab2 = false;
        this.tab3 = true;
        this.interReq = 0;

        this.user.post("opportunity/getAllOpp",{userid:localStorage.getItem('id')}).subscribe(res => {
            this.activeOpp = res;
            console.log("hh",this.activeOpp)
            for (var i = 0; i < this.activeOpp.length; ++i) {
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                }
                this.http.post(this.api + "/opportunity/getInterReq", {
                    id: this.activeOpp[i].id,
                    cout: i
                }, httpOptions).subscribe(res => {
                    this.day_count = res;
                    if (this.day_count.length > 0) {
                        this.activeOpp[this.day_count[0].cout].count = this.day_count.length;
                        this.interReq += this.day_count.length;
                    }
                });
            }
        });
    }

    activeModal(id, name) {
        this.title=name; 
        this.day_count = [];
        this.day_count_acc = [];
        this.day_count_dec_final = [];
        this.day_count_dec_final_2 = [];
        this.day_count_acc_final_2 = [];
        this.day_count_acc_final = [];
        this.Reschedule_user_2 = [];
        this.Reschedule_user = [];
        this.OPPNAME = name;

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.api + "/opportunity/getInterReq", {
            id: id,
            cout: 0
        }, httpOptions).subscribe(res => {
            this.day_count = res;
        });

        this.http.post(this.api + "/opportunity/getInterReqAcc", {
            id: id,
            cout: 0
        }, httpOptions).subscribe(res => {

            this.day_count_acc = res;

            if (this.day_count_acc.length > 0) {
                for (var i = 0; i < this.day_count_acc.length; ++i) {

                        this.day_count_acc[i].interview_datetime=moment.tz(this.day_count_acc[i].interview_datetime,'YYYY-MM-DD HHmm',moment.tz.guess()).format('LLLL');
                    if (this.day_count_acc[i].request_status == 2 || this.day_count_acc[i].request_status == 7) {
                        console.log(this.day_count_acc[i]);
                        this.day_count_acc_final.push(this.day_count_acc[i]);
                    } else if (this.day_count_acc[i].request_status == 4 ) {
                        this.day_count_acc_final_2.push(this.day_count_acc[i]);

                    }
                }
            }
        });

        this.http.post(this.api + "/opportunity/getInterReqDec", {
            id: id,
            cout: 0
        }, httpOptions).subscribe(res => {

            this.day_count_acc = res;

            if (this.day_count_acc.length > 0) {
                for (var i = 0; i < this.day_count_acc.length; ++i) {
                  if(this.day_count_acc[i].request_status == 3)
                  {
                    this.day_count_dec_final.push(this.day_count_acc[i]);
                  }else{
                    this.day_count_dec_final_2.push(this.day_count_acc[i]);
                  }
                }
            }
        });

        this.http.post(this.api + "/opportunity/getInterScheduleReq", {
            id: id,
            cout: 0
        }, httpOptions).subscribe(res => {
            this.day_count_acc = res;
            for (var i = 0; i < this.day_count_acc.length; ++i) {
                if(this.day_count_acc[i].request_status == 5)
                {
                     this.Reschedule_user.push(this.day_count_acc[i])   
                     console.log("suraj",this.Reschedule_user)
                }else{
                     this.Reschedule_user_2.push(this.day_count_acc[i])   
                }
            }
        });




        this.modalTabOPen("PR");
        var user_pop_listing = document.getElementById('user_request_popup');
        var user_pop_listing_close = document.getElementById('user_pop_listing_close');

        user_pop_listing.style.visibility = "visible";
        user_pop_listing.style.top = "0";
        user_pop_listing.style.height = "auto";

        user_pop_listing_close.onclick = function(evenet) {
            user_pop_listing.style.visibility = "hidden";
            user_pop_listing.style.top = "-100%";
            user_pop_listing.style.height = "0";
        }

        window.onclick = function(event) {
            if (event.target == user_pop_listing) {
                user_pop_listing.style.visibility = "hidden";
                user_pop_listing.style.top = "-100%";
                user_pop_listing.style.height = "0";
            }
        }
        return false;
    }


    InactiveOpp(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to deactive this opportunity",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, deactivate it!'
        }).then((result) => {
            if (result.value) {
                // alert(id);

                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                }
                this.showLoader=true
                this.http.post(this.api + "/opportunity/deactiveOpp", {
                    id: id
                }, httpOptions).subscribe(res => {
                    this.opp = res;
                    this.showLoader=false
                    if (this.opp.status == true) {
                        Swal.fire({
                            title: "STATUS CHANGED",
                            html: "Opportunity status changed successfully",
                            type: "success"
                        })
                    } else {
                        Swal.fire({
                            title: "FAILED",
                            html: "Something went wrong , please try again later",
                            type: "error"
                        });
                    }
                    this.rt.navigateByUrl('/shared/contact-us', {
                        skipLocationChange: true
                    }).then(() =>
                        this.rt.navigate(["bussiness/opportunities"]));
                });




                return false;

            }
        })

        return false;
    }


    activeOppfun(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to reactivate this opportunity",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reactivate it!'
        }).then((result) => {
            if (result.value) {


                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                }
                this.http.post(this.api + "/opportunity/activeOppFun", {
                    id: id
                }, httpOptions).subscribe(res => {
                    this.opp = res;

                    if (this.opp.status == true) {
                        Swal.fire({
                            title: "STATUS CHANGED",
                            html: "Opportunity status changed successfully",
                            type: "success"
                        })
                    } else {
                        Swal.fire({
                            title: "FAILED",
                            html: "Something went wrong , please try again later",
                            type: "error"
                        });
                    }
                    this.rt.navigateByUrl('/shared/contact-us', {
                        skipLocationChange: true
                    }).then(() =>
                        this.rt.navigate(["bussiness/opportunities"]));
                });




                return false;

            }
        })

        return false;
    }


    showMeTab(id) {
        document.getElementById('ac').classList.remove('active_tab_nav');
        document.getElementById('ac_T').classList.remove('active_tab_content');
        document.getElementById('iac').classList.remove('active_tab_nav');
        document.getElementById('iac_T').classList.remove('active_tab_content');

        var element = document.getElementById(String(id));
        element.classList.add('active_tab_nav');

        var element = document.getElementById(String(id + '_T'));
        element.classList.add('active_tab_content');
    }

    modalTabOPen(id) {
        document.getElementById('PR').classList.remove('active_tab_nav2');
        document.getElementById('AR').classList.remove('active_tab_nav2');
        document.getElementById('RR').classList.remove('active_tab_nav2');
        document.getElementById('DR').classList.remove('active_tab_nav2');
        for (var i = 0; i < document.getElementsByClassName('displayNone').length; ++i) {
            document.getElementsByClassName('displayNone')[i].classList.remove('active_tab_con');
        }

        var element = document.getElementById(String(id));
        element.classList.add('active_tab_nav2');

        for (var i = 0; i < document.getElementsByClassName(String(id + '_T')).length; ++i) {
            document.getElementsByClassName(String(id + '_T'))[i].classList.add('active_tab_con');
        }
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


    // remove(fruit, indx): void {
    //     this.fruits.splice(indx, 1);
    // }

    // selected(event: MatAutocompleteSelectedEvent): void {

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

    getState(co_id) {
        console.log("ppp",co_id.split(":")[1])
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.api + "/city", {
            country_id: co_id.split(":")[1]
        }, httpOptions).subscribe(res => {
            this.state = res;
            console.log("------",res);
        });
    }

    opportunitySubmit() {
        this.showLoader=true
        this.submitted = true;

         if(this.BusinessOpportunity.value.longevity == 0 && this.BusinessOpportunity.value.opportunity_days == '' && this.BusinessOpportunity.value.day_type == ''){
             this.showLoader=false
            Swal.fire({
                title: "ERROR",
                html: "Please Enter  Duration of Opportunity",
                type: "error"
            }).then(function() {
                $('html, body').animate({
                    scrollTop: $("#abc").offset().top
                }, 500);
            });
            return;

        }
else if(this.BusinessOpportunity.value.longevity == 0 && this.BusinessOpportunity.value.opportunity_days == '' && this.BusinessOpportunity.value.day_type != ''){
                    this.showLoader=false
                   Swal.fire({
                title: "ERROR",
                html: "Please Enter  Duration of Opportunity",
                type: "error"
            }).then(function() {
                $('html, body').animate({
                    scrollTop: $("#abc").offset().top
                }, 500);
            });
            return;
            }
                 else if(this.BusinessOpportunity.value.longevity == 0 && this.BusinessOpportunity.value.opportunity_days != '' && this.BusinessOpportunity.value.day_type == ''){
                    this.showLoader=false
                    Swal.fire({
                title: "ERROR",
                html: "Please Enter  Duration of Opportunity",
                type: "error"
            }).then(function() {
                $('html, body').animate({
                    scrollTop: $("#abc").offset().top
                }, 500);
            });
            return;
            }
        if (this.BusinessOpportunity.invalid) {
             this.showLoader=false
             Swal.fire({
                title: "ERROR",
                html: "Please enter all required fields",
                type: "error"
            }).then(function() {
                $('html, body').animate({
                    scrollTop: $("#abc").offset().top
                }, 500);
            });
            return;
        }
         if(this.BusinessOpportunity.value.contact_email=='' && this.BusinessOpportunity.value.contact_phone==''){
          this.contact_email_required = 1;
          this.contact_phone_required = 1;
            this.showLoader=false
           Swal.fire({
                title: "ERROR",
                html: "Please enter all required fields",
                type: "error"
            }).then(function() {
                $('html, body').animate({
                    scrollTop: $("#abc").offset().top
                }, 500);
            });
            return;
        }
          if(this.BusinessOpportunity.value.contact_email != ''){
             this.contact_phone_required=0
              this.contact_phone_required_minlength=0;
                this.contact_phone_required_maxlength=0;
          // this.contact_email_required = 1;
          var check_email=this.BusinessOpportunity.value.contact_email;
          var res=check_email.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/)
          if(res == null && check_email != '')
          {
               this.contact_email_required=0;
             this.show_invalid_email=1;
              this.showLoader=false
             Swal.fire({
                title: "ERROR",
                html: "Please enter all required fields",
                type: "error"
            }).then(function() {
                $('html, body').animate({
                    scrollTop: $("#abc").offset().top
                }, 500);
            });
            return false;
            }else{
                this.contact_email_required=0;
             this.show_invalid_email=0;
             this.contact_phone_required=0
            }
          
        }
         if(this.BusinessOpportunity.value.contact_phone != ''){
            this.contact_email_required=0;
             this.show_invalid_email=0;
          var check_phone=this.BusinessOpportunity.value.contact_phone.length;
         
          if(check_phone > 15)
          {    
               this.contact_phone_required_maxlength=1;
               this.contact_phone_required_minlength=0;
               this.contact_phone_required=0
             this.show_invalid_email=0;
              this.showLoader=false
             Swal.fire({
                title: "ERROR",
                html: "Please enter all required fields",
                type: "error"
            }).then(function() {
                $('html, body').animate({
                    scrollTop: $("#abc").offset().top
                }, 500);
            });
            return false;
            }
            else if(check_phone < 5)
          {    
               this.contact_phone_required_minlength=1;
                this.contact_phone_required_maxlength=0;
               this.contact_phone_required=0
             this.show_invalid_email=0;
             this.showLoader=false
             Swal.fire({
                title: "ERROR",
                html: "Please enter all required fields",
                type: "error"
            }).then(function() {
                $('html, body').animate({
                    scrollTop: $("#abc").offset().top
                }, 500);
            });
            return false;
            }
          
        }
        
         
         
        this.BusinessOpportunity.value.skills = this.fruits;
        this.BusinessOpportunity.value.user_login_id = localStorage.getItem('id');

        // this.user.post("/opportunity/get_phone_code",{c_id:this.BusinessOpportunity.value.country}).subscribe(res=>{
            
         if(this.BusinessOpportunity.value.contact_phone != ''){
            
            this.BusinessOpportunity.value.contact_phone='+1'+this.BusinessOpportunity.value.contact_phone
        }

        this.BusinessOpportunity.value.lat = this.lat;
        this.BusinessOpportunity.value.lon = this.lon;
        
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.api + "/opportunity", this.BusinessOpportunity.value, httpOptions).subscribe(res => {
            this.opp = res;
            if (this.opp.status == true) {
                this.showLoader=false
                Swal.fire({
                    title: "Success",
                    html: "Opportunity created successfully",
                    type: "success"
                })
            } else {
                 this.showLoader=false
                Swal.fire({
                    title: "FAILED",
                    html: "Opportunity creation failed",
                    type: "error"
                });
            }
            this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["bussiness/opportunities"]));
            // this.state = res;
        });
    // });
    }
o(i){
    this.showDate=2
    this.hide=0
    this.date_time=_moment(i._d).format('lll')


}
show_datepicker(){
  this.showDate=0
}
    // acceptOppSubmit() {
    //     console.log("====",this.OpportunityAccept.value)
    //     this.submitted = true;

    //     if (this.OpportunityAccept.invalid) {
    //         Swal.fire({
    //             title: "ERROR",
    //             html: "Please fill all required details",
    //             type: "error"
    //         });
    //         return;
    //     }
    //     this.acceptData.date_time = this.OpportunityAccept.value;
    //      var dateToSave = new Date(this.acceptData.date_time.date_time).getFullYear()+"-"+(new Date(this.acceptData.date_time.date_time).getMonth()+1)+"-"+new Date(this.acceptData.date_time.date_time).getDate()+" "+new Date(this.acceptData.date_time.date_time).getHours()+":"+new Date(this.acceptData.date_time.date_time).getMinutes()+":00";
    //       this.acceptData.date_time.date_time=dateToSave
     
    //     const httpOptions = {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json'
    //         })
    //     }
    //     this.http.post(this.api + "/opportunity/acceptInterviewRequest", this.acceptData, httpOptions).subscribe(res => {
    //         this.opp = res;
    //         if (this.opp.status == true) {
    //             console.log("ddd",this.acceptData)
    //             this.user.post("/opportunity/get_personal_info",{op_id:this.acceptData.opp}).subscribe(res=>{
    //                 console.log('res====',res)
    //             this.acceptNotification(this.userD, dateToSave,this.acceptData.date_time.additional_details_box,res[0],{extraData : this.acceptData});
    //             })
    //             Swal.fire({
    //                 title: "ACCEPTED SUCCESSFULLY",
    //                 html: "Interview request accepted successfully",
    //                 type: "success"
    //             })
    //         } else {
    //             Swal.fire({
    //                 title: "FAILED",
    //                 html: "Opportunity creation failed",
    //                 type: "error"
    //             });
    //         }
    //         this.rt.navigateByUrl('/shared/contact-us', {
    //             skipLocationChange: true
    //         }).then(() =>
    //             this.rt.navigate(["bussiness/opportunities"]));
    //     })
    // }
    acceptOppSubmit() {
          this.submitted = true;

        if (this.OpportunityAccept.invalid) {
            Swal.fire({
                title: "ERROR",
                html: "Please fill all required details",
                type: "error"
            });
            return;
        }
        this.acceptData.date_time = this.OpportunityAccept.value;
        console.log("====",this.date_time,'today-------->',moment(new Date()).format('lll')) 
        if(this.date_time == ''){
            Swal.fire({
                    title: "Warning",
                    html: "Please select date",
                    type: "error"
                });
          this.showLoader = false
          return false
        }else if(Date.parse(this.date_time) >= Date.parse(moment(new Date()).format('lll'))){
         this.acceptData.date_time.date_time=this.date_time

      }else{
          Swal.fire({
                    title: "Warning",
                    html: "Selected date should not be less than current date",
                    type: "error"
                });
          return false
      }
        
         var dateToSave = new Date(this.acceptData.date_time.date_time).getFullYear()+"-"+(new Date(this.acceptData.date_time.date_time).getMonth()+1)+"-"+new Date(this.acceptData.date_time.date_time).getDate()+" "+new Date(this.acceptData.date_time.date_time).getHours()+":"+new Date(this.acceptData.date_time.date_time).getMinutes()+":00";
          this.acceptData.date_time.date_time=dateToSave
     
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.api + "/opportunity/acceptInterviewRequest", this.acceptData, httpOptions).subscribe(res => {
            this.opp = res;
            if (this.opp.status == true) {
                console.log("ddd",this.acceptData)
                this.user.post("/opportunity/get_personal_info",{op_id:this.acceptData.opp}).subscribe(res=>{
                    console.log('res====',res)
                this.acceptNotification(this.userD, dateToSave,this.acceptData.date_time.additional_details_box,res[0],{extraData : this.acceptData});
                })
                Swal.fire({
                    title: "ACCEPTED SUCCESSFULLY",
                    html: "Interview request accepted successfully",
                    type: "success"
                })
            } else {
                Swal.fire({
                    title: "FAILED",
                    html: "Opportunity creation failed",
                    type: "error"
                });
            }
            this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["bussiness/opportunities"]));
        })
    }


    acceptRescheduleRequest(id, oppId, userId,type) {

        Swal.fire({
            title: 'Are you sure?',
            text: "Want to accept this time",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Sure'
        }).then((result) => {
            if (result.value) {
              this.user.post("opportunity/reschRequestInt", {
                    user_id: userId,
                    interReqId : id,
                    oppId: oppId,
                    inter_type:type
                }).subscribe(res => {
                    this.resopp = res;
                    console.log('status------------status',res)
                    if (this.resopp.status == true) {
                        Swal.fire({
                            title: "Accepted",
                            html: "User interview request accepted successfully",
                            type: "success"
                        })
                    } else {
                        Swal.fire({
                            title: "FAILED",
                            html: "User interview request acceptation failed",
                            type: "error"
                        });
                    }
                    this.rt.navigateByUrl('/shared/contact-us', {
                        skipLocationChange: true
                    }).then(() =>
                        this.rt.navigate(["bussiness/opportunities"]));
                });

            }
        })
        return false;
    }

    rescheduleAG(userId, id, oppId,type) {
        this.acceptData = {
            id: id,
            opp: oppId,
            user_id: userId,
            inter_type:type
        }




        var user_pop_listing = document.getElementById('reschedule_pop');
        var user_pop_listing_close = document.getElementById('reschedule_pop_close');
        var user_pop_listing_close2 = document.getElementById('reschedule_pop_2');

        user_pop_listing.style.visibility = "visible";
        user_pop_listing.style.top = "0";
        user_pop_listing.style.height = "auto";

        user_pop_listing_close.onclick = function(evenet) {
            user_pop_listing.style.visibility = "hidden";
            user_pop_listing.style.top = "-100%";
            user_pop_listing.style.height = "0";

        }
        user_pop_listing_close2.onclick = function(evenet) {
            user_pop_listing.style.visibility = "hidden";
            user_pop_listing.style.top = "-100%";
            user_pop_listing.style.height = "0";
        }

        window.onclick = function(event) {
            if (event.target == user_pop_listing) {
                user_pop_listing.style.visibility = "hidden";
                user_pop_listing.style.top = "-100%";
                user_pop_listing.style.height = "0";
            }
        }
        return false;
    }

    // RescheduleOppSubmit() {
    //   this.submitted = true;

    //     if (this.OpportunityRescheduleForm.invalid) {
    //         Swal.fire({
    //             title: "ERROR",
    //             html: "Please enter all required fields",
    //             type: "error"
    //         });
    //         return;
    //     }
    //     this.acceptData.date_time = this.OpportunityRescheduleForm.value.date_time;
    //           var dateToSave = new Date(this.acceptData.date_time).getFullYear()+"-"+(new Date(this.acceptData.date_time).getMonth()+1)+"-"+new Date(this.acceptData.date_time).getDate()+" "+new Date(this.acceptData.date_time).getHours()+":"+new Date(this.acceptData.date_time).getMinutes()+":00";
    //       this.acceptData.date_time=dateToSave
    //     this.acceptData.comment = this.OpportunityRescheduleForm.value.comment;
    //     const httpOptions = {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json'
    //         })
    //     }
    //     this.http.post(this.api + "/opportunity/rescheduleAppointmentFromBusiness", this.acceptData, httpOptions).subscribe(res => {
    //         this.opp = res;
    //         if (this.opp.status == true) {
    //             Swal.fire({
    //                 title: "SUCCESS",
    //                 html: "Request send successfully",
    //                 type: "success"
    //             })
    //         } else {
    //             Swal.fire({
    //                 title: "FAILED",
    //                 html: "Something went wrong , please try again later",
    //                 type: "error"
    //             });
    //         }
    //         this.rt.navigateByUrl('/shared/contact-us', {
    //             skipLocationChange: true
    //         }).then(() =>
    //             this.rt.navigate(["bussiness/opportunities"]));
    //     });
    //     return false;
    // }
    RescheduleOppSubmit() {
      this.submitted = true;

        if (this.OpportunityRescheduleForm.invalid) {
            Swal.fire({
                title: "ERROR",
                html: "Please enter all required fields",
                type: "error"
            });
            return;
        }
        // this.acceptData.date_time = this.date_time;
        //           console.warn('this.date_time---------------',this.date_time);
         console.log("====",this.date_time,'today-------->',moment(new Date()).format('lll')) 
         console.log("====",Date.parse(this.date_time) >= Date.parse(moment(new Date()).format('lll'))) 
     if(this.date_time == ''){
            Swal.fire({
                    title: "Warning",
                    html: "Please select date",
                    type: "error"
                });
          this.showLoader = false
          return false
        }else if(Date.parse(this.date_time) >= Date.parse(moment(new Date()).format('lll'))){
          this.acceptData.date_time = this.date_time;
      }else{
          Swal.fire({
                    title: "Warning",
                    html: "Selected date should not be less than current date",
                    type: "error"
                });
          return false
      }
        
         var dateToSave = new Date(this.acceptData.date_time).getFullYear()+"-"+(new Date(this.acceptData.date_time).getMonth()+1)+"-"+new Date(this.acceptData.date_time).getDate()+" "+new Date(this.acceptData.date_time).getHours()+":"+new Date(this.acceptData.date_time).getMinutes()+":00";
          this.acceptData.date_time=dateToSave
        this.acceptData.comment = this.OpportunityRescheduleForm.value.comment;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.api + "/opportunity/rescheduleAppointmentFromBusiness", this.acceptData, httpOptions).subscribe(res => {
            this.opp = res;
            if (this.opp.status == true) {
                Swal.fire({
                    title: "SUCCESS",
                    html: "Request send successfully",
                    type: "success"
                })
            } else {
                Swal.fire({
                    title: "FAILED",
                    html: "Something went wrong , please try again later",
                    type: "error"
                });
            }
            this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["bussiness/opportunities"]));
        });
        return false;
    }
    showdetail(type, userId, id, oppId)
    {

        if(type == 1)
        {
            var data = {
                user_id : userId,
                id : id,
                oppId : oppId,
                status : 4
            }

            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }
            this.http.post(this.api + "/opportunity/getReason", data, httpOptions).subscribe(res => {
                if(res[0].rejection_note != '')
                {
                    Swal.fire({html : "<p><span><b> Reason : </b></span>"+res[0].rejection_note+"<p>"});
                }else{
                    Swal.fire({html : "<p>Sorry, No details found <p>"});
                }
            })

        }
        else if(type == 2)
        {
            var data = {
                user_id : userId,
                id : id,
                oppId : oppId,
                status : 2
            }

            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }
            this.http.post(this.api + "/opportunity/getReason", data, httpOptions).subscribe(res => {
                if(res[0].rejection_note != '')
                {
                    Swal.fire({html : "<p><span><b> Reason : </b></span>"+res[0].rejection_note+"<p><p><span><b> Request time : </b></span>"+this.datepipe.transform(res[0].reschedule_request_date, 'MMM d, y, h: mm a')+"<p>"});
                }else{
                    Swal.fire({html : "<p>Sorry, No details found <p>"});
                }
            })
        }
        return false;    

    }

    acceptNotification(id, data,additional,personal_info, extraData){
       
            this.showLoader=true;
     this.user.post("opportunity/acceptinterviewnotification",{title:this.title,connection_id:id, date : data,additional_details_box:additional,personal_info:personal_info, extraData : extraData}).subscribe(res=>{
             this.showLoader=false;
     })
    }
    closeOpp(id)
    {
        Swal.fire({
          title: 'Are you sure?',
          text: "You want to close this opportunity",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, close it!'
        }).then((result) => {
            if(result.value)
            {
                this.user.post('setting/closeOpp', {id : id}).subscribe(res => {
                    Swal.fire({html : "<p>Opportunity closed successfully</p>", type : "success"});
                    this.ngOnInit();               
                });
            }
        });





        return false;
    }
    click_video(id){
     this.user.send_data(id);        
        this.rt.navigate(['messages']);
    }
    check(value){
       
        if(value == 1){

   this.required=0;
        }else{
            this.required=1;
        }
        
    }

    editOpportunity(id){
      localStorage.setItem('opp_id',id)
       this.rt.navigate(['bussiness/edit-opportunities'])
    }
     keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;

        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    go_profile(id){
        this.rt.navigateByUrl('/shared/contact-us', {
                        skipLocationChange: true
                    }).then(() =>
                        this.rt.navigate(["shared/view_profile/"+id]));
    }
}
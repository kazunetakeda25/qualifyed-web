import { Component, OnInit } from '@angular/core';
import {FormGroup , FormControl ,FormBuilder,Validators} from '@angular/forms';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router'
import * as myGlobals from '../global';
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
import {UserService} from '../user.service';
import {AngularEditorModule ,AngularEditorConfig } from '@kolkov/angular-editor';




@Component({
    selector: 'app-opportunities',
    templateUrl: './opportunities.component.html',
    styleUrls: ['./opportunities.component.css']
})



export class OpportunitiesComponent implements OnInit {
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
    default: any = 101;
    opp: any;
    addOnBlur = true;
    activeOpp: any;
    acceptData: any = {};
    minDate1 =  new Date(); 
    required=1; 

    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    @ViewChild('fruitInput') fruitInput: ElementRef < HTMLInputElement > ;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

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

        this.user.post("opportunity/dashCount",{userid:localStorage.getItem('id')}).subscribe(res => {
            this.interReq = res;
            this.interReq = this.interReq[0].count;
        });
        this.OpportunityAccept = this.fb.group({
            date_time: ['', [Validators.required]],
            interview_type:['',Validators.required]
        })

        this.OpportunityRescheduleForm = this.fb.group({
            date_time: ['', [Validators.required]],
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
                this.http.post(this.api + "/opportunity/declineRequestInt", {
                    user_id: id,
                    intReq: intReq,
                    oppId: oppId,
                    notes: notes,
                    inter_type:type
                }, httpOptions).subscribe(res => {
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
                    this.rt.navigateByUrl('/test', {
                        skipLocationChange: true
                    }).then(() =>
                        this.rt.navigate(["opportunities-business"]));
                });
            }
        })

        return false;
    }


    acceptRequest(id, oppId, user_id) {

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
        this.http.get(this.api + "/opportunity/getAllOpp").subscribe(res => {
            this.activeOpp = res;
            this.allOppcount = this.activeOpp.length
        });
        this.http.get(this.api + "/opportunity/getAllDecOpp").subscribe(res => {
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
            city: ['', [Validators.required, Validators.maxLength(50)]],
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
            is_published : ['']
        })

        this.http.get(this.api + "/country").subscribe(res => {
            this.country = res;
            this.BusinessOpportunity.controls['country'].setValue(this.default, {
                onlySelf: true
            });
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
            this.getState(this.userData[0].country_id);
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

        this.http.get(this.api + "/opportunity/getAllOpp").subscribe(res => {
            this.activeOpp = res;
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

                    if (this.day_count_acc[i].request_status == 2) {

                        this.day_count_acc_final.push(this.day_count_acc[i]);
                    } else if (this.day_count_acc[i].request_status == 4) {
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
                this.http.post(this.api + "/opportunity/deactiveOpp", {
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
                    this.rt.navigateByUrl('/test', {
                        skipLocationChange: true
                    }).then(() =>
                        this.rt.navigate(["opportunities-business"]));
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
                    this.rt.navigateByUrl('/test', {
                        skipLocationChange: true
                    }).then(() =>
                        this.rt.navigate(["opportunities-business"]));
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

    getState(co_id = '') {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.api + "/city", {
            country_id: co_id
        }, httpOptions).subscribe(res => {
            this.state = res;
        });
    }

    opportunitySubmit() {
        this.submitted = true;

        if (this.BusinessOpportunity.invalid) {
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
         else if(this.BusinessOpportunity.value.longevity == 1 && this.BusinessOpportunity.value.opportunity_days == '' && this.BusinessOpportunity.value.day_type == ''){

            Swal.fire({
                title: "ERROR",
                html: "Please enter  Duration of Opportunity",
                type: "error"
            }).then(function() {
                $('html, body').animate({
                    scrollTop: $("#abc").offset().top
                }, 500);
            });
            return;

        }
         else if(this.BusinessOpportunity.value.longevity == 1 && this.BusinessOpportunity.value.opportunity_days == '' && this.BusinessOpportunity.value.day_type != ''){
                   Swal.fire({
                title: "ERROR",
                html: "Please enter  Duration of Opportunity",
                type: "error"
            }).then(function() {
                $('html, body').animate({
                    scrollTop: $("#abc").offset().top
                }, 500);
            });
            return;
            }
                 else if(this.BusinessOpportunity.value.longevity == 1 && this.BusinessOpportunity.value.opportunity_days != '' && this.BusinessOpportunity.value.day_type == ''){
                   Swal.fire({
                title: "ERROR",
                html: "Please enter  Duration of Opportunity",
                type: "error"
            }).then(function() {
                $('html, body').animate({
                    scrollTop: $("#abc").offset().top
                }, 500);
            });
            return;
            }
        this.BusinessOpportunity.value.skills = this.fruits;

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.api + "/opportunity", this.BusinessOpportunity.value, httpOptions).subscribe(res => {
            this.opp = res;
            if (this.opp.status == true) {
                Swal.fire({
                    title: "Success",
                    html: "Opportunity created successfully",
                    type: "success"
                })
            } else {
                Swal.fire({
                    title: "FAILED",
                    html: "Opportunity creation failed",
                    type: "error"
                });
            }
            this.rt.navigateByUrl('/test', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["opportunities-business"]));
            // this.state = res;
        });
    }

    acceptOppSubmit() {
        this.submitted = true;

        if (this.OpportunityAccept.invalid) {
            Swal.fire({
                title: "ERROR",
                html: "Please enter all required fields",
                type: "error"
            });
            return;
        }
        this.acceptData.date_time = this.OpportunityAccept.value;
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
            this.rt.navigateByUrl('/test', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["opportunities-business"]));
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
                    this.rt.navigateByUrl('/test', {
                        skipLocationChange: true
                    }).then(() =>
                        this.rt.navigate(["opportunities-business"]));
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
        this.acceptData.date_time = this.OpportunityRescheduleForm.value.date_time;
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
            this.rt.navigateByUrl('/test', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(["opportunities-business"]));
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

    acceptNotification(id){
            this.showLoader=true;
     this.user.post("opportunity/acceptinterviewnotification",{title:this.title,connection_id:id}).subscribe(res=>{
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
                    Swal.fire({html : "<p>Opportunity close successfully</p>", type : "success"});
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
   this.required=value
    }

    editOpportunity(id){
      localStorage.setItem('opp_id',id)
       this.rt.navigate(['opportunity-edit'])
    }
}
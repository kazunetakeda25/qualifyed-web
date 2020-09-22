
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


@Component({
   selector: 'app-edit-oppportunity',
  templateUrl: './edit-oppportunity.component.html',
  styleUrls: ['./edit-oppportunity.component.css']
})
export class EditOppportunityComponent implements OnInit {
	   minDate = new Date();
    country: any;
    common : any;
    api = myGlobals.api_url;
    userapi = myGlobals.userapi_url;
    server_name = myGlobals.server_name;
    BusinessOpportunity:any;
  fruitCtrl = new FormControl();
    filteredFruits: Observable < string[] > ;
    fruits: any = [];
    allFruits: any = [];
    userData:any;
    day_count_1 = [];
    removable = true;
   default: any = 231;
   state:any;
   submitted=false;
   opp:any;
   data:any;
   check_employement:any;
       isSpecial: any;
       isSpecial_pay: any;
       check_pay:any;
       check_tution:any;
         required=1; 
 contact_email_required:number=0;
contact_phone_required:number=0;
show_invalid_email:number=0;
contact_phone_required_minlength:number=0;
contact_phone_required_maxlength:number=0;
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

      this.createOpp();
  }
   get oppErr() {
        return this.BusinessOpportunity.controls;
    }

    createOpp() {

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
            // this.BusinessOpportunity.controls['country'].setValue(this.default, {
            //     onlySelf: true
            // });
        });
        this.http.get(this.userapi + "/getSkills").subscribe(res => {
            this.common = res;
            for (var i = 0; i < this.common.length; ++i) {
                this.allFruits[i] = res[i].name;
            }

        })

        this.user.post("getopportunitydata",{id:localStorage.getItem('opp_id')}).subscribe(res => {
            this.userData = res;
            console.log(this.userData)
            this.fruits = JSON.parse(this.userData[0].skills_ids);
            this.check_employement=JSON.stringify(this.userData[0].employment)
             this.check_pay=JSON.stringify(this.userData[0].pay)
             this.check_tution=JSON.stringify(this.userData[0].tuition)
              if(this.userData[0].longvity_classification == 0){
                  this.required=0;
              }

            this.BusinessOpportunity.controls['country'].setValue(this.userData[0].country_id, {
                onlySelf: true
            });
            this.BusinessOpportunity.controls['city'].setValue(this.userData[0].city, {
                onlySelf: true
            });
            this.BusinessOpportunity.controls['address_line'].setValue(this.userData[0].Address_Line, {
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
            this.BusinessOpportunity.controls['contact_email'].setValue(this.userData[0].contact_email, {
                onlySelf: true
            });

            this.user.post('setting/getAllcountry',{userid:localStorage.getItem('id')}).subscribe(res => {
      this.country= res;
             this.BusinessOpportunity.controls['cc'].setValue(this.userData[0].pin_code, {onlySelf: true});

    });
            if(this.userData[0].contact_phone != ''){
              var b="+"+this.userData[0].pin_code;
              console.log(b)
              var a=this.userData[0].contact_phone.replace(b, "");
              console.log(a,'a')
            this.BusinessOpportunity.controls['contact_phone'].setValue(a, {
                onlySelf: true
            });
            }
                this.BusinessOpportunity.controls['post_title'].setValue(this.userData[0].title, {
                onlySelf: true
            });
                this.BusinessOpportunity.controls['longevity'].setValue(this.userData[0].longvity_classification, {
                onlySelf: true
            });
             this.BusinessOpportunity.controls['opportunity_days'].setValue(this.userData[0].duration, {
                onlySelf: true
            });
                this.BusinessOpportunity.controls['day_type'].setValue(this.userData[0].duration_unit, {
                onlySelf: true
            });

        if(this.userData[0].longvity_classification == 0){
            this.required=1
        }else{
            this.required=0

        }


              
             
              this.BusinessOpportunity.controls['discription'].setValue(this.userData[0].description, {
                onlySelf: true
            });
           
               this.BusinessOpportunity.controls['prefrences'].setValue(this.userData[0].prefrences, {
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
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.http.post(this.api + "/city", {
            country_id:co_id.split(":")[1]
        }, httpOptions).subscribe(res => {
            this.state = res;
        });
    }

        opportunitySubmit() {
        this.submitted = true;
//            console.log("--",this.BusinessOpportunity.value.longevity,this.BusinessOpportunity.value.opportunity_days,this.BusinessOpportunity.value.day_type)

// console.log(this.BusinessOpportunity.value)
//         if (this.BusinessOpportunity.invalid) {
//             Swal.fire({
//                 title: "ERROR",
//                 html: "Please enter all required fields",
//                 type: "error"
//             }).then(function() {
//                 $('html, body').animate({
//                     scrollTop: $("#abc").offset().top
//                 }, 500);
//             });
//             return;
//         }
//         else if(this.BusinessOpportunity.value.longevity == 0 && this.BusinessOpportunity.value.opportunity_days == '' && this.BusinessOpportunity.value.day_type == ''){
//        console.log("in 1")
//             Swal.fire({
//                 title: "ERROR",
//                 html: "Please enter  Duration of Opportunity",
//                 type: "error"
//             }).then(function() {
//                 $('html, body').animate({
//                     scrollTop: $("#abc").offset().top
//                 }, 500);
//             });
//             return;

//         }
//          else if(this.BusinessOpportunity.value.longevity == 0 && this.BusinessOpportunity.value.opportunity_days == '' && this.BusinessOpportunity.value.day_type != ''){
//                  console.log("in 2")
//                    Swal.fire({
//                 title: "ERROR",
//                 html: "Please enter  Duration of Opportunity",
//                 type: "error"
//             }).then(function() {
//                 $('html, body').animate({
//                     scrollTop: $("#abc").offset().top
//                 }, 500);
//             });
//             return;
//             }
//             else if(this.BusinessOpportunity.value.longevity == 0 && this.BusinessOpportunity.value.opportunity_days != '' && this.BusinessOpportunity.value.day_type == ''){
                 
//                  console.log("in 3")
//    console.log("--",this.BusinessOpportunity.value.longevity,this.BusinessOpportunity.value.opportunity_days,this.BusinessOpportunity.value.day_type)

//                    Swal.fire({
//                 title: "ERROR",
//                 html: "Please enter  Duration of Opportunity",
//                 type: "error"
//             }).then(function() {
//                 $('html, body').animate({
//                     scrollTop: $("#abc").offset().top
//                 }, 500);
//             });
//             return;
//             }
 if(this.BusinessOpportunity.value.longevity == 0 && this.BusinessOpportunity.value.opportunity_days == '' && this.BusinessOpportunity.value.day_type == ''){
              console.log("in 1")
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
        this.BusinessOpportunity.value.id = localStorage.getItem('opp_id');
        this.BusinessOpportunity.value.user_login_id = localStorage.getItem('id');
        // this.user.post("/opportunity/get_phone_code",{c_id:this.BusinessOpportunity.value.country}).subscribe(res=>{
            
         if(this.BusinessOpportunity.value.contact_phone != ''){
            
            this.BusinessOpportunity.value.contact_phone='+'+this.BusinessOpportunity.value.cc+this.BusinessOpportunity.value.contact_phone
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }

        this.user.post("opportunity/edit-opportunity", this.BusinessOpportunity.value).subscribe(res => {
            this.opp = res;
            if (this.opp.status == true) {
                Swal.fire({
                    title: "Success",
                    html: "Opportunity updated successfully",
                    type: "success"
                })
                this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(['bussiness/opportunities']));
            } else {
                Swal.fire({
                    title: "FAILED",
                    html: "Opportunity updation failed",
                    type: "error"
                });
            }
            this.rt.navigateByUrl('/shared/contact-us', {
                skipLocationChange: true
            }).then(() =>
                this.rt.navigate(['bussiness/opportunities']));
            // this.state = res;
        });
        // });
    }

        check(value){
       
        if(value == 1){

   this.required=0;
        }else{
            this.required=1;
        }
        
    }
    keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;

        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

}

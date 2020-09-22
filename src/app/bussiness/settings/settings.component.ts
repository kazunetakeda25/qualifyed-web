import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {FormGroup , FormControl ,FormBuilder,Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import * as myGlobals from './../../global';
import { UserService } from './../../user.service';
import { Router } from '@angular/router';


// import { UserService } from '../../user.service';
import {HttpClient , HttpHeaders} from '@angular/common/http';
@Component({
   selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  show=0; show1=0; show3=0; show4=0; show5=0; show6=0; show7=0; show8=0; show9=0; show10=0;

changePassword : any;
submitted : any;
notiData : any;
notSetting : any = [];
submitted1 : any = false;
historyPreg : any;
showphone:any;
addEmailVER:any;
radiophonee:any;
api = myGlobals.api_url;
common : any;
gId: any;
settings : any;
factor_display : any = "Off";
userEmails : any = [];
allSession :any = [];
userPhone : any = [];
alltime : any = false;
ip : any;
country : any = [];
email_display : any = "Public";
phone_display : any = "Public";
history_display : any = "All time";
active_display : any = "Public";
timeline_display:any = "public"
resume_display : any = "Public";
last_display : any = "PUBLIC";
pp_view : any = "Yes";
email_noti : any ="Yes";

addEmail:any;
addPhone:any;
createddate:any;
checklength:any;
block_status:any
blockUser:any;
updated_password_date:any;
length:any
default_country: any=231;
getUnfollow: any;
connection: any;
message : any="Public";
login_id:any
connection_display : any = "Public";
day_count : any = [];
  constructor(private fb: FormBuilder, private http: HttpClient, private user: UserService,private router: Router) { }
    selectValueSetter(id, value) {
      	for (var i = 0; i <3 ; ++i) {
      		if(document.getElementById(id).children[i].getAttribute('value') == value)
      		{
      			document.getElementById(id).children[i].setAttribute('selected', 'selected');	
      		}
      	}

  	}
  selectValueSetter1(id, value) {
     
        for (var i = 0; i <4 ; ++i) {
          if(document.getElementById(id).children[i].getAttribute('value') == value)
          {
            document.getElementById(id).children[i].setAttribute('selected', 'selected');  
          }
        }
    }

  	valueSetter(value)
  	{
  		if(value == 0)
  		{
  			return "Public";
  		}
  		else if(value == 2)
  		{
  			return "Private";
  		}
  		else if(value == 3)
  		{
  			return "Connections";
  		}
  	}
    valueSetter1(value)
    {
      // alert(value)
      if(value == 0)
      {
        return "Public";
      }
      else if(value == 1)
      {
        return "Connection";
      }
      else if(value == 2)
      {
        return "User";
      }
       else if(value == 3)
      {
        return "Bussiness";
      }
    }
  ngOnInit() {
    $(window).scroll(function() {
            var scrollDistance = $(window).scrollTop();
            if(scrollDistance >= 110)
            {
                // document.getElementsByClassName('accountLeftSection')[0].classList.add('settingPageUp');
                $('.accountLeftSection').addClass('settingPageUp')
            }else{
                $('.accountLeftSection').removeClass('settingPageUp')
            }

            $('.postWrapper').each(function(i) {
                if ($(this).position().top <= scrollDistance) {
                    $('.ul_nav li').removeClass('current');
                    $('.ul_nav li').eq(i).addClass('current');
                }
            });
        }).scroll();
  	document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.login_id=localStorage.getItem('id')
    this.changePassword=this.fb.group({
  	  current_password : ['', [Validators.required]],
      new_password : ['',[Validators.required]],
      confirm_password : ['',[Validators.required]]
    });

    this.addEmail=this.fb.group({
      email : ['', [Validators.required, Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/)]],
    });

    this.addPhone=this.fb.group({
      phone : ['', [Validators.required]],
      cc : ['', [Validators.required]],
    });

    this.addEmailVER=this.fb.group({
      otp : ['', [Validators.required]],
    });

    this.historyPreg=this.fb.group({
      // time : [''],
      // days : [''],
      // unit : ['']
           date_time:['',Validators.required]
      

    });
       
    this.user.post("setting/getnotificationData",{token:localStorage.getItem('token')}).subscribe(res => {
        this.notiData = res;
    })
    this.user.post('setting/notificationSetting',{userid:localStorage.getItem('id')}).subscribe(res => {
          this.notSetting = [];
          this.common = res;
          for (var i = 0; i < this.common.length; ++i) {
            this.notSetting.push(this.common[i].notification_type);
          }
        });

    this.user.post('setting/getSetting',{userid:this.login_id}).subscribe(res => {
      if(res != '')
      {
    	this.settings = res[0];
      }
      
      if(this.settings != '' && this.settings != null && this.settings != undefined)
      {
      	if(this.settings.is_tofactor_auth == 0)
      	{
      		document.getElementById('46').setAttribute('checked', 'checked');
      		this.factor_display = 'Off';
      	}else{
      		document.getElementById('45').setAttribute('checked', 'checked');
      		this.factor_display = 'On';
      	}

        // if(this.settings.viewers_also_viewed == 0)
        // {
        //   document.getElementById('29').setAttribute('checked', 'checked');
        //   this.pp_view = 'No';
        // // }else{
        // //   document.getElementById('28').setAttribute('checked', 'checked');
        // //   this.pp_view = 'Yes';
        // // }
  // if(this.settings.email_notification == 0)
  //       {
  //         document.getElementById('44').setAttribute('checked', 'checked');
  //         this.email_noti = 'No';
  //       }else{
  //         document.getElementById('43').setAttribute('checked', 'checked');
  //         this.email_noti = 'Yes';
  //       }
      	this.selectValueSetter('email_seen', this.settings.show_emai_to);
      	this.email_display = this.valueSetter(this.settings.show_emai_to);
      	this.selectValueSetter('phone_seen', this.settings.show_phone_to);
      	this.phone_display = this.valueSetter(this.settings.show_phone_to);
      	// this.selectValueSetter('seen_resume', this.settings.show_resume_to);
      	this.resume_display = this.valueSetter(this.settings.show_resume_to);
      	this.selectValueSetter('connection_seen', this.settings.show_connections_to);
      	this.connection_display = this.valueSetter(this.settings.show_connections_to);
        this.selectValueSetter('last_name_seen', this.settings.show_lastname_to);
        this.last_display = this.valueSetter(this.settings.show_lastname_to);
        this.selectValueSetter('active_seen', this.settings.online_status);
        this.active_display = this.valueSetter(this.settings.online_status);
        this.selectValueSetter('active_timeline', this.settings.who_can_see_timeline);
        this.timeline_display = this.valueSetter(this.settings.who_can_see_timeline);

        // this.selectValueSetter('a_S', this.settings.history_preference);
        // this.selectValueSetter('b_S', this.settings.histroy_count_days);
        // this.selectValueSetter('c_S', this.settings.history_unit_type);

        this.selectValueSetter1('message_prefrence', this.settings.who_can_send_message);
          this.message = this.valueSetter1(this.settings.who_can_send_message);

        

        if(this.settings.history_preference == 1)
        {
          this.alltime = true; 
          this.history_display = "All time";
        }else{
          if(this.settings.history_unit_type == 0)
          {
            var join = "Days";
          }else if(this.settings.history_unit_type == 1 )
          {
            var join = "Week";
          }else if(this.settings.history_unit_type == 2 )
          {
            var join = "Month";
          }else if(this.settings.history_unit_type == 1 )
          {
            var join = "Year";
          }
          this.history_display = this.settings.histroy_count_days+" "+join;

        }

      	
      }

    });
    this.user.post('setting/getEmails',{userid:this.login_id}).subscribe(res => {
      this.userEmails = res;
    });

 this.user.post('setting/getblockUser',{userid:this.login_id}).subscribe(res => {
      this.blockUser = res;
      //console.log("block",this.blockUser)
    });
    this.user.post('setting/getPhones',{userid:this.login_id}).subscribe(res => {
      this.userPhone = res;
    });
 this.user.post('setting/getUnfollow',{userid:this.login_id}).subscribe(res => {
      this.getUnfollow = res;
     this.length=this.getUnfollow.length
    });

    this.user.post('setting/getAllcountry',{userid:this.login_id}).subscribe(res => {
      this.country = res;
             this.addPhone.controls['cc'].setValue(231, {onlySelf: true});

    });

    this.user.post('setting/getAllLoginSesssion',{userid:this.login_id}).subscribe(res => {
      this.allSession = res;
    });

    this.http.get('https://ipinfo.io').subscribe(res => {
            this.common = res;
            this.ip = this.common.ip;
        });

  this.getcreateddate();
    for (var i = 0; i < 100; ++i) {
      this.day_count[i] = i+1;
    }
    // this.historyPreg.controls['time'].setValue(0, {onlySelf: true }); 
    // this.historyPreg.controls['days'].setValue(1, {onlySelf: true }); 
    // this.historyPreg.controls['unit'].setValue(0, {onlySelf: true }); 
  }
   get resErrSubmit() {
        return this.historyPreg.controls;
    }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
  showdiv(value){
      if(value == 'div1'){this.show = 1;}
      else if(value == 'div2'){this.show1=1;}
      else if(value == 'div3'){this.show3=1}
      else if(value == 'div4'){this.show4=1}
      else if(value == 'div5'){this.show5=1}
      else if(value == 'div6'){this.show6=1}
      else if(value == 'div7'){this.show7=1}
      else if(value == 'div8'){this.show8=1}
      else if(value == 'div9'){this.show9=1}
      else if(value == 'div10'){this.show10=1}
      
      
  }
   hidediv(value){

      if(value == 'div1'){this.show = 0;}
      else if(value == 'div2'){this.show1=0;}
      else if(value == 'div3'){this.show3=0}
      else if(value == 'div4'){this.show4=0}
      else if(value == 'div5'){this.show5=0}
      else if(value == 'div6'){this.show6=0}
      else if(value == 'div7'){this.show7=0}
      else if(value == 'div8'){this.show8=0}
      else if(value == 'div9'){this.show9=0}
      else if(value == 'div10'){this.show10=0}
      
  }
showdivEducation(w){
  //console.log("w",w)

}
   toggleDivContainer(id)
   {
     // for (var i = document.getElementsByClassName('.firstContainer').length - 1; i >= 0; i--) {
     //   document.getElementsByClassName('.firstContainer')[i].classList.remove('box_open');
     // }
     document.getElementById(id).classList.toggle('box_open');
   }
   changePasswordSub()
   {
        this.submitted = true;
        if (this.changePassword.invalid) {
          Swal.fire({text : "Please enter all required fields", type : "error"});
        }

        if(this.changePassword.value.new_password != this.changePassword.value.confirm_password)
        {
          Swal.fire({text : "Confirm password and new password should be same", type : "error"});
          return false;
        }

        if(this.changePassword.value.new_password < 6)
        {
           Swal.fire({text : "Please enter minimun 6 characters", type : "error"});
          return false; 
        }
        const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}) } 
        this.http.post(this.api + "/setting/changePassword", this.changePassword.value, httpOptions).subscribe(res =>{
          this.common = res;
          if(this.common.success != false){
          	this.getcreateddate()
          }
          if(this.common.success == false)
          { 
            Swal.fire({text : this.common.msg, type : "error"});
          }else{
            Swal.fire({text : this.common.msg, type : "success"});
          }
          this.changePassword.reset();
        })

   } 
getcreateddate(){
	this.user.post("setting/get_created_password",{userid:this.login_id}).subscribe(res=>{
          		this.checklength=res
          		this.updated_password_date=res[0]
          		

          		if(this.checklength.length > 0){
          			if(this.updated_password_date.activity_type == 7){
          				this.createddate=this.updated_password_date.created_date
          				
          			}
          		}
          	})
}
twoFactorFun(target,type)
{
 
 const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}) } 
 if(type == 1)
 {
   Swal.fire({
    title: 'Are you sure?',
    text: "You want to enable two-factor authentication.",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, enable it!'
  }).then((result) => {
    if(result.dismiss)
    {
      return false;
    }
    if (result.value) {
      this.http.post(this.api + "/setting/two_factor_auth", {is_tofactor_auth : 1}, httpOptions).subscribe(res =>{
        this.common = res;
        if(this.common.success == true)
        {
          this.factor_display = 'On';
          Swal.fire({text : this.common.msg , type : "success"});

          return true;
        }else{
          Swal.fire({text : this.common.msg , type : "error"});
          return false;
        }
      });
    }
  })
 }else if (type == 2)
 {
   Swal.fire({
    title: 'Are you sure?',
    text: "You want to disable two-factor authentication.",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, disable it!'
  }).then((result) => {
    if(result.dismiss)
    {
      return false;
    }
    if (result.value) {
      this.http.post(this.api+"/setting/two_factor_auth_disable",{is_tofactor_auth:0},httpOptions).subscribe(res=>{
        this.common=res;
        if(this.common.success == true)
        {
          this.factor_display = '<Off></Off>';
          Swal.fire({text : this.common.msg , type : "success"});
          return true;
        }else{
          Swal.fire({text : this.common.msg , type : "error"});
          return false;
        }
      })
    }
  })
 }
 // return false;
}
email_notification(target,type)
{
 
 const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}) } 
 if(type == 1)
 {
   Swal.fire({
    title: 'Are you sure?',
    text: "You want to enable email notification.",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, enable it!'
  }).then((result) => {
    if(result.dismiss)
    {
      return false;
    }
    if (result.value) {
      this.http.post(this.api + "/setting/email_notification", {is_emailnotification : 1}, httpOptions).subscribe(res =>{
        this.common = res;
        if(this.common.success == true)
        {
          Swal.fire({text : this.common.msg , type : "success"});
          return true;
        }else{
          Swal.fire({text : this.common.msg , type : "error"});
          return false;
        }
      });
    }
  })
 }else if (type == 2)
 {
   Swal.fire({
    title: 'Are you sure?',
    text: "You want to disable email notification.",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, disable it!'
  }).then((result) => {
    if(result.dismiss)
    {
      return false;
    }
    if (result.value) {
      this.http.post(this.api+"/setting/email_notification_disable",{is_emailnotification:0},httpOptions).subscribe(res=>{
        this.common=res;
        if(this.common.success == true)
        {
          Swal.fire({text : this.common.msg , type : "success"});
          return true;
        }else{
          Swal.fire({text : this.common.msg , type : "error"});
          return false;
        }
      })
    }
  })
 }
 // return false;
}

profile_viewed(target,type)
{
const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}) } 
 if(type == 1)
 {
   Swal.fire({
    title: 'Are you sure?',
    text: "You want to enable Viewers notification.",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, enable it!'
  }).then((result) => {
    if(result.dismiss)
    {
      return false;
    }
    if (result.value) {
      this.http.post(this.api + "/setting/profile_viewed", {profile_viewed : 1}, httpOptions).subscribe(res =>{
        this.common = res;
        if(this.common.success == true)
        {
          Swal.fire({text : this.common.msg , type : "success"});
          return true;
        }else{
          Swal.fire({text : this.common.msg , type : "error"});
          return false;
        }
      });
    }
  })
 }else if (type == 2)
 {
   Swal.fire({
    title: 'Are you sure?',
    text: "You want to disable Viewers notification.",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, disable it!'
  }).then((result) => {
    if(result.dismiss)
    {
      return false;
    }
    if (result.value) {
      this.http.post(this.api+"/setting/profile_viewed_disable",{profile_viewed:0},httpOptions).subscribe(res=>{
        this.common=res;
        if(this.common.success == true)
        {
          Swal.fire({text : this.common.msg , type : "success"});
          return true;
        }else{
          Swal.fire({text : this.common.msg , type : "error"});
          return false;
        }
      })
    }
  })
 }

}
   email_seen(val)
   {
     var text = "";
     if(val == 0)
     {
       text = "Public";
     }
     else if(val == 2)
     {
       text = "Private";
     }
     else if(val == 3)
     {
       text = "Connection";
     }
     Swal.fire({
        title: 'Are you sure?',
        html: "<p>You want to change setting to <b>"+text+"</b></p>",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if(result.dismiss)
        {
          return false;
        }
        if(result.value)
        {

          var url = "setting/email_seen";

          var data = {
            show_emai_to : val,
          }
          const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}) } 


          this.user.post(url, data).subscribe(res => {
            this.common = res;
            if(this.common.success == true)
            {
              this.email_display = text;
              Swal.fire({text : this.common.msg, type : "success"});
            }else{
              Swal.fire({text : this.common.msg, type : "error"});
            }
          });
          // //console.log(resul);
        }


      })
     // alert(val);
   }


   active_seen(val)
   {
     var text = "";
     if(val == 0)
     {
       text = "Public";
     }
     else if(val == 2)
     {
       text = "Private";
     }
     else if(val == 3)
     {
       text = "Connection";
     }
     Swal.fire({
        title: 'Are you sure?',
        html: "<p>You want to change setting to <b>"+text+"</b></p>",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if(result.dismiss)
        {
          return false;
        }
        if(result.value)
        {

          var url = "setting/active_seen";

          var data = {
            online_status : val,
          }
          const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}) } 


          this.user.post(url, data).subscribe(res => {
            this.common = res;
            if(this.common.success == true)
            {
              this.active_display = text;
              Swal.fire({text : this.common.msg, type : "success"});
            }else{
              Swal.fire({text : this.common.msg, type : "error"});
            }
          });
          // //console.log(resul);
        }


      })
     // alert(val);
   }


   phone_seen(val)
   {
     var text = "";
     if(val == 0)
     {
       text = "Public";
     }
     else if(val == 2)
     {
       text = "Private";
     }
     else if(val == 3)
     {
       text = "Connection";
     }
     Swal.fire({
        title: 'Are you sure?',
        html: "<p>You want to change setting to <b>"+text+"</b></p>",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if(result.dismiss)
        {
          return false;
        }
        if(result.value)
        {

          var url = "setting/phone_seen";

          var data = {
            show_phone_to : val,
          }
          const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}) } 

          this.user.post(url, data).subscribe(res => {
            this.common = res;
            if(this.common.success == true)
            {
              this.phone_display = text;
              Swal.fire({text : this.common.msg, type : "success"});
            }else{
              Swal.fire({text : this.common.msg, type : "error"});
            }
          });
          // //console.log(resul);
        }


      })
     // alert(val);
   }
  
   connection_seen(val)
   {
     var text = "";
     if(val == 0)
     {
       text = "Public";
     }
     else if(val == 2)
     {
       text = "Private";
     }
     else if(val == 3)
     {
       text = "Connection";
     }
     Swal.fire({
        title: 'Are you sure?',
        html: "<p>You want to change setting to <b>"+text+"</b></p>",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if(result.dismiss)
        {
          return false;
        }
        if(result.value)
        {

          var url = "setting/connection_seen";

          var data = {
            show_connections_to : val,
          }
          const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}) } 

          this.user.post(url, data).subscribe(res => {
            this.common = res;
            if(this.common.success == true)
            {
              this.connection_display = text;
              Swal.fire({text : this.common.msg, type : "success"});
            }else{
              Swal.fire({text : this.common.msg, type : "error"});
            }
          });
          // //console.log(resul);
        }


      })
   }

   last_name_seen(val)
   {
     var text = "";
     if(val == 0)
     {
       text = "Public";
     }
     else if(val == 2)
     {
       text = "Private";
     }
     else if(val == 3)
     {
       text = "Connection";
     }
     Swal.fire({
        title: 'Are you sure?',
        html: "<p>You want to change setting to <b>"+text+"</b></p>",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if(result.dismiss)
        {
          return false;
        }
        if(result.value)
        {

          var url = "setting/last_name_seen";

          var data = {
            show_lastname_to : val,
          }
          const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}) } 

          this.user.post(url, data).subscribe(res => {
            this.common = res;
            if(this.common.success == true)
            {
              this.last_display = text;
              Swal.fire({text : this.common.msg, type : "success"});
            }else{
              Swal.fire({text : this.common.msg, type : "error"});
            }
          });
          // //console.log(resul);
        }


      })
   }
   showEmailDiv(type)
   {
     if(type == 1)
     {
       document.getElementsByClassName('showEmailDiv')[0].classList.remove('displayNone');
     }else{
       document.getElementsByClassName('showEmailDiv')[0].classList.add('displayNone');
       this.addEmail.controls['email'].setValue('', {onlySelf: true }); }
   }

   showPhoneDiv(type)
   {
     if(type == 1)
     {
       document.getElementsByClassName('showPhoneDiv')[0].classList.remove('displayNone');
     }else{
       document.getElementsByClassName('showPhoneDiv')[0].classList.add('displayNone');
       this.addPhone.controls['phone'].setValue('', {onlySelf: true }); 
     }
   }
   addNewEmail()
   {
     //console.log(this.addEmail.value);
     if(this.addEmail.invalid)
     {
       Swal.fire({text : "PLease enter email to continue",type : "error"});
       return false;
     }


     this.user.post('setting/addNewEmailPost', this.addEmail.value).subscribe(res =>{
       //console.log(res);
       this.common = res;
       if(this.common.success == false)
       {
         Swal.fire({text : this.common.msg,type : "error"});
        
       }else{
         this.userEmails.push(this.common[0]);
         Swal.fire({text : "Email add successfully, check email to verify your email",type : "success"});
       }
        document.getElementsByClassName('showEmailDiv')[0].classList.add('displayNone');
        this.addEmail.controls['email'].setValue('', {onlySelf: true });
     })
     
   }


    addNewPhone()
   {
     if(this.addPhone.invalid)
     {
       Swal.fire({text : "PLease enter phone number to continue",type : "error"});
       return false;
     }
     this.addPhone.value.phone = this.addPhone.value.cc+this.addPhone.value.phone;
     this.user.post('setting/addNewPhonePost', this.addPhone.value).subscribe(res =>{
       this.common = res;
       if(this.common.success == false)
       {
         Swal.fire({text : this.common.msg,type : "error"});
        
       }else{
                this.userPhone.push(this.common[0]);
                this.user.post('setting/phoneotp',{otp:this.common[0].otp,phone:this.common[0].phone_number}).subscribe(res => {

                Swal.fire({
                    text: "Phone number add successfully, check message's to verify your phone number",
                    type: "success"
                });
                })
       }
        document.getElementsByClassName('showPhoneDiv')[0].classList.add('displayNone');
        this.addPhone.controls['phone'].setValue('', {onlySelf: true });
     })
     
   }
   verifyEmailADD()
   {


     if(this.addEmailVER.invalid)
     {
         Swal.fire({text : "Enter Otp to continue",type : "error"});
         return false;
     }
     Swal.fire({
      title: 'Enter password to continue',
      input: 'password',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Continue',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if(result.value == '')
      {
         Swal.fire({text : "Please enter password to continue" ,type : "error"});
         return false;
      }
      if (result.value) {
       var data = {
         password : result.value,
         otp : this.addEmailVER.value.otp,
         gID : this.gId
        }
       var url = "setting/activeEmail"
        this.user.post(url, data).subscribe(res =>{
           this.common = res;
           if(this.common.success == false)
           {
             Swal.fire({text : this.common.msg ,type : "error"});
           }else{
             for (var i = 0; i < this.userEmails.length; ++i) {
               if(this.userEmails[i].email == this.common[0].email)
               {
                  this.userEmails[i] = this.common[0]; 
               }
             }
             Swal.fire({text : "Successfully Verified" ,type : "success"});
             document.getElementById('id01').style.display='none';
           }
        })
      }
    });
   }


   verifyPhoneADD()
   {
        
     if(this.addEmailVER.invalid)
     {
         Swal.fire({text : "Enter Otp to continue",type : "error"});
         return false;
     }
     Swal.fire({
      title: 'Enter password to continue',
      input: 'password',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Continue',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if(result.value == '')
      {
         Swal.fire({text : "Please enter password to continue" ,type : "error"});
         return false;
      }
      if (result.value) {
       var data = {
         password : result.value,
         otp : this.addEmailVER.value.otp,
         gID : this.gId
        }
       var url = "setting/activePhone"
        this.user.post(url, data).subscribe(res =>{
           this.common = res;
           if(this.common.success == false)
           {
             Swal.fire({text : this.common.msg ,type : "error"});
           }else{
             for (var i = 0; i < this.userPhone.length; ++i) {
               if(this.userPhone[i].phone_number == this.common[0].phone_number)
               {
                  this.userPhone[i] = this.common[0]; 
               }
             }
             Swal.fire({text : "Successfully Verified" ,type : "success"});
             document.getElementById('id02').style.display='none';
           }
        })
      }
    });
   }
   ResendOtp(){

     for (var i = 0; i < this.userPhone.length; ++i) {
       if(this.userPhone[i].id == this.gId)
       {
         this.user.post('setting/resendOtp', {mN : this.userPhone[i].phone_number , otp : this.userPhone[i].otp}).subscribe(res => {
           Swal.fire({text : "Otp send successfully", type :"success"})
         });
       }
     }
   }
   openModal(id)
   {
     this.gId = id;
     document.getElementById('id01').style.display='block';
        this.addEmailVER.controls['otp'].setValue('', {onlySelf: true });

   }

   openModal1(id)
   {
     this.gId = id;
     document.getElementById('id02').style.display='block';
        this.addEmailVER.controls['otp'].setValue('', {onlySelf: true });

   }
   set_primary(id)
   {
     Swal.fire({
        title: 'Are you sure?',
        text: "You want to set this email as primary email",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, set it!'
      }).then((result) => {
        if (result.value) {
           var url  = "setting/setPrimary";
           this.user.post(url, {id : id}).subscribe(res =>{
              this.common = res;
              if(this.common.success == false)
              {
                Swal.fire({text : this.common.msg ,type : "error"});
              }else{
                this.userEmails = res;
                Swal.fire({text : "Primary email set successfully" ,type : "success"});
              }
           });
        }
      })
   }


   set_primary_phone(id)
   {
     Swal.fire({
        title: 'Are you sure?',
        text: "You want to set this phone number as primary phone number",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, set it!'
      }).then((result) => {
        if (result.value) {
           var url  = "setting/setPrimaryPhone";
           this.user.post(url, {id : id}).subscribe(res =>{
              this.common = res;
              if(this.common.success == false)
              {
                Swal.fire({text : this.common.msg ,type : "error"});
              }else{
                this.userPhone = res;
                Swal.fire({text : "Primary phone number set successfully" ,type : "success"});
              }
           });
        }
      })
   }

   removeEmail(id)
   {
     Swal.fire({
        title: 'Are you sure?',
        text: "You want to remove this email",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      }).then((result) => {
        if (result.value) {
           var url  = "setting/removeEmail";
           this.user.post(url, {id : id}).subscribe(res =>{
              this.common = res;
              if(this.common.success == false)
              {
                Swal.fire({text : this.common.msg ,type : "error"});
              }else{
                this.userEmails = res;
                Swal.fire({text : "Email removed successfully" ,type : "success"});
              }
           });
        }
      })
   }

   removePhone(id)
   {
     Swal.fire({
        title: 'Are you sure?',
        text: "You want to remove this phone number",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      }).then((result) => {
        if (result.value) {
           var url  = "setting/removePhone";
           this.user.post(url, {id : id}).subscribe(res =>{
              this.common = res;
              if(this.common.success == false)
              {
                Swal.fire({text : this.common.msg ,type : "error"});
              }else{
                this.userPhone = res;
                Swal.fire({text : "Phone number removed successfully" ,type : "success"});
              }
           });
        }
      })
   }
   signout(ip, id)
   {
     Swal.fire({
        title: 'Are you sure?',
        text: "You want to signout from this device",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      }).then((result) => {
        if(result.value)
        {
          var data = {
            ip : ip,
            id : id
          }
          var url = "setting/signout";
          this.user.post(url,data).subscribe(res => {
            this.allSession = res;
          });
        }
      })
   }


    active_timeline(val)
   {
     var text = "";
     if(val == 0)
     {
       text = "Public";
     }
     else if(val == 2)
     {
       text = "Private";
     }
     else if(val == 3)
     {
       text = "Connection";
     }
     Swal.fire({
        title: 'Are you sure?',
        html: "<p>You want to change setting to <b>"+text+"</b></p>",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if(result.dismiss)
        {
          return false;
        }
        if(result.value)
        {

          var url = "setting/active_timeline";

          var data = {
            timeline_status : val,
          }
          const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}) } 


          this.user.post(url, data).subscribe(res => {
            this.common = res;
            if(this.common.success == true)
            {
              this.timeline_display = text;
              Swal.fire({text : this.common.msg, type : "success"});
            }else{
              Swal.fire({text : this.common.msg, type : "error"});
            }
          });
          // //console.log(resul);
        }


      })
     // alert(val);
   }
   history_select(val)
   {
     if(val == 0)
     {
       this.alltime = false;
     }else if(val == 1)
     {
       this.alltime = true;
     }
   }
   delete_account()
   {
     Swal.fire({
        title: 'Are you sure?',
        html: "<p><b>You want to delete your account.</b></p><p>Delete your account will delete all you'r data, after delete, you will not able to get your data</p>",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete my account'
      }).then((result) => {
        if(result.value)
        {
          Swal.fire({
            title: 'Enter password to continue',
            input: 'password',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Continue',
            showLoaderOnConfirm: true,
          }).then((result) => {
            if(result.value == '')
            {
               Swal.fire({text : "Please enter password to continue" ,type : "error"});
               return false;
            }
            if (result.value) {
              this.user.post('/setting/deleteaccount', {password : result.value}).subscribe(res => {
                this.common = res;
                if(this.common.success == false)
                {
                  Swal.fire({text : this.common.msg, type : 'error'});
                }else{
                  Swal.fire({text : this.common.msg, type : 'success'});
                  localStorage.removeItem('isLoggedIn');
                 localStorage.removeItem('token');
                 localStorage.removeItem('id');
                 localStorage.removeItem('name');
                 this.router.navigate([''])
                }
              });
            }
          });
        }
      })
   }
   historySubmit()
   {


     this.submitted1 = true;
          if (this.historyPreg.invalid) {
            Swal.fire({
                title: "ERROR",
                html: "Please choose date to delete history",
                type: "error"
            });
            return;
        }
        this.user.post('setting/historyPref', this.historyPreg.value).subscribe(res => {
            Swal.fire({
                text: "History deleted successfully",
                type: "success"
            });
            this.ngOnInit();
        });
     // this.user.post('setting/historyPref',this.historyPreg.value).subscribe(res => {
     //   Swal.fire({text : "History prefrence saved successfully", type : "error"});
     //   this.ngOnInit();
     // });
   }

    Unblock(user_id,blocked_id,name){
    
                         Swal.fire({
    title: 'Are you sure?',
    text: 'You want to unblock '+name+' ?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, unblock it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {

            this.user.post("setting/unblock",{user_login_id:user_id,id:blocked_id}).subscribe(res=>{
                    this.block_status=res
                    console.log(this.block_status,this.block_status.status)
          if(this.block_status.status == true){
            Swal.fire({text:"SUCCESS",title:"User unblocked succesfully",type:"success"})
                     this.router.navigateByUrl('/shared/contact-us', {skipLocationChange: true}).then(()=>
                          this.router.navigate(["bussiness/setting"]));
          }
  else{
  Swal.fire({text:"Error",type:"error"})
  }

            })
    }
})
}

message_prefrence(val)
   {
     var text = "";
     if(val == 0)
     {
       text = "Public";
     }
     else if(val == 1)
     {
       text = "Connection";
     }
     else if(val == 2)
     {
       text = "User";
     }
       else if(val == 3)
     {
       text = "Bussiness";
     }
     Swal.fire({
        title: 'Are you sure?',
        html: "<p>You want to change setting to <b>"+text+"</b></p>",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if(result.dismiss)
        {
          return false;
        }
        if(result.value)
        {

          var url = "setting/message_prefrence";

          var data = {
            message_status : val,
          }
          const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}) } 


          this.user.post(url, data).subscribe(res => {
            this.common = res;
            if(this.common.success == true)
            {
              this.message = text;
              Swal.fire({text : this.common.msg, type : "success"});
            }else{
              Swal.fire({text : this.common.msg, type : "error"});
            }
          });
          // console.log(resul);
        }


      })
     // alert(val);
   }
 resend_request(value){

    const httpOptions = {
        headers: new HttpHeaders({
              'Content-Type': 'application/json'
        })
    }
    
 
   this.http.post(this.api+'/requestconnection',{connection_id:value},httpOptions).subscribe(res=>{
         this.connection=res
             if ((this.connection.status == true)) {
               Swal.fire({text:'Success',title:"Request sent successfully",type:"success"})
                this.router.navigateByUrl('/shared/contact-us', {skipLocationChange: true}).then(()=>
                          this.router.navigate(["bussiness/setting"]));
             }
         
        
        // this.ngOnInit()

   })
   }
    show_notification(title, id, type) {
        if (type == 2) {
            var text = "Hide";
            type = 0
        } else {
            var text = "Show";
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to ' + text + " '" + title + "' ?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
          if(result.dismiss)
          {
            this.ngOnInit();
          }
            if (result.value) {
                this.user.post("setting/changeNotificationSettings", {type : type , id : id, user_id : localStorage.getItem('id')}).subscribe(res => {
                    Swal.fire({
                        text: "SUCCESS",
                        title: "Status changed successfully",
                        type: "success"
                    })
                    this.ngOnInit();
                })
            }
        });
    }
    keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;

        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
}

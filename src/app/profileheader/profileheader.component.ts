import {OnInit } from '@angular/core';
import {Router } from '@angular/router';
import $ from 'jquery';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {FormBuilder, Validators } from '@angular/forms';
import * as myGlobals from '../global';
import {UserService } from '../user.service';
import {Component, Input, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-profileheader',
    templateUrl: './profileheader.component.html',
    styleUrls: ['./profileheader.component.css']
})
export class ProfileheaderComponent implements OnInit {
    id: any
    userapi = myGlobals.userapi_url;
    api = myGlobals.api_url;
    data;
    filterData:any
    customerData: any;
    nameData: any;
    logStatus = false;
    oppArray : any = [];
    userArray : any = [];
    bussArray : any = [];
    server_name = myGlobals.server_name
    media_url = myGlobals.media_url
    show: number = 0
    public showMY: boolean = false;
    user_type: any;
    user_type2: any
    testhref: any
    headerhref: any
    value = 1;
    notification_count: any
    searchAll: any= 1
    show1: number = 0
    status:any
    showdiv=[]
    finalArray=[]
    token:any
    serachForm:any
    value1:any
    showLoader_wait:any
    response:any
    result:any
    All=0;
    opp=1;
    pop=1;
    buss=1;
    commin:any
    locationRes:any
    message_count : any = 0;
    show_div : any = 0;
    common:any;
    file_status=false;
    pic_path:any
    login_id:any
token_type:any
    constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private user: UserService, private rt: Router) {
        this.allNotificationCount()
    }

    ngOnInit() {
        this.headerhref = this.router.url;
      this.login_id=localStorage.getItem('id');
      this.token_type=localStorage.getItem('token');
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.token=localStorage.getItem('token')

        if (localStorage.getItem('isLoggedIn') == "true" && localStorage.getItem('token') == "1" || localStorage.getItem('token') == "2") {
            this.logStatus = true;

            $(".search-dropdown-toggle").click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                $(this)
                    .closest(".search-dropdown")
                    .toggleClass("open");
            });

                this.showLoader_wait=true
            this.user.profileData({userid:this.login_id,usertype:this.token_type}).subscribe(res => {
               this.showLoader_wait=false
                this.nameData = res;
                     this.nameData=res;
         this.pic_path="uploads/images/" + this.nameData[0].profile_pic_name
               this.Check_picture()
                this.user_type2 = this.nameData[0].user_type;
            })
        }

        this.allNotificationCount()

        this.serachForm=this.fb.group({
            name:['']
        })
    }




    Menu(value) {
        if (value == 0) {this.searchAll = 1; this.All=0; this.pop=1; this.opp=1; this.buss=1; }
         else if (value == 1) {this.searchAll = 2; this.All=1; this.opp=0; this.buss=1; this.pop=1; }
          else if (value == 2) {this.searchAll = 3; this.All=1; this.pop=0; this.opp=1; this.buss=1; }
           else if (value == 3) {this.searchAll = 4; this.All=1; this.buss=0; this.pop=1; this.opp=1; }
    }



    search(value, ev) {

        if(ev.key == 'Delete' && value.length == 0)
        {
            $('.searchBarContainer').hide();
            this.customerData = '';
            return false;
        }
        if(ev.key == 'Backspace' && value.length == 0)
        {
            $('.searchBarContainer').hide();
            this.customerData = '';
            return false;
        }
        // if(value == ''){
        //     Swal.fire({text:"Error",title:"Please enter something to search",type:"error"})
        // }
        if (value == '') {
            $('.searchBarContainer').hide();
            this.customerData = '';
        } else {
            $('.searchBarContainer').show();
            var newVal = $.trim(value);
            /*  this.data = JSON.stringify({
               string: newVal
              });*/
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }


            this.http.post(this.api + "/filter", {
                string: newVal,
                type: this.searchAll
            }, httpOptions).subscribe(res => {
                this.oppArray = [];
                this.userArray = [];
                this.bussArray = [];
                this.customerData = res;
                for (var i = 0; i < this.customerData.length; ++i) {
             this.pic_path="src/assets/uploads/images/" + this.customerData[i].name
             var path
             if(this.customerData[i].name != null){
                path="uploads/images/" + this.customerData[i].name
             }else{
                path="uploads/images/" + this.customerData[i].pic_path
             }
             this.customerData[i].path=path
             this.user.fileExists1('src/assets/'+this.customerData[i].path,i).subscribe(res => {
               
                 
                        this.customerData[res['data'].i].file_status=res['data'].status
                                     })
                }

                for (var i = 0; i < this.customerData.length; ++i) {
                  if(this.customerData[i].entity_id == 1)
                  {
                    this.oppArray.push(this.customerData[i]);

                  }else if(this.customerData[i].entity_id == 2)
                  {
                    this.userArray.push(this.customerData[i]);

                  }else if(this.customerData[i].entity_id == 3)
                  {
                    this.bussArray.push(this.customerData[i]);
                  }                  
                }

                                var obj = {};

            for ( var i=0, len=this.bussArray.length; i < len; i++ )
                obj[this.bussArray[i]['id']] = this.bussArray[i];

            this.bussArray = new Array();
            for ( var key in obj )
                this.bussArray.push(obj[key]);
                        })
             
                    }
                    

    }
    searchOpp(value, ev) {
        if(ev.key == 'Backspace' && value.length == 0)
        {
            $('.searchBarContainer').hide();
            this.customerData = '';
            return false;
        }
           if(value == ''){
            Swal.fire({text:"Error",title:"Please enter something to search",type:"error"})
        }
        if (value == '') {
            $('.searchBarContainer').hide();
            this.customerData = '';
        } else {
            $('.searchBarContainer').show();
            var newVal = $.trim(value);
            /* this.data = JSON.stringify({
              string: newVal
             });*/
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }


            this.http.post(this.api + "/filter", {
                string: newVal,
                type: this.searchAll
            }, httpOptions).subscribe(res => {
         this.oppArray = [];
                this.userArray = [];
                this.bussArray = [];
                this.customerData = res;
                       for (var i = 0; i < this.customerData.length; ++i) {
                  // code...
             this.pic_path="uploads/images/" + this.customerData[i].pic_path
             var path
             path=this.pic_path
          this.customerData[i].path=path
             this.user.fileExists1('src/assets/'+this.customerData[i].path,i).subscribe(res => {
                        this.customerData[res['data'].i].file_status=res['data'].status
                      })
                }
                for (var i = 0; i < this.customerData.length; ++i) {
                  if(this.customerData[i].entity_id == 1)
                  {
                    this.oppArray.push(this.customerData[i]);
                  }else if(this.customerData[i].entity_id == 2)
                  {
                    this.userArray.push(this.customerData[i]);

                  }else if(this.customerData[i].entity_id == 3)
                  {
                    this.bussArray.push(this.customerData[i]);
                  }                  
                }


                                var obj = {};

            for ( var i=0, len=this.bussArray.length; i < len; i++ )
                obj[this.bussArray[i]['id']] = this.bussArray[i];

            this.bussArray = new Array();
            for ( var key in obj )
                this.bussArray.push(obj[key]);
                        })
                    }

    }

    searchUser(value, ev) {
        if(ev.key == 'Backspace' && value.length == 0)
        {
             $('.searchBarContainer').hide();
            this.customerData = '';
            return false;
        }
           if(value == ''){
            Swal.fire({text:"Error",title:"Please enter something to search",type:"error"})
        }
        if (value == '') {
            $('.searchBarContainer').hide();
            this.customerData = '';
        } else {
            $('.searchBarContainer').show();
            var newVal = $.trim(value);
            /* this.data = JSON.stringify({
              string: newVal
             });*/
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }


            this.http.post(this.api + "/filter", {
                string: newVal,
                type: this.searchAll
            }, httpOptions).subscribe(res => {
           this.oppArray = [];
                this.userArray = [];
                this.bussArray = [];
                this.customerData = res;
                   for (var i = 0; i < this.customerData.length; ++i) {
                  // code...
             this.pic_path="uploads/images/" + this.customerData[i].name
               var path
             path=this.pic_path
          this.customerData[i].path=path
             this.user.fileExists1('src/assets/'+this.customerData[i].path,i).subscribe(res => {
                        this.customerData[res['data'].i].file_status=res['data'].status
                      })
                }
                for (var i = 0; i < this.customerData.length; ++i) {
                  if(this.customerData[i].entity_id == 1)
                  {
                    this.oppArray.push(this.customerData[i]);
                  }else if(this.customerData[i].entity_id == 2)
                  {
                    this.userArray.push(this.customerData[i]);

                  }else if(this.customerData[i].entity_id == 3)
                  {
                    this.bussArray.push(this.customerData[i]);
                  }                  
                }
         

                                var obj = {};

            for ( var i=0, len=this.bussArray.length; i < len; i++ )
                obj[this.bussArray[i]['id']] = this.bussArray[i];

            this.bussArray = new Array();
            for ( var key in obj )
                this.bussArray.push(obj[key]);
                        })
                    }
    }
    searchBus(value, ev) {
        if(ev.key == 'Backspace' && value.length == 0)
        {
            $('.searchBarContainer').hide();
            this.customerData = '';
            return false;
        }
           if(value == ''){
            Swal.fire({text:"Error",title:"Please enter something to search",type:"error"})
        }
        if (value == '') {
            $('.searchBarContainer').hide();
            this.customerData = '';
        } else {
            $('.searchBarContainer').show();
            var newVal = $.trim(value);
            /* this.data = JSON.stringify({
              string: newVal
             });*/
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }


            this.http.post(this.api + "/filter", {
                string: newVal,
                type: this.searchAll
            }, httpOptions).subscribe(res => {
           this.oppArray = [];
                this.userArray = [];
                this.bussArray = [];
                this.customerData = res;
                       for (var i = 0; i < this.customerData.length; ++i) {
             this.pic_path="uploads/images/" + this.customerData[i].name
                 var path
             path=this.pic_path
          this.customerData[i].path=path

             this.user.fileExists1('src/assets/'+this.customerData[i].path,i).subscribe(res => {
                        
                        this.customerData[res['data'].i].file_status=res['data'].status
                      })
                }
                for (var i = 0; i < this.customerData.length; ++i) {
                  if(this.customerData[i].entity_id == 1)
                  {
                    this.oppArray.push(this.customerData[i]);
                  }else if(this.customerData[i].entity_id == 2)
                  {
                    this.userArray.push(this.customerData[i]);

                  }else if(this.customerData[i].entity_id == 3)
                  {
                    this.bussArray.push(this.customerData[i]);
                  }                  
                }


                                var obj = {};

            for ( var i=0, len=this.bussArray.length; i < len; i++ )
                obj[this.bussArray[i]['id']] = this.bussArray[i];

            this.bussArray = new Array();
            for ( var key in obj )
                this.bussArray.push(obj[key]);
                        })
                    }
    }

    // toggle() {
    //     this.show = 1
    // }
     toggle(j) {
        document.getElementById('nav_header_' + j).classList.toggle('displayNone');
    } 
    close_nav(j){
            document.getElementById('nav_header_' + j).classList.add('displayNone');

    }
    closeToggle() {
        this.show = 0
    }
     toggle_show(j) {
        document.getElementById('mobile_header_' + j).classList.toggle('displayNone');
    } 
    toggle_search(j) {
        document.getElementById('mobile_toggle_search_' + j).classList.toggle('displayNone');
    }
    close_mobi_header(j){
            document.getElementById('mobile_header_' + j).classList.add('displayNone');

    }
    close_mobi_search(j){
            document.getElementById('mobile_toggle_search_' + j).classList.add('displayNone');

    } 

    



    toggle1() {
        this.show1 = 1

    }
    toggle1Close() {
        this.show1 = 0
    }

    showSecondTog() {
        var element = document.getElementById("mainBody");
        element.classList.toggle("has-main-navi--fully-opened");
    }
    closeTag() {
        //alert("HELLO WORLD");
        document.body.className.replace("has-main-navi--fully-opened", "");
        
    }

    refresh() {
        this.ngOnInit()
    }

    allNotificationCount() {
        this.user.allnotificationCount().subscribe(res => {
            this.notification_count = res
        })
    }

 onEnter(value: string, event)
  {
     if(value ==  undefined || value == ''){
            Swal.fire({text:"Error",title:"Please enter something to search",type:"error"})
        } 
        else{
                 this.value1 = value; 
     //console.log("value",this.value1)
     if(this.customerData.length == undefined){
         return false;
     }
     for (var i = 0; i < this.customerData.length; ++i) {
         this.finalArray.push(this.customerData[i].element_id);
    
        
     }
      //console.log("check",this.finalArray)
                             

            var dups = [];
var arr = this.finalArray.filter(function(el) {
  // If it is not a duplicate, return true
  if (dups.indexOf(el) == -1) {
    dups.push(el);
    return true;
  }

  return false;
  
});
this.filterData=arr;
localStorage.setItem('searchall',this.searchAll)
localStorage.setItem('keyword',this.value1)
localStorage.setItem('filter',JSON.stringify(this.filterData))     
             this.rt.navigateByUrl('/test', {
                    skipLocationChange: true
                }).then(() =>
                    this.rt.navigate(["user-search"]));
        }


 }

 ConnectSocket(){
     this.user.activate()
 }
logout(){

      this.user.logout().subscribe(data => {
          
      this.status=data
      // console.log(this.status.status)
      if(this.status.status == true) {
           this.http.get('https://ipinfo.io').subscribe(res => {
            this.commin = res;
            this.locationRes = {
                ip:this.commin.ip,
                id : localStorage.getItem('id')
            }


            this.user.post('/logoutSession', this.locationRes).subscribe(res => {
     /*          localStorage.removeItem('isLoggedIn');
               localStorage.removeItem('token');
               localStorage.removeItem('id');
               localStorage.removeItem('name');*/
               localStorage.clear();
               this.router.navigate([''])
            });
          });
        
       
      } else {
        window.alert('Some problem')
      }
    })
  
  
}
removetext(){
  this.bussArray=''
  this.userArray=''
  this.oppArray=''
this.customerData=''
}
Check_picture(){
    this.user.fileExists('src/assets/'+this.pic_path).subscribe(res => {
            this.common = res;
             this.file_status=this.common.status
        });
}
noti_count(){
       this.user.GET("notification/readnoti_count").subscribe(res=>{
    

     })
}
}
    

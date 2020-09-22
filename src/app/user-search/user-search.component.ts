import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {FormGroup , FormControl ,FormBuilder,Validators} from '@angular/forms';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import Swal from 'sweetalert2';
import * as myGlobals from '../global';
import { UserService } from '../user.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
data:any
length:any
userapi = myGlobals.userapi_url;
media_url = myGlobals.media_url;
showLoader = false;
api = myGlobals.api_url;
 server_name = myGlobals.server_name
 myid:any
 keyword:any
 chat: any
 cc_id : any = 0;
   api_url_ = myGlobals.api_url_;
   response:any
   filterData:any
   searchAll:any
   search_count:any
   pagination_count:any
   currentCount:any
   finalConnections:any
   dummy:any
   constructor(private http:HttpClient,private fb: FormBuilder, private user: UserService,private rt: Router) { 
   }

  ngOnInit() {
    this.currentCount=0;
    this.searchAll=localStorage.getItem('searchall')
    this.filterData=JSON.parse(localStorage.getItem('filter'))
  	this.myid=localStorage.getItem('id')
  	this.keyword=localStorage.getItem("keyword")
  	//this.data=JSON.parse(localStorage.getItem('searchresult'))
  
this.user.post("getsearchcount",{keyword:this.keyword,type:this.searchAll}).subscribe(res=>{
                  this.search_count=res[0].total_count;

                  this.pagination_count=res[0].total_count-5;
                 this.currentCount=0;
             })

     this.user.post("searchlog",{keyword:this.keyword,keyresult:JSON.stringify(this.filterData)}).subscribe(res=>{
                this.response=res;
                if(this.response.status == true){
                  this.user.post("searchresult",{keyword:this.keyword,type:this.searchAll,limit: '0,5'}).subscribe(res=>{
                         this.data=res
                           //this.length=this.data.length
                           
                            if(this.data != null){
                        for (var i = 0; i < this.data.length; ++i) {
                            var path
             if(this.data[i].name != null){
                path="uploads/images/" + this.data[i].name
             }else{
                path="uploads/images/" + this.data[i].pic_path
             }
             this.data[i].path=path
             this.user.fileExists1('src/assets/'+this.data[i].path,i).subscribe(res => {
                        this.data[res['data'].i].file_status=res['data'].status
                      })
                        }
                      }
                         if(this.data != null || this.data != undefined){

                            //this.length=this.data.length
                         }
                        })
                }
 })

  }

  checkRoom(id) {
        this.chat = [];
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        this.cc_id = 0;
        this.http.post(this.api_url_+'insert', {
            chat_id: id
        }, httpOptions).subscribe(res => {
          this.rt.navigate(['messages'])
        })
    }


           loadMore()
    {

      if(this.pagination_count > 0)
      {
        this.pagination_count = this.pagination_count - 5;  
        this.currentCount += 5;
        if(this.pagination_count < 0)
        {
          this.pagination_count = 0;  
        }

   this.user.post("searchresult",{keyword:this.keyword,type:this.searchAll,limit:((this.currentCount)+','+(5)).toString()}).subscribe(res=>{
     this.dummy=res;
                for (var j = 0; j < this.dummy.length; ++j) {
                    (this.data).push(this.dummy[j]); 

                   }

                    for (var i = 0; i < this.data.length; ++i) {
                            var path
             if(this.data[i].name != null){
                path="uploads/images/" + this.data[i].name
             }else{
                path="uploads/images/" + this.data[i].pic_path
             }
             this.data[i].path=path
             this.user.fileExists1('src/assets/'+this.data[i].path,i).subscribe(res => {
                        this.data[res['data'].i].file_status=res['data'].status
                      })
                        }


   })


      }else{
        this.pagination_count = 0;
      }
      return false;
    }


}

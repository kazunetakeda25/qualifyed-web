import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import {UserService} from '../user.service'
import * as myGlobals from '../global';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
 data=[]
 server_name=myGlobals.server_name
 media_url = myGlobals.media_url;
 paginationresult_count:any
 currentCount:any
 resData:any
 final:any
 constructor(private http:HttpClient,private fb:FormBuilder,private rt:Router,private user:UserService) { }

  ngOnInit() {
  	this.paginationresult_count=0
  	this.user.post("profileviewcount",{userid:localStorage.getItem('id')}).subscribe(res=>{
  		this.paginationresult_count=res[0].total_view_profile-5
  		  this.currentCount=0;
  	})
  	this.user.post("profileviewlist",{limit:"0,5"}).subscribe(res=>{
  		this.resData = res;
  		this.data =this.resData
  	})
  }


       loadMore()
    {

      if(this.paginationresult_count > 0)
      {
        this.paginationresult_count = this.paginationresult_count - 5;  
        this.currentCount += 5;
        if(this.paginationresult_count < 0)
        {
          this.paginationresult_count = 0;  
        }

   this.user.post("profileviewlist",{limit:((this.currentCount)+','+(5)).toString()}).subscribe(res=>{
                  this.final=res
                for (var j = 0; j < this.final.length; ++j) {
                    (this.data).push(this.final[j]); 
                   }
   })


      }else{
        this.paginationresult_count = 0;
      }
      return false;
    }


}


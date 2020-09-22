import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import {UserService} from './../../user.service'
import * as myGlobals from './../../global';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-bio-view',
  templateUrl: './bio-view.component.html',
  styleUrls: ['./bio-view.component.css']
})
export class BioViewComponent implements OnInit {
data=[]
 server_name=myGlobals.server_name
 media_url=myGlobals.media_url
 paginationresult_count:any
 currentCount:any
 resData:any
 final:any
 constructor(private http:HttpClient,private fb:FormBuilder,private rt:Router,private user:UserService) { }

   ngOnInit() {
  	this.paginationresult_count=0
  	this.user.post("bioviewcount",{userid:localStorage.getItem('id')}).subscribe(res=>{
  		this.paginationresult_count=res[0].total_view_bio-5
  		  this.currentCount=0;
  		//console.log("count is",this.paginationresult_count)
  	})
  	this.user.post("bioviewlist",{limit:"0,5",userid:localStorage.getItem('id')}).subscribe(res=>{
  		this.resData = res;
  		this.data =this.resData
          // console.log(this.data)
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

   this.user.post("bioviewlist",{limit:((this.currentCount)+','+(5)).toString(),userid:localStorage.getItem('id')}).subscribe(res=>{
                  this.final=res
                for (var j = 0; j < this.final.length; ++j) {
                    (this.data).push(this.final[j]); 
                         console.log("load is",this.resData)
                   }
   })


      }else{
        this.paginationresult_count = 0;
      }
      return false;
    }
    go_video(id){
      this.rt.navigateByUrl('/shared/contact-us', {skipLocationChange: true}).then(()=>
this.rt.navigate(["shared/view_profile/"+id])); 
      
    }
}

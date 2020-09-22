import { Component, OnInit } from '@angular/core';
import {UserService} from './../../user.service';
import * as myGlobals from './../../global';
import 'moment';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-interview-req',
  templateUrl: './interview-req.component.html',
  styleUrls: ['./interview-req.component.css']
})
export class InterviewReqComponent implements OnInit {
	allInterviewReq : any = [];
	result_count : number = 0;
  media_url = myGlobals.media_url;
  showLoader=false
  paginationresult_count=0
  constructor(private user:UserService) { }

  ngOnInit() {
    if(localStorage.getItem('token') == '2'){
    	this.user.getinterviewRequest({userid:localStorage.getItem('id')}).subscribe(res=>{
  		var response : any; 
      console.log(res);
      response = res;
      for (var i = 0; i < response.length; ++i) {
        if(response[i].opp_status == 4)
        {
          response[i].interview_datetime=moment.tz(response[i].interview_datetime,'YYYY-MM-DD HHmm',moment.tz.guess()).format('LLLL');
          this.allInterviewReq.push(response[i]); 
        }
      }
       console.log("token 2",this.allInterviewReq)
  		this.result_count = this.allInterviewReq.length
  	})
    }else{
      this.user.post('opportunity/getOppBusinnesReq', {id : localStorage.getItem('id')}).subscribe(res=>{
        this.allInterviewReq = res;
        console.log(res);
        this.result_count = this.allInterviewReq.length
        for (var i = 0; i < this.allInterviewReq.length; ++i) {
          this.allInterviewReq[i].interview_datetime=moment.tz(this.allInterviewReq[i].interview_datetime,'YYYY-MM-DD HHmm',moment.tz.guess()).format('LLLL');
        }
       console.log("token 1",this.allInterviewReq)
      })
    }

  }

}

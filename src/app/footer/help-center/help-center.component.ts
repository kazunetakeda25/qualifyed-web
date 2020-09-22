import { Component, OnInit } from '@angular/core';
import {UserService } from '../../user.service';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.css']
})
export class HelpCenterComponent implements OnInit {
set_help_center:any;
  constructor(private user:UserService) { }

  ngOnInit() {
  	document.body.scrollTop = document.documentElement.scrollTop = 0;
  	this.user.GET("get_about_us_content").subscribe(res =>{
  	//	console.log("res",res)
   	 this.set_help_center =res[2].content;
   })
  }
 

}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
set_content_us:any
  constructor(private user:UserService) { }

  ngOnInit() {
  	document.body.scrollTop = document.documentElement.scrollTop = 0;
   this.user.GET("get_about_us_content").subscribe(res =>{
   	this.set_content_us =res[0].content;
   })
  }

}

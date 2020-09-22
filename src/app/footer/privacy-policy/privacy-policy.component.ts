import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
set_privacy_policy:any
  constructor(private user:UserService) { }

  ngOnInit() {
  	document.body.scrollTop = document.documentElement.scrollTop = 0;
  	// this.user.GET("get_about_us_content").subscribe(res =>{
   // 	 this.set_privacy_policy =res[2].content;
   // })
  }
  scrollToElement($element): void {
        $element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
    }

}

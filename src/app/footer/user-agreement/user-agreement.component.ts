import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
@Component({
  selector: 'app-user-agreement',
  templateUrl: './user-agreement.component.html',
  styleUrls: ['./user-agreement.component.css']
})
export class UserAgreementComponent implements OnInit {
set_user_aggrement:any
  constructor(private user:UserService) { }

  ngOnInit() {
  	this.user.GET("get_about_us_content").subscribe(res =>{
   	 this.set_user_aggrement =res[1].content;
   })
  }
scrollToElement($element): void {
        $element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
    }
}

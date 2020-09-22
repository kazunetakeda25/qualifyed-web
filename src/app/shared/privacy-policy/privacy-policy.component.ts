import { Component, OnInit } from '@angular/core';
import { UserService } from './../../user.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
set_privacy_policy:any
  constructor(private user:UserService) { }

  ngOnInit() {
    localStorage.removeItem('current_stage');
        localStorage.removeItem('incomplete_id');
        localStorage.removeItem('register_id');
    $(window).scroll(function() {
            if(scrollDistance >= 150)
            {
                $('.infoContent').addClass('settingPageUp');
            }else{
                $('.infoContent').removeClass('settingPageUp');
            }
            var scrollDistance = $(window).scrollTop();
            $('.policyBoxMain').each(function(i) {
                if ($(this).position().top <= scrollDistance) {
                    $('.privacyMenu ul li').removeClass('active');
                    $('.privacyMenu ul li').eq(i).addClass('active');
                }
            });
        }).scroll();
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

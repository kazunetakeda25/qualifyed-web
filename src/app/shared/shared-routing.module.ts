import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';
import { UserRegisterationComponent } from './user-registeration/user-registeration.component';
import { BussinessRegisterationComponent } from './bussiness-registeration/bussiness-registeration.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetpasswordoneComponent } from './resetpasswordone/resetpasswordone.component';
import { ResetpasswordtwoComponent } from './resetpasswordtwo/resetpasswordtwo.component';
import { MessagesComponent } from './messages/messages.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { InterviewReqComponent } from './interview-req/interview-req.component';
import { BioViewComponent } from './bio-view/bio-view.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ViewUserconnectionComponent } from './view-userconnection/view-userconnection.component';
import { ProfileComponent } from './profile/profile.component';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';
import { SearchOpportunitiesComponent } from './search-opportunities/search-opportunities.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HelpCenterComponent } from './help-center/help-center.component';
import { AboutComponent } from './about/about.component';
import { UserAgreementComponent } from './user-agreement/user-agreement.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AuthService1 } from './../auth.service';
import { AuthGuard } from './../auth.guard';

const routes: Routes = [
 {
    path: 'notification',
    component: NotificationComponent,canActivate:[AuthGuard]
  },{
    path: 'opportunities_detail/:data',
    component: SearchOpportunitiesComponent,canActivate:[AuthGuard]
  }, {
    path: 'user_registration',
    component: UserRegisterationComponent
  }, {
    path: 'bussiness_registration',
    component: BussinessRegisterationComponent
  }, {
    path: 'forgot',
    component: ForgotComponent
  },{
    path: 'resetpassword',
    component: ResetpasswordoneComponent
  },{
    path: 'resetpasswordd',
    component: ResetpasswordtwoComponent
  },{
    path: 'messages',
    component: MessagesComponent,canActivate:[AuthGuard]
  },{
    path: 'user-search',
    component: UserSearchComponent,canActivate:[AuthGuard]
  },{
    path: 'viewuserconnection',
    component: ViewUserconnectionComponent,canActivate:[AuthGuard]
  },{
    path: 'profileview',
    component: ProfileViewComponent,canActivate:[AuthGuard]
  },{
    path: 'bioview',
    component: BioViewComponent,canActivate:[AuthGuard]
  },{
    path: 'interview-req',
    component: InterviewReqComponent,canActivate:[AuthGuard]
  },{
    path: 'view_profile/:data',
    component: ProfileComponent,canActivate:[AuthGuard]
  },{
    path: 'verifyemail',
    component: VerifyemailComponent
  },
  {path:'contact-us',component:ContactUsComponent},
{path:'help-center',component:HelpCenterComponent},
{path:'about',component:AboutComponent},
{path:'user-agreement',component:UserAgreementComponent},
{path:'privacy-policy',component:PrivacyPolicyComponent},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }

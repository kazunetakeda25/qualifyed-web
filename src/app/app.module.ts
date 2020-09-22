import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LocalStorage } from '@ngx-pwa/local-storage';
import * as $ from 'jquery';
import { DatePipe } from '@angular/common'
import {NgxImageCompressService} from 'ngx-image-compress';
import {FileUploadModule} from 'ng2-file-upload';
import Swal from 'sweetalert2' 
import {MatCardModule,
  MatCheckboxModule,  
  MatRadioModule,MatDatepickerModule,MatNativeDateModule, MatFormFieldModule, MatInputModule,MatDialogModule,  MatAutocompleteModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { User1Service } from './user1.service';
import { AuthService1 } from './auth.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AuthGuard } from './auth.guard';
import { SocketGuard } from './socket.guard';
import { CheckService } from './check.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
// import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
// import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from "angularx-social-login";
 /*import { GrdFilterPipe } from './grid.pipe';*/
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS} from './date.adapter';
import { ImageCropperModule } from 'ngx-image-cropper';


// import { ShowHidePasswordModule } from 'ngx-show-hide-password';


import { BussinessregisterComponent } from './bussinessregister/bussinessregister.component';
import { BussinessprofileComponent } from './bussinessprofile/bussinessprofile.component';
import { ForgotComponent } from './forgot/forgot.component';
import { TestComponent } from './test/test.component';
import { LogoutComponent } from './logout/logout.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileheaderComponent } from './profileheader/profileheader.component';
import { FooterComponent } from './footer/footer.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ProfileviewComponent } from './bussinessprofile/profileview/profileview.component';
import { ContactUsComponent } from './footer/contact-us/contact-us.component';
import { HelpCenterComponent } from './footer/help-center/help-center.component';
import { AboutComponent } from './footer/about/about.component';
import { UserAgreementComponent } from './footer/user-agreement/user-agreement.component';
import { PrivacyPolicyComponent } from './footer/privacy-policy/privacy-policy.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './user-profile/edit-profile/edit-profile.component';
import { MatButtonModule ,} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule,} from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';
import { CodeComponent } from './code/code.component';

import { EditBussinessprofileComponent } from './bussinessprofile/edit-bussinessprofile/edit-bussinessprofile.component';
// import { CreatepostComponent } from './createpost/createpost.component';
import { BussinessheaderComponent } from './bussinessheader/bussinessheader.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationComponent } from './notification/notification.component';
import { MessagesComponent } from './messages/messages.component';
import { OpportunitiesUserComponent } from './opportunities-user/opportunities-user.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
// import { SafePipe } from './safe.pipe';
import { ViewConnectionrequestComponent } from './view-connectionrequest/view-connectionrequest.component';
import { UserProfileviewComponent } from './user-profileview/user-profileview.component';
import { OpportunitiesComponent } from './opportunities/opportunities.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UseropportunityresultComponent } from './useropportunityresult/useropportunityresult.component';
import { GridPipe } from './grid.pipe';
import { ViewUserconnectionrequestComponent } from './view-userconnectionrequest/view-userconnectionrequest.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { BioViewComponent } from './bio-view/bio-view.component';
// import { VerifyemailNewComponent } from './verifyemail-new/verifyemail-new.component';
import { BussinessSettingComponent } from './bussiness-setting/bussiness-setting.component';

import { ClickElsewhereDirective } from './ClickElsewhereDirective';
import { SearchOpportunitiesComponent } from './search-opportunities/search-opportunities.component';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import { OpportunityEditComponent } from './opportunity-edit/opportunity-edit.component';

// const config = new AuthServiceConfig([
 
  
//  {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider('624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com')
//   },
//   {
//     id: FacebookLoginProvider.PROVIDER_ID,
//     provider: new FacebookLoginProvider('561602290896109')
//   },
//   {
//     id: LinkedInLoginProvider.PROVIDER_ID,
//     provider: new LinkedInLoginProvider('"1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com"')
//   }
// ]);

// export function provideConfig() {
//   return config;
// }

const route:Routes=[
{path:'',component:LoginComponent},
{path:'bussiness',component:BussinessregisterComponent},
{path:'user_opp_result',component:UseropportunityresultComponent,canActivate:[AuthGuard]},
{path:'header',component:ProfileheaderComponent},
{path:'viewbusssinessconnection',component:ViewConnectionrequestComponent,canActivate:[AuthGuard]},
{path:'viewuserconnection',component:ViewUserconnectionrequestComponent,canActivate:[AuthGuard]},
{path:'view_profile/:data',component:ViewProfileComponent,canActivate:[AuthGuard]},
{path:'view_userprofile/:data',component:UserProfileviewComponent},
{path:'footer',component:FooterComponent},
{path:'test',component:TestComponent,canActivate:[AuthGuard]},
{path:'logout',component:LogoutComponent,canActivate:[AuthGuard]},
{path:'forgot',component:ForgotComponent},
{path:'bussinessprofile',component:BussinessprofileComponent,canActivate:[AuthGuard,SocketGuard]},
{ path: 'user-details', component: UserDetailsComponent },
{ path: 'profile-view', component: ProfileviewComponent,canActivate:[AuthGuard] },
{path:'contact-us',component:ContactUsComponent},
{path:'help-center',component:HelpCenterComponent},
{path:'about',component:AboutComponent},
{path:'user-agreement',component:UserAgreementComponent},
{path:'privacy-policy',component:PrivacyPolicyComponent},
{path:'edit-bussinessprofile',component:EditBussinessprofileComponent,canActivate:[AuthGuard]},
{path:'edit-profile',component:EditProfileComponent,canActivate:[AuthGuard] },
{path:'resetpassword',component:CodeComponent},
{path:'resetpasswords',component:ResetpasswordComponent},
{path:'verifyemail',component:VerifyemailComponent},
{path:'user-profile',component:UserProfileComponent,canActivate:[AuthGuard] },
// {path:'createpost',component:CreatepostComponent,canActivate:[AuthGuard] },
{path:'settings',component:SettingsComponent,canActivate:[AuthGuard] },
{path:'bussiness-setting',component:BussinessSettingComponent,canActivate:[AuthGuard,SocketGuard] },
{path:'notification',component:NotificationComponent,canActivate:[AuthGuard,SocketGuard] },
{path:'messages',component:MessagesComponent,canActivate:[AuthGuard] },
{path:'opportunities-user',component:OpportunitiesUserComponent,canActivate:[AuthGuard] },
{path:'opportunities-business',component:OpportunitiesComponent,canActivate:[AuthGuard] },
{path:'profileview',component:ProfileViewComponent,canActivate:[AuthGuard] },
{path:'bioview',component:BioViewComponent,canActivate:[AuthGuard] },
{path:'opportunities_detail/:data',component:SearchOpportunitiesComponent,canActivate:[AuthGuard] },
{path:'user-search',component:UserSearchComponent,canActivate:[AuthGuard] },
{path:'opportunity-edit',component:OpportunityEditComponent,canActivate:[AuthGuard] },
{path:'**',component:PagenotfoundComponent},






]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BussinessregisterComponent,
    // UserprofileComponent,
ClickElsewhereDirective,
    UserSearchComponent,
    BussinessprofileComponent,
    ForgotComponent,
    TestComponent,
    LogoutComponent,
    // DashboardComponent,
    ProfileheaderComponent,
    FooterComponent,
    UserDetailsComponent,
    ProfileviewComponent,
    ContactUsComponent,
    HelpCenterComponent,
    AboutComponent,
    UserAgreementComponent,
    PrivacyPolicyComponent,
    ResetpasswordComponent,
    UserProfileComponent,
    CodeComponent,
    VerifyemailComponent,
    EditBussinessprofileComponent,
    EditProfileComponent,
    // CreatepostComponent,
    BussinessheaderComponent,
    SettingsComponent,
    NotificationComponent,
    MessagesComponent,
    OpportunitiesUserComponent,
    PagenotfoundComponent,
    ViewProfileComponent,
    // SafePipe,
    ViewConnectionrequestComponent,
    UserProfileviewComponent,
    OpportunitiesComponent,
    UseropportunityresultComponent,
    GridPipe,
    ViewUserconnectionrequestComponent,
    ProfileViewComponent,
    BioViewComponent,
    // VerifyemailNewComponent,
    BussinessSettingComponent,
    SearchOpportunitiesComponent,
    OpportunityEditComponent,
    ],
  imports: [
    BrowserModule,RouterModule.forRoot(route),ReactiveFormsModule,FormsModule,HttpClientModule,
    NgbModule,
    FileUploadModule,  
    OwlDateTimeModule, 
         OwlNativeDateTimeModule,
    MatDatepickerModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatNativeDateModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,MatChipsModule,
    // SocialLoginModule,
      MatAutocompleteModule,
      // MatCardModule,
  MatCheckboxModule,
    MatInputModule,
  MatRadioModule,
  // ShowHidePasswordModule,
  AngularEditorModule,   
       ImageCropperModule,

   ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  providers: [
  // {
  //     provide: AuthServiceConfig,
  //     useFactory: provideConfig
  //   },
  { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
NgxImageCompressService,
 DatePipe,
    UserService ,User1Service,AuthService1,AuthGuard,CheckService,SocketGuard, {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }],
  bootstrap: [AppComponent],
  
  
})
export class AppModule { }
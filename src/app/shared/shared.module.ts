import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { NotificationComponent } from './notification/notification.component';
import { UserRegisterationComponent } from './user-registeration/user-registeration.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatCardModule,
  MatCheckboxModule,  
  MatRadioModule,MatDatepickerModule,MatNativeDateModule, MatFormFieldModule, MatInputModule,MatDialogModule,  MatAutocompleteModule,
} from '@angular/material';
import { ImageCropperModule } from 'ngx-image-cropper';
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
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';
import { SearchOpportunitiesComponent } from './search-opportunities/search-opportunities.component';
import { ClickElsewhereDirective } from './ClickElsewhereDirective';
import {NgxImageCompressService} from 'ngx-image-compress';
import  {  NgxEmojModule  }  from  'ngx-emoj';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HelpCenterComponent } from './help-center/help-center.component';
import { AboutComponent } from './about/about.component';
import { UserAgreementComponent } from './user-agreement/user-agreement.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import {DpDatePickerModule} from 'ng2-date-picker';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  declarations: [HeaderComponent, NotificationComponent, UserRegisterationComponent, 
  BussinessRegisterationComponent, ForgotComponent, ResetpasswordoneComponent, 
  ResetpasswordtwoComponent, MessagesComponent, UserSearchComponent, InterviewReqComponent,
   BioViewComponent, ProfileViewComponent, ViewUserconnectionComponent, ProfileComponent,
    VerifyemailComponent, SearchOpportunitiesComponent,ClickElsewhereDirective, ContactUsComponent, HelpCenterComponent, AboutComponent, UserAgreementComponent, PrivacyPolicyComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
  MatCheckboxModule,NgxMaterialTimepickerModule,  
  MatRadioModule,MatDatepickerModule,MatNativeDateModule, MatFormFieldModule, 
  MatInputModule,MatDialogModule,  MatAutocompleteModule,ImageCropperModule,
  OwlDateTimeModule, OwlNativeDateTimeModule,NgxEmojModule,DpDatePickerModule,ScheduleModule

  ],
  exports:[HeaderComponent],
   providers: [NgxImageCompressService]
})
export class SharedModule { }

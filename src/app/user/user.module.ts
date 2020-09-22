import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { AuthService1 } from './../auth.service';
import { AuthGuard } from './../auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import {MatCardModule, MatCheckboxModule, MatRadioModule,MatDatepickerModule,MatNativeDateModule, MatFormFieldModule, MatInputModule,MatDialogModule,  MatAutocompleteModule, } from '@angular/material'; 
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule} from '@angular/material/icon';
import { OpportunitiesUserComponent } from './opportunities-user/opportunities-user.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '../shared/shared.module';
import { ClickElsewhereDirective } from './ClickElsewhereDirective';
import {DpDatePickerModule} from 'ng2-date-picker';
import { TextInputHighlightModule } from 'angular-text-input-highlight';

@NgModule({
  declarations: [UserProfileComponent, EditProfileComponent, OpportunitiesUserComponent, 
  SettingsComponent,ClickElsewhereDirective],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    MatCardModule,
     MatCheckboxModule, 
     MatRadioModule,
     MatDatepickerModule,
     MatNativeDateModule, 
     MatFormFieldModule,DpDatePickerModule,TextInputHighlightModule,
      MatInputModule,MatDialogModule,  MatAutocompleteModule,MatChipsModule,
      MatIconModule, OwlDateTimeModule, OwlNativeDateTimeModule,SharedModule

  ],
   providers: [
			AuthService1,
			AuthGuard
			]
})
export class UserModule { }

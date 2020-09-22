import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BussinessRoutingModule } from './bussiness-routing.module';
import { BussinessProfileComponent } from './bussiness-profile/bussiness-profile.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { OpportunitiesBussinessComponent } from './opportunities-bussiness/opportunities-bussiness.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule,
  MatCheckboxModule,  
  MatRadioModule,MatDatepickerModule,MatNativeDateModule, MatFormFieldModule, MatInputModule,MatDialogModule,  MatAutocompleteModule,
} from '@angular/material';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { EditBussinessprofileComponent } from './edit-bussinessprofile/edit-bussinessprofile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '../shared/shared.module';
import { EditOppportunityComponent } from './edit-oppportunity/edit-oppportunity.component';
import { ClickElsewhereDirective } from './ClickElsewhereDirective';
import {DpDatePickerModule} from 'ng2-date-picker';
import { TextInputHighlightModule } from 'angular-text-input-highlight';

@NgModule({
  declarations: [BussinessProfileComponent,ClickElsewhereDirective, OpportunitiesBussinessComponent, EditBussinessprofileComponent, SettingsComponent, EditOppportunityComponent,],
  imports: [
    CommonModule,
    TextInputHighlightModule,
    BussinessRoutingModule,FormsModule,
ReactiveFormsModule,AngularEditorModule,MatIconModule,
MatChipsModule,MatCardModule,
  MatCheckboxModule,  
  MatRadioModule,MatDatepickerModule,MatNativeDateModule, MatFormFieldModule, MatInputModule,MatDialogModule,  MatAutocompleteModule,
  OwlDateTimeModule, OwlNativeDateTimeModule,ImageCropperModule,SharedModule,DpDatePickerModule
  ],
  
})
export class BussinessModule { }

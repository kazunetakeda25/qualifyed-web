import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AuthService1 } from './../auth.service';
import { AuthGuard } from './../auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { OpportunitiesUserComponent } from './opportunities-user/opportunities-user.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,canActivate:[AuthGuard]
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,canActivate:[AuthGuard]
  },
  {
    path: 'opportunities-user',
    component: OpportunitiesUserComponent,canActivate:[AuthGuard]
  },
  
  {
    path: 'settings',
    component: SettingsComponent,canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
   providers: [
			AuthService1,
			AuthGuard
			]
})
export class UserRoutingModule { }

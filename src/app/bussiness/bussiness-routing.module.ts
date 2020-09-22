import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BussinessProfileComponent } from './bussiness-profile/bussiness-profile.component';
import { AuthService1 } from './../auth.service';
import { AuthGuard } from './../auth.guard';
import { OpportunitiesBussinessComponent } from './opportunities-bussiness/opportunities-bussiness.component';
import { EditBussinessprofileComponent } from './edit-bussinessprofile/edit-bussinessprofile.component';
import { SettingsComponent } from './settings/settings.component';
import { EditOppportunityComponent } from './edit-oppportunity/edit-oppportunity.component';

const routes: Routes = [
   {path: '',
    component: BussinessProfileComponent,canActivate:[AuthGuard]
  },{path: 'edit-opportunities',
    component: EditOppportunityComponent,canActivate:[AuthGuard]
  },
  {path: 'opportunities',
    component: OpportunitiesBussinessComponent,canActivate:[AuthGuard]
  },
  {path: 'edit-bussinessprofile',
    component: EditBussinessprofileComponent,canActivate:[AuthGuard]
  },
  
  {path: 'setting',
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
export class BussinessRoutingModule { }

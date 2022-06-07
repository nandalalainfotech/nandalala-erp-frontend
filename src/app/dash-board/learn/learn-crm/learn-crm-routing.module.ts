import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrmHelpComponent } from '../../crm/crm-help/crm-help.component';
import { LearnCrmComponent } from './learn-crm.component';

const routes: Routes = [
  {
    path: "app-learn-crm",
    component: LearnCrmComponent
  },
  {
    path: "",
    component: CrmHelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnCrmRoutingModule { }

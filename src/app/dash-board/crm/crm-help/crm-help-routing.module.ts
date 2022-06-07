import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrmHelpComponent } from './crm-help.component';

const routes: Routes = [
  {
    path: "",
    component: CrmHelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmHelpRoutingModule { }

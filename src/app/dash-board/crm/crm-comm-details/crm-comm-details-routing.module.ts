import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrmCommDetailsComponent } from './crm-comm-details.component';

const routes: Routes = [
  {
    path:"",
    component:CrmCommDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmCommDetailsRoutingModule { }

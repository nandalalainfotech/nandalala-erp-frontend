import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadDetailsComponent } from './lead-details.component';

const routes: Routes = [
  {
    path:"",
    component:LeadDetailsComponent,
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadDetailsRoutingModule { }

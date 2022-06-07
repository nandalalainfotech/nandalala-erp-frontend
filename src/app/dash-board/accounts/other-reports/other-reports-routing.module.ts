import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OtherReportsComponent } from './other-reports.component';

const routes: Routes = [
  {
    path: "",
    component: OtherReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherReportsRoutingModule { }

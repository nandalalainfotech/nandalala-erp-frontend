import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportHelpComponent } from './support-help.component';

const routes: Routes = [
  {
    path: "",
    component: SupportHelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportHelpRoutingModule { }

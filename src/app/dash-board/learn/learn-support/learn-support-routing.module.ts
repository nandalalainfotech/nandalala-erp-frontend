import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportHelpComponent } from '../../support/support-help/support-help.component';
import { LearnSupportComponent } from './learn-support.component';

const routes: Routes = [
  {
    path: "app-learn-support",
    component: LearnSupportComponent
  },
  {
    path: "",
    component: SupportHelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnSupportRoutingModule { }

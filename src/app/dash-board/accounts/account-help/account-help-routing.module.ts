import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountHelpComponent } from './account-help.component';

const routes: Routes = [
  {
    path: "",
    component: AccountHelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountHelpRoutingModule { }

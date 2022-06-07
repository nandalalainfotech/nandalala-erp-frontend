import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountHelpComponent } from '../../accounts/account-help/account-help.component';
import { LearnAccountsComponent } from './learn-accounts.component';

const routes: Routes = [
  {
    path: "app-learn-accounts",
    component: LearnAccountsComponent
  },
  {
    path: "",
    component: AccountHelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnAccountsRoutingModule { }

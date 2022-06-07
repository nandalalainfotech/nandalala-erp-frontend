import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsDashboardComponent } from './accounts-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsDashboardComponent,
}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsDashboardRoutingModule { }

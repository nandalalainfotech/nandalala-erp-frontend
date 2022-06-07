import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrmDashboardComponent } from './crm-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: CrmDashboardComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmDashboardRoutingModule { }

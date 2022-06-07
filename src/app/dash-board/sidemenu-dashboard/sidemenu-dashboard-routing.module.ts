import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidemenuDashboardComponent } from './sidemenu-dashboard.component';

const routes: Routes = [

  {
    path: '',
    component: SidemenuDashboardComponent,
    children: [
      {
        path: 'app-accounts-dashboard',
        loadChildren: () => import("./accounts-dashboard/accounts-dashboard.module").then(m => m.AccountsDashboardModule)
      },
      {
        path: 'app-crm-dashboard',
        loadChildren: () => import("./crm-dashboard/crm-dashboard.module").then(m => m.CrmDashboardModule)
      },
      {
        path: 'app-employee-dashboard',
        loadChildren: () => import("./employee-dashboard/employee-dashboard.module").then(m => m.EmployeeDashboardModule)
      },
      {
        path: 'app-purchase-dashboard',
        loadChildren: () => import("./purchase-dashboard/purchase-dashboard.module").then(m => m.PurchaseDashboardModule)
      },
      {
        path: 'app-sales-dashboard',
        loadChildren: () => import("./sales-dashboard/sales-dashboard.module").then(m => m.SalesDashboardModule)
      },

    ],
  },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidemenuDashboardRoutingModule { }

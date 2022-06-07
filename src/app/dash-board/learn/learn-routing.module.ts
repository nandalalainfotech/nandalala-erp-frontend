import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearnComponent } from './learn.component';

const routes: Routes = [
  {
    path: "",
    component: LearnComponent,
    children: [
      {
        path: 'app-general',
        loadChildren: () => import("./general/general.module").then(m => m.GeneralModule)
      },
      {
        path: 'app-learn-manufacturing',
        loadChildren: () => import("./learn-manufacturing/learn-manufacturing.module").then(m => m.LearnManufacturingModule)
      },
      {
        path: 'app-learn-accounts',
        loadChildren: () => import("./learn-accounts/learn-accounts.module").then(m => m.LearnAccountsModule)
      },
      {
        path: 'app-learn-buying',
        loadChildren: () => import("./learn-buying/learn-buying.module").then(m => m.LearnBuyingModule)
      },
      {
        path: 'app-learn-selling',
        loadChildren: () => import("./learn-selling/learn-selling.module").then(m => m.LearnSellingModule)
      },
      {
        path: 'app-learn-human-resources',
        loadChildren: () => import("./learn-human-resources/learn-human-resources.module").then(m => m.LearnHumanResourcesModule)
      },
      {
        path: 'app-learn-crm',
        loadChildren: () => import("./learn-crm/learn-crm.module").then(m => m.LearnCrmModule)
      },
      {
        path: 'app-learn-projects',
        loadChildren: () => import("./learn-projects/learn-projects.module").then(m => m.LearnProjectsModule)
      },
      {
        path: 'app-learn-stock',
        loadChildren: () => import("./learn-stock/learn-stock.module").then(m => m.LearnStockModule)
      },
      {
        path: 'app-learn-tools',
        loadChildren: () => import("./learn-tools/learn-tools.module").then(m => m.LearnToolsModule)
      },
      {
        path: 'app-learn-support',
        loadChildren: () => import("./learn-support/learn-support.module").then(m => m.LearnSupportModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnRoutingModule { }

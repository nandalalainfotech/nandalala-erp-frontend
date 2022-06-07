import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { DashBoardComponent } from './dash-board.component';

const routes: Routes = [
  {
    path: "",
    component: DashBoardComponent,
    children: [
      {
        path: "",
        component: BodyComponent,
      },
      {
        path:'app-sidemenu-dashboard',
        loadChildren:() => import("./sidemenu-dashboard/sidemenu-dashboard.module").then(m => m.SidemenuDashboardModule)
      },
      {
        path: 'app-manufacturing',
        loadChildren: () => import("./manufacturing/manufacturing.module").then(m => m.ManufacturingModule)
      },
      {
        path: 'app-accounts',
        loadChildren: () => import("./accounts/accounts.module").then(m => m.AccountsModule)
      },
      {
        path: 'app-buying',
        loadChildren: () => import("./buying/buying.module").then(m => m.BuyingModule)
      },
      {
        path: 'app-selling',
        loadChildren: () => import("./selling/selling.module").then(m => m.SellingModule)
      },
      {
        path: 'app-human-resources',
        loadChildren: () => import("./human-resources/human-resources.module").then(m => m.HumanResourcesModule)
      },
      {
        path: 'app-crm',
        loadChildren: () => import("./crm/crm.module").then(m => m.CrmModule)
      },
      {
        path: 'app-projects',
        loadChildren: () => import("./projects/projects.module").then(m => m.ProjectsModule)
      },
      {
        path: 'app-stock',
        loadChildren: () => import("./stock/stock.module").then(m => m.StockModule)
      },
      {
        path: 'app-supplier',
        loadChildren: () => import("./supplier/supplier.module").then(m => m.SupplierModule)
      },
      {
        path: 'app-tools',
        loadChildren: () => import("./tools/tools.module").then(m => m.ToolsModule)
      },
      {
        path: 'app-purchase-order',
        loadChildren: () => import("./purchase-order/purchase-order.module").then(m => m.PurchaseOrderModule)
      },
      {
        path: 'app-sales-order',
        loadChildren: () => import("./sales-order/sales-order.module").then(m => m.SalesOrderModule)
      },
      {
        path: 'app-support',
        loadChildren: () => import("./support/support.module").then(m => m.SupportModule)
      },
      {
        path: 'app-item-report',
        loadChildren: () => import("./item-report/item-report.module").then(m => m.ItemReportModule)
      },
      {
        path: 'app-point-of-sale',
        loadChildren: () => import("./point-of-sale/point-of-sale.module").then(m => m.PointOfSaleModule)
      },
      {
        path: 'app-lead-details',
        loadChildren: () => import("./lead-details/lead-details.module").then(m => m.LeadDetailsModule)
      },
      {
        path: 'app-issue',
        loadChildren: () => import("./issue/issue.module").then(m => m.IssueModule)
      },
      {
        path: 'app-stocks-entrys',
        loadChildren: () => import("./stocks-entrys/stocks-entrys.module").then(m => m.StocksEntrysModule)
      },
      {
        path: 'app-profits-losses',
        loadChildren: () => import("./profits-losses/profits-losses.module").then(m => m.ProfitsLossesModule)
      },
      {
        path: 'app-budget-varaince-report',
        loadChildren: () => import("./budget-varaince-report/budget-varaince-report.module").then(m => m.BudgetVarainceReportModule)
      },
      {
        path: 'app-item',
        loadChildren: () => import("./item/item.module").then(m => m.ItemModule)
      },
      {
        path: 'app-customer',
        loadChildren: () => import("./customer/customer.module").then(m => m.CustomerModule)
      },
      {
        path: 'app-customer-reports',
        loadChildren: () => import("./customer-reports/customer-reports.module").then(m => m.CustomerReportsModule)
      },
      {
        path: "app-file-manager",
        loadChildren: () => import("./file-manager/file-manager.module").then(m => m.FileManagerModule)
      },
      {
        path: 'app-productions-orders',
        loadChildren: () => import("./productions-orders/productions-orders.module").then(m => m.ProductionsOrdersModule)
      },
      {
        path: 'app-item-wise-sales-register',
        loadChildren: () => import("./item-wise-sales-register/item-wise-sales-register.module").then(m => m.ItemWiseSalesRegisterModule)
      },
      {
        path: 'app-task',
        loadChildren: () => import("./task/task.module").then(m => m.TaskModule)
      },
      {
        path: 'app-explore',
        loadChildren: () => import("./explore/explore.module").then(m => m.ExploreModule)
      },
      {
        path: 'app-learn',
        loadChildren: () => import("./learn/learn.module").then(m => m.LearnModule)
      },
      {
        path: 'app-setting',
        loadChildren: () => import("./setting/setting.module").then(m => m.SettingModule)
      },
      {
        path: 'app-help',
        loadChildren: () => import("./help/help.module").then(m => m.HelpModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

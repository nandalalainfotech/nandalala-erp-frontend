import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BarChartModule } from '@swimlane/ngx-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AccountsDashboardRoutingModule } from './accounts-dashboard-routing.module';


@NgModule({
  declarations: [
 
  ],
  imports: [
    CommonModule,
    AccountsDashboardRoutingModule,
    BarChartModule,
    NgApexchartsModule,
  ]
})
export class AccountsDashboardModule { }

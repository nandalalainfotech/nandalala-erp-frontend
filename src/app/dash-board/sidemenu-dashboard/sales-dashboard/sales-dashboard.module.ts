import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BarChartModule, NgxChartsModule } from '@swimlane/ngx-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SalesDashboardRoutingModule } from './sales-dashboard-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SalesDashboardRoutingModule,
    NgApexchartsModule,
    BarChartModule,
    NgxChartsModule,

  ]
})
export class SalesDashboardModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PurchaseDashboardRoutingModule } from './purchase-dashboard-routing.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PurchaseDashboardRoutingModule,
    NgApexchartsModule,
    ChartsModule,
    PerfectScrollbarModule,
    ProgressbarModule.forRoot(),
    // NgxEchartsModule.forRoot({
    //   echarts
    // })
  ]
})
export class PurchaseDashboardModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarChartModule, NgxChartsModule } from '@swimlane/ngx-charts';
// import { NgApexchartsModule } from 'ng-apexcharts';
// import { ChartsModule } from 'ng2-charts';
import { BBarchartComponent } from '../body/b-barchart/b-barchart.component';
// import { BodyLineChartComponent } from '../body/body-line-chart/body-line-chart.component';
// import { BodyPiechartComponent } from '../body/body-piechart/body-piechart.component';
// import { CardChartComponent } from '../body/card-chart/card-chart.component';
import { CardChart2Component } from '../body/card-chart2/card-chart2.component';
import { CardChart3Component } from '../body/card-chart3/card-chart3.component';
import { ColumnChartComponent } from '../body/column-chart/column-chart.component';
import { DotLineChartComponent } from '../body/dot-line-chart/dot-line-chart.component';
import { GoJsChartModelComponent } from '../body/go-js-chart-model/go-js-chart-model.component';
import { GoJsChartModel1Component } from '../body/go-js-chart-model1/go-js-chart-model1.component';
import { MaterialModule } from '../body/go-js-chart-model1/material-module';
import { GoJsChartComponent } from '../body/go-js-chart/go-js-chart.component';
// import { ModernChartComponent } from '../body/modern-chart/modern-chart.component';
import { SChartPieComponent } from '../body/s-chart-pie/s-chart-pie.component';
import { SChartComponent } from '../body/s-chart/s-chart.component';
import { TreeChartComponent } from '../body/tree-chart/tree-chart.component';
import { AccountsDashboardComponent } from './accounts-dashboard/accounts-dashboard.component';
import { CrmDashboardComponent } from './crm-dashboard/crm-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { PurchaseDashboardComponent } from './purchase-dashboard/purchase-dashboard.component';
import { SalesDashboardComponent } from './sales-dashboard/sales-dashboard.component';
import { SidemenuDashboardRoutingModule } from './sidemenu-dashboard-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LogsComponent } from '../body/logs/logs.component';
import { APiechartComponent } from '../body/a-piechart/a-piechart.component';
import { BodyLineChartComponent } from '../body/body-line-chart/body-line-chart.component';
import { BodyPiechartComponent } from '../body/body-piechart/body-piechart.component';
import { ModernChartComponent } from '../body/modern-chart/modern-chart.component';
import { CardChartComponent } from '../body/card-chart/card-chart.component';
import { RadarChartComponent } from '../body/radar-chart/radar-chart.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    EmployeeDashboardComponent,
    AccountsDashboardComponent,
    PurchaseDashboardComponent,
    CrmDashboardComponent,
    SalesDashboardComponent,
    BBarchartComponent,
    // APiechartComponent,
    // LogsComponent,
    BodyLineChartComponent,
    BodyPiechartComponent,
    ModernChartComponent,
    CardChartComponent,
    CardChart2Component,
    CardChart3Component,
    SChartComponent,
    ColumnChartComponent,
    DotLineChartComponent,
    SChartPieComponent,
    GoJsChartComponent,
    GoJsChartModel1Component,
    GoJsChartModelComponent,
    TreeChartComponent,
    RadarChartComponent
    
  ],
  imports: [
    CommonModule,
    SidemenuDashboardRoutingModule,
    BarChartModule,
    NgApexchartsModule,
    ChartsModule,
    MaterialModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    NgxChartsModule,
 

    // BrowserAnimationsModule,
  ],

})
export class SidemenuDashboardModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from '../../body/go-js-chart-model1/material-module';
import { CrmDashboardRoutingModule } from './crm-dashboard-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CrmDashboardRoutingModule,
    NgApexchartsModule,
    // PerfectScrollbarModule,
    MaterialModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,

  ]
})
export class CrmDashboardModule { }

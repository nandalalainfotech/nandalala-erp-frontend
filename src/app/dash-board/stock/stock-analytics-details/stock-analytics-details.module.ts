import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockAnalyticsDetailsRoutingModule } from './stock-analytics-details-routing.module';
import { DelNoteTrendComponent } from './del-note-trend/del-note-trend.component';
import { PurRecptTrendComponent } from './pur-recpt-trend/pur-recpt-trend.component';
import { StockAnalyticsDetailsComponent } from './stock-analytics-details.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { DelNoteTrendManager } from 'src/app/shared/services/restcontroller/bizservice/del-note-trend.service';
import { PurRecptTrendManager } from 'src/app/shared/services/restcontroller/bizservice/pur-recpt-trend.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { NgxMaskModule } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    StockAnalyticsDetailsComponent,
    DelNoteTrendComponent, 
    PurRecptTrendComponent
  ],

  imports: [
    CommonModule,
    StockAnalyticsDetailsRoutingModule,
    BreadcrumbModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    NgxMaskModule.forRoot(),
    MatTabsModule
  ],
  providers: [
    DelNoteTrendManager,
    PurRecptTrendManager,
    SalesItemManager
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA] 
})

export class StockAnalyticsDetailsModule { }
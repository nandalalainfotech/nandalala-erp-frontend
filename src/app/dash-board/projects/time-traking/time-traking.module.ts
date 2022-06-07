import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TimeTrakingRoutingModule } from './time-traking-routing.module';
import { TimeSheetComponent } from './time-sheet/time-sheet.component';
import { ActiveTypeComponent } from './active-type/active-type.component';
import { ActiveCostComponent } from './active-cost/active-cost.component';
import { TimeTrakingComponent } from './time-traking.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { TimeSheetManager } from 'src/app/shared/services/restcontroller/bizservice/time-sheet.service';
import { CalendarModule } from 'primeng/calendar';
import { ProjecttManager } from 'src/app/shared/services/restcontroller/bizservice/projectt.service';
import { TaskManager } from 'src/app/shared/services/restcontroller/bizservice/task.service';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    TimeTrakingComponent,
    TimeSheetComponent,
     ActiveTypeComponent,
      ActiveCostComponent,
    ],
  imports: [
    CommonModule,
    TimeTrakingRoutingModule,
    BreadcrumbModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    CalendarModule,
    MatTabsModule
  ],
  providers:[
    TimeSheetManager,
    ProjecttManager,
    TaskManager,
    DatePipe,
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA] 
})
export class TimeTrakingModule { }

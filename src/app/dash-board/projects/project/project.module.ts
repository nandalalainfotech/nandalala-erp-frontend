import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AgGridModule } from 'ag-grid-angular';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
import { NgxFullCalendarModule } from 'ngx-fullcalendar';
import { CalendarModule } from 'primeng/calendar';
import { ProjecttManager } from 'src/app/shared/services/restcontroller/bizservice/projectt.service';
import { TaskManager } from 'src/app/shared/services/restcontroller/bizservice/task.service';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { CalanderComponent } from './calander/calander.component';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ProjecttComponent } from './projectt/projectt.component';
import { TaskComponent } from './task/task.component';

@NgModule({
    declarations: [
        ProjectComponent,
        ProjecttComponent,
        TaskComponent,
        CalanderComponent,
        GanttChartComponent
    ],
    imports: [
        CommonModule,
        ProjectRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        CalendarModule,
        NgxFullCalendarModule,
        MatTabsModule
    ],
    providers: [
        ProjecttManager,
        TaskManager,
        DatePipe
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ProjectModule { }

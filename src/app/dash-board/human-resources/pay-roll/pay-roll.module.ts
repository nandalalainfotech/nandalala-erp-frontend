import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PayRollRoutingModule } from './pay-roll-routing.module';
import { PayRollsComponent } from './pay-rolls/pay-rolls.component';
import { ProcessPayrollComponent } from './process-payroll/process-payroll.component';
import { SalaryStructureComponent } from './salary-structure/salary-structure.component';
import { SalaryComponentComponent } from './salary-component/salary-component.component';
import { PayRollComponent } from './pay-roll.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgGridModule } from 'ag-grid-angular';
import { payRollrManager } from 'src/app/shared/services/restcontroller/bizservice/hr-payrolls.service';
import { SalStructureManager } from 'src/app/shared/services/restcontroller/bizservice/hr-sal-structure.service';
import { HrSalarycomponentManager } from 'src/app/shared/services/restcontroller/bizservice/hr-salary-comp.service';
import { ProcessprManager } from 'src/app/shared/services/restcontroller/bizservice/hr-process-payroll.service';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
    declarations: [
        PayRollComponent,
        PayRollsComponent,
        ProcessPayrollComponent,
        SalaryStructureComponent,
        SalaryComponentComponent],
    imports: [
        CommonModule,
        PayRollRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatSidenavModule,
        FlexLayoutModule,
        AgGridModule.withComponents([]),
        CalendarModule
    ],
    providers: [
        payRollrManager,
        ProcessprManager,
        SalStructureManager,
        HrSalarycomponentManager,
        DatePipe,

    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class PayRollModule { }

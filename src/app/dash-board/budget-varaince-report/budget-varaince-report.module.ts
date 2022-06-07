import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetVarainceReportRoutingModule } from './budget-varaince-report-routing.module';
import { BudgetVarainceReportComponent } from './budget-varaince-report.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        BudgetVarainceReportComponent
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        BudgetVarainceReportRoutingModule
    ]
})
export class BudgetVarainceReportModule { }

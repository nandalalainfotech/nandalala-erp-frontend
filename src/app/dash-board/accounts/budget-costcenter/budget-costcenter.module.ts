import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetCostcenterRoutingModule } from './budget-costcenter-routing.module';
import { CostcenterComponent } from './costcenter/costcenter.component';
import { BudgetAccountComponent } from './budget-account/budget-account.component';
import { BudgetComponent } from './budget/budget.component';
import { BudgetMonthdistComponent } from './budget-monthdist/budget-monthdist.component';
import { BudgetVariancerepComponent } from './budget-variancerep/budget-variancerep.component';
import { BudgetCostcenterComponent } from './budget-costcenter.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CostCenterManager } from 'src/app/shared/services/restcontroller/bizservice/costcenter.service';
import { BudgetAccountManager } from 'src/app/shared/services/restcontroller/bizservice/budget-account.service';
import { BudgetManager } from 'src/app/shared/services/restcontroller/bizservice/budget.service';
import { BudgetMonthDistManager } from 'src/app/shared/services/restcontroller/bizservice/budget-monthdist.service';
import { BudgetVariancerepManager } from 'src/app/shared/services/restcontroller/bizservice/budget-variancerep.service';
import { NgxMaskModule } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        CostcenterComponent,
        BudgetAccountComponent,
        BudgetComponent,
        BudgetMonthdistComponent,
        BudgetVariancerepComponent,
        BudgetCostcenterComponent
    ],
    imports: [
        CommonModule,
        BudgetCostcenterRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule, 
        AgGridModule.withComponents([]),
        NgxMaskModule.forRoot(),
        MatTabsModule
    ],
    providers: [
        CostCenterManager,
        BudgetAccountManager,
        BudgetManager,
        BudgetMonthDistManager,
        BudgetVariancerepManager
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class BudgetCostcenterModule { }

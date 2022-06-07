import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { NgxMaskModule } from 'ngx-mask';
import { CalendarModule } from 'primeng/calendar';
import { CrmTerritoryManager } from 'src/app/shared/services/restcontroller/bizservice/crm-territory.service';
import { PurchaseRegisterManager } from 'src/app/shared/services/restcontroller/bizservice/purchase-register.service';
import { PurTaxChangesManager } from 'src/app/shared/services/restcontroller/bizservice/purtax-changes.service';
import { SalesRegisterManager } from 'src/app/shared/services/restcontroller/bizservice/sale-register.service';
import { SalesTaxManager } from 'src/app/shared/services/restcontroller/bizservice/sales-taxes.service';
import { TaxRuleManager } from 'src/app/shared/services/restcontroller/bizservice/tax-rule.service';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { PurchaseRegisterComponent } from './purchase-register/purchase-register.component';
import { PurtaxChangesComponent } from './purtax-changes/purtax-changes.component';
import { SaleRegisterComponent } from './sale-register/sale-register.component';
import { SalesTaxesComponent } from './sales-taxes/sales-taxes.component';
import { TaxRuleComponent } from './tax-rule/tax-rule.component';
import { TaxesRoutingModule } from './taxes-routing.module';
import { TaxesComponent } from './taxes.component';


@NgModule({
    declarations: [
        SalesTaxesComponent,
        TaxRuleComponent,
        SaleRegisterComponent,
        PurtaxChangesComponent,
        PurchaseRegisterComponent,
        TaxesComponent,
        
    ],
    imports: [
        CommonModule,
        TaxesRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        CalendarModule,
        NgxMaskModule.forRoot(),
        MatTabsModule
    ],
    providers: [
        SalesTaxManager,
        PurTaxChangesManager,
        TaxRuleManager,
        SalesRegisterManager,
        PurchaseRegisterManager,
        DatePipe,
        CrmTerritoryManager
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class TaxesModule { }

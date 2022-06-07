import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalsePatTerrRoutingModule } from './salse-pat-terr-routing.module';
import { TerritoryComponent } from './territory/territory.component';
import { SalsePartnerComponent } from './salse-partner/salse-partner.component';
import { SalsePersonComponent } from './salse-person/salse-person.component';
import { TerritoryTarVarItmGrpComponent } from './territory-tar-var-itm-grp/territory-tar-var-itm-grp.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalsePerTarVarItmGrpComponent } from './salse-per-tar-var-itm-grp/salse-per-tar-var-itm-grp.component';
import { SalsePatTerrComponent } from './salse-pat-terr.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        SalsePatTerrComponent,
        TerritoryComponent,
        SalsePartnerComponent,
        SalsePersonComponent,
        TerritoryTarVarItmGrpComponent,
        SalsePerTarVarItmGrpComponent
    ],
    imports: [
        CommonModule,
        SalsePatTerrRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        MatTabsModule
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SalsePatTerrModule { }
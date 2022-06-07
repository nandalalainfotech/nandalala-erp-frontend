import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyingRoutingModule } from './buying-routing.module';
import { BuyingComponent } from './buying.component';
import { AgGridModule } from 'ag-grid-angular';
import { BuyingHelpComponent } from './buying-help/buying-help.component';



@NgModule({
    declarations: [
        BuyingComponent,
    ],
    imports: [
        CommonModule,
        BuyingRoutingModule,
        AgGridModule.withComponents([])
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class BuyingModule { }

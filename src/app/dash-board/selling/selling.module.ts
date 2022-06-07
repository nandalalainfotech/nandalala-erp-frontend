import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { SellingRoutingModule } from './selling-routing.module';
import { SellingComponent } from './selling.component';




@NgModule({

    declarations: [ SellingComponent ],

    imports: [
        CommonModule,
        SellingRoutingModule,
        AgGridModule.withComponents([])
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})

export class SellingModule { }
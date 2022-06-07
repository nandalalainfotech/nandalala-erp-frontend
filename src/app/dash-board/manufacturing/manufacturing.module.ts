import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ManufacturingRoutingModule } from './manufacturing-routing.module';
import { ManufacturingComponent } from './manufacturing.component';

@NgModule({
    imports: [
        CommonModule,
        ManufacturingRoutingModule
    ],
    declarations: [
        ManufacturingComponent,
    ],
    exports: [],
})
export class ManufacturingModule { }

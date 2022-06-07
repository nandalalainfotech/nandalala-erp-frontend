import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalsePerTarVarItmGrpRoutingModule } from './salse-per-tar-var-itm-grp-routing.module';
import { SalsePerTarVarItmGrpComponent } from './salse-per-tar-var-itm-grp.component';


@NgModule({
    declarations: [SalsePerTarVarItmGrpComponent],
    imports: [
        CommonModule,
        SalsePerTarVarItmGrpRoutingModule
    ]
})
export class SalsePerTarVarItmGrpModule { }

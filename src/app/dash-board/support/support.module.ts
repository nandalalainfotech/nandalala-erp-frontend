import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportRoutingModule } from './support-routing.module';
import { SupportComponent } from './support.component';
import { SupportHelpComponent } from './support-help/support-help.component';


@NgModule({
    declarations: [ SupportComponent ],
    imports: [
        CommonModule,
        SupportRoutingModule
    ]
})
export class SupportModule { }

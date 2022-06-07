import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemReportRoutingModule } from './item-report-routing.module';
import { ItemReportComponent } from './item-report.component';


@NgModule({
    declarations: [ItemReportComponent],
    imports: [
        CommonModule,
        ItemReportRoutingModule
    ]
})
export class ItemReportModule { }

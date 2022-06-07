import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import { StockHelpComponent } from './stock-help/stock-help.component';


@NgModule({
    declarations: [ StockComponent ],
    imports: [
        CommonModule,
        StockRoutingModule
    ]
})
export class StockModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockHelpRoutingModule } from './stock-help-routing.module';
import { StockHelpComponent } from './stock-help.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [ StockHelpComponent ],
  imports: [
    CommonModule,
    StockHelpRoutingModule,
    BreadcrumbModule
  ]
})
export class StockHelpModule { }

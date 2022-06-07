import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellingHelpRoutingModule } from './selling-help-routing.module';
import { SellingHelpComponent } from './selling-help.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [ SellingHelpComponent ],
  imports: [
    CommonModule,
    SellingHelpRoutingModule,
    BreadcrumbModule
  ]
})
export class SellingHelpModule { }

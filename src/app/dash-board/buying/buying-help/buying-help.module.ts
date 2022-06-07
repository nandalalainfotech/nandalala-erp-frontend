import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyingHelpRoutingModule } from './buying-help-routing.module';
import { BuyingHelpComponent } from './buying-help.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [ BuyingHelpComponent ],
  imports: [
    CommonModule,
    BuyingHelpRoutingModule,
    BreadcrumbModule
  ]
})
export class BuyingHelpModule { }

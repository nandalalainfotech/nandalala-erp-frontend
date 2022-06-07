import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManuHelpRoutingModule } from './manu-help-routing.module';
import { ManuHelpComponent } from './manu-help.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';



@NgModule({
  declarations: [ ManuHelpComponent ],
  imports: [
    CommonModule,
    ManuHelpRoutingModule,
    BreadcrumbModule
  ]
})
export class ManuHelpModule { }

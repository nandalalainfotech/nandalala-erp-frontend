import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [ GeneralComponent ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    BreadcrumbModule
  ]
})
export class GeneralModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherReportsRoutingModule } from './other-reports-routing.module';
import { OtherReportsComponent } from './other-reports.component';



@NgModule({
  declarations: [
    OtherReportsComponent
  ],
  imports: [
    CommonModule,
    OtherReportsRoutingModule
  ]
})
export class OtherReportsModule { }

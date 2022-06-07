import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfitsLossesRoutingModule } from './profits-losses-routing.module';
import { ProfitsLossesComponent } from './profits-losses.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfitsLossesComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    ProfitsLossesRoutingModule
  ]
})
export class ProfitsLossesModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadDetailsRoutingModule } from './lead-details-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { LeadDetailsComponent } from './lead-details.component';
import { AgGridModule } from 'ag-grid-angular';
import { LeadDetailsManager } from 'src/app/shared/services/restcontroller/bizservice/lead-detail.service';

@NgModule({
  declarations: [LeadDetailsComponent],
  imports: [
    CommonModule,
    LeadDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    AgGridModule.withComponents([]),
  ],
  providers:[
    LeadDetailsManager
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class LeadDetailsModule { }

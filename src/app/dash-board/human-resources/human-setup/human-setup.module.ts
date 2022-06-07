import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HumanSetupRoutingModule } from './human-setup-routing.module';
import { HumanSetupComponent } from './human-setup.component';
import { EmploymentTypeComponent } from './employment-type/employment-type.component';
import { BranchComponent } from './branch/branch.component';
import { DesignationComponent } from './designation/designation.component';
import { DepartmentComponent } from './department/department.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AgGridModule } from 'ag-grid-angular';
import { EmploymentTypeManager } from 'src/app/shared/services/restcontroller/bizservice/employment-type.service';
import { BranchManager } from 'src/app/shared/services/restcontroller/bizservice/branch.service';
import { DesignationManager } from 'src/app/shared/services/restcontroller/bizservice/designation.service';
import { DepartmentManager } from 'src/app/shared/services/restcontroller/bizservice/department.service';


@NgModule({
  declarations: [
    HumanSetupComponent,
    EmploymentTypeComponent,
    BranchComponent,
    DesignationComponent,
    DepartmentComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    FlexLayoutModule,
    MatSidenavModule,
    HumanSetupRoutingModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    EmploymentTypeManager,
    BranchManager,
    DesignationManager,
    DepartmentManager
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class HumanSetupModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppraisalsRoutingModule } from './appraisals-routing.module';
import { AppraisalComponent } from './appraisal/appraisal.component';
import { AppraisalTemplateComponent } from './appraisal-template/appraisal-template.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppraisalsComponent } from './appraisals.component';
import { AgGridModule } from 'ag-grid-angular';
import { AppraisalManager } from 'src/app/shared/services/restcontroller/bizservice/appraisal.service';
import { AppraisalTemplateManager } from 'src/app/shared/services/restcontroller/bizservice/appraisal-template.service';


@NgModule({
    declarations: [
        AppraisalsComponent,
        AppraisalComponent,
        AppraisalTemplateComponent
    ],
    imports: [
        CommonModule,
        AppraisalsRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        FlexLayoutModule,
        MatSidenavModule,
        AgGridModule.withComponents([])
    ],
    providers: [
        AppraisalManager,
        AppraisalTemplateManager
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppraisalsModule { }

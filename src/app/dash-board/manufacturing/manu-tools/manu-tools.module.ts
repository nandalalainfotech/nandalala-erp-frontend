import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManuToolsRoutingModule } from './manu-tools-routing.module';
import { ToolsComponent } from './tools/tools.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { ManuToolsComponent } from './manu-tools.component';
import { AgGridModule } from 'ag-grid-angular';
import { ToolManager } from 'src/app/shared/services/restcontroller/bizservice/manu-tool.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
@NgModule({
    declarations: [
        ToolsComponent,
        ManuToolsComponent
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        ManuToolsRoutingModule,
        AgGridModule.withComponents([]),
        NgxMaskModule.forRoot()
    ],
    providers: [
        ToolManager
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ManuToolsModule { }

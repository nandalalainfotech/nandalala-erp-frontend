import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssuesRoutingModule } from './issues-routing.module';
import { IssueComponent } from './issue/issue.component';
import { MinutesToResponseComponent } from './minutes-to-response/minutes-to-response.component';
import { BreadcrumbModule } from 'src/app/dash-board/breadcrumb/breadcrumb.module';
import { IssuesComponent } from './issues.component';
import { CommunicationComponent } from '../communication/communication.component';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
    declarations: [
        IssuesComponent,
        IssueComponent,
        MinutesToResponseComponent,
        CommunicationComponent
    ],
    imports: [
        CommonModule,
        IssuesRoutingModule,
        BreadcrumbModule,
        AgGridModule.withComponents([]),
        MatTabsModule,
        MatMenuModule,
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class IssuesModule { }

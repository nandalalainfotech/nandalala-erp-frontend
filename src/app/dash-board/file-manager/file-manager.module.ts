import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { FileManagertManager } from 'src/app/shared/services/restcontroller/bizservice/file-manager.service';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { FileManagerRoutingModule } from './file-manager-routing.module';
import { FileManagerComponent } from './file-manager.component';



@NgModule({
    declarations: [FileManagerComponent],
    imports: [
        CommonModule,
        FileManagerRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([])
    ],
    providers: [
        FileManagertManager,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class FileManagerModule { }

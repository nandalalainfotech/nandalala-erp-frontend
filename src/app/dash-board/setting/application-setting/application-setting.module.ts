import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { NgxFileDropModule } from 'ngx-file-drop';
import { appSettingManager } from 'src/app/shared/services/restcontroller/bizservice/app-settings.service';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { ApplicationSettingRoutingModule } from './application-setting-routing.module';
import { ApplicationSettingComponent } from './application-setting.component';


@NgModule({
    declarations: [ApplicationSettingComponent],
    imports: [
        CommonModule,
        ApplicationSettingRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        NgxFileDropModule,
        AgGridModule.withComponents([])
    ],
    providers: [
        appSettingManager

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ApplicationSettingModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManuSetupRoutingModule } from './manu-setup-routing.module';
import { SetupComponent } from './setup/setup.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { ManuSetupComponent } from './manu-setup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { SetupManager } from 'src/app/shared/services/restcontroller/bizservice/setupservice';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
    declarations: [
        SetupComponent,
        ManuSetupComponent
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatTabsModule,
        ManuSetupRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        NgxMaskModule.forRoot()
    ],
    providers:[
        SetupManager
    ],

    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class ManuSetupModule { }

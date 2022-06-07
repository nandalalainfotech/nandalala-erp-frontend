import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemWiseSalesRegisterRoutingModule } from './item-wise-sales-register-routing.module';
import { ItemWiseSalesRegisterComponent } from './item-wise-sales-register.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
    declarations: [
        ItemWiseSalesRegisterComponent
    ],
    imports: [
        CommonModule,
        ItemWiseSalesRegisterRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        FlexLayoutModule,
        MatSidenavModule
    ]
})
export class ItemWiseSalesRegisterModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HumanResourcesRoutingModule } from './human-resources-routing.module';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { HumanResourcesComponent } from './human-resources.component';
import { HumanHelpComponent } from './human-help/human-help.component';


@NgModule({
    declarations: [ HumanResourcesComponent ],
    imports: [
        BreadcrumbModule,
        CommonModule,
        HumanResourcesRoutingModule,

    ]
})
export class HumanResourcesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectHelpComponent } from './project-help/project-help.component';




@NgModule({
    declarations: [ ProjectsComponent ],
    imports: [
        CommonModule,
        ProjectsRoutingModule,

    ]
})
export class ProjectsModule { }

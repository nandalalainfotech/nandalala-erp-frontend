import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
    {
        path: "",
        component: ProjectsComponent,
        children: [
            {
                path: "app-project",
                loadChildren: () => import("./project/project.module").then(m => m.ProjectModule)
            },
            {
                path: "app-time-traking",
                loadChildren: () => import("./time-traking/time-traking.module").then(m => m.TimeTrakingModule)
            },
            {
                path: "app-reports",
                loadChildren: () => import("./reports/reports.module").then(m => m.ReportsModule)
            },
            {
                path: "app-project-help",
                loadChildren: () => import("./project-help/project-help.module").then(m => m.ProjectHelpModule)
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule { }

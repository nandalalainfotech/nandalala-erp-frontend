import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManuSetupComponent } from './manu-setup.component';
import { SetupComponent } from './setup/setup.component';

const routes: Routes = [
    {
        path: "",
        component: ManuSetupComponent,
        children: [
            {
                path: "app-setup",
                component: SetupComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManuSetupRoutingModule { }

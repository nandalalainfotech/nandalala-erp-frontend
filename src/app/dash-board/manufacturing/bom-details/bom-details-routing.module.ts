import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BomDetailsComponent } from './bom-details.component';
import { ItemStatusComponent } from './item-status/item-status.component';
import { MaterialComponent } from './material/material.component';
import { OperationComponent } from './operation/operation.component';
import { WorkStationComponent } from './work-station/work-station.component';
const routes: Routes = [
    {
        path: "",
        component: BomDetailsComponent,
        children: [
            {
                path: "app-material",
                component: MaterialComponent
            },
            {
                path: "app-item-status",
                component: ItemStatusComponent
            },
            {
                path: "app-work-station",
                component: WorkStationComponent
            },
            {
                path: "app-operation",
                component: OperationComponent
            }
        ],
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BomDetailsRoutingModule { }

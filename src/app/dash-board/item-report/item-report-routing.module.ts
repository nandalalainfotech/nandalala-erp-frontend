import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemReportComponent } from './item-report.component';

const routes: Routes = [
    {
        path: '',
        component: ItemReportComponent,
        children: [
            {
                path: 'app-item-report-details',
                loadChildren: () => import("./item-report-details/item-report-details.module").then(m => m.ItemReportDetailsModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ItemReportRoutingModule { }

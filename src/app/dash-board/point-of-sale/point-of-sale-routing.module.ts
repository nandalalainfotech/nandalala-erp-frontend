import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PointOfSaleComponent } from './point-of-sale.component';
import { PosComponent } from './pos/pos.component';

const routes: Routes = [
    {
        path: "",
        component: PointOfSaleComponent,
        children: [
            {
                path: 'app-pos',
                component: PosComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PointOfSaleRoutingModule { }

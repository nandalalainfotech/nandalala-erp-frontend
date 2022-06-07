import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManufacturingComponent } from './manufacturing.component';
const routes: Routes = [
    {
        path: "",
        component: ManufacturingComponent,
        children: [
            {
                path: "app-product-order-details",
                loadChildren: () => import("./product-order-details/product-order-details.module").then(m => m.ProductOrderDetailsModule)
            },
            {
                path: "app-bom-details",
                loadChildren: () => import("./bom-details/bom-details.module").then(m => m.BomDetailsModule)
            },
            {
                path: "app-manu-tools",
                loadChildren: () => import("./manu-tools/manu-tools.module").then(m => m.ManuToolsModule)
            },
            {
                path: "app-manu-setup",
                loadChildren: () => import("./manu-setup/manu-setup.module").then(m => m.ManuSetupModule)
            },
            {
                path: "app-product-reportdetails",
                loadChildren: () => import("./product-reportdetails/product-reportdetails.module").then(m => m.ProductReportdetailsModule)
            },
            {
                path: "app-manu-help",
                loadChildren: () => import("./manu-help/manu-help.module").then(m => m.ManuHelpModule)
            }

        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManufacturingRoutingModule { }

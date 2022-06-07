import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandComponent } from './brand/brand.component';
import { StkSettingComponent } from './stk-setting/stk-setting.component';
import { StockSetupDetailsComponent } from './stock-setup-details.component';
import { UnitOfMeasureComponent } from './unit-of-measure/unit-of-measure.component';
import { WareHouseComponent } from './ware-house/ware-house.component';

const routes: Routes = [
    {
        path: '',
        component: StockSetupDetailsComponent,
        children: [
            {
                path: 'app-stk-setting',
                component: StkSettingComponent
            },
            {
                path: 'app-ware-house',
                component: WareHouseComponent
            },
            {
                path: 'app-unit-of-measure',
                component: UnitOfMeasureComponent
            },
            {
                path: 'app-brand',
                component: BrandComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StockSetupDetailsRoutingModule { }
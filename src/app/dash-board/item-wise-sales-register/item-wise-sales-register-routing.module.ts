import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemWiseSalesRegisterComponent } from './item-wise-sales-register.component';

const routes: Routes = [
    {
        path: "",
        component: ItemWiseSalesRegisterComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ItemWiseSalesRegisterRoutingModule { }

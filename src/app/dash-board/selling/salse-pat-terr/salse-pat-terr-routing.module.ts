import { componentFactoryName } from '@angular/compiler';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalsePartnerComponent } from './salse-partner/salse-partner.component';
import { SalsePatTerrComponent } from './salse-pat-terr.component';
import { SalsePerTarVarItmGrpComponent } from './salse-per-tar-var-itm-grp/salse-per-tar-var-itm-grp.component';
import { SalsePersonComponent } from './salse-person/salse-person.component';
import { TerritoryTarVarItmGrpComponent } from './territory-tar-var-itm-grp/territory-tar-var-itm-grp.component';
import { TerritoryComponent } from './territory/territory.component';

const routes: Routes = [{
    path: "",
    component: SalsePatTerrComponent,
    children: [
        {
            path: "app-territory",
            component: TerritoryComponent
        },
        {
            path: "app-salse-partner",
            component: SalsePersonComponent
        },
        {
            path: "app-salse-person",
            component: SalsePartnerComponent
        },
        {
            path: "app-territory-tar-var-itm-grp",
            component: TerritoryTarVarItmGrpComponent
        },
        {
            path: "app-salse-per-tar-var-itm-grp",
            component: SalsePerTarVarItmGrpComponent
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SalsePatTerrRoutingModule { }

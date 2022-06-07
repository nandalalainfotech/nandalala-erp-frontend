import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DelNoteTrendComponent } from './del-note-trend/del-note-trend.component';
import { PurRecptTrendComponent } from './pur-recpt-trend/pur-recpt-trend.component';
import { StockAnalyticsDetailsComponent } from './stock-analytics-details.component';

const routes: Routes = [
  {
    path: '',
    component: StockAnalyticsDetailsComponent,
    children: [
      {
        path: 'app-del-note-trend',
        component: DelNoteTrendComponent
      },
      {
        path: 'app-pur-recpt-trend',
        component: PurRecptTrendComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StockAnalyticsDetailsRoutingModule { }
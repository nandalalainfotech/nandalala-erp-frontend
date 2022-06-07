import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';

@NgModule({
    declarations: [
        AccountsComponent,
        
    ],
    imports: [
        CommonModule,
        AccountsRoutingModule,
    ]
})
export class AccountsModule { }

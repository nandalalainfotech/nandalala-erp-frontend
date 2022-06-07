import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FavouritesManager } from 'src/app/shared/services/restcontroller/bizservice/favourites.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { FavouritesComponent } from './favourites/favourites.component';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';



@NgModule({
  declarations: [ SettingComponent, FavouritesComponent ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    NgxFileDropModule,
    FormsModule
    
  ],
  providers: [FavouritesManager,]
})

export class SettingModule { }

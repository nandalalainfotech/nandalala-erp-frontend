import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Stksettings001mb } from "../entities/Stksettings001mb";

@Injectable()
export class StockSettingManager extends BaseService {

    private stockSettingUrl: string = `${environment.apiUrl}/stksetting`
    
    allstksetting() {
        return this.getCallService(`${this.stockSettingUrl}`+"/findAll");
    }

    savestksetting(stksettings001mb: Stksettings001mb) {
        return this.postCallService(`${this.stockSettingUrl}`+"/save", {}, stksettings001mb);
    }

    updatestksetting(stksettings001mb: Stksettings001mb) {
        return this.putCallService(`${this.stockSettingUrl}`+"/update", {}, stksettings001mb);
    }

    deletestksetting(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.stockSettingUrl}`+"/delete", data);
    }

    stockSettingPdf() {
        return this.getCallService1(`${this.stockSettingUrl}` + "/pdf");
    }

    stockSettingExcel() {
        return this.getCallService1(`${this.stockSettingUrl}` + "/excel");
    }

}

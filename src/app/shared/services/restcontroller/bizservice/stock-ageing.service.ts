import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Stkrepageing001mb } from "../entities/Stkrepageing001mb";

@Injectable()
export class StockAgeingManager extends BaseService {

    private stockAgeingUrl: string = `${environment.apiUrl}/stkageing`
    
    allstkageing() {
        return this.getCallService(`${this.stockAgeingUrl}`+"/findAll");
    }
    savestkageing(stkrepageing001mb: Stkrepageing001mb) {
        return this.postCallService(`${this.stockAgeingUrl}`+"/save", {}, stkrepageing001mb);
    }
    updatestkageing(stkrepageing001mb: Stkrepageing001mb) {
        return this.putCallService(`${this.stockAgeingUrl}`+"/update", {}, stkrepageing001mb);
    }
    deletestkageing(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.stockAgeingUrl}`+"/delete", data);
    }

    stockAgeingPdf() {
        return this.getCallService1(`${this.stockAgeingUrl}` + "/pdf");
    }

    stockAgeingExcel() {
        return this.getCallService1(`${this.stockAgeingUrl}` + "/excel");
    }
}
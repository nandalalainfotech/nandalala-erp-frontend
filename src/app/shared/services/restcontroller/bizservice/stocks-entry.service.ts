import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Stockentry001mb } from "../entities/Stockentry001mb";

@Injectable()
export class StocksEntryManager extends BaseService {

    private stocksEntryUrl: string = `${environment.apiUrl}/stockentrys`

    allstockentrys() {
        return this.getCallService(`${this.stocksEntryUrl}`+"/findAll");
    }
    savestockentrys(stockentry001mb: Stockentry001mb) {
        return this.postCallService(`${this.stocksEntryUrl}`+"/save", {}, stockentry001mb);
    }
    updatestockentrys(stockentry001mb: Stockentry001mb) {
        return this.putCallService(`${this.stocksEntryUrl}`+"/update", {}, stockentry001mb);
    }
    deletestockentrys(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.stocksEntryUrl}`+"/delete", data);
    }

    stocksEntryPdf() {
        return this.getCallService1(`${this.stocksEntryUrl}` + "/pdf");
      }
    
      stocksEntryExcel() {
        return this.getCallService1(`${this.stocksEntryUrl}` + "/excel");
      }
    

}

import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Accprofitlossstatement001mb } from "../entities/Accprofitlossstatement001mb";

@Injectable()
export class ProfitLossManager extends BaseService {
    
    private profitLossUrl: string = `${environment.apiUrl}/profitloss`

    allprofitloss() {
        return this.getCallService(`${this.profitLossUrl}`+"/findAll");
    }

    profitlosssave(accprofitlossstatement: Accprofitlossstatement001mb) {
        return this.postCallService(`${this.profitLossUrl}`+"/save", {}, accprofitlossstatement);
    }

    profitlossupdate(accprofitlossstatement: Accprofitlossstatement001mb) {
        return this.putCallService(`${this.profitLossUrl}`+"/update", {}, accprofitlossstatement);
    }

    profitlossdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.profitLossUrl}`+"/delete", data);
    }

    profitLossPdf() {
        return this.getCallService1(`${this.profitLossUrl}` + "/pdf");
      }
    
      profitLossExcel() {
        return this.getCallService1(`${this.profitLossUrl}` + "/excel");
      }

}
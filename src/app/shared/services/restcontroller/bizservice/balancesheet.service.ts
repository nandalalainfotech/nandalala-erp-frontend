import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Accbalancesheet001mb } from "../entities/Accbalancesheet001mb";

@Injectable()
export class BalanceSheetManager extends BaseService {

  private balanceSheetUrl: string = `${environment.apiUrl}/balancesheet`;
   
    allbalance() {
        return this.getCallService(`${this.balanceSheetUrl}`+"/findAll");
      }
      balancesave(accbalancesheet001mb: Accbalancesheet001mb) {
        return this.postCallService(`${this.balanceSheetUrl}`+"/save",{}, accbalancesheet001mb);
      }
      balanceupdate(accbalancesheet001mb: Accbalancesheet001mb) {
        return this.putCallService(`${this.balanceSheetUrl}`+"/update",{}, accbalancesheet001mb);
      }
      balancedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.balanceSheetUrl}`+"/delete", data);
      }

      balancesheetPdf() {
        return this.getCallService1(`${this.balanceSheetUrl}` + "/pdf");
      }
    
      balancesheetExcel() {
        return this.getCallService1(`${this.balanceSheetUrl}` + "/excel");
      }

}
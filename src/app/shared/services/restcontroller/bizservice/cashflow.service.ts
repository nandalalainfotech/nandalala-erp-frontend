import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Acccashflow001mb } from "../entities/Acccashflow001mb";

@Injectable()
export class CashFlowManager extends BaseService {

  private cashFlowsUrl: string = `${environment.apiUrl}/cashflow`;

    allcashflow() {
        return this.getCallService(`${this.cashFlowsUrl}`+"/findAll");
      }

      cashflowsave(acccashflow001mb: Acccashflow001mb) {
        return this.postCallService(`${this.cashFlowsUrl}`+"/save",{}, acccashflow001mb);
      }

      cashflowupdate(acccashflow001mb: Acccashflow001mb) {
        return this.putCallService(`${this.cashFlowsUrl}`+"/update",{}, acccashflow001mb);
      }

    cashflowdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.cashFlowsUrl}`+"/delete", data);
      }

      cashFlowPdf() {
        return this.getCallService1(`${this.cashFlowsUrl}` + "/pdf");
      }
    
      cashFlowExcel() {
        return this.getCallService1(`${this.cashFlowsUrl}` + "/excel");
      }


}
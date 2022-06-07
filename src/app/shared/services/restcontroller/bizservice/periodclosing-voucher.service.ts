import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Periodclosingvoucher001mb } from "../entities/Periodclosingvoucher001mb";

@Injectable()
export class PeriodClosingManager extends BaseService {

    private periodClosingUrl: string = `${environment.apiUrl}/periodclosevoucher`
    
    allperiodclose() {
        return this.getCallService(`${this.periodClosingUrl}`+"/findAll");
    }
    periodclosesave(periodclosingvoucher001mb: Periodclosingvoucher001mb) {
        return this.postCallService(`${this.periodClosingUrl}`+"/save", {}, periodclosingvoucher001mb);
    }
    periodcloseupdate(periodclosingvoucher001mb: Periodclosingvoucher001mb) {
        return this.putCallService(`${this.periodClosingUrl}`+"/update", {}, periodclosingvoucher001mb);
    }
    periodclosedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.periodClosingUrl}`+"/delete", data);
    }

    periodClosingPdf() {
        return this.getCallService1(`${this.periodClosingUrl}` + "/pdf");
      }
    
      periodClosingExcel() {
        return this.getCallService1(`${this.periodClosingUrl}` + "/excel");
      }

}
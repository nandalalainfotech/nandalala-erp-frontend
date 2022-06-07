import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Payroll001mb } from "../entities/Payroll001mb";

@Injectable()
export class payRollrManager extends BaseService {

  private payRollrUrl: string = `${environment.apiUrl}/payroll`
  
    allpayroll() {
        return this.getCallService(`${this.payRollrUrl}`+"/findAll");
      }
      savepayroll(payroll001mb: Payroll001mb) {
        return this.postCallService(`${this.payRollrUrl}`+"/save",{}, payroll001mb);
      }
      updatepayroll(payroll001mb: Payroll001mb) {
        return this.putCallService(`${this.payRollrUrl}`+"/update",{}, payroll001mb);
      }
      deletepayroll(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.payRollrUrl}`+"/delete", data);
      }
      payrollrPdf() {
        return this.getCallService1(`${this.payRollrUrl}` + "/pdf");
    }

    payrollrExcel() {
        return this.getCallService1(`${this.payRollrUrl}` + "/excel");
    }
}

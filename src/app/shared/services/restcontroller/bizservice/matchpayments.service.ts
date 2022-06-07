import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Matchpayment001mb } from "../entities/Matchpayment001mb";



@Injectable()
export class matchPaymentsManager extends BaseService {

  private matchPaymentsUrl: string = `${environment.apiUrl}/matchpayments`
  
  allmatchpay() {
    return this.getCallService(`${this.matchPaymentsUrl}`+"/findAll");
  }

  matchpaysave(matchpayment001mb: Matchpayment001mb) {
    return this.postCallService(`${this.matchPaymentsUrl}`+"/save", {}, matchpayment001mb);
  }
  matchpayupdate(matchpayment001mb: Matchpayment001mb) {
    return this.putCallService(`${this.matchPaymentsUrl}`+"/update", {}, matchpayment001mb);
  }

  matchpaydelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.matchPaymentsUrl}`+"/delete", data);
  }

  matchpaymentsPdf() {
    return this.getCallService1(`${this.matchPaymentsUrl}` + "/pdf");
  }

  matchpaymentsExcel() {
    return this.getCallService1(`${this.matchPaymentsUrl}` + "/excel");
  }

}
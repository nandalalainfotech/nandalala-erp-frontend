import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Pricingrule001mb } from "../entities/Pricingrule001mb";

@Injectable()
export class PricingRuleManager extends BaseService {

  private pricingRuleUrl: string = `${environment.apiUrl}/prrule`

  allprrule() {
    return this.getCallService(`${this.pricingRuleUrl}` + "/findAll");
  }
  saveprrule(pricingrule001mb: Pricingrule001mb) {
    return this.postCallService(`${this.pricingRuleUrl}` + "/save", {}, pricingrule001mb);
  }
  updateprrule(pricingrule001mb: Pricingrule001mb) {
    return this.putCallService(`${this.pricingRuleUrl}` + "/update", {}, pricingrule001mb);
  }
  deleteprrule(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.pricingRuleUrl}` + "/delete", data);
  }

  pricingRulePdf() {
    return this.getCallService1(`${this.pricingRuleUrl}` + "/pdf");
  }

  pricingRuleExcel() {
    return this.getCallService1(`${this.pricingRuleUrl}` + "/excel");
  }

}

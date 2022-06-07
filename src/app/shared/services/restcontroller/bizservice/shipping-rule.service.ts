import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Shippingrule001mb } from "../entities/Shippingrule001mb";

@Injectable()
export class ShippingRuleManager extends BaseService {

    private shippingRuleUrl: string = `${environment.apiUrl}/shiprule`
    
    allshiprule() {
        return this.getCallService(`${this.shippingRuleUrl}`+"/findAll");
    }
    saveshiprule(shippingrule001mb: Shippingrule001mb) {
        return this.postCallService(`${this.shippingRuleUrl}`+"/save", {}, shippingrule001mb);
    }
    updateshiprule(shippingrule001mb: Shippingrule001mb) {
        return this.putCallService(`${this.shippingRuleUrl}`+"/update", {}, shippingrule001mb);
    }
    deleteshiprule(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.shippingRuleUrl}`+"/delete", data);
    }

    shippingRulePdf() {
        return this.getCallService1(`${this.shippingRuleUrl}` + "/pdf");
      }
    
      shippingRuleExcel() {
        return this.getCallService1(`${this.shippingRuleUrl}` + "/excel");
      }

}
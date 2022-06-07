import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Taxrule001mb } from "../entities/Taxrule001mb";

@Injectable()
export class TaxRuleManager extends BaseService {

  private taxRuleUrl: string = `${environment.apiUrl}/taxrule`

    alltaxrule() {
        return this.getCallService(`${this.taxRuleUrl}`+"/findAll");
      }
      taxrulesave(taxrule001mb: Taxrule001mb) {
        return this.postCallService(`${this.taxRuleUrl}`+"/save",{}, taxrule001mb);
      }
      taxruleupdate(taxrule001mb: Taxrule001mb) {
        return this.putCallService(`${this.taxRuleUrl}`+"/update", {}, taxrule001mb);
      }
      taxruledelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.taxRuleUrl}`+"/delete", data);
      }

      taxRulePdf() {
        return this.getCallService1(`${this.taxRuleUrl}` + "/pdf");
      }
    
      taxRuleExcel() {
        return this.getCallService1(`${this.taxRuleUrl}` + "/excel");
      }

}
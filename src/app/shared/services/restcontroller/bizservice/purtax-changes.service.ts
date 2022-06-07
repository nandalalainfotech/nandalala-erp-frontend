import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Purtaxcharges001mb } from "../entities/Purtaxcharges001mb";

@Injectable()
export class PurTaxChangesManager extends BaseService {

  private purTaxChangesUrl: string = `${environment.apiUrl}/purtax`
  
    allpurtax() {
        return this.getCallService(`${this.purTaxChangesUrl}`+"/findAll");
      }
      purtaxsave(purtaxcharges001mb: Purtaxcharges001mb) {
        return this.postCallService(`${this.purTaxChangesUrl}`+"/save", {}, purtaxcharges001mb);
      }
      purtaxupdate(purtaxcharges001mb: Purtaxcharges001mb) {
        return this.putCallService(`${this.purTaxChangesUrl}`+"/update", {}, purtaxcharges001mb);
    }
      purtaxdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.purTaxChangesUrl}`+"/delete", data);
      }

      purTaxChargesPdf() {
        return this.getCallService1(`${this.purTaxChangesUrl}` + "/pdf");
      }
    
      purTaxChargesExcel() {
        return this.getCallService1(`${this.purTaxChangesUrl}` + "/excel");
      }

}
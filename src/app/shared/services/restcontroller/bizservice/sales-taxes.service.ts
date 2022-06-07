import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Salestaxesandtemplates001mb } from "../entities/Salestaxesandtemplates001mb";

@Injectable()
export class SalesTaxManager extends BaseService {

  private salesTaxUrl: string = `${environment.apiUrl}/salestaxes`

    allsalestax() {
        return this.getCallService(`${this.salesTaxUrl}`+"/findAll");
      }
      salestaxsave(salestaxesandtemplates001mb: Salestaxesandtemplates001mb) {
        return this.postCallService(`${this.salesTaxUrl}`+"/save", {}, salestaxesandtemplates001mb);
      }
      salestaxupdate(salestaxesandtemplates001mb: Salestaxesandtemplates001mb) {
        return this.putCallService(`${this.salesTaxUrl}`+"/update", {}, salestaxesandtemplates001mb);
    }
      salestaxdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.salesTaxUrl}`+"/delete", data);
      }

      salesTaxPdf() {
        return this.getCallService1(`${this.salesTaxUrl}` + "/pdf");
      }
    
      salesTaxExcel() {
        return this.getCallService1(`${this.salesTaxUrl}` + "/excel");
      }

}

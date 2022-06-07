import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Salesregister001mb } from "../entities/Salesregister001mb";

@Injectable()
export class SalesRegisterManager extends BaseService {

    private salesRegisterUrl: string = `${environment.apiUrl}/saleregister`

    allsalereg() {
        return this.getCallService(`${this.salesRegisterUrl}`+"/findAll");
    }
    saleregsave(salesregister001mb: Salesregister001mb) {
        return this.postCallService(`${this.salesRegisterUrl}`+"/save", {}, salesregister001mb);
    }
    saleregupdate(salesregister001mb: Salesregister001mb) {
        return this.putCallService(`${this.salesRegisterUrl}`+"/update", {}, salesregister001mb);
    }
    saleregdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.salesRegisterUrl}`+"/delete", data);
    }

    salesRegisterPdf() {
        return this.getCallService1(`${this.salesRegisterUrl}` + "/pdf");
      }
    
      salesRegisterExcel() {
        return this.getCallService1(`${this.salesRegisterUrl}` + "/excel");
      }

}
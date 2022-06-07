import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Prsureq001mb } from "../entities/Prsureq001mb ";

@Injectable()
export class SupplierQuotManager extends BaseService {

  private supplierQuotUrl: string = `${environment.apiUrl}/supplierquot`

    allsupplierquot() {
    return this.getCallService(`${this.supplierQuotUrl}`+"/findAll");
  }

  supplierquotsave(prsureq001mb: Prsureq001mb) {
    return this.postCallService(`${this.supplierQuotUrl}`+"/save",{}, prsureq001mb);
  }

  supplierquotupdate(prsureq001mb: Prsureq001mb) {
    return this.putCallService(`${this.supplierQuotUrl}`+"/update", {}, prsureq001mb);
  }

  supplierquotdelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.supplierQuotUrl}`+"/delete", data);
  }

  supplierQuotPdf() {
    return this.getCallService1(`${this.supplierQuotUrl}` + "/pdf");
  }

  supplierQuotExcel() {
    return this.getCallService1(`${this.supplierQuotUrl}` + "/excel");
  }
  
}

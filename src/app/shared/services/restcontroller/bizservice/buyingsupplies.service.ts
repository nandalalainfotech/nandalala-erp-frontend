import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Supplier001mb } from "../entities/Supplier001mb";


@Injectable()
export class buySuppliersManager extends BaseService {

  private buySuppliersUrl: string = `${environment.apiUrl}/supplier`;

  allbuysupplier() {
    return this.getCallService(`${this.buySuppliersUrl}` + "/findAll");
  }
  buysuppliersave(supplier001mb: Supplier001mb) {
    return this.postCallService(`${this.buySuppliersUrl}` + "/save", {}, supplier001mb);
  }
  buysupplireupdate(supplier001mb: Supplier001mb) {
    return this.putCallService(`${this.buySuppliersUrl}` + "/update", {}, supplier001mb);
  }
  buysupplierdelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.buySuppliersUrl}` + "/delete", data);
  }


  buysuppliersPdf() {
    return this.getCallService1(`${this.buySuppliersUrl}` + "/pdf");
  }

  buysuppliersExcel() {
    return this.getCallService1(`${this.buySuppliersUrl}` + "/excel");
  }
}
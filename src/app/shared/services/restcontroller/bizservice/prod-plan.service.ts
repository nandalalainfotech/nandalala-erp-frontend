import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Prodplan001mb } from "../entities/Prodplan001mb";

@Injectable()
export class ProdPlanManager extends BaseService {

  private prodPlanUrl: string = `${environment.apiUrl}/prodplan`
  
  allplan() {
    return this.getCallService(`${this.prodPlanUrl}`+"/findAll");
  }

  plansave(prodplan001mb: Prodplan001mb) {
    return this.postCallService(`${this.prodPlanUrl}`+"/save", {}, prodplan001mb);
  }
  planupdate(prodplan001mb: Prodplan001mb) {
    return this.putCallService(`${this.prodPlanUrl}`+"/update", {}, prodplan001mb);
  }

  plandelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.prodPlanUrl}`+"/delete", data);
  }

  proPlanPdf() {
    return this.getCallService1(`${this.prodPlanUrl}` + "/pdf");
    }

  proPlanExcel() {
    return this.getCallService1(`${this.prodPlanUrl}` + "/excel");
    }

}

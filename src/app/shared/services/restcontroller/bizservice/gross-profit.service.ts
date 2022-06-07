import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Grossprofit001mb } from "../entities/Grossprofit001mb";

@Injectable()
export class GrossProfitManager extends BaseService {

  private grossProfitUrl: string = `${environment.apiUrl}/grossprofit`

    allgross() {
    return this.getCallService(`${this.grossProfitUrl}`+"/findAll");
  }

  grosssave(grossprofits: Grossprofit001mb) {
    return this.postCallService(`${this.grossProfitUrl}`+"/save",{}, grossprofits);
  }

  grossupdate(grossprofits: Grossprofit001mb) {
    return this.putCallService(`${this.grossProfitUrl}`+"/update", {}, grossprofits);
  }

  grossdelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.grossProfitUrl}`+"/delete", data);
  }

  grossProfitPdf() {
    return this.getCallService1(`${this.grossProfitUrl}` + "/pdf");
  }

  grossProfitExcel() {
    return this.getCallService1(`${this.grossProfitUrl}` + "/excel");
  }

  

  
}

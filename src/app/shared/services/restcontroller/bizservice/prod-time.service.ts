import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Prodtimesheet001mb } from "../entities/Prodtimesheet001mb";

@Injectable()
export class ProdTimeManager extends BaseService {

  private prodTimeUrl: string = `${environment.apiUrl}/prodtimesheet`

  alltimesheet() {
    return this.getCallService(`${this.prodTimeUrl}`+"/findAll");
  }

  timestsave(prodtimest: Prodtimesheet001mb) {
    return this.postCallService(`${this.prodTimeUrl}`+"/save", {}, prodtimest);
  }
  timestupdate(prodtimest: Prodtimesheet001mb) {
    return this.putCallService(`${this.prodTimeUrl}`+"/update", {}, prodtimest);
  }
  timestdelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.prodTimeUrl}`+"/delete", data);
  }

  prodTimestPdf() {
    return this.getCallService1(`${this.prodTimeUrl}` + "/pdf");
}

prodTimestExcel() {
    return this.getCallService1(`${this.prodTimeUrl}` + "/excel");
}

}

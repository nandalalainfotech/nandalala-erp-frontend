import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Companyaccount001mb } from "../entities/Companyaccount001mb";

@Injectable()
export class ComAccountManager extends BaseService {

    private comAccountUrl: string = `${environment.apiUrl}/comapnyaccounts`;

    allcomacc() {
        return this.getCallService(`${this.comAccountUrl}`+"/findAll");
    }

    comaccsave(companyaccount: Companyaccount001mb) {
        return this.postCallService(`${this.comAccountUrl}`+"/save", {}, companyaccount);
    }

    comaccupdate(companyaccount: Companyaccount001mb) {
        return this.putCallService(`${this.comAccountUrl}`+"/update", {}, companyaccount);
    }

    comaccdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.comAccountUrl}`+"/delete", data);
    }

    comAccountPdf() {
        return this.getCallService1(`${this.comAccountUrl}` + "/pdf");
      }

      comAccountExcel() {
        return this.getCallService1(`${this.comAccountUrl}` + "/excel");
      }

}

import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Accgenledge001mb } from "../entities/Accgenledge001mb";

@Injectable()
export class GeneralLedgerManager extends BaseService {

    private generalLedgerUrl: string = `${environment.apiUrl}/generalledger`

    allgeneral() {
        return this.getCallService(`${this.generalLedgerUrl}`+"/findAll");
    }

    generalsave(accgenledge001mb: Accgenledge001mb) {
        return this.postCallService(`${this.generalLedgerUrl}`+"/save", {}, accgenledge001mb);
    }

    generalupdate(accgenledge001mb: Accgenledge001mb) {
        return this.putCallService(`${this.generalLedgerUrl}`+"/update", {}, accgenledge001mb);
    }

    generaldelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.generalLedgerUrl}`+"/delete", data);
    }

    generalLedgerPdf() {
        return this.getCallService1(`${this.generalLedgerUrl}` + "/pdf");
      }
    
      generalLedgerExcel() {
        return this.getCallService1(`${this.generalLedgerUrl}` + "/excel");
      }

}

import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Chequetemplate001mb } from "../entities/Chequetemplate001mb";

@Injectable()
export class ChequePrintManager extends BaseService {

    private chequePrintUrl: string = `${environment.apiUrl}/chequeprint`;
    
    allchequeprint() {
        return this.getCallService(`${this.chequePrintUrl}`+"/findAll");
    }
    chequeprintsave(chequetemplate001mb: Chequetemplate001mb) {
        return this.postCallService(`${this.chequePrintUrl}`+"/save", {}, chequetemplate001mb);
    }
    chequeprintupdate(chequetemplate001mb: Chequetemplate001mb) {
        return this.putCallService(`${this.chequePrintUrl}`+"/update", {}, chequetemplate001mb);
    }
    chequeprintdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.chequePrintUrl}`+"/delete", data);
    }

    chequePrintPdf() {
        return this.getCallService1(`${this.chequePrintUrl}` + "/pdf");
      }
    
      chequePrintExcel() {
        return this.getCallService1(`${this.chequePrintUrl}` + "/excel");
      }

}
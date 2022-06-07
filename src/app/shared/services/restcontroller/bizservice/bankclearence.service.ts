import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Bankclearance001mb } from "../entities/Bankclearance001mb";


@Injectable()
export class BankClearenceManager extends BaseService {

  private bankClearenceUrl: string = `${environment.apiUrl}/bankclearance`;
  
    allclearance() {
        return this.getCallService(`${this.bankClearenceUrl}`+"/findAll");
      }

      clearancesave(bankclearance001mb: Bankclearance001mb) {
        return this.postCallService(`${this.bankClearenceUrl}`+"/save",{}, bankclearance001mb);
      }
      clearanceupdate(bankclearance001mb: Bankclearance001mb) {
        return this.putCallService(`${this.bankClearenceUrl}`+"/update",{}, bankclearance001mb);
      }

      clearancedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.bankClearenceUrl}`+"/delete", data);
      }

      bankClearencePdf() {
        return this.getCallService1(`${this.bankClearenceUrl}` + "/pdf");
      }
    
      bankClearenceExcel() {
        return this.getCallService1(`${this.bankClearenceUrl}` + "/excel");
      }

}
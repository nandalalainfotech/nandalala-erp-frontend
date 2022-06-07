import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Bankreconcile001mb } from "../entities/Bankreconcile001mb";


@Injectable()
export class BankreconcillationManager extends BaseService {

  private bankreconcillationUrl: string = `${environment.apiUrl}/bankreconciliation`;
  
    allreconciliation() {
        return this.getCallService(`${this.bankreconcillationUrl}`+"/findAll");
      }

      reconciliationsave(bankreconcile001mb: Bankreconcile001mb) {
        return this.postCallService(`${this.bankreconcillationUrl}`+"/save",{}, bankreconcile001mb);
      }
      reconciliationupdate(bankreconcile001mb: Bankreconcile001mb) {
        return this.putCallService(`${this.bankreconcillationUrl}`+"/update",{}, bankreconcile001mb);
      }

      reconciliationdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.bankreconcillationUrl}`+"/delete", data);
      }

      bankreconcillationPdf() {
        return this.getCallService1(`${this.bankreconcillationUrl}` + "/pdf");
      }
    
      bankreconcillationExcel() {
        return this.getCallService1(`${this.bankreconcillationUrl}` + "/excel");
      }

}
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Supptype001mb } from "../entities/Supptype001mb";

@Injectable()
export class supTypeManager extends BaseService {

  private supTypeUrl: string = `${environment.apiUrl}/suppliertype`

    allsuptype() {
        return this.getCallService(`${this.supTypeUrl}`+"/findAll");
      }
      suptypesave(supptype001mb: Supptype001mb) {
        return this.postCallService(`${this.supTypeUrl}`+"/save",{}, supptype001mb);
      }
      suptypeupdate(supptype001mb: Supptype001mb) {
        return this.putCallService(`${this.supTypeUrl}`+"/update",{}, supptype001mb);
      }
      suptypedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.supTypeUrl}`+"/delete", data);
      }

      suptypePdf() {
        return this.getCallService1(`${this.supTypeUrl}` + "/pdf");
      }
    
      suptypeExcel() {
        return this.getCallService1(`${this.supTypeUrl}` + "/excel");
      }

}
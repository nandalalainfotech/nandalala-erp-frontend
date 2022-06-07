import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Supstatus001mb } from "../entities/Supstatus001mb";

@Injectable()
export class suStatusManager extends BaseService {

  private statusUrl: string = `${environment.apiUrl}/supplierstatus`

    allsupstatus() {
        return this.getCallService(`${this.statusUrl}`+"/findAll");
      }

      supstatussave(supstatus001mb: Supstatus001mb) {
        return this.postCallService(`${this.statusUrl}`+"/save",{}, supstatus001mb);
      }

      sustatusupdate(supstatus001mb: Supstatus001mb) {
        return this.putCallService(`${this.statusUrl}`+"/update",{}, supstatus001mb);
      }

      supstausdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.statusUrl}`+"/delete",data);
      }

      sustatusPdf() {
        return this.getCallService1(`${this.statusUrl}` + "/pdf");
      }
    
      sustatusExcel() {
        return this.getCallService1(`${this.statusUrl}` + "/excel");
      }

}

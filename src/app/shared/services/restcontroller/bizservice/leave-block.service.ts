import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Lvblocklist001mb } from "../entities/Lvblocklist001mb";

@Injectable()
export class LeaveBlockManager extends BaseService {

  private leaveBlockUrl: string = `${environment.apiUrl}/leaveblock`
  
    allleaveblock() {
        return this.getCallService(`${this.leaveBlockUrl}`+"/findAll");
      }
      leaveblocksave(lvblocklist001mb: Lvblocklist001mb) {
        return this.postCallService(`${this.leaveBlockUrl}`+"/save", {}, lvblocklist001mb);
      }
      leaveblockupdate(lvblocklist001mb: Lvblocklist001mb) {
        return this.putCallService(`${this.leaveBlockUrl}`+"/update", {}, lvblocklist001mb);
    }
    leaveblockdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.leaveBlockUrl}`+"/delete", data);
      }

      leaveBlockPdf() {
        return this.getCallService1(`${this.leaveBlockUrl}` + "/pdf");
    }

    leaveBlockExcel() {
        return this.getCallService1(`${this.leaveBlockUrl}` + "/excel");
    }
}
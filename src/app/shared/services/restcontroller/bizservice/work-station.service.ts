import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Workstation001mb } from "../entities/Workstation001mb";

@Injectable()

export class WorkStationManager extends BaseService {

  private workStationUrl: string = `${environment.apiUrl}/workstation`

  allworkstation() {
    return this.getCallService(`${this.workStationUrl}`+"/findAll");
  }

  workstationsave(workstation001mb: Workstation001mb) {
    return this.postCallService(`${this.workStationUrl}`+"/save", {}, workstation001mb);
  }

  workstationupdate(workstation001mb: Workstation001mb) {
    return this.putCallService(`${this.workStationUrl}`+"/update", {}, workstation001mb);
  }

  stationdelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.workStationUrl}`+"/delete", data);
  }

  workStationPdf() {
    return this.getCallService1(`${this.workStationUrl}` + "/pdf");
}

workStationExcel() {
    return this.getCallService1(`${this.workStationUrl}` + "/excel");
}

}
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Instalnote001mb } from "../entities/Instalnote001mb";

@Injectable()
export class InstallNoteManager extends BaseService {

  private installNoteUrl: string = `${environment.apiUrl}/install`

  allinstall() {
    return this.getCallService(`${this.installNoteUrl}` + "/findAll");
  }
  saveinstall(instalnote001mb: Instalnote001mb) {
    return this.postCallService(`${this.installNoteUrl}` + "/save", {}, instalnote001mb);
  }
  updateinstall(instalnote001mb: Instalnote001mb) {
    return this.putCallService(`${this.installNoteUrl}` + "/update", {}, instalnote001mb);
  }
  deleteinstall(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.installNoteUrl}` + "/delete", data);
  }


  installNotePdf() {
    return this.getCallService1(`${this.installNoteUrl}` + "/pdf");
  }

  installNoteExcel() {
    return this.getCallService1(`${this.installNoteUrl}` + "/excel");
  }

}

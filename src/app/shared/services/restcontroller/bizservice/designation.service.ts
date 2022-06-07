import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Designation001mb } from "../entities/Designation001mb";

@Injectable()

export class DesignationManager extends BaseService {

  private designationUrl: string = `${environment.apiUrl}/desingtn`;

  alldesingtn() {
    return this.getCallService(`${this.designationUrl}` + "/findAll");
  }
  savedesingtn(designation001mb: Designation001mb) {
    return this.postCallService(`${this.designationUrl}` + "/save", {}, designation001mb);
  }
  updatedesingtn(designation001mb: Designation001mb) {
    return this.putCallService(`${this.designationUrl}` + "/update", {}, designation001mb);
  }
  deletedesingtn(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.designationUrl}` + "/delete", data);
  }

  designationPdf() {
    return this.getCallService1(`${this.designationUrl}` + "/pdf");
  }

  designationExcel() {
    return this.getCallService1(`${this.designationUrl}` + "/excel");
  }
}
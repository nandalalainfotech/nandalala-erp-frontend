import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Stkreconcile001mb } from "../entities/Stkreconcile001mb";

@Injectable()
export class StkReconcileManager extends BaseService {

  private stkReconcileUrl: string = `${environment.apiUrl}/concile`

  allreconcile() {
    return this.getCallService(`${this.stkReconcileUrl}` + "/findAll");
  }
  savereconcile(stkreconcile001mb: Stkreconcile001mb) {
    return this.postCallService(`${this.stkReconcileUrl}` + "/save", {}, stkreconcile001mb);
  }
  updatereconcile(stkreconcile001mb: Stkreconcile001mb) {
    return this.putCallService(`${this.stkReconcileUrl}` + "/update", {}, stkreconcile001mb);
  }
  deletereconcile(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.stkReconcileUrl}` + "/delete", data);
  }

  stkReconcilePdf() {
    return this.getCallService1(`${this.stkReconcileUrl}` + "/pdf");
  }

  stkReconcileExcel() {
    return this.getCallService1(`${this.stkReconcileUrl}` + "/excel");
  }


}

import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Purecpttrend001mb } from "../entities/Purecpttrend001mb";

@Injectable()

export class PurRecptTrendManager extends BaseService {

  private purRecptTrendUrl: string = `${environment.apiUrl}/recpttrend`

  allrecpttrend() {
    return this.getCallService(`${this.purRecptTrendUrl}` + "/findAll");
  }

  saverecpttrend(purecpttrend001mb: Purecpttrend001mb) {
    return this.postCallService(`${this.purRecptTrendUrl}` + "/save", {}, purecpttrend001mb);
  }

  updaterecpttrend(purecpttrend001mb: Purecpttrend001mb) {
    return this.putCallService(`${this.purRecptTrendUrl}` + "/update", {}, purecpttrend001mb);
  }

  deleterecpttrend(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.purRecptTrendUrl}` + "/delete", data);
  }

  dpurRecptTrendPdf() {
    return this.getCallService1(`${this.purRecptTrendUrl}` + "/pdf");
  }

  purRecptTrendExcel() {
    return this.getCallService1(`${this.purRecptTrendUrl}` + "/excel");
  }
}
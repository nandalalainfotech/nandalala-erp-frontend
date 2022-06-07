import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Delnotetrends001mb } from "../entities/Delnotetrends001mb";

@Injectable()

export class DelNoteTrendManager extends BaseService {

  private delNoteTrendUrl: string = `${environment.apiUrl}/delnotetrend`;

  alldelnotetrend() {
    return this.getCallService(`${this.delNoteTrendUrl}` + "/findAll");
  }

  savedelnotetrend(delnotetrends001mb: Delnotetrends001mb) {
    return this.postCallService(`${this.delNoteTrendUrl}` + "/save", {}, delnotetrends001mb);
  }

  updatedelnotetrend(delnotetrends001mb: Delnotetrends001mb) {
    return this.putCallService(`${this.delNoteTrendUrl}` + "/update", {}, delnotetrends001mb);
  }

  deletedelnotetrend(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.delNoteTrendUrl}` + "/delete", data);
  }

  delNoteTrendPdf() {
    return this.getCallService1(`${this.delNoteTrendUrl}` + "/pdf");
  }

  delNoteTrendExcel() {
    return this.getCallService1(`${this.delNoteTrendUrl}` + "/excel");
  }

}
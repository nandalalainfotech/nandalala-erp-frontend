import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Trialbalance001mb } from "../entities/Trialbalance001mb";

@Injectable()
export class TrailBalanceManager extends BaseService {

  private trailBalanceUrl: string = `${environment.apiUrl}/trialbalance`

  alltrial() {
    return this.getCallService(`${this.trailBalanceUrl}` + "/findAll");
  }

  trialsave(trialbalance001mb: Trialbalance001mb) {
    return this.postCallService(`${this.trailBalanceUrl}` + "/save", {}, trialbalance001mb);
  }

  trialupdate(trialbalance001mb: Trialbalance001mb) {
    return this.putCallService(`${this.trailBalanceUrl}` + "/update", {}, trialbalance001mb);
  }

  trialdelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.trailBalanceUrl}` + "/delete", data);
  }

  trailBalancePdf() {
    return this.getCallService1(`${this.trailBalanceUrl}` + "/pdf");
  }

  trailBalanceExcel() {
    return this.getCallService1(`${this.trailBalanceUrl}` + "/excel");
  }


}
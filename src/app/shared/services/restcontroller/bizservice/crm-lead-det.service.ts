
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { Leaddetail001mb } from "../entities/Leaddetail001mb";

@Injectable()
export class LeadDetailsManager extends BaseService {

  private leadDetailsUrl: string = `${environment.apiUrl}/leaddetails`;

  allleadde() {
    return this.getCallService(`${this.leadDetailsUrl}` + "/findAll");
  }
  leaddesave(leaddetail001mb: Leaddetail001mb) {
    return this.postCallService(`${this.leadDetailsUrl}` + "/save", {}, leaddetail001mb);
  }
  leaddeupdate(leaddetail001mb: Leaddetail001mb) {
    return this.putCallService(`${this.leadDetailsUrl}` + "/update", {}, leaddetail001mb);
  }
  leaddedelete(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.leadDetailsUrl}` + "/delete", data);
  }

  leadDetailsPdf() {
    return this.getCallService1(`${this.leadDetailsUrl}` + "/pdf");
  }

  leadDetailsExcel() {
    return this.getCallService1(`${this.leadDetailsUrl}` + "/excel");
  }
}
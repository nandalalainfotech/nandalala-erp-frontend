import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Appraisal001mb } from "../entities/Appraisal001mb";

@Injectable()

export class AppraisalManager extends BaseService {

  private appraisaltUrl: string = `${environment.apiUrl}/appraisal`;
  
  allappraisal() {
    return this.getCallService(`${this.appraisaltUrl}`+"/findAll");
  }

  saveappraisal(appraisal001mb: Appraisal001mb) {
    return this.postCallService(`${this.appraisaltUrl}`+"/save", {}, appraisal001mb);
  }

  updateappraisal(appraisal001mb: Appraisal001mb) {
    return this.putCallService(`${this.appraisaltUrl}`+"/update", {}, appraisal001mb);
  }

  deleteappraisal(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.deleteCallService(`${this.appraisaltUrl}`+"/delete", data);
  }

  appraisalPdf() {
    return this.getCallService1(`${this.appraisaltUrl}` + "/pdf");
}

appraisalExcel() {
    return this.getCallService1(`${this.appraisaltUrl}` + "/excel");
}
}
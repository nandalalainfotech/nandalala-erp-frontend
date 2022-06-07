import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Apprtemp001mb } from "../entities/Apprtemp001mb";

@Injectable()

export class AppraisalTemplateManager extends BaseService {

    private appraisalTemplatetUrl: string = `${environment.apiUrl}/appraisaltemp`;
    
    allappraisaltemp() {
        return this.getCallService(`${this.appraisalTemplatetUrl}`+"/findAll");
    }

    saveappraisaltemp(apprtemp001mb: Apprtemp001mb) {
        return this.postCallService(`${this.appraisalTemplatetUrl}`+"/save", {}, apprtemp001mb);
    }

    updateappraisaltemp(apprtemp001mb: Apprtemp001mb) {
        return this.putCallService(`${this.appraisalTemplatetUrl}`+"/update", {}, apprtemp001mb);
    }

    deleteappraisaltemp(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.appraisalTemplatetUrl}`+"/delete", data);
    }

    appraisalTemplatePdf() {
        return this.getCallService1(`${this.appraisalTemplatetUrl}` + "/pdf");
    }

    appraisalTemplateExcel() {
        return this.getCallService1(`${this.appraisalTemplatetUrl}` + "/excel");
    }
}